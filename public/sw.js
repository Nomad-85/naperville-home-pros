// Service Worker for Naperville Home Pros
const CACHE_NAME = 'naperville-home-pros-v1';
const OFFLINE_URL = '/offline';

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  '/',
  '/offline',
  '/images/logo.png',
  '/images/placeholder.jpg',
  '/site.webmanifest',
  '/favicon.ico'
];

// Install event - precache key resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Helper function to determine if request is for an API or dynamic route
const isApiOrDynamicRoute = (url) => {
  const { pathname } = new URL(url, location.href);
  return pathname.startsWith('/api/') || 
         pathname.includes('/_next/') ||
         pathname.includes('/admin/');
};

// Helper function to determine if request is for an HTML page
const isHtmlPageRequest = (request) => {
  const acceptHeader = request.headers.get('Accept') || '';
  return acceptHeader.includes('text/html') && 
         request.method === 'GET' &&
         !isApiOrDynamicRoute(request.url);
};

// Fetch event - network first with cache fallback for HTML pages,
// cache first with network fallback for assets
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // For HTML page requests - network first, then cache, then offline page
  if (isHtmlPageRequest(event.request)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache the response if it's valid
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(event.request)
            .then((cachedResponse) => {
              // Return cached response or offline page
              return cachedResponse || caches.match(OFFLINE_URL);
            });
        })
    );
  } 
  // For assets - cache first, then network
  else {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          // Return cached response if available
          if (cachedResponse) {
            return cachedResponse;
          }

          // Otherwise fetch from network
          return fetch(event.request)
            .then((response) => {
              // Don't cache API responses or bad responses
              if (isApiOrDynamicRoute(event.request.url) || !response || response.status !== 200) {
                return response;
              }

              // Cache the response for future use
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            })
            .catch(() => {
              // For image requests that fail, return a placeholder
              if (event.request.destination === 'image') {
                return caches.match('/images/placeholder.jpg');
              }
              // For other failed requests, just return the error
              return new Response('Network error', { status: 408, headers: { 'Content-Type': 'text/plain' } });
            });
        })
    );
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/images/logo.png',
    badge: '/images/badge.png',
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
