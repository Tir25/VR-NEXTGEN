/**
 * Enhanced Scroll Optimization Hook
 * Comprehensive scroll performance optimization with real-time monitoring
 */

import { useEffect, useRef, useCallback } from 'react';
import { useScrollPerformanceMonitor } from '@/utils/scrollPerformanceMonitor';
import performanceDetector from '@/utils/performanceDetection';

interface ScrollOptimizationOptions {
  enablePassiveListeners?: boolean;
  enableGPUAcceleration?: boolean;
  enableSmoothScrolling?: boolean;
  enablePerformanceMonitoring?: boolean;
  throttleMs?: number;
  enableReducedMotion?: boolean;
}

const defaultOptions: Required<ScrollOptimizationOptions> = {
  enablePassiveListeners: true,
  enableGPUAcceleration: true,
  enableSmoothScrolling: true,
  enablePerformanceMonitoring: process.env.NODE_ENV === 'development',
  throttleMs: 16,
  enableReducedMotion: true,
};

/**
 * Comprehensive hook for applying scroll performance optimizations
 */
export function useScrollOptimization(options: ScrollOptimizationOptions = {}) {
  const opts = { ...defaultOptions, ...options };
  const {
    enablePassiveListeners,
    enableGPUAcceleration,
    enableSmoothScrolling,
    enablePerformanceMonitoring,
    throttleMs,
    enableReducedMotion,
  } = opts;

  const optimizationApplied = useRef(false);
  const scrollElements = useRef<Set<HTMLElement>>(new Set());

  // Initialize scroll performance monitor if enabled
  const metrics = useScrollPerformanceMonitor({
    enabled: enablePerformanceMonitoring,
    logToConsole: false,
    autoOptimize: true,
  });

  /**
   * Apply passive event listeners for better scroll performance
   */
  const applyPassiveListeners = useCallback(() => {
    if (!enablePassiveListeners || typeof window === 'undefined') return;

    // Apply passive listeners to all scrollable elements
    const scrollableElements = document.querySelectorAll('[data-scroll-optimized]');
    
    scrollableElements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      if (!scrollElements.current.has(htmlElement)) {
        scrollElements.current.add(htmlElement);
        
        // Add passive scroll listener
        element.addEventListener('scroll', () => {}, { passive: true });
        element.addEventListener('wheel', () => {}, { passive: true });
        element.addEventListener('touchstart', () => {}, { passive: true });
        element.addEventListener('touchmove', () => {}, { passive: true });
      }
    });
  }, [enablePassiveListeners]);

  /**
   * Apply GPU acceleration to scroll-triggered elements
   */
  const applyGPUAcceleration = useCallback(() => {
    if (!enableGPUAcceleration || typeof window === 'undefined') return;

    const animatedElements = document.querySelectorAll([
      '.animate-on-scroll',
      '.parallax-element',
      '.fade-on-scroll',
      '.bg-parallax',
      '[data-framer-motion]',
      '.scroll-triggered'
    ].join(','));

    animatedElements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.transform = 'translate3d(0, 0, 0)';
      htmlElement.style.backfaceVisibility = 'hidden';
      htmlElement.style.willChange = 'transform, opacity';
    });
  }, [enableGPUAcceleration]);

  /**
   * Apply smooth scrolling optimization
   */
  const applySmoothScrolling = useCallback(() => {
    if (!enableSmoothScrolling || typeof window === 'undefined') return;

    // Apply smooth scrolling to html element
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Apply touch scrolling optimization for mobile
    if (performanceDetector.getCapabilities()?.isMobile) {
      (document.body.style as any).webkitOverflowScrolling = 'touch';
    }
  }, [enableSmoothScrolling]);

  /**
   * Apply reduced motion optimizations
   */
  const applyReducedMotion = useCallback(() => {
    if (!enableReducedMotion || typeof window === 'undefined') return;

    const capabilities = performanceDetector.getCapabilities();
    const settings = performanceDetector.getSettings();

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowEndDevice = capabilities?.isLowEnd;

    if (prefersReducedMotion || (isLowEndDevice && !settings?.enableHeavyAnimations)) {
      document.documentElement.classList.add('reduced-motion');
      
      // Disable heavy animations
      const heavyAnimationElements = document.querySelectorAll([
        '.animate-on-scroll',
        '.parallax-element',
        '.fade-on-scroll',
        '.bg-parallax'
      ].join(','));
      
      heavyAnimationElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.willChange = 'auto';
        htmlElement.style.transform = 'none';
        htmlElement.style.animation = 'none';
        htmlElement.style.transition = 'none';
      });
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [enableReducedMotion]);

  /**
   * Optimize scroll containers
   */
  const optimizeScrollContainers = useCallback(() => {
    if (typeof window === 'undefined') return;

    const scrollContainers = document.querySelectorAll('.scroll-container, [data-scroll-container]');
    
    scrollContainers.forEach((container) => {
      const htmlContainer = container as HTMLElement;
      htmlContainer.style.overflowX = 'hidden';
      htmlContainer.style.overflowY = 'auto';
      (htmlContainer.style as any).webkitOverflowScrolling = 'touch';
      htmlContainer.setAttribute('data-scroll-optimized', 'true');
    });
  }, []);

  /**
   * Apply content visibility optimization
   */
  const applyContentVisibility = useCallback(() => {
    if (typeof window === 'undefined') return;

    const largeElements = document.querySelectorAll([
      '.large-content',
      '.image-gallery',
      '.text-block',
      '.complex-layout'
    ].join(','));

    largeElements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.contain = 'layout style paint';
      htmlElement.style.contentVisibility = 'auto';
    });
  }, []);

  /**
   * Apply scroll optimization to new elements
   */
  const observeNewElements = useCallback(() => {
    if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            
            // Check if element needs scroll optimization
            if (element.matches('.animate-on-scroll, .parallax-element, .fade-on-scroll, .bg-parallax')) {
              if (enableGPUAcceleration) {
                element.style.transform = 'translate3d(0, 0, 0)';
                element.style.backfaceVisibility = 'hidden';
                element.style.willChange = 'transform, opacity';
              }
              
              if (enablePassiveListeners) {
                element.addEventListener('scroll', () => {}, { passive: true });
                element.addEventListener('wheel', () => {}, { passive: true });
              }
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, [enableGPUAcceleration, enablePassiveListeners]);

  /**
   * Main optimization effect
   */
  useEffect(() => {
    if (optimizationApplied.current || typeof window === 'undefined') return;

    // Apply all optimizations
    applyPassiveListeners();
    applyGPUAcceleration();
    applySmoothScrolling();
    applyReducedMotion();
    optimizeScrollContainers();
    applyContentVisibility();

    // Set up observer for new elements
    const cleanupObserver = observeNewElements();

    optimizationApplied.current = true;

    // Reapply optimizations periodically to catch dynamic content
    const reapplyInterval = setInterval(() => {
      applyPassiveListeners();
      applyGPUAcceleration();
      optimizeScrollContainers();
      applyContentVisibility();
    }, 5000);

    return () => {
      cleanupObserver?.();
      clearInterval(reapplyInterval);
      optimizationApplied.current = false;
    };
  }, [
    applyPassiveListeners,
    applyGPUAcceleration,
    applySmoothScrolling,
    applyReducedMotion,
    optimizeScrollContainers,
    applyContentVisibility,
    observeNewElements
  ]);

  /**
   * Reapply optimizations when options change
   */
  useEffect(() => {
    if (!optimizationApplied.current) return;

    applyPassiveListeners();
    applyGPUAcceleration();
    applySmoothScrolling();
    applyReducedMotion();
  }, [
    applyPassiveListeners,
    applyGPUAcceleration,
    applySmoothScrolling,
    applyReducedMotion
  ]);

  return {
    metrics,
    isOptimized: optimizationApplied.current,
    applyOptimizations: () => {
      applyPassiveListeners();
      applyGPUAcceleration();
      applySmoothScrolling();
      applyReducedMotion();
      optimizeScrollContainers();
      applyContentVisibility();
    }
  };
}