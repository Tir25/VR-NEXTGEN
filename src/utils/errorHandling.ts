/**
 * Enhanced error handling utilities
 * Provides robust error handling patterns for the application
 */

import React from 'react';

export interface ErrorInfo {
  message: string;
  stack?: string;
  component?: string;
  timestamp: Date;
  userAgent?: string;
  url?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export interface AppError extends Error {
  code: string;
  status: number;
  context?: any;
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorLog: ErrorInfo[] = [];
  private maxLogSize = 100;

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  /**
   * Log an error with context
   */
  logError(error: Error, context?: string): void {
    const errorInfo: ErrorInfo = {
      message: error.message,
      stack: error.stack,
      component: context,
      timestamp: new Date(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    };

    this.errorLog.push(errorInfo);

    // Keep log size manageable
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog = this.errorLog.slice(-this.maxLogSize);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      // Error logged
    }
  }

  /**
   * Get error log
   */
  getErrorLog(): ErrorInfo[] {
    return [...this.errorLog];
  }

  /**
   * Clear error log
   */
  clearErrorLog(): void {
    this.errorLog = [];
  }

  /**
   * Handle async errors
   */
  async handleAsyncError<T>(
    asyncFn: () => Promise<T>,
    context?: string
  ): Promise<T | null> {
    try {
      return await asyncFn();
    } catch (error) {
      this.logError(error as Error, context);
      return null;
    }
  }

  /**
   * Create error boundary state
   */
  createErrorState(error: Error, errorInfo?: any): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: {
        message: error.message,
        stack: error.stack,
        timestamp: new Date(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
        url: typeof window !== 'undefined' ? window.location.href : undefined,
      },
    };
  }

  /**
   * Create error with code and status
   */
  createError(message: string, code: string, status: number, context?: any): Error {
    const error = new Error(message);
    (error as any).code = code;
    (error as any).status = status;
    if (context) {
      (error as any).context = context;
    }
    return error;
  }

  /**
   * Handle error (alias for logError)
   */
  handleError(error: Error, context?: string): void {
    this.logError(error, context);
  }

  /**
   * Get user-friendly error message
   */
  getUserFriendlyMessage(error: AppError | null): string {
    if (!error) {
      return 'An unexpected error occurred';
    }

    // Return user-friendly messages for common error codes
    switch (error.code) {
      case 'VALIDATION_ERROR':
        return 'Please check your input and try again';
      case 'NETWORK_ERROR':
        return 'Please check your internet connection and try again';
      case 'PERMISSION_ERROR':
        return 'You do not have permission to perform this action';
      case 'NOT_FOUND':
        return 'The requested resource was not found';
      case 'SERVER_ERROR':
        return 'A server error occurred. Please try again later';
      default:
        return error.message || 'An unexpected error occurred';
    }
  }
}

export const errorHandler = ErrorHandler.getInstance();

/**
 * Higher-order function for error handling
 */
export function withErrorHandling<T extends any[], R>(
  fn: (...args: T) => R,
  context?: string
): (...args: T) => R | null {
  return (...args: T): R | null => {
    try {
      return fn(...args);
    } catch (error) {
      errorHandler.logError(error as Error, context);
      return null;
    }
  };
}

/**
 * Async error handling wrapper
 */
export function withAsyncErrorHandling<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  context?: string
): (...args: T) => Promise<R | null> {
  return async (...args: T): Promise<R | null> => {
    try {
      return await fn(...args);
    } catch (error) {
      errorHandler.logError(error as Error, context);
      return null;
    }
  };
}

/**
 * Error boundary hook
 */
export function useErrorBoundary() {
  const [errorState, setErrorState] = React.useState<ErrorBoundaryState>({
    hasError: false,
  });

  const resetError = () => {
    setErrorState({ hasError: false });
  };

  const captureError = (error: Error, errorInfo?: any) => {
    const newErrorState = errorHandler.createErrorState(error, errorInfo);
    setErrorState(newErrorState);
  };

  return {
    errorState,
    resetError,
    captureError,
  };
}