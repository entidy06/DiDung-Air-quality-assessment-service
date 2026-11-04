# DiDung — Weekly Status Report W5

26 Oct–1 Nov 2026 (UTC+7) · Prepared 04 Nov 2026 · v1.1

## Report Information

| Item | Value |
| --- | --- |
| Team | DiDung — Team 10 |
| Week | W5: 26 Oct–1 Nov 2026 (UTC+7) |
| Date of meeting | 27 Oct offline meeting is reported in W4; time, minutes and decisions require confirmation (Q5). |
| Current phase / PA | PA2 — Requirements & SRS; conditional preparation for PA3. Gate not verified as passed. |
| Prepared by | Võ Đình Cao Minh Hào (24127035); AI-assisted draft. Prepared 04 Nov 2026, v1.1. Hào reviews and edits all content before finalization; confirmation pending. |
| Overall status | AMBER (proposed): draft AC/RTM/review evidence exists; business-rule decisions, current independent approval and delivery evidence remain open. |

Reporting cutoff: 1 Nov 2026 23:59:59 UTC+7. W6 is 2–8 Nov. This report is prepared on 4 Nov; later updates are labelled separately. N/V = not verified, not 0%.

Internal W5 reporting target: Wednesday 4 Nov 2026, 22:00 UTC+7 (DID-60). This is a planning/internal deadline, not a confirmed Moodle PA2 deadline. The template requires repository storage; weekly reports are not submitted on Moodle. [S1/J60]

PA1 is used where it supersedes PA0: AQI/PM2.5-first MVP; tide/flood remains excluded pending validated source/change control. The supplied PA0 and PA1 URLs point to the same PA0 file; the distinct PA1 PDF in the repository is used as the scope source. [S2/S8]

## Task Status

| WBS / task | Owner | Planned finish | Status | % done | Notes |
| --- | --- | --- | --- | --- | --- |
| DID-40–46 / 49; Scope, FR/NFR/BR, UC specs | Tiến / Hiếu | 29 Oct–1 Nov* | Baseline pending | N/V | PA1 scope; BR-01/03/05 open. [S2/S3] |
| DID-47; Must-have AC | Hào | 30 Oct* | Draft attached 1 Nov | N/V | 25 G/W/T AC reported; FR-01–10, UC-01–11. Review pending. [J47] |
| DID-48; Use-case model | Hào | 30 Oct* | Draft / review pending | N/V | 14 listed UCs, 11 Must; diagram/spec revision review needed. [S3/S4] |
| DID-50–52; Prototype / accessibility | Đạt | 30 Oct–1 Nov* | Link integrated; coverage pending | N/V | PR #10 / d079517 adds Figma URL; not screen conformance. [P10] |
| DID-53; RTM / orphan audit | Hào | 31 Oct* | Draft attached 31 Oct / 1 Nov | N/V | Must FR→UC/AC; PA3/PA4 TBD; owner-reported earlier approval only. [J53] |
| DID-54; SRS review | Hào / peer | 1 Nov* | Desk review attached 1 Nov | N/V | AI-assisted review; direct independent responses pending. [J54] |
| DID-57 / 58; Integrate / deliver PA2 | Hiếu / Đạt | 3 Nov* (W6) | Not evidenced at W5 close | N/V | Main pa/PA2 contained .gitkeep at d73a715. [S5] |
| DID-59 / 60; Weekly reports | Hào | W4: 28 Oct; W5: 4 Nov 22:00 | W4 committed; W5 in preparation | N/V | W4 commit d73a715 on 29 Oct; W5 human review pending. [S4/J60] |

* Planned dates are reconstructed from W4 planning/task descriptions, not verified Moodle dates. Current Jira fields may have changed in W6; no current Done status is treated as a W5 completion. Unknown percentages remain N/V.

W5 delivery evidence: PR #9 merged 29 Oct and PR #10 merged 31 Oct into feature/backend-infra-mvp, not main. Commit bc8ada9 concerns the landing/authenticated interface; d079517 adds the Figma URL. These are source/link changes, not proof of implemented or accepted FRs. [P9/P10]

W5 requirements evidence: Jira DID-47 has a 1 Nov attachment and a comment describing 25 draft Must AC; DID-53 has RTM attachments dated 31 Oct/1 Nov; DID-54 has 1 Nov review attachments explicitly described as AI-assisted desk review, not independent human review. [J47/J53/J54]

PA2 gate at W5 close: NOT VERIFIED AS PASSED. Main at d73a715 contained no PA2 SRS deliverable beyond .gitkeep; draft traceability exists, but BR decisions, independent approval and delivery evidence remain open. A draft is not a frozen baseline. [S5/J53/J54]

Post-period update (2–4 Nov): PA2 PDF was committed 3 Nov as 87c3e40; current SRS contains later AC/screen changes and owner-reported earlier approvals. Earlier approval is not transferred to additions or to W5. Current evidence index still records review/delivery gaps. These updates do not increase W5 throughput. [S3/S6/S7]

PA3 handoff — conditional, not approved: carry FR-01/02→UC-08 (ingestion/validation); FR-03/04/05/10→UC-01/02/03/09/10 (AQI/map/history/forecast/states); FR-06/07→UC-04/05/06 (auth/preferences); FR-08/09→UC-11/07 (evaluation/notices). Hiếu proposes architecture/API/schema/cron contracts; Tiến closes BR/scope; Đạt validates screen/state links; Hào carries AC and risk-based PA4 backlog. PM must confirm owners and dates.

PA3 entry conditions proposed: versioned SRS/RTM/AC with direct review; explicit disposition of BR-01/03/05; approved FR/UC/screen gaps and source assumptions; dependency/owner/date list. Design-element IDs remain TBD—PA3, and test-case/execution IDs remain TBD—PA4 until those artifacts exist. No TA approval is claimed or required as evidence of this team review.

## Plan for Next Week

| WBS / task | Owner | Planned finish |
| --- | --- | --- |
| Close PA2 gate gaps; version SRS/RTM/AC; confirm BR-01/03/05 and optional scope. DID-40/43/46/47/53/54. | Tiến + Hiếu; Hào QA | Before PA3 baseline; exact date pending |
| Integrate same-version editable/PDF PA2 and evidence; capture direct review and Moodle receipt if submitted. DID-56/57/58. | Hiếu + Đạt | 3 Nov planning target; actual evidence required |
| PA3 handoff: FR/UC→architecture, API/data/auth contracts, UI states, owners and PA4 test backlog. Keep unapproved decisions explicit. | Hiếu technical; Tiến BA; Đạt UX; Hào QA | W6 (2–8 Nov), PM to confirm |
| W5: Hào reviews/edits; send Nguyễn Thành Đạt v1.1 for independent review; resolve feedback, commit/link final revision. DID-60. | Hào; Đạt reviewer | 4 Nov 22:00 internal target; approval pending |

W6 plan is consolidated at preparation time, not evidence of a plan approved at W5 close. The 3 Nov integration target is historical planning, not a newly promised date or official Moodle deadline. See Q6 for actual delivery and confirmed PA3 scheduling.

## Issues and Risks

| ID | Description | Impact | Action | Owner | Due |
| --- | --- | --- | --- | --- | --- |
| R1 | BR-01/03/05 unresolved: standard, freshness, comparator/equality/dedup. | High: AC cannot be signed off. | Record rules with examples and source; revise AC/RTM (Q1/Q2). | Tiến + Hiếu | Before baseline |
| R2 | Prototype/RTM coverage gaps: forecast, saved locations and error states. | High: design may diverge from Must FRs. | Verify frame-level FR/UC/AC links; log gaps (Q3). | Đạt + Hào | Before PA3 handoff |
| R3 | Independent review/delivery trail incomplete; Jira Done is not proof of DoD. | High: gate and teamwork evidence weak. | Pin version, reviewer response, fixes, commit/PR and receipt (Q4/Q6). | Hiếu + owners | Before gate closure |
| R4 | Source feasibility / NFR targets have no complete acceptance evidence. | Medium: misleading data or infeasible target. | Provide source samples/provenance, quota/licence assessment and verification plan (Q2). | Hiếu + Hào | Before PA3/PA4 |
| R5 | Deadline ambiguity and missing historical metrics/meeting record. | Medium: inaccurate timing or progress claims. | Keep internal W5 deadline separate from Moodle; obtain Q5/Q6/Q7. | Hiếu + team | Before final W5 approval |

Owners/actions above are proposed follow-ups unless already established by the linked Jira issue. The current SRS flags forecast units/horizon and saved-location coverage gaps; these are current handoff risks, not retrospective proof that W5 implementation failed. [S3]

## Meeting Minutes

| Member | Present | Done since last meeting | Next | Blockers |
| --- | --- | --- | --- | --- |
| Trương Lê Trung Hiếu | W4-reported; confirm Q5 | Not recorded as spoken update | Confirm meeting/actions and PA2 gate | Q1/Q5/Q6 |
| Trần Minh Tiến | W4-reported; confirm Q5 | Not recorded as spoken update | Confirm BR decisions and baseline | Q1 |
| Nguyễn Thành Đạt | W4-reported; confirm Q5 | Not recorded as spoken update | Validate frames; review W5 v1.1 | Q3/Q4 |
| Võ Đình Cao Minh Hào | W4-reported; confirm Q5 | Not recorded as spoken update | Review/edit W5; track peer feedback | Q4/Q7 |

W4 records an offline meeting on 27 Oct with all four members, agreement on UI/template direction and exploratory flood/tide source research. This is a secondary, team-reported record; no independent W5 minutes/time/attendance evidence was supplied. The table is a confirmation checklist, not reconstructed spoken minutes. Prototype coverage in W4 is reported, not acceptance-tested. Ask Q5 before finalizing. [S4]

The 3 Nov meeting recorded in later repository files belongs to W6 and is excluded from W5 attendance and decisions. No new meeting or TA approval is asserted.

## Metrics

| Metric | This week | Total |
| --- | --- | --- |
| Tasks completed (Jira) | Unknown team-wide; no verified full-project Done-transition export for W5. | Unknown; do not infer from current Done states. |
| Commits on historical main | 1: d73a715 (W4 report), 29 Oct 09:43 UTC+7. | 35 reachable commits at main cutoff d73a715. |
| Commits across fetched reachable history | 5 unique SHAs dated W5: 3 non-merge + 2 merge; includes feature-branch work. | Not calculated. This overlaps main; do not add the two counts. |
| Pull requests merged / formal reviewed | 2 merged (#9/#10) into feature/backend-infra-mvp; 0 submitted GitHub reviews on those PRs in API readback. | 10 merged PRs through W5; cumulative review count not calculated. |
| CI workflow runs | 3/3 observed runs succeeded: 40451690254, 40808051306, 41161681422. | 10 successful runs observed through W5; count is workflow runs, not tests. |
| Functional / E2E / acceptance results | Not verified. CI success is not functional-test evidence. | Unknown; no pass rate claimed. |
| Open defects (PA5) | Not measured / no verified defect register. | Unknown; not zero. |
| Draft requirement coverage | 1 Nov Jira comment reports 25 Must AC mapped to FR-01–10; review pending. | Document coverage only; no implementation-completion percentage. |

Counting window: [25 Oct 2026 17:00:00Z, 1 Nov 2026 17:00:00Z). Commits are counted by committer timestamp; PRs by merged_at; CI by created_at. Main cutoff SHA: d73a715307a8a76558b86d9fe0068d53320ca897. Reachability was checked from fetched current refs on 4 Nov; branches outside those refs are not covered.

The five W5 SHAs are bc8ada9, d73a715, f2618e3, d079517 and 2a72d6b. Only d73a715 was on historical main at cutoff; the feature-branch commits reached main later. Cumulative main = 35 SHA; merged PRs through cutoff = #1–#10. Counts are overlapping views, not effort/productivity scores.

CI readback: 1 push + 2 pull_request runs. Successful checks are npm install, typecheck, lint and build; no functional/E2E/acceptance test step is evidenced. Cumulative runs through W5 = 10 in the observed API dataset (16 runs total at read time). No test-pass claim. [C1/C2/C3]

Both PR #9 and #10 have empty submitted-review lists in API readback; merge is not approval. This does not rule out discussion elsewhere, which needs a direct link. [G1/G2]

## Open Information and Review Requests

| ID | Provider | Question | Required response |
| --- | --- | --- | --- |
| Q1 | Tiến (BA), Hiếu (PM); DID-40/44/46/49 | Which SRS revision is the PA2 baseline? Confirm BR-01 AQI scale/calculation reference; BR-03 freshness per source; BR-05 comparator (> or ≥), equality, crossing vs sustained exceedance, eligible inputs and dedup event/window/timezone. Decide FR-11–13 deliver/defer and UC-12 actor. | Return dated decision table: ID, chosen value/rule, rationale/source, effective version, decision maker, examples at below/equal/above threshold and replay. Link Jira/Docs reply. |
| Q2 | Hiếu (technical/source), Hào (QA); DID-43/45 | Which deployed provider/model/domain and HCMC coverage are used? Are data observed or modeled? What source/update/issue times, grid resolution, history semantics, refresh/quota, attribution and licence fit apply? Which NFR targets are agreed? | Provide non-secret sample request/response with coordinates/units/timestamps/provenance, source assessment/version, quota estimate, agreed NFR environment and measurement plan. No production/test-pass claim without evidence. |
| Q3 | Đạt (Designer), Tiến / Hào; DID-50–53 | For each Must FR/UC, which versioned Figma frame/state satisfies the AC? Resolve FR-05 PM2.5 1–6h vs 24h AQI chart; FR-07 account-owned saved-location CRUD; loading/empty/stale/error/auth states. Which responsive/accessibility checks exist? | Return FR→UC→AC→SCR/frame URL matrix, desktop/mobile/error-state links, gap disposition, owner and date. Include measured contrast results and keyboard evidence only if actually checked. |
| Q4 | Đạt (W5 independent reviewer); Hào (editor); DID-60 | Please read W5 v1.1. Are timeframe, counts, source links, PA2 gate, PA3 handoff, meeting attribution and pending labels accurate? Identify any unsupported claim or missing material task. | Reply on DID-60 or PR with exact version/commit reviewed, finding ID + section + severity + requested fix. After fixes, recheck and explicitly Approved or Changes requested; record actual date. Nguyễn Thành Đạt is the final reviewer; approval is pending his actual response. |
| Q5 | Hiếu (chair), all four members | W4 reports an offline meeting on 27 Oct. Did it occur; at what time/place, who attended, what was actually decided and which actions were assigned? Is there a signed/acknowledged minutes link? | Provide actual timestamp/timezone, attendance confirmation, minutes/chat link, decisions and action→owner→due date. Do not treat prototype coverage mentioned in W4 as verified acceptance. |
| Q6 | Hiếu (integration), Đạt (submission); DID-56/57/58 | What is the official Moodle PA2 deadline? Was PA2 submitted; which exact source/PDF revision and when? Which reviewer approved that revision? Which PA3 owners/dates are committed? | Provide Moodle instruction screenshot/link and receipt/timestamp, artifact checksum or commit, editable/PDF links, direct reviewer response and PA3 task IDs. Internal W5 deadline remains 4 Nov 22:00 UTC+7. |
| Q7 | All task owners; Hiếu consolidates | Which tasks actually transitioned Done during 26 Oct–1 Nov UTC+7, and which were reopened? Were deadlines revised? Are defect/worklog data available? | Provide Jira history/export covering 25 Oct 17:00Z to 1 Nov 17:00Z, issue/owner/transition time and linked deliverable; state counting policy. Supply defect register or explicitly confirm not measured. |

## Review and Confirmation

| Item | Status / evidence |
| --- | --- |
| Hào review/edit | AI drafts information; Võ Đình Cao Minh Hào reviews and edits all content before finalization. Full review/edit confirmation: PENDING. |
| Independent reviewer | Nguyễn Thành Đạt — final reviewer, selected by Hào on 4 Nov. Review requested on GitHub PR #13 (entidy06) and DID-60 (comment 10047): https://ntdat2428.atlassian.net/browse/DID-60?focusedCommentId=10047 . Response/findings/recheck/approval: PENDING. |
| Commit / PR | Report files: docs/management/weekly/W5-status.docx and .md. Draft PR #13: https://github.com/entidy06/DiDung-Air-quality-assessment-service/pull/13 . Initial draft commit 077703a; current PR revision supersedes it. Jira DID-60 comment 10047 records the review request. Final review/approval by Nguyễn Thành Đạt Pending. |
| Definition of Done | NOT COMPLETE while human review, feedback resolution/recheck and approval are pending. Saving a draft or Jira status does not establish completion. |

### Human findings / resolution / approval

PENDING — no human response received. Requested change, fix, recheck and approval: PENDING.

## AI Usage Log

04 Nov 2026 — ChatGPT / Codex drafts information for Võ Đình Cao Minh Hào. Hào reviews and edits all content before finalization; confirmation pending. Nguyễn Thành Đạt performs the final review; response/approval pending. Final review by Nguyễn Thành Đạt: PENDING.

## Sources and Evidence

[PR13] [W5 draft PR — final review by Nguyễn Thành Đạt pending](https://github.com/entidy06/DiDung-Air-quality-assessment-service/pull/13)

[RQ] [Review request sent to Đạt on DID-60](https://ntdat2428.atlassian.net/browse/DID-60?focusedCommentId=10047)

[S1] [W5 source template / editable target](https://docs.google.com/document/d/1-29jS-b2d2ea3FcrYXizpvpc4TxXDPqM/edit)

[S2] [PA1 scope baseline PDF (snapshot main at W5 close)](https://github.com/entidy06/DiDung-Air-quality-assessment-service/blob/d73a715307a8a76558b86d9fe0068d53320ca897/pa/PA1/10-PA1.pdf)

[S3] [PA2 current editable SRS (post-cutoff revisions; not a W5 snapshot)](https://docs.google.com/document/d/1iTCpN58SFBmOCvT7D1vweUxGFiGsulWX-SrgWzOt7lw/edit)

[S4] [W4 report at W5-close commit](https://github.com/entidy06/DiDung-Air-quality-assessment-service/blob/d73a715307a8a76558b86d9fe0068d53320ca897/docs/management/weekly/W4-status.docx)

[S5] [PA2 directory at W5 close](https://github.com/entidy06/DiDung-Air-quality-assessment-service/tree/d73a715307a8a76558b86d9fe0068d53320ca897/pa/PA2)

[S6] [PA2 PDF committed 3 Nov (post-period)](https://github.com/entidy06/DiDung-Air-quality-assessment-service/commit/87c3e40034da659f50eb2bf6f2ef14ff2500885f)

[S7] [Current PA2 evidence index (post-period follow-up)](https://github.com/entidy06/DiDung-Air-quality-assessment-service/blob/d6889483f1d24ee53310a2417880cbe23e18d222/docs/management/evidence/pa2-evidence-index.md)

[P9] [PR #9, merged 29 Oct 20:16 UTC+7](https://github.com/entidy06/DiDung-Air-quality-assessment-service/pull/9)

[P10] [PR #10, merged 31 Oct 12:07 UTC+7](https://github.com/entidy06/DiDung-Air-quality-assessment-service/pull/10)

[C1] [CI 27 Oct](https://github.com/entidy06/DiDung-Air-quality-assessment-service/actions/runs/40451690254)

[C2] [CI 29 Oct](https://github.com/entidy06/DiDung-Air-quality-assessment-service/actions/runs/40808051306)

[C3] [CI 31 Oct](https://github.com/entidy06/DiDung-Air-quality-assessment-service/actions/runs/41161681422)

[G1] [PR review records #9](https://api.github.com/repos/entidy06/DiDung-Air-quality-assessment-service/pulls/9/reviews)

[G2] [PR review records #10](https://api.github.com/repos/entidy06/DiDung-Air-quality-assessment-service/pulls/10/reviews)

[F1] [Figma URL added by PR #10; link alone is not acceptance](https://www.figma.com/design/Ev67pGKl766yRwq4R7nu7G/DiDung-design?node-id=24-30405)

[S8] [PA0 (the supplied PA0 and PA1 URLs are identical)](https://docs.google.com/document/d/11IxhwqvOTSptN0wZ0hy8ySXRs-u73quv/edit)

[S9] [W2 format reference](https://docs.google.com/document/d/1-Z1u09gkl1DwmIVCBBpIRGpjEUBZGOHRFgwAEjHhLdA/edit)

[J43] [Jira DID-43](https://ntdat2428.atlassian.net/browse/DID-43)

[J47] [Jira DID-47](https://ntdat2428.atlassian.net/browse/DID-47)

[J48] [Jira DID-48](https://ntdat2428.atlassian.net/browse/DID-48)

[J50] [Jira DID-50](https://ntdat2428.atlassian.net/browse/DID-50)

[J51] [Jira DID-51](https://ntdat2428.atlassian.net/browse/DID-51)

[J52] [Jira DID-52](https://ntdat2428.atlassian.net/browse/DID-52)

[J53] [Jira DID-53](https://ntdat2428.atlassian.net/browse/DID-53)

[J54] [Jira DID-54](https://ntdat2428.atlassian.net/browse/DID-54)

[J56] [Jira DID-56](https://ntdat2428.atlassian.net/browse/DID-56)

[J57] [Jira DID-57](https://ntdat2428.atlassian.net/browse/DID-57)

[J58] [Jira DID-58](https://ntdat2428.atlassian.net/browse/DID-58)

[J59] [Jira DID-59](https://ntdat2428.atlassian.net/browse/DID-59)

[J60] [Jira DID-60](https://ntdat2428.atlassian.net/browse/DID-60)
