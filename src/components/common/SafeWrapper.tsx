/**
 * Safe Wrapper Component
 * Provides error isolation and graceful fallbacks for components that might fail
 */

import React, { ReactNode, useState, useEffect, useCallback } from 'react';
import { errorHandler, AppError } from '@/utils/errorHandling';

export interface SafeWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: AppError) => void;
  isolate?: boolean; // If true, errors in children won't propagate up
  retryOnError?: boolean;
  maxRetries?: number;
  className?: string;
}

interface SafeWrapperState {
  hasError: boolean;
  error: AppError | null;
  retryCount: number;
}

export default function SafeWrapper({
  children,
  fallback,
  onError,
  isolate = true,
  retryOnError = false,
  maxRetries = 3,
  className = '',
}: SafeWrapperProps) {
  const [state, setState] = useState<SafeWrapperState>({
    hasError: false,
    error: null,
    retryCount: 0,
  });

  const handleError = useCallback((error: Error) => {
    const appError = errorHandler.createError(
      error.message,
      'SAFE_WRAPPER_ERROR',
      500,
      {
        component: 'SafeWrapper',
        retryCount: state.retryCount,
        isolate,
      }
    );

    errorHandler.handleError(appError);

    setState(prev => ({
      ...prev,
      hasError: true,
      error: appError as AppError,
    }));

    if (onError) {
      onError(appError as AppError);
    }

    // If not isolating, re-throw the error
    if (!isolate) {
      throw error;
    }
  }, [state.retryCount, isolate, onError]);

  const handleRetry = () => {
    setState(prev => ({
      hasError: false,
      error: null,
      retryCount: prev.retryCount + 1,
    }));
  };

  useEffect(() => {
    const handleUnhandledError = (event: ErrorEvent) => {
      if (isolate) {
        event.preventDefault();
        handleError(new Error(event.message));
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (isolate) {
        event.preventDefault();
        handleError(new Error(event.reason));
      }
    };

    window.addEventListener('error', handleUnhandledError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleUnhandledError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [isolate, handleError]);

  if (state.hasError && state.error) {
    if (fallback) {
      return <div className={className}>{fallback}</div>;
    }

    const canRetry = retryOnError && state.retryCount < maxRetries;

    return (
      <div className={`safe-wrapper-error ${className}`}>
        <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-semibold">Something went wrong</h3>
            <p className="text-sm text-red-500 mt-2">
              {errorHandler.getUserFriendlyMessage(state.error)}
            </p>
          </div>
          
          {canRetry && (
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Try Again ({state.retryCount}/{maxRetries})
            </button>
          )}
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-red-600">Error Details</summary>
              <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto">
                {JSON.stringify(state.error, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {children}
    </div>
  );
}

// Convenience wrapper for sections
export const SafeSection = (props: Omit<SafeWrapperProps, 'isolate'>) => (
  <SafeWrapper {...props} isolate={true} />
);

// Convenience wrapper for animations
export const SafeAnimation = (props: Omit<SafeWrapperProps, 'isolate' | 'retryOnError'>) => (
  <SafeWrapper {...props} isolate={true} retryOnError={true} maxRetries={2} />
);
