/**
 * TypewriterText Component
 * A reusable component for displaying text with a typewriter effect
 */

import React from 'react';
import useTypewriter from '@/hooks/useTypewriter';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  startDelay?: number;
  showCursorAfterComplete?: boolean;
  cursorBlinkSpeed?: number;
  onComplete?: () => void;
  className?: string;
  cursorClassName?: string;
  cursorHeight?: string;
  as?: React.ElementType;
}

export default function TypewriterText({
  text,
  speed = 80,
  startDelay = 500,
  showCursorAfterComplete = false,
  cursorBlinkSpeed = 500,
  onComplete,
  className = '',
  cursorClassName = '',
  cursorHeight = 'h-8 md:h-10 lg:h-12',
  as: Component = 'div'
}: TypewriterTextProps) {
  const { currentText, showCursor } = useTypewriter({
    text,
    speed,
    startDelay,
    showCursorAfterComplete,
    cursorBlinkSpeed,
    onComplete
  });

  return (
    <Component className={className}>
      {currentText}
      <span 
        className={`inline-block w-0.5 ${cursorHeight} bg-gold ml-1 transition-opacity duration-100 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        } ${cursorClassName}`} 
        aria-hidden="true"
      />
    </Component>
  );
}
