#!/usr/bin/env bash
# Cursor Agent 改完 index.html 後自動部署（手動存檔請用 Run on Save 或 watch-deploy）
set -euo pipefail

input=$(cat)
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

if ! echo "$input" | grep -q 'index\.html'; then
  exit 0
fi

if [[ ! -f "$ROOT/index.html" ]]; then
  exit 0
fi

"$ROOT/scripts/deploy.sh" >/tmp/game-timer-deploy.log 2>&1 || true
exit 0
