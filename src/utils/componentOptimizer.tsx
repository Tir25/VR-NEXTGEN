/**
 * Component Optimization Utilities
 * Provides React-specific optimizations for better performance and maintainability
 * Includes memoization, lazy loading, and rendering optimizations
 */

import React, { 
  memo, 
  useMemo, 
  useCallback, 
  lazy, 
  Suspense, 
  ComponentType,
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

// Performance monitoring context
interface PerformanceContextType {
  trackRender: (componentName: string, renderTime: number) => void;
  trackRerender: (componentName: string) => void;
  getMetrics: () => Record<string, any>;
}

const PerformanceContext = createContext<PerformanceContextType | null>(null);

/**
 * Performance monitoring provider
 */
export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [metrics, setMetrics] = useState<Record<string, any>>({});
  const renderCounts = useRef<Record<string, number>>({});
  const renderTimes = useRef<Record<string, number[]>>({});

  const trackRender = useCallback((componentName: string, renderTime: number) => {
    setMetrics(prev => ({
      ...prev,
      [componentName]: {
        renderCount: (renderCounts.current[componentName] || 0) + 1,
        averageRenderTime: renderTime,
        totalRenderTime: (prev[componentName]?.totalRenderTime || 0) + renderTime,
      },
    }));

    renderCounts.current[componentName] = (renderCounts.current[componentName] || 0) + 1;
    renderTimes.current[componentName] = renderTimes.current[componentName] || [];
    renderTimes.current[componentName].push(renderTime);
  }, []);

  const trackRerender = useCallback((componentName: string) => {
    renderCounts.current[componentName] = (renderCounts.current[componentName] || 0) + 1;
  }, []);

  const getMetrics = useCallback(() => {
    return {
      ...metrics,
      renderCounts: { ...renderCounts.current },
      renderTimes: { ...renderTimes.current },
    };
  }, [metrics]);

  const contextValue = useMemo(() => ({
    trackRender,
    trackRerender,
    getMetrics,
  }), [trackRender, trackRerender, getMetrics]);

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  );
}

/**
 * Hook to use performance monitoring
 */
export function usePerformanceTracking(componentName: string) {
  const context = useContext(PerformanceContext);
  const renderStartTime = useRef<number>(0);

  useEffect(() => {
    renderStartTime.current = performance.now();
  });

  useEffect(() => {
    if (context) {
      const renderTime = performance.now() - renderStartTime.current;
      context.trackRender(componentName, renderTime);
    }
  });

  return context;
}

/**
 * Higher-order component for automatic memoization
 */
export function withOptimization<P extends object>(
  Component: ComponentType<P>,
  options: {
    memo?: boolean;
    displayName?: string;
    customCompare?: (prevProps: P, nextProps: P) => boolean;
  } = {}
) {
  const { memo: enableMemo = true, displayName, customCompare } = options;
  
  let OptimizedComponent = Component;

  // Apply memoization if enabled
  if (enableMemo) {
    OptimizedComponent = memo(Component, customCompare);
  }

  // Set display name for debugging
  if (displayName) {
    OptimizedComponent.displayName = displayName;
  }

  return OptimizedComponent;
}

/**
 * Hook for optimized callback creation
 */
export function useOptimizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  return useCallback(callback, deps);
}

/**
 * Hook for optimized memoized values
 */
export function useOptimizedMemo<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  return useMemo(factory, deps);
}

/**
 * Lazy component loader with advanced features
 */
export function createLazyComponent<P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options: {
    fallback?: ReactNode;
    errorFallback?: ReactNode;
    retryDelay?: number;
    maxRetries?: number;
  } = {}
) {
  const {
    fallback = <div className="animate-pulse bg-gray-200/10 rounded h-32" />,
    errorFallback = <div className="text-red-400">Failed to load component</div>,
    retryDelay = 1000,
    maxRetries = 3,
  } = options;

  const LazyComponent = lazy(() => 
    importFn().catch(async (error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('Lazy component import failed:', error);
      }
      
      // Retry logic
      for (let i = 0; i < maxRetries; i++) {
        await new Promise(resolve => setTimeout(resolve, retryDelay * (i + 1)));
        try {
          return await importFn();
        } catch (retryError) {
          if (process.env.NODE_ENV === 'development') {
            console.error(`Lazy component retry ${i + 1} failed:`, retryError);
          }
        }
      }
      
      throw error;
    })
  );

  return function OptimizedLazyComponent(props: P) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

/**
 * Virtual scrolling hook for large lists
 */
export function useVirtualScrolling<T>(
  items: T[],
  options: {
    itemHeight: number;
    containerHeight: number;
    overscan?: number;
  }
) {
  const { itemHeight, containerHeight, overscan = 5 } = options;
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight),
      items.length - 1
    );

    return {
      startIndex: Math.max(0, startIndex - overscan),
      endIndex: Math.min(items.length - 1, endIndex + overscan),
    };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
  }, [items, visibleRange]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.startIndex * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    setScrollTop,
    visibleRange,
  };
}

/**
 * Debounced state hook
 */
export function useDebouncedState<T>(
  initialValue: T,
  delay: number
): [T, T, (value: T) => void] {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return [value, debouncedValue, setValue];
}

/**
 * Throttled state hook
 */
export function useThrottledState<T>(
  initialValue: T,
  delay: number
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(initialValue);
  const lastUpdate = useRef<number>(0);

  const throttledSetValue = useCallback((newValue: T) => {
    const now = Date.now();
    if (now - lastUpdate.current >= delay) {
      setValue(newValue);
      lastUpdate.current = now;
    }
  }, [delay]);

  return [value, throttledSetValue];
}

/**
 * Intersection observer hook with optimization
 */
export function useOptimizedIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<Element | null>(null);

  const observe = useCallback((element: Element) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    elementRef.current = element;
    observerRef.current = new IntersectionObserver(
      (newEntries) => {
        setEntries(newEntries);
        setIsIntersecting(newEntries.some(entry => entry.isIntersecting));
      },
      options
    );

    observerRef.current.observe(element);
  }, [options]);

  const unobserve = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      unobserve();
    };
  }, [unobserve]);

  return {
    entries,
    isIntersecting,
    observe,
    unobserve,
    elementRef,
  };
}

/**
 * Component render optimization wrapper
 */
export function OptimizedWrapper({ 
  children, 
  shouldRender = true,
  fallback = null 
}: { 
  children: ReactNode; 
  shouldRender?: boolean;
  fallback?: ReactNode;
}) {
  if (!shouldRender) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Batch state updates utility
 */
export function useBatchedState<T>(
  initialState: T
): [T, (updates: Partial<T>) => void] {
  const [state, setState] = useState<T>(initialState);

  const batchUpdate = useCallback((updates: Partial<T>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  return [state, batchUpdate];
}

/**
 * Performance-optimized component registry
 */
class ComponentRegistry {
  private components = new Map<string, ComponentType<any>>();
  private loadingStates = new Map<string, boolean>();
  private errorStates = new Map<string, Error | null>();

  register(name: string, component: ComponentType<any>) {
    this.components.set(name, component);
  }

  get(name: string): ComponentType<any> | null {
    return this.components.get(name) || null;
  }

  setLoading(name: string, loading: boolean) {
    this.loadingStates.set(name, loading);
  }

  setError(name: string, error: Error | null) {
    this.errorStates.set(name, error);
  }

  getLoadingState(name: string): boolean {
    return this.loadingStates.get(name) || false;
  }

  getErrorState(name: string): Error | null {
    return this.errorStates.get(name) || null;
  }
}

export const componentRegistry = new ComponentRegistry();
