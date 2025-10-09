/**
 * Enhanced Unified Scroll Manager
 * 
 * This is the single source of truth for all scroll-related functionality.
 * Consolidates all scroll event listeners into one optimized system with:
 * - Single scroll event listener for entire application
 * - RequestAnimationFrame batching for 60fps performance
 * - Priority-based handler execution
 * - Handler deduplication and automatic cleanup
 * - Performance monitoring and metrics
 * - Mobile-specific optimizations
 */

import { getOptimalScrollConfig, applyScrollOptimizations } from './scrollPerformance';
import { getScrollTriggerManager } from './gsapScrollTrigger';
import { logger } from './logger';

// Types for scroll events and handlers
export interface ScrollEvent {
  scrollY: number;
  scrollX: number;
  deltaY: number;
  deltaX: number;
  direction: 'up' | 'down' | 'left' | 'right' | null;
  velocity: number;
  timestamp: number;
  viewportHeight: number;
  viewportWidth: number;
  scrollPercentage: number;
}

export interface ScrollHandler {
  id: string;
  handler: (event: ScrollEvent) => void;
  priority: number;
  type: 'parallax' | 'fade' | 'navigation' | 'background' | 'custom';
  throttle?: number;
  debounce?: number;
  active: boolean;
}

export interface ScrollManagerConfig {
  enableRaf: boolean;
  enableThrottling: boolean;
  enableDebouncing: boolean;
  defaultThrottle: number;
  defaultDebounce: number;
  enablePerformanceMonitoring: boolean;
  maxHandlers: number;
  mobileOptimizations: boolean;
}

export interface ScrollMetrics {
  fps: number;
  averageFrameTime: number;
  scrollVelocity: number;
  frameDrops: number;
  totalFrames: number;
  activeHandlers: number;
  isActive: boolean;
}

/**
 * Enhanced Unified Scroll Manager Class
 */
class UnifiedScrollManager {
  private handlers: Map<string, ScrollHandler> = new Map();
  private isActive: boolean = false;
  private rafId: number | null = null;
  private lastScrollY: number = 0;
  private lastScrollX: number = 0;
  private lastTimestamp: number = 0;
  private config: ScrollManagerConfig;
  private performanceMetrics: {
    frameCount: number;
    lastFpsCheck: number;
    fps: number;
    frameDrops: number;
    totalFrames: number;
  } = {
    frameCount: 0,
    lastFpsCheck: 0,
    fps: 60,
    frameDrops: 0,
    totalFrames: 0,
  };

  // Device detection
  private isMobile: boolean = false;
  private isLowEnd: boolean = false;

  constructor(config: Partial<ScrollManagerConfig> = {}) {
    this.config = {
      enableRaf: true,
      enableThrottling: true,
      enableDebouncing: false,
      defaultThrottle: 16, // ~60fps
      defaultDebounce: 100,
      enablePerformanceMonitoring: true,
      maxHandlers: 50,
      mobileOptimizations: true,
      ...config,
    };

    this.detectDevice();
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  /**
   * Detect device capabilities for optimizations
   */
  private detectDevice(): void {
    if (typeof window === 'undefined') return;
    
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency < 4 : false;
    
    // Adjust config for mobile/low-end devices
    if (this.isMobile || this.isLowEnd) {
      this.config.defaultThrottle = 33; // 30fps for mobile
      this.config.maxHandlers = 25; // Reduce handler limit
    }

    try {
      const root = document.documentElement;
      if (this.isLowEnd) root.classList.add('low-end'); else root.classList.remove('low-end');
      if (this.isMobile) root.classList.add('is-mobile'); else root.classList.remove('is-mobile');
    } catch {}
  }

  /**
   * Register a scroll handler with priority and optimization options
   */
  register(
    id: string,
    handler: (event: ScrollEvent) => void,
    options: {
      type?: 'parallax' | 'fade' | 'navigation' | 'background' | 'custom';
      priority?: number;
      throttle?: number;
      debounce?: number;
    } = {}
  ): () => void {
    // Check if handler already exists
    if (this.handlers.has(id)) {
      logger.warn(`UnifiedScrollManager: Handler ${id} already registered, replacing...`);
      this.unregister(id);
    }

    // Check handler limit
    if (this.handlers.size >= this.config.maxHandlers) {
      logger.warn(`UnifiedScrollManager: Maximum handlers (${this.config.maxHandlers}) reached`);
      return () => {};
    }

    const scrollHandler: ScrollHandler = {
      id,
      handler: this.optimizeHandler(handler, options),
      priority: options.priority || this.getDefaultPriority(options.type),
      type: options.type || 'custom',
      throttle: options.throttle,
      debounce: options.debounce,
      active: true,
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
   * Get default priority based on handler type
   */
  private getDefaultPriority(type?: string): number {
    const priorities = {
      parallax: 1, // Highest priority for smooth animations
      fade: 2,
      navigation: 3,
      background: 4,
      custom: 5, // Lowest priority
    };
    return priorities[type as keyof typeof priorities] || 5;
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

    // Apply scroll optimizations
    applyScrollOptimizations();

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

    if (process.env.NODE_ENV === 'development') {
      logger.log('🚀 UnifiedScrollManager: Started with', this.handlers.size, 'handlers');
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

    if (process.env.NODE_ENV === 'development') {
      logger.log('🛑 UnifiedScrollManager: Stopped');
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
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

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

    // Calculate scroll percentage
    const documentHeight = document.documentElement.scrollHeight - viewportHeight;
    const scrollPercentage = documentHeight > 0 ? Math.min(Math.max(currentScrollY / documentHeight, 0), 1) : 0;

    // Create scroll event
    const scrollEvent: ScrollEvent = {
      scrollY: currentScrollY,
      scrollX: currentScrollX,
      deltaY,
      deltaX,
      direction,
      velocity,
      timestamp: currentTimestamp,
      viewportHeight,
      viewportWidth,
      scrollPercentage,
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
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
      scrollPercentage: 0,
    };

    this.executeHandlers(scrollEvent);

    // Refresh ScrollTrigger on resize
    const scrollTriggerManager = getScrollTriggerManager();
    if (scrollTriggerManager && scrollTriggerManager.isAvailable()) {
      scrollTriggerManager.refresh();
    }
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
      .filter(handler => handler.active)
      .sort((a, b) => a.priority - b.priority);

    // Execute handlers
    sortedHandlers.forEach(({ handler, id }) => {
      try {
        handler(scrollEvent);
      } catch (error) {
        logger.error(`UnifiedScrollManager: Handler ${id} error:`, error);
      }
    });

    // Update GSAP ScrollTrigger after all custom handlers
    const scrollTriggerManager = getScrollTriggerManager();
    if (scrollTriggerManager && scrollTriggerManager.isAvailable()) {
      scrollTriggerManager.update();
    }
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
      optimizedHandler = this.debounce(optimizedHandler, options.debounce);
    }

    // Apply throttling if specified
    if (options.throttle && this.config.enableThrottling) {
      optimizedHandler = this.throttle(optimizedHandler, options.throttle);
    }

    return optimizedHandler;
  }

  /**
   * Throttle function implementation
   */
  private throttle<T extends (...args: any[]) => any>(func: T, wait: number): T {
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
  }

  /**
   * Debounce function implementation
   */
  private debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout | null = null;
    
    return ((...args: any[]) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    }) as T;
  }

  /**
   * Update performance metrics
   */
  private updatePerformanceMetrics(timestamp: number): void {
    if (!this.config.enablePerformanceMonitoring) return;

    this.performanceMetrics.frameCount++;
    this.performanceMetrics.totalFrames++;

    // Calculate FPS every second
    if (timestamp - this.performanceMetrics.lastFpsCheck >= 1000) {
      this.performanceMetrics.fps = this.performanceMetrics.frameCount;
      this.performanceMetrics.frameCount = 0;
      this.performanceMetrics.lastFpsCheck = timestamp;

      // Warn about performance issues
      if (this.performanceMetrics.fps < 45) {
        logger.warn(`UnifiedScrollManager: Low FPS detected: ${this.performanceMetrics.fps}`);
      }
    }
  }

  /**
   * Get current performance metrics
   */
  getPerformanceMetrics(): ScrollMetrics {
    return {
      ...this.performanceMetrics,
      averageFrameTime: this.performanceMetrics.fps > 0 ? 1000 / this.performanceMetrics.fps : 0,
      scrollVelocity: 0, // This would need to be calculated from recent scroll events
      activeHandlers: this.handlers.size,
      isActive: this.isActive,
    };
  }

  /**
   * Get current scroll state
   */
  getScrollState(): Partial<ScrollEvent> {
    return {
      scrollY: this.lastScrollY,
      scrollX: this.lastScrollX,
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
    };
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<ScrollManagerConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Destroy the manager
   */
  destroy(): void {
    this.stop();
    this.handlers.clear();
    
    if (this.resizeDebounceTimer) {
      clearTimeout(this.resizeDebounceTimer);
    }
  }
}

// Create global unified scroll manager instance
const unifiedScrollManager = new UnifiedScrollManager();

/**
 * Get the unified scroll manager instance
 */
export function getUnifiedScrollManager(): UnifiedScrollManager {
  return unifiedScrollManager;
}

/**
 * React hook for using the unified scroll manager
 */
export function useUnifiedScroll(
  handler: (event: ScrollEvent) => void,
  options: {
    id?: string;
    type?: 'parallax' | 'fade' | 'navigation' | 'background' | 'custom';
    priority?: number;
    throttle?: number;
    debounce?: number;
    deps?: any[];
  } = {}
) {
  const { deps = [], id, ...scrollOptions } = options;
  
  // Use a simple useEffect-like implementation without React dependency
  const handlerId = id || `scroll-handler-${Math.random().toString(36).substr(2, 9)}`;
  const unregister = unifiedScrollManager.register(handlerId, handler, scrollOptions);
  
  return unregister;
}

export default unifiedScrollManager;
