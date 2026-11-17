# AI Usage Log — DiDung (Team Consolidated, Week 3)

> **Repository destination:** `docs/ai-usage/week3/team-logs.md`
> **Project:** DiDung — Air Quality Assessment Service
> **Class:** 24C05
> **Consolidated by:** Trần Minh Tiến (24127130)
> **Prepared for:** Course teamwork/process evidence and PA1 AI Usage Log
> **Consolidation date:** 21 October 2026

## Purpose and disclosure

This file consolidates the AI usage disclosures of the team members for PA0/PA1 work. Each member's section was written from that member's own account of their AI use. AI output was used as a drafting or analytical aid; it is **not** evidence of implementation, testing, acceptance or submission unless a linked project record confirms that action. Prompt descriptions are **paraphrased summaries**, not verbatim transcripts. Dates are ICT.

## Member overview

| Member | Student ID | AI tool(s) | Coverage | Status |
| --- | --- | --- | --- | --- |
| Trần Minh Tiến | 24127130 | Claude (Anthropic) | 10–12 Oct 2026 (topic, project description, PA0 Section 2); log drafting 21 Oct | Submitted (Section 1) |
| Võ Đình Cao Minh Hào | 24127035 | ChatGPT / Codex | 17 Oct 2026 (PA1 proposal and plan); log prepared 21 Oct | Submitted (Section 2) |
| Nguyễn Thành Đạt | 24127020 | ChatGPT (with connected Jira, GitHub, Google Drive tools) | 11–21 Oct 2026 | Submitted (Section 3) |
| Trương Lê Trung Hiếu | 24127169 | None | No AI use for his assigned tasks | No AI use declared (Section 4) |

---

## Section 1 — Trần Minh Tiến (24127130)

**AI tool:** Claude (Anthropic), chat interface. Web search was used only in the 10–11 Oct session (T-04); it was not used in the 12 Oct session.

| ID | Date (ICT) | Task | AI assistance and output | Evidence | Verification / remaining human actions |
| --- | --- | --- | --- | --- | --- |
| T-01 | 10 Oct 2026 | Brainstorm project ideas for a 4-person, 11-week SE course | Claude generated several rounds of ideas (everyday-life apps, LLM/AI apps, algorithm- and cryptography-based single-feature projects, data-science projects), each with scope notes and difficulty/risk hints. | [link to chat export 1] | Ideas are proposals only; feasibility was **not verified**. I set the selection criteria (feasible for 4 students, full lifecycle, easy to find users). |
| T-02 | 10 Oct 2026 | Narrow down to a full-lifecycle project | Claude proposed an air-quality monitoring and forecasting system, an 11-week roadmap and a lifecycle checklist (requirements → design → data → model → build → test → deploy → operate). | [link to chat export 1] | Roadmap is a planning suggestion, not the team's approved schedule. Team plan is in PA1. |
| T-03 | 10–11 Oct 2026 | Write the project description in the course template (main idea / main features / how each is implemented) | Claude merged two ideas (air quality + heavy rain/flood) into one description and revised it several times. Claude **misread one instruction** (simplified the whole project instead of changing only one detail); I pointed this out and it was corrected. | [link to chat export 1] | I decided to merge the two ideas, keep a web application and not use Telegram. Wording was reviewed and edited by me. |
| T-04 | 11 Oct 2026 | Check data sources: OpenAQ and Windy | Claude used web search and summarized the docs: OpenAQ v3 lists Vietnam, requires a free API key and has rate limits; Windy's free API key is for testing only and the paid plan is costly. | OpenAQ docs; Windy Community forum threads | **Not verified:** number and freshness of OpenAQ stations in HCMC. Windy pricing came from forum posts and may be outdated. I decided to keep Open-Meteo and use Windy at most for embedding a map. |
| T-05 | 11 Oct 2026 | Shorten the description and list APIs/reference sites per feature | Claude produced a shorter version with API names and reference websites. | [link to chat export 1] | I added my own ideas (mobile notifications, a "should I go outside today" advice feature, trying XGBoost/LightGBM/random forest). |
| T-06 | 11 Oct 2026 | Ideas to extend the project | Claude suggested stronger features (spatial interpolation of AQI, personalized time windows, forecasts with uncertainty, explanations, community feedback, PWA notifications). | [link to chat export 1] | Suggestions only, **none implemented**. Candidates to consider after the basic version works. |
| T-07 | 12 Oct 2026 | Draft PA0 Sections 2.1–2.4 (pitch, problem, target users, feature table) from my Vietnamese brief | I supplied the brief and the template screenshots. Claude drafted English text for the pitch, problem/motivation, target users and a feature table with Must-have flags. I then asked it to add high-tide flooding and fine dust as local problems and to rename the product "DiDung"; Claude revised the affected sections. | [link to chat export 2] | The product name, the added problems and the scope were my/our decisions. Feature priorities must be confirmed by the team. |
| T-08 | 12 Oct 2026 | Feasibility of tide forecasting and flooded-street prediction | Claude assessed that coarse tide forecasting is feasible, while street-level flood prediction is not without terrain and drainage data. It suggested district-level risk plus known flood hotspots collected from news (RSS) and rewrote features #1 and #3 accordingly. | [link to chat export 2] | **Not verified:** tide data sources (Open-Meteo Marine accuracy for the Saigon River, station data availability) and the news-collection approach. Claude advised checking these before committing. |
| T-09 | 12 Oct 2026 | Section 2.5 Similar Products | Claude listed air-quality, weather and navigation products used in Vietnam and described how DiDung differs. No web search was used. | [link to chat export 2] | **Not verified by search.** Product names and current features come from the AI's general knowledge; I must check each one before submission. |
| T-10 | 12 Oct 2026 | Sections 2.6–2.7 Platform, feasibility, scope, risks | Claude proposed a technology outline, in/out-of-scope lists, five main risks with mitigations and questions for the TA. | [link to chat export 2] | Tech stack is a proposal only (the template says "not final"). The team split, the 3-week estimate and OpenAQ station coverage are assumptions, not checked facts. |
| T-11 | 12 Oct 2026 | Consistency review of the feature table | I shared screenshots of my document. Claude found inconsistencies between the table and Section 2.7 (admin page marked Must-have, Dashboard left blank), a wording issue ("Advices"), a feature row split across pages, and suggested separating "nice-to-have" from "out of scope". | [link to chat export 2] | Must-have flags were corrected in the document. Re-check the wording, page break and the 2.7 split against the final submitted version. |
| T-12 | 21 Oct 2026 | Draft and consolidate AI usage logs | Claude drafted my log and merged it with my teammates' logs into this team file, based on the example log format and the PA1 consolidation task checklist. | This file | I reviewed it against the real conversations and filled in the missing fields. |

---

## Section 2 — Võ Đình Cao Minh Hào (24127035)

**AI tool:** ChatGPT / Codex. **Primary session date:** 17 October 2026. **Log preparation date:** 21 October 2026.
**Purpose:** Support the completion, review, formatting and validation of the PA1 Project Proposal and Plan.
**Disclosure basis:** The Project Guidelines and Rubric permit generative AI use when it is disclosed in each PA. The team remains responsible for understanding, checking and explaining all submitted work.

| ID | Task / purpose | AI output used | Verification and changes made |
| --- | --- | --- | --- |
| H-01 | Read the PA1 instructions and identify the required deliverables, ownership assignments, restrictions and submission expectations. | A structured checklist covering contribution assessment, Vision and Scope, Proposed Solution, Project Plan, Risk Management, Tools and Collaboration Setup, and the AI Usage Log. | Checked the checklist directly against the supplied PA1 instructions. The instruction not to create a Git commit was retained throughout the work. |
| H-02 | Review the available project evidence before drafting PA1 content. | A consolidated summary of the approved PA0 proposal, team roles, project scope, repository structure, weekly report evidence and known uncertainties. | Compared the summary with the PA0 PDF, README, repository files and Git status. Unsupported claims about CI, branch protection, deployment, data coverage and exact deadlines were removed or marked as planned, conditional or pending confirmation. |
| H-03 | Draft and integrate the PA1 sections assigned across the team. | Draft content for member contributions, Vision and Scope, Proposed Solution, the complete Project Plan, the risk register, tools/collaboration audit and the PA1 AI disclosure. | Reconciled the PA0 feature list with the narrower repository scope. Claims of real-time or street-level accuracy were avoided. Tide and flood functionality was made conditional and excluded from the MVP until a reliable source can be validated. Contribution values were checked to total exactly 100%. |
| H-04 | Develop the project-planning material required by the PA1 rubric. | A three-level WBS, phase gates, effort estimates, Gantt schedule, dependencies, critical path, roles with backups and a human-resource cost estimate. | Verified that the WBS contains at least three levels and assignable work packages. Checked the total effort as 280 hours, the labor subtotal as VND 33,600,000, the 15% contingency as VND 5,040,000 and the planning total as VND 38,640,000. Exact Moodle deadlines and the main developer assignment remain explicitly pending team confirmation. |
| H-05 | Prepare the PA1 risk-management and tools/collaboration sections. | An eight-item risk register with probability, loss, risk exposure, mitigation, contingency, trigger and owner; plus an evidence-based tools and repository audit. | Recalculated every risk exposure using `RE = P x L`. Checked each risk against the project scope and available evidence. Repository folders and processes that were not present were labeled as planned rather than reported as completed. |
| H-06 | Fill the supplied DOCX while preserving the university template. | A completed PA1 document using the existing template structure, embedded fonts, headings, colors, headers, footers, tables and page-number fields. | An initial formatting pass was rejected because it did not sufficiently preserve the template. The document was rebuilt using the original styles and Quattrocento Sans fonts. Table text sizes were normalized without replacing the template design. All document content was kept in English. |
| H-07 | Perform final document QA and pagination review. | Visual review findings and corrected table-of-contents page references. | Opened the DOCX in Microsoft Word and reviewed its print preview. Verified the cover, table layout, section transitions, headers, footers and 19-page pagination. Corrected the stored table-of-contents results to match footer pages: contribution 2, Vision 3-5, Proposed Solution 6-7, Project Plan 8-12, Risk Management 13-14, Tools and Collaboration Setup 15-16, and AI Usage Log 17. The DOCX archive passed an integrity test with no errors. |
| H-08 | Clean the workspace after producing the final document. | Identification of temporary scripts, a redundant generated DOCX and a transient Word lock file. | Deleted only the redundant generated copy, temporary helper scripts and lock file. Preserved the requested final deliverable and existing project files. Confirmed with `git status` that no commit had been created. |
| H-09 | Prepare this Markdown disclosure in the format expected by the Project Guidelines and Rubric. | A concise, auditable log separating the tasks performed, the AI assistance used and the human verification applied. | Checked the rubric's generative-AI requirements and the repository's `docs/ai-usage/week<week>/` convention. The log records material AI assistance without including private reasoning, credentials, API keys or confidential project secrets. |

**Human review and responsibility (Hào):**
- AI output was treated as a draft and review aid, not as authoritative project evidence.
- Assertions were checked against the PA1 instructions, PA0, the repository and the final DOCX rendering.
- Unknown facts were not presented as completed work; they were marked as assumptions, planned work, conditional scope or items requiring confirmation.
- No passwords, authentication tokens, API keys or confidential source-code secrets were included in the AI conversation.

---

## Section 3 — Nguyễn Thành Đạt (24127020)

**AI tool:** ChatGPT (including connected Jira, GitHub and Google Drive tools). **Coverage:** Selected AI-assisted work from 11–21 October 2026, including one earlier Week 2 activity cited for continuity.

| ID | Date (ICT) | Task / Jira reference | AI assistance and output | Evidence | Verification / remaining human actions |
| --- | --- | --- | --- | --- | --- |
| D-01 | 11–13 Oct 2026 *(Week 2)* | Initial AQI project feasibility research | ChatGPT analyzed the feasibility of an HCMC air-quality monitoring/forecasting web app within a short SE course; compared OpenAQ and Open-Meteo, source limitations, a persistence baseline versus optional ML, MVP features and delivery risks. | [Original Week 2 conversation export](https://github.com/entidy06/DiDung-Air-quality-assessment-service/blob/main/docs/ai-usage/week2/ntdat-logs.md) | **Evidence available:** original chat export. Recommendations were planning proposals, **not verified** API coverage, predictive accuracy or implemented features. This item is referenced from Week 2 and should **not be double-counted** as work done in Week 3. |
| D-02 | 19 Oct 2026 | PA1 Project Plan critique and revision — [DID-8](https://ntdat2428.atlassian.net/browse/DID-8), [DID-9](https://ntdat2428.atlassian.net/browse/DID-9), [DID-10](https://ntdat2428.atlassian.net/browse/DID-10), [DID-17](https://ntdat2428.atlassian.net/browse/DID-17), [DID-19](https://ntdat2428.atlassian.net/browse/DID-19) | ChatGPT supported a consistency review of Section 4: WBS hierarchy, effort sum, schedule/dependencies, critical path, roles and cost. The revised plan presents **260 person-hours**, labor **VND 31,200,000**, contingency **VND 4,680,000**, total **VND 35,880,000**. | [PA1 PDF](https://github.com/entidy06/DiDung-Air-quality-assessment-service/blob/main/pa/PA1/10-PA1.pdf); [PA1 Project Plan evidence issue](https://ntdat2428.atlassian.net/browse/DID-31) | **Document evidence available.** The numbers are *planning estimates*, not actual spending or time logs. Independently validate resource capacity, dependency assumptions, developer assignment and any changes to the latest source. Do not imply independent review from Jira `Done` alone. |
| D-03 | 20 Oct 2026 | Section 6 tools/collaboration checklist and Jira assignment — [DID-26–34](https://ntdat2428.atlassian.net/browse/DID-26) | ChatGPT helped turn the Section 6 evidence requirements into Vietnamese Jira descriptions: owners, checklists, deliverables, suggested dates and Definition of Done for Moodle, meetings, repository policy, AI logs, evidence index and test/CI planning. It also updated dates following explicit user instructions. | [DID-26 epic](https://ntdat2428.atlassian.net/browse/DID-26); [DID-27](https://ntdat2428.atlassian.net/browse/DID-27); [DID-28](https://ntdat2428.atlassian.net/browse/DID-28); [DID-29](https://ntdat2428.atlassian.net/browse/DID-29); [DID-30](https://ntdat2428.atlassian.net/browse/DID-30); [DID-34](https://ntdat2428.atlassian.net/browse/DID-34) | **Creation and assignment evidence available in Jira.** Assignees, internal due dates and task scope must be reviewed by the PM and actual owners. Creating an issue is **not** equivalent to completing its checklist. |
| D-04 | 20 Oct 2026 | README revision aligned with the updated PA1 stack — [DID-28](https://ntdat2428.atlassian.net/browse/DID-28) | ChatGPT edited the repository README to describe DiDung's current proposed stack: **Next.js + shadcn/ui**, **Next.js backend**, **Supabase managed PostgreSQL + pg_cron**, **Vercel/Supabase Cloud** and proposed **Vitest/Playwright/GitHub Actions**. The document also differentiated the PA0 rain/flood scope from PA1's air-quality-focused MVP. | [GitHub PR #2](https://github.com/entidy06/DiDung-Air-quality-assessment-service/pull/2); [README on main](https://github.com/entidy06/DiDung-Air-quality-assessment-service/blob/main/README.md) | **Verified in GitHub:** PR #2 was **APPROVED** by a different team member (GitHub account `tien140406`) and merged on 20 Oct. Stack choices are *planned*, not proof of running code. **Team clarified on 20 Oct:** rainfall is a forecasting input, not a standalone rain forecast; TA acceptance of the changed PA0 scope remains to be verified. |
| D-05 | 20 Oct 2026 | Add traceable planning-document evidence to Jira — [DID-31](https://ntdat2428.atlassian.net/browse/DID-31) | ChatGPT read the updated PA1 source and added descriptive evidence comments to DID-8, DID-9, DID-10, DID-17, DID-19 and DID-31, linking relevant document sections, planning calculations, assumptions and review requests. | [DID-8](https://ntdat2428.atlassian.net/browse/DID-8); [DID-9](https://ntdat2428.atlassian.net/browse/DID-9); [DID-10](https://ntdat2428.atlassian.net/browse/DID-10); [DID-17](https://ntdat2428.atlassian.net/browse/DID-17); [DID-19](https://ntdat2428.atlassian.net/browse/DID-19); [DID-31](https://ntdat2428.atlassian.net/browse/DID-31) | **Comment evidence available in Jira.** These are AI-assisted *documentation/tracing actions*, not attestations of review by Hiếu/Tiến/Hào. Confirm peer feedback and the exact source revision before marking review complete. |
| D-06 | 20–21 Oct 2026 | Week 3 status report content and formatting — [DID-16](https://ntdat2428.atlassian.net/browse/DID-16) | ChatGPT compared Jira/GitHub records and edited a Google Docs Weekly Status Report: task progress, risk register, next-week plan, metrics, source links, post-period updates, table of contents and visual formatting. The user separately supplied the **actual 20 Oct meeting attendance and decisions**, confirmed he authored W3, and specified **Wednesday 22:00 ICT** as the newly effective report deadline. | [Week 3 Google Doc](https://docs.google.com/document/d/1qeQC2pz2uVXHXMxiRVBBmhgjCgNvnuoBUA9gAr4zkXQ/edit); [DID-16](https://ntdat2428.atlassian.net/browse/DID-16); [PR #3 — PA1 PDF](https://github.com/entidy06/DiDung-Air-quality-assessment-service/pull/3) | **Edited-document evidence available.** Preserve W3's 12–18 Oct historical metrics separately from decisions made on 19–21 Oct. The Google Doc is **not evidence of a GitHub commit or timely submission**; PM review and actual W3 file/commit timestamp must be checked separately. |

---

## Section 4 — Trương Lê Trung Hiếu (24127169)

**AI tool:** None.

**Declaration of no AI use:** I did not use any generative AI tool (e.g., ChatGPT, Claude, Copilot, Gemini) for any of my assigned tasks in this project up to 21 October 2026. All of my contributions were produced by me without AI assistance, so there are no usage entries to report. If I use AI for project work in the future, I will record it in the AI usage log for that period.

| ID | Date (ICT) | Task | AI assistance and output | Evidence | Verification |
| --- | --- | --- | --- | --- | --- |
| — | — | — | No AI used | — | — |

---

## Cross-member notes

- **Plan figures differ between logs.** Hào's entry H-04 records a plan of 280 person-hours, labor VND 33,600,000, contingency VND 5,040,000 and total VND 38,640,000 (session of 17 Oct). Đạt's entry D-02 records a revised plan of 260 person-hours, labor VND 31,200,000, contingency VND 4,680,000 and total VND 35,880,000 (review of 19 Oct). These appear to refer to different versions of the PA1 plan; the authoritative figures are those in the submitted `pa/PA1/10-PA1.pdf`.
- **Scope.** PA0 covered air quality, rain and tide flooding. PA1 narrowed the MVP to air quality with rainfall as a forecasting input, and tide/flood functionality is conditional (Hào H-03, Đạt D-04). TA/lecturer acceptance of this change is pending verification.
- **Planned vs. implemented.** Technology choices (Next.js, Supabase, Vercel, Vitest/Playwright/GitHub Actions) are proposals. No log claims implementation, model training, deployment or CI runs.

## Human validation checklist

- [ ] Each member confirms that their section matches their actual AI usage.
- [ ] Hiếu confirms that the "no AI use" declaration in Section 4 is accurate.
- [ ] Tiến: add chat export links or screenshots to the Evidence column (two separate chats: 10–11 Oct and 12 Oct).
- [ ] Tiến: check OpenAQ station coverage for HCMC and record the result: [điền kết quả, ngày kiểm tra]
- [ ] Tiến: re-check Windy and Open-Meteo pricing/limits, verify the "Similar Products" entries (T-09), the tide data sources (T-08) and the AQI formula against the current Vietnamese regulation.
- [ ] Confirm the final PA1 figures (effort, cost) and update H-04 / D-02 notes if they changed.
- [ ] Confirm names, student IDs and class (24C05) are consistent with the team contract; PM validates.
- [ ] Verify that all linked Jira, GitHub and Google Drive records are accessible to the lecturer/TA.

## Known AI errors and limits

- One misinterpretation of an instruction (T-03); data-source information from forums may be outdated (T-04); product and tide-data claims in T-08 and T-09 were written without web search and are unverified.
- Hào's first formatting pass of the PA1 DOCX was rejected for not preserving the template (H-06).
- Planning figures are estimates, not actual spending or time logs.

## Declaration

Each member used AI as an assistant to brainstorm, research, draft, review, revise and organize project work. Each member remains responsible for validating the content, reporting limitations, and explaining the final deliverables to the team and instructors.
