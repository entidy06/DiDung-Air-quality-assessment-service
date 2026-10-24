# DiDung — context bàn giao

Cập nhật: 24/10/2026, Asia/Ho_Chi_Minh. Đọc AGENTS.md, source và git status trước khi tiếp tục. File này mô tả trạng thái, không tự cấp quyền triển khai.

## Yêu cầu và hướng đã chọn

Người dùng yêu cầu đọc backend, rút feature cần có cho landing page kể chuyện khi cuộn, với Neumorphism, Claymorphism, Playful/Hand-drawn, Organic/Nature và Pastel Soft. Đây là hướng mới nhất, thay thế các preview editorial/flat và bộ ảnh hoạt họa cũ.

Đã dựng `docs/design/landing-soft-preview.html` cùng CSS/JS và SVG Mầm. Người dùng nói “rất đẹp” và yêu cầu thêm nút đăng nhập; đã thêm vào header. Lượt mới nhất yêu cầu dọn file/phiên bản thừa trong `docs/design`; đã giữ bản soft hiện tại và xóa các preview/ảnh cũ.

## File hiện hành

- `design.md`: chỉ mục thiết kế và hướng hiện tại.
- `docs/design/2026-10-24-landing-soft-brief.md`: bảng feature ↔ API, storyboard, phạm vi, nguồn chính thống và giới hạn xác minh.
- `docs/design/landing-soft-preview.html`, `.css`, `.js`: bản preview duy nhất tiếp tục chỉnh.
- `docs/design/assets/soft-garden.svg`, `assets/README.md`: minh họa và nguồn gốc.
- `docs/design/legacy-neumorphism.md`: quy chuẩn palette/bóng nền được giữ để tham khảo; brief hiện tại quyết định art direction.
- `docs/design/serve-preview.mjs`: server cục bộ, root mở bản soft hiện tại.

Chạy `node docs/design/serve-preview.mjs`, mở `http://127.0.0.1:4174/` hoặc mở HTML trực tiếp. Server chỉ bind loopback; kiểm tra cổng trước khi chạy thêm, không giả định server còn sống. Lịch sử file đã commit xem trong Git. Không dọn `design_new` hoặc `didung template/` vì chúng ngoài phạm vi yêu cầu.

## Hành vi và giới hạn

Bốn chương: không khí/khu vực → thời tiết/lời khuyên → lịch sử/dự báo → ngưỡng/thông báo. Có FAQ nguồn, dữ liệu mô hình và thiếu dữ liệu. Preview có các tình huống tốt/xấu/thiếu, đổi đồ thị, thanh ngưỡng; không gọi API, không lưu, không đăng nhập thật. Nút đăng nhập mở thông báo bản minh họa, chưa phải thiết kế luồng auth đầy đủ.

`src/app/page.tsx` vẫn là trang khởi đầu cũ với hai nút chưa có handler; chưa áp landing vào ứng dụng. Các API đã có gồm locations, air-quality current/history/forecast, weather current, advisories, map snapshot, me/profile, thresholds và notifications. Chi tiết kiểm chứng nằm trong brief; đọc lại source trước khi tích hợp. Chưa kiểm tra dữ liệu Supabase Cloud trong phiên này.

Giữ MVVM. Không fetch nguồn ngoài hoặc gọi Supabase trong View. `aqiToLevel(null)` hiện trả moderate: cần bảo vệ null ở lớp trình bày, không coi thiếu dữ liệu là mức trung bình/tốt. Không tự quảng bá nhiệt độ, cảnh báo ngập, push/email hay route UI chưa xây.

## Quy tắc và công việc tiếp theo

Tuân toàn bộ AGENTS.md: UI phải khớp bản vẽ được duyệt; auth/schema/kiến trúc cần spec và approve; tra tài liệu chính thống trước khi dùng API/library; không tự viết test, không commit secret, không reset/clean thay đổi của người dùng. Khi dọn trên Windows dùng danh sách file cụ thể, xác minh absolute path, không xóa đệ quy theo phỏng đoán.

Lượt hiện tại chỉ dọn tài liệu/preview, không triển khai UI hoặc auth. Khi người dùng yêu cầu triển khai, xác nhận phạm vi từ hội thoại và mockup hiện tại; không phục hồi hướng cũ theo các tài liệu lịch sử.

Đã kiểm tra cú pháp JS/SVG và file được phục vụ HTTP 200 ở lượt dựng preview. Browser inventory rỗng nên chưa xác nhận trực quan/interaction. Workspace thiếu node_modules: lint/build thiếu executable eslint/next; typecheck chưa xác nhận, không tự tải công cụ chỉ để kiểm tra preview. Không thêm dependency, test hoặc commit/push/deploy trong phiên.
