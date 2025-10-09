/**
 * Performance optimization hooks
 * Centralized exports for all performance-related hooks
 */

export * from './useOptimizedRender';

// Re-export commonly used performance utilities
export { useOptimizedMemo, useStableCallback } from './useOptimizedRender';

// Note: Scroll-related hooks have been moved to the unified scroll system
// Use hooks from @/contexts/ScrollContext instead:
// - useUnifiedParallax
// - useUnifiedScrollFade
// - useUnifiedNavigation
// - useUnifiedBackgroundAnimation
