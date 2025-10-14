import React from 'react';
import { Industry } from '@/types/components';

interface IndustryCardBackProps {
  industry: Industry;
  isFlipped: boolean;
  hasBackgroundImage: (cardId: string) => boolean;
  getBackgroundImagePath: (cardId: string) => string | null;
  textScaling: Record<string, string>;
  responsivePadding: string;
  onLearnMore: (e: React.MouseEvent) => void;
}

export default function IndustryCardBack({
  industry,
  isFlipped,
  hasBackgroundImage,
  getBackgroundImagePath,
  textScaling,
  responsivePadding,
  onLearnMore
}: IndustryCardBackProps) {
  const categorySameAsTitle = (industry.category || '').trim().toLowerCase() === (industry.title || '').trim().toLowerCase();
  const locationText = (industry.location || '').trim();
  const timestampText = (industry.timestamp || '').trim();
  const isGlobal = locationText.toLowerCase() === 'global';
  const isYear2024 = timestampText === '2024';
  const timestampContainsGlobal2024 = timestampText.toLowerCase().includes('global 2024');
  return (
    <div 
      className={`absolute w-full h-full rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-opacity duration-300 ${
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
          <h3 
            className="font-bold text-white mb-2 leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] flex-shrink-0 text-center transition-colors duration-300 group-hover:text-gold"
            style={{ fontSize: textScaling.title }}
          >
            {industry.title || 'Card Title'}
          </h3>
          {industry.category && !categorySameAsTitle && (
            <div 
              className="font-mono text-gold -mt-1 mb-1"
              style={{ fontSize: textScaling.category }}
            >
              {industry.category}
            </div>
          )}
          <div 
            className={`leading-relaxed mb-2 flex-1 overflow-y-auto font-medium italic drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] ${
              hasBackgroundImage(industry.id) ? 'text-white/90' : 'text-white/90'
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
            className="font-mono text-gold space-y-1 drop-shadow-lg flex-shrink-0"
            style={{ fontSize: textScaling.category }}
          >
            {!isGlobal && (
              <div className="flex items-center gap-1 font-semibold">
                <i className="fas fa-map-marker-alt w-2" />
                <span>{locationText || 'Location'}</span>
              </div>
            )}
            {!isYear2024 && !timestampContainsGlobal2024 && (
              <div className="flex items-center gap-1 font-semibold">
                <i className="fas fa-clock w-2" />
                <span className="text-gold">{timestampText || 'Date'}</span>
              </div>
            )}
          </div>
          
          {/* Learn More Button */}
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
      </div>
      
      {/* Premium Feel: Gradient overlays and shadows - matching Our Services */}
      <div className="absolute inset-0 rounded-xl pointer-events-none bg-gold opacity-0 group-hover:opacity-5 active:opacity-5 transition-opacity duration-300" />
      <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-br from-gold/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* Glow effect on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(255,215,0,0.35)]" />
    </div>
  );
}
