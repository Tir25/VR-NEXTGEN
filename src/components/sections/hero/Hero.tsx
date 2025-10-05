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
        className="section-hero relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Enhanced Background Elements */}
        <div
          className="absolute inset-0 -z-20 bg-[url('/next.svg')] bg-no-repeat bg-center opacity-[0.03]"
          aria-hidden
          style={{ transform: `translateY(${parallax * -1}px)` }}
        />
        

        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-20 relative z-10">
          <div className="flex items-center justify-center">
            {/* Content */}
            <div className="space-y-8 text-center max-w-4xl">
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
                <div className="group flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 cursor-pointer p-3 rounded-lg hover:bg-gold/5 hover:scale-105">
                  <div className="w-8 h-8 rounded-full bg-gold/20 group-hover:bg-gold/30 group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold group-hover:text-gold group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium group-hover:font-semibold transition-all duration-300">Data-Driven Insights</span>
                </div>
                <div className="group flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 cursor-pointer p-3 rounded-lg hover:bg-gold/5 hover:scale-105">
                  <div className="w-8 h-8 rounded-full bg-gold/20 group-hover:bg-gold/30 group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold group-hover:text-gold group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium group-hover:font-semibold transition-all duration-300">Growth Strategies</span>
                </div>
                <div className="group flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 cursor-pointer p-3 rounded-lg hover:bg-gold/5 hover:scale-105">
                  <div className="w-8 h-8 rounded-full bg-gold/20 group-hover:bg-gold/30 group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold group-hover:text-gold group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium group-hover:font-semibold transition-all duration-300">Operational Excellence</span>
                </div>
                <div className="group flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 cursor-pointer p-3 rounded-lg hover:bg-gold/5 hover:scale-105">
                  <div className="w-8 h-8 rounded-full bg-gold/20 group-hover:bg-gold/30 group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold group-hover:text-gold group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium group-hover:font-semibold transition-all duration-300">Proven Results</span>
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
                    const whySection = document.getElementById('why');
                    if (whySection) {
                      whySection.scrollIntoView({ behavior: 'smooth' });
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

          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}


