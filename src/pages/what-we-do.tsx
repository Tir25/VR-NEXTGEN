import Layout from "@/components/layout/Layout";
import dynamic from "next/dynamic";
import LazyWrapper from "@/components/common/LazyWrapper";
import { useParallax } from "@/hooks/useParallax";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import Head from "next/head";
import StructuredData, { organizationSchema, createBreadcrumbSchema } from "@/components/common/StructuredData";

import SkeletonLoader, { GridSkeleton } from "@/components/common/SkeletonLoader";

// Lazy load sections for better performance
const ServicesSection = dynamic(() => import("@/components/sections/what-we-do/ServicesSection"), {
  ssr: false,
  loading: () => (
    <section className="relative py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
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
    <section className="relative py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
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
          className="section-hero relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden"
          aria-label="What We Do Hero"
        >
          {/* Enhanced Background Elements */}
          <div
            className="absolute inset-0 -z-20 bg-[url('/next.svg')] bg-no-repeat bg-center opacity-[0.03]"
            aria-hidden
            style={{ transform: `translateY(${parallax * -1}px)` }}
          />
          
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-20 pb-2 md:pb-3 relative z-10">
            <div className="flex items-center justify-center">
              <div className="space-y-8 text-center max-w-4xl">
                <div className="space-y-6">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gold leading-tight">
                    What We Do
                  </h1>
                  
                  <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                    At VR NEXTGEN, we empower businesses to unlock their full potential through data, strategy, and intelligent transformation. We combine analytics, process excellence, and technology to help organizations make smarter decisions, enhance performance, and achieve sustainable growth. From business consulting and strategic planning to process optimization, automation, and performance monitoring, we design solutions that are practical, data-backed, and impact-driven. Our team works closely with industries across pharmaceuticals, manufacturing, retail, healthcare, finance, education, and technology, helping them evolve into agile, insight-led enterprises. At VR NEXTGEN, we don&apos;t just deliver data — we turn it into a strategic advantage, shaping a smarter, faster, and more resilient future for your business.
                  </p>
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
        <LazyWrapper rootMargin="400px">
          <IndustriesSection />
        </LazyWrapper>
      </ErrorBoundary>
    </Layout>
  );
}
