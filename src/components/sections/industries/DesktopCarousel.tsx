/**
 * DesktopCarousel Component
 * Preserves the current 3D carousel functionality for desktop/laptop screens
 */

import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import { IndustriesSection, Container, SectionHeader, SafeWrapper } from '@/components/common';
import SafeAnimation from '@/components/common/SafeAnimation';
import IndustriesControls from './IndustriesControls';
import IndustryCard from './IndustryCard';
import { INDUSTRIES, CAROUSEL_CONFIG, RESPONSIVE_RADIUS } from './constants';
import { getResponsiveValue, RESPONSIVE_CAROUSEL_CONFIG, CAROUSEL_CONSTANTS } from '@/config';

function DesktopCarouselInner() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [theta, setTheta] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [radius, setRadius] = useState(320);

  const totalCards = INDUSTRIES.length;

  // Responsive horizontal translation for fine centering on larger screens
  // Use percent + pixel offset for precise visual centering per breakpoint
  const translateXPercent = getResponsiveValue(
    { md: '-50%', lg: '-50%', xl: '-50%', '2xl': '-50%' },
    '-50%'
  );
  // Removed unused translateXOffsetPx variable

  // Additional responsive left bias using margin to visually nudge container
  const marginLeftPx = getResponsiveValue(
    { md: 0, lg: -80, xl: -60, '2xl': -80 },
    0
  );

  // Responsive radius calculation using centralized config
  useEffect(() => {
    const updateRadius = () => {
      const newRadius = getResponsiveValue(RESPONSIVE_RADIUS, RESPONSIVE_RADIUS.xl);
      setRadius(newRadius);
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Arrange cards in a circle
  useEffect(() => {
    if (!carouselRef.current) return;

    const angle = CAROUSEL_CONSTANTS.FULL_CIRCLE / totalCards;
    const cardElements = carouselRef.current.children;

    // Container is flex-centered by parent; no container transform needed
    carouselRef.current.style.transform = '';

    Array.from(cardElements).forEach((cardElement, index) => {
      const cardAngle = angle * index;
      // Position cards around the circle with proper transforms
      (cardElement as HTMLElement).style.transform = `
        rotateY(${cardAngle + theta}deg) 
        translateZ(${radius}px)
      `;
      cardElement.setAttribute('data-index', index.toString());
    });
  }, [radius, totalCards, theta, translateXPercent]);

  // Helper to normalize degrees to [0, 360)
  const normalizeDegrees = (deg: number) => {
    let d = deg % CAROUSEL_CONSTANTS.FULL_CIRCLE;
    if (d < 0) d += CAROUSEL_CONSTANTS.FULL_CIRCLE;
    return d;
  };

  // Compute active index based on theta so that the card facing front is active
  const computeActiveIndex = useCallback((thetaValue: number, total: number) => {
    const anglePerCard = CAROUSEL_CONSTANTS.FULL_CIRCLE / total;
    const normalized = normalizeDegrees(-thetaValue); // card at 0deg is front
    const index = Math.round(normalized / anglePerCard) % total;
    return index;
  }, []);

  // Rotate carousel with smooth animation
  const rotateCarousel = useCallback((newTheta: number, animate: boolean = true) => {
    if (!carouselRef.current || isRotating) return;
    
    setIsRotating(true);
    
    // Apply transitions to individual cards, not the container
    const cardElements = carouselRef.current.children;
    
    if (animate) {
      Array.from(cardElements).forEach((cardElement) => {
        (cardElement as HTMLElement).style.transition = `${CAROUSEL_CONFIG.transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
      });
    } else {
      Array.from(cardElements).forEach((cardElement) => {
        (cardElement as HTMLElement).style.transition = 'none';
      });
    }
    
    // Keep container centered via parent flex; do not mutate container transform
    carouselRef.current.style.transform = '';
    setTheta(newTheta);

    const newIndex = computeActiveIndex(newTheta, totalCards);
    setCurrentIndex(newIndex);
    
    if (animate) {
      setTimeout(() => {
        setIsRotating(false);
      }, CAROUSEL_CONFIG.transitionDuration);
    } else {
      setIsRotating(false);
    }
  }, [isRotating, totalCards, computeActiveIndex]);

  // Navigation functions with proper snapping
  const nextCard = useCallback(() => {
    if (isRotating) return;
    const newTheta = theta - CAROUSEL_CONSTANTS.FULL_CIRCLE / totalCards;
    rotateCarousel(newTheta, true);
  }, [theta, totalCards, isRotating, rotateCarousel]);

  const prevCard = useCallback(() => {
    if (isRotating) return;
    const newTheta = theta + CAROUSEL_CONSTANTS.FULL_CIRCLE / totalCards;
    rotateCarousel(newTheta, true);
  }, [theta, totalCards, isRotating, rotateCarousel]);

  // Touch and mouse event handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isRotating) return;
    
    // Check if the click is on a card element
    const target = e.target as HTMLElement;
    const cardElement = target.closest('[data-index]');
    
    // If clicking on a card, don't start drag - let the card handle the click
    if (cardElement) {
      return;
    }
    
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    
    // Disable transitions during drag on individual cards
    if (carouselRef.current) {
      const cardElements = carouselRef.current.children;
      Array.from(cardElements).forEach((cardElement) => {
        (cardElement as HTMLElement).style.transition = 'none';
      });
    }
  };

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || isRotating) return;
    e.preventDefault();

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diffX = clientX - startX;
    const newTheta = theta + diffX * CAROUSEL_CONFIG.rotationSpeed;

    if (carouselRef.current) {
      // Container remains flex-centered; do not mutate container transform
      carouselRef.current.style.transform = '';
      
      // Update individual card positions
      const angle = CAROUSEL_CONSTANTS.FULL_CIRCLE / totalCards;
      const cardElements = carouselRef.current.children;
      
      Array.from(cardElements).forEach((cardElement, index) => {
        const cardAngle = angle * index;
        (cardElement as HTMLElement).style.transform = `
          rotateY(${cardAngle + newTheta}deg) 
          translateZ(${radius}px)
        `;
      });
    }
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diffX = clientX - startX;

    if (Math.abs(diffX) > CAROUSEL_CONFIG.swipeThreshold) {
      if (diffX > 0) {
        prevCard();
      } else {
        nextCard();
      }
    } else {
      // Snap to nearest card using normalized angle
      const anglePerCard = CAROUSEL_CONSTANTS.FULL_CIRCLE / totalCards;
      const currentNormalized = normalizeDegrees(theta);
      const steps = Math.round(currentNormalized / anglePerCard);
      const targetNormalized = steps * anglePerCard;
      // Convert back to theta space (remember -theta maps to front)
      const snapAngle = -targetNormalized;
      rotateCarousel(snapAngle, true);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isRotating) return;
      
      if (e.key === 'ArrowLeft') {
        prevCard();
      } else if (e.key === 'ArrowRight') {
        nextCard();
      }
      // Removed Enter/Space key handling for card flip to prevent conflicts
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isRotating, nextCard, prevCard]);

  return (
    <IndustriesSection
      id="industries"
      ariaLabel="Industries We Serve"
    >
      <Container>
        <SectionHeader
          badge={{
            text: "Industries We Serve",
            color: "purple",
            size: "xl"
          }}
          showTitle={false}
          showDescription={false}
          compact
        />

        {/* Context heading and description between section header and carousel (desktop) */}
        <div className="mt-2 mb-0 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            See How We Turn Data into Decisions, Everywhere
          </h2>
          <p className="mt-2 text-white/80 max-w-3xl mx-auto">
            Explore how VR NextGen Solutions empowers businesses across industries through data-driven strategies, automation, and process excellence. Select your industry to see how we turn challenges into measurable growth.
          </p>
        </div>

        {/* 3D Carousel Container */}
        <SafeWrapper isolate={true}>
          <SafeAnimation
            animation="slideUp"
            className="relative w-full mx-auto flex items-center justify-center"
            requireAnimations={false}
            fallbackToStatic={true}
            style={{ 
              minHeight: getResponsiveValue(RESPONSIVE_CAROUSEL_CONFIG.containerHeights, RESPONSIVE_CAROUSEL_CONFIG.containerHeights.lg),
              maxHeight: getResponsiveValue(RESPONSIVE_CAROUSEL_CONFIG.containerHeights, RESPONSIVE_CAROUSEL_CONFIG.containerHeights.lg),
              marginTop: 'clamp(0rem, 0.5vh, 0.75rem)',
              marginBottom: 'clamp(0rem, 0.25vh, 0.25rem)',
              paddingTop: 'clamp(0.5rem, 1vh, 1.25rem)',
              paddingBottom: 'clamp(0.25rem, 0.5vh, 0.75rem)',
              // Mobile optimization: Full width with padding, adjusted for left positioning
              paddingLeft: typeof window !== 'undefined' && window.innerWidth <= 768 ? '3%' : '0',
              paddingRight: typeof window !== 'undefined' && window.innerWidth <= 768 ? '7%' : '0',
              // Ensure stable positioning
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div
              ref={carouselRef}
              className="relative select-none mx-auto flex items-center justify-center"
              style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                // Center via normal flow; provide relative context for children
                position: 'relative',
                margin: '0 auto',
                marginLeft: `${marginLeftPx}px`,
                padding: 0,
                // Mobile optimization: Better touch handling
                touchAction: 'pan-y pinch-zoom',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                userSelect: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              onMouseMove={handleDrag}
              onTouchMove={handleDrag}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchEnd={handleDragEnd}
            >
              {INDUSTRIES.map((industry, index) => (
                <IndustryCard 
                  key={industry.id} 
                  industry={industry} 
                  isActive={index === currentIndex}
                  index={index}
                />
              ))}
            </div>
          </SafeAnimation>
        </SafeWrapper>

        <IndustriesControls
          onNext={nextCard}
          onPrev={prevCard}
          isRotating={isRotating}
        />
      </Container>
    </IndustriesSection>
  );
}

export default memo(DesktopCarouselInner);
