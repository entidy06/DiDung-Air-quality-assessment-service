-- Spec: docs/specs/2026-10-22-backend-schema.md (mục "RLS")
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

-- Dữ liệu công khai: ai cũng đọc được, chỉ service_role (API routes dùng service key) mới ghi.
create policy "public read" on public.provinces for select using (true);
create policy "public read" on public.locations for select using (true);
create policy "public read" on public.air_quality_model for select using (true);
create policy "public read" on public.weather_data for select using (true);
create policy "public read" on public.forecasts for select using (true);
-- data_sync_log: không public, chỉ phục vụ nội bộ/ops -> không tạo policy select cho anon/authenticated.

-- Dữ liệu người dùng: chỉ chủ sở hữu.
create policy "own profile" on public.profiles for select using (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id);

create policy "own user_locations" on public.user_locations
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own thresholds" on public.alert_thresholds
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own notifications" on public.notifications
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
