import { DurableObject } from "cloudflare:workers";

import {
  monitorEnabled,
  notificationReason,
  pendingApplicationCount,
  shouldRetryStatus,
} from "./decision";
import { retryOnce } from "./retry";

export interface Env {
  MONITOR: DurableObjectNamespace;
  DISCORD_BOT_TOKEN: string;
  DISCORD_GUILD_ID: string;
  ALERT_WEBHOOK_URL: string;
  MONITOR_ENABLED?: string;
}

const PREVIOUS_PENDING_COUNT_KEY = "previous_pending_count";
const LAST_ALERT_AT_KEY = "last_alert_at";
const CONSECUTIVE_FAILURES_KEY = "consecutive_failures";
const LAST_ERROR_ALERT_AT_KEY = "last_error_alert_at";
const REQUEST_TIMEOUT_MS = 10_000;
const ERROR_ALERT_THRESHOLD = 3;
const ERROR_ALERT_COOLDOWN_MS = 24 * 60 * 60_000;

function errorDetail(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error.";
}

export class ForumAccessMonitor extends DurableObject<Env> {
  async fetch(): Promise<Response> {
    if (!monitorEnabled(this.env.MONITOR_ENABLED)) return new Response(null, { status: 204 });

    try {
      await this.checkQueue();
      await this.ctx.storage.put(CONSECUTIVE_FAILURES_KEY, 0);
    } catch (error) {
      await this.recordFailure(error);
      throw error;
    }
    return new Response(null, { status: 204 });
  }

  private async checkQueue(): Promise<void> {
    const pendingCount = await this.fetchPendingCount();
    const previousPendingCount = await this.ctx.storage.get<number>(PREVIOUS_PENDING_COUNT_KEY);
    const lastAlertAt = await this.ctx.storage.get<number>(LAST_ALERT_AT_KEY);
    const now = Date.now();
    const reason = notificationReason(
      pendingCount,
      previousPendingCount ?? null,
      lastAlertAt ?? null,
      now,
    );

    await this.ctx.storage.put(PREVIOUS_PENDING_COUNT_KEY, pendingCount);
    if (pendingCount === 0) {
      await this.ctx.storage.delete(LAST_ALERT_AT_KEY);
      console.log("Forum access request queue is empty.");
      return;
    }
    if (!reason) {
      console.log(`Forum access queue still has ${pendingCount} pending request(s); no alert is due.`);
      return;
    }

    const noun = pendingCount === 1 ? "request is" : "requests are";
    const delivered = await this.sendAlert(
      `${pendingCount} Penta forum access ${noun} waiting for review.`,
    );
    if (!delivered) throw new Error("Discord application alert delivery failed.");

    await this.ctx.storage.put(LAST_ALERT_AT_KEY, now);
    console.log(`Sent forum access alert (${reason}; pending count ${pendingCount}).`);
  }

  private async fetchPendingCount(): Promise<number> {
    const url =
      `https://discord.com/api/v10/guilds/${this.env.DISCORD_GUILD_ID}/requests` +
      "?status=SUBMITTED&limit=1";
    const response = await retryOnce(async () => {
      const attempt = await fetch(url, {
        headers: { Authorization: `Bot ${this.env.DISCORD_BOT_TOKEN}` },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (shouldRetryStatus(attempt.status)) {
        throw new Error(`Discord join-request lookup failed (HTTP ${attempt.status}).`);
      }
      return attempt;
    });

    if (!response.ok) {
      throw new Error(`Discord join-request lookup failed (HTTP ${response.status}).`);
    }
    return pendingApplicationCount(await response.json());
  }

  private async recordFailure(error: unknown): Promise<void> {
    const failures = (await this.ctx.storage.get<number>(CONSECUTIVE_FAILURES_KEY)) ?? 0;
    const nextFailures = failures + 1;
    await this.ctx.storage.put(CONSECUTIVE_FAILURES_KEY, nextFailures);
    console.error(`Forum access monitor check failed: ${errorDetail(error)}`);

    if (nextFailures < ERROR_ALERT_THRESHOLD) return;
    const lastErrorAlertAt = await this.ctx.storage.get<number>(LAST_ERROR_ALERT_AT_KEY);
    if (lastErrorAlertAt && Date.now() - lastErrorAlertAt < ERROR_ALERT_COOLDOWN_MS) return;

    const delivered = await this.sendAlert(
      "The Penta Forum Access Monitor has failed " +
        `${nextFailures} consecutive checks. Review its Cloudflare logs.`,
    );
    if (delivered) await this.ctx.storage.put(LAST_ERROR_ALERT_AT_KEY, Date.now());
  }

  private async sendAlert(content: string): Promise<boolean> {
    try {
      const response = await fetch(this.env.ALERT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          allowed_mentions: { parse: [] },
        }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (!response.ok) console.error(`Alert webhook failed (HTTP ${response.status}).`);
      return response.ok;
    } catch (error) {
      console.error(`Alert webhook failed: ${errorDetail(error)}`);
      return false;
    }
  }
}

export default {
  async scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
    if (!monitorEnabled(env.MONITOR_ENABLED)) return;
    const id = env.MONITOR.idFromName("penta");
    ctx.waitUntil(env.MONITOR.get(id).fetch("https://monitor.internal/check"));
  },
} satisfies ExportedHandler<Env>;
