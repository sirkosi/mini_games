// named cache in Cache Storage
const CACHE_NAME = 'mini-games-v1';

// list of requests whose responses will be pre-cached at install
const INITIAL_CACHED_RESOURCES = [
    '/mini_games/',
    '/mini_games/index.html',
    '/mini_games/paint.html',
    '/mini_games/worm.html'
];

// install event handler (note async operation)
// opens named cache, pre-caches identified resources above
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(INITIAL_CACHED_RESOURCES);
    })());
});

// fetch event handler
self.addEventListener('fetch', event => {
    event.respondWith((async () => {
        // Try to get the response from cache
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);

        if (cachedResponse) {
            return cachedResponse;
        }

        // If not in cache, fetch from network
        try {
            const networkResponse = await fetch(event.request);
            // Cache the new response for future use
            if (networkResponse.ok) {
                cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
        } catch (error) {
            // If offline and not cached, return a basic response
            console.log('Fetch failed; returning offline page instead.', error);
            // You could return a custom offline page here
            return new Response('Offline - Page not available', {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({
                    'Content-Type': 'text/plain'
                })
            });
        }
    })());
});

// activate event handler
self.addEventListener('activate', event => {
    event.waitUntil((async () => {
        // Clean up old caches
        const cacheNames = await caches.keys();
        await Promise.all(
            cacheNames.map(cacheName => {
                if (cacheName !== CACHE_NAME) {
                    return caches.delete(cacheName);
                }
            })
        );
    })());
});
