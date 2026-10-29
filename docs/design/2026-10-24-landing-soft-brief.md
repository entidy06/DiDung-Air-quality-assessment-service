# DiDung — landing page mềm mại, kể chuyện theo cuộn

Trạng thái: bản vẽ chờ người dùng duyệt theo AGENTS.md §5. Chưa sửa `src/`, API, database, dependency hay cấu hình triển khai. Preview: [landing-soft-preview.html](landing-soft-preview.html).

### Cập nhật nút đăng nhập

Người dùng phản hồi bản vẽ đẹp và yêu cầu thêm nút đăng nhập. Đã thêm **Đăng nhập ↗** nền olive ở góc phải header, cạnh nút thử minh họa; cùng kiểu bóng mềm. Màn hình ≤520px đặt nhóm hành động thành hàng riêng để giữ đủ vùng chạm. Trong preview, nút mở thông báo chưa kết nối đăng nhập, có nút quay lại và đóng bằng Escape; không thu thập thông tin tài khoản hoặc thay đổi auth backend. Đã kiểm tra lại cú pháp JavaScript; chưa có trình duyệt kết nối để xác nhận trực quan. API dialog được đối chiếu từ [MDN dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) và [showModal](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) trước khi viết.

## Căn cứ và quyết định thiết kế

Đã đọc các API trong `src/app/api/`, Model `src/lib/{air-quality,weather,open-meteo,ninerouter}.ts`, trang đầu, CSS hiện tại, README, `design.md`, `design_new` và `docs/design/legacy-neumorphism.md`.

`design.md` hiện là hướng editorial/flat, loại bỏ neumorphism và 3D. Yêu cầu người dùng ngày 24/10/2026 ưu tiên Neumorphism, Claymorphism, Playful/Hand-drawn, Organic/Nature và Pastel Soft. Bản đề xuất mới này tuân yêu cầu mới: lấy palette đang có trong `globals.css` và design cũ, giữ mạch kể chuyện và nguyên tắc minh bạch dữ liệu trong design hiện tại. Không coi các mockup cũ là sự duyệt cho bản mới.

- Nền/bề mặt cream `#FCECD8`; chữ brown `#6E3511`; olive `#597928`, forest `#486C2F`, sage `#91AC67`, butter `#F1E5A1`; orange/crimson cho trạng thái. Bóng sáng `#FFF9F0`, tối `#D9C7AE`.
- Nút/thẻ nổi từ nền bằng bóng kép; trạng thái chọn và input lõm. Không lồng quá hai mức nổi.
- Minh họa SVG gốc `assets/soft-garden.svg`: nhân vật Mầm, lá, đường cong, mây, mặt trời. Dùng gradient và bóng nhẹ tạo cảm giác đất sét; không dùng ảnh thật. Không thêm font hay dependency.
- Nội dung tiếng Việt; heading lớn, bo tròn; chữ viết tay nhỏ làm điểm nhấn, không áp cho dữ liệu.
- Desktop: lời mở đầu + minh họa hai cột; các chương đọc dọc với chỉ mục sticky. Mobile: một cột, không pin hoặc chặn cuộn. Reduced motion tắt smooth scroll; nội dung luôn hiện khi JavaScript không chạy.

## Feature phải xuất hiện và bằng chứng backend

“Bắt buộc” ở đây là danh sách nội dung cần giới thiệu để landing phản ánh năng lực backend hiện có; không tự thay baseline Must-have PA0/PA1 của nhóm. Có API chưa đồng nghĩa frontend đã hoàn thiện hoặc dịch vụ đang trả dữ liệu tốt. Lần này đọc source, không xác minh Supabase đang vận hành.

| Nội dung landing | Bằng chứng source | Phạm vi phải nói đúng |
| --- | --- | --- |
| Chọn khu vực TP.HCM | `src/app/api/locations/route.ts` | Trả địa điểm active gồm ID, tên, slug, tọa độ. Số 168 là thông tin seed/README, không coi API luôn có đúng 168 nơi. |
| AQI, PM2.5 hiện tại, chuẩn chỉ số, mức phân loại | `src/app/api/air-quality/current/route.ts`, `src/lib/air-quality.ts` | Có US AQI, European AQI, PM2.5, `valid_at`, `fetched_at`, nguồn và `modeled`; ghi rõ chuẩn đang hiển thị. Model ứng dụng gộp thành bốn mức; không đổi schema mức phân loại. |
| Bản đồ tổng hợp khu vực | `src/app/api/map/snapshot/route.ts` | Có tọa độ, chỉ số gần nhất trong cửa sổ 3 giờ hoặc null. Đủ dữ liệu dựng bản đồ; chưa có trang Mapbox hoàn chỉnh. Không phải bản đồ ngập/đường đi ít ô nhiễm. |
| Thời tiết hỗ trợ chuẩn bị | `src/app/api/weather/current/route.ts`, `src/lib/open-meteo.ts` | Mưa, xác suất mưa, độ ẩm, gió/hướng gió, UV, thời gian nắng. Chưa có nhiệt độ. |
| Lời khuyên dễ hiểu | `src/app/api/advisories/current/route.ts`, `src/app/api/sync/advisories/route.ts`, `src/lib/ninerouter.ts` | `summary`, `action`, `note`; sinh theo nhóm AQI + mưa + UV, không phải hồ sơ sức khỏe cá nhân. |
| Lịch sử và dự báo | `src/app/api/air-quality/history/route.ts`, `src/app/api/air-quality/forecast/route.ts` | Lịch sử mặc định 24 giờ; forecast mặc định 24, tham số cap 72 giờ. Đồng bộ mặc định lấy 2 ngày, không hứa luôn có đủ 72 giờ hay lịch sử dài hạn. “Lịch sử” vẫn là chuỗi dữ liệu mô hình. |
| Ngưỡng AQI/PM2.5 cá nhân | `src/app/api/me/thresholds/route.ts`, `src/app/api/me/thresholds/[id]/route.ts` | Cần đăng nhập; thêm, sửa ngưỡng/bật tắt, xóa; gắn location. Không suy diễn có API lưu địa điểm yêu thích chỉ vì DB có `user_locations`. |
| Trung tâm thông báo trong app | `src/app/api/jobs/evaluate-alerts/route.ts`, `src/app/api/me/notifications/route.ts`, `src/app/api/me/notifications/[id]/read/route.ts` | Tạo khi giá trị >= ngưỡng, chống trùng theo ngưỡng/ngày UTC, đọc danh sách/số chưa đọc/đánh dấu đã đọc. Chưa có push/email/SMS. |
| Tài khoản phục vụ cá nhân hóa | `src/app/api/me/route.ts`, `src/app/auth/callback/route.ts`, `src/lib/supabase/` | Có đọc/sửa tên hồ sơ và auth callback, chưa có màn đăng nhập/thiết lập đầy đủ. Không tự mở rộng auth trong công việc landing. |
| Nguồn, thời gian và trạng thái dữ liệu | Các API trên, README | Phải phân biệt dữ liệu mô hình và quan trắc, thiếu dữ liệu/lỗi/đang tải/dữ liệu cũ. Không dùng số demo trong luồng thật. |

Không giới thiệu như chức năng đang có: cảnh báo ngập/triều cường, cảm biến tại từng phường, nhiệt độ, PM10/O₃/NO₂/CO/SO₂, chỉ đường, giờ đi “an toàn”, cá nhân hóa y tế, mobile app, gửi push/email, thống kê người dùng hay lời chứng thực không có căn cứ.

## Storyboard

| Nhịp | Lời kể | Nội dung và hành động |
| --- | --- | --- |
| Mở đầu | Ngoài kia có một ngày dễ chịu. | Mầm trên đường cong xanh; lời mời khám phá; CTA cuộn. Chưa kết luận chất lượng không khí. |
| 01 — Hít thở | Nắng đẹp rồi. Không khí thì sao? | AQI/PM2.5, khu vực, nguồn và giờ; sơ đồ mở rộng giới thiệu bản đồ. |
| 02 — Chuẩn bị | Mang theo chiếc ô, hay một chiếc mũ? | Bốn tín hiệu thời tiết và lời khuyên AI. |
| 03 — Chọn lúc | Đi bây giờ, hay chậm lại một chút? | Đổi giữa lịch sử/dự báo minh họa; dự báo nét đứt, lịch sử nét liền. |
| 04 — Nhắc mình | Mỗi người một nhịp. Mỗi người một ngưỡng. | Ngưỡng cá nhân và thông báo trong app; kết “Bạn hiểu hơn. Bạn chọn.” |
| Ghi nhớ | Đủ điều cần biết. | Chỉ mục tóm tắt bốn nhóm feature, link về từng chương. |
| Tin cậy | Một con số tốt cần một nguồn rõ ràng. | FAQ nguồn mô hình, dữ liệu thiếu và phạm vi. |
| Lời mời | Nơi bạn sắp đến, hôm nay thế nào? | Hiện tại CTA đến bản minh họa. Chỉ đổi sang công cụ thật sau khi được duyệt và có đích chức năng hoạt động. |

Chuyển động hiện có: chỉ mục chương đổi theo vùng đang đọc, cuộn anchor mượt, hover/pressed mềm. Không ép scroll snap, đổi chỉ số theo cuộn, đếm AQI từ 0 hoặc giấu nội dung chờ animation. Clay minh họa tĩnh để việc đọc dễ chịu; không thêm chuyển động lặp nếu chưa duyệt.

## Preview và bước tích hợp sau duyệt

Preview có ba tình huống AQI (tốt/xấu/thiếu), đổi đồ thị minh họa, thanh ngưỡng minh họa, accordion nguồn và sơ đồ. Không gửi request, không lưu thiết lập, không xác thực, không biểu diễn bản đồ địa lý thật. Nhãn ví dụ xuất hiện ở đầu trang và các vùng dữ liệu. Các số không nhằm quy đổi PM2.5 sang AQI.

Khi tích hợp sau duyệt: View chỉ render dữ liệu; hook/store ViewModel quản lý lựa chọn, trạng thái và action; Model giữ truy cập API. Không gọi Supabase/fetch nguồn ngoài từ View. Dữ liệu thiếu không được đi qua `aqiToLevel(null)` rồi hiển thị “trung bình”: helper hiện có hành vi này, cần lớp trình bày bảo vệ null mà không tự sửa business logic. Không tự đặt ngưỡng stale ngoài chính sách đã duyệt. Định dạng giờ UTC+7 từ timestamp API, không lấy giờ máy để thay thế.

## Nguồn chính thống đã xác nhận trước khi viết preview

- [MDN — Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API): chỉ mục chương theo viewport.
- [MDN — position](https://developer.mozilla.org/en-US/docs/Web/CSS/position): chỉ mục sticky.
- [MDN — prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion): giảm chuyển động.
- [MDN — box-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow): nhiều bóng nổi/lõm.
- [MDN — SVG gradients](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Gradients): minh họa vector.
- [Open-Meteo — Air Quality API](https://open-meteo.com/en/docs/air-quality-api): dữ liệu mô hình và nguồn CAMS. Khả năng provider rộng hơn API nội bộ; chỉ giới thiệu trường backend đang dùng.

Không thêm/nâng package nên không có version cài đặt mới cần tra registry. Không tạo file test.

## Kết quả kiểm tra bản bàn giao

- `node --check docs/design/landing-soft-preview.js`: đạt.
- SVG đọc được bằng XML parser; viewBox `0 0 680 660`.
- HTML, CSS, JS và SVG đều được server preview hiện có trả HTTP 200.
- Chưa kiểm tra trực quan hoặc tương tác bằng trình duyệt: in-app browser không khả dụng và inventory trình duyệt kết nối rỗng. Responsive/keyboard/reduced motion đã được mô tả trong mã, chưa được xác nhận qua browser QA.
- Chưa chạy được typecheck/lint/build của ứng dụng do workspace chưa có `node_modules`: `eslint` và `next` không tồn tại; dừng `npx tsc` để tránh tự tải công cụ. Không cài dependency chỉ để kiểm tra artifact HTML độc lập.
- Lượt dựng preview chỉ thay đổi `docs/design/`; source ứng dụng giữ nguyên để chờ triển khai.

## Dọn tài liệu và phiên bản cũ

Theo yêu cầu tiếp theo của người dùng, đã xóa 18 file không còn dùng (13,19 MiB): các preview HTML/CSS/JS hướng cũ, bộ ảnh cũ và log tương ứng, cùng `.gitkeep` không còn cần. Giữ tám file: brief này, HTML/CSS/JS bản soft có nút đăng nhập, quy chuẩn neumorphism, server preview, SVG Mầm và README nguồn minh họa.

Đã cập nhật `design.md`, `CONTEXT.md`, README asset và trang mặc định của server sang bản hiện tại. Không còn tham chiếu bản preview/ảnh đã xóa trong các tài liệu hiện hành này. Không sửa `src/`, bản nháp `design_new` hoặc thư mục template. Kiểm tra cú pháp server/JS và `git diff --check` đạt sau dọn; chưa có browser QA.
