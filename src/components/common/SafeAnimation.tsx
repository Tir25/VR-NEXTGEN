/**
 * Safe Animation Component
 * Provides error-safe animations with fallbacks for unsupported browsers
 */

import React, { ReactNode, useState, useEffect, useCallback } from 'react';
import AnimationWrapper from './AnimationWrapper';
import { AnimationCompatible } from './BrowserCompatibility';
import SafeWrapper from './SafeWrapper';
import { errorHandler } from '@/utils/errorHandling';

export interface SafeAnimationProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'none';
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  style?: React.CSSProperties;
  stagger?: boolean;
  staggerIndex?: number;
  fallback?: ReactNode;
  onError?: (error: Error) => void;
  // Animation-specific options
  duration?: number;
  easing?: string;
  // Browser compatibility options
  requireAnimations?: boolean;
  fallbackToStatic?: boolean;
}

export default function SafeAnimation({
  children,
  animation = 'fadeIn',
  delay = 0,
  threshold = 0.1,
  rootMargin = '50px 0px',
  className = '',
  style = {},
  stagger = false,
  staggerIndex = 0,
  fallback,
  onError,
  // duration = 700,
  // easing = 'ease-out',
  requireAnimations = true,
  fallbackToStatic = true,
}: SafeAnimationProps) {
  const [hasError, setHasError] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  // const animationRef = useRef<HTMLDivElement>(null);

  const handleAnimationError = useCallback(
    (error: Error) => {
      const appError = errorHandler.createError(error.message, 'ANIMATION_ERROR', 500, {
        component: 'SafeAnimation',
        animation,
        delay,
        threshold,
      });

      errorHandler.handleError(appError);
      setHasError(true);

      if (onError) {
        onError(appError);
      }
    },
    [animation, delay, threshold, onError]
  );

  useEffect(() => {
    // Check if animations are supported
    const checkAnimationSupport = () => {
      try {
        const testEl = document.createElement('div');
        const style = testEl.style;

        // Check for CSS animations and transforms support
        const supportsAnimations = !!(
          style.animation !== undefined || style.webkitAnimation !== undefined
        );
        const supportsTransforms = !!(
          style.transform !== undefined || style.webkitTransform !== undefined
        );

        return supportsAnimations && supportsTransforms;
      } catch (error) {
        handleAnimationError(error as Error);
        return false;
      }
    };

    const animationSupported = checkAnimationSupport();

    if (!animationSupported && requireAnimations) {
      if (fallbackToStatic) {
        // Provide static fallback without animations
        setIsAnimating(true);
      } else {
        handleAnimationError(new Error('Animation not supported in this browser'));
      }
    } else {
      setIsAnimating(true);
    }
  }, [animation, requireAnimations, fallbackToStatic, handleAnimationError]);

  // Handle animation errors gracefully
  // const handleAnimationStart = () => {
  //   try {
  //     setIsAnimating(true);
  //   } catch (error) {
  //     handleAnimationError(error as Error);
  //   }
  // };

  // const handleAnimationEnd = () => {
  //   try {
  //     // Animation completed successfully
  //   } catch (error) {
  //     handleAnimationError(error as Error);
  //   }
  // };

  // If there's an error, show fallback
  if (hasError) {
    if (fallback) {
      return <div className={className}>{fallback}</div>;
    }

    return (
      <div className={`safe-animation-error ${className}`}>
        <div className='text-center p-4 bg-gray-50 border border-gray-200 rounded-lg'>
          <p className='text-sm text-gray-600'>Animation unavailable - showing static content</p>
          {children}
        </div>
      </div>
    );
  }

  // If animations are not supported and we should fallback to static
  if (!requireAnimations || !isAnimating) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  // Wrap in browser compatibility check
  const AnimationContent = (
    <SafeWrapper isolate={true} onError={handleAnimationError}>
      <AnimationWrapper
        animation={animation}
        delay={delay}
        threshold={threshold}
        rootMargin={rootMargin}
        className={className}
        style={style}
        stagger={stagger}
        staggerIndex={staggerIndex}
      >
        {children}
      </AnimationWrapper>
    </SafeWrapper>
  );

  // If we require animations, wrap in compatibility check
  if (requireAnimations) {
    return (
      <AnimationCompatible
        fallback={
          fallbackToStatic ? (
            <div className={className} style={style}>
              {children}
            </div>
          ) : (
            fallback
          )
        }
      >
        {AnimationContent}
      </AnimationCompatible>
    );
  }

  return AnimationContent;
}

// Convenience components for specific animation types
export const SafeFadeIn = (props: Omit<SafeAnimationProps, 'animation'>) => (
  <SafeAnimation {...props} animation='fadeIn' />
);

export const SafeSlideUp = (props: Omit<SafeAnimationProps, 'animation'>) => (
  <SafeAnimation {...props} animation='slideUp' />
);

export const SafeSlideDown = (props: Omit<SafeAnimationProps, 'animation'>) => (
  <SafeAnimation {...props} animation='slideDown' />
);

export const SafeScaleIn = (props: Omit<SafeAnimationProps, 'animation'>) => (
  <SafeAnimation {...props} animation='scaleIn' />
);

// Component for animations that should always fallback to static
export const SafeStaticAnimation = (props: Omit<SafeAnimationProps, 'fallbackToStatic'>) => (
  <SafeAnimation {...props} fallbackToStatic={true} requireAnimations={false} />
);
