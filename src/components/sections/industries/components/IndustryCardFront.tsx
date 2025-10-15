import React from 'react';
import { Industry } from '@/types/components';

interface IndustryCardFrontProps {
  industry: Industry;
  isFlipped: boolean;
  hasBackgroundImage: (cardId: string) => boolean;
  getBackgroundImagePath: (cardId: string) => string | null;
  textScaling: Record<string, string>;
  responsivePadding: string;
  onLearnMore: (e: React.MouseEvent) => void;
}

export default function IndustryCardFront({
  industry,
  isFlipped,
  hasBackgroundImage,
  getBackgroundImagePath,
  textScaling,
  responsivePadding,
  onLearnMore
}: IndustryCardFrontProps) {
  const categorySameAsTitle = (industry.category || '').trim().toLowerCase() === (industry.title || '').trim().toLowerCase();
  return (
    <div 
      className={`absolute w-full h-full rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-opacity duration-300 ${
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
        {/* Readability overlay with hover easing - matching Our Services */}
        <div className="absolute inset-0 bg-black/60 rounded-xl pointer-events-none transition-colors duration-300 group-hover:bg-black/40" />
        
        <div className="relative z-10 flex flex-col h-full">
          {industry.category && !categorySameAsTitle && (
            <div 
              className={`font-mono mb-1 tracking-wider font-semibold drop-shadow-lg ${
                hasBackgroundImage(industry.id) ? 'text-gold' : 'text-gold'
              }`}
              style={{ fontSize: textScaling.category }}
            >
              {industry.category}
            </div>
          )}
          <h3 
            className="font-bold text-white mb-2 leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] text-center transition-colors duration-300 group-hover:text-gold"
            style={{ fontSize: textScaling.title }}
          >
            {industry.title || 'Card Title'}
          </h3>
          <div 
            className="flex items-center justify-center mb-2 relative flex-shrink-0"
            style={{ minHeight: typeof window !== 'undefined' && window.innerWidth >= 768 ? '60px' : '50px' }}
          >
            <div
              className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/30 text-gold transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:from-gold/30 group-hover:to-gold/40 shadow-[0_0_18px_rgba(255,215,0,0.45)] ring-2 ring-gold/30 md:ring-gold/20 animate-pulse md:animate-none"
              aria-hidden
            >
              {/* Subtle shimmer overlay for mobile visibility */}
              <span
                className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.35),transparent_60%)] opacity-80 md:opacity-0"
              />
              <i 
                className={`${industry.icon || 'fas fa-cube'}`}
                style={{ fontSize: textScaling.icon }}
              />
            </div>
          </div>
          <div className="flex-1 flex items-start justify-center min-h-0">
            <p 
              className={`leading-relaxed font-medium text-center italic drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] ${
                hasBackgroundImage(industry.id) ? 'text-white/90' : 'text-white/90'
              }`}
              style={{ fontSize: textScaling.description }}
            >
              {industry.preview || 'This is an empty card. Content will be added here.'}
            </p>
          </div>
          
          {/* Learn More Button on Front */}
          <div className="mt-3 pt-3 border-t border-white/20">
            <button 
              onClick={onLearnMore}
              className="w-full px-3 py-2 text-xs font-medium bg-transparent border border-gold/50 text-gold rounded-lg transition-all duration-300 hover:bg-gold hover:text-black hover:border-gold hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] focus:ring-2 focus:ring-gold/50 focus:outline-none group/btn relative overflow-hidden"
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
          </div>
        </div>
        
        {/* Premium Feel: Gradient overlays and shadows - matching Our Services */}
        <div className="absolute inset-0 rounded-xl pointer-events-none bg-gold opacity-0 group-hover:opacity-5 active:opacity-5 transition-opacity duration-300" />
        <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-br from-gold/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {/* Glow effect on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(255,215,0,0.35)]" />
      </div>
    </div>
  );
}
