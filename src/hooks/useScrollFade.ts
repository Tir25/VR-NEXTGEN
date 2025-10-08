import { useUnifiedScrollFade } from "@/contexts/ScrollContext";

/**
 * Optimized scroll fade hook using the global scroll controller
 * @param fadeStartRatio - The ratio of viewport height at which fading starts (default: 0.5)
 * @returns Object containing opacity and isVisible state
 */
export function useScrollFade(fadeStartRatio: number = 0.5) {
  return useUnifiedScrollFade(fadeStartRatio);
}
