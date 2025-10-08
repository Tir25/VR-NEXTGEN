/**
 * Application Constants
 * All hard-coded values and magic numbers should be defined here
 */

// Animation Constants
export const ANIMATION_CONSTANTS = {
  durations: {
    fast: 150,
    normal: 300,
    slow: 500,
    verySlow: 1000,
  },
  delays: {
    stagger: 100,
    section: 200,
    component: 50,
  },
  easings: {
    easeInOut: 'ease-in-out',
    easeOut: 'ease-out',
    easeIn: 'ease-in',
    linear: 'linear',
  },
  // Additional animation constants
  COUNT_UP_DURATION: 2000,
  COUNT_UP_INTERVAL: 16, // ~60fps for smooth counting
  RIPPLE_DURATION: 600,
} as const;

// Scroll Constants
export const SCROLL_CONSTANTS = {
  throttle: {
    fast: 16, // ~60fps
    normal: 33, // ~30fps
    slow: 100, // 10fps
  },
  thresholds: {
    visibility: 0.1,
    intersection: 0.5,
    parallax: 0.3,
  },
  sections: [
    'hero',
    'services',
    'why',
    'cta',
    'what-we-do-hero',
    'who-we-are-hero',
    'customer-stories',
    'case-studies',
    'events',
    'industries',
    'contact-hero',
    'contact-form',
    'blog-header',
    'blog-feed',
  ],
} as const;

// API Constants
export const API_CONSTANTS = {
  statusCodes: {
    success: 200,
    created: 201,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    tooManyRequests: 429,
    serverError: 500,
  },
  messages: {
    success: 'Operation completed successfully',
    error: 'An error occurred',
    validation: 'Validation failed',
    unauthorized: 'Unauthorized access',
    notFound: 'Resource not found',
    rateLimited: 'Too many requests',
  },
  timeouts: {
    short: 5000, // 5 seconds
    medium: 10000, // 10 seconds
    long: 30000, // 30 seconds
  },
} as const;

// UI Constants
export const UI_CONSTANTS = {
  dimensions: {
    headerHeight: 80,
    footerHeight: 200,
    sidebarWidth: 280,
    maxWidth: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  colors: {
    primary: '#ffd700',
    secondary: '#FFBB01',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
} as const;

// Form Constants
export const FORM_CONSTANTS = {
  validation: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[\d\s\-\(\)]+$/,
    name: /^[a-zA-Z\s]{2,50}$/,
    message: {
      minLength: 10,
      maxLength: 1000,
    },
  },
  limits: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 5,
    maxMessageLength: 1000,
  },
  messages: {
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    invalidPhone: 'Please enter a valid phone number',
    minLength: 'Minimum length not met',
    maxLength: 'Maximum length exceeded',
    fileTooLarge: 'File size too large',
    tooManyFiles: 'Too many files selected',
  },
} as const;

// Carousel Constants
export const CAROUSEL_CONSTANTS = {
  autoplay: {
    delay: 5000, // 5 seconds
    pauseOnHover: true,
    disableOnInteraction: false,
  },
  navigation: {
    enabled: true,
    position: 'bottom',
  },
  pagination: {
    enabled: true,
    clickable: true,
  },
  breakpoints: {
    sm: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    md: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    lg: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
  // Industry carousel specific constants
  TRANSITION_DURATION: 800,
  ROTATION_SPEED: 0.02,
  SWIPE_THRESHOLD: 50,
  SNAP_THRESHOLD: 100,
  FULL_CIRCLE: 360,
} as const;

// Industry Card Constants
export const INDUSTRY_CARD_CONSTANTS = {
  dimensions: {
    mobile: {
      width: '280px',
      height: '200px',
    },
    tablet: {
      width: '320px',
      height: '240px',
    },
    desktop: {
      width: '360px',
      height: '280px',
    },
  },
  animation: {
    flipDuration: 800,
    hoverScale: 1.05,
    transitionDuration: 300,
  },
  textScaling: {
    mobile: {
      category: '0.75rem',
      title: '1rem',
      description: '0.875rem',
      icon: '1.5rem',
    },
    desktop: {
      category: '0.875rem',
      title: '1.25rem',
      description: '1rem',
      icon: '2rem',
    },
  },
} as const;

// Service Card Constants
export const SERVICE_CARD_CONSTANTS = {
  dimensions: {
    iconSize: '4rem',
    minHeight: '300px',
  },
  animation: {
    hoverScale: 1.02,
    transitionDuration: 300,
    staggerDelay: 100,
  },
  features: {
    maxDisplayed: 5,
    showMoreThreshold: 3,
  },
} as const;

// Background Constants
export const BACKGROUND_CONSTANTS = {
  effects: {
    gridOpacity: 0.03,
    auroraIntensity: 0.1,
    shineIntensity: 0.05,
    vignetteIntensity: 0.1,
  },
  cursor: {
    updateThrottle: 16, // ~60fps
    defaultX: 0.5,
    defaultY: 0.5,
  },
  sections: {
    hero: 'hero',
    services: 'services',
    why: 'why-choose',
    cta: 'hero',
    industries: 'industries',
    contact: 'hero',
  },
} as const;

// Error Constants
export const ERROR_CONSTANTS = {
  codes: {
    NETWORK_ERROR: 'NETWORK_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
    AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
    NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
    COMPONENT_ERROR: 'COMPONENT_ERROR',
    ANIMATION_ERROR: 'ANIMATION_ERROR',
  },
  messages: {
    NETWORK_ERROR: 'Network connection failed',
    VALIDATION_ERROR: 'Input validation failed',
    AUTHENTICATION_ERROR: 'Authentication required',
    AUTHORIZATION_ERROR: 'Access denied',
    NOT_FOUND_ERROR: 'Resource not found',
    SERVER_ERROR: 'Internal server error',
    COMPONENT_ERROR: 'Component rendering failed',
    ANIMATION_ERROR: 'Animation failed to load',
  },
  retry: {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 10000,
  },
} as const;