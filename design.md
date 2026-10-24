# DiDung — Thiết kế landing page

Cập nhật ngày 24/10/2026. Hướng hiện tại: **Neumorphism + Claymorphism + Playful/Hand-drawn + Organic/Nature + Pastel Soft**, kể chuyện khi cuộn. Hướng này theo yêu cầu mới nhất của người dùng, thay thế hướng editorial/flat trước đó.

## Bản thiết kế hiện tại

- [Preview tương tác](docs/design/landing-soft-preview.html): bản duy nhất tiếp tục chỉnh, đã thêm nút **Đăng nhập** ở header theo yêu cầu.
- [Feature, storyboard và căn cứ backend](docs/design/2026-10-24-landing-soft-brief.md): tài liệu chi tiết của bản hiện tại.
- [Quy chuẩn palette và bóng neumorphism](docs/design/legacy-neumorphism.md): tài liệu nền được giữ để tham khảo token; hướng hình ảnh tổng thể theo bản brief hiện tại.
- [Nguồn minh họa](docs/design/assets/README.md): SVG Mầm đang sử dụng.

Người dùng nhận xét bản preview đẹp và yêu cầu thêm nút đăng nhập, sau đó yêu cầu dọn các phiên bản thừa. Chưa triển khai landing vào `src/`; bản preview dùng dữ liệu minh họa, không xác thực hoặc lưu thiết lập.

## Hướng thị giác

Nền cream `#FCECD8`, chữ brown `#6E3511`, primary olive `#597928`, forest `#486C2F`, sage `#91AC67`, butter `#F1E5A1`. Orange/crimson biểu diễn trạng thái cùng nhãn chữ. Hai bóng sáng/tối `#FFF9F0` và `#D9C7AE` tạo bề mặt nổi/lõm; bo góc lớn. Palette cũng có trong `src/app/globals.css`.

Minh họa Mầm dùng SVG với các khối lá/mây/mặt trời bo mềm, gradient và bóng nhẹ tạo cảm giác đất sét. Không dùng ảnh thực tế hoặc hình ảnh để suy ra chất lượng không khí.

## Mạch kể chuyện

Mở đầu “Ngoài kia có một ngày dễ chịu” → Hít thở (AQI/PM2.5 và khu vực/bản đồ) → Chuẩn bị (mưa, UV, gió, độ ẩm và lời khuyên AI) → Chọn lúc (lịch sử/dự báo) → Nhắc mình (ngưỡng cá nhân và thông báo) → nguồn/giới hạn → lời mời khám phá.

Desktop có chỉ mục chương sticky; mobile một cột, cuộn tự nhiên. Tôn trọng reduced motion. Preview có đổi tình huống tốt/xấu/thiếu dữ liệu, đổi biểu đồ, kéo ngưỡng và mở thông báo minh họa khi bấm đăng nhập.

## Dữ liệu và triển khai

Giới thiệu đúng những API backend đã có, xem bảng đối chiếu trong brief. Luôn phân biệt dữ liệu mô hình với quan trắc; ghi nguồn, chuẩn chỉ số và thời gian. Không giả định API có dữ liệu đầy đủ chỉ từ việc đọc source. Không quảng bá nhiệt độ, cảnh báo ngập, push/email hay chỉ đường như tính năng đã có.

Khi triển khai tuân AGENTS.md: MVVM, duyệt bản vẽ trước khi sửa UI; thay đổi auth/schema/kiến trúc phải qua spec và được duyệt. Không tự viết test. Lần dọn này chỉ cập nhật tài liệu/preview, không sửa source ứng dụng.

## Xem preview

Mở trực tiếp `docs/design/landing-soft-preview.html`, hoặc chạy từ root repo:

```powershell
node docs/design/serve-preview.mjs
```

Mở `http://127.0.0.1:4174/`. Dừng server bằng Ctrl+C. Không cần cài package.

Đã dọn các phiên bản HTML/CSS/JS và bộ ảnh cũ không còn dùng; bản đã commit vẫn có lịch sử Git. Giữ bản nháp `design_new` và thư mục template ngoài `docs/design` nguyên trạng theo phạm vi yêu cầu.

Giới hạn xác minh preview: đã kiểm tra cú pháp JavaScript/SVG và phục vụ file; chưa có trình duyệt kết nối để xác nhận trực quan. Workspace thiếu `node_modules`, chưa chạy được lint/typecheck/build của ứng dụng. Các nguồn MDN và Open-Meteo đã tra được lưu trong brief, không cần lặp lại tại đây.
