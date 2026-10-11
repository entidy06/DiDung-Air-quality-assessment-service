# DiDung

DiDung là dự án web theo dõi và dự báo chất lượng không khí tại TP.HCM, giúp người dùng xem tình trạng AQI theo khu vực và nhận cảnh báo theo ngưỡng cá nhân.

Dự án được thực hiện trong khuôn khổ đồ án môn Software Engineering, với thời gian dự kiến 8–10 tuần.

## Tính năng dự kiến

- Thu thập và lưu dữ liệu PM2.5 cùng dữ liệu thời tiết.
- Dự báo PM2.5 vài giờ tới và quy đổi sang AQI thành phần PM2.5 theo thang đã chọn.
- Hiển thị bản đồ, biểu đồ lịch sử và dự báo.
- Đăng ký, đăng nhập và thiết lập khu vực, ngưỡng cảnh báo cá nhân.
- Hiển thị cảnh báo trên web và lưu vào trung tâm thông báo.
- Trang quản trị theo dõi pipeline, lỗi dữ liệu và sai số dự báo.

## Nguồn dữ liệu dự kiến

- [OpenAQ](https://docs.openaq.org/): dữ liệu PM2.5 từ các trạm quan trắc, tùy mức độ bao phủ thực tế.
- [Open-Meteo Air Quality](https://open-meteo.com/en/docs/air-quality-api): dữ liệu chất lượng không khí từ mô hình để bổ sung khi thiếu trạm.
- [Open-Meteo Weather](https://open-meteo.com/en/docs): mưa, độ ẩm, gió và các đặc trưng khí tượng hỗ trợ dự báo.

Mưa chỉ là đầu vào của mô hình chất lượng không khí; dự án không dự báo hoặc cảnh báo mưa riêng.

## Hướng triển khai

1. Thu thập định kỳ, kiểm tra dữ liệu và lưu vào cơ sở dữ liệu.
2. Thử mô hình đơn giản như Random Forest, so sánh với baseline giữ nguyên PM2.5 gần nhất.
3. Đánh giá theo thời gian bằng MAE/RMSE và so sánh mô hình có/không có đặc trưng mưa.
4. Hiển thị rõ nguồn, thời điểm cập nhật và giới hạn dữ liệu theo khu vực.
5. Xử lý dữ liệu cũ, API gián đoạn và thông báo trùng lặp.

## Tài liệu đồ án

Các tài liệu dự kiến gồm đặc tả yêu cầu, thiết kế hệ thống, báo cáo hằng tuần, kết quả đánh giá mô hình và báo cáo kiểm thử.
