/**
 * Performance Constants
 * Magic numbers and configuration values used across the application
 */

// Animation durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  FAST: 100,
  NORMAL: 200,
  SLOW: 300,
  VERY_SLOW: 500,
  TRANSITION: 300,
  DEBOUNCE: 100,
  THROTTLE: 16, // ~60fps
} as const;

// Viewport breakpoints
export const VIEWPORT_BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE_DESKTOP: 1280,
} as const;

// Carousel configuration
export const CAROUSEL_CONFIG = {
  MOBILE_RADIUS: 280,
  DESKTOP_RADIUS: 380,
  AUTO_ROTATE_INTERVAL: 5000,
  TOUCH_THRESHOLD: 10,
} as const;

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  LOW_END_DEVICE_WIDTH: 480,
  ANIMATION_DURATION_LOW_END: 200,
  ANIMATION_DURATION_NORMAL: 300,
} as const;

// Debounce and throttle delays
export const DELAYS = {
  DEBOUNCE_RESIZE: 100,
  DEBOUNCE_SCROLL: 16,
  THROTTLE_SCROLL: 16,
} as const;
