/**
 * Enhanced type definitions
 * Provides comprehensive type safety for the application
 */

import { ReactNode } from 'react';
import { ApiResponse, BaseComponentProps, NavigationItem, Optional } from './common';
import { PerformanceConfig, PerformanceMetrics } from './components';
import { ValidationError } from './validation';

// Utility types
export type Nullable<T> = T | null;
export type NonNullable<T> = T extends null | undefined ? never : T;

// Component types
export interface StyledComponentProps extends BaseComponentProps {
  variant?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

// Event types
export interface BaseEvent {
  type: string;
  timestamp: Date;
  source: string;
}

export interface ComponentEvent extends BaseEvent {
  component: string;
  action: string;
  data?: Record<string, any>;
}

// API types
export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Animation types
export interface AnimationConfig {
  duration?: number;
  easing?: string;
  delay?: number;
  iterations?: number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
}

export interface ScrollAnimationConfig extends AnimationConfig {
  trigger?: 'scroll' | 'hover' | 'click';
  threshold?: number;
  rootMargin?: string;
}

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  warning: string;
  success: string;
  info: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface ThemeBreakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  breakpoints: ThemeBreakpoints;
  typography: {
    fontFamily: string;
    fontSize: Record<string, string>;
    fontWeight: Record<string, number>;
    lineHeight: Record<string, number>;
  };
  shadows: Record<string, string>;
  borderRadius: Record<string, string>;
}

// Performance types


// Error types
export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  sessionId?: string;
  timestamp: Date;
  userAgent?: string;
  url?: string;
}


// Form types
export interface FormField<T = any> {
  name: string;
  value: T;
  error?: string;
  touched: boolean;
  required: boolean;
}

export interface FormState<T = Record<string, any>> {
  fields: Record<keyof T, FormField>;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
}

// Navigation types
export interface NavigationState {
  items: NavigationItem[];
  activeItem?: string;
  isOpen: boolean;
}

// Modal types
export interface ModalConfig {
  id: string;
  title?: string;
  content: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closable?: boolean;
  backdrop?: boolean;
  keyboard?: boolean;
}

export interface ModalState {
  modals: ModalConfig[];
  activeModal?: string;
}

// Toast types
export interface ToastConfig {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  closable?: boolean;
}

export interface ToastState {
  toasts: ToastConfig[];
}

// Storage types
export interface StorageConfig {
  key: string;
  version: string;
  ttl?: number;
  encrypt?: boolean;
}

export interface StorageItem<T = any> {
  value: T;
  timestamp: number;
  ttl?: number;
}

// Feature flag types
export interface FeatureFlag {
  id: string;
  name: string;
  enabled: boolean;
  description?: string;
  conditions?: Record<string, any>;
}

export interface FeatureFlagState {
  flags: Record<string, FeatureFlag>;
  loaded: boolean;
}

// Analytics types
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: Date;
  userId?: string;
  sessionId?: string;
}

export interface AnalyticsConfig {
  enabled: boolean;
  trackingId?: string;
  sampleRate: number;
  debug: boolean;
}
