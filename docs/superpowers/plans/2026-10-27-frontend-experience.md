# DiDung Frontend Experience Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task by task. Repository AGENTS.md §7 prohibits adding automated tests without separate approval; verify with typecheck, lint, and build.

**Goal:** Keep the existing public landing story, make its data panels illustrative, and place all current environmental data and personal features behind sign-in.

**Architecture:** Keep Supabase and external data access in the Model layer, state and API calls in hooks and stores, and rendering in route components. Enforce sign-in both in server rendered routes and each read API. Reuse existing data hooks and account actions while replacing the page structure to match the approved preview.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Supabase SSR/Auth, Zustand, Mapbox GL JS, existing CSS tokens.

**Spec:** `docs/specs/2026-10-27-frontend-experience.md`; landing drawing: `docs/design/2026-10-25-navbar-rounded-preview.html`; auth/dashboard preview: `docs/previews/2026-10-27-frontend-preview.html`.

## Global Constraints

- Keep the old landing composition and match `design.md` palette/neumorphism; use the newer preview only for auth/dashboard.
- Landing numbers and chart are illustrative and change roughly every four seconds; reduced motion freezes them.
- No device location prompt or schema migration.
- No automated test files without a separate approval under AGENTS.md §7.
- Keep API sync and cron routes unaffected.

## Review Focus

- Unauthenticated requests to every environmental read API return 401.
- Existing legacy URLs cannot reveal current readings to guests.
- Expired sessions redirect to sign-in and never render private content.
- A missing Mapbox token leaves usable location selection and clear guidance.
- Signup awaiting email confirmation never appears signed in.

---

### Task 1: Access boundaries

**Files:** `src/lib/auth-navigation.ts`, `src/lib/api/require-user.ts`, environmental read API routes, `src/app/page.tsx`, `src/app/login/page.tsx`, `src/app/app/page.tsx`, legacy live routes.

- [ ] Confirm current route and Supabase Auth patterns from official docs.
- [ ] Add a shared server-side auth check for read APIs and return 401 before reading data.
- [ ] Redirect signed-in visitors from `/` and `/auth` to `/app`; redirect guests from `/app` to `/auth`.
- [ ] Redirect legacy live pages into the appropriate `/app` section.
- [ ] Run `npx tsc --noEmit` and inspect the output.

### Task 2: Approved landing and sign-in layout

**Files:** `src/app/page.tsx`, `src/app/auth/page.tsx`, `src/app/_components/landing/*`, `src/app/_components/live/login-form.tsx`, `src/hooks/use-landing-demo.ts`, `src/hooks/use-auth-form.ts`, `src/app/layout.tsx`, `src/app/globals.css`.

- [ ] Preserve the landing hero, four story chapters, features, sources, CTA, header and footer; switch the chapter panels to labeled changing illustrations with reduced-motion behavior.
- [ ] Build the approved auth view with Google, email/password, signup, errors, and return link.
- [ ] Use route-aware chrome so public and private views match the preview.
- [ ] Run `npx tsc --noEmit`, `npm run lint`, and `npm run build`.

### Task 3: Private dashboard

**Files:** `src/app/app/page.tsx`, `src/app/_components/live/*`, `src/hooks/use-environment.ts`, `src/hooks/use-account.ts`, `src/app/globals.css`.

- [ ] Compose the approved sidebar, selected location, AQI, weather, advice, history/forecast, Mapbox, and thresholds from existing ViewModels.
- [ ] Render loading, empty, error, stale, source, and model-resolution messages without example values.
- [ ] Keep keyboard location selection available when Mapbox is unavailable.
- [ ] Run `npx tsc --noEmit`, `npm run lint`, and `npm run build`.

### Task 4: Documentation and verification

**Files:** `README.md`, `docs/specs/2026-10-27-frontend-experience.md`, deployment notes as needed.

- [ ] Explain the illustrative/live boundary, sign-in reason, model limits, OAuth and Mapbox setup, and data prerequisites.
- [ ] Compare implemented layouts and behavior against the approved preview at desktop and mobile widths.
- [ ] Run `npx tsc --noEmit`, `npm run lint`, `npm run build`; inspect git diff and status.
