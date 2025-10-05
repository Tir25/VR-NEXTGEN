import Layout from "@/components/layout/Layout";
import dynamic from "next/dynamic";
import { useParallax } from "@/hooks/useParallax";

// Simple customer story section component
function CustomerStorySection() {
  return (
    <section id="customer-story" className="section-services relative py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-sand-yellow mb-6">
            Customer Stories
          </h2>
          <p className="text-lg text-black/70 max-w-3xl mx-auto leading-relaxed">
            Real transformations, real results. Discover how we've helped businesses achieve their goals.
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white/90 border border-gray-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-black mb-4">Digital Transformation Success</h3>
            <p className="text-black/70 mb-4">Complete digital transformation for TechCorp Solutions.</p>
            <div className="text-sm text-black/60">TechCorp Solutions • Technology</div>
          </div>
          <div className="bg-white/90 border border-gray-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-black mb-4">Data-Driven Growth</h3>
            <p className="text-black/70 mb-4">Advanced analytics implementation for RetailMax Inc.</p>
            <div className="text-sm text-black/60">RetailMax Inc • Retail</div>
          </div>
          <div className="bg-white/90 border border-gray-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-black mb-4">Operational Excellence</h3>
            <p className="text-black/70 mb-4">Lean manufacturing implementation for ManufacturingPro.</p>
            <div className="text-sm text-black/60">ManufacturingPro • Manufacturing</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Simple case study section component
function CaseStudySection() {
  return (
    <section id="case-study" className="section-why-choose relative py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gold mb-6">
            Case Studies
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            In-depth analysis of our most successful projects and transformative results.
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gold mb-4">Enterprise Cloud Migration</h3>
            <p className="text-white/80 mb-4">Complete migration of legacy systems to cloud infrastructure.</p>
            <div className="text-sm text-white/60">Duration: 6 months • Team: 8 specialists</div>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gold mb-4">AI-Powered Analytics</h3>
            <p className="text-white/80 mb-4">Machine learning platform for predictive business analytics.</p>
            <div className="text-sm text-white/60">Duration: 4 months • Team: 6 specialists</div>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gold mb-4">Supply Chain Optimization</h3>
            <p className="text-white/80 mb-4">End-to-end supply chain optimization with real-time tracking.</p>
            <div className="text-sm text-white/60">Duration: 5 months • Team: 10 specialists</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Simple events section component
function EventsSection() {
  return (
    <section id="events" className="section-clients relative py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-sand-yellow mb-6">
            Events & Workshops
          </h2>
          <p className="text-lg text-black/70 max-w-3xl mx-auto leading-relaxed">
            Join us for insightful conferences, hands-on workshops, and networking opportunities.
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/90 border border-gray-200 rounded-2xl p-8">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-black">Digital Transformation Summit 2024</h3>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Upcoming</span>
            </div>
            <p className="text-black/70 mb-4">Join industry leaders for insights on digital transformation trends.</p>
            <div className="text-sm text-black/60">March 15-17, 2024 • San Francisco, CA</div>
          </div>
          <div className="bg-white/90 border border-gray-200 rounded-2xl p-8">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-black">Business Analytics Workshop</h3>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Upcoming</span>
            </div>
            <p className="text-black/70 mb-4">Hands-on workshop covering advanced analytics techniques.</p>
            <div className="text-sm text-black/60">February 28, 2024 • Virtual Event</div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default function WhoWeArePage() {
  const parallax = useParallax(0.25);

  return (
    <Layout title="Who We Are" description="Insights, stories, and expertise from VR NextGEN Solutions">
      {/* Hero Section */}
      <section
        id="hero"
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
      <CustomerStorySection />

      {/* Case Study Section */}
      <CaseStudySection />

      {/* Events Section */}
      <EventsSection />
    </Layout>
  );
}