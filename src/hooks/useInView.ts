import { useEffect, useRef, useState } from "react";
import { errorHandler } from "@/utils/errorHandling";

export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // IntersectionObserver not supported - fallback to immediate visibility
      setInView(true);
      return;
    }

    try {
      const observer = new IntersectionObserver((entries) => {
        try {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setInView(true);
          });
        } catch (error) {
          const appError = errorHandler.createError(
            (error as Error).message,
            'INTERSECTION_OBSERVER_ERROR',
            500,
            {
              component: 'useInView',
              action: 'entry_processing',
            }
          );
          errorHandler.handleError(appError);
          setHasError(true);
        }
      }, { threshold: 0.2, rootMargin: "0px", ...(options || {}) });

      observer.observe(ref.current);
      return () => {
        try {
          observer.disconnect();
        } catch (error) {
          const appError = errorHandler.createError(
            (error as Error).message,
            'INTERSECTION_OBSERVER_ERROR',
            500,
            {
              component: 'useInView',
              action: 'observer_disconnect',
            }
          );
          errorHandler.handleError(appError);
        }
      };
    } catch (error) {
      const appError = errorHandler.createError(
        (error as Error).message,
        'INTERSECTION_OBSERVER_ERROR',
        500,
        {
          component: 'useInView',
          action: 'observer_creation',
        }
      );
      errorHandler.handleError(appError);
      setHasError(true);
      // Fallback: assume element is in view
      setInView(true);
    }
  }, [options]);

  return { ref, inView, hasError } as const;
}


