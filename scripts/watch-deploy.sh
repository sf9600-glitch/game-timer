#!/usr/bin/env bash
# 背景監聽：專案檔案一存檔就自動 deploy
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "👀 監聽中：儲存專案檔案會自動部署"
echo "   按 Ctrl+C 停止"
echo ""

run_deploy() {
  if "$ROOT/scripts/deploy.sh"; then
    echo ""
  fi
}

if command -v fswatch >/dev/null 2>&1; then
  fswatch -o \
    --exclude '(^|/)\.git/' \
    --exclude '(^|/)\.cursor/' \
    --exclude '(^|/)node_modules/' \
    --exclude '(^|/)agent-transcripts/' \
    --exclude '(^|/)terminals/' \
    --exclude '(^|/)logs/' \
    "$ROOT" | while read -r _; do
    run_deploy
  done
else
  echo "（未安裝 fswatch，改用輪詢模式，約每 2 秒檢查一次）"
  echo ""
  snapshot() {
    find "$ROOT" -type f \
      ! -path '*/.git/*' \
      ! -path '*/.cursor/*' \
      ! -path '*/node_modules/*' \
      ! -path '*/agent-transcripts/*' \
      ! -path '*/terminals/*' \
      ! -path '*/logs/*' \
      -exec stat -f '%m %z %N' {} \; 2>/dev/null | shasum -a 256 2>/dev/null | awk '{print $1}'
  }
  last="$(snapshot)"
  while true; do
    sleep 2
    current="$(snapshot)"
    if [[ "$current" != "$last" ]]; then
      last="$current"
      run_deploy
    fi
  done
fi
