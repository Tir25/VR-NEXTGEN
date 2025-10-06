import { useEffect, useState, useCallback } from "react";

export function useScrollFade() {
  const [opacity, setOpacity] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Calculate opacity based on scroll position
    // Start fading out when user scrolls down, fade in when scrolling up
    let newOpacity = 1;
    
    if (scrollY > 0) {
      // Fade out as user scrolls down
      newOpacity = Math.max(0, 1 - (scrollY / (windowHeight * 0.5)));
    }
    
    // Update opacity with smooth transition
    setOpacity(newOpacity);
    setIsVisible(newOpacity > 0.1);
  }, []);

  useEffect(() => {
    // Initial calculation
    handleScroll();
    
    // Add scroll listener with passive flag for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return { opacity, isVisible };
}
