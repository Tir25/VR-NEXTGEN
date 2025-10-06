import { use3DTilt } from "@/hooks/use3DTilt";
import { useInView } from "@/hooks/useInView";

type Service = { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  features: string[];
};

const services: Service[] = [
  { 
    title: "Business Consulting & Strategy", 
    description: "Strategic guidance and planning to drive sustainable business growth and competitive advantage.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    ),
    features: ["Strategic Planning", "Market Analysis", "Growth Roadmaps", "Competitive Intelligence"]
  },
  { 
    title: "Process Optimization & Alignment", 
    description: "Streamline operations and align processes for maximum efficiency and productivity gains.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
    ),
    features: ["Workflow Optimization", "Quality Control", "Efficiency Gains", "Performance Metrics"]
  },
  { 
    title: "Data Analytics & Insights", 
    description: "Transform raw data into actionable insights that drive informed decision-making.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
      </svg>
    ),
    features: ["Advanced Analytics", "Predictive Modeling", "Data Mining", "Statistical Analysis"]
  },
  { 
    title: "Data Visualization & Reporting", 
    description: "Create compelling visual representations of data to communicate insights effectively.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    features: ["Interactive Dashboards", "Custom Reports", "Real-time Monitoring", "Visual Analytics"]
  },
  { 
    title: "Automation & Technology Solutions", 
    description: "Implement cutting-edge technology and automation to streamline business operations.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
      </svg>
    ),
    features: ["Process Automation", "Technology Integration", "System Optimization", "Digital Transformation"]
  },
  { 
    title: "End-to-End Business Solutions", 
    description: "Comprehensive solutions that address all aspects of your business challenges.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    features: ["Complete Integration", "Scalable Solutions", "Ongoing Support", "Measurable Results"]
  },
];

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  const { cardRef, onMouseMove, onMouseLeave } = use3DTilt({
    maxTilt: 6,
    enabled: true
  });
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1 });

  // Combine refs properly
  const combinedRef = (node: HTMLElement | null) => {
    cardRef.current = node;
    inViewRef.current = node;
  };

  return (
    <article
      ref={combinedRef}
      className={`group card-3d card-shadow border border-gray-200 rounded-xl p-6 transition-all duration-700 relative overflow-hidden bg-gradient-to-br from-white/90 to-gray-50 hover:border-sand-yellow/50 hover:from-white hover:to-gray-100 transform ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transitionDelay: `${Math.random() * 200}ms` }}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-sand-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
      
      {/* Icon */}
      <div className="relative z-10 mb-4">
        <div className="w-16 h-16 rounded-xl flex items-center justify-center text-sand-yellow group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 bg-sand-yellow/10 group-hover:bg-sand-yellow/20">
          {service.icon}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-3 group-hover:text-sand-yellow transition-colors duration-300 text-black">
          {service.title}
        </h3>
        
        <p className="text-sm mb-4 leading-relaxed text-black/70">
          {service.description}
        </p>

        {/* Features list */}
        <div className="space-y-2">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-black/60 group-hover:text-black/80 transition-colors duration-300">
              <div className="w-1.5 h-1.5 bg-sand-yellow rounded-full group-hover:scale-125 transition-transform duration-300" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Learn more link */}
        <div className="mt-4 pt-4 border-t border-gray-200 group-hover:border-sand-yellow/30 transition-colors duration-300">
          <span className="text-sand-yellow text-sm font-medium group-hover:underline cursor-pointer flex items-center gap-1">
            Learn More 
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-services relative py-16 md:py-24" aria-label="Our Services">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sand-yellow/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-sand-yellow/10 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sand-yellow/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sand-yellow/10 border border-sand-yellow/30 rounded-full text-sand-yellow text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-sand-yellow rounded-full animate-pulse" />
            Our Services
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-sand-yellow mb-6">
            Our Services
          </h2>
          
          <p className="text-lg text-black/70 max-w-3xl mx-auto leading-relaxed">
            We provide comprehensive business solutions that drive measurable results and sustainable growth for your organization.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-sand-yellow text-black font-semibold rounded-lg hover:bg-sand-yellow/90 transition-all duration-300 btn-enhanced hover:scale-105 hover:shadow-lg hover:shadow-sand-yellow/25">
              Get Custom Solution
            </button>
            <button className="px-8 py-4 border border-sand-yellow/50 text-sand-yellow font-semibold rounded-lg hover:bg-sand-yellow/10 transition-all duration-300 btn-enhanced hover:scale-105">
              View Case Studies
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


