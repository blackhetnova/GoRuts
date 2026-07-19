const CACHE_NAME = 'sitilink-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
];

// Install Event - Caches local assets (robust with individual catches)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching App Shell assets');
        const cachePromises = ASSETS.map(asset => {
          return cache.add(asset).catch(err => {
            console.warn(`[Service Worker] Warning: Failed to pre-cache ${asset}:`, err);
          });
        });
        return Promise.all(cachePromises);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event - Cleans up old cache collections
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Serves cached items immediately if offline
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Only handle HTTP/HTTPS requests
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }
  
  // Skip caching for service worker itself
  if (url.pathname.endsWith('sw.js')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then(networkResponse => {
          // Cache newly fetched external resources if valid GET request
          if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone).catch(err => {
                // Ignore silent duplicate/concurrent write errors
                console.debug('[Service Worker] Cache put ignored:', err.message);
              });
            }).catch(err => {
              console.warn('[Service Worker] Cache open error:', err);
            });
          }
          return networkResponse;
        }).catch(err => {
          console.log('[Service Worker] Fetch failed:', err);
        });
      })
  );
});
