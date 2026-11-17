# Full local service bằng Docker Compose

**Trạng thái: đề xuất, chờ người dùng duyệt trước khi triển khai.**

Ngày: 24/10/2026. Người dùng đã chọn **chạy toàn bộ local, gồm Supabase**. Quyết định này thay thế giới hạn “không chạy Supabase local” của AGENTS.md §2 cho môi trường Compose này; không thay đổi hoặc di chuyển project Supabase Cloud đang có.

## 1. Bối cảnh và mục tiêu

- Repo gồm Next.js UI + API, Supabase PostgreSQL/Auth/REST, cron gọi các API đồng bộ, và LLM gateway bên ngoài.
- Máy hiện chưa có cấu hình Supabase hợp lệ. Proxy hiện cần URL/key nên request UI bị lỗi trước khi render.
- Chưa tìm thấy Docker CLI trong PATH của phiên làm việc; chưa thể xác nhận Docker Engine/Compose hoạt động.
- Mục tiêu: cung cấp stack local có dữ liệu/schema riêng, khởi động được trên Docker Desktop với Linux containers, không phụ thuộc Supabase Cloud và không sửa/xóa dữ liệu cloud.
- Docker hóa các service không đồng nghĩa UI đã tích hợp dữ liệu thật: frontend hiện vẫn là UI minh họa đã chọn, trang login vẫn là thông báo preview. Việc nối UI vào API và xây form đăng nhập không thuộc thay đổi này.

## 2. Các phương án và lựa chọn

1. **Next.js container + Supabase Cloud:** ít container, giữ kiến trúc cũ nhưng vẫn cần project/key cloud; không đáp ứng lựa chọn mới.
2. **Next.js + Supabase self-host chính thức:** đáp ứng database, Auth và REST local; cần quản lý nhiều service, volume, key và migration. **Phương án được chọn theo câu trả lời của người dùng.**
3. **Chỉ Next.js + PostgreSQL:** không tương đương stack hiện tại vì thiếu Supabase Auth/REST, auth.uid(), roles và extension; không chọn.

Không tự thay Supabase bằng một database PostgreSQL thuần hoặc bỏ qua xác thực trong proxy.

## 3. Phạm vi

### Trong phạm vi

- Dockerfile nhiều stage cho Next.js standalone, Node 22, cài dependency bằng lockfile. Không nâng npm package.
- Compose gồm web và stack Supabase Docker chính thức; giữ các service nền mà bundle chính thức cần. Vendor cấu hình upstream ở một commit cố định, ghi nguồn/commit/image tag và giữ giấy phép; không lấy `master`/`latest` khi khởi động.
- PostgreSQL, Auth, REST, API gateway và Studio local; các service Storage/Realtime/phụ trợ của upstream theo cùng bundle tương thích.
- Dữ liệu Postgres/Storage lưu bền trên volume/bind mount local được bỏ qua Git.
- Mail inbox local để nhận email Auth mà không cần SMTP provider bên ngoài; không gửi email ra ngoài mặc định.
- Khởi tạo secret riêng cho local, áp dụng toàn bộ migration/seed hiện có, lịch đồng bộ local và báo cáo đầy đủ env.
- Hướng dẫn PowerShell và Linux: setup, build, start, logs, migration, dừng, backup/restore, cập nhật cấu hình.
- Cập nhật README, AGENTS.md, `.env.example` và tài liệu deployment để mô tả hai môi trường Cloud hiện có và Compose local.

### Ngoài phạm vi

- Deploy public, HTTPS/domain/reverse proxy public, HA, backup tự động lên cloud.
- Chạy/mirror Supabase Cloud project, nhập user/token/dữ liệu riêng từ cloud.
- Tự host 9Router hoặc model AI; repo không chứa source/cấu hình vận hành dịch vụ này. Vẫn cấu hình gateway có sẵn qua env.
- Thay Open-Meteo bằng nguồn offline, thêm API key Open-Meteo không được dùng bởi code hiện tại.
- Thêm UI, bỏ auth, nâng package, tự tạo test suite.

## 4. Thiết kế mạng và tiến trình

Các cổng host mặc định chỉ bind `127.0.0.1`:

| Thành phần | Địa chỉ dùng từ host/browser | Địa chỉ trong mạng Compose |
| --- | --- | --- |
| Next.js UI/API | `http://localhost:3000` | `http://web:3000` |
| Supabase gateway/Studio | `http://localhost:8000` | `http://api-gw:8000` |
| Mail inbox | `http://localhost:8025` | SMTP dùng tên service nội bộ |
| PostgreSQL | Không publish mặc định | `db:5432` |

- Các tên service/cổng nội bộ sẽ khớp bundle upstream đã pin, không trộn cấu hình của các phiên bản Supabase khác nhau.
- `web` lắng nghe `0.0.0.0:3000` trong container, chạy bằng user không phải root. Image cuối chỉ chứa standalone output, static và public assets.
- Không copy `.env*`, `.git`, `node_modules` host hoặc volume dữ liệu vào build context/image.
- Public env truyền khi build; server secret chỉ truyền lúc runtime. Đổi public URL/key/cookie name cần rebuild web image.
- Khởi động dựa trên healthcheck của các service nền và `service_completed_successfully` của migration. Migration không phụ thuộc web để tránh vòng phụ thuộc.
- Web giữ nguyên proxy session refresh; không có chế độ âm thầm bỏ qua Auth khi thiếu cấu hình.

### 4.1. URL server và browser, cookie session

- Browser tiếp tục dùng `NEXT_PUBLIC_SUPABASE_URL=http://localhost:8000`.
- Server/admin/proxy dùng env mới `SUPABASE_INTERNAL_URL=http://api-gw:8000`, fallback về URL public nếu biến này không có. Nhờ fallback, môi trường Cloud cũ tiếp tục dùng cấu hình hiện tại.
- Browser và server client SSR nhận cùng tên cookie tùy chọn `NEXT_PUBLIC_SUPABASE_AUTH_COOKIE_NAME=didung-local-auth` qua `cookieOptions.name`. Nếu không cấu hình, giữ mặc định cũ. Điều này tránh tên storage/cookie bị suy ra khác nhau từ hostname public và hostname Docker.
- Không truyền `SUPABASE_SECRET_KEY`, private signing key hay mật khẩu DB vào client/bundle/build args.
- Thay đổi source dự kiến giới hạn ở các client Supabase hiện có và helper cấu hình Model trong `src/lib/supabase/`; View không truy cập Supabase trực tiếp.

## 5. Database, migration và cron

### 5.1. Bootstrap và lịch sử migration

- Supabase upstream tạo roles, schema Auth/Storage và extension nền trước. Service `migrate` đợi cả DB và Auth healthy, sau đó xác nhận `auth.users`, `auth.uid()` và các role `anon`/`authenticated`/`service_role` đã tồn tại; DB chỉ nhận kết nối chưa đủ để coi bootstrap Auth đã xong. Cũng xác nhận image có extension Vault/pg_cron/pg_net và cấu hình preload cần thiết trước khi áp dụng batch.
- Sau các điều kiện sẵn sàng đó, `migrate` áp dụng các file `supabase/migrations/*.sql` theo thứ tự version, rồi migration deployment local. Auth chỉ phụ thuộc DB, không phụ thuộc migration ứng dụng, để tránh vòng khởi động.
- Không sửa nội dung hoặc số version của migration cũ đã áp dụng trên cloud.
- Có lịch sử áp dụng và checksum; chạy lại không seed trùng, không chạy lại DDL cũ. Thay nội dung file đã áp dụng phải báo lỗi.
- Service migration chạy bằng thông tin DB admin local, không dùng browser/public key.
- Bootstrap quản lý lịch sử trong schema riêng, không expose qua PostgREST:

```sql
create schema if not exists didung_deploy;
revoke all on schema didung_deploy from public;

create table if not exists didung_deploy.migrations (
  version text primary key,
  checksum text not null,
  applied_at timestamptz not null default now()
);

revoke all on didung_deploy.migrations from public, anon, authenticated;
```

DDL bootstrap này nằm trong SQL deployment được version hóa. Không thêm foreign key hoặc thay RLS của bảng domain. Schema chỉ dành cho công cụ triển khai và không có public API.

### 5.2. Không để cron local gọi Vercel

Migration cuối hiện trỏ cron đến `https://didung-air-quality.vercel.app`. Local phải ghi đè bốn job bằng SQL deployment có version, nằm riêng dưới `deploy/migrations/`, không tự đẩy lên project cloud:

| Job | UTC schedule | URL local |
| --- | --- | --- |
| `sync-weather-hourly` | `0 * * * *` | `http://web:3000/api/sync/weather` |
| `sync-air-quality-hourly` | `5 * * * *` | `http://web:3000/api/sync/air-quality-model` |
| `evaluate-alerts-hourly` | `10 * * * *` | `http://web:3000/api/jobs/evaluate-alerts` |
| `sync-advisories-hourly` | `20 * * * *` | `http://web:3000/api/sync/advisories` |

- Header `x-cron-secret` vẫn đọc từ Vault, khớp `CRON_SECRET` của web.
- Bootstrap Vault secret và toàn bộ batch migration ban đầu, gồm ghi đè job local, được commit cùng transaction có advisory lock. Không để job dùng URL Vercel trở thành trạng thái đã commit giữa chừng.
- Migration upgrade chỉ chạy các version chưa áp dụng, với cùng nguyên tắc transaction/checksum. Lỗi làm rollback batch; web không khởi động như thể migration đã thành công.
- Cron có thể chạy trước khi web ready và gặp lỗi tạm thời; hướng dẫn chạy sync thủ công sau khi toàn stack healthy để tạo dữ liệu đầu tiên, không chờ đến giờ cron.
- Không tự sửa lịch cloud, không kết nối Supabase Cloud trong bootstrap.

### 5.3. Dữ liệu và rollback

- Seed địa điểm từ migration trong repo; dữ liệu môi trường được lấy từ Open-Meteo sau sync, không dùng số demo để giả dữ liệu API.
- Dừng stack giữ nguyên volume. Không dùng `down -v` hoặc reset trong lệnh start/setup.
- Migration lỗi rollback transaction. Khi cần quay về image/schema cũ sau một lần upgrade đã commit, dùng backup đã tạo trước upgrade; không tự chạy destructive down migration.
- Không xoay key hoặc mật khẩu tự động mỗi lần start; việc đó có thể làm mất khả năng đọc session/dữ liệu đã mã hóa.

## 6. Báo cáo env cần setup

Tạo file env Docker riêng bị Git bỏ qua. Script setup tạo giá trị local và ánh xạ public key; không yêu cầu người dùng xin Supabase Cloud key. `.env.example`/mẫu Docker chỉ chứa tên biến và giá trị mặc định không nhạy cảm.

### 6.1. App DiDung

| Biến | Mức cần thiết | Giá trị/nguồn local | Thời điểm |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Bắt buộc | `http://localhost:8000` | Build + runtime |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Bắt buộc | Ánh xạ publishable key do setup Supabase local tạo | Build + runtime, được public |
| `SUPABASE_INTERNAL_URL` | Bắt buộc trong Compose | `http://api-gw:8000` | Runtime server |
| `NEXT_PUBLIC_SUPABASE_AUTH_COOKIE_NAME` | Bắt buộc khi tách hostname | `didung-local-auth` | Build + runtime, được public |
| `SUPABASE_SECRET_KEY` | Bắt buộc cho sync/job | Secret API key local do setup tạo | Runtime server |
| `CRON_SECRET` | Bắt buộc cho sync/job | Chuỗi ngẫu nhiên riêng; setup ghi cùng giá trị vào Vault | Runtime server + Vault |
| `NINEROUTER_API_KEY` | Cần để chạy đầy đủ lời khuyên AI | Người dùng cung cấp key gateway | Runtime server |
| `NINEROUTER_BASE_URL` | Có default trong code | `https://router.studev.net` hoặc gateway tương thích được cung cấp | Runtime server |
| `NINEROUTER_MODEL` | Có default trong code | `ag/gemini-3.8-flash-low` | Runtime server |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Chưa dùng trong UI hiện tại | Cần khi xây bản đồ Mapbox thật, không cần cho sơ đồ preview | Build, được public |

Thiếu key AI vẫn có thể chạy web, Auth, REST, sync thời tiết/không khí; không báo tính năng sinh lời khuyên đã hoạt động. Open-Meteo không có biến API key trong code hiện tại. `NODE_ENV=production`, `PORT=3000`, `HOSTNAME=0.0.0.0` được cấu hình trong container.

### 6.2. Supabase self-host: setup sinh và lưu riêng

| Nhóm | Biến | Yêu cầu |
| --- | --- | --- |
| Database | `POSTGRES_PASSWORD` | Mật khẩu riêng cho DB local |
| API/Auth | `JWT_SECRET`, `ANON_KEY`, `SERVICE_ROLE_KEY` | Bộ key tương thích nội bộ của upstream; không dùng key mẫu |
| Key mới | `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`, `JWT_KEYS`, `JWT_JWKS` | Sinh theo công cụ upstream; bật các cấu hình Auth/REST/Realtime/Storage tương ứng |
| Dashboard | `DASHBOARD_USERNAME`, `DASHBOARD_PASSWORD` | Tài khoản Studio riêng; setup sinh mật khẩu |
| Mã hóa | `SECRET_KEY_BASE`, `REALTIME_DB_ENC_KEY`, `VAULT_ENC_KEY`, `PG_META_CRYPTO_KEY` | Đúng định dạng/độ dài của upstream; lưu bền cùng cấu hình |
| Storage | `S3_PROTOCOL_ACCESS_KEY_ID`, `S3_PROTOCOL_ACCESS_KEY_SECRET` | Sinh riêng nếu bundle upstream yêu cầu |
| Logging tùy bundle | `LOGFLARE_PUBLIC_ACCESS_TOKEN`, `LOGFLARE_PRIVATE_ACCESS_TOKEN` | Chỉ cần nếu bật service logging tương ứng |

Tái sử dụng utility sinh key chính thức từ commit đã pin, chạy trong helper container phù hợp trên Windows; không in kết quả key ra output cuộc hội thoại/log CI. File chứa secret bị bỏ qua Git và build context. Các key private và legacy service-role không được gửi đến browser.

### 6.3. URL, mail và cấu hình có default

| Biến | Default/ý nghĩa |
| --- | --- |
| `SUPABASE_PUBLIC_URL` | `http://localhost:8000` |
| `API_EXTERNAL_URL` | `http://localhost:8000/auth/v1` theo upstream hiện tại |
| `SITE_URL` | `http://localhost:3000` |
| `ADDITIONAL_REDIRECT_URLS` | Chứa callback local `http://localhost:3000/auth/callback` |
| `POSTGRES_HOST`, `POSTGRES_DB`, `POSTGRES_PORT` | `db`, `postgres`, `5432` trong container |
| `POOLER_TENANT_ID` và các biến pooler | Default riêng cho deployment nếu giữ pooler upstream |
| `SMTP_HOST`, `SMTP_PORT` | Trỏ mail service local; cổng theo image đã xác nhận |
| `SMTP_ADMIN_EMAIL`, `SMTP_SENDER_NAME` | Danh tính gửi thử local |
| `SMTP_USER`, `SMTP_PASS` | Rỗng nếu mail service local không yêu cầu xác thực |
| `ENABLE_EMAIL_SIGNUP`, `ENABLE_EMAIL_AUTOCONFIRM` | Bật email signup; giữ confirm để kiểm tra qua inbox local |

Google OAuth là tùy chọn, không phải điều kiện khởi động: cần `GOOGLE_ENABLED`, `GOOGLE_CLIENT_ID`, `GOOGLE_SECRET` cùng provider callback `http://localhost:8000/auth/v1/callback`. Chỉ bật khi người dùng cấp cấu hình; không tự tạo/cấu hình Google Cloud account.

Danh sách chính xác của toàn bộ biến upstream sẽ lấy từ `.env.example` của commit vendor được pin và ghi trong báo cáo triển khai cuối; các tính năng phụ không dùng không bị báo là bắt buộc cho DiDung.

## 7. File dự kiến và tác động

- `Dockerfile`, `.dockerignore`, `compose.yaml` cùng override/config local.
- `deploy/` chứa bundle Supabase đã pin, nguồn/giấy phép, script setup Windows/Linux, SQL migration runner/local cron và env mẫu.
- `next.config.ts`: thêm standalone output.
- `src/lib/supabase/*`: tùy chọn internal URL và cookie name chung, giữ fallback Cloud.
- `.gitignore`: bỏ qua env Docker, key, dữ liệu volume và file sinh khi setup.
- `docs/deployment/`: hướng dẫn và bảng env cuối cùng.
- README và AGENTS.md cập nhật môi trường Docker local và trạng thái hosting; không tự đổi mô tả UI minh họa thành tích hợp backend hoàn chỉnh.

## 8. Kiểm chứng sau khi được duyệt

Không tự tạo test files. Chạy các kiểm tra hiện có và kiểm tra vận hành trực tiếp:

1. Typecheck, lint, build ứng dụng.
2. `docker compose config --quiet` với cấu hình đã setup; không in config chứa secret.
3. Build image, start stack, kiểm tra trạng thái healthy và migration hoàn tất.
4. HTTP UI/API local không còn lỗi thiếu Supabase config; `/api/locations` đọc được seed.
5. Xác nhận cả bốn cron chỉ gọi `web`, Vault secret khớp; gọi sync thủ công với secret từ env mà không ghi secret vào log.
6. Kiểm tra email Auth trong inbox local, cookie browser/server và RLS qua public/authenticated client khi công cụ truy cập cho phép; không coi UI login preview là form Auth đã hoàn thiện.
7. Restart giữ dữ liệu, chạy lại migration không áp dụng lại version cũ.
8. Kiểm tra context/image không chứa env/private key; browser bundle chỉ có env public.

Nếu Docker không có sẵn, báo rõ bước chưa chạy, không tuyên bố full service đã hoạt động. Không tự cài Docker Desktop vì cần thay đổi máy và có thể cần restart.

## 9. Rủi ro và điểm còn cần xác nhận

- Docker Desktop/Linux containers cần được cài và bật trên máy; tài nguyên theo yêu cầu Supabase upstream, không chỉ nhu cầu một container Next.js.
- Supabase Docker upstream thay đổi theo thời gian; phải pin toàn bundle và xác nhận image tag trước khi viết cấu hình.
- Windows bind mounts và line endings của shell script cần được xử lý; tránh yêu cầu người dùng phải có Bash/OpenSSL host nếu helper container có thể cung cấp.
- Các extension pg_cron/pg_net/Vault và transaction bootstrap phải được kiểm tra trên image DB đã pin.
- Dữ liệu Open-Meteo và gateway AI vẫn cần Internet; không có bản sao offline trong phạm vi này.
- Public deployment cần spec riêng cho HTTPS, domain, backup và giới hạn mạng; mặc định hiện tại chỉ phục vụ localhost.

## 10. Nguồn chính thống đã kiểm tra

- [Supabase Docker self-host](https://supabase.com/docs/guides/self-hosting/docker).
- [Supabase official Docker configuration](https://github.com/supabase/supabase/tree/master/docker): Compose, env mẫu và utilities sinh key; chưa vendor hoặc chạy script.
- [Supabase new API/auth keys](https://supabase.com/docs/guides/self-hosting/self-hosted-auth-keys).
- [Supabase SSR server client](https://github.com/supabase/ssr/blob/main/src/createServerClient.ts) và [browser client](https://github.com/supabase/ssr/blob/main/src/createBrowserClient.ts): hỗ trợ cookieOptions.name.
- [Next.js self-hosting](https://nextjs.org/docs/app/guides/self-hosting) và [standalone output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output).
- [Docker Compose env](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/), [merge paths](https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/) và [startup conditions](https://docs.docker.com/compose/how-tos/startup-order/).

**Cần duyệt:** thiết kế Compose local, URL/cookie Auth, bootstrap migration/ledger/local cron và phạm vi env nêu trên. Chưa tạo Dockerfile/Compose hoặc sửa auth/schema trước khi duyệt.

Builder review độc lập đã rà soát thiết kế. Đã bổ sung điều kiện Auth healthy và kiểm tra object Auth trước application migration theo phát hiện của reviewer; các quyết định URL/cookie, secret, cron transaction và phạm vi được đánh giá là đủ rõ để triển khai sau duyệt. Chưa có Docker runtime verification.
