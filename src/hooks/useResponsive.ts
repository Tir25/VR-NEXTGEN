/**
 * useResponsive Hook
 * A hook for responsive design and device detection with performance optimizations
 */

import { useState, useEffect, useMemo } from 'react';
import { useViewport } from './useViewport';

// Breakpoint definitions (can be customized based on your design system)
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type Breakpoint = keyof typeof breakpoints;
type Orientation = 'portrait' | 'landscape';
type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface ResponsiveOptions {
  // Debounce window resize events (ms)
  debounceDelay?: number;
  // Whether to detect touch capability
  detectTouch?: boolean;
  // Custom breakpoints
  customBreakpoints?: Record<string, number>;
}

interface ResponsiveResult {
  // Current breakpoint
  breakpoint: Breakpoint;
  // Whether the screen is at least the given breakpoint
  isAbove: (breakpoint: Breakpoint) => boolean;
  // Whether the screen is below the given breakpoint
  isBelow: (breakpoint: Breakpoint) => boolean;
  // Whether the screen is between the given breakpoints
  isBetween: (min: Breakpoint, max: Breakpoint) => boolean;
  // Whether the screen is exactly at the given breakpoint
  is: (breakpoint: Breakpoint) => boolean;
  // Current orientation
  orientation: Orientation;
  // Whether the device has touch capability
  isTouch: boolean;
  // Device type (mobile, tablet, desktop)
  deviceType: DeviceType;
  // Whether the device is a mobile device
  isMobile: boolean;
  // Whether the device is a tablet
  isTablet: boolean;
  // Whether the device is a desktop
  isDesktop: boolean;
}

export default function useResponsive(options: ResponsiveOptions = {}): ResponsiveResult {
  const { width, height } = useViewport();
  const [isTouch, setIsTouch] = useState(false);
  
  // Use custom breakpoints if provided, otherwise use default
  const activeBreakpoints = options.customBreakpoints || breakpoints;

  // Determine current breakpoint based on width
  const breakpoint = useMemo(() => {
    const breakpointEntries = Object.entries(activeBreakpoints)
      .sort((a, b) => b[1] - a[1]); // Sort from largest to smallest
    
    const current = breakpointEntries.find(([_, minWidth]) => width >= minWidth);
    return (current ? current[0] : 'xs') as Breakpoint;
  }, [width, activeBreakpoints]);

  // Determine orientation
  const orientation: Orientation = width > height ? 'landscape' : 'portrait';

  // Determine device type
  const deviceType: DeviceType = useMemo(() => {
    if (width < activeBreakpoints.md) return 'mobile';
    if (width < activeBreakpoints.lg) return 'tablet';
    return 'desktop';
  }, [width, activeBreakpoints]);

  // Check for touch capability
  useEffect(() => {
    if (!options.detectTouch) return;
    
    const checkTouch = () => {
      setIsTouch(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
      );
    };
    
    checkTouch();
  }, [options.detectTouch]);

  // Helper functions for breakpoint comparisons
  const isAbove = (bp: Breakpoint) => width >= activeBreakpoints[bp];
  const isBelow = (bp: Breakpoint) => width < activeBreakpoints[bp];
  const isBetween = (min: Breakpoint, max: Breakpoint) => 
    width >= activeBreakpoints[min] && width < activeBreakpoints[max];
  const is = (bp: Breakpoint) => {
    const breakpointEntries = Object.entries(activeBreakpoints)
      .sort((a, b) => a[1] - b[1]); // Sort from smallest to largest
    
    const currentIndex = breakpointEntries.findIndex(([key]) => key === bp);
    if (currentIndex === -1) return false;
    
    const minWidth = breakpointEntries[currentIndex][1];
    const maxWidth = currentIndex < breakpointEntries.length - 1 
      ? breakpointEntries[currentIndex + 1][1] 
      : Infinity;
    
    return width >= minWidth && width < maxWidth;
  };

  return {
    breakpoint,
    isAbove,
    isBelow,
    isBetween,
    is,
    orientation,
    isTouch: options.detectTouch ? isTouch : 'ontouchstart' in window,
    deviceType,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
  };
}
