import Layout from "@/components/layout/Layout";
import { OptimizedCareersImage } from "@/components/common";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import Head from "next/head";
import StructuredData, { organizationSchema, createBreadcrumbSchema } from "@/components/common/StructuredData";
import { useParallax } from "@/hooks/useParallax";

export default function CareersPage() {
  const parallax = useParallax(0.25);

  // Structured data for SEO
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://vrnextgen.com';
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: `${baseUrl}` },
    { name: "Careers", url: `${baseUrl}/careers` }
  ]);

  return (
    <Layout title="Careers" description="Join VR NextGen Solutions - We're looking for passionate, curious, and innovative minds to transform businesses with data-driven strategies and technology-driven solutions.">
      <Head>
        <StructuredData data={organizationSchema} />
        <StructuredData data={breadcrumbSchema} />
      </Head>
      <ErrorBoundary>
        {/* Hero Section */}
        <section
          id="careers-hero"
          className="section-hero relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden"
          aria-label="Careers Hero"
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
                  Join Our Team
                </div>

                <div className="space-y-6">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gold leading-tight">
                    Careers
                  </h1>
                  
                  <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                    At VR NextGen Solutions, we believe that our people are the driving force behind our success. We are always looking for passionate, curious, and innovative minds who want to be part of a journey that transforms businesses with data-driven strategies and technology-driven solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section
          id="careers-content"
          className="relative py-16 md:py-24"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image on the left */}
              <div className="relative group">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-105">
                  <OptimizedCareersImage
                    alt="VR NextGen Solutions Careers - Join Our Team of Innovators"
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-gold/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="text-white text-center">
                      <i className="fas fa-users text-4xl text-gold mb-2 transform transition-transform duration-300 group-hover:scale-110"></i>
                      <p className="text-lg font-semibold">Join our innovative team</p>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/20 rounded-full blur-xl group-hover:bg-gold/40 transition-colors duration-300"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/30 transition-colors duration-300"></div>
              </div>

              {/* Content on the right */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    Current Opportunities
                  </h2>
                  
                  <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                        <i className="fas fa-info-circle text-gold text-xl"></i>
                      </div>
                      <h3 className="text-xl font-semibold text-white">No Active Openings</h3>
                    </div>
                    
                    <p className="text-white/80 leading-relaxed mb-4">
                      Currently, there are no active job openings. However, we are constantly growing and new opportunities open up regularly.
                    </p>
                    
                    <div className="border-t border-white/10 pt-4">
                      <h4 className="text-lg font-medium text-gold mb-3">Future Opportunities</h4>
                      <p className="text-white/80 leading-relaxed">
                        If you&apos;d like to be considered for future roles, please send your resume to{" "}
                        <a 
                          href="mailto:info@vrnextgensolutions.com" 
                          className="text-gold hover:text-gold/80 transition-colors duration-200 font-medium"
                        >
                          info@vrnextgensolutions.com
                        </a>
                        . We&apos;ll be in touch when a suitable opportunity arises.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Why Join Us Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Why Join VR NextGen Solutions?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <i className="fas fa-lightbulb text-gold text-sm"></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Innovation Focus</h4>
                        <p className="text-sm text-white/70">Work with cutting-edge technology and data solutions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <i className="fas fa-chart-line text-gold text-sm"></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Growth Opportunities</h4>
                        <p className="text-sm text-white/70">Continuous learning and career development</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <i className="fas fa-handshake text-gold text-sm"></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Collaborative Culture</h4>
                        <p className="text-sm text-white/70">Work with passionate and talented professionals</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <i className="fas fa-globe text-gold text-sm"></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Impact</h4>
                        <p className="text-sm text-white/70">Make a difference in businesses across industries</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ErrorBoundary>
    </Layout>
  );
}
