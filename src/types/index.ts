/**
 * TypeScript Type Definitions
 * 
 * Centralized type definitions for VR NextGEN Solutions
 * Follows TypeScript best practices and provides type safety
 */

// Common UI Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

// Button Component Types
export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

// Input Component Types
export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  name?: string;
  id?: string;
}

// Team Member Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedIn?: string;
  email?: string;
  expertise: string[];
}

// Service Types
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

// Client Types
export interface ClientItem {
  src: string;
  alt?: string;
  title?: string;
  caseStudy?: string;
}

// Benefit Types
export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Expertise Types
export interface ExpertisePoint {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Animation Hook Types
export interface Use3DTiltOptions {
  maxTilt?: number;
  enabled?: boolean;
}

export interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
  duration?: number;
  rootMargin?: string;
}

// Company Information Types
export interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedIn: string;
  instagram: string;
  twitter?: string;
  facebook?: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Theme Types
export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Navigation Types
export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

// SEO Types
export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

// Performance Metrics Types
export interface PerformanceMetrics {
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  firstInputDelay?: number;
  cumulativeLayoutShift?: number;
}

// Error Types
export interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
}

export interface ErrorState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Event Handler Types
export type EventHandler<T = HTMLElement> = (event: React.SyntheticEvent<T>) => void;
export type MouseEventHandler<T = HTMLElement> = (event: React.MouseEvent<T>) => void;
export type ChangeEventHandler<T = HTMLElement> = (event: React.ChangeEvent<T>) => void;
export type FocusEventHandler<T = HTMLElement> = (event: React.FocusEvent<T>) => void;
export type KeyboardEventHandler<T = HTMLElement> = (event: React.KeyboardEvent<T>) => void;

// Animation Types
export type AnimationPreset = 'fast' | 'standard' | 'slow' | 'staggered';
export type AnimationEasing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';

// Responsive Breakpoint Types
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// Color Theme Types
export type ColorVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
export type ColorShade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

// Layout Types
export type LayoutVariant = 'default' | 'centered' | 'full-width' | 'sidebar';
export type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

// Component State Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};
