# Penta Housing Co-Op Website

Public website for Penta Housing Co-Op: <https://www.pentacoop.com>.

## How it works

The public site is a static multi-page website. A production build produces real HTML documents for:

- `/`
- `/about.html`
- `/apply.html`
- `/members.html`
- `/privacy.html`
- `/terms.html`
- `/screener.html`

Eleventy renders the pages into HTML. The small browser script in `site/assets/site.js` handles the interactive behavior and Google Analytics events.

## Project layout

```
site/
  _includes/          Shared Eleventy layout, navigation, and form partials
  *.njk               Page templates, including privacy, terms, and screener pages
  assets/site.js      Browser behavior: analytics, menu, form, accordion, toasts
src/index.css         Tailwind CSS entry point and theme
public/               Static assets copied directly to dist/
```

## Local development

Requirements: Node.js 18 or newer and npm.

```sh
npm install
npm run dev
```

`npm run dev` builds the static site and starts a preview server on port 8080. Re-run it after changing page templates, styles, or `site/assets/site.js`.

Useful commands:

```sh
npm run build  # Create dist/ for deployment
npm run lint   # Run ESLint
npm run deploy # Build and publish dist/ to GitHub Pages
```

## Updating content

- Public page content lives in `site/`.
- Shared navigation lives in `site/_includes/navigation.njk`.
- Current unit, application, analytics, and vacancy-notification configuration live in `site/_data/site.js`.
- Images belong in `public/`; reference them with root-relative URLs (for example, `/penta-images/hero-exterior.jpg`).

After any change, run `npm run build` and inspect the relevant file in `dist/`.

## Interactive behavior

`site/assets/site.js` is the only browser-side behavior layer. It provides:

- responsive navigation menu;
- application-form link handling;
- email signup validation and vacancy-notification submission;
- checkbox checkmarks and in-page toast messages;
- TELUS-email help accordion;
- GA4 page views and interaction events.

Keep new interactive behavior here instead of adding client-side rendering or routing.

## Vacancy notifications

The signup form on `apply.html` sends a JSON `POST` request to the application service endpoint
configured in `site/_data/site.js`. The endpoint and consent version are rendered into `data-*`
attributes on the form, which `site/assets/site.js` reads at submit time.

The bedroom values in `site/_includes/email-signup.njk` must continue to match the application
service contract. Test an actual signup after changing the endpoint, consent version, or bedroom
values.

## Analytics

GA4 is initialized once in the shared Eleventy layout. Because this is a normal multi-page site, GA4 sends its standard page view once for each full document load. `site/assets/site.js` tracks:

- `navigation_click`
- `cta_click`
- `external_link_click`
- `resource_link_click`
- `accordion_click`
- `form_start`, `form_submit`, `form_error`, and `form_abandonment`

Do not add a manual `page_view` call or SPA history tracking: normal document navigation already produces the correct page views.

To report on custom event parameters beyond DebugView, register the relevant event-scoped custom dimensions in GA4 (for example `button_name`, `button_location`, `destination`, `link_name`, `resource_category`, `form_name`, and `error_type`). Do not send email addresses or other personal information in analytics events.

Verify analytics changes in GA4 DebugView before deploying. Do not reintroduce SPA route tracking; static pages intentionally use normal document navigation.

## Deployment

GitHub Pages serves `dist/`. The build also copies `index.html` to `404.html` for a useful fallback page. The production custom domain is configured in `public/CNAME`.

Before deploying:

1. Run `npm run build` and `npm run lint`.
2. Check the public pages, mobile menu, TELUS accordion, application link, and email signup.
3. Confirm relevant GA4 events in DebugView.

## License

The source code is MIT licensed; see [LICENSE](LICENSE). Penta names, branding, images, and other non-code materials are not covered by that license; see [NOTICE](NOTICE).
