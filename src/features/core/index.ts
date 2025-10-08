/**
 * Core Features
 * Essential features and utilities
 */

export * from './error-handling';

// Core feature configuration
export const CORE_FEATURES = {
  errorHandling: {
    enabled: true,
    fallbackUI: true,
    errorReporting: false, // Set to true when error reporting service is configured
  },
  performance: {
    enabled: true,
    monitoring: true,
    optimization: true,
  },
  accessibility: {
    enabled: true,
    keyboardNavigation: true,
    screenReaderSupport: true,
    colorContrast: true,
  },
  seo: {
    enabled: true,
    metaTags: true,
    structuredData: false, // Set to true when structured data is implemented
  },
} as const;
