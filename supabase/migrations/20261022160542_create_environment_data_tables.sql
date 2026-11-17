-- Spec: docs/specs/2026-10-22-backend-schema.md (mục 4.2-4.5)
-- Dữ liệu mô hình AQI/PM2.5 từ Open-Meteo — nguồn PM2.5/AQI duy nhất của MVP (OpenAQ đã loại, xem mục 3 spec).
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

-- Dữ liệu thời tiết (thực tế gần nhất + dự báo) từ Open-Meteo.
create table public.weather_data (
  id bigint generated always as identity primary key,
  location_id uuid not null references public.locations(id) on delete cascade,
  valid_at timestamptz not null,
  is_forecast boolean not null,
  precipitation numeric,              -- mm, lượng mưa
  precipitation_probability numeric,  -- %, khả năng mưa
  relative_humidity numeric,
  wind_speed numeric,
  wind_direction numeric,
  uv_index numeric,                   -- chỉ số UV (0+, không đơn vị)
  sunshine_duration numeric,          -- giây nắng thực trong giờ đó (định nghĩa WMO)
  source text not null default 'open-meteo',
  fetched_at timestamptz not null default now(),
  unique (location_id, valid_at, is_forecast)
);

-- Dự báo ngắn hạn PM2.5/AQI do hệ thống tự tính (baseline, minh bạch).
create table public.forecasts (
  id bigint generated always as identity primary key,
  location_id uuid not null references public.locations(id) on delete cascade,
  generated_at timestamptz not null default now(),
  target_time timestamptz not null,
  predicted_pm25 numeric,
  predicted_aqi numeric,
  model_name text not null,
  unique (location_id, target_time, model_name)
);

-- Log đồng bộ dữ liệu nguồn ngoài — theo dõi thành công/lỗi của job sync.
create table public.data_sync_log (
  id bigint generated always as identity primary key,
  source text not null,
  started_at timestamptz not null,
  finished_at timestamptz,
  status text not null check (status in ('success','partial','failed')),
  records_synced integer not null default 0,
  error_message text
);
