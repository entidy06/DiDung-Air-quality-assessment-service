-- Spec: docs/specs/2026-10-22-backend-schema.md (mục 4.0-4.1)
-- Tỉnh/thành phố — tách riêng để schema không hard-code chỉ TP.HCM,
-- cho phép thêm tỉnh/thành khác sau mà không phải đổi cấu trúc bảng locations.
create table public.provinces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Khu vực (sub-location, đơn vị hành chính cấp xã) thuộc một tỉnh/thành.
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

-- MVP chỉ seed 1 tỉnh/thành: TP. Hồ Chí Minh.
-- Dữ liệu 168 locations (phường/xã/đặc khu) được nạp ở bước seed script riêng
-- (docs/specs/2026-10-22-locations-seed-draft.csv), không gộp vào migration này.
insert into public.provinces (name, code) values ('Thành phố Hồ Chí Minh', 'HCM');
