import { useParallax } from '@/hooks/useParallax';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { HeroSection } from '@/components/common';
import { HeroText, HeroButtons } from '.';
import { HERO_CONFIG } from './constants';
import SectionBoundary from '@/components/common/SectionBoundary';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

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
  const [viewportHeight, setViewportHeight] = useState(0);

  // Optimized viewport height calculation with throttling
  const updateViewportHeight = useCallback(() => {
    const newHeight = window.innerHeight || 0;
    setViewportHeight(prevHeight => (prevHeight !== newHeight ? newHeight : prevHeight));
  }, []);

  useEffect(() => {
    // Initial calculation
    updateViewportHeight();

    // Throttled resize listener for better performance
    let timeoutId: NodeJS.Timeout;
    const throttledUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateViewportHeight, 100);
    };

    window.addEventListener('resize', throttledUpdate, { passive: true });
    return () => {
      window.removeEventListener('resize', throttledUpdate);
      clearTimeout(timeoutId);
    };
  }, [updateViewportHeight]);

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

  const smoothedOpacity = useSpring(rawOpacity, {
    damping: 20,
    stiffness: 120,
    mass: 0.3,
  });

  // Scroll to top on component mount
  useScrollToTop();

  return (
    <HeroSection id='hero' ariaLabel='Hero' minHeight={HERO_CONFIG.minHeight}>
      {/* Optimized background image with smooth scroll-bound fade */}
      <motion.div
        className="absolute inset-0 -z-30 bg-[url('/images/Hero.png')] bg-cover bg-center bg-no-repeat"
        aria-hidden
        style={{
          opacity: smoothedOpacity,
          willChange: 'opacity',
          transform: 'translateZ(0)', // Force hardware acceleration
          backfaceVisibility: 'hidden', // Optimize rendering
        }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      />

      {/* Optimized grid/decoration overlay with hardware acceleration */}
      <div
        className="absolute inset-0 -z-20 bg-[url('/next.svg')] bg-no-repeat bg-center opacity-[0.03]"
        aria-hidden
        style={{
          transform: `translate3d(0, ${parallax * -1}px, 0)`,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      />

      {/* Original Hero Text Content with Animations */}
      <SectionBoundary>
        <HeroText />
      </SectionBoundary>

      {/* Action Buttons */}
      <SectionBoundary>
        <HeroButtons />
      </SectionBoundary>
    </HeroSection>
  );
}
