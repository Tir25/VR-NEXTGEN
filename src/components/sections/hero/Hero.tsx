import { useParallax } from "@/hooks/useParallax";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { HeroSection } from "@/components/common";
import { HeroText } from ".";
import { HERO_CONFIG } from "./constants";
import SectionBoundary from "@/components/common/SectionBoundary";
// Tree-shaken Framer Motion imports for optimal bundle size
import { useScroll, useSpring, useTransform } from "framer-motion";
import React, { useMemo } from "react";
import { useViewport } from "@/hooks/useViewport";
import HeroBackground from "./HeroBackground";
import { useConditionalAnimation } from "@/hooks/usePerformanceAnimation";
/**
 * Optimized Hero component with consolidated scroll handling and performance optimizations
 * - Uses unified scroll context for parallax effects
 * - Memoizes expensive calculations
 * - Optimizes viewport height updates with throttling
 * - Maintains smooth 60fps animations
 */
export default function Hero() {
  const parallax = useParallax(HERO_CONFIG.parallaxSpeed);
  const { scrollY } = useScroll();
  const { height: viewportHeight } = useViewport();
  const { shouldAnimate: _shouldAnimate, animationDuration: _animationDuration } = useConditionalAnimation();
  // Memoized opacity calculations for better performance
  const opacityConfig = useMemo(() => {
    const fadeStart = Math.max(1, viewportHeight * 0.3);
    return { fadeStart, fadeEnd: 0 };
  }, [viewportHeight]);
  const rawOpacity = useTransform(
    scrollY, 
    [0, opacityConfig.fadeStart], 
    [1, opacityConfig.fadeEnd], 
    { clamp: true }
  );
  // Use performance-aware animation
  const smoothedOpacity = useSpring(rawOpacity, {
    damping: 20,
    stiffness: 120,
    mass: 0.3,
  });
  // Scroll to top on component mount
  useScrollToTop();
  return (
    <HeroSection
      id="hero"
      ariaLabel="Hero"
      minHeight={HERO_CONFIG.minHeight}
    >
      {/* Reusable optimized background with parallax and fade effects */}
      <HeroBackground 
        backgroundImage="/images-optimized/Hero.webp"
        opacity={smoothedOpacity}
        overlayImage="/next.svg"
        parallaxOffset={parallax}
      />
      {/* Original Hero Text Content with Animations */}
      <SectionBoundary>
        <HeroText />
      </SectionBoundary>
    </HeroSection>
  );
}