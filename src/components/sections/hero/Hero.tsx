import { useEffect } from "react";
import { useParallax } from "@/hooks/useParallax";
import { useTypewriter } from "@/hooks/useTypewriter";
import Button from "@/components/common/Button";
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

      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-20">
        <ScrollReveal preset="fast" className="mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gold whitespace-nowrap">
            {headline && headline.length > 0 ? headline : fullText}
            {!isComplete && headline && headline.length > 0 && <span className="animate-pulse">|</span>}
          </h1>
        </ScrollReveal>
        
        <ScrollReveal preset="standard" className="mb-10">
          <p className="mt-6 max-w-2xl text-white/80">
            We don&apos;t just consult; we create pathways for your business to thrive.
          </p>
        </ScrollReveal>
        
        <ScrollReveal preset="slow">
          <div className="mt-10">
            <Button
              onClick={() => {
                // Enhanced scroll behavior with error handling
                try {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    // Add a small delay to ensure DOM is ready
                    setTimeout(() => {
                      servicesSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                      });
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
              variant="primary"
              size="md"
              aria-label="Explore our services"
            >
              Get Started
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


