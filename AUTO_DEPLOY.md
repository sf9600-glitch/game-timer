# 存檔後自動更新 Netlify

流程：**改 index.html → 存檔 → 自動 git push → Netlify 從 GitHub 重新部署**

---

## 一次性設定（約 5 分钟）

### 1. 用 Cursor 打開正確資料夾

**File → Open Folder** → 選：

`My AI programs`（含 index.html 的那一層）

### 2. 連接 GitHub（若尚未連過）

在終端機執行（路徑照抄）：

```bash
cd "/Users/yehvincent/Library/Mobile Documents/com~apple~CloudDocs/My AI programs"

git init
git branch -M main
git remote add origin https://github.com/sf9600-glitch/game-timer.git

git add index.html netlify.toml supabase schema.sql DEPLOY.md AUTO_DEPLOY.md .gitignore .vscode .cursor scripts
git commit -m "Supabase timer with auto-deploy"

git pull origin main --allow-unrelated-histories --no-edit || true
git push -u origin main
```

若 `git push` 被拒（遠端較新），可先：

```bash
git pull origin main --rebase
git push origin main
```

### 3. 確認 Netlify 連到 GitHub

1. [app.netlify.com](https://app.netlify.com) → 站點 **sf9600**
2. **Site configuration → Build & deploy → Continuous deployment**
3. 應顯示連到 **sf9600-glitch/game-timer**，分支 **main**
4. 若沒連： **Link repository** → 選該 repo → Publish directory 填 **`.`**（或留空）

### 4. 安裝「存檔即執行」擴充（推薦）

1. Cursor 左側 **Extensions**
2. 搜尋 **Run on Save**（作者 emeraldwalk）
3. **Install**
4. 重新載入 Cursor（Cmd+Shift+P → Reload Window）

專案已含 `.vscode/settings.json`：只有存 **index.html** 會跑部署腳本。

### 5. 讓腳本可執行

```bash
chmod +x "/Users/yehvincent/Library/Mobile Documents/com~apple~CloudDocs/My AI programs/scripts/"*.sh
chmod +x "/Users/yehvincent/Library/Mobile Documents/com~apple~CloudDocs/My AI programs/.cursor/hooks/"*.sh
```

---

## 日常使用

1. 改 `index.html`
2. **Cmd + S** 存檔
3. 終端機或 Output 約 30–60 秒後，[https://sf9600.netlify.app](https://sf9600.netlify.app) 會更新
4. 瀏覽器用 **Cmd + Shift + R** 強制重新整理

手動部署一次：

```bash
bash scripts/deploy.sh
```

---

## 替代：終端機背景監聽（不用擴充）

```bash
cd "/Users/yehvincent/Library/Mobile Documents/com~apple~CloudDocs/My AI programs"
bash scripts/watch-deploy.sh
```

保持此終端機開著；每次存檔 `index.html` 會自動 push。  
若提示沒有 fswatch：`brew install fswatch`

---

## Cursor AI 改檔時

若用 Agent 改 `index.html`，專案內 `.cursor/hooks` 也會嘗試自動部署（需已啟用 Hooks）。

---

## 疑難排解

| 狀況 | 處理 |
|------|------|
| 存檔沒反應 | 確認已安裝 Run on Save，且資料夾是 `My AI programs` |
| push 要密碼 | 用 GitHub Personal Access Token 或 SSH key |
| Netlify 沒更新 | 到 Netlify **Deploys** 看是否失敗；確認 push 的是 `main` |
| 網站還是舊的 | Cmd+Shift+R 清快取 |
