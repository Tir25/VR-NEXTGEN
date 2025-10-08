/**
 * Feature Configuration
 * Centralized configuration for enabling/disabling features and feature flags
 */

export const FEATURE_FLAGS = {
  // Animation features
  animations: {
    enabled: true,
    reducedMotion: false,
    scrollAnimations: true,
    hoverEffects: true,
    parallaxEffects: true,
  },
  
  // Performance features
  performance: {
    lazyLoading: true,
    imageOptimization: true,
    codeSplitting: true,
    preloading: true,
  },
  
  // UI features
  ui: {
    darkMode: true,
    responsiveDesign: true,
    accessibility: true,
    keyboardNavigation: true,
  },
  
  // Analytics and tracking
  analytics: {
    enabled: false, // Set to true when analytics service is configured
    errorTracking: true,
    performanceMonitoring: true,
    userInteractionTracking: false,
  },
  
  // Security features
  security: {
    csrfProtection: true,
    rateLimiting: true,
    inputSanitization: true,
    securityHeaders: true,
  },
  
  // Development features
  development: {
    debugMode: process.env.NODE_ENV === 'development',
    hotReload: process.env.NODE_ENV === 'development',
    sourceMaps: process.env.NODE_ENV === 'development',
  },
} as const;

export const FEATURE_CONFIG = {
  // Animation durations (in milliseconds)
  animations: {
    fast: 150,
    normal: 300,
    slow: 500,
    verySlow: 1000,
  },
  
  // Performance thresholds
  performance: {
    targetFPS: 60,
    mobileTargetFPS: 30,
    maxFrameTime: 16.67, // 60fps = ~16.67ms per frame
    throttleDelay: 16, // ~60fps
    debounceDelay: 250,
  },
  
  // Breakpoints (in pixels)
  breakpoints: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  
  // Z-index layers
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080,
  },
  
  // API configuration
  api: {
    timeout: 10000,
    retryAttempts: 3,
    retryDelay: 1000,
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100,
    },
  },
} as const;

// Helper function to check if a feature is enabled
export function isFeatureEnabled(feature: string): boolean {
  const keys = feature.split('.');
  let value: any = FEATURE_FLAGS;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return false;
    }
  }
  
  return Boolean(value);
}

// Helper function to get feature configuration
export function getFeatureConfig(config: string): any {
  const keys = config.split('.');
  let value: any = FEATURE_CONFIG;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return undefined;
    }
  }
  
  return value;
}

// Environment-based configuration
export const ENV_CONFIG = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  
  // API endpoints
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  
  // Analytics
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  
  // Feature flags from environment
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  enableDebugMode: process.env.NEXT_PUBLIC_DEBUG_MODE === 'true',
} as const;
