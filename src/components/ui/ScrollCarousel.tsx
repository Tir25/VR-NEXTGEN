/**
 * ScrollCarousel Component
 * Vertical mobile carousel with CSS animations
 * Adapted for VR NextGEN Solutions theme and styling
 */

import React, { useEffect, useRef, useState, forwardRef, useCallback, memo, useMemo } from 'react';
import { hasIndustryBackgroundImage, getIndustryBackgroundImage } from '@/config';
import { useRouter } from 'next/router';

// Define the component's props interface
export interface ScrollCarouselProps {
  industries: Array<{
    id: string;
    category: string;
    title: string;
    icon: string;
    preview: string;
    description: string;
    location: string;
    timestamp: string;
  }>;
  className?: string;
  maxScrollHeight?: number;
}

// Custom hook for scroll animations using Intersection Observer
const useScrollAnimations = (
  cardRefs: React.MutableRefObject<HTMLDivElement[]>
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [cardRefs]);
};

// Use centralized industry image helpers
const hasBackgroundImage = (cardId: string) => hasIndustryBackgroundImage(cardId);
const getBackgroundImagePath = (cardId: string) => getIndustryBackgroundImage(cardId);

export const ScrollCarousel = memo(forwardRef<HTMLDivElement, ScrollCarouselProps>(
  ({ industries, className }, ref) => {
    const router = useRouter();
    const cardRefs = useRef<HTMLDivElement[]>([]);
    const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

    const handleLearnMore = useCallback((industryId: string) => {
      router.push(`/industries/${industryId}`);
    }, [router]);

    useScrollAnimations(cardRefs);

    const handleCardFlip = useCallback((index: number) => {
      setFlippedCards(prev => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    }, []);

    const cards = useMemo(() => industries.map((industry, index) => {
      const backgroundImage = hasBackgroundImage(industry.id) ? getBackgroundImagePath(industry.id) : null;
      const isFlipped = flippedCards.has(index);
      const categorySameAsTitle = (industry.category || '').trim().toLowerCase() === (industry.title || '').trim().toLowerCase();
      const locationText = (industry.location || '').trim();
      const timestampText = (industry.timestamp || '').trim();
      const isGlobal = locationText.toLowerCase() === 'global';
      const isYear2024 = timestampText === '2024';
      const timestampContainsGlobal2024 = timestampText.toLowerCase().includes('global 2024');
      
      return (
        <div
          key={industry.id}
          ref={(el: HTMLDivElement | null) => {
            if (el) cardRefs.current[index] = el;
          }}
          className="group relative transition-all duration-500 transform-gpu hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,215,0,0.25)] active:scale-[1.02] active:shadow-[0_0_20px_rgba(255,215,0,0.25)] opacity-0 translate-y-8 w-full cursor-pointer"
          style={{
            width: '100%',
            minHeight: 'clamp(400px, 85vh, 500px)',
            marginBottom: '0.5rem',
            maxWidth: '100%',
            perspective: '1000px',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden'
          }}
          onClick={() => handleCardFlip(index)}
        >
          <div
            className={`relative w-full h-full rounded-xl overflow-hidden shadow-lg border transition-all duration-700 transform-gpu ${
              hasBackgroundImage(industry.id) 
                ? 'border-gold/30 bg-gradient-to-br from-gray-800/60 to-gray-900/70' 
                : 'border-gold/30 bg-gradient-to-br from-gray-800/80 to-gray-900/90'
            }`}
            style={{
              ...(backgroundImage && {
                backgroundImage: `url('${backgroundImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }),
              minHeight: 'clamp(400px, 85vh, 500px)',
              width: '100%',
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* Card Front */}
            <div
              className={`absolute inset-0 w-full h-full rounded-xl transition-opacity duration-300 ${
                isFlipped ? 'opacity-0' : 'opacity-100'
              }`}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              {/* Enhanced overlay for better text readability when background image is present */}
              {hasBackgroundImage(industry.id) && (
                <div className="absolute inset-0 bg-black/60 rounded-xl pointer-events-none" />
              )}
              
              {/* Brightness overlay for consistent hover effect */}
              <div className="absolute inset-0 rounded-xl pointer-events-none bg-black opacity-60 group-hover:opacity-30 active:opacity-30 transition-opacity duration-300" />
              
              <div className="relative z-10 p-4 sm:p-6 flex flex-col h-full">
                {!categorySameAsTitle && (
                  <div className={`text-xs font-mono mb-2 tracking-wider font-semibold drop-shadow-lg ${
                    hasBackgroundImage(industry.id) ? 'text-sand-yellow' : 'text-sand-yellow'
                  }`}>
                    {industry.category}
                  </div>
                )}
                
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight drop-shadow-lg text-center">
                  {industry.title || 'Card Title'}
                </h3>
                
                <div className="flex items-center justify-center mb-3 sm:mb-4 relative flex-shrink-0" style={{ minHeight: '50px' }}>
                  <i className={`${industry.icon || 'fas fa-cube'} text-2xl sm:text-3xl md:text-4xl text-sand-yellow drop-shadow-lg`} />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sand-yellow/30 to-transparent animate-pulse" />
                </div>
                
                <div className="flex-1 flex items-start justify-center min-h-0">
                  <div className="text-center w-full">
                    <p className={`text-sm sm:text-base leading-relaxed font-medium drop-shadow-lg mb-3 ${
                      hasBackgroundImage(industry.id) ? 'text-white' : 'text-white/80'
                    }`}>
                      {industry.preview || 'This is an empty card. Content will be added here.'}
                    </p>
                    
                    {/* Show first few bullet points from description as preview */}
                    <div className={`text-xs sm:text-sm leading-relaxed font-medium drop-shadow-lg text-left ${
                      hasBackgroundImage(industry.id) ? 'text-white/90' : 'text-white/70'
                    }`}>
                      {industry.description && industry.description.split('\n').slice(0, 4).map((line, index) => (
                        <p key={index} className={`${index > 0 ? 'mt-1' : ''} font-medium`}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 sm:mt-4 text-xs font-mono text-sand-yellow space-y-1 drop-shadow-lg flex-shrink-0">
                  {!isGlobal && (
                    <div className="flex items-center gap-1 font-semibold justify-center">
                      <i className="fas fa-map-marker-alt w-2" />
                      <span>{locationText || 'Location'}</span>
                    </div>
                  )}
                  {!isYear2024 && !timestampContainsGlobal2024 && (
                    <div className="flex items-center gap-1 font-semibold justify-center">
                      <i className="fas fa-clock w-2" />
                      <span className={`${hasBackgroundImage(industry.id) ? 'text-cyan-300' : 'text-cyan-400'}`}>{timestampText || 'Date'}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 font-semibold justify-center mt-2 opacity-70">
                    <i className="fas fa-hand-pointer w-2" />
                    <span className="text-xs">Tap to flip for more</span>
                  </div>
                  
                  {/* Learn More Button on Front */}
                  <div className="mt-3 pt-3 border-t border-white/20">
                    <button 
                      onClick={() => handleLearnMore(industry.id)}
                      className="w-full px-3 py-2 text-xs font-semibold bg-gradient-to-r from-gold/20 to-cyan-500/20 border border-gold/30 text-white rounded-lg transition-all duration-300 hover:from-gold/30 hover:to-cyan-500/30 hover:border-gold/50 focus:ring-2 focus:ring-gold/50 focus:outline-none group/btn relative overflow-hidden"
                      aria-label={`Learn more about ${industry.title}`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-1">
                        Learn More
                        <svg className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-cyan-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </button>
                  </div>
                  {/* Debug indicator removed for production */}
                </div>
              </div>
            </div>

            {/* Card Back */}
            <div
              className={`absolute inset-0 w-full h-full rounded-xl transition-opacity duration-300 ${
                isFlipped ? 'opacity-100' : 'opacity-0'
              } border-cyan-500/30`}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                ...(backgroundImage && {
                  backgroundImage: `url('${backgroundImage}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                })
              }}
            >
              {/* Enhanced overlay for better text readability when background image is present */}
              {hasBackgroundImage(industry.id) && (
                <div className="absolute inset-0 bg-black/60 rounded-xl pointer-events-none" />
              )}
              
              {/* Brightness overlay for consistent hover effect */}
              <div className="absolute inset-0 rounded-xl pointer-events-none bg-black opacity-60 group-hover:opacity-30 active:opacity-30 transition-opacity duration-300" />
              
                <div className="relative z-10 p-4 sm:p-6 flex flex-col h-full">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight drop-shadow-lg flex-shrink-0">
                  {industry.title || 'Card Title'}
                </h3>
                
                <div className="flex-1 flex items-start justify-start min-h-0 overflow-y-auto">
                  <div className={`text-sm sm:text-base leading-relaxed font-medium drop-shadow-lg text-left w-full ${
                    hasBackgroundImage(industry.id) ? 'text-white' : 'text-white/80'
                  }`}>
                    {industry.description ? industry.description.split('\n').map((line, index) => (
                      <p key={index} className={`${index > 0 ? 'mt-2' : ''} font-medium leading-relaxed`}>
                        {line}
                      </p>
                    )) : (
                      <p className="font-medium leading-relaxed">
                        This is an empty card. Detailed content will be added here.
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="mt-3 sm:mt-4 text-xs font-mono text-sand-yellow space-y-1 drop-shadow-lg flex-shrink-0">
                  {!isGlobal && (
                    <div className="flex items-center gap-1 font-semibold justify-center">
                      <i className="fas fa-map-marker-alt w-2" />
                      <span>{locationText || 'Location'}</span>
                    </div>
                  )}
                  {!isYear2024 && !timestampContainsGlobal2024 && (
                    <div className="flex items-center gap-1 font-semibold justify-center">
                      <i className="fas fa-clock w-2" />
                      <span className={`${hasBackgroundImage(industry.id) ? 'text-cyan-300' : 'text-cyan-400'}`}>{timestampText || 'Date'}</span>
                    </div>
                  )}
                </div>
                
                {/* Learn More Button */}
                <div className="mt-3 pt-3 border-t border-white/20">
                  <button 
                    onClick={() => handleLearnMore(industry.id)}
                    className="w-full px-3 py-2 text-xs font-semibold bg-gradient-to-r from-gold/20 to-cyan-500/20 border border-gold/30 text-white rounded-lg transition-all duration-300 hover:from-gold/30 hover:to-cyan-500/30 hover:border-gold/50 focus:ring-2 focus:ring-gold/50 focus:outline-none group/btn relative overflow-hidden"
                    aria-label={`Learn more about ${industry.title}`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-1">
                      Learn More
                      <svg className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-cyan-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>
                {/* Debug indicator removed for production */}
              </div>
            </div>
            
            <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-radial from-gold/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 active:opacity-100" />
          </div>
        </div>
      );
    }), [industries, flippedCards, handleCardFlip, handleLearnMore]);

    return (
      <section
        className={`bg-transparent text-white relative ${className || ''}`}
        ref={ref}
        style={{
          width: '100%',
          minHeight: 'auto',
          padding: '0',
          marginTop: '0',
          marginBottom: '0'
        }}
      >
        <div className="relative w-full max-w-full mx-auto px-4 sm:px-6 pb-8">
          <div className="flex flex-col items-center space-y-2 w-full">
            {cards}
          </div>
        </div>
        
        <style jsx>{`
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(2rem);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          /* 3D Flip Animation - handled inline */
          
          /* Ensure proper mobile scrolling */
          section {
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }
          
          /* Fix for mobile viewport */
          @media (max-width: 768px) {
            section {
              min-height: auto;
              padding: 1rem 0;
            }
          }
          
          /* Mobile touch optimization */
          @media (hover: none) and (pointer: coarse) {
            .group:active {
              transform: scale(0.98);
            }
          }
        `}</style>
      </section>
    );
  }
));

ScrollCarousel.displayName = "ScrollCarousel";

export default ScrollCarousel;
