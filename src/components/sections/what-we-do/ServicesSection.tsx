import { use3DTilt } from "@/hooks/use3DTilt";
import { useRouter } from "next/router";
import ErrorBoundary from "@/components/common/ErrorBoundary";

const services = [
  {
    title: "Strategic Consulting",
    description: "Comprehensive business strategy development and implementation guidance.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    ),
    features: ["Business Planning", "Market Analysis", "Growth Strategy", "Risk Assessment"]
  },
  {
    title: "Data Analytics",
    description: "Advanced data analysis and business intelligence solutions.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    features: ["Data Visualization", "Predictive Analytics", "Performance Metrics", "Reporting"]
  },
  {
    title: "Process Optimization",
    description: "Streamline operations and improve efficiency across all business functions.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
      </svg>
    ),
    features: ["Workflow Analysis", "Automation", "Quality Control", "Efficiency Metrics"]
  },
  {
    title: "Digital Transformation",
    description: "Modernize your business with cutting-edge technology solutions.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
      </svg>
    ),
    features: ["Technology Integration", "Cloud Solutions", "Digital Strategy", "Change Management"]
  },
  {
    title: "Financial Advisory",
    description: "Expert financial planning and investment strategy guidance.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
    ),
    features: ["Financial Planning", "Investment Analysis", "Risk Management", "Budget Optimization"]
  },
  {
    title: "Change Management",
    description: "Guide your organization through successful transformation initiatives.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
      </svg>
    ),
    features: ["Organizational Change", "Training Programs", "Communication Strategy", "Success Metrics"]
  }
];

function ServiceCard({ service }: { service: typeof services[0] }) {
  const router = useRouter();
  const { cardRef, onMouseMove, onMouseLeave } = use3DTilt();

  const handleLearnMore = () => {
    // Map what-we-do services to actual service IDs
    const serviceIdMap: Record<string, string> = {
      "Strategic Consulting": "business-consulting",
      "Data Analytics": "data-analytics", 
      "Process Optimization": "process-optimization",
      "Digital Transformation": "digital-transformation",
      "Financial Advisory": "financial-advisory",
      "Change Management": "change-management"
    };
    
    const serviceId = serviceIdMap[service.title] || "business-consulting";
    router.push(`/services/${serviceId}`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group bg-gradient-to-br from-white/90 to-gray-50 border border-gray-200 rounded-2xl p-8 hover:border-sand-yellow/50 hover:from-white hover:to-gray-100 transition-all duration-500 card-3d hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,215,0,0.25)] active:scale-[1.02] active:shadow-[0_0_20px_rgba(255,215,0,0.25)] relative overflow-hidden"
    >
      <div className="space-y-6">
        {/* Icon */}
        <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
          {service.icon}
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-black group-hover:text-gold transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-black/70 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-black/60 uppercase tracking-wider">
            Key Features
          </h4>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-black/70">
                <div className="w-1.5 h-1.5 bg-sand-yellow rounded-full flex-shrink-0"></div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-gray-200">
          <button 
            onClick={handleLearnMore}
            className="text-sand-yellow font-semibold hover:text-sand-yellow/80 transition-colors duration-300 flex items-center gap-2 group"
          >
            Learn More
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Brightness overlay for consistent hover effect */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-black opacity-0 group-hover:opacity-10 active:opacity-10 transition-opacity duration-300" />
    </div>
  );
}

export default function ServicesSection() {
  return (
    <ErrorBoundary>
      <section id="services" className="section-services relative py-16 md:py-24" aria-label="Services">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sand-yellow/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-sand-yellow/10 rounded-full blur-2xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <header className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Our Services
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gold mb-6">
              Comprehensive Business Solutions
            </h2>
            <p className="text-lg text-black/70 max-w-3xl mx-auto leading-relaxed">
              We provide end-to-end business consulting services that drive measurable results and sustainable growth for your organization.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold/90 transition-colors duration-300 btn-enhanced">
                Get Custom Solution
              </button>
              <button className="px-8 py-4 border border-gold/50 text-gold font-semibold rounded-lg hover:bg-gold/10 transition-colors duration-300 btn-enhanced">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}
