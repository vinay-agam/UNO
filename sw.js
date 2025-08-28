const CACHE_NAME = 'localuno-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Background sync for future multiplayer features
self.addEventListener('sync', (event) => {
  if (event.tag === 'game-sync') {
    event.waitUntil(syncGameState());
  }
});

function syncGameState() {
  // Future implementation for syncing game state
  return Promise.resolve();
}