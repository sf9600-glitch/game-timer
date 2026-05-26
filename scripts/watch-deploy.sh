#!/usr/bin/env bash
# 背景監聽：index.html / css/app.css / js/app.js 一存檔就自動 deploy
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v fswatch >/dev/null 2>&1; then
  echo "需要 fswatch。請執行: brew install fswatch"
  exit 1
fi

echo "👀 監聽中：儲存 index.html / css/app.css / js/app.js 會自動部署"
echo "   按 Ctrl+C 停止"
echo ""

fswatch -o "$ROOT/index.html" | while read -r _; do
  if "$ROOT/scripts/deploy.sh"; then
    echo ""
  fi
done
