/**
 * usePerformanceMonitor Hook
 * A hook for monitoring component performance in development
 */

import { useEffect, useRef } from 'react';
import { monitorFPS, monitorMemory } from '@/utils/performanceTest';
import { logger } from '@/utils/logger';

interface PerformanceMonitorOptions {
  enabled?: boolean;
  componentName?: string;
  monitorFPS?: boolean;
  monitorMemory?: boolean;
  monitorRenders?: boolean;
  fpsInterval?: number;
  memoryInterval?: number;
  logThreshold?: {
    lowFPS?: number;
    highMemory?: number;
  };
}

export default function usePerformanceMonitor({
  enabled = process.env.NODE_ENV === 'development',
  componentName = 'Component',
  monitorFPS: shouldMonitorFPS = true,
  monitorMemory: shouldMonitorMemory = true,
  monitorRenders = true,
  fpsInterval = 2000,
  memoryInterval = 5000,
  logThreshold = {
    lowFPS: 30,
    highMemory: 0.8, // 80% of heap limit
  },
}: PerformanceMonitorOptions = {}) {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(performance.now());
  
  // Monitor renders
  if (enabled && monitorRenders && typeof window !== 'undefined') {
    const now = performance.now();
    renderCount.current++;
    const timeSinceLastRender = now - lastRenderTime.current;
    
    if (renderCount.current > 1) {
      logger.log(
        `[${componentName}] Render #${renderCount.current}, ` +
        `${timeSinceLastRender.toFixed(2)}ms since last render`
      );
    }
    
    lastRenderTime.current = now;
  }
  
  // Monitor FPS and memory
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;
    
    const cleanupFunctions: (() => void)[] = [];
    
    // Monitor FPS
    if (shouldMonitorFPS) {
      const stopFPSMonitor = monitorFPS(fpsInterval, (fps) => {
        if (fps < (logThreshold.lowFPS || 30)) {
          logger.warn(`[${componentName}] Low FPS detected: ${fps}`);
        }
      });
      
      cleanupFunctions.push(stopFPSMonitor);
    }
    
    // Monitor memory
    if (shouldMonitorMemory && (performance as any).memory) {
      const stopMemoryMonitor = monitorMemory(memoryInterval, (memoryInfo) => {
        const percentUsed = memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit;
        
        if (percentUsed > (logThreshold.highMemory || 0.8)) {
          logger.warn(
            `[${componentName}] High memory usage: ${Math.round(percentUsed * 100)}% of heap limit`
          );
        }
      });
      
      cleanupFunctions.push(stopMemoryMonitor);
    }
    
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [
    enabled, 
    componentName, 
    shouldMonitorFPS, 
    shouldMonitorMemory, 
    fpsInterval, 
    memoryInterval, 
    logThreshold.lowFPS, 
    logThreshold.highMemory
  ]);
}
