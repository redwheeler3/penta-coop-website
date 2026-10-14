import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("cloudflare:workers", () => ({
  DurableObject: class {
    constructor(protected ctx: unknown, protected env: unknown) {}
  },
}));

import { ForumAccessMonitor } from "../src/index";

describe("forum-access monitor failure alerts", () => {
  const values = new Map<string, unknown>();
  const storage = {
    get: async (key: string) => values.get(key),
    put: async (key: string, value: unknown) => { values.set(key, value); },
    delete: async (key: string) => values.delete(key),
  };
  const env = {
    DISCORD_BOT_TOKEN: "test-token",
    DISCORD_GUILD_ID: "test-guild",
    ALERT_WEBHOOK_URL: "https://example.test/webhook",
  };
  const requests = vi.fn();
  let queueFails: boolean;
  let alertDelivered: boolean;

  function createMonitor() {
    return new ForumAccessMonitor({ storage } as never, env as never);
  }

  async function failedChecks(monitor: ForumAccessMonitor, count: number) {
    for (let i = 0; i < count; i++) {
      await expect(monitor.fetch()).rejects.toThrow("HTTP 403");
      vi.setSystemTime(Date.now() + 60_000);
    }
  }

  function alerts() {
    return requests.mock.calls.filter(([url]) => url === env.ALERT_WEBHOOK_URL);
  }

  beforeEach(() => {
    values.clear();
    requests.mockReset();
    queueFails = true;
    alertDelivered = true;
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-13T12:00:00Z"));
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    requests.mockImplementation(async (url: string) => {
      if (url === env.ALERT_WEBHOOK_URL) {
        return new Response(null, { status: alertDelivered ? 204 : 500 });
      }
      return queueFails
        ? new Response(null, { status: 403 })
        : Response.json({ total: 0 });
    });
    vi.stubGlobal("fetch", requests);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("suppresses transient failures and alerts on the 60th consecutive failed check", async () => {
    const monitor = createMonitor();
    await failedChecks(monitor, 3);
    expect(alerts()).toHaveLength(0);
    await failedChecks(monitor, 56);
    expect(alerts()).toHaveLength(0);
    // Recreate the object to verify that the failure count is persisted.
    await failedChecks(createMonitor(), 1);
    expect(alerts()).toHaveLength(1);
    const body = JSON.parse(alerts()[0][1].body);
    expect(body.content).toContain("60 consecutive checks");
    expect(body.allowed_mentions).toEqual({ parse: [] });
  });

  it("resets the streak on success and allows a later outage to alert", async () => {
    const monitor = createMonitor();
    await failedChecks(monitor, 60);
    queueFails = false;
    await expect(monitor.fetch()).resolves.toHaveProperty("status", 204);
    queueFails = true;
    await failedChecks(monitor, 59);
    expect(alerts()).toHaveLength(1);
    await failedChecks(monitor, 1);
    expect(alerts()).toHaveLength(2);
  });

  it("limits repeat error alerts to once per 24 hours during an ongoing outage", async () => {
    const monitor = createMonitor();
    await failedChecks(monitor, 60);
    const firstAlertAt = values.get("last_error_alert_at") as number;
    await failedChecks(monitor, 1);
    expect(alerts()).toHaveLength(1);
    vi.setSystemTime(firstAlertAt + 24 * 60 * 60_000);
    await failedChecks(monitor, 1);
    expect(alerts()).toHaveLength(2);
  });

  it("retries failed error-alert delivery on the next failed check", async () => {
    const monitor = createMonitor();
    alertDelivered = false;
    await failedChecks(monitor, 60);
    expect(alerts()).toHaveLength(1);
    expect(values.has("last_error_alert_at")).toBe(false);
    alertDelivered = true;
    await failedChecks(monitor, 1);
    expect(alerts()).toHaveLength(2);
    expect(values.has("last_error_alert_at")).toBe(true);
  });
});
