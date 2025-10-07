import { useEffect, useState } from "react";
import { ANIMATION_CONSTANTS } from '@/config';

export function useCountUp(end: number, duration: number = ANIMATION_CONSTANTS.COUNT_UP_DURATION, start: number = 0) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (count === end) return;
    
    setIsAnimating(true);
    const increment = (end - start) / (duration / ANIMATION_CONSTANTS.COUNT_UP_INTERVAL);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        setIsAnimating(false);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, ANIMATION_CONSTANTS.COUNT_UP_INTERVAL);
    
    return () => clearInterval(timer);
  }, [end, duration, start, count]);

  return { count, isAnimating };
}
