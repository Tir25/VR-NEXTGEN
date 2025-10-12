/**
 * Performance Monitor Component
 * Monitors and reports performance metrics (development only)
 */

import React, { useEffect, useState } from 'react';
import performanceDetector from '@/utils/performanceDetection';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  memoryUsage?: number;
  deviceCapabilities?: any;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return;

    const collectMetrics = () => {
      const newMetrics: PerformanceMetrics = {};

      // Collect Web Vitals
      if (typeof window !== 'undefined' && 'performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (perfData) {
          newMetrics.ttfb = perfData.responseStart - perfData.requestStart;
        }

        // Collect paint metrics
        const paintEntries = performance.getEntriesByType('paint');
        paintEntries.forEach(entry => {
          if (entry.name === 'first-contentful-paint') {
            newMetrics.fcp = entry.startTime;
          }
        });
      }

      // Memory usage (Chrome only)
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        newMetrics.memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB
      }

      // Device capabilities
      newMetrics.deviceCapabilities = performanceDetector.getCapabilities();

      setMetrics(newMetrics);
    };

    // Collect metrics after page load
    const timer = setTimeout(collectMetrics, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Only render in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg z-50 text-xs"
        title="Performance Monitor"
      >
        📊
      </button>

      {/* Performance panel */}
      {isVisible && (
        <div className="fixed bottom-16 right-4 bg-black/90 text-white p-4 rounded-lg shadow-xl z-50 text-xs max-w-sm">
          <h3 className="font-bold mb-2 text-yellow-400">Performance Metrics</h3>
          
          <div className="space-y-1">
            {metrics.fcp && (
              <div>FCP: <span className="text-green-400">{metrics.fcp.toFixed(0)}ms</span></div>
            )}
            {metrics.ttfb && (
              <div>TTFB: <span className="text-blue-400">{metrics.ttfb.toFixed(0)}ms</span></div>
            )}
            {metrics.memoryUsage && (
              <div>Memory: <span className="text-purple-400">{metrics.memoryUsage.toFixed(1)}MB</span></div>
            )}
          </div>

          {metrics.deviceCapabilities && (
            <div className="mt-2 pt-2 border-t border-gray-600">
              <h4 className="font-semibold text-yellow-400">Device</h4>
              <div className="space-y-1">
                <div>Low-end: <span className={metrics.deviceCapabilities.isLowEnd ? 'text-red-400' : 'text-green-400'}>
                  {metrics.deviceCapabilities.isLowEnd ? 'Yes' : 'No'}
                </span></div>
                <div>WebP: <span className={metrics.deviceCapabilities.supportsWebP ? 'text-green-400' : 'text-red-400'}>
                  {metrics.deviceCapabilities.supportsWebP ? 'Yes' : 'No'}
                </span></div>
                <div>AVIF: <span className={metrics.deviceCapabilities.supportsAVIF ? 'text-green-400' : 'text-red-400'}>
                  {metrics.deviceCapabilities.supportsAVIF ? 'Yes' : 'No'}
                </span></div>
                <div>Memory: <span className="text-blue-400">{metrics.deviceCapabilities.memoryGB}GB</span></div>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsVisible(false)}
            className="mt-2 text-gray-400 hover:text-white text-xs"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}
