import { use3DTilt } from "@/hooks/use3DTilt";

type Service = { title: string; description: string };

const services: Service[] = [
  { title: "Inventory Management", description: "Streamline your supply chain, track stock, and reduce holding costs." },
  { title: "Production & Operations Coaching", description: "Optimize workflows to ensure timely and cost-efficient output." },
  { title: "Data Analysis & Insights", description: "Transform raw data into meaningful strategies that drive decisions." },
  { title: "Business Strategy Development", description: "Build practical, customized growth roadmaps." },
  { title: "Performance Monitoring", description: "Set KPIs and track success with measurable outcomes." },
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
      className="card-3d card-shadow border border-white/10 rounded-lg p-6 bg-black/40 hover:border-gold transition-all duration-300"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <h3 className="text-xl font-semibold text-white">{service.title}</h3>
      <p className="mt-2 text-sm text-white/70">{service.description}</p>
    </article>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-16 md:py-24" aria-label="Services">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <header className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gold">Our Services</h2>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}


