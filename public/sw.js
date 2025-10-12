/**
 * Service Worker for VR NextGEN Solutions
 * Provides offline functionality and performance optimizations
 */

const CACHE_NAME = 'vr-nextgen-v1.0.0';
const STATIC_CACHE_NAME = 'vr-nextgen-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'vr-nextgen-dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/what-we-do',
  '/who-we-are',
  '/contact',
  '/icons-optimized/logo-Final-png.png',
  '/icons-optimized/vr-logo-md.webp',
  '/images-optimized/Hero.webp',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Activated successfully');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Strategy for different types of requests
  if (isStaticAsset(url)) {
    // Static assets: Cache First strategy
    event.respondWith(cacheFirst(request));
  } else if (isAPIRequest(url)) {
    // API requests: Network First strategy
    event.respondWith(networkFirst(request));
  } else {
    // Pages: Stale While Revalidate strategy
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Cache First strategy for static assets
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    return new Response('Offline content not available', { status: 503 });
  }
}

// Network First strategy for API requests
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response('API offline', { status: 503 });
  }
}

// Stale While Revalidate strategy for pages
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Network failed, return cached response if available
    return cachedResponse;
  });

  return cachedResponse || fetchPromise;
}

// Helper functions
function isStaticAsset(url) {
  return url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2|ttf|eot)$/);
}

function isAPIRequest(url) {
  return url.pathname.startsWith('/api/') || url.hostname.includes('api');
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  try {
    console.log('[SW] Syncing contact form submissions');
    
    // Get pending form submissions from IndexedDB
    const db = await openDB();
    const transaction = db.transaction(['contactForms'], 'readwrite');
    const store = transaction.objectStore('contactForms');
    const pendingSubmissions = await store.getAll();
    
    if (pendingSubmissions.length === 0) {
      console.log('[SW] No pending form submissions to sync');
      return;
    }
    
    console.log(`[SW] Found ${pendingSubmissions.length} pending submissions`);
    
    // Process each pending submission
    for (const submission of pendingSubmissions) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submission.data)
        });
        
        if (response.ok) {
          console.log('[SW] Successfully synced form submission:', submission.id);
          // Remove from IndexedDB after successful sync
          await store.delete(submission.id);
        } else {
          console.error('[SW] Failed to sync form submission:', submission.id, response.status);
        }
      } catch (error) {
        console.error('[SW] Error syncing form submission:', submission.id, error);
      }
    }
  } catch (error) {
    console.error('[SW] Error in syncContactForm:', error);
  }
}

// Helper function to open IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('VRNextGENOffline', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Create contact forms store if it doesn't exist
      if (!db.objectStoreNames.contains('contactForms')) {
        const store = db.createObjectStore('contactForms', { keyPath: 'id', autoIncrement: true });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
}

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/icons-optimized/vr-logo-md.webp',
      badge: '/icons-optimized/vr-logo-sm.webp',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      },
      actions: [
        {
          action: 'explore',
          title: 'Learn More',
          icon: '/icons-optimized/vr-logo-sm.webp'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/icons-optimized/vr-logo-sm.webp'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/what-we-do')
    );
  }
});
