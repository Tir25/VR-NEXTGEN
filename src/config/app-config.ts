/**
 * VR NextGEN Application Configuration
 * Centralized configuration for easy customization and feature toggles
 */

// Feature flags for easy feature toggling
export const featureFlags = {
  enableAnalytics: process.env.NODE_ENV === 'production',
  enableErrorReporting: process.env.NODE_ENV === 'production',
  enablePerformanceMonitoring: true,
  enableLazyLoading: true,
  enableAnimations: true,
  enableParallax: true,
  enableTypewriter: true,
  enable3DTilt: true,
} as const;

// API configuration
export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
} as const;

// Navigation configuration
export const navigationConfig = {
  enableSmoothScrolling: true,
  enableSectionHighlighting: true,
  enableMobileMenu: true,
  enableKeyboardNavigation: true,
  scrollOffset: 80, // Offset for fixed header
} as const;

// Animation configuration
export const animationConfig = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  stagger: {
    fast: 50,
    normal: 100,
    slow: 200,
  },
} as const;

// Performance configuration
export const performanceConfig = {
  enableLazyLoading: true,
  lazyLoadRootMargin: '200px',
  enableImageOptimization: true,
  enableBundleOptimization: true,
  enableServiceWorker: process.env.NODE_ENV === 'production',
  maxConcurrentRequests: 5,
} as const;

// SEO configuration
export const seoConfig = {
  defaultTitle: 'VR NextGEN Solutions',
  defaultDescription: 'Data-driven consultancy solutions for business growth',
  defaultKeywords: [
    'business consultancy',
    'data-driven strategy',
    'inventory management',
    'production coaching',
    'analytics',
    'business insights',
  ],
  ogImage: '/images/og-image.jpg',
  twitterCard: 'summary_large_image',
  twitterSite: '@vrnextgen',
} as const;

// Contact configuration
export const contactConfig = {
  email: 'info@vrnextgensolutions.com',
  phone: '+91 94267 22001',
  address: 'Gandhinagar, Gujarat (382721), India',
} as const;

// Form configuration
export const formConfig = {
  enableValidation: true,
  enableAutoSave: false,
  autoSaveInterval: 30000, // 30 seconds
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
} as const;

// Theme configuration
export const themeConfig = {
  defaultTheme: 'dark',
  enableThemeSwitching: false, // Can be enabled for future light/dark mode
  enableCustomThemes: false,
  primaryColor: '#ffd700',
  secondaryColor: '#000000',
  accentColor: '#ffffff',
} as const;

// Export all configuration
export const appConfig = {
  featureFlags,
  apiConfig,
  navigationConfig,
  animationConfig,
  performanceConfig,
  seoConfig,
  contactConfig,
  formConfig,
  themeConfig,
} as const;

export type AppConfig = typeof appConfig;
