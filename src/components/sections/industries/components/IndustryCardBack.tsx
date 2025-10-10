import React from 'react';
import { Industry } from '@/types/components';

interface IndustryCardBackProps {
  industry: Industry;
  isFlipped: boolean;
  hasBackgroundImage: (cardId: string) => boolean;
  getBackgroundImagePath: (cardId: string) => string | null;
  textScaling: any;
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
  onLearnMore,
}: IndustryCardBackProps) {
  return (
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
          <h3
            className='font-bold text-white mb-2 leading-tight drop-shadow-lg flex-shrink-0'
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
            {(industry.description || 'This is an empty card. Detailed content will be added here.')
              .split('\n')
              .map((line, index) => (
                <p key={index} className={`${index > 0 ? 'mt-1' : ''} font-medium`}>
                  {line}
                </p>
              ))}
          </div>
          <div
            className='font-mono text-sand-yellow space-y-1 drop-shadow-lg flex-shrink-0'
            style={{ fontSize: textScaling.category }}
          >
            <div className='flex items-center gap-1 font-semibold'>
              <i className='fas fa-map-marker-alt w-2' />
              <span>{industry.location || 'Location'}</span>
            </div>
            <div className='flex items-center gap-1 font-semibold'>
              <i className='fas fa-clock w-2' />
              <span
                className={`${hasBackgroundImage(industry.id) ? 'text-cyan-300' : 'text-cyan-400'}`}
              >
                {industry.timestamp || 'Date'}
              </span>
            </div>
          </div>

          {/* Learn More Button */}
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
      </div>
    </div>
  );
}
