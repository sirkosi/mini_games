// named cache in Cache Storage
const CACHE_NAME = 'painting-tools-v1';

// list of requests whose responses will be pre-cached at install
const INITIAL_CACHED_RESOURCES = [
    '/'
];

// install event handler (note async operation)
// opens named cache, pre-caches identified resources above
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(INITIAL_CACHED_RESOURCES);
    })());
});
