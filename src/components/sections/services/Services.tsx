import { use3DTilt } from "@/hooks/use3DTilt";

type Service = { 
  title: string; 
  description: string; 
  icon: string;
  features: string[];
};

const services: Service[] = [
  { 
    title: "Inventory Management", 
    description: "Streamline your supply chain, track stock, and reduce holding costs.",
    icon: "📦",
    features: ["Real-time tracking", "Cost optimization", "Automated alerts"]
  },
  { 
    title: "Production & Operations Coaching", 
    description: "Optimize workflows to ensure timely and cost-efficient output.",
    icon: "⚙️",
    features: ["Process optimization", "Quality control", "Efficiency gains"]
  },
  { 
    title: "Data Analysis & Insights", 
    description: "Transform raw data into meaningful strategies that drive decisions.",
    icon: "📊",
    features: ["Advanced analytics", "Predictive modeling", "Actionable insights"]
  },
  { 
    title: "Business Strategy Development", 
    description: "Build practical, customized growth roadmaps.",
    icon: "🎯",
    features: ["Strategic planning", "Market analysis", "Growth roadmaps"]
  },
  { 
    title: "Performance Monitoring", 
    description: "Set KPIs and track success with measurable outcomes.",
    icon: "📈",
    features: ["KPI tracking", "Performance metrics", "Success measurement"]
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

  return (
    <article
      ref={cardRef}
      className="group card-3d card-shadow border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-white/90 to-gray-50 hover:border-sand-yellow/50 hover:from-white hover:to-gray-100 transition-all duration-500 relative overflow-hidden"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-sand-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
      
      {/* Icon */}
      <div className="relative z-10 mb-4">
        <div className="w-16 h-16 bg-sand-yellow/10 rounded-xl flex items-center justify-center text-3xl group-hover:bg-sand-yellow/20 group-hover:scale-110 transition-all duration-300">
          {service.icon}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-black mb-3 group-hover:text-sand-yellow transition-colors duration-300">
          {service.title}
        </h3>
        
        <p className="text-sm text-black/70 mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* Features list */}
        <div className="space-y-2">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-black/60">
              <div className="w-1.5 h-1.5 bg-sand-yellow rounded-full" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Learn more link */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="text-sand-yellow text-sm font-medium group-hover:underline cursor-pointer">
            Learn More →
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-services relative py-16 md:py-24" aria-label="Services">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sand-yellow/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-sand-yellow/10 rounded-full blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sand-yellow/10 border border-sand-yellow/30 rounded-full text-sand-yellow text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-sand-yellow rounded-full animate-pulse" />
            Our Expertise
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-sand-yellow mb-6">
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

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-sand-yellow text-black font-semibold rounded-lg hover:bg-sand-yellow/90 transition-colors duration-300 btn-enhanced">
              Get Custom Solution
            </button>
            <button className="px-8 py-4 border border-sand-yellow/50 text-sand-yellow font-semibold rounded-lg hover:bg-sand-yellow/10 transition-colors duration-300 btn-enhanced">
              View Case Studies
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


