/**
 * Performance Optimization Utilities
 * Provides tools for optimizing React components and application performance
 */

import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';

/**
 * Debounce utility for optimizing frequent function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle utility for limiting function execution frequency
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Custom hook for debounced values
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for throttled values
 */
export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}

/**
 * Custom hook for intersection observer with performance optimizations
 */
export function useIntersectionObserverOptimized(
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Use requestIdleCallback for better performance if available
    const scheduleCallback = window.requestIdleCallback || setTimeout;

    const observer = new IntersectionObserver(
      ([entry]) => {
        scheduleCallback(() => {
          setIsIntersecting(entry.isIntersecting);
          if (entry.isIntersecting && !hasIntersected) {
            setHasIntersected(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options, hasIntersected]);

  return { ref, isIntersecting, hasIntersected };
}

// Note: Scroll-related hooks have been moved to the unified scroll system
// Use hooks from @/utils/UnifiedScrollManager instead:
// - useUnifiedScroll
// - getUnifiedScrollManager

/**
 * Custom hook for memoized expensive calculations
 */
export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  return useCallback(callback, deps);
}

/**
 * Custom hook for memoized expensive values
 */
export function useMemoizedValue<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  return useMemo(factory, deps);
}

/**
 * Performance monitoring utilities
 */
export class PerformanceMonitor {
  private static measurements: Map<string, number> = new Map();

  static startMeasure(name: string): void {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${name}-start`);
    }
  }

  static endMeasure(name: string): number {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${name}-end`);
      window.performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measure = window.performance.getEntriesByName(name)[0];
      const duration = measure ? measure.duration : 0;
      
      this.measurements.set(name, duration);
      
      // Clean up marks and measures
      window.performance.clearMarks(`${name}-start`);
      window.performance.clearMarks(`${name}-end`);
      window.performance.clearMeasures(name);
      
      return duration;
    }
    return 0;
  }

  static getMeasurement(name: string): number | undefined {
    return this.measurements.get(name);
  }

  static getAllMeasurements(): Record<string, number> {
    return Object.fromEntries(this.measurements);
  }

  static clearMeasurements(): void {
    this.measurements.clear();
  }
}

/**
 * Image lazy loading utility with performance optimizations
 */
export function createLazyImageLoader() {
  const imageCache = new Map<string, HTMLImageElement>();
  const loadingPromises = new Map<string, Promise<HTMLImageElement>>();

  return {
    loadImage(src: string): Promise<HTMLImageElement> {
      // Return cached image if available
      if (imageCache.has(src)) {
        return Promise.resolve(imageCache.get(src)!);
      }

      // Return existing loading promise if available
      if (loadingPromises.has(src)) {
        return loadingPromises.get(src)!;
      }

      // Create new loading promise
      const promise = new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
          imageCache.set(src, img);
          loadingPromises.delete(src);
          resolve(img);
        };
        
        img.onerror = () => {
          loadingPromises.delete(src);
          reject(new Error(`Failed to load image: ${src}`));
        };
        
        img.src = src;
      });

      loadingPromises.set(src, promise);
      return promise;
    },

    preloadImages(sources: string[]): Promise<HTMLImageElement[]> {
      return Promise.all(sources.map(src => this.loadImage(src)));
    },

    clearCache(): void {
      imageCache.clear();
      loadingPromises.clear();
    }
  };
}

/**
 * Bundle size optimization utilities
 */
export const BundleOptimizer = {
  /**
   * Dynamically imports components to reduce initial bundle size
   */
  createLazyComponent<T extends React.ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>,
    fallback?: React.ComponentType
  ): React.LazyExoticComponent<T> {
    return React.lazy(importFunc);
  },

  /**
   * Creates a loading component for lazy-loaded components
   */
  createLoadingComponent(message: string = 'Loading...'): React.ComponentType {
    return () => React.createElement('div', {
      className: 'flex items-center justify-center p-8'
    }, [
      React.createElement('div', {
        key: 'spinner',
        className: 'animate-spin rounded-full h-8 w-8 border-b-2 border-gold'
      }),
      React.createElement('span', {
        key: 'message',
        className: 'ml-3 text-white/70'
      }, message)
    ]);
  }
};

// Export performance utilities
export const performanceUtils = {
  debounce,
  throttle,
  useDebounce,
  useThrottle,
  useIntersectionObserverOptimized,
  useMemoizedCallback,
  useMemoizedValue,
  PerformanceMonitor,
  createLazyImageLoader,
  BundleOptimizer,
};
