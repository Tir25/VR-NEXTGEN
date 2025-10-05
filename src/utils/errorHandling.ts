/**
 * Centralized Error Handling System
 * Provides consistent error handling across the application
 */

export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  context?: Record<string, any>;
  timestamp: Date;
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  
  private constructor() {}
  
  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }
  
  /**
   * Creates a standardized error object
   */
  public createError(
    message: string,
    code?: string,
    statusCode?: number,
    context?: Record<string, any>
  ): AppError {
    const error = new Error(message) as AppError;
    error.code = code;
    error.statusCode = statusCode;
    error.context = context;
    error.timestamp = new Date();
    return error;
  }
  
  /**
   * Handles and logs errors consistently
   */
  public handleError(error: Error | AppError, context?: Record<string, any>): void {
    const appError = this.normalizeError(error, context);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error handled:', {
        message: appError.message,
        code: appError.code,
        statusCode: appError.statusCode,
        context: appError.context,
        timestamp: appError.timestamp,
        stack: appError.stack
      });
    }
    
    // In production, you might want to send to error tracking service
    // Example: this.sendToErrorService(appError);
  }
  
  /**
   * Normalizes different error types into AppError format
   */
  private normalizeError(error: Error | AppError, context?: Record<string, any>): AppError {
    if (this.isAppError(error)) {
      if (context) {
        error.context = { ...error.context, ...context };
      }
      return error;
    }
    
    return this.createError(
      error.message,
      'UNKNOWN_ERROR',
      500,
      context
    );
  }
  
  /**
   * Type guard for AppError
   */
  private isAppError(error: Error | AppError): error is AppError {
    return 'code' in error && 'timestamp' in error;
  }
  
  /**
   * Creates user-friendly error messages
   */
  public getUserFriendlyMessage(error: AppError): string {
    const errorMessages: Record<string, string> = {
      NETWORK_ERROR: 'Please check your internet connection and try again.',
      VALIDATION_ERROR: 'Please check your input and try again.',
      AUTHENTICATION_ERROR: 'Please log in again to continue.',
      AUTHORIZATION_ERROR: 'You do not have permission to perform this action.',
      NOT_FOUND_ERROR: 'The requested resource was not found.',
      SERVER_ERROR: 'Something went wrong on our end. Please try again later.',
      UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.'
    };
    
    return errorMessages[error.code || 'UNKNOWN_ERROR'] || errorMessages.UNKNOWN_ERROR;
  }
  
  /**
   * Determines if an error is recoverable
   */
  public isRecoverable(error: AppError): boolean {
    const recoverableCodes = [
      'NETWORK_ERROR',
      'VALIDATION_ERROR',
      'TEMPORARY_SERVER_ERROR'
    ];
    
    return recoverableCodes.includes(error.code || '');
  }
}

// Export singleton instance
export const errorHandler = ErrorHandler.getInstance();

// Common error codes
export const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  TEMPORARY_SERVER_ERROR: 'TEMPORARY_SERVER_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
} as const;

// Error boundary utilities
export const createErrorFallback = (error: AppError) => {
  const isRecoverable = errorHandler.isRecoverable(error);
  const userMessage = errorHandler.getUserFriendlyMessage(error);
  
  return {
    title: isRecoverable ? 'Something went wrong' : 'Error',
    message: userMessage,
    canRetry: isRecoverable,
    showDetails: process.env.NODE_ENV === 'development'
  };
};
