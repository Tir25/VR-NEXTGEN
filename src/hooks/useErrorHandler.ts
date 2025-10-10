/**
 * Error handling hook
 * Provides error handling utilities for components
 */

import { useCallback } from 'react';
import { errorHandler } from '@/utils/errorHandling';

export function useErrorHandler() {
  const handleError = useCallback((error: Error, context?: string) => {
    errorHandler.logError(error, context);
  }, []);

  const handleAsyncError = useCallback(
    async <T>(asyncFn: () => Promise<T>, context?: string): Promise<T | null> => {
      return await errorHandler.handleAsyncError(asyncFn, context);
    },
    []
  );

  const getErrorLog = useCallback(() => {
    return errorHandler.getErrorLog();
  }, []);

  const clearErrorLog = useCallback(() => {
    errorHandler.clearErrorLog();
  }, []);

  return {
    handleError,
    handleAsyncError,
    getErrorLog,
    clearErrorLog,
  };
}

export default useErrorHandler;
