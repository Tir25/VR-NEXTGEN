import React, { ReactNode } from 'react';
import { Container, SectionBoundary } from '@/components/common';
import BackgroundEffects from '@/components/common/background/BackgroundEffects';

type IndustryPageShellProps = {
  children: ReactNode;
};

export default function IndustryPageShell({ children }: IndustryPageShellProps) {
  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Background layers matching industries section */}
      <div className="absolute inset-0 -z-10">
        <BackgroundEffects currentSection="industries" />
      </div>

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


