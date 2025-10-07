import React, { ReactNode } from 'react';
import { Container, SectionBoundary } from '@/components/common';
import BackgroundEffects from '@/components/common/BackgroundEffects';

type IndustryPageShellProps = {
  children: ReactNode;
};

export default function IndustryPageShell({ children }: IndustryPageShellProps) {
  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Background layers matching industries section */}
      <BackgroundEffects variant="industries" zIndex={-1} className="absolute inset-0 -z-10" />

      <SectionBoundary>
        <Container>
          <div className="py-12 md:py-16 lg:py-20">
            {children}
          </div>
        </Container>
      </SectionBoundary>
    </section>
  );
}


