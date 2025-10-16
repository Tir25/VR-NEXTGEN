import { use3DTilt } from "@/hooks/use3DTilt";
import { useRouter } from "next/router";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { INDUSTRIES } from "../industries/constants";
import { hasIndustryBackgroundImage, getIndustryBackgroundImage } from "@/config";


// Map industries from homepage constants to what-we-do format
const industries = INDUSTRIES.map(industry => ({
  title: industry.title,
  description: industry.preview,
  icon: (
    <i className={`${industry.icon} text-2xl`} />
  ),
  focus: industry.description.split('\n').slice(0, 4).map(line => line.replace('• ', '').trim())
}));

function IndustryCard({ industry }: { industry: typeof industries[0] }) {
  const router = useRouter();
  const { cardRef, onMouseMove, onMouseLeave } = use3DTilt();

  const handleExploreSolutions = () => {
    // Navigate to the industry page
    const industryId = INDUSTRIES.find(ind => ind.title === industry.title)?.id || "other-industries";
    router.push(`/industries/${industryId}`);
  };

  // Get the industry ID for background image lookup
  const industryId = INDUSTRIES.find(ind => ind.title === industry.title)?.id || "other-industries";
  const hasBackground = hasIndustryBackgroundImage(industryId);
  const backgroundImage = hasBackground ? getIndustryBackgroundImage(industryId) : null;

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`group relative rounded-xl p-6 transition-all duration-500 card-3d overflow-hidden min-h-[400px] border border-gray-700 focus-within:ring-2 focus-within:ring-gold/50 focus-within:ring-offset-2 ${
        hasBackground 
          ? 'border border-gray-700 hover:border-gold/50' 
          : 'bg-gradient-to-br from-gray-800/80 to-gray-900/90 border border-gray-700 hover:border-gold/50'
      }`}
      style={{
        ...(hasBackground && backgroundImage && {
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        })
      }}
    >
      {/* Readability overlay with hover easing - matching Our Services */}
      <div className="absolute inset-0 bg-black/60 rounded-xl group-hover:bg-black/40 transition-colors duration-300" />
      
      <div className={`relative z-10 flex flex-col items-center justify-center h-full ${hasBackground ? 'text-white' : ''}`}>
        {/* Icon - Centered - matching Our Services styling */}
        <div className="flex justify-center mb-6">
          <div
            className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/30 text-gold transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:from-gold/30 group-hover:to-gold/40 shadow-[0_0_18px_rgba(255,215,0,0.45)] ring-2 ring-gold/30 md:ring-gold/20 animate-pulse md:animate-none"
            aria-hidden
          >
            {/* Subtle shimmer overlay for mobile visibility */}
            <span
              className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.35),transparent_60%)] opacity-80 md:opacity-0"
            />
            {industry.icon}
          </div>
        </div>

        {/* Content - Centered */}
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] transition-colors duration-300 group-hover:text-gold">
            {industry.title}
          </h3>
          <p className="text-white/90 leading-relaxed text-sm md:text-base italic drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
            {industry.description}
          </p>
        </div>

        {/* Focus Areas - Centered - matching Our Services styling */}
        <div className="text-center space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold/80">
            Focus Areas
          </h4>
          <ul className="space-y-2">
            {industry.focus.map((area, index) => (
              <li key={index} className="flex items-center justify-center gap-2 text-sm text-white/85 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                <span className="w-4 h-4 flex items-center justify-center rounded-full bg-gold/20 text-gold text-xs font-bold flex-shrink-0 transition-all duration-300 group-hover:scale-110">
                  ✓
                </span>
                {area}
              </li>
            ))}
          </ul>
        </div>

        {/* Learn More Button - matching Our Services styling */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <button 
            onClick={handleExploreSolutions}
            className="w-full px-4 py-2 text-sm font-medium bg-transparent border border-gold/50 text-gold rounded-lg transition-all duration-300 hover:bg-gold hover:text-black hover:border-gold hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] focus:ring-2 focus:ring-gold/50 focus:outline-none group/btn relative overflow-hidden"
            aria-label={`Learn more about ${industry.title}`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Learn More
              <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            {/* Button background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
      
      {/* Premium Feel: Gradient overlays and shadows - matching Our Services */}
      <div className="absolute inset-0 rounded-xl pointer-events-none bg-gold opacity-0 group-hover:opacity-5 active:opacity-5 transition-opacity duration-300" />
      <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-br from-gold/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* Glow effect on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(255,215,0,0.35)]" />
    </div>
  );
}

export default function IndustriesSection() {
  return (
    <ErrorBoundary>
      <section id="industries" className="section-services relative py-8 md:py-12" aria-label="Industries">
        {/* Background decoration - matching Our Services */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gold/5 rounded-full blur-2xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Header matching homepage */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gold/10 border border-gold/30 rounded-full text-gold text-lg font-medium mb-6">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Industries We Serve
            </div>
            
            {/* Title and Content matching homepage */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gold mb-6">
              See How We Turn Data into Decisions, Everywhere
            </h2>
            <p className="text-lg md:text-xl text-white max-w-4xl mx-auto leading-relaxed">
              Explore how VR NextGen Solutions empowers businesses across industries through data-driven strategies, automation, and process excellence. Select your industry to see how we turn challenges into measurable growth.
            </p>
          </header>


          {/* Grid layout using existing cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <IndustryCard key={industry.title} industry={industry} />
            ))}
          </div>

        </div>
      </section>
    </ErrorBoundary>
  );
}
