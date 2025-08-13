-- https://github.com/orgs/supabase/discussions/14747
-- https://github.com/orgs/supabase/discussions/5612


--  function to call edge function from cron job
-- this function is meant to be generic as opposed to the one in the previous migration that only works for DB triggers
CREATE OR REPLACE FUNCTION public.call_edge_function(function_name TEXT)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    project_url TEXT;
    full_url TEXT;
BEGIN
    -- Fetch the project URL
    project_url := public.get_secret('project_url');

    -- Construct the full URL
    full_url := project_url || '/functions/v1/' || function_name;

    -- Call the http_request function with the constructed URL
    PERFORM net.http_post(
        url := full_url,
        headers := jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer ' || public.get_secret('anon_key')
        ),
        body := jsonb_build_object(
            'type', 'CRON',
            'table', '',
            'schema', '',
            'record', '{}',
            'old_record', '{}'
        ),
        timeout_milliseconds := 5000
    );
END;
$$;

-- This defines scheduled jobs as part of the schema
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Define the scheduled job
-- can use '*/5 * * * *' for local testing
-- 0 6 1 * * is for production;
-- 1st day of the month at 6 AM UTC / 12PM Bangladesh time
SELECT cron.schedule(
  'payment-reminder-schedule',
  '0 6 1 * *',
  $$
  SELECT public.call_edge_function('payment-reminder-email');
  $$
);
