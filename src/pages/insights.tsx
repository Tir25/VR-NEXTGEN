import Layout from "@/components/layout/Layout";
import { useParallax } from "@/hooks/useParallax";
import Head from "next/head";
import StructuredData, { organizationSchema, createBreadcrumbSchema } from "@/components/common/StructuredData";

export default function InsightsPage() {
  const parallax = useParallax(0.25);

  // Structured data for SEO
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://vrnextgen.com';
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: `${baseUrl}` },
    { name: "Insights", url: `${baseUrl}/insights` }
  ]);

  const comingSoonSections = [
    {
      id: "customer-stories",
      title: "Customer Stories",
      description: "Real success stories from our clients who have transformed their businesses with our solutions.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: "case-studies",
      title: "Case Studies",
      description: "Detailed case studies showcasing our methodologies and the impact of our solutions across different industries.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: "events",
      title: "Events",
      description: "Upcoming webinars, conferences, and events where you can learn more about our latest insights and solutions.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: "nextgen-blog",
      title: "NextGen Blog",
      description: "Latest insights, trends, and thought leadership articles from our team of experts and industry leaders.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    }
  ];

  return (
    <Layout title="Insights" description="Discover insights, case studies, customer stories, and thought leadership from VR NextGEN Solutions. Coming soon with valuable content to help your business grow.">
      <Head>
        <StructuredData data={organizationSchema} />
        <StructuredData data={breadcrumbSchema} />
      </Head>

      {/* Hero Section */}
      <section
        id="insights-hero"
        className="section-hero relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden"
        aria-label="Insights Hero"
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
              <div className="space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gold leading-tight">
                  Insights
                </h1>
                
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-gold/10 border border-gold/30 rounded-full text-gold text-lg font-medium mb-6">
                  <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                  Coming Soon
                </div>
                
                <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                  We're preparing valuable insights, case studies, customer stories, and thought leadership content to help you stay ahead in the digital transformation journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Sections */}
      <section
        id="coming-soon-sections"
        className="relative py-16 md:py-24"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
              What's Coming
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We're working on bringing you comprehensive insights and resources to support your business growth.
            </p>
          </div>

          {/* Coming Soon Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {comingSoonSections.map((section, index) => (
              <div
                key={section.id}
                className="group relative border border-gray-700 rounded-xl p-8 overflow-hidden hover:border-gold/50 transition-all duration-300 bg-gradient-to-br from-gray-800/80 to-gray-900/90"
              >
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/30 text-gold transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:from-gold/30 group-hover:to-gold/40 shadow-[0_0_18px_rgba(255,215,0,0.45)] ring-2 ring-gold/30 md:ring-gold/20">
                      {section.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-gold">
                      {section.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      {section.description}
                    </p>
                  </div>

                  {/* Coming Soon Badge */}
                  <div className="mt-6 flex justify-center">
                    <span className="inline-flex items-center px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium">
                      <div className="w-2 h-2 bg-gold rounded-full animate-pulse mr-2" />
                      Coming Soon
                    </span>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(255,215,0,0.35)]" />
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">
                Stay Updated
              </h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Be the first to know when we launch our insights content. Subscribe to our newsletter for updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-black bg-gold rounded-full shadow-lg hover:bg-gold/90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gold/50"
                >
                  Contact Us
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="mailto:info@vrnextgensolutions.com"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gold border border-gold/50 rounded-full hover:bg-gold/10 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gold/50"
                >
                  Subscribe to Updates
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
