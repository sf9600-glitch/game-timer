# 遊戲計時器 — 上線與多人同步

讓朋友各自用 **Email + 密碼** 登入；每人一份資料，手機／電腦登入同一帳號會自動同步。

## 架構

| 項目 | 服務 | 費用 |
|------|------|------|
| 網頁託管 | GitHub Pages 或 Netlify | 免費 |
| 帳號 + 資料庫 | [Supabase](https://supabase.com) | 免費額度夠小團使用 |

---

## 第一步：建立 Supabase 專案

1. 到 https://supabase.com 註冊並 **New project**。
2. 左側 **SQL Editor** → 貼上並執行 `supabase/schema.sql` 的全部內容。
3. **Project Settings → API** 複製：
   - **Project URL** → 填進 `js/app.js` 的 `SUPABASE_URL`
   - **anon public** key → 填進 `SUPABASE_ANON_KEY`

在 `js/app.js` 搜尋 `SUPABASE_URL`：

```javascript
const SUPABASE_URL = 'https://xxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

4. **Authentication → Providers → Email**  
   - 建議關閉 **Confirm email**（朋友不用收驗證信即可登入）  
   - 路徑：Authentication → Sign In / Providers → Email → 關閉 “Confirm email”

5. **Authentication → URL Configuration**（部署後再改）  
   - **Site URL**：你的網站網址，例如 `https://你的帳號.github.io/game-timer/`  
   - **Redirect URLs**：同上（可加本機測試 `http://127.0.0.1:5500`）

---

## 第二步：放到 GitHub Pages

1. 在 GitHub 建立新 repo，例如 `game-timer`。
2. 把 `index.html`、`css/app.css`、`js/app.js`、`locales/`、`supabase/`、`DEPLOY.md` 推上去。
3. **Settings → Pages** → Source: **Deploy from branch** → `main` / `/ (root)`。
4. 幾分鐘後網址類似：`https://你的帳號.github.io/game-timer/`

把此網址填回 Supabase 的 Site URL。

### 本機先測（選用）

```bash
cd "/Users/yehvincent/Library/Mobile Documents/com~apple~CloudDocs/My AI programs"
python3 -m http.server 8765
```

瀏覽器開 http://127.0.0.1:8765/index.html ，在側欄「系統與主題」註冊測試帳號。

---

## 第三步：給朋友使用

1. 把 **網站連結** 傳給他們。
2. 每人點 **註冊**，用自己的 Email 與密碼（至少 6 字）。
3. 之後在任何裝置用 **同一組帳密登入** 即可同步帳號、標籤、進行中計時器。

---

## 常見問題

**Q：資料會跟別人混在一起嗎？**  
不會。資料庫用 Row Level Security，每人只能讀寫自己的 `user_id`。

**Q：沒登入能用嗎？**  
可以，資料只存在該瀏覽器的本機；登入後會依「較新」合併上傳／下載。

**Q：還想備份？**  
側欄仍有「匯出／匯入」完整 JSON 備份。

**Q：免費額度夠嗎？**  
幾個人、偶爾同步，Supabase 免費方案通常足夠。

---

## 其他託管方式

- **Netlify**：拖曳資料夾到 https://app.netlify.com/drop  
- **Cloudflare Pages**：連 GitHub repo 自動部署  

記得部署後更新 Supabase 的 Site URL。
