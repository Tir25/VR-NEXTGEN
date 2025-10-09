/**
 * Performance Testing Utilities
 * Tools for measuring and monitoring performance in development
 */

import { logger } from './logger';

// FPS monitoring
export function monitorFPS(intervalTime = 5000, callback?: (fps: number) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  
  let frameCount = 0;
  let startTime = performance.now();
  let animationFrameId: number;
  
  // Count frames
  const countFrame = () => {
    frameCount++;
    animationFrameId = requestAnimationFrame(countFrame);
  };
  
  // Start counting
  animationFrameId = requestAnimationFrame(countFrame);
  
  // Report FPS periodically
  const intervalId = setInterval(() => {
    const now = performance.now();
    const elapsed = now - startTime;
    const fps = Math.round((frameCount * 1000) / elapsed);
    
    if (process.env.NODE_ENV === 'development') {
      logger.log(`Current FPS: ${fps}`);
    }
    
    if (callback) callback(fps);
    
    // Reset counters
    frameCount = 0;
    startTime = now;
  }, 1000);
  
  // Return cleanup function
  return () => {
    cancelAnimationFrame(animationFrameId);
    clearInterval(intervalId);
  };
}

// Memory usage monitoring
export function monitorMemory(interval = 5000, callback?: (usage: MemoryInfo) => void): () => void {
  if (typeof window === 'undefined' || !(performance as any).memory) {
    return () => {};
  }
  
  const intervalId = setInterval(() => {
    const memoryInfo = (performance as any).memory;
    
    if (process.env.NODE_ENV === 'development') {
      logger.log('Memory Usage:', {
        usedJSHeapSize: formatBytes(memoryInfo.usedJSHeapSize),
        totalJSHeapSize: formatBytes(memoryInfo.totalJSHeapSize),
        jsHeapSizeLimit: formatBytes(memoryInfo.jsHeapSizeLimit),
        percentUsed: Math.round((memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100) + '%'
      });
    }
    
    if (callback) callback(memoryInfo);
  }, interval);
  
  return () => clearInterval(intervalId);
}

// Format bytes to human-readable format
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Measure execution time of a function
export function measureExecutionTime<T extends (...args: any[]) => any>(
  fn: T,
  name = fn.name || 'Anonymous Function'
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      logger.log(`${name} execution time: ${(end - start).toFixed(2)}ms`);
    }
    
    return result;
  };
}

// Types
interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}
