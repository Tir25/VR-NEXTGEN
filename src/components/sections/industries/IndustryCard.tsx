/**
 * IndustryCard Component
 * Individual industry card with 3D flip functionality
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IndustryCardProps } from './types';
import { getResponsiveValue, RESPONSIVE_CAROUSEL_CONFIG, hasIndustryBackgroundImage, getIndustryBackgroundImage } from '@/config';

export default function IndustryCard({ industry, isActive, index = 0 }: IndustryCardProps) {
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardDimensions, setCardDimensions] = useState({ width: '180px', height: '260px' });

  const handleLearnMore = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event from firing
    router.push(`/industries/${industry.id}`);
  };

  // Helper function to check if card has background image
  const hasBackgroundImage = (cardId: string) => hasIndustryBackgroundImage(cardId);
  const getBackgroundImagePath = (cardId: string) => getIndustryBackgroundImage(cardId);

  // Responsive card dimensions using centralized config
  useEffect(() => {
    const updateCardDimensions = () => {
      const cardSizes = getResponsiveValue(
        RESPONSIVE_CAROUSEL_CONFIG.cardSizes as any, 
        RESPONSIVE_CAROUSEL_CONFIG.cardSizes.lg
      );
      setCardDimensions({ width: cardSizes.width, height: cardSizes.height });
    };

    updateCardDimensions();
    window.addEventListener('resize', updateCardDimensions);
    return () => window.removeEventListener('resize', updateCardDimensions);
  }, []);

  // Reset flip state when card becomes inactive
  useEffect(() => {
    if (!isActive && isFlipped) {
      setIsFlipped(false);
    }
  }, [isActive, isFlipped]);

  const handleClick = (e: React.MouseEvent) => {
    // Stop event propagation to prevent carousel drag from starting
    e.stopPropagation();
    
    // Only allow flipping if the card is active and the click is not on a button
    if (isActive && !(e.target as HTMLElement).closest('button')) {
      setIsFlipped(!isFlipped);
    }
  };

  // Get responsive text scaling
  const getTextScaling = () => {
    return getResponsiveValue(
      RESPONSIVE_CAROUSEL_CONFIG.textScaling as any,
      RESPONSIVE_CAROUSEL_CONFIG.textScaling.lg
    );
  };

  // Get responsive padding
  const getResponsivePadding = () => {
    return getResponsiveValue(
      RESPONSIVE_CAROUSEL_CONFIG.mobilePadding as any,
      RESPONSIVE_CAROUSEL_CONFIG.mobilePadding.lg
    );
  };

  const textScaling = getTextScaling();
  const responsivePadding = getResponsivePadding();

  return (
    <div
      className={`absolute cursor-pointer transition-all duration-500 transform-gpu group ${
        isActive ? 'scale-110 z-10 opacity-100' : 'scale-90 opacity-70'
      }`}
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
        // Stable positioning
        position: 'absolute',
        // Mobile optimization: Better touch targets and performance
        minHeight: typeof window !== 'undefined' && window.innerWidth < 768 ? '44px' : 'auto',
        minWidth: typeof window !== 'undefined' && window.innerWidth < 768 ? '44px' : 'auto',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        // Improve touch responsiveness
        touchAction: 'manipulation'
      }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${industry.title} - Click to flip for more details`}
      data-index={index}
    >
      <div 
        className="relative w-full h-full transition-transform duration-800"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Card Front */}
        <div 
          className={`absolute w-full h-full rounded-xl overflow-hidden shadow-lg border border-purple-500/30 transition-opacity duration-300 ${
            isFlipped ? 'opacity-0' : 'opacity-100'
          } ${
            hasBackgroundImage(industry.id) 
              ? 'bg-gradient-to-br from-gray-800/60 to-gray-900/70' 
              : 'bg-gradient-to-br from-gray-800/80 to-gray-900/90'
          }`}
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
            ...(hasBackgroundImage(industry.id) && {
              backgroundImage: `url('${getBackgroundImagePath(industry.id)}')`,
              // Mobile optimization: Better background scaling
              backgroundSize: typeof window !== 'undefined' && window.innerWidth >= 768 ? 'cover' : 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            })
          }}
        >
          <div 
            className="h-full flex flex-col relative"
            style={{ padding: responsivePadding }}
          >
            {/* Brightness overlay (default dim -> lighten on hover/tap). Applies to all cards */}
            <div className="absolute inset-0 bg-black rounded-xl pointer-events-none opacity-60 group-hover:opacity-30 active:opacity-30 transition-opacity duration-300" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div 
                className={`font-mono mb-1 tracking-wider font-semibold drop-shadow-lg ${
                  hasBackgroundImage(industry.id) ? 'text-sand-yellow' : 'text-sand-yellow'
                }`}
                style={{ fontSize: textScaling.category }}
              >
                {industry.category || 'CATEGORY'}
              </div>
              <h3 
                className="font-bold text-white mb-2 leading-tight drop-shadow-lg"
                style={{ fontSize: textScaling.title }}
              >
                {industry.title || 'Card Title'}
              </h3>
              <div 
                className="flex items-center justify-center mb-2 relative flex-shrink-0"
                style={{ minHeight: typeof window !== 'undefined' && window.innerWidth >= 768 ? '60px' : '50px' }}
              >
                <i 
                  className={`${industry.icon || 'fas fa-cube'} text-sand-yellow drop-shadow-lg`}
                  style={{ fontSize: textScaling.icon }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sand-yellow/30 to-transparent animate-pulse" />
              </div>
              <div className="flex-1 flex items-start justify-center min-h-0">
                <p 
                  className={`leading-relaxed font-medium drop-shadow-lg text-center ${
                    hasBackgroundImage(industry.id) ? 'text-white' : 'text-white/80'
                  }`}
                  style={{ fontSize: textScaling.description }}
                >
                  {industry.preview || 'This is an empty card. Content will be added here.'}
                </p>
              </div>
              
              {/* Learn More Button on Front */}
              <div className="mt-3 pt-3 border-t border-white/20">
                <button 
                  onClick={handleLearnMore}
                  className="w-full px-3 py-2 text-xs font-semibold bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/30 text-white rounded-lg transition-all duration-300 hover:from-purple-500/30 hover:to-cyan-500/30 hover:border-purple-400/50 focus:ring-2 focus:ring-purple-400/50 focus:outline-none group/btn relative overflow-hidden"
                  aria-label={`Learn more about ${industry.title}`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-1">
                    Learn More
                    <svg className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </div>
            
            <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-radial from-purple-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 active:opacity-100" />
          </div>
        </div>

        {/* Card Back */}
        <div 
          className={`absolute w-full h-full rounded-xl overflow-hidden shadow-lg border border-cyan-500/30 transition-opacity duration-300 ${
            isFlipped ? 'opacity-100' : 'opacity-0'
          } ${
            hasBackgroundImage(industry.id) 
              ? 'bg-gradient-to-br from-gray-900/70 to-gray-800/60' 
              : 'bg-gradient-to-br from-gray-900/90 to-gray-800/80'
          }`}
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            ...(hasBackgroundImage(industry.id) && {
              backgroundImage: `url('${getBackgroundImagePath(industry.id)}')`,
              // Mobile optimization: Better background scaling
              backgroundSize: typeof window !== 'undefined' && window.innerWidth >= 768 ? 'cover' : 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            })
          }}
        >
          <div 
            className="h-full flex flex-col relative"
            style={{ padding: responsivePadding }}
          >
            {/* Brightness overlay (default dim -> lighten on hover/tap). Applies to all cards */}
            <div className="absolute inset-0 bg-black rounded-xl pointer-events-none opacity-60 group-hover:opacity-30 active:opacity-30 transition-opacity duration-300" />
            
            <div className="relative z-10 flex flex-col h-full">
              <h3 
                className="font-bold text-white mb-2 leading-tight drop-shadow-lg flex-shrink-0"
                style={{ fontSize: textScaling.title }}
              >
                {industry.title || 'Card Title'}
              </h3>
              <div 
                className={`leading-relaxed mb-2 flex-1 overflow-y-auto font-medium drop-shadow-lg ${
                  hasBackgroundImage(industry.id) ? 'text-white' : 'text-white/80'
                }`}
                style={{ fontSize: textScaling.description }}
              >
                {(industry.description || 'This is an empty card. Detailed content will be added here.').split('\n').map((line, index) => (
                  <p key={index} className={`${index > 0 ? 'mt-1' : ''} font-medium`}>
                    {line}
                  </p>
                ))}
              </div>
              <div 
                className="font-mono text-sand-yellow space-y-1 drop-shadow-lg flex-shrink-0"
                style={{ fontSize: textScaling.category }}
              >
                <div className="flex items-center gap-1 font-semibold">
                  <i className="fas fa-map-marker-alt w-2" />
                  <span>{industry.location || 'Location'}</span>
                </div>
                <div className="flex items-center gap-1 font-semibold">
                  <i className="fas fa-clock w-2" />
                  <span className={`${hasBackgroundImage(industry.id) ? 'text-cyan-300' : 'text-cyan-400'}`}>
                    {industry.timestamp || 'Date'}
                  </span>
                </div>
              </div>
              
              {/* Learn More Button */}
              <div className="mt-3 pt-3 border-t border-white/20">
                <button 
                  onClick={handleLearnMore}
                  className="w-full px-3 py-2 text-xs font-semibold bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/30 text-white rounded-lg transition-all duration-300 hover:from-purple-500/30 hover:to-cyan-500/30 hover:border-purple-400/50 focus:ring-2 focus:ring-purple-400/50 focus:outline-none group/btn relative overflow-hidden"
                  aria-label={`Learn more about ${industry.title}`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-1">
                    Learn More
                    <svg className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}