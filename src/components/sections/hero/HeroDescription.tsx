import React from 'react';

export default function HeroDescription() {
  return (
    <section className="section-services relative py-16 md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gold/5 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-lg md:text-xl max-w-5xl mx-auto leading-relaxed" style={{ color: '#E1D9D1' }}>
            At <span className="text-gold font-semibold">VR NextGen Solutions</span>, we empower businesses to achieve excellence through data, process, and strategy. Our end-to-end consulting approach helps organizations optimize operations, automate workflows, and make smarter, data-driven decisions. By aligning people, processes, and technology, we transform challenges into opportunities for sustainable growth.
          </p>
        </div>
      </div>
    </section>
  );
}
