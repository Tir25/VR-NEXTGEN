/**
 * Service Worker Registration and Management
 * Handles PWA functionality and offline support
 */

// Global type declarations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
  const gtag: (...args: any[]) => void;
}

export const isLocalhost = Boolean(
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
   window.location.hostname === '[::1]' ||
   window.location.hostname.match(
     /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
   ))
);

interface ServiceWorkerConfig {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
}

export function register(config?: ServiceWorkerConfig) {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  // Only register in production to avoid dev reload loops
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  window.addEventListener('load', () => {
    const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

    if (isLocalhost) {
      // This is running on localhost. Let's check if a service worker still exists or not.
      checkValidServiceWorker(swUrl, config);

      // Add some additional logging to localhost, pointing developers to the
      // service worker/PWA documentation.
      navigator.serviceWorker.ready.then(() => {
        console.log(
          'This web app is being served cache-first by a service ' +
            'worker. To learn more, visit https://bit.ly/CRA-PWA'
        );
      });
    } else {
      // Is not localhost. Just register service worker
      registerValidSW(swUrl, config);
    }
  });
}

function checkValidServiceWorker(swUrl: string, config?: ServiceWorkerConfig) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed normally.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

function registerValidSW(swUrl: string, config?: ServiceWorkerConfig) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        
        if (!installingWorker) {
          return;
        }

        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // New content available, will be used when all tabs are closed

              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // Content cached for offline use

              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error during service worker registration:', error);
      }
    });
}


export function unregister() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error(error.message);
        }
      });
  }
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const criticalResources = [
    '/icons-optimized/logo-Final-png.png',
    '/icons-optimized/vr-logo-md.webp',
    '/images-optimized/Hero.webp'
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = resource.endsWith('.css') ? 'style' : 
             resource.match(/\.(png|jpg|jpeg|gif|webp|avif|svg)$/) ? 'image' : 'script';
    link.href = resource;
    document.head.appendChild(link);
  });
}

// Performance monitoring
export function trackPerformance() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (perfData) {
          const metrics = {
            loadTime: perfData.loadEventEnd - perfData.loadEventStart,
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            firstByte: perfData.responseStart - perfData.requestStart,
            domInteractive: perfData.domInteractive - perfData.fetchStart
          };

          // Performance metrics collected

          // Send to analytics if available
          if (typeof gtag !== 'undefined') {
            gtag('event', 'page_performance', {
              custom_map: {
                load_time: metrics.loadTime,
                dom_ready: metrics.domContentLoaded,
                first_byte: metrics.firstByte
              }
            });
          }
        }
      }, 0);
    });
  }
}
