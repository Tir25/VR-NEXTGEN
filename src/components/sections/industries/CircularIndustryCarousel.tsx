'use client';

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { useRouter, NextRouter } from 'next/router';
import { INDUSTRIES } from './constants';
import { hasIndustryBackgroundImage, getIndustryBackgroundImage } from '@/config';
import { debounce } from '@/utils/debounce';
import { DELAYS, CAROUSEL_CONFIG } from '@/utils/performanceConstants';

interface CircularIndustryCarouselProps {
  className?: string;
}

interface CarouselState {
  currentIndex: number;
  theta: number;
  isDragging: boolean;
  startX: number;
  startY: number;
  dragStartTheta: number;
  radius: number;
}

function IndustryCard({ 
  industry, 
  isActive, 
  index,
  cardAngle,
  radius,
  onFlip,
  router
}: { 
  industry: typeof INDUSTRIES[0]; 
  isActive: boolean;
  index: number;
  cardAngle: number;
  radius: number;
  onFlip: (card: HTMLElement) => void;
  router: NextRouter;
}) {
  const handleExploreSolutions = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Navigate to the industry page
    router.push(`/industries/${industry.id}`);
  };

  // Get the industry ID for background image lookup
  const hasBackground = hasIndustryBackgroundImage(industry.id);
  const backgroundImage = hasBackground ? getIndustryBackgroundImage(industry.id) : null;

  // Calculate position for this card (used in transform style)
  // const rad = (cardAngle * Math.PI) / 180;
  // const x = radius * Math.sin(rad);
  // const z = radius * Math.cos(rad) * -1;

  return (
    <div
      className={`memory-card absolute cursor-pointer transition-transform duration-500 ${
        isActive ? 'z-10' : 'z-0'
      }`}
      style={{
        width: '220px',
        height: '280px',
        left: '50%',
        top: '50%',
        marginLeft: '-110px',
        marginTop: '-140px',
        transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
        transformStyle: 'preserve-3d',
      }}
      data-index={index}
      onClick={(e) => {
        e.preventDefault();
        onFlip(e.currentTarget as HTMLElement);
      }}
    >
      <div
        className={`card-inner relative w-full h-full transition-transform duration-500 ${
          isActive ? 'hover:translate-z-5' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
          {/* Card Front */}
          <div
            className={`card-front absolute w-full h-full rounded-xl overflow-hidden group/card-front border border-gray-700 hover:border-gold/50 ${
              hasBackground 
                ? '' 
                : 'bg-gradient-to-br from-gray-800/80 to-gray-900/90'
            }`}
            style={{
              backgroundImage: hasBackground && backgroundImage ? `url('${backgroundImage}')` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            {/* Readability overlay with hover easing - matching Our Services */}
            <div className="absolute inset-0 bg-black/60 rounded-xl group-hover/card-front:bg-black/40 transition-colors duration-300" />
          
          <div className={`card-content p-4 h-full flex flex-col items-center justify-center relative z-10 ${
            hasBackground ? 'text-white' : 'text-black'
          }`}>
            {/* Icon - matching Our Services styling */}
            <div className="flex justify-center mb-1.5">
              <div
                className="relative w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/30 text-gold transition-all duration-300 group-hover/card-front:scale-110 group-hover/card-front:shadow-lg group-hover/card-front:from-gold/30 group-hover/card-front:to-gold/40 shadow-[0_0_18px_rgba(255,215,0,0.45)] ring-2 ring-gold/30 md:ring-gold/20 animate-pulse md:animate-none"
                aria-hidden
              >
                {/* Subtle shimmer overlay for mobile visibility */}
                <span
                  className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.35),transparent_60%)] opacity-80 md:opacity-0"
                />
                <i className={`${industry.icon} text-xs`} />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xs font-semibold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] mb-1.5 text-center transition-colors duration-300 group-hover/card-front:text-gold">
              {industry.title}
            </h3>

            {/* Preview */}
            <p className="text-xs leading-relaxed text-center mb-2 italic text-white/90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
              {industry.preview}
            </p>

            {/* Learn More Button - matching Our Services styling */}
            <button 
              onClick={handleExploreSolutions}
              className="w-full px-1.5 py-1 text-xs font-medium bg-transparent border border-gold/50 text-gold rounded transition-all duration-300 hover:bg-gold hover:text-black hover:border-gold hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] focus:ring-2 focus:ring-gold/50 focus:outline-none group/btn relative overflow-hidden"
              aria-label={`Learn more about ${industry.title}`}
            >
              <span className="relative z-10 flex items-center justify-center gap-1">
                Learn More
                <svg className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              {/* Button background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Premium Feel: Gradient overlays and shadows - matching Our Services */}
            <div className="absolute inset-0 rounded-xl pointer-events-none bg-gold opacity-0 group-hover/card-front:opacity-5 active:opacity-5 transition-opacity duration-300" />
            <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-br from-gold/10 to-transparent opacity-0 transition-opacity duration-300 group-hover/card-front:opacity-100" />
            {/* Glow effect on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover/card-front:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(255,215,0,0.35)]" />
          </div>
        </div>

        {/* Card Back - Detailed View */}
        <div
          className="card-back absolute w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className="card-content p-3 h-full flex flex-col text-white relative z-10">
            {/* Fixed Header */}
            <div className="flex-shrink-0 mb-2">
              <h3 className="text-xs font-bold mb-1.5 text-center text-white">
                {industry.title}
              </h3>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gold/30 scrollbar-track-transparent">
              {/* Focus Areas */}
              <div className="mb-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-1.5 text-gold text-center">
                  Focus Areas
                </h4>
                <ul className="space-y-1">
                  {industry.description.split('\n').slice(0, 4).map((line, idx) => (
                    <li key={idx} className="flex items-start gap-1 text-gray-300">
                      <div className="w-1 h-1 bg-gold rounded-full flex-shrink-0 mt-1"></div>
                      <span className="text-xs leading-relaxed">{line.replace('• ', '').trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <p className="text-xs leading-relaxed mb-2 text-gray-300">
                {industry.description.split('\n').slice(4).join(' ').substring(0, 150)}...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CircularIndustryCarousel({ className = '' }: CircularIndustryCarouselProps) {
  const router = useRouter();
  const [state, setState] = useState<CarouselState>({
    currentIndex: 0,
    theta: 0,
    isDragging: false,
    startX: 0,
    startY: 0,
    dragStartTheta: 0,
    radius: 380
  });

  const carouselRef = useRef<HTMLDivElement>(null);
  const totalCards = INDUSTRIES.length;

  // Update radius based on screen size
  const updateRadius = useCallback(() => {
    const newRadius = window.innerWidth <= 768 ? CAROUSEL_CONFIG.MOBILE_RADIUS : CAROUSEL_CONFIG.DESKTOP_RADIUS;
    setState(prev => ({ ...prev, radius: newRadius }));
  }, []);

  // Initialize radius and setup resize listener with debouncing
  useEffect(() => {
    updateRadius();
    const debouncedUpdateRadius = debounce(updateRadius, DELAYS.DEBOUNCE_RESIZE);
    window.addEventListener('resize', debouncedUpdateRadius, { passive: true });
    return () => window.removeEventListener('resize', debouncedUpdateRadius);
  }, [updateRadius]);

  // Arrange cards in a circle
  const arrangeCards = useCallback(() => {
    const angle = 360 / totalCards;
    return INDUSTRIES.map((_, index) => angle * index);
  }, [totalCards]);

  // Rotate carousel
  const rotateCarousel = useCallback((newTheta: number) => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `rotateY(${newTheta}deg)`;
    }
    
    // Update current card index
    const anglePerCard = 360 / totalCards;
    const newIndex = Math.round(Math.abs(newTheta / anglePerCard) % totalCards);
    const normalizedIndex = newIndex >= totalCards ? 0 : newIndex;
    
    setState(prev => ({ 
      ...prev, 
      theta: newTheta,
      currentIndex: normalizedIndex
    }));
  }, [totalCards]);

  // Next card
  const nextCard = useCallback(() => {
    const anglePerCard = 360 / totalCards;
    const newTheta = state.theta - anglePerCard;
    rotateCarousel(newTheta);
  }, [state.theta, totalCards, rotateCarousel]);

  // Previous card
  const prevCard = useCallback(() => {
    const anglePerCard = 360 / totalCards;
    const newTheta = state.theta + anglePerCard;
    rotateCarousel(newTheta);
  }, [state.theta, totalCards, rotateCarousel]);

  // Flip card
  const flipCard = useCallback((card: HTMLElement) => {
    const cardIndex = parseInt(card.dataset.index || '0');
    
    // Only flip the current front-facing card
    if (cardIndex === state.currentIndex) {
      const cardInner = card.querySelector('.card-inner') as HTMLElement;
      if (cardInner) {
        cardInner.style.transform = cardInner.style.transform.includes('rotateY(180deg)') 
          ? 'translateZ(0px)' 
          : 'translateZ(0px) rotateY(180deg)';
      }
    }
  }, [state.currentIndex]);

  // Drag functions
  const dragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setState(prev => ({
      ...prev,
      isDragging: true,
      startX: clientX,
      startY: clientY,
      dragStartTheta: prev.theta
    }));
  }, []);

  const drag = useCallback((e: MouseEvent | TouchEvent) => {
    if (!state.isDragging) return;
    e.preventDefault();

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diffX = clientX - state.startX;

    // Rotate based on drag distance
    const sensitivity = 0.5;
    const newTheta = state.dragStartTheta + diffX * sensitivity;
    rotateCarousel(newTheta);
  }, [state.isDragging, state.startX, state.dragStartTheta, rotateCarousel]);

  const dragEnd = useCallback((e: MouseEvent | TouchEvent) => {
    if (!state.isDragging) return;
    
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diffX = clientX - state.startX;

    // Snap to closest card if drag distance is significant
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        prevCard(); // Swipe right to see previous card
      } else {
        nextCard(); // Swipe left to see next card
      }
    } else {
      // Snap to the closest card
      const anglePerCard = 360 / totalCards;
      const snapAngle = Math.round(state.theta / anglePerCard) * anglePerCard;
      rotateCarousel(snapAngle);
    }

    setState(prev => ({ ...prev, isDragging: false }));
  }, [state.isDragging, state.startX, state.theta, totalCards, prevCard, nextCard, rotateCarousel]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        nextCard();
        break;
      case 'ArrowRight':
        e.preventDefault();
        prevCard();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        const currentCard = document.querySelector(`.memory-card[data-index="${state.currentIndex}"]`) as HTMLElement;
        if (currentCard) {
          flipCard(currentCard);
        }
        break;
    }
  }, [state.currentIndex, nextCard, prevCard, flipCard]);

  // Setup event listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => drag(e);
    const handleMouseUp = (e: MouseEvent) => dragEnd(e);
    const handleTouchMove = (e: TouchEvent) => drag(e);
    const handleTouchEnd = (e: TouchEvent) => dragEnd(e);

    if (state.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.isDragging, drag, dragEnd, handleKeyDown]);

  // Initialize carousel
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `rotateY(${state.theta}deg)`;
    }
  }, [state.theta]);

  const cardAngles = arrangeCards();

  return (
    <div className={`circular-industry-carousel py-12 ${className}`}>
      {/* Carousel Container */}
      <div className="carousel-container relative w-full h-[600px] perspective-1000 flex justify-center items-center">
        <div
          ref={carouselRef}
          className="carousel relative transition-transform duration-500 ease-out"
          style={{
            width: `${state.radius * 2}px`,
            height: `${state.radius * 2}px`,
            transformStyle: 'preserve-3d',
          }}
          onMouseDown={dragStart}
          onTouchStart={dragStart}
        >
          {INDUSTRIES.map((industry, index) => (
            <IndustryCard
              key={industry.id}
              industry={industry}
              isActive={index === state.currentIndex}
              index={index}
              cardAngle={cardAngles[index]}
              radius={state.radius}
              onFlip={flipCard}
              router={router}
            />
          ))}
        </div>
      </div>

      {/* Navigation Controls - Centered below carousel */}
      <div className="carousel-controls flex justify-center items-center gap-5 mt-8 mb-4">
        <button
          onClick={prevCard}
          className="control-btn w-10 h-10 rounded-full bg-gray-800/70 border border-gold/30 text-gold flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-gray-700/90 hover:scale-110 hover:border-gold/50"
          aria-label="Previous industry"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        
        <div className="flex gap-2">
          {INDUSTRIES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const anglePerCard = 360 / totalCards;
                const targetTheta = index * anglePerCard;
                rotateCarousel(targetTheta);
              }}
              className={`nav-indicator w-3 h-3 rounded-full transition-all duration-300 ${
                index === state.currentIndex 
                  ? 'bg-gold scale-125' 
                  : 'bg-gold/30 hover:bg-gold/50 hover:scale-110'
              }`}
              aria-label={`Go to industry ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={nextCard}
          className="control-btn w-10 h-10 rounded-full bg-gray-800/70 border border-gold/30 text-gold flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-gray-700/90 hover:scale-110 hover:border-gold/50"
          aria-label="Next industry"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-gray-400">
        <p>Use arrow keys or swipe to navigate • Click cards to flip</p>
      </div>
    </div>
  );
}

export default memo(CircularIndustryCarousel);
