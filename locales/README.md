# 介面語系字串（i18n）

每個語言一個 JSON 檔，由 `index.html` 在啟動時以 `fetch` 載入。

## 檔案

| 檔案 | 說明 |
|------|------|
| `manifest.json` | 可用語言清單與預設語系 |
| `zh-TW.json` | 繁體中文 |
| `zh-CN.json` | 简体中文 |

## 新增語言（例如英文 `en`）

1. 複製 `zh-TW.json` 為 `locales/en.json`，翻譯所有字串（**key 不可改**）。
2. 在 `manifest.json` 的 `languages` 加入：
   ```json
   { "id": "en", "nativeName": "English" }
   ```
3. 在 `en.json` 內加入語言按鈕用字（若需要），例如：
   ```json
   "langEn": "English"
   ```
4. 用本機伺服器測試：`python3 -m http.server 8765`（不可直接雙擊開啟 `index.html`）。

程式內使用 `t('某個key')` 或 `tp('某個key', { n: 1 })`；缺字時會 fallback 到 `zh-TW`，再不行顯示 key 本身。
