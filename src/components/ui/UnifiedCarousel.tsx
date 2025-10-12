/**
 * UnifiedCarousel Component
 * A comprehensive, accessible, and performant carousel system that consolidates
 * all carousel functionality into a single, well-tested component.
 * 
 * Features:
 * - Full accessibility support (WCAG 2.1 AA)
 * - Memory leak prevention with proper cleanup
 * - Mobile-optimized touch handling
 * - TypeScript type safety
 * - Performance optimizations
 * - Unified configuration system
 */

import React, { useRef, useState, useEffect, useCallback, memo, useMemo } from 'react';
import { useInView } from '@/hooks/useInView';
import type {
  CarouselItem,
  CarouselConfig,
  UnifiedCarouselProps,
  UseCarouselReturn,
} from '@/types/carousel';

// Default configuration
const DEFAULT_CONFIG: Required<CarouselConfig> = {
  autoRotate: false,
  autoRotateInterval: 5000,
  pauseOnHover: true,
  pauseOnFocus: true,
  enableKeyboard: true,
  enableTouch: true,
  enableMouse: true,
  swipeThreshold: 50,
  animationDuration: 300,
  easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  enableSmoothScrolling: true,
  itemsPerView: 1,
  spacing: 16,
  centerMode: false,
  announceChanges: true,
  ariaLabel: 'Carousel',
  ariaLive: 'polite',
};

// Hook for carousel logic
function useCarousel(
  items: CarouselItem[],
  config: Required<CarouselConfig>,
  onIndexChange?: (index: number) => void
): UseCarouselReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef(false);
  const startTimeRef = useRef(0);

  // Cleanup function for auto-rotation
  const clearAutoRotate = useCallback(() => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = null;
    }
  }, []);

  // Start auto-rotation
  const startAutoRotate = useCallback(() => {
    if (!config.autoRotate || isPaused || isDraggingRef.current) return;
    
    clearAutoRotate();
    autoRotateRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, config.autoRotateInterval);
  }, [config.autoRotate, config.autoRotateInterval, isPaused, clearAutoRotate, items.length]);

  // Navigate to specific index
  const goToIndex = useCallback((index: number, animate: boolean = true) => {
    if (index === currentIndex || isTransitioning) return;
    
    const normalizedIndex = ((index % items.length) + items.length) % items.length;
    
    if (animate) {
      setIsTransitioning(true);
      setCurrentIndex(normalizedIndex);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, config.animationDuration);
    } else {
      setCurrentIndex(normalizedIndex);
    }
    
    onIndexChange?.(normalizedIndex);
  }, [currentIndex, isTransitioning, items.length, config.animationDuration, onIndexChange]);

  // Navigate to next item
  const next = useCallback(() => {
    goToIndex(currentIndex + 1);
  }, [currentIndex, goToIndex]);

  // Navigate to previous item
  const prev = useCallback(() => {
    goToIndex(currentIndex - 1);
  }, [currentIndex, goToIndex]);

  // Handle touch start
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!config.enableTouch) return;
    
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    isDraggingRef.current = true;
    startTimeRef.current = Date.now();
    
    if (config.pauseOnHover) {
      setIsPaused(true);
    }
  }, [config.enableTouch, config.pauseOnHover]);

  // Handle touch move
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStart || !config.enableTouch) return;
    
    e.preventDefault();
  }, [touchStart, config.enableTouch]);

  // Handle touch end
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart || !config.enableTouch) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const deltaTime = Date.now() - startTimeRef.current;
    
    // Determine if it's a swipe
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > config.swipeThreshold && deltaTime < 500) {
      if (deltaX > 0) {
        prev();
      } else {
        next();
      }
    }
    
    setTouchStart(null);
    isDraggingRef.current = false;
    
    if (config.pauseOnHover) {
      setIsPaused(false);
    }
  }, [touchStart, config.enableTouch, config.swipeThreshold, config.pauseOnHover, prev, next]);

  // Handle mouse events
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!config.enableMouse) return;
    
    setTouchStart({ x: e.clientX, y: e.clientY });
    isDraggingRef.current = true;
    startTimeRef.current = Date.now();
    
    if (config.pauseOnHover) {
      setIsPaused(true);
    }
  }, [config.enableMouse, config.pauseOnHover]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (!touchStart || !config.enableMouse) return;
    
    const deltaX = e.clientX - touchStart.x;
    const deltaY = e.clientY - touchStart.y;
    const deltaTime = Date.now() - startTimeRef.current;
    
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > config.swipeThreshold && deltaTime < 500) {
      if (deltaX > 0) {
        prev();
      } else {
        next();
      }
    }
    
    setTouchStart(null);
    isDraggingRef.current = false;
    
    if (config.pauseOnHover) {
      setIsPaused(false);
    }
  }, [touchStart, config.enableMouse, config.swipeThreshold, config.pauseOnHover, prev, next]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!config.enableKeyboard || isDraggingRef.current) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        prev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        next();
        break;
      case 'Home':
        e.preventDefault();
        goToIndex(0);
        break;
      case 'End':
        e.preventDefault();
        goToIndex(items.length - 1);
        break;
    }
  }, [config.enableKeyboard, prev, next, goToIndex, items.length]);

  // Setup and cleanup
  useEffect(() => {
    if (config.autoRotate) {
      startAutoRotate();
    }
    
    if (config.enableKeyboard) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      clearAutoRotate();
      if (config.enableKeyboard) {
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [config.autoRotate, config.enableKeyboard, startAutoRotate, clearAutoRotate, handleKeyDown]);

  // Restart auto-rotation when paused state changes
  useEffect(() => {
    if (config.autoRotate && !isPaused && !isDraggingRef.current) {
      startAutoRotate();
    } else {
      clearAutoRotate();
    }
  }, [config.autoRotate, isPaused, startAutoRotate, clearAutoRotate]);

  return {
    currentIndex,
    isTransitioning,
    goToIndex,
    next,
    prev,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseUp,
  };
}

// Main component
const UnifiedCarousel = memo<UnifiedCarouselProps>(({
  items,
  config: userConfig = {},
  className = '',
  onItemSelect,
  onIndexChange,
}) => {
  // Merge user config with defaults
  const config = useMemo(() => ({ ...DEFAULT_CONFIG, ...userConfig }), [userConfig]);
  
  // Intersection observer for lazy loading
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>({
    threshold: 0.1,
  });
  
  // Carousel logic
  const {
    currentIndex,
    isTransitioning,
    goToIndex,
    next,
    prev,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseUp,
  } = useCarousel(items, config, onIndexChange);

  // Handle item selection
  const handleItemClick = useCallback((item: CarouselItem, index: number) => {
    if (index !== currentIndex) {
      goToIndex(index);
    }
    onItemSelect?.(item, index);
  }, [currentIndex, goToIndex, onItemSelect]);

  // Memoized items for performance
  const memoizedItems = useMemo(() => items, [items]);

  if (!memoizedItems.length) {
    return null;
  }

  return (
    <div
      ref={inViewRef}
      className={`unified-carousel ${className}`}
      role="region"
      aria-label={config.ariaLabel}
      aria-live={config.ariaLive}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        '--carousel-animation-duration': `${config.animationDuration}ms`,
        '--carousel-easing': config.easing,
        '--carousel-spacing': `${config.spacing}px`,
      } as React.CSSProperties}
    >
      {/* Carousel container */}
      <div
        className="carousel-container"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? `transform ${config.animationDuration}ms ${config.easing}` : 'none',
        }}
      >
        {memoizedItems.map((item, index) => (
          <div
            key={item.id}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
            role="tabpanel"
            aria-hidden={index !== currentIndex}
            tabIndex={index === currentIndex ? 0 : -1}
            onClick={() => handleItemClick(item, index)}
            style={{
              width: config.itemsPerView === 'auto' ? 'auto' : `${100 / (config.itemsPerView as number)}%`,
              paddingRight: index < memoizedItems.length - 1 ? `${config.spacing}px` : '0',
            }}
          >
            {inView && item.content}
          </div>
        ))}
      </div>

      {/* Navigation indicators */}
      {memoizedItems.length > 1 && (
        <div className="carousel-indicators" role="tablist" aria-label="Carousel navigation">
          {memoizedItems.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              role="tab"
              aria-label={`Go to item ${index + 1}`}
              aria-selected={index === currentIndex}
              onClick={() => goToIndex(index)}
              disabled={isTransitioning}
            />
          ))}
        </div>
      )}

      {/* Navigation buttons */}
      {memoizedItems.length > 1 && (
        <>
          <button
            className="carousel-nav carousel-nav-prev"
            aria-label="Previous item"
            onClick={prev}
            disabled={isTransitioning}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6" />
            </svg>
          </button>
          <button
            className="carousel-nav carousel-nav-next"
            aria-label="Next item"
            onClick={next}
            disabled={isTransitioning}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </button>
        </>
      )}

      {/* Screen reader announcements */}
      {config.announceChanges && (
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {`Item ${currentIndex + 1} of ${memoizedItems.length}`}
        </div>
      )}
    </div>
  );
});

UnifiedCarousel.displayName = 'UnifiedCarousel';

export default UnifiedCarousel;
