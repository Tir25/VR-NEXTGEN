import Layout from "@/components/layout/Layout";
import dynamic from "next/dynamic";
import LazyWrapper from "@/components/common/LazyWrapper";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import Head from "next/head";
import StructuredData, { organizationSchema, createBreadcrumbSchema } from "@/components/common/StructuredData";
import { useParallax } from "@/hooks/useParallax";
import { OptimizedWhatWeDoImage } from "@/components/common";

import SkeletonLoader, { GridSkeleton } from "@/components/common/SkeletonLoader";

// Lazy load sections for better performance
const ServicesSection = dynamic(() => import("@/components/sections/what-we-do/ServicesSection"), {
  ssr: false,
  loading: () => (
    <section className="relative py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8">
          <SkeletonLoader variant="rectangular" height={50} width={300} className="mx-auto rounded-full mb-6" />
          <SkeletonLoader variant="text" height={20} width={500} className="mx-auto" />
        </div>
        <GridSkeleton count={6} variant="service" />
      </div>
    </section>
  )
});

const IndustriesSection = dynamic(() => import("@/components/sections/what-we-do/IndustriesSection"), {
  ssr: false,
  loading: () => (
    <section className="relative py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8">
          <SkeletonLoader variant="rectangular" height={50} width={250} className="mx-auto rounded-full mb-6" />
        </div>
        <GridSkeleton count={6} variant="industry" />
      </div>
    </section>
  )
});

export default function WhatWeDoPage() {
  const parallax = useParallax(0.25);

  // Structured data for SEO
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://vrnextgen.com';
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: `${baseUrl}` },
    { name: "What We Do", url: `${baseUrl}/what-we-do` }
  ]);

  return (
    <Layout title="What We Do" description="At VR NEXTGEN, we empower businesses to unlock their full potential through data, strategy, and intelligent transformation across diverse industries.">
      <Head>
        <StructuredData data={organizationSchema} />
        <StructuredData data={breadcrumbSchema} />
      </Head>
      <ErrorBoundary>
        {/* Hero Section */}
        <section
          id="what-we-do-hero"
          className="section-hero relative min-h-[20vh] md:min-h-[25vh] flex items-center overflow-hidden"
          aria-label="What We Do Hero"
        >
          {/* Enhanced Background Elements */}
          <div
            className="absolute inset-0 -z-20 bg-[url('/next.svg')] bg-no-repeat bg-center opacity-[0.03]"
            aria-hidden
            style={{ transform: `translateY(${parallax * -1}px)` }}
          />
          
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6 pb-3 md:pb-4 relative z-10">
            <div className="flex items-center justify-center">
              <div className="space-y-4 text-center max-w-4xl">
                <div className="space-y-4">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gold leading-tight">
                    What We Do
                  </h1>
                  
                  <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                    At VR NEXTGEN, we transform businesses through the power of data, strategy, and intelligent automation. Our comprehensive approach combines cutting-edge analytics, process optimization, and technology integration to drive measurable results and sustainable growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Main Section */}
        <section
          id="what-we-do-main"
          className="relative py-12 md:py-16"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    Empowering Business Excellence Through Data-Driven Solutions
                  </h2>
                  
                  <div className="space-y-4">
                    <p className="text-lg md:text-xl text-white leading-relaxed">
                      We specialize in turning complex business challenges into strategic opportunities. Our expertise spans across business consulting, strategic planning, process optimization, automation, and performance monitoring.
                    </p>
                    
                    <p className="text-lg md:text-xl text-white leading-relaxed">
                      From pharmaceuticals and manufacturing to retail, healthcare, finance, education, and technology, we help organizations evolve into agile, insight-driven enterprises that thrive in today's competitive landscape.
                    </p>
                  </div>

                  {/* Key Benefits */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3 h-3 text-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Data-Driven Decisions</h3>
                        <p className="text-white/70 text-sm">Transform insights into actionable strategies</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3 h-3 text-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Process Excellence</h3>
                        <p className="text-white/70 text-sm">Streamline operations for maximum efficiency</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3 h-3 text-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Strategic Growth</h3>
                        <p className="text-white/70 text-sm">Scale your business with confidence</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3 h-3 text-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Future-Ready Solutions</h3>
                        <p className="text-white/70 text-sm">Build resilience for tomorrow's challenges</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optimized What We Do Image */}
              <div className="relative group">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
                  <OptimizedWhatWeDoImage
                    alt="VR NextGEN Solutions - What We Do - Data-Driven Business Transformation"
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={false}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 mx-auto">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <p className="text-white font-medium">Discover our capabilities</p>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/20 rounded-full blur-xl group-hover:bg-gold/30 transition-colors duration-300"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-colors duration-300"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <div className="py-8 md:py-12">
          <LazyWrapper rootMargin="200px">
            <ServicesSection />
          </LazyWrapper>
        </div>

        {/* Industries Section */}
        <div className="py-8 md:py-12">
          <LazyWrapper rootMargin="400px">
            <IndustriesSection />
          </LazyWrapper>
        </div>
      </ErrorBoundary>
    </Layout>
  );
}
