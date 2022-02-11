import { manifest, version } from "@parcel/service-worker";

async function install() {
  self.skipWaiting();
  const cache = await caches.open(version);
  await cache.addAll(manifest);
}
addEventListener("install", (e) => e.waitUntil(install()));

async function activate() {
  await clients.claim();
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => key !== version && caches.delete(key)));
}
addEventListener("activate", (e) => e.waitUntil(activate()));

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
