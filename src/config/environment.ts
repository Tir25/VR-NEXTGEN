/**
 * Environment configuration management
 * Centralized environment variable handling with validation and defaults
 */

import { z } from 'zod';
import { validateData } from '@/utils/validation';

// Environment schema with validation
const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_NAME: z.string().default('VR NextGEN Solutions'),
  NEXT_PUBLIC_APP_VERSION: z.string().default('1.2.0'),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  
  // API Configuration
  API_BASE_URL: z.string().url().optional(),
  API_TIMEOUT: z.string().transform(Number).default(10000),
  
  // Contact Form
  CONTACT_EMAIL: z.string().email().optional(),
  CONTACT_FORM_ENABLED: z.string().transform(val => val === 'true').default(true),
  CONTACT_FORM_RATE_LIMIT: z.string().transform(Number).default(10),
  
  // Analytics (Optional)
  NEXT_PUBLIC_GA_TRACKING_ID: z.string().optional(),
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
  
  // Monitoring (Optional)
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_HOTJAR_ID: z.string().optional(),
  
  // Security
  SECURITY_HEADERS_ENABLED: z.string().transform(val => val !== 'false').default(true),
  NEXT_PUBLIC_CSP_REPORT_URI: z.string().url().optional(),
  
  // Performance
  NEXT_TELEMETRY_DISABLED: z.string().transform(val => val !== 'false').default(true),
  
  // Feature Flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: z.string().transform(val => val === 'true').default(false),
  NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING: z.string().transform(val => val === 'true').default(false),
  NEXT_PUBLIC_ENABLE_ERROR_REPORTING: z.string().transform(val => val === 'true').default(false),
  NEXT_PUBLIC_ENABLE_DEBUG_MODE: z.string().transform(val => val === 'true').default(false),
  
  // Development
  NEXT_PUBLIC_DEBUG_MODE: z.string().transform(val => val === 'true').default(false),
  NEXT_PUBLIC_SHOW_PERFORMANCE_METRICS: z.string().transform(val => val === 'true').default(false),
});

export type EnvConfig = z.infer<typeof envSchema>;

// Environment configuration class
class EnvironmentConfig {
  private config: EnvConfig;
  private isInitialized = false;

  constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig(): EnvConfig {
    try {
      const rawEnv = process.env;
      const validation = validateData(envSchema, rawEnv);
      
      if (!validation.success) {
        // Use defaults for missing/invalid values
        return this.getDefaultConfig();
      }
      
      return validation.data;
    } catch (error) {
      // Fallback to default configuration on error
      return this.getDefaultConfig();
    }
  }

  private getDefaultConfig(): EnvConfig {
    return {
      NODE_ENV: 'development',
      NEXT_PUBLIC_APP_NAME: 'VR NextGEN Solutions',
      NEXT_PUBLIC_APP_VERSION: '1.2.0',
      API_TIMEOUT: 10000,
      CONTACT_FORM_ENABLED: true,
      CONTACT_FORM_RATE_LIMIT: 10,
      SECURITY_HEADERS_ENABLED: true,
      NEXT_TELEMETRY_DISABLED: true,
      NEXT_PUBLIC_ENABLE_ANALYTICS: false,
      NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING: false,
      NEXT_PUBLIC_ENABLE_ERROR_REPORTING: false,
      NEXT_PUBLIC_ENABLE_DEBUG_MODE: false,
      NEXT_PUBLIC_DEBUG_MODE: false,
      NEXT_PUBLIC_SHOW_PERFORMANCE_METRICS: false,
    };
  }

  public get<K extends keyof EnvConfig>(key: K): EnvConfig[K] {
    return this.config[key];
  }

  public getAll(): EnvConfig {
    return { ...this.config };
  }

  public isDevelopment(): boolean {
    return this.config.NODE_ENV === 'development';
  }

  public isProduction(): boolean {
    return this.config.NODE_ENV === 'production';
  }

  public isTest(): boolean {
    return this.config.NODE_ENV === 'test';
  }

  public isFeatureEnabled(feature: keyof Pick<EnvConfig, 
    'NEXT_PUBLIC_ENABLE_ANALYTICS' | 
    'NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING' | 
    'NEXT_PUBLIC_ENABLE_ERROR_REPORTING' | 
    'NEXT_PUBLIC_ENABLE_DEBUG_MODE'
  >): boolean {
    return this.config[feature];
  }

  public isDebugMode(): boolean {
    return this.config.NEXT_PUBLIC_DEBUG_MODE || this.isDevelopment();
  }

  public getApiConfig() {
    return {
      baseUrl: this.config.API_BASE_URL,
      timeout: this.config.API_TIMEOUT,
      rateLimit: this.config.CONTACT_FORM_RATE_LIMIT,
    };
  }

  public getContactConfig() {
    return {
      email: this.config.CONTACT_EMAIL,
      enabled: this.config.CONTACT_FORM_ENABLED,
      rateLimit: this.config.CONTACT_FORM_RATE_LIMIT,
    };
  }

  public getAnalyticsConfig() {
    return {
      enabled: this.config.NEXT_PUBLIC_ENABLE_ANALYTICS,
      gaTrackingId: this.config.NEXT_PUBLIC_GA_TRACKING_ID,
      gtmId: this.config.NEXT_PUBLIC_GTM_ID,
    };
  }

  public getMonitoringConfig() {
    return {
      enabled: this.config.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING,
      errorReporting: this.config.NEXT_PUBLIC_ENABLE_ERROR_REPORTING,
      sentryDsn: this.config.NEXT_PUBLIC_SENTRY_DSN,
      hotjarId: this.config.NEXT_PUBLIC_HOTJAR_ID,
    };
  }

  public getSecurityConfig() {
    return {
      headersEnabled: this.config.SECURITY_HEADERS_ENABLED,
      cspReportUri: this.config.NEXT_PUBLIC_CSP_REPORT_URI,
    };
  }

  public validateRequired(): { isValid: boolean; missing: string[] } {
    const required = [
      'NEXT_PUBLIC_APP_NAME',
      'NEXT_PUBLIC_APP_VERSION',
    ] as const;

    const missing: string[] = [];
    
    for (const key of required) {
      if (!this.config[key]) {
        missing.push(key);
      }
    }

    return {
      isValid: missing.length === 0,
      missing,
    };
  }
}

// Singleton instance
const envConfig = new EnvironmentConfig();

// Export configuration
export const config = envConfig;

// Environment-specific configurations
export const developmentConfig = {
  debugMode: true,
  performanceMonitoring: true,
  errorReporting: true,
  analytics: false,
  telemetry: false,
};

export const productionConfig = {
  debugMode: false,
  performanceMonitoring: envConfig.isFeatureEnabled('NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING'),
  errorReporting: envConfig.isFeatureEnabled('NEXT_PUBLIC_ENABLE_ERROR_REPORTING'),
  analytics: envConfig.isFeatureEnabled('NEXT_PUBLIC_ENABLE_ANALYTICS'),
  telemetry: false,
};

export const testConfig = {
  debugMode: true,
  performanceMonitoring: false,
  errorReporting: false,
  analytics: false,
  telemetry: false,
};

// Get current environment config
export function getEnvironmentConfig() {
  const env = config.get('NODE_ENV');
  
  switch (env) {
    case 'development':
      return developmentConfig;
    case 'production':
      return productionConfig;
    case 'test':
      return testConfig;
    default:
      return developmentConfig;
  }
}

// Environment validation on startup
if (typeof window === 'undefined') {
  const validation = config.validateRequired();
  if (!validation.isValid) {
    // Log missing environment variables in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Missing required environment variables:', validation.missing);
    }
  }
}

// Export types
// EnvConfig is already exported above
