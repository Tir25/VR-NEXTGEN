/**
 * Feature Integration System
 * Centralized feature management and integration
 */

// Export all features
export * from './core';

// Feature registry for dynamic loading
export const FEATURE_REGISTRY = {
  core: () => import('./core'),
} as const;

// Feature loader utility
export async function loadFeature(featureName: keyof typeof FEATURE_REGISTRY) {
  try {
    const feature = await FEATURE_REGISTRY[featureName]();
    return feature;
  } catch (error) {
    // Failed to load feature
    return null;
  }
}

// Feature availability checker
export function isFeatureAvailable(featureName: keyof typeof FEATURE_REGISTRY): boolean {
  return featureName in FEATURE_REGISTRY;
}
