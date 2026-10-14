# Penta Forum Access Monitor

This Cloudflare Worker checks Discord's native **Apply to Join** queue once per minute. It sends a
private `penta-alerts` notification only when the queue becomes non-empty, the count increases, or
a request remains waiting for 24 hours.

Failed checks are logged immediately, but an error notification is sent only after 60 consecutive
failed checks (about an hour at the one-minute cadence). A successful check resets the failure
count and error-alert cooldown. An ongoing failure sends at most one error notification per 24
hours; unsuccessful error-alert delivery is retried on the next failed check.

The monitor reads only the response's aggregate `total`. It does not log or store applicant
profiles or application answers, and it has no code path for approving, rejecting, or kicking a
Discord user.

## Discord setup

The private Discord application is named `Penta Forum Access Monitor`. Its application ID is
`1553601251751624786`. It is installed only in the Penta Co-op server.

Discord requires the bot's role to have **Kick, Approve, and Reject Members** to read native join
requests; without it the endpoint returns HTTP 403. The Worker only reads the queue count and has no
mutating Discord operation. Do not grant Administrator or enable privileged Gateway intents.

## Cloudflare configuration

Run commands from this directory. Set secrets interactively; never place them in this repository,
shell history, logs, or chat:

```powershell
npx wrangler secret put DISCORD_BOT_TOKEN
npx wrangler secret put ALERT_WEBHOOK_URL
```

The Worker disables all webhook mentions. Notification delivery relies on the private
`penta-alerts` channel's normal notification settings.

Routine validation and deployment:

```powershell
npm run check
npm test
npx wrangler deploy --dry-run
npx wrangler deploy
```

The Cron runs once per minute. Public Worker and preview URLs are disabled. Workers Logs are
enabled at 100% sampling, but log only aggregate counts and sanitized error messages. The monitor
is enabled by default once deployed.

To pause checks without deleting deployment state, set the optional `MONITOR_ENABLED` Cloudflare
secret to `false`. Delete it or set it to `true` to resume.
