/**
 * Enhanced error handling utilities
 * Provides comprehensive error management with context, recovery, and monitoring
 */

import { AppError } from './types';
import { logger } from '@/utils/logger';

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  sessionId?: string;
  timestamp?: number;
  metadata?: Record<string, unknown>;
}

export interface ErrorRecoveryOptions<T = unknown> {
  retry?: {
    maxAttempts: number;
    delay: number;
    backoff?: 'linear' | 'exponential';
  };
  fallback?: () => T;
  onRetry?: (attempt: number, error: Error) => void;
  onRecovery?: (result: T) => void;
  onFailure?: (error: Error) => void;
}

/**
 * Enhanced error class with context and recovery capabilities
 */
export class EnhancedError extends Error {
  public readonly code: string;
  public readonly status: number;
  public readonly context: ErrorContext;
  public readonly timestamp: number;
  public readonly stack?: string;
  public readonly cause?: Error;

  constructor(
    message: string,
    code: string = 'UNKNOWN_ERROR',
    status: number = 500,
    context: ErrorContext = {},
    cause?: Error
  ) {
    super(message);
    
    this.name = 'EnhancedError';
    this.code = code;
    this.status = status;
    this.timestamp = Date.now();
    this.context = {
      timestamp: this.timestamp,
      ...context,
    };
    this.cause = cause;
    
    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EnhancedError);
    }
  }

  /**
   * Serialize error for logging or API responses
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      status: this.status,
      context: this.context,
      timestamp: this.timestamp,
      stack: this.stack,
      cause: this.cause?.message,
    };
  }

  /**
   * Create a user-friendly error message
   */
  toUserMessage(): string {
    const userMessages: Record<string, string> = {
      VALIDATION_ERROR: 'Please check your input and try again',
      NETWORK_ERROR: 'Please check your internet connection and try again',
      PERMISSION_ERROR: 'You do not have permission to perform this action',
      NOT_FOUND: 'The requested resource was not found',
      SERVER_ERROR: 'A server error occurred. Please try again later',
      TIMEOUT_ERROR: 'The request timed out. Please try again',
      RATE_LIMIT_ERROR: 'Too many requests. Please wait a moment and try again',
      MAINTENANCE_ERROR: 'The service is temporarily unavailable for maintenance',
      UNKNOWN_ERROR: 'An unexpected error occurred. Please try again',
    };

    return userMessages[this.code] || userMessages.UNKNOWN_ERROR;
  }
}

/**
 * Error recovery manager with retry logic and fallbacks
 */
export class ErrorRecoveryManager {
  private static instance: ErrorRecoveryManager;
  private retryAttempts: Map<string, number> = new Map();

  static getInstance(): ErrorRecoveryManager {
    if (!ErrorRecoveryManager.instance) {
      ErrorRecoveryManager.instance = new ErrorRecoveryManager();
    }
    return ErrorRecoveryManager.instance;
  }

  /**
   * Execute function with error recovery
   */
  async executeWithRecovery<T>(
    operation: () => Promise<T>,
    options: ErrorRecoveryOptions = {},
    operationId?: string
  ): Promise<T> {
    const {
      retry = { maxAttempts: 3, delay: 1000, backoff: 'exponential' },
      fallback,
      onRetry,
      onRecovery,
      onFailure,
    } = options;

    const id = operationId || Math.random().toString(36).substr(2, 9);
    let lastError: Error = new Error('Operation failed');

    for (let attempt = 1; attempt <= retry.maxAttempts; attempt++) {
      try {
        const result = await operation();
        
        // Clear retry attempts on success
        this.retryAttempts.delete(id);
        
        if (onRecovery) {
          onRecovery(result);
        }
        
        return result;
      } catch (error) {
        lastError = error as Error;
        
        if (onRetry) {
          onRetry(attempt, lastError);
        }

        // Don't retry on certain error types
        if (this.isNonRetryableError(lastError)) {
          break;
        }

        // Wait before retry (except on last attempt)
        if (attempt < retry.maxAttempts) {
          const delay = this.calculateDelay(attempt, retry.delay, retry.backoff);
          await this.sleep(delay);
        }
      }
    }

    // All retries failed, try fallback
    if (fallback) {
      try {
        const fallbackResult = await fallback();
        if (onRecovery) {
          onRecovery(fallbackResult);
        }
        return fallbackResult as T;
      } catch (fallbackError) {
        if (onFailure) {
          onFailure(fallbackError as Error);
        }
        throw fallbackError;
      }
    }

    // No fallback, throw last error
    if (onFailure) {
      onFailure(lastError);
    }
    throw lastError;
  }

  private isNonRetryableError(error: Error): boolean {
    const nonRetryableCodes = [
      'VALIDATION_ERROR',
      'PERMISSION_ERROR',
      'NOT_FOUND',
      'RATE_LIMIT_ERROR',
    ];

    if (error instanceof EnhancedError) {
      return nonRetryableCodes.includes(error.code);
    }

    // Don't retry client errors (4xx)
    if ('status' in error && typeof error.status === 'number') {
      return error.status >= 400 && error.status < 500;
    }

    return false;
  }

  private calculateDelay(
    attempt: number,
    baseDelay: number,
    backoff: 'linear' | 'exponential' = 'exponential'
  ): number {
    switch (backoff) {
      case 'linear':
        return baseDelay * attempt;
      case 'exponential':
        return baseDelay * Math.pow(2, attempt - 1);
      default:
        return baseDelay;
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Error boundary hook for functional components
 */
export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const captureError = useCallback((error: Error, context?: ErrorContext) => {
    const enhancedError = error instanceof EnhancedError 
      ? error 
      : new EnhancedError(
          error.message,
          'COMPONENT_ERROR',
          500,
          context || {},
          error
        );
    
    setError(enhancedError);
    return enhancedError;
  }, []);

  const executeWithErrorBoundary = useCallback(async <T>(
    operation: () => Promise<T>,
    context?: ErrorContext
  ): Promise<T | null> => {
    try {
      const result = await operation();
      resetError();
      return result;
    } catch (error) {
      captureError(error as Error, context);
      return null;
    }
  }, [captureError, resetError]);

  return {
    error,
    resetError,
    captureError,
    executeWithErrorBoundary,
  };
}

/**
 * Global error handler with context and monitoring
 */
export class GlobalErrorHandler {
  private static instance: GlobalErrorHandler;
  private errorListeners: Array<(error: EnhancedError) => void> = [];
  private errorHistory: EnhancedError[] = [];

  static getInstance(): GlobalErrorHandler {
    if (!GlobalErrorHandler.instance) {
      GlobalErrorHandler.instance = new GlobalErrorHandler();
    }
    return GlobalErrorHandler.instance;
  }

  /**
   * Handle error with context and recovery
   */
  handleError(
    error: Error | EnhancedError,
    context: ErrorContext = {},
    recoveryOptions?: ErrorRecoveryOptions
  ): EnhancedError {
    const enhancedError = error instanceof EnhancedError 
      ? error 
      : new EnhancedError(
          error.message,
          'GLOBAL_ERROR',
          500,
          context,
          error
        );

    // Add to history
    this.errorHistory.push(enhancedError);
    if (this.errorHistory.length > 100) {
      this.errorHistory.shift(); // Keep only last 100 errors
    }

    // Notify listeners
    this.errorListeners.forEach(listener => {
      try {
        listener(enhancedError);
      } catch (listenerError) {
        logger.error('Error in error listener:', listenerError);
      }
    });

    // Log error
    this.logError(enhancedError);

    return enhancedError;
  }

  /**
   * Add error listener
   */
  addErrorListener(listener: (error: EnhancedError) => void): () => void {
    this.errorListeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.errorListeners.indexOf(listener);
      if (index > -1) {
        this.errorListeners.splice(index, 1);
      }
    };
  }

  /**
   * Get error history
   */
  getErrorHistory(): EnhancedError[] {
    return [...this.errorHistory];
  }

  /**
   * Clear error history
   */
  clearErrorHistory(): void {
    this.errorHistory = [];
  }

  private logError(error: EnhancedError): void {
    const logData = {
      ...error.toJSON(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      logger.error('Global Error:', logData);
    }

    // In production, you might want to send to an error monitoring service
    // Example: Sentry, LogRocket, etc.
    if (process.env.NODE_ENV === 'production') {
      // Send to error monitoring service
      this.sendToMonitoringService(logData);
    }
  }

  private sendToMonitoringService(logData: Record<string, unknown>): void {
    // Implement error monitoring service integration
    // Example: Sentry.captureException(logData);
    // Send to monitoring service (e.g., Sentry, LogRocket, etc.)
  }
}

/**
 * Utility functions for error handling
 */
export const ErrorUtils = {
  /**
   * Create error with context
   */
  createError: (
    message: string,
    code: string = 'UNKNOWN_ERROR',
    status: number = 500,
    context: ErrorContext = {}
  ): EnhancedError => {
    return new EnhancedError(message, code, status, context);
  },

  /**
   * Wrap async operation with error handling
   */
  wrapAsync: <T extends unknown[], R>(
    fn: (...args: T) => Promise<R>,
    context?: ErrorContext
  ) => {
    return async (...args: T): Promise<R> => {
      try {
        return await fn(...args);
      } catch (error) {
        const enhancedError = new EnhancedError(
          (error as Error).message,
          'ASYNC_ERROR',
          500,
          context,
          error as Error
        );
        
        GlobalErrorHandler.getInstance().handleError(enhancedError);
        throw enhancedError;
      }
    };
  },

  /**
   * Check if error is retryable
   */
  isRetryableError: (error: Error): boolean => {
    if (error instanceof EnhancedError) {
      return !['VALIDATION_ERROR', 'PERMISSION_ERROR', 'NOT_FOUND'].includes(error.code);
    }
    return true;
  },

  /**
   * Get user-friendly error message
   */
  getUserMessage: (error: Error): string => {
    if (error instanceof EnhancedError) {
      return error.toUserMessage();
    }
    return 'An unexpected error occurred. Please try again.';
  },
};

// Import required dependencies
import { useState, useCallback } from 'react';
