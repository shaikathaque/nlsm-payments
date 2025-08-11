
## Local Development

### Serve Supabase Edge functions

`supabase functions serve --env-file ./supabase/.env`

### Run Edge Function Tests

`deno test --allow-all supabase/functions/tests/<test-name>.ts`


## Required Setup

### Add secrets to vault for creating edge function triggers
To ensure this project runs consistently in each environment, specific secrets need to be added.

The supabase project url and anon key need to be made available in each environment setting up edge function triggers

```sql
insert into vault.secrets(secret, name, description)
values ('http://host.docker.internal:54321', 
		'project_url', 
		'Supabase project url'
		)
returning *;
```

```sql
insert into vault.secrets(secret, name, description)
values ('<your-supabase-project-anon-key', 
		'anon_key', 
		'Supabase project anon key'
		)
returning *;
```

### Add edge function secrets for Email/Retool API Key

The retool API key has to be set as edge function secret for the edge functions to successfully send emails

## Supabase useful commands
### Add secrets to production

```bash
supabase secrets set --env-file .env
````

```bash
supabase secrets set MY_NAME=Chewbacca
```


### Deploy Edge Functions

Deploy specific function

```bash
supabase functions deploy payment-receipt-email --no-verify-jwt
```

Deploy all functions
```bash
supabase functions deploy --no-verify-jwt
```


## How Triggers and Edge Functions Work

In this project, we often invoke edge functions whenever there is a change to a db table. In order to avoid having to manually create the trigger each time with hardcoded secret values, we have taken some steps to make this scalable across multiple projects/environments.

### Function call_edge_function_from_trigger
This function, which is declared in migration, is meant to be executed from a database trigger.

The function accepts a parameter which is the name of the edge function to be invoked.

In order for the function to authenticate itself when invoking the edge function, it needs to be able to include the supabase `anon_key` as an authorization bearer token.

Since this token should not be hardcoded in the migration files, we introduce another function `get_secret` that returns the value of a secret from the supabase `vault`.

### Function get_secret
This is a function that returns the decrypted value of a secret given the secret's name.

The secret is retriwved from the table `vault.decrypted_secrets`.


### Trigger or Cron Schedule
With the `call_edge_function_from_trigger` and `get_secret` DB functions defined, we can then invoke the edge functions from triggers or cron schedules.

Trigger example:
```sql
CREATE TRIGGER athlete_progress_report_email AFTER INSERT ON public.athlete_progress FOR EACH ROW EXECUTE FUNCTION call_edge_function_from_trigger('athlete-progress-report');
```

Cron example:
```sql
select
  cron.schedule(
    'cron-schedule-name',
    '0,15,30,45 * * * *', 
    $$
      SELECT public.call_edge_function_from_trigger('function-name');
    $$
  );
```
