---
name: ui-iteration-playbook
description: >-
  After multi-turn UI/layout debugging that reaches the user's expected result,
  writes a reusable prompt playbook Markdown under docs/. Use when the user
  confirms satisfaction (e.g. 對、就是這樣、可以了), asks to save/export the
  iteration as prompts, mentions Notion/Markdown playbook, or after 3+ back-and-forth
  turns on the same visual/layout issue in index.html or similar UI work.
---

# UI 迭代 Playbook（提示詞範本輸出）

## 何時執行

在以下情況**主動詢問**是否要產生 Playbook（一句即可）；若用戶同意或已明確要求，**立即撰寫檔案**：

- 同一 UI／版面問題來回 **≥3 輪** 後，用戶表示滿意
- 用戶說：「就是這樣」「對」「可以了」「謝謝」且剛完成版面微調
- 用戶要求：存成 Markdown、給 Notion、下次怎麼下提示詞、整理這次修改

用戶若說「不用」則跳過。

## 輸出位置與檔名

- 目錄：`docs/`（專案根目錄下；若無則建立）
- 檔名：`{主題簡稱}-提示詞範本.md`（繁體中文可接受，例如 `文字列表版面-提示詞範本.md`）
- 若同主題已存在：更新該檔或詢問是否覆寫

## 撰寫前：從對話萃取

回顧本 thread（或摘要）並記錄：

1. **最終版面／行為**（一句話 + 可選 ASCII 示意）
2. **用戶原話中曾誤解的說法** → **應改用的精確說法**（對照表）
3. **技術踩坑**（瀏覽器、CSS 選擇器、class 衝突等），僅保留下次仍有用的
4. **可複製的提示詞模板**（完整區塊，用戶可直接貼給 AI）
5. **一句話極簡版**提示詞
6. **可選**：附圖時怎麼描述（圖一錯／圖二對）

勿貼長篇程式 diff；Playbook 給**未來的自己**下指令用，不是 PR 說明。

## 固定 Markdown 結構

```markdown
# {標題}

> 適用：{檔案/功能，如 index.html 文字列表模式}
> 達成日期：{YYYY-MM-DD}

## 最終效果（一句話）

{描述}

## 建議的提示詞模板（複製用）

\`\`\`
{多行提示詞，含版面示意與編號需求}
\`\`\`

## 有截圖時可加

\`\`\`
{附圖說明句}
\`\`\`

## 為什麼這樣寫比較快

| 容易誤解 | 建議改說 |
|----------|----------|
| ... | ... |

## 技術備註（可選）

- {Safari / 避免 subgrid / 勿用 margin-left: auto 等}

## 一句話極簡版

> {單行提示詞}

## 匯入 Notion

1. Notion → Import → Markdown → 選此檔
2. 或全選複製貼到新頁面
```

## 執行步驟

1. 依上結構寫入 `docs/{檔名}.md`
2. 回覆用戶：檔案路徑 + 如何匯入 Notion（兩行即可）
3. **不要**自動 commit；除非用戶要求

## 限制（回覆用戶時可簡述）

- Agent **無法**直接寫入 Notion 帳號，僅能產生本機 Markdown
- 「完全自動」需用戶確認滿意或同意產生；可在滿意時說：**「整理成 playbook」**
