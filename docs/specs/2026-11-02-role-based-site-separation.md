# Tách site theo role: landing, user app và admin

**Trạng thái:** APPROVED
**Ngày:** 2026-11-02

## Bối cảnh và mục tiêu

DiDung hiện có landing tại `/`, trang xác thực tại `/auth` và khu vực người dùng tại `/app`. Ứng dụng chưa có role admin hoặc route `/admin`. Mọi tài khoản Supabase Auth hiện có cùng quyền ứng dụng.

Thay đổi này chia site thành ba khu vực truy cập:

1. Landing công khai cho khách chưa đăng nhập.
2. Khu vực xác thực tại `/auth`.
3. Khu vực sau đăng nhập: user dùng `/app`; tài khoản được chọn làm admin mặc định vào `/admin` và vẫn có thể mở `/app`.

Người đã đăng nhập không xem lại landing. Hệ thống chuyển user tới `/app` và admin tới `/admin`.

## Phạm vi phase đầu

- Chuẩn hóa role ứng dụng thành `user` và `admin`.
- Lưu quyền admin trong Supabase Auth `app_metadata.app_role`.
- Xem tài khoản thiếu role, role sai kiểu hoặc role không hợp lệ là `user`.
- Thêm helper phân quyền server-only làm nguồn quyết định chung cho page, callback và API admin trong tương lai.
- Áp dụng ma trận truy cập cho `/`, `/auth`, `/app`, `/admin` và trang 403.
- Điều hướng sau Google OAuth và email/password theo role đã xác minh.
- Tạo admin shell có cấu trúc, chưa có nghiệp vụ quản trị thật.
- Viết hướng dẫn cấp và thu hồi admin thủ công trong Supabase Dashboard.

## Ngoài phạm vi

- Không thêm bảng, cột, enum, function, trigger, RLS policy hoặc migration.
- Không tạo màn hình cấp hoặc thu hồi role.
- Không tự gán admin theo OAuth provider, email hoặc email domain.
- Không triển khai API quản trị người dùng, dữ liệu môi trường, job đồng bộ hoặc cấu hình.
- Không thay thiết kế landing.
- Không thêm test tự động nếu chưa có phê duyệt riêng theo `AGENTS.md`.

## Mô hình role

Supabase Auth tiếp tục dùng role hệ thống `authenticated`. Ứng dụng đọc custom role từ:

```json
{
  "app_role": "admin"
}
```

Giá trị trên nằm trong `app_metadata`, không nằm trong `user_metadata`. Người dùng không thể tự cập nhật `app_metadata` bằng client Auth API. Phase này cấp quyền qua Supabase Dashboard bởi người có quyền quản lý project.

Quy tắc phân loại:

```text
Không có user                         -> guest
user.app_metadata.app_role = admin   -> admin
Mọi trường hợp đã đăng nhập khác     -> user
```

Mọi tài khoản mới từ Google OAuth hoặc email/password mặc định là `user`. Provider, địa chỉ email và domain không ảnh hưởng tới role.

## Kiến trúc phân quyền

### Server authorization helper

Tạo helper server-only để:

- gọi Supabase `auth.getUser()` và xác minh user với Auth server;
- chuẩn hóa kết quả thành `guest | user | admin`;
- cung cấp đích mặc định `/`, `/app` hoặc `/admin`;
- từ chối quyền khi Supabase lỗi hoặc không xác minh được user;
- hỗ trợ page và Route Handler dùng cùng một quy tắc.

Page và API không tự đọc `app_metadata` theo các cách khác nhau. Client có thể dùng role đã chuẩn hóa để hiển thị điều hướng, nhưng client không quyết định quyền truy cập.

### Proxy

`src/proxy.ts` tiếp tục refresh session qua `@supabase/ssr`. Proxy có thể thêm redirect sớm để cải thiện trải nghiệm sau này, nhưng không phải lớp bảo vệ duy nhất. Server Component và Route Handler kiểm tra quyền gần nơi đọc hoặc thay đổi dữ liệu.

### Route groups

Có thể dùng route groups để tổ chức code mà không đổi URL:

```text
src/app/(public)/page.tsx       -> /
src/app/(auth)/auth/page.tsx    -> /auth
src/app/(user)/app/page.tsx     -> /app
src/app/(admin)/admin/page.tsx  -> /admin
```

Chỉ di chuyển file khi việc đó làm rõ layout hoặc guard dùng chung. Không đổi URL thành `/_auth`.

## Ma trận truy cập

| Route | Guest | User | Admin |
| --- | --- | --- | --- |
| `/` | Hiển thị landing | Redirect `/app` | Redirect `/admin` |
| `/auth` | Hiển thị đăng nhập | Redirect `/app` | Redirect `/admin` |
| `/app` | Redirect `/auth?next=/app` | Cho phép | Cho phép |
| `/admin` | Redirect `/auth?next=/admin` | Hiển thị 403 | Cho phép |
| `/forbidden` | Redirect `/auth` | Hiển thị 403 và link `/app` | Redirect `/admin` |

Admin mặc định vào `/admin` sau đăng nhập nhưng có thể truy cập `/app` để kiểm tra trải nghiệm người dùng.

## Điều hướng xác thực

`next` chỉ nhận đường dẫn nội bộ bắt đầu bằng một dấu `/`. Hệ thống từ chối URL khác origin, protocol-relative URL, ký tự điều khiển và route callback xác thực.

Sau khi callback đổi code lấy session:

1. Server xác minh user và role.
2. Server kiểm tra `next` theo cả tính an toàn của URL và quyền của role.
3. Nếu `next` hợp lệ và role có quyền, server chuyển tới `next`.
4. Nếu không, user tới `/app`, admin tới `/admin`.

User không thể dùng `next=/admin` để vượt quyền. Admin có thể dùng `next=/app`. Khi đăng xuất, cả user và admin về `/`.

## Trang 403

User đã đăng nhập nhưng không có quyền admin nhận trang 403 riêng thay vì bị chuyển về trang đăng nhập. Trang này:

- ghi rõ tài khoản đã đăng nhập nhưng không có quyền truy cập;
- có link về `/app`;
- có nút đăng xuất;
- không tiết lộ dữ liệu hoặc chức năng quản trị.

Route Handler admin trong tương lai trả `401` cho guest và `403` cho user không có quyền. Redirect giao diện không thay thế status code của API.

## Admin shell phase đầu

`/admin` dùng layout riêng với:

- thương hiệu DiDung và nhãn `Admin`;
- danh tính tài khoản;
- mục Tổng quan;
- các mục Người dùng, Dữ liệu, Đồng bộ và Cấu hình ở trạng thái “Sắp có”;
- link “Xem user site” tới `/app`;
- nút đăng xuất.

Admin shell không gọi API quản trị hoặc hiển thị dữ liệu mẫu dưới dạng dữ liệu thật. UI phải tuân thủ `design.md`. Trước khi code admin shell, nhóm phải tạo và duyệt wireframe theo `AGENTS.md`.

## Cấp và thu hồi admin

### Cấp quyền

1. User đăng nhập một lần bằng Google hoặc email/password để Supabase tạo tài khoản.
2. Người quản lý mở Authentication > Users trong Supabase Dashboard.
3. Người quản lý chọn đúng user ID và email.
4. Người quản lý thêm `app_role: "admin"` vào app metadata, giữ nguyên metadata khác.
5. User đăng xuất rồi đăng nhập lại để nhận token mới.
6. Server xác minh role và chuyển user tới `/admin`.

### Thu hồi quyền

1. Người quản lý xóa `app_role` hoặc đổi giá trị khỏi `admin`.
2. User đăng xuất rồi đăng nhập lại, hoặc người quản lý revoke session khi cần thu hồi khẩn cấp.
3. Server xem tài khoản là `user`; `/admin` hiển thị 403 và `/app` vẫn hoạt động.

Access token đã phát hành có thể giữ metadata cũ tới khi token được refresh. Tài liệu vận hành phải nêu bước revoke session cho trường hợp cần thu hồi ngay.

## Bảo mật

- Không dùng `user_metadata`, OAuth provider, email hoặc domain để cấp admin.
- Không đưa Supabase secret key hoặc service-role credential vào browser bundle.
- Không tin role do request body, query string, cookie tùy chỉnh hoặc client state gửi lên.
- Mọi admin page và admin API kiểm tra role phía server.
- Admin API tương lai kiểm tra quyền trước khi đọc hoặc thay đổi dữ liệu.
- Lỗi Supabase, metadata hỏng hoặc role không biết không bao giờ nâng quyền thành admin.
- Không thay claim hệ thống `role: authenticated`; custom role dùng `app_role`.

## MVVM và ranh giới code

- **Model:** Supabase server client, helper xác minh identity/role và các admin API tương lai.
- **ViewModel:** hook/store nhận dữ liệu admin từ API nội bộ khi các module quản trị được triển khai.
- **View:** landing, auth, user app, trang 403 và admin shell chỉ render state/props; component không tự gọi Supabase hoặc nguồn ngoài.

Phase role base không cần ViewModel dữ liệu admin vì admin shell chưa gọi nghiệp vụ quản trị.

## Tác động và tương thích

- `/` và `/auth` đổi đích redirect theo role thay vì chuyển mọi user tới `/app`.
- OAuth callback phải xác minh role sau khi thiết lập session.
- `safeAuthDestination` phải kiểm tra quyền với `/admin`, không chỉ kiểm tra origin.
- Admin vẫn dùng được toàn bộ chức năng user tại `/app`.
- Tài khoản hiện có không có `app_role` tiếp tục hoạt động như user thường.
- Các read API hiện yêu cầu đăng nhập giữ nguyên chính sách; phase này chưa đổi RLS hoặc dữ liệu domain.

## Rủi ro và giảm thiểu

| Rủi ro | Giảm thiểu |
| --- | --- |
| Gán nhầm admin trong Dashboard | Đối chiếu user ID và email; chỉ người quản lý project được sửa app metadata |
| Token giữ role cũ sau khi thu hồi | Revoke session khi khẩn cấp; yêu cầu đăng xuất/đăng nhập trong quy trình thường |
| Guard page có nhưng API không có | Tạo helper server-only dùng chung; bắt buộc admin API tương lai gọi helper |
| Open redirect qua `next` | Chỉ nhận path nội bộ và kiểm tra quyền trước redirect |
| Metadata hỏng làm nâng quyền | Chỉ chuỗi chính xác `admin` được xem là admin; mọi giá trị khác là user |
| Di chuyển route làm hỏng import/layout | Chỉ dùng route group khi có lợi; giữ nguyên URL và kiểm tra build |

## Rollback

Rollback code bằng cách hoàn nguyên admin route, trang 403, helper role và redirect theo role. `/`, `/auth` và `/app` trở lại hành vi trước thay đổi. Không có migration cần rollback.

Xóa `app_role` khỏi các tài khoản đã cấp nếu môi trường không còn dùng admin site. Việc để metadata tồn tại sau rollback không cấp thêm quyền vì code cũ không đọc trường này, nhưng nên dọn để tránh nhầm khi triển khai lại.

## Xác minh

Không tạo test tự động trong phase này nếu chưa được duyệt riêng. Kiểm tra thủ công tối thiểu:

1. Guest mở `/`, `/auth`, `/app`, `/admin` và `/forbidden`.
2. User email/password mở từng route trong ma trận.
3. User Google OAuth mở từng route trong ma trận và vẫn là user thường.
4. Gán `app_role: admin`, đăng nhập lại và xác nhận đích mặc định `/admin`.
5. Admin mở trực tiếp `/app` thành công.
6. User dùng `next=/admin` và không vượt quyền.
7. URL ngoài origin, `//host` và callback path trong `next` bị từ chối.
8. Thu hồi role, refresh/revoke session và xác nhận `/admin` trả trang 403.
9. Đăng xuất từ user app, admin shell và trang 403 đều về `/`.
10. Chạy `npx tsc --noEmit`, `npm run lint`, `npm run build` và `git diff --check`.

## Tiêu chí hoàn thành

- Người đã đăng nhập không thấy landing hoặc auth page.
- User mặc định vào `/app`; admin mặc định vào `/admin`.
- Google OAuth không tự tạo admin.
- User thường không xem được admin shell hoặc dữ liệu admin.
- Admin truy cập được cả `/admin` và `/app`.
- Admin shell có layout đã duyệt nhưng chưa có nghiệp vụ quản trị.
- Repo có hướng dẫn cấp, thu hồi và revoke session.
- Typecheck, lint và build thành công.

## Nguồn đã xác nhận

- Next.js 16 Authentication guide: Proxy chỉ phù hợp cho optimistic checks; ứng dụng phải kiểm tra quyền gần data source và trong Route Handler.
- Supabase Custom Claims and RBAC guide: custom claims có thể phục vụ RBAC; RLS phải kiểm tra quyền cho thao tác dữ liệu.
- Supabase Auth Admin metadata documentation: admin API có thể đặt `app_metadata`; metadata này xuất hiện trong access token và người dùng không tự cập nhật bằng client API.
- Repo: `src/proxy.ts`, `src/lib/supabase/middleware.ts`, `src/lib/auth-navigation.ts`, `src/app/auth/callback/route.ts` và các route hiện tại.

## Quyết định đã duyệt

- Dùng `app_metadata.app_role = "admin"`; không thêm schema trong phase đầu.
- Tất cả tài khoản mới, gồm Google OAuth, mặc định là user.
- User vào `/app`; admin mặc định vào `/admin` nhưng vẫn truy cập được `/app`.
- User mở `/admin` nhận trang 403.
- Giữ URL `/auth`.
- Admin shell phase đầu là placeholder có cấu trúc.
