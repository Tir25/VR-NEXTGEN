/**
 * HeroBackground Component
 * Optimized, reusable background for hero sections with parallax and fade effects
 */

import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface HeroBackgroundProps {
  backgroundImage: string;
  opacity?: MotionValue<number>;
  parallaxOffset?: number;
  overlayImage?: string;
  overlayOpacity?: string;
}

export default function HeroBackground({
  backgroundImage,
  opacity,
  parallaxOffset = 0,
  overlayImage,
  overlayOpacity = '0.03'
}: HeroBackgroundProps) {
  return (
    <>
      {/* Optimized background image with smooth scroll-bound fade */}
      <motion.div
        className="absolute inset-0 -z-30 bg-cover bg-center bg-no-repeat"
        aria-hidden="true"
        style={{ 
          backgroundImage: `url('${backgroundImage}')`,
          opacity: opacity, 
          willChange: 'opacity',
          transform: 'translateZ(0)', // Force hardware acceleration
          backfaceVisibility: 'hidden' // Optimize rendering
        }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      />

      {/* Optional overlay image with parallax effect */}
      {overlayImage && (
        <div
          className="absolute inset-0 -z-20 bg-no-repeat bg-center"
          aria-hidden="true"
          style={{ 
            backgroundImage: `url('${overlayImage}')`,
            opacity: overlayOpacity,
            transform: parallaxOffset ? `translate3d(0, ${parallaxOffset * -1}px, 0)` : undefined,
            willChange: parallaxOffset ? 'transform' : undefined,
            backfaceVisibility: 'hidden'
          }}
        />
      )}
    </>
  );
}
