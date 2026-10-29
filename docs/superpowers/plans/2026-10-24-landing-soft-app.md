# Landing soft App Router implementation plan

**Goal:** Port the user-selected `docs/design/landing-soft-preview.html` into `src/app` and give navigation destinations explicit route folders.

**Architecture:** Server-rendered sections shared by the landing page and destination pages. Client panels consume a hook ViewModel; illustrative fixtures live in `src/lib/landing-demo.ts`. Existing API, auth, and database behavior stays outside this UI task.

**Tech stack:** Existing Next.js, React, TypeScript and Tailwind. No new dependencies.

**Spec:** `docs/design/2026-10-24-landing-soft-brief.md`, existing HTML/CSS preview, and the user's instruction to implement it and expose named routes.

## Constraints

- Preserve preview layout, copy, artwork, responsive rules, focus and reduced-motion behavior.
- Edit `src/app/globals.css` directly using preview CSS; retain Tailwind/shadcn semantic mappings.
- UI remains explicitly illustrative; no data requests or new authentication flows.
- No new test files, per AGENTS.md. Run typecheck, lint, build and inspect rendered pages.
- Route destinations reuse the corresponding existing preview sections, including the login preview notice.

## Tasks

- [x] Port preview stylesheet and illustration; compose header/footer and landing sections under `src/app/_components`.
- [x] Move scenario, chart, threshold and chapter state into `src/hooks/use-landing-demo.ts`; fixtures in `src/lib/landing-demo.ts`.
- [x] Build `/`, `/story`, `/features`, `/data-sources`, `/demo`, `/login`, `/air-quality`, `/weather`, `/forecast`, `/notifications`, and `/map` using existing preview sections. Use Next Link for navigation; retain local controls for scenario/chart/threshold.
- [x] Run typecheck, lint, build, HTTP checks and static HTML inspection; report visual/runtime limitations below.

## Review focus

- Missing-data scenario never displays a good-air result.
- History/forecast state updates path, dashed line, caption and accessible description together.
- Threshold updates do not imply saving preferences or creating real notifications.
- Direct route visits and client navigation render the same shared sections without duplicate IDs.
- Preview typography survives Tailwind preflight; mobile layout and reduced motion remain usable.

## Sources verified before implementation

- https://nextjs.org/docs/app/getting-started/layouts-and-pages
- https://nextjs.org/docs/app/api-reference/components/link
- https://nextjs.org/docs/app/api-reference/components/image
- https://nextjs.org/docs/app/api-reference/directives/use-client
- https://react.dev/reference/react/useState
- https://react.dev/reference/react/useEffect
- https://tailwindcss.com/docs/theme
- https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

## Verification and implementation notes

- `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build`, and `git diff --check`: passed.
- Build generates all eleven UI routes. Their prerendered HTML has one main, one h1, no duplicate IDs, and an explicit demo label.
- Public illustration returns HTTP 200 and is copied from the drawing without modifications.
- Local runtime requests for all UI routes return HTTP 500 in the existing Supabase session proxy because `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are not configured. No auth changes, fake credentials, or proxy bypasses were introduced.
- Browser inventory is empty; native pipe and in-app browser are unavailable. Visual, responsive and hydrated-control checks are not confirmed; static source review is not browser QA.
- The root uses the drawing's system-font stack and native CSS scrolling rather than loading Geist and wrapping pages in Lenis, matching the selected drawing and its reduced-motion rule.
- The login destination displays the existing login-preview notice; it does not introduce an auth form. The map destination opens the same existing illustrative diagram.
- No new packages, migrations, test files, commits, or pushes.
- Independent read-only code review: no critical, important or minor findings. Reviewer confirmed CSS/source parity, fixture/ViewModel separation and observer cleanup; browser/runtime acceptance remains unverified for the reasons above.
