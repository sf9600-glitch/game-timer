import Foundation

struct GameTimer: Identifiable, Decodable, Hashable {
    let id: Double
    let email: String?
    let char: String?
    let taskName: String?
    let finishDate: String?
    let notifyOnFinish: Bool?

    var finishDateValue: Date? {
        guard let finishDate else { return nil }
        return Self.parseDate(finishDate)
    }

    var isFinished: Bool {
        guard let end = finishDateValue else { return false }
        return end.timeIntervalSinceNow <= 0
    }

    var displayTitle: String {
        let task = (taskName ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
        let charName = (char ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
        if !charName.isEmpty && charName != "（未指定角色）" {
            if task.isEmpty { return charName }
            return "\(charName) · \(task)"
        }
        return task.isEmpty ? "計時器" : task
    }

    func elapsedDescription(reference: Date = .now) -> String {
        guard let end = finishDateValue else { return "" }
        let seconds = max(0, Int(reference.timeIntervalSince(end)))
        if seconds < 60 { return "剛剛完成" }
        let minutes = seconds / 60
        if minutes < 60 { return "已完成 \(minutes) 分鐘" }
        let hours = minutes / 60
        if hours < 24 { return "已完成 \(hours) 小時" }
        let days = hours / 24
        return "已完成 \(days) 天"
    }

    private static func parseDate(_ string: String) -> Date? {
        let withFraction = ISO8601DateFormatter()
        withFraction.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        if let d = withFraction.date(from: string) { return d }
        let plain = ISO8601DateFormatter()
        plain.formatOptions = [.withInternetDateTime]
        return plain.date(from: string)
    }
}

struct CloudSnapshotPayload: Decodable {
    let activeTimers: [GameTimer]?
}

struct CloudSnapshotRow: Decodable {
    let payload: CloudSnapshotPayload?
    let updatedAt: String?

    enum CodingKeys: String, CodingKey {
        case payload
        case updatedAt = "updated_at"
    }
}

struct AuthSession: Codable {
    let accessToken: String
    let refreshToken: String
    let userId: String
    let email: String

    enum CodingKeys: String, CodingKey {
        case accessToken = "access_token"
        case refreshToken = "refresh_token"
        case user
    }

    enum UserKeys: String, CodingKey {
        case id
        case email
    }

    init(accessToken: String, refreshToken: String, userId: String, email: String) {
        self.accessToken = accessToken
        self.refreshToken = refreshToken
        self.userId = userId
        self.email = email
    }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        accessToken = try c.decode(String.self, forKey: .accessToken)
        refreshToken = try c.decode(String.self, forKey: .refreshToken)
        let user = try c.nestedContainer(keyedBy: UserKeys.self, forKey: .user)
        userId = try user.decode(String.self, forKey: .id)
        email = try user.decode(String.self, forKey: .email)
    }

    func encode(to encoder: Encoder) throws {
        var c = encoder.container(keyedBy: CodingKeys.self)
        try c.encode(accessToken, forKey: .accessToken)
        try c.encode(refreshToken, forKey: .refreshToken)
        var user = c.nestedContainer(keyedBy: UserKeys.self, forKey: .user)
        try user.encode(userId, forKey: .id)
        try user.encode(email, forKey: .email)
    }
}
