## Making Schema Changes

1. Run `supabase start` to start a local supabase instance
2. Make changes in the supabase studio
3. Run `supabase db diff --schema public` to view the SQL diff
4. Generate a new migration file using `supabase migration new <migration-name>`
5. Copy the schema diff to the new migration
6. Test the migration against local DB using `supabase db reset`. This will recreate the local DB and run migrations and seed.
