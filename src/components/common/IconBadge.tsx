/**
 * IconBadge Component
 * A reusable component for displaying icons with various visual enhancements
 */

import React, { ReactNode } from 'react';

interface IconBadgeProps {
  icon: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  enhanceMobile?: boolean;
  animatePulse?: boolean;
  showShimmer?: boolean;
}

export default function IconBadge({
  icon,
  size = 'md',
  className = '',
  enhanceMobile = true,
  animatePulse = true,
  showShimmer = true,
}: IconBadgeProps) {
  // Size mappings
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24',
  };

  // Animation classes
  const animationClass = animatePulse ? 'animate-pulse md:animate-none' : '';
  
  return (
    <div className="flex justify-center mb-6">
      <div
        className={`relative ${sizeClasses[size]} flex items-center justify-center rounded-full 
          bg-gradient-to-br from-gold/20 to-gold/30 text-gold transition-all duration-300 
          group-hover:scale-110 group-hover:shadow-lg group-hover:from-gold/30 group-hover:to-gold/40 
          shadow-[0_0_18px_rgba(255,215,0,0.45)] ring-2 ring-gold/30 md:ring-gold/20 
          ${animationClass} ${className}`}
        aria-hidden="true"
      >
        {/* Subtle shimmer overlay for mobile visibility */}
        {showShimmer && enhanceMobile && (
          <span
            className="pointer-events-none absolute inset-0 rounded-full 
              bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.35),transparent_60%)] 
              opacity-80 md:opacity-0"
          />
        )}
        {icon}
      </div>
    </div>
  );
}
