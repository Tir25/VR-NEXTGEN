import Layout from "@/components/layout/Layout";
import dynamic from "next/dynamic";
import LazyWrapper from "@/components/common/LazyWrapper";
import { useParallax } from "@/hooks/useParallax";

// Lazy load section components for better performance
const CustomerStorySection = dynamic(() => import("@/components/sections/who-we-are/CustomerStorySection"), {
  ssr: false,
  loading: () => (
    <div className="py-16 md:py-24">
      <div className="animate-pulse bg-gray-200/10 rounded-lg h-96 flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading Customer Stories...</div>
      </div>
    </div>
  )
});

const CaseStudySection = dynamic(() => import("@/components/sections/who-we-are/CaseStudySection"), {
  ssr: false,
  loading: () => (
    <div className="py-16 md:py-24">
      <div className="animate-pulse bg-gray-200/10 rounded-lg h-96 flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading Case Studies...</div>
      </div>
    </div>
  )
});

const EventsSection = dynamic(() => import("@/components/sections/who-we-are/EventsSection"), {
  ssr: false,
  loading: () => (
    <div className="py-16 md:py-24">
      <div className="animate-pulse bg-gray-200/10 rounded-lg h-96 flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading Events...</div>
      </div>
    </div>
  )
});


export default function WhoWeArePage() {
  const parallax = useParallax(0.25);

  return (
    <Layout title="Who We Are" description="Insights, stories, and expertise from VR NextGEN Solutions">
      {/* Hero Section */}
      <section
        id="who-we-are-hero"
        className="section-hero relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden"
      >
        <div
          className="absolute inset-0 -z-20 bg-[url('/next.svg')] bg-no-repeat bg-center opacity-[0.03]"
          style={{ transform: `translateY(${parallax * -1}px)` }}
        />
        
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-20 relative z-10">
          <div className="flex items-center justify-center">
            <div className="space-y-8 text-center max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium">
                <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                Our Insights
              </div>

              <div className="space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gold leading-tight">
                  Who We Are
                </h1>
                
                <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                  Discover our expertise, success stories, and insights that drive business transformation and sustainable growth.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 cursor-pointer p-3 rounded-lg hover:bg-gold/5 hover:scale-105">
                  <div className="w-8 h-8 rounded-full bg-gold/20 group-hover:bg-gold/30 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Customer Stories</span>
                </div>
                <div className="group flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 cursor-pointer p-3 rounded-lg hover:bg-gold/5 hover:scale-105">
                  <div className="w-8 h-8 rounded-full bg-gold/20 group-hover:bg-gold/30 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Case Studies</span>
                </div>
                <div className="group flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 cursor-pointer p-3 rounded-lg hover:bg-gold/5 hover:scale-105">
                  <div className="w-8 h-8 rounded-full bg-gold/20 group-hover:bg-gold/30 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Events</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Story Section */}
      <LazyWrapper rootMargin="400px">
        <CustomerStorySection />
      </LazyWrapper>

      {/* Case Study Section */}
      <LazyWrapper rootMargin="400px">
        <CaseStudySection />
      </LazyWrapper>

      {/* Events Section */}
      <LazyWrapper rootMargin="400px">
        <EventsSection />
      </LazyWrapper>
    </Layout>
  );
}