/**
 * Component-Specific Type Definitions
 * Standardized interfaces for specific components
 */

import React, { ReactNode } from 'react';
import { ValidationRule } from './validation';
import { BaseComponentProps, AnimationProps, ResponsiveProps } from './common';

// JSX element types
type JSXElement = keyof React.JSX.IntrinsicElements;

// Industry Card Types
export interface IndustryCardProps extends BaseComponentProps {
  industry: Industry;
  isActive: boolean;
  index?: number;
  onCardClick?: (e: React.MouseEvent) => void;
  onLearnMore?: (e: React.MouseEvent) => void;
}

export interface Industry {
  id: string;
  title: string;
  category?: string;
  description?: string;
  preview?: string;
  icon?: string;
  location?: string;
  timestamp?: string;
  bgUrl?: string;
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  results?: string[];
}

// Service Card Types
export interface ServiceCardProps extends BaseComponentProps {
  service: Service;
  index: number;
  isVisible: boolean;
  onLearnMore?: () => void;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  features: string[];
  benefits?: string[];
  useCases?: string[];
  bgUrl?: string;
  category?: string;
  pricing?: 'basic' | 'premium' | 'enterprise';
}

// Hero Component Types
export interface HeroProps extends BaseComponentProps, AnimationProps {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  overlay?: boolean;
  parallaxSpeed?: number;
  minHeight?: string;
}

// Carousel Types
export interface CarouselProps extends BaseComponentProps, ResponsiveProps {
  items: any[];
  itemsPerView?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  loop?: boolean;
  spaceBetween?: number;
  onItemClick?: (item: any, index: number) => void;
}

export interface CarouselControlsProps extends BaseComponentProps {
  onPrevious: () => void;
  onNext: () => void;
  onGoToSlide: (index: number) => void;
  currentIndex: number;
  totalItems: number;
  disabled?: boolean;
}

// Form Types
export interface ContactFormProps extends BaseComponentProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  isLoading?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  csrfToken?: string;
}

// Navigation Types
export interface HeaderProps extends BaseComponentProps {
  currentPath?: string;
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}


// Section Types
export interface SectionHeaderProps extends BaseComponentProps {
  badge?: {
    text: string;
    color?: string;
  };
  title: string;
  description?: string;
  titleColor?: string;
  descriptionColor?: string;
  compact?: boolean;
  centered?: boolean;
}

// Animation Wrapper Types
// AnimationWrapper types removed as component was unused

// SafeWrapper types removed as component was unused

// Background Types
export interface BackgroundEffectsProps extends BaseComponentProps {
  currentSection: string;
  intensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
}

// Scroll Types
export interface ScrollContextType {
  scrollState: {
    scrollY: number;
    scrollX: number;
    scrollDirection: 'up' | 'down' | null;
    isScrolling: boolean;
    scrollVelocity: number;
  };
  registerHandler: (handler: (scrollY: number, scrollDirection: 'up' | 'down' | null) => void) => () => void;
  unregisterHandler: (handler: (scrollY: number, scrollDirection: 'up' | 'down' | null) => void) => void;
}

// Performance Types
export interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsage?: number;
  renderTime?: number;
}

export interface PerformanceConfig {
  enableMetrics?: boolean;
  sampleRate?: number;
  thresholds?: {
    fps: number;
    frameTime: number;
    memoryUsage?: number;
  };
}

// Theme Types
export interface ThemeContextType {
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  systemTheme: 'light' | 'dark';
}

// Error Types
export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  context?: any;
  timestamp: number;
  userId?: string;
  sessionId?: string;
}

// API Types
export interface ApiError {
  code: string;
  message: string;
  statusCode: number;
  details?: any;
  timestamp: number;
}

// Validation Types

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

// Hook Types
export interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
}

export interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export interface UseInfiniteScrollReturn<T> {
  items: T[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => void;
  reset: () => void;
}
