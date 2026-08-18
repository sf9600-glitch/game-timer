import SwiftUI

@main
struct GameTimerMenuBarApp: App {
    @StateObject private var store = TimerStore()

    var body: some Scene {
        MenuBarExtra {
            MenuRootView()
                .environmentObject(store)
        } label: {
            menuBarLabel
        }
        .menuBarExtraStyle(.window)
    }

    @ViewBuilder
    private var menuBarLabel: some View {
        let count = store.finishedTimers.count
        if count > 0 {
            Text("⏱\(count)")
                .font(.system(size: 12, weight: .semibold))
        } else {
            Image(systemName: "timer")
        }
    }
}
