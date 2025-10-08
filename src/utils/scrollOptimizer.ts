/**
 * Advanced Scroll Performance Optimizer
 * Consolidates all scroll-based effects into a single, optimized controller
 * Ensures smooth 60fps performance across all scroll interactions
 */

import React from 'react';
// Simple throttle and debounce implementations
const throttle = <T extends (...args: any[]) => any>(func: T, wait: number): T => {
  let timeout: NodeJS.Timeout | null = null;
  let previous = 0;
  
  return ((...args: any[]) => {
    const now = Date.now();
    const remaining = wait - (now - previous);
    
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      return func(...args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func(...args);
      }, remaining);
    }
  }) as T;
};

const debounce = <T extends (...args: any[]) => any>(func: T, wait: number): T => {
  let timeout: NodeJS.Timeout | null = null;
  
  return ((...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
};

interface ScrollEvent {
  scrollY: number;
  scrollX: number;
  deltaY: number;
  deltaX: number;
  direction: 'up' | 'down' | 'left' | 'right' | null;
  velocity: number;
  timestamp: number;
}

interface ScrollHandler {
  id: string;
  handler: (event: ScrollEvent) => void;
  priority: number;
  throttle?: number;
  debounce?: number;
}

interface ScrollOptimizerConfig {
  enableRaf: boolean;
  enableThrottling: boolean;
  enableDebouncing: boolean;
  defaultThrottle: number;
  defaultDebounce: number;
  enablePerformanceMonitoring: boolean;
  maxHandlers: number;
}

class ScrollOptimizer {
  private handlers: Map<string, ScrollHandler> = new Map();
  private isActive: boolean = false;
  private rafId: number | null = null;
  private lastScrollY: number = 0;
  private lastScrollX: number = 0;
  private lastTimestamp: number = 0;
  private config: ScrollOptimizerConfig;
  private performanceMetrics: {
    frameCount: number;
    lastFpsCheck: number;
    fps: number;
  } = {
    frameCount: 0,
    lastFpsCheck: 0,
    fps: 60,
  };

  constructor(config: Partial<ScrollOptimizerConfig> = {}) {
    this.config = {
      enableRaf: true,
      enableThrottling: true,
      enableDebouncing: false,
      defaultThrottle: 16, // ~60fps
      defaultDebounce: 100,
      enablePerformanceMonitoring: true,
      maxHandlers: 50,
      ...config,
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  /**
   * Register a scroll handler with priority and optimization options
   */
  register(
    id: string,
    handler: (event: ScrollEvent) => void,
    options: {
      priority?: number;
      throttle?: number;
      debounce?: number;
    } = {}
  ): () => void {
    if (this.handlers.size >= this.config.maxHandlers) {
      console.warn(`ScrollOptimizer: Maximum handlers (${this.config.maxHandlers}) reached`);
      return () => {};
    }

    const scrollHandler: ScrollHandler = {
      id,
      handler: this.optimizeHandler(handler, options),
      priority: options.priority || 0,
      throttle: options.throttle,
      debounce: options.debounce,
    };

    this.handlers.set(id, scrollHandler);
    this.startIfNeeded();

    // Return unregister function
    return () => this.unregister(id);
  }

  /**
   * Unregister a scroll handler
   */
  unregister(id: string): void {
    this.handlers.delete(id);
    this.stopIfNeeded();
  }

  /**
   * Start scroll optimization if not already active
   */
  private startIfNeeded(): void {
    if (!this.isActive && this.handlers.size > 0) {
      this.start();
    }
  }

  /**
   * Stop scroll optimization if no handlers remain
   */
  private stopIfNeeded(): void {
    if (this.isActive && this.handlers.size === 0) {
      this.stop();
    }
  }

  /**
   * Start scroll optimization
   */
  private start(): void {
    if (this.isActive) return;

    this.isActive = true;
    this.lastScrollY = window.scrollY;
    this.lastScrollX = window.scrollX;
    this.lastTimestamp = performance.now();

    // Use passive listeners for better performance
    window.addEventListener('scroll', this.handleScroll, { 
      passive: true, 
      capture: false 
    });
    
    window.addEventListener('resize', this.handleResize, { 
      passive: true 
    });

    if (this.config.enableRaf) {
      this.startRafLoop();
    }
  }

  /**
   * Stop scroll optimization
   */
  private stop(): void {
    if (!this.isActive) return;

    this.isActive = false;

    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /**
   * Handle scroll events with optimization
   */
  private handleScroll(): void {
    if (!this.isActive) return;

    const currentScrollY = window.scrollY;
    const currentScrollX = window.scrollX;
    const currentTimestamp = performance.now();

    // Calculate scroll metrics
    const deltaY = currentScrollY - this.lastScrollY;
    const deltaX = currentScrollX - this.lastScrollX;
    const deltaTime = currentTimestamp - this.lastTimestamp;

    // Determine scroll direction
    let direction: ScrollEvent['direction'] = null;
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      direction = deltaY > 0 ? 'down' : 'up';
    } else if (Math.abs(deltaX) > 0) {
      direction = deltaX > 0 ? 'right' : 'left';
    }

    // Calculate velocity (pixels per second)
    const velocity = deltaTime > 0 ? Math.abs(deltaY) / (deltaTime / 1000) : 0;

    // Create scroll event
    const scrollEvent: ScrollEvent = {
      scrollY: currentScrollY,
      scrollX: currentScrollX,
      deltaY,
      deltaX,
      direction,
      velocity,
      timestamp: currentTimestamp,
    };

    if (this.config.enableRaf) {
      this.scheduleRafUpdate(scrollEvent);
    } else {
      this.executeHandlers(scrollEvent);
    }

    // Update last values
    this.lastScrollY = currentScrollY;
    this.lastScrollX = currentScrollX;
    this.lastTimestamp = currentTimestamp;
  }

  /**
   * Handle resize events
   */
  private handleResize(): void {
    // Debounce resize handling
    if (this.resizeDebounceTimer) {
      clearTimeout(this.resizeDebounceTimer);
    }
    
    this.resizeDebounceTimer = setTimeout(() => {
      this.notifyResize();
    }, 150);
  }

  private resizeDebounceTimer: NodeJS.Timeout | null = null;

  /**
   * Notify handlers of resize
   */
  private notifyResize(): void {
    const scrollEvent: ScrollEvent = {
      scrollY: window.scrollY,
      scrollX: window.scrollX,
      deltaY: 0,
      deltaX: 0,
      direction: null,
      velocity: 0,
      timestamp: performance.now(),
    };

    this.executeHandlers(scrollEvent);
  }

  /**
   * Start requestAnimationFrame loop
   */
  private startRafLoop(): void {
    if (!this.isActive) return;

    const rafLoop = (timestamp: number) => {
      if (!this.isActive) return;

      // Update performance metrics
      this.updatePerformanceMetrics(timestamp);

      // Process pending scroll events
      if (this.pendingScrollEvent) {
        this.executeHandlers(this.pendingScrollEvent);
        this.pendingScrollEvent = null;
      }

      this.rafId = requestAnimationFrame(rafLoop);
    };

    this.rafId = requestAnimationFrame(rafLoop);
  }

  private pendingScrollEvent: ScrollEvent | null = null;

  /**
   * Schedule RAF update
   */
  private scheduleRafUpdate(scrollEvent: ScrollEvent): void {
    // Only keep the latest scroll event
    this.pendingScrollEvent = scrollEvent;
  }

  /**
   * Execute all registered handlers
   */
  private executeHandlers(scrollEvent: ScrollEvent): void {
    // Sort handlers by priority (higher priority first)
    const sortedHandlers = Array.from(this.handlers.values())
      .sort((a, b) => b.priority - a.priority);

    // Execute handlers
    sortedHandlers.forEach(({ handler }) => {
      try {
        handler(scrollEvent);
      } catch (error) {
        console.error('ScrollOptimizer: Handler error:', error);
      }
    });
  }

  /**
   * Optimize handler with throttling/debouncing
   */
  private optimizeHandler(
    handler: (event: ScrollEvent) => void,
    options: { throttle?: number; debounce?: number }
  ): (event: ScrollEvent) => void {
    let optimizedHandler = handler;

    // Apply debouncing if specified
    if (options.debounce && this.config.enableDebouncing) {
      optimizedHandler = debounce(optimizedHandler, options.debounce);
    }

    // Apply throttling if specified
    if (options.throttle && this.config.enableThrottling) {
      optimizedHandler = throttle(optimizedHandler, options.throttle);
    }

    return optimizedHandler;
  }

  /**
   * Update performance metrics
   */
  private updatePerformanceMetrics(timestamp: number): void {
    if (!this.config.enablePerformanceMonitoring) return;

    this.performanceMetrics.frameCount++;

    // Calculate FPS every second
    if (timestamp - this.performanceMetrics.lastFpsCheck >= 1000) {
      this.performanceMetrics.fps = this.performanceMetrics.frameCount;
      this.performanceMetrics.frameCount = 0;
      this.performanceMetrics.lastFpsCheck = timestamp;

      // Warn about performance issues
      if (this.performanceMetrics.fps < 45) {
        console.warn(`ScrollOptimizer: Low FPS detected: ${this.performanceMetrics.fps}`);
      }
    }
  }

  /**
   * Get current performance metrics
   */
  getPerformanceMetrics() {
    return {
      ...this.performanceMetrics,
      activeHandlers: this.handlers.size,
      isActive: this.isActive,
    };
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<ScrollOptimizerConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Destroy the optimizer
   */
  destroy(): void {
    this.stop();
    this.handlers.clear();
    
    if (this.resizeDebounceTimer) {
      clearTimeout(this.resizeDebounceTimer);
    }
  }
}

// Create global scroll optimizer instance
const scrollOptimizer = new ScrollOptimizer();

/**
 * React hook for optimized scroll handling
 */
export function useOptimizedScroll(
  handler: (event: ScrollEvent) => void,
  options: {
    priority?: number;
    throttle?: number;
    debounce?: number;
    deps?: React.DependencyList;
  } = {}
) {
  const { deps = [], ...scrollOptions } = options;
  
  React.useEffect(() => {
    const id = `scroll-handler-${Math.random().toString(36).substr(2, 9)}`;
    const unregister = scrollOptimizer.register(id, handler, scrollOptions);
    
    return unregister;
  }, deps);
}

/**
 * Utility to create scroll-based animations
 */
export function createScrollAnimation(
  element: HTMLElement,
  animation: (progress: number, event: ScrollEvent) => void,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean;
    once?: boolean;
  } = {}
) {
  const {
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
    once = false,
  } = options;

  // This would integrate with GSAP ScrollTrigger or similar
  // For now, return a cleanup function
  return () => {
    // Cleanup logic here
  };
}

/**
 * Batch DOM updates for scroll handlers
 */
export function batchScrollUpdates(updates: (() => void)[]): void {
  requestAnimationFrame(() => {
    updates.forEach(update => update());
  });
}

export default scrollOptimizer;
