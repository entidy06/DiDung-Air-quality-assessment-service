-- Spec: docs/specs/2026-10-22-backend-schema.md (mục 4.6-4.9)
-- Hồ sơ người dùng (mở rộng auth.users).
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

-- Khu vực người dùng theo dõi.
create table public.user_locations (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  location_id uuid not null references public.locations(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, location_id)
);

-- Ngưỡng cảnh báo cá nhân — location_id bắt buộc (quyết định mục 6.4 trong spec).
create table public.alert_thresholds (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  location_id uuid not null references public.locations(id) on delete cascade,
  metric text not null check (metric in ('pm25','aqi')),
  threshold_value numeric not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Thông báo (trung tâm thông báo trong app).
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
  dedup_key text not null unique
);
