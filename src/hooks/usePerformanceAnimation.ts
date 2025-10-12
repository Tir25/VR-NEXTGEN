/**
 * Performance-Aware Animation Hook
 * Provides animation controls that respect device capabilities and user preferences
 */

import { useMemo } from 'react';
// Tree-shaken Framer Motion imports for optimal bundle size
import { useSpring, useTransform, useMotionValue, MotionValue } from 'framer-motion';
import performanceDetector from '@/utils/performanceDetection';

interface AnimationConfig {
  damping: number;
  stiffness: number;
  mass: number;
  duration?: number;
}

interface PerformanceAnimationOptions {
  reducedMotion?: boolean;
  lowEndDevice?: boolean;
  customConfig?: Partial<AnimationConfig>;
}

/**
 * Hook for performance-aware animations
 */
export function usePerformanceAnimation(
  value: number | MotionValue<number>,
  options: PerformanceAnimationOptions = {}
) {
  const settings = performanceDetector.getSettings();
  const capabilities = performanceDetector.getCapabilities();
  
  // Create MotionValue at the top level if value is a number
  const numberMotionValue = useMotionValue(typeof value === 'number' ? value : 0);
  
  const animationConfig = useMemo(() => {
    const baseConfig: AnimationConfig = {
      damping: 20,
      stiffness: 120,
      mass: 0.3,
    };

    // Adjust for device capabilities
    if (capabilities?.prefersReducedMotion || capabilities?.isLowEnd || options.reducedMotion) {
      return {
        ...baseConfig,
        damping: 40,
        stiffness: 300,
        mass: 0.1,
      };
    }

    // Apply custom config if provided
    if (options.customConfig) {
      return { ...baseConfig, ...options.customConfig };
    }

    return baseConfig;
  }, [capabilities, options]);

  // Use the appropriate MotionValue
  const motionValue = typeof value === 'number' ? numberMotionValue : value;

  // Always call useSpring at the top level
  return useSpring(motionValue, animationConfig);
}

/**
 * Hook for performance-aware transforms
 */
export function usePerformanceTransform(
  value: MotionValue<number>,
  inputRange: number[],
  outputRange: number[],
  options: PerformanceAnimationOptions = {}
) {
  const settings = performanceDetector.getSettings();
  
  // Always call hooks at the top level
  const transform = useTransform(value, inputRange, outputRange, {
    clamp: true,
  });
  
  // Return the same transform regardless of device capabilities
  // The optimization is handled by the performance detector
  return transform;
}

/**
 * Hook for conditional animation rendering
 */
export function useConditionalAnimation() {
  const settings = performanceDetector.getSettings();
  const capabilities = performanceDetector.getCapabilities();

  return useMemo(() => ({
    shouldAnimate: settings?.enableHeavyAnimations ?? true,
    shouldParallax: settings?.enableParallax ?? true,
    shouldBackgroundEffects: settings?.enableBackgroundEffects ?? true,
    animationDuration: settings?.animationDuration ?? 0.3,
    isLowEnd: capabilities?.isLowEnd ?? false,
    prefersReducedMotion: capabilities?.prefersReducedMotion ?? false,
  }), [settings, capabilities]);
}

/**
 * Hook for optimized scroll-based animations
 */
export function useOptimizedScrollAnimation(
  scrollProgress: MotionValue<number>,
  inputRange: number[],
  outputRange: number[],
  options: PerformanceAnimationOptions = {}
) {
  const settings = performanceDetector.getSettings();
  
  // Always call hooks at the top level
  const basicTransform = useTransform(scrollProgress, inputRange, outputRange, {
    clamp: true,
  });
  
  const springTransform = useSpring(basicTransform, {
    damping: 30,
    stiffness: 100,
    mass: 0.2,
  });
  
  // Use simpler transforms for low-end devices
  if (settings?.imageQuality === 'low' || options.lowEndDevice) {
    return basicTransform;
  }

  return springTransform;
}

export default {
  usePerformanceAnimation,
  usePerformanceTransform,
  useConditionalAnimation,
  useOptimizedScrollAnimation,
};
