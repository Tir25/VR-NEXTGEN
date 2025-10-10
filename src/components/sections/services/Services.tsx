import React from 'react';
import {
  ServicesSection,
  Container,
  SectionHeader,
  StaggeredWrapper,
  SafeWrapper,
} from '@/components/common';
import ServiceCard from './ServiceCard';
import { SERVICES } from './constants';

export default function Services() {
  const serviceCards = SERVICES.map((service, index) => (
    <ServiceCard key={service.id} service={service} index={index} isVisible={true} />
  ));

  return (
    <ServicesSection id='services' ariaLabel='Our Services'>
      {/* Background decoration */}
      <div className='absolute inset-0 -z-20 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl' />
        <div className='absolute bottom-1/4 right-1/4 w-48 h-48 bg-gold/5 rounded-full blur-2xl' />
      </div>

      <Container>
        <SectionHeader
          badge={{
            text: 'Our Services',
            color: 'gold',
          }}
          title='Comprehensive Business Solutions'
          description='We provide end-to-end business solutions that drive growth, optimize operations, and deliver measurable results across all industries.'
          titleColor='white'
          descriptionColor='gray'
        />

        <SafeWrapper isolate={true}>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8'>
            <StaggeredWrapper items={serviceCards} animation='slideUp' staggerDelay={100} />
          </div>
        </SafeWrapper>
      </Container>
    </ServicesSection>
  );
}
