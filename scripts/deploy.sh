#!/usr/bin/env bash
# 將網站檔案提交並推送到 GitHub → GitHub Pages 自動重新部署
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
STATUS_LOG="$ROOT/logs/deploy-last.txt"
mkdir -p "$ROOT/logs"
write_status() { echo "$1" | tee "$STATUS_LOG"; }

LOCK="${TMPDIR:-/tmp}/game-timer-deploy.lock"
if [[ -f "$LOCK" ]]; then
  exit 0
fi
touch "$LOCK"
trap 'rm -f "$LOCK"' EXIT

sleep 0.8

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "❌ 尚未初始化 Git。請依 AUTO_DEPLOY.md 完成一次性設定。"
  exit 1
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "❌ 尚未設定 GitHub remote (origin)。請依 AUTO_DEPLOY.md 連線。"
  exit 1
fi

git add -A
# 排除自動監聽產生的 log，避免「有上傳但網站沒變」
git restore --staged logs/ 2>/dev/null || true

if git diff --staged --quiet; then
  write_status "$(date '+%Y-%m-%d %H:%M:%S') — 沒有變更，略過上傳"
  exit 0
fi

CHANGED_FILES="$(git diff --staged --name-only)"

BRANCH="$(git branch --show-current 2>/dev/null || echo main)"
MSG="deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$MSG"
git push origin "$BRANCH"

{
  echo "✓ $(date '+%Y-%m-%d %H:%M:%S') 已推送到 GitHub"
  echo "   https://sf9600-glitch.github.io/game-timer/"
  echo "📦 本次上傳檔案："
  while IFS= read -r f; do
    [[ -n "$f" ]] && echo "   - $f"
  done <<< "$CHANGED_FILES"
} | tee "$STATUS_LOG"
