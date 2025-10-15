'use client';

import React, { memo } from 'react';
import dynamic from 'next/dynamic';
import { IndustriesSection, Container, SectionHeader } from '@/components/common';

// Dynamic import for heavy CircularIndustryCarousel component
const CircularIndustryCarousel = dynamic(() => import('./CircularIndustryCarousel'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-16">
      <div className="animate-pulse text-gold text-lg">Loading Industries...</div>
    </div>
  )
});


function Industries() {
  return (
    <IndustriesSection id="industries" ariaLabel="Industries We Serve">
      <Container>
        <SectionHeader
          badge={{
            text: "Industries We Serve",
            color: "gold",
            size: "xl"
          }}
          showTitle={false}
          showDescription={false}
        />
        
        {/* Title and Content */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gold mb-6">
            See How We Turn Data into Decisions, Everywhere
          </h2>
          <p className="text-lg md:text-xl text-white max-w-4xl mx-auto leading-relaxed">
            Explore how VR NextGen Solutions empowers businesses across industries through data-driven strategies, automation, and process excellence. Select your industry to see how we turn challenges into measurable growth.
          </p>
        </div>
        
        {/* Circular Industry Carousel */}
        <CircularIndustryCarousel />
      </Container>
    </IndustriesSection>
  );
}

export default memo(Industries);