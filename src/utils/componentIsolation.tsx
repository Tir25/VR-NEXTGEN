/**
 * Component isolation utilities
 * Provides patterns for isolating component failures
 */

import React, { ComponentType, ReactNode } from 'react';
import IsolatedComponent from '@/components/common/IsolatedComponent';

export interface IsolationConfig {
  fallback?: ReactNode;
  onError?: (error: Error) => void;
  isolate?: boolean;
}

/**
 * Higher-order component for isolating components
 */
export function withIsolation<P extends object>(
  WrappedComponent: ComponentType<P>,
  config: IsolationConfig = {}
) {
  const IsolatedWrapper: React.FC<P> = (props) => {
    return (
      <IsolatedComponent
        fallback={config.fallback}
        onError={config.onError}
        isolate={config.isolate}
      >
        <WrappedComponent {...props} />
      </IsolatedComponent>
    );
  };

  IsolatedWrapper.displayName = `withIsolation(${WrappedComponent.displayName || WrappedComponent.name})`;

  return IsolatedWrapper;
}

/**
 * Hook for component isolation
 */
export function useComponentIsolation() {
  const [isolationState, setIsolationState] = React.useState({
    hasError: false,
    error: null as Error | null,
  });

  const handleError = React.useCallback((error: Error) => {
    setIsolationState({
      hasError: true,
      error,
    });
  }, []);

  const reset = React.useCallback(() => {
    setIsolationState({
      hasError: false,
      error: null,
    });
  }, []);

  return {
    isolationState,
    handleError,
    reset,
  };
}

/**
 * Create isolated component wrapper
 */
export function createIsolatedWrapper(config: IsolationConfig = {}) {
  return function IsolatedWrapper({ children }: { children: ReactNode }) {
    return (
      <IsolatedComponent
        fallback={config.fallback}
        onError={config.onError}
        isolate={config.isolate}
      >
        {children}
      </IsolatedComponent>
    );
  };
}
