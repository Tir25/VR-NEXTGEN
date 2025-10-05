import { ReactNode, Suspense } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  triggerOnce?: boolean;
}

/**
 * Lazy loading wrapper component that loads content when it enters viewport
 * Provides smooth loading experience with customizable fallbacks
 */
export default function LazyWrapper({
  children,
  fallback = (
    <div className="animate-pulse bg-gray-200/10 rounded-lg h-64 flex items-center justify-center">
      <div className="text-gray-400 text-sm">Loading...</div>
    </div>
  ),
  threshold = 0.1,
  rootMargin = '100px',
  className = '',
  triggerOnce = true
}: LazyWrapperProps) {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce
  });

  return (
    <div ref={elementRef} className={className}>
      {hasIntersected ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}
