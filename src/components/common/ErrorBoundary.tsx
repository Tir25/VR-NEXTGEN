/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing
 * Follows VR NextGEN design system and accessibility standards
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Here you would typically send error to monitoring service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="card card--shadow border border-red-500/20 rounded-lg p-8 bg-black/40 max-w-md text-center">
            <div className="card__content">
              <div className="card__header">
                <div className="text-6xl mb-4" aria-hidden="true">⚠️</div>
                <h2 className="card__title text-2xl font-bold text-red-400 mb-4">
                  Something went wrong
                </h2>
              </div>
              
              <div className="card__body">
                <p className="text-white/80 mb-6">
                  We&apos;re sorry, but something unexpected happened. 
                  Please try refreshing the page or contact support if the problem persists.
                </p>
                
                <div className="card__footer">
                  <button
                    onClick={() => window.location.reload()}
                    className="btn btn--primary btn--medium mr-4"
                    aria-label="Refresh the page"
                  >
                    Refresh Page
                  </button>
                  
                  <button
                    onClick={() => this.setState({ hasError: false })}
                    className="btn btn--secondary btn--medium"
                    aria-label="Try again"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
