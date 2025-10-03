/**
 * Error handling utilities for VR NextGEN Solutions
 * Provides consistent error logging and handling across the application
 */

interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  timestamp?: string;
}

/**
 * Logs errors with context information
 * In production, this could be connected to error reporting services
 */
export function logError(error: Error, context?: ErrorContext): void {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    context: {
      ...context,
      timestamp: context?.timestamp || new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
    },
  };

  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.error('Application Error:', errorInfo);
  }

  // In production, send to error reporting service
  if (process.env.NODE_ENV === 'production') {
    // TODO: Implement error reporting service integration
    // Example: Sentry.captureException(error, { extra: context });
  }
}

/**
 * Creates a safe error handler for async operations
 */
export function createErrorHandler(context?: ErrorContext) {
  return (error: unknown) => {
    const err = error instanceof Error ? error : new Error(String(error));
    logError(err, context);
  };
}

/**
 * Wraps async functions with error handling
 */
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: ErrorContext
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      createErrorHandler(context)(error);
      throw error; // Re-throw to maintain error flow
    }
  }) as T;
}

/**
 * Safe JSON parsing with error handling
 */
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    logError(error as Error, { action: 'JSON_PARSE' });
    return fallback;
  }
}

/**
 * Safe localStorage operations with error handling
 */
export const safeStorage = {
  getItem: (key: string, fallback: string = ''): string => {
    try {
      if (typeof window === 'undefined') return fallback;
      return localStorage.getItem(key) || fallback;
    } catch (error) {
      logError(error as Error, { action: 'LOCAL_STORAGE_GET', component: 'safeStorage' });
      return fallback;
    }
  },

  setItem: (key: string, value: string): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      logError(error as Error, { action: 'LOCAL_STORAGE_SET', component: 'safeStorage' });
      return false;
    }
  },

  removeItem: (key: string): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      logError(error as Error, { action: 'LOCAL_STORAGE_REMOVE', component: 'safeStorage' });
      return false;
    }
  },
};
