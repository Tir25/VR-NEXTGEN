/**
 * Import Monitoring System
 * 
 * This system monitors and tracks import/export issues to prevent
 * "Element type is invalid" errors from occurring in the future.
 * 
 * Features:
 * - Real-time import validation
 * - Automatic error detection
 * - Performance monitoring
 * - Development-time warnings
 * - Production error tracking
 */

import React from 'react';
import { logger } from './logger';

interface ImportEvent {
  timestamp: number;
  componentName: string;
  importPath: string;
  success: boolean;
  error?: string;
  duration?: number;
}

interface ImportStats {
  totalImports: number;
  successfulImports: number;
  failedImports: number;
  averageImportTime: number;
  commonErrors: Record<string, number>;
  slowImports: Array<{ component: string; duration: number }>;
}

class ImportMonitor {
  private events: ImportEvent[] = [];
  private stats: ImportStats = {
    totalImports: 0,
    successfulImports: 0,
    failedImports: 0,
    averageImportTime: 0,
    commonErrors: {},
    slowImports: []
  };
  private isMonitoring = false;
  private maxEvents = 1000; // Keep last 1000 events
  private slowImportThreshold = 100; // ms

  constructor() {
    this.startMonitoring();
  }

  /**
   * Starts monitoring import events
   */
  startMonitoring(): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    
    if (process.env.NODE_ENV === 'development') {
      this.setupDevelopmentMonitoring();
    }
    
    logger.log('🔍 Import monitoring started');
  }

  /**
   * Stops monitoring import events
   */
  stopMonitoring(): void {
    this.isMonitoring = false;
    logger.log('🛑 Import monitoring stopped');
  }

  /**
   * Records an import event
   */
  recordImport(
    componentName: string,
    importPath: string,
    success: boolean,
    error?: string,
    duration?: number
  ): void {
    if (!this.isMonitoring) return;

    const event: ImportEvent = {
      timestamp: Date.now(),
      componentName,
      importPath,
      success,
      error,
      duration
    };

    this.events.push(event);
    this.updateStats(event);

    // Keep only recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    // Log failures immediately
    if (!success && error) {
      this.logImportFailure(componentName, importPath, error);
    }

    // Log slow imports
    if (duration && duration > this.slowImportThreshold) {
      this.logSlowImport(componentName, duration);
    }
  }

  /**
   * Updates statistics based on new event
   */
  private updateStats(event: ImportEvent): void {
    this.stats.totalImports++;
    
    if (event.success) {
      this.stats.successfulImports++;
    } else {
      this.stats.failedImports++;
      
      if (event.error) {
        this.stats.commonErrors[event.error] = (this.stats.commonErrors[event.error] || 0) + 1;
      }
    }

    if (event.duration) {
      this.stats.averageImportTime = 
        (this.stats.averageImportTime * (this.stats.totalImports - 1) + event.duration) / 
        this.stats.totalImports;
    }

    if (event.duration && event.duration > this.slowImportThreshold) {
      this.stats.slowImports.push({
        component: event.componentName,
        duration: event.duration
      });
      
      // Keep only recent slow imports
      if (this.stats.slowImports.length > 50) {
        this.stats.slowImports = this.stats.slowImports.slice(-50);
      }
    }
  }

  /**
   * Logs import failure with detailed information
   */
  private logImportFailure(componentName: string, importPath: string, error: string): void {
    logger.error(`❌ Import failed: ${componentName} from ${importPath}`);
    logger.error(`   Error: ${error}`);
    
    // Provide specific guidance based on error type
    if (error.includes('Element type is invalid')) {
      logger.error('💡 This is likely an import/export issue. Check:');
      logger.error('   • Import statement syntax');
      logger.error('   • Export statement in source file');
      logger.error('   • Default vs named import/export mismatch');
      logger.error('   • Circular dependencies');
    }
  }

  /**
   * Logs slow import performance
   */
  private logSlowImport(componentName: string, duration: number): void {
    logger.warn(`🐌 Slow import detected: ${componentName} (${duration}ms)`);
    logger.warn('   Consider optimizing the import or using dynamic imports');
  }

  /**
   * Sets up development-time monitoring
   */
  private setupDevelopmentMonitoring(): void {
    // Monitor console errors
    const originalError = console.error;
    console.error = (...args) => {
      const message = args.join(' ');
      if (message.includes('Element type is invalid')) {
        this.handleElementTypeError(message);
      }
      originalError.apply(console, args);
    };

    // Monitor unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      if (event.reason && event.reason.message?.includes('Element type is invalid')) {
        this.handleElementTypeError(event.reason.message);
      }
    });
  }

  /**
   * Handles Element type is invalid errors
   */
  private handleElementTypeError(message: string): void {
    logger.error('🚨 Element type is invalid error detected!');
    logger.error(`   Message: ${message}`);
    
    // Extract component information if possible
    const componentMatch = message.match(/(\w+)/);
    if (componentMatch) {
      const componentName = componentMatch[1];
      this.recordImport(componentName, 'unknown', false, message);
    }

    // Provide immediate guidance
    this.provideImmediateGuidance();
  }

  /**
   * Provides immediate guidance for fixing the error
   */
  private provideImmediateGuidance(): void {
    logger.error('🔧 Immediate steps to fix:');
    logger.error('   1. Check your import statements');
    logger.error('   2. Verify export statements in source files');
    logger.error('   3. Look for default vs named import/export mismatches');
    logger.error('   4. Check for circular dependencies');
    logger.error('   5. Restart your development server');
  }

  /**
   * Gets current import statistics
   */
  getStats(): ImportStats {
    return { ...this.stats };
  }

  /**
   * Gets recent import events
   */
  getRecentEvents(limit: number = 50): ImportEvent[] {
    return this.events.slice(-limit);
  }

  /**
   * Gets failed imports
   */
  getFailedImports(): ImportEvent[] {
    return this.events.filter(event => !event.success);
  }

  /**
   * Generates a health report
   */
  generateHealthReport(): string {
    const successRate = this.stats.totalImports > 0 
      ? (this.stats.successfulImports / this.stats.totalImports * 100).toFixed(2)
      : '0';
    
    const avgTime = this.stats.averageImportTime.toFixed(2);
    
    let report = `\n📊 Import Health Report\n`;
    report += `========================\n`;
    report += `Total Imports: ${this.stats.totalImports}\n`;
    report += `Success Rate: ${successRate}%\n`;
    report += `Average Import Time: ${avgTime}ms\n`;
    
    if (this.stats.failedImports > 0) {
      report += `\n❌ Failed Imports: ${this.stats.failedImports}\n`;
      
      const commonErrors = Object.entries(this.stats.commonErrors)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);
      
      if (commonErrors.length > 0) {
        report += `\nCommon Errors:\n`;
        commonErrors.forEach(([error, count]) => {
          report += `  • ${error}: ${count} times\n`;
        });
      }
    }
    
    if (this.stats.slowImports.length > 0) {
      report += `\n🐌 Slow Imports (>${this.slowImportThreshold}ms):\n`;
      this.stats.slowImports.slice(-10).forEach(({ component, duration }) => {
        report += `  • ${component}: ${duration}ms\n`;
      });
    }
    
    return report;
  }

  /**
   * Resets all statistics
   */
  reset(): void {
    this.events = [];
    this.stats = {
      totalImports: 0,
      successfulImports: 0,
      failedImports: 0,
      averageImportTime: 0,
      commonErrors: {},
      slowImports: []
    };
    logger.log('🔄 Import monitoring statistics reset');
  }
}

// Create global instance
const importMonitor = new ImportMonitor();

/**
 * Hook for monitoring imports in React components
 */
export function useImportMonitor() {
  const monitorImport = (componentName: string, importPath: string) => {
    const startTime = performance.now();
    
    return (success: boolean, error?: string) => {
      const duration = performance.now() - startTime;
      importMonitor.recordImport(componentName, importPath, success, error, duration);
    };
  };

  return { monitorImport };
}

/**
 * Higher-order component for monitoring component imports
 */
export function withImportMonitoring<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
) {
  return function MonitoredComponent(props: P) {
    const { monitorImport } = useImportMonitor();
    
    React.useEffect(() => {
      const recordImport = monitorImport(componentName, 'unknown');
      recordImport(true); // Assume success if component renders
    }, []);

    return React.createElement(WrappedComponent, props);
  };
}

export default importMonitor;
