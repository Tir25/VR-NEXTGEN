/**
 * Import Error Boundary
 * 
 * Specialized error boundary that catches and handles import/export related errors
 * such as "Element type is invalid" errors. Provides detailed debugging information
 * and recovery mechanisms.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '@/utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDebugInfo?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorType: 'import' | 'export' | 'component' | 'unknown';
}

export default class ImportErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorType: 'unknown'
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Analyze the error to determine its type
    const errorType = ImportErrorBoundary.analyzeErrorType(error);
    
    return {
      hasError: true,
      error,
      errorType
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorType = ImportErrorBoundary.analyzeErrorType(error);
    
    this.setState({
      error,
      errorInfo,
      errorType
    });

    // Log the error with detailed information
    this.logError(error, errorInfo, errorType);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  /**
   * Analyzes the error to determine its type
   */
  private static analyzeErrorType(error: Error): State['errorType'] {
    const message = error.message.toLowerCase();
    
    if (message.includes('element type is invalid')) {
      return 'import';
    } else if (message.includes('export') || message.includes('import')) {
      return 'export';
    } else if (message.includes('component') || message.includes('react')) {
      return 'component';
    }
    
    return 'unknown';
  }

  /**
   * Logs the error with detailed information
   */
  private logError(error: Error, errorInfo: ErrorInfo, errorType: State['errorType']) {
    logger.error('🚨 Import Error Boundary Caught Error:', {
      type: errorType,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    });

    // Provide specific guidance based on error type
    switch (errorType) {
      case 'import':
        logger.error('💡 This is likely an import/export issue. Check:');
        logger.error('  • Import statements in your components');
        logger.error('  • Export statements in source files');
        logger.error('  • Default vs named import/export mismatch');
        logger.error('  • Circular dependencies');
        break;
      case 'export':
        logger.error('💡 This is likely an export issue. Check:');
        logger.error('  • Export statements in your source files');
        logger.error('  • Default vs named exports');
        logger.error('  • Module structure');
        break;
      case 'component':
        logger.error('💡 This is likely a component issue. Check:');
        logger.error('  • Component definition');
        logger.error('  • Props validation');
        logger.error('  • Component lifecycle');
        break;
    }
  }

  /**
   * Attempts to recover from the error
   */
  private handleRecovery = () => {
    logger.log('🔄 Attempting to recover from import error...');
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorType: 'unknown'
    });
  };

  /**
   * Renders the error UI
   */
  private renderErrorUI() {
    const { error, errorType } = this.state;
    const { showDebugInfo = process.env.NODE_ENV === 'development' } = this.props;

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-900 border border-red-500 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">!</span>
            </div>
            <h1 className="text-xl font-bold text-red-400">
              Import Error Detected
            </h1>
          </div>

          <div className="mb-4">
            <p className="text-gray-300 mb-2">
              {errorType === 'import' && 'A component import/export issue has been detected.'}
              {errorType === 'export' && 'An export issue has been detected.'}
              {errorType === 'component' && 'A component rendering issue has been detected.'}
              {errorType === 'unknown' && 'An unexpected error has been detected.'}
            </p>
            
            <div className="bg-gray-800 rounded p-3 mb-4">
              <code className="text-red-300 text-sm">
                {error?.message || 'Unknown error'}
              </code>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                Common Solutions:
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {errorType === 'import' && (
                  <>
                    <li>• Check import statements for correct syntax</li>
                    <li>• Verify export statements in source files</li>
                    <li>• Ensure default vs named import/export consistency</li>
                    <li>• Check for circular dependencies</li>
                  </>
                )}
                {errorType === 'export' && (
                  <>
                    <li>• Verify export statements in source files</li>
                    <li>• Check default vs named export consistency</li>
                    <li>• Ensure modules are properly structured</li>
                  </>
                )}
                <li>• Check browser console for additional details</li>
                <li>• Verify all dependencies are properly installed</li>
              </ul>
            </div>

            {showDebugInfo && (
              <details className="bg-gray-800 rounded p-3">
                <summary className="cursor-pointer text-yellow-400 font-semibold mb-2">
                  Debug Information
                </summary>
                <pre className="text-xs text-gray-300 overflow-auto max-h-40">
                  {JSON.stringify({
                    errorType,
                    message: error?.message,
                    stack: error?.stack?.split('\n').slice(0, 10)
                  }, null, 2)}
                </pre>
              </details>
            )}

            <div className="flex gap-3">
              <button
                onClick={this.handleRecovery}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white font-medium transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || this.renderErrorUI();
    }

    return this.props.children;
  }
}

/**
 * Hook for using the import error boundary in functional components
 */
export function useImportErrorHandler() {
  const handleError = React.useCallback((error: Error, errorInfo: ErrorInfo) => {
    logger.error('Import error caught by hook:', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
  }, []);

  return { handleError };
}
