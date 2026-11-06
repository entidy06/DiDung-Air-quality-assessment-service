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
| AC-F05-01: xác thực hợp lệ và vùng preferences chỉ dành tài khoản đã xác thực | TC-01, TC-06, TC-10 OAuth | OAuth/profile đã chạy; email/password và cách ly hai tài khoản chưa đủ |
| AC-F05-02: credentials bị từ chối, lỗi không chứa secret | TC-02/03/04/08 | Rejected credentials đã quan sát; unavailable/network chưa chạy |
| AC-F05-05: request trái phép trả 401/403, không lộ/thay đổi dữ liệu riêng | TC-06/07 | Guest `/api/me` đã 401; không bao phủ cross-account hoặc mọi preferences API |
| AC-F05-04: đăng ký và xác minh theo provider | Ngoài phạm vi login hiện tại | Không tạo thêm tài khoản hoặc coi OAuth đã chứng minh toàn bộ registration |
| NFR-07: viewport 390px/1440px; accessibility liên quan NFR-04 | TC-09 | Visual/label/focus quan sát được; chưa phải audit WCAG hoặc bộ screen đầy đủ |

## Checklist thực thi

Precondition chung: production truy cập được; guest trừ khi dòng ghi khác. Mỗi TC được đánh dấu Blocked nếu còn phần bắt buộc chưa chạy, dù một số bước đã thành công. Pass không suy rộng sang các thiết bị/build khác.

| ID | Precondition / test data | Steps | Expected result | Actual result / evidence | Status |
| --- | --- | --- | --- | --- | --- |
| TC-LOGIN-01 | QA-A có email/password hợp lệ; guest | Mở `/login`; người dùng tự nhập credentials; submit; kiểm tra URL và trạng thái tài khoản | Login thành công, tới đích đã thống nhất, trạng thái signed-in | Sau handoff do người dùng nhận nhập email/password, quan sát URL `/#chapter-air`, header Tài khoản, nút Đăng xuất, khu vực preferences khả dụng. Không quan sát trực tiếp thao tác submit/phương thức cuối cùng; đích chuẩn của build deploy chưa được developer xác nhận, nên chưa coi toàn ca email/password là Pass | Blocked |
| TC-LOGIN-02 | QA-A; mật khẩu cố ý sai | Nhập email QA-A và mật khẩu sai; submit một lần; so sánh với TC-03 | Không đăng nhập; lỗi chung, không tiết lộ tài khoản có tồn tại hay dữ liệu nhạy cảm | Hiện `Invalid login credentials`, form được mở lại, cùng thông báo TC-03. Xóa cả hai trường trước khi chụp [E08](evidence/08-wrong-password-error-cleared-fields.jpg). Cần xác nhận QA-A có password login để phân biệt sai mật khẩu với OAuth-only | Blocked |
| TC-LOGIN-03 | QA-N, mật khẩu giả; không tạo tài khoản `.invalid` | Mở `/login`; nhập QA-N và mật khẩu giả; Enter | Từ chối, thông báo chung, không stack trace/token | `Đang xử lý…`, tất cả điều khiển form disabled; sau đó `Invalid login credentials`, form enabled, URL vẫn `/login`; [E02](evidence/02-invalid-account.jpg) | Pass |
| TC-LOGIN-04 | Chuỗi rỗng; QA-N; BAD-EMAIL | Submit hai trường rỗng; điền email hợp lệ nhưng để trống password rồi submit; nhập BAD-EMAIL rồi submit | Chặn form, chỉ ra trường cần sửa, focus đúng chỗ | Hai lần `Please fill out this field.` với focus lần lượt Email/Mật khẩu; BAD-EMAIL đưa focus Email, không rời form. [E01](evidence/01-invalid-email.jpg) chỉ minh chứng focus, không chụp được native tooltip | Pass |
| TC-LOGIN-05 | QA-N; công cụ đếm request đã khử secret | Enter để submit; double-click Login; đối chiếu số auth requests | Enter tương đương click; pending ngăn gửi trùng, chỉ một request cho một thao tác | Enter thực sự gửi (TC-03); double-click lúc 16:51 đưa form vào pending disabled, rồi trả lỗi credentials và enabled lại. Chưa đếm request; không khẳng định chống duplicate hoàn chỉnh | Blocked |
| TC-LOGIN-06 | Phiên QA-A qua OAuth đã thành công | Vào `/profile`; reload; Đăng xuất; Back; mở trực tiếp `/profile` | Reload giữ signed-in; logout chấm dứt UI session; Back/URL không lộ dữ liệu riêng | Có tài khoản/nút Đăng xuất sau reload; logout xong hiện lời mời login. Back về `/#chapter-air` có lời mời login; URL `/profile` cũng chặn dữ liệu riêng. [E06](evidence/06-oauth-authenticated-header.jpg), [E07](evidence/07-after-logout-profile.jpg). Không kiểm tra token replay/server revocation | Pass |
| TC-LOGIN-07 | Guest; thêm session hết hạn/invalid được developer chuẩn bị | Mở `/profile`; GET `/api/me` không cookie; lặp với session hết hạn/invalid | Không lộ dữ liệu riêng; API từ chối, UI hướng dẫn login | Guest `/profile` chỉ có lời mời login [E05](evidence/05-guest-profile.jpg); API HTTP 401, `{"error":"Unauthorized"}`. Chưa có session hết hạn/invalid được chuẩn bị | Blocked |
| TC-LOGIN-08 | QA-N; điều kiện offline/5xx có kiểm soát | Submit, quan sát pending; ngắt mạng/fault injection; khôi phục và retry | Loading rõ, không treo vô hạn; lỗi an toàn, retry được | Pending và hồi phục sau lỗi credentials đã thấy; chưa mô phỏng lỗi mạng/server. Timeout công cụ và DNS sandbox không được coi là lỗi của sản phẩm | Blocked |
| TC-LOGIN-09 | Desktop CSS 1440×900, mobile CSS 390×844; bàn phím | Kiểm tra form, label, focus; dùng Tab/Enter; kiểm tra validation và error alert | Nội dung không chồng lấp; label/focus nhận biết; tương tác được bằng bàn phím | Accessible name Email/Mật khẩu, `alert`, focus ring, Enter hoạt động. Tab: Email → Mật khẩu → Login → Google. DOM `scrollWidth == innerWidth` ở 390 và 1440; không có input/button/link vượt mép theo bounding rect tại 390. [E10](evidence/10-mobile-css-390.jpg)/[E11](evidence/11-desktop-css-1440.jpg) bổ sung đúng CSS width; ảnh mobile bị cắt phần mép phải của bề mặt capture, chưa xác nhận visual toàn mép trên thiết bị thật. Không coi ảnh capture này là Bug ứng dụng hoặc audit WCAG hoàn chỉnh | Blocked |
| TC-LOGIN-10 | QA-A Google OAuth đã được người dùng cho phép | Google → chọn đúng QA-A → consent cơ bản → callback; kiểm tra tùy chọn forgot/remember và rate limit theo scope | OAuth trả về app và có session; tính năng không có được ghi N/A | OAuth về `/#chapter-air`, `/profile` signed-in (E06). Không thấy forgot password/remember me trên form: N/A cho UI build này. Rate limit chưa kiểm tra, cần scope/ngưỡng được thống nhất, không brute force production | Blocked |

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

Tạm thời: **10 TC chính: 3 Pass, 0 Fail, 7 Blocked, 0 N/A**. N/A chỉ ở subcase forgot password/remember me của TC-10; OAuth subcase đã thành công. Không đổi cả TC thành Pass khi chưa đủ bước.

Chưa phát hiện lỗi sản phẩm có đủ bằng chứng để mở Jira Bug riêng. 404 `/auth` và `/app` được ghi nhận là **deployment/baseline gap**, chưa kết luận regression: local yêu cầu route này nhưng chưa biết production triển khai commit nào. Không dùng đọc source local để báo runtime Pass hay suy ra bypass xác thực.

Blocker còn lại: xác nhận phương thức password login/đích redirect sau handoff và password của QA-A cho TC-02; request count khi rapid click; session hết hạn/invalid; fault injection mạng/5xx; visual mép mobile đầy đủ; quyết định scope/rate-limit; deployment SHA; independent review. Tab và double-click UI đã chạy, không còn ghi chúng là chưa thực thi.

Retest: developer xác nhận deployment SHA, auth modes và đích redirect; dùng QA account đã chuẩn bị, không dùng tài khoản cá nhân khác. Chuẩn bị session expiry/fault injection ở môi trường kiểm soát, chạy lại phần Blocked và regression logout/guest gate trên đúng SHA. Không sửa auth/schema/UI trong task QA này.

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
