'use client';

import React, { useState, useEffect, memo } from 'react';
import { IndustriesSection, Container, SectionHeader, SafeWrapper } from '@/components/common';
import DesktopCarousel from './DesktopCarousel';
import ScrollCarousel from '@/components/ui/ScrollCarousel';
import { INDUSTRIES } from './constants';

function Industries() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check screen size and update state
  useEffect(() => {
    let rafId: number;

    const checkDesktop = () => {
      const matches = window.matchMedia('(min-width: 768px)').matches;
      setIsDesktop(matches);
      setIsLoading(false);
    };

    // Initial check with RAF for smooth rendering
    rafId = requestAnimationFrame(checkDesktop);

    // Add resize listener with throttling
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkDesktop);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      window.addEventListener('resize', handleChange);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
        window.removeEventListener('resize', handleChange);
      }
    };
  }, []);

  // Show loading state to prevent hydration mismatch
  if (isLoading) {
    return (
      <IndustriesSection id='industries' ariaLabel='Industries We Serve'>
        <Container>
          <SectionHeader
            badge={{
              text: 'Industries We Serve',
              color: 'purple',
            }}
            title='Industries We Transform'
            description='Explore the diverse industries where our innovative solutions drive transformation and deliver measurable results.'
            titleColor='white'
            descriptionColor='white'
          />
          <div className='flex items-center justify-center min-h-[400px]'>
            <div className='animate-pulse text-white/50'>Loading...</div>
          </div>
        </Container>
      </IndustriesSection>
    );
  }

  return (
    <SafeWrapper isolate={true}>
      {isDesktop ? (
        <DesktopCarousel />
      ) : (
        <IndustriesSection id='industries' ariaLabel='Industries We Serve'>
          <Container>
            <SectionHeader
              badge={{
                text: 'Industries We Serve',
                color: 'purple',
              }}
              title='Industries We Transform'
              description='Explore the diverse industries where our innovative solutions drive transformation and deliver measurable results.'
              titleColor='white'
              descriptionColor='white'
              compact
            />
            {/* Context heading and description between section header and carousel */}
            <div className='mt-3 mb-1 text-center'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white'>
                See How We Turn Data into Decisions, Everywhere
              </h2>
              <p className='mt-3 text-white/80 max-w-3xl mx-auto'>
                Explore how VR NextGen Solutions empowers businesses across industries through
                data-driven strategies, automation, and process excellence. Select your industry to
                see how we turn challenges into measurable growth.
              </p>
            </div>
            <ScrollCarousel industries={INDUSTRIES} className='pt-2 pb-4' />
          </Container>
        </IndustriesSection>
      )}
    </SafeWrapper>
  );
}

export default memo(Industries);
