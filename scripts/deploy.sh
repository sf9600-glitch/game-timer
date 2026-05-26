#!/usr/bin/env bash
# 將網站檔案提交並推送到 GitHub → GitHub Pages 自動重新部署
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

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

if git diff --staged --quiet; then
  exit 0
fi

BRANCH="$(git branch --show-current 2>/dev/null || echo main)"
MSG="deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$MSG"
git push origin "$BRANCH"

echo "✓ 已推送到 GitHub，GitHub Pages 約 1–3 分鐘內會更新："
echo "   https://sf9600-glitch.github.io/game-timer/"
