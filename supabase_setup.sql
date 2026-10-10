-- Run this ONCE in Supabase: SQL Editor -> New query -> paste -> Run.
-- Supabase's built-in login system already makes every email unique (no duplicate accounts).
-- This adds a "profiles" table that stores each person's plan (free or pro).

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  plan text not null default 'free' check (plan in ('free','pro')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- People can only READ their own row. Nobody can edit their plan from the website,
-- so no one can give themselves Pro. Only you (dashboard) or our payment code can.
drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles for select using (auth.uid() = id);

-- Automatically create a profile whenever someone signs up.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, lower(new.email));
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();
