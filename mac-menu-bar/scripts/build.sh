#!/usr/bin/env bash
# 編譯 Mac 選單列版並產生 .app（需 Xcode / Swift 5.9+）
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
APP_NAME="遊戲計時器選單列"
BUNDLE_DIR="$ROOT/dist/${APP_NAME}.app"

echo "▶ 編譯中…"
swift build -c release

BIN="$ROOT/.build/release/GameTimerMenuBar"
if [[ ! -f "$BIN" ]]; then
  echo "❌ 找不到編譯結果"
  exit 1
fi

echo "▶ 建立 ${APP_NAME}.app …"
rm -rf "$BUNDLE_DIR"
mkdir -p "$BUNDLE_DIR/Contents/MacOS"
mkdir -p "$BUNDLE_DIR/Contents/Resources"

cp "$BIN" "$BUNDLE_DIR/Contents/MacOS/GameTimerMenuBar"
chmod +x "$BUNDLE_DIR/Contents/MacOS/GameTimerMenuBar"

cat > "$BUNDLE_DIR/Contents/Info.plist" <<'PLIST'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDevelopmentRegion</key>
    <string>zh-Hant</string>
    <key>CFBundleExecutable</key>
    <string>GameTimerMenuBar</string>
    <key>CFBundleIdentifier</key>
    <string>com.gametimer.menubar</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundleName</key>
    <string>遊戲計時器選單列</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>
    <key>CFBundleVersion</key>
    <string>1</string>
    <key>LSMinimumSystemVersion</key>
    <string>13.0</string>
    <key>LSUIElement</key>
    <true/>
    <key>NSHighResolutionCapable</key>
    <true/>
</dict>
</plist>
PLIST

echo ""
echo "✅ 已完成：$BUNDLE_DIR"
echo ""
echo "使用方式："
echo "  1. 雙擊 dist/${APP_NAME}.app"
echo "  2. 或拖到「應用程式」資料夾"
echo "  3. 選單列出現計時器圖示，點一下登入雲端帳號"
echo ""
