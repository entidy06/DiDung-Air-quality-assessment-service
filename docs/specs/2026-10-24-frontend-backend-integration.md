# Kết nối frontend với backend DiDung

**Trạng thái: đã triển khai trong src theo chỉ đạo tiếp theo của người dùng; bản vẽ frontend trong docs/design đã xóa theo yêu cầu.**

## Bối cảnh và mục tiêu

UI hiện dùng fixture trong `src/lib/landing-demo.ts`; các panel gọi hook demo thay vì API. `/login` là thông báo preview, thanh ngưỡng không lưu dữ liệu, bản đồ là sơ đồ minh họa. Vì vậy có route không đồng nghĩa tính năng đã hoạt động.

Đã kiểm tra trực tiếp qua server local ngày 24/10/2026, chỉ thực hiện GET:

- `/api/locations`: HTTP 200, 168 địa điểm.
- Các API current AQI, weather, advisory, history, forecast: HTTP 200 cho địa điểm Sài Gòn; có dữ liệu và timestamp.
- `/api/map/snapshot`: HTTP 200, 168 mục.
- `/api/me`, `/api/me/thresholds`, `/api/me/notifications`: HTTP 401 khi chưa đăng nhập, đúng với code hiện có.
- `.env.local` hiện đã có cấu hình Supabase. Không in URL/key/secret vào báo cáo.

Mục tiêu: các trang chức năng dùng dữ liệu API thật, người dùng chọn khu vực, đăng nhập, quản lý ngưỡng và đọc thông báo; không còn báo thao tác thành công khi chưa lưu backend.

## Phạm vi và cách làm

Chọn nối qua các API Next.js đang có và Auth store hiện có, vì chúng đã cung cấp đầy đủ contract cần thiết. Không gọi nguồn thời tiết/AI hoặc Supabase trực tiếp từ View; không tạo tầng backend thay thế.

Trong phạm vi:

- Bộ chọn khu vực dùng `/api/locations`, chia sẻ lựa chọn giữa trang chủ/story, air-quality, weather, forecast, map và notifications. Khôi phục ID đã chọn từ localStorage sau khi client mount và xác nhận nó còn nằm trong danh sách; mặc định Sài Gòn nếu có, nếu không chọn địa điểm đầu tiên. Không dùng vị trí GPS của người dùng.
- AQI/PM2.5, bốn chỉ số thời tiết và lời khuyên dùng API tương ứng. Hiển thị nguồn và timestamp hiệu lực theo `Asia/Ho_Chi_Minh`.
- Biểu đồ đọc lịch sử/dự báo thật; trục thời gian từ timestamp, miền giá trị dựa trên dữ liệu, có khoảng trống cho điểm null. Nét đứt cho dự báo. Không tiếp tục vẽ đường mẫu khi API lỗi/rỗng.
- Mapbox GL hiện có dùng snapshot API, marker theo tọa độ backend, chọn marker để xem chỉ số và mở khu vực. Nếu token chưa có, hiển thị rõ trạng thái bản đồ chưa cấu hình và danh sách địa điểm với dữ liệu thật để các phần còn lại vẫn dùng được.
- `/login`: form email/password, đăng ký cùng card theo mode riêng, Google OAuth qua action store hiện có. Thông báo xác nhận email khi signup chưa trả session, trạng thái pending/error, và đăng xuất. Không tự cấu hình provider Google.
- Khởi tạo/cleanup Auth store ở app provider. Nối trạng thái tài khoản vào header; xử lý hết loading khi Auth báo lỗi và xóa dữ liệu cá nhân khỏi UI sau sign-out.
- `/notifications`: quản lý danh sách ngưỡng cho khu vực (AQI hoặc PM2.5, tạo/sửa/bật tắt/xóa), danh sách thông báo, số chưa đọc, đánh dấu đã đọc. Ô nhập giá trị chỉ sửa bản nháp; nút lưu mới ghi backend. AQI là số nguyên dương (bước 1); PM2.5 là số dương theo bước 0,1 µg/m³. Không đặt trần tùy ý; phải là số hữu hạn. Khi sửa hiện metric/khu vực của bản ghi, nút “Lưu thay đổi” và “Hủy”; hủy không gửi request. Không tự sinh thông báo mẫu trong luồng thật.
- `/profile`: đọc/sửa `display_name` qua `/api/me`, hiển thị tài khoản và đăng xuất.
- Giữ `/demo` làm bản minh họa có nhãn rõ. Fixture và các nút Tốt/Xấu/Thiếu dữ liệu chỉ dùng tại đây; không làm fallback cho các trang thật.

Ngoài phạm vi: thay schema/RLS/cron, Docker/Supabase local deployment, tự tạo tài khoản thử trên cloud, thay nhà cung cấp Auth, push/email notification, thêm nguồn dữ liệu, thay stack, viết test files khi chưa được yêu cầu.

## Bản vẽ

Người dùng đã yêu cầu không chỉnh sửa frontend trong `docs/design` và triển khai trực tiếp frontend có file trong `src`. Các file preview đã bị xóa. Phần tích hợp nằm ở `src/app/_components/live`, các page route, hook/store ViewModel và API Model; giữ nền thiết kế soft hiện có.

Giữ palette và kiểu bóng của `design.md`; phần kể chuyện, typography và minh họa giữ nguyên. Folder route tiếp tục dùng tiếng Anh. Chỉ thay bản vẽ nếu cần đổi cấu trúc UI sau duyệt.

## Kiến trúc MVVM

- **Model:** `src/lib/api/` chứa kiểu contract, HTTP client và các hàm theo tài nguyên; `src/lib/` xử lý kiểm tra/định dạng domain cho dữ liệu hiển thị. Không lưu secret vào client/localStorage.
- **ViewModel:** `src/stores/location-store.ts`, Auth store hiện có, và hook trong `src/hooks/` giữ vòng đời request, lựa chọn, trạng thái form và mutation. Hook expose dữ liệu sẵn hiển thị/action; View không tự fetch hoặc tính toán domain.
- **View:** `src/app/_components/` và page route render props/hook state. Widget Mapbox chỉ làm tương tác hiển thị; dữ liệu đã được ViewModel chuẩn bị.
- Lựa chọn vị trí không lưu session người dùng. Tài nguyên công khai có thể tải khi chưa đăng nhập; tài nguyên cá nhân chỉ tải khi Auth đã xác nhận user. Request và mutation cá nhân được gắn với user ID/generation; khi đổi user hoặc sign-out thành công phải hủy/vô hiệu hóa kết quả cũ và xóa profile, ngưỡng, thông báo, unread count, draft form. Response tài khoản cũ không được ghi vào state tài khoản mới.
- Resource độc lập: lỗi lời khuyên không làm mất weather hoặc AQI. Hủy request/cấm ghi kết quả cũ khi chuyển nhanh khu vực hoặc rời trang. Không để dữ liệu khu vực cũ mang tên khu vực mới khi đang tải.

## Contract API được dùng

| Tính năng | Method/endpoint | Dữ liệu |
| --- | --- | --- |
| Khu vực | GET `/api/locations` | `{ locations: [{ id, name, slug, latitude, longitude }] }` |
| AQI hiện tại | GET `/api/air-quality/current?locationId=…` | `valid_at`, `pm2_5`, `us_aqi`, `source`, `fetched_at`, `data_type` |
| Thời tiết | GET `/api/weather/current?locationId=…` | `precipitation_probability`, `relative_humidity`, `wind_speed`, `uv_index`, timestamps/source |
| Lời khuyên | GET `/api/advisories/current?locationId=…` | `summary`, `action`, `note`, `model`, `valid_at` |
| Lịch sử/dự báo | GET `/api/air-quality/{history,forecast}?locationId=…` | `{ data_type, items: [{valid_at, pm2_5, us_aqi, european_aqi}] }` |
| Bản đồ | GET `/api/map/snapshot` | `{ data_type, items: [{ location_id, name, latitude, longitude, valid_at, pm2_5, us_aqi, level }] }` |
| Hồ sơ | GET/PATCH `/api/me` | `{ id, display_name, created_at }`; PATCH `{ display_name }` |
| Ngưỡng | GET/POST `/api/me/thresholds` | GET mảng; POST `{ location_id, metric: "aqi"|"pm25", threshold_value }` |
| Sửa/xóa ngưỡng | PATCH/DELETE `/api/me/thresholds/:id` | PATCH `{ threshold_value?, is_active? }`; DELETE trả 204 |
| Thông báo | GET `/api/me/notifications` | `{ items, unread_count }` |
| Đã đọc | PATCH `/api/me/notifications/:id/read` | `{ id, is_read }` |

Không tự thay response schema. HTTP client xử lý 204 không parse JSON, báo lỗi mạng/JSON không hợp lệ, dùng same-origin credentials và AbortSignal. Request mutation chỉ phát khi người dùng submit/bấm action, không chạy trong mount effect.

## Dữ liệu thiếu, lỗi và dữ liệu cũ

- Các trạng thái tách biệt: đang tải, thành công, chưa có dữ liệu, lỗi kết nối/server, cần đăng nhập, đang lưu và lỗi lưu.
- HTTP 404 ở current reading/advisory là chưa có dữ liệu; HTTP 401 ở tài nguyên cá nhân là yêu cầu đăng nhập. Không đổi mọi lỗi thành dữ liệu rỗng.
- `null`, không hữu hạn hoặc không hợp lệ không được phân loại AQI thành tốt/trung bình. Bảo vệ dữ liệu trước khi dùng helper `aqiToLevel`; không tự đổi helper/backend trong phạm vi này.
- Hiển thị đúng số 0, không dùng kiểm tra truthy để coi 0 là thiếu.
- Timestamp không hợp lệ không được thay bằng giờ máy. Dữ liệu có hiệu lực quá 3 giờ hiển thị nhãn “Dữ liệu cũ” và thời điểm thật; đây là chính sách UI đề xuất khớp cửa sổ snapshot backend, cần được duyệt cùng spec. Không hứa đây là ngưỡng an toàn sức khỏe.
- Mọi trang thật dùng dữ liệu mô hình, không gọi là số đo tại địa chỉ. Không tự kích hoạt endpoint sync dùng admin secret từ browser.
- Nút “Thử lại” chỉ tải lại tài nguyên đang lỗi. Chặn submit lặp khi pending; chỉ báo lưu thành công sau response thành công và làm mới state tương ứng.

## Auth và bảo mật

- Dùng các action Auth đã có; giữ password/session trong SDK/store tạm thời, không log password hoặc token.
- Điều chỉnh contract Auth store để `signUp` trả trạng thái có session hay cần xác nhận email; không suy luận từ `error === null`. `signOut` trả lỗi nếu SDK thất bại, chỉ xóa session/UI sau khi đăng xuất thành công. Khởi tạo Auth có cleanup và guard để initial `getUser()` không ghi đè sự kiện đăng nhập mới hơn; Promise lỗi phải kết thúc loading và expose lỗi.
- Đăng ký: dùng callback hiện có và URL redirect cùng origin; nếu cần email confirmation, thông báo đúng thay vì giả đã đăng nhập.
- Khi đăng ký truyền `emailRedirectTo` về `/auth/callback` cùng origin. Callback thành công chỉ chuyển đến `next` nội bộ đã kiểm tra, mặc định `/air-quality`; thất bại hoặc thiếu code chuyển `/login?auth_error=1` để lỗi xuất hiện trong card login như bản vẽ. Không đưa chi tiết token/provider nhạy cảm vào query.
- Link chuyển tiếp sau đăng nhập chỉ chấp nhận đường dẫn nội bộ hợp lệ, mặc định `/air-quality`; không redirect tới URL ngoài do query tùy ý.
- Người dùng chưa đăng nhập vẫn xem được dữ liệu công khai, nhưng không tạo/sửa ngưỡng hoặc xem profile/notifications của tài khoản khác. Backend/RLS tiếp tục là nơi quyết định quyền truy cập.
- Không tự tạo account thật, gửi email thử hoặc thực hiện OAuth của người dùng chỉ để kiểm chứng.

## Tác động và rollback

- Không migration/schema/backend endpoint mới. Source frontend và Auth ViewModel được chỉnh để dùng contract hiện có; callback Auth hiện có được sửa đích redirect lỗi/return path như mục Auth, không thay cách xác thực hoặc quyền truy cập.
- API có dữ liệu không đồng nghĩa mọi provider Auth đã cấu hình; Google/email confirmation vẫn phụ thuộc project đang dùng.
- Thay đổi độc lập với spec Docker đang chờ triển khai. Tiếp tục dùng cấu hình `.env.local` hiện tại, không đổi URL/key sang local hay bỏ auth.
- Có thể revert các file tích hợp để quay lại UI demo; không cần rollback DB vì không thay schema. Các dữ liệu cá nhân do người dùng đã lưu qua UI là dữ liệu thật, không tự xóa khi rollback code.

## Kiểm chứng sau duyệt

- Không viết test files. Chạy typecheck, lint, build và kiểm tra trực tiếp trên server/browser nếu công cụ có sẵn.
- Kiểm tra tải locations và current/forecast/history/map bằng API thật, lựa chọn khu vực thống nhất, hủy request cũ, 0/null/rỗng/lỗi khác nhau.
- Kiểm tra loading/errors bằng điều kiện trình duyệt khi có công cụ; không thay backend hoặc dữ liệu cloud để giả lỗi.
- Luồng tài khoản/ghi dữ liệu chỉ kiểm tra với tài khoản do người dùng cung cấp hoặc tự thao tác; không tự đăng ký tài khoản thật hay gửi email. Nếu chưa thể kiểm tra authenticated flow thì ghi rõ giới hạn thay vì báo toàn bộ end-to-end đã đạt.
- Kiểm tra POST/PATCH/DELETE được nối đúng contract qua code review và thao tác được cho phép; không giả mutation response để tuyên bố đã lưu thật.

## Nguồn đã đối chiếu

- Contract từ các file `src/app/api/**/route.ts` và response GET local được nêu trên.
- [React useEffect](https://react.dev/reference/react/useEffect), [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).
- [Zustand chính thức](https://github.com/pmndrs/zustand).
- [Supabase password Auth](https://supabase.com/docs/guides/auth/passwords), [SSR client](https://supabase.com/docs/guides/auth/server-side/nextjs).
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/get-started/).

Không thêm/nâng dependency; dùng các package đã cài trong repo.

## Rà soát thiết kế

Builder review đã chỉ ra và spec/bản vẽ đã bổ sung: trạng thái signup/session chính xác, lỗi sign-out, guard initial Auth và request theo tài khoản, đích callback failure, editor/hủy sửa ngưỡng, lỗi mutation và profile khi chưa đăng nhập. Chưa sửa source ứng dụng trước khi duyệt.
