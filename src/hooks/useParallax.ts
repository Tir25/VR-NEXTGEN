import { useUnifiedParallax } from "@/contexts/ScrollContext";

/**
 * Optimized parallax hook using the global scroll controller
 * @param multiplier - The parallax multiplier (default: 0.3)
 * @returns The parallax offset value
 */
export function useParallax(multiplier: number = 0.3) {
  return useUnifiedParallax(multiplier);
}
