-- Thay placeholder '<domain-production>' bằng domain Vercel thật sau khi deploy
-- (didung-air-quality.vercel.app, xác nhận Environment: Production qua `vercel ls`).
-- unschedule + schedule lại theo đúng job name cũ (an toàn hơn gọi cron.schedule() lần 2
-- trên job name đã tồn tại — hành vi upsert không được xác nhận rõ trong docs pg_cron).
select cron.unschedule('sync-weather-hourly');
select cron.unschedule('sync-air-quality-hourly');
select cron.unschedule('sync-advisories-hourly');
select cron.unschedule('evaluate-alerts-hourly');

select cron.schedule(
  'sync-weather-hourly',
  '0 * * * *',
  $$
  select net.http_post(
    url := 'https://didung-air-quality.vercel.app/api/sync/weather',
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
    url := 'https://didung-air-quality.vercel.app/api/sync/air-quality-model',
    headers := jsonb_build_object(
      'x-cron-secret',
      coalesce((select decrypted_secret from vault.decrypted_secrets where name = 'cron_secret'), '')
    ),
    body := '{}'::jsonb
  );
  $$
);

select cron.schedule(
  'sync-advisories-hourly',
  '20 * * * *',
  $$
  select net.http_post(
    url := 'https://didung-air-quality.vercel.app/api/sync/advisories',
    headers := jsonb_build_object(
      'x-cron-secret',
      coalesce((select decrypted_secret from vault.decrypted_secrets where name = 'cron_secret'), '')
    ),
    body := '{}'::jsonb
  );
  $$
);

select cron.schedule(
  'evaluate-alerts-hourly',
  '10 * * * *',
  $$
  select net.http_post(
    url := 'https://didung-air-quality.vercel.app/api/jobs/evaluate-alerts',
    headers := jsonb_build_object(
      'x-cron-secret',
      coalesce((select decrypted_secret from vault.decrypted_secrets where name = 'cron_secret'), '')
    ),
    body := '{}'::jsonb
  );
  $$
);
