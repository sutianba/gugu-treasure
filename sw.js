// 咕咕冒险记 Service Worker —— 让"添加到主屏幕"后可离线打开
// 缓存策略：预缓存核心资源；HTML 网络优先（保证更新），其余缓存优先
const VERSION = 'gugu-v0.7';
const CORE = [
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;

  // 云端接口绝不缓存（排行榜数据必须实时）
  if (url.pathname.startsWith('/.cloud/')) return;

  // HTML：网络优先，失败回退缓存（保证发新版后玩家能拿到最新版）
  if (e.request.mode === 'navigate' || url.pathname.endsWith('index.html')) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // 同源静态资源：缓存优先
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(e.request).then(
        (hit) =>
          hit ||
          fetch(e.request).then((res) => {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put(e.request, copy));
            return res;
          })
      )
    );
  }
  // 跨域（如 CDN 上的云 SDK）：交给浏览器默认行为，避免缓存破坏 dev 渠道更新
});
