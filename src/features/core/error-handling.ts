/**
 * Error Handling Feature
 * Comprehensive error handling utilities and components
 */

import React from 'react';
import { ErrorBoundary, withErrorBoundary, useErrorHandler } from '@/utils/errorBoundary';

// Error handling components
export { ErrorBoundary, withErrorBoundary, useErrorHandler };

// Error handling utilities
export const ErrorHandlingUtils = {
  // Safe component wrapper
  safeComponent: <P extends object>(Component: React.ComponentType<P>) =>
    withErrorBoundary(Component, {
      isolate: true,
      fallback: React.createElement(
        'div',
        {
          className: 'p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400',
        },
        'Component failed to load'
      ),
    }),

  // Error logging utility
  logError: (error: Error, context?: any) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      // Error logged
    }

    // In production, send to error reporting service
    // errorReportingService.report(errorData);
  },

  // Async error handler
  handleAsyncError: async <T>(asyncFn: () => Promise<T>, fallback?: T): Promise<T | undefined> => {
    try {
      return await asyncFn();
    } catch (error) {
      ErrorHandlingUtils.logError(error as Error);
      return fallback;
    }
  },
};
