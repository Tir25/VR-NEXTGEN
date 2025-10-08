/**
 * Performance optimization hooks
 * Centralized exports for all performance-related hooks
 */

export * from './useOptimizedRender';
export * from './useOptimizedScroll';

// Re-export commonly used performance utilities
export { useOptimizedMemo, useStableCallback } from './useOptimizedRender';
export { useOptimizedScroll, useScrollProgress, useScrollParallax } from './useOptimizedScroll';
