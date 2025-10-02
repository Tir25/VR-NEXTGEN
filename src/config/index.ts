/**
 * VR NextGEN Configuration
 * Centralized configuration management following best practices
 */

export const config = {
  // Application metadata
  app: {
    name: 'VR NextGEN Solutions',
    description: 'Data-driven business consultancy and growth solutions',
    version: '1.0.0',
    author: 'VR NextGEN Solutions'
  },

  // API configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.vrnextgensolutions.com',
    timeout: 10000,
    retryAttempts: 3
  },

  // Feature flags
  features: {
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    enableContactForm: process.env.NEXT_PUBLIC_ENABLE_CONTACT_FORM === 'true',
    enableClientCarousel: process.env.NEXT_PUBLIC_ENABLE_CLIENT_CAROUSEL === 'true'
  },

  // Animation configuration
  animations: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)'
    }
  },

  // Performance configuration
  performance: {
    lazyLoadThreshold: 100,
    imageOptimization: true,
    enableCodeSplitting: true
  }
} as const;

export default config;
