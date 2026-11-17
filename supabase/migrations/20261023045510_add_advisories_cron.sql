-- pg_cron + pg_net CHỈ làm trigger (giống mục 4.10) — logic sinh advisory nằm ở
-- src/app/api/sync/advisories/route.ts. Chạy sau sync air-quality-model (phút 5)
-- để có dữ liệu AQI mới nhất khi gom nhóm theo mức.
select cron.schedule(
  'sync-advisories-hourly',
  '20 * * * *',
  $$
  select net.http_post(
    url := 'https://<domain-production>/api/sync/advisories',
    headers := jsonb_build_object(
      'x-cron-secret',
      coalesce((select decrypted_secret from vault.decrypted_secrets where name = 'cron_secret'), '')
    ),
    body := '{}'::jsonb
  );
  $$
);
