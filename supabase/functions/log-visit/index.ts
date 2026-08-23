import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function lookupCountry(ip: string): Promise<{ code: string; name: string }> {
  if (!ip || ip === 'unknown' || ip.startsWith('127.') || ip === '::1') {
    return { code: '', name: '本機' };
  }
  try {
    const res = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,countryCode`,
    );
    const data = await res.json();
    if (data.status === 'success') {
      return { code: data.countryCode || '', name: data.country || '' };
    }
  } catch (_) {
    /* ignore */
  }
  return { code: '', name: '' };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceKey) {
    return new Response(JSON.stringify({ error: 'missing env' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let pagePath = '/';
  try {
    const body = await req.json();
    pagePath = String(body?.page_path || '/').slice(0, 200);
  } catch (_) {
    /* ignore */
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip')?.trim() ||
    req.headers.get('cf-connecting-ip')?.trim() ||
    'unknown';

  let countryCode = req.headers.get('cf-ipcountry') || '';
  let countryName = '';
  if (countryCode && countryCode !== 'XX') {
    countryName = countryCode;
  } else {
    const geo = await lookupCountry(ip);
    countryCode = geo.code;
    countryName = geo.name;
  }

  const sb = createClient(supabaseUrl, serviceKey);
  const since = new Date(Date.now() - 30 * 60 * 1000).toISOString();
  const { data: recent } = await sb
    .from('visitor_events')
    .select('id')
    .eq('ip', ip)
    .gte('visited_at', since)
    .limit(1);

  if (!recent?.length) {
    await sb.from('visitor_events').insert({
      ip,
      country_code: countryCode,
      country_name: countryName,
      page_path: pagePath,
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
