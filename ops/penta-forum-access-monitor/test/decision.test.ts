import { describe, expect, it } from "vitest";

import {
  monitorEnabled,
  notificationReason,
  pendingApplicationCount,
  REMINDER_INTERVAL_MS,
  shouldRetryStatus,
} from "../src/decision";

describe("forum-access monitor decisions", () => {
  it("alerts when a queue first becomes non-empty", () => {
    expect(notificationReason(1, 0, null, 1)).toBe("new_queue");
    expect(notificationReason(1, null, null, 1)).toBe("new_queue");
  });

  it("alerts when the pending count increases", () => {
    expect(notificationReason(2, 1, 1, 2)).toBe("count_increased");
  });

  it("reminds once a day while requests remain pending", () => {
    expect(notificationReason(1, 1, 1, REMINDER_INTERVAL_MS)).toBeNull();
    expect(notificationReason(1, 1, 1, REMINDER_INTERVAL_MS + 1)).toBe("daily_reminder");
  });

  it("does not alert for an empty or recently reported unchanged queue", () => {
    expect(notificationReason(0, 1, 1, 2)).toBeNull();
    expect(notificationReason(1, 1, 1, 2)).toBeNull();
  });

  it("accepts only a non-negative integer total", () => {
    expect(pendingApplicationCount({ total: 0 })).toBe(0);
    expect(pendingApplicationCount({ total: 2, guild_join_requests: [] })).toBe(2);
    expect(() => pendingApplicationCount({})).toThrow("did not include a total");
    expect(() => pendingApplicationCount({ total: -1 })).toThrow("invalid total");
    expect(() => pendingApplicationCount({ total: "1" })).toThrow("invalid total");
  });

  it("retries only transient response statuses", () => {
    for (const status of [408, 429, 500, 502, 503, 504]) expect(shouldRetryStatus(status)).toBe(true);
    for (const status of [400, 401, 403, 404]) expect(shouldRetryStatus(status)).toBe(false);
  });

  it("runs by default and pauses only when explicitly disabled", () => {
    expect(monitorEnabled(undefined)).toBe(true);
    expect(monitorEnabled("false")).toBe(false);
    expect(monitorEnabled("true")).toBe(true);
  });
});
