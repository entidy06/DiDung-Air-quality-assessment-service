# Connect src frontend to existing backend

User explicitly directs implementation in src and deletion of frontend artifacts in docs/design; no further preview gate. Existing UI palette/layout is retained. Execute inline; no new test files or package upgrades.

- [x] Add typed same-origin API Model and presentation helpers, abortable resource ViewModel, shared location selection.
- [x] Connect current AQI/weather/advice/history/forecast and snapshot map to public endpoints. Keep fixtures solely on /demo.
- [x] Initialize guarded Auth store; implement login/signup/signout and profile; connect thresholds CRUD and notifications/read with account isolation.
- [x] Update src UI/styles and navigation; remove misleading demo labels from live routes.
- [x] Typecheck/lint/build; public live API checks; independent read-only review. Never create real accounts or send email to verify. Report browser/auth limitations honestly.

Constraints: Views never fetch directly; no schema changes; no admin secret in browser; location/account changes invalidate old results; null differs from 0; no sample fallback for errors. Do not modify docs/design beyond requested deletions.

Verification: typecheck, lint and build passed. Public APIs returned HTTP 200 with 168 locations and actual current/weather/advisory/history/forecast/snapshot data; private GETs return 401 without a session. Live route GETs (air-quality, weather, forecast, map, notifications, profile, login) return 200; login includes real form markup and only /demo carries the demo banner. Read-only independent review found no critical/important defects. Browser inventory is empty/native pipe unavailable, so hydrated interactions, visual rendering and authenticated mutations have not been independently exercised. No accounts were created and no data was written to verify.

Requested docs/design frontend code/assets were deleted. Separate concurrent deletions under didung template were observed and left untouched; they were not part of this implementation. No commit or push performed.

Follow-up user requirement: all landing navigation except login now uses in-page anchors, including profile/account and map disclosure; standalone route files remain usable directly. Verified root HTML has 22 links, no missing anchor targets/duplicate IDs/new-tab links, and /login is the only non-fragment destination while signed out. OAuth query/fragment failures are normalized to the login card. Root code returns are forwarded to the server callback; browser auto-exchange is disabled so PKCE has one owner. Callback redirects use no-store and same-origin destinations, retaining an existing valid session on a repeated code callback. Login success returns to /#chapter-air. Reproducing the reported flow_state_already_used URL locally reaches the login form and specific recovery message. Callback error/missing-code cases return HTTP 307 to /login with no-store. Fresh typecheck/lint/build and read-only review pass. Real provider OAuth and Vercel deployment remain unverified; no Vercel project connection or token is available in this workspace.
