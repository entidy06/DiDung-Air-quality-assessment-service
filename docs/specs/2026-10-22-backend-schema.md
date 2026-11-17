---
title: Backend data schema (MVP) — PM2.5/AQI + thời tiết cho TP. Hồ Chí Minh
status: APPROVED (22/10/2026, theo xác nhận của Trần Minh Tiến — Developer phụ trách backend) — sẵn sàng implement theo AGENTS.md §4
date: 2026-10-22
author: Agent (nghiên cứu theo yêu cầu Trần Minh Tiến)
---

## 1. Bối cảnh / mục tiêu

DiDung cần lưu và phục vụ dữ liệu PM2.5/AQI + thời tiết cho khu vực TP. Hồ Chí Minh (Must-have theo README mục 2), làm nền cho dashboard, dự báo ngắn hạn và cảnh báo theo ngưỡng cá nhân. Hiện repo chưa có schema nào (`src/lib/supabase` chỉ có client/server factory). Spec này định nghĩa schema tối thiểu cho MVP, theo kiến trúc MVVM đã chốt (AGENTS.md §3): schema + migration thuộc tầng **Model**.

**Phạm vi địa lý:**
- **Seed data / MVP:** chỉ TP. Hồ Chí Minh — không đổi scope sản phẩm đã trình bày ở PA0/PA1 (README vẫn ghi rõ phạm vi là TP.HCM).
- **[Quyết định 22/10/2026]** Schema được thiết kế **tổng quát theo tỉnh/thành** (thêm bảng `provinces`, xem mục 4.1) để sau này có thể thêm tỉnh/thành khác **mà không cần đổi cấu trúc bảng/migration lại từ đầu**. Đây **chỉ là quyết định thiết kế kỹ thuật**, không phải thay đổi phạm vi sản phẩm — nếu nhóm muốn thực sự mở rộng scope sang toàn quốc, cần quy trình phê duyệt scope change riêng (như đã áp dụng cho câu hỏi ngập/triều cường), không tự coi là đã duyệt chỉ vì schema hỗ trợ kỹ thuật.

## 2. Phạm vi và ngoài phạm vi

**Trong phạm vi:**
- Bảng lưu danh sách khu vực (sub-location) trong TP.HCM.
- Bảng lưu dữ liệu mô hình PM2.5/AQI + thời tiết từ **Open-Meteo** (nguồn dữ liệu duy nhất — xem quyết định ở mục 3.2).
- Bảng dự báo ngắn hạn PM2.5/AQI do hệ thống tự tính (baseline).
- Bảng log đồng bộ (data_sync_log) để theo dõi lỗi/trạng thái job.
- Bảng tài khoản/ngưỡng cảnh báo/thông báo cho Must-have "Tài khoản, lựa chọn khu vực, ngưỡng cảnh báo" và "Banner cảnh báo và trung tâm thông báo".
- RLS cho toàn bộ bảng.

**Ngoài phạm vi (không tạo bảng ở spec này):**
- **OpenAQ** — đã quyết định bỏ khỏi MVP (xem mục 3.2), không tạo bảng `openaq_stations`/`measurements`.
- Triều cường/ngập — theo README đang **chờ phê duyệt scope**, chưa có nguồn xác thực.
- Giám sát quản trị nâng cao, push notification token, báo cáo ngập từ người dùng — Should/Could/Won't, chưa tới MVP.
- Versioning mô hình ML phức tạp — MVP chỉ cần baseline minh bạch (README mục 3).

## 3. Phát hiện nghiên cứu quan trọng (ảnh hưởng trực tiếp tới thiết kế)

Theo AGENTS.md §1, các điểm dưới đây được tra từ nguồn chính thống, không suy đoán:

1. **Thử nghiệm OpenAQ (22/10/2026)** — gọi thật `GET /v3/locations?coordinates=10.7769,106.7009&radius=25000`: 19 điểm quanh TP.HCM, nhưng 2 trạm chính phủ đã ngừng từ 2016/03-2025, hầu hết sensor low-cost (AirGradient/HabitatMap) cũng đã ngừng, **chỉ 1 sensor còn sống** (id 3276359 "CMT8"). → Độ phủ quá mỏng, không ổn định để làm nguồn chính thức.
2. **Quyết định: bỏ OpenAQ khỏi MVP.** Chỉ dùng **Open-Meteo** làm nguồn duy nhất (Air Quality + Weather), cả hai đều là dữ liệu mô hình (modeled), không có dữ liệu "đo tại trạm" thật ở MVP. Đã test trực tiếp 22/10/2026 cho tọa độ TP.HCM (10.7769, 106.7009):
   - `GET air-quality-api.open-meteo.com/v1/air-quality?latitude=10.7769&longitude=106.7009&hourly=pm2_5,european_aqi,us_aqi` → trả 24h dữ liệu hôm nay, PM2.5 dao động 27.9–74.7 µg/m³, US AQI 95–164 (Unhealthy for Sensitive Groups → Unhealthy buổi tối).
   - `GET api.open-meteo.com/v1/forecast?latitude=10.7769&longitude=106.7009&hourly=precipitation,relative_humidity_2m,wind_speed_10m,wind_direction_10m` → trả 24h thời tiết hôm nay, mưa cao nhất 3.3mm (17h), độ ẩm 65–99%.
   - Cả hai **không cần API key**, hoạt động ổn định ngay lập tức.
   - **Hệ quả cho UI/README:** README mục 2 cam kết "hiển thị rõ dữ liệu đo tại trạm vs mô hình" — ở MVP sẽ **luôn là mô hình**, không có nhánh "đo tại trạm" nào để hiển thị cho tới khi có nguồn đo thật được xác thực (không phải OpenAQ). Cần thông báo với TA/README rằng đây là giới hạn đã biết, không phải thiếu sót.
2b. **[Phát hiện 22/10/2026] Open-Meteo không phải trạm — là mô hình lưới, độ phân giải khác nhau giữa Air Quality và Weather:**
   - **Air Quality (PM2.5/AQI):** khu vực Việt Nam dùng **CAMS Global**, độ phân giải **~45km (0.4°)** (CAMS European 11km chỉ phủ châu Âu, không áp dụng). Đã test thực nghiệm: gọi Quận 1 (10.7769,106.7009), Thủ Đức (10.8700,106.8030, ~15km) và Bình Tân (10.7600,106.6050, ~10km) → **cả 3 đều snap về cùng 1 ô lưới, trả về PM2.5 giống nhau tuyệt đối** (`[43.2, 39.7, 29.4]`). Chỉ khi thử tới Cần Giờ (~65km) mới đổi ô lưới, đổi giá trị. → **Toàn bộ nội thành TP.HCM gần như chia sẻ chung 1 giá trị PM2.5/AQI** từ nguồn này.
   - **Weather (mưa/gió/độ ẩm):** dùng global backbone ECMWF IFS/GFS/ICON (VN không có mô hình khu vực độ phân giải cao), độ phân giải **~9–11km**. Test cùng 3 điểm trên → **mỗi điểm trả về tọa độ lưới khác nhau và giá trị mưa khác nhau** — thời tiết có sự khác biệt thật theo khu vực, PM2.5/AQI thì không.
   - **Hệ quả sản phẩm (không chỉ kỹ thuật):** README/kỳ vọng người dùng "xem AQI theo khu vực" sẽ **không đúng thực tế** nếu dùng Open-Meteo làm nguồn duy nhất — các location trong lõi đô thị (Quận 1, Quận 3, Bình Thạnh, Thủ Đức...) sẽ hiển thị PM2.5/AQI **giống nhau**. Cần nhóm quyết định: (i) chấp nhận giới hạn này và điều chỉnh UI/copy để không hứa "theo khu vực" cho riêng AQI (chỉ đúng cho thời tiết), hoặc (ii) giảm số lượng `locations` seed cho AQI xuống 1 điểm đại diện cho cả thành phố (vì dữ liệu thực chất là 1 điểm), tách riêng granularity của `weather_data` (theo location, ~10km) với `air_quality_model` (theo "thành phố", không theo location con).
3. **TP.HCM sau sáp nhập hành chính (7/2025) bao gồm cả Bình Dương và Bà Rịa–Vũng Tàu cũ** — địa giới mới rất lớn, và cấp quận/huyện đã bị bãi bỏ (chỉ còn phường/xã/đặc khu trực thuộc thẳng TP.HCM). **[ĐÃ CHỐT ở mục 6.3]** seed theo địa giới mới (168 đơn vị), không chỉ lõi đô thị cũ — xem mục 6.3 để biết nguồn chính thức và việc còn thiếu (danh sách đối chiếu + geocode).
4. **Open-Meteo free tier không cần API key**, giới hạn 600 calls/phút · 10.000/ngày · 300.000/tháng, chỉ cấm mục đích **thương mại** (nguồn: open-meteo.com/en/pricing). Đồ án học thuật dùng free tier được; nếu sau này deploy public có traffic thật nên đọc lại điều khoản.
5. **`pg_cron` không tự gọi HTTP.** Muốn gọi API ngoài từ Postgres phải dùng thêm extension `pg_net` (hiện ở trạng thái **beta** theo tài liệu Supabase) hoặc gọi Supabase Edge Function. README hiện ghi "Supabase pg_cron" như thể tự đủ — **chưa chính xác**, cần chọn 1 trong 2 phương án ở mục 6.

## 4. Thiết kế — DDL (Postgres / Supabase)

```sql
-- 4.0 Tỉnh/thành phố — tách riêng để schema không hard-code chỉ TP.HCM,
-- cho phép thêm tỉnh/thành khác sau mà không phải đổi cấu trúc bảng locations.
-- MVP chỉ seed 1 dòng duy nhất: TP. Hồ Chí Minh.
create table public.provinces (
  id uuid primary key default gen_random_uuid(),
  name text not null, -- ví dụ 'Thành phố Hồ Chí Minh'
  code text not null unique, -- mã nội bộ, ví dụ 'HCM'; có thể đổi sang mã GSO/ISO 3166-2:VN khi cần
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 4.1 Khu vực (sub-location) thuộc một tỉnh/thành
create table public.locations (
  id uuid primary key default gen_random_uuid(),
  province_id uuid not null references public.provinces(id),
  name text not null,
  slug text not null unique,
  latitude numeric(9,6) not null,
  longitude numeric(9,6) not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 4.2 Dữ liệu mô hình AQI/PM2.5 từ Open-Meteo — nguồn PM2.5/AQI duy nhất của MVP
create table public.air_quality_model (
  id bigint generated always as identity primary key,
  location_id uuid not null references public.locations(id) on delete cascade,
  valid_at timestamptz not null,
  pm2_5 numeric,
  european_aqi numeric,
  us_aqi numeric,
  source text not null default 'open-meteo',
  fetched_at timestamptz not null default now(),
  unique (location_id, valid_at)
);

-- 4.3 Dữ liệu thời tiết (thực tế gần nhất + dự báo) từ Open-Meteo
create table public.weather_data (
  id bigint generated always as identity primary key,
  location_id uuid not null references public.locations(id) on delete cascade,
  valid_at timestamptz not null,
  is_forecast boolean not null,
  precipitation numeric,
  relative_humidity numeric,
  wind_speed numeric,
  wind_direction numeric,
  source text not null default 'open-meteo',
  fetched_at timestamptz not null default now(),
  unique (location_id, valid_at, is_forecast)
);

-- 4.4 Dự báo ngắn hạn PM2.5/AQI do hệ thống tự tính (baseline, minh bạch)
create table public.forecasts (
  id bigint generated always as identity primary key,
  location_id uuid not null references public.locations(id) on delete cascade,
  generated_at timestamptz not null default now(),
  target_time timestamptz not null,
  predicted_pm25 numeric,
  predicted_aqi numeric,
  model_name text not null, -- ví dụ 'baseline-persistence'
  unique (location_id, target_time, model_name)
);

-- 4.5 Log đồng bộ dữ liệu nguồn ngoài
create table public.data_sync_log (
  id bigint generated always as identity primary key,
  source text not null, -- 'open-meteo-air-quality' | 'open-meteo-weather'
  started_at timestamptz not null,
  finished_at timestamptz,
  status text not null check (status in ('success','partial','failed')),
  records_synced integer not null default 0,
  error_message text
);

-- 4.6 Hồ sơ người dùng (mở rộng auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

-- 4.7 Khu vực người dùng theo dõi
create table public.user_locations (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  location_id uuid not null references public.locations(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, location_id)
);

-- 4.8 Ngưỡng cảnh báo cá nhân
create table public.alert_thresholds (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  location_id uuid not null references public.locations(id) on delete cascade,
  metric text not null check (metric in ('pm25','aqi')),
  threshold_value numeric not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 4.9 Thông báo (trung tâm thông báo trong app)
create table public.notifications (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  threshold_id bigint references public.alert_thresholds(id) on delete set null,
  location_id uuid references public.locations(id),
  metric text,
  metric_value numeric,
  title text not null,
  body text,
  is_read boolean not null default false,
  created_at timestamptz not null default now(),
  dedup_key text not null unique -- vd: hash(user_id, threshold_id, date) để chặn thông báo trùng/ngày
);
```

### 4.10 Cơ chế chạy job định kỳ — pg_cron + pg_net (trigger-only)

Không phải DDL bảng, nhưng thuộc cùng migration nhóm "hạ tầng đồng bộ dữ liệu". `pg_cron`/`pg_net` **chỉ gọi route có sẵn**, không chứa business logic:

```sql
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Secret bảo vệ route, lưu qua Supabase Vault — không hardcode trong migration/code
select vault.create_secret('<giá-trị-thật-nhập-khi-chạy-migration>', 'cron_secret');

select cron.schedule(
  'sync-weather-hourly',
  '0 * * * *', -- mỗi giờ
  $$
  select net.http_post(
    url := 'https://<domain-production>/api/sync/weather',
    headers := jsonb_build_object(
      'x-cron-secret',
      (select decrypted_secret from vault.decrypted_secrets where name = 'cron_secret')
    ),
    body := '{}'::jsonb
  );
  $$
);

select cron.schedule(
  'sync-air-quality-hourly',
  '5 * * * *', -- lệch 5 phút so với weather để tránh chạy đồng thời
  $$
  select net.http_post(
    url := 'https://<domain-production>/api/sync/air-quality-model',
    headers := jsonb_build_object(
      'x-cron-secret',
      (select decrypted_secret from vault.decrypted_secrets where name = 'cron_secret')
    ),
    body := '{}'::jsonb
  );
  $$
);
```

Route `src/app/api/sync/weather/route.ts` và `src/app/api/sync/air-quality-model/route.ts` phải kiểm tra header `x-cron-secret` khớp `process.env.CRON_SECRET` trước khi chạy — từ chối (401) nếu sai/thiếu. Theo dõi thành công/lỗi qua bảng `data_sync_log` (route tự ghi), không cần dựa vào bảng nội bộ `net._http_response` của `pg_net`.

### Quan hệ chính
`provinces` 1—n `locations` · `locations` 1—n `air_quality_model` / `weather_data` / `forecasts` · `auth.users` 1—1 `profiles` · `auth.users` 1—n `user_locations` / `alert_thresholds` / `notifications` · `alert_thresholds` 1—n `notifications`.

### RLS (Row Level Security)

```sql
alter table public.provinces enable row level security;
alter table public.locations enable row level security;
alter table public.air_quality_model enable row level security;
alter table public.weather_data enable row level security;
alter table public.forecasts enable row level security;
alter table public.data_sync_log enable row level security;
alter table public.profiles enable row level security;
alter table public.user_locations enable row level security;
alter table public.alert_thresholds enable row level security;
alter table public.notifications enable row level security;

-- Dữ liệu công khai: ai cũng đọc được, chỉ service_role (API routes dùng service key) mới ghi
create policy "public read" on public.provinces for select using (true);
create policy "public read" on public.locations for select using (true);
create policy "public read" on public.air_quality_model for select using (true);
create policy "public read" on public.weather_data for select using (true);
create policy "public read" on public.forecasts for select using (true);
-- data_sync_log: không public, chỉ phục vụ nội bộ/ops -> không tạo policy select cho anon/authenticated

-- Dữ liệu người dùng: chỉ chủ sở hữu
create policy "own profile" on public.profiles for select using (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id);

create policy "own user_locations" on public.user_locations
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own thresholds" on public.alert_thresholds
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own notifications" on public.notifications
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

Ghi chú: các bảng chỉ-đọc-công-khai (`locations`, `air_quality_model`, ...) không có policy insert/update/delete cho `anon`/`authenticated` — job sync và evaluate-alerts phải chạy bằng `service_role` key (bypass RLS), gọi từ Next.js API route phía server, **không bao giờ** từ client.

### Migration & rollback

- Dùng Supabase CLI: `supabase migration new <slug>`, file versioned trong `supabase/migrations/`, áp dụng qua `supabase db push` (theo đúng AGENTS.md §4: "mọi thay đổi schema phải qua migration có version").
- Tách thành nhiều migration nhỏ theo nhóm bảng (data domain / user domain / RLS) để dễ rollback từng phần, không gộp 10 bảng vào 1 file.
- Supabase CLI không tự sinh down-migration; rollback thủ công bằng script `DROP TABLE ... CASCADE` tương ứng, lưu kèm trong PR review, không chạy tay trên dashboard.

## 5. Tác động

- Thêm thư mục `supabase/migrations/` và (có thể) `supabase/` config vào repo — cần cập nhật `AGENTS.md` §2 (cấu trúc chính) khi merge.
- Tầng Model (MVVM, AGENTS.md §3) sẽ có domain logic đọc/viết các bảng này tại `src/lib/`; API routes tương ứng (`src/app/api/...`) implement ở spec/PR riêng sau khi schema được duyệt.
- Route `/api/sync/*` phải kiểm tra header `x-cron-secret` (xem mục 4.10) trước khi chạy — cần thêm `CRON_SECRET` vào biến môi trường server-side (không `NEXT_PUBLIC_`), cập nhật `.env.example` khi implement route này.
- README mục 2 cam kết "hiển thị rõ dữ liệu đo tại trạm vs mô hình" — vì MVP chỉ dùng Open-Meteo (modeled), cần cập nhật README/communicate với TA rằng ở MVP **không có** nhánh "đo tại trạm", chỉ có "mô hình/ước lượng".

## 6. Rủi ro & câu hỏi mở (cần trả lời trước khi implement)

1. **[ĐÃ CHỐT 22/10/2026]** Bỏ OpenAQ khỏi MVP — độ phủ quá mỏng/không ổn định quanh TP.HCM (xem mục 3.1–3.2). Chỉ dùng Open-Meteo. Có thể xem lại OpenAQ ở giai đoạn sau nếu khảo sát PA2 phát hiện nguồn đo thật đáng tin cậy hơn.
1b. **[ĐÃ CHỐT 22/10/2026]** Giữ `locations` chi tiết theo từng phường/xã/đặc khu (đơn vị hành chính cấp xã sau cải cách 7/2025 — không còn cấp quận, xem mục 6.3) cho cả `air_quality_model` và `weather_data` — không rút về 1 điểm đại diện cho cả thành phố. Không cần đổi schema (bảng `air_quality_model` vốn đã theo `location_id`). Hệ quả cần ghi nhận: do Open-Meteo Air Quality có ô lưới ~45km, **nhiều phường/xã lân cận trong lõi đô thị sẽ trả về giá trị PM2.5/AQI giống nhau** (đã verify thực nghiệm ở mục 3.2b) — đây là giới hạn đã biết của nguồn dữ liệu, không phải lỗi đồng bộ; UI/copy cần tránh ngụ ý rằng giá trị giống nhau là trùng hợp hoặc lỗi.
2. **[ĐÃ CHỐT 22/10/2026]** Dùng **`pg_cron` + `pg_net` làm trigger-only** — không viết business logic trong Postgres/Edge Function. `pg_cron` chỉ giữ lịch, `pg_net` chỉ gửi 1 `net.http_post` gọi ra route Next.js đã có (`/api/sync/weather`, `/api/sync/air-quality-model`); toàn bộ logic gọi Open-Meteo, parse, upsert, ghi `data_sync_log` vẫn 100% nằm ở tầng Model trong `src/app/api/` — không vi phạm MVVM (AGENTS.md §3). Lý do chọn so với 3 phương án khác đã xem xét:
   - Vercel Cron (free/Hobby): chỉ chạy **1 lần/ngày**, giờ lệch tới ±59 phút (đã verify `vercel.com/docs/cron-jobs/usage-and-pricing`) — quá thưa cho dữ liệu cần tương đối mới.
   - GitHub Actions `schedule`: khả thi (tối thiểu 5 phút/lần) nhưng tự tắt sau 60 ngày repo không có hoạt động (đã verify docs.github.com).
   - Cloudflare Cron Trigger: chính xác nhất (1 phút) nhưng đòi hỏi thêm 1 platform hoàn toàn mới (Cloudflare account + Worker riêng) — không nằm trong stack đã chốt ở AGENTS.md §2, bản thân việc thêm nó cũng là "thay đổi stack" cần spec/duyệt riêng theo AGENTS.md §4, không đáng cho nhu cầu hiện tại.
   - `pg_cron`+`pg_net` dùng ngay hạ tầng Supabase đã có trong stack, không giới hạn tần suất, khớp đúng lựa chọn "Scheduler: Supabase pg_cron" đã ghi trong README/PA1 — chỉ cần làm đúng cách (trigger-only) thay vì để `pg_cron` tự ôm logic như README ngụ ý trước đây.
   - Thiết kế cụ thể: xem mục 4.10 (migration bật extension + lập lịch) và route cần thêm field kiểm tra secret header `x-cron-secret` so với `process.env.CRON_SECRET` (secret lưu trong Supabase Vault, không hardcode trong migration).
3. **[ĐÃ CHỐT 22/10/2026 — bổ sung nguồn 22/10/2026]** Seed `locations` theo **địa giới TP.HCM mới** (sau sáp nhập 7/2025, gồm cả Bình Dương và Bà Rịa–Vũng Tàu cũ), không chỉ đô thị lõi cũ.
   - **Nguồn chính thức đã xác định:** Nghị quyết **1685/NQ-UBTVQH15** (Ủy ban Thường vụ Quốc hội, ký 16/6/2025, hiệu lực 01/7/2025) — "sắp xếp các đơn vị hành chính cấp xã của TP. Hồ Chí Minh năm 2025". Kết quả: **168 đơn vị hành chính cấp xã** (113 phường + 54 xã + 1 đặc khu Côn Đảo). Toàn văn: `thuvienphapluat.vn` (văn bản số 661124) hoặc `xaydungchinhsach.chinhphu.vn`.
   - **Thay đổi thuật ngữ quan trọng:** nghị quyết này **đồng thời chấm dứt hoạt động cấp quận/huyện/thành phố thuộc tỉnh** trên toàn TP.HCM mới. Từ 1/7/2025 chỉ còn 2 cấp: tỉnh/thành phố → phường/xã/đặc khu trực tiếp, **không còn "quận"**. Các chỗ trong spec này từng viết "theo quận" (mục 1b) cần hiểu là "theo phường/xã/đặc khu", không phải lỗi thiết kế, chỉ là thuật ngữ cũ.
   - **[Cập nhật 22/10/2026] Đã lấy danh sách đầy đủ 168 đơn vị + địa chỉ trụ sở** từ `picityvietnam.vn` (113 phường + 54 xã + 1 đặc khu, đúng số thứ tự 1–168, có địa chỉ trụ sở UBND mới từng đơn vị) — đáng tin hơn bản trích xuất chinhphu.vn trước đó (bản đó bị lỗi cấu trúc ở phần ngoại thành). Đây vẫn là **nguồn thứ ba (không phải văn bản luật gốc)**, nên trước khi seed thật cần đối chiếu lại với toàn văn Nghị quyết 1685/NQ-UBTVQH15 tại `thuvienphapluat.vn`/`chinhphu.vn`.
   - **[Cập nhật 22/10/2026] Đã geocode tọa độ cho cả 168 đơn vị** bằng OpenStreetMap Nominatim (free, có `User-Agent` theo đúng usage policy, giới hạn 1 request/giây). Kết quả lưu tại `docs/specs/2026-10-22-locations-seed-draft.csv` (cột `id, name, admin_type, address_hint, matched_query, latitude, longitude, osm_display_name`).
     - **164/168 có tọa độ** sau 2 vòng kiểm tra: vòng 1 geocode trực tiếp theo địa chỉ; vòng 2 dùng kiểm tra outlier theo khoảng cách tới tâm cụm vùng (haversine) để phát hiện case geocode nhầm sang nơi trùng tên ở tỉnh khác — phát hiện và sửa được 2 trường hợp nhầm (#140 Phước Hòa, #141 Phước Thành, ban đầu geocode sai do tên quá phổ biến, sửa bằng cách thêm ngữ cảnh huyện/tỉnh cũ).
     - **[Cập nhật lần 2, 22/10/2026] Đã xử lý xong cả 5 điểm nghi vấn** bằng cách tra thêm thông tin địa lý (Wikipedia tiếng Việt cho từng xã — vị trí/ranh giới/khoảng cách tới trung tâm huyện cũ) rồi geocode lại với tên đơn vị mới ("Xã X, Thành phố Hồ Chí Minh"), loại được các kết quả khớp nhầm ban đầu (một trường hợp bị khớp sang tận **tỉnh Hưng Yên**, một trường hợp khớp nhầm thành "Làng nghề Một Thoáng Việt Nam" ở Củ Chi):
       - #140 Phước Hòa, #141 Phước Thành (Phú Giáo cũ), #142 An Long (Phú Giáo cũ), #145 Long Hòa (Dầu Tiếng cũ — ban đầu nhầm là Bàu Bàng), #146 Thanh An (Dầu Tiếng cũ), #148 Minh Thạnh (Dầu Tiếng cũ, cực Bắc TP.HCM mới): đều tìm lại được tọa độ, display_name khớp đúng chính xác tên đơn vị mới ("Xã ..., Thành phố Hồ Chí Minh") — độ tin cậy cao.
       - #167 Thạnh An (xã đảo thuộc Cần Giờ, không phải Bà Rịa-Vũng Tàu như vị trí liệt kê gây hiểu nhầm ban đầu): chỉ tìm được tọa độ **gần đúng** (cách trung tâm Cần Giờ ~3km, không phải tọa độ trụ sở chính xác) do đảo nhỏ, OSM thiếu dữ liệu chi tiết — đủ dùng cho mục đích lấy dữ liệu thời tiết/AQI theo khu vực (độ phân giải Open-Meteo đã ~10-45km, không cần chính xác tới mét), nhưng cần ghi chú rõ đây là xấp xỉ.
     - **Kết quả cuối: 168/168 có tọa độ.** 164 điểm tin cậy cao (display_name khớp tên đơn vị), 1 điểm (#167) là tọa độ xấp xỉ khu vực.
     - **Cảnh báo còn lại:** các điểm "OK" từ vòng geocode đầu tiên (không nằm trong danh sách nghi vấn) chỉ được kiểm tra bằng thống kê khoảng cách tới tâm cụm vùng, **không soát từng điểm thủ công toàn bộ 168** — trước khi dùng CSV này làm seed thật, nên vẽ cả 168 điểm lên bản đồ để mắt kiểm tra trực quan lần cuối (điểm nào rơi ra ngoài ranh giới TP.HCM mới là có vấn đề), nhanh hơn soát từng dòng.
4. **[ĐÃ CHỐT 22/10/2026]** Giữ `alert_thresholds.location_id` **bắt buộc** (not null) như thiết kế hiện tại — không đổi schema ở mục 4.8.
5. **[ĐÃ CHỐT 22/10/2026]** Trần Minh Tiến chịu trách nhiệm chính (Developer) cho backend. Cần cập nhật README mục 4 (hiện ghi "vai trò Developer chưa được chốt") và `docs/management/evidence/evidence-index.md` mục Decision Log để có minh chứng — đề xuất làm ở PR riêng khi README được sửa, không gộp vào spec này.

---
**Trạng thái: tất cả câu hỏi mở (mục 6) đã được Trần Minh Tiến chốt ngày 22/10/2026.** Dữ liệu seed thô — **168/168 phường/xã/đặc khu đã có tọa độ** — tại [`docs/specs/2026-10-22-locations-seed-draft.csv`](./2026-10-22-locations-seed-draft.csv) (xem mục 6.3 để biết mức độ tin cậy từng điểm). **Còn 1 việc trước khi dùng làm seed script thật:** soát trực quan toàn bộ 168 điểm trên bản đồ, vì chỉ được kiểm tra bằng thống kê + spot-check các điểm nghi vấn, chưa soát từng dòng thủ công 100%. Theo AGENTS.md §4, đây vẫn là spec cần **approve chính thức** (ghi nhận vào decision log/evidence-index nếu cần minh chứng) trước khi tạo migration thật hoặc chạy trên Supabase — các quyết định ở trên là do người phụ trách backend (Trần Minh Tiến) chốt, chưa phải review của PM/nhóm.
