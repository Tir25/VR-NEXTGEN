/**
 * Scroll Performance Monitor
 * Monitors scroll performance metrics and provides optimization recommendations
 */

interface ScrollMetrics {
  fps: number;
  frameTime: number;
  scrollLatency: number;
  isSmooth: boolean;
  droppedFrames: number;
  averageFrameTime: number;
}

interface PerformanceThresholds {
  targetFPS: number;
  maxFrameTime: number;
  maxScrollLatency: number;
  maxDroppedFrames: number;
}

class ScrollPerformanceMonitor {
  private metrics: ScrollMetrics = {
    fps: 60,
    frameTime: 16.67,
    scrollLatency: 0,
    isSmooth: true,
    droppedFrames: 0,
    averageFrameTime: 16.67,
  };

  private thresholds: PerformanceThresholds = {
    targetFPS: 55, // Allow for some variance
    maxFrameTime: 20, // 50 FPS minimum
    maxScrollLatency: 16, // One frame at 60 FPS
    maxDroppedFrames: 3, // Allow some dropped frames
  };

  private frameCount = 0;
  private lastFrameTime = 0;
  private frameTimeHistory: number[] = [];
  private isMonitoring = false;
  private rafId: number | null = null;
  private lastScrollTime = 0;
  private scrollStartTime = 0;

  constructor() {
    // Only start monitoring in browser environment
    if (typeof window !== 'undefined') {
      this.startMonitoring();
    }
  }

  /**
   * Start monitoring scroll performance
   */
  private startMonitoring(): void {
    if (this.isMonitoring) return;

    // Only start monitoring in browser environment
    if (typeof window === 'undefined') return;

    this.isMonitoring = true;
    this.lastFrameTime = performance.now();
    this.frameCount = 0;
    this.frameTimeHistory = [];

    this.measureFrameRate();
    this.setupScrollLatencyTracking();
  }

  /**
   * Measure frame rate using requestAnimationFrame
   */
  private measureFrameRate(): void {
    if (typeof window === 'undefined' || typeof requestAnimationFrame === 'undefined') return;

    const measureFrame = (currentTime: number) => {
      if (!this.isMonitoring) return;

      const deltaTime = currentTime - this.lastFrameTime;
      this.lastFrameTime = currentTime;

      // Calculate frame time and FPS
      this.frameTimeHistory.push(deltaTime);
      if (this.frameTimeHistory.length > 60) {
        this.frameTimeHistory.shift(); // Keep only last 60 frames
      }

      const averageFrameTime = this.frameTimeHistory.reduce((a, b) => a + b, 0) / this.frameTimeHistory.length;
      const currentFPS = 1000 / averageFrameTime;

      // Count dropped frames (frames that took longer than 20ms)
      const droppedFrames = this.frameTimeHistory.filter(time => time > 20).length;

      this.metrics = {
        ...this.metrics,
        fps: Math.round(currentFPS),
        frameTime: Math.round(deltaTime * 100) / 100,
        averageFrameTime: Math.round(averageFrameTime * 100) / 100,
        droppedFrames,
        isSmooth: currentFPS >= this.thresholds.targetFPS && droppedFrames <= this.thresholds.maxDroppedFrames,
      };

      this.rafId = requestAnimationFrame(measureFrame);
    };

    this.rafId = requestAnimationFrame(measureFrame);
  }

  /**
   * Setup scroll latency tracking
   */
  private setupScrollLatencyTracking(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    let scrollStartTime = 0;

    const handleScrollStart = () => {
      scrollStartTime = performance.now();
    };

    const handleScroll = () => {
      const scrollEndTime = performance.now();
      const latency = scrollEndTime - scrollStartTime;
      
      this.metrics.scrollLatency = Math.round(latency * 100) / 100;
      
      // Update scroll start time for next measurement
      scrollStartTime = scrollEndTime;
    };

    // Use passive listeners for better performance
    document.addEventListener('scroll', handleScrollStart, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): ScrollMetrics {
    if (typeof window === 'undefined') {
      return {
        fps: 60,
        frameTime: 16.67,
        scrollLatency: 0,
        isSmooth: true,
        droppedFrames: 0,
        averageFrameTime: 16.67,
      };
    }
    return { ...this.metrics };
  }

  /**
   * Check if scroll performance is optimal
   */
  isPerformanceOptimal(): boolean {
    if (typeof window === 'undefined') {
      return true; // Assume optimal during SSR
    }
    return (
      this.metrics.fps >= this.thresholds.targetFPS &&
      this.metrics.frameTime <= this.thresholds.maxFrameTime &&
      this.metrics.scrollLatency <= this.thresholds.maxScrollLatency &&
      this.metrics.droppedFrames <= this.thresholds.maxDroppedFrames
    );
  }

  /**
   * Get monitoring status
   */
  getIsMonitoring(): boolean {
    return this.isMonitoring;
  }

  /**
   * Get performance recommendations
   */
  getRecommendations(): string[] {
    if (typeof window === 'undefined') {
      return []; // No recommendations during SSR
    }

    const recommendations: string[] = [];

    if (this.metrics.fps < this.thresholds.targetFPS) {
      recommendations.push('Consider reducing animation complexity or using GPU acceleration');
    }

    if (this.metrics.frameTime > this.thresholds.maxFrameTime) {
      recommendations.push('Optimize heavy computations or reduce DOM manipulation during scroll');
    }

    if (this.metrics.scrollLatency > this.thresholds.maxScrollLatency) {
      recommendations.push('Use passive event listeners and debounce scroll handlers');
    }

    if (this.metrics.droppedFrames > this.thresholds.maxDroppedFrames) {
      recommendations.push('Reduce visual effects or implement performance-based quality scaling');
    }

    return recommendations;
  }

  /**
   * Log performance metrics (development only)
   */
  logMetrics(): void {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      console.group('🔄 Scroll Performance Metrics');
      console.log(`FPS: ${this.metrics.fps} (target: ${this.thresholds.targetFPS})`);
      console.log(`Frame Time: ${this.metrics.frameTime}ms (max: ${this.thresholds.maxFrameTime}ms)`);
      console.log(`Scroll Latency: ${this.metrics.scrollLatency}ms (max: ${this.thresholds.maxScrollLatency}ms)`);
      console.log(`Dropped Frames: ${this.metrics.droppedFrames} (max: ${this.thresholds.maxDroppedFrames})`);
      console.log(`Smooth: ${this.metrics.isSmooth ? '✅' : '❌'}`);
      
      const recommendations = this.getRecommendations();
      if (recommendations.length > 0) {
        console.group('💡 Recommendations');
        recommendations.forEach(rec => console.log(`• ${rec}`));
        console.groupEnd();
      }
      
      console.groupEnd();
    }
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    this.isMonitoring = false;
    if (this.rafId && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /**
   * Update performance thresholds based on device capabilities
   */
  updateThresholds(capabilities: any): void {
    if (capabilities?.isLowEnd || capabilities?.isMobile) {
      // More lenient thresholds for low-end devices
      this.thresholds = {
        targetFPS: 45,
        maxFrameTime: 25,
        maxScrollLatency: 20,
        maxDroppedFrames: 5,
      };
    } else {
      // Strict thresholds for high-end devices
      this.thresholds = {
        targetFPS: 55,
        maxFrameTime: 18,
        maxScrollLatency: 16,
        maxDroppedFrames: 2,
      };
    }
  }
}

// Create global instance only in browser environment
const scrollPerformanceMonitor = typeof window !== 'undefined' ? new ScrollPerformanceMonitor() : null;

/**
 * React hook for using scroll performance monitor
 */
export function useScrollPerformanceMonitor(options?: {
  enabled?: boolean;
  logToConsole?: boolean;
  autoOptimize?: boolean;
  targetFPS?: number;
  latencyThreshold?: number;
  jankThreshold?: number;
}) {
  const opts = {
    enabled: true,
    logToConsole: false,
    autoOptimize: true,
    targetFPS: 60,
    latencyThreshold: 20,
    jankThreshold: 10,
    ...options
  };

  // Return fallback values if scrollPerformanceMonitor is not available (SSR)
  if (!scrollPerformanceMonitor || typeof window === 'undefined') {
    return {
      metrics: {
        fps: 60,
        frameTime: 16.67,
        scrollLatency: 0,
        isSmooth: true,
        droppedFrames: 0,
        averageFrameTime: 16.67,
      },
      isOptimal: true,
      recommendations: [],
      isMonitoring: false,
      getMetrics: () => ({
        fps: 60,
        frameTime: 16.67,
        scrollLatency: 0,
        isSmooth: true,
        droppedFrames: 0,
        averageFrameTime: 16.67,
      }),
      isPerformanceOptimal: () => true,
      getRecommendations: () => [],
    };
  }

  // Return the current metrics from the global instance
  const metrics = scrollPerformanceMonitor.getMetrics();
  const isOptimal = scrollPerformanceMonitor.isPerformanceOptimal();
  const recommendations = scrollPerformanceMonitor.getRecommendations();

  // Log metrics if enabled and in development
  if (opts.logToConsole && process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    console.log('Scroll Performance Metrics:', metrics);
  }

  return {
    metrics,
    isOptimal,
    recommendations,
    isMonitoring: scrollPerformanceMonitor.getIsMonitoring(),
    getMetrics: () => scrollPerformanceMonitor.getMetrics(),
    isPerformanceOptimal: () => scrollPerformanceMonitor.isPerformanceOptimal(),
    getRecommendations: () => scrollPerformanceMonitor.getRecommendations(),
  };
}

export default scrollPerformanceMonitor;
export type { ScrollMetrics, PerformanceThresholds };
