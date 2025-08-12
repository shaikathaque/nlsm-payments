## Making Schema Changes

1. Run `supabase start` to start a local supabase instance
2. Make changes in the supabase studio
3. Run `supabase db diff --schema public` to view the SQL diff
4. Generate a new migration file using `supabase migration new <migration-name>`
5. Copy the schema diff to the new migration
6. Test the migration against local DB using `supabase db reset`. This will recreate the local DB and run migrations and seed.


## Updating Types
As we making changes to the DB, the types will be modified.

Update `database.types.ts`.

```bash
npx supabase gen types typescript --local
```

## Edge function development

1. Create a new edge function using
```bash
supabase functions new <function-name>
```

2. Serve edge function locally using
```bash
supabase functions serve <function-name> --env-file ./path/to/env/.env
```

Can also use the following to skip authentication
```bash
supabase functions serve <function-name> --no-verify-jwt
```

3. Can incode function locally using curl
```bash
  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/<function-name>' \
    --header 'Authorization: Bearer <anon-key>' \
    --header 'Content-Type: application/json' \
    --data '{"hello":"world"}'
```

4. Creete Edge function test under `supabase/functions/tests/<test-name>`

5. Run test
```bash
deno test --allow-all supabase/functions/tests/<test-name>.ts --env .env
```
`--allow-all` is required to allow `Deno` permissions to access to necessary files.
Make sure to `SUPABASE_ANON_KEY` and `SUPABASE_URL` to `env` file for use by tests
