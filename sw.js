// Minimal service worker for PWA installation
// No caching - just makes the app installable

self.addEventListener('install', event => {
    // Skip waiting to activate immediately
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    // Claim clients immediately
    event.waitUntil(self.clients.claim());
});

// Simple fetch handler - just pass through to network
self.addEventListener('fetch', event => {
    event.respondWith(fetch(event.request));
});
