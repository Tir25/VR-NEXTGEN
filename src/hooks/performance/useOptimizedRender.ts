/**
 * Performance-optimized rendering hooks
 * Prevents unnecessary re-renders and optimizes component performance
 */

import { useCallback, useMemo, useRef, useEffect, useState } from 'react';

/**
 * Hook for memoizing expensive computations
 * Automatically handles dependency tracking and cache invalidation
 */
export function useOptimizedMemo<T>(
  factory: () => T,
  deps: React.DependencyList,
  options?: {
    /** Custom equality function for dependency comparison */
    equalityFn?: (a: React.DependencyList, b: React.DependencyList) => boolean;
    /** Maximum cache size (default: 10) */
    maxCacheSize?: number;
  }
): T {
  const { equalityFn = shallowEqual, maxCacheSize = 10 } = options || {};
  const cacheRef = useRef<Map<string, T>>(new Map());
  const prevDepsRef = useRef<React.DependencyList>(deps);

  // Create cache key from dependencies
  const cacheKey = useMemo(
    () => JSON.stringify(deps.map(dep => (typeof dep === 'object' ? JSON.stringify(dep) : dep))),
    [deps]
  );

  // Check if dependencies have changed
  const depsChanged = !equalityFn(prevDepsRef.current, deps);

  // Get cached value or compute new one
  const value = useMemo(() => {
    if (!depsChanged && cacheRef.current.has(cacheKey)) {
      return cacheRef.current.get(cacheKey)!;
    }

    const newValue = factory();

    // Manage cache size
    if (cacheRef.current.size >= maxCacheSize) {
      const firstKey = cacheRef.current.keys().next().value;
      if (firstKey !== undefined) {
        cacheRef.current.delete(firstKey);
      }
    }

    cacheRef.current.set(cacheKey, newValue);
    prevDepsRef.current = deps;

    return newValue;
  }, [cacheKey, depsChanged, factory, maxCacheSize, deps]);

  return value;
}

/**
 * Hook for creating stable callback references
 * Prevents child component re-renders due to callback prop changes
 */
export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList = []
): T {
  const callbackRef = useRef(callback);
  const depsRef = useRef(deps);

  // Update callback reference when dependencies change
  useEffect(() => {
    callbackRef.current = callback;
    depsRef.current = deps;
  });

  return useCallback(
    ((...args: Parameters<T>) => {
      return callbackRef.current(...args);
    }) as T,
    [] // Empty deps since we use refs
  );
}

/**
 * Hook for debouncing values
 * Useful for search inputs, resize events, etc.
 */
export function useDebouncedValue<T>(
  value: T,
  delay: number,
  options?: {
    /** Initial value before first debounced value */
    initialValue?: T;
    /** Maximum wait time before forcing update */
    maxWait?: number;
  }
): T {
  const { initialValue = value, maxWait } = options || {};
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateRef = useRef<number>(Date.now());

  useEffect(() => {
    // Clear existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set debounced update
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
      lastUpdateRef.current = Date.now();
    }, delay);

    // Set maximum wait timeout if specified
    if (maxWait && !maxTimeoutRef.current) {
      maxTimeoutRef.current = setTimeout(() => {
        setDebouncedValue(value);
        lastUpdateRef.current = Date.now();
      }, maxWait);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, maxWait]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (maxTimeoutRef.current) clearTimeout(maxTimeoutRef.current);
    };
  }, []);

  return debouncedValue;
}

/**
 * Hook for throttling values
 * Useful for scroll events, mouse movements, etc.
 */
export function useThrottledValue<T>(
  value: T,
  delay: number,
  options?: {
    /** Initial value before first throttled value */
    initialValue?: T;
    /** Whether to call on leading edge */
    leading?: boolean;
    /** Whether to call on trailing edge */
    trailing?: boolean;
  }
): T {
  const { initialValue = value, leading = true, trailing = true } = options || {};
  const [throttledValue, setThrottledValue] = useState<T>(initialValue);
  const lastExecutedRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastValueRef = useRef<T>(value);

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecutedRef.current;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Execute immediately if leading and enough time has passed
    if (leading && timeSinceLastExecution >= delay) {
      setThrottledValue(value);
      lastExecutedRef.current = now;
    } else if (trailing) {
      // Set timeout for trailing execution
      timeoutRef.current = setTimeout(() => {
        setThrottledValue(lastValueRef.current);
        lastExecutedRef.current = Date.now();
      }, delay - timeSinceLastExecution);
    }

    lastValueRef.current = value;

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, leading, trailing]);

  return throttledValue;
}

/**
 * Hook for measuring component render performance
 * Useful for identifying performance bottlenecks
 */
export function useRenderPerformance(
  componentName: string,
  options?: {
    /** Whether to log render times */
    logRenders?: boolean;
    /** Threshold for slow renders (ms) */
    slowRenderThreshold?: number;
  }
) {
  const { logRenders = false, slowRenderThreshold = 16 } = options || {};
  const renderStartRef = useRef<number>(0);
  const renderCountRef = useRef<number>(0);

  // Start timing on render
  renderStartRef.current = performance.now();
  renderCountRef.current += 1;

  useEffect(() => {
    const renderTime = performance.now() - renderStartRef.current;

    if (logRenders) {
      console.log(
        `[${componentName}] Render #${renderCountRef.current}: ${renderTime.toFixed(2)}ms`
      );
    }

    if (renderTime > slowRenderThreshold) {
      console.warn(
        `[${componentName}] Slow render detected: ${renderTime.toFixed(2)}ms (threshold: ${slowRenderThreshold}ms)`
      );
    }
  });

  return {
    renderCount: renderCountRef.current,
    startTiming: () => {
      renderStartRef.current = performance.now();
    },
    measureRender: (fn: () => void) => {
      const start = performance.now();
      fn();
      const end = performance.now();
      return end - start;
    },
  };
}

/**
 * Hook for optimizing list rendering
 * Provides virtualization helpers and performance optimizations
 */
export function useOptimizedList<T>(
  items: T[],
  options?: {
    /** Items per page for pagination */
    pageSize?: number;
    /** Whether to enable virtualization */
    virtualize?: boolean;
    /** Height of each item for virtualization */
    itemHeight?: number;
    /** Container height for virtualization */
    containerHeight?: number;
  }
) {
  const {
    pageSize = 50,
    virtualize = false,
    itemHeight = 60,
    containerHeight = 400,
  } = options || {};

  const [currentPage, setCurrentPage] = useState(0);

  // Calculate visible items
  const visibleItems = useMemo(() => {
    if (virtualize) {
      const startIndex = Math.floor((currentPage * containerHeight) / itemHeight);
      const endIndex = Math.min(startIndex + Math.ceil(containerHeight / itemHeight), items.length);
      return items.slice(startIndex, endIndex);
    } else {
      const startIndex = currentPage * pageSize;
      const endIndex = startIndex + pageSize;
      return items.slice(startIndex, endIndex);
    }
  }, [items, currentPage, pageSize, virtualize, itemHeight, containerHeight]);

  // Calculate total pages
  const totalPages = Math.ceil(
    items.length / (virtualize ? Math.ceil(containerHeight / itemHeight) : pageSize)
  );

  return {
    visibleItems,
    currentPage,
    totalPages,
    setCurrentPage,
    hasNextPage: currentPage < totalPages - 1,
    hasPrevPage: currentPage > 0,
    nextPage: () => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1)),
    prevPage: () => setCurrentPage(prev => Math.max(prev - 1, 0)),
  };
}

// Utility function for shallow equality comparison
function shallowEqual(a: React.DependencyList, b: React.DependencyList): boolean {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}
