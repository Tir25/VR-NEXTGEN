import React from 'react';
import { Industry } from '@/types/components';

interface IndustryCardFrontProps {
  industry: Industry;
  isFlipped: boolean;
  hasBackgroundImage: (cardId: string) => boolean;
  getBackgroundImagePath: (cardId: string) => string | null;
  textScaling: any;
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
  onLearnMore,
}: IndustryCardFrontProps) {
  return (
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
          backgroundSize:
            typeof window !== 'undefined' && window.innerWidth >= 768 ? 'cover' : 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }),
      }}
    >
      <div className='h-full flex flex-col relative' style={{ padding: responsivePadding }}>
        {/* Brightness overlay */}
        <div className='absolute inset-0 bg-black rounded-xl pointer-events-none opacity-60 group-hover:opacity-30 active:opacity-30 transition-opacity duration-300' />

        <div className='relative z-10 flex flex-col h-full'>
          <div
            className={`font-mono mb-1 tracking-wider font-semibold drop-shadow-lg ${
              hasBackgroundImage(industry.id) ? 'text-sand-yellow' : 'text-sand-yellow'
            }`}
            style={{ fontSize: textScaling.category }}
          >
            {industry.category || 'CATEGORY'}
          </div>
          <h3
            className='font-bold text-white mb-2 leading-tight drop-shadow-lg'
            style={{ fontSize: textScaling.title }}
          >
            {industry.title || 'Card Title'}
          </h3>
          <div
            className='flex items-center justify-center mb-2 relative flex-shrink-0'
            style={{
              minHeight:
                typeof window !== 'undefined' && window.innerWidth >= 768 ? '60px' : '50px',
            }}
          >
            <i
              className={`${industry.icon || 'fas fa-cube'} text-sand-yellow drop-shadow-lg`}
              style={{ fontSize: textScaling.icon }}
            />
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-sand-yellow/30 to-transparent animate-pulse' />
          </div>
          <div className='flex-1 flex items-start justify-center min-h-0'>
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
          <div className='mt-3 pt-3 border-t border-white/20'>
            <button
              onClick={onLearnMore}
              className='w-full px-3 py-2 text-xs font-semibold bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/30 text-white rounded-lg transition-all duration-300 hover:from-purple-500/30 hover:to-cyan-500/30 hover:border-purple-400/50 focus:ring-2 focus:ring-purple-400/50 focus:outline-none group/btn relative overflow-hidden'
              aria-label={`Learn more about ${industry.title}`}
            >
              <span className='relative z-10 flex items-center justify-center gap-1'>
                Learn More
                <svg
                  className='w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </span>
              <div className='absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300' />
            </button>
          </div>
        </div>

        <div className='absolute inset-0 rounded-xl pointer-events-none bg-gradient-radial from-purple-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 active:opacity-100' />
      </div>
    </div>
  );
}
