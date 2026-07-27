#!/usr/bin/env bash
# 將網站檔案提交並推送到 GitHub → GitHub Pages 自動重新部署
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
STATUS_LOG="$ROOT/logs/deploy-last.txt"
mkdir -p "$ROOT/logs"
write_status() { echo "$1" | tee "$STATUS_LOG"; }

LOCKDIR="${TMPDIR:-/tmp}/game-timer-deploy.lockdir"
DEBOUNCE_SEC=2

print_banner() {
  echo ""
  echo "════════════════════════════════════════"
  printf '  %s\n' "$1"
  echo "════════════════════════════════════════"
  echo ""
}

acquire_deploy_lock() {
  local waited=0
  while ! mkdir "$LOCKDIR" 2>/dev/null; do
    if [[ "$waited" -eq 0 ]]; then
      echo ""
      echo "⏳ 等待上一個部署完成…"
    fi
    sleep 0.3
    waited=$((waited + 1))
    if (( waited > 400 )); then
      print_banner "❌ 等待部署逾時，請稍後再試"
      exit 1
    fi
  done
}

acquire_deploy_lock
trap 'rmdir "$LOCKDIR" 2>/dev/null || true' EXIT

sleep "$DEBOUNCE_SEC"

echo ""
echo "▶ 開始部署 $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  print_banner "❌ 尚未初始化 Git（請依 AUTO_DEPLOY.md 設定）"
  exit 1
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  print_banner "❌ 尚未設定 GitHub remote（請依 AUTO_DEPLOY.md 設定）"
  exit 1
fi

git add -A
# 排除自動監聽產生的 log，避免「有上傳但網站沒變」
git restore --staged logs/ 2>/dev/null || true

if git diff --staged --quiet; then
  write_status "$(date '+%Y-%m-%d %H:%M:%S') — 沒有變更，略過上傳"
  print_banner "✅ 部署完成（沒有新變更，略過上傳）"
  printf '\a'
  exit 0
fi

CHANGED_FILES="$(git diff --staged --name-only)"
FILE_COUNT="$(printf '%s\n' "$CHANGED_FILES" | sed '/^$/d' | wc -l | tr -d ' ')"

BRANCH="$(git branch --show-current 2>/dev/null || echo main)"
MSG="deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$MSG"
git push origin "$BRANCH"

TS="$(date '+%Y-%m-%d %H:%M:%S')"
{
  echo "✓ ${TS} 已推送到 GitHub"
  echo "   https://sf9600-glitch.github.io/game-timer/"
  echo "📦 本次上傳 ${FILE_COUNT} 個檔案："
  while IFS= read -r f; do
    [[ -n "$f" ]] && echo "   - $f"
  done <<< "$CHANGED_FILES"
} | tee "$STATUS_LOG"

print_banner "✅ 已完成上傳（${FILE_COUNT} 個檔案）"
echo "   時間：${TS}"
echo "   網站：https://sf9600-glitch.github.io/game-timer/"
echo "   約 1–3 分鐘後請 Cmd+Shift+R 強制重新整理"
echo ""
echo "📦 本次上傳檔案："
while IFS= read -r f; do
  [[ -n "$f" ]] && echo "   - $f"
done <<< "$CHANGED_FILES"
echo ""

# 終端機提示音（macOS / 多數 Linux 終端機）
printf '\a'
