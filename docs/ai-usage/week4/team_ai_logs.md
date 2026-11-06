# Team AI Usage Log – PA2, Frontend, UI/UX & Deployment

**Project:** DiDung – Air Quality Assessment Service  
**Consolidated on:** 6 November 2026  
**Source:** Four member-provided Markdown logs  
**Status:** Consolidated record; member-specific pending items remain pending.

## 1. Team members and source records

| Member | AI tool(s) recorded | Recorded period | Areas covered | Source file |
|---|---|---|---|---|
| Nguyễn Thành Đạt | ChatGPT; Codex where applicable | 18 October–2 November 2026 | UI concepts, landing page, frontend guidance, requirements, use cases, RTM, Figma, document formatting and accessibility guidance | `dat-ai-log.md` |
| Võ Đình Cao Minh Hào | ChatGPT / Codex | 30 October–3 November 2026 | Requirements and use-case review, diagrams, acceptance criteria, RTM, source assessment, SRS review and AI disclosure | `hao-logs.md` |
| Trần Minh Tiến | Claude Code, continued in Claude Desktop Code tab | 2 November 2026 | Session recovery, repository checks, deployment preparation and Vercel production deployment | `TranMinhTien.md` |
| Trương Lê Trung Hiếu | Not confirmed; source contains tool placeholders | PA2 weeks 4–5; exact dates pending | Draft entries for API research, measurable NFRs and SRS integration | `ai-usage-log-hieu-pa2.md` |

**Member identification:** Đạt and Tiến are identified from their supplied filenames and the request context. Hào and Hiếu are also named in their source logs. Only Hào's source supplies a student ID (24127035); other student IDs are not supplied.

## 2. How to read this consolidated log

- All four source records are reproduced below, grouped by member. Their content is retained; heading levels are adjusted to fit this document.
- **Chat coverage:** Đạt's source contains prompt summaries and AI contribution summaries. Hào's source contains task/purpose, AI output and verification summaries. Tiến's source contains a narrative session summary, including the short quoted request “resume”. Hiếu's source contains a pending template and example text.
- These records are **not complete verbatim chat transcripts**. No missing user messages or AI replies have been reconstructed or invented.
- Dates, verification statements and deployment results below are reported by the respective source logs; consolidation does not independently verify them.
- Hiếu's three entries remain **Pending**. Bracketed text and examples must be confirmed or replaced by Hiếu before being presented as actual AI usage.
- Scope statements differ between sources: Hiếu's draft mentions rain/tide/flood, while Hào's log states flood/tide functionality is outside the MVP under the later baseline. Both source statements are retained; this merged log does not approve a scope change.
- The record includes frontend/design work and deployment because these are present in the submitted member logs. Inclusion here does not claim they are all required PA2 deliverables.

## 3. Nguyễn Thành Đạt — Prompt summaries and AI assistance

**Source:** `dat-ai-log.md`  
**Chat format available:** Nine prompt summaries, AI contributions, and human verification/modification statements.

### AI Usage Log – PA2, Frontend & UI/UX Design

**Project:** DiDung – Air Quality Assessment Service  
**AI Tools:** ChatGPT, Codex (where applicable)  
**Supporting Tools:** Figma, GitHub, VS Code  
**Purpose:** Requirements analysis, documentation support, UI/UX design assistance, and frontend development.

| Date | Task / Area | AI Usage / Prompt Summary | AI Contribution | Human Verification & Modification |
|---|---|---|---|---|
| 18/10/2026 | UI Concept Development | "Suggest a modern AQI dashboard interface with dynamic backgrounds based on air quality and recommend essential user-facing features." | Suggested visual concepts, AQI color states, dashboard components and user interaction ideas. | Reviewed proposed features and selected UI concepts relevant to DiDung's scope. |
| 23/10/2026 | Frontend Design & Landing Page | "Analyze the existing UI template and propose a design.md for integrating its styles and animations into DiDung without removing existing functionalities. Use scroll storytelling." | Assisted in defining visual styles, landing-page structure, animations, navigation behavior and design guidelines. | Reviewed the proposed UI structure, preserved existing functional requirements and adjusted design preferences. |
| 29/10/2026 | PA2 – Requirements Analysis | "Review the PA2 requirements template and help identify functional requirements, non-functional requirements, business rules and acceptance criteria based on the approved MVP scope." | Assisted in organizing FRs, NFRs, business rules and acceptance criteria into a structured SRS draft. | Cross-checked requirements against PA1, refined descriptions and kept unapproved scope changes marked as pending. |
| 29/10/2026 | PA2 – Use Cases & Traceability | "Help define use cases, connect functional requirements with acceptance criteria, and construct a Requirements Traceability Matrix." | Suggested use-case descriptions, requirement mappings, and traceability relationships between FR, UC, AC and UI screens. | Reviewed actor interactions, corrected mappings and checked consistency across the requirements documentation. |
| 29–30/10/2026 | Figma – Screen Planning & Wireframes | "Propose the necessary screens, user flows and wireframes for the DiDung application, including dashboard, forecast, authentication and alert settings." | Assisted in preparing a screen inventory, user flows, wireframe ideas, layout guidelines and UI component descriptions. | Used Figma to organize the design work, reviewed screen relationships and refined layouts to match functional requirements. |
| 29–30/10/2026 | Frontend Implementation Support | "Analyze the frontend UI structure and suggest how to apply the new design template while retaining existing components and functionality." | Suggested component organization, responsive layout considerations, visual consistency improvements and integration guidance. | Reviewed the frontend structure, selected feasible adjustments and checked compatibility with existing application features. |
| 30/10/2026 | PA2 – Document Formatting | "Remove incorrectly formatted or duplicated use-case sections and correct heading numbering throughout the PA2 document." | Assisted in identifying duplicated sections, reorganizing use-case content and standardizing headings. | Checked the updated document structure and retained the required use-case information. |
| 01/11/2026 | PA2 – Acceptance Criteria & RTM Review | "Review acceptance scenarios using Given/When/Then and check traceability between functional requirements, use cases and acceptance criteria." | Assisted in identifying missing scenarios, inconsistencies and incomplete requirement mappings. | Reviewed suggested changes against the SRS and project scope; retained unresolved items for further review. |
| 01–02/11/2026 | Figma – Prototype & Accessibility | "Review the Figma screen flows and suggest improvements to navigation, interactive prototype behavior, responsive design and accessibility." | Provided guidance on clickable interactions, screen transitions, usability checks and accessibility evaluation criteria. | Reviewed design flows in Figma and distinguished prototype interactions from implemented backend functionality. |

#### AI Usage Declaration

AI tools were used as supporting assistants throughout PA2 documentation, frontend development planning, and UI/UX design.

The primary uses included brainstorming interface concepts, analyzing requirements, suggesting document structures, reviewing use-case consistency, supporting traceability analysis, and providing frontend design recommendations.

AI-generated suggestions were reviewed and selectively adapted to the project's scope and existing implementation. Final decisions regarding requirements, UI/UX design, feature prioritization, and acceptance of deliverables remained the responsibility of the project members.

AI outputs were not treated as evidence of completed implementation, successful testing, or approved requirements without independent verification.

---

## 4. Võ Đình Cao Minh Hào — Tasks, AI outputs and verification

**Source:** `hao-logs.md`  
**Chat format available:** Nine task/output summaries; no complete verbatim prompt–response transcript is supplied.

### AI Usage Log - PA2 Use Case and Requirements Review

#### Session Information

- **Member:** Vo Dinh Cao Minh Hao
- **Student ID:** 24127035
- **AI tool:** ChatGPT / Codex
- **Primary session date:** 30 October–3 November 2026
- **Log preparation date:** 3 November 2026
- **Purpose:** Support the review and drafting of the PA2 use-case model, use-case specifications, acceptance criteria, RTM, SRS review record, and AI disclosure.
- **Disclosure basis:** The [Project Guidelines and Rubric](https://docs.google.com/document/d/1a-o_p9hP_4IAPy-JBhLHeybl5bvlzWuc) permits generative AI use when disclosed in each PA. The team remains responsible for understanding, checking, and explaining submitted work.

#### Usage Entries

| # | Member | Tool | Task / purpose | AI output used | Verification and changes made |
|---:|---|---|---|---|---|
| 1 | Vo Dinh Cao Minh Hao | ChatGPT / Codex | Review PA2 Section 6 against PA0 and PA1, identify missing use cases and diagram content, and resolve scope differences. | A gap review and revised use-case list, following PA1 where it supersedes PA0 and retaining unsupported facts as Unknown. | Checked the proposed scope and mappings against PA0, PA1, and the current PA2 SRS. Flood/tide functionality remains outside the MVP per the later baseline. Unknown values were not inferred from unsupported evidence. |
| 2 | Vo Dinh Cao Minh Hao | ChatGPT / Codex | Draft and revise the actors, system boundary, use-case relationships, and editable diagram artifacts. | A 14-use-case model with 11 Must-have use cases, actor relationships, `include`/`extend` relations, and Draw.io, PlantUML, Mermaid, SVG, and PNG files. | Reconciled the diagram sources and exports. UC-08 and UC-11 are system-triggered processes; UC-12's primary actor and screen mappings without evidence remain Unknown. The diagram was rendered; no implementation or test pass is claimed. |
| 3 | Vo Dinh Cao Minh Hao | ChatGPT / Codex | Improve FR/UC/Screen/AC traceability in the SRS and RTM, including PA1 F09 and FR-06 screen mapping. | FR-13 (Should) mapped from PA1 F09 to UC-14; an updated FR-06 crosswalk to UC-04, SCR-05 Sign in, and SCR-06 Alert settings; and RTM updates. | Used PA1 F09 as the later scope source and preserved PA0 as historical context. The FR-06 mapping follows the project owner's approval. FR-13's admin screen ID remains Unknown because the source material does not specify it. |
| 4 | Vo Dinh Cao Minh Hao | ChatGPT / Codex | Draft measurable Given/When/Then acceptance criteria and review consistency across requirements, use cases, SRS, and RTM. | 25 Must-have ACs for FR-01–FR-10, plus eight draft ACs for FR-11–FR-13; 33 ACs total with FR/UC links. | Checked AC coverage against the current SRS and RTM. Scenarios cover relevant positive/negative cases such as API failure, stale data, unauthorized access, threshold behavior, and duplicate notifications. These are drafts for PA4 planning, not test results. BR-01/03/05 decisions remain pending. |
| 5 | Vo Dinh Cao Minh Hao | ChatGPT / Codex | Draft detailed specifications for UC-09–UC-14 and fill AC/RTM gaps for FR-11–FR-13. | Six detailed UC specifications and draft acceptance criteria mapped to FR-11, FR-12, and FR-13. | Cross-checked against PA1, PA0, and the PA2 SRS/RTM. Unsupported details remain Unknown, including the UC-12 actor, FR-11 evaluation metrics/comparison rule, FR-12 AQI standard dependency, and FR-13 screen/telemetry details. |
| 6 | Vo Dinh Cao Minh Hao | ChatGPT / Codex | Assess Open-Meteo evidence supplied for the production interface and update the requirements review. | A source assessment distinguishing coordinate-based model output from readings at physical monitoring stations, plus an update to the SRS/RTM review evidence. | Compared claims with the [official Air Quality API](https://open-meteo.com/en/docs/air-quality-api) and related official documentation. The supplied screenshot supports that displayed locations show AQI, category, PM2.5, and time; it does not prove API payloads, ingestion behavior, or independent station measurements. Hiếu's review disposition is recorded under the project owner's rule where no high-impact issue was identified. |
| 7 | Vo Dinh Cao Minh Hao | ChatGPT / Codex | Find and assess GitHub documentation linked to Figma by Nguyễn Thành Đạt. | A record of PR #10, the Figma link file, and the frontend experience specification on the related feature branch. | Used the project owner's confirmation that `entidy06` is Đạt. PR #10 adds a Figma link; the actual Figma frame contents, accessibility evidence, and PA2 screen mapping could not be verified. The PR's GitHub review status is not treated as approval of the PA2 SRS. |
| 8 | Vo Dinh Cao Minh Hao | ChatGPT / Codex | Update the review disposition and AI usage disclosure while preserving earlier AI log entries. | Updated SRS AI Usage Log and review notes stating that ChatGPT drafts and the project owner reviews and fully edits before finalization. | Preserved Nguyễn Thành Đạt's historical AI log entries. Hiếu and the third reviewer are recorded as Reviewed/Approved under the project owner's instruction if no high-impact issue exists; the third reviewer's identity remains Unknown. BA decisions are pending specifically for BR-01/03/05. TA is not a project participant. |
| 9 | Vo Dinh Cao Minh Hao | ChatGPT / Codex | Prepare this Markdown AI disclosure in the supplied format. | A structured session record separating tasks, AI assistance, and human verification. | Matched the supplied `vdcmhao-logs.md` format. The log is an AI-prepared draft for the project owner to review and edit fully. No implementation, test pass, TA approval, or meeting is claimed. |

#### Human Review and Responsibility

- AI output is a draft and review aid, not authoritative project evidence. The project owner is responsible for fully reviewing and editing this log and the related PA2 content before final use.
- Requirements and scope were checked against PA1 and PA0, with PA1 used as the later baseline when they differ.
- Unsupported facts remain marked Unknown. BA decisions on BR-01, BR-03, and BR-05 are pending.
- Hiếu and the third reviewer are recorded as having reviewed and approved under the project owner's instruction when no high-impact issue exists. The third reviewer's identity remains Unknown.
- The Figma link was found, but its frame content, screen mapping, responsive variants, and accessibility evidence were not verified.
- No implementation, test pass, TA approval, or meeting is asserted.
- No passwords, authentication tokens, API keys, or confidential source-code secrets are included in this log.

---

## 5. Trần Minh Tiến — AI session and deployment conversation summary

**Source:** `TranMinhTien.md`  
**Chat format available:** Four narrative session sections; deployment outcomes are retained as reported in the source.

### AI Session Log — 2026-11-02 (Claude Code)

#### 1. Resume request
- User asked to resume a prior task ("resume") with no further detail.
- Checked memory file `project_didung_air_quality.md` (DiDung — HCMUS air quality project). Memory was 9 days old and referenced branch `feature/backend-infra-mvp`.
- Verified current repo state at `C:\Users\ADMIN\Github\DiDung-Air-quality-assessment-service`:
  - Branch had moved to `main`, already past a merge (PR #8), with a newer commit `eb3a260` — "add: fe code with backend connected in local, need to deployed".
  - Flagged that memory was stale vs. actual repo state.
- Attempted to ask the user which specific pending item to resume (deployment, UI wireframes, Supabase Cloud link, etc.) via a clarifying question — question was interrupted/dismissed by the user before being answered.

#### 2. Moving the session to Claude Desktop (Code tab)
- User asked (in Vietnamese) how to bring the session into Claude Desktop's **Code** tab, having installed the Vercel plugin, in order to deploy.
- Explained two options:
  1. Claude Code sessions persist locally keyed by working directory (`~/.claude/projects/...`); opening Claude Desktop → Code tab → same project folder shows session history to **Resume**.
  2. Alternatively, deploy directly from the current session, since Vercel skills/tools were already available — no need to switch apps first.
- Offered to deploy immediately; user chose to continue in Claude Desktop's Code tab, and the conversation continued there.

#### 3. Vercel production deployment (DiDung project)
Continued in Claude Desktop Code tab, working directory `C:\Users\ADMIN\Github\DiDung-Air-quality-assessment-service`.

**Pre-deploy checks:**
- Confirmed project was a Next.js 16 app (`didung-air-quality-assessment-service`).
- Found project already linked to Vercel (`.vercel/project.json` → project `didung-air-quality`, org `hcmus3`).
- Local branch was 2 commits behind `origin/main` → ran `git pull` (fast-forward, picked up `d73a715`).
- Checked Vercel CLI auth: already logged in as `tien140406`.
- Verified required env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`, `CRON_SECRET`, `NEXT_PUBLIC_MAPBOX_TOKEN`, `NINEROUTER_API_KEY`, `NINEROUTER_BASE_URL`, `NINEROUTER_MODEL`) were already configured on Vercel Production.

**Decision point:** asked user whether to deploy to **Preview** or **Production** → user chose **Production**.

**Deployment:**
- Ran `npx vercel --prod`.
- Result: `READY`, deployed successfully.
  - Production URL: `https://didung-air-quality.vercel.app`
  - Inspect URL: `https://vercel.com/hcmus3/didung-air-quality/4hfude1T4nmhdwzydVBSwB6iZ9ji`
  - Deployed from commit `d73a715`.

**Flagged to user:** the project has **Vercel Authentication (Deployment Protection)** enabled, meaning the production URL requires sign-in for anyone outside the team to view it. Offered to help disable it if public access (e.g. for demoing to instructors/teammates) was wanted — awaiting user's decision on this at session's end.

---
*Log excludes all work from the "Homework 3" request onward, per user instruction.*

---

## 6. Trương Lê Trung Hiếu — Pending AI usage draft

**Source:** `ai-usage-log-hieu-pa2.md`  
**Chat format available:** Three proposed entries with placeholders and examples, not confirmed chat history.

**Confirmation status:** Pending. No missing dates, tools, prompts or verification actions have been filled in by inference.

### AI Usage Log – PA2 (Tuần 4–5) – Hiếu Trương Lê Trung

- Dự án: DiDung (web app responsive về AQI/PM2.5, mưa, triều/ngập cho TP.HCM)
- Epic: DID-21 – PA2 — Requirements & SRS (W4–W5)
- Task tổng hợp: DID-55 – Member Contribution và AI Usage Log
- Vị trí lưu đề xuất: `docs/ai-usage/week4-5/ai-log-hieu.md` và copy vào mục AI Usage Log của SRS
- Trạng thái chung: **Pending – bản nháp, Hiếu cần xác nhận từng dòng trước khi nộp**

> Quy ước: mỗi dòng ghi một lần dùng AI đáng kể theo mẫu Member / Tool / Task / Purpose / Verification + Changes.
> Các ô trong ngoặc vuông `[...]` là chỗ Hiếu phải điền hoặc sửa theo đúng thực tế. Dòng nào Hiếu không dùng AI thì xóa, không giữ lại cho đủ số lượng.

---

#### 1. Bảng log

| # | Ngày | Member | Tool | Task (Jira) | Purpose | Verification + Changes | Trạng thái |
|---|------|--------|------|-------------|---------|------------------------|------------|
| 1 | [dd/mm/2026] | Hiếu Trương Lê Trung | [Claude / ChatGPT / khác + phiên bản] | DID-43 – Khảo sát OpenAQ, Open-Meteo, rainfall và dữ liệu mẫu | [Ví dụ: gợi ý cấu trúc bảng source fields / limits / risks và danh sách câu hỏi cần kiểm tra: station vs model, coverage TP.HCM, timestamp, quota, units, missing/stale] | [Ví dụ: đối chiếu từng trường và giới hạn với tài liệu API chính thức; chạy query thật và ghi lại thời gian + nguồn mẫu; xóa/sửa các câu AI nêu mà không kiểm chứng được. Ghi cụ thể đã sửa gì] | Pending |
| 2 | [dd/mm/2026] | Hiếu Trương Lê Trung | [Tool] | DID-45 – Viết NFR đo lường được và cách kiểm chứng | [Ví dụ: gợi ý khung NFR (NFR ID + metric + điều kiện + phương pháp kiểm chứng) cho performance P95, responsive, accessibility, security/privacy, freshness/reliability, maintainability] | [Ví dụ: ngưỡng chỉ là đề xuất, chưa test, đã ghi rõ trong SRS; điều chỉnh cho phù hợp free tier; gắn requirement/use-case ID; reviewer [tên] đã/ chưa xác nhận] | Pending |
| 3 | [dd/mm/2026] | Hiếu Trương Lê Trung | [Tool] | DID-57 – Tích hợp SRS, cập nhật TOC, xuất Word/PDF và PR | [Ví dụ: rà soát tính nhất quán thuật ngữ, caption/numbering, và checklist QA định dạng trước khi xuất `10-PA2.docx` / `10-PA2.pdf`] | [Ví dụ: tự kiểm TOC, hyperlink, số bảng/hình, bản Word và PDF cùng version; xử lý open defects từ review của [tên]; PR/commit: [link]] | Pending |

---

#### 2. Các việc không đưa vào log (cần Hiếu quyết định)

- **DID-39 – Review backend và codebase:** task này không có mô tả, không thuộc epic PA2 và đã xong từ khoảng 1 tháng trước. Nếu có dùng AI ở đây thì nhiều khả năng thuộc giai đoạn PA1, không đưa vào log PA2 để tránh tính trùng. Nếu thực sự dùng AI trong W4–W5 thì thêm một dòng như bảng trên.
- **Công việc điều phối PM cho epic DID-21:** chỉ ghi nếu có dùng AI cụ thể (ví dụ soạn nội dung thông báo, tóm tắt họp) và kèm bằng chứng.

#### 3. Checklist trước khi nộp (theo DID-55)

- [ ] Mỗi dòng có đủ Member / Tool / Task / Purpose / Verification + Changes, ghi đúng thực tế
- [ ] Không ghi trùng với log PA1
- [ ] Không khẳng định feature đã implement, test pass, TA approval hay meeting đã diễn ra nếu chưa có bằng chứng
- [ ] Có đường dẫn bằng chứng (Jira issue, commit/PR, file trong `docs/` hoặc `pa/PA2`)
- [ ] Phần nào chưa được xác nhận thì để **Pending**
- [ ] Gửi cho Nguyễn Thành Đạt (owner DID-55) để tổng hợp vào SRS

---

## 7. Team disclosure and outstanding confirmations

This document consolidates the AI assistance described by all four members. AI-supported drafting, analysis, design guidance and implementation/deployment assistance are attributed to the member whose source reports them. Responsibility for reviewing and explaining the submitted work remains with the team.

Before submission:

- Hiếu must confirm the actual dates, tools, purposes and verification/changes for his pending entries, and remove unused examples.
- Each member should confirm their own reported activities and verification statements. No team-wide approval is inferred from this compilation.
- If full chat evidence is required separately, attach the original conversation exports or screenshots. The supplied files contain summaries and a pending template rather than full transcripts.
- Resolve source-specific pending matters in the relevant project records, including BR-01/03/05, unidentified reviewer details and unverified Figma evidence noted in Hào's log, and the deployment-access decision noted in Tiến's log.
