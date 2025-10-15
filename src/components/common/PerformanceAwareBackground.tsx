/**
 * Performance-Aware Background Component
 * Dynamically adjusts background effects based on device capabilities
 */

import React, { useEffect, useState } from 'react';
// import performanceDetector from '@/utils/performanceDetection';
import { useConditionalAnimation } from '@/hooks/usePerformanceAnimation';

interface PerformanceAwareBackgroundProps {
  children: React.ReactNode;
  className?: string;
  enableHeavyEffects?: boolean;
}

export default function PerformanceAwareBackground({
  children,
  className = '',
  enableHeavyEffects = true,
}: PerformanceAwareBackgroundProps) {
  const [isClient, setIsClient] = useState(false);
  const { shouldBackgroundEffects, isLowEnd, animationDuration } = useConditionalAnimation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render heavy effects on server or low-end devices
  const shouldRenderEffects = isClient && 
    enableHeavyEffects && 
    shouldBackgroundEffects && 
    !isLowEnd;

  if (!shouldRenderEffects) {
    return (
      <div className={`performance-optimized-bg ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`performance-optimized-bg enhanced ${className}`}>
      {/* Lightweight background effects for low-end devices */}
      <div 
        className="bg-effects-container"
        style={{
          '--animation-duration': `${animationDuration}s`,
        } as React.CSSProperties}
      >
        {/* Simplified gradient background */}
        <div className="gradient-bg" />
        
        {/* Conditional heavy effects */}
        {!isLowEnd && (
          <>
            <div className="particle-effects" />
            <div className="grid-overlay" />
          </>
        )}
      </div>
      
      {children}
    </div>
  );
}

/**
 * Hook to conditionally render background effects
 */
export function useBackgroundEffects() {
  const { shouldBackgroundEffects, isLowEnd, animationDuration } = useConditionalAnimation();
  
  return {
    shouldRenderEffects: shouldBackgroundEffects && !isLowEnd,
    animationDuration,
    isLowEnd,
  };
}
