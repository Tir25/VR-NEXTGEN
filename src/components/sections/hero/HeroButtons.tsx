/**
 * HeroButtons Component
 * Action buttons for the hero section
 */

import React from 'react';
import { Button, Container } from '@/components/common';
import { HERO_BUTTONS } from './constants';

export default function HeroButtons() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToIndustries = () => {
    const industriesSection = document.getElementById('industries');
    if (industriesSection) {
      industriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="z-20 pb-6 md:pb-12 md:absolute md:bottom-0 md:left-0 md:right-0">
      <Container size="lg">
        <div className="flex items-center justify-center">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 mt-8 md:mt-0">
            <Button
              onClick={scrollToServices}
              variant={HERO_BUTTONS.primary.variant}
              size="lg"
              aria-label="Explore our services"
              className="btn-enhanced w-full sm:w-auto"
            >
              {HERO_BUTTONS.primary.text}
            </Button>

            <Button
              onClick={scrollToIndustries}
              variant={HERO_BUTTONS.secondary.variant}
              size="lg"
              aria-label="Explore our industries"
              className="btn-enhanced w-full sm:w-auto"
            >
              {HERO_BUTTONS.secondary.text}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
