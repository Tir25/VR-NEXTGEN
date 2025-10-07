/**
 * Global Constants Configuration
 * Centralized constants for easy maintenance and updates
 */

// Carousel configuration
export const CAROUSEL_CONSTANTS = {
  // Rotation and animation
  FULL_CIRCLE: 360,
  TRANSITION_DURATION: 1000,
  ROTATION_SPEED: 0.3,
  SWIPE_THRESHOLD: 30,
  SNAP_THRESHOLD: 20,
  
  // Timing
  ANIMATION_DELAY: 100,
  DEBOUNCE_DELAY: 150,
  
  // Physics
  FRICTION: 0.95,
  SPRING_TENSION: 0.8,
  
  // Performance
  RAF_THROTTLE: 16, // 60fps
  RESIZE_THROTTLE: 100,
} as const;

// Animation constants
export const ANIMATION_CONSTANTS = {
  // Durations (ms)
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
  
  // Delays (ms)
  STAGGER_DELAY: 100,
  RIPPLE_DURATION: 600,
  
  // Count up animation
  COUNT_UP_DURATION: 2000,
  COUNT_UP_FPS: 60,
  COUNT_UP_INTERVAL: 16, // 1000ms / 60fps
  
  // Parallax
  PARALLAX_SPEED: 0.5,
  PARALLAX_THROTTLE: 16,
} as const;

// Layout constants
export const LAYOUT_CONSTANTS = {
  // Container constraints
  MAX_CONTAINER_WIDTH: '1536px',
  CONTAINER_PADDING: '1rem',
  
  // Section spacing
  SECTION_PADDING_TOP: '4rem',
  SECTION_PADDING_BOTTOM: '4rem',
  
  // Hero section
  HERO_MIN_HEIGHT: '100vh',
  HERO_IMAGE_OPACITY: 0.03,
  
  // Z-index values
  BACKGROUND: -10,
  CONTENT: 0,
  HEADER: 100,
  CAROUSEL_CONTROLS: 200,
  DROPDOWN: 1000,
  MODAL: 2000,
  TOAST: 3000,
} as const;

// Performance constants
export const PERFORMANCE_CONSTANTS = {
  // Throttling
  SCROLL_THROTTLE: 16, // 60fps
  RESIZE_THROTTLE: 100,
  MOUSE_MOVE_THROTTLE: 16,
  
  // Intersection Observer
  INTERSECTION_THRESHOLD: 0.1,
  INTERSECTION_ROOT_MARGIN: '50px 0px',
  
  // Lazy loading
  LAZY_LOAD_MARGIN: '100px',
  IMAGE_LOAD_TIMEOUT: 5000,
} as const;

// API and data constants
export const API_CONSTANTS = {
  // Rate limiting
  RATE_LIMIT_WINDOW: 60000, // 1 minute
  RATE_LIMIT_MAX_REQUESTS: 10,
  RETRY_AFTER: 60,
  
  // Request timeouts
  REQUEST_TIMEOUT: 10000,
  CONTACT_FORM_DELAY: 500,
  
  // Validation
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 254,
  MAX_MESSAGE_LENGTH: 1000,
} as const;

// Accessibility constants
export const ACCESSIBILITY_CONSTANTS = {
  // Focus management
  FOCUS_VISIBLE_OFFSET: '2px',
  SKIP_LINK_OFFSET: '2rem',
  
  // Screen reader
  SCREEN_READER_ONLY: 'sr-only',
  SKIP_TO_CONTENT: 'Skip to content',
  
  // ARIA labels
  CAROUSEL_LABEL: 'Industries carousel',
  NAVIGATION_LABEL: 'Main navigation',
  CONTENT_LABEL: 'Main content',
} as const;

// Color and theme constants
export const THEME_CONSTANTS = {
  // Opacity values
  BACKGROUND_OVERLAY: 0.8,
  CARD_OVERLAY: 0.9,
  GLOW_OPACITY: 0.3,
  
  // Gradient stops
  GRADIENT_STOPS: {
    start: '0%',
    middle: '50%',
    end: '100%',
  },
  
  // Border styles
  BORDER_WIDTH: '1px',
  BORDER_RADIUS: '0.75rem',
  FOCUS_RING_WIDTH: '2px',
} as const;

// Error handling constants
export const ERROR_CONSTANTS = {
  // Error messages
  GENERIC_ERROR: 'An unexpected error occurred',
  NETWORK_ERROR: 'Network connection failed',
  VALIDATION_ERROR: 'Please check your input',
  
  // Retry configuration
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  
  // Error boundaries
  FALLBACK_MESSAGE: 'Something went wrong. Please refresh the page.',
  REPORT_ERROR_TEXT: 'Report this error',
} as const;

// Development constants
export const DEV_CONSTANTS = {
  // Debug flags
  ENABLE_DEBUG_LOGS: process.env.NODE_ENV === 'development',
  ENABLE_PERFORMANCE_MONITORING: process.env.NODE_ENV === 'development',
  
  // Console styling
  CONSOLE_STYLES: {
    success: 'color: #10B981; font-weight: bold;',
    error: 'color: #EF4444; font-weight: bold;',
    warning: 'color: #F59E0B; font-weight: bold;',
    info: 'color: #3B82F6; font-weight: bold;',
  },
} as const;
