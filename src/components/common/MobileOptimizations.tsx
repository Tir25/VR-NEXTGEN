/**
 * Mobile Optimization Component
 * Provides mobile-specific optimizations and touch enhancements
 */

import React, { useEffect, useState } from 'react';
import performanceDetector from '@/utils/performanceDetection';

interface MobileOptimizationsProps {
  children: React.ReactNode;
}

export default function MobileOptimizations({ children }: MobileOptimizationsProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const capabilities = performanceDetector.getCapabilities();
    setIsMobile(capabilities?.isMobile || false);
    setIsLowEnd(capabilities?.isLowEnd || false);

    // Touch event handlers
    const handleTouchStart = (e: TouchEvent) => {
      // Optimize touch start events
      e.preventDefault = () => {}; // Prevent default only when necessary
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Optimize touch move events for smooth scrolling
      if (e.touches.length > 1) {
        e.preventDefault(); // Prevent zoom on multi-touch
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Optimize touch end events
      e.preventDefault = () => {};
    };

    // Scroll event handlers
    const handleScroll = (e: Event) => {
      // Optimize scroll events - let the unified scroll manager handle this
      // Add performance monitoring for scroll events
      if (process.env.NODE_ENV === 'development') {
        const scrollElement = e.target as HTMLElement;
        if (scrollElement && scrollElement.hasAttribute('data-scroll-optimized')) {
          // Element is already optimized
        }
      }
    };

    const handleWheel = (_e: WheelEvent) => {
      // Optimize wheel events for smooth scrolling
      // Don't prevent default to maintain natural scrolling behavior
      // The passive listener ensures this doesn't block scrolling
    };

    // Add mobile-specific optimizations
    if (capabilities?.isMobile) {
      // Prevent zoom on input focus (iOS)
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute(
          'content',
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
        );
      }

      // Optimize touch events with passive listeners
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      // Optimize scroll events for mobile
      document.addEventListener('scroll', handleScroll, { passive: true });
      document.addEventListener('wheel', handleWheel, { passive: true });

      // Add mobile-specific CSS classes
      document.documentElement.classList.add('mobile-device');
      
      if (isLowEnd) {
        document.documentElement.classList.add('low-end-mobile');
      }
    }

    return () => {
      if (capabilities?.isMobile) {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        document.removeEventListener('scroll', handleScroll);
        document.removeEventListener('wheel', handleWheel);
        document.documentElement.classList.remove('mobile-device', 'low-end-mobile');
      }
    };
  }, [isLowEnd]);

  // Touch handlers are commented out as they're not currently used
  // but kept for future mobile optimization features

  return (
    <div 
      className={`mobile-optimized ${isMobile ? 'mobile-device' : ''} ${isLowEnd ? 'low-end-device' : ''}`}
      data-touch-optimized
    >
      {children}
    </div>
  );
}

/**
 * Hook for mobile-specific optimizations
 */
export function useMobileOptimizations() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const capabilities = performanceDetector.getCapabilities();
    setIsMobile(capabilities?.isMobile || false);
    setIsLowEnd(capabilities?.isLowEnd || false);
  }, []);

  return {
    isMobile,
    isLowEnd,
    shouldOptimizeForMobile: isMobile || isLowEnd,
    touchOptimizations: isMobile,
  };
}

/**
 * Mobile-optimized touch component
 */
interface MobileTouchComponentProps {
  children: React.ReactNode;
  onTouch?: () => void;
  className?: string;
}

export function MobileTouchComponent({ 
  children, 
  onTouch, 
  className = '' 
}: MobileTouchComponentProps) {
  const { isMobile } = useMobileOptimizations();

  const handleTouch = () => {
    if (isMobile && onTouch) {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        onTouch();
      });
    }
  };

  return (
    <div
      className={`mobile-touch-component ${className}`}
      data-touch-optimized
      onTouchEnd={handleTouch}
      onClick={!isMobile ? onTouch : undefined}
    >
      {children}
    </div>
  );
}
