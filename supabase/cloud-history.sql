-- 雲端歷史備份（多版本）：在 Supabase Dashboard → SQL Editor 執行一次
-- 使用者只需登入 App 內既有雲端帳號，無需 Google 設定

create table if not exists public.timer_snapshot_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  label text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists timer_snapshot_history_user_created_idx
  on public.timer_snapshot_history (user_id, created_at desc);

alter table public.timer_snapshot_history enable row level security;

drop policy if exists "history_select_own" on public.timer_snapshot_history;
create policy "history_select_own"
  on public.timer_snapshot_history for select
  using (auth.uid() = user_id);

drop policy if exists "history_insert_own" on public.timer_snapshot_history;
create policy "history_insert_own"
  on public.timer_snapshot_history for insert
  with check (auth.uid() = user_id);

drop policy if exists "history_delete_own" on public.timer_snapshot_history;
create policy "history_delete_own"
  on public.timer_snapshot_history for delete
  using (auth.uid() = user_id);
