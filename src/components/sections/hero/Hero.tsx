import { useParallax } from "@/hooks/useParallax";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Button from "@/components/common/Button";
import ErrorBoundary from "@/components/common/ErrorBoundary";

export default function Hero() {
  const parallax = useParallax(0.25);
  const fullText = "Your Partner in Data-Driven Business Growth";
  const { display: headline, isComplete } = useTypewriter(fullText, 80);

  // Scroll to top on component mount
  useScrollToTop();

  return (
    <ErrorBoundary>
      <section
        id="hero"
        className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Enhanced Background Elements */}
        <div
          className="absolute inset-0 -z-10 bg-[url('/next.svg')] bg-no-repeat bg-center opacity-[0.03]"
          aria-hidden
          style={{ transform: `translateY(${parallax * -1}px)` }}
        />
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-gold/20 rotate-45 animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gold/10 rounded-full blur-sm animate-bounce" style={{ animationDuration: '3s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-40 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent rotate-12" />
          <div className="absolute top-1/2 right-1/3 w-16 h-16 border-2 border-gold/30 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
        </div>

        {/* Enhanced gradient orbs */}
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl animate-pulse" aria-hidden />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl animate-pulse" aria-hidden style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-gold/5 blur-2xl animate-pulse" aria-hidden style={{ animationDelay: '2s' }} />

        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Visual Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium">
                <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                Trusted Business Solutions
              </div>

              <div className="space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gold leading-tight">
                  {headline && headline.length > 0 ? headline : fullText}
                  {!isComplete && headline && headline.length > 0 && <span className="animate-pulse">|</span>}
                </h1>
                
                <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                  We don&apos;t just consult; we create pathways for your business to thrive in the digital age.
                </p>
              </div>
              
              {/* Key Benefits Visual List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Data-Driven Insights</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Growth Strategies</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Operational Excellence</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Proven Results</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => {
                    const servicesSection = document.getElementById('services');
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  variant="primary"
                  size="lg"
                  aria-label="Explore our services"
                  className="btn-enhanced"
                >
                  Get Started
                </Button>
                <Button
                  onClick={() => {
                    const aboutSection = document.getElementById('about');
                    if (aboutSection) {
                      aboutSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  variant="outline"
                  size="lg"
                  aria-label="Learn more about us"
                  className="btn-enhanced"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Column - Visual Elements */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-96">
                {/* Central Hub */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gold/20 rounded-full border-2 border-gold/40 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Orbiting Elements */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gold/10 rounded-full border border-gold/30 flex items-center justify-center animate-pulse">
                  <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <div className="absolute top-1/2 right-8 transform -translate-y-1/2 w-16 h-16 bg-gold/10 rounded-full border border-gold/30 flex items-center justify-center animate-pulse" style={{ animationDelay: '0.5s' }}>
                  <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gold/10 rounded-full border border-gold/30 flex items-center justify-center animate-pulse" style={{ animationDelay: '1s' }}>
                  <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <div className="absolute top-1/2 left-8 transform -translate-y-1/2 w-16 h-16 bg-gold/10 rounded-full border border-gold/30 flex items-center justify-center animate-pulse" style={{ animationDelay: '1.5s' }}>
                  <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,215,0,0.3)" />
                      <stop offset="100%" stopColor="rgba(255,215,0,0.1)" />
                    </linearGradient>
                  </defs>
                  <line x1="50%" y1="16%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" />
                  <line x1="84%" y1="50%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <line x1="50%" y1="84%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '1s' }} />
                  <line x1="16%" y1="50%" x2="50%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}


