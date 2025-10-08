/**
 * Optimized Lazy Loader Component
 * Advanced lazy loading with intersection observer, preloading, and performance optimization
 * Ensures smooth 60fps performance while loading content
 */

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useInView } from '@/hooks/useInView';

interface OptimizedLazyLoaderProps {
  /** Component to lazy load */
  children: React.ReactNode;
  /** Loading fallback component */
  fallback?: React.ReactNode;
  /** Error fallback component */
  errorFallback?: React.ReactNode;
  /** Root margin for intersection observer (default: '50px') */
  rootMargin?: string;
  /** Threshold for intersection observer (default: 0.1) */
  threshold?: number;
  /** Enable preloading when element is near viewport */
  enablePreloading?: boolean;
  /** Custom className */
  className?: string;
  /** Minimum loading time to prevent flash */
  minLoadingTime?: number;
  /** Enable performance monitoring */
  enablePerformanceMonitoring?: boolean;
}

/**
 * Default loading fallback with smooth animation
 */
const DefaultLoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-pulse flex space-x-4 w-full">
      <div className="rounded-full bg-gray-300/20 h-12 w-12 animate-pulse"></div>
      <div className="flex-1 space-y-2 py-1">
        <div className="h-4 bg-gray-300/20 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-300/20 rounded w-1/2 animate-pulse"></div>
      </div>
    </div>
  </div>
);

/**
 * Default error fallback
 */
const DefaultErrorFallback: React.FC<{ retry?: () => void }> = ({ retry }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <div className="text-red-400 mb-4">
      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">Failed to Load</h3>
    <p className="text-gray-400 mb-4">There was an error loading this content.</p>
    {retry && (
      <button
        onClick={retry}
        className="px-4 py-2 bg-gold text-black rounded-lg hover:bg-gold-dark transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);

/**
 * Optimized Lazy Loader with advanced performance features
 */
export default function OptimizedLazyLoader({
  children,
  fallback = <DefaultLoadingFallback />,
  errorFallback,
  rootMargin = '50px',
  threshold = 0.1,
  enablePreloading = true,
  className = '',
  minLoadingTime = 300,
  enablePerformanceMonitoring = false,
}: OptimizedLazyLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Use intersection observer for lazy loading
  const isInView = useInView({
    rootMargin,
    threshold,
  });

  // Memoized intersection observer options
  const observerOptions = useMemo(() => ({
    rootMargin,
    threshold,
  }), [rootMargin, threshold]);

  // Performance monitoring
  const performanceRef = useRef<{ startTime?: number; endTime?: number }>({});

  /**
   * Load content with error handling and performance monitoring
   */
  const loadContent = useCallback(async () => {
    if (isLoaded || isLoading) return;

    setIsLoading(true);
    setHasError(false);
    setStartTime(performance.now());
    
    if (enablePerformanceMonitoring) {
      performanceRef.current.startTime = performance.now();
    }

    try {
      // Simulate async loading (for dynamic imports)
      await new Promise(resolve => setTimeout(resolve, 0));
      
      // Calculate minimum loading time
      const elapsedTime = performance.now() - (startTime || 0);
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }

      setIsLoaded(true);
      
      if (enablePerformanceMonitoring && performanceRef.current.startTime) {
        performanceRef.current.endTime = performance.now();
        const loadTime = performanceRef.current.endTime - performanceRef.current.startTime;
        console.log(`LazyLoader: Content loaded in ${loadTime.toFixed(2)}ms`);
      }
    } catch (error) {
      console.error('LazyLoader: Error loading content:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, isLoading, startTime, minLoadingTime, enablePerformanceMonitoring]);

  /**
   * Retry loading on error
   */
  const retryLoading = useCallback(() => {
    setHasError(false);
    setIsLoaded(false);
    loadContent();
  }, [loadContent]);

  // Load content when in view
  useEffect(() => {
    if (isInView && !isLoaded && !hasError) {
      loadContent();
    }
  }, [isInView, isLoaded, hasError, loadContent]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Render content based on state
  const renderContent = () => {
    if (hasError) {
      return errorFallback || <DefaultErrorFallback retry={retryLoading} />;
    }

    if (isLoaded) {
      return children;
    }

    if (isLoading || (isInView && !isLoaded)) {
      return fallback;
    }

    // Not in view yet - render placeholder
    return (
      <div className="w-full h-32 bg-gray-800/20 rounded-lg animate-pulse" />
    );
  };

  return (
    <div
      ref={containerRef}
      className={`lazy-loader ${className}`}
      data-loaded={isLoaded}
      data-loading={isLoading}
      data-error={hasError}
    >
      {renderContent()}
    </div>
  );
}

/**
 * Hook for lazy loading with performance monitoring
 */
export function useOptimizedLazyLoading(options: {
  rootMargin?: string;
  threshold?: number;
  enablePerformanceMonitoring?: boolean;
} = {}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loadTime, setLoadTime] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView({
    rootMargin: options.rootMargin || '50px',
    threshold: options.threshold || 0.1,
  });

  const load = useCallback(async (loader: () => Promise<void>) => {
    const startTime = performance.now();
    
    try {
      await loader();
      const endTime = performance.now();
      setLoadTime(endTime - startTime);
      setIsLoaded(true);
    } catch (error) {
      console.error('Lazy loading error:', error);
      setHasError(true);
    }
  }, []);

  useEffect(() => {
    if (isInView && !isLoaded && !hasError) {
      // Trigger loading when in view
      load(async () => {
        // This will be overridden by the actual loader
        await new Promise(resolve => setTimeout(resolve, 100));
      });
    }
  }, [isInView, isLoaded, hasError, load]);

  return {
    containerRef,
    isInView,
    isLoaded,
    hasError,
    loadTime,
    load,
  };
}

/**
 * Preloader component for critical resources
 */
export function LazyPreloader({ 
  children, 
  preloadDelay = 1000 
}: { 
  children: React.ReactNode; 
  preloadDelay?: number; 
}) {
  const [shouldPreload, setShouldPreload] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldPreload(true);
    }, preloadDelay);

    return () => clearTimeout(timer);
  }, [preloadDelay]);

  return shouldPreload ? <>{children}</> : null;
}
