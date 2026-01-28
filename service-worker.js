const CACHE_NAME = 'youngunmo-v4'; // 버전을 v4로 올리세요

// 설치 단계에서 대기하지 않고 즉시 활성화
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/youngunmo/',
        '/youngunmo/index.html',
        '/youngunmo/manifest.json'
      ]);
    })
  );
  self.skipWaiting(); // 핵심: 새 서비스 워커가 발견되면 즉시 설치
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Old Cache Deleted');
            return caches.delete(cache); // 옛날 캐시 삭제
          }
        })
      );
    })
  );
  return self.clients.claim(); // 핵심: 활성화 즉시 페이지 제어권 획득
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
