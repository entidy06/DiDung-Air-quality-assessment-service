# DiDung — Hỗ trợ quyết định khi ra ngoài tại TP. Hồ Chí Minh

**DiDung** là đồ án môn **Introduction to Software Engineering (HCMUS)**, định hướng xây dựng ứng dụng web responsive giúp người dùng theo dõi chất lượng không khí (PM2.5/AQI), thời tiết và — khi dữ liệu được kiểm chứng — nguy cơ ngập do mưa, triều cường tại TP.HCM. Hệ thống hướng tới việc hỗ trợ quyết định khi ra ngoài bằng dự báo ngắn hạn, hiển thị nguồn dữ liệu và các cảnh báo theo ngưỡng cá nhân.

> **Trạng thái giao diện (27/10/2026):** giữ [landing cũ](docs/design/2026-10-25-navbar-rounded-preview.html), thay các panel trên landing thành minh họa; màn hình đăng nhập và dashboard sau đăng nhập theo [spec](docs/specs/2026-10-27-frontend-experience.md) và [bản vẽ HTML](docs/previews/2026-10-27-frontend-preview.html). Các phần lộ trình PA chưa chốt vẫn ghi theo PA0/PA1, trừ khi có ghi chú "đã triển khai" kèm minh chứng cụ thể.
>
> **Lưu ý về scope:** PA0 ban đầu coi dự báo mưa và cảnh báo ngập/triều cường là Must-have. Bản dự thảo PA1 đề xuất tập trung MVP vào PM2.5/AQI và đưa cảnh báo ngập ra khỏi MVP do chưa xác thực được nguồn dữ liệu. **Đây là thay đổi cần được nhóm và TA xác nhận**, không phải quyết định đã được phê duyệt. Xem [Quản lý phạm vi](#quản-lý-phạm-vi-và-quyết-định-chưa-chốt).

### Giao diện và ranh giới dữ liệu

- `/` giữ bố cục và câu chuyện landing ban đầu, cùng navbar đã được chỉnh bo góc. AQI, PM2.5, chỉ số thời tiết và biểu đồ trong các panel là **minh họa ngẫu nhiên**, đổi khoảng bốn giây một lần và có nhãn rõ ràng. Biểu đồ chuyển động để cho thấy tính minh họa. Landing không hiển thị bản đồ trạm hoặc lời nhắc; khi người dùng chọn giảm chuyển động, các số giữ nguyên và biểu đồ không chạy animation.
- `/auth` hỗ trợ Google OAuth và email/mật khẩu. `/app` chỉ dành cho người đã đăng nhập: khu vực được chọn, AQI, thời tiết, biểu đồ, bản đồ Mapbox, lời gợi ý và ngưỡng cá nhân dùng API dữ liệu thật. Các API đọc dữ liệu môi trường trả `401` cho khách; các API đồng bộ và cron giữ cơ chế xác thực riêng.
- Cách tách này giúp người xem không nhầm số trong câu chuyện giới thiệu với dữ liệu hiện hành, đồng thời giữ ngưỡng và khu vực trong trải nghiệm cá nhân. Dashboard ghi nguồn, thời điểm hiệu lực và trạng thái thiếu dữ liệu. AQI Open-Meteo là **ước tính mô hình**, không phải số đo chính xác tại địa chỉ/phường; những khu vực gần nhau có thể cùng giá trị.
- Hiện không xin quyền vị trí thiết bị vì backend chưa có ánh xạ tọa độ sang khu vực hỗ trợ. Người dùng chọn khu vực bằng danh sách, kể cả khi Mapbox không khả dụng.

Để chạy đầy đủ: điền các biến trong `.env.example`, bật Google provider trong Supabase Auth, cho phép URL `https://<domain>/auth/callback` (và URL localhost tương ứng) trong Supabase Redirect URLs, cấu hình callback Supabase tại Google OAuth, và cấp token Mapbox công khai `pk.*`. Tài khoản email có thể cần xác nhận theo cấu hình Supabase Cloud. Dashboard cần dữ liệu Open-Meteo đã được đồng bộ; nếu chưa có, từng thẻ sẽ báo trạng thái trống. Việc chặn các route API của ứng dụng **không thay đổi RLS public-read hiện có**; nếu cần bảo vệ dữ liệu ngay ở Supabase, phải duyệt một spec migration/RLS riêng.

## 1. Bài toán và người dùng

Người dân TP.HCM thường phải kiểm tra nhiều nguồn khác nhau khi muốn biết chất lượng không khí, mưa và rủi ro ngập trước khi di chuyển. Các nguồn dữ liệu có thể khác nhau về vị trí đo, độ phân giải, thời gian cập nhật và mức độ tin cậy.

DiDung hướng tới:
- **Người dân và người đi làm/đi học:** xem thông tin theo khu vực và xu hướng vài giờ tới.
- **Người thường xuyên hoạt động ngoài trời hoặc nhạy cảm với ô nhiễm:** thiết lập ngưỡng cảnh báo cá nhân.
- **Người sống tại khu vực có nguy cơ ngập:** nhận thông tin rủi ro **theo khu vực và điểm ngập đã được kiểm chứng**, nếu chức năng này được duyệt và nguồn dữ liệu khả thi.
- **Nhóm vận hành:** theo dõi chất lượng nguồn dữ liệu và lỗi đồng bộ (chức năng quản trị ưu tiên sau MVP).

Sản phẩm chỉ cung cấp thông tin hỗ trợ quyết định, **không đưa ra lời khuyên y tế**, không hứa hẹn dự đoán ngập từng tuyến đường hoặc độ chính xác AQI đến từng phường khi không có dữ liệu phù hợp.

## 2. Phạm vi và tính năng dự kiến

Bảng này phân biệt **phạm vi đã trình bày trong PA0** với **định hướng thu gọn của bản dự thảo PA1**. Mọi thay đổi Must-have cần có quyết định/biên bản được duyệt trước khi dùng làm baseline của PA2.

| Nhóm chức năng | Theo PA0 | Định hướng trong bản dự thảo PA1 | Ghi chú |
| --- | --- | --- | --- |
| Thu thập, kiểm tra và lưu dữ liệu môi trường | Must-have | Must-have | PM2.5/AQI, dữ liệu thời tiết, nguồn và thời điểm cập nhật; nguồn triều cường chỉ khi xác thực |
| Dự báo ngắn hạn | Must-have: **AQI và lượng mưa** | Must-have: tập trung PM2.5/AQI | **Cần xác nhận** việc thu hẹp phần dự báo mưa |
| Cảnh báo triều cường/ngập và hotspot | **Must-have** | Đề xuất **chưa đưa vào MVP** | **Chờ nhóm/TA phê duyệt scope change** và xác minh nguồn triều |
| Tài khoản, lựa chọn khu vực, ngưỡng cảnh báo | Must-have | Must-have | Có giới hạn theo địa điểm được hệ thống hỗ trợ |
| Banner cảnh báo và trung tâm thông báo trong ứng dụng | Must-have | Must-have | Theo ngưỡng, tránh tạo thông báo trùng |
| Dashboard bản đồ, lịch sử và dự báo | Must-have | Must-have | Phải thể hiện nguồn, timestamp và trạng thái thiếu dữ liệu |
| Lời khuyên tổng quát, giám sát quản trị, push notification, báo cáo ngập từ người dùng | Không bắt buộc | Should/Could/Won't tùy chức năng | Chỉ thực hiện sau Must-have và khi đủ nguồn lực |

**Nguyên tắc triển khai:** ưu tiên tính năng Must-have đã được duyệt; tính năng mở rộng không được mặc định là đã triển khai. Khi dữ liệu trạm không đủ, hiển thị rõ dữ liệu **đo tại trạm** so với dữ liệu **ước lượng/dự báo từ mô hình**; không biến giá trị mô hình thành tuyên bố đo đạc tại địa chỉ cụ thể.

## 3. Dữ liệu và công nghệ dự kiến

### Nguồn dữ liệu

- **[OpenAQ](https://docs.openaq.org/) — đã loại khỏi MVP (quyết định 22/10/2026).** Test thật `GET /v3/locations` quanh TP.HCM (bán kính 25km) chỉ còn **1 sensor low-cost còn sống**, 2 trạm chính phủ đã ngừng từ 2016/2025 — độ phủ quá mỏng để làm nguồn chính thức. Chi tiết: `docs/specs/2026-10-22-backend-schema.md` mục 3.1–3.2.
- **[Open-Meteo](https://open-meteo.com/en/docs) — nguồn duy nhất của MVP**, không cần API key: [Weather Forecast API](https://open-meteo.com/en/docs) (lưới ~9-11km, ECMWF/GFS/ICON) và [Air Quality API](https://open-meteo.com/en/docs/air-quality-api) (lưới ~45km, CAMS Global). **Cả hai đều là dữ liệu mô hình (modeled), không phải số đo tại trạm** — mọi response API nội bộ đánh dấu rõ `data_type: "modeled"`.
- Bảng triều/điểm ngập: **chưa xác thực tính sẵn có, quyền sử dụng và độ tin cậy**. Không tuyên bố cảnh báo ngập là tính năng đang chạy.
- Địa điểm hỗ trợ: toàn bộ **168 phường/xã/đặc khu** theo địa giới hành chính mới của TP.HCM (sau sáp nhập 2025), đã geocode và seed vào DB (xem mục 7).

### Kiến trúc — phần backend đã triển khai

Stack theo PA1 mục 3.2: **Next.js + shadcn/ui, Supabase, Vercel**, kiến trúc **MVVM** (chi tiết quy tắc ở `AGENTS.md` §3). Phần sau **đã viết code và đã áp dụng lên Supabase project thật** (không còn là đề xuất):

```text
Open-Meteo (Weather + Air Quality API)
                  │
   Supabase pg_cron + pg_net (trigger-only, giờ chẵn)
     gọi HTTP vào Next.js API routes bên dưới
                  │
   src/app/api/sync/{weather,air-quality-model,advisories}
   src/app/api/jobs/evaluate-alerts
   (business logic nằm ở đây, không ở trong Postgres function)
                  │
       Supabase Cloud (PostgreSQL) — 10 bảng, RLS theo auth.uid()
         provinces, locations (168 phường/xã), air_quality_model,
         weather_data, forecasts, advisories, profiles,
         user_locations, alert_thresholds, notifications
                  │
   src/app/api/{locations,air-quality,weather,advisories,me,map}/*
   (đọc, dùng RLS public-read hoặc user-scoped qua Supabase Auth)
                  │
     Frontend Next.js + shadcn/ui  ← CHƯA XÂY (chờ wireframe)
                  │
             Vercel hosting  ← CHƯA DEPLOY
```

| Thành phần | Lựa chọn | Trạng thái |
| --- | --- | --- |
| Frontend | Next.js + shadcn/ui | Landing minh họa, đăng nhập và dashboard sau đăng nhập đã triển khai theo spec ngày 27/10/2026 |
| Backend/API | Next.js API routes | **Đã triển khai**: `sync/*`, `jobs/evaluate-alerts`, `locations`, `air-quality/{current,history,forecast}`, `weather/current`, `advisories/current`, `me/*` (profile, thresholds, notifications), `map/snapshot`, `auth/callback` |
| Auth | Supabase Auth (`@supabase/ssr`) | **Đã triển khai**: session refresh qua `src/proxy.ts`, trigger tự tạo `profiles` khi signup, callback OAuth. Google OAuth cần cấu hình Client ID/Secret trên Dashboard (bước thủ công, chưa làm) |
| Database | Supabase Cloud (PostgreSQL) | **Đã triển khai và đã push lên project thật** (ref `jwwbvfxgygynzwtbhbno`): 10 migration, 168 locations đã seed, verify qua REST API |
| Scheduler | Supabase `pg_cron` + `pg_net` (trigger-only) | Migration đã viết và push, Vault `cron_secret` đã cấu hình khớp — nhưng **cron chưa chạy thật**, 3 migration còn placeholder `<domain-production>` (cần domain Vercel thật) |
| LLM gateway (lời khuyên AQI) | 9Router self-host (`router.studev.net`), OpenAI-compatible | **Đã triển khai** (`src/lib/ninerouter.ts`) — ngoài phạm vi PA1 gốc, bổ sung theo quyết định trong quá trình phát triển |
| Hosting / deployment | Vercel (Next.js) + Supabase Cloud | **Chưa deploy** — domain thật chưa có, 3 cron job trên vẫn chặn vì placeholder |
| Testing & CI | GitHub Actions (`ci.yml`) | CI **đã chạy** typecheck + lint + build trên push/PR. **Chưa có test suite** — theo `AGENTS.md` §7, không tự viết test khi chưa được duyệt |

**Điểm cần đồng bộ trong chính tài liệu PA1:** Mục **3.3 Hardware and Operating Environment** vẫn nhắc đến Python/Docker và dịch vụ container riêng từ phương án cũ, trong khi **3.2 đã chuyển sang Next.js/Supabase/Vercel**. Nhóm cần cập nhật 3.3 để thống nhất với phần backend đã triển khai thực tế nêu trên.

Dự báo ngắn hạn ở MVP **dùng trực tiếp phần dự báo có sẵn trong response Open-Meteo** (`air_quality_model`/`weather_data` đã chứa cả giờ tương lai trong cùng 1 series), chưa có mô hình baseline tự huấn luyện riêng. Bảng `forecasts` (dự báo tự tính) đã có trong schema nhưng **chưa có job nào ghi vào bảng này** — chỉ dùng khi nhóm thực sự xây baseline/ML và so sánh được với Open-Meteo trên tập đánh giá tách theo thời gian, báo cáo MAE/RMSE từ kết quả thực tế.

## 4. Thành viên và trách nhiệm

Nhóm DiDung gồm bốn thành viên:

| Thành viên | Vai trò chính | Trách nhiệm PA1 |
| --- | --- | --- |
| **Trương Lê Trung Hiếu** | Project Manager (PM) | Proposed Solution; điều phối, tích hợp và review báo cáo |
| **Trần Minh Tiến** | Business Analyst (BA) | Vision & Scope; tổng hợp đóng góp và AI Usage Log |
| **Nguyễn Thành Đạt** | Designer | Project Plan (WBS, estimation, Gantt, milestones, costs); UI/UX và biểu đồ |
| **Võ Đình Cao Minh Hào** | Tester | Risk Register; Tools & Collaboration; QA; Weekly Status Report |

**Vai trò Developer cho các giai đoạn lập trình chưa được chốt.** Người điều phối cần xác nhận người phụ trách chính, backup và giờ làm việc thực tế trước khi chốt Gantt/PA2. Không tự coi một thành viên đã nhận nhiệm vụ lập trình chỉ từ tên vai trò trong bản nháp cũ.

## 5. Lộ trình và theo dõi công việc

- [Jira DiDung – Task Board](https://ntdat2428.atlassian.net/jira/software/projects/DID/boards/2)
- [Jira DiDung – Timeline](https://ntdat2428.atlassian.net/jira/software/projects/DID/boards/2/timeline)
- [PA1 – Project Proposal & Plan (DID-1)](https://ntdat2428.atlassian.net/browse/DID-1)
- [Section 6 – Minh chứng quy trình làm việc (DID-26)](https://ntdat2428.atlassian.net/browse/DID-26)

| Giai đoạn | Mốc kế hoạch tham khảo | Sản phẩm/tiêu chí hoàn thành |
| --- | --- | --- |
| PA0 – Idea & Team Contract | Đã có tài liệu trong repo | Ý tưởng, phạm vi ban đầu, team contract |
| PA1 – Project Proposal & Plan | **W4 (19–25/10/2026), mốc đề xuất trong PA1 mới** | Vision, Proposed Solution, WBS/effort/Gantt, risks, tools, AI log; file nguồn/PDF, review và nộp bài chỉ xem là hoàn tất khi có minh chứng |
| PA2 – Requirements | Tuần 4–5 (dự kiến) | SRS, FR/NFR, use cases, acceptance criteria, traceability; quyết định scope/data feasibility |
| PA3 – Design | Tuần 6–7 (dự kiến) | Kiến trúc, data model, UI flows, prototype, review evidence |
| PA4 – Test Planning | Tuần 8 (dự kiến) | Test plan, test cases, môi trường, yêu cầu bao phủ |
| PA5 – Implementation/Test/Deployment | Tuần 9–10 (dự kiến) | Các Must-have đã duyệt hoạt động, kết quả kiểm thử và deployment |
| Final Demo | Tuần 11 (dự kiến) | Slide, live demo, tổng kết có minh chứng |

**Ngày/tuần ở trên chỉ mang tính lập kế hoạch. Deadline và hướng dẫn nộp chính thức trên Moodle/TA luôn được ưu tiên.** Khung W4–W11 của PA1 bản mới dự tính **260 person-hours** với critical path ở cấp kế hoạch; các phân bổ này phụ thuộc việc chốt Developer và xác nhận capacity từng người. Chỉ chuyển Jira issue sang Done khi đã có sản phẩm, review phù hợp và đường dẫn minh chứng.

## 6. Quy trình làm việc nhóm và minh chứng

### Họp và báo cáo

- Kênh thảo luận nhóm: **Discord**.
- Lịch họp nhóm đã được chuyển sang **thứ Ba hằng tuần**; giờ cố định cần xác nhận lại với cả nhóm. Lịch họp cụ thể nằm trong Jira. **Lưu ý:** Section 5–6 của PA1 mới vẫn có một số dòng ghi checkpoint thứ Năm/Chủ nhật từ bản cũ; cần chỉnh đồng bộ sau khi nhóm xác nhận.
- **Weekly Status Report:** kế hoạch nhóm là **Chủ nhật trước 23:59 (GMT+7)**; khi thay đổi hoặc nộp trễ cần ghi quyết định và thời gian thực tế. Người viết: Hào; PM Hiếu review.
- Sau buổi họp, tạo **Meeting Minutes** ghi người có mặt thực tế, quyết định, blockers, công việc tiếp theo, owner và deadline.
- Các thay đổi về lịch, người phụ trách, scope được lưu trong decision/change log thay vì sửa lại lịch sử.

### Quy trình giao việc và review

1. **Tạo Jira issue**: mục tiêu, owner, deadline, checklist và Definition of Done.
2. **Thực hiện**: dùng tài liệu có lịch sử phiên bản hoặc branch Git riêng; đính kèm link thực tế vào Jira.
3. **Review**: người khác góp ý trong PR/tài liệu/Jira; ghi nội dung cần sửa và người chịu trách nhiệm.
4. **Sửa và xác nhận**: cập nhật bản mới, lưu review result; không tự ghi Approved nếu chưa có review.
5. **Bàn giao và báo cáo**: liên kết Jira ↔ WBS ↔ commit/PR ↔ tài liệu ↔ Weekly Report.

Mẫu thông tin minh chứng ngắn trong Jira: **Deliverable | URL | Version/commit | Author | Reviewer | Feedback | Changes made | Review status | WBS ID**.

### Quy ước Git được đề xuất

- Làm việc trên branch có tên rõ ràng, ví dụ `docs/DID-28-readme`, `feature/DID-xx-dashboard`.
- Commit có ý nghĩa, kèm Jira key khi phù hợp, ví dụ `docs(DID-28): update team README`.
- Tạo **Pull Request về `main`** và mời ít nhất một thành viên khác review; chỉ merge sau khi giải quyết nhận xét quan trọng.
- Không đưa `.env`, token, mật khẩu, dữ liệu nhạy cảm lên repository. `.gitignore`, branch protection và CI phải được kiểm tra/thiết lập trước khi tuyên bố hoàn tất.
- Không backdate commits, meeting minutes hoặc AI logs để tạo minh chứng giả.

### Minh chứng cần lưu

| Hạng mục | Minh chứng ưu tiên |
| --- | --- |
| Jira | Issue link, lịch sử trạng thái, assignee, hạn, comment review |
| Thiết kế/tài liệu | File editable, version history, review comments, PR |
| Code | Commit, PR, CI/test logs, lỗi và sửa lỗi |
| Họp | Meeting Minutes, attendance thực tế, quyết định, Jira action items |
| Báo cáo tuần | File tuần tương ứng, timestamp commit, liên kết task |
| AI | Công cụ, mục đích, cách kiểm chứng/chỉnh sửa thực tế; no-use khi không dùng |

## 7. Cấu trúc repository

```text
.
├── README.md
├── AGENTS.md              # Quy tắc bắt buộc cho AI agent; kiến trúc MVVM
├── .github/workflows/     # CI: typecheck + lint + build (ci.yml)
├── src/
│   ├── app/
│   │   ├── api/           # sync/*, jobs/*, locations, air-quality/*, weather/*, advisories/*, me/*, map/*
│   │   └── auth/callback/ # đổi OAuth code lấy session
│   ├── proxy.ts           # refresh session Supabase mỗi request (Next.js 16)
│   ├── components/        # ui/ (shadcn), providers/
│   ├── lib/                # supabase clients (client/server/admin/middleware), open-meteo.ts, ninerouter.ts
│   └── stores/            # Zustand
├── supabase/migrations/   # migration DB có version (10 file, đã push lên project thật)
├── pa/
│   ├── PA0/               # PA0 PDF đã lưu
│   ├── PA1/               # PA1 PDF đã lưu trên main
│   ├── PA2/
│   ├── PA3/
│   ├── PA4/
│   └── PA5/
└── docs/
    ├── specs/            # Spec kỹ thuật đã duyệt (schema, cron, seed data)
    ├── requirements/     # Dự kiến: SRS, use cases, acceptance criteria
    ├── design/           # Dự kiến: C4/UML, UI/UX, ADRs
    ├── test/             # Dự kiến: test plan, cases, reports
    ├── management/
    │   ├── weekly/       # Hiện có W2/W3-status.docx
    │   ├── meetings/     # Chưa có trên main; cần tạo khi có minutes
    │   └── evidence/     # Evidence Index + Decision Log
    └── ai-usage/
        └── week2/, week3/
```

Trạng thái thực tế ở thời điểm cập nhật README (23/10/2026): `src/` chạy được (`npm run dev`/`build` pass), CI (`.github/workflows/ci.yml`) đã thiết lập và chạy typecheck/lint/build trên push/PR — nhưng **CI chưa chạy test** (chưa có test suite, theo AGENTS.md §7 không tự viết test khi chưa được duyệt).

Migration DB (`supabase/migrations/`, 10 file) đã **`db push` thành công lên Supabase Cloud project thật** (project ref `jwwbvfxgygynzwtbhbno`). Đã xác minh qua REST API: 168/168 locations TP.HCM đã seed (`GET /rest/v1/locations` trả `Content-Range: 0-0/168`), Vault secret `cron_secret` khớp với `CRON_SECRET` trong môi trường. API routes backend đã viết đầy đủ và build/typecheck/lint pass, nhưng **cron jobs chưa chạy thật** — 3 migration cron (`setup_cron_sync_trigger`, `add_advisories_cron`, `add_evaluate_alerts_cron`) còn placeholder `<domain-production>`, cần domain Vercel thật sau khi deploy mới sửa và chạy được. **UI/frontend chưa được xây dựng** — chờ wireframe được duyệt theo AGENTS.md §5.

### Phát triển trên máy cá nhân

Không dùng Docker — stack chạy serverless (Vercel + Supabase Cloud), không có service tự host nào cần đóng gói container (xem PA1 mục 3.3). Chỉ cần:

1. **Node 22** (khớp `.nvmrc`/`engines` trong `package.json`; dùng `nvm use` nếu có nvm). Không cần Python/Docker.
2. `npm install`.
3. Copy `.env.example` → `.env.local`, điền `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (Project Settings > API Keys, hệ key mới `sb_publishable_...`/`sb_secret_...` — lấy từ Supabase project cloud có sẵn, hỏi người giữ project), `NEXT_PUBLIC_MAPBOX_TOKEN`. **Không commit `.env.local`.**
4. `npm run dev` — chạy tại `localhost:3000`.

Kiểm tra trước khi push: `npx tsc --noEmit`, `npm run lint`, `npm run build` — cũng là 3 bước CI (`.github/workflows/ci.yml`) chạy tự động trên PR/push vào `main`.

Migration database (`supabase/migrations/`) áp dụng qua Supabase CLI (`npx supabase link`, `npx supabase db push`) — chỉ người giữ quyền truy cập Supabase project mới chạy được, xem `docs/specs/2026-10-22-backend-schema.md`.

**Đăng nhập Google OAuth**: không cấu hình được bằng code — phải vào Supabase Dashboard (Authentication > Providers > Google) nhập Client ID/Secret tạo từ Google Cloud Console, và thêm `<domain>/auth/callback` vào Redirect URLs của provider đó (và của Google Cloud Console). Phần code (`src/proxy.ts`, `src/app/auth/callback/route.ts`) đã sẵn sàng, chỉ còn bước cấu hình thủ công này.

## 8. Tài liệu và liên kết

- [PA0 – Project Idea & Team Contract](pa/PA0/10-PA0.pdf)
- [PA1 – Project Proposal & Plan (bản Word đang chỉnh sửa trên Google Drive)](https://docs.google.com/document/d/1ViqEjQ4qF7A6XEkFdJJiVY0neLwfp7jm/edit?usp=drivesdk&ouid=112474567247972889222&rtpof=true&sd=true) — **nguồn PA1 mới nhất được đối chiếu**; chưa có file PA1 trong nhánh `main` của GitHub
- [Báo cáo tuần 2](docs/management/weekly/W2-status.docx)
- [AI Usage Log tuần 2](docs/ai-usage/week2/ntdat-logs.md)
- [Thư mục các bài PA](pa/)
- [Jira board và phân công](https://ntdat2428.atlassian.net/jira/software/projects/DID/boards/2)
- [Project roadmap](https://ntdat2428.atlassian.net/jira/software/projects/DID/boards/2/timeline)

> README giúp định hướng dự án và minh bạch trạng thái, **không thay thế** PA0/PA1, SRS chính thức, quyết định thay đổi scope hay bằng chứng nộp bài. Các tính năng/giá trị chưa có minh chứng phải được ghi là *proposed*, *planned* hoặc *pending verification*.
