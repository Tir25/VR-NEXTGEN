import { ReactNode, Suspense, memo } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { performanceConfig } from '@/config/app-config';

interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  triggerOnce?: boolean;
  placeholder?: ReactNode;
  enablePerformanceMonitoring?: boolean;
}

/**
 * Lazy loading wrapper component that loads content when it enters viewport
 * Provides smooth loading experience with customizable fallbacks
 */
function LazyWrapper({
  children,
  fallback = (
    <div className="animate-pulse bg-gray-200/10 rounded-lg h-64 flex items-center justify-center">
      <div className="text-gray-400 text-sm">Loading...</div>
    </div>
  ),
  threshold = 0.1,
  rootMargin = performanceConfig.lazyLoadRootMargin,
  className = '',
  triggerOnce = true,
  placeholder,
  enablePerformanceMonitoring = false
}: LazyWrapperProps) {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce
  });

  // Performance monitoring
  if (enablePerformanceMonitoring && hasIntersected) {
    // LazyWrapper: Component loaded
  }

  const displayFallback = placeholder || fallback;

  return (
    <div ref={elementRef} className={className}>
      {hasIntersected ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        displayFallback
      )}
    </div>
  );
}

export default memo(LazyWrapper);
