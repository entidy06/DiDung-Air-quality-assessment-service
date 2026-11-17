-- pg_cron + pg_net CHỈ làm trigger (giống các job khác) — logic nằm ở
-- src/app/api/jobs/evaluate-alerts/route.ts. Chạy sau sync air-quality-model
-- (phút 5) để so khớp ngưỡng với dữ liệu AQI mới nhất.
select cron.schedule(
  'evaluate-alerts-hourly',
  '10 * * * *',
  $$
  select net.http_post(
    url := 'https://<domain-production>/api/jobs/evaluate-alerts',
    headers := jsonb_build_object(
      'x-cron-secret',
      coalesce((select decrypted_secret from vault.decrypted_secrets where name = 'cron_secret'), '')
    ),
    body := '{}'::jsonb
  );
  $$
);
