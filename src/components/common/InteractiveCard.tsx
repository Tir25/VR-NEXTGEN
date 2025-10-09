/**
 * InteractiveCard Component
 * A reusable, interactive card component with 3D tilt, hover effects, and accessibility features
 */

import React, { useRef, ReactNode } from 'react';
import { use3DTilt } from '@/hooks/use3DTilt';
import { useInView } from '@/hooks/useInView';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  backgroundImage?: string;
  isVisible?: boolean;
  onClick?: () => void;
  onMouseMove?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  ariaLabel?: string;
  tabIndex?: number;
  id?: string;
  style?: React.CSSProperties;
  overlayColor?: string;
  enableTilt?: boolean;
  enableHoverEffects?: boolean;
  enableInView?: boolean;
}

export default function InteractiveCard({
  children,
  className = '',
  backgroundImage,
  isVisible = true,
  onClick,
  onMouseMove,
  onMouseLeave,
  ariaLabel,
  tabIndex = 0,
  id,
  style = {},
  overlayColor = 'bg-black/60',
  enableTilt = true,
  enableHoverEffects = true,
  enableInView = true,
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const tiltHook = use3DTilt();
  const viewHook = useInView({ threshold: 0.1 });
  
  const tiltRef = enableTilt ? tiltHook.cardRef : { current: null };
  const tiltMouseMove = enableTilt ? tiltHook.onMouseMove : () => {};
  const tiltMouseLeave = enableTilt ? tiltHook.onMouseLeave : () => {};
  const viewRef = enableInView ? viewHook.ref : { current: null };

  // Combine refs for both hooks - Fixed ref assignment
  const combinedRef = (node: HTMLElement | null) => {
    if (node) {
      if (enableTilt) tiltRef.current = node as HTMLDivElement;
      if (enableInView) viewRef.current = node;
      cardRef.current = node;
    }
  };

  // Combine event handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (enableTilt) tiltMouseMove(e);
    if (onMouseMove) onMouseMove(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (enableTilt) tiltMouseLeave();
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <article
      ref={combinedRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative border border-gray-700 rounded-xl p-6 overflow-hidden focus-within:ring-2 focus-within:ring-gold/50 focus-within:ring-offset-2 ${
        enableTilt ? 'card-3d' : ''
      } ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
      style={{
        transformStyle: enableTilt ? 'preserve-3d' : undefined,
        willChange: enableTilt ? 'transform, box-shadow' : undefined,
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
        height: '100%',
        ...style
      }}
      role={onClick ? 'button' : 'article'}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
    >
      {/* Background image layer */}
      {backgroundImage && (
        <div
          className={`absolute inset-0 -z-10 bg-cover bg-center ${
            enableHoverEffects ? 'transition-transform duration-500 ease-out group-hover:scale-105 group-hover:brightness-110' : ''
          }`}
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
      )}
      
      {/* Readability overlay with hover easing */}
      <div className={`absolute inset-0 -z-0 ${overlayColor} ${
        enableHoverEffects ? 'transition-colors duration-300 group-hover:bg-black/40' : ''
      }`} />
      
      {/* Glow effect on hover */}
      {enableHoverEffects && (
        <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(255,215,0,0.35)]" />
      )}
      
      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Premium Feel: Gradient overlays and shadows */}
      {enableHoverEffects && (
        <>
          <div className="absolute inset-0 rounded-xl pointer-events-none bg-gold opacity-0 group-hover:opacity-5 active:opacity-5 transition-opacity duration-300" />
          <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-br from-gold/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </>
      )}
    </article>
  );
}
