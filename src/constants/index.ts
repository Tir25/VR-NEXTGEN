/**
 * Constants System
 * Centralized constants to replace hardcoded values throughout the application
 */

// Re-export all constants
export * from './ui';

// Application-wide constants
export const APP_CONSTANTS = {
  // Application metadata
  APP_NAME: 'VR NextGEN Solutions',
  APP_VERSION: '1.2.0',
  APP_DESCRIPTION: 'Professional portfolio website for VR NextGEN Solutions, a data-driven consultancy.',
  
  // Environment
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
  
  // Build information
  BUILD_TIME: new Date().toISOString(),
  BUILD_HASH: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'unknown',
  
  // Feature flags
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  ENABLE_DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG_MODE === 'true',
  ENABLE_ERROR_REPORTING: process.env.NEXT_PUBLIC_ENABLE_ERROR_REPORTING === 'true',
} as const;

// Default values
export const DEFAULT_VALUES = {
  // UI defaults
  DEFAULT_ANIMATION_DURATION: 300,
  DEFAULT_TRANSITION_EASING: 'ease-in-out',
  DEFAULT_BORDER_RADIUS: '0.5rem',
  DEFAULT_SHADOW: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  
  // Performance defaults
  DEFAULT_DEBOUNCE_DELAY: 250,
  DEFAULT_THROTTLE_DELAY: 16,
  DEFAULT_TARGET_FPS: 60,
  
  // API defaults
  DEFAULT_TIMEOUT: 10000,
  DEFAULT_RETRY_ATTEMPTS: 3,
  DEFAULT_RETRY_DELAY: 1000,
  
  // Validation defaults
  DEFAULT_MIN_LENGTH: 1,
  DEFAULT_MAX_LENGTH: 1000,
  DEFAULT_REQUIRED_FIELD: true,
} as const;

// Magic numbers that were hardcoded
export const MAGIC_NUMBERS = {
  // Animation durations (ms)
  ANIMATION_DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 1000,
  },
  
  // Performance thresholds
  PERFORMANCE: {
    TARGET_FPS: 60,
    MOBILE_TARGET_FPS: 30,
    MAX_FRAME_TIME: 16.67, // 60fps = ~16.67ms per frame
    THROTTLE_DELAY: 16, // ~60fps
    DEBOUNCE_DELAY: 250,
  },
  
  // Breakpoints (px)
  BREAKPOINTS: {
    XS: 320,
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  },
  
  // Z-index layers
  Z_INDEX: {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
    TOAST: 1080,
  },
  
  // Timeouts and delays (ms)
  TIMEOUTS: {
    API_TIMEOUT: 10000,
    RETRY_DELAY: 1000,
    RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes
    PROCESSING_DELAY: 500,
    SUCCESS_MESSAGE_DISPLAY: 5000,
  },
  
  // Sizes and dimensions
  SIZES: {
    TOUCH_TARGET_MIN: 44, // Minimum touch target size in pixels
    CARD_WIDTH_DEFAULT: 180,
    CARD_HEIGHT_DEFAULT: 260,
    ICON_SIZE_SM: 16,
    ICON_SIZE_MD: 24,
    ICON_SIZE_LG: 32,
  },
  
  // Opacity values
  OPACITY: {
    OVERLAY_DEFAULT: 0.6,
    OVERLAY_HOVER: 0.3,
    TEXT_SECONDARY: 0.7,
    TEXT_TERTIARY: 0.5,
    BORDER_DEFAULT: 0.3,
    BORDER_HOVER: 0.5,
  },
} as const;

// Helper functions
export const ConstantsUtils = {
  // Get breakpoint value
  getBreakpoint: (size: keyof typeof MAGIC_NUMBERS.BREAKPOINTS): number => {
    return MAGIC_NUMBERS.BREAKPOINTS[size];
  },
  
  // Check if screen size matches breakpoint
  matchesBreakpoint: (size: keyof typeof MAGIC_NUMBERS.BREAKPOINTS): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= MAGIC_NUMBERS.BREAKPOINTS[size];
  },
  
  // Get animation duration
  getAnimationDuration: (speed: keyof typeof MAGIC_NUMBERS.ANIMATION_DURATION): number => {
    return MAGIC_NUMBERS.ANIMATION_DURATION[speed];
  },
  
  // Get z-index value
  getZIndex: (layer: keyof typeof MAGIC_NUMBERS.Z_INDEX): number => {
    return MAGIC_NUMBERS.Z_INDEX[layer];
  },
  
  // Get timeout value
  getTimeout: (type: keyof typeof MAGIC_NUMBERS.TIMEOUTS): number => {
    return MAGIC_NUMBERS.TIMEOUTS[type];
  },
  
  // Get size value
  getSize: (size: keyof typeof MAGIC_NUMBERS.SIZES): number => {
    return MAGIC_NUMBERS.SIZES[size];
  },
  
  // Get opacity value
  getOpacity: (type: keyof typeof MAGIC_NUMBERS.OPACITY): number => {
    return MAGIC_NUMBERS.OPACITY[type];
  },
} as const;
