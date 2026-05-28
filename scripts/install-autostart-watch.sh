#!/usr/bin/env bash
# 一次安裝：開機登入後自動啟動 watch-deploy
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
AGENT_DIR="$HOME/Library/LaunchAgents"
PLIST_PATH="$AGENT_DIR/com.game.timer.watch-deploy.plist"
LOG_DIR="$ROOT/logs"
STDOUT_LOG="$LOG_DIR/watch-deploy.out.log"
STDERR_LOG="$LOG_DIR/watch-deploy.err.log"
LABEL="com.game.timer.watch-deploy"

mkdir -p "$AGENT_DIR"
mkdir -p "$LOG_DIR"

cat > "$PLIST_PATH" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>$LABEL</string>

  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>$ROOT/scripts/watch-deploy.sh</string>
  </array>

  <key>WorkingDirectory</key>
  <string>$ROOT</string>

  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>

  <key>StandardOutPath</key>
  <string>$STDOUT_LOG</string>
  <key>StandardErrorPath</key>
  <string>$STDERR_LOG</string>
</dict>
</plist>
EOF

# 先移除舊設定再重新載入，避免重複
launchctl bootout "gui/$(id -u)/$LABEL" >/dev/null 2>&1 || true
launchctl bootstrap "gui/$(id -u)" "$PLIST_PATH"
launchctl enable "gui/$(id -u)/$LABEL"
launchctl kickstart -k "gui/$(id -u)/$LABEL"

echo "✅ 已完成開機自動監聽安裝"
echo "   plist: $PLIST_PATH"
echo "   stdout: $STDOUT_LOG"
echo "   stderr: $STDERR_LOG"
echo ""
echo "之後每次開機登入，都會自動執行 watch-deploy。"
