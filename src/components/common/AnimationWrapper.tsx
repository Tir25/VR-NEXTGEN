/**
 * Reusable Animation Wrapper Component
 * Provides consistent animation patterns for scroll-in effects and staggered animations
 */

import React, { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

export interface AnimationWrapperProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'none';
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  style?: React.CSSProperties;
  triggerOnce?: boolean;
  stagger?: boolean;
  staggerIndex?: number;
}

const animationClasses = {
  fadeIn: 'opacity-0 transition-opacity duration-700 ease-out',
  slideUp: 'opacity-0 translate-y-8 transition-[opacity,transform] duration-700 ease-out',
  slideDown: 'opacity-0 -translate-y-8 transition-[opacity,transform] duration-700 ease-out',
  slideLeft: 'opacity-0 translate-x-8 transition-[opacity,transform] duration-700 ease-out',
  slideRight: 'opacity-0 -translate-x-8 transition-[opacity,transform] duration-700 ease-out',
  scaleIn: 'opacity-0 scale-95 transition-[opacity,transform] duration-700 ease-out',
  none: '',
};

const animationActiveClasses = {
  fadeIn: 'opacity-100',
  slideUp: 'opacity-100 translate-y-0',
  slideDown: 'opacity-100 translate-y-0',
  slideLeft: 'opacity-100 translate-x-0',
  slideRight: 'opacity-100 translate-x-0',
  scaleIn: 'opacity-100 scale-100',
  none: '',
};

export default function AnimationWrapper({
  children,
  animation = 'fadeIn',
  delay = 0,
  // duration = 700,
  threshold = 0.1,
  rootMargin = '50px 0px',
  className = '',
  style = {},
  // triggerOnce = true,
  stagger = false,
  staggerIndex = 0,
}: AnimationWrapperProps) {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
  });

  const baseClass = animationClasses[animation];
  const activeClass = animationActiveClasses[animation];
  const staggerDelay = stagger ? staggerIndex * 100 : 0;
  const totalDelay = delay + staggerDelay;

  const animationStyle = {
    transitionDelay: inView ? `${totalDelay}ms` : '0ms',
    ...style,
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${baseClass} ${inView ? activeClass : ''} ${className}`}
      style={{
        ...animationStyle,
        willChange: inView ? 'auto' : 'transform, opacity', // Optimize performance
        backfaceVisibility: 'hidden', // Prevent flickering
      }}
    >
      {children}
    </div>
  );
}

// Convenience components for common animation patterns
export const FadeInWrapper = (props: Omit<AnimationWrapperProps, 'animation'>) => (
  <AnimationWrapper {...props} animation="fadeIn" />
);

export const SlideUpWrapper = (props: Omit<AnimationWrapperProps, 'animation'>) => (
  <AnimationWrapper {...props} animation="slideUp" />
);

export const SlideDownWrapper = (props: Omit<AnimationWrapperProps, 'animation'>) => (
  <AnimationWrapper {...props} animation="slideDown" />
);

export const ScaleInWrapper = (props: Omit<AnimationWrapperProps, 'animation'>) => (
  <AnimationWrapper {...props} animation="scaleIn" />
);

// Staggered animation wrapper for lists
export interface StaggeredWrapperProps extends Omit<AnimationWrapperProps, 'stagger' | 'staggerIndex' | 'children'> {
  items: ReactNode[];
  staggerDelay?: number;
}

export function StaggeredWrapper({
  items,
  staggerDelay = 100,
  animation = 'fadeIn',
  ...props
}: StaggeredWrapperProps) {
  return (
    <>
      {items.map((item, index) => (
        <AnimationWrapper
          key={index}
          {...props}
          animation={animation}
          stagger={true}
          staggerIndex={index}
          delay={staggerDelay * index}
        >
          {item}
        </AnimationWrapper>
      ))}
    </>
  );
}
