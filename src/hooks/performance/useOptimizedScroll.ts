/**
 * Performance-optimized scroll hooks
 * Provides efficient scroll handling with minimal performance impact
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useStableCallback, useThrottledValue } from './useOptimizedRender';

interface ScrollState {
  scrollY: number;
  scrollX: number;
  direction: 'up' | 'down' | null;
  velocity: number;
  isScrolling: boolean;
  scrollPercentage: number;
}

interface ScrollOptions {
  /** Throttle delay for scroll events (ms) */
  throttleDelay?: number;
  /** Whether to track scroll direction */
  trackDirection?: boolean;
  /** Whether to track scroll velocity */
  trackVelocity?: boolean;
  /** Whether to track scroll percentage */
  trackPercentage?: boolean;
  /** Custom scroll container (default: window) */
  container?: HTMLElement | Window | null;
}

/**
 * Hook for optimized scroll position tracking
 * Provides scroll state with performance optimizations
 */
export function useOptimizedScroll(options: ScrollOptions = {}) {
  const {
    throttleDelay = 16, // ~60fps
    trackDirection = true,
    trackVelocity = true,
    trackPercentage = true,
    container = typeof window !== 'undefined' ? window : null,
  } = options;

  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollX: 0,
    direction: null,
    velocity: 0,
    isScrolling: false,
    scrollPercentage: 0,
  });

  const lastScrollRef = useRef({ y: 0, x: 0, time: 0 });
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);

  // Calculate scroll state
  const calculateScrollState = useCallback((): ScrollState => {
    if (!container) return scrollState;

    const isWindow = container === window;
    const scrollY = isWindow ? window.scrollY : (container as HTMLElement).scrollTop;
    const scrollX = isWindow ? window.scrollX : (container as HTMLElement).scrollLeft;

    const now = performance.now();
    const deltaY = scrollY - lastScrollRef.current.y;
    const deltaX = scrollX - lastScrollRef.current.x;
    const deltaTime = now - lastScrollRef.current.time;

    // Calculate direction
    let direction: 'up' | 'down' | null = null;
    if (trackDirection && deltaTime > 0) {
      direction = deltaY > 0 ? 'down' : deltaY < 0 ? 'up' : null;
    }

    // Calculate velocity
    let velocity = 0;
    if (trackVelocity && deltaTime > 0) {
      velocity = Math.abs(deltaY) / deltaTime;
    }

    // Calculate scroll percentage
    let scrollPercentage = 0;
    if (trackPercentage) {
      const documentHeight = isWindow
        ? document.documentElement.scrollHeight - window.innerHeight
        : (container as HTMLElement).scrollHeight - (container as HTMLElement).clientHeight;

      if (documentHeight > 0) {
        scrollPercentage = Math.min(Math.max(scrollY / documentHeight, 0), 1);
      }
    }

    // Update last scroll position
    lastScrollRef.current = { y: scrollY, x: scrollX, time: now };

    return {
      scrollY,
      scrollX,
      direction,
      velocity,
      isScrolling: isScrollingRef.current,
      scrollPercentage,
    };
  }, [container, trackDirection, trackVelocity, trackPercentage, scrollState]);

  // Handle scroll event
  const handleScroll = useStableCallback(() => {
    const newState = calculateScrollState();
    setScrollState(newState);

    // Set scrolling flag
    if (!isScrollingRef.current) {
      isScrollingRef.current = true;
    }

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set timeout to detect scroll end
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      setScrollState(prev => ({ ...prev, isScrolling: false }));
    }, 150);
  }, [calculateScrollState]);

  // Throttled scroll handler
  const throttledScrollHandler = useThrottledValue(handleScroll, throttleDelay);

  // Set up scroll listener
  useEffect(() => {
    if (!container) return;

    // Initialize scroll state
    const initialState = calculateScrollState();
    setScrollState(initialState);

    // Add scroll listener
    container.addEventListener('scroll', throttledScrollHandler, { passive: true });

    return () => {
      container.removeEventListener('scroll', throttledScrollHandler);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [container, throttledScrollHandler, calculateScrollState]);

  return scrollState;
}

/**
 * Hook for scroll-based animations
 * Provides scroll progress for animations and effects
 */
export function useScrollProgress(
  startOffset: number = 0,
  endOffset: number = 1,
  options: ScrollOptions = {}
) {
  const scrollState = useOptimizedScroll(options);

  const progress = useCallback(() => {
    const { scrollPercentage } = scrollState;
    return Math.max(0, Math.min(1, (scrollPercentage - startOffset) / (endOffset - startOffset)));
  }, [scrollState, startOffset, endOffset]);

  return {
    progress: progress(),
    scrollState,
    isInRange:
      scrollState.scrollPercentage >= startOffset && scrollState.scrollPercentage <= endOffset,
  };
}

/**
 * Hook for scroll-triggered visibility
 * Efficiently tracks when elements enter/exit viewport
 */
export function useScrollVisibility(threshold: number = 0.1, options: ScrollOptions = {}) {
  const scrollState = useOptimizedScroll(options);
  const [isVisible, setIsVisible] = useState(false);
  const [visibilityProgress, setVisibilityProgress] = useState(0);

  const updateVisibility = useCallback(
    (element: HTMLElement | null) => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      // Calculate visibility based on element position
      const elementTop = rect.top;
      const elementBottom = rect.bottom;

      // Calculate progress through viewport
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight))
      );

      setVisibilityProgress(progress);
      setIsVisible(progress > threshold);
    },
    [threshold]
  );

  return {
    isVisible,
    visibilityProgress,
    updateVisibility,
    scrollState,
  };
}

/**
 * Hook for scroll-based parallax effects
 * Provides optimized parallax calculations
 */
export function useScrollParallax(
  speed: number = 0.5,
  options: ScrollOptions & {
    /** Custom parallax calculation function */
    calculateParallax?: (scrollY: number, speed: number) => number;
  } = {}
) {
  const { calculateParallax, ...scrollOptions } = options;
  const scrollState = useOptimizedScroll(scrollOptions);

  const parallaxOffset = useCallback(() => {
    if (calculateParallax) {
      return calculateParallax(scrollState.scrollY, speed);
    }

    // Default parallax calculation
    return scrollState.scrollY * speed;
  }, [scrollState.scrollY, speed, calculateParallax]);

  return {
    offset: parallaxOffset(),
    scrollState,
  };
}

/**
 * Hook for scroll-based section detection
 * Efficiently tracks which section is currently in view
 */
export function useScrollSectionDetection(
  sections: Array<{ id: string; element: HTMLElement | null }>,
  options: ScrollOptions = {}
) {
  const scrollState = useOptimizedScroll(options);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const updateActiveSection = useCallback(() => {
    const scrollY = scrollState.scrollY;
    const windowHeight = window.innerHeight;

    let currentSection: string | null = null;
    let maxVisibility = 0;

    for (const { id, element } of sections) {
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementBottom = elementTop + rect.height;

      // Calculate visibility percentage
      const visibleTop = Math.max(elementTop, scrollY);
      const visibleBottom = Math.min(elementBottom, scrollY + windowHeight);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibilityPercentage = visibleHeight / rect.height;

      if (visibilityPercentage > maxVisibility && visibilityPercentage > 0.3) {
        maxVisibility = visibilityPercentage;
        currentSection = id;
      }
    }

    setActiveSection(currentSection);
  }, [scrollState.scrollY, sections]);

  useEffect(() => {
    updateActiveSection();
  }, [updateActiveSection]);

  return {
    activeSection,
    updateActiveSection,
    scrollState,
  };
}
