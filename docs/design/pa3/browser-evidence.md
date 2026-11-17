# PA3 browser observations — 16 November 2026

Collected by the parent Codex agent through the user's authenticated T3 browser.
Source: https://didung-air-quality.vercel.app/ and `/login`. These observations
describe the deployed application at the time of capture; deployment commit is
not independently verified and production differs from local source (for example,
the login page has Login/Register tabs). Do not equate deployment with local HEAD.

## Captures

Images are in `evidence/`: `landing1440.png`, `landing390.png`, `login1440.png`,
`login390.png`, `signup1440.png`, `chapter-air1440.png`, `chapter-trend1440.png`,
`chapter-alert1440.png`, `map1440.png`. Names give measured CSS viewport width.
Desktop viewport height: 1000; mobile: 844. The chapter/map captures show regions
of the public landing page, not authenticated dashboard/profile screens.
Full DOM observations are in `evidence/browser-observations.json`.

## Observed results

- Landing: innerWidth 1440 / document scrollWidth 1425; at 390 / 375.
  Login: 390 / 375. No document-level horizontal overflow in these measured
  states. This does not prove all components, dialogs or routes are responsive.
- Login Email and Password inputs have associated visible labels, required=true,
  type=email/password and autocomplete=email/current-password. Signup mode sets
  password minLength=6. No account was created and no credentials were submitted.
- Eight sequential Tab presses on desktop login reached skip link, brand link,
  three navigation links, threshold link, login link, login mode button. Each had
  computed solid 3px rgb(72,108,47) outline with 6px offset. A further Tab reached
  Register; Enter activated signup mode. This verifies a limited keyboard path,
  not all functions or absence of traps across the application.
- Public AQI card displayed numeric AQI, named category, PM2.5 concentration/unit,
  source and valid timestamp. Colour is supplemented by textual information in
  that observed card. Screenshot values are time-varying, not baseline fixtures.
- Computed colors sampled on production: body background rgb(252,236,216),
  headings/text rgb(110,53,17), forecast toggle text rgb(72,108,47). Details in
  JSON; calculate contrast and check backgrounds before claiming WCAG compliance.
- Authenticated dashboard, thresholds, notifications, full map keyboard behavior,
  error announcements, zoom, screen-reader use, and every other viewport/state
  were not verified in this browser session. Mark those pending, not pass.

## Local checks

`npm ci --no-audit --no-fund` completed using the existing lockfile. No dependency
versions or package files were intentionally changed. `npx --no-install tsc
--noEmit`, `npm run lint`, and `npm run build` each exited 0 on this checkout.
Runtime Node was v26.13.1, while package.json requests ^22.13.0; validation was
not repeated under Node 22. Local dev startup worked, but visiting `/` failed
because Supabase URL/publishable key were absent. The server was stopped; no
secrets were requested or substituted. Next dev appended a generated rules block
to AGENTS.md; only that automatically appended block was removed to preserve
the original instructions. This is not evidence of live Supabase behavior.
