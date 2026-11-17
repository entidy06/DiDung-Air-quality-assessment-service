# Accessibility review

Assessment date: **16 November 2026**. Baseline: local source `7fddaabf7ea5451b1d0cb22f85ac47ae30cc6032`. This review combines reproducible token calculations, static source inspection and explicitly attributed parent-supplied production observations. **It does not establish a current-build runtime accessibility pass.** No browser session or screen-reader test was performed by this documentation run.

The [PA2 review](../pa2/accessibility-review.md), dated 2 November, is historical design evidence. Its Figma observations and limited PASS results do not establish PA3 implementation behavior. The [parent browser record](browser-evidence.md) describes a separate deployment session on 16 November; its deployment SHA was not verified, and its public live-looking cards/auth layout differ from this local source.

## Contrast calculation from current tokens

Colors come from [design.md §1–2](../../../design.md) and [globals.css](../../../src/app/globals.css), lines 7–44. Uses were checked against [experience.css](../../../src/app/experience.css), especially lines 15–17, 65–72, 87–101, and global `.button.primary` at line 255. The actual active auth/dashboard stylesheet overrides generic primary styling.

For each 8-bit sRGB channel, set `c = channel / 255`; linearize as `c / 12.92` for `c <= 0.04045`, otherwise `((c + 0.055) / 1.055)^2.4`. Relative luminance is `L = 0.2126 R + 0.7152 G + 0.0722 B`. Contrast is `(max(L1,L2) + 0.05) / (min(L1,L2) + 0.05)`, following [W3C's definition](https://www.w3.org/TR/WCAG22/#dfn-relative-luminance). Ratios below were recalculated with a one-off Python arithmetic command using these hex values; no test files or dependencies were created. Decisions use the unrounded result.

| Foreground / background | Ratio | Actual source use / interpretation |
|---|---:|---|
| Brown `#6E3511` / cream `#FCECD8` | **8.314707:1** | Main text, labels, cards. Meets 4.5:1 for this opaque pair. |
| Brown / butter `#F1E5A1` | **7.550456:1** | Advice/mid-category surfaces. Meets 4.5:1 for this pair. |
| Brown / sage `#91AC67` | **3.807128:1** | Good-category pill uses sage with inherited brown at 13px bold. Below 4.5:1; that text size is not large text. Static source finding. |
| Cream / olive `#597928` | **4.326323:1** | `.exp-primary`, current dashboard nav item and pressed trend buttons. Below 4.5:1 for normal text. This is a static contrast defect in these declared opaque styles, pending confirmation of rendered state/cascade. |
| Cream / forest `#486C2F` | **5.237105:1** | Primary hover and skip-link pair. Meets 4.5:1 for this pair. |
| Brown / orange `#EF6905` | **3.069697:1** | `.exp-orange` add/save button and sensitive-category pill. Below 4.5:1 for normal text; neither is declared large enough to use the 3:1 exception. |
| Cream / crimson `#8B2626` | **7.544170:1** | Unhealthy pill. Meets 4.5:1 for this pair. |
| Crimson / cream | **7.544170:1** | Error text. Meets 4.5:1 for this pair. |
| Forest / cream | **5.237105:1** | Action links and focus outline against cream. Strong pair; this alone does not prove indicator visibility against every adjacent color or shadow. |
| Olive / cream | **4.326323:1** | Large AQI numeral (66px desktop/58px narrow layout) meets the large-text 3:1 contrast threshold for this pair. Smaller olive text requires separate assessment. |
| `--light` / olive: `#FFF9F0` / `#597928` | **4.787306:1** | Generic landing `.button.primary` uses `--light`, unlike `.exp-primary`'s cream. Matches the PA2 login-design calculation for its recorded colors, not the current local auth button. |

[WCAG contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) uses 4.5:1 for normal text and 3:1 for large text (at least 18pt regular or 14pt bold). A 4.326323 ratio must not be rounded up to 4.5. These opaque-pair calculations do not include disabled opacity, anti-aliased pixels, gradients, shadows or map tiles. Browser inspection must identify the effective foreground/background and text size for each use. Neumorphic shadow alone is not evidence of sufficient control-boundary contrast.

No palette or UI was changed. A future contrast correction would require the repository's mockup/approval workflow; it is outside this documentation task.

## Checklist: source evidence versus runtime evidence

| Criterion | Static evidence in this revision | Result / evidence limit |
|---|---|---|
| Text contrast at least 4.5:1 | Token calculations above, `.exp-*` controls and pill styles | **Several static gaps identified.** No whole-screen contrast PASS. Parent needs rendered confirmation of each affected selector and state. |
| Information beyond color | `AirCard` includes numeric AQI, category, PM2.5/unit, model/source and valid time; threshold rows say enabled/disabled; forecast/history buttons have names and pressed state; dashed versus solid chart paths | **Supported by source.** Parent public-card observation also includes value/category/unit/time, but applies only to that deployment card. Map markers themselves remain colored symbols; check popup discoverability and equivalent access. |
| Keyboard operation | Native buttons, select, inputs, links; shared skip link in [layout.tsx](../../../src/app/layout.tsx), line 22; map popup uses an actual button | **Partial source support / runtime pending.** No complete Tab/Shift+Tab, select, chart toggle, threshold CRUD or map keyboard walkthrough on this build. Native semantics do not prove focus order, no trap or popup access. |
| Visible focus | Global focus rule: [globals.css](../../../src/app/globals.css), lines 142–145: 3px forest/6px offset; auth/dashboard rule: [experience.css](../../../src/app/experience.css), line 6: 2px/3px offset; admin stylesheet has a focus-visible rule | **Style exists; current-build runtime pending.** Global rule does not include `select`, but the active auth/dashboard rule does. Check cascade and overflow clipping, including map controls. |
| Visible labels and input names | [LoginForm](../../../src/app/_components/live/login-form.tsx), lines 11–12, uses `htmlFor`/IDs; dashboard area select has explicit label; threshold inputs are nested in labels | **Supported by source.** Placeholder is supplementary. Accessible names and repeated row action context require accessibility-tree inspection. |
| Corrective errors and announcements | Auth and threshold errors use `role=alert`; success/confirmation uses `role=status`; threshold hook explains integer AQI/0.1 PM2.5 and missing location; callback helper explains expired/used/denied flow | **Partial.** Form errors are not connected by `aria-describedby`/`aria-invalid`; no explicit focus transfer to the invalid field appears. Raw provider errors may be less actionable. Dashboard resource errors show text; most cards provide no explicit retry action. Actual announcements are unverified. |
| Chart equivalent content | SVG title/description and caption; `chartPresentation` description gives period, point count and timezone | **Partial.** It does not list all hourly values or offer a data table in active `TrendCard`. No screen-reader result is claimed. |
| Map alternative | Area selector remains usable when token/map fails; popup contains values, category and timestamps | **Partial.** Selector substitutes location selection, not a simultaneous readable list of all snapshot values. Marker/popup keyboard reachability remains pending. |
| Responsive 390px | At 900px sidebar becomes horizontal/wrapped; at 700px auth and dashboard grids become one column; at 420px AQI text/gaps shrink. Threshold rows/forms wrap. | **Source support, authenticated runtime pending.** At mobile width CSS visually places advice before trend while DOM has trend first: inspect reading/focus order consistency. Long area names, account names and errors need runtime checks. |
| Responsive 1440px | Auth split grid; dashboard 225px sidebar and two-column cards; fluid SVG and bounded content | **Source support, authenticated runtime pending.** No evidence yet of long-content/error/map states at 1440px. |
| Reduced motion | Demo timers skip initial reduced-motion preference; global reduced-motion rules and `.exp-button` transition override | **Source support only.** Dynamic preference changes, all animation paths and assistive impact were not exercised. |
| Language and structure | Root `lang="vi"`; named main/sections/nav; visible headings and status messages | **Source support.** Report prose is English; product UI is Vietnamese. Accessibility tree/landmark traversal is not yet verified. |

Keyboard criteria were checked against [W3C Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html); viewport checks must also be distinguished from [W3C Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html). A 390px screenshot alone does not demonstrate 320 CSS px or zoom reflow compliance.

## Existing deployment observations, attributed to the parent

The preserved [browser evidence](browser-evidence.md) and [JSON](evidence/browser-observations.json) record:

- Landing widths 1440/390 had document scroll widths 1425/375; login at 390 had scroll width 375. No document-level horizontal overflow was measured **in those states**. The 15px difference is not evidence about all overflowing descendants or all screens.
- Eight sequential desktop-login Tab targets, from skip link through navigation to login-mode control, had computed 3px forest outlines with 6px offset. A further Tab/Enter switched to registration. This is a limited keyboard path, not all-functions verification.
- Production login email/password had visible associated labels, required/type/autocomplete properties; signup minLength was six. No credentials were submitted and no account was created.
- Public AQI displayed text in addition to color. Sampled text/body colors match brown/cream tokens; the forecast toggle used forest on cream. Transparent backgrounds require ancestor/background analysis before contrast claims.

The images were inspected during this run: [landing desktop](evidence/landing1440.png), [mobile](evidence/landing390.png), [login desktop](evidence/login1440.png), [mobile](evidence/login390.png), [signup](evidence/signup1440.png), [air](evidence/chapter-air1440.png), [trend](evidence/chapter-trend1440.png), [alert](evidence/chapter-alert1440.png), and [map-named file](evidence/map1440.png). The last contains a collapsed disclosure/weather region; there is no expanded-map proof. No authenticated dashboard screenshot is present. The later parent-supplied [Figma captures](figma-evidence.md), SCR-01–07, were also inspected here; they provide design images, not current runtime accessibility evidence. Their editor-fit viewport captures do not establish 390/1440 CSS viewport behavior or computed colors.

## Exact outstanding browser steps for the parent

These are manual verification instructions, **not executed test results or newly created automated tests**. Use an authorized account/test-data context; record URL, date, browser/version, CSS viewport, zoom, role, build/deployment SHA and state with every capture. If the deployed revision cannot be matched, label it separately from the source baseline.

| Step | Procedure and evidence to retain | Expected assessment |
|---|---|---|
| P1 — Match build and image references | Confirm deployed commit. Capture anonymous `/`, `/auth` login/signup and authenticated `/app` overview, forecast/history, expanded map and threshold region at **390×844 and 1440×1000 CSS px**, zoom 100%. Use the supplied SCR-01–07 Figma captures as design references; obtain named-version/original-resolution exports if document readability requires them. Saved-location/profile-specific design evidence is still absent. | Produce images representing the claimed screen/revision; do not reuse public chapters as dashboard evidence. |
| P2 — Layout and states at both widths | Inspect `innerWidth`, document `scrollWidth`, visible clipping and each control rectangle. Use long catalog/account/error text. Observe loading, empty, stale, API error, expired-session, no-map-token and map-failure states in a safe browser/network setup. Inspect wrapping, sticky elements, footer, chart labels/units and map controls. | No lost information/actions or accidental page-level horizontal scroll; record component-specific exceptions. A screenshot of one state is not all-state proof. |
| P3 — Keyboard/focus | Tab and Shift+Tab from skip link through every nav link, area selector, trend controls, map navigation/markers/popups, threshold form/row actions and sign-out. Use native select arrows, Enter/Space where appropriate and Escape for any popup/overlay. Inspect focus after toggle, edit, cancel, removal and error; check visual versus DOM order on mobile. | Every function reachable; visible unobscured focus; no trap; logical order/return point. Record any action requiring pointer-only interaction. |
| P4 — Labels/errors and announcements | Inspect accessibility tree for form names, roles, values and button context. With screen reader, submit blank/bad email, short signup password, blank/nonpositive/fractional AQI/off-step PM2.5; observe native versus hook error. Exercise safe API failure/expired-session states without changing another user's data. | Corrective error is understandable, associated with field and announced once; focus preserves task context. Do not treat presence of `role=alert` as proof. Mutating flows require an authorized disposable rule/account. |
| P5 — Rendered contrast | Measure computed foreground, effective background, opacity, weight and size for auth submit, pressed forecast/history, current nav, orange submit, good/sensitive/unhealthy pills, labels/source/time, errors, focus and placeholders; include hover/focus/disabled states. | Compare exact ratios to applicable text/non-text criteria. Confirm the static 4.326323/3.807128/3.069697 findings or explain any cascade difference. Save computed values and selectors. |
| P6 — Equivalent information | Read chart via accessibility tree/screen reader, compare all hourly values with visible graph; reach map readings without dragging/hover. Check missing-data presentation and textual stale/source/time cues. | State explicitly whether chart/map content has an adequate equivalent; count-only descriptions and a location-only selector may be insufficient. |
| P7 — Reflow beyond requested viewports | Separately check 320 CSS px and zoom 200%/400%, increased text spacing and reduced motion. Identify genuinely two-dimensional map/chart exceptions and ensure surrounding controls/text reflow. | Report reflow separately from 390/1440 checks; record loss/overlap and motion behavior. |

There is no human peer approval or whole-application accessibility certification in this evidence set. The documented contrast gaps and pending checks remain visible for review; this deliverable is the assigned assessment, not an implementation fix.
