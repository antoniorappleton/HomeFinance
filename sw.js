// sw.js
const CACHE = "finance-cache-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./main.js",
  "./manifest.json",
  "./icon-192x192.png",
  "./icon-512x512.png"
];

// instala e guarda assets no cache
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// ativa e limpa caches antigos
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// responde às requests
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp =>
      resp || fetch(e.request).then(fresh => {
        if (e.request.url.startsWith(self.location.origin)) {
          const copy = fresh.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, copy));
        }
        return fresh;
      })
    ).catch(() => new Response("Offline", { status: 503 }))
  );
});
