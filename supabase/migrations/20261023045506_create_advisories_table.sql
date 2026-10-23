-- Lời khuyên/cảnh báo ngắn theo mức AQI, sinh bởi LLM qua 9Router (router.studev.net).
-- Key theo (location_id, valid_at) để tra theo location đơn giản ở phía đọc, nhưng
-- sinh text được GOM NHÓM theo air_quality_level ở tầng ứng dụng (1 lần gọi LLM
-- dùng chung cho mọi location cùng mức trong 1 lần sync) để tránh gọi LLM 168 lần/giờ
-- khi AQI vốn đã gần như đồng nhất toàn TP.HCM (xem docs/specs/2026-10-22-backend-schema.md mục 3.2b).
create table public.advisories (
  id bigint generated always as identity primary key,
  location_id uuid not null references public.locations(id) on delete cascade,
  valid_at timestamptz not null,
  air_quality_level text not null check (air_quality_level in ('good','moderate','sensitive','unhealthy')),
  summary text not null,   -- tóm tắt tình trạng hiện tại, 1 câu
  action text not null,    -- hành động cụ thể nên làm, 1 câu
  note text,               -- lưu ý bổ sung ngắn (xu hướng, nhắc dữ liệu ước lượng...), có thể rỗng
  model text not null,
  prompt_version text not null,
  created_at timestamptz not null default now(),
  unique (location_id, valid_at)
);

alter table public.advisories enable row level security;

create policy "public read" on public.advisories for select using (true);
-- Không có policy insert/update cho anon/authenticated — chỉ service_role (route sync) ghi được.
