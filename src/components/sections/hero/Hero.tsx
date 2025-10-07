import { useParallax } from "@/hooks/useParallax";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { HeroSection } from "@/components/common";
import { HeroText, HeroButtons } from ".";
import { HERO_CONFIG } from "./constants";
import SectionBoundary from "@/components/common/SectionBoundary";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function Hero() {
  const parallax = useParallax(HERO_CONFIG.parallaxSpeed);
  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const update = () => setViewportHeight(window.innerHeight || 0);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const rawOpacity = useTransform(scrollY, [0, Math.max(1, viewportHeight * 0.3)], [1, 0], { clamp: true });
  const smoothedOpacity = useSpring(rawOpacity, { damping: 20, stiffness: 120, mass: 0.3 });

  // Scroll to top on component mount
  useScrollToTop();

  return (
    <HeroSection
      id="hero"
      ariaLabel="Hero"
      minHeight={HERO_CONFIG.minHeight}
    >
      {/* Background image (base layer) with smooth scroll-bound fade */}
      <motion.div
        className="absolute inset-0 -z-30 bg-[url('/images/Hero.png')] bg-cover bg-center bg-no-repeat"
        aria-hidden
        style={{ opacity: smoothedOpacity, willChange: 'opacity' }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      />

      {/* Grid/decoration overlay over the image */}
      <div
        className="absolute inset-0 -z-20 bg-[url('/next.svg')] bg-no-repeat bg-center opacity-[0.03]"
        aria-hidden
        style={{ transform: `translateY(${parallax * -1}px)` }}
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


