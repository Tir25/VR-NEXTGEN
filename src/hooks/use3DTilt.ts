import { useRef, useCallback, useState, useEffect } from 'react';
import { errorHandler } from '@/utils/errorHandling';

interface Use3DTiltOptions {
  /** Maximum tilt angle in degrees (default: 10) */
  maxTilt?: number;
  /** Whether to enable the effect (default: true) */
  enabled?: boolean;
  /** Whether to check for CSS transform support (default: true) */
  checkSupport?: boolean;
}

/**
 * Custom hook for creating 3D tilt hover effects on card components
 * Provides smooth, premium 3D rotation based on mouse position
 *
 * @param options Configuration options for the 3D tilt effect
 * @returns Ref to attach to the card element and event handlers
 */
export function use3DTilt<T extends HTMLElement = HTMLDivElement>({
  maxTilt = 10,
  enabled = true,
  checkSupport = true,
}: Use3DTiltOptions = {}) {
  const cardRef = useRef<T>(null);
  const [hasError, setHasError] = useState(false);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  // Check CSS transform support
  const checkTransformSupport = useCallback(() => {
    if (!checkSupport) return true;

    try {
      const testEl = document.createElement('div');
      const style = testEl.style;
      const supportsTransform = !!(
        style.transform !== undefined || style.webkitTransform !== undefined
      );
      const supportsPerspective = !!(
        style.perspective !== undefined || style.webkitPerspective !== undefined
      );

      return supportsTransform && supportsPerspective;
    } catch (error) {
      const appError = errorHandler.createError(
        (error as Error).message,
        'CSS_SUPPORT_CHECK_ERROR',
        500,
        {
          component: 'use3DTilt',
          action: 'transform_support_check',
        }
      );
      errorHandler.handleError(appError);
      return false;
    }
  }, [checkSupport]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (!enabled || !cardRef.current || hasError) return;

      try {
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();

        // Calculate mouse position relative to card center
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation angles (inverted Y for natural feel)
        const rotateX = ((y - centerY) / centerY) * maxTilt;
        const rotateY = ((centerX - x) / centerX) * maxTilt;

        // Clamp rotation values to prevent extreme angles
        const clampedRotateX = Math.max(-maxTilt, Math.min(maxTilt, rotateX));
        const clampedRotateY = Math.max(-maxTilt, Math.min(maxTilt, rotateY));

        // Apply 3D transform with perspective - Hardware accelerated
        card.style.transform = `
        perspective(1000px) 
        rotateX(${clampedRotateX}deg) 
        rotateY(${clampedRotateY}deg) 
        translateZ(10px)
      `;

        // Add dynamic shadow based on tilt - Optimized calculation
        const shadowIntensity = Math.min(
          Math.abs(clampedRotateX) + Math.abs(clampedRotateY),
          maxTilt * 2
        );
        const shadowX = Math.round((clampedRotateY / maxTilt) * 15);
        const shadowY = Math.round((clampedRotateX / maxTilt) * 15);
        card.style.boxShadow = `
        ${shadowX}px ${shadowY}px ${20 + shadowIntensity}px rgba(0, 0, 0, 0.3),
        0 0 ${10 + shadowIntensity}px rgba(255, 215, 0, 0.1)
      `;

        // Disable CSS transitions during 3D tilt for optimal performance
        card.style.transition = 'none';
      } catch (error) {
        // Error handled gracefully - 3D tilt disabled
        setHasError(true);
      }
    },
    [enabled, maxTilt, hasError]
  );

  const handleMouseLeave = useCallback(() => {
    if (!enabled || !cardRef.current || hasError) return;

    try {
      const card = cardRef.current;

      // Reset transform and shadow with smooth transition
      card.style.transition =
        'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      card.style.boxShadow = '';

      // Reset will-change for performance after transition
      setTimeout(() => {
        if (card.style.transition) {
          card.style.willChange = 'auto';
        }
      }, 300);
    } catch (error) {
      // Error handled gracefully - 3D tilt disabled
      setHasError(true);
    }
  }, [enabled, hasError]);

  // Check support on mount
  useEffect(() => {
    const supported = checkTransformSupport();
    setIsSupported(supported);

    if (!supported && checkSupport) {
      // 3D transforms not supported - fallback gracefully
    } else {
      // 3D tilt effect enabled
    }
  }, [checkTransformSupport, checkSupport, maxTilt]);

  return {
    cardRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    hasError,
    isSupported: isSupported ?? true,
    isEnabled: enabled && !hasError && (isSupported ?? true),
  };
}
