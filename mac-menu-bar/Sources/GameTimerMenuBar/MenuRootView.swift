import SwiftUI
import AppKit

struct MenuRootView: View {
    @EnvironmentObject private var store: TimerStore
    @State private var email = ""
    @State private var password = ""

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            header
            if store.session == nil {
                loginForm
            } else {
                finishedSection
            }
            footer
        }
        .padding(14)
        .frame(width: 320)
        .onAppear {
            if store.session != nil {
                Task { await store.refreshFinishedTimers() }
            }
        }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("遊戲計時器")
                .font(.headline)
            Text(store.statusMessage)
                .font(.caption)
                .foregroundStyle(.secondary)
                .lineLimit(2)
        }
    }

    private var loginForm: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("使用與網頁版相同的雲端帳號登入")
                .font(.caption)
                .foregroundStyle(.secondary)
            TextField("Email", text: $email)
                .textFieldStyle(.roundedBorder)
                .textContentType(.username)
            SecureField("密碼", text: $password)
                .textFieldStyle(.roundedBorder)
                .textContentType(.password)
            Button(store.isLoading ? "登入中…" : "登入雲端") {
                Task { await store.signIn(email: email, password: password) }
            }
            .disabled(store.isLoading || email.isEmpty || password.isEmpty)
        }
    }

    private var finishedSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Text("已完成")
                    .font(.subheadline.weight(.semibold))
                Spacer()
                Button {
                    Task { await store.refreshFinishedTimers() }
                } label: {
                    Image(systemName: "arrow.clockwise")
                }
                .buttonStyle(.plain)
                .disabled(store.isLoading)
            }

            if store.finishedTimers.isEmpty {
                Text("目前沒有已完成計時器")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .padding(.vertical, 8)
            } else {
                ScrollView {
                    VStack(spacing: 8) {
                        ForEach(store.finishedTimers) { timer in
                            FinishedTimerRow(timer: timer)
                        }
                    }
                }
                .frame(maxHeight: 280)
            }

            if let updated = store.lastUpdated {
                Text("更新：\(updated.formatted(date: .omitted, time: .standard))")
                    .font(.caption2)
                    .foregroundStyle(.tertiary)
            }
        }
    }

    private var footer: some View {
        VStack(spacing: 6) {
            Divider()
            Button("開啟網頁版") { store.openWebApp() }
            if store.session != nil {
                Button("登出", role: .destructive) { store.signOut() }
            }
            Button("結束") { NSApplication.shared.terminate(nil) }
                .keyboardShortcut("q")
        }
    }
}

struct FinishedTimerRow: View {
    let timer: GameTimer

    var body: some View {
        VStack(alignment: .leading, spacing: 3) {
            Text(timer.displayTitle)
                .font(.subheadline.weight(.medium))
                .lineLimit(2)
            Text(timer.elapsedDescription())
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(8)
        .background(RoundedRectangle(cornerRadius: 8).fill(Color(nsColor: .controlBackgroundColor)))
    }
}
