/**
 * Advanced Error Boundary System
 * Comprehensive error handling with fallback UI and error reporting
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AppError } from './errorHandling';

interface ErrorBoundaryState {
  hasError: boolean;
  error: AppError | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: AppError, errorInfo: ErrorInfo) => void;
  resetKeys?: any[];
  isolate?: boolean;
  showDetails?: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: 'COMPONENT_ERROR',
        status: 500,
        context: {
          component: 'ErrorBoundary',
          timestamp: Date.now(),
        },
      } as AppError,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const appError: AppError = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: 'COMPONENT_ERROR',
      status: 500,
      context: {
        component: 'ErrorBoundary',
        errorInfo,
        timestamp: Date.now(),
      },
    };

    this.setState({
      error: appError,
      errorInfo,
    });

    // Call custom error handler
    if (this.props.onError) {
      this.props.onError(appError, errorInfo);
    }

    // Log error for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys } = this.props;
    const { hasError } = this.state;

    if (hasError && prevProps.resetKeys !== resetKeys) {
      this.resetErrorBoundary();
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: this.state.retryCount + 1,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className='min-h-[200px] flex items-center justify-center p-8'>
          <div className='max-w-md mx-auto text-center'>
            <div className='mb-4'>
              <div className='w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center'>
                <svg
                  className='w-8 h-8 text-red-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 15.5c-.77.833.192 2.5 1.732 2.5z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-white mb-2'>Something went wrong</h3>
              <p className='text-white/70 mb-4'>
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </p>
            </div>

            <div className='space-y-3'>
              <button
                onClick={this.resetErrorBoundary}
                className='w-full px-4 py-2 bg-gold text-black rounded-lg font-medium hover:bg-gold/90 transition-colors'
              >
                Try Again
              </button>

              <button
                onClick={() => window.location.reload()}
                className='w-full px-4 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors'
              >
                Refresh Page
              </button>
            </div>

            {/* Development error details */}
            {process.env.NODE_ENV === 'development' &&
              this.props.showDetails &&
              this.state.error && (
                <details className='mt-6 text-left'>
                  <summary className='cursor-pointer text-white/70 hover:text-white transition-colors'>
                    Error Details (Development)
                  </summary>
                  <div className='mt-2 p-4 bg-black/50 rounded-lg text-xs font-mono text-white/80 overflow-auto max-h-48'>
                    <div className='mb-2'>
                      <strong>Error:</strong> {this.state.error.message}
                    </div>
                    <div className='mb-2'>
                      <strong>Component Stack:</strong>
                      <pre className='mt-1 whitespace-pre-wrap'>
                        {this.state.errorInfo?.componentStack}
                      </pre>
                    </div>
                    <div>
                      <strong>Stack Trace:</strong>
                      <pre className='mt-1 whitespace-pre-wrap'>{this.state.error.stack}</pre>
                    </div>
                  </div>
                </details>
              )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

// Hook for error boundary functionality
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    const appError: AppError = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: 'HOOK_ERROR',
      status: 500,
      context: {
        hook: 'useErrorHandler',
        errorInfo,
        timestamp: Date.now(),
      },
    };

    // Log error
    console.error('Error caught by useErrorHandler:', appError);

    // In a real app, you might want to send this to an error reporting service
    // errorReportingService.report(appError);
  };
}
