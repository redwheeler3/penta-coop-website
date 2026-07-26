# Penta Housing Co-Op Website

Public website for Penta Housing Co-Op: <https://www.pentacoop.com>.

## How it works

The public site is a static multi-page website. A production build produces real HTML documents for:

- `/`
- `/about.html`
- `/apply.html`
- `/members.html`

Visitors do not download or run React. React is used only during the build to render the existing page templates into HTML. The small browser script in `src/site.ts` handles the interactive behavior and Google Analytics events.

Vite builds the CSS and browser script. `scripts/prerender.mjs` writes the rendered pages into `dist/`, which is the deployable directory.

## Project layout

```
src/
  pages/              Page templates rendered at build time
  components/         Shared page-template components
  config/constants.ts Application-opening and Google Forms configuration
  site.ts             Browser behavior: analytics, menu, form, accordion, toasts
  prerender.tsx       Static-page rendering entry point
  index.css           Tailwind CSS entry point and theme
scripts/
  prerender.mjs       Writes static pages to dist/
public/               Static assets copied directly to dist/
  privacy.html        Crawlable privacy policy
  terms.html          Crawlable terms of service
  screener.html       OAuth consent-screen landing page
```

## Local development

Requirements: Node.js 18 or newer and npm.

```sh
npm install
npm run dev
```

`npm run dev` builds the static site and starts a preview server on port 8080. Re-run it after changing page templates, styles, or `src/site.ts`.

Useful commands:

```sh
npm run build  # Create dist/ for deployment
npm run lint   # Run ESLint
npm run deploy # Build and publish dist/ to GitHub Pages
```

## Updating content

- Public page content lives in `src/pages/`.
- Shared navigation lives in `src/components/Navigation.tsx`.
- Current unit and application status live in `src/config/constants.ts`.
- Images belong in `public/`; reference them from pages with `import.meta.env.BASE_URL`.

After any change, run `npm run build` and inspect the relevant file in `dist/`.

## Interactive behavior

`src/site.ts` is the only browser-side behavior layer. It provides:

- responsive navigation menu;
- application-form link handling;
- email signup validation and Google Forms submission;
- checkbox checkmarks and in-page toast messages;
- TELUS-email help accordion;
- GA4 page views and interaction events.

Keep new interactive behavior here instead of adding client-side React rendering or routing.

## Google Forms signup

The mailing-list form on `apply.html` sends a `POST` request to the Google Forms endpoint configured in `FORM_CONFIG.MAILING_LIST_SIGNUP`.

The Google field names and the preference strings in `src/site.ts` must continue to match the Google Form. Test an actual signup after changing either the form configuration or the preference labels.

## Analytics

GA4 is initialized in `index.html` with automatic page views disabled. `src/site.ts` sends one `page_view` per real HTML page and tracks:

- `navigation_click`
- `cta_click`
- `external_link_click`
- `resource_link_click`
- `accordion_click`
- `form_start`, `form_submit`, `form_error`, and `form_abandonment`

Verify analytics changes in GA4 DebugView before deploying. Do not reintroduce SPA route tracking; static pages intentionally use normal document navigation.

## Deployment

GitHub Pages serves `dist/`. The build also copies `index.html` to `404.html` for a useful fallback page. The production custom domain is configured in `public/CNAME`.

Before deploying:

1. Run `npm run build` and `npm run lint`.
2. Check the public pages, mobile menu, TELUS accordion, application link, and email signup.
3. Confirm relevant GA4 events in DebugView.

## License

The source code is MIT licensed; see [LICENSE](LICENSE). Penta names, branding, images, and other non-code materials are not covered by that license; see [NOTICE](NOTICE).
