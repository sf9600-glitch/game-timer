#!/usr/bin/env bash
# 解除安裝：取消開機自動啟動 watch-deploy
set -euo pipefail

AGENT_DIR="$HOME/Library/LaunchAgents"
PLIST_PATH="$AGENT_DIR/com.game.timer.watch-deploy.plist"
LABEL="com.game.timer.watch-deploy"

launchctl bootout "gui/$(id -u)/$LABEL" >/dev/null 2>&1 || true
launchctl disable "gui/$(id -u)/$LABEL" >/dev/null 2>&1 || true
rm -f "$PLIST_PATH"

echo "✅ 已解除安裝開機自動監聽"
