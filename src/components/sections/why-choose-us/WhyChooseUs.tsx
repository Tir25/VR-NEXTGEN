
import { use3DTilt } from "@/hooks/use3DTilt";

const benefits = [
  { 
    icon: "📊", 
    title: "Data-Driven Decisions", 
    description: "No guesswork—pure insights." 
  },
  { 
    icon: "🎯", 
    title: "Customized Solutions", 
    description: "Every business is unique, and so are our strategies." 
  },
  { 
    icon: "🔄", 
    title: "End-to-End Support", 
    description: "From raw material to customer delivery." 
  },
  { 
    icon: "🚀", 
    title: "NextGen Thinking", 
    description: "Innovative, future-ready solutions for modern businesses." 
  },
];

interface BenefitCardProps {
  benefit: typeof benefits[0];
}

function BenefitCard({ benefit }: BenefitCardProps) {
  const { cardRef, onMouseMove, onMouseLeave } = use3DTilt({
    maxTilt: 5,
    enabled: true
  });

  return (
    <div
      ref={cardRef}
      className="card-3d card-shadow text-center p-6 rounded-lg border border-white/10 bg-black/40 hover:border-gold transition-all duration-300"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="text-4xl mb-4">{benefit.icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
      <p className="text-white/70 text-sm">{benefit.description}</p>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section id="why" className="py-16 md:py-24" aria-label="Why choose us">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <header className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gold">Why Choose Us</h2>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.title} benefit={benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}



