/**
 * Error handling type definitions
 * Centralized types for error management system
 */

export interface AppError extends Error {
  code: string;
  status: number;
  context?: {
    component?: string;
    action?: string;
    userId?: string;
    sessionId?: string;
    timestamp?: number;
    metadata?: Record<string, any>;
  };
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: AppError | null;
  errorInfo?: {
    componentStack: string;
    errorBoundary?: string;
  };
}

export interface ErrorRecoveryOptions {
  retry?: {
    maxAttempts: number;
    delay: number;
    backoff?: 'linear' | 'exponential';
  };
  fallback?: () => any;
  onRetry?: (attempt: number, error: Error) => void;
  onRecovery?: (result: any) => void;
  onFailure?: (error: Error) => void;
}

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  sessionId?: string;
  timestamp?: number;
  metadata?: Record<string, any>;
}

export interface ErrorMonitoringConfig {
  enabled: boolean;
  service?: 'sentry' | 'logrocket' | 'custom';
  endpoint?: string;
  apiKey?: string;
  environment?: 'development' | 'staging' | 'production';
  sampleRate?: number;
  beforeSend?: (error: AppError) => AppError | null;
}

export interface ErrorReport {
  id: string;
  error: AppError;
  timestamp: number;
  userAgent?: string;
  url?: string;
  userId?: string;
  sessionId?: string;
  breadcrumbs?: Array<{
    message: string;
    timestamp: number;
    level: 'info' | 'warning' | 'error';
    data?: Record<string, any>;
  }>;
}

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface ErrorMetrics {
  totalErrors: number;
  errorsByType: Record<string, number>;
  errorsByComponent: Record<string, number>;
  averageRecoveryTime: number;
  successRate: number;
  lastError?: AppError;
}

export interface ErrorHandlerConfig {
  enableGlobalHandling: boolean;
  enableErrorBoundaries: boolean;
  enableRecovery: boolean;
  enableMonitoring: boolean;
  monitoring?: ErrorMonitoringConfig;
  maxErrorHistory: number;
  retryDefaults: ErrorRecoveryOptions['retry'];
}
