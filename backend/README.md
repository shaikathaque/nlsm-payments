
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


