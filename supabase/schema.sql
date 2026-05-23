-- 在 Supabase Dashboard → SQL Editor 執行此檔

create table if not exists public.timer_snapshots (
  user_id uuid primary key references auth.users (id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.timer_snapshots enable row level security;

drop policy if exists "timer_select_own" on public.timer_snapshots;
create policy "timer_select_own"
  on public.timer_snapshots for select
  using (auth.uid() = user_id);

drop policy if exists "timer_insert_own" on public.timer_snapshots;
create policy "timer_insert_own"
  on public.timer_snapshots for insert
  with check (auth.uid() = user_id);

drop policy if exists "timer_update_own" on public.timer_snapshots;
create policy "timer_update_own"
  on public.timer_snapshots for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
