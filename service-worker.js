// Service Worker — offline cache for FIN (Fisheries Inspection Navigator)
importScripts('./js/config/appBundle.js');

const IMAGE_CACHE_NAME = 'fin-fisheries-images-v2';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(APP_CACHE_NAME)
            .then(cache => Promise.all(
                APP_CACHE_URLS.map(url =>
                    cache.add(url).catch(err => console.warn('SW precache skipped:', url, err))
                )
            ))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    if (event.request.destination === 'image' || url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
        event.respondWith(
            caches.open(IMAGE_CACHE_NAME).then(cache =>
                cache.match(event.request).then(response => {
                    if (response) return response;
                    return fetch(event.request).then(networkResponse => {
                        if (networkResponse.status === 200) {
                            cache.put(event.request, networkResponse.clone());
                        }
                        return networkResponse;
                    }).catch(() => new Response('', { status: 404 }));
                })
            )
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then(response =>
            response || fetch(event.request).then(networkResponse => {
                if (networkResponse.status === 200) {
                    const clone = networkResponse.clone();
                    caches.open(APP_CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return networkResponse;
            })
        )
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== APP_CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            )
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
