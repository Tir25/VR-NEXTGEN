import React, { Component, ErrorInfo, ReactNode } from 'react';
import { errorHandler, createErrorFallback, AppError } from '@/utils/errorHandling';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: AppError, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: AppError;
  errorInfo?: ErrorInfo;
}

/**
 * Error Boundary component for graceful error handling
 * Catches JavaScript errors anywhere in the child component tree
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Convert to AppError format
    const appError = errorHandler.createError(
      error.message,
      'COMPONENT_ERROR',
      500,
      { component: 'ErrorBoundary' }
    );
    
    // Update state so the next render will show the fallback UI
    return { hasError: true, error: appError };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const appError = errorHandler.createError(
      error.message,
      'COMPONENT_ERROR',
      500,
      { 
        component: 'ErrorBoundary',
        componentStack: errorInfo.componentStack,
        errorBoundary: true
      }
    );
    
    // Handle error through centralized system
    errorHandler.handleError(appError);
    
    // Update state with error info
    this.setState({ error: appError, errorInfo });
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(appError, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Get error details for fallback UI
      const errorDetails = this.state.error ? createErrorFallback(this.state.error) : null;
      const canRetry = errorDetails?.canRetry ?? true;

      // Default fallback UI with enhanced error information
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-lg">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {errorDetails?.title || 'Something went wrong'}
            </h2>
            <p className="text-white/70 mb-6">
              {errorDetails?.message || 'We\'re sorry, but something unexpected happened. Please try refreshing the page.'}
            </p>
            {canRetry && (
              <button
                onClick={() => window.location.reload()}
                className="btn-enhanced bg-gold text-black px-6 py-3 rounded font-semibold hover:bg-gold/90 transition-colors"
              >
                Refresh Page
              </button>
            )}
            {errorDetails?.showDetails && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-white/60 cursor-pointer hover:text-white transition-colors">
                  Error Details
                </summary>
                <div className="mt-2 p-4 bg-black/50 rounded text-red-400 text-sm overflow-auto">
                  <div className="mb-2">
                    <strong>Message:</strong> {this.state.error.message}
                  </div>
                  <div className="mb-2">
                    <strong>Code:</strong> {this.state.error.code}
                  </div>
                  <div className="mb-2">
                    <strong>Timestamp:</strong> {this.state.error.timestamp.toISOString()}
                  </div>
                  {this.state.error.context && (
                    <div className="mb-2">
                      <strong>Context:</strong>
                      <pre className="mt-1 text-xs">
                        {JSON.stringify(this.state.error.context, null, 2)}
                      </pre>
                    </div>
                  )}
                  <div>
                    <strong>Stack:</strong>
                    <pre className="mt-1 text-xs whitespace-pre-wrap">
                      {this.state.error.stack}
                    </pre>
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
