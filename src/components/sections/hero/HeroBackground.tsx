/**
 * HeroBackground Component
 * Optimized, reusable background for hero sections with parallax and fade effects
 */

import React from 'react';
// Tree-shaken Framer Motion imports for optimal bundle size
import { motion } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

interface HeroBackgroundProps {
  backgroundImage: string;
  opacity?: MotionValue<number>;
  parallaxOffset?: MotionValue<number>;
  overlayImage?: string;
  overlayOpacity?: string;
}

export default function HeroBackground({
  backgroundImage,
  opacity,
  parallaxOffset,
  overlayImage,
  overlayOpacity = '0.03'
}: HeroBackgroundProps) {
  return (
    <>
      {/* Optimized background image with smooth scroll-bound fade */}
      <motion.div
        className="absolute inset-0 -z-30 bg-cover bg-center bg-no-repeat bg-parallax"
        aria-hidden="true"
        style={{ 
          backgroundImage: `url('${backgroundImage}')`,
          opacity: opacity, 
          willChange: 'opacity',
          transform: 'translate3d(0, 0, 0)', // Force hardware acceleration
          backfaceVisibility: 'hidden', // Optimize rendering
          WebkitTransform: 'translate3d(0, 0, 0)', // Safari optimization
          WebkitBackfaceVisibility: 'hidden' // Safari optimization
        }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      />

      {/* Optional overlay image with parallax effect */}
      {overlayImage && (
        <div
          className="absolute inset-0 -z-20 bg-no-repeat bg-center bg-parallax"
          aria-hidden="true"
          style={{ 
            backgroundImage: `url('${overlayImage}')`,
            opacity: overlayOpacity,
            transform: parallaxOffset ? `translate3d(0, ${parallaxOffset.get() * -1}px, 0)` : 'translate3d(0, 0, 0)',
            willChange: parallaxOffset ? 'transform' : 'auto',
            backfaceVisibility: 'hidden',
            WebkitTransform: parallaxOffset ? `translate3d(0, ${parallaxOffset.get() * -1}px, 0)` : 'translate3d(0, 0, 0)',
            WebkitBackfaceVisibility: 'hidden'
          }}
        />
      )}
    </>
  );
}
