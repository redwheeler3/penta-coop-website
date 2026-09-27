export const REMINDER_INTERVAL_MS = 24 * 60 * 60_000;

export type NotificationReason = "new_queue" | "count_increased" | "daily_reminder";

export function monitorEnabled(value: string | undefined): boolean {
  return value !== "false";
}

export function notificationReason(
  pendingCount: number,
  previousPendingCount: number | null,
  lastAlertAt: number | null,
  now: number,
): NotificationReason | null {
  if (pendingCount === 0) return null;
  if (previousPendingCount === null || previousPendingCount === 0 || lastAlertAt === null) {
    return "new_queue";
  }
  if (pendingCount > previousPendingCount) return "count_increased";
  if (now - lastAlertAt >= REMINDER_INTERVAL_MS) return "daily_reminder";
  return null;
}

export function pendingApplicationCount(payload: unknown): number {
  if (typeof payload !== "object" || payload === null || !("total" in payload)) {
    throw new Error("Discord join-request response did not include a total.");
  }
  const total = payload.total;
  if (!Number.isInteger(total) || (total as number) < 0) {
    throw new Error("Discord join-request response included an invalid total.");
  }
  return total as number;
}

export function shouldRetryStatus(status: number): boolean {
  return status === 408 || status === 429 || status >= 500;
}
