/**
 * Isolated Component Wrapper
 * Ensures component errors do not affect other parts of the application
 */

import React, { Component, ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { errorHandler } from '@/utils/errorHandling';

interface IsolatedComponentProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error) => void;
  isolate?: boolean;
}

interface IsolatedComponentState {
  hasError: boolean;
  error?: Error;
}

export default class IsolatedComponent extends Component<
  IsolatedComponentProps,
  IsolatedComponentState
> {
  private errorBoundaryRef = React.createRef<ErrorBoundary>();

  constructor(props: IsolatedComponentProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<IsolatedComponentState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log error with isolation context
    errorHandler.logError(error, 'IsolatedComponent');

    // Call optional error callback
    this.props.onError?.(error);

    // Update state
    this.setState({
      hasError: true,
      error,
    });
  }

  reset = () => {
    this.setState({
      hasError: false,
      error: undefined,
    });
  };

  render() {
    const { children, fallback, isolate = true } = this.props;
    const { hasError, error } = this.state;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className='isolated-component-error'>
          <div className='isolated-component-error__content'>
            <h3>Component Error</h3>
            <p>This component encountered an error and has been isolated.</p>

            {process.env.NODE_ENV === 'development' && error && (
              <details className='isolated-component-error__details'>
                <summary>Error Details</summary>
                <pre className='isolated-component-error__stack'>{error.stack}</pre>
              </details>
            )}

            <div className='isolated-component-error__actions'>
              <button onClick={this.reset}>Retry Component</button>
            </div>
          </div>
        </div>
      );
    }

    if (isolate) {
      return (
        <ErrorBoundary
          ref={this.errorBoundaryRef}
          onError={(error, errorInfo) => {
            errorHandler.logError(error, 'IsolatedComponent:ErrorBoundary');
            this.props.onError?.(error);
          }}
        >
          {children}
        </ErrorBoundary>
      );
    }

    return <>{children}</>;
  }
}
