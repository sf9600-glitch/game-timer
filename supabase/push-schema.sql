-- 背景推播：在 Supabase SQL Editor 執行（需先執行 schema.sql）
-- 並部署 supabase/functions/dispatch-push，見 docs/背景推播設定.md

create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  endpoint text not null,
  p256dh text not null,
  auth_key text not null,
  created_at timestamptz not null default now(),
  unique (user_id, endpoint)
);

create table if not exists public.timer_push_schedule (
  user_id uuid not null references auth.users (id) on delete cascade,
  timer_id text not null,
  fire_at timestamptz not null,
  title text not null,
  body text not null,
  sent_at timestamptz,
  primary key (user_id, timer_id)
);

create index if not exists timer_push_schedule_due_idx
  on public.timer_push_schedule (fire_at)
  where sent_at is null;

alter table public.push_subscriptions enable row level security;
alter table public.timer_push_schedule enable row level security;

drop policy if exists "push_sub_select_own" on public.push_subscriptions;
create policy "push_sub_select_own"
  on public.push_subscriptions for select
  using (auth.uid() = user_id);

drop policy if exists "push_sub_insert_own" on public.push_subscriptions;
create policy "push_sub_insert_own"
  on public.push_subscriptions for insert
  with check (auth.uid() = user_id);

drop policy if exists "push_sub_update_own" on public.push_subscriptions;
create policy "push_sub_update_own"
  on public.push_subscriptions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "push_sub_delete_own" on public.push_subscriptions;
create policy "push_sub_delete_own"
  on public.push_subscriptions for delete
  using (auth.uid() = user_id);

drop policy if exists "push_sched_select_own" on public.timer_push_schedule;
create policy "push_sched_select_own"
  on public.timer_push_schedule for select
  using (auth.uid() = user_id);

drop policy if exists "push_sched_insert_own" on public.timer_push_schedule;
create policy "push_sched_insert_own"
  on public.timer_push_schedule for insert
  with check (auth.uid() = user_id);

drop policy if exists "push_sched_update_own" on public.timer_push_schedule;
create policy "push_sched_update_own"
  on public.timer_push_schedule for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "push_sched_delete_own" on public.timer_push_schedule;
create policy "push_sched_delete_own"
  on public.timer_push_schedule for delete
  using (auth.uid() = user_id);
