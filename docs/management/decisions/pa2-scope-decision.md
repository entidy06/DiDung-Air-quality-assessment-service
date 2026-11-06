# PA2 — Decisions, scope changes và câu hỏi mở

**Ngày ghi: 03/11/2026 (UTC+7).** Task: [DID-56](https://ntdat2428.atlassian.net/browse/DID-56), phối hợp [DID-40](https://ntdat2428.atlassian.net/browse/DID-40). [Evidence Index](../evidence/pa2-evidence-index.md) là đầu mối nguồn. Đây là tổng hợp có nguồn và pending register, không tạo quyết định/approval hồi tố. Người phụ trách DID-56 là Hiếu; Codex hỗ trợ ghi chép, human review pending.

## 1. Decisions có nguồn

Ngày “nguồn nêu” là ngày tài liệu ghi, không phải ngày được chứng thực lại. Các mục được ghi vào log này ngày 03/11; không biến một mô tả cũ thành quyết định họp mới.

| ID | Ngày nguồn nêu | Ngày ghi | Nội dung và tác động | Nguồn | Decision maker / trạng thái |
| --- | --- | --- | --- | --- | --- |
| D-01 | 20/10/2026 theo index PA1 | 03/11/2026 | Đề xuất thu gọn AQI/PM2.5, flood/tide ra khỏi MVP; tác động F04, BR-07, scope PA0→PA1→PA2 | [Index lịch sử](../evidence/evidence-index.md) §2; [SRS](../../../pa/PA2/10-PA2.pdf) §2.1/5.3/10 | Index cũ ghi chờ nhóm/TA; SRS hiện ghi theo PA1 và TA không tham gia approval. Giữ cả hai nguồn, chưa tự xác nhận TA approval hoặc thay quy tắc; Q-01 pending. |
| D-02 | 22/10/2026 theo spec | 03/11/2026 | Spec ghi bỏ OpenAQ khỏi MVP, dùng Open-Meteo và nhãn dữ liệu mô hình. Tác động FR-01/02/03/04/05, UC-08/09 | [Spec backend](../../specs/2026-10-22-backend-schema.md); [PR #8](https://github.com/entidy06/DiDung-Air-quality-assessment-service/pull/8) | PR kỹ thuật đã được Hiulaptop approve 24/10; không mở rộng approval sang PA2 source feasibility. Xác nhận dataset/runtime/coverage của PA2 pending DID-43. |
| D-03 | 02/11/2026 theo SRS §1/10 | 03/11/2026 | SRS ghi đóng góp Hiếu/Tiến/Đạt/Hào mỗi người 25%, tổng 100%; không suy tất cả task đã xong | SRS §1 và finding 8 | Document-reported confirmation; chưa có direct confirmations của cả bốn trong nguồn kiểm tra. Evidence và AI declarations còn pending DID-55. |
| D-04 | 02/11/2026 theo SRS §9/10 | 03/11/2026 | Revision thêm optional draft AC, cập nhật RTM; 11 Must UC specs đã có, UC-12–14 specs còn pending. Không dùng log 01/11 làm hiện trạng | SRS §7/9/10; [DID-53 comment 10043](https://ntdat2428.atlassian.net/browse/DID-53?focusedCommentId=10043) | Revision được quan sát trong PDF, chưa là independent approval. Optional scope và đồng bộ editable RTM pending. |
| D-05 | 03/11/2026, người dùng xác nhận trong chat | 03/11/2026 | Họp đủ bốn thành viên 09:00–10:00, online qua Discord của team; actions thống nhất theo PA2 | [Minutes](../meetings/2026-11-03-tuesday-pa2.md) | Attendance/time/channel được người dùng xác nhận; không coi là review/approval SRS. Nội dung action chi tiết dẫn PA2, direct reviewer response pending. |

## 2. Scope-change / BA / TA questions — PENDING

“Đầu mối” lấy từ role/task để theo dõi, không tuyên bố người đó đã nhận action tại cuộc họp. Không có ngày gửi, hạn mới hay ngày trả lời được tự điền.

| ID / Jira | Requirement / UC | Câu hỏi cần đóng và impact | Đầu mối | Gửi / phản hồi / trạng thái |
| --- | --- | --- | --- | --- |
| Q-01 · DID-40/56/58 | F04; BR-07; scope PA0→PA1 | Giải thích và xác nhận quy tắc scope hiện hành: Jira/PA1 index yêu cầu TA confirmation, SRS mới nói TA không là approver. Xác nhận có cần hỏi TA về yêu cầu bài hay chỉ nội bộ nhóm; lưu nguồn quyết định thật. | Hiếu + Tiến | **PENDING**; chưa có bằng chứng đã gửi TA, không gán TA là approver mới. |
| Q-02 · DID-46/43 | BR-01; FR-03/12; UC-01/09/13 | Chọn AQI scale, nguồn tính/chuyển PM2.5→AQI, nhãn và handling categories. UI hiện hiển thị US AQI không tự là quyết định BA. | Tiến; Hiếu hỗ trợ nguồn | **PENDING** BA response; ngày/approval pending. |
| Q-03 · DID-46/43/49 | BR-03; FR-01/02/05/10; UC-02/08/10 | Chốt freshness per source, forecast metric/horizon/issue time; xử lý mismatch SCR-03 24h AQI với AC PM2.5 1–6h. | Tiến + Hiếu + Đạt | **PENDING**; không dùng cấu hình code thay yêu cầu đã duyệt. |
| Q-04 · DID-46/47 | BR-05; FR-08/09; UC-06/07/11 | Chốt > hay ≥, crossing/trigger, stale/invalid input, duplicate-event identity và timezone. | Tiến + Hào | **PENDING**; SRS §9 ghi khác biệt Figma/code. |
| Q-05 · DID-44/48/49/50/53 | FR-11–13; UC-12–14 | Deliver/defer optional scope; actor UC-12; metric/dataset; screens FR-11/13; approval draft AC và specs. | Tiến + Hào + Đạt | **PENDING**; draft AC mới không đồng nghĩa optional scope được cam kết. |
| Q-06 · DID-45/52/54 | NFR-01–08 | Chốt môi trường/cách đo feasibility, accessibility/runtime/user tests. | Hiếu + Hào + Đạt | **PENDING**; chưa có execution/test-pass claim. |
| Q-07 · DID-57/58 | Baseline toàn PA2 | Xác nhận editable revision tương ứng PDF, final PR, deadline Moodle và receipt/timestamp nộp thực tế. | Hiếu + Đạt | **PENDING**; Jira Done không thay receipt/acceptance. |

## 3. Quy tắc cập nhật

Khi có câu trả lời, thêm ngày thực tế, người trả lời, permalink comment/PR hoặc tài liệu version cố định, quyết định, requirement/UC bị tác động, commit sửa và reviewer. Giữ dòng lịch sử; supersede bằng dòng mới thay vì sửa ngày quá khứ. Không đóng pending bằng việc hết hạn hoặc không có phản hồi.
