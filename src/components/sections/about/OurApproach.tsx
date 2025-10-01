import { useInView } from "@/hooks/useInView";

const steps = [
  {
    number: "01",
    title: "Analyze",
    description: "Study your data, operations, and market trends."
  },
  {
    number: "02", 
    title: "Strategize",
    description: "Identify gaps and build sustainable solutions."
  },
  {
    number: "03",
    title: "Implement", 
    description: "Guide you step by step in execution."
  },
  {
    number: "04",
    title: "Grow",
    description: "Enable continuous improvement for long-term success."
  }
];

export default function OurApproach() {
  const { ref, inView } = useInView<HTMLDivElement>();
  
  return (
    <section className="py-16 md:py-24" aria-label="Our approach">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gold">Our Approach</h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            A proven methodology that transforms your business from analysis to growth
          </p>
        </header>
        
        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-opacity duration-700 ${inView ? "opacity-100" : "opacity-0"}`}
        >
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative text-center group"
            >
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border-2 border-gold text-gold font-bold text-xl group-hover:bg-gold group-hover:text-black transition-all duration-300">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
              
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-gold/50 to-transparent transform translate-x-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
