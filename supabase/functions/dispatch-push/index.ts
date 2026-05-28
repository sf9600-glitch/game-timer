import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import webpush from 'npm:web-push@3.6.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-cron-secret',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const cronSecret = Deno.env.get('CRON_SECRET');
  if (cronSecret) {
    const header = req.headers.get('x-cron-secret');
    if (header !== cronSecret) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }

  const vapidPublic = Deno.env.get('VAPID_PUBLIC_KEY');
  const vapidPrivate = Deno.env.get('VAPID_PRIVATE_KEY');
  const vapidSubject = Deno.env.get('VAPID_SUBJECT') || 'mailto:admin@example.com';
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!vapidPublic || !vapidPrivate || !supabaseUrl || !serviceKey) {
    return new Response(JSON.stringify({ error: 'missing env' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  webpush.setVapidDetails(vapidSubject, vapidPublic, vapidPrivate);

  const sb = createClient(supabaseUrl, serviceKey);
  const now = new Date().toISOString();

  const { data: dueRows, error: dueErr } = await sb
    .from('timer_push_schedule')
    .select('user_id, timer_id, title, body')
    .is('sent_at', null)
    .lte('fire_at', now)
    .limit(200);

  if (dueErr) {
    return new Response(JSON.stringify({ error: dueErr.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let sent = 0;
  let failed = 0;
  const staleEndpoints: string[] = [];

  for (const job of dueRows || []) {
    const { data: subs } = await sb
      .from('push_subscriptions')
      .select('endpoint, p256dh, auth_key')
      .eq('user_id', job.user_id);

    if (!subs?.length) {
      await sb
        .from('timer_push_schedule')
        .update({ sent_at: now })
        .eq('user_id', job.user_id)
        .eq('timer_id', job.timer_id);
      continue;
    }

    let anyOk = false;
    const payload = JSON.stringify({
      title: job.title,
      body: job.body,
      tag: `timer-finish-${job.timer_id}`,
    });

    for (const sub of subs) {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth_key },
          },
          payload
        );
        anyOk = true;
        sent += 1;
      } catch (err) {
        failed += 1;
        const status = err?.statusCode || err?.status;
        if (status === 404 || status === 410) {
          staleEndpoints.push(sub.endpoint);
        }
      }
    }

    if (anyOk || !subs.length) {
      await sb
        .from('timer_push_schedule')
        .update({ sent_at: now })
        .eq('user_id', job.user_id)
        .eq('timer_id', job.timer_id);
    }
  }

  if (staleEndpoints.length) {
    await sb.from('push_subscriptions').delete().in('endpoint', [...new Set(staleEndpoints)]);
  }

  return new Response(
    JSON.stringify({
      ok: true,
      jobs: (dueRows || []).length,
      sent,
      failed,
      stale: staleEndpoints.length,
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
});
