/**
 * Scroll Performance Monitoring and Optimization Utilities
 *
 * This module provides utilities for monitoring and optimizing scroll performance,
 * including performance metrics, throttling, and debouncing functions.
 */

interface ScrollMetrics {
  fps: number;
  averageFrameTime: number;
  scrollVelocity: number;
  frameDrops: number;
  totalFrames: number;
}

interface PerformanceConfig {
  targetFPS: number;
  maxFrameTime: number;
  throttleDelay: number;
  debounceDelay: number;
}

/**
 * Default performance configuration
 */
const DEFAULT_CONFIG: PerformanceConfig = {
  targetFPS: 60,
  maxFrameTime: 16.67, // 60fps = ~16.67ms per frame
  throttleDelay: 16, // ~60fps
  debounceDelay: 150, // 150ms debounce for scroll end detection
};

/**
 * Throttle function for scroll events
 * Ensures function is called at most once per specified delay
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number = DEFAULT_CONFIG.throttleDelay
): T {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;

  return ((...args: Parameters<T>) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(
        () => {
          func(...args);
          lastExecTime = Date.now();
        },
        delay - (currentTime - lastExecTime)
      );
    }
  }) as T;
}

/**
 * Debounce function for scroll events
 * Delays function execution until after specified delay has passed
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = DEFAULT_CONFIG.debounceDelay
): T {
  let timeoutId: NodeJS.Timeout | null = null;

  return ((...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
}

/**
 * RequestAnimationFrame-based throttling for smooth animations
 * Ensures consistent frame rate for scroll-based animations
 */
export function rafThrottle<T extends (...args: any[]) => any>(func: T): T {
  let rafId: number | null = null;
  let lastArgs: Parameters<T> | null = null;

  return ((...args: Parameters<T>) => {
    lastArgs = args;

    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        if (lastArgs) {
          func(...lastArgs);
        }
        rafId = null;
      });
    }
  }) as T;
}

/**
 * Performance monitoring class for scroll events
 */
export class ScrollPerformanceMonitor {
  private config: PerformanceConfig;
  private frameCount = 0;
  private lastTime = 0;
  private frameDrops = 0;
  private metrics: ScrollMetrics = {
    fps: 0,
    averageFrameTime: 0,
    scrollVelocity: 0,
    frameDrops: 0,
    totalFrames: 0,
  };

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Start monitoring scroll performance
   */
  startMonitoring(): void {
    this.lastTime = performance.now();
    this.frameCount = 0;
    this.frameDrops = 0;
  }

  /**
   * Record a frame and update metrics
   */
  recordFrame(scrollVelocity: number = 0): void {
    const currentTime = performance.now();
    const frameTime = currentTime - this.lastTime;

    this.frameCount++;
    this.metrics.scrollVelocity = scrollVelocity;

    // Check for frame drops
    if (frameTime > this.config.maxFrameTime) {
      this.frameDrops++;
    }

    // Update FPS every 60 frames
    if (this.frameCount % 60 === 0) {
      this.metrics.fps = Math.round(1000 / (frameTime || 1));
      this.metrics.averageFrameTime = frameTime;
      this.metrics.frameDrops = this.frameDrops;
      this.metrics.totalFrames = this.frameCount;

      // Log performance warnings in development
      if (process.env.NODE_ENV === 'development' && this.metrics.fps < this.config.targetFPS - 10) {
        // Scroll performance warning
      }
    }

    this.lastTime = currentTime;
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): ScrollMetrics {
    return { ...this.metrics };
  }

  /**
   * Reset performance metrics
   */
  reset(): void {
    this.frameCount = 0;
    this.frameDrops = 0;
    this.lastTime = performance.now();
    this.metrics = {
      fps: 0,
      averageFrameTime: 0,
      scrollVelocity: 0,
      frameDrops: 0,
      totalFrames: 0,
    };
  }
}

/**
 * Optimized scroll handler with performance monitoring
 */
export function createOptimizedScrollHandler(
  callback: (scrollY: number, scrollX: number) => void,
  options: {
    throttle?: boolean;
    debounce?: boolean;
    monitor?: boolean;
    config?: Partial<PerformanceConfig>;
  } = {}
) {
  const {
    throttle: useThrottle = true,
    debounce: useDebounce = false,
    monitor = false,
    config = {},
  } = options;

  const performanceConfig = { ...DEFAULT_CONFIG, ...config };
  const monitorInstance = monitor ? new ScrollPerformanceMonitor(performanceConfig) : null;

  let handler = callback;

  // Apply throttling
  if (useThrottle) {
    handler = rafThrottle(handler);
  }

  // Apply debouncing
  if (useDebounce) {
    handler = debounce(handler, performanceConfig.debounceDelay);
  }

  // Wrap with performance monitoring
  if (monitorInstance) {
    const originalHandler = handler;
    handler = (scrollY: number, scrollX: number) => {
      const startTime = performance.now();
      originalHandler(scrollY, scrollX);
      const endTime = performance.now();

      const frameTime = endTime - startTime;
      monitorInstance.recordFrame(Math.abs(scrollY - (window.scrollY || 0)));

      if (process.env.NODE_ENV === 'development' && frameTime > performanceConfig.maxFrameTime) {
        // Slow scroll handler
      }
    };
  }

  return {
    handler,
    monitor: monitorInstance,
  };
}

/**
 * Check if device supports smooth scrolling
 */
export function supportsSmoothScrolling(): boolean {
  return 'scrollBehavior' in document.documentElement.style;
}

/**
 * Enable smooth scrolling for the document
 */
export function enableSmoothScrolling(): void {
  if (supportsSmoothScrolling()) {
    document.documentElement.style.scrollBehavior = 'smooth';
  }
}

/**
 * Disable smooth scrolling for the document
 */
export function disableSmoothScrolling(): void {
  if (supportsSmoothScrolling()) {
    document.documentElement.style.scrollBehavior = 'auto';
  }
}

/**
 * Get optimal scroll configuration based on device capabilities
 */
export function getOptimalScrollConfig(): PerformanceConfig {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

  if (isMobile || isLowEnd) {
    return {
      ...DEFAULT_CONFIG,
      targetFPS: 30,
      maxFrameTime: 33.33, // 30fps
      throttleDelay: 33,
      debounceDelay: 200,
    };
  }

  return DEFAULT_CONFIG;
}

/**
 * Performance optimization utilities for scroll-based animations
 */
export const scrollOptimizations = {
  /**
   * Use transform instead of changing layout properties
   */
  useTransforms: true,

  /**
   * Enable hardware acceleration
   */
  enableHardwareAcceleration: true,

  /**
   * Batch DOM reads and writes
   */
  batchDOMOperations: true,

  /**
   * Use passive event listeners
   */
  usePassiveListeners: true,

  /**
   * Reduce precision for better performance
   */
  reducePrecision: false,
};

/**
 * Apply CSS optimizations for smooth scrolling
 */
export function applyScrollOptimizations(): void {
  const style = document.createElement('style');
  style.textContent = `
    * {
      scroll-behavior: smooth;
    }
    
    /* Enable hardware acceleration for animated elements */
    .scroll-animated {
      transform: translateZ(0);
      will-change: transform;
    }
    
    /* Optimize scroll performance */
    html {
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
    }
    
    /* Reduce paint operations */
    .scroll-optimized {
      contain: layout style paint;
    }
  `;

  document.head.appendChild(style);
}

/**
 * Remove scroll optimizations (for testing)
 */
export function removeScrollOptimizations(): void {
  const existingStyle = document.querySelector('style[data-scroll-optimizations]');
  if (existingStyle) {
    existingStyle.remove();
  }
}
