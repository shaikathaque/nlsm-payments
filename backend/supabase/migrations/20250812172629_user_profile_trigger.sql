-- create profile table that will be used to store user data
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  first_name text,
  last_name text,

  primary key (id)
);

-- secure the profile table
alter table public.profiles enable row level security;

-- allow authenticated users to view their own profile data
CREATE POLICY "Can only view own profile data."
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = id);

-- allow authenticated users to update their own profile data
CREATE POLICY "Can only update own profile data."
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id);

-- inserts a row into public.profiles
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (new.id, new.email,new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger create_profile_trigger
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
