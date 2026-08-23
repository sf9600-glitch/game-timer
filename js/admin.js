/* 與 js/app.js 的 Supabase 設定保持一致 */
const SUPABASE_URL = 'https://gnfukohkisiknbbnxjce.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_06A2mHaxzTXHx6DhQLI2XQ_zSoaveJv';

let supabaseClient = null;

function $(id) {
    return document.getElementById(id);
}

function show(el) {
    if (el) el.hidden = false;
}

function hide(el) {
    if (el) el.hidden = true;
}

function setLoginStatus(message) {
    const el = $('adminLoginStatus');
    if (!el) return;
    if (!message) {
        hide(el);
        el.textContent = '';
        return;
    }
    el.textContent = message;
    show(el);
}

function getSupabase() {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
    if (!supabaseClient) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL.trim(), SUPABASE_ANON_KEY.trim(), {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true,
                storage: window.localStorage
            }
        });
    }
    return supabaseClient;
}

function formatDateTime(value) {
    if (!value) return '—';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '—';
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function badgeHtml(yes, yesLabel, noLabel) {
    const cls = yes ? 'admin-badge--yes' : 'admin-badge--no';
    const text = yes ? yesLabel : noLabel;
    return `<span class="admin-badge ${cls}">${text}</span>`;
}

function renderStats(data) {
    const grid = $('adminStatsGrid');
    if (!grid) return;
    const cards = [
        { label: '註冊總數', value: data.total ?? 0 },
        { label: '有雲端資料', value: data.with_cloud_data ?? 0 },
        { label: '近 7 日活躍', value: data.active_7d ?? 0 }
    ];
    grid.innerHTML = cards.map(card => `
        <div class="admin-stat-card">
            <div class="admin-stat-label">${card.label}</div>
            <div class="admin-stat-value">${card.value}</div>
        </div>
    `).join('');
}

function renderUsers(users) {
    const body = $('adminUsersBody');
    const empty = $('adminEmpty');
    const meta = $('adminTableMeta');
    const list = Array.isArray(users) ? users : [];
    if (meta) meta.textContent = `共 ${list.length} 筆`;
    if (!body) return;
    if (!list.length) {
        body.innerHTML = '';
        show(empty);
        return;
    }
    hide(empty);
    body.innerHTML = list.map((user, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${escapeHtml(user.email || '—')}</td>
            <td>${formatDateTime(user.created_at)}</td>
            <td>${formatDateTime(user.last_sign_in_at)}</td>
            <td>${badgeHtml(!!user.email_confirmed, '已驗證', '未驗證')}</td>
            <td>${user.has_cloud_data
                ? `${badgeHtml(true, '有', '無')}<div style="color:var(--text-sub);font-size:0.72rem;margin-top:2px;">${formatDateTime(user.cloud_updated_at)}</div>`
                : badgeHtml(false, '有', '無')}</td>
            <td>${badgeHtml(!!user.push_enabled, '已開', '未開')}</td>
        </tr>
    `).join('');
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function showLoginView() {
    show($('adminLoginCard'));
    hide($('adminForbiddenCard'));
    hide($('adminDashboard'));
}

function showForbiddenView(email) {
    hide($('adminLoginCard'));
    show($('adminForbiddenCard'));
    hide($('adminDashboard'));
    const line = $('adminUserLine');
    if (line) line.textContent = email ? `目前登入：${email}` : '';
}

function showDashboardView(email) {
    hide($('adminLoginCard'));
    hide($('adminForbiddenCard'));
    show($('adminDashboard'));
    const line = $('adminUserLine');
    if (line) line.textContent = email ? `管理員：${email}` : '';
}

async function checkIsAdmin(sb) {
    const { data, error } = await sb.rpc('admin_is_admin');
    if (error) throw error;
    return !!data;
}

async function loadRegistrationStats(sb) {
    const { data, error } = await sb.rpc('admin_get_registration_stats');
    if (error) throw error;
    return data || {};
}

async function refreshDashboard(sb, email) {
    const stats = await loadRegistrationStats(sb);
    renderStats(stats);
    renderUsers(stats.users);
    showDashboardView(email);
}

async function handleSession(sb, session) {
    if (!session?.user) {
        showLoginView();
        return;
    }
    const email = session.user.email || '';
    try {
        const isAdmin = await checkIsAdmin(sb);
        if (!isAdmin) {
            showForbiddenView(email);
            return;
        }
        await refreshDashboard(sb, email);
    } catch (err) {
        console.error(err);
        showForbiddenView(email);
    }
}

async function signInAdmin() {
    const sb = getSupabase();
    if (!sb) {
        setLoginStatus('尚未設定 Supabase，請見 DEPLOY.md');
        return;
    }
    const email = $('adminEmail')?.value.trim();
    const password = $('adminPassword')?.value || '';
    if (!email || !password) {
        setLoginStatus('請輸入 Email 與密碼');
        return;
    }
    setLoginStatus('');
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) {
        setLoginStatus(error.message || '登入失敗');
        return;
    }
    await handleSession(sb, data.session);
}

async function signOutAdmin() {
    const sb = getSupabase();
    if (sb) await sb.auth.signOut();
    setLoginStatus('');
    showLoginView();
}

async function initAdminPage() {
    const sb = getSupabase();
    if (!sb) {
        setLoginStatus('尚未設定 Supabase，請見 DEPLOY.md');
        showLoginView();
        return;
    }
    $('adminSignInBtn')?.addEventListener('click', signInAdmin);
    $('adminSignOutBtn')?.addEventListener('click', signOutAdmin);
    $('adminForbiddenSignOutBtn')?.addEventListener('click', signOutAdmin);
    $('adminRefreshBtn')?.addEventListener('click', async () => {
        const { data: { session } } = await sb.auth.getSession();
        if (!session?.user) return;
        try {
            await refreshDashboard(sb, session.user.email || '');
        } catch (err) {
            console.error(err);
            alert('重新整理失敗，請稍後再試。');
        }
    });
    $('adminPassword')?.addEventListener('keydown', e => {
        if (e.key === 'Enter') signInAdmin();
    });

    const { data: { session } } = await sb.auth.getSession();
    await handleSession(sb, session);
    sb.auth.onAuthStateChange((_event, nextSession) => {
        handleSession(sb, nextSession);
    });
}

initAdminPage();
