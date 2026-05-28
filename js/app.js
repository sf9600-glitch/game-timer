const STORAGE_KEY = 'GameTimer_Config_V7';
const ACTIVE_TIMERS_KEY = 'GameTimer_Active_Single';
const LOCAL_SNAPSHOTS_KEY = 'GameTimer_LocalSnapshots_V1';
const LOCAL_SNAPSHOTS_MAX = 20;
const THEME_KEY = 'GameTimer_Theme_Preference';
const LANG_KEY = 'GameTimer_Lang_Preference';
const UNDO_TEMP_KEY = 'GameTimer_Undo_Stack';
const LOCALE_DIR = 'locales';
const DEFAULT_LANG = 'zh-TW';
/** 新 key 在舊版 locales/*.json 快取時仍顯示正確中文 */
const LOCALE_INLINE_FALLBACK = {
    'zh-TW': {
        panelFabOpen: '管理',
        openPanel: '開啟管理面板',
        closePanel: '關閉管理面板',
        taskStart: '開新計時器',
        startLabelAccount: '帳號',
        startLabelChar: '角色',
        startLabelTask: '任務',
        startLabelSub: '內容',
        dhmsDay: '天',
        dhmsHour: '時',
        dhmsMin: '分',
        dhmsSec: '秒',
        adj1d: '+1天',
        adj12h: '+12時',
        adj1h: '+1時',
        adj10m: '+10分',
        adj1m: '+1分',
        adj30s: '+30秒',
        startTask: '開始計時',
        undoSettings: '管理',
        allTags: '編輯任務標籤',
        sectionFinishedClearHint: '點擊清除',
        sectionFinishedClearHover: '清除全部已完成',
        sectionFinishedClearTitle: '點擊清除此帳號下全部已完成計時器',
        sectionFinishedGlobal: '已完成',
        sectionFinishedClearTitleAll: '點擊清除所有帳號的已完成計時器',
        accountHeaderDisplay: '帳號標題列',
        accountHeaderOn: '顯示帳號',
        accountHeaderOff: '只顯示角色',
        recoveryTitle: '還原備份',
        recoveryNoSnapshots: '新增計時器時會自動備份；目前尚無紀錄。',
        recoveryRestoreVersion: '還原',
        recoverySourceLocal: '本機',
        recoverySourceCloud: '雲端',
        recoveryRetentionHint: '本機最多保留 {max} 份（每次新增計時器時自動備份，不是按天數）。雲端只保留最新 1 份同步狀態，沒有多日版本；更久請用「匯出」。',
        recoveryCloudRestoreConfirm: '確定還原到「{date}」的雲端同步狀態？\n\n會覆蓋目前的設定與計時器。',
        timerDisplayLabel: '計時器顯示',
        timerDisplayHint: '簡潔為純文字表格（每列一筆）；彩色為卡片；文字列表依角色分組。',
        cleanColChar: '角色',
        cleanColTask: '任務',
        cleanColRemain: '剩餘',
        cleanColEnd: '結束',
        cleanColStatus: '狀態',
        timerDisplayClean: '簡潔',
        timerDisplayColorful: '彩色進度',
        timerDisplayList: '文字列表',
        notifyOnFinishLabel: '到點通知',
        notifyOnFinishHint: '此計時器到 0 時通知',
        timerDoneNoticeTitle: '計時完成',
        timerDoneNoticeBody: '{task} 已完成',
        notifySectionTitle: '到點通知（手機）',
        notifyInstallHint: '若「設定→通知」找不到本 App：請用 Safari 開啟網站 → 點底部分享 →「加入主畫面」→ 從主畫面圖示開啟（不要只用 Safari 分頁）。',
        notifyInstallOk: '目前已從主畫面開啟。請先按下方「允許通知」，之後才會出現在 iPhone「設定→通知」。',
        notifySafariOnly: '請用 Safari 加入主畫面（Chrome 等在 iPhone 上通常不會出現在通知設定）。',
        notifyLimitHint: 'App 開著時會震動並通知。關閉 App 後要收到推播：須登入雲端、允許通知，並由管理員完成背景推播設定。',
        pushBackgroundOk: '背景推播：已排程（關 App 也會通知）',
        pushBackgroundNeedLogin: '背景推播：請先登入雲端',
        pushBackgroundNeedVapid: '背景推播：尚未設定伺服器',
        pushBackgroundNeedAllow: '背景推播：請先允許通知',
        notifyPermissionLabel: '瀏覽器通知權限',
        notifyPermissionBtn: '允許通知',
        notifyStatusGranted: '已允許',
        notifyStatusDenied: '已拒絕',
        notifyStatusDefault: '尚未詢問',
        notifyStatusNeedHome: '請從主畫面開啟',
        notifyStatusUnsupported: '不支援',
        notifyDeniedHint: '若先前按了「不允許」，請到 iPhone「設定→通知→遊戲計時器」改為允許。',
        notifyMustAllowFirst: '重要：iPhone 要先在 App 內按下方「允許通知」，系統跳出詢問並選「允許」後，「設定→通知」清單才會出現本 App。',
        notifySearchNames: '設定裡可能顯示「遊戲計時器」「計時器」或網址名稱，請在通知清單往下滑找。',
        notifyNeedStandalone: '目前不是從主畫面圖示開啟（上方若還有網址列＝仍在 Safari）。請刪除舊圖示，用 Safari 重新「加入主畫面」後，只從圖示開啟。',
        notifyReinstallHint: '若已加入主畫面仍異常：長按主畫面圖示刪除 → Safari 重新加入主畫面 → 從新圖示開啟 → 再按「允許通知」。',
        notifyIosOld: '此 iPhone 需 iOS 16.4 以上才支援網頁 App 通知；請到「設定→一般→軟體更新」檢查。',
        notifyBannerTitle: '請開啟到點通知',
        notifyBannerBody: '按下方按鈕並在系統視窗選「允許」，之後才會出現在 iPhone「設定→通知」。',
        notifyTestBtn: '測試通知',
        notifyTestBody: '若看到這則通知，代表已設定成功。',
        openInteractiveGuide: '🎯 互動新手教學',
        onboardWelcomeTitle: '歡迎！完整帶你上手',
        onboardWelcomeBody: '這個 App 和一般程式不太一樣。我們會依序帶你：建立帳號與角色 → 認識任務標籤 → 啟動計時器 → 學會用右下角復原。',
        onboardLayoutTitleDesktop: '左側是「管理」區',
        onboardLayoutBodyDesktop: '電腦版左側面板用來管理帳號、標籤與啟動計時；右側主畫面顯示所有倒數。',
        onboardLayoutTitleMobile: '先打開「管理」',
        onboardLayoutBodyMobile: '手機版請點主畫面上方高亮的「管理」，滑出左側設定面板。',
        onboardAddAccountTitle: '新增遊戲帳號',
        onboardAddAccountBody: '在「帳號名稱」輸入你的帳號（例如伺服器或 ID），按「新增」。也可先沿用預設帳號，稍後再改。',
        onboardAddCharTitle: '新增角色',
        onboardAddCharBody: '在帳號卡片下方點「+」，輸入角色名稱（例如 VINCE）。一個帳號可有多個角色。',
        onboardTaskTagsTitle: '認識任務標籤',
        onboardTaskTagsBody: 'App 已內建多個標籤（訓練、採集等），可直接使用。若要自訂，在上方輸入名稱後按「新增」。',
        onboardAddSubTitle: '新增子項目（選用）',
        onboardAddSubBody: '點標籤卡片可展開，在底下輸入子項目（例如「盾兵」）後按 +。沒有子項目也能開始計時。',
        onboardOpenStartTitle: '打開「開新計時器」',
        onboardOpenStartBodyDesktop: '請點左側高亮的「開新計時器」，展開啟動表單。',
        onboardOpenStartBodyMobile: '請點主畫面上方「開新計時器」，從底部拉出啟動表單。',
        onboardPickRoleTitle: '選帳號與角色',
        onboardPickRoleBody: '選剛才建立的帳號與角色（或沿用預設）。',
        onboardPickTaskTitle: '選任務類型',
        onboardPickTaskBody: '選任務標籤；若有子項目，會多一個「內容」下拉選單。',
        onboardSetTimeTitle: '設定倒數時間',
        onboardSetTimeBody: '輸入天時分秒，或點快捷鍵（建議先試「+1分」）。',
        onboardStartTitle: '開始計時',
        onboardStartBody: '按「開始計時」，主畫面會出現倒數卡片。',
        onboardDeleteTimerTitle: '關閉計時器',
        onboardDeleteTimerBody: '請點計時卡片右上角的 × 關閉這個練習用計時器（刪除後可復原）。',
        onboardUndoTitle: '右下角可復原',
        onboardUndoBody: '刪除後會出現「↩ 復原」提示，點一下就能救回剛才的計時器。這是誤刪時很有用的功能！',
        onboardDoneTitle: '教學完成！',
        onboardDoneBody: '你已學會從帳號、標籤到計時與復原。之後可在「系統與主題」重播互動教學或閱讀完整說明。',
        onboardSkip: '略過教學',
        onboardNext: '下一步',
        onboardFinish: '完成教學',
        onboardStepLabel: '步驟 {n} / {total}',
        onboardNeedPanelOpen: '請先點「管理」打開設定面板。',
        onboardNeedTimeHint: '請先設定時間（例如點「+1分」）。',
        onboardNeedStartHint: '請點「開始計時」。',
        onboardNeedOpenStartDesktop: '請先點左側「開新計時器」。',
        onboardNeedOpenStartMobile: '請先點「開新計時器」。',
        onboardNeedDeleteHint: '請點計時卡片右上角的 ×。',
        onboardNeedUndoHint: '刪除後右下角會出現復原提示。'
    },
    'zh-CN': {
        panelFabOpen: '管理',
        openPanel: '打开管理面板',
        closePanel: '关闭管理面板',
        taskStart: '开新计时器',
        startLabelAccount: '账号',
        startLabelChar: '角色',
        startLabelTask: '任务',
        startLabelSub: '内容',
        dhmsDay: '天',
        dhmsHour: '时',
        dhmsMin: '分',
        dhmsSec: '秒',
        adj1d: '+1天',
        adj12h: '+12时',
        adj1h: '+1时',
        adj10m: '+10分',
        adj1m: '+1分',
        adj30s: '+30秒',
        startTask: '开始计时',
        undoSettings: '管理',
        allTags: '编辑任务标签',
        sectionFinishedClearHint: '点击清除',
        sectionFinishedClearHover: '清除全部已完成',
        sectionFinishedClearTitle: '点击清除此账号下全部已完成计时器',
        sectionFinishedGlobal: '已完成',
        sectionFinishedClearTitleAll: '点击清除所有账号的已完成计时器',
        accountHeaderDisplay: '账号标题栏',
        accountHeaderOn: '显示账号',
        accountHeaderOff: '只显示角色',
        recoveryTitle: '还原备份',
        recoveryNoSnapshots: '新增计时器时会自动备份；目前没有记录。',
        recoveryRestoreVersion: '还原',
        recoverySourceLocal: '本机',
        recoverySourceCloud: '云端',
        recoveryRetentionHint: '本机最多保留 {max} 份（每次新增计时器时自动备份，不是按天数）。云端只保留最新 1 份同步状态，没有多日版本；更久请用「导出」。',
        recoveryCloudRestoreConfirm: '确定还原到「{date}」的云端同步状态？\n\n会覆盖目前的设置与计时器。',
        timerDisplayLabel: '计时器显示',
        timerDisplayHint: '简洁为纯文字表格（每列一笔）；彩色为卡片；文字列表按角色分组。',
        cleanColChar: '角色',
        cleanColTask: '任务',
        cleanColRemain: '剩余',
        cleanColEnd: '结束',
        cleanColStatus: '状态',
        timerDisplayClean: '简洁',
        timerDisplayColorful: '彩色进度',
        timerDisplayList: '文字列表',
        notifyOnFinishLabel: '到点通知',
        notifyOnFinishHint: '此计时器到 0 时通知',
        timerDoneNoticeTitle: '计时完成',
        timerDoneNoticeBody: '{task} 已完成',
        notifySectionTitle: '到点通知（手机）',
        notifyInstallHint: '若「设置→通知」找不到本 App：请用 Safari 打开网站 → 点底部分享 →「加入主屏幕」→ 从主屏幕图标打开（不要只用 Safari 分页）。',
        notifyInstallOk: '目前已从主屏幕打开。请先按下方「允许通知」，之后才会出现在 iPhone「设置→通知」。',
        notifySafariOnly: '请用 Safari 加入主屏幕（Chrome 等在 iPhone 上通常不会出现在通知设置）。',
        notifyLimitHint: 'App 开着时会震动并通知。关闭 App 后要收到推送：须登录云端、允许通知，并由管理员完成背景推送设置。',
        pushBackgroundOk: '背景推送：已排程（关 App 也会通知）',
        pushBackgroundNeedLogin: '背景推送：请先登录云端',
        pushBackgroundNeedVapid: '背景推送：尚未设置服务器',
        pushBackgroundNeedAllow: '背景推送：请先允许通知',
        notifyPermissionLabel: '浏览器通知权限',
        notifyPermissionBtn: '允许通知',
        notifyStatusGranted: '已允许',
        notifyStatusDenied: '已拒绝',
        notifyStatusDefault: '尚未询问',
        notifyStatusNeedHome: '请从主屏幕打开',
        notifyStatusUnsupported: '不支持',
        notifyDeniedHint: '若先前按了「不允许」，请到 iPhone「设置→通知→游戏计时器」改为允许。',
        notifyMustAllowFirst: '重要：iPhone 要先在 App 内按下方「允许通知」，系统跳出询问并选「允许」后，「设置→通知」清单才会出现本 App。',
        notifySearchNames: '设置里可能显示「游戏计时器」「计时器」或网址名称，请在通知清单往下滑找。',
        notifyNeedStandalone: '目前不是从主屏幕图标打开（上方若还有网址列＝仍在 Safari）。请删除旧图标，用 Safari 重新「加入主屏幕」后，只从图标打开。',
        notifyReinstallHint: '若已加入主屏幕仍异常：长按主屏幕图标删除 → Safari 重新加入主屏幕 → 从新图标打开 → 再按「允许通知」。',
        notifyIosOld: '此 iPhone 需 iOS 16.4 以上才支持网页 App 通知；请到「设置→通用→软件更新」检查。',
        notifyBannerTitle: '请开启到点通知',
        notifyBannerBody: '按下方按钮并在系统窗口选「允许」，之后才会出现在 iPhone「设置→通知」。',
        notifyTestBtn: '测试通知',
        notifyTestBody: '若看到这则通知，代表已设定成功。',
        openInteractiveGuide: '🎯 互动新手教学',
        onboardWelcomeTitle: '欢迎！完整带你上手',
        onboardWelcomeBody: '这个 App 和一般程序不太一样。我们会依序带你：建立账号与角色 → 认识任务标签 → 启动计时器 → 学会用右下角复原。',
        onboardLayoutTitleDesktop: '左侧是「管理」区',
        onboardLayoutBodyDesktop: '电脑版左侧面板用来管理账号、标签与启动计时；右侧主画面显示所有倒数。',
        onboardLayoutTitleMobile: '先打开「管理」',
        onboardLayoutBodyMobile: '手机版请点主画面上方高亮的「管理」，滑出左侧设定面板。',
        onboardAddAccountTitle: '新增游戏账号',
        onboardAddAccountBody: '在「账号名称」输入你的账号，按「新增」。也可先沿用预设账号，稍后再改。',
        onboardAddCharTitle: '新增角色',
        onboardAddCharBody: '在账号卡片下方点「+」，输入角色名称。一个账号可有多个角色。',
        onboardTaskTagsTitle: '认识任务标签',
        onboardTaskTagsBody: 'App 已内建多个标签（训练、采集等），可直接使用。若要自订，在上方输入名称后按「新增」。',
        onboardAddSubTitle: '新增子项目（选用）',
        onboardAddSubBody: '点标签卡片可展开，在底下输入子项目后按 +。没有子项目也能开始计时。',
        onboardOpenStartTitle: '打开「开新计时器」',
        onboardOpenStartBodyDesktop: '请点左侧高亮的「开新计时器」，展开启动表单。',
        onboardOpenStartBodyMobile: '请点主画面上方「开新计时器」，从底部拉出启动表单。',
        onboardPickRoleTitle: '选账号与角色',
        onboardPickRoleBody: '选刚才建立的账号与角色（或沿用预设）。',
        onboardPickTaskTitle: '选任务类型',
        onboardPickTaskBody: '选任务标签；若有子项目，会多一个「内容」下拉选单。',
        onboardSetTimeTitle: '设定倒数时间',
        onboardSetTimeBody: '输入天时分秒，或点快捷键（建议先试「+1分」）。',
        onboardStartTitle: '开始计时',
        onboardStartBody: '按「开始计时」，主画面会出现倒数卡片。',
        onboardDeleteTimerTitle: '关闭计时器',
        onboardDeleteTimerBody: '请点计时卡片右上角的 × 关闭这个练习用计时器（删除后可复原）。',
        onboardUndoTitle: '右下角可复原',
        onboardUndoBody: '删除后会出现「↩ 复原」提示，点一下就能救回刚才的计时器。这是误删时很有用的功能！',
        onboardDoneTitle: '教学完成！',
        onboardDoneBody: '你已学会从账号、标签到计时与复原。之后可在「系统与主题」重播互动教学或阅读完整说明。',
        onboardSkip: '跳过教学',
        onboardNext: '下一步',
        onboardFinish: '完成教学',
        onboardStepLabel: '步骤 {n} / {total}',
        onboardNeedPanelOpen: '请先点「管理」打开设定面板。',
        onboardNeedTimeHint: '请先设定时间（例如点「+1分」）。',
        onboardNeedStartHint: '请点击「开始计时」。',
        onboardNeedOpenStartDesktop: '请先点左侧「开新计时器」。',
        onboardNeedOpenStartMobile: '请先点「开新计时器」。',
        onboardNeedDeleteHint: '请点击计时卡片右上角的 ×。',
        onboardNeedUndoHint: '删除后右下角会出现复原提示。'
    }
};
const I18N = {};
let localeManifest = { default: DEFAULT_LANG, languages: [{ id: 'zh-TW', nativeName: '繁體中文' }, { id: 'zh-CN', nativeName: '简体中文' }] };
let currentLang = DEFAULT_LANG;
let cloudSyncStatusKey = 'cloudLoginPrompt';

async function loadLocaleFile(lang) {
    if (I18N[lang]) return I18N[lang];
    const res = await fetch(`${LOCALE_DIR}/${lang}.json`);
    if (!res.ok) throw new Error(`locale ${lang}: ${res.status}`);
    const data = await res.json();
    const inlineFb = LOCALE_INLINE_FALLBACK[lang] || LOCALE_INLINE_FALLBACK[DEFAULT_LANG] || {};
    I18N[lang] = { ...inlineFb, ...data };
    return I18N[lang];
}

async function loadLocaleManifest() {
    try {
        const res = await fetch(`${LOCALE_DIR}/manifest.json`);
        if (!res.ok) return;
        const data = await res.json();
        if (data && Array.isArray(data.languages) && data.languages.length) {
            localeManifest = data;
        }
    } catch (_) {}
}

function getAvailableLanguages() {
    return localeManifest.languages || [];
}

async function initI18n() {
    await loadLocaleManifest();
    const preferred = localStorage.getItem(LANG_KEY) || localeManifest.default || DEFAULT_LANG;
    const fallback = localeManifest.default || DEFAULT_LANG;
    const toLoad = [...new Set([preferred, fallback].filter(Boolean))];
    await Promise.all(toLoad.map(lang => loadLocaleFile(lang).catch(err => {
        console.error('loadLocale', lang, err);
        return null;
    })));
    currentLang = I18N[preferred] ? preferred : (I18N[fallback] ? fallback : DEFAULT_LANG);
    if (!I18N[currentLang] && I18N[DEFAULT_LANG]) currentLang = DEFAULT_LANG;
}

function t(key) {
    const d = I18N[currentLang] || I18N[DEFAULT_LANG];
    const inlineFb = LOCALE_INLINE_FALLBACK[currentLang] || LOCALE_INLINE_FALLBACK[DEFAULT_LANG] || {};
    if (!d) return inlineFb[key] ?? key;
    return d[key] ?? I18N[DEFAULT_LANG]?.[key] ?? inlineFb[key] ?? key;
}
function tp(key, params) {
    let s = t(key);
    if (params) Object.keys(params).forEach(k => { s = s.split('{' + k + '}').join(String(params[k])); });
    return s;
}

const TUTORIAL_MD_FILE = '新手教學.md';
let tutorialMarkdownCache = null;

function updateTutorialModalChrome() {
    const titleEl = document.getElementById('tutorialModalTitle');
    const closeBtn = document.querySelector('.tutorial-modal-close');
    if (titleEl) titleEl.textContent = t('tutorialModalTitle');
    if (closeBtn) closeBtn.setAttribute('aria-label', t('closeTutorial'));
}

async function openTutorialModal() {
    const modal = document.getElementById('tutorialModal');
    const body = document.getElementById('tutorialModalBody');
    if (!modal || !body) return;
    updateTutorialModalChrome();
    modal.classList.add('show');
    body.innerHTML = `<p>${t('tutorialLoading')}</p>`;
    try {
        if (!tutorialMarkdownCache) {
            const res = await fetch(TUTORIAL_MD_FILE);
            if (!res.ok) throw new Error(String(res.status));
            tutorialMarkdownCache = await res.text();
        }
        body.innerHTML = typeof marked !== 'undefined'
            ? marked.parse(tutorialMarkdownCache)
            : tutorialMarkdownCache.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
    } catch (e) {
        body.innerHTML = `<p>${t('tutorialLoadFailed')}</p>`;
    }
}

function closeTutorialModal() {
    document.getElementById('tutorialModal')?.classList.remove('show');
}

const ONBOARDING_STORAGE_KEY = 'GameTimer_InteractiveTutorial_v2';
let onboardingActive = false;
let onboardingStepIndex = 0;
let onboardingPollId = null;
let onboardingBaselineTimerCount = 0;
let onboardingCreatedTimerId = null;
let onboardingResizeHandler = null;
let onboardingPositionedStepId = null;
const ONBOARDING_STRICT_WAITS = new Set(['timer-created', 'timer-deleted']);
const NOTIFY_BANNER_DISMISS_KEY = 'GameTimer_NotifyBanner_Dismissed';
const finishedNotifyIds = new Set();

function shouldNotifyOnFinish(timer) {
    return timer?.notifyOnFinish !== false;
}

function canUseWebNotification() {
    return typeof window !== 'undefined' && 'Notification' in window;
}

function isIOSDevice() {
    if (typeof navigator === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
        || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function isStandalonePwa() {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia?.('(display-mode: standalone)')?.matches) return true;
    return window.navigator?.standalone === true;
}

function canUseWebNotificationOnThisDevice() {
    if (!canUseWebNotification()) return false;
    if (!isIOSDevice()) return true;
    return isStandalonePwa();
}

function requestNotificationPermissionIfNeeded() {
    if (!canUseWebNotificationOnThisDevice()) return;
    if (Notification.permission !== 'default') return;
    Notification.requestPermission().catch(() => {});
}

function getNotificationPermissionStatusKey() {
    if (!canUseWebNotification()) return 'notifyStatusUnsupported';
    if (isIOSDevice() && !isStandalonePwa()) return 'notifyStatusNeedHome';
    if (Notification.permission === 'granted') return 'notifyStatusGranted';
    if (Notification.permission === 'denied') return 'notifyStatusDenied';
    return 'notifyStatusDefault';
}

function afterNotificationPermissionChanged() {
    syncNotifyEnableBanner();
    renderSidePanel();
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const raw = atob(base64);
    const out = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
}

function isWebPushConfigured() {
    const k = String(WEB_PUSH_VAPID_PUBLIC_KEY || '').trim();
    return k.length > 20 && !k.includes('YOUR_');
}

function canUseBackgroundPush() {
    return isWebPushConfigured()
        && isCloudSyncActive();
}

function getPushBackgroundStatusKey() {
    if (!isWebPushConfigured()) return 'pushBackgroundNeedVapid';
    if (!isCloudSyncActive()) return 'pushBackgroundNeedLogin';
    if (Notification.permission !== 'granted') return 'pushBackgroundNeedAllow';
    return 'pushBackgroundOk';
}

async function savePushSubscription(subscription) {
    const sb = getSupabase();
    if (!sb || !currentUser || !subscription) return;
    const json = subscription.toJSON();
    const keys = json.keys || {};
    await sb.from('push_subscriptions').upsert({
        user_id: currentUser.id,
        endpoint: json.endpoint,
        p256dh: keys.p256dh,
        auth_key: keys.auth
    }, { onConflict: 'user_id,endpoint' });
}

async function syncPushScheduleToServer() {
    if (!canUseBackgroundPush()) return;
    const sb = getSupabase();
    const uid = currentUser.id;
    const now = Date.now();
    const timers = getActiveTimers().filter(timer => {
        if (!shouldNotifyOnFinish(timer)) return false;
        const end = new Date(timer.finishDate || 0).getTime();
        return end > now + 3000;
    });
    await sb.from('timer_push_schedule').delete().eq('user_id', uid).is('sent_at', null);
    if (!timers.length) return;
    const rows = timers.map(timer => ({
        user_id: uid,
        timer_id: String(timer.id),
        fire_at: new Date(timer.finishDate).toISOString(),
        title: t('timerDoneNoticeTitle'),
        body: tp('timerDoneNoticeBody', { task: timer.taskName || t('taskStart') })
    }));
    const { error } = await sb.from('timer_push_schedule').upsert(rows, { onConflict: 'user_id,timer_id' });
    if (error) console.warn('syncPushScheduleToServer', error);
}

async function ensureWebPushSubscription() {
    if (!canUseWebNotificationOnThisDevice() || !isWebPushConfigured() || !isCloudSyncActive()) return false;
    if (Notification.permission !== 'granted') return false;
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false;
    try {
        const reg = await navigator.serviceWorker.ready;
        let sub = await reg.pushManager.getSubscription();
        // iOS/Safari occasionally keeps a stale subscription after key/environment changes.
        // Recreate it to ensure server-side endpoint and keys are valid.
        if (sub) {
            try { await sub.unsubscribe(); } catch (_) {}
            sub = null;
        }
        sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(WEB_PUSH_VAPID_PUBLIC_KEY.trim())
        });
        await savePushSubscription(sub);
        await syncPushScheduleToServer();
        return true;
    } catch (err) {
        console.warn('ensureWebPushSubscription', err);
        return false;
    }
}

async function setupBackgroundPushAfterLogin() {
    await syncPushScheduleToServer().catch(err => console.warn('schedule after login', err));
    if (Notification.permission !== 'granted') return;
    await ensureWebPushSubscription().catch(err => console.warn('setupBackgroundPushAfterLogin', err));
}

async function requestNotificationPermissionExplicit() {
    if (!canUseWebNotificationOnThisDevice()) {
        alert(isIOSDevice() && !isStandalonePwa() ? t('notifyNeedStandalone') : t('notifyIosOld'));
        return;
    }
    try {
        const perm = await Notification.requestPermission();
        afterNotificationPermissionChanged();
        if (perm === 'granted') {
            await ensureWebPushSubscription();
            afterNotificationPermissionChanged();
        }
    } catch (_) {
        afterNotificationPermissionChanged();
    }
}

function sendTestNotification() {
    if (!canUseWebNotificationOnThisDevice() || Notification.permission !== 'granted') return;
    try {
        new Notification(t('timerDoneNoticeTitle'), { body: t('notifyTestBody'), tag: 'timer-test' });
    } catch (_) {}
}

function isNotifyBannerDismissed() {
    try {
        if (sessionStorage.getItem(NOTIFY_BANNER_DISMISS_KEY) === '1') return true;
        if (localStorage.getItem(NOTIFY_BANNER_DISMISS_KEY) === '1') return true;
    } catch (_) {}
    return false;
}

function dismissNotifyEnableBanner(ev) {
    if (ev) {
        ev.preventDefault();
        ev.stopPropagation();
    }
    try { sessionStorage.setItem(NOTIFY_BANNER_DISMISS_KEY, '1'); } catch (_) {}
    try { localStorage.setItem(NOTIFY_BANNER_DISMISS_KEY, '1'); } catch (_) {}
    ['notifyEnableBanner', 'notifyDesktopPrompt'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.hidden = true;
        el.setAttribute('aria-hidden', 'true');
        el.classList.add('notify-enable-banner--dismissed');
    });
}

function shouldShowNotifyPermissionPrompt() {
    if (!canUseWebNotificationOnThisDevice()) return false;
    if (Notification.permission !== 'default') return false;
    if (isNotifyBannerDismissed()) return false;
    return true;
}

function initNotifyBannerDismissButtons() {
    document.querySelectorAll('[data-notify-dismiss]').forEach(btn => {
        if (btn.dataset.notifyDismissBound === '1') return;
        btn.dataset.notifyDismissBound = '1';
        btn.addEventListener('click', dismissNotifyEnableBanner);
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            dismissNotifyEnableBanner(e);
        }, { passive: false });
    });
}

function bindPress3dButton(btn) {
    if (!btn || btn.dataset.press3dBound === '1') return;
    btn.dataset.press3dBound = '1';
    const press = () => btn.classList.add('is-pressed');
    const release = () => btn.classList.remove('is-pressed');
    btn.addEventListener('mousedown', press);
    btn.addEventListener('mouseup', release);
    btn.addEventListener('mouseleave', release);
    btn.addEventListener('touchstart', press, { passive: true });
    btn.addEventListener('touchend', release);
    btn.addEventListener('touchcancel', release);
}

function initNotifyPermissionPressButtons() {
    document.querySelectorAll('.notify-permission-btn.btn-press-3d').forEach(bindPress3dButton);
}

function shouldShowNotifyEnableBanner() {
    return shouldShowNotifyPermissionPrompt() && isMobileLayout();
}

function shouldShowNotifyDesktopPrompt() {
    return shouldShowNotifyPermissionPrompt() && !isMobileLayout();
}

function fillNotifyPermissionPromptTexts(titleEl, bodyEl, btnEl) {
    if (titleEl) titleEl.textContent = t('notifyBannerTitle');
    if (bodyEl) bodyEl.textContent = t('notifyBannerBody');
    if (btnEl) btnEl.textContent = t('notifyPermissionBtn');
}

function renderNotifyDesktopPromptHtml() {
    return `<div class="notify-desktop-prompt" id="notifyDesktopPrompt" hidden>
        <div class="notify-desktop-prompt-head">
            <strong id="notifyDesktopPromptTitle">請開啟到點通知</strong>
            <button type="button" class="notify-desktop-prompt-dismiss btn-press-3d" data-notify-dismiss aria-label="關閉">&times;</button>
        </div>
        <p id="notifyDesktopPromptBody">按下方按鈕並在系統視窗選「允許」。</p>
        <button type="button" class="notify-permission-btn notify-permission-btn--block btn-press-3d" id="notifyDesktopPromptBtn" onclick="requestNotificationPermissionExplicit()">允許通知</button>
    </div>`;
}

function syncNotifyPermissionUi() {
    const banner = document.getElementById('notifyEnableBanner');
    if (banner) {
        const showBanner = shouldShowNotifyEnableBanner();
        banner.hidden = !showBanner;
        if (showBanner) {
            fillNotifyPermissionPromptTexts(
                document.getElementById('notifyEnableBannerTitle'),
                document.getElementById('notifyEnableBannerBody'),
                document.getElementById('notifyEnableBannerBtn')
            );
            initNotifyPermissionPressButtons();
        }
    }
    const desktop = document.getElementById('notifyDesktopPrompt');
    if (desktop) {
        const showDesktop = shouldShowNotifyDesktopPrompt();
        desktop.hidden = !showDesktop;
        if (showDesktop) {
            fillNotifyPermissionPromptTexts(
                document.getElementById('notifyDesktopPromptTitle'),
                document.getElementById('notifyDesktopPromptBody'),
                document.getElementById('notifyDesktopPromptBtn')
            );
        }
    }
}

function syncNotifyEnableBanner() {
    syncNotifyPermissionUi();
}

async function registerAppServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    try {
        await navigator.serviceWorker.register('sw.js', { scope: './' });
    } catch (err) {
        console.warn('serviceWorker register', err);
    }
}

function renderNotificationHelpHtml() {
    const standalone = isStandalonePwa();
    const ios = isIOSDevice();
    const canAsk = canUseWebNotificationOnThisDevice() && Notification.permission === 'default';
    const denied = canUseWebNotificationOnThisDevice() && Notification.permission === 'denied';
    const granted = canUseWebNotificationOnThisDevice() && Notification.permission === 'granted';
    const statusKey = getNotificationPermissionStatusKey();
    const statusClass = statusKey.replace('notifyStatus', '').toLowerCase();
    let installHint = standalone ? t('notifyInstallOk') : t('notifyInstallHint');
    if (ios && !standalone) installHint = t('notifyNeedStandalone');
    const extraHints = [];
    if (ios && standalone && Notification.permission === 'default') extraHints.push(t('notifyMustAllowFirst'));
    if (ios) extraHints.push(t('notifySearchNames'));
    if (standalone) extraHints.push(t('notifyReinstallHint'));
    extraHints.push(t('notifySafariOnly'), t('notifyLimitHint'));
    if (isWebPushConfigured()) extraHints.push(t(getPushBackgroundStatusKey()));
    if (ios && !canUseWebNotification()) extraHints.unshift(t('notifyIosOld'));
    const panelOpen = uiState.notifySetupExpanded ? ' notify-setup-panel--open' : '';
    const panelActive = uiState.notifySetupExpanded ? ' active' : '';
    const bodyInner = `
            <p class="notify-setup-hint">${installHint}</p>
            ${extraHints.map(h => `<p class="notify-setup-hint notify-setup-hint--sub">${h}</p>`).join('')}
            <div class="notify-setup-row">
                <span>${t('notifyPermissionLabel')}</span>
                <span class="notify-setup-status notify-setup-status--${statusClass}">${t(statusKey)}</span>
            </div>
            ${canAsk ? `<button type="button" class="notify-permission-btn notify-permission-btn--compact btn-press-3d" onclick="requestNotificationPermissionExplicit()">${t('notifyPermissionBtn')}</button>` : ''}
            ${granted ? `<button type="button" class="notify-permission-btn notify-permission-btn--compact btn-press-3d" onclick="sendTestNotification()">${t('notifyTestBtn')}</button>` : ''}
            ${denied ? `<p class="notify-setup-hint notify-setup-hint--warn">${t('notifyDeniedHint')}</p>` : ''}`;
    return `
        <div class="notify-setup-panel${panelOpen}" id="notifySetupPanel">
            <div class="notify-setup-panel-title" role="button" tabindex="0" onclick="toggleNotifySetupPanel()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleNotifySetupPanel();}" aria-expanded="${uiState.notifySetupExpanded}">
                <span class="notify-setup-panel-title-text">${t('notifySectionTitle')}</span>
                <span class="notify-setup-panel-meta notify-setup-status--${statusClass}">${t(statusKey)}</span>
                <span class="notify-setup-panel-chevron" aria-hidden="true">›</span>
            </div>
            <div id="notifySetupPanelBody" class="notify-setup-panel-body collapsible-content${panelActive}"><div>${bodyInner}</div></div>
        </div>
        <div class="sys-block-divider"></div>`;
}

function triggerFinishNotification(timer) {
    if (!shouldNotifyOnFinish(timer) || !timer?.id) return;
    const id = String(timer.id);
    if (finishedNotifyIds.has(id)) return;
    finishedNotifyIds.add(id);
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        navigator.vibrate([180, 120, 180]);
    }
    if (!canUseWebNotificationOnThisDevice() || Notification.permission !== 'granted') return;
    const task = timer.taskName || t('taskStart');
    try {
        new Notification(t('timerDoneNoticeTitle'), {
            body: tp('timerDoneNoticeBody', { task }),
            tag: `timer-finish-${id}`
        });
    } catch (_) {}
}

function syncFinishedNotifyState() {
    const activeIds = new Set(getActiveTimers().map(t => String(t.id)));
    [...finishedNotifyIds].forEach(id => {
        if (!activeIds.has(id)) finishedNotifyIds.delete(id);
    });
}

function openOnboardingSection(sectionId) {
    if (!SECTION_IDS.includes(sectionId)) return;
    uiState.openSection = sectionId;
    if (sectionId !== 'taskContent') {
        uiState.allTasksExpanded = false;
        uiState.editingTaskIdx = null;
        uiState.collapsedTaskIndices.clear();
        document.querySelectorAll('.sub-edit-panel.open').forEach(el => el.classList.remove('open'));
    }
    syncCollapsibleClasses();
    syncStartContentExpandedState();
    if (sectionId === 'startContent') {
        mountStartContent();
        if (!isMobileLayout()) {
            document.getElementById('sec-start')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

function isStartFormOpen() {
    if (isMobileLayout()) return !!document.getElementById('startSheet')?.classList.contains('show');
    const sc = document.getElementById('startContent');
    return uiState.openSection === 'startContent' && !!sc?.classList.contains('active');
}

function isSidePanelOpen() {
    return !!document.getElementById('sidePanel')?.classList.contains('panel-open');
}

function ensureSidePanelForOnboarding() {
    if (!isMobileLayout()) return;
    closeStartSheet();
    setSidePanelOpen(true);
}

function ensureMainViewForOnboarding() {
    if (isMobileLayout()) {
        closeStartSheet();
        setSidePanelOpen(false);
    }
}

function ensureAccSectionForOnboarding() {
    ensureSidePanelForOnboarding();
    closeStartSheet();
    openOnboardingSection('accContent');
}

function ensureTaskSectionForOnboarding() {
    ensureSidePanelForOnboarding();
    closeStartSheet();
    openOnboardingSection('taskContent');
}

function ensureFirstTaskSubPanelForOnboarding() {
    ensureTaskSectionForOnboarding();
    if (!config.tasks.length) return;
    uiState.editingTaskIdx = 0;
    uiState.allTasksExpanded = false;
    uiState.collapsedTaskIndices.clear();
    syncSubEditPanels();
}

function ensureStartFormForOnboarding() {
    mountStartContent();
    if (isMobileLayout()) {
        closeSidePanel();
        setStartSheetOpen(true);
        return;
    }
    openOnboardingSection('startContent');
}

function captureOnboardingCreatedTimerId() {
    const timers = getActiveTimers();
    if (!timers.length) return null;
    return timers[timers.length - 1].id;
}

function isOnboardingTutorialTimerActive() {
    if (onboardingCreatedTimerId == null) return false;
    return getActiveTimers().some(t => String(t.id) === String(onboardingCreatedTimerId));
}

function getOnboardingTimerDeleteButton() {
    if (onboardingCreatedTimerId == null) return null;
    const id = onboardingCreatedTimerId;
    return document.querySelector(`button[onclick="delTask(${id})"]`)
        || document.querySelector(`.timer-card button[onclick*="delTask(${id})"]`);
}

function goOnboardingStepById(stepId) {
    const steps = getOnboardingSteps();
    const idx = steps.findIndex(s => s.id === stepId);
    if (idx >= 0) showOnboardingStep(idx);
}

function getOnboardingSteps() {
    const mobile = isMobileLayout();
    return [
        {
            id: 'welcome',
            titleKey: 'onboardWelcomeTitle',
            bodyKey: 'onboardWelcomeBody',
            nextKey: 'onboardNext',
            target: null
        },
        {
            id: 'layout',
            titleKey: mobile ? 'onboardLayoutTitleMobile' : 'onboardLayoutTitleDesktop',
            bodyKey: mobile ? 'onboardLayoutBodyMobile' : 'onboardLayoutBodyDesktop',
            nextKey: 'onboardNext',
            target: () => mobile ? (document.querySelector('.main-settings-btn') || document.getElementById('sidePanel')) : document.getElementById('sidePanel'),
            prepare: ensureSidePanelForOnboarding
        },
        {
            id: 'add-account',
            titleKey: 'onboardAddAccountTitle',
            bodyKey: 'onboardAddAccountBody',
            nextKey: 'onboardNext',
            target: () => document.getElementById('newEmailInput')?.closest('div') || document.getElementById('sec-acc'),
            prepare: ensureAccSectionForOnboarding
        },
        {
            id: 'add-character',
            titleKey: 'onboardAddCharTitle',
            bodyKey: 'onboardAddCharBody',
            nextKey: 'onboardNext',
            target: () => document.querySelector('#emailList .btn-mini[onclick^="addCharacter"]') || document.getElementById('emailList'),
            prepare: ensureAccSectionForOnboarding
        },
        {
            id: 'task-tags',
            titleKey: 'onboardTaskTagsTitle',
            bodyKey: 'onboardTaskTagsBody',
            nextKey: 'onboardNext',
            target: () => document.getElementById('newTaskInput')?.closest('div') || document.getElementById('sec-task'),
            prepare: ensureTaskSectionForOnboarding
        },
        {
            id: 'add-sub',
            titleKey: 'onboardAddSubTitle',
            bodyKey: 'onboardAddSubBody',
            nextKey: 'onboardNext',
            target: () => document.getElementById('subIn-0')?.closest('.sub-edit-panel') || document.getElementById('subIn-0') || document.getElementById('taskList'),
            prepare: ensureFirstTaskSubPanelForOnboarding
        },
        {
            id: 'open-start',
            titleKey: 'onboardOpenStartTitle',
            bodyKey: mobile ? 'onboardOpenStartBodyMobile' : 'onboardOpenStartBodyDesktop',
            nextKey: 'onboardNext',
            target: () => {
                if (mobile) {
                    if (isStartFormOpen()) return document.getElementById('startSheet') || document.querySelector('.main-start-btn');
                    return document.querySelector('.main-start-btn') || document.getElementById('sec-start-entry');
                }
                return document.getElementById('sec-start') || document.getElementById('startContent');
            },
            prepare: ensureStartFormForOnboarding
        },
        {
            id: 'pick-role',
            titleKey: 'onboardPickRoleTitle',
            bodyKey: 'onboardPickRoleBody',
            nextKey: 'onboardNext',
            target: () => document.querySelector('#startContent .start-field-row--2'),
            prepare: ensureStartFormForOnboarding
        },
        {
            id: 'pick-task',
            titleKey: 'onboardPickTaskTitle',
            bodyKey: 'onboardPickTaskBody',
            nextKey: 'onboardNext',
            target: () => document.getElementById('taskSubRow'),
            prepare: ensureStartFormForOnboarding
        },
        {
            id: 'set-time',
            titleKey: 'onboardSetTimeTitle',
            bodyKey: 'onboardSetTimeBody',
            nextKey: 'onboardNext',
            target: () => document.querySelector('#startContent .start-adj-grid') || document.getElementById('timeDisplay'),
            waitFor: 'time-set',
            prepare: ensureStartFormForOnboarding
        },
        {
            id: 'start-btn',
            titleKey: 'onboardStartTitle',
            bodyKey: 'onboardStartBody',
            nextKey: 'onboardNext',
            target: () => document.getElementById('btnStartTask'),
            waitFor: 'timer-created',
            prepare: () => {
                onboardingBaselineTimerCount = getActiveTimers().length;
                onboardingCreatedTimerId = null;
                ensureStartFormForOnboarding();
            }
        },
        {
            id: 'delete-timer',
            titleKey: 'onboardDeleteTimerTitle',
            bodyKey: 'onboardDeleteTimerBody',
            nextKey: 'onboardNext',
            target: () => getOnboardingTimerDeleteButton() || document.querySelector('#mainDisplay .timer-card'),
            waitFor: 'timer-deleted',
            prepare: ensureMainViewForOnboarding
        },
        {
            id: 'undo-tip',
            titleKey: 'onboardUndoTitle',
            bodyKey: 'onboardUndoBody',
            nextKey: 'onboardNext',
            target: () => document.getElementById('undoToast'),
            prepare: ensureMainViewForOnboarding
        },
        {
            id: 'done',
            titleKey: 'onboardDoneTitle',
            bodyKey: 'onboardDoneBody',
            nextKey: 'onboardFinish',
            target: () => document.querySelector('#mainDisplay .account-group') || document.getElementById('mainDisplay')
        }
    ];
}

function resolveOnboardingTarget(step) {
    if (!step || !step.target) return null;
    const t = step.target;
    return typeof t === 'function' ? t() : document.querySelector(t);
}

function onboardingWaitSatisfied(step) {
    if (!step?.waitFor) return true;
    if (step.waitFor === 'panel-open') return isSidePanelOpen();
    if (step.waitFor === 'start-open') return isStartFormOpen();
    if (step.waitFor === 'time-set') return totalSec > 0;
    if (step.waitFor === 'timer-created') return getActiveTimers().length > onboardingBaselineTimerCount;
    if (step.waitFor === 'timer-deleted') return onboardingCreatedTimerId != null && !isOnboardingTutorialTimerActive();
    if (step.waitFor === 'undo-visible') return document.getElementById('undoToast')?.classList.contains('show');
    return true;
}

function updateOnboardingChrome() {
    const tour = document.getElementById('onboardingTour');
    if (!tour?.classList.contains('is-active')) return;
    const steps = getOnboardingSteps();
    const step = steps[onboardingStepIndex];
    if (!step) return;
    const label = document.getElementById('onboardingStepLabel');
    const title = document.getElementById('onboardingTitle');
    const body = document.getElementById('onboardingBody');
    const hint = document.getElementById('onboardingHint');
    const skipBtn = document.getElementById('onboardingSkipBtn');
    const nextBtn = document.getElementById('onboardingNextBtn');
    if (label) label.textContent = tp('onboardStepLabel', { n: onboardingStepIndex + 1, total: steps.length });
    if (title) title.textContent = t(step.titleKey);
    if (body) body.textContent = t(step.bodyKey);
    if (skipBtn) skipBtn.textContent = t('onboardSkip');
    if (nextBtn) nextBtn.textContent = t(step.nextKey || 'onboardNext');
    const ready = onboardingWaitSatisfied(step);
    const blockNext = step.waitFor && ONBOARDING_STRICT_WAITS.has(step.waitFor) && !ready;
    if (nextBtn) nextBtn.disabled = !!blockNext;
    if (hint) {
        let hintKey = '';
        if (step.waitFor === 'time-set' && !ready) hintKey = 'onboardNeedTimeHint';
        else if (step.waitFor === 'timer-created' && !ready) hintKey = 'onboardNeedStartHint';
        else if (step.waitFor === 'timer-deleted' && !ready) hintKey = 'onboardNeedDeleteHint';
        if (hintKey) {
            hint.hidden = false;
            hint.textContent = t(hintKey);
        } else {
            hint.hidden = true;
            hint.textContent = '';
        }
    }
}

function positionOnboardingCard(rect) {
    const card = document.getElementById('onboardingCard');
    if (!card) return;
    const vv = window.visualViewport;
    const viewportWidth = Math.max(240, Math.floor(vv?.width || window.innerWidth));
    const viewportHeight = Math.max(280, Math.floor(vv?.height || window.innerHeight));
    const offsetLeft = Math.floor(vv?.offsetLeft || 0);
    const offsetTop = Math.floor(vv?.offsetTop || 0);
    const margin = isMobileLayout() ? 8 : 12;
    const cardW = Math.min(360, viewportWidth - (margin * 2));
    const cardH = card.offsetHeight || 200;
    if (!rect || rect.width < 4 || rect.height < 4) {
        card.classList.remove('is-docked');
        card.style.left = `${offsetLeft + (viewportWidth / 2)}px`;
        card.style.top = `${offsetTop + (viewportHeight / 2)}px`;
        card.style.transform = 'translate(-50%, -50%)';
        card.style.width = `${cardW}px`;
        return;
    }
    card.classList.add('is-docked');
    let top = rect.bottom + margin;
    const maxTop = offsetTop + viewportHeight - cardH - margin;
    if (top > maxTop) top = rect.top - cardH - margin;
    if (top > maxTop) top = maxTop;
    if (top < offsetTop + margin) top = offsetTop + margin;
    let left = rect.left + rect.width / 2 - cardW / 2;
    const minLeft = offsetLeft + margin;
    const maxLeft = offsetLeft + viewportWidth - cardW - margin;
    left = Math.max(minLeft, Math.min(left, maxLeft));
    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
    card.style.transform = 'none';
    card.style.width = `${cardW}px`;
}

function positionOnboardingUi() {
    const steps = getOnboardingSteps();
    const step = steps[onboardingStepIndex];
    const spot = document.getElementById('onboardingSpot');
    const card = document.getElementById('onboardingCard');
    if (!spot || !card || !step) return;
    const el = resolveOnboardingTarget(step);
    if (!el) {
        spot.style.display = 'none';
        positionOnboardingCard(null);
        return;
    }
    if (onboardingPositionedStepId !== step.id) {
        el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        onboardingPositionedStepId = step.id;
    }
    const vv = window.visualViewport;
    const viewportWidth = Math.max(240, Math.floor(vv?.width || window.innerWidth));
    const viewportHeight = Math.max(280, Math.floor(vv?.height || window.innerHeight));
    const offsetLeft = Math.floor(vv?.offsetLeft || 0);
    const offsetTop = Math.floor(vv?.offsetTop || 0);
    const pad = step.id === 'undo-tip' ? 10 : 8;
    const r = el.getBoundingClientRect();
    const minLeft = offsetLeft + 2;
    const maxLeft = offsetLeft + viewportWidth - 2;
    const minTop = offsetTop + 2;
    const maxTop = offsetTop + viewportHeight - 2;
    const safeLeft = Math.max(minLeft, r.left - pad);
    const safeTop = Math.max(minTop, r.top - pad);
    const safeRight = Math.min(maxLeft, r.right + pad);
    const safeBottom = Math.min(maxTop, r.bottom + pad);
    spot.style.display = 'block';
    spot.style.top = `${safeTop}px`;
    spot.style.left = `${safeLeft}px`;
    spot.style.width = `${Math.max(24, safeRight - safeLeft)}px`;
    spot.style.height = `${Math.max(24, safeBottom - safeTop)}px`;
    const dockCard = step.id !== 'undo-tip' && step.id !== 'welcome';
    requestAnimationFrame(() => positionOnboardingCard(dockCard ? spot.getBoundingClientRect() : null));
}

function stopOnboardingPoll() {
    if (onboardingPollId) {
        clearInterval(onboardingPollId);
        onboardingPollId = null;
    }
}

function startOnboardingPoll() {
    stopOnboardingPoll();
    onboardingPollId = setInterval(() => {
        if (!onboardingActive) return;
        const steps = getOnboardingSteps();
        const step = steps[onboardingStepIndex];
        if (!step) return;
        updateOnboardingChrome();
        positionOnboardingUi();
        if (step.waitFor && onboardingWaitSatisfied(step)) {
            if (step.waitFor === 'timer-created') {
                onboardingCreatedTimerId = captureOnboardingCreatedTimerId();
                stopOnboardingPoll();
                setTimeout(() => {
                    if (!onboardingActive) return;
                    goOnboardingStepById('delete-timer');
                }, 400);
            } else if (step.waitFor === 'timer-deleted') {
                stopOnboardingPoll();
                setTimeout(() => {
                    if (!onboardingActive) return;
                    goOnboardingStepById('undo-tip');
                }, 350);
            }
        }
    }, 280);
}

function showOnboardingStep(index) {
    const steps = getOnboardingSteps();
    if (index < 0 || index >= steps.length) {
        finishInteractiveTutorial(false);
        return;
    }
    onboardingStepIndex = index;
    onboardingPositionedStepId = null;
    const step = steps[index];
    if (step.prepare) step.prepare();
    updateOnboardingChrome();
    requestAnimationFrame(() => {
        positionOnboardingUi();
        requestAnimationFrame(() => positionOnboardingUi());
    });
    startOnboardingPoll();
}

function startInteractiveTutorial(opts = {}) {
    if (onboardingActive) return;
    if (!opts.force && localStorage.getItem(ONBOARDING_STORAGE_KEY) === 'done') return;
    closeTutorialModal();
    onboardingActive = true;
    onboardingStepIndex = 0;
    onboardingBaselineTimerCount = getActiveTimers().length;
    onboardingCreatedTimerId = null;
    const tour = document.getElementById('onboardingTour');
    if (!tour) return;
    tour.classList.add('is-active');
    tour.setAttribute('aria-hidden', 'false');
    document.body.classList.add('onboarding-active');
    if (!onboardingResizeHandler) {
        onboardingResizeHandler = () => {
            if (!onboardingActive) return;
            positionOnboardingUi();
            updateOnboardingChrome();
        };
        window.addEventListener('resize', onboardingResizeHandler);
    }
    showOnboardingStep(0);
}

function finishInteractiveTutorial(skipped) {
    stopOnboardingPoll();
    onboardingActive = false;
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'done');
    const tour = document.getElementById('onboardingTour');
    tour?.classList.remove('is-active');
    tour?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('onboarding-active');
    document.getElementById('onboardingSpot')?.style.setProperty('display', 'none');
}

function skipInteractiveTutorial() {
    finishInteractiveTutorial(true);
}

function advanceInteractiveTutorial() {
    const steps = getOnboardingSteps();
    const step = steps[onboardingStepIndex];
    if (!step) return;
    // 這兩步是純說明，不需要任何前置條件，直接精準跳下一步避免手機上重排導致要多按
    if (step.id === 'task-tags') {
        goOnboardingStepById('add-sub');
        return;
    }
    if (step.id === 'add-sub') {
        goOnboardingStepById('open-start');
        return;
    }
    if (step.waitFor === 'time-set' && !onboardingWaitSatisfied(step)) {
        // 手機版容易被教學浮層遮住快捷鍵，先自動補一分鐘避免卡關
        adj(60);
        updateOnboardingChrome();
    }
    if (step.waitFor && ONBOARDING_STRICT_WAITS.has(step.waitFor) && !onboardingWaitSatisfied(step)) {
        updateOnboardingChrome();
        const hint = document.getElementById('onboardingHint');
        if (hint) {
            hint.hidden = false;
            hint.classList.add('onboarding-hint--warn');
        }
        return;
    }
    if (step.id === 'done') {
        finishInteractiveTutorial(false);
        return;
    }
    const nextStep = steps[onboardingStepIndex + 1];
    // iOS 點擊有時會被視覺重排吃掉，若下一步已是結尾就直接完成，避免要多按
    if (nextStep && nextStep.id === 'done') {
        finishInteractiveTutorial(false);
        return;
    }
    showOnboardingStep(onboardingStepIndex + 1);
}

function maybeStartInteractiveTutorial() {
    if (localStorage.getItem(ONBOARDING_STORAGE_KEY) === 'done') return;
    setTimeout(() => startInteractiveTutorial(), 500);
}

async function setLang(lang, opts = {}) {
    if (!I18N[lang]) {
        try { await loadLocaleFile(lang); } catch (e) {
            console.error('setLang loadLocale', lang, e);
            return;
        }
    }
    if (!I18N[lang]) return;
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    document.title = t('appTitle');
    syncPanelMobileControls();
    updateCloudSyncUI();
    if (undoStack.length) updateUndoToastText();
    else { const el = document.getElementById('undoText'); if (el) el.textContent = t('undo'); }
    renderSidePanel();
    refreshMainDisplay();
    syncStartSheetChrome();
    if (document.getElementById('tutorialModal')?.classList.contains('show')) updateTutorialModalChrome();
    updateOnboardingChrome();
    if (!opts.skipCloud) scheduleCloudSync();
}
function applyLangFromStorage() {
    const lang = localStorage.getItem(LANG_KEY);
    if (lang && I18N[lang]) currentLang = lang;
    else if (!I18N[currentLang] && I18N[DEFAULT_LANG]) currentLang = DEFAULT_LANG;
    document.documentElement.lang = currentLang;
    document.title = t('appTitle');
    syncPanelMobileControls();
    const undoEl = document.getElementById('undoText');
    if (undoEl) undoEl.textContent = t('undo');
}
const LOCAL_UPDATED_KEY = 'GameTimer_LocalUpdatedAt';
const SYNC_NEW_BADGE_MS = 90000;

/* 部署時填入 Supabase 專案的 URL 與 Publishable key（見 DEPLOY.md） */
const SUPABASE_URL = 'https://gnfukohkisiknbbnxjce.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_06A2mHaxzTXHx6DhQLI2XQ_zSoaveJv';

/** 背景推播 VAPID 公鑰（npx web-push generate-vapid-keys），見 docs/背景推播設定.md */
const WEB_PUSH_VAPID_PUBLIC_KEY = 'BEK0-Llemf0WqM_wxZ9qFFPX5bxhDUPyCfpZJlJcw9sMaSsuhp6okQU8RHbWqC4FdGPhKOFD6FfeLhZmTPNISTE';

const defaultAccColors = ['#4a90e2', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981'];
let uiState = { openSection: 'startContent', editingTaskIdx: null, allTasksExpanded: false, collapsedTaskIndices: new Set(), recoveryExpanded: false, notifySetupExpanded: false, cloudSyncExpanded: false, selectedRecoverySnapshotId: null };
const SECTION_IDS = ['accContent', 'taskContent', 'startContent', 'sysContent'];
let dragSourceTaskIdx = null;
let dragSourceSub = { taskIdx: null, subIdx: null };

const BUILTIN_DEFAULT_TASKS = [
    { name: '訓練', subs: ['盾兵', '矛兵', '射手'], color: '#f6b26b' },
    { name: '寵物', subs: ['泰坦巨鳥', '劍齒虎', '雪猿', '洞獅', '雪豹', '板齒犀'], color: '#22d3ee' },
    { name: '建築', subs: ['大熔爐', '盾兵營', '矛兵營', '射手營', '大使館'], color: '#b4a7d6' },
    { name: '採集', subs: ['生肉', '木材', '煤礦', '鐵礦', '聯盟資源'], color: '#3b82f6' },
    { name: '研究', subs: ['科技研究所', '戰爭研究所'], color: '#76a5af' },
    { name: '專家', subs: ['西里爾', '艾格妮絲', '霍爾格', '羅慕路斯', '巴爾德', '法比安', '瓦萊莉亞', '羅妮', '凱西'], color: '#93c47d' },
    { name: '其他', subs: ['掛機探險', '捐獻'], color: '#a855f7' }
];

function cloneTasks(tasks) {
    return JSON.parse(JSON.stringify(tasks));
}

let _timerLabelMeasureCanvas;

function measureTimerUILabelPx(text, fontCss) {
    if (!text) return 0;
    _timerLabelMeasureCanvas = _timerLabelMeasureCanvas || document.createElement('canvas');
    const ctx = _timerLabelMeasureCanvas.getContext('2d');
    ctx.font = fontCss;
    return ctx.measureText(text).width;
}

function getLongestDefaultTaskLabelPx() {
    const tasks = (config.defaultTasks && config.defaultTasks.length)
        ? config.defaultTasks
        : cloneTasks((config.tasks && config.tasks.length) ? config.tasks : BUILTIN_DEFAULT_TASKS);
    const taskFont = 'bold 0.78rem "Microsoft JhengHei", sans-serif';
    const timeFont = 'bold 1.5rem "Microsoft JhengHei", sans-serif';
    let max = measureTimerUILabelPx('88:88:88', timeFont);
    tasks.forEach(task => {
        if (!task || !task.name) return;
        max = Math.max(max, measureTimerUILabelPx(task.name, taskFont));
        (task.subs || []).forEach(sub => {
            max = Math.max(max, measureTimerUILabelPx(`${task.name} (${sub})`, taskFont));
        });
    });
    return max;
}

function applyTimerCardMinWidth() {
    const labelPx = getLongestDefaultTaskLabelPx();
    const cardW = Math.ceil(labelPx + 48);
    const clamped = Math.max(132, Math.min(210, cardW));
    document.documentElement.style.setProperty('--timer-card-min-width', `${clamped}px`);
    document.documentElement.style.setProperty('--timer-card-width', `${clamped}px`);
}

const ACTIVE_CARD_WIDTH_MIN = 132;
const ACTIVE_CARD_WIDTH_MAX = 300;
const ACTIVE_CARD_INNER_PAD_X = 28;
const ACTIVE_CARD_ID_COL_PX = 38;

function getTimerCardBaseWidthPx() {
    const v = getComputedStyle(document.documentElement).getPropertyValue('--timer-card-width').trim();
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : 156;
}

function measureCharBadgeLabelPx(charName) {
    if (!charName) return 0;
    return measureTimerUILabelPx(charName, 'bold 0.75rem "Microsoft JhengHei", sans-serif') + 14;
}

function measureTaskPillLabelPx(text) {
    if (!text) return 0;
    return measureTimerUILabelPx(text, 'bold 0.78rem "Microsoft JhengHei", sans-serif') + 24;
}

/** 依角色／任務／時間文字估算卡片所需寬度（可超過全站預設，上限 ACTIVE_CARD_WIDTH_MAX） */
function computeActiveTimerCardWidthPx(card) {
    const base = getTimerCardBaseWidthPx();
    let need = base;
    const badge = card.querySelector('.char-title-badge');
    const charName = badge?.textContent?.trim() || '';
    if (charName) {
        need = Math.max(need, ACTIVE_CARD_INNER_PAD_X + ACTIVE_CARD_ID_COL_PX + measureCharBadgeLabelPx(charName));
    }
    const taskEl = card.querySelector('.active-slot-task .task-title-display');
    if (taskEl?.textContent) {
        need = Math.max(need, ACTIVE_CARD_INNER_PAD_X + measureTaskPillLabelPx(taskEl.textContent.trim()));
    }
    const timeEl = card.querySelector('.active-slot-time .time-text');
    const timeText = timeEl?.textContent?.trim() || '88:88:88';
    need = Math.max(need, ACTIVE_CARD_INNER_PAD_X + measureTimerUILabelPx(timeText, 'bold 1.5rem ui-monospace, SFMono-Regular, Menlo, monospace') + 4);
    return Math.max(ACTIVE_CARD_WIDTH_MIN, Math.min(ACTIVE_CARD_WIDTH_MAX, Math.ceil(need)));
}

function applyActiveTimerCardWidth(card) {
    if (!card?.classList.contains('timer-card--active')) return;
    if (document.documentElement.classList.contains('timer-display-list') || document.documentElement.classList.contains('timer-display-clean')) return;
    const target = computeActiveTimerCardWidthPx(card);
    const base = getTimerCardBaseWidthPx();
    if (target > base + 1) {
        card.style.setProperty('--timer-card-actual-width', `${target}px`);
        card.classList.add('timer-card--width-expanded');
    } else {
        card.style.removeProperty('--timer-card-actual-width');
        card.classList.remove('timer-card--width-expanded');
    }
}

function fitAdaptiveLabel(el, maxWidthPx, startRem, minRem) {
    if (!el || !maxWidthPx) return;
    const minSizeRem = minRem != null ? minRem : 0.5;
    let rem = startRem != null ? startRem : 0.75;
    el.style.overflow = 'visible';
    el.style.textOverflow = 'unset';
    el.style.maxWidth = 'none';
    el.style.whiteSpace = 'nowrap';
    el.style.fontSize = `${rem}rem`;
    while (el.scrollWidth > maxWidthPx && rem > minSizeRem) {
        rem -= 0.035;
        el.style.fontSize = `${rem}rem`;
    }
}

/** 已完成卡片：縮短數字與中文單位間距，不縮小字級 */
function tightenFinishedCardText(text) {
    if (!text) return text;
    return text
        .replace(/(\d)\s+([\u4e00-\u9fff])/g, '$1$2')
        .replace(/([\u4e00-\u9fff])\s+(\d)/g, '$1$2');
}

function fitAdaptiveLetterSpacing(el, maxWidthPx, startEm, minEm) {
    if (!el || !maxWidthPx) return;
    const minSpacingEm = minEm != null ? minEm : -0.08;
    let em = startEm != null ? startEm : 0;
    el.style.fontSize = '';
    el.style.whiteSpace = 'nowrap';
    el.style.letterSpacing = `${em}em`;
    while (el.scrollWidth > maxWidthPx && em > minSpacingEm) {
        em -= 0.008;
        el.style.letterSpacing = `${em}em`;
    }
}

function fitActiveTimerCardLabels(card) {
    if (!card || !card.classList.contains('timer-card--active')) return;
    if (document.documentElement.classList.contains('timer-display-clean')) return;
    applyActiveTimerCardWidth(card);
    const innerW = Math.max(48, card.clientWidth - 24);
    const charSlot = card.querySelector('.active-slot-char');
    const charMax = Math.max(48, (charSlot ? charSlot.clientWidth : innerW) - 4);
    const charBadge = card.querySelector('.char-title-badge');
    if (charBadge) {
        charBadge.style.fontSize = '';
        charBadge.style.maxWidth = 'none';
        charBadge.style.overflow = 'visible';
        charBadge.style.textOverflow = 'unset';
        charBadge.style.whiteSpace = 'nowrap';
        if (charBadge.scrollWidth > charMax) {
            fitAdaptiveLabel(charBadge, charMax, 0.75, 0.52);
        }
    }
    const taskEl = card.querySelector('.active-slot-task .task-title-display');
    if (taskEl) {
        taskEl.style.fontSize = '0.78rem';
        fitAdaptiveLabel(taskEl, innerW);
    }
    const timeEl = card.querySelector('.active-slot-time .time-text');
    if (timeEl) {
        timeEl.style.fontSize = '1.5rem';
        fitAdaptiveLabel(timeEl, innerW, 1.5, 0.9);
    }
    const dateEl = card.querySelector('.active-slot-date .date-label');
    if (dateEl) {
        dateEl.style.fontSize = '0.875rem';
        fitAdaptiveLabel(dateEl, innerW, 0.875, 0.65);
    }
}

function fitAllActiveTimerCardLabels() {
    document.querySelectorAll('.timer-card--active').forEach(fitActiveTimerCardLabels);
}

function fitFinishedTimerCardLabels(card) {
    if (!card || !card.classList.contains('is-finished')) return;
    const innerW = Math.max(48, card.clientWidth - 20);
    const slot = card.querySelector('.finished-char-center');
    const badge = card.querySelector('.finished-char-center .char-title-badge');
    if (slot && badge) {
        const maxW = Math.max(36, slot.clientWidth - 2);
        badge.style.overflow = 'visible';
        badge.style.textOverflow = 'unset';
        badge.style.fontSize = '0.68rem';
        fitAdaptiveLabel(badge, maxW, 0.68, 0.52);
    }
    const endEl = card.querySelector('.finished-end-line');
    if (endEl) fitAdaptiveLetterSpacing(endEl, innerW);
    const elapsedEl = card.querySelector('.finished-elapsed-line');
    if (elapsedEl) fitAdaptiveLetterSpacing(elapsedEl, innerW);
    const taskEl = card.querySelector('.finished-row-2 .task-title-display');
    if (taskEl) {
        taskEl.style.fontSize = '0.72rem';
        fitAdaptiveLabel(taskEl, innerW, 0.72, 0.55);
    }
}

function fitAllFinishedTimerCardLabels() {
    document.querySelectorAll('.timer-card.is-finished').forEach(fitFinishedTimerCardLabels);
}

/** 文字列表：角色名、任務名縮字以維持單行 */
function fitListTimerRowLabels() {
    if (!document.documentElement.classList.contains('timer-display-list')) return;
    document.querySelectorAll('.timer-list-row').forEach(row => {
        const info = row.querySelector('.timer-list-info');
        if (!info) return;
        const maxW = Math.max(48, info.clientWidth - 2);
        const charBadge = row.querySelector('.timer-list-charline .char-title-badge');
        if (charBadge) fitAdaptiveLabel(charBadge, maxW, 0.7, 0.52);
        const taskEl = row.querySelector('.timer-list-task');
        if (taskEl) fitAdaptiveLabel(taskEl, maxW, 0.84, 0.58);
    });
}

/** 文字列表：統一任務欄寬，使時間與 × 在各列垂直對齊 */
function syncTimerListSideAlign() {
    if (!document.documentElement.classList.contains('timer-display-list')) return;
    document.querySelectorAll('.timer-list').forEach(list => {
        list.querySelectorAll('.timer-list-row').forEach(row => {
            row.style.setProperty('--timer-list-info-w', 'max-content');
            row.style.gridTemplateColumns = 'max-content max-content 26px';
        });
        fitListTimerRowLabels();
        let maxInfoW = 0;
        list.querySelectorAll('.timer-list-info').forEach(info => {
            maxInfoW = Math.max(maxInfoW, info.scrollWidth);
        });
        const infoCol = maxInfoW > 0 ? `${Math.ceil(maxInfoW)}px` : 'max-content';
        list.querySelectorAll('.timer-list-row').forEach(row => {
            row.style.setProperty('--timer-list-info-w', infoCol);
            row.style.gridTemplateColumns = `${infoCol} max-content 26px`;
        });
    });
    document.querySelectorAll('.timer-list-side').forEach(side => {
        side.style.width = '';
        side.style.minWidth = '';
        side.style.maxWidth = '';
        side.style.textAlign = 'left';
        side.querySelectorAll('.timer-list-time, .timer-list-hint, .timer-list-status').forEach(el => {
            el.style.width = '';
            el.style.maxWidth = '';
            el.style.marginLeft = '';
            el.style.marginRight = '';
            el.style.textAlign = 'left';
        });
    });
    requestAnimationFrame(() => fitListTimerRowLabels());
}

function normalizeConfig() {
    if (!config.tasks || !Array.isArray(config.tasks)) {
        config.tasks = cloneTasks(BUILTIN_DEFAULT_TASKS);
    }
    if (!config.defaultTasks || !Array.isArray(config.defaultTasks) || !config.defaultTasks.length) {
        config.defaultTasks = cloneTasks(config.tasks.length ? config.tasks : BUILTIN_DEFAULT_TASKS);
    }
    if (config.neonGlow === undefined) config.neonGlow = true;
    if (!['clean', 'colorful', 'list'].includes(config.timerDisplay)) config.timerDisplay = 'clean';
    if (config.showAccountHeader === undefined) config.showAccountHeader = true;
    applyNeonGlow();
    applyTimerDisplayMode();
}

function isTimerDisplayList() {
    return config.timerDisplay === 'list';
}

function isTimerDisplayColorful() {
    return config.timerDisplay === 'colorful';
}

function isTimerDisplayClean() {
    return config.timerDisplay === 'clean';
}

function applyTimerDisplayMode() {
    const mode = config.timerDisplay;
    document.documentElement.classList.toggle('timer-display-clean', mode === 'clean');
    document.documentElement.classList.toggle('timer-display-colorful', mode === 'colorful');
    document.documentElement.classList.toggle('timer-display-list', mode === 'list');
}

function setTimerDisplay(mode) {
    config.timerDisplay = (mode === 'colorful' || mode === 'list') ? mode : 'clean';
    applyTimerDisplayMode();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    touchLocalUpdated();
    scheduleCloudSync();
    syncMainTimerDisplayBar();
    refreshMainDisplay();
    renderSidePanel();
}

function isAccountHeaderVisible() {
    return config.showAccountHeader !== false;
}

function setAccountHeaderVisible(show) {
    config.showAccountHeader = !!show;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    touchLocalUpdated();
    scheduleCloudSync();
    refreshMainDisplay();
    renderSidePanel();
}

function renderTimerDisplayTabsHtml() {
    return `<div class="timer-display-header-tabs" role="group" aria-label="${t('timerDisplayLabel')}">
        <button type="button" class="timer-display-tab-btn btn-adjust${isTimerDisplayClean() ? ' btn-toggle-selected' : ''}" onclick="setTimerDisplay('clean')">${t('timerDisplayClean')}</button>
        <button type="button" class="timer-display-tab-btn btn-adjust${isTimerDisplayColorful() ? ' btn-toggle-selected' : ''}" onclick="setTimerDisplay('colorful')">${t('timerDisplayColorful')}</button>
        <button type="button" class="timer-display-tab-btn btn-adjust${isTimerDisplayList() ? ' btn-toggle-selected' : ''}" onclick="setTimerDisplay('list')">${t('timerDisplayList')}</button>
    </div>`;
}

function syncMainTimerDisplayBar() {
    const bar = document.getElementById('mainTimerDisplayBar');
    if (!bar) return;
    bar.innerHTML = renderTimerDisplayTabsHtml();
}

function applyNeonGlow() {
    const on = config.neonGlow !== false;
    document.documentElement.classList.toggle('neon-glow-enabled', on);
}

function setNeonGlow(on) {
    config.neonGlow = !!on;
    applyNeonGlow();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    touchLocalUpdated();
    scheduleCloudSync();
    renderSidePanel();
}

function getUserDefaultTasks() {
    normalizeConfig();
    return cloneTasks(config.defaultTasks);
}

const defaultConfig = {
    colors: { acc: '#64748b', task: '#475569', start: '#4a90e2', sys: '#475569' },
    accounts: [
        { email: '帳號1', characters: ['角色1'], color: '#4a90e2' },
        { email: '帳號2', characters: ['角色2'], color: '#e28743' }
    ],
    tasks: cloneTasks(BUILTIN_DEFAULT_TASKS),
    defaultTasks: cloneTasks(BUILTIN_DEFAULT_TASKS),
    undoTime: 10,
    neonGlow: true,
    timerDisplay: 'clean',
    showAccountHeader: true
};

let config = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultConfig;
if (config.undoTime === undefined) config.undoTime = 10;
if (!localStorage.getItem(STORAGE_KEY)) config = JSON.parse(JSON.stringify(defaultConfig));
normalizeConfig();
applyTimerCardMinWidth();

let undoStack = [];
let undoTimerInterval = null; 
let undoTimeout = null; 
let currentUndoTimeLeft = 0;
let isDispatchingTimers = false;

let cloudSyncTimer = null;
let cloudPollInterval = null;
let isApplyingCloudData = false;
let lastCloudUpdatedAt = 0;
let lastCloudUploadAt = 0;
let supabaseClient = null;
let currentUser = null;
/** @type {'login'|'forgot'|'newPassword'} */
let cloudAuthView = 'login';

function getCloudAuthRedirectUrl() {
    if (location.protocol === 'http:' || location.protocol === 'https:') {
        const path = location.pathname || '/';
        return location.origin + (path.endsWith('/') ? path : path.replace(/\/[^/]*$/, '/') || '/');
    }
    return 'https://sf9600-glitch.github.io/game-timer/';
}

function clearCloudAuthHash() {
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
}

function showCloudForgotPassword() {
    cloudAuthView = 'forgot';
    updateCloudSyncUI('cloudEnterEmailReset');
    renderSidePanel();
}

async function cancelCloudForgotPassword() {
    if (cloudAuthView === 'newPassword') {
        const sb = getSupabase();
        if (sb) await sb.auth.signOut();
        currentUser = null;
        stopCloudPoll();
        clearCloudAuthHash();
    }
    cloudAuthView = 'login';
    updateCloudSyncUI('cloudLoginPrompt');
    renderSidePanel();
}

function isSupabaseConfigured() {
    const url = String(SUPABASE_URL || '').trim();
    const key = String(SUPABASE_ANON_KEY || '').trim();
    return !!(url && key && url.startsWith('https://') && !url.includes('YOUR_'));
}

function getSupabase() {
    if (!isSupabaseConfigured()) return null;
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

function isCloudSyncActive() {
    return !!(getSupabase() && currentUser);
}

async function fetchCloudRecord() {
    const sb = getSupabase();
    if (!sb || !currentUser) return null;
    const { data, error } = await sb
        .from('timer_snapshots')
        .select('payload, updated_at')
        .eq('user_id', currentUser.id)
        .maybeSingle();
    if (error) throw new Error(error.message || '讀取失敗');
    if (!data || !data.payload) return null;
    const payload = data.payload;
    const updatedAt = data.updated_at ? new Date(data.updated_at).getTime() : (payload.updatedAt || 0);
    return { ...payload, updatedAt };
}

async function putCloudRecord(payload) {
    const sb = getSupabase();
    if (!sb || !currentUser) return;
    const updatedAt = new Date(payload.updatedAt || Date.now()).toISOString();
    const { error } = await sb.from('timer_snapshots').upsert({
        user_id: currentUser.id,
        payload,
        updated_at: updatedAt
    }, { onConflict: 'user_id' });
    if (error) throw new Error(error.message || '上傳失敗');
}

function getClientId() {
    const key = 'GameTimer_ClientId';
    let id = localStorage.getItem(key);
    if (!id) {
        id = 'c_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
        localStorage.setItem(key, id);
    }
    return id;
}

function touchLocalUpdated() {
    const t = Date.now();
    localStorage.setItem(LOCAL_UPDATED_KEY, String(t));
    return t;
}

function getLocalUpdatedAt() {
    return parseInt(localStorage.getItem(LOCAL_UPDATED_KEY) || '0', 10) || 0;
}

function getActiveTimers() {
    return JSON.parse(localStorage.getItem(ACTIVE_TIMERS_KEY) || '[]');
}

function setActiveTimers(data, opts = {}) {
    localStorage.setItem(ACTIVE_TIMERS_KEY, JSON.stringify(data));
    touchLocalUpdated();
    if (opts.immediateCloud) flushCloudSyncNow();
    else scheduleCloudSync();
}

function stripSyncNewFlagsForCloud(timers) {
    return (timers || []).map(item => {
        if (!item || item.syncNewUntil == null) return item;
        const { syncNewUntil, ...rest } = item;
        return rest;
    });
}

function isTimerSyncNewBadgeVisible(timer) {
    return !!(timer && timer.syncNewUntil && Date.now() < timer.syncNewUntil);
}

function markTimersNewFromCloud(localTimers, incomingTimers) {
    const localIds = new Set((localTimers || []).map(t => String(t.id)));
    const until = Date.now() + SYNC_NEW_BADGE_MS;
    return (incomingTimers || []).map(t => {
        if (!t || t.id == null) return t;
        if (!localIds.has(String(t.id))) {
            return { ...t, syncNewUntil: until };
        }
        const { syncNewUntil, ...rest } = t;
        return rest;
    });
}

function buildCloudPayload() {
    return {
        config,
        activeTimers: stripSyncNewFlagsForCloud(getActiveTimers()),
        undoStack,
        theme: localStorage.getItem(THEME_KEY) || 'auto',
        lang: currentLang,
        updatedAt: getLocalUpdatedAt(),
        clientId: getClientId()
    };
}

function buildSnapshotPayload() {
    return {
        version: 2,
        config: JSON.parse(JSON.stringify(config)),
        activeTimers: JSON.parse(JSON.stringify(getActiveTimers())),
        undoStack: JSON.parse(JSON.stringify(undoStack)),
        theme: localStorage.getItem(THEME_KEY) || 'auto',
        lang: currentLang
    };
}

function getLocalSnapshots() {
    try {
        const arr = JSON.parse(localStorage.getItem(LOCAL_SNAPSHOTS_KEY) || '[]');
        if (!Array.isArray(arr)) return [];
        return arr.filter(s => s && s.id != null && s.payload).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } catch (_) {
        return [];
    }
}

function persistLocalSnapshots(list) {
    try {
        localStorage.setItem(LOCAL_SNAPSHOTS_KEY, JSON.stringify(list));
    } catch (e) {
        console.error('persistLocalSnapshots', e);
        if (list.length > 10) {
            localStorage.setItem(LOCAL_SNAPSHOTS_KEY, JSON.stringify(list.slice(0, 10)));
        }
    }
}

function saveLocalSnapshot(meta) {
    const createdAt = meta.createdAt || Date.now();
    const entry = {
        id: String(createdAt),
        createdAt,
        label: meta.label || '',
        timerId: meta.timerId != null ? meta.timerId : null,
        payload: buildSnapshotPayload()
    };
    const snapshots = getLocalSnapshots().filter(s => String(s.id) !== entry.id);
    snapshots.unshift(entry);
    persistLocalSnapshots(snapshots.slice(0, LOCAL_SNAPSHOTS_MAX));
}

function formatSnapshotDateTime(ts) {
    const d = new Date(ts);
    const p = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

function escSnapshotText(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function getSnapshotSelectLabel(snapshot) {
    const date = formatSnapshotDateTime(snapshot.createdAt);
    return snapshot.label ? `${date} · ${snapshot.label}` : date;
}

function getRecoveryOptionEntries() {
    const entries = getLocalSnapshots().map(s => ({
        id: `local:${s.id}`,
        source: 'local',
        createdAt: s.createdAt || 0,
        text: `${getSnapshotSelectLabel(s)}　${t('recoverySourceLocal')}`,
        snapshot: s
    }));
    if (isCloudSyncActive() && lastCloudUpdatedAt > 0) {
        entries.push({
            id: 'cloud',
            source: 'cloud',
            createdAt: lastCloudUpdatedAt,
            text: `${formatSnapshotDateTime(lastCloudUpdatedAt)}　${t('recoverySourceCloud')}`,
            snapshot: null
        });
    }
    entries.sort((a, b) => b.createdAt - a.createdAt);
    return entries;
}

function normalizeRecoverySelectionId(entries) {
    if (!entries.length) return null;
    const cur = uiState.selectedRecoverySnapshotId;
    if (cur && entries.some(e => e.id === cur)) return cur;
    return entries[0].id;
}

function getSelectedRecoveryEntry() {
    const sel = document.getElementById('recoverySnapshotSelect');
    if (!sel?.value) return null;
    return getRecoveryOptionEntries().find(e => e.id === sel.value) || null;
}

function getSelectedRecoverySnapshot() {
    const entry = getSelectedRecoveryEntry();
    if (!entry || entry.source !== 'local') return null;
    return entry.snapshot;
}

function applyRecoveryPayload(p) {
    if (!p) return;
    if (p.config) {
        config = JSON.parse(JSON.stringify(p.config));
        normalizeConfig();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    }
    if (Array.isArray(p.undoStack)) {
        undoStack = JSON.parse(JSON.stringify(p.undoStack));
        persistUndoStack({ skipCloud: true });
    }
    if (p.theme) {
        localStorage.setItem(THEME_KEY, p.theme);
        setTheme(p.theme, { skipCloud: true, skipRender: true });
    }
    if (p.lang && I18N[p.lang]) {
        currentLang = p.lang;
        localStorage.setItem(LANG_KEY, p.lang);
        document.documentElement.lang = p.lang;
        document.title = t('appTitle');
    }
    const timers = Array.isArray(p.activeTimers) ? JSON.parse(JSON.stringify(p.activeTimers)) : [];
    setActiveTimers(timers, { immediateCloud: true });
    renderSidePanel();
    refreshMainDisplay();
    dispatchTimersToDOM();
    if (undoStack.length) updateUndoToastText();
}

function applyLocalSnapshot(snapshot) {
    applyRecoveryPayload(snapshot.payload);
}

function syncRecoverySourceNote() {
    const note = document.getElementById('recoverySourceNote');
    if (!note) return;
    const entry = getSelectedRecoveryEntry();
    if (!entry) {
        note.textContent = '';
        return;
    }
    note.textContent = entry.source === 'cloud' ? t('recoverySourceCloud') : t('recoverySourceLocal');
}

async function restoreSelectedSnapshot() {
    const entry = getSelectedRecoveryEntry();
    if (!entry) {
        alert(t('recoveryNoSnapshots'));
        return;
    }
    const date = formatSnapshotDateTime(entry.createdAt);
    if (entry.source === 'cloud') {
        if (!confirm(tp('recoveryCloudRestoreConfirm', { date }))) return;
        try {
            const cloud = await fetchCloudRecord();
            if (!cloud) {
                alert(t('recoveryCloudEmpty'));
                return;
            }
            applyRecoveryPayload(cloud);
            alert(t('alertSnapshotRestored'));
        } catch (e) {
            console.error(e);
            alert(tp('alertSyncFailed', { msg: e.message || e }));
        }
        return;
    }
    if (!confirm(tp('confirmRestoreSnapshot', { date }))) return;
    applyLocalSnapshot(entry.snapshot);
    alert(t('alertSnapshotRestored'));
}

function renderRecoveryPanelHtml() {
    const entries = getRecoveryOptionEntries();
    const recOpen = uiState.recoveryExpanded ? ' recovery-panel--open' : '';
    const recActive = uiState.recoveryExpanded ? ' active' : '';
    uiState.selectedRecoverySnapshotId = normalizeRecoverySelectionId(entries);
    const retentionHint = tp('recoveryRetentionHint', { max: LOCAL_SNAPSHOTS_MAX });
    let bodyInner;
    if (!entries.length) {
        bodyInner = `<p class="recovery-empty">${t('recoveryNoSnapshots')}</p>`;
    } else {
        const opts = entries.map(e => {
            const sel = e.id === uiState.selectedRecoverySnapshotId ? ' selected' : '';
            return `<option value="${escSnapshotText(e.id)}"${sel}>${escSnapshotText(e.text)}</option>`;
        }).join('');
        const first = entries.find(e => e.id === uiState.selectedRecoverySnapshotId) || entries[0];
        const sourceNote = first.source === 'cloud' ? t('recoverySourceCloud') : t('recoverySourceLocal');
        bodyInner = `<select id="recoverySnapshotSelect" class="recovery-version-select" onchange="uiState.selectedRecoverySnapshotId=this.value;syncRecoverySourceNote()">${opts}</select>
            <p class="recovery-source-note" id="recoverySourceNote">${escSnapshotText(sourceNote)}</p>
            <button type="button" class="btn-adjust recovery-restore-btn" onclick="restoreSelectedSnapshot()">${t('recoveryRestoreVersion')}</button>`;
    }
    bodyInner += `<p class="recovery-retention-hint">${escSnapshotText(retentionHint)}</p>`;
    return `<div class="recovery-panel${recOpen}" id="recoveryPanel">
        <div class="recovery-panel-title" role="button" tabindex="0" onclick="toggleRecoveryPanel()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleRecoveryPanel();}" aria-expanded="${uiState.recoveryExpanded}">
            <span>${t('recoveryTitle')}</span>
            <span class="recovery-panel-chevron" aria-hidden="true">›</span>
        </div>
        <div id="recoveryPanelBody" class="recovery-panel-body collapsible-content${recActive}"><div>${bodyInner}</div></div>
    </div>`;
}

/** 本機從未標記更新時間（0）且雲端有資料時，應優先採用雲端 */
function shouldPreferCloudOnMerge(cloudPayload) {
    const localAt = getLocalUpdatedAt();
    const cloudAt = cloudPayload.updatedAt || 0;
    if (localAt > 0) return false;
    if (cloudAt <= 0) return false;
    const cloudTimers = Array.isArray(cloudPayload.activeTimers) ? cloudPayload.activeTimers : [];
    return cloudTimers.length > 0 || !!cloudPayload.config;
}

/** 雲端含有本機沒有的計時器（另一台裝置新增） */
function cloudHasTimersNotInLocal(cloudPayload) {
    const cloudTimers = Array.isArray(cloudPayload.activeTimers) ? cloudPayload.activeTimers : [];
    if (!cloudTimers.length) return false;
    const localIds = new Set(getActiveTimers().map(t => String(t.id)));
    return cloudTimers.some(t => t && !localIds.has(String(t.id)));
}

/** 合併兩邊進行中計時器（依 id）；同 id 保留結束時間較晚者 */
function mergeActiveTimersUnion(localTimers, cloudTimers) {
    const map = new Map();
    const ingest = (t) => {
        if (!t || t.id == null) return;
        const id = String(t.id);
        const prev = map.get(id);
        if (!prev) {
            map.set(id, t);
            return;
        }
        const prevEnd = new Date(prev.finishDate || 0).getTime();
        const nextEnd = new Date(t.finishDate || 0).getTime();
        if (nextEnd >= prevEnd) map.set(id, t);
    };
    (localTimers || []).forEach(ingest);
    (cloudTimers || []).forEach(ingest);
    return [...map.values()];
}

function activeTimersNeedMerge(localTimers, cloudTimers) {
    const local = localTimers || [];
    const cloud = cloudTimers || [];
    const localIds = new Set(local.map(t => String(t.id)));
    const cloudIds = new Set(cloud.map(t => String(t.id)));
    if (cloud.some(t => t && !localIds.has(String(t.id)))) return true;
    if (local.some(t => t && !cloudIds.has(String(t.id)))) return true;
    return false;
}

/** 登入／立即同步：合併設定與計時器，避免舊本機整包蓋掉新雲端 */
function buildMergedSyncPayload(cloudPayload, localPayload) {
    const cloudAt = cloudPayload?.updatedAt || 0;
    const localAt = localPayload?.updatedAt || 0;
    const preferCloudMeta = cloudAt >= localAt;
    const meta = preferCloudMeta ? cloudPayload : localPayload;
    const metaAlt = preferCloudMeta ? localPayload : cloudPayload;
    const mergedTimers = mergeActiveTimersUnion(
        localPayload?.activeTimers || [],
        cloudPayload?.activeTimers || []
    );
    return {
        config: meta.config || metaAlt.config || config,
        activeTimers: mergedTimers,
        undoStack: preferCloudMeta
            ? (Array.isArray(cloudPayload.undoStack) ? cloudPayload.undoStack : undoStack)
            : (Array.isArray(localPayload.undoStack) ? localPayload.undoStack : undoStack),
        theme: meta.theme || metaAlt.theme || localStorage.getItem(THEME_KEY) || 'auto',
        lang: meta.lang || metaAlt.lang || currentLang,
        updatedAt: Math.max(cloudAt, localAt),
        clientId: getClientId()
    };
}

async function applyMergedCloudSync(cloudPayload, localPayload, statusKey) {
    const localBefore = getActiveTimers();
    const merged = buildMergedSyncPayload(cloudPayload, localPayload);
    merged.activeTimers = markTimersNewFromCloud(localBefore, merged.activeTimers);
    applyCloudPayload(merged);
    const updatedAt = touchLocalUpdated();
    await putCloudRecord({
        ...merged,
        activeTimers: stripSyncNewFlagsForCloud(merged.activeTimers),
        updatedAt
    });
    lastCloudUploadAt = Date.now();
    lastCloudUpdatedAt = updatedAt;
    updateCloudSyncUI(statusKey);
}

function updateCloudSyncUI(key) {
    if (key !== undefined) cloudSyncStatusKey = key;
    const el = document.getElementById('cloudSyncStatus');
    if (el) el.textContent = t(cloudSyncStatusKey);
    const meta = document.getElementById('cloudSyncPanelMeta');
    if (meta) meta.textContent = getCloudSyncPanelMetaText();
}

function getCloudSyncPanelMetaText() {
    if (!isSupabaseConfigured()) return t('cloudBackendNotConfigured');
    if (currentUser) return t(cloudSyncStatusKey);
    if (cloudAuthView === 'newPassword') return t('cloudResetTitle');
    if (cloudAuthView === 'forgot') return t('cloudForgotTitle');
    return t('cloudSignIn');
}

function wrapCloudSyncPanel(innerHtml, boxClass = 'cloud-sync-box') {
    const panelOpen = uiState.cloudSyncExpanded ? ' cloud-sync-panel--open' : '';
    const panelActive = uiState.cloudSyncExpanded ? ' active' : '';
    const meta = getCloudSyncPanelMetaText();
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    return `<div class="cloud-sync-panel${panelOpen}" id="cloudSyncPanel">
        <div class="cloud-sync-panel-title" role="button" tabindex="0" onclick="toggleCloudSyncPanel()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleCloudSyncPanel();}" aria-expanded="${uiState.cloudSyncExpanded}">
            <span class="cloud-sync-panel-title-text">${t('cloudTitle')}</span>
            <span class="cloud-sync-panel-meta" id="cloudSyncPanelMeta">${esc(meta)}</span>
            <span class="cloud-sync-panel-chevron" aria-hidden="true">›</span>
        </div>
        <div id="cloudSyncPanelBody" class="cloud-sync-panel-body collapsible-content${panelActive}"><div>
            <div class="${boxClass}">${innerHtml}</div>
        </div></div>
    </div>`;
}

function applyCloudPayload(data) {
    if (!data) return;
    isApplyingCloudData = true;
    try {
        if (data.config) {
            config = data.config;
            if (config.undoTime === undefined) config.undoTime = 10;
            normalizeConfig();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
        }
        if (data.activeTimers) {
            localStorage.setItem(ACTIVE_TIMERS_KEY, JSON.stringify(data.activeTimers));
        }
        if (data.undoStack) {
            undoStack = Array.isArray(data.undoStack) ? data.undoStack : [];
            persistUndoStack({ skipCloud: true });
        }
        if (data.theme) {
            localStorage.setItem(THEME_KEY, data.theme);
            setTheme(data.theme, { skipCloud: true, skipRender: true });
        }
        if (data.lang && I18N[data.lang]) {
            currentLang = data.lang;
            localStorage.setItem(LANG_KEY, data.lang);
            document.documentElement.lang = data.lang;
            document.title = t('appTitle');
            if (undoStack.length) updateUndoToastText();
        }
        if (data.updatedAt) {
            localStorage.setItem(LOCAL_UPDATED_KEY, String(data.updatedAt));
            lastCloudUpdatedAt = data.updatedAt;
        }
        renderSidePanel();
        refreshMainDisplay();
        dispatchTimersToDOM();
    } finally {
        isApplyingCloudData = false;
    }
}

async function uploadToCloud() {
    if (!isCloudSyncActive() || isApplyingCloudData) return;
    const updatedAt = touchLocalUpdated();
    const payload = { ...buildCloudPayload(), updatedAt };
    await putCloudRecord(payload);
    lastCloudUploadAt = Date.now();
    lastCloudUpdatedAt = updatedAt;
    updateCloudSyncUI('cloudSynced');
    await syncPushScheduleToServer().catch(err => console.warn('push schedule after upload', err));
}

function scheduleCloudSync() {
    if (!isCloudSyncActive() || isApplyingCloudData) return;
    updateCloudSyncUI('cloudSyncing');
    clearTimeout(cloudSyncTimer);
    cloudSyncTimer = setTimeout(() => {
        uploadToCloud().catch(err => {
            console.error(err);
            updateCloudSyncUI('cloudSyncFailed');
        });
    }, 600);
}

function flushCloudSyncNow() {
    if (!isCloudSyncActive() || isApplyingCloudData) return;
    clearTimeout(cloudSyncTimer);
    return uploadToCloud().catch(err => {
        console.error(err);
        updateCloudSyncUI('cloudSyncFailed');
    });
}

async function mergeCloudFromRemote() {
    if (!isCloudSyncActive()) return;
    updateCloudSyncUI('cloudLoading');
    const cloudPayload = await fetchCloudRecord();
    const localPayload = buildCloudPayload();

    if (!cloudPayload) {
        await uploadToCloud();
        updateCloudSyncUI('cloudUploadedLocal');
        return;
    }

    lastCloudUpdatedAt = cloudPayload.updatedAt || 0;
    const localTimers = localPayload.activeTimers || [];
    const cloudTimers = cloudPayload.activeTimers || [];
    const needsMerge = activeTimersNeedMerge(localTimers, cloudTimers);

    if (!needsMerge && (cloudPayload.updatedAt || 0) === (localPayload.updatedAt || 0)) {
        updateCloudSyncUI('cloudInSync');
        return;
    }

    const statusKey = needsMerge ? 'cloudMerged'
        : ((cloudPayload.updatedAt || 0) > (localPayload.updatedAt || 0) ? 'cloudRestoredNewer' : 'cloudSynced');
    await applyMergedCloudSync(cloudPayload, localPayload, statusKey);
}

function stopCloudPoll() {
    if (cloudPollInterval) {
        clearInterval(cloudPollInterval);
        cloudPollInterval = null;
    }
}

async function pullCloudIfNewer() {
    if (!isCloudSyncActive() || isApplyingCloudData) return;
    const cloudPayload = await fetchCloudRecord();
    if (!cloudPayload) return;
    const cloudAt = cloudPayload.updatedAt || 0;
    if (cloudPayload.clientId === getClientId() && cloudAt <= lastCloudUploadAt + 2000) return;

    const localPayload = buildCloudPayload();
    const needsMerge = activeTimersNeedMerge(localPayload.activeTimers, cloudPayload.activeTimers);
    const cloudNewer = cloudAt > getLocalUpdatedAt();
    if (!needsMerge && !cloudNewer && cloudAt <= lastCloudUpdatedAt) return;

    if (!needsMerge && cloudNewer && cloudAt > lastCloudUpdatedAt) {
        const localBefore = getActiveTimers();
        applyCloudPayload({
            ...cloudPayload,
            activeTimers: markTimersNewFromCloud(localBefore, cloudPayload.activeTimers)
        });
        lastCloudUpdatedAt = cloudAt;
        updateCloudSyncUI('cloudUpdatedFromOther');
        return;
    }

    if (needsMerge || cloudNewer || shouldPreferCloudOnMerge(cloudPayload)) {
        await applyMergedCloudSync(cloudPayload, localPayload, needsMerge ? 'cloudMerged' : 'cloudUpdatedFromOther');
    } else if (cloudAt > lastCloudUpdatedAt) {
        lastCloudUpdatedAt = cloudAt;
    }
}

function startCloudPoll() {
    stopCloudPoll();
    if (!isCloudSyncActive()) return;
    cloudPollInterval = setInterval(() => {
        if (isApplyingCloudData || document.visibilityState === 'hidden') return;
        pullCloudIfNewer().catch(() => {});
    }, 20000);
}

async function syncNowCloud() {
    if (!isCloudSyncActive()) {
        alert(t('alertLoginFirst'));
        return;
    }
    try {
        await mergeCloudFromRemote();
    } catch (e) {
        console.error(e);
        updateCloudSyncUI('cloudSyncFailed');
        alert(tp('alertSyncFailed', { msg: e.message || e }));
    }
}

async function signInFromUI() {
    const sb = getSupabase();
    if (!sb) { alert(t('alertSupabaseNotSet')); return; }
    const email = document.getElementById('cloudEmail')?.value.trim();
    const password = document.getElementById('cloudPassword')?.value;
    if (!email || !password) { alert(t('alertEnterEmailPassword')); return; }
    updateCloudSyncUI('cloudSigningIn');
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) {
        updateCloudSyncUI('cloudSignInFailed');
        alert(error.message);
        return;
    }
    const { data: { session } } = await sb.auth.getSession();
    currentUser = session?.user ?? null;
    await mergeCloudFromRemote();
    startCloudPoll();
    await setupBackgroundPushAfterLogin();
    renderSidePanel();
}

async function signUpFromUI() {
    const sb = getSupabase();
    if (!sb) { alert(t('alertSupabaseNotSet')); return; }
    const email = document.getElementById('cloudEmail')?.value.trim();
    const password = document.getElementById('cloudPassword')?.value;
    if (!email || !password) { alert(t('alertEnterEmailPassword')); return; }
    if (password.length < 6) { alert(t('alertPasswordMin6')); return; }
    updateCloudSyncUI('cloudSigningUp');
    const { data, error } = await sb.auth.signUp({ email, password });
    if (error) {
        updateCloudSyncUI('cloudSignUpFailed');
        alert(error.message);
        return;
    }
    if (data.session) {
        currentUser = data.user;
        await mergeCloudFromRemote();
        startCloudPoll();
        await setupBackgroundPushAfterLogin();
        renderSidePanel();
        return;
    }
    alert(t('alertSignUpSuccess'));
    updateCloudSyncUI('cloudVerifyEmail');
}

async function signOutCloud() {
    const sb = getSupabase();
    if (sb) await sb.auth.signOut();
    currentUser = null;
    cloudAuthView = 'login';
    stopCloudPoll();
    updateCloudSyncUI('cloudSignedOut');
    renderSidePanel();
}

async function sendPasswordResetFromUI() {
    const sb = getSupabase();
    if (!sb) { alert(t('alertSupabaseNotSet')); return; }
    const email = document.getElementById('cloudEmail')?.value.trim();
    if (!email) { alert(t('alertEnterRegisteredEmail')); return; }
    updateCloudSyncUI('cloudSendingReset');
    const redirectTo = getCloudAuthRedirectUrl();
    const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) {
        updateCloudSyncUI('cloudSendResetFailed');
        alert(error.message);
        return;
    }
    alert(t('alertResetEmailSent'));
    cloudAuthView = 'login';
    updateCloudSyncUI('cloudResetSent');
    renderSidePanel();
}

async function confirmNewPasswordFromUI() {
    const sb = getSupabase();
    if (!sb) { alert(t('alertSupabaseNotSetShort')); return; }
    const p1 = document.getElementById('cloudNewPassword')?.value || '';
    const p2 = document.getElementById('cloudNewPassword2')?.value || '';
    if (p1.length < 6) { alert(t('alertPasswordMin6')); return; }
    if (p1 !== p2) { alert(t('alertPasswordMismatch')); return; }
    updateCloudSyncUI('cloudUpdatingPassword');
    const { error } = await sb.auth.updateUser({ password: p1 });
    if (error) {
        updateCloudSyncUI('cloudUpdatePasswordFailed');
        alert(error.message);
        return;
    }
    clearCloudAuthHash();
    cloudAuthView = 'login';
    const { data: { session } } = await sb.auth.getSession();
    currentUser = session?.user ?? null;
    if (currentUser) {
        try {
            await mergeCloudFromRemote();
            startCloudPoll();
            if (Notification.permission === 'granted') {
                await ensureWebPushSubscription().catch(e => console.warn('push after login', e));
            }
        } catch (e) {
            console.error(e);
        }
    }
    updateCloudSyncUI('cloudPasswordUpdated');
    alert(t('alertPasswordUpdated'));
    renderSidePanel();
}

function renderCloudSyncHtml() {
    const status = t(cloudSyncStatusKey);
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    if (!isSupabaseConfigured()) {
        return wrapCloudSyncPanel(
            `<p class="cloud-sync-hint">${t('cloudHintUnconfigured')}</p>
            <div class="cloud-status-line" id="cloudSyncStatus">${t('cloudBackendNotConfigured')}</div>`,
            'cloud-sync-box cloud-sync-unconfigured'
        );
    }
    const loggedIn = !!currentUser;
    const email = loggedIn ? (currentUser.email || t('cloudLoggedInShort')) : '';
    if (loggedIn) {
        return wrapCloudSyncPanel(
            `<p class="cloud-sync-hint">${t('cloudHintLoggedIn')}</p>
            <div class="cloud-user-line" title="${esc(email)}">${esc(email)}</div>
            <div class="cloud-status-line" id="cloudSyncStatus">${status}</div>
            <div class="cloud-auth-row" style="margin-top:8px;">
                <button type="button" class="btn-adjust" onclick="syncNowCloud()">${t('cloudSyncNow')}</button>
                <button type="button" class="btn-adjust" onclick="signOutCloud()" style="color:var(--danger);">${t('cloudSignOut')}</button>
            </div>`
        );
    }
    if (cloudAuthView === 'newPassword') {
        return wrapCloudSyncPanel(
            `<p class="cloud-sync-hint">${t('cloudHintNewPassword')}</p>
            <input type="password" id="cloudNewPassword" placeholder="${t('cloudNewPasswordPh')}" autocomplete="new-password" style="width:100%; margin-bottom:6px; font-size:0.72rem;">
            <input type="password" id="cloudNewPassword2" placeholder="${t('cloudNewPassword2Ph')}" autocomplete="new-password" style="width:100%; margin-bottom:6px; font-size:0.72rem;">
            <div class="cloud-status-line" id="cloudSyncStatus">${status}</div>
            <div class="cloud-auth-row">
                <button type="button" class="btn-adjust" onclick="confirmNewPasswordFromUI()">${t('cloudSavePassword')}</button>
                <button type="button" class="btn-adjust" onclick="cancelCloudForgotPassword()">${t('cloudCancel')}</button>
            </div>`,
            'cloud-sync-box'
        );
    }
    if (cloudAuthView === 'forgot') {
        return wrapCloudSyncPanel(
            `<p class="cloud-sync-hint">${t('cloudHintForgot')}</p>
            <input type="email" id="cloudEmail" placeholder="Email" autocomplete="username" style="width:100%; margin-bottom:6px; font-size:0.72rem;">
            <div class="cloud-status-line" id="cloudSyncStatus">${status}</div>
            <div class="cloud-auth-row">
                <button type="button" class="btn-adjust" onclick="sendPasswordResetFromUI()">${t('cloudSendReset')}</button>
                <button type="button" class="btn-adjust" onclick="cancelCloudForgotPassword()">${t('cloudBackLogin')}</button>
            </div>`,
            'cloud-sync-box'
        );
    }
    return wrapCloudSyncPanel(
        `<p class="cloud-sync-hint">${t('cloudHintLogin')}</p>
        <input type="email" id="cloudEmail" placeholder="Email" autocomplete="username" style="width:100%; margin-bottom:6px; font-size:0.72rem;">
        <input type="password" id="cloudPassword" placeholder="${t('cloudPasswordPh')}" autocomplete="current-password" style="width:100%; margin-bottom:6px; font-size:0.72rem;">
        <button type="button" class="cloud-forgot-link" onclick="showCloudForgotPassword()">${t('cloudForgotLink')}</button>
        <div class="cloud-status-line" id="cloudSyncStatus">${status}</div>
        <div class="cloud-auth-row">
            <button type="button" class="btn-adjust" onclick="signInFromUI()">${t('cloudSignIn')}</button>
            <button type="button" class="btn-adjust" onclick="signUpFromUI()">${t('cloudSignUp')}</button>
        </div>`,
        'cloud-sync-box cloud-sync-unconfigured'
    );
}

async function initCloudSync() {
    const sb = getSupabase();
    if (!sb) {
        updateCloudSyncUI('cloudBackendNotConfigured');
        return;
    }
    const { data: { session }, error } = await sb.auth.getSession();
    if (error) console.error('getSession', error);
    currentUser = session?.user ?? null;
    if (currentUser) {
        try {
            await mergeCloudFromRemote();
            startCloudPoll();
            updateCloudSyncUI('cloudLoggedIn');
            await setupBackgroundPushAfterLogin();
        } catch (err) {
            console.error(err);
            updateCloudSyncUI('cloudLoadFailed');
        }
    } else {
        updateCloudSyncUI('cloudLoginPrompt');
    }

    sb.auth.onAuthStateChange(async (event, session) => {
        currentUser = session?.user ?? null;
        if (event === 'PASSWORD_RECOVERY') {
            cloudAuthView = 'newPassword';
            updateCloudSyncUI('cloudSetNewPassword');
        } else if (event === 'SIGNED_OUT') {
            stopCloudPoll();
            cloudAuthView = 'login';
            updateCloudSyncUI('cloudSignedOut');
        } else if (currentUser && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
            if (cloudAuthView !== 'newPassword') {
                try {
                    await mergeCloudFromRemote();
                    startCloudPoll();
                    if (event === 'SIGNED_IN') updateCloudSyncUI('cloudLoggedIn');
                    await setupBackgroundPushAfterLogin();
                } catch (e) {
                    console.error(e);
                    updateCloudSyncUI('cloudLoadFailed');
                }
            }
        }
        renderSidePanel();
    });
}

function getLiteColorSpectrum(hex) {
    if(!hex) hex = '#475569';
    hex = hex.replace('#', '');
    if(hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    let r = parseInt(hex.substring(0,2), 16), g = parseInt(hex.substring(2,4), 16), b = parseInt(hex.substring(4,6), 16);
    
    let lr = Math.round(r + (255 - r) * 0.65); let lg = Math.round(g + (255 - g) * 0.65); let lb = Math.round(b + (255 - b) * 0.65);
    let br = Math.round(r + (255 - r) * 0.85); let bg = Math.round(g + (255 - g) * 0.85); let bb = Math.round(b + (255 - b) * 0.85);
    /* 進度條：降低漂向白色的比例，讓底色更深、更易辨識 */
    let pr = Math.round(r + (255 - r) * 0.52); let pg = Math.round(g + (255 - g) * 0.52); let pb = Math.round(b + (255 - b) * 0.52);
    let dr = Math.round(r * 0.7), dg = Math.round(g * 0.7), db = Math.round(b * 0.7);
    
    const badgeBg = `rgb(${br}, ${bg}, ${bb})`;
    const progress = `rgb(${pr}, ${pg}, ${pb})`;
    const badgeL = getRelativeLuminance(br, bg, bb);
    const rawL = getRelativeLuminance(r, g, b);
    let subText = `rgb(${dr}, ${dg}, ${db})`;
    let subBorder = `color-mix(in srgb, rgb(${r}, ${g}, ${b}) 48%, #64748b)`;
    if (badgeL > 0.68 || rawL > 0.58) {
        const shade = 0.38;
        const edge = 0.52;
        subText = `rgb(${Math.round(r * shade)}, ${Math.round(g * shade)}, ${Math.round(b * shade)})`;
        subBorder = `rgb(${Math.round(r * edge)}, ${Math.round(g * edge)}, ${Math.round(b * edge)})`;
    }
    return {
        raw: `rgb(${r}, ${g}, ${b})`, lite: `rgb(${lr}, ${lg}, ${lb})`,
        badgeBg, progress, dark: `rgb(${dr}, ${dg}, ${db})`,
        subText, subBorder,
        badgeText: getContrastTextColor(badgeBg),
        progressText: getContrastTextColor(progress)
    };
}

function parseColorToRgb(color) {
    if (!color) return { r: 128, g: 128, b: 128 };
    if (color.startsWith('#')) {
        let hex = color.replace('#', '');
        if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        return { r: parseInt(hex.slice(0,2), 16), g: parseInt(hex.slice(2,4), 16), b: parseInt(hex.slice(4,6), 16) };
    }
    const m = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (m) return { r: +m[1], g: +m[2], b: +m[3] };
    return { r: 128, g: 128, b: 128 };
}

function getRelativeLuminance(r, g, b) {
    const lin = [r, g, b].map(c => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

/** 依背景亮度回傳深色或淺色字（WCAG 相對亮度） */
function getContrastTextColor(bgColor, opts = {}) {
    const { r, g, b } = parseColorToRgb(bgColor);
    const L = getRelativeLuminance(r, g, b);
    const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
    const lightText = '#ffffff';
    const darkText = isDarkTheme ? '#f8fafc' : '#0f172a';
    if (opts.muted) {
        return L > 0.52
            ? (isDarkTheme ? '#94a3b8' : '#475569')
            : 'rgba(255,255,255,0.85)';
    }
    return L > 0.52 ? darkText : lightText;
}

function getCardSurfaceRgb() {
    const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
    return isDarkTheme ? { r: 19, g: 28, b: 46 } : { r: 255, g: 255, b: 255 };
}

function blendRgb(a, b, ratio) {
    return {
        r: Math.round(a.r * (1 - ratio) + b.r * ratio),
        g: Math.round(a.g * (1 - ratio) + b.g * ratio),
        b: Math.round(a.b * (1 - ratio) + b.b * ratio)
    };
}

function applyTimerCardReadableText(card, taskHex, pPercent, isFinished) {
    const timeEl = card.querySelector('.time-text');
    const dateEl = card.querySelector('.date-label');
    if (!timeEl || !dateEl) return;
    if (isFinished || card.classList.contains('is-finished') || card.classList.contains('is-warning-blinking') || card.classList.contains('timer-card--active') || card.classList.contains('timer-list-row')) {
        timeEl.style.color = '';
        if (dateEl) dateEl.style.color = '';
        return;
    }
    const spectrum = getLiteColorSpectrum(taskHex);
    const progressRgb = parseColorToRgb(spectrum.progress);
    const cardRgb = getCardSurfaceRgb();
    const blendRatio = Math.min(1, (pPercent / 100) * 0.9);
    const surface = blendRgb(cardRgb, progressRgb, blendRatio);
    const surfaceStr = `rgb(${surface.r}, ${surface.g}, ${surface.b})`;
    timeEl.style.color = getContrastTextColor(surfaceStr);
    dateEl.style.color = getContrastTextColor(surfaceStr, { muted: true });
}

function setTheme(theme, opts = {}) {
    theme === 'auto' ? document.documentElement.removeAttribute('data-theme') : document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    if (!opts.skipCloud) {
        touchLocalUpdated();
        scheduleCloudSync();
    }
    updateTimersDataTicker();
    if (!opts.skipRender) renderSidePanel();
}
if (localStorage.getItem(THEME_KEY)) setTheme(localStorage.getItem(THEME_KEY), { skipCloud: true, skipRender: true });

function toggleRecoveryPanel() {
    uiState.recoveryExpanded = !uiState.recoveryExpanded;
    const panel = document.getElementById('recoveryPanel');
    const body = document.getElementById('recoveryPanelBody');
    if (panel) panel.classList.toggle('recovery-panel--open', uiState.recoveryExpanded);
    if (body) body.classList.toggle('active', uiState.recoveryExpanded);
}

function toggleNotifySetupPanel() {
    uiState.notifySetupExpanded = !uiState.notifySetupExpanded;
    const panel = document.getElementById('notifySetupPanel');
    const body = document.getElementById('notifySetupPanelBody');
    if (panel) panel.classList.toggle('notify-setup-panel--open', uiState.notifySetupExpanded);
    if (body) body.classList.toggle('active', uiState.notifySetupExpanded);
    const title = panel?.querySelector('.notify-setup-panel-title');
    if (title) title.setAttribute('aria-expanded', uiState.notifySetupExpanded ? 'true' : 'false');
    if (uiState.notifySetupExpanded) initNotifyPermissionPressButtons();
}

function toggleCloudSyncPanel() {
    uiState.cloudSyncExpanded = !uiState.cloudSyncExpanded;
    const panel = document.getElementById('cloudSyncPanel');
    const body = document.getElementById('cloudSyncPanelBody');
    if (panel) panel.classList.toggle('cloud-sync-panel--open', uiState.cloudSyncExpanded);
    if (body) body.classList.toggle('active', uiState.cloudSyncExpanded);
    const title = panel?.querySelector('.cloud-sync-panel-title');
    if (title) title.setAttribute('aria-expanded', uiState.cloudSyncExpanded ? 'true' : 'false');
}

function syncCollapsibleClasses() {
    SECTION_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', uiState.openSection === id);
    });
    syncStartSectionHeaderState();
}

function smartToggle(id) {
    if (!SECTION_IDS.includes(id)) return;

    const prevSection = uiState.openSection;
    const leavingTask = prevSection === 'taskContent' && id !== 'taskContent';
    const hadOpenTaskSubs = uiState.allTasksExpanded || uiState.editingTaskIdx !== null
        || !!document.querySelector('.sub-edit-panel.open');

    uiState.openSection = (uiState.openSection === id) ? null : id;

    if (uiState.openSection !== 'taskContent') {
        uiState.allTasksExpanded = false;
        uiState.editingTaskIdx = null;
        uiState.collapsedTaskIndices.clear();
    }

    syncCollapsibleClasses();
    syncStartContentExpandedState();
    if (uiState.openSection === 'startContent') {
        mountStartContent();
        if (id === 'startContent') {
            document.getElementById('sec-start')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    if (leavingTask || hadOpenTaskSubs) {
        document.querySelectorAll('.sub-edit-panel.open').forEach(el => el.classList.remove('open'));
    }

    if (hadOpenTaskSubs && uiState.openSection !== 'taskContent') {
        if (onboardingActive) syncSubEditPanels();
        else setTimeout(() => renderSidePanel(), 320);
    }
}

function isTaskSubPanelOpen(i) {
    if (uiState.allTasksExpanded) return !uiState.collapsedTaskIndices.has(i);
    return uiState.editingTaskIdx === i;
}

function syncSubEditPanels() {
    document.querySelectorAll('.sub-edit-panel').forEach(el => {
        const m = el.id.match(/^sub-edit-(\d+)$/);
        if (!m) return;
        const i = parseInt(m[1], 10);
        el.classList.toggle('open', isTaskSubPanelOpen(i));
    });
}

function updateExpandAllButtonLabel() {
    const btn = document.getElementById('btn-expand-all-tasks');
    if (btn) btn.textContent = uiState.allTasksExpanded ? '收合全部' : '展開全部';
}

function toggleExpandAllTasks() {
    uiState.allTasksExpanded = !uiState.allTasksExpanded;
    uiState.collapsedTaskIndices.clear();
    if (uiState.allTasksExpanded) uiState.editingTaskIdx = null;
    syncSubEditPanels();
    updateExpandAllButtonLabel();
}

function toggleEditTask(i) {
    if (uiState.allTasksExpanded) {
        if (uiState.collapsedTaskIndices.has(i)) uiState.collapsedTaskIndices.delete(i);
        else uiState.collapsedTaskIndices.add(i);
        syncSubEditPanels();
        return;
    }
    uiState.editingTaskIdx = (uiState.editingTaskIdx === i) ? null : i;
    syncSubEditPanels();
}

function updateCharColor(accIdx, charIdx, color) {
    let char = config.accounts[accIdx].characters[charIdx];
    if (typeof char === 'string') config.accounts[accIdx].characters[charIdx] = { name: char, color: color };
    else char.color = color;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    touchLocalUpdated();
    scheduleCloudSync();
    renderSidePanel(); refreshMainDisplay(); 
}

function getCharColor(accEmail, charName) {
    let acc = config.accounts.find(a => a.email === accEmail);
    if (!acc) return '#94a3b8';
    let char = acc.characters.find(c => (typeof c === 'string' ? c : c.name) === charName);
    return char && char.color ? char.color : '#94a3b8';
}

function handleDragStart(e, index) {
    if (e.target.closest('.sub-tag-item')) return;
    dragSourceTaskIdx = index;
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => { e.currentTarget.style.opacity = '0.4'; }, 0);
}
function handleDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; return false; }
function handleDragEnter(e) { let box = e.target.closest('.tag-item-box'); if(box && !e.target.closest('.sub-tag-item')) box.classList.add('drag-over'); }
function handleDragLeave(e) { let box = e.target.closest('.tag-item-box'); if(box) box.classList.remove('drag-over'); }
function handleDrop(e, targetIndex) {
    e.preventDefault();
    if (e.target.closest('.sub-tag-item')) return false;
    let box = e.target.closest('.tag-item-box');
    if(box) box.classList.remove('drag-over');
    if (dragSourceTaskIdx !== null && dragSourceTaskIdx !== targetIndex) {
        let tasks = config.tasks;
        let dragged = tasks.splice(dragSourceTaskIdx, 1)[0];
        tasks.splice(targetIndex, 0, dragged);
        saveConfig();
    }
    return false;
}
function handleDragEnd(e) {
    if (e.target.closest('.sub-tag-item')) return;
    e.currentTarget.style.opacity = '1';
    dragSourceTaskIdx = null;
    document.querySelectorAll('.tag-item-box').forEach(el => el.classList.remove('drag-over'));
}

function handleSubDragStart(e, taskIdx, subIdx) {
    e.stopPropagation();
    dragSourceSub = { taskIdx, subIdx };
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => { e.currentTarget.style.opacity = '0.4'; }, 0);
}
function handleSubDragOver(e) { e.preventDefault(); e.stopPropagation(); e.dataTransfer.dropEffect = 'move'; return false; }
function handleSubDragEnter(e) {
    e.stopPropagation();
    const el = e.target.closest('.sub-tag-item');
    if (el) el.classList.add('drag-over');
}
function handleSubDragLeave(e) {
    e.stopPropagation();
    const el = e.target.closest('.sub-tag-item');
    if (el) el.classList.remove('drag-over');
}
function handleSubDrop(e, taskIdx, targetSubIdx) {
    e.preventDefault();
    e.stopPropagation();
    document.querySelectorAll('.sub-tag-item').forEach(el => el.classList.remove('drag-over'));
    const { taskIdx: srcTask, subIdx: srcSub } = dragSourceSub;
    if (srcTask === null || srcSub === null || srcTask !== taskIdx || srcSub === targetSubIdx) return false;
    const subs = config.tasks[taskIdx].subs;
    const dragged = subs.splice(srcSub, 1)[0];
    subs.splice(targetSubIdx, 0, dragged);
    saveConfig();
    return false;
}
function handleSubDragEnd(e) {
    e.stopPropagation();
    e.currentTarget.style.opacity = '1';
    dragSourceSub = { taskIdx: null, subIdx: null };
    document.querySelectorAll('.sub-tag-item').forEach(el => el.classList.remove('drag-over'));
}

function isMobileLayout() {
    return window.innerWidth <= 768;
}

let lastLayoutWasMobile = null;

/** 手機 ↔ 桌面切換時重繪側欄（否則桌面沒有 #sec-start） */
function syncLayoutForViewport() {
    const mobile = isMobileLayout();
    if (lastLayoutWasMobile === mobile) {
        mountStartContent();
        return;
    }
    lastLayoutWasMobile = mobile;
    if (!mobile) {
        closeStartSheet();
        setSidePanelOpen(false);
    } else {
        closeSidePanel();
    }
    renderSidePanel();
    refreshMainDisplay();
    syncPanelMobileControls();
    if (mobile && !getActiveTimers().length && !onboardingActive) openStartSheet();
    if (onboardingActive) showOnboardingStep(onboardingStepIndex);
}

function syncPanelMobileControls() {
    const closeBar = document.getElementById('panelCloseBar');
    if (closeBar) {
        closeBar.textContent = t('panelCloseBar');
        closeBar.setAttribute('aria-label', t('closePanel'));
    }
    document.querySelectorAll('.main-settings-btn').forEach(btn => {
        btn.textContent = t('panelFabOpen');
        btn.setAttribute('aria-label', t('openPanel'));
    });
    document.querySelectorAll('.main-start-btn').forEach(btn => {
        btn.textContent = t('taskStart');
        btn.setAttribute('aria-label', t('taskStart'));
    });
    syncStartSheetChrome();
}

function setSidePanelOpen(open) {
    const panel = document.getElementById('sidePanel');
    const overlay = document.getElementById('panelOverlay');
    if (!panel) return;
    if (open && isMobileLayout()) closeStartSheet();
    panel.classList.toggle('panel-open', !!open);
    if (overlay) overlay.classList.toggle('show', !!open);
    document.body.classList.toggle('side-panel-open', !!open);
    syncPanelMobileControls();
}

function toggleSidePanel() {
    const panel = document.getElementById('sidePanel');
    setSidePanelOpen(!panel.classList.contains('panel-open'));
}

function closeSidePanel() {
    setSidePanelOpen(false);
}

function initMobilePanelState() {
    if (!isMobileLayout()) return;
    if (!getActiveTimers().length && localStorage.getItem(ONBOARDING_STORAGE_KEY) === 'done') openStartSheet();
}

function createStartContentElement() {
    const wrap = document.createElement('div');
    wrap.id = 'startContent';
    wrap.className = 'collapsible-content';
    wrap.innerHTML = `<div class="start-form-inner" data-start-form="v2">
                <div class="start-field-row--2">
                    <label class="start-field"><span class="start-field-label" data-start-label="account">${t('startLabelAccount')}</span><select id="accSelect" onchange="updateCharSelect()"></select></label>
                    <label class="start-field"><span class="start-field-label" data-start-label="char">${t('startLabelChar')}</span><select id="charSelect"></select></label>
                </div>
                <div class="start-field-row--2 start-field-row--task-only" id="taskSubRow">
                    <label class="start-field"><span class="start-field-label" data-start-label="task">${t('startLabelTask')}</span><select id="taskSelect" onchange="updateSubTaskSelect()"></select></label>
                    <label class="start-field" id="subTaskFieldWrap" style="display:none;"><span class="start-field-label" data-start-label="sub">${t('startLabelSub')}</span><select id="subTaskSelect"></select></label>
                </div>
                <div id="timeDisplay" style="text-align:center; background:var(--bg); padding:10px; border-radius:10px; margin:2px 0 4px 0; font-size:1.8rem; font-family:monospace; font-weight:bold; color:var(--section-color);">00:00:00</div>
                <div class="dhms-container">
                    <div class="dhms-group"><input type="number" id="in-d" class="dhms-input" value="0" min="0" oninput="updateSecFromDhms()"><span class="dhms-unit" data-dhms-unit="day">${t('dhmsDay')}</span></div>
                    <div class="dhms-group"><input type="number" id="in-h" class="dhms-input" value="0" min="0" oninput="updateSecFromDhms()"><span class="dhms-unit" data-dhms-unit="hour">${t('dhmsHour')}</span></div>
                    <div class="dhms-group"><input type="number" id="in-m" class="dhms-input" value="0" min="0" max="59" oninput="updateSecFromDhms()"><span class="dhms-unit" data-dhms-unit="min">${t('dhmsMin')}</span></div>
                    <div class="dhms-group"><input type="number" id="in-s" class="dhms-input" value="0" min="0" max="59" oninput="updateSecFromDhms()"><span class="dhms-unit" data-dhms-unit="sec">${t('dhmsSec')}</span></div>
                </div>
                <div class="start-adj-grid">
                    <button type="button" class="btn-adjust" data-adj-key="adj1d" onclick="adj(86400)">${t('adj1d')}</button>
                    <button type="button" class="btn-adjust" data-adj-key="adj12h" onclick="adj(43200)">${t('adj12h')}</button>
                    <button type="button" class="btn-adjust" data-adj-key="adj1h" onclick="adj(3600)">${t('adj1h')}</button>
                    <button type="button" class="btn-adjust" data-adj-key="adj10m" onclick="adj(600)">${t('adj10m')}</button>
                    <button type="button" class="btn-adjust" data-adj-key="adj1m" onclick="adj(60)">${t('adj1m')}</button>
                    <button type="button" class="btn-adjust" data-adj-key="adj30s" onclick="adj(30)">${t('adj30s')}</button>
                </div>
                <div style="display:grid; grid-template-columns:1fr; gap:6px;">
                    <button class="btn-adjust" onclick="resetTime()" style="color:var(--danger);">${t('resetTime')}</button>
                </div>
                <div style="margin-top:15px; font-size:0.75rem; background-color:var(--bg); padding:8px; border-radius:8px; display:flex; align-items:center; justify-content:center; gap:2px;">${t('flashWarning')} <input type="number" id="fMin" value="0" style="width:28px; text-align:center;">:<input type="number" id="fSec" value="30" style="width:28px; text-align:center;"></div>
                <label class="start-notify-toggle">
                    <input type="checkbox" id="notifyOnFinish" checked>
                    <span data-start-label="notify">${t('notifyOnFinishLabel')}</span>
                </label>
                <button class="btn-main" id="btnStartTask" onclick="startTask()">${t('startTask')}</button>
                <button class="btn-main" id="btn-clear-finished" onclick="clearFinishedTasks()">${t('clearFinished')}</button>
            </div>`;
    return wrap;
}

function ensureStartContent() {
    let sc = document.getElementById('startContent');
    if (!sc || !sc.querySelector('[data-start-form="v2"]')) {
        sc?.remove();
        sc = createStartContentElement();
        document.getElementById('startContentHolder')?.appendChild(sc);
    }
    return sc;
}

function detachStartContent() {
    const sc = document.getElementById('startContent');
    const holder = document.getElementById('startContentHolder');
    if (sc && holder && sc.parentElement !== holder) holder.appendChild(sc);
}

function syncStartContentExpandedState() {
    const sc = document.getElementById('startContent');
    if (!sc) return;
    if (sc.closest('#startSheetBody')) {
        sc.classList.add('active');
    } else {
        sc.classList.toggle('active', uiState.openSection === 'startContent');
    }
    syncStartSectionHeaderState();
}

function handleSecStartSectionClick(event) {
    if (event.target.closest('#startContent')) return;
    smartToggle('startContent');
}

function handleSecStartTitleKey(event) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    smartToggle('startContent');
}

function syncStartSectionHeaderState() {
    const expanded = uiState.openSection === 'startContent';
    document.querySelectorAll('#sec-start .config-title--start').forEach(title => {
        title.classList.toggle('is-expanded', expanded);
        title.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
    document.querySelectorAll('#sec-start-entry .config-title--start').forEach(title => {
        title.classList.toggle('is-expanded', expanded);
    });
    document.querySelectorAll('.config-title-start-pill, .start-capsule-btn').forEach(pill => {
        pill.classList.toggle('is-pressed', expanded && !isMobileLayout());
    });
}

function mountStartContent() {
    const sc = ensureStartContent();
    const mobile = isMobileLayout();
    const target = mobile
        ? document.getElementById('startSheetBody')
        : document.getElementById('sec-start');
    if (!target) {
        document.getElementById('startContentHolder')?.appendChild(sc);
        return;
    }
    if (sc.parentElement !== target) target.appendChild(sc);
    syncStartContentExpandedState();
    refreshStartContentControls();
    refreshStartContentLabels();
    updateStartSectionTheme();
    updateClearFinishedButtonHighlight();
}

function refreshStartContentControls() {
    const accSel = document.getElementById('accSelect');
    const taskSel = document.getElementById('taskSelect');
    if (!accSel || !taskSel) return;
    const prevAcc = accSel.value;
    const prevTask = taskSel.value;
    accSel.innerHTML = config.accounts.map(a => `<option value="${a.email}">${a.email}</option>`).join('');
    if (prevAcc && [...accSel.options].some(o => o.value === prevAcc)) accSel.value = prevAcc;
    taskSel.innerHTML = config.tasks.map((tk, i) => `<option value="${i}">${tk.name}</option>`).join('');
    const ti = parseInt(prevTask, 10);
    if (!Number.isNaN(ti) && ti >= 0 && ti < config.tasks.length) taskSel.value = String(ti);
    updateCharSelect();
    updateSubTaskSelect();
    refreshStartContentLabels();
}

function refreshStartContentLabels() {
    document.querySelectorAll('.start-capsule-btn-label').forEach(el => { el.textContent = t('taskStart'); });
    const root = document.getElementById('startContent');
    if (!root) return;
    const startBtn = document.getElementById('btnStartTask');
    const clearBtn = document.getElementById('btn-clear-finished');
    if (startBtn) startBtn.textContent = t('startTask');
    if (clearBtn) clearBtn.textContent = t('clearFinished');
    const resetBtn = root.querySelector('button[onclick="resetTime()"]');
    if (resetBtn) resetBtn.textContent = t('resetTime');
    const labelMap = { account: 'startLabelAccount', char: 'startLabelChar', task: 'startLabelTask', sub: 'startLabelSub', notify: 'notifyOnFinishLabel' };
    root.querySelectorAll('[data-start-label]').forEach(el => {
        const key = labelMap[el.dataset.startLabel];
        if (key) el.textContent = t(key);
    });
    const unitMap = { day: 'dhmsDay', hour: 'dhmsHour', min: 'dhmsMin', sec: 'dhmsSec' };
    root.querySelectorAll('[data-dhms-unit]').forEach(el => {
        const key = unitMap[el.dataset.dhmsUnit];
        if (key) el.textContent = t(key);
    });
    root.querySelectorAll('[data-adj-key]').forEach(btn => {
        const key = btn.dataset.adjKey;
        if (key) btn.textContent = t(key);
    });
}

function getStartTitlePillHtml(interactive) {
    const expanded = uiState.openSection === 'startContent';
    const a11y = interactive
        ? ` role="button" tabindex="0" aria-expanded="${expanded}" onkeydown="handleSecStartTitleKey(event)"`
        : ' aria-hidden="true"';
    return `<div class="config-title config-title--start${expanded ? ' is-expanded' : ''}"${a11y}><span class="config-title-start-pill${expanded ? ' is-pressed' : ''}"><span class="start-capsule-btn-label">${t('taskStart')}</span></span></div>`;
}

function getStartSectionPanelHtml() {
    const taskColor = (config.tasks[0] && config.tasks[0].color) || config.colors.task;
    const startTitle = getStartTitlePillHtml(!isMobileLayout());
    if (isMobileLayout()) {
        return `<div class="config-section sec-start-entry-mobile" id="sec-start-entry" style="--section-color: ${taskColor};" role="button" tabindex="0" aria-label="${t('taskStart')}" onclick="openStartSheet()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openStartSheet();}">
            <div class="config-title config-title--start config-title--start-mobile">${startTitle}</div>
        </div>`;
    }
    return `<div class="config-section config-section--collapsible" id="sec-start" style="--section-color: ${taskColor};" onclick="handleSecStartSectionClick(event)">
            ${startTitle}
        </div>`;
}

function toggleStartSection() {
    if (isMobileLayout()) {
        closeSidePanel();
        mountStartContent();
        setStartSheetOpen(true);
        return;
    }
    smartToggle('startContent');
}

function syncStartSheetChrome() {
    const title = document.getElementById('startSheetTitle');
    const closeBtn = document.getElementById('startSheetCloseBtn');
    if (title) title.textContent = t('taskStart');
    if (closeBtn) closeBtn.setAttribute('aria-label', t('closePanel'));
}

function setStartSheetOpen(open) {
    const sheet = document.getElementById('startSheet');
    const overlay = document.getElementById('startSheetOverlay');
    if (!sheet) return;
    sheet.classList.toggle('show', !!open);
    if (overlay) overlay.classList.toggle('show', !!open);
    document.body.classList.toggle('start-sheet-open', !!open);
    if (open) {
        mountStartContent();
        syncStartSheetChrome();
        updateStartSectionTheme();
    }
}

function openStartSheet() {
    if (!isMobileLayout()) {
        toggleStartSection();
        return;
    }
    closeSidePanel();
    mountStartContent();
    setStartSheetOpen(true);
}

function closeStartSheet() {
    setStartSheetOpen(false);
}

function renderSidePanel() {
    detachStartContent();
    const panel = document.getElementById('sidePanelContent');
    if (!panel) return;
    const currentTheme = localStorage.getItem(THEME_KEY) || 'auto';
    panel.innerHTML = `
        ${renderNotifyDesktopPromptHtml()}
        <div class="config-section" id="sec-acc" style="--section-color: ${config.colors.acc};">
            <div class="config-title" onclick="smartToggle('accContent')"><span>${t('accMgmt')}</span><input type="color" class="color-input" value="${config.colors.acc}" onclick="event.stopPropagation()" onchange="updateSectionColor('acc', this.value)"></div>
            <div id="accContent" class="collapsible-content ${uiState.openSection === 'accContent' ? 'active' : ''}"><div>
                <div class="account-header-toggle-row">
                    <span class="account-header-toggle-label">${t('accountHeaderDisplay')}</span>
                    <div class="account-header-toggle-actions">
                        <button type="button" class="btn-adjust${isAccountHeaderVisible() ? ' btn-toggle-selected' : ''}" onclick="setAccountHeaderVisible(true)">${t('accountHeaderOn')}</button>
                        <button type="button" class="btn-adjust${!isAccountHeaderVisible() ? ' btn-toggle-selected' : ''}" onclick="setAccountHeaderVisible(false)">${t('accountHeaderOff')}</button>
                    </div>
                </div>
                <div style="display:flex; gap:5px; margin-bottom:5px;"><input type="text" id="newEmailInput" placeholder="${t('accNamePh')}" style="flex:1;" onkeyup="if(event.key==='Enter') addAccount()"><button class="btn-adjust" onclick="addAccount()" style="width: 60px;">${t('add')}</button></div>
                <div id="emailList">${config.accounts.map((acc, i) => `
                    <div style="background-color:var(--bg); padding:8px; border-radius:8px; margin-bottom:4px; border:1px solid var(--border-color);">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span class="editable-text" style="font-weight:bold;" onclick="renameAccount(${i})">${acc.email}</span>
                            <div style="display:flex; gap:5px; align-items:center;">
                                <input type="color" class="color-input" value="${acc.color || defaultAccColors[i%6]}" onchange="updateAccountColor(${i}, this.value)">
                                <button class="btn-mini" onclick="removeAcc(${i})">×</button>
                            </div>
                        </div>
                        <div style="margin-top:5px; display:flex; flex-wrap:wrap; gap:5px; align-items:center;">
                            ${acc.characters.map((c, ci) => {
                                let cName = typeof c === 'string' ? c : c.name;
                                let cColor = typeof c === 'string' ? '#94a3b8' : (c.color || '#94a3b8');
                                return `<div class="btn-mini" style="display:inline-flex; align-items:center; gap:4px; padding: 2px 6px;">
                                    <span class="editable-text" onclick="renameChar(${i},${ci})">${cName}</span> 
                                    <input type="color" class="color-input color-input-sm" value="${cColor}" onchange="updateCharColor(${i},${ci},this.value)">
                                    <span onclick="removeChar(${i},${ci})" style="color:var(--danger); cursor:pointer; font-weight:bold; padding-left:2px;">×</span>
                                </div>`;
                            }).join('')}
                            <button class="btn-mini" onclick="addCharacter(${i})" style="height:22px;">+</button>
                        </div>
                    </div>`).join('')}</div>
            </div></div>
        </div>

        <div class="config-section" id="sec-task" style="--section-color: ${config.colors.task};">
            <div class="config-title" onclick="smartToggle('taskContent')">
                <span>${t('allTags')}</span>
                <div style="display:flex; gap:8px; align-items:center;" onclick="event.stopPropagation()">
                    <button id="btn-expand-all-tasks" class="btn-mini" onclick="toggleExpandAllTasks()">
                        ${uiState.allTasksExpanded ? t('collapseAll') : t('expandAll')}
                    </button>
                    <input type="color" class="color-input" value="${config.colors.task}" onchange="updateSectionColor('task', this.value)">
                </div>
            </div>
            <div id="taskContent" class="collapsible-content ${uiState.openSection === 'taskContent' ? 'active' : ''}"><div>
                <div style="display:flex; gap:5px; margin-bottom:5px;"><input type="text" id="newTaskInput" placeholder="${t('taskNamePh')}" style="flex:1;" onkeyup="if(event.key==='Enter') saveTask()"><button class="btn-adjust" onclick="saveTask()" style="width: 60px;">${t('add')}</button></div>
                <div id="taskList">${config.tasks.map((taskItem, i) => {
                    const isDisplay = isTaskSubPanelOpen(i);
                    const tagHex = taskItem.color || config.colors.task;
                    const tagSpec = getLiteColorSpectrum(tagHex);
                    return `
                    <div class="tag-item-box" style="--tag-color: ${tagHex}" 
                         title="${t('dragSortTask')}"
                         onclick="toggleEditTask(${i})"
                         draggable="true" 
                         ondragstart="handleDragStart(event, ${i})" 
                         ondragover="handleDragOver(event)" 
                         ondragenter="handleDragEnter(event)" 
                         ondragleave="handleDragLeave(event)" 
                         ondrop="handleDrop(event, ${i})" 
                         ondragend="handleDragEnd(event)">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span class="editable-text" style="font-weight:bold;" onclick="event.stopPropagation(); renameTask(${i});">${taskItem.name}</span>
                            <div style="display:flex; gap:5px;">
                                <input type="color" class="color-input" value="${taskItem.color || config.colors.task}" onclick="event.stopPropagation()" onchange="updateTaskColorItem(${i}, this.value)">
                                <button class="btn-mini" onclick="event.stopPropagation(); removeTask(${i})">×</button>
                            </div>
                        </div>
                        <div id="sub-edit-${i}" class="sub-edit-panel ${isDisplay ? 'open' : ''}" onclick="event.stopPropagation()">
                            <div class="sub-edit-inner">
                            <div style="display:flex; flex-wrap:wrap; gap:5px; margin-bottom:8px;">${taskItem.subs.map((s, si) => `<span class="sub-tag-item" draggable="true" title="${t('dragSortSub')}" style="background-color:${tagSpec.badgeBg}; color:${tagSpec.subText}; border:1px solid ${tagSpec.subBorder};" ondragstart="handleSubDragStart(event, ${i}, ${si})" ondragover="handleSubDragOver(event)" ondragenter="handleSubDragEnter(event)" ondragleave="handleSubDragLeave(event)" ondrop="handleSubDrop(event, ${i}, ${si})" ondragend="handleSubDragEnd(event)"><span class="editable-text" onclick="renameSubTask(${i},${si})">${s}</span> <span onclick="removeSubTask(${i},${si})" style="cursor:pointer;">×</span></span>`).join('')}</div>
                            <div style="display:flex; gap:3px;"><input type="text" id="subIn-${i}" style="flex:1;" onkeyup="if(event.key==='Enter') addSubTask(${i})"><button class="btn-mini" onclick="addSubTask(${i})">+</button></div>
                            </div>
                        </div>
                    </div>`;
                }).join('')}</div>
            </div></div>
        </div>

        ${getStartSectionPanelHtml()}

        <div class="config-section" id="sec-sys" style="--section-color: ${config.colors.sys};">
            <div class="config-title" onclick="smartToggle('sysContent')">${t('sysTheme')}</div>
            <div id="sysContent" class="collapsible-content ${uiState.openSection === 'sysContent' ? 'active' : ''}"><div>
                <div class="sys-block">
                    <div class="sys-block-title">${t('sysSectionSystem')}</div>
                    <button type="button" class="btn-adjust" onclick="startInteractiveTutorial({ force: true })" style="width:100%; margin-bottom:6px; font-size:0.72rem;">${t('openInteractiveGuide')}</button>
                    <button type="button" class="btn-adjust" onclick="openTutorialModal()" style="width:100%; margin-bottom:10px; font-size:0.72rem;">${t('openTutorial')}</button>
                    ${renderNotificationHelpHtml()}
                    ${renderCloudSyncHtml()}
                    <div style="display:grid; grid-template-columns:1fr; gap:6px; margin-bottom:10px;">
                        <button class="btn-adjust" onclick="saveCurrentTasksAsDefault()" style="font-size:0.68rem;">${t('saveDefaultTags')}</button>
                        <button class="btn-adjust" onclick="resetDefaultTasks()" style="font-size:0.68rem; color:var(--danger);">${t('restoreDefaultTags')}</button>
                    </div>
                    <div style="margin-bottom:12px; font-size:0.75rem; padding:8px; background:var(--bg); border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                        <span>${t('undoDisplaySec')}</span>
                        <input type="number" id="undoTimeInput" class="undo-time-input" value="${config.undoTime}" min="1" max="120" onchange="config.undoTime=parseInt(this.value)||10; saveConfig();">
                    </div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:4px;">
                        <button class="btn-main btn-compact-main" onclick="exportConfig()">${t('exportBackup')}</button>
                        <button class="btn-main btn-compact-main btn-secondary-main" onclick="document.getElementById('importFile').click()">${t('importBtn')}</button>
                    </div>
                    <input type="file" id="importFile" style="display:none" onchange="importConfig(event)">
                    ${renderRecoveryPanelHtml()}
                </div>
                <div class="sys-block-divider"></div>
                <div class="sys-block">
                    <div class="sys-block-title">${t('sysSectionTheme')}</div>
                    <div style="margin-bottom:8px; font-size:0.75rem;">${t('langLabel')}</div>
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(0, 1fr)); gap:6px; margin-bottom:12px;">
                        ${getAvailableLanguages().map(l => `<button type="button" class="btn-adjust${currentLang === l.id ? ' btn-toggle-selected' : ''}" onclick="setLang('${l.id}')">${l.nativeName || l.id}</button>`).join('')}
                    </div>
                    <div style="margin-bottom:8px; font-size:0.75rem;">${t('themeLabel')}</div>
                    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:6px; margin-bottom:12px;">
                        <button class="btn-adjust${currentTheme === 'light' ? ' btn-toggle-selected' : ''}" onclick="setTheme('light')">${t('themeLight')}</button>
                        <button class="btn-adjust${currentTheme === 'dark' ? ' btn-toggle-selected' : ''}" onclick="setTheme('dark')">${t('themeDark')}</button>
                        <button class="btn-adjust${currentTheme === 'auto' ? ' btn-toggle-selected' : ''}" onclick="setTheme('auto')">${t('themeAuto')}</button>
                    </div>
                    <div style="margin-bottom:6px; font-size:0.75rem;">${t('neonGlowLabel')}</div>
                    <p style="margin:0 0 8px; font-size:0.65rem; color:var(--text-sub); line-height:1.4;">${t('neonGlowHint')}</p>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                        <button class="btn-adjust${config.neonGlow !== false ? ' btn-toggle-selected' : ''}" onclick="setNeonGlow(true)">${t('neonGlowOn')}</button>
                        <button class="btn-adjust${config.neonGlow === false ? ' btn-toggle-selected' : ''}" onclick="setNeonGlow(false)">${t('neonGlowOff')}</button>
                    </div>
                </div>
            </div></div>
        </div>
    `;
    mountStartContent();
    syncCollapsibleClasses();
    syncStartSheetChrome();
    initNotifyBannerDismissButtons();
    initNotifyPermissionPressButtons();
    syncNotifyPermissionUi();
    refreshMainDisplay(); 
}

function getFinishDateLabel(targetDate) {
    const now = new Date(); const target = new Date(targetDate); const diffMs = target - now;
    const dateStr = `${target.getMonth() + 1}/${target.getDate()}`;
    if (diffMs <= 0) return tp('dateEnded', { date: dateStr });
    if (diffMs < 60000) return tp('dateSoon', { date: dateStr });
    if (diffMs < 3600000) return tp('dateMinLater', { date: dateStr, n: Math.ceil(diffMs / 60000) });
    if (diffMs < 86400000) return tp('dateHourLater', { date: dateStr, n: Math.ceil(diffMs / 3600000) });
    const d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate()); const d2 = new Date(target.getFullYear(), target.getMonth(), target.getDate());
    return tp('dateDayLater', { date: dateStr, n: Math.round((d2 - d1) / 86400000) });
}

function formatElapsedSinceFinish(elapsedSec) {
    if (elapsedSec < 60) return t('elapsedJust');
    if (elapsedSec < 3600) return tp('elapsedMin', { n: Math.floor(elapsedSec / 60) });
    if (elapsedSec < 86400) {
        const h = Math.floor(elapsedSec / 3600);
        const m = Math.floor((elapsedSec % 3600) / 60);
        return m > 0 ? tp('elapsedHourMin', { h, m }) : tp('elapsedHour', { h });
    }
    const d = Math.floor(elapsedSec / 86400);
    const h = Math.floor((elapsedSec % 86400) / 3600);
    return h > 0 ? tp('elapsedDayHour', { d, h }) : tp('elapsedDay', { d });
}

function getFinishedEndLine(finishDate) {
    const target = new Date(finishDate);
    const dateStr = `${target.getMonth() + 1}/${target.getDate()} ${String(target.getHours()).padStart(2, '0')}:${String(target.getMinutes()).padStart(2, '0')}`;
    return tightenFinishedCardText(tp('finishedEnd', { date: dateStr }));
}

function getFinishedElapsedLine(finishDate) {
    const elapsedSec = Math.max(0, Math.floor((Date.now() - new Date(finishDate).getTime()) / 1000));
    return tightenFinishedCardText(tp('finishedElapsed', { elapsed: formatElapsedSinceFinish(elapsedSec) }));
}

function applyTimerCardColorVars(card, taskHex, spectrum, charColor) {
    card.dataset.taskColor = taskHex;
    card.style.setProperty('--local-raw-color', spectrum.raw);
    card.style.setProperty('--local-progress-color', spectrum.progress);
    card.style.setProperty('--local-dark-color', spectrum.dark);
    card.style.setProperty('--local-badge-bg', spectrum.badgeBg);
    card.style.setProperty('--local-badge-text', spectrum.badgeText);
    if (charColor) card.style.setProperty('--local-char-accent', charColor);
}

function getCharBadgeHtml(accEmail, charName) {
    if (!charName) return '';
    const charColor = getCharColor(accEmail, charName);
    const charRgb = parseColorToRgb(charColor);
    const charTextColor = getContrastTextColor(charColor);
    const charContrastClass = getRelativeLuminance(charRgb.r, charRgb.g, charRgb.b) > 0.52 ? 'contrast-dark' : 'contrast-light';
    return `<span class="char-title-badge ${charContrastClass}" style="background-color:${charColor}; color:${charTextColor};">${charName}</span>`;
}

function getSyncNewBadgeHtml(timer) {
    if (!isTimerSyncNewBadgeVisible(timer)) return '';
    return `<span class="sync-new-badge">${t('syncNewBadge')}</span>`;
}

function updateSyncNewBadgeOnCard(card, timer) {
    if (!card) return;
    const show = isTimerSyncNewBadgeVisible(timer);
    card.classList.toggle('has-sync-new', show);
    let badge = card.querySelector(':scope > .sync-new-badge');
    if (show && !badge) {
        badge = document.createElement('span');
        badge.className = 'sync-new-badge';
        badge.textContent = t('syncNewBadge');
        card.insertBefore(badge, card.firstChild);
    } else if (!show && badge) badge.remove();
    else if (show && badge) badge.textContent = t('syncNewBadge');
}

function pruneExpiredSyncNewFlags() {
    const timers = getActiveTimers();
    let changed = false;
    const next = timers.map(item => {
        if (item && item.syncNewUntil != null && Date.now() >= item.syncNewUntil) {
            changed = true;
            const { syncNewUntil, ...rest } = item;
            return rest;
        }
        return item;
    });
    if (changed) localStorage.setItem(ACTIVE_TIMERS_KEY, JSON.stringify(next));
}

function buildActiveTimerCard(t, index) {
    const card = document.createElement('div');
    card.className = 'timer-card timer-card--active';
    card.id = `t-${t.id}`;
    const taskObj = config.tasks.find(x => x.name === t.taskBase);
    const taskHex = taskObj ? taskObj.color : '#475569';
    const spectrum = getLiteColorSpectrum(taskHex);
    const charName = t.char || '';
    const charColor = charName ? getCharColor(t.email, charName) : null;
    applyTimerCardColorVars(card, taskHex, spectrum, charColor);
    if (isTimerSyncNewBadgeVisible(t)) card.classList.add('has-sync-new');
    card.innerHTML = `
        ${getSyncNewBadgeHtml(t)}
        <div class="timer-card-bg"></div>
        <button class="btn-close-circle" onclick="delTask(${t.id})">×</button>
        <div class="timer-card-inner">
            <div class="timer-card-progress-track" aria-hidden="true"><div class="timer-card-progress-fill"></div></div>
            <div class="active-layout">
                <div class="active-header">
                    <span class="card-id-badge active-slot-id">#${index + 1}</span>
                    <div class="active-slot-char">${getCharBadgeHtml(t.email, charName)}</div>
                </div>
                <div class="active-slot-task"><div class="task-title-display">${t.taskName}</div></div>
                <div class="active-slot-time"><div class="time-text">00:00:00</div></div>
                <div class="active-slot-date"><div class="date-label">--/--</div></div>
            </div>
        </div>`;
    requestAnimationFrame(() => fitActiveTimerCardLabels(card));
    return card;
}

function getCharGroupTitleHtml(accEmail, charName) {
    const unspecified = '（未指定角色）';
    if (charName && charName !== unspecified) return getCharBadgeHtml(accEmail, charName);
    return `<span class="char-group-label">${charName || unspecified}</span>`;
}

function getTimerListCharLine(timer) {
    const charKey = getCharGroupKey(timer.char);
    if (charKey === '（未指定角色）') return '';
    return `<div class="timer-list-charline">${getCharBadgeHtml(timer.email, charKey)}</div>`;
}

function getCleanCharPlainText(timer) {
    const key = getCharGroupKey(timer.char);
    return key === '（未指定角色）' ? '—' : key;
}

function getCleanTableHeadHtml(kind) {
    if (kind === 'finished') {
        return `<div class="clean-table-head" role="row">
            <span class="clean-col clean-col-char">${t('cleanColChar')}</span>
            <span class="clean-col clean-col-task">${t('cleanColTask')}</span>
            <span class="clean-col clean-col-status">${t('cleanColStatus')}</span>
            <span class="clean-col clean-col-del" aria-hidden="true"></span>
        </div>`;
    }
    return `<div class="clean-table-head" role="row">
        <span class="clean-col clean-col-char">${t('cleanColChar')}</span>
        <span class="clean-col clean-col-task">${t('cleanColTask')}</span>
        <span class="clean-col clean-col-remain">${t('cleanColRemain')}</span>
        <span class="clean-col clean-col-end">${t('cleanColEnd')}</span>
        <span class="clean-col clean-col-del" aria-hidden="true"></span>
    </div>`;
}

function buildActiveTimerCleanRow(timer) {
    const row = document.createElement('div');
    row.className = 'clean-table-row timer-list-row timer-list-row--active';
    row.id = `t-${timer.id}`;
    const taskObj = config.tasks.find(x => x.name === timer.taskBase);
    const taskHex = taskObj ? taskObj.color : '#475569';
    row.dataset.taskColor = taskHex;
    if (isTimerSyncNewBadgeVisible(timer)) row.classList.add('has-sync-new');
    row.innerHTML = `
        <span class="clean-col clean-col-char">${getCleanCharPlainText(timer)}</span>
        <span class="clean-col clean-col-task">${timer.taskName}</span>
        <span class="clean-col clean-col-remain timer-list-time">00:00:00</span>
        <span class="clean-col clean-col-end timer-list-hint">--</span>
        <button type="button" class="clean-col-del timer-list-del" onclick="delTask(${timer.id})" aria-label="刪除">×</button>`;
    return row;
}

function buildFinishedTimerCleanRow(timer) {
    const row = document.createElement('div');
    row.className = 'clean-table-row timer-list-row timer-list-row--finished is-finished';
    row.id = `t-${timer.id}`;
    const taskObj = config.tasks.find(x => x.name === timer.taskBase);
    const taskHex = taskObj ? taskObj.color : '#475569';
    const finishTime = new Date(timer.finishDate);
    row.dataset.taskColor = taskHex;
    if (isTimerSyncNewBadgeVisible(timer)) row.classList.add('has-sync-new');
    row.innerHTML = `
        <span class="clean-col clean-col-char">${getCleanCharPlainText(timer)}</span>
        <span class="clean-col clean-col-task">${timer.taskName}</span>
        <span class="clean-col clean-col-status timer-list-status finished-elapsed-line">${getFinishedElapsedLine(finishTime)}</span>
        <button type="button" class="clean-col-del timer-list-del" onclick="delTask(${timer.id})" aria-label="刪除">×</button>`;
    return row;
}

function appendCleanTableRows(tableBody, charGroups, buildRowFn) {
    charGroups.forEach(({ timers }) => {
        timers.forEach(timer => tableBody.appendChild(buildRowFn(timer)));
    });
}

function mountCleanTable(parentEl, charGroups, kind, buildRowFn) {
    const table = document.createElement('div');
    table.className = `clean-table clean-table--${kind}`;
    table.innerHTML = `${getCleanTableHeadHtml(kind)}<div class="clean-table-body" role="rowgroup"></div>`;
    parentEl.appendChild(table);
    appendCleanTableRows(table.querySelector('.clean-table-body'), charGroups, buildRowFn);
}

function buildActiveTimerListRow(timer) {
    const row = document.createElement('div');
    row.className = 'timer-list-row timer-list-row--active';
    row.id = `t-${timer.id}`;
    const taskObj = config.tasks.find(x => x.name === timer.taskBase);
    const taskHex = taskObj ? taskObj.color : '#475569';
    const charName = timer.char || '';
    const charColor = charName ? getCharColor(timer.email, charName) : null;
    applyTimerCardColorVars(row, taskHex, getLiteColorSpectrum(taskHex), charColor);
    if (isTimerSyncNewBadgeVisible(timer)) row.classList.add('has-sync-new');
    row.innerHTML = `
        ${getSyncNewBadgeHtml(timer)}
        <div class="timer-list-main">
            <div class="timer-list-info">
                ${getTimerListCharLine(timer)}
                <div class="timer-list-task">${timer.taskName}</div>
            </div>
            <div class="timer-list-side">
                <div class="timer-list-time">00:00:00</div>
                <div class="timer-list-hint">--</div>
            </div>
            <button type="button" class="timer-list-del" onclick="delTask(${timer.id})" aria-label="刪除">×</button>
        </div>`;
    return row;
}

function buildFinishedTimerListRow(timer) {
    const row = document.createElement('div');
    row.className = 'timer-list-row timer-list-row--finished is-finished';
    row.id = `t-${timer.id}`;
    const taskObj = config.tasks.find(x => x.name === timer.taskBase);
    const taskHex = taskObj ? taskObj.color : '#475569';
    const charName = timer.char || '';
    const finishTime = new Date(timer.finishDate);
    const charColor = charName ? getCharColor(timer.email, charName) : null;
    applyTimerCardColorVars(row, taskHex, getLiteColorSpectrum(taskHex), charColor);
    if (isTimerSyncNewBadgeVisible(timer)) row.classList.add('has-sync-new');
    row.innerHTML = `
        ${getSyncNewBadgeHtml(timer)}
        <div class="timer-list-main">
            <div class="timer-list-info">
                ${getTimerListCharLine(timer)}
                <div class="timer-list-task">${timer.taskName}</div>
            </div>
            <div class="timer-list-side">
                <span class="timer-list-time" aria-hidden="true"></span>
                <span class="timer-list-status finished-elapsed-line">${getFinishedElapsedLine(finishTime)}</span>
            </div>
            <button type="button" class="timer-list-del" onclick="delTask(${timer.id})" aria-label="刪除">×</button>
        </div>`;
    return row;
}

function appendListRowsFromCharGroups(listEl, charGroups, buildRowFn) {
    charGroups.forEach(({ timers }) => {
        timers.forEach(timer => listEl.appendChild(buildRowFn(timer)));
    });
}

function appendActiveCharGroups(parentEl, activeCharGroups, acc, safeId) {
    if (isTimerDisplayClean()) {
        mountCleanTable(parentEl, activeCharGroups, 'active', buildActiveTimerCleanRow);
        return;
    }
    if (isTimerDisplayList()) {
        const wrap = document.createElement('div');
        wrap.className = 'timer-list-wrap';
        wrap.innerHTML = `<div class="timer-list timer-list--active" id="list-active-${safeId}"></div>`;
        parentEl.appendChild(wrap);
        appendListRowsFromCharGroups(wrap.querySelector('.timer-list'), activeCharGroups, buildActiveTimerListRow);
        return;
    }
    activeCharGroups.forEach(({ charName, timers: groupTimers }) => {
        const charSafe = safeDomIdPart(charName);
        const groupEl = document.createElement('div');
        groupEl.className = 'char-timer-group';
        groupEl.innerHTML = `<div class="timer-grid" id="grid-active-${safeId}-${charSafe}"></div>`;
        parentEl.appendChild(groupEl);
        const grid = groupEl.querySelector('.timer-grid');
        groupTimers.forEach((t, i) => grid.appendChild(buildActiveTimerCard(t, i)));
    });
}

function appendGlobalFinishedCharGroups(parentEl, finishedCharGroups) {
    if (!finishedCharGroups.length) return;
    if (isTimerDisplayClean()) {
        const mount = document.createElement('div');
        mount.className = 'clean-table-mount finished-global-row';
        parentEl.appendChild(mount);
        mountCleanTable(mount, finishedCharGroups, 'finished', buildFinishedTimerCleanRow);
        return;
    }
    if (isTimerDisplayList()) {
        const list = document.createElement('div');
        list.className = 'timer-list timer-list--finished finished-global-row';
        list.id = 'list-finished-global-all';
        parentEl.appendChild(list);
        finishedCharGroups.forEach(({ timers }) => {
            timers.forEach(timer => list.appendChild(buildFinishedTimerListRow(timer)));
        });
        return;
    }
    const grid = document.createElement('div');
    grid.className = 'timer-grid finished-grid finished-global-row';
    grid.id = 'grid-finished-global-all';
    parentEl.appendChild(grid);
    let index = 0;
    finishedCharGroups.forEach(({ timers }) => {
        timers.forEach(timer => {
            grid.appendChild(buildFinishedTimerCard(timer, index++));
        });
    });
}

function getGlobalCharOrder() {
    const order = [];
    config.accounts.forEach(acc => {
        (acc.characters || []).forEach(c => {
            const name = typeof c === 'string' ? c : c.name;
            if (name && !order.includes(name)) order.push(name);
        });
    });
    return order;
}

function getFinishedTimersByRoleGroups(allSavedData, now) {
    const accountEmails = new Set(config.accounts.map(a => a.email));
    const sortFinishedByFinish = (a, b) => new Date(b.finishDate).getTime() - new Date(a.finishDate).getTime();
    const finished = allSavedData
        .filter(t => accountEmails.has(t.email) && new Date(t.finishDate).getTime() <= now)
        .sort(sortFinishedByFinish);
    const grouped = new Map();
    finished.forEach(timer => {
        const key = getCharGroupKey(timer.char);
        if (!grouped.has(key)) grouped.set(key, []);
        grouped.get(key).push(timer);
    });
    const groups = [];
    getGlobalCharOrder().forEach(charName => {
        if (!grouped.has(charName)) return;
        groups.push({ charName, timers: grouped.get(charName) });
        grouped.delete(charName);
    });
    grouped.forEach((timers, charName) => {
        groups.push({ charName, timers: [...timers].sort(sortFinishedByFinish) });
    });
    return groups;
}

function renderFinishedGlobalPanelHeader() {
    const header = document.getElementById('finishedGlobalHeader');
    const panel = document.getElementById('finishedGlobalPanel');
    const mount = document.getElementById('finishedGlobalMount');
    if (!header || !panel) return;
    if (mount) mount.setAttribute('aria-label', t('sectionFinishedGlobal'));
    panel.setAttribute('aria-label', t('sectionFinishedGlobal'));
    header.setAttribute('aria-label', t('sectionFinishedClearTitleAll'));
    header.setAttribute('title', t('sectionFinishedClearTitleAll'));
    header.onclick = () => clearFinishedTasks();
    header.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            clearFinishedTasks();
        }
    };
    header.innerHTML = `
        <span class="finished-clear-chip">
            <span class="finished-title-label">
                <span class="finished-title-default">${t('sectionFinishedGlobal')}</span>
                <span class="finished-title-hover">${t('sectionFinishedClearHover')}</span>
            </span>
            <span class="finished-clear-affordance">${t('sectionFinishedClearHint')}</span>
            <span class="finished-clear-icon" aria-hidden="true">×</span>
        </span>`;
}

function dispatchFinishedGlobalPanel(allSavedData, now) {
    const mount = document.getElementById('finishedGlobalMount');
    if (!mount) return;
    const groups = getFinishedTimersByRoleGroups(allSavedData, now);
    mount.classList.toggle('is-empty', !groups.length);
    mount.innerHTML = '';
    if (!groups.length) return;
    const panel = document.createElement('div');
    panel.id = 'finishedGlobalPanel';
    panel.className = 'finished-global-panel timer-section timer-section-finished';
    panel.innerHTML = `
        <div class="finished-global-header timer-section-title timer-section-title--clear-finished" id="finishedGlobalHeader" role="button" tabindex="0"></div>
        <div id="finishedGlobalByChar" class="timers-by-char finished-by-char finished-global-by-char"></div>`;
    mount.appendChild(panel);
    renderFinishedGlobalPanelHeader();
    appendGlobalFinishedCharGroups(document.getElementById('finishedGlobalByChar'), groups);
}

function getCharGroupKey(char) {
    return (char && String(char).trim()) ? String(char).trim() : '（未指定角色）';
}

/** 先依結束時間全域排序，相鄰同角色再合為一組（最快結束的永遠在最前） */
function getTimersCharGroupsByFinishOrder(timers, compareFn) {
    if (!timers.length) return [];
    const sorted = [...timers].sort(compareFn);
    const groups = [];
    let current = null;
    sorted.forEach(timer => {
        const charName = getCharGroupKey(timer.char);
        if (!current || current.charName !== charName) {
            current = { charName, timers: [] };
            groups.push(current);
        }
        current.timers.push(timer);
    });
    return groups;
}

function getSoonestActiveFinishMs(accEmail, allSavedData, now) {
    let soonest = Infinity;
    allSavedData.forEach(timer => {
        if (timer.email !== accEmail) return;
        const finishMs = new Date(timer.finishDate).getTime();
        if (Number.isNaN(finishMs) || finishMs <= now) return;
        if (finishMs < soonest) soonest = finishMs;
    });
    return soonest;
}

function getLatestFinishedFinishMs(accEmail, allSavedData, now) {
    let latest = -Infinity;
    allSavedData.forEach(timer => {
        if (timer.email !== accEmail) return;
        const finishMs = new Date(timer.finishDate).getTime();
        if (Number.isNaN(finishMs) || finishMs > now) return;
        if (finishMs > latest) latest = finishMs;
    });
    return latest;
}

/** 有進行中：依最快結束時間排前；僅已完成：依最近結束排前；無計時器排最後 */
function getAccountsOrderedBySoonestActiveFinish(allSavedData, now) {
    return config.accounts
        .map((acc, index) => ({
            acc,
            index,
            soonest: getSoonestActiveFinishMs(acc.email, allSavedData, now),
            latestFinished: getLatestFinishedFinishMs(acc.email, allSavedData, now)
        }))
        .sort((a, b) => {
            const aActive = a.soonest !== Infinity;
            const bActive = b.soonest !== Infinity;
            if (aActive && bActive) return a.soonest - b.soonest || a.index - b.index;
            if (aActive) return -1;
            if (bActive) return 1;
            const aDone = a.latestFinished !== -Infinity;
            const bDone = b.latestFinished !== -Infinity;
            if (aDone && bDone) return b.latestFinished - a.latestFinished || a.index - b.index;
            if (aDone) return -1;
            if (bDone) return 1;
            return a.index - b.index;
        })
        .map(x => x.acc);
}

function reorderAccountGroupsInMain(allSavedData, now) {
    const main = document.getElementById('mainDisplay');
    if (!main) return;
    getAccountsOrderedBySoonestActiveFinish(allSavedData, now).forEach(acc => {
        const contentId = `content-acc-${acc.email.replace(/[@.]/g, '_')}`;
        const content = document.getElementById(contentId);
        const group = content && content.closest('.account-group');
        if (group) main.appendChild(group);
    });
}

function safeDomIdPart(s) {
    return String(s).replace(/[@.\s\u3000]/g, '_').replace(/[^\w\u4e00-\u9fff-]/g, '_');
}

function buildFinishedTimerCard(t, index) {
    const card = document.createElement('div');
    card.className = 'timer-card is-finished';
    card.id = `t-${t.id}`;
    const taskObj = config.tasks.find(x => x.name === t.taskBase);
    const taskHex = taskObj ? taskObj.color : '#475569';
    const spectrum = getLiteColorSpectrum(taskHex);
    const charName = t.char || '';
    const finishTime = new Date(t.finishDate);
    const charColor = charName ? getCharColor(t.email, charName) : null;
    applyTimerCardColorVars(card, taskHex, spectrum, charColor);
    card.style.setProperty('--p', '0%');
    const charCell = getCharBadgeHtml(t.email, charName) || '<span class="finished-char-placeholder"></span>';
    if (isTimerSyncNewBadgeVisible(t)) card.classList.add('has-sync-new');
    card.innerHTML = `
        ${getSyncNewBadgeHtml(t)}
        <button class="btn-close-circle" onclick="delTask(${t.id})">×</button>
        <div class="timer-card-inner finished-layout">
            <div class="finished-header">
                <span class="card-id-badge">#${index + 1}</span>
                <div class="finished-char-center">${charCell}</div>
            </div>
            <div class="finished-row-2"><div class="task-title-display">${t.taskName}</div></div>
            <div class="finished-end-line">${getFinishedEndLine(finishTime)}</div>
            <div class="finished-elapsed-line">${getFinishedElapsedLine(finishTime)}</div>
        </div>`;
    requestAnimationFrame(() => fitFinishedTimerCardLabels(card));
    return card;
}

function refreshMainDisplay() { 
    const main = document.getElementById('mainDisplay'); main.innerHTML = ''; 
    const finishedMount = document.createElement('div');
    finishedMount.id = 'finishedGlobalMount';
    finishedMount.className = 'finished-global-mount is-empty';
    main.appendChild(finishedMount);
    const mobile = isMobileLayout();
    const showAccountHeader = isAccountHeaderVisible();
    const now = Date.now();
    const allSavedData = getActiveTimers();
    const accountsOrdered = getAccountsOrderedBySoonestActiveFinish(allSavedData, now);
    accountsOrdered.forEach((acc, i) => { 
        const origIdx = config.accounts.findIndex(a => a.email === acc.email);
        const div = document.createElement('div'); div.className = `account-group${showAccountHeader ? '' : ' account-group--no-header'}`; 
        div.style.setProperty('--acc-theme', acc.color || defaultAccColors[(origIdx >= 0 ? origIdx : i) % 6]); 
        const headerActions = (mobile && i === 0)
            ? `<div class="main-header-actions">
                <button type="button" class="main-start-btn" onclick="openStartSheet()"></button>
                <button type="button" class="main-settings-btn" onclick="toggleSidePanel()"></button>
               </div>`
            : '';
        const headerHtml = showAccountHeader
            ? `<div class="account-group-header">
                <div class="account-tab-item">${acc.email}</div>
                ${headerActions}
            </div>`
            : (headerActions ? `<div class="account-group-header account-group-header--controls-only">${headerActions}</div>` : '');
        div.innerHTML = `
            ${headerHtml}
            <div class="account-content" id="content-acc-${acc.email.replace(/[@.]/g, '_')}"></div>
        `; 
        main.appendChild(div); 
    }); 
    applyTimerCardMinWidth();
    syncMainTimerDisplayBar();
    dispatchTimersToDOM();
    syncPanelMobileControls();
}

function hasAnyFinishedTimers() {
    const now = Date.now();
    return getActiveTimers().some(t => new Date(t.finishDate).getTime() <= now);
}

function updateClearFinishedButtonHighlight() {
    const btn = document.getElementById('btn-clear-finished');
    if (!btn) return;
    btn.classList.toggle('has-finished-pending', hasAnyFinishedTimers());
}

function dispatchTimersToDOM() {
    if (isDispatchingTimers) return;
    isDispatchingTimers = true;
    try {
    const allSavedData = getActiveTimers();
    const now = Date.now();
    const accountsOrdered = getAccountsOrderedBySoonestActiveFinish(allSavedData, now);
    accountsOrdered.forEach(acc => {
        const safeId = acc.email.replace(/[@.\s]/g, '_');
        const container = document.getElementById(`content-acc-${acc.email.replace(/[@.]/g, '_')}`);
        if (!container) return;

        const timers = allSavedData.filter(t => t.email === acc.email);
        const activeTimers = timers.filter(t => new Date(t.finishDate).getTime() > now);

        const sortActiveByFinish = (a, b) => new Date(a.finishDate).getTime() - new Date(b.finishDate).getTime();
        const activeCharGroups = activeTimers.length ? getTimersCharGroupsByFinishOrder(activeTimers, sortActiveByFinish) : [];

        let html = '';
        if (activeCharGroups.length) {
            html += `<div class="timer-section timer-section-active">
                <div class="timer-section-title">${t('sectionActive')}</div>
                <div class="timers-by-char active-by-char" id="active-by-char-${safeId}"></div>
            </div>`;
        }
        if (html) {
            container.innerHTML = html;
            const activeByChar = container.querySelector(`#active-by-char-${safeId}`);
            if (activeByChar) appendActiveCharGroups(activeByChar, activeCharGroups, acc, safeId);
        } else if (!timers.length) {
            container.innerHTML = `<div style="font-size:0.8rem; color:var(--text-sub); padding:8px 0;">${t('noTimers')}</div>`;
        } else {
            container.innerHTML = '';
        }
    });
    dispatchFinishedGlobalPanel(allSavedData, now);
    reorderAccountGroupsInMain(allSavedData, now);
    } finally {
        isDispatchingTimers = false;
    }
    updateClearFinishedButtonHighlight();
    updateTimersDataTicker(true);
    requestAnimationFrame(() => {
        if (!isTimerDisplayClean()) {
            fitAllActiveTimerCardLabels();
            fitAllFinishedTimerCardLabels();
        }
        syncTimerListSideAlign();
    });
}

function updateTimersDataTicker(skipRelayout = false) {
    pruneExpiredSyncNewFlags();
    const allSavedData = getActiveTimers();
    const accountEmails = new Set(config.accounts.map(a => a.email));
    const now = Date.now();
    let needsRelayout = false;

    allSavedData.filter(t => accountEmails.has(t.email)).forEach(t => {
        const card = document.getElementById(`t-${t.id}`);
        if (!card) return;

        const finishMs = new Date(t.finishDate).getTime();
        if (Number.isNaN(finishMs)) return;

        const totalRemSec = (finishMs - now) / 1000;
        const isFinished = totalRemSec <= 0;
        const inFinishedSection = card.classList.contains('is-finished') || !!card.closest('.timer-section-finished') || !!card.closest('.finished-global-mount');
        const isListRow = card.classList.contains('timer-list-row') || card.classList.contains('clean-table-row');

        if (isFinished !== inFinishedSection) {
            if (isFinished && !inFinishedSection) triggerFinishNotification(t);
            needsRelayout = true;
            return;
        }

        const taskHex = card.dataset.taskColor || '#475569';

        if (isFinished) {
            const finishTime = new Date(t.finishDate);
            const endEl = card.querySelector('.finished-end-line');
            const elapsedEl = card.querySelector('.finished-elapsed-line');
            if (endEl) endEl.textContent = getFinishedEndLine(finishTime);
            if (elapsedEl) elapsedEl.textContent = getFinishedElapsedLine(finishTime);
            updateSyncNewBadgeOnCard(card, t);
            return;
        }

        const timeEl = card.querySelector('.timer-list-time') || card.querySelector('.time-text');
        if (!timeEl) return;
        const dateEl = card.querySelector('.timer-list-hint') || card.querySelector('.date-label');

        card.classList.toggle('is-warning-blinking', totalRemSec <= parseInt(t.fThres));
        const h = Math.floor(totalRemSec / 3600), m = Math.floor((totalRemSec % 3600) / 60), s = Math.floor(totalRemSec % 60);
        timeEl.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
        if (dateEl) dateEl.textContent = getFinishDateLabel(new Date(t.finishDate));
        if (!isListRow) {
            const pPercent = Math.max(0, Math.min(100, (totalRemSec / parseInt(t.dur)) * 100));
            card.style.setProperty('--p', `${pPercent}%`);
            card.style.setProperty('--timer-progress-pct', `${pPercent}%`);
            const progressFill = card.querySelector('.timer-card-progress-fill');
            if (progressFill) progressFill.style.width = `${pPercent}%`;
            applyTimerCardReadableText(card, taskHex, pPercent, false);
        }
        updateSyncNewBadgeOnCard(card, t);
    });

    if (needsRelayout && !skipRelayout) dispatchTimersToDOM();
    else {
        syncFinishedNotifyState();
        updateClearFinishedButtonHighlight();
        requestAnimationFrame(() => {
            if (!isTimerDisplayClean()) {
                fitAllActiveTimerCardLabels();
                fitAllFinishedTimerCardLabels();
            }
            syncTimerListSideAlign();
        });
    }
}

function runGlobalClockTick() { updateTimersDataTicker(); requestAnimationFrame(runGlobalClockTick); }

function clearFinishedTasks(accEmail) {
    const allSavedData = getActiveTimers();
    const now = Date.now();
    let finished = allSavedData.filter(t => new Date(t.finishDate).getTime() <= now);
    if (accEmail) finished = finished.filter(t => t.email === accEmail);
    if (!finished.length) return;
    const undoDetail = accEmail
        ? (finished.length === 1 ? (finished[0].taskName || t('sectionFinished')) : `${accEmail} ${t('sectionFinished')}(${finished.length})`)
        : (finished.length === 1 ? (finished[0].taskName || '已完成計時器') : `已完成計時器(${finished.length})`);
    triggerUndo('已完成計時器', finished.map(t => JSON.parse(JSON.stringify(t))), undoDetail);
    const active = allSavedData.filter(t => {
        const isFinished = new Date(t.finishDate).getTime() <= now;
        if (!isFinished) return true;
        if (accEmail) return t.email !== accEmail;
        return false;
    });
    setActiveTimers(active, { immediateCloud: true });
    dispatchTimersToDOM();
}

function persistUndoStack(opts = {}) {
    if (undoStack.length) localStorage.setItem(UNDO_TEMP_KEY, JSON.stringify(undoStack));
    else localStorage.removeItem(UNDO_TEMP_KEY);
    if (!opts.skipCloud) {
        touchLocalUpdated();
        scheduleCloudSync();
    }
}

function getUndoDisplayName(entry) {
    if (!entry) return t('undoOp');
    if (entry.detail) return entry.detail;
    if (entry.label === '已完成計時器') return t('undoClearFinished');
    if (entry.label === '計時器') return t('undoTimer');
    return t('undoSettings');
}

function updateUndoToastText() {
    const undoTextEl = document.getElementById('undoText');
    const n = undoStack.length;
    const top = undoStack[n - 1];
    const name = getUndoDisplayName(top);
    if (n > 1) undoTextEl.textContent = tp('undoMany', { name, n, sec: currentUndoTimeLeft });
    else undoTextEl.textContent = tp('undoOne', { name, sec: currentUndoTimeLeft });
}

function loadUndoStackFromStorage() {
    try {
        const raw = localStorage.getItem(UNDO_TEMP_KEY) || localStorage.getItem('GameTimer_Undo_Temp');
        if (!raw) return;
        const parsed = JSON.parse(raw);
        undoStack = Array.isArray(parsed) ? parsed : [parsed];
        if (undoStack.length) {
            document.getElementById('undoToast').classList.add('show');
            startUndoCountdown();
        }
    } catch (e) {
        undoStack = [];
        localStorage.removeItem(UNDO_TEMP_KEY);
    }
}

function triggerUndo(label, actionData, detail) {
    undoStack.push({ label, data: actionData, startTime: Date.now(), detail: detail || '' });
    persistUndoStack();
    document.getElementById('undoToast').classList.add('show');
    startUndoCountdown();
}

function startUndoCountdown() {
    const undoTextEl = document.getElementById('undoText');
    if (undoTimerInterval) clearInterval(undoTimerInterval);
    currentUndoTimeLeft = config.undoTime || 10;
    updateUndoToastText();
    undoTimerInterval = setInterval(() => {
        currentUndoTimeLeft--;
        if (currentUndoTimeLeft <= 0) {
            clearInterval(undoTimerInterval);
            undoTimerInterval = null;
            dismissUndo();
        } else {
            updateUndoToastText();
        }
    }, 1000);
}

function dismissUndo() {
    document.getElementById('undoToast').classList.remove('show');
    undoStack = [];
    localStorage.removeItem(UNDO_TEMP_KEY);
    localStorage.removeItem('GameTimer_Undo_Temp');
    if (undoTimerInterval) { clearInterval(undoTimerInterval); undoTimerInterval = null; }
    touchLocalUpdated();
    scheduleCloudSync();
}

function undoAction() {
    if (!undoStack.length) return;
    const last = undoStack.pop();
    if (last.label === '計時器') {
        const allSavedData = getActiveTimers();
        if (!allSavedData.some(t => String(t.id) === String(last.data.id))) {
            allSavedData.push(last.data);
            setActiveTimers(allSavedData, { immediateCloud: true });
        }
    } else if (last.label === '已完成計時器') {
        const allSavedData = getActiveTimers();
        const toRestore = Array.isArray(last.data) ? last.data : [last.data];
        toRestore.forEach(t => {
            if (!allSavedData.some(x => String(x.id) === String(t.id))) allSavedData.push(t);
        });
        setActiveTimers(allSavedData, { immediateCloud: true });
        dispatchTimersToDOM();
    } else {
        config = last.data;
        saveConfig();
    }
    persistUndoStack();
    if (undoStack.length) {
        document.getElementById('undoToast').classList.add('show');
        startUndoCountdown();
    } else {
        document.getElementById('undoToast').classList.remove('show');
        if (undoTimerInterval) { clearInterval(undoTimerInterval); undoTimerInterval = null; }
    }
    dispatchTimersToDOM();
}

const LEGACY_TIMER_STORAGE_KEYS = [
    ACTIVE_TIMERS_KEY,
    'GameTimer_Active',
    'GameTimer_ActiveTimers',
    'GameTimer_Active_Timers'
];

function isTimerLike(obj) {
    return obj && typeof obj === 'object' && obj.id != null &&
        (obj.finishDate != null || obj.dur != null) &&
        (obj.email != null || obj.taskName != null || obj.taskBase != null);
}

function extractTimersFromValue(value, depth) {
    const out = [];
    if (value == null || depth > 12) return out;
    if (Array.isArray(value)) {
        if (value.length && value.every(isTimerLike)) return value.filter(isTimerLike);
        value.forEach(v => out.push(...extractTimersFromValue(v, depth + 1)));
        return out;
    }
    if (typeof value === 'object') {
        if (isTimerLike(value)) return [value];
        if (Array.isArray(value.activeTimers)) {
            out.push(...value.activeTimers.filter(isTimerLike));
        }
        Object.values(value).forEach(v => out.push(...extractTimersFromValue(v, depth + 1)));
    }
    return out;
}

function deepScanLocalStorageForTimers() {
    const all = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        try {
            const raw = localStorage.getItem(key);
            if (!raw || raw.length < 12) continue;
            all.push(...extractTimersFromValue(JSON.parse(raw), 0));
        } catch (_) {}
    }
    return all;
}

function collectTimersFromUndoStorage() {
    const list = [];
    [UNDO_TEMP_KEY, 'GameTimer_Undo_Temp'].forEach(key => {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            const arr = Array.isArray(parsed) ? parsed : [parsed];
            arr.forEach(entry => {
                if (!entry) return;
                if (entry.label === '計時器' && entry.data) list.push(entry.data);
                if (entry.label === '已完成計時器') {
                    const batch = Array.isArray(entry.data) ? entry.data : [entry.data];
                    batch.forEach(t => { if (t) list.push(t); });
                }
            });
        } catch (_) {}
    });
    undoStack.forEach(entry => {
        if (!entry) return;
        if (entry.label === '計時器' && entry.data) list.push(entry.data);
        if (entry.label === '已完成計時器') {
            const batch = Array.isArray(entry.data) ? entry.data : [entry.data];
            batch.forEach(t => { if (t) list.push(t); });
        }
    });
    return list;
}

function getRecoverableTimers() {
    const currentIds = new Set(getActiveTimers().map(t => String(t.id)));
    const map = new Map();
    const tryAdd = (list) => {
        (list || []).forEach(t => {
            if (!t || t.id == null) return;
            const id = String(t.id);
            if (currentIds.has(id) || map.has(id)) return;
            map.set(id, t);
        });
    };
    LEGACY_TIMER_STORAGE_KEYS.forEach(key => {
        try { tryAdd(JSON.parse(localStorage.getItem(key) || '[]')); } catch (_) {}
    });
    tryAdd(deepScanLocalStorageForTimers());
    tryAdd(collectTimersFromUndoStorage());
    return [...map.values()];
}

async function checkCloudForRecovery() {
    if (!isCloudSyncActive()) {
        alert(t('recoveryCloudLogin'));
        return;
    }
    updateCloudSyncUI('cloudLoading');
    try {
        const cloud = await fetchCloudRecord();
        const cloudTimers = Array.isArray(cloud?.activeTimers) ? cloud.activeTimers.filter(isTimerLike) : [];
        const current = getActiveTimers();
        if (!cloudTimers.length) {
            alert(t('recoveryCloudEmpty'));
            renderSidePanel();
            return;
        }
        const missing = cloudTimers.filter(t => !current.some(x => String(x.id) === String(t.id)));
        if (!missing.length && cloudTimers.length === current.length) {
            alert(t('recoveryCloudSame'));
            return;
        }
        const useFull = !current.length && cloudTimers.length > 0;
        const msg = useFull
            ? tp('recoveryCloudReplace', { n: cloudTimers.length })
            : tp('recoveryCloudFound', { n: missing.length, total: cloudTimers.length });
        if (!confirm(msg)) return;
        if (useFull) {
            setActiveTimers(markTimersNewFromCloud(current, cloudTimers));
        } else {
            const all = [...current, ...markTimersNewFromCloud(current, missing)];
            setActiveTimers(all);
        }
        dispatchTimersToDOM();
        alert(tp('alertRecovered', { n: useFull ? cloudTimers.length : missing.length }));
    } catch (e) {
        console.error(e);
        alert(tp('alertSyncFailed', { msg: e.message || e }));
    }
    renderSidePanel();
}

function restoreRecoverableTimers() {
    const recoverable = getRecoverableTimers();
    if (!recoverable.length) {
        alert(t('alertNothingToRecover'));
        return;
    }
    if (!confirm(tp('confirmRecover', { n: recoverable.length }))) return;
    const all = getActiveTimers();
    const marked = markTimersNewFromCloud(all, recoverable);
    marked.forEach(t => {
        if (!all.some(x => String(x.id) === String(t.id))) all.push(t);
    });
    setActiveTimers(all);
    dispatchTimersToDOM();
    alert(tp('alertRecovered', { n: recoverable.length }));
    renderSidePanel();
}

function exportConfig() {
    const payload = {
        version: 2,
        exportedAt: new Date().toISOString(),
        config,
        activeTimers: getActiveTimers()
    };
    const b = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.download = `timer_backup_${Date.now()}.json`;
    a.click();
}

function importConfig(e) {
    const r = new FileReader();
    r.onload = (x) => {
        const data = JSON.parse(x.target.result);
        if (data.config) {
            config = data.config;
            if (Array.isArray(data.activeTimers)) {
                setActiveTimers(data.activeTimers);
            }
        } else {
            config = data;
        }
        saveConfig();
        location.reload();
    };
    r.readAsText(e.target.files[0]);
}

function delTask(id) { 
    const allSavedData = getActiveTimers();
    const target = allSavedData.find(t => String(t.id) === String(id));
    if(target) triggerUndo('計時器', target, target.taskName || '計時器');
    setActiveTimers(allSavedData.filter(t => String(t.id) !== String(id)), { immediateCloud: true });
    dispatchTimersToDOM();
    if (onboardingActive && onboardingCreatedTimerId != null && String(id) === String(onboardingCreatedTimerId)) {
        setTimeout(() => {
            if (!onboardingActive) return;
            const steps = getOnboardingSteps();
            const cur = steps[onboardingStepIndex];
            if (cur?.id === 'delete-timer') goOnboardingStepById('undo-tip');
        }, 320);
    }
}

function removeAcc(i) {
    const acc = config.accounts[i];
    if (!acc) return;
    if (!confirm(tp('confirmDeleteAcc', { name: acc.email }))) return;
    triggerUndo(t('undoSettings'), JSON.parse(JSON.stringify(config)), acc.email);
    const email = acc.email;
    config.accounts.splice(i, 1);
    const allSavedData = getActiveTimers();
    setActiveTimers(allSavedData.filter(t => t.email !== email));
    saveConfig();
    refreshMainDisplay();
}
function removeChar(ai, ci) {
    const c = config.accounts[ai].characters[ci];
    const charName = typeof c === 'string' ? c : c.name;
    triggerUndo(t('undoSettings'), JSON.parse(JSON.stringify(config)), charName);
    config.accounts[ai].characters.splice(ci, 1);
    saveConfig(); refreshMainDisplay();
}
function removeTask(i) {
    const taskName = config.tasks[i].name;
    triggerUndo(t('undoSettings'), JSON.parse(JSON.stringify(config)), taskName);
    config.tasks.splice(i, 1);
    saveConfig(); refreshMainDisplay();
}
function removeSubTask(ti, si) {
    const subName = config.tasks[ti].subs[si];
    triggerUndo(t('undoSettings'), JSON.parse(JSON.stringify(config)), subName);
    config.tasks[ti].subs.splice(si, 1);
    saveConfig(); refreshMainDisplay();
}

function startTask() { 
    if(totalSec <= 0) {
        if (onboardingActive) updateOnboardingChrome();
        return;
    }
    const acc = document.getElementById('accSelect').value;
    const char = document.getElementById('charSelect').value; 
    const tObj = config.tasks[document.getElementById('taskSelect').value]; 
    const ts = (tObj.subs.length && document.getElementById('subTaskSelect').value) ? document.getElementById('subTaskSelect').value : ''; 
    const fThres = parseInt(document.getElementById('fMin').value)*60 + parseInt(document.getElementById('fSec').value); 
    const notifyOnFinish = document.getElementById('notifyOnFinish')?.checked !== false;
    requestNotificationPermissionIfNeeded();
    const newTimerData = { id: Date.now(), email: acc, char: char, taskName: tObj.name + (ts ? ` (${ts})` : ''), dur: totalSec, fThres: fThres, finishDate: new Date(Date.now() + totalSec * 1000).toISOString(), taskBase: tObj.name, notifyOnFinish };
    const allSavedData = getActiveTimers();
    allSavedData.push(newTimerData);
    setActiveTimers(allSavedData, { immediateCloud: true });
    saveLocalSnapshot({
        createdAt: Date.now(),
        label: newTimerData.taskName,
        timerId: newTimerData.id
    });
    resetTime(); dispatchTimersToDOM();
    if (isMobileLayout()) closeStartSheet();
    else closeSidePanel();
}

function saveConfig() {
    normalizeConfig();
    applyTimerCardMinWidth();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    touchLocalUpdated();
    scheduleCloudSync();
    renderSidePanel();
}
function timerBelongsToTask(t, taskName) {
    if (t.taskBase === taskName) return true;
    if (t.taskBase != null && t.taskBase !== '') return false;
    const name = t.taskName || '';
    if (name === taskName) return true;
    return name.startsWith(taskName + ' (') && name.endsWith(')');
}

function syncTimersAfterTaskRename(oldName, newName) {
    if (!oldName || !newName || oldName === newName) return;
    const all = getActiveTimers();
    let changed = false;
    all.forEach(t => {
        if (!timerBelongsToTask(t, oldName)) return;
        t.taskBase = newName;
        if (t.taskName === oldName) {
            t.taskName = newName;
        } else {
            const prefix = oldName + ' (';
            if ((t.taskName || '').startsWith(prefix) && (t.taskName || '').endsWith(')')) {
                const sub = t.taskName.slice(prefix.length, -1);
                t.taskName = `${newName} (${sub})`;
            }
        }
        changed = true;
    });
    if (changed) setActiveTimers(all);
}

function syncTimersAfterSubRename(taskName, oldSub, newSub) {
    if (!taskName || !oldSub || !newSub || oldSub === newSub) return;
    const oldFull = `${taskName} (${oldSub})`;
    const newFull = `${taskName} (${newSub})`;
    const all = getActiveTimers();
    let changed = false;
    all.forEach(t => {
        if (!timerBelongsToTask(t, taskName)) return;
        if (t.taskName !== oldFull) return;
        t.taskName = newFull;
        t.taskBase = taskName;
        changed = true;
    });
    if (changed) setActiveTimers(all);
}

function renameAccount(i) {
    const oldEmail = config.accounts[i].email;
    const newVal = prompt(t('promptRenameAcc'), oldEmail);
    if (!newVal || newVal === oldEmail) return;
    config.accounts[i].email = newVal;
    const allSavedData = getActiveTimers();
    allSavedData.forEach(t => { if (t.email === oldEmail) t.email = newVal; });
    setActiveTimers(allSavedData);
    saveConfig();
    refreshMainDisplay();
}
function renameChar(ai, ci) {
    const c = config.accounts[ai].characters[ci];
    const oldName = typeof c === 'string' ? c : c.name;
    const newVal = prompt(t('promptRenameChar'), oldName);
    if (!newVal || newVal === oldName) return;
    if (typeof c === 'string') config.accounts[ai].characters[ci] = newVal;
    else c.name = newVal;
    const email = config.accounts[ai].email;
    const allSavedData = getActiveTimers();
    allSavedData.forEach(t => { if (t.email === email && t.char === oldName) t.char = newVal; });
    setActiveTimers(allSavedData);
    saveConfig();
    refreshMainDisplay();
}
function renameSubTask(ti, si) {
    const taskName = config.tasks[ti].name;
    const oldSub = config.tasks[ti].subs[si];
    const newVal = prompt(t('promptRenameSub'), oldSub);
    if (!newVal || newVal === oldSub) return;
    config.tasks[ti].subs[si] = newVal;
    syncTimersAfterSubRename(taskName, oldSub, newVal);
    saveConfig();
    refreshMainDisplay();
}
function addCharacter(i) { const n = prompt(t('promptCharName')); if(n){ config.accounts[i].characters.push(n); saveConfig(); } }
function renameTask(i) {
    const oldVal = config.tasks[i].name;
    const newVal = prompt(t('promptTaskTag'), oldVal);
    if (!newVal || newVal === oldVal) return;
    config.tasks[i].name = newVal;
    syncTimersAfterTaskRename(oldVal, newVal);
    saveConfig();
    renderSidePanel();
    refreshMainDisplay();
}

function updateSectionColor(k, v) { config.colors[k] = v; saveConfig(); } 
function updateTaskColorItem(i, v) { config.tasks[i].color = v; saveConfig(); renderSidePanel(); } 
function updateAccountColor(i, v) { config.accounts[i].color = v; saveConfig(); refreshMainDisplay(); }

function addAccount() { const n = document.getElementById('newEmailInput').value; if(n){ config.accounts.push({email:n, characters:[], color:defaultAccColors[config.accounts.length%6]}); saveConfig(); } }
function saveTask() { const n = document.getElementById('newTaskInput').value; if(n){ config.tasks.push({name:n, subs:[], color:config.colors.task}); saveConfig(); } }

function saveCurrentTasksAsDefault() {
    if (!confirm(t('confirmSaveDefaultTags'))) return;
    normalizeConfig();
    config.defaultTasks = cloneTasks(config.tasks);
    saveConfig();
    alert(t('alertDefaultTagsSaved'));
}

function resetDefaultTasks() {
    if (!confirm(t('confirmResetTasks'))) return;
    triggerUndo(t('undoSettings'), JSON.parse(JSON.stringify(config)), t('allTags'));
    config.tasks = getUserDefaultTasks();
    uiState.editingTaskIdx = null;
    uiState.allTasksExpanded = false;
    uiState.collapsedTaskIndices.clear();
    saveConfig();
    updateStartSectionTheme();
}

function addSubTask(i) { const n = document.getElementById(`subIn-${i}`).value; if(n){ config.tasks[i].subs.push(n); saveConfig(); } }

function adj(s) { totalSec += s; updateDisp(); }
function resetTime() { totalSec = 0; updateDisp(); }

function triggerTimeValueFlash(ids) {
    if (!ids || !ids.length) return;
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.remove('time-value-flash');
        void el.offsetWidth;
        el.classList.add('time-value-flash');
        const clear = () => el.classList.remove('time-value-flash');
        el.addEventListener('animationend', clear, { once: true });
    });
}

function readTimeUiSnapshot() {
    const el = id => document.getElementById(id);
    return {
        d: parseInt(el('in-d')?.value, 10) || 0,
        h: parseInt(el('in-h')?.value, 10) || 0,
        m: parseInt(el('in-m')?.value, 10) || 0,
        s: parseInt(el('in-s')?.value, 10) || 0,
        timeText: el('timeDisplay')?.textContent || ''
    };
}

function flashTimeFieldsIfChanged(prev, next) {
    const ids = [];
    if (prev.d !== next.d) ids.push('in-d');
    if (prev.h !== next.h) ids.push('in-h');
    if (prev.m !== next.m) ids.push('in-m');
    if (prev.s !== next.s) ids.push('in-s');
    if (prev.timeText !== next.timeText) ids.push('timeDisplay');
    triggerTimeValueFlash(ids);
}

function updateDisp() {
    const prev = readTimeUiSnapshot();
    const dispH = Math.floor(totalSec / 3600), dispM = Math.floor((totalSec % 3600) / 60), dispS = totalSec % 60;
    const timeText = `${String(dispH).padStart(2,'0')}:${String(dispM).padStart(2,'0')}:${String(dispS).padStart(2,'0')}`;
    document.getElementById('timeDisplay').textContent = timeText;
    let rem = totalSec; const d = Math.floor(rem / 86400); rem %= 86400; const h = Math.floor(rem / 3600); rem %= 3600; const m = Math.floor(rem / 60); const s = rem % 60;
    document.getElementById('in-d').value = d; document.getElementById('in-h').value = h; document.getElementById('in-m').value = m; document.getElementById('in-s').value = s;
    flashTimeFieldsIfChanged(prev, { d, h, m, s, timeText });
}

function updateSecFromDhms() {
    const prev = readTimeUiSnapshot();
    const d = prev.d, h = prev.h, m = prev.m, s = prev.s;
    totalSec = (d * 86400) + (h * 3600) + (m * 60) + s;
    const timeText = `${String(Math.floor(totalSec / 3600)).padStart(2,'0')}:${String(Math.floor((totalSec % 3600) / 60)).padStart(2,'0')}:${String(totalSec % 60).padStart(2,'0')}`;
    document.getElementById('timeDisplay').textContent = timeText;
    flashTimeFieldsIfChanged(prev, { d, h, m, s, timeText });
}

function updateCharSelect() { 
    const a = config.accounts.find(x=>x.email===document.getElementById('accSelect').value); 
    document.getElementById('charSelect').innerHTML = a ? a.characters.map(c => {
        const name = typeof c === 'string' ? c : c.name;
        return `<option value="${name}">${name}</option>`;
    }).join('') : ''; 
}

function getSelectedTaskColor() {
    const el = document.getElementById('taskSelect');
    if (!el || !config.tasks.length) return config.colors.task;
    const t = config.tasks[parseInt(el.value, 10)];
    return (t && t.color) ? t.color : config.colors.task;
}

function updateStartSectionTheme() {
    const color = getSelectedTaskColor();
    ['sec-start', 'sec-start-entry', 'startSheet'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.setProperty('--section-color', color);
    });
    const timeEl = document.getElementById('timeDisplay');
    if (timeEl) timeEl.style.color = color;
}

function updateSubTaskSelect() {
    const tIdx = document.getElementById('taskSelect').value;
    const t = config.tasks[tIdx];
    const sSelect = document.getElementById('subTaskSelect');
    const wrap = document.getElementById('subTaskFieldWrap');
    const row = document.getElementById('taskSubRow');
    const hasSubs = !!(t && t.subs.length && sSelect);
    if (hasSubs) {
        if (wrap) wrap.style.display = '';
        sSelect.innerHTML = t.subs.map(x => `<option value="${x}">${x}</option>`).join('');
    } else if (wrap) {
        wrap.style.display = 'none';
    }
    if (row) row.classList.toggle('start-field-row--task-only', !hasSubs);
    updateStartSectionTheme();
}

let totalSec = 0;

loadUndoStackFromStorage();
window.addEventListener('beforeunload', () => { if (isCloudSyncActive()) flushCloudSyncNow(); });
document.addEventListener('visibilitychange', () => {
    if (!isCloudSyncActive()) return;
    if (document.visibilityState === 'hidden') flushCloudSyncNow();
    else pullCloudIfNewer().catch(e => console.error('pullCloudIfNewer', e));
});
function shouldPullCloudOnPageShow(e) {
    if (!isCloudSyncActive()) return false;
    if (e && e.persisted) return true;
    const nav = performance.getEntriesByType('navigation')[0];
    return nav && (nav.type === 'reload' || nav.type === 'back_forward');
}

window.addEventListener('pageshow', (e) => {
    if (!shouldPullCloudOnPageShow(e)) return;
    mergeCloudFromRemote().catch(err => console.error('mergeCloudFromRemote on pageshow', err));
});
document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (onboardingActive) {
        skipInteractiveTutorial();
        return;
    }
    closeTutorialModal();
    closeStartSheet();
});
window.addEventListener('resize', () => {
    syncLayoutForViewport();
    syncNotifyPermissionUi();
});
(async () => {
    await initI18n();
    applyLangFromStorage();
    updateTutorialModalChrome();
    await initCloudSync();
    renderSidePanel();
    refreshMainDisplay();
    syncPanelMobileControls();
    lastLayoutWasMobile = isMobileLayout();
    initMobilePanelState();
    maybeStartInteractiveTutorial();
    syncFinishedNotifyState();
    registerAppServiceWorker();
    initNotifyBannerDismissButtons();
    initNotifyPermissionPressButtons();
    syncNotifyEnableBanner();
    runGlobalClockTick();
})();
