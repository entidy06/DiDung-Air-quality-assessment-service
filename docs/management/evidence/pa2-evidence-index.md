# PA2 — Evidence Index

Lập ngày **03/11/2026 (UTC+7)** theo yêu cầu DID-56. Người phụ trách Jira: **Trương Lê Trung Hiếu**. Biên soạn có trợ giúp Codex; chưa phải xác nhận tác quyền hoặc approval của thành viên. Snapshot repository: `e77827d4f2dcf2de59c709286f5e989ea0b1c9a1`.

**Trạng thái hồ sơ: PENDING independent review và đóng gaps.** Jira DID-56 đang Done tại thời điểm kiểm tra; trạng thái workflow này không chứng minh DoD đã đạt. Các file mới đang ở working tree, commit/PR của DID-56: **PENDING**.

Đã gửi Hào yêu cầu human review thực ngày 03/11/2026: [comment 10046](https://ntdat2428.atlassian.net/browse/DID-56?focusedCommentId=10046), kèm [bundle bốn file Markdown](https://ntdat2428.atlassian.net/secure/attachment/10046/pa2-evidence-review-2026-11-03.zip). Phản hồi, sửa feedback và approval **PENDING**. Bundle giữ snapshot trước khi gửi; các permalink trong index/tracker local được bổ sung sau khi gửi thành công.

## 1. Nguồn và cách đọc

- [DID-21 — PA2](https://ntdat2428.atlassian.net/browse/DID-21); [DID-56 — task này](https://ntdat2428.atlassian.net/browse/DID-56).
- [SRS PDF đã kiểm tra](../../../pa/PA2/10-PA2.pdf): 41 trang PDF, số trang in 1–39; commit [87c3e40](https://github.com/entidy06/DiDung-Air-quality-assessment-service/commit/87c3e40034da659f50eb2bf6f2ef14ff2500885f), author Git `entidy06`, 03/11/2026 10:20:49 UTC+7. Người commit không mặc nhiên là tác giả mọi section.
- [SRS editable được Jira dẫn](https://docs.google.com/document/d/1iTCpN58SFBmOCvT7D1vweUxGFiGsulWX-SrgWzOt7lw/edit): chưa kiểm tra trực tiếp revision/khả năng sửa và độ đồng bộ với PDF; **PENDING**.
- [Figma](https://www.figma.com/design/Ev67pGKl766yRwq4R7nu7G/DiDung-design?node-id=24-30405): liên kết từ repository và báo cáo accessibility; interaction/version hiện tại chưa được kiểm tra lại trong lượt này.
- [Evidence Index PA1](evidence-index.md) giữ nguyên như hồ sơ lịch sử; không chuyển approval PA1 sang PA2.

Các dòng dưới bao phủ toàn bộ **DID-40–DID-58** của epic PA2. “Owner” lấy từ Jira, “author” chỉ ghi theo bằng chứng; nếu chưa có xác nhận cá nhân thì pending. Requirement/UC mappings theo SRS PDF snapshot trên, chưa là baseline mới được duyệt. Các attachment được xác nhận metadata trên Jira; nội dung attachment chưa được tải/đối chiếu trong lượt này.

## 2. Issue → author → deliverable → commit/PR → reviewer → result

| Jira / owner hiện tại | Author / nguồn tác quyền | Deliverable có thể mở | Requirement / use case | Commit / PR | Reviewer / review result và gap |
| --- | --- | --- | --- | --- | --- |
| [DID-40](https://ntdat2428.atlassian.net/browse/DID-40) · Tiến | Tác giả section: pending | SRS §2.1, §10; [scope log](../decisions/pa2-scope-decision.md) | F01–F10; BR-07; FR-01–13 | PDF: 87c3e40; log mới: pending | Hiếu là đầu mối theo task; direct sign-off pending; khác biệt TA-role được ghi Q-01. |
| [DID-41](https://ntdat2428.atlassian.net/browse/DID-41) · Tiến | Tác giả section: pending | SRS §2–3: Introduction, Glossary, Problem | FR-01–13; UC-01–14 (bối cảnh) | PDF: 87c3e40; PR PA2 riêng: pending | Independent review của revision này pending. |
| [DID-42](https://ntdat2428.atlassian.net/browse/DID-42) · Tiến | Tác giả section: pending | SRS §4 Stakeholders | FR-03–09; UC-01–07 | PDF: 87c3e40 | Nguồn là phân tích tài liệu; không có bằng chứng phỏng vấn. Review pending. |
| [DID-43](https://ntdat2428.atlassian.net/browse/DID-43) · Hiếu | Hiếu được SRS §10 ghi nhận review; author khảo sát pending | SRS §10 finding 3; [backend source notes](../../specs/2026-10-22-backend-schema.md) | FR-01/02/04/05; BR-02/03; UC-08/09/10 | [PR #8](https://github.com/entidy06/DiDung-Air-quality-assessment-service/pull/8) là bằng chứng kỹ thuật liên quan | PR #8 có APPROVED bởi Hiulaptop, 24/10/2026 19:28:12 UTC+7, [review](https://github.com/entidy06/DiDung-Air-quality-assessment-service/pull/8#pullrequestreview-5638235510); không phải approval của khảo sát PA2. Runtime samples/coverage/license fit hiện tại pending. |
| [DID-44](https://ntdat2428.atlassian.net/browse/DID-44) · Tiến | SRS §11 ghi Đạt draft bằng ChatGPT; tác quyền cuối từng FR pending | SRS §5.1 FR-01–13 | UC-01–14 | PDF: 87c3e40 | BA feedback current revision pending; không suy approval từ Done. |
| [DID-45](https://ntdat2428.atlassian.net/browse/DID-45) · Hiếu | Tác giả section: pending | SRS §5.2 NFR-01–08 | UC-01–11; NFR-01–08 | PDF: 87c3e40 | Các ngưỡng là proposed; review feasibility và kết quả đo pending. |
| [DID-46](https://ntdat2428.atlassian.net/browse/DID-46) · Tiến | Tác giả section: pending | SRS §5.3 BR-01–07 | FR-01–10; UC-08–11 | PDF: 87c3e40 | BR-01/03/05 pending; xem Q-02–04 trong decision log. |
| [DID-47](https://ntdat2428.atlassian.net/browse/DID-47) · Hào | SRS §11 ghi Hào review/edit AI draft | SRS §5.4; [acceptance-scenarios.md — attachment 10038](https://ntdat2428.atlassian.net/secure/attachment/10038/acceptance-scenarios.md) | Must FR-01–10; optional FR-11–13; UC-01–14 | PDF: 87c3e40; attachment chưa có Git commit được xác minh | Hiếu/third reviewer là owner-reported theo SRS; third identity Unknown. Review current additions pending; không có test-pass claim. |
| [DID-48](https://ntdat2428.atlassian.net/browse/DID-48) · Hào | SRS §11 ghi Hào chỉnh diagram | SRS §6; [editable Draw.io 10039](https://ntdat2428.atlassian.net/secure/attachment/10039/use-case-diagram.drawio); [PNG 10040](https://ntdat2428.atlassian.net/secure/attachment/10040/use-case-diagram.png); [source ZIP 10041](https://ntdat2428.atlassian.net/secure/attachment/10041/use-case-diagram-source-bundle.zip) | UC-01–14; FR-01–13 | PDF: 87c3e40; diagram commit pending | UML review và đồng bộ diagram/list/spec revision pending. |
| [DID-49](https://ntdat2428.atlassian.net/browse/DID-49) · Tiến | SRS §11 ghi Hào hỗ trợ UC draft; author cuối từng UC pending | SRS §7: 11 Must specs UC-01–11 | FR-01–10; UC-01–11 | PDF: 87c3e40 | UC-12–14 detailed specs chờ optional-scope decision; review các additions pending. |
| [DID-50](https://ntdat2428.atlassian.net/browse/DID-50) · Đạt | Đạt theo SRS/Jira; PR #10 author entidy06 | SRS §8 inventory SCR-01–07; Figma ở §1 | UC-01–07/09/10; FR-03–10 | [PR #10](https://github.com/entidy06/DiDung-Air-quality-assessment-service/pull/10) | GitHub review submissions #10: rỗng. BA/Designer crosswalk và saved-location screen pending. |
| [DID-51](https://ntdat2428.atlassian.net/browse/DID-51) · Đạt | Đạt theo Jira/SRS | Figma ở §1; SRS §8–9 | SCR-01–07; UC-01–07/09/10 | PR #10; PDF: 87c3e40 | Interactive walkthrough, version pin, responsive/error/stale states và current independent approval pending. |
| [DID-52](https://ntdat2428.atlassian.net/browse/DID-52) · Đạt | Owner Đạt; Git author entidy06 | [Accessibility report](../../design/pa2/accessibility-review.md) | NFR-04/07; UC-01–07/09/10 | [c128adf](https://github.com/entidy06/DiDung-Air-quality-assessment-service/commit/c128adfb65bcb0212eb2cfa55094e55d8bd1a8fe) | Hào được mời qua [comment 10045](https://ntdat2428.atlassian.net/browse/DID-52?focusedCommentId=10045); báo cáo ghi phản hồi/approval pending. Keyboard/runtime kiểm tra pending. |
| [DID-53](https://ntdat2428.atlassian.net/browse/DID-53) · Hào | Hào theo Jira comments | SRS §9; [editable RTM được Jira dẫn](https://drive.google.com/file/d/10gnX4mrTUYXJMq2V5UAEGc-myCwV2SV2/view) | FR-01–13 → UC/AC/SCR; PA3/PA4 TBD | PDF: 87c3e40; RTM source commit pending | [10043](https://ntdat2428.atlassian.net/browse/DID-53?focusedCommentId=10043) là snapshot 01/11. PDF mới có optional draft AC; không giữ nhận định cũ “FR-11–13 chưa AC” như hiện trạng. Đồng bộ Drive và approval revision mới pending. |
| [DID-54](https://ntdat2428.atlassian.net/browse/DID-54) · Hào | Hào, AI-assisted desk review theo comment | SRS §10; [review record attachment 10045](https://ntdat2428.atlassian.net/secure/attachment/10045/pa2-requirements-review%20%28f737ffbc-cdd3-4607-b5bb-840b9c95dc4a%29.md) | FR/NFR/BR/AC; UC-01–14 | PDF: 87c3e40; independent review PR pending | [Comment 10042](https://ntdat2428.atlassian.net/browse/DID-54?focusedCommentId=10042) nói chưa là independent human review. SRS ghi owner-reported approvals; không coi là direct sign-off. |
| [DID-55](https://ntdat2428.atlassian.net/browse/DID-55) · Tiến | SRS §11 ghi log Đạt/Hào; khai báo Tiến/Hiếu pending | SRS §1 và §11 | Toàn PA2; phân bổ 25% × 4 theo SRS ngày 02/11 | PDF: 87c3e40 | Jira In review; từng thành viên xác nhận contribution/evidence và AI usage pending. Không dùng PA1 logs thay PA2. |
| [DID-56](https://ntdat2428.atlassian.net/browse/DID-56) · Hiếu | Codex biên soạn theo yêu cầu người dùng; human review pending | File này; [decisions](../decisions/pa2-scope-decision.md); [minutes](../meetings/2026-11-03-tuesday-pa2.md); [review tracker](../reviews/pa2-evidence-review.md) | Toàn PA2; FR-01–13, UC-01–14 | **PENDING commit/PR** | Hào là reviewer được đề nghị; yêu cầu gửi và kết quả xem review tracker. Approval pending. |
| [DID-57](https://ntdat2428.atlassian.net/browse/DID-57) · Hiếu | Commit PDF entidy06; editor tích hợp cuối pending | SRS PDF ở §1; editable SRS linked | Toàn SRS; UC-01–11 specs; RTM | PDF: 87c3e40; không tìm thấy PR riêng tích hợp PA2 trong PR #1–12 | Có PDF trên main; source DOCX local, same-version editable, QA format và independent PR review pending. |
| [DID-58](https://ntdat2428.atlassian.net/browse/DID-58) · Đạt | Người nộp thực tế pending | Jira là đầu mối; receipt/file version nộp chưa có trong nguồn đã kiểm tra | Baseline toàn PA2 | Final submission commit/PR pending | Jira Done; Moodle receipt/timestamp, deadline chính thức và acceptance baseline **PENDING**. |

## 3. Truy vết nội dung và gaps hiện tại

| Requirement | Use case | Screen / section | Follow-up Jira |
| --- | --- | --- | --- |
| FR-01/02 | UC-08; UC-10/11 cho lỗi/validation | Background; §5/7/9 | DID-43/44/46/49/53 |
| FR-03 | UC-01/09/10 | SCR-02 | DID-44/49/50/51/53 |
| FR-04 | UC-03/09/10 | SCR-04; error AC còn pending theo §9 | DID-43/47/50/53 |
| FR-05 | UC-02/09/10 | SCR-03; 24h AQI vs PM2.5 1–6h còn mismatch theo §9 | DID-43/47/51/53 |
| FR-06 | UC-04 | SCR-05; SCR-06 là protected view | DID-44/49/50/53 |
| FR-07 | UC-05/06 | SCR-06 thresholds; saved-location CRUD evidence pending | DID-44/49/50/53 |
| FR-08/09 | UC-11 và UC-07; UC-06 hỗ trợ | Background; SCR-06/07; BR-03/05 pending | DID-46/47/49/53 |
| FR-10 | UC-01–03/10 | SCR-02–04 states | DID-47/49/51/53 |
| FR-11/12/13 | UC-12/13/14 | Optional specs pending; FR-12 candidate SCR-02/03; FR-11/13 screens pending | DID-44/48/49/50/53 |
| NFR-01–08; BR-01–07 | Các UC áp dụng trong SRS | NFR targets proposed; BR-01/03/05 chưa chốt | DID-45/46/52/54 |

## 4. DoD và điều kiện đóng

- [x] Có index chỉnh sửa được, đủ 19 work items PA2 với nguồn, traceability và gaps.
- [x] Decisions có ngày ghi thực 03/11/2026; không đổi ngày lịch sử hoặc tự phê duyệt scope.
- [x] Có minutes họp thứ Ba theo xác nhận thực tế của người dùng; nguồn xác nhận và giới hạn ghi rõ.
- [ ] Từng owner xác nhận author, source revision, actions và đóng gaps trong bảng.
- [ ] Reviewer khác thực sự đọc, phản hồi; sửa phản hồi và ghi direct approval cho version cụ thể.
- [ ] Commit/PR cho bộ DID-56 và file editable/PDF PA2 đồng version, Moodle/acceptance evidence được bổ sung.

**Chưa tuyên bố hoàn tất DoD.** Link private Jira/Drive/Figma cần người nhận có quyền truy cập; quyền của TA/người chấm chưa kiểm tra. Scope/TA questions tiếp tục pending theo decision log; đây không phải bằng chứng đã gửi câu hỏi cho TA.
