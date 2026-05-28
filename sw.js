self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
    let title = '計時完成';
    let body = '';
    let tag = 'timer-finish';
    try {
        const data = event.data ? event.data.json() : {};
        if (data.title) title = data.title;
        if (data.body) body = data.body;
        if (data.tag) tag = data.tag;
    } catch (_) {}
    const options = { body, tag, renotify: true, data: { tag } };
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
            if (list.length) return list[0].focus();
            return self.clients.openWindow('./');
        })
    );
});
