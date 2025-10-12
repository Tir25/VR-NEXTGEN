/**
 * Custom Hooks Export
 * Reusable React hooks for the VR NextGEN website
 * Organized by functionality for better maintainability
 */

// Animation Hooks
export * from './animations';

// Navigation Hooks  
export * from './navigation';

// Visibility Hooks
export * from './visibility';

// Individual hooks (for backward compatibility)
export { use3DTilt } from './use3DTilt';
// useCountUp removed as it was unused
export { useInView } from './useInView';
export { useIntersectionObserver } from './useIntersectionObserver';
// useNavigation and useEnhancedNavigation removed as they were unused
export { useParallax } from './useParallax';
export { useScrollFade } from './useScrollFade';
export { useScrollToTop } from './useScrollToTop';
