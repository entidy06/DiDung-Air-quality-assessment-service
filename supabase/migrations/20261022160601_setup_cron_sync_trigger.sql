-- Spec: docs/specs/2026-10-22-backend-schema.md (mục 4.10, quyết định 6.2)
-- pg_cron + pg_net CHỈ làm trigger — không chứa business logic.
-- Toàn bộ logic sync nằm ở src/app/api/sync/* (tầng Model, MVVM — AGENTS.md §3).
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Secret bảo vệ route /api/sync/* — giá trị thật phải được set qua Supabase Vault
-- SAU KHI áp dụng migration này, chạy riêng (không đặt trong file migration):
--   select vault.create_secret('<giá-trị-thật>', 'cron_secret');
--
-- THAY '<domain-production>' bên dưới bằng domain Vercel thật trước khi chạy migration này
-- (chưa xác nhận Supabase có biến cấu hình built-in để tự biết domain Next.js, nên
-- không dùng current_setting() suy đoán — ghi thẳng URL theo đúng mục 4.10 của spec).
select cron.schedule(
  'sync-weather-hourly',
  '0 * * * *',
  $$
  select net.http_post(
    url := 'https://<domain-production>/api/sync/weather',
    headers := jsonb_build_object(
      'x-cron-secret',
      coalesce((select decrypted_secret from vault.decrypted_secrets where name = 'cron_secret'), '')
    ),
    body := '{}'::jsonb
  );
  $$
);

select cron.schedule(
  'sync-air-quality-hourly',
  '5 * * * *',
  $$
  select net.http_post(
    url := 'https://<domain-production>/api/sync/air-quality-model',
    headers := jsonb_build_object(
      'x-cron-secret',
      coalesce((select decrypted_secret from vault.decrypted_secrets where name = 'cron_secret'), '')
    ),
    body := '{}'::jsonb
  );
  $$
);
