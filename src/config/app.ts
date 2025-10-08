/**
 * Application Configuration
 * Centralized configuration for the entire application
 */

// API Configuration
export const API_CONFIG = {
  endpoints: {
    contact: '/api/contact',
    health: '/api/health',
  },
  timeout: 10000, // 10 seconds
  retries: 3,
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // requests per window
  },
} as const;

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  scroll: {
    throttleDelay: 16, // ~60fps
    sectionThrottleDelay: 250,
    targetFPS: 60,
    performanceWarningThreshold: 30,
  },
  animation: {
    defaultDuration: 300,
    fastDuration: 150,
    slowDuration: 500,
    staggerDelay: 100,
  },
  lazy: {
    rootMargin: '200px',
    threshold: 0.1,
  },
} as const;

// UI Configuration
export const UI_CONFIG = {
  breakpoints: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
  spacing: {
    sectionPadding: {
      mobile: 'py-16',
      desktop: 'py-24',
    },
    containerPadding: {
      mobile: 'px-4',
      desktop: 'px-6 lg:px-8',
    },
  },
} as const;

// Security Configuration
export const SECURITY_CONFIG = {
  suspiciousUserAgents: [
    'sqlmap',
    'nikto',
    'nmap',
    'masscan',
    'zap',
    'burp',
    'w3af',
    'havij',
    'acunetix',
  ],
  suspiciousPatterns: [
    /\.\./, // Directory traversal
    /<script/i, // XSS attempts
    /union.*select/i, // SQL injection
    /eval\(/i, // Code injection
    /javascript:/i, // JavaScript protocol
  ],
  rateLimiting: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // requests per window
    message: 'Too many requests from this IP, please try again later.',
  },
} as const;

// Error Configuration
export const ERROR_CONFIG = {
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
  timeout: 30000, // 30 seconds
  fallbackMessages: {
    generic: 'Something went wrong. Please try again.',
    network: 'Network error. Please check your connection.',
    validation: 'Please check your input and try again.',
    server: 'Server error. Please try again later.',
  },
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  enableScrollOptimization: true,
  enableGSAPAnimations: true,
  enablePerformanceMonitoring: true,
  enableErrorReporting: true,
  enableAnalytics: false, // Set to true when analytics is needed
} as const;

// Development Configuration
export const DEV_CONFIG = {
  enableConsoleLogs: process.env.NODE_ENV === 'development',
  enableDebugMode: process.env.NODE_ENV === 'development',
  enablePerformanceProfiling: process.env.NODE_ENV === 'development',
} as const;
