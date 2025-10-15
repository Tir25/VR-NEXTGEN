/**
 * Error Handling Feature
 * Comprehensive error handling utilities and components
 */

import ErrorBoundary from '@/components/common/ErrorBoundary';

// Error handling components
export { ErrorBoundary };

// Error handling utilities
export const ErrorHandlingUtils = {
  // Error logging utility
  logError: (error: Error, context?: unknown) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', errorData);
    }

    // In production, send to error reporting service
    // errorReportingService.report(errorData);
  },

  // Async error handler
  handleAsyncError: async <T>(
    asyncFn: () => Promise<T>,
    fallback?: T
  ): Promise<T | undefined> => {
    try {
      return await asyncFn();
    } catch (error) {
      ErrorHandlingUtils.logError(error as Error);
      return fallback;
    }
  },
};
