# Penta Forum Access Monitor

This Cloudflare Worker checks Discord's native **Apply to Join** queue once per hour. It sends a
private `penta-alerts` notification only when the queue becomes non-empty, the count increases, or
an application remains waiting for 24 hours.

The monitor reads only the response's aggregate `total`. It does not log or store applicant
profiles or application answers, and it has no code path for approving, rejecting, or kicking a
Discord user.

## Discord setup

The private Discord application is named `Penta Forum Access Monitor`. Its application ID is
`1553601251751624786`. It is installed only in the Penta Co-op server.

Discord may require the bot's role to have **Kick Members** to read native join requests. Confirm
that requirement by testing once with the permission, removing it, and testing again. Leave the
permission removed if the second test succeeds. Do not grant Administrator or enable privileged
Gateway intents.

## Cloudflare configuration

Run commands from this directory. Set secrets interactively; never place them in this repository,
shell history, logs, or chat:

```powershell
npx wrangler secret put DISCORD_BOT_TOKEN
npx wrangler secret put ALERT_WEBHOOK_URL
npx wrangler secret put ALERT_USER_ID
```

`ALERT_USER_ID` is treated as a secret only to keep all deployment-specific identifiers out of the
repository. The Worker explicitly allows only that user mention, so applicant-controlled text can
never create mentions.

Routine validation and deployment:

```powershell
npm run check
npm test
npx wrangler deploy --dry-run
npx wrangler deploy
```

The hourly Cron runs at minute 17. Public Worker and preview URLs are disabled. Workers Logs are
enabled at 100% sampling, but log only aggregate counts and sanitized error messages. The monitor
is enabled by default once deployed.

To pause checks without deleting deployment state, set the optional `MONITOR_ENABLED` Cloudflare
secret to `false`. Delete it or set it to `true` to resume.
