import { useEffect, useState, useCallback } from "react";

export function useParallax(multiplier: number = 0.3) {
  const [offset, setOffset] = useState(0);

  // Throttled scroll handler for better performance
  const onScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const newOffset = scrollY * multiplier;
    
    // Only update if the change is significant enough to avoid excessive re-renders
    setOffset(prevOffset => {
      const diff = Math.abs(newOffset - prevOffset);
      return diff > 0.5 ? newOffset : prevOffset;
    });
  }, [multiplier]);

  useEffect(() => {
    // Initial calculation
    onScroll();
    
    // Add scroll listener with passive flag for better performance
    window.addEventListener("scroll", onScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return offset;
}
