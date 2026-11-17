# Role-Based Site Separation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Separate DiDung into a guest landing, authentication page, authenticated user app, and role-protected admin shell where only selected accounts with `app_metadata.app_role = "admin"` receive admin access.

**Architecture:** Add one server-only authorization helper that verifies the Supabase user and normalizes every authenticated account to `user` or `admin`. Keep route guards in Server Components and the OAuth callback, leave `src/proxy.ts` responsible only for session refresh, and use pure navigation helpers for role-aware default destinations and safe `next` handling. Preserve the existing route tree; do not move pages into route groups unless implementation reveals a concrete shared-layout need.

**Tech Stack:** Next.js 16.4.2 App Router, React 19.1.0, TypeScript 5, Supabase Auth with `@supabase/ssr` 0.12.7 and `@supabase/supabase-js` 2.118.0, Zustand 5.0.16, existing CSS tokens.

**Spec:** `docs/specs/2026-11-02-role-based-site-separation.md`

## Global Constraints

- Every new Google OAuth and email/password account is a user. Never infer admin from provider, email, domain, or `user_metadata`.
- Only the exact string `user.app_metadata.app_role === "admin"` grants admin access.
- Store no new role data in PostgreSQL; this phase has no migration or RLS change.
- Verify authorization in Server Components and future Route Handlers. `src/proxy.ts` remains a session-refresh layer, not the security boundary.
- Admins default to `/admin` and may also open `/app`; users default to `/app` and receive the 403 experience for `/admin`.
- Keep `/`, `/auth`, `/app`, `/admin`, and `/forbidden` as the public URLs.
- Do not add automated test files without separate approval under `AGENTS.md` section 7.
- Do not implement admin business APIs or display fake operational data.
- Do not edit the landing design.
- Create and obtain approval for the admin/403 wireframe before changing UI code.
- Preserve the user's uncommitted `package-lock.json` change; never stage it in these commits.

## File Structure

| File | Responsibility |
| --- | --- |
| `docs/previews/2026-11-02-admin-role-shell.html` | Approved static preview for admin shell and 403 state |
| `src/lib/auth/authorization.ts` | Server-only identity verification and role normalization |
| `src/lib/auth-navigation.ts` | Pure role-aware default path and safe `next` destination rules |
| `src/app/page.tsx` | Guest landing guard |
| `src/app/auth/page.tsx` | Guest auth guard and validated `next` propagation |
| `src/app/auth/callback/route.ts` | PKCE exchange followed by server-verified role-aware redirect |
| `src/hooks/use-auth-form.ts` | Refresh server route after password auth; preserve `next` for OAuth |
| `src/stores/auth-store.ts` | Accept an internal callback destination for Google OAuth |
| `src/app/app/page.tsx` | Authenticated user route guard; permits both user and admin |
| `src/app/admin/page.tsx` | Admin-only page guard and shell entry point |
| `src/app/forbidden/page.tsx` | Authenticated non-admin 403 experience |
| `src/app/_components/admin/admin-shell.tsx` | Client shell for admin navigation and sign-out |
| `src/app/_components/auth/forbidden-panel.tsx` | Client 403 panel and sign-out |
| `src/app/admin.css` | Approved admin and 403 styles using `design.md` tokens |
| `src/app/layout.tsx` | Import admin styles |
| `src/hooks/use-account.ts` | Redirect to `/` after successful sign-out from the user app |
| `README.md` | Role model, Dashboard operations, grant/revoke/session procedure |

---

### Task 1: Approve The Admin And 403 Wireframe

**Files:**
- Create: `docs/previews/2026-11-02-admin-role-shell.html`
- Reference: `design.md`
- Reference: `docs/specs/2026-11-02-role-based-site-separation.md`

**Interfaces:**
- Consumes: the approved content list in the spec's “Admin shell phase đầu” and “Trang 403” sections.
- Produces: one approved visual source for `AdminShell`, `ForbiddenPanel`, desktop layout, and mobile layout.

- [ ] **Step 1: Build a static two-state preview**

Create one standalone HTML file with controls that switch between `Admin shell` and `403`, plus desktop and mobile preview frames. Use only the palette and neumorphic shadows from `design.md`.

The admin state must show:

```text
DiDung · Admin
Tổng quan [active]
Người dùng [Sắp có]
Dữ liệu [Sắp có]
Đồng bộ [Sắp có]
Cấu hình [Sắp có]

Xin chào, [email or display name]
Khu vực quản trị đang được chuẩn bị.
[Xem user site] [Đăng xuất]
```

The 403 state must show:

```text
403 · Không có quyền truy cập
Tài khoản này đã đăng nhập nhưng không có quyền quản trị.
[Về user site] [Đăng xuất]
```

Do not add charts, user counts, sync status, or other fake admin data.

- [ ] **Step 2: Open and inspect the preview at desktop and mobile widths**

Use the available browser-testing tool to inspect at `1440x900` and `390x844`. Confirm no horizontal overflow, all focusable controls have a visible focus state, and the mobile navigation remains usable.

- [ ] **Step 3: Present screenshots and stop for explicit approval**

Do not edit `src/app`, `src/components`, `src/hooks`, `src/lib`, or `src/stores` before the user approves this preview. If the user requests a visual change, update the preview and repeat Step 2.

- [ ] **Step 4: Commit the approved preview**

```bash
git add docs/previews/2026-11-02-admin-role-shell.html
git commit -m "docs(admin): add approved role shell preview"
```

Expected: the commit contains only the preview file.

### Task 2: Add The Server Authorization Boundary

**Files:**
- Create: `src/lib/auth/authorization.ts`
- Modify: `src/lib/auth-navigation.ts`

**Interfaces:**
- Produces: `type AppRole = "user" | "admin"`.
- Produces: `type Viewer = { user: User; role: AppRole } | { user: null; role: null }`.
- Produces: `getViewer(): Promise<Viewer>`.
- Produces: `defaultPathForRole(role: AppRole): "/app" | "/admin"`.
- Produces: `safeAuthDestination(raw: string | null, origin: string, role: AppRole): string`.
- Preserves: `authFailurePath`, `authFailureMessage`, and `landingAuthRedirect` behavior.

- [ ] **Step 1: Record the current baseline**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both commands exit `0`. If either fails before this task, record the existing failure and stop rather than mixing an unrelated repair into role work.

- [ ] **Step 2: Add the server-only viewer helper**

Create `src/lib/auth/authorization.ts` with this contract:

```ts
import "server-only";

import type { User } from "@supabase/supabase-js";
import type { AppRole } from "@/lib/auth-navigation";
import { createClient } from "@/lib/supabase/server";

export type Viewer =
  | { user: User; role: AppRole }
  | { user: null; role: null };

export async function getViewer(): Promise<Viewer> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return { user: null, role: null };
    return {
      user: data.user,
      role: data.user.app_metadata?.app_role === "admin" ? "admin" : "user",
    };
  } catch {
    return { user: null, role: null };
  }
}
```

Do not accept role input from cookies, query strings, request bodies, `user_metadata`, provider metadata, or email.

- [ ] **Step 3: Make navigation role-aware**

Declare and export `AppRole` in `src/lib/auth-navigation.ts`, which remains a pure module safe for server and client imports. `src/lib/auth/authorization.ts` imports this type; navigation code must never import the server-only authorization module. The final public signatures must be:

```ts
export type AppRole = "user" | "admin";

export function defaultPathForRole(role: AppRole) {
  return role === "admin" ? "/admin" as const : "/app" as const;
}

export function safeAuthDestination(
  raw: string | null,
  origin: string,
  role: AppRole,
) {
  const fallback = new URL(defaultPathForRole(role), origin).href;
  if (!raw?.startsWith("/") || raw.startsWith("//") || /[\\\u0000-\u0020]/.test(raw)) return fallback;
  try {
    const target = new URL(raw, origin);
    if (target.origin !== origin || target.pathname.startsWith("/auth/")) return fallback;
    if (target.pathname.startsWith("/admin") && role !== "admin") return fallback;
    if (target.pathname === "/" || target.pathname === "/auth" || target.pathname === "/forbidden") return fallback;
    return target.href;
  } catch {
    return fallback;
  }
}
```

Keep `landingAuthRedirect()` limited to provider error/code recovery before viewer resolution.

- [ ] **Step 4: Typecheck and inspect the diff**

Run:

```bash
npx tsc --noEmit
```

Expected: commands exit `0`; the diff contains no client import of `src/lib/auth/authorization.ts`.

- [ ] **Step 5: Commit the authorization boundary**

```bash
git add src/lib/auth/authorization.ts src/lib/auth-navigation.ts
git commit -m "feat(auth): add server role authorization"
```

### Task 3: Apply Role-Aware Route And Callback Guards

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/auth/page.tsx`
- Modify: `src/app/app/page.tsx`
- Modify: `src/app/auth/callback/route.ts`
- Modify: `src/hooks/use-auth-form.ts`
- Modify: `src/stores/auth-store.ts`
- Modify: `src/app/_components/live/login-form.tsx`

**Interfaces:**
- Consumes: `getViewer()`, `defaultPathForRole()`, and `safeAuthDestination()` from Task 2.
- Changes: `useAuthForm(nextPath?: string)` accepts a server-sanitized internal return path.
- Changes: `signInWithGoogle(nextPath?: string): Promise<AuthResult>` adds `next` to the callback URL only when present.
- Produces: role-aware server redirects for `/`, `/auth`, `/app`, and `/auth/callback`.

- [ ] **Step 1: Guard the landing and user app with `getViewer()`**

In `src/app/page.tsx`, preserve `landingAuthRedirect()` handling first, then replace the direct Supabase call with:

```ts
const viewer = await getViewer();
if (viewer.role) redirect(defaultPathForRole(viewer.role));
```

In `src/app/app/page.tsx`:

```ts
const viewer = await getViewer();
if (!viewer.user) redirect("/auth?next=/app");
return <DashboardExperience />;
```

Do not redirect admins away from `/app`.

- [ ] **Step 2: Guard `/auth` and sanitize its `next` value**

Expand `searchParams` to include `next?: string`. Use `getViewer()` before rendering:

```ts
const viewer = await getViewer();
if (viewer.role) redirect(defaultPathForRole(viewer.role));
```

For a guest, accept only a local path suitable to pass back to the callback. At this stage, preserve `/app` and `/admin`; discard malformed, protocol-relative, control-character, `/auth/*`, `/`, `/auth`, and `/forbidden` values. Pass the resulting string to:

```tsx
<LoginForm callbackError={callbackError} nextPath={nextPath} />
```

This guest-side check does not grant access. The callback performs the role check after login.

- [ ] **Step 3: Preserve `next` through both authentication methods**

Change the component and hook signatures:

```ts
export function LoginForm({
  callbackError = "",
  nextPath,
}: {
  callbackError?: string;
  nextPath?: string;
})
```

```ts
export function useAuthForm(nextPath?: string) {
```

After a successful password login, call `router.refresh()` rather than hard-coding `/app`; the Server Component will resolve the role and redirect. Remove the `AUTH_LANDING` client redirect. For Google OAuth call `signInWithGoogle(nextPath)`.

In `src/stores/auth-store.ts`, build the callback safely:

```ts
const callback = new URL("/auth/callback", window.location.origin);
if (nextPath) callback.searchParams.set("next", nextPath);

await createClient().auth.signInWithOAuth({
  provider: "google",
  options: { redirectTo: callback.href },
});
```

Keep email confirmation redirect at `/auth/callback`; accounts without an immediate session still see the existing confirmation message.

- [ ] **Step 4: Resolve role after the PKCE exchange**

In `src/app/auth/callback/route.ts`, do not compute the destination before exchanging the code. After a successful exchange, call `getViewer()` and require an authenticated viewer:

```ts
const viewer = await getViewer();
if (!viewer.role) return failure();
const destination = safeAuthDestination(
  searchParams.get("next"),
  origin,
  viewer.role,
);
return authRedirect(destination);
```

Apply the same viewer/destination logic when a repeated callback already has a valid session. A user with `next=/admin` must fall back to `/app`; an admin with the same `next` may enter `/admin`.

- [ ] **Step 5: Verify static behavior**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: all commands exit `0`; no route imports the browser Supabase client for authorization.

- [ ] **Step 6: Commit route guards**

```bash
git add src/app/page.tsx src/app/auth/page.tsx src/app/app/page.tsx src/app/auth/callback/route.ts src/app/_components/live/login-form.tsx src/hooks/use-auth-form.ts src/stores/auth-store.ts
git commit -m "feat(auth): route users by application role"
```

### Task 4: Build The Approved Admin And 403 Views

**Files:**
- Create: `src/app/admin/page.tsx`
- Create: `src/app/forbidden/page.tsx`
- Create: `src/app/_components/admin/admin-shell.tsx`
- Create: `src/app/_components/auth/forbidden-panel.tsx`
- Create: `src/app/admin.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/hooks/use-account.ts`
- Reference: `docs/previews/2026-11-02-admin-role-shell.html`

**Interfaces:**
- Consumes: `getViewer()` from Task 2 and the approved Task 1 preview.
- Produces: `<AdminShell name: string />`.
- Produces: `<ForbiddenPanel />`.
- Produces: `/admin` guest redirect, user redirect to `/forbidden`, and admin render.
- Produces: `/forbidden` guest redirect, user render, and admin redirect.

- [ ] **Step 1: Add server guards for `/admin` and `/forbidden`**

Implement `src/app/admin/page.tsx`:

```tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/app/_components/admin/admin-shell";
import { getViewer } from "@/lib/auth/authorization";

export const metadata: Metadata = { title: "Quản trị" };

export default async function AdminPage() {
  const viewer = await getViewer();
  if (!viewer.user) redirect("/auth?next=/admin");
  if (viewer.role !== "admin") redirect("/forbidden");
  const name = viewer.user.user_metadata?.full_name || viewer.user.email || "Quản trị viên";
  return <AdminShell name={name} />;
}
```

Implement `src/app/forbidden/page.tsx` with the same helper:

```tsx
const viewer = await getViewer();
if (!viewer.user) redirect("/auth");
if (viewer.role === "admin") redirect("/admin");
return <ForbiddenPanel />;
```

This route is the approved user-facing 403 experience. Future admin Route Handlers must return an actual HTTP `403` response for authenticated users without admin role.

- [ ] **Step 2: Implement the client sign-out behavior once per view**

Both client components use `useRouter()` and `useAuthStore`:

```ts
const signOut = async () => {
  setSigningOut(true);
  setError("");
  const result = await useAuthStore.getState().signOut();
  if (result.error) {
    setError(result.error);
    setSigningOut(false);
    return;
  }
  router.replace("/");
  router.refresh();
};
```

Render the exact content and controls from the approved preview. Admin placeholder navigation must use disabled/non-link elements with “Sắp có”; do not create dead links to unimplemented routes.

- [ ] **Step 3: Match the approved responsive preview**

Create `src/app/admin.css`, namespace selectors with `.admin-shell` and `.forbidden-shell`, and use only existing CSS variables such as `--cream`, `--brown`, `--olive`, `--forest`, `--sage`, `--butter`, `--orange`, `--crimson`, `--neu-raised`, `--neu-raised-sm`, and `--neu-inset`.

Import it from `src/app/layout.tsx`:

```ts
import "./admin.css";
```

Implement the desktop and mobile layouts exactly as approved in Task 1. Include `:focus-visible` and `prefers-reduced-motion` treatment.

- [ ] **Step 4: Make user-app sign-out return to landing**

In `useProfile.signOut`, after a successful store sign-out, navigate to `/` and refresh the route. Because hooks cannot call `useRouter()` conditionally, initialize it at the top of `useProfile`:

```ts
const router = useRouter();
```

Then complete successful sign-out with:

```ts
router.replace("/");
router.refresh();
```

Keep the existing error state and button behavior.

- [ ] **Step 5: Compare implementation to the approved preview**

Run the app and inspect these states at `1440x900` and `390x844`:

```text
Admin at /admin
User at /forbidden
```

Confirm copy, spacing, colors, navigation states, focus states, and responsive behavior match the approved Task 1 preview. Do not approve visual differences by assumption; update the preview and obtain approval first if requirements change.

- [ ] **Step 6: Run static verification**

```bash
npx tsc --noEmit
npm run lint
```

Expected: all commands exit `0`.

- [ ] **Step 7: Commit the views**

```bash
git add src/app/admin/page.tsx src/app/forbidden/page.tsx src/app/_components/admin/admin-shell.tsx src/app/_components/auth/forbidden-panel.tsx src/app/admin.css src/app/layout.tsx src/hooks/use-account.ts
git commit -m "feat(admin): add role-protected admin shell"
```

### Task 5: Document Supabase Role Operations And Verify The Release

**Files:**
- Modify: `README.md`
- Modify: `docs/superpowers/plans/2026-11-02-role-based-site-separation.md` only to mark completed checkboxes during execution
- Reference: `docs/specs/2026-11-02-role-based-site-separation.md`

**Interfaces:**
- Consumes: all routes and role behavior from Tasks 2-4.
- Produces: an operator procedure for granting, revoking, and urgently revoking admin access.

- [ ] **Step 1: Add the role and route model to README**

Document this exact matrix:

| Viewer | Default destination | Allowed private areas |
| --- | --- | --- |
| Guest | `/` | None |
| User | `/app` | `/app` |
| Admin | `/admin` | `/admin`, `/app` |

State that Google OAuth and email/password accounts start as users. State that only exact `app_metadata.app_role = "admin"` grants admin.

- [ ] **Step 2: Add the Supabase Dashboard runbook**

Document:

```text
Grant:
1. Let the selected person sign in once.
2. Open Supabase Dashboard > Authentication > Users.
3. Match both user ID and email.
4. Preserve existing app metadata and add "app_role": "admin".
5. Ask the user to sign out and sign in again.

Revoke:
1. Remove app_role or change it away from admin.
2. Ask the user to sign out and sign in again.
3. For urgent revocation, revoke the user's active sessions in Supabase Auth.
4. Confirm /admin shows the 403 experience and /app remains available.
```

Warn operators not to edit the system `role: authenticated`, not to use `user_metadata`, and not to overwrite provider metadata when editing app metadata.

- [ ] **Step 3: Run the manual authorization matrix**

Use one guest browser session, one normal account, and one selected admin account. Record the result for each case:

```text
Guest: /, /auth, /app, /admin, /forbidden
User: /, /auth, /app, /admin, /forbidden
Admin: /, /auth, /app, /admin, /forbidden
```

Also verify:

```text
Google OAuth account without app_role lands on /app.
Email/password account without app_role lands on /app.
User with next=/admin lands on /app.
Admin with next=/admin lands on /admin.
Admin can open /app directly.
External next URL, //host, control characters, /auth/callback, /, /auth, and /forbidden fall back to the role default.
Sign-out from /app, /admin, and /forbidden returns to /.
Revoked admin session loses /admin after refresh/re-login; urgent revoke uses session revocation.
```

Do not place real emails, user IDs, access tokens, or secrets in committed files or chat output.

- [ ] **Step 4: Run the complete static verification**

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Expected: typecheck, lint, build, and diff check exit `0`. Status may still show the pre-existing user-owned `package-lock.json` modification; do not stage or revert it.

- [ ] **Step 5: Review the implementation against the spec**

Inspect the final diff and confirm:

```text
No migration or RLS file changed.
No role is read from user_metadata, provider, email, domain, body, query, or custom cookie.
No service key appears in client code.
Every admin page checks getViewer() on the server.
No admin business API or fake admin metric was added.
Landing markup and design remain unchanged except its server redirect guard.
```

- [ ] **Step 6: Commit documentation**

```bash
git add README.md docs/superpowers/plans/2026-11-02-role-based-site-separation.md
git commit -m "docs(auth): add admin role operations"
```

Expected: `package-lock.json` remains unstaged.

## Sources Confirmed During Design

- Next.js 16.2.9 authentication guide: Proxy may perform optimistic checks, while secure authorization belongs close to the data source and inside Route Handlers.
- Supabase custom claims and RBAC guide: custom claims can drive authorization; data operations still require server/RLS enforcement.
- Supabase Auth admin metadata documentation: administrators can set `app_metadata`; users cannot set it through the normal client update API.
- Repository source: `src/proxy.ts`, `src/lib/supabase/middleware.ts`, `src/lib/auth-navigation.ts`, `src/app/auth/callback/route.ts`, `src/stores/auth-store.ts`, and current route pages.
