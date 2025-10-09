/**
 * useTypewriter Hook
 * A reusable hook for creating typewriter effects with customizable options
 */

import { useState, useEffect, useRef } from 'react';

interface TypewriterOptions {
  text: string;
  speed?: number;
  startDelay?: number;
  showCursorAfterComplete?: boolean;
  cursorBlinkSpeed?: number;
  onComplete?: () => void;
}

interface TypewriterResult {
  currentText: string;
  showCursor: boolean;
  isComplete: boolean;
}

export default function useTypewriter({
  text,
  speed = 80,
  startDelay = 500,
  showCursorAfterComplete = false,
  cursorBlinkSpeed = 500,
  onComplete
}: TypewriterOptions): TypewriterResult {
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const hasTypedRef = useRef(false);

  // Typewriter effect
  useEffect(() => {
    // Only run the typewriter effect once
    if (hasTypedRef.current) return;
    
    let currentIndex = 0;
    
    const typeWriter = () => {
      if (currentIndex < text.length) {
        setCurrentText(text.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWriter, speed);
      } else {
        // Text is fully typed, mark as completed
        hasTypedRef.current = true;
        setIsComplete(true);
        
        // Call onComplete callback if provided
        if (onComplete) onComplete();
        
        // Stop the cursor blinking after a delay if not showing cursor after complete
        if (!showCursorAfterComplete) {
          setTimeout(() => {
            setShowCursor(false);
          }, 1000);
        }
      }
    };

    // Start typewriter effect after component mounts with delay
    const timer = setTimeout(() => {
      typeWriter();
    }, startDelay);

    return () => clearTimeout(timer);
  }, [text, speed, startDelay, showCursorAfterComplete, onComplete]);

  // Cursor blink effect
  useEffect(() => {
    // Don't blink if we're not showing cursor
    if (isComplete && !showCursorAfterComplete) {
      setShowCursor(false);
      return;
    }
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorInterval);
  }, [isComplete, showCursorAfterComplete, cursorBlinkSpeed]);

  return {
    currentText,
    showCursor,
    isComplete
  };
}
