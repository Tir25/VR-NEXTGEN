import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { useScrollAnimation, scrollAnimationPresets } from '@/hooks/useScrollAnimation';

interface ScrollRevealProps extends Omit<MotionProps, 'variants' | 'initial' | 'animate'> {
  children: ReactNode;
  /** Animation preset or custom options */
  preset?: keyof typeof scrollAnimationPresets;
  /** Custom animation options */
  animationOptions?: {
    threshold?: number;
    delay?: number;
    duration?: number;
    rootMargin?: string;
  };
  /** Custom className for styling */
  className?: string;
  /** Whether to trigger animation only once */
  triggerOnce?: boolean;
}

/**
 * ScrollReveal component for consistent scroll-based animations
 * Provides fade-in + slide-up effects with accessibility support
 */
export default function ScrollReveal({
  children,
  preset = 'standard',
  animationOptions,
  className = '',
  triggerOnce = true,
  ...motionProps
}: ScrollRevealProps) {
  const options = animationOptions || scrollAnimationPresets[preset];
  
  const { ref, controls, variants } = useScrollAnimation({
    ...options,
    triggerOnce
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      data-scroll-animation
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered animation wrapper for multiple elements
 */
interface StaggeredRevealProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggeredReveal({ 
  children, 
  staggerDelay = 100, 
  className = '' 
}: StaggeredRevealProps) {
  const { ref, controls, variants } = useScrollAnimation({
    ...scrollAnimationPresets.staggered,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      data-scroll-animation
    >
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay / 1000
            }
          }
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/**
 * Animation variants for staggered children
 */
export const staggerChildrenVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};
