import Foundation
import AppKit

@MainActor
final class TimerStore: ObservableObject {
    @Published var session: AuthSession?
    @Published var finishedTimers: [GameTimer] = []
    @Published var isLoading = false
    @Published var statusMessage = "尚未登入"
    @Published var lastUpdated: Date?

    private let api = SupabaseAPI()
    private var refreshTask: Task<Void, Never>?

    init() {
        session = KeychainHelper.loadSession()
        if session != nil {
            statusMessage = "已登入"
            startAutoRefresh()
        }
    }

    func signIn(email: String, password: String) async {
        isLoading = true
        defer { isLoading = false }
        do {
            let newSession = try await api.signIn(email: email.trimmingCharacters(in: .whitespacesAndNewlines), password: password)
            try KeychainHelper.saveSession(newSession)
            session = newSession
            statusMessage = "登入成功"
            await refreshFinishedTimers()
            startAutoRefresh()
        } catch {
            statusMessage = error.localizedDescription
        }
    }

    func signOut() {
        refreshTask?.cancel()
        refreshTask = nil
        KeychainHelper.deleteSession()
        session = nil
        finishedTimers = []
        lastUpdated = nil
        statusMessage = "已登出"
    }

    func refreshFinishedTimers() async {
        guard var current = session else {
            statusMessage = "請先登入"
            return
        }
        isLoading = true
        defer { isLoading = false }
        do {
            finishedTimers = try await api.fetchFinishedTimers(session: current)
            lastUpdated = .now
            statusMessage = finishedTimers.isEmpty ? "沒有已完成計時器" : "共 \(finishedTimers.count) 項已完成"
        } catch SupabaseAPIError.http(401, _) {
            do {
                current = try await api.refreshSession(current)
                try KeychainHelper.saveSession(current)
                session = current
                finishedTimers = try await api.fetchFinishedTimers(session: current)
                lastUpdated = .now
                statusMessage = finishedTimers.isEmpty ? "沒有已完成計時器" : "共 \(finishedTimers.count) 項已完成"
            } catch {
                statusMessage = "登入已過期，請重新登入"
                signOut()
            }
        } catch {
            statusMessage = error.localizedDescription
        }
    }

    func openWebApp() {
        guard let url = URL(string: AppConfig.webAppURL) else { return }
        NSWorkspace.shared.open(url)
    }

    private func startAutoRefresh() {
        refreshTask?.cancel()
        refreshTask = Task { [weak self] in
            while !Task.isCancelled {
                await self?.refreshFinishedTimers()
                let sec = AppConfig.refreshIntervalSeconds
                try? await Task.sleep(nanoseconds: UInt64(sec * 1_000_000_000))
            }
        }
    }
}
