/**
 * Common Type Definitions
 * Standardized interfaces and types for the VR NextGEN codebase
 */

import { ReactNode } from 'react';

// Base component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

// Animation props
export interface AnimationProps {
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'scaleIn' | 'slideLeft' | 'slideRight';
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  threshold?: number;
}

// Responsive props
export interface ResponsiveProps {
  responsive?: boolean;
  breakpoints?: {
    xs?: string | number;
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
  };
}

// Color variants
export type ColorVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info';
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ThemeVariant = 'light' | 'dark' | 'auto';

// Button props
export interface ButtonProps extends BaseComponentProps {
  variant?: ColorVariant;
  size?: SizeVariant;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

// Card props
export interface CardProps extends BaseComponentProps, AnimationProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: SizeVariant;
  shadow?: boolean;
  hover?: boolean;
}

// Section props
export interface SectionProps extends BaseComponentProps {
  minHeight?: string;
  maxWidth?: string;
  padding?: SizeVariant;
  background?: 'transparent' | 'primary' | 'secondary' | 'accent';
}

// Form props
export interface FormFieldProps extends BaseComponentProps {
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
}

// Navigation props
export interface NavigationProps extends BaseComponentProps {
  currentPath?: string;
  items?: NavigationItem[];
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: ReactNode;
  badge?: string;
  children?: NavigationItem[];
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination types
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

// Modal/Dialog types
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: SizeVariant;
  closable?: boolean;
  backdrop?: boolean;
}

// Tooltip types
export interface TooltipProps extends BaseComponentProps {
  content: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error?: string;
  data?: any;
}

// Error boundary props
export interface ErrorBoundaryProps extends BaseComponentProps {
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
  resetKeys?: any[];
}

// Accessibility props
export interface AccessibilityProps {
  role?: string;
  tabIndex?: number;
  'aria-expanded'?: boolean;
  'aria-selected'?: boolean;
  'aria-checked'?: boolean;
  'aria-disabled'?: boolean;
  'aria-hidden'?: boolean;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'aria-atomic'?: boolean;
  'aria-relevant'?: string;
}

// Performance props
export interface PerformanceProps {
  lazy?: boolean;
  preload?: boolean;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
}

// Event handler types
export interface EventHandlers {
  onClick?: (event: React.MouseEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onKeyUp?: (event: React.KeyboardEvent) => void;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
