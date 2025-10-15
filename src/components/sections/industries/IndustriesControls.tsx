/**
 * IndustriesControls Component
 * Navigation controls for the Industries carousel
 */

import React from 'react';

interface IndustriesControlsProps {
  onNext: () => void;
  onPrev: () => void;
  isRotating: boolean;
}

export default function IndustriesControls({ onNext, onPrev, isRotating }: IndustriesControlsProps) {
  return (
    <div className="flex flex-col items-center gap-2 relative z-20 -mt-8">
      <div className="flex gap-6">
        <button
          onClick={onPrev}
          disabled={isRotating}
          className="w-12 h-12 md:w-14 md:h-14 bg-gold/10 border border-gold/30 text-gold rounded-full flex items-center justify-center hover:bg-gold/20 hover:scale-110 transition-all duration-300 focus:ring-2 focus:ring-gold/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          aria-label="Previous industry"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={onNext}
          disabled={isRotating}
          className="w-12 h-12 md:w-14 md:h-14 bg-gold/10 border border-gold/30 text-gold rounded-full flex items-center justify-center hover:bg-gold/20 hover:scale-110 transition-all duration-300 focus:ring-2 focus:ring-gold/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          aria-label="Next industry"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="text-center mt-2">
        <p className="text-sm text-white/50">
          Use arrow keys, drag, or swipe to navigate • Click cards to flip
        </p>
      </div>
    </div>
  );
}