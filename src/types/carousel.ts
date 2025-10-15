/**
 * Carousel Type Definitions
 * Comprehensive type definitions for all carousel-related components
 * to ensure type safety across the carousel system.
 */

import { ReactNode } from 'react';

// Base carousel item interface
export interface CarouselItem {
  id: string;
  content: ReactNode;
  title?: string;
  description?: string;
}

// Carousel configuration interface
export interface CarouselConfig {
  // Auto-rotation settings
  autoRotate?: boolean;
  autoRotateInterval?: number;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  
  // Interaction settings
  enableKeyboard?: boolean;
  enableTouch?: boolean;
  enableMouse?: boolean;
  swipeThreshold?: number;
  
  // Animation settings
  animationDuration?: number;
  easing?: string;
  enableSmoothScrolling?: boolean;
  
  // Display settings
  itemsPerView?: number | 'auto';
  spacing?: number;
  centerMode?: boolean;
  
  // Accessibility settings
  announceChanges?: boolean;
  ariaLabel?: string;
  ariaLive?: 'off' | 'polite' | 'assertive';
}

// Main carousel props interface
export interface UnifiedCarouselProps {
  items: CarouselItem[];
  config?: CarouselConfig;
  className?: string;
  onItemSelect?: (item: CarouselItem, index: number) => void;
  onIndexChange?: (index: number) => void;
}

// Carousel state interface
export interface CarouselState {
  currentIndex: number;
  isTransitioning: boolean;
  isPaused: boolean;
  touchStart: { x: number; y: number } | null;
}

// Carousel hook return type
export interface UseCarouselReturn {
  currentIndex: number;
  isTransitioning: boolean;
  goToIndex: (index: number, animate?: boolean) => void;
  next: () => void;
  prev: () => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseUp: (e: React.MouseEvent) => void;
}

// Industry-specific types
export interface Industry {
  id: string;
  title: string;
  description: string;
  preview: string;
  icon: string;
}

export interface IndustryCardProps {
  industry: Industry;
  isActive: boolean;
  index: number;
  onCardSelect?: (industry: Industry, index: number) => void;
}

// Mobile-specific types
export interface MobileOptimizedCarouselProps {
  items: CarouselItem[];
  className?: string;
  onItemSelect?: (item: CarouselItem, index: number) => void;
  onIndexChange?: (index: number) => void;
}

// Carousel event types
export interface CarouselEvent {
  type: 'select' | 'change' | 'start' | 'end';
  index: number;
  item: CarouselItem;
  timestamp: number;
}

// Carousel analytics types
export interface CarouselAnalytics {
  totalInteractions: number;
  averageTimePerItem: number;
  mostViewedItem: number;
  completionRate: number;
}

// Carousel performance types
export interface CarouselPerformance {
  fps: number;
  averageFrameTime: number;
  memoryUsage: number;
  isLowEndDevice: boolean;
}

// Carousel accessibility types
export interface CarouselAccessibility {
  screenReaderAnnouncements: boolean;
  keyboardNavigation: boolean;
  highContrastMode: boolean;
  reducedMotion: boolean;
}

// Carousel configuration validation
export interface CarouselConfigValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Carousel hook configuration
export interface UseCarouselConfig {
  items: CarouselItem[];
  config: Required<CarouselConfig>;
  onIndexChange?: (index: number) => void;
}

// Carousel ref types
export interface CarouselRef {
  goToIndex: (index: number, animate?: boolean) => void;
  next: () => void;
  prev: () => void;
  getCurrentIndex: () => number;
  getTotalItems: () => number;
}

// Carousel context types
export interface CarouselContextValue {
  currentIndex: number;
  totalItems: number;
  config: Required<CarouselConfig>;
  goToIndex: (index: number, animate?: boolean) => void;
  next: () => void;
  prev: () => void;
}

// Carousel provider props
export interface CarouselProviderProps {
  children: ReactNode;
  items: CarouselItem[];
  config?: CarouselConfig;
  onIndexChange?: (index: number) => void;
}

// Utility types
export type CarouselDirection = 'next' | 'prev' | 'none';
export type CarouselTransition = 'slide' | 'fade' | 'scale' | 'none';
export type CarouselBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Carousel responsive configuration
export interface ResponsiveCarouselConfig {
  breakpoints: {
    [K in CarouselBreakpoint]?: Partial<CarouselConfig>;
  };
}

// Carousel animation configuration
export interface CarouselAnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  direction?: CarouselDirection;
}

// Carousel touch configuration
export interface CarouselTouchConfig {
  threshold: number;
  velocity: number;
  direction: 'horizontal' | 'vertical' | 'both';
}

// Carousel keyboard configuration
export interface CarouselKeyboardConfig {
  nextKey: string;
  prevKey: string;
  homeKey: string;
  endKey: string;
  enabled: boolean;
}

// Carousel auto-rotation configuration
export interface CarouselAutoRotationConfig {
  enabled: boolean;
  interval: number;
  pauseOnHover: boolean;
  pauseOnFocus: boolean;
  pauseOnTouch: boolean;
}

// Carousel performance configuration
export interface CarouselPerformanceConfig {
  enableRaf: boolean;
  enableThrottling: boolean;
  enableDebouncing: boolean;
  maxFPS: number;
  memoryThreshold: number;
}

// Carousel accessibility configuration
export interface CarouselAccessibilityConfig {
  announceChanges: boolean;
  liveRegion: 'off' | 'polite' | 'assertive';
  keyboardNavigation: boolean;
  screenReaderSupport: boolean;
  highContrastSupport: boolean;
  reducedMotionSupport: boolean;
}

// Carousel error types
export interface CarouselError {
  code: string;
  message: string;
  details?: any;
  timestamp: number;
}

// Carousel error handler
export type CarouselErrorHandler = (error: CarouselError) => void;

// Carousel event handler
export type CarouselEventHandler<T = any> = (event: T) => void;

// Carousel validation function
export type CarouselValidator<T = any> = (value: T) => boolean;

// Carousel transformer function
export type CarouselTransformer<T = any, R = any> = (value: T) => R;
