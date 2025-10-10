import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import {
  createOptimizedScrollHandler,
  getOptimalScrollConfig,
  applyScrollOptimizations,
} from '@/utils/scrollPerformance';
import { getScrollTriggerManager } from '@/utils/gsapScrollTrigger';

/**
 * Global scroll state and handlers
 */
interface ScrollState {
  scrollY: number;
  scrollX: number;
  scrollDirection: 'up' | 'down' | null;
  isScrolling: boolean;
  scrollVelocity: number;
  viewportHeight: number;
  viewportWidth: number;
}

/**
 * Scroll event handlers registry
 */
interface ScrollHandlers {
  parallax: Set<(scrollY: number, scrollDirection: 'up' | 'down' | null) => void>;
  fade: Set<(scrollY: number, scrollDirection: 'up' | 'down' | null) => void>;
  navigation: Set<(scrollY: number, scrollDirection: 'up' | 'down' | null) => void>;
  background: Set<(scrollY: number, scrollDirection: 'up' | 'down' | null) => void>;
  custom: Set<(scrollY: number, scrollDirection: 'up' | 'down' | null) => void>;
}

interface ScrollContextType {
  scrollState: ScrollState;
  registerHandler: (
    type: keyof ScrollHandlers,
    handler: (scrollY: number, scrollDirection: 'up' | 'down' | null) => void
  ) => () => void;
  unregisterHandler: (
    type: keyof ScrollHandlers,
    handler: (scrollY: number, scrollDirection: 'up' | 'down' | null) => void
  ) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

interface ScrollProviderProps {
  children: ReactNode;
}

/**
 * Global scroll controller that manages all scroll-related events
 * Uses a single scroll listener with requestAnimationFrame for optimal performance
 */
export function ScrollProvider({ children }: ScrollProviderProps) {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollX: 0,
    scrollDirection: null,
    isScrolling: false,
    scrollVelocity: 0,
    viewportHeight: 0,
    viewportWidth: 0,
  });

  // Get optimal configuration based on device capabilities
  const scrollConfig = getOptimalScrollConfig();

  const handlersRef = useRef<ScrollHandlers>({
    parallax: new Set(),
    fade: new Set(),
    navigation: new Set(),
    background: new Set(),
    custom: new Set(),
  });

  const lastScrollY = useRef(0);
  const lastScrollX = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const ticking = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  /**
   * Calculate scroll direction and velocity
   */
  const calculateScrollMetrics = useCallback((currentScrollY: number, currentScrollX: number) => {
    const now = Date.now();
    const timeDelta = now - lastScrollTime.current;

    if (timeDelta > 0) {
      const scrollDeltaY = currentScrollY - lastScrollY.current;
      const scrollDeltaX = currentScrollX - lastScrollX.current;
      const velocity =
        Math.sqrt(scrollDeltaY * scrollDeltaY + scrollDeltaX * scrollDeltaX) / timeDelta;

      lastScrollY.current = currentScrollY;
      lastScrollX.current = currentScrollX;
      lastScrollTime.current = now;

      return {
        direction: scrollDeltaY > 0 ? 'down' : scrollDeltaY < 0 ? 'up' : null,
        velocity,
      };
    }

    return {
      direction: null,
      velocity: 0,
    };
  }, []);

  /**
   * Unified scroll handler that processes all scroll events
   */
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        const { direction, velocity } = calculateScrollMetrics(scrollY, scrollX);

        const newScrollState: ScrollState = {
          scrollY,
          scrollX,
          scrollDirection: direction as 'up' | 'down' | null,
          isScrolling: true,
          scrollVelocity: velocity,
          viewportHeight,
          viewportWidth,
        };

        setScrollState(newScrollState);

        // Execute all registered handlers
        Object.values(handlersRef.current).forEach(handlerSet => {
          handlerSet.forEach(
            (handler: (scrollY: number, scrollDirection: 'up' | 'down' | null) => void) => {
              try {
                handler(scrollY, direction as 'up' | 'down' | null);
              } catch (error) {
                // Scroll handler error
              }
            }
          );
        });

        // Update GSAP ScrollTrigger after all custom handlers
        const scrollTriggerManager = getScrollTriggerManager();
        if (scrollTriggerManager && scrollTriggerManager.isAvailable()) {
          scrollTriggerManager.update();
        }

        ticking.current = false;
      });

      ticking.current = true;
    }

    // Clear existing timeout and set new one to detect scroll end
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      setScrollState(prev => ({ ...prev, isScrolling: false, scrollVelocity: 0 }));
    }, 150);
  }, [calculateScrollMetrics]);

  /**
   * Register a scroll handler
   */
  const registerHandler = useCallback(
    (
      type: keyof ScrollHandlers,
      handler: (scrollY: number, scrollDirection: 'up' | 'down' | null) => void
    ) => {
      handlersRef.current[type].add(handler);

      // Return unregister function
      return () => {
        handlersRef.current[type].delete(handler);
      };
    },
    []
  );

  /**
   * Unregister a scroll handler
   */
  const unregisterHandler = useCallback(
    (
      type: keyof ScrollHandlers,
      handler: (scrollY: number, scrollDirection: 'up' | 'down' | null) => void
    ) => {
      handlersRef.current[type].delete(handler);
    },
    []
  );

  /**
   * Initialize scroll listener with performance optimizations
   */
  useEffect(() => {
    // Apply scroll optimizations
    applyScrollOptimizations();

    // Set initial viewport dimensions
    setScrollState(prev => ({
      ...prev,
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
    }));

    // Create optimized scroll handler
    const { handler: optimizedHandler } = createOptimizedScrollHandler(
      () => {
        handleScroll();
      },
      {
        throttle: true,
        debounce: false,
        monitor: process.env.NODE_ENV === 'development',
        config: scrollConfig,
      }
    );

    // Create event listener wrapper
    const scrollEventListener = () => {
      optimizedHandler(window.scrollY, window.scrollX);
    };

    // Add optimized scroll listener with passive flag for better performance
    window.addEventListener('scroll', scrollEventListener, { passive: true });

    // Handle resize events
    const handleResize = () => {
      setScrollState(prev => ({
        ...prev,
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth,
      }));

      // Refresh ScrollTrigger on resize
      const scrollTriggerManager = getScrollTriggerManager();
      if (scrollTriggerManager && scrollTriggerManager.isAvailable()) {
        scrollTriggerManager.refresh();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', scrollEventListener);
      window.removeEventListener('resize', handleResize);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScroll, scrollConfig]);

  const contextValue: ScrollContextType = {
    scrollState,
    registerHandler,
    unregisterHandler,
  };

  return <ScrollContext.Provider value={contextValue}>{children}</ScrollContext.Provider>;
}

/**
 * Hook to access scroll context
 */
export function useScrollContext(): ScrollContextType {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    // Return a fallback context for SSR
    return {
      scrollState: {
        scrollY: 0,
        scrollX: 0,
        scrollDirection: null,
        isScrolling: false,
        scrollVelocity: 0,
        viewportHeight: 0,
        viewportWidth: 0,
      },
      registerHandler: () => () => {},
      unregisterHandler: () => {},
    };
  }
  return context;
}

/**
 * Hook for parallax effects using the global scroll controller
 */
export function useUnifiedParallax(multiplier: number = 0.3) {
  const { registerHandler } = useScrollContext();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleParallax = (scrollY: number) => {
      const newOffset = scrollY * multiplier;

      // Only update if the change is significant enough to avoid excessive re-renders
      setOffset(prevOffset => {
        const diff = Math.abs(newOffset - prevOffset);
        return diff > 0.5 ? newOffset : prevOffset;
      });
    };

    const unregister = registerHandler('parallax', handleParallax);
    return unregister;
  }, [multiplier, registerHandler]);

  return offset;
}

/**
 * Hook for scroll fade effects using the global scroll controller
 */
export function useUnifiedScrollFade(fadeStartRatio: number = 0.5) {
  const { scrollState, registerHandler } = useScrollContext();
  const [opacity, setOpacity] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleFade = (scrollY: number) => {
      const windowHeight = scrollState.viewportHeight;

      // Calculate opacity based on scroll position
      let newOpacity = 1;

      if (scrollY > 0) {
        // Fade out as user scrolls down
        newOpacity = Math.max(0, 1 - scrollY / (windowHeight * fadeStartRatio));
      }

      setOpacity(newOpacity);
      setIsVisible(newOpacity > 0.1);
    };

    const unregister = registerHandler('fade', handleFade);
    return unregister;
  }, [fadeStartRatio, scrollState.viewportHeight, registerHandler]);

  return { opacity, isVisible };
}

/**
 * Hook for navigation highlighting using the global scroll controller
 */
export function useUnifiedNavigation(currentPage: string = '') {
  const { scrollState, registerHandler } = useScrollContext();
  const [currentSection, setCurrentSection] = useState<string>('');

  useEffect(() => {
    const handleNavigation = (scrollY: number) => {
      const sections = [
        { id: 'hero', selector: '#hero' },
        { id: 'about', selector: '#about' },
        { id: 'services', selector: '#services' },
        { id: 'industries', selector: '#industries' },
        { id: 'testimonials', selector: '#testimonials' },
        { id: 'contact', selector: '#contact' },
      ];

      const windowHeight = scrollState.viewportHeight;
      let mostVisibleSection = '';
      let maxVisibility = 0;

      for (const section of sections) {
        const element = document.querySelector(section.selector);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top + scrollY;
          const sectionBottom = sectionTop + rect.height;

          const visibleTop = Math.max(sectionTop, scrollY);
          const visibleBottom = Math.min(windowHeight + scrollY, sectionBottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibilityRatio = visibleHeight / windowHeight;

          if (visibilityRatio > maxVisibility) {
            maxVisibility = visibilityRatio;
            mostVisibleSection = section.id;
          }
        }
      }

      setCurrentSection(mostVisibleSection);
    };

    const unregister = registerHandler('navigation', handleNavigation);
    return unregister;
  }, [currentPage, scrollState.viewportHeight, registerHandler]);

  return { currentSection };
}

/**
 * Hook for background animations using the global scroll controller
 */
export function useUnifiedBackgroundAnimation() {
  const { registerHandler } = useScrollContext();

  useEffect(() => {
    const handleBackground = () => {
      // Update section detection for background transitions
      const sections = [
        'hero',
        'services',
        'why',
        'cta',
        'what-we-do-hero',
        'who-we-are-hero',
        'customer-stories',
        'case-studies',
        'events',
        'industries',
        'contact-hero',
        'contact-form',
        'blog-header',
        'blog-feed',
      ];

      const windowHeight = window.innerHeight;
      let mostVisibleSection = 'hero';
      let maxVisibility = 0;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(windowHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibilityRatio = visibleHeight / windowHeight;

          if (visibilityRatio > maxVisibility) {
            maxVisibility = visibilityRatio;
            mostVisibleSection = sectionId;
          }
        }
      }

      // Trigger background transition if needed
      const backgroundElement = document.querySelector('.site-bg');
      if (backgroundElement) {
        const sectionClass = getSectionClass(mostVisibleSection);
        backgroundElement.className = backgroundElement.className.replace(/section-\w+/g, '');
        backgroundElement.classList.add(`section-${sectionClass}`);
      }
    };

    // Helper function to get section class mapping
    const getSectionClass = (sectionId: string): string => {
      const sectionMapping: Record<string, string> = {
        hero: 'hero',
        services: 'services',
        why: 'why-choose',
        cta: 'hero',
        'what-we-do-hero': 'hero',
        'who-we-are-hero': 'hero',
        'customer-stories': 'services',
        'case-studies': 'why-choose',
        events: 'clients',
        industries: 'industries',
        'contact-hero': 'hero',
        'contact-form': 'hero',
        'blog-header': 'hero',
        'blog-feed': 'hero',
      };
      return sectionMapping[sectionId] || 'hero';
    };

    const unregister = registerHandler('background', handleBackground);
    return unregister;
  }, [registerHandler]);
}
