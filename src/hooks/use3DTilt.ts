import { useRef, useCallback } from 'react';

interface Use3DTiltOptions {
  /** Maximum tilt angle in degrees (default: 10) */
  maxTilt?: number;
  /** Whether to enable the effect (default: true) */
  enabled?: boolean;
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
  enabled = true
}: Use3DTiltOptions = {}) {
  const cardRef = useRef<T>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<T>) => {
    if (!enabled || !cardRef.current) return;

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
    
    // Apply 3D transform with perspective
    card.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateZ(10px)
    `;
    
    // Add dynamic shadow based on tilt
    const shadowX = Math.round((rotateY / maxTilt) * 20);
    const shadowY = Math.round((rotateX / maxTilt) * 20);
    card.style.boxShadow = `
      ${shadowX}px ${shadowY}px 40px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(255, 215, 0, 0.1)
    `;
  }, [enabled, maxTilt]);

  const handleMouseLeave = useCallback(() => {
    if (!enabled || !cardRef.current) return;

    const card = cardRef.current;
    
    // Reset transform and shadow
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    card.style.boxShadow = '';
  }, [enabled]);

  return {
    cardRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave
  };
}
