/**
 * Carousel Component
 * Reusable and robust carousel system with configurable behavior
 * Handles touch, mouse, and keyboard interactions
 */

import React, { useRef, useState, useEffect, useCallback, ReactNode } from 'react';

interface CarouselProps {
  /** Array of items to display */
  items: ReactNode[];
  /** Current active index */
  activeIndex: number;
  /** Callback when index changes */
  onIndexChange: (index: number) => void;
  /** Carousel configuration */
  config?: {
    /** Auto-rotate interval in ms (0 to disable) */
    autoRotate?: number;
    /** Rotation speed multiplier */
    rotationSpeed?: number;
    /** Swipe threshold for navigation */
    swipeThreshold?: number;
    /** Animation duration in ms */
    animationDuration?: number;
    /** Enable keyboard navigation */
    enableKeyboard?: boolean;
    /** Enable touch/mouse drag */
    enableDrag?: boolean;
    /** Enable auto-rotation */
    enableAutoRotate?: boolean;
  };
  /** Custom className */
  className?: string;
  /** Children render function */
  children: (item: ReactNode, index: number, isActive: boolean) => ReactNode;
}

interface CarouselState {
  isDragging: boolean;
  startX: number;
  isRotating: boolean;
  dragOffset: number;
}

const DEFAULT_CONFIG = {
  autoRotate: 5000,
  rotationSpeed: 0.5,
  swipeThreshold: 50,
  animationDuration: 500,
  enableKeyboard: true,
  enableDrag: true,
  enableAutoRotate: false
};

export default function Carousel({
  items,
  activeIndex,
  onIndexChange,
  config = {},
  className = '',
  children
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);
  
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  const [state, setState] = useState<CarouselState>({
    isDragging: false,
    startX: 0,
    isRotating: false,
    dragOffset: 0
  });

  const totalItems = items.length;

  // Navigation functions
  const nextItem = useCallback(() => {
    if (state.isRotating) return;
    
    setState(prev => ({ ...prev, isRotating: true }));
    const newIndex = (activeIndex + 1) % totalItems;
    onIndexChange(newIndex);
    
    setTimeout(() => {
      setState(prev => ({ ...prev, isRotating: false }));
    }, finalConfig.animationDuration);
  }, [activeIndex, totalItems, onIndexChange, finalConfig.animationDuration, state.isRotating]);

  const prevItem = useCallback(() => {
    if (state.isRotating) return;
    
    setState(prev => ({ ...prev, isRotating: true }));
    const newIndex = activeIndex === 0 ? totalItems - 1 : activeIndex - 1;
    onIndexChange(newIndex);
    
    setTimeout(() => {
      setState(prev => ({ ...prev, isRotating: false }));
    }, finalConfig.animationDuration);
  }, [activeIndex, totalItems, onIndexChange, finalConfig.animationDuration, state.isRotating]);

  // Auto-rotation effect
  useEffect(() => {
    if (!finalConfig.enableAutoRotate || finalConfig.autoRotate <= 0) return;

    const startAutoRotate = () => {
      autoRotateRef.current = setInterval(() => {
        if (!state.isDragging && !state.isRotating) {
          nextItem();
        }
      }, finalConfig.autoRotate);
    };

    const stopAutoRotate = () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
        autoRotateRef.current = null;
      }
    };

    startAutoRotate();

    return stopAutoRotate;
  }, [finalConfig.enableAutoRotate, finalConfig.autoRotate, state.isDragging, state.isRotating, nextItem]);

  // Drag handlers
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!finalConfig.enableDrag || state.isRotating) return;
    
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    
    setState(prev => ({
      ...prev,
      isDragging: true,
      startX: clientX,
      dragOffset: 0
    }));
  }, [finalConfig.enableDrag, state.isRotating]);

  const handleDrag = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!state.isDragging || state.isRotating) return;
    
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const dragOffset = (clientX - state.startX) * finalConfig.rotationSpeed;
    
    setState(prev => ({ ...prev, dragOffset }));
  }, [state.isDragging, state.isRotating, state.startX, finalConfig.rotationSpeed]);

  const handleDragEnd = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!state.isDragging) return;
    
    setState(prev => ({ ...prev, isDragging: false }));
    
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diffX = clientX - state.startX;
    
    if (Math.abs(diffX) > finalConfig.swipeThreshold) {
      if (diffX > 0) {
        prevItem();
      } else {
        nextItem();
      }
    } else {
      setState(prev => ({ ...prev, dragOffset: 0 }));
    }
  }, [state.isDragging, state.startX, finalConfig.swipeThreshold, prevItem, nextItem]);

  // Keyboard navigation
  useEffect(() => {
    if (!finalConfig.enableKeyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.isRotating) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          nextItem();
          break;
        case 'ArrowRight':
          e.preventDefault();
          prevItem();
          break;
        case 'Home':
          e.preventDefault();
          onIndexChange(0);
          break;
        case 'End':
          e.preventDefault();
          onIndexChange(totalItems - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [finalConfig.enableKeyboard, state.isRotating, nextItem, prevItem, onIndexChange, totalItems]);

  // Render carousel items
  const renderItems = () => {
    return items.map((item, index) => {
      const isActive = index === activeIndex;
      return (
        <div
          key={index}
          className={`carousel-item ${isActive ? 'active' : ''}`}
          style={{
            transform: `translateX(${(index - activeIndex) * 100}%)`,
            opacity: isActive ? 1 : 0.7,
            transition: state.isDragging ? 'none' : `all ${finalConfig.animationDuration}ms ease-out`
          }}
        >
          {children(item, index, isActive)}
        </div>
      );
    });
  };

  return (
    <div
      ref={carouselRef}
      className={`carousel-container ${className}`}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDrag}
      onTouchEnd={handleDragEnd}
      style={{
        transform: state.isDragging ? `translateX(${state.dragOffset}px)` : 'none',
        transition: state.isDragging ? 'none' : 'transform 0.1s ease-out'
      }}
    >
      {renderItems()}
    </div>
  );
}

// Export carousel controls component
interface CarouselControlsProps {
  onNext: () => void;
  onPrev: () => void;
  isRotating: boolean;
  currentIndex: number;
  totalItems: number;
  className?: string;
}

export function CarouselControls({
  onNext,
  onPrev,
  isRotating,
  currentIndex,
  totalItems,
  className = ''
}: CarouselControlsProps) {
  return (
    <div className={`carousel-controls ${className}`}>
      <button
        onClick={onPrev}
        disabled={isRotating}
        className="control-btn prev-btn"
        aria-label="Previous item"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <span className="carousel-indicator">
        {currentIndex + 1} / {totalItems}
      </span>
      
      <button
        onClick={onNext}
        disabled={isRotating}
        className="control-btn next-btn"
        aria-label="Next item"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
