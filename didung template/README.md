# DiDung — Template AQI cho TP.HCM

Template web responsive bằng tiếng Việt, dựa trên `DESIGN.md` của người dùng: nền vellum #f4e6cd, chữ sans lớn, đường kẻ mảnh, khoảng trắng rộng, ảnh thực vật lớn, không card nổi hay shadow.

## Chạy và chỉnh sửa

Cần Node.js 22+; không cần cài package.

```sh
npm start
# mở http://127.0.0.1:4173
npm test
```

Dùng HTTP server để chạy ES modules; không mở `index.html` trực tiếp bằng `file://`. Thư mục `dist/` có thể được đưa lên bất kỳ static hosting nào. Dừng server bằng Ctrl+C.

- `dist/index.html`: cấu trúc, nội dung tiếng Việt, hộp cài đặt cảnh báo.
- `dist/styles.css`: token màu, kiểu chữ, responsive, 6 cảnh hero, reduced motion.
- `dist/model.js`: dữ liệu demo, ngưỡng US AQI, tìm kiếm và lịch sử mẫu.
- `dist/app.js`: các tương tác; có thể thay dữ liệu demo bằng adapter API.
- `dist/assets/botanical.png`: ảnh thực vật có alpha, tạo bằng ImageGen tích hợp; prompt ở `ASSETS.md`.
- `tests/model.test.mjs`: kiểm tra biên 6 mức, giá trị thiếu/sai, tìm không dấu, lịch sử 24 giờ.
- `serve.mjs`: server xem thử cục bộ; chỉ lắng nghe 127.0.0.1.

Ảnh, mã HTML/CSS/JS và nội dung đều có thể thay thế. Dùng sans hệ thống Arial/Helvetica Neue để hoạt động offline. Không kèm font PP Neue Montreal có bản quyền; có thể thay bằng font đã mua và có giấy phép web.

## Những gì thử được

1. Sáu nút US AQI: 42 / 78 / 128 / 176 / 256 / 368. Số, tên mức, khoảng AQI, lời khuyên, màu, độ sáng, độ mờ bầu trời và sắc/độ nghiêng cây cùng thay đổi. Màu chỉ bổ trợ; mức độ luôn có chữ và số.
2. Ô tìm 5 điểm demo TP.HCM, có/không dấu, bằng chuột hoặc bàn phím: Bến Thành, Sài Gòn, Thảo Điền, Tân Định, Bình Thạnh. Đây là danh sách địa điểm mẫu, không phải danh bạ phường đầy đủ. Arrow Down/Up để đi qua kết quả, Enter chọn, Escape đóng.
3. Đọc sáu nồng độ với đơn vị: PM2.5, PM10 (µg/m³), O₃, NO₂, SO₂ (ppb), CO (ppm). Chưa quy đổi nồng độ 1 giờ thành AQI.
4. Lịch sử 24 giờ có điểm tương tác, ngày/giờ ICT và bảng số liệu thay thế; 4 mốc dự báo demo trong 24 giờ tiếp theo.
5. Sơ đồ 5 hotspot với giá trị riêng, có thể chọn để đổi địa điểm. Không phải bản đồ địa lý, không có geolocation, không giả lập mạng trạm thật.
6. Cảnh báo demo theo vị trí: chọn ngưỡng và lưu; khi đổi AQI qua ngưỡng sẽ hiện lời nhắc trong trang. Tùy chọn được lưu ở localStorage nếu có quyền. Không xin quyền thông báo, gửi push/email/SMS hay theo dõi nền.
7. Nút thiếu dữ liệu thay số bằng dấu gạch, bỏ mức AQI và lời khuyên cụ thể, ẩn lịch sử/dự báo/nồng độ, cho phép khôi phục. Không coi dữ liệu thiếu là Tốt.

## Giới hạn dữ liệu và sức khỏe

TẤT CẢ chỉ số, nồng độ, thời tiết, vị trí, lịch sử và dự báo là mô phỏng. Mốc dữ liệu cố định: 09:00 ngày 18/10/2026, ICT (UTC+7); không phải số liệu thời gian thực. Chuyển kịch bản không tạo mốc quan trắc mới. Các hotspot giữ snapshot mẫu riêng và không theo các nút kịch bản hero. Chưa có API, sensor, mạng trạm hay mô hình dự báo thật.

Thang ghi rõ **US AQI / US EPA**, không phải VN AQI: 0–50 Good; 51–100 Moderate; 101–150 Unhealthy for Sensitive Groups; 151–200 Unhealthy; 201–300 Very Unhealthy; 301–500 Hazardous. Hỗ trợ phân loại số nguyên 0–500; giá trị không hợp lệ hoặc ngoài phạm vi trả `null`, không hạ xuống Good. Nếu tích hợp dữ liệu >500 cần thiết kế mức Beyond the AQI riêng, không cắt về 500 hay đánh dấu là dữ liệu mất.

AQI tổng thể được mô phỏng độc lập với nồng độ. Khi kết nối thật, cần dùng giá trị có chuẩn rõ ràng từ nhà cung cấp hoặc triển khai đúng thuật toán US EPA, thời gian lấy trung bình, giá trị dưới chỉ số của từng chất và NowCast nếu áp dụng. Không lấy giá trị nồng độ tức thời để suy trực tiếp ra US AQI. Không pha trộn US AQI và VN AQI.

Cảnh cây rũ/khói/nắng là **ẩn dụ thiết kế**, không phải quan sát sinh học, camera, thời tiết thực tế hay cách đo ô nhiễm. Thời tiết demo ở khu riêng và độc lập với AQI. Lời khuyên sức khỏe chỉ có tính khái quát; không dùng bản mẫu để quyết định ra ngoài hay thay tư vấn y tế.

Nguồn đối chiếu ngưỡng và lời khuyên:
- [AirNow — AQI Basics](https://www.airnow.gov/aqi/aqi-basics/)
- [AirNow — Air Quality Guide for Particle Pollution](https://www.airnow.gov/publications/air-quality-index/air-quality-guide-for-particle-pollution/)

## MVP và giai đoạn sau

| MVP sản phẩm thật | Vì sao cần |
|---|---|
| Tìm vị trí và giữ vị trí đang xem | Trả lời ngay không khí ở đâu |
| AQI hiện tại, tên chuẩn, tên mức và chất chi phối | Giúp đọc đúng chỉ số, không phụ thuộc màu |
| PM2.5/PM10/O₃/NO₂/CO/SO₂, đơn vị, khoảng lấy trung bình | Phân biệt AQI với nồng độ |
| Lời khuyên cho mọi người và nhóm nhạy cảm | Chuyển số liệu thành hành động có ngữ cảnh |
| Nguồn, trạm, giờ quan trắc, trạng thái cũ/thiếu/lỗi | Ngăn cảm giác an toàn giả khi API dừng |
| Lịch sử 24 giờ và bảng dữ liệu thay thế | Giúp hiểu xu hướng, hỗ trợ tiếp cận |
| Responsive, thao tác bàn phím, reduced motion | Dùng được trên desktop và điện thoại |

Giai đoạn sau, sau khi đảm bảo nguồn dữ liệu:
- Dự báo thật kèm độ tin cậy và thời điểm chạy mô hình; không dựng đường dự báo từ xu hướng tùy ý.
- Bản đồ nền thật, vị trí trạm chính xác, khoảng cách, nguồn và chất lượng từng điểm; mật độ đủ mới làm heatmap/hotspot nội suy.
- Web Push/email thật với dịch vụ nền, ngưỡng theo người dùng, chống gửi trùng và khả năng tắt/hủy đăng ký. Xin quyền ở thời điểm người dùng chọn bật.
- Vị trí yêu thích, so sánh khu vực, hồ sơ nhóm nhạy cảm tùy chọn và kiểm soát quyền riêng tư.
- Đồng bộ dữ liệu, cache, retry/backoff, phát hiện trạm lỗi, hiệu chuẩn và cảnh báo dữ liệu quá cũ.
- Theo dõi dài hạn 7/30 ngày, xuất CSV, chế độ PWA/offline có nhãn thời điểm snapshot.

Prototype đã mô phỏng dự báo, sơ đồ và cảnh báo để kiểm tra trải nghiệm; những tính năng đó chưa phải dịch vụ vận hành.

## Tích hợp nguồn thật

1. Tách adapter dữ liệu khỏi phần render. API trả location, aqisystem, aqi, category, dominantPollutant, observations (value/unit/averagingPeriod), observedAt, receivedAt, source và quality.
2. Kiểm tra hợp lệ và mốc thời gian; phân biệt missing, stale, API error, outside-supported-range. Không giữ số cũ kèm nhãn “vừa cập nhật”.
3. Dùng proxy/server khi API cần secret; không đặt khóa bí mật trong JavaScript công khai.
4. Dùng timestamp từ nguồn, không dùng giờ máy khách thay giờ quan trắc. Kiểm tra múi giờ ICT và lịch sử qua ngày.
5. Giữ lời khuyên bám theo chuẩn và loại chất ô nhiễm, xác minh với nguồn y tế phù hợp địa phương trước vận hành.

## Kiểm chứng

`npm test` kiểm tra logic ranh giới và fixture. Kiểm tra giao diện qua trình duyệt gồm các kịch bản AQI, tìm kiếm, thiếu dữ liệu, hộp cảnh báo, lịch sử dạng bảng, sơ đồ và các kích thước mobile/desktop. Chi tiết thực tế được ghi trong `QA.md` sau quá trình kiểm tra.

## Cập nhật DiDung

Đổi tên hiển thị, tiêu đề tab và favicon thành DiDung. Bầu trời tốt sáng xanh hơn, chuyển dần sang xám theo mức US AQI; mặt trời có đĩa sáng và viền ấm rõ hơn. Trên điện thoại, mặt trời được đặt gần vùng cây phía dưới để giữ phần dữ liệu dễ đọc.

Bản chỉnh sửa này đã được kiểm tra cú pháp và logic dữ liệu; chưa xác nhận hình ảnh bằng trình duyệt và chưa xuất bản do bước đồng bộ source bị chính sách môi trường chặn.

### Cành cây đung đưa

Cành cây có một nhịp đung đưa nhẹ trong mỗi chu kỳ 3 giây: nghiêng -0,7°, qua +0,45°, rồi về vị trí nghỉ. Chuyển động nằm trên ảnh bên trong, tách khỏi độ nghiêng theo AQI của vùng cây bên ngoài. Khi người xem bật giảm chuyển động (prefers-reduced-motion), animation tự tắt.
