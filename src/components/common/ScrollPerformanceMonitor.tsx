/**
 * Scroll Performance Monitor Component
 * Real-time scroll performance monitoring and optimization
 */

import React, { useEffect, useState, useRef } from 'react';
import performanceDetector from '@/utils/performanceDetection';

interface ScrollPerformanceMonitorProps {
  enabled?: boolean;
  showMetrics?: boolean;
  autoOptimize?: boolean;
}

export default function ScrollPerformanceMonitor({
  enabled = true,
  showMetrics = process.env.NODE_ENV === 'development',
  autoOptimize = true,
}: ScrollPerformanceMonitorProps) {
  const [metrics, setMetrics] = useState({ fps: 60, frameTime: 16.67, scrollLatency: 0, isSmooth: true, droppedFrames: 0, averageFrameTime: 16.67 });
  const [isOptimal, setIsOptimal] = useState(true);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

        // Dynamically import scrollPerformanceMonitor only in browser
        import('@/utils/scrollPerformanceMonitor').then(({ default: scrollPerformanceMonitor }) => {
          if (!scrollPerformanceMonitor) return;
          
          // Update device-specific thresholds
          const capabilities = performanceDetector.getCapabilities();
          scrollPerformanceMonitor.updateThresholds(capabilities);

      // Start monitoring
      const updateMetrics = () => {
        const currentMetrics = scrollPerformanceMonitor.getMetrics();
        const currentIsOptimal = scrollPerformanceMonitor.isPerformanceOptimal();
        const currentRecommendations = scrollPerformanceMonitor.getRecommendations();

        setMetrics(currentMetrics);
        setIsOptimal(currentIsOptimal);
        setRecommendations(currentRecommendations);

        // Auto-optimize if performance is poor
        if (autoOptimize && !currentIsOptimal && currentRecommendations.length > 0) {
          applyPerformanceOptimizations(currentRecommendations);
        }

        // Log metrics in development
        if (process.env.NODE_ENV === 'development' && !currentIsOptimal) {
          scrollPerformanceMonitor.logMetrics();
        }
      };

      // Update metrics every 2 seconds
      intervalRef.current = setInterval(updateMetrics, 2000);

      // Initial update
      updateMetrics();
    }).catch((error) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to load scroll performance monitor:', error);
      }
    });

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, autoOptimize]);

  /**
   * Apply performance optimizations based on recommendations
   */
  const applyPerformanceOptimizations = (recs: string[]): void => {
    const capabilities = performanceDetector.getCapabilities();
    
    recs.forEach(rec => {
      if (rec.includes('GPU acceleration')) {
        // Enable GPU acceleration for animations
        document.documentElement.style.setProperty('--gpu-acceleration', 'transform3d(0,0,0)');
      }
      
      if (rec.includes('passive event listeners')) {
        // Already handled by UnifiedScrollManager
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Passive event listeners already enabled');
        }
      }
      
      if (rec.includes('debounce scroll handlers')) {
        // Already handled by UnifiedScrollManager
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Scroll handlers already debounced');
        }
      }
      
      if (rec.includes('reduce visual effects') && capabilities?.isLowEnd) {
        // Reduce animation complexity for low-end devices
        document.documentElement.classList.add('reduced-motion');
      }
    });
  };

  // Only render in development or when explicitly enabled
  if (!showMetrics || process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg z-50 text-xs transition-all duration-300 ${
          isOptimal 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
        }`}
        title={`Scroll Performance: ${isOptimal ? 'Optimal' : 'Needs Attention'}`}
      >
        {isOptimal ? '✅' : '⚠️'}
      </button>

      {/* Performance panel */}
      {isVisible && (
        <div className="fixed bottom-20 right-4 bg-black/95 text-white p-4 rounded-lg shadow-xl z-50 text-xs max-w-sm border border-gray-600">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-yellow-400">Scroll Performance</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>FPS:</span>
              <span className={`font-mono ${metrics.fps >= 55 ? 'text-green-400' : 'text-red-400'}`}>
                {metrics.fps}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Frame Time:</span>
              <span className={`font-mono ${metrics.frameTime <= 20 ? 'text-green-400' : 'text-red-400'}`}>
                {metrics.frameTime}ms
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Scroll Latency:</span>
              <span className={`font-mono ${metrics.scrollLatency <= 16 ? 'text-green-400' : 'text-red-400'}`}>
                {metrics.scrollLatency}ms
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Dropped Frames:</span>
              <span className={`font-mono ${metrics.droppedFrames <= 3 ? 'text-green-400' : 'text-red-400'}`}>
                {metrics.droppedFrames}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Smooth:</span>
              <span className={metrics.isSmooth ? 'text-green-400' : 'text-red-400'}>
                {metrics.isSmooth ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          {recommendations.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-600">
              <h4 className="font-semibold text-yellow-400 mb-2">Recommendations</h4>
              <div className="space-y-1">
                {recommendations.map((rec, index) => (
                  <div key={index} className="text-gray-300 text-xs">
                    • {rec}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                import('@/utils/scrollPerformanceMonitor').then(({ default: scrollPerformanceMonitor }) => {
                  if (scrollPerformanceMonitor) {
                    scrollPerformanceMonitor.logMetrics();
                  }
                });
              }
            }}
            className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs"
          >
            Log Metrics
          </button>
        </div>
      )}
    </>
  );
}
