#!/usr/bin/env bash
# Agent 改網站檔後：實際部署交給 Run on Save（terminal 模式），避免重複 push 且確保終端機可見。
set -euo pipefail

input=$(cat)
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

if ! echo "$input" | grep -qE 'index\.html|css/app\.css|js/app\.js|locales/.+\.json'; then
  exit 0
fi

echo ""
echo "📝 Agent 已修改網站檔案"
echo "   → 約 1 秒後 Run on Save 會在「終端機」執行部署"
echo "   → 成功時請看終端機是否顯示：✅ 已完成上傳"
echo ""

exit 0
