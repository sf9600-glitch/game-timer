-- 訪客到訪紀錄（在 Supabase Dashboard → SQL Editor 執行一次）
-- 執行後，使用者開啟計時器主頁會自動記錄 IP、國籍、到訪時間（同一 IP 30 分鐘內只記一次）

create table if not exists public.visitor_events (
  id uuid primary key default gen_random_uuid(),
  ip text not null default '',
  country_code text not null default '',
  country_name text not null default '',
  page_path text not null default '/',
  visited_at timestamptz not null default now()
);

create index if not exists visitor_events_visited_at_idx
  on public.visitor_events (visited_at desc);

create index if not exists visitor_events_ip_visited_idx
  on public.visitor_events (ip, visited_at desc);

alter table public.visitor_events enable row level security;

revoke all on table public.visitor_events from anon, authenticated;

create or replace function public.log_visitor_event(
  p_ip text,
  p_country_code text,
  p_country_name text,
  p_page_path text default '/'
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(trim(p_ip), '') = '' then
    return;
  end if;
  if exists (
    select 1
    from public.visitor_events v
    where v.ip = left(trim(p_ip), 64)
      and v.visited_at > now() - interval '30 minutes'
  ) then
    return;
  end if;
  insert into public.visitor_events (ip, country_code, country_name, page_path)
  values (
    left(trim(coalesce(p_ip, '')), 64),
    left(trim(coalesce(p_country_code, '')), 8),
    left(trim(coalesce(p_country_name, '')), 64),
    left(trim(coalesce(p_page_path, '/')), 200)
  );
end;
$$;

revoke all on function public.log_visitor_event(text, text, text, text) from public;
grant execute on function public.log_visitor_event(text, text, text, text) to anon, authenticated;

create or replace function public.admin_get_visitor_stats()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  result jsonb;
begin
  if not public.admin_is_admin() then
    raise exception 'forbidden' using errcode = '42501';
  end if;

  if to_regclass('public.visitor_events') is null then
    return jsonb_build_object(
      'total', 0,
      'unique_ips', 0,
      'today', 0,
      'visitors', '[]'::jsonb
    );
  end if;

  select jsonb_build_object(
    'total', (select count(*)::int from public.visitor_events),
    'unique_ips', (select count(distinct ip)::int from public.visitor_events where ip <> ''),
    'today', (
      select count(*)::int
      from public.visitor_events
      where visited_at >= date_trunc('day', now())
    ),
    'visitors', coalesce((
      select jsonb_agg(row_to_json(t) order by t.visited_at desc)
      from (
        select
          v.ip,
          v.country_code,
          v.country_name,
          v.page_path,
          v.visited_at
        from public.visitor_events v
        order by v.visited_at desc
        limit 300
      ) t
    ), '[]'::jsonb)
  ) into result;

  return result;
end;
$$;

revoke all on function public.admin_get_visitor_stats() from public;
grant execute on function public.admin_get_visitor_stats() to authenticated;
