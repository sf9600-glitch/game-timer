-- 管理後台：註冊統計（在 Supabase Dashboard → SQL Editor 執行一次）
-- 1. 執行本檔
-- 2. 將你的管理員 Email 加入白名單（見檔案末尾範例）
-- 3. 開啟網站 /admin.html 並用該 Email 登入

create table if not exists public.admin_allowlist (
  email text primary key,
  created_at timestamptz not null default now()
);

alter table public.admin_allowlist enable row level security;

revoke all on table public.admin_allowlist from anon, authenticated;

create or replace function public.admin_is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_allowlist a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.admin_is_admin() from public;
grant execute on function public.admin_is_admin() to authenticated;

create or replace function public.admin_get_registration_stats()
returns jsonb
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  result jsonb;
begin
  if not public.admin_is_admin() then
    raise exception 'forbidden' using errcode = '42501';
  end if;

  select jsonb_build_object(
    'total', (select count(*)::int from auth.users),
    'with_cloud_data', (select count(*)::int from public.timer_snapshots),
    'active_7d', (
      select count(*)::int
      from auth.users u
      where coalesce(u.last_sign_in_at, u.created_at) > now() - interval '7 days'
    ),
    'users', coalesce((
      select jsonb_agg(row_to_json(t) order by t.created_at desc)
      from (
        select
          u.id as user_id,
          u.email,
          u.created_at,
          u.last_sign_in_at,
          (u.email_confirmed_at is not null) as email_confirmed,
          ts.updated_at as cloud_updated_at,
          (ts.user_id is not null) as has_cloud_data,
          case
            when to_regclass('public.push_subscriptions') is not null then exists (
              select 1 from public.push_subscriptions ps where ps.user_id = u.id
            )
            else false
          end as push_enabled
        from auth.users u
        left join public.timer_snapshots ts on ts.user_id = u.id
      ) t
    ), '[]'::jsonb)
  ) into result;

  return result;
end;
$$;

revoke all on function public.admin_get_registration_stats() from public;
grant execute on function public.admin_get_registration_stats() to authenticated;

-- 加入管理員（把 email 改成你自己的）：
-- insert into public.admin_allowlist (email) values ('你的Email@example.com')
-- on conflict (email) do nothing;
