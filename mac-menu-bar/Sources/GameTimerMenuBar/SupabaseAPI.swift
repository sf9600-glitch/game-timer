import Foundation

enum SupabaseAPIError: LocalizedError {
    case invalidResponse
    case http(Int, String)
    case notLoggedIn

    var errorDescription: String? {
        switch self {
        case .invalidResponse: return "伺服器回應異常"
        case .http(let code, let msg): return "錯誤 \(code)：\(msg)"
        case .notLoggedIn: return "請先登入雲端帳號"
        }
    }
}

struct SupabaseAPI {
    private let base = URL(string: AppConfig.supabaseURL)!

    func signIn(email: String, password: String) async throws -> AuthSession {
        var req = URLRequest(url: base.appendingPathComponent("auth/v1/token"))
        req.httpMethod = "POST"
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        req.setValue(AppConfig.supabaseAnonKey, forHTTPHeaderField: "apikey")
        var components = URLComponents(url: req.url!, resolvingAgainstBaseURL: false)!
        components.queryItems = [URLQueryItem(name: "grant_type", value: "password")]
        req.url = components.url
        req.httpBody = try JSONEncoder().encode(["email": email, "password": password])
        return try await decodeAuthResponse(from: req)
    }

    func refreshSession(_ session: AuthSession) async throws -> AuthSession {
        var req = URLRequest(url: base.appendingPathComponent("auth/v1/token"))
        req.httpMethod = "POST"
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        req.setValue(AppConfig.supabaseAnonKey, forHTTPHeaderField: "apikey")
        var components = URLComponents(url: req.url!, resolvingAgainstBaseURL: false)!
        components.queryItems = [URLQueryItem(name: "grant_type", value: "refresh_token")]
        req.url = components.url
        req.httpBody = try JSONEncoder().encode(["refresh_token": session.refreshToken])
        return try await decodeAuthResponse(from: req)
    }

    func fetchFinishedTimers(session: AuthSession) async throws -> [GameTimer] {
        var components = URLComponents(url: base.appendingPathComponent("rest/v1/timer_snapshots"), resolvingAgainstBaseURL: false)!
        components.queryItems = [
            URLQueryItem(name: "select", value: "payload,updated_at"),
            URLQueryItem(name: "user_id", value: "eq.\(session.userId)")
        ]
        var req = URLRequest(url: components.url!)
        req.httpMethod = "GET"
        req.setValue(AppConfig.supabaseAnonKey, forHTTPHeaderField: "apikey")
        req.setValue("Bearer \(session.accessToken)", forHTTPHeaderField: "Authorization")
        let (data, response) = try await URLSession.shared.data(for: req)
        try validate(response: response, data: data)
        let rows = try JSONDecoder().decode([CloudSnapshotRow].self, from: data)
        let timers = rows.first?.payload?.activeTimers ?? []
        return timers
            .filter { $0.isFinished }
            .sorted { ($0.finishDateValue ?? .distantPast) > ($1.finishDateValue ?? .distantPast) }
    }

    private func decodeAuthResponse(from request: URLRequest) async throws -> AuthSession {
        let (data, response) = try await URLSession.shared.data(for: request)
        try validate(response: response, data: data)
        struct AuthResponse: Decodable {
            let accessToken: String
            let refreshToken: String
            let user: User
            struct User: Decodable {
                let id: String
                let email: String?
            }
            enum CodingKeys: String, CodingKey {
                case accessToken = "access_token"
                case refreshToken = "refresh_token"
                case user
            }
        }
        let decoded = try JSONDecoder().decode(AuthResponse.self, from: data)
        return AuthSession(
            accessToken: decoded.accessToken,
            refreshToken: decoded.refreshToken,
            userId: decoded.user.id,
            email: decoded.user.email ?? ""
        )
    }

    private func validate(response: URLResponse, data: Data) throws {
        guard let http = response as? HTTPURLResponse else { throw SupabaseAPIError.invalidResponse }
        guard (200...299).contains(http.statusCode) else {
            let msg = String(data: data, encoding: .utf8) ?? "未知錯誤"
            throw SupabaseAPIError.http(http.statusCode, msg)
        }
    }
}
