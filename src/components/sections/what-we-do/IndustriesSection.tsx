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
      className={`group relative rounded-2xl p-8 transition-all duration-500 card-3d overflow-hidden min-h-[400px] ${
        hasBackground 
          ? 'border border-purple-500/30 hover:border-purple-400/50' 
          : 'bg-gradient-to-br from-white/90 to-gray-50 border border-gray-200 hover:border-sand-yellow/50 hover:from-white hover:to-gray-100'
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
      {/* Background overlay for better text readability */}
      {hasBackground && (
        <div className="absolute inset-0 bg-black/60 rounded-2xl group-hover:bg-black/40 transition-all duration-300" />
      )}
      
      <div className={`relative z-10 flex flex-col items-center justify-center h-full ${hasBackground ? 'text-white' : ''}`}>
        {/* Icon - Centered */}
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 mb-6 ${
          hasBackground 
            ? 'bg-sand-yellow/20 text-sand-yellow group-hover:bg-sand-yellow/30' 
            : 'bg-sand-yellow/10 text-sand-yellow group-hover:bg-sand-yellow/20'
        }`}>
          {industry.icon}
        </div>

        {/* Content - Centered */}
        <div className="text-center space-y-4">
          <h3 className={`text-xl font-bold transition-colors duration-300 ${
            hasBackground 
              ? 'text-white group-hover:text-sand-yellow' 
              : 'text-black group-hover:text-sand-yellow'
          }`}>
            {industry.title}
          </h3>
          <p className={`leading-relaxed text-center ${
            hasBackground ? 'text-white/90' : 'text-black/70'
          }`}>
            {industry.description}
          </p>
        </div>

        {/* Focus Areas - Centered */}
        <div className="text-center space-y-3">
          <h4 className={`text-sm font-semibold uppercase tracking-wider ${
            hasBackground ? 'text-sand-yellow/80' : 'text-black/60'
          }`}>
            Focus Areas
          </h4>
          <ul className="space-y-2">
            {industry.focus.map((area, index) => (
              <li key={index} className={`flex items-center justify-center gap-3 ${
                hasBackground ? 'text-white/80' : 'text-black/70'
              }`}>
                <div className="w-1.5 h-1.5 bg-sand-yellow rounded-full flex-shrink-0"></div>
                <span className="text-sm">{area}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Learn More Button */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <button 
            onClick={handleExploreSolutions}
            className={`w-full px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 focus:ring-2 focus:ring-purple-400/50 focus:outline-none group/btn relative overflow-hidden ${
              hasBackground 
                ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/30 text-white hover:from-purple-500/30 hover:to-cyan-500/30 hover:border-purple-400/50' 
                : 'bg-gradient-to-r from-sand-yellow/20 to-gold/20 border border-sand-yellow/30 text-black hover:from-sand-yellow/30 hover:to-gold/30 hover:border-sand-yellow/50'
            }`}
            aria-label={`Learn more about ${industry.title}`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Learn More
              <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <div className={`absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 ${
              hasBackground 
                ? 'bg-gradient-to-r from-purple-500/10 to-cyan-500/10' 
                : 'bg-gradient-to-r from-sand-yellow/10 to-gold/10'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function IndustriesSection() {
  return (
    <ErrorBoundary>
      <section id="industries" className="section-services relative py-16 md:py-24" aria-label="Industries">
        {/* Background decoration - matching homepage */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Header matching homepage */}
          <header className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-lg font-medium mb-6">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
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
