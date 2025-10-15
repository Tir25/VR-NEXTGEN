/**
 * Reusable Section Component
 * Provides consistent section layout with background, padding, and container
 */

import React from 'react';
import ErrorBoundary from './ErrorBoundary';
// import Container from './Container';

export interface SectionProps {
  id: string;
  className?: string;
  background?: 'hero' | 'services' | 'industries' | 'why-choose' | 'clients' | 'custom';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  minHeight?: string;
  ariaLabel?: string;
  children: React.ReactNode;
  enableErrorBoundary?: boolean;
}

const paddingClasses = {
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16', 
  lg: 'py-16 md:py-20',
  xl: 'py-16 md:py-24',
};

export default function Section({
  id,
  className = '',
  background = 'custom',
  padding = 'lg',
  minHeight,
  ariaLabel,
  children,
  enableErrorBoundary = true,
}: SectionProps) {
  const sectionClass = background === 'custom' ? '' : `section-${background}`;
  const paddingClass = paddingClasses[padding];

  const sectionElement = (
    <section
      id={id}
      className={`${sectionClass} relative overflow-hidden ${paddingClass} ${className}`}
      aria-label={ariaLabel}
      style={{ minHeight }}
    >
      {children}
    </section>
  );

  if (enableErrorBoundary) {
    return <ErrorBoundary>{sectionElement}</ErrorBoundary>;
  }

  return sectionElement;
}

// Convenience components for common section types
export const HeroSection = (props: Omit<SectionProps, 'background' | 'padding'>) => (
  <Section {...props} background="hero" padding="lg" className={`${props.className || ''} pb-2 md:pb-3`} />
);

export const ServicesSection = (props: Omit<SectionProps, 'background' | 'padding'>) => (
  <Section {...props} background="services" padding="lg" />
);

export const IndustriesSection = (props: Omit<SectionProps, 'background' | 'padding'>) => (
  <Section {...props} background="industries" padding="sm" className={`${props.className || ''} overflow-visible`} />
);

export const WhyChooseSection = (props: Omit<SectionProps, 'background' | 'padding'>) => (
  <Section {...props} background="why-choose" padding="lg" />
);

export const ClientsSection = (props: Omit<SectionProps, 'background' | 'padding'>) => (
  <Section {...props} background="clients" padding="lg" />
);
