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