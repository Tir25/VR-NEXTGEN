import { useEffect } from "react";
import { useParallax } from "@/hooks/useParallax";
import { useTypewriter } from "@/hooks/useTypewriter";
import { ScrollReveal } from "@/components/common";

export default function Hero() {
  const parallax = useParallax(0.25);
  const fullText = "Your Partner in Data-Driven Business Growth";
  const { display: headline, isComplete } = useTypewriter(fullText, 80);

  // Prevent automatic scrolling on page load
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <section
      id="hero"
      className="luxury-gradient-mesh floating-particles relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden z-10"
      aria-label="Hero"
    >
      <div
        className="absolute inset-0 -z-10 bg-[url('/next.svg')] bg-no-repeat bg-center opacity-[0.05]"
        aria-hidden
        style={{ transform: `translateY(${parallax * -1}px)` }}
      />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" aria-hidden />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <ScrollReveal preset="fast" className="mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gold leading-tight">
            {headline && headline.length > 0 ? headline : fullText}
            {!isComplete && headline && headline.length > 0 && <span className="animate-pulse">|</span>}
          </h1>
        </ScrollReveal>
        
        <ScrollReveal preset="standard" className="mb-8 sm:mb-10">
          <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl">
            We don&apos;t just consult; we create pathways for your business to thrive.
          </p>
        </ScrollReveal>
        
        <ScrollReveal preset="slow">
          <div className="mt-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log('Get Started button clicked!'); // Debug log
                
                // Enhanced scroll behavior with error handling
                try {
                  const servicesSection = document.getElementById('services');
                  console.log('Services section found:', !!servicesSection); // Debug log
                  
                  if (servicesSection) {
                    console.log('Scrolling to services section...'); // Debug log
                    // Add a small delay to ensure DOM is ready
                    setTimeout(() => {
                      servicesSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                      });
                      console.log('Scroll completed'); // Debug log
                    }, 100);
                  } else {
                    // Fallback: scroll to top of page if services section not found
                    console.warn('Services section not found, scrolling to top');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                } catch (error) {
                  console.error('Error scrolling to services section:', error);
                  // Fallback scroll behavior
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="btn btn--primary btn--medium bg-gold text-black hover:bg-gold/90 hover:scale-[1.02] px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold disabled:opacity-60 disabled:cursor-not-allowed relative z-20 text-sm sm:text-base lg:text-lg"
              aria-label="Explore our services"
              style={{ position: 'relative', zIndex: 20 }}
            >
              Get Started
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


