/**
 * Enhanced Error Boundary Component
 * Provides robust error handling with recovery options
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { errorHandler, ErrorBoundaryState } from '@/utils/errorHandling';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string | number>;
  resetOnPropsChange?: boolean;
}

interface State extends ErrorBoundaryState {
  resetKey: number;
}

export default class ErrorBoundary extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      resetKey: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error with context
    errorHandler.logError(error, 'ErrorBoundary');

    // Update state with error info
    this.setState({
      error,
      errorInfo: {
        message: error.message,
        stack: error.stack,
        component: 'ErrorBoundary',
        timestamp: new Date(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
        url: typeof window !== 'undefined' ? window.location.href : undefined,
      },
    });

    // Call optional error callback
    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(prevProps: Props) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError, resetKey: _resetKey } = this.state;

    if (hasError && prevProps.resetKeys !== resetKeys) {
      if (resetOnPropsChange) {
        this.resetErrorBoundary();
      }
    }
  }

  componentWillUnmount() {
    // Cleanup handled by resetErrorBoundary
  }

  resetErrorBoundary = () => {

    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      resetKey: this.state.resetKey + 1,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <div className="error-boundary__content">
            <h2>Something went wrong</h2>
            <p>An error occurred while rendering this component.</p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-boundary__details">
                <summary>Error Details</summary>
                <pre className="error-boundary__stack">
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="error-boundary__actions">
              <button
                onClick={this.resetErrorBoundary}
                className="error-boundary__retry"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="error-boundary__reload"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
