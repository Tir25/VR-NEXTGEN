/**
 * FloatingElements Component
 * A reusable component for creating decorative floating elements
 */

import React from 'react';

export interface FloatingElement {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  position: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  color?: string;
  delay?: number;
  duration?: number;
}

interface FloatingElementsProps {
  elements?: FloatingElement[];
  className?: string;
}

export default function FloatingElements({
  elements = [
    { size: 'sm', position: { top: '20px', left: '10px' }, delay: 0 },
    { size: 'xs', position: { top: '40px', right: '20px' }, delay: 1000 },
    { size: 'md', position: { bottom: '40px', left: '20px' }, delay: 2000 },
    { size: 'sm', position: { bottom: '20px', right: '10px' }, delay: 500 },
  ],
  className = '',
}: FloatingElementsProps) {
  // Size mappings
  const sizeClasses = {
    xs: 'w-1 h-1',
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {elements.map((element, index) => {
        const size = element.size || 'sm';
        const color = element.color || 'bg-gold/30';
        const delay = element.delay || 0;
        const duration = element.duration || 6;
        
        return (
          <div
            key={index}
            className={`floating-element absolute ${sizeClasses[size]} ${color} rounded-full animate-pulse`}
            style={{
              ...element.position,
              animationDelay: `${delay}ms`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
      
      <style jsx>{`
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
