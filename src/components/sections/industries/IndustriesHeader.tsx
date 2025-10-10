/**
 * IndustriesHeader Component
 * Header section for the Industries page
 */

import React from 'react';

export default function IndustriesHeader() {
  return (
    <header className='text-center mb-20'>
      <div className='inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium mb-6'>
        <div className='w-2 h-2 bg-purple-500 rounded-full animate-pulse' />
        Industries We Serve
      </div>

      <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>Industries We Transform</h2>

      <p className='text-lg text-white/70 max-w-3xl mx-auto leading-relaxed'>
        Explore the diverse industries where our innovative solutions drive transformation and
        deliver measurable results.
      </p>
    </header>
  );
}
