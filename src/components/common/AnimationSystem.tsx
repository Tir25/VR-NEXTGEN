/**
 * AnimationSystem Component
 * Centralized animation management with performance optimization
 * Provides consistent timing, easing, and hardware acceleration
 */

import React, { useRef, useEffect, useState, useCallback, ReactNode } from 'react';

interface AnimationConfig {
  /** Animation duration in milliseconds */
  duration: number;
  /** Animation delay in milliseconds */
  delay?: number;
  /** Easing function */
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'cubic-bezier';
  /** Animation iteration count */
  iterationCount?: number | 'infinite';
  /** Animation direction */
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  /** Animation fill mode */
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  /** Custom cubic-bezier values */
  cubicBezier?: [number, number, number, number];
}

interface AnimationSystemProps {
  /** Animation type */
  type: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'rotateIn' | 'custom';
  /** Animation configuration */
  config?: AnimationConfig;
  /** Children to animate */
  children: ReactNode;
  /** Trigger animation on mount */
  triggerOnMount?: boolean;
  /** Trigger animation when in view */
  triggerOnView?: boolean;
  /** Custom animation keyframes */
  customKeyframes?: Keyframe[];
  /** Custom className */
  className?: string;
  /** Animation state callback */
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
}

// Predefined animation keyframes
const ANIMATION_KEYFRAMES = {
  fadeIn: [
    { opacity: 0 },
    { opacity: 1 }
  ],
  slideUp: [
    { opacity: 0, transform: 'translateY(30px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ],
  slideDown: [
    { opacity: 0, transform: 'translateY(-30px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ],
  slideLeft: [
    { opacity: 0, transform: 'translateX(30px)' },
    { opacity: 1, transform: 'translateX(0)' }
  ],
  slideRight: [
    { opacity: 0, transform: 'translateX(-30px)' },
    { opacity: 1, transform: 'translateX(0)' }
  ],
  scaleIn: [
    { opacity: 0, transform: 'scale(0.9)' },
    { opacity: 1, transform: 'scale(1)' }
  ],
  rotateIn: [
    { opacity: 0, transform: 'rotate(-10deg) scale(0.9)' },
    { opacity: 1, transform: 'rotate(0deg) scale(1)' }
  ]
} as const;

// Easing functions
const EASING_FUNCTIONS = {
  'ease': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  'ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
  'ease-out': 'cubic-bezier(0, 0, 0.58, 1)',
  'ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
  'linear': 'linear',
  'cubic-bezier': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
} as const;

export default function AnimationSystem({
  type,
  config = { duration: 500 },
  children,
  triggerOnMount = true,
  triggerOnView = false,
  customKeyframes,
  className = '',
  onAnimationStart,
  onAnimationEnd
}: AnimationSystemProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = useCallback(() => {
    if (!elementRef.current) return;

    setIsAnimating(true);
    onAnimationStart?.();

    // Get keyframes
    const keyframes = customKeyframes || (type !== 'custom' ? ANIMATION_KEYFRAMES[type] : null);
    if (!keyframes) return;

    // Get easing function
    let easing: string = EASING_FUNCTIONS[config.easing || 'ease'];
    if (config.easing === 'cubic-bezier' && config.cubicBezier) {
      easing = `cubic-bezier(${config.cubicBezier.join(', ')})`;
    }

    // Create animation options
    const animationOptions: KeyframeAnimationOptions = {
      duration: config.duration,
      delay: config.delay || 0,
      easing,
      iterations: config.iterationCount === 'infinite' ? Infinity : (config.iterationCount || 1),
      direction: config.direction || 'normal',
      fill: config.fillMode || 'both'
    };

    // Create and start animation
    const animation = elementRef.current.animate(keyframes as Keyframe[], animationOptions);
    animationRef.current = animation;

    // Handle animation end
    animation.addEventListener('finish', () => {
      setIsAnimating(false);
      onAnimationEnd?.();
    });

    // Handle animation cancel
    animation.addEventListener('cancel', () => {
      setIsAnimating(false);
    });
  }, [elementRef, onAnimationStart, onAnimationEnd, customKeyframes, type, config]);

  // Intersection Observer for viewport detection
  useEffect(() => {
    if (!triggerOnView || !elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [triggerOnView, isVisible]);

  // Animation trigger
  useEffect(() => {
    const shouldAnimate = (triggerOnMount && !triggerOnView) || (triggerOnView && isVisible);
    
    if (shouldAnimate && !isAnimating && elementRef.current) {
      triggerAnimation();
    }
  }, [triggerOnMount, triggerOnView, isVisible, isAnimating, triggerAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.cancel();
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`animation-system ${className}`}
      style={{
        willChange: isAnimating ? 'transform, opacity' : 'auto'
      }}
    >
      {children}
    </div>
  );
}

// Staggered animation wrapper
interface StaggeredAnimationProps {
  /** Array of items to animate */
  items: ReactNode[];
  /** Animation type */
  animationType?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'rotateIn';
  /** Stagger delay between items */
  staggerDelay?: number;
  /** Animation configuration */
  config?: AnimationConfig;
  /** Custom className */
  className?: string;
  /** Trigger on view */
  triggerOnView?: boolean;
}

export function StaggeredAnimation({
  items,
  animationType = 'slideUp',
  staggerDelay = 100,
  config = { duration: 500 },
  className = '',
  triggerOnView = true
}: StaggeredAnimationProps) {
  return (
    <div className={`staggered-animation ${className}`}>
      {items.map((item, index) => (
        <AnimationSystem
          key={index}
          type={animationType}
          config={{
            ...config,
            delay: config.delay ? config.delay + (index * staggerDelay) : index * staggerDelay
          }}
          triggerOnMount={false}
          triggerOnView={triggerOnView}
        >
          {item}
        </AnimationSystem>
      ))}
    </div>
  );
}

// Animation presets for common use cases
export const AnimationPresets = {
  // Hero animations
  heroFadeIn: {
    type: 'fadeIn' as const,
    config: { duration: 800, easing: 'ease-out' }
  },
  heroSlideUp: {
    type: 'slideUp' as const,
    config: { duration: 600, easing: 'ease-out' }
  },
  
  // Card animations
  cardScaleIn: {
    type: 'scaleIn' as const,
    config: { duration: 400, easing: 'ease-out' }
  },
  cardSlideUp: {
    type: 'slideUp' as const,
    config: { duration: 500, easing: 'ease-out' }
  },
  
  // Navigation animations
  navSlideDown: {
    type: 'slideDown' as const,
    config: { duration: 300, easing: 'ease-out' }
  },
  
  // Button animations
  buttonScaleIn: {
    type: 'scaleIn' as const,
    config: { duration: 200, easing: 'ease-out' }
  }
} as const;
