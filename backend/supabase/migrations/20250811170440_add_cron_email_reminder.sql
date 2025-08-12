-- https://github.com/orgs/supabase/discussions/14747
-- https://github.com/orgs/supabase/discussions/5612

-- This defines scheduled jobs as part of the schema
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Define the scheduled job
SELECT cron.schedule(
  'payment-reminder-schedule',
  '*/5 * * * *',
  $$
  SELECT public.call_edge_function_from_trigger('payment-reminder-email');
  $$
);
