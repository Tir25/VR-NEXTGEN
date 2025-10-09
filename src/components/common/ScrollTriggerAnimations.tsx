import React, { useEffect, useRef } from 'react';
import { useScrollTrigger, ScrollTriggerUtils } from '@/utils/gsapScrollTrigger';

// Import ScrollTrigger types from the utils
interface ScrollTriggerCallbackInstance {
  progress: number;
  direction: number;
  isActive: boolean;
  trigger: Element;
  start: number;
  end: number;
}

/**
 * ScrollTriggerAnimations Component
 * 
 * This component provides GSAP ScrollTrigger animations for enhanced scroll-driven effects.
 * It integrates with the unified scroll system and provides safe fallbacks.
 */

interface ScrollTriggerAnimationsProps {
  children: React.ReactNode;
  className?: string;
  animations?: {
    fadeIn?: boolean;
    slideIn?: 'left' | 'right' | 'up' | 'down';
    scaleIn?: boolean;
    parallax?: boolean;
    parallaxSpeed?: number;
  };
}

export default function ScrollTriggerAnimations({ 
  children, 
  className = '', 
  animations = {} 
}: ScrollTriggerAnimationsProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const scrollTrigger = useScrollTrigger();
  const animationRefs = useRef<ScrollTriggerCallbackInstance[]>([]);

  useEffect(() => {
    if (!scrollTrigger.isAvailable || !elementRef.current) return;

    const element = elementRef.current;
    const cleanupFunctions: (() => void)[] = [];

    // Fade in animation
    if (animations.fadeIn) {
      const fadeAnimation = ScrollTriggerUtils.fadeIn(element, {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
      });
      if (fadeAnimation) {
        animationRefs.current.push(fadeAnimation);
        cleanupFunctions.push(() => fadeAnimation.kill());
      }
    }

    // Slide in animation
    if (animations.slideIn) {
      const slideAnimation = ScrollTriggerUtils.slideIn(element, animations.slideIn, {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
      });
      if (slideAnimation) {
        animationRefs.current.push(slideAnimation);
        cleanupFunctions.push(() => slideAnimation.kill());
      }
    }

    // Scale in animation
    if (animations.scaleIn) {
      const scaleAnimation = ScrollTriggerUtils.scaleIn(element, {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
      });
      if (scaleAnimation) {
        animationRefs.current.push(scaleAnimation);
        cleanupFunctions.push(() => scaleAnimation.kill());
      }
    }

    // Parallax animation
    if (animations.parallax) {
      const parallaxAnimation = ScrollTriggerUtils.parallax(element, animations.parallaxSpeed || 0.5, {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
      });
      if (parallaxAnimation) {
        animationRefs.current.push(parallaxAnimation);
        cleanupFunctions.push(() => parallaxAnimation.kill());
      }
    }

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
      animationRefs.current = [];
    };
  }, [scrollTrigger.isAvailable, animations.fadeIn, animations.slideIn, animations.scaleIn, animations.parallax, animations.parallaxSpeed]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

/**
 * Hook for creating custom ScrollTrigger animations
 */
export function useScrollTriggerAnimation(
  elementRef: React.RefObject<HTMLElement>,
  config: {
    trigger?: string | Element;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    onUpdate?: (self: ScrollTriggerCallbackInstance) => void;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
    animation?: (target: Element) => void;
  }
) {
  const scrollTrigger = useScrollTrigger();
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (!scrollTrigger.isAvailable || !elementRef.current) return;

    const animation = scrollTrigger.createAnimation({
      trigger: config.trigger || elementRef.current,
      start: config.start || 'top center',
      end: config.end || 'bottom center',
      scrub: config.scrub || false,
      onUpdate: config.onUpdate,
      onEnter: config.onEnter,
      onLeave: config.onLeave,
      onEnterBack: config.onEnterBack,
      onLeaveBack: config.onLeaveBack,
      animation: config.animation,
    });

    animationRef.current = animation;

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, [scrollTrigger.isAvailable, elementRef, config.trigger, config.start, config.end, config.scrub, config.onUpdate, config.onEnter, config.onLeave, config.onEnterBack, config.onLeaveBack, config.animation]);

  return animationRef.current;
}

/**
 * Hook for creating ScrollTrigger timelines
 */
export function useScrollTriggerTimeline(
  elementRef: React.RefObject<HTMLElement>,
  config: {
    trigger?: string | Element;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    onUpdate?: (self: ScrollTriggerCallbackInstance) => void;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
  }
) {
  const scrollTrigger = useScrollTrigger();
  const timelineRef = useRef<any>(null);

  useEffect(() => {
    if (!scrollTrigger.isAvailable || !elementRef.current) return;

    const timeline = scrollTrigger.createTimeline({
      trigger: config.trigger || elementRef.current,
      start: config.start || 'top center',
      end: config.end || 'bottom center',
      scrub: config.scrub || false,
      onUpdate: config.onUpdate,
      onEnter: config.onEnter,
      onLeave: config.onLeave,
      onEnterBack: config.onEnterBack,
      onLeaveBack: config.onLeaveBack,
    });

    timelineRef.current = timeline;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [scrollTrigger.isAvailable, elementRef, config.trigger, config.start, config.end, config.scrub, config.onUpdate, config.onEnter, config.onLeave, config.onEnterBack, config.onLeaveBack]);

  return timelineRef.current;
}
