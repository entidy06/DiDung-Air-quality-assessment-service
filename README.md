# DiDung — Hỗ trợ quyết định khi ra ngoài tại TP. Hồ Chí Minh

**DiDung** là đồ án môn **Introduction to Software Engineering (HCMUS)**, định hướng xây dựng ứng dụng web responsive giúp người dùng theo dõi chất lượng không khí (PM2.5/AQI), thời tiết và — khi dữ liệu được kiểm chứng — nguy cơ ngập do mưa, triều cường tại TP.HCM. Hệ thống hướng tới việc hỗ trợ quyết định khi ra ngoài bằng dự báo ngắn hạn, hiển thị nguồn dữ liệu và các cảnh báo theo ngưỡng cá nhân.

> **Trạng thái dự án:** đang trong giai đoạn đề xuất/kế hoạch và chuẩn bị yêu cầu – thiết kế. Repository hiện chủ yếu chứa tài liệu; **chưa có bản ứng dụng được xác nhận là đã triển khai**. Công nghệ, chức năng, deadline và phạm vi dưới đây là kế hoạch, trừ khi có ghi chú khác.
>
> **Lưu ý về scope:** PA0 ban đầu coi dự báo mưa và cảnh báo ngập/triều cường là Must-have. Bản dự thảo PA1 đề xuất tập trung MVP vào PM2.5/AQI và đưa cảnh báo ngập ra khỏi MVP do chưa xác thực được nguồn dữ liệu. **Đây là thay đổi cần được nhóm và TA xác nhận**, không phải quyết định đã được phê duyệt. Xem [Quản lý phạm vi](#quản-lý-phạm-vi-và-quyết-định-chưa-chốt).

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

### Nguồn dữ liệu đang xem xét

- [OpenAQ](https://docs.openaq.org/): số đo quan trắc (ví dụ PM2.5), tùy trạm thực sự hiện diện và chất lượng dữ liệu tại TP.HCM.
- [Open-Meteo Weather](https://open-meteo.com/en/docs): dữ liệu thời tiết và dự báo, bao gồm mưa, gió, độ ẩm; độ phân giải/phạm vi phải được kiểm tra.
- [Open-Meteo Air Quality](https://open-meteo.com/en/docs/air-quality-api): sản phẩm chất lượng không khí từ **mô hình**, không đồng nhất với số đo trạm.
- Bảng triều/nguồn quan trắc triều và thông tin điểm ngập từ các nguồn công khai: **chưa xác thực tính sẵn có, quyền sử dụng và độ tin cậy**. Không tuyên bố cảnh báo ngập là tính năng đang chạy.
- Các địa điểm được hỗ trợ sẽ được xác định bằng khảo sát độ phủ dữ liệu trong PA2.

### Kiến trúc đề xuất theo PA1 mới (chưa triển khai)

Phần **3.2 Technology Stack** của [PA1 đang biên tập trên Google Drive](https://docs.google.com/document/d/1ViqEjQ4qF7A6XEkFdJJiVY0neLwfp7jm/edit?usp=drivesdk&ouid=112474567247972889222&rtpof=true&sd=true) đã chuyển sang **Next.js + shadcn/ui, Supabase và Vercel**. Đây là stack **được ghi trong bản PA1 mới**, chưa phải hệ thống được chứng minh đang hoạt động.

```text
OpenAQ / Open-Meteo / nguồn được duyệt
                  │
     Đồng bộ định kỳ + chuẩn hóa dữ liệu
     (cơ chế gọi API ngoài cần technical spike)
                  │
       Supabase Cloud (PostgreSQL)
         - dữ liệu đo và dữ liệu mô hình
         - dữ liệu người dùng và ngưỡng cảnh báo
         - kết quả dự báo / thông báo
                  │
     Next.js (API/backend + web frontend)
              + shadcn/ui
                  │
     Responsive dashboard / bản đồ / biểu đồ
                  │
             Vercel hosting
```

| Thành phần | Lựa chọn trong PA1 mới | Trạng thái |
| --- | --- | --- |
| Frontend | **Next.js + shadcn/ui** (nền tảng React) | Theo PA1 bản cập nhật; chờ kiểm chứng triển khai |
| Backend/API | **Next.js** (API/server-side) | Theo PA1; cách triển khai route/server actions cần thiết kế |
| Database | **Supabase** (managed PostgreSQL) | Theo PA1; chưa có bằng chứng schema/migration trên repository |
| Scheduler / xử lý định kỳ | **Supabase pg_cron** | Theo PA1; cần kiểm chứng luồng lấy dữ liệu API ngoài, retry và giới hạn quota |
| Hosting / deployment | **Vercel (Next.js) + Supabase Cloud** | Đề xuất; kiểm tra cấu hình, free-tier và giới hạn runtime trước khi chốt |
| Testing & CI | **Vitest**, **Playwright** (ứng viên), **GitHub Actions** (dự kiến) | Chưa coi là đã thiết lập khi chưa có test/workflow runs |

**Điểm cần đồng bộ trong chính tài liệu PA1:** Mục **3.3 Hardware and Operating Environment** vẫn nhắc đến Python/Docker và dịch vụ container riêng từ phương án cũ, trong khi **3.2 đã chuyển sang Next.js/Supabase/Vercel**. Nhóm cần cập nhật 3.3 và phần giải thích lý do chọn công nghệ để thống nhất trước khi khóa kiến trúc. README ưu tiên liệt kê đúng lựa chọn mới ở 3.2, không khẳng định những chi tiết triển khai chưa được thử nghiệm.

Dự báo sẽ ưu tiên **baseline minh bạch và có kiểm chứng**; các mô hình ML (ví dụ mô hình cây) chỉ được sử dụng khi phù hợp dữ liệu lịch sử và tốt hơn baseline trên tập đánh giá tách theo thời gian. Các chỉ số như MAE/RMSE phải được báo cáo từ kết quả thực tế, không suy đoán.

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
│   ├── app/               # routes (App Router)
│   ├── components/        # ui/ (shadcn), providers/
│   ├── lib/                # supabase clients, utils
│   └── stores/            # Zustand
├── supabase/migrations/   # migration DB có version (xem docs/specs)
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

Trạng thái thực tế ở thời điểm cập nhật README: `src/` chạy được (`npm run dev`/`build` pass), CI (`.github/workflows/ci.yml`) đã thiết lập và chạy typecheck/lint/build trên push/PR — nhưng **CI chưa chạy test** (chưa có test suite, theo AGENTS.md §7 không tự viết test khi chưa được duyệt). Migration DB đã viết (`supabase/migrations/`) nhưng **chưa áp dụng lên Supabase project thật** — chỉ coi là đã triển khai sau khi có xác nhận `db push` thành công.

### Phát triển trên máy cá nhân

Không dùng Docker — stack chạy serverless (Vercel + Supabase Cloud), không có service tự host nào cần đóng gói container (xem PA1 mục 3.3). Chỉ cần:

1. **Node 22** (khớp `.nvmrc`/`engines` trong `package.json`; dùng `nvm use` nếu có nvm). Không cần Python/Docker.
2. `npm install`.
3. Copy `.env.example` → `.env.local`, điền `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (lấy từ Supabase project cloud có sẵn — hỏi người giữ project), `NEXT_PUBLIC_MAPBOX_TOKEN`. **Không commit `.env.local`.**
4. `npm run dev` — chạy tại `localhost:3000`.

Kiểm tra trước khi push: `npx tsc --noEmit`, `npm run lint`, `npm run build` — cũng là 3 bước CI (`.github/workflows/ci.yml`) chạy tự động trên PR/push vào `main`.

Migration database (`supabase/migrations/`) áp dụng qua Supabase CLI (`npx supabase link`, `npx supabase db push`) — chỉ người giữ quyền truy cập Supabase project mới chạy được, xem `docs/specs/2026-10-22-backend-schema.md`.

## 8. Tài liệu và liên kết

- [PA0 – Project Idea & Team Contract](pa/PA0/10-PA0.pdf)
- [PA1 – Project Proposal & Plan (bản Word đang chỉnh sửa trên Google Drive)](https://docs.google.com/document/d/1ViqEjQ4qF7A6XEkFdJJiVY0neLwfp7jm/edit?usp=drivesdk&ouid=112474567247972889222&rtpof=true&sd=true) — **nguồn PA1 mới nhất được đối chiếu**; chưa có file PA1 trong nhánh `main` của GitHub
- [Báo cáo tuần 2](docs/management/weekly/W2-status.docx)
- [AI Usage Log tuần 2](docs/ai-usage/week2/ntdat-logs.md)
- [Thư mục các bài PA](pa/)
- [Jira board và phân công](https://ntdat2428.atlassian.net/jira/software/projects/DID/boards/2)
- [Project roadmap](https://ntdat2428.atlassian.net/jira/software/projects/DID/boards/2/timeline)

> README giúp định hướng dự án và minh bạch trạng thái, **không thay thế** PA0/PA1, SRS chính thức, quyết định thay đổi scope hay bằng chứng nộp bài. Các tính năng/giá trị chưa có minh chứng phải được ghi là *proposed*, *planned* hoặc *pending verification*.
