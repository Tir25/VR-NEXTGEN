import Layout from "@/components/layout/Layout";
import dynamic from "next/dynamic";
import LazyWrapper from "@/components/common/LazyWrapper";
import { useParallax } from "@/hooks/useParallax";
import { use3DTilt } from "@/hooks/use3DTilt";
import ErrorBoundary from "@/components/common/ErrorBoundary";

// Lazy load sections for better performance
const ServicesSection = dynamic(() => import("@/components/sections/what-we-do/ServicesSection"), {
  ssr: false,
  loading: () => (
    <div className="py-16 md:py-24">
      <div className="animate-pulse bg-gray-200/10 rounded-lg h-96 flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading Services...</div>
      </div>
    </div>
  )
});

const IndustriesSection = dynamic(() => import("@/components/sections/what-we-do/IndustriesSection"), {
  ssr: false,
  loading: () => (
    <div className="py-16 md:py-24">
      <div className="animate-pulse bg-gray-200/10 rounded-lg h-96 flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading Industries...</div>
      </div>
    </div>
  )
});

export default function WhatWeDoPage() {
  const parallax = useParallax(0.25);
  const { cardRef, onMouseMove, onMouseLeave } = use3DTilt();

  return (
    <Layout title="What We Do" description="Comprehensive business solutions and industry expertise">
      <ErrorBoundary>
        {/* Hero Section */}
        <section
          id="hero"
          className="section-hero relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden"
          aria-label="What We Do Hero"
        >
          {/* Enhanced Background Elements */}
          <div
            className="absolute inset-0 -z-20 bg-[url('/next.svg')] bg-no-repeat bg-center opacity-[0.03]"
            aria-hidden
            style={{ transform: `translateY(${parallax * -1}px)` }}
          />
          
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-20 relative z-10">
            <div className="flex items-center justify-center">
              <div className="space-y-8 text-center max-w-4xl">
                {/* Visual Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium">
                  <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                  Our Solutions
                </div>

                <div className="space-y-6">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gold leading-tight">
                    What We Do
                  </h1>
                  
                  <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                    Comprehensive business solutions designed to drive growth, optimize operations, and deliver measurable results across diverse industries.
                  </p>
                </div>
                
                {/* Key Solutions Visual List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 cursor-pointer p-3 rounded-lg hover:bg-gold/5 hover:scale-105">
                    <div className="w-8 h-8 rounded-full bg-gold/20 group-hover:bg-gold/30 group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                      <svg className="w-4 h-4 text-gold group-hover:text-gold group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium group-hover:font-semibold transition-all duration-300">Strategic Consulting</span>
                  </div>
                  <div className="group flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 cursor-pointer p-3 rounded-lg hover:bg-gold/5 hover:scale-105">
                    <div className="w-8 h-8 rounded-full bg-gold/20 group-hover:bg-gold/30 group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                      <svg className="w-4 h-4 text-gold group-hover:text-gold group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium group-hover:font-semibold transition-all duration-300">Data Analytics</span>
                  </div>
                  <div className="group flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 cursor-pointer p-3 rounded-lg hover:bg-gold/5 hover:scale-105">
                    <div className="w-8 h-8 rounded-full bg-gold/20 group-hover:bg-gold/30 group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                      <svg className="w-4 h-4 text-gold group-hover:text-gold group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium group-hover:font-semibold transition-all duration-300">Process Optimization</span>
                  </div>
                  <div className="group flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 cursor-pointer p-3 rounded-lg hover:bg-gold/5 hover:scale-105">
                    <div className="w-8 h-8 rounded-full bg-gold/20 group-hover:bg-gold/30 group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                      <svg className="w-4 h-4 text-gold group-hover:text-gold group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium group-hover:font-semibold transition-all duration-300">Digital Transformation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <LazyWrapper rootMargin="200px">
          <ServicesSection />
        </LazyWrapper>

        {/* Industries Section */}
        <LazyWrapper rootMargin="200px">
          <IndustriesSection />
        </LazyWrapper>
      </ErrorBoundary>
    </Layout>
  );
}
