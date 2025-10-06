import { useParallax } from "@/hooks/useParallax";
import { useScrollFade } from "@/hooks/useScrollFade";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Button from "@/components/common/Button";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import Image from "next/image";

export default function Hero() {
  const parallax = useParallax(0.25);
  const { opacity, isVisible } = useScrollFade();

  // Scroll to top on component mount
  useScrollToTop();

  return (
    <ErrorBoundary>
      <section
        id="hero"
        className="section-hero relative w-full overflow-hidden"
        aria-label="Hero"
        style={{ minHeight: 'calc(100vh - 80px)' }}
      >
        {/* Enhanced Background Elements */}
        <div
          className="absolute inset-0 -z-20 bg-[url('/next.svg')] bg-no-repeat bg-center opacity-[0.03]"
          aria-hidden
          style={{ transform: `translateY(${parallax * -1}px)` }}
        />
        

        {/* Hero Image with Scroll Fade Effect */}
        <div 
          className="absolute inset-x-0 w-full h-full flex items-center justify-center z-10 transition-opacity duration-500 ease-out"
          style={{ 
            top: 0,
            opacity: opacity,
            pointerEvents: isVisible ? 'auto' : 'none'
          }}
        >
          <div className="w-full h-full relative max-w-full">
            <Image
              src="/images/Screenshot 2025-10-06 072718.png"
              alt="VR NextGEN Solutions Dashboard"
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              style={{
                filter: 'brightness(0.85) contrast(1.15) saturate(1.1)',
                mixBlendMode: 'normal'
              }}
            />
          </div>
        </div>

        {/* Content Below Image */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-8 md:pb-12">
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-center">
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


