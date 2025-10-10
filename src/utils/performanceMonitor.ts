/**
 * Performance Monitoring Utilities
 * Provides comprehensive performance monitoring for animations, scroll, and rendering
 * Optimized for 60fps performance and smooth user experience
 */

import React from 'react';

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsage?: number;
  scrollPerformance: number;
  animationPerformance: number;
}

interface PerformanceConfig {
  sampleSize: number;
  warningThreshold: number;
  criticalThreshold: number;
  enableMemoryMonitoring: boolean;
}

class PerformanceMonitor {
  private config: PerformanceConfig;
  private frameCount: number = 0;
  private lastTime: number = 0;
  private fpsHistory: number[] = [];
  private isMonitoring: boolean = false;
  private animationFrameId: number | null = null;
  private observers: ((metrics: PerformanceMetrics) => void)[] = [];

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = {
      sampleSize: 60, // 1 second at 60fps
      warningThreshold: 45, // Warning below 45fps
      criticalThreshold: 30, // Critical below 30fps
      enableMemoryMonitoring: false, // Disabled by default for privacy
      ...config,
    };
  }

  /**
   * Start performance monitoring
   */
  start(): void {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    this.lastTime = performance.now();
    this.monitor();
  }

  /**
   * Stop performance monitoring
   */
  stop(): void {
    this.isMonitoring = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Add performance observer
   */
  addObserver(callback: (metrics: PerformanceMetrics) => void): () => void {
    this.observers.push(callback);
    return () => {
      const index = this.observers.indexOf(callback);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }

  /**
   * Core monitoring loop
   */
  private monitor(): void {
    if (!this.isMonitoring) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;

    this.frameCount++;

    // Calculate FPS every frame
    const fps = deltaTime > 0 ? 1000 / deltaTime : 0;
    this.fpsHistory.push(fps);

    // Keep only recent samples
    if (this.fpsHistory.length > this.config.sampleSize) {
      this.fpsHistory.shift();
    }

    // Calculate average FPS
    const averageFps = this.fpsHistory.reduce((sum, f) => sum + f, 0) / this.fpsHistory.length;

    // Collect performance metrics
    const metrics: PerformanceMetrics = {
      fps: Math.round(averageFps * 100) / 100,
      frameTime: deltaTime,
      scrollPerformance: this.measureScrollPerformance(),
      animationPerformance: this.measureAnimationPerformance(),
    };

    // Add memory usage if enabled
    if (this.config.enableMemoryMonitoring && 'memory' in performance) {
      metrics.memoryUsage = (performance as any).memory.usedJSHeapSize / 1024 / 1024; // MB
    }

    // Notify observers
    this.observers.forEach(observer => {
      try {
        observer(metrics);
      } catch (error) {
        console.warn('Performance observer error:', error);
      }
    });

    // Check for performance issues
    this.checkPerformanceIssues(metrics);

    this.lastTime = currentTime;
    this.animationFrameId = requestAnimationFrame(() => this.monitor());
  }

  /**
   * Measure scroll performance
   */
  private measureScrollPerformance(): number {
    // Simple scroll performance metric based on frame consistency
    const frameTimeVariance = this.calculateVariance(this.fpsHistory);
    return Math.max(0, 100 - frameTimeVariance * 10); // Convert to 0-100 scale
  }

  /**
   * Measure animation performance
   */
  private measureAnimationPerformance(): number {
    // Animation performance based on frame rate consistency
    const consistentFrames = this.fpsHistory.filter(fps => fps >= 55).length;
    return (consistentFrames / this.fpsHistory.length) * 100;
  }

  /**
   * Calculate variance for performance metrics
   */
  private calculateVariance(values: number[]): number {
    if (values.length === 0) return 0;

    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  }

  /**
   * Check for performance issues and provide warnings
   */
  private checkPerformanceIssues(metrics: PerformanceMetrics): void {
    if (metrics.fps < this.config.criticalThreshold) {
      console.warn(
        `Critical performance issue: ${metrics.fps.toFixed(1)}fps (below ${this.config.criticalThreshold}fps)`
      );
    } else if (metrics.fps < this.config.warningThreshold) {
      console.warn(
        `Performance warning: ${metrics.fps.toFixed(1)}fps (below ${this.config.warningThreshold}fps)`
      );
    }
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): PerformanceMetrics {
    const averageFps =
      this.fpsHistory.length > 0
        ? this.fpsHistory.reduce((sum, f) => sum + f, 0) / this.fpsHistory.length
        : 0;

    return {
      fps: Math.round(averageFps * 100) / 100,
      frameTime: this.lastTime > 0 ? performance.now() - this.lastTime : 0,
      scrollPerformance: this.measureScrollPerformance(),
      animationPerformance: this.measureAnimationPerformance(),
    };
  }

  /**
   * Reset performance monitoring
   */
  reset(): void {
    this.frameCount = 0;
    this.fpsHistory = [];
    this.lastTime = performance.now();
  }
}

// Create global performance monitor instance
const performanceMonitor = new PerformanceMonitor();

/**
 * Hook for React components to monitor performance
 */
export function usePerformanceMonitor(
  onMetrics?: (metrics: PerformanceMetrics) => void,
  autoStart: boolean = false
) {
  const [metrics, setMetrics] = React.useState<PerformanceMetrics>(() =>
    performanceMonitor.getMetrics()
  );

  React.useEffect(() => {
    if (!onMetrics && !autoStart) return;

    const unsubscribe = performanceMonitor.addObserver(newMetrics => {
      setMetrics(newMetrics);
      onMetrics?.(newMetrics);
    });

    if (autoStart) {
      performanceMonitor.start();
    }

    return () => {
      unsubscribe();
      if (autoStart) {
        performanceMonitor.stop();
      }
    };
  }, [onMetrics, autoStart]);

  return {
    metrics,
    start: () => performanceMonitor.start(),
    stop: () => performanceMonitor.stop(),
    reset: () => performanceMonitor.reset(),
  };
}

/**
 * Utility to measure scroll performance
 */
export function measureScrollPerformance(callback: () => void): number {
  const startTime = performance.now();
  callback();
  const endTime = performance.now();
  return endTime - startTime;
}

/**
 * Utility to optimize animations for 60fps
 */
export function optimizeAnimation(
  element: HTMLElement,
  properties: string[] = ['transform', 'opacity']
): void {
  // Force hardware acceleration
  element.style.transform = 'translateZ(0)';
  element.style.backfaceVisibility = 'hidden';
  element.style.perspective = '1000px';

  // Set will-change for animated properties
  element.style.willChange = properties.join(', ');
}

/**
 * Utility to batch DOM updates for better performance
 */
export function batchDOMUpdates(updates: (() => void)[]): void {
  requestAnimationFrame(() => {
    updates.forEach(update => update());
  });
}

export default performanceMonitor;
