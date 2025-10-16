import { useScrollToTop } from "@/hooks/useScrollToTop";
import { HeroSection } from "@/components/common";
import { HeroText } from ".";
import { HERO_CONFIG } from "./constants";
import SectionBoundary from "@/components/common/SectionBoundary";
// Tree-shaken Framer Motion imports for optimal bundle size
import { useScroll, useTransform, useSpring } from "framer-motion";
import React, { useMemo } from "react";
import HeroBackground from "./HeroBackground";
import { useConditionalAnimation } from "@/hooks/usePerformanceAnimation";
import { useViewport } from "@/hooks/useViewport";
import { useParallax } from "@/hooks/useParallax";
/**
 * Optimized Hero component with consolidated scroll handling and performance optimizations
 * - Uses Framer Motion's scroll system for all scroll-based animations
 * - Memoizes expensive calculations
 * - Optimizes viewport height updates with throttling
 * - Maintains smooth 60fps animations
 */
export default function Hero() {
  const { scrollY } = useScroll();
  const { height: viewportHeight } = useViewport();
  const { shouldAnimate: _shouldAnimate, animationDuration: _animationDuration } = useConditionalAnimation();
  
  // Memoized opacity calculations for better performance
  const opacityConfig = useMemo(() => {
    const fadeStart = Math.max(1, viewportHeight * 0.3);
    return { fadeStart, fadeEnd: 0 };
  }, [viewportHeight]);
  
  const rawOpacity = useTransform(scrollY, [0, opacityConfig.fadeStart], [1, opacityConfig.fadeEnd], { clamp: true });
  
  // Use performance-aware animation
  const smoothedOpacity = useSpring(rawOpacity, {
    damping: 20,
    stiffness: 120,
    mass: 0.3,
  });
  
  // Create parallax effect using optimized scroll context
  const parallaxOffset = useTransform(scrollY, [0, viewportHeight], [0, viewportHeight * HERO_CONFIG.parallaxSpeed]);
  
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
        parallaxOffset={parallaxOffset}
      />
      {/* Original Hero Text Content with Animations */}
      <SectionBoundary>
        <HeroText />
      </SectionBoundary>
    </HeroSection>
  );
}