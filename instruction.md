# Đây là file hướng dẫn cho agent làm việc với front end và yêu cầu agent thiết kế front end theo
## Yêu cầu:
- Trong landing page chỉ nên là những số ngẫu nhiêu, thay đổi liên tục (kể cả biểu đồ, các thông số khác ngoài chỉ số không khí), cái cần ở landing page là story telling và giới thiệu về DiDung, không cần phải có số liệu thực, phần biểu đồ chạy animation phục vụ việc minh họa, bản đồ trạm không được thể hiện ở landing page, không hiện lời nhắc, các chỉ số khác ngoài AQI thì cũng hiện số random như AQI.
- Các phần: mapbox, lời gợi ý, biểu đồ với số liệu thực, mỗi người một nhịp một ngưỡng, dashboard AQI với dữ liệu thực - cần phải đăng nhập mới sử dụng được, có hỏi người dùng acp việc dùng location để sync location hiển thị AQI (feat này chỉ áp dụng khi backend xác nhận là có tính năng đó)
- Viết docs cho những thay đổi này, trong đó có giải thích tại sao lại làm như vậy
- TUYỆT ĐỐI: hãy hỏi tôi những chỗ bạn cần làm rõ trước khi bắt tay vào làm việc