/**
 * Scroll Performance Testing Utility
 * 
 * This module provides utilities to test and verify scroll performance,
 * ensuring 60fps smoothness and proper throttling.
 */

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  frameDrops: number;
  totalFrames: number;
  averageFrameTime: number;
  scrollVelocity: number;
  isOptimal: boolean;
}

interface TestConfig {
  duration: number; // Test duration in milliseconds
  targetFPS: number; // Target FPS (default: 60)
  maxFrameTime: number; // Maximum acceptable frame time in ms
  scrollDistance: number; // How far to scroll during test
}

const DEFAULT_TEST_CONFIG: TestConfig = {
  duration: 5000, // 5 seconds
  targetFPS: 60,
  maxFrameTime: 16.67, // 60fps = ~16.67ms per frame
  scrollDistance: 2000
};

export class ScrollPerformanceTester {
  private config: TestConfig;
  private metrics: PerformanceMetrics;
  private isRunning = false;
  private startTime = 0;
  private lastTime = 0;
  private frameCount = 0;
  private frameDrops = 0;
  private lastScrollY = 0;

  constructor(config: Partial<TestConfig> = {}) {
    this.config = { ...DEFAULT_TEST_CONFIG, ...config };
    this.metrics = {
      fps: 0,
      frameTime: 0,
      frameDrops: 0,
      totalFrames: 0,
      averageFrameTime: 0,
      scrollVelocity: 0,
      isOptimal: false
    };
  }

  /**
   * Start the performance test
   */
  async startTest(): Promise<PerformanceMetrics> {
    if (this.isRunning) {
      throw new Error('Performance test is already running');
    }

    this.isRunning = true;
    this.startTime = performance.now();
    this.lastTime = this.startTime;
    this.frameCount = 0;
    this.frameDrops = 0;
    this.lastScrollY = window.scrollY;

    // eslint-disable-next-line no-restricted-syntax
    console.log('🚀 Starting scroll performance test...');

    // Start scroll animation
    this.startScrollAnimation();

    // Start frame monitoring
    this.startFrameMonitoring();

    // Wait for test duration
    await this.waitForDuration();

    // Stop test
    this.stopTest();

    return this.metrics;
  }

  /**
   * Start scroll animation for testing
   */
  private startScrollAnimation(): void {
    const startScrollY = window.scrollY;
    const endScrollY = startScrollY + this.config.scrollDistance;
    const duration = this.config.duration;
    const startTime = performance.now();

    const animate = () => {
      if (!this.isRunning) return;

      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth scroll animation
      const easeProgress = this.easeInOutCubic(progress);
      const currentScrollY = startScrollY + (endScrollY - startScrollY) * easeProgress;
      
      window.scrollTo(0, currentScrollY);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  /**
   * Start monitoring frame performance
   */
  private startFrameMonitoring(): void {
    const monitor = () => {
      if (!this.isRunning) return;

      const currentTime = performance.now();
      const frameTime = currentTime - this.lastTime;
      
      this.frameCount++;
      
      // Check for frame drops
      if (frameTime > this.config.maxFrameTime) {
        this.frameDrops++;
      }
      
      // Calculate scroll velocity
      const currentScrollY = window.scrollY;
      this.metrics.scrollVelocity = Math.abs(currentScrollY - this.lastScrollY);
      this.lastScrollY = currentScrollY;
      
      // Update metrics every 60 frames
      if (this.frameCount % 60 === 0) {
        this.updateMetrics(frameTime);
      }
      
      this.lastTime = currentTime;
      requestAnimationFrame(monitor);
    };

    requestAnimationFrame(monitor);
  }

  /**
   * Update performance metrics
   */
  private updateMetrics(frameTime: number): void {
    const elapsed = performance.now() - this.startTime;
    
    this.metrics.fps = Math.round((this.frameCount / elapsed) * 1000);
    this.metrics.frameTime = frameTime;
    this.metrics.totalFrames = this.frameCount;
    this.metrics.averageFrameTime = elapsed / this.frameCount;
    this.metrics.frameDrops = this.frameDrops;
    
    // Determine if performance is optimal
    this.metrics.isOptimal = this.metrics.fps >= this.config.targetFPS - 5 && 
                           this.metrics.frameDrops < this.frameCount * 0.05;

    // Log performance status
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-restricted-syntax
      console.log(`📊 Performance: FPS: ${this.metrics.fps}, Frame Drops: ${this.metrics.frameDrops}, Optimal: ${this.metrics.isOptimal}`);
    }
  }

  /**
   * Wait for test duration
   */
  private waitForDuration(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, this.config.duration);
    });
  }

  /**
   * Stop the performance test
   */
  private stopTest(): void {
    this.isRunning = false;
    
    // Final metrics update
    const elapsed = performance.now() - this.startTime;
    this.metrics.fps = Math.round((this.frameCount / elapsed) * 1000);
    this.metrics.totalFrames = this.frameCount;
    this.metrics.averageFrameTime = elapsed / this.frameCount;
    this.metrics.isOptimal = this.metrics.fps >= this.config.targetFPS - 5 && 
                           this.metrics.frameDrops < this.frameCount * 0.05;

    // eslint-disable-next-line no-restricted-syntax
    console.log('✅ Scroll performance test completed');
    this.logResults();
  }

  /**
   * Log test results
   */
  private logResults(): void {
    // eslint-disable-next-line no-restricted-syntax
    console.log('📈 Scroll Performance Test Results:');
    // eslint-disable-next-line no-restricted-syntax
    console.log(`   FPS: ${this.metrics.fps} (target: ${this.config.targetFPS})`);
    // eslint-disable-next-line no-restricted-syntax
    console.log(`   Frame Time: ${this.metrics.averageFrameTime.toFixed(2)}ms (max: ${this.config.maxFrameTime}ms)`);
    // eslint-disable-next-line no-restricted-syntax
    console.log(`   Frame Drops: ${this.metrics.frameDrops} (${((this.metrics.frameDrops / this.metrics.totalFrames) * 100).toFixed(1)}%)`);
    // eslint-disable-next-line no-restricted-syntax
    console.log(`   Total Frames: ${this.metrics.totalFrames}`);
    // eslint-disable-next-line no-restricted-syntax
    console.log(`   Scroll Velocity: ${this.metrics.scrollVelocity.toFixed(2)}px/frame`);
    // eslint-disable-next-line no-restricted-syntax
    console.log(`   Performance: ${this.metrics.isOptimal ? '✅ OPTIMAL' : '⚠️ NEEDS OPTIMIZATION'}`);
  }

  /**
   * Easing function for smooth animation
   */
  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /**
   * Get current metrics without stopping the test
   */
  getCurrentMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Check if test is currently running
   */
  isTestRunning(): boolean {
    return this.isRunning;
  }
}

/**
 * Quick performance test function
 */
export async function runQuickScrollPerformanceTest(): Promise<PerformanceMetrics> {
  const tester = new ScrollPerformanceTester({
    duration: 3000, // 3 seconds
    scrollDistance: 1000
  });

  return await tester.startTest();
}

/**
 * Comprehensive performance test function
 */
export async function runComprehensiveScrollPerformanceTest(): Promise<PerformanceMetrics> {
  const tester = new ScrollPerformanceTester({
    duration: 10000, // 10 seconds
    scrollDistance: 3000
  });

  return await tester.startTest();
}

/**
 * Test scroll handler performance
 */
export function testScrollHandlerPerformance(
  handler: (scrollY: number) => void,
  duration: number = 2000
): Promise<{ averageExecutionTime: number; maxExecutionTime: number; isOptimal: boolean }> {
  return new Promise((resolve) => {
    const executionTimes: number[] = [];
    let maxExecutionTime = 0;
    let isRunning = true;

    // Mock scroll handler with performance monitoring
    const monitoredHandler = (scrollY: number) => {
      const startTime = performance.now();
      handler(scrollY);
      const executionTime = performance.now() - startTime;
      
      executionTimes.push(executionTime);
      maxExecutionTime = Math.max(maxExecutionTime, executionTime);
    };

    // Start scroll simulation
    const startTime = performance.now();
    let scrollY = 0;
    const scrollStep = 2;

    const animate = () => {
      if (!isRunning) return;

      scrollY += scrollStep;
      monitoredHandler(scrollY);

      if (performance.now() - startTime < duration) {
        requestAnimationFrame(animate);
      } else {
        isRunning = false;
        
        const averageExecutionTime = executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length;
        const isOptimal = averageExecutionTime < 2 && maxExecutionTime < 5; // 2ms avg, 5ms max
        
        resolve({
          averageExecutionTime,
          maxExecutionTime,
          isOptimal
        });
      }
    };

    requestAnimationFrame(animate);
  });
}

export default ScrollPerformanceTester;
