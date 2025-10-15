/**
 * TaglineSection Component
 * Call-to-action section with tagline, description, and Book Now button
 */

import React from 'react';
import Link from 'next/link';

export default function TaglineSection() {
  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-t border-gold/20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-gold/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Tagline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gold leading-tight">
            Let&apos;s Build Your Success Story Together
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            From strategy to automation, we deliver end-to-end solutions that create real business impact.
          </p>
          
          {/* Book Now Button */}
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-gold text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
