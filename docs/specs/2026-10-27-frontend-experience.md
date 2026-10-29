---
title: DiDung frontend — landing minh họa và khu vực dữ liệu sau đăng nhập
status: APPROVED, revised — người dùng yêu cầu giữ landing cũ ngày 2026-10-27
date: 2026-10-27
---

## Bối cảnh và mục tiêu

`instruction.md` yêu cầu landing kể câu chuyện DiDung bằng số liệu minh họa thay đổi liên tục; dữ liệu thật, Mapbox, biểu đồ và lời gợi ý dựa trên dữ liệu thật, ngưỡng cá nhân chỉ xuất hiện sau đăng nhập. Người dùng xác nhận số/biểu đồ landing ghi “Minh họa” và đổi mỗi vài giây; tạo khu vực riêng sau đăng nhập, hỗ trợ Google OAuth và email/mật khẩu, ẩn lời nhắc vị trí cho tới khi backend hỗ trợ. **Điều chỉnh sau khi duyệt:** giữ nguyên bố cục và câu chuyện của landing hiện có; không thay cả trang bằng landing trong preview mới.

Landing hiện có hero, bốn chương story, mục tính năng, nguồn dữ liệu và CTA. Backend đã có API dữ liệu và auth callback. Backend chưa có endpoint đồng bộ vị trí trình duyệt với location. Dữ liệu AQI là **ước tính từ mô hình Open-Meteo**, độ phân giải rộng; nhiều phường có thể có cùng giá trị. UI phải thể hiện giới hạn này.

## Phạm vi

1. **`/` landing công khai:** giữ hero, bốn chương story, tính năng, nguồn dữ liệu, CTA, header và footer theo bản vẽ landing cũ. Thay nội dung dữ liệu thật trong các panel AQI, thời tiết và biểu đồ bằng số minh họa đổi khoảng 4 giây/lần; đường biểu đồ có chuyển động để làm rõ tính minh họa. Có nhãn “Minh họa · không phải dữ liệu hiện tại”. Không gọi API dữ liệu thật, không hiển thị bản đồ trạm hoặc lời nhắc trên landing. Chương ngưỡng chỉ giới thiệu và dẫn đến đăng nhập. Tôn trọng reduced motion; khi đó giữ một bộ số tĩnh và không chạy animation. CTA dẫn tới đăng nhập để xem dữ liệu hiện hành.
2. **`/auth` đăng nhập/đăng ký:** Google OAuth, email/mật khẩu; thông báo lỗi, trạng thái gửi và lối quay lại landing cho khách. Sau đăng nhập chuyển tới `/app`.
3. **`/app` khu vực riêng:** header có tên người dùng, khu vực đang chọn và đăng xuất; dashboard AQI, thời tiết, nguồn/thời điểm dữ liệu, biểu đồ quá khứ và dự báo, bản đồ Mapbox, lời gợi ý, quản lý ngưỡng cá nhân. Chọn khu vực bằng danh sách `locations` hiện có. Các khối có trạng thái đang tải, trống và lỗi rõ ràng. Không hiển thị dữ liệu mẫu trong khu vực này.
4. **Bảo vệ truy cập:** khách vào `/app` chuyển `/auth`; người đã đăng nhập vào `/` hoặc `/auth` chuyển `/app`. Các API cung cấp dữ liệu thực cho UI trả 401 nếu chưa đăng nhập. API đồng bộ/job giữ cơ chế cron hiện tại. Không chỉ dựa vào chuyển hướng giao diện để bảo vệ API.
5. **Tài liệu:** cập nhật README và tài liệu triển khai nêu ranh giới minh họa/dữ liệu thật, lý do đăng nhập, giới hạn mô hình, cấu hình Google OAuth và dữ liệu cần có.

## Ngoài phạm vi

- Không tạo schema/migration, không dùng tọa độ thiết bị hoặc hỏi quyền vị trí trong đợt này.
- Không tuyên bố AQI chính xác tới địa chỉ/phường, không thêm tính năng ngập chưa được kiểm chứng.
- Không viết test tự động khi chưa được duyệt theo AGENTS.md §7.

## Bản vẽ và hành vi

Landing dùng [bản vẽ và bố cục cũ](../design/2026-10-25-navbar-rounded-preview.html); panel dữ liệu chuyển sang minh họa, phần bản đồ/lời nhắc của bản cũ được ẩn theo `instruction.md`. [HTML preview ngày 27/10](../previews/2026-10-27-frontend-preview.html) chỉ còn là bản vẽ được duyệt cho màn hình đăng nhập và dashboard sau đăng nhập; tab landing trong file này đã bị thay thế bởi yêu cầu giữ landing cũ.

### Landing

```text
Header cũ · hero "Ngoài kia có một ngày dễ chịu"
Bốn chương story cũ: AQI → thời tiết → xu hướng → ngưỡng
Các panel trong story: chỉ số/biểu đồ minh họa, có nhãn rõ; không có bản đồ trạm hoặc lời nhắc
Tính năng · nguồn dữ liệu · CTA đăng nhập · footer cũ
```

### Đăng nhập

```text
DiDung  /  Quay lại giới thiệu
Xem điều kiện ngoài trời trước khi đi.
[Tiếp tục với Google]
Email [____________]   Mật khẩu [____________]
[Đăng nhập]  /  Tạo tài khoản
```

### Khu vực sau đăng nhập

```text
DiDung   Tổng quan | Bản đồ | Ngưỡng của tôi       [Khu vực ▼] [Tài khoản]

Điều kiện tại [khu vực]       [AQI mô hình] [Thời tiết]
Nguồn Open-Meteo · Dữ liệu mô hình · Cập nhật lúc [giờ]

[Xu hướng AQI: lịch sử | dự báo]       [Lời gợi ý theo dữ liệu]
[Bản đồ các khu vực có dữ liệu]      [Ngưỡng của tôi]
```

Trên mobile các khối xếp một cột theo thứ tự: khu vực → AQI/thời tiết → gợi ý → biểu đồ → bản đồ → ngưỡng. Bản đồ không thay thế lựa chọn khu vực bằng bàn phím. Màu tuân thủ `design.md`, trạng thái AQI luôn có chữ đi cùng màu. Nút và input dùng bóng neumorphic; không có màu ngoài palette. Không dùng animation liên tục trên màn hình dữ liệu thật.

## Thiết kế kỹ thuật dự kiến

- **Model:** API route hiện có và `src/lib/` nhận dữ liệu; thêm kiểm tra phiên vào endpoint đọc dữ liệu thực. RLS hiện tại cần được rà soát khi thực hiện: nếu bảng vẫn public-read, chặn API chỉ giới hạn ứng dụng DiDung, không thay đổi quyền truy cập trực tiếp Supabase. Nếu yêu cầu bảo mật dữ liệu ở cấp DB, cần spec schema/RLS và duyệt riêng trước khi sửa migration.
- **ViewModel:** hook/store trong `src/hooks/` và `src/stores/` gọi API nội bộ, chuẩn hóa loading/error/empty, giữ khu vực đã chọn. View không fetch trực tiếp và không gọi Supabase.
- **View:** route và component chỉ hiển thị state/props. Auth action đặt trong hook/ViewModel; server route kiểm tra user bằng Supabase server client.
- **Auth:** email đăng nhập/đăng ký qua Supabase Auth; OAuth dùng callback đã có, chỉnh đích sau đăng nhập thành `/app`. Cần cấu hình Google provider và redirect URL trong Supabase Cloud trước khi Google login chạy thật.
- **Map:** Mapbox GL JS dùng token công khai đã khai báo ở `.env.example`. Nếu thiếu token, hiển thị hướng dẫn cấu hình ở vùng bản đồ, không biến dashboard thành màn hình trắng.
- **Vị trí thiết bị:** ẩn toàn bộ nút/lời nhắc xin quyền; chỉ xét lại sau khi có backend mapping tọa độ → khu vực và cơ chế xử lý quyền riêng tư được duyệt.

## Vì sao thiết kế như vậy

Giữ landing cũ bảo toàn câu chuyện và thiết kế mà người dùng đã chọn. Số minh họa giúp giải thích cách sản phẩm hỗ trợ quyết định mà không làm người xem nhầm số demo với tình hình hiện tại; nhãn “Minh họa” hiện trong từng panel. Không đưa bản đồ trạm hay lời nhắc lên landing vì chúng dễ gây hiểu nhầm rằng vị trí, mức cảnh báo hoặc lời khuyên đang phản ánh điều kiện thật. Khu vực riêng giúp người dùng nhận ra khi nào họ đang xem dữ liệu hiện hành, đồng thời cho phép lưu khu vực và ngưỡng cá nhân. Chặn API đi cùng chặn trang để yêu cầu đăng nhập có hiệu lực thực tế. Chọn khu vực thủ công phù hợp với backend hiện có; yêu cầu quyền vị trí khi chưa thể ánh xạ tới dữ liệu AQI sẽ gây kỳ vọng sai. Nhãn “dữ liệu mô hình” và thời điểm cập nhật giải thích đúng độ phân giải của nguồn Open-Meteo.

## Tác động, rủi ro và rollback

- Đổi hành vi route `/` với người đã đăng nhập và OAuth callback. Cần kiểm tra deep link, phiên hết hạn, đăng xuất, callback lỗi.
- Cấu hình Google OAuth bên ngoài repo là điều kiện vận hành. Email/mật khẩu phụ thuộc cấu hình xác nhận email của Supabase project.
- Mapbox cần token và dữ liệu snapshot; thiếu một trong hai phải có trạng thái rõ ràng.
- Chặn API có thể ảnh hưởng client bên ngoài hiện đang dùng endpoint public. Trước khi triển khai cần rà soát nơi gọi; nếu cần public API phải tách policy riêng.
- Rollback code: hoàn nguyên route/UI và kiểm tra auth ở API theo commit; không có migration DB trong phạm vi này.

## Câu hỏi còn mở khi triển khai

- Xác nhận Google provider, URL callback, cấu hình xác nhận email và Mapbox token đã sẵn sàng ở môi trường triển khai.
- Nếu phải chặn truy cập trực tiếp bảng Supabase ở cấp RLS, cần một spec schema riêng trước thay đổi đó.

## Nguồn đã xác nhận

- [Next.js 16 Proxy](https://nextjs.org/docs/app/api-reference/file-conventions/proxy): có thể chuyển hướng trước khi render; xác thực vẫn cần thực hiện ở điểm truy cập dữ liệu.
- [Supabase Auth với Next.js](https://supabase.com/docs/guides/auth/quickstarts/nextjs) và [getUser](https://supabase.com/docs/reference/javascript/auth-getuser): phiên SSR và kiểm tra người dùng ở server.
- [Mapbox GL JS qua npm](https://docs.mapbox.com/mapbox-gl-js/guides/get-started/use-with-npm/): bản đồ cần public access token.
- `docs/specs/2026-10-22-backend-schema.md`: giới hạn dữ liệu AQI mô hình và độ phân giải.
