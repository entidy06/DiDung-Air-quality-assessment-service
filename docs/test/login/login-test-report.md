# Login QA — DID-61

**Trạng thái: đã có evidence thực thi; còn Blocked và chờ review, chưa đủ điều kiện đóng task.** Đây là QA sớm, không phải xác nhận hoàn tất PA5. Kết quả chỉ áp dụng cho production được quan sát, không tự áp dụng cho commit local.

## Môi trường và truy vết

| Thuộc tính | Giá trị |
| --- | --- |
| Task | [DID-61](https://ntdat2428.atlassian.net/browse/DID-61) |
| Tester phụ trách | Võ Đình Cao Minh Hào; thực thi có hỗ trợ AI, chưa có independent human review |
| Ngày thực thi | 06/11/2026, UTC+7; khoảng 16:34–16:52 |
| Môi trường | [Production](https://didung-air-quality.vercel.app/), trang login `/login` |
| Công cụ | Codex in-app browser, DOM/accessibility snapshot, screenshot JPEG; HTTP guest bằng curl không gửi cookie/Authorization |
| Viewport | Ban đầu dùng kích thước yêu cầu 390×844/1440×900; kiểm tra sau phát hiện CSS width thực là 354/1309. Đã bổ sung lượt có `innerWidth/innerHeight` đúng 390×844 và 1440×900. Không kiểm thử thiết bị di động thật |
| Commit production | **Chưa xác minh** — developer cần cung cấp deployment → Git SHA |
| Commit local đối chiếu | `4ea8e578d0066b5c82deb5d4e4323669ea1e7a22`, không phải bằng chứng version production |
| Nhánh evidence | `codex/qa-login-evidence`; không làm việc/push trên main |
| QA account | `QA-A`: tài khoản do người dùng chỉ định riêng trong phiên làm việc; không lưu email/password/token vào repo |
| Dữ liệu giả | `QA-N`: `qa-login-20261106@example.invalid`; `BAD-EMAIL`: `invalid-email`; mật khẩu cố ý sai không ghi giá trị |
| FR/AC/SRS | [SRS PA2](../../../pa/PA2/10-PA2.pdf): FR-06 → UC-04 → AC-F05-01/02/04/05; SCR-05 Sign in và SCR-06 protected view. PDF page 12 và 34 đã render/đối chiếu; approval baseline của revision vẫn cần reviewer xác nhận |
| Hạn task | Mô tả DID-61 ghi 30/10/2026; trường due date Jira hiện ghi 06/11/2026. Không sửa hoặc backdate kết quả |

## Liên kết yêu cầu

SRS §9 (trang in 32 / PDF page 34) liên kết FR-06 với UC-04, AC-F05-01/02/04/05 và SCR-05/06. SRS §5.4 (trang in 10 / PDF page 12) mô tả các AC này. Đây là traceability của nội dung tài liệu hiện có, không phải xác nhận tất cả AC đã được chấp nhận hoặc test đầy đủ.

| Yêu cầu | TC liên quan | Giới hạn coverage |
| --- | --- | --- |
| AC-F05-01: xác thực hợp lệ và vùng preferences chỉ dành tài khoản đã xác thực | TC-01, TC-06, TC-10 OAuth | OAuth/profile đã chạy; email/password được người dùng xác nhận tại M01; cách ly hai tài khoản chưa kiểm thử |
| AC-F05-02: credentials bị từ chối, lỗi không chứa secret | TC-02/03/04/08 | Rejected credentials đã quan sát; unavailable/network chưa chạy |
| AC-F05-05: request trái phép trả 401/403, không lộ/thay đổi dữ liệu riêng | TC-06/07 | Guest `/api/me` đã 401; không bao phủ cross-account hoặc mọi preferences API |
| AC-F05-04: đăng ký và xác minh theo provider | Ngoài phạm vi login hiện tại | Không tạo thêm tài khoản hoặc coi OAuth đã chứng minh toàn bộ registration |
| NFR-07: viewport 390px/1440px; accessibility liên quan NFR-04 | TC-09 | Visual/label/focus quan sát được; chưa phải audit WCAG hoặc bộ screen đầy đủ |

## Checklist thực thi

Precondition chung: production truy cập được; guest trừ khi dòng ghi khác. Mỗi TC được đánh dấu Blocked nếu còn phần bắt buộc chưa chạy, dù một số bước đã thành công. Pass không suy rộng sang các thiết bị/build khác.

| ID | Precondition / test data | Steps | Expected result | Actual result / evidence | Status |
| --- | --- | --- | --- | --- | --- |
| TC-LOGIN-01 | QA-A có email/password hợp lệ; guest | Mở `/login`; người dùng tự nhập credentials; submit; kiểm tra URL và trạng thái tài khoản | Login thành công, tới `/#chapter-air`, trạng thái signed-in | Người dùng xác nhận đã kiểm thử tay bằng credentials hợp lệ và `/#chapter-air` là đích đúng. Khớp quan sát sau handoff: header Tài khoản, nút Đăng xuất, preferences khả dụng. Nguồn bổ sung: M01 | Pass |
| TC-LOGIN-02 | QA-A có password login; mật khẩu cố ý sai | Nhập email QA-A và mật khẩu sai; submit; so sánh với TC-03 | Từ chối, lỗi chung, không lộ dữ liệu nhạy cảm | Người dùng xác nhận kiểm thử tay hiện `Invalid login credentials`; TC-01 đã xác nhận password login hợp lệ. Khớp kết quả quan sát trước và [E08](evidence/08-wrong-password-error-cleared-fields.jpg). Nguồn: M01 | Pass |
| TC-LOGIN-03 | QA-N, mật khẩu giả; không tạo tài khoản `.invalid` | Mở `/login`; nhập QA-N và mật khẩu giả; Enter | Từ chối, thông báo chung, không stack trace/token | `Đang xử lý…`, tất cả điều khiển form disabled; sau đó `Invalid login credentials`, form enabled, URL vẫn `/login`; [E02](evidence/02-invalid-account.jpg) | Pass |
| TC-LOGIN-04 | Chuỗi rỗng; QA-N; BAD-EMAIL | Submit hai trường rỗng; điền email hợp lệ nhưng để trống password rồi submit; nhập BAD-EMAIL rồi submit | Chặn form, chỉ ra trường cần sửa, focus đúng chỗ | Hai lần `Please fill out this field.` với focus lần lượt Email/Mật khẩu; BAD-EMAIL đưa focus Email, không rời form. [E01](evidence/01-invalid-email.jpg) chỉ minh chứng focus, không chụp được native tooltip | Pass |
| TC-LOGIN-05 | QA-N; quan sát UI và đếm request thủ công | Enter để submit; double-click Login; kiểm tra xử lý request trùng | Enter tương đương click; không xử lý đăng nhập trùng ngoài ý muốn | Enter/double-click và pending disabled đã quan sát. Người dùng xác nhận đã đếm request và server xử lý việc trùng. Chấp nhận kết quả kiểm thử tay M01; chưa có số đếm cụ thể hoặc network trace đính kèm, không tự khẳng định chỉ một HTTP request | Pass |
| TC-LOGIN-06 | Phiên QA-A qua OAuth đã thành công | Vào `/profile`; reload; Đăng xuất; Back; mở trực tiếp `/profile` | Reload giữ signed-in; logout chấm dứt UI session; Back/URL không lộ dữ liệu riêng | Có tài khoản/nút Đăng xuất sau reload; logout xong hiện lời mời login. Back về `/#chapter-air` có lời mời login; URL `/profile` cũng chặn dữ liệu riêng. [E06](evidence/06-oauth-authenticated-header.jpg), [E07](evidence/07-after-logout-profile.jpg). Không kiểm tra token replay/server revocation | Pass |
| TC-LOGIN-07 | Guest; thêm session hết hạn/invalid được developer chuẩn bị | Mở `/profile`; GET `/api/me` không cookie; lặp với session hết hạn/invalid | Không lộ dữ liệu riêng; API từ chối, UI hướng dẫn login | Guest `/profile` chỉ có lời mời login [E05](evidence/05-guest-profile.jpg); API HTTP 401, `{"error":"Unauthorized"}`. Chưa có session hết hạn/invalid được chuẩn bị | Blocked |
| TC-LOGIN-08 | QA-N; điều kiện offline/5xx có kiểm soát | Submit login khi mất mạng; khôi phục và retry; kiểm tra server 5xx | Loading rõ, lỗi an toàn, retry được, không treo | Người dùng kiểm thử tay: mất mạng không làm phiên đang đăng nhập bị đăng xuất; người dùng giải thích là do cache (chưa xác minh cơ chế). Đây là kiểm tra giữ phiên khi offline, chưa chứng minh submit login lúc offline/timeout/5xx và retry. Pending/hồi phục sau lỗi credentials đã quan sát. Nguồn: M01 | Blocked |
| TC-LOGIN-09 | Desktop/mobile; bàn phím | Kiểm tra layout, label, focus, Tab/Enter và validation | Không lỗi bố cục; label/focus rõ; dùng được bàn phím | Người dùng xác nhận kiểm thử tay không lỗi giao diện (M01), giải quyết khoảng trống visual do ảnh capture bị cắt mép. Đã quan sát label/alert/focus, Tab Email → Mật khẩu → Login → Google, Enter; DOM không overflow tại CSS 390/1440px. [E10](evidence/10-mobile-css-390.jpg)/[E11](evidence/11-desktop-css-1440.jpg). Không suy thành audit WCAG đầy đủ | Pass |
| TC-LOGIN-10 | QA-A; tùy chọn hiện có trên build | Google OAuth; kiểm tra forgot password/remember me; xác minh rate-limit khi nhập sai liên tiếp nếu thuộc scope | OAuth thành công; tính năng chưa triển khai ghi N/A; rate-limit theo ngưỡng được xác nhận | OAuth đã thành công (E06). Người dùng xác nhận chưa có Forgot password/remember me: N/A / Not Implemented; có OAuth; chưa biết rate-limit khi nhập nhiều lần (M01). Phần rate-limit còn chưa xác minh, nên TC tổng giữ Blocked | Blocked |

## Evidence và ghi chép đã khử dữ liệu

Ảnh được chụp trực tiếp từ browser; không dựng lại kết quả. E06 cắt ngay khi chụp, chỉ giữ header để tránh email ở phần profile. E08 xóa dữ liệu trong form trước khi chụp, giữ nguyên lỗi nhận được. Không lưu HAR, cookies, session storage hoặc URL OAuth/callback có tham số vào repo.

| Evidence | Giờ lưu ảnh UTC+7, 06/11/2026 (filesystem mtime) | URL / nội dung |
| --- | --- | --- |
| E01 | 16:40:11 | `/login`; BAD-EMAIL focus; [ảnh](evidence/01-invalid-email.jpg) |
| E02 | 16:40:40 | `/login`; tài khoản giả, lỗi chung; [ảnh](evidence/02-invalid-account.jpg) |
| E03 | 16:40:55 | `/login`; viewport mobile, các trường đã xóa; [ảnh](evidence/03-mobile-390.jpg) |
| E04 | 16:41:13 | `/app`; 404 trên build deploy; [ảnh](evidence/04-guest-app.jpg) |
| E05 | 16:41:27 | `/profile`; guest bị chặn dữ liệu; [ảnh](evidence/05-guest-profile.jpg) |
| E06 | 16:43:12 | `/profile`; header signed-in sau OAuth; [ảnh](evidence/06-oauth-authenticated-header.jpg) |
| E07 | 16:43:55 | `/profile`; guest sau logout và truy cập trực tiếp; [ảnh](evidence/07-after-logout-profile.jpg) |
| E08 | 16:44:28 | `/login`; lỗi mật khẩu sai, đã xóa credentials; [ảnh](evidence/08-wrong-password-error-cleared-fields.jpg) |
| E10 | 16:50:56 | `/login`; DOM CSS 390×844; [ảnh](evidence/10-mobile-css-390.jpg), có giới hạn capture mép phải |
| E11 | 16:50:56 | `/login`; DOM CSS 1440×900; [ảnh](evidence/11-desktop-css-1440.jpg) |

E03 là cấu hình yêu cầu 390px ban đầu, chưa dùng làm bằng chứng NFR-07 vì CSS width sau đó được phát hiện là 354px. E10/E11 đã đo `innerWidth/innerHeight` trực tiếp. Số ảnh nhảy E08 → E10: capture E09 không chứa tín hiệu xác minh nên đã loại trước khi commit; không dùng ảnh trống làm evidence.

Ghi chép HTTP (không có credentials):

```text
2026-11-06 16:37 UTC+7
HEAD https://didung-air-quality.vercel.app/auth
HTTP/2 404
server: Vercel
x-matched-path: /404

2026-11-06 khoảng 16:42 UTC+7
GET https://didung-air-quality.vercel.app/api/me
Cookie: không gửi
Authorization: không gửi
HTTP 401
Body: {"error":"Unauthorized"}
```

Các giờ trong bảng là thời điểm lưu ảnh, không phải thời gian chính xác từng request. Tool initialization có lần timeout; curl trong sandbox lần đầu không resolve DNS nhưng request ngoài sandbox sau đó thành công. Những lỗi hạ tầng thực thi này không phải Bug ứng dụng.

## Tổng kết, bug và blocker

Cập nhật theo kiểm thử tay M01: **10 TC chính: 7 Pass, 0 Fail, 3 Blocked, 0 N/A**. Pass gồm TC-01/02/03/04/05/06/09; Blocked gồm TC-07/08/10. N/A chỉ ở subcase forgot password/remember me của TC-10; OAuth subcase đã thành công. Không đổi cả TC thành Pass khi chưa đủ bước.

**Theo yêu cầu ghi nhận của người dùng: TC-LOGIN-07, TC-LOGIN-08 và TC-LOGIN-10 chưa Pass trong đợt kiểm thử này.** Ba TC giữ trạng thái **Blocked**, không phải lỗi sản phẩm đã được xác minh (Fail). Phần chưa Pass lần lượt là xử lý session hết hạn/không hợp lệ; gửi login khi mất mạng/lỗi server và thử lại; xác minh rate-limit khi nhập sai nhiều lần. Ghi nhận này hoàn tất việc cập nhật tài liệu theo yêu cầu, không tự chuyển ba TC sang Pass hoặc xác nhận toàn bộ chức năng login đạt yêu cầu.

Chưa phát hiện lỗi sản phẩm có đủ bằng chứng để mở Jira Bug riêng. 404 `/auth` và `/app` được ghi nhận là **deployment/baseline gap**, chưa kết luận regression: local yêu cầu route này nhưng chưa biết production triển khai commit nào. Không dùng đọc source local để báo runtime Pass hay suy ra bypass xác thực.

Blocker còn lại: TC-07 session hết hạn/invalid; TC-08 submit login lúc offline/timeout/5xx và retry; TC-10 rate-limit khi nhập sai nhiều lần (hoặc quyết định ngoài scope). Ngoài kết quả TC: deployment SHA và independent review vẫn chưa đủ. Các xác nhận về credentials hợp lệ, redirect, xử lý request trùng và giao diện đã được người dùng bổ sung, không còn ghi là blocker.

Retest: chuẩn bị session hết hạn/invalid và lỗi mạng/server ở môi trường kiểm soát; xác nhận ngưỡng/scope rate-limit rồi kiểm tra phù hợp. Bổ sung deployment SHA và review. Không sửa auth/schema/UI trong task QA này.

## M01 — kết quả kiểm thử tay do người dùng xác nhận

Nguồn: tin nhắn trực tiếp của người dùng trong chat này, nhận ngày 06/11/2026 (UTC+7), sau lượt QA ban đầu. Đây là kết quả do người dùng thực thi/xác nhận, không phải lượt AI chạy lại và không phải independent peer review.

- TC-01: đăng nhập hợp lệ; `/#chapter-air` là đường dẫn đúng.
- TC-02: hiện `Invalid login credentials`.
- TC-05: người dùng đã đếm và xác nhận server xử lý việc trùng; chưa cung cấp số đếm/network trace.
- TC-07: chưa biết kết quả session hết hạn/invalid.
- TC-08: mất mạng không làm phiên đăng nhập bị đăng xuất; “vì có cache” là giải thích của người dùng, chưa xác minh kỹ thuật. Chưa có kết quả gửi login khi offline/5xx.
- TC-09: không lỗi giao diện; chưa cung cấp browser/device cụ thể hoặc ảnh bổ sung.
- TC-10: chưa có Forgot password/remember me; có OAuth; chưa xác minh rate-limit khi nhập nhiều lần.

Ảnh/checksum ban đầu được giữ nguyên. Reviewer cần phân biệt evidence quan sát trực tiếp với các xác nhận thủ công M01; không tự dựng ảnh/log cho M01.

## Review và điều kiện đóng

- Commit evidence đầu tiên: [2f0e6b2](https://github.com/entidy06/DiDung-Air-quality-assessment-service/commit/2f0e6b2), cập nhật runtime/viewport [2341450](https://github.com/entidy06/DiDung-Air-quality-assessment-service/commit/2341450); đã push lên [nhánh QA](https://github.com/entidy06/DiDung-Air-quality-assessment-service/tree/codex/qa-login-evidence). [PR #14](https://github.com/entidy06/DiDung-Air-quality-assessment-service/pull/14) mở để review, chưa merge.
- Jira comment kết quả/blocker: [10048](https://ntdat2428.atlassian.net/browse/DID-61?focusedCommentId=10048), đã đăng ngày 06/11/2026; task giữ In Progress.
- Reviewer: đã gửi yêu cầu Nguyễn Thành Đạt (`entidy06`) lúc 16:54 UTC+7 ngày 06/11/2026; [review request event](https://github.com/entidy06/DiDung-Air-quality-assessment-service/pull/14#event-35335385714). **Sign-off pending**; yêu cầu review không có nghĩa review đã hoàn tất. AI self-check không thay thế review của thành viên.
- Bug fix/retest links: N/A, chưa mở Bug đã xác minh.
- Không chuyển DID-61 sang Done khi các gap bắt buộc và review còn mở.
- `git diff --check` và checksum ảnh đã kiểm tra; không sửa code ứng dụng, không tạo test tự động, không chạy build/lint/typecheck cho thay đổi chỉ gồm tài liệu/ảnh.

## Nguồn đã đối chiếu

- [DID-61](https://ntdat2428.atlassian.net/browse/DID-61): scope, DoD, assignee, status và due date đọc trực tiếp Jira ngày 06/11/2026.
- Production và ảnh/DOM thực tế là căn cứ kết quả; source local chỉ dùng tìm route và đối chiếu baseline.
- [Spec phân tách theo role](../../specs/2026-11-02-role-based-site-separation.md): ma trận route và redirect local, chưa chứng minh deploy.
- [Supabase Password-based Auth](https://supabase.com/docs/guides/auth/passwords), [signOut](https://supabase.com/docs/reference/javascript/auth-signout), [getUser](https://supabase.com/docs/reference/javascript/auth-getuser), truy cập 06/11/2026: nguồn chính thức tham khảo auth; tài liệu không thay thế evidence runtime.
- [pypdf extract text](https://pypdf.readthedocs.io/en/stable/user/extract-text.html): API chính thức dùng đọc SRS; đối chiếu trực quan PDF page 12/34 bằng renderer đi kèm runtime. Không sửa PDF.
