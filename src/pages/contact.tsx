import Layout from "@/components/layout/Layout";
import dynamic from "next/dynamic";
import LazyWrapper from "@/components/common/LazyWrapper";
import { COMPANY_INFO } from "@/utils/constants";

// Lazy load the contact form since it's not critical for initial page load
const ContactForm = dynamic(() => import("@/components/contact/ContactForm"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-gray-200/10 rounded-lg h-96 flex items-center justify-center">
      <div className="text-gray-400 text-lg">Loading Contact Form...</div>
    </div>
  )
});

export default function ContactPage() {
  return (
    <Layout title="Contact" description="Get in touch with VR NextGEN Solutions">
      <section id="contact-hero" className="section-hero relative min-h-screen py-16">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-gold/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Get In Touch
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gold mb-6">
              Let&apos;s Start Your Journey
            </h1>
            
            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business? We&apos;re here to help you achieve your goals with data-driven strategies and expert guidance.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <LazyWrapper rootMargin="100px">
              <ContactForm />
            </LazyWrapper>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gold mb-6">Get in Touch</h2>
                <p className="text-white/70 mb-8">
                  We&apos;re here to help you succeed. Reach out to us through any of the channels below.
                </p>
                  </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Office Location</h3>
                    <p className="text-white/70">{COMPANY_INFO.address}</p>
                  </div>
                  </div>
                  
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
                    <p className="text-white/70">{COMPANY_INFO.phone}</p>
                  </div>
                  </div>
                  
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                    <p className="text-white/70">{COMPANY_INFO.email}</p>
                  </div>
                </div>
              </div>


              {/* Response Time */}
              <div className="bg-gold/5 border border-gold/20 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gold">Quick Response</h4>
                </div>
                <p className="text-white/70 text-sm">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}