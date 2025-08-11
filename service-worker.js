const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/images/icon1.png',
    '/images/icon2.png'
];

self.addEventListener('install', event => {
    // 서비스 워커 설치 시 파일들을 캐시(저장)
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('캐시가 성공적으로 열렸습니다.');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    // 네트워크 요청이 있을 때 캐시에서 먼저 찾기
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // 캐시에서 찾으면 캐시된 응답 반환
            if (response) {
                return response;
            }
            // 캐시에 없으면 네트워크로 요청
            return fetch(event.request);
        })
    );
});






