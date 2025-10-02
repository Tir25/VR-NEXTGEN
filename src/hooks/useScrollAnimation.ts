import { useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseScrollAnimationOptions {
  /** Animation trigger threshold (0-1) */
  threshold?: number;
  /** Trigger animation only once */
  triggerOnce?: boolean;
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Animation duration (ms) */
  duration?: number;
  /** Custom root margin for intersection observer */
  rootMargin?: string;
}

/**
 * Custom hook for scroll-based reveal animations using Framer Motion
 * Provides fade-in + slide-up effects with performance optimization
 * 
 * @param options Configuration options for the scroll animation
 * @returns Animation controls and ref for the target element
 */
export function useScrollAnimation({
  threshold = 0.1,
  triggerOnce = true,
  delay = 0,
  duration = 0.6,
  rootMargin = '0px 0px -50px 0px'
}: UseScrollAnimationOptions = {}) {
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: false, // We'll handle triggerOnce manually for better control
    rootMargin
  });

  useEffect(() => {
    if (inView && (!triggerOnce || !hasAnimated)) {
      // Add delay if specified
      const timer = setTimeout(() => {
        controls.start('visible');
        if (triggerOnce) {
          setHasAnimated(true);
        }
      }, delay);

      return () => clearTimeout(timer);
    } else if (!inView && !triggerOnce) {
      controls.start('hidden');
    }
  }, [inView, controls, triggerOnce, hasAnimated, delay]);

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Animation variants with accessibility support
  const variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: duration / 1000,
        ease: [0.25, 0.46, 0.45, 0.94] as const // Custom easing for smooth animation
      }
    }
  };

  return {
    ref,
    controls,
    variants,
    inView,
    prefersReducedMotion
  };
}

/**
 * Preset animation configurations for common use cases
 */
export const scrollAnimationPresets = {
  // Fast animation for small elements
  fast: {
    threshold: 0.2,
    delay: 0,
    duration: 400
  },
  
  // Standard animation for most sections
  standard: {
    threshold: 0.1,
    delay: 100,
    duration: 600
  },
  
  // Slow animation for large sections
  slow: {
    threshold: 0.05,
    delay: 200,
    duration: 800
  },
  
  // Staggered animation for multiple elements
  staggered: {
    threshold: 0.1,
    delay: 0,
    duration: 600
  }
} as const;
