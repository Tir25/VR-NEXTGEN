
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

export default function WhyChooseUs() {
  return (
    <section id="why" className="py-16 md:py-24" aria-label="Why choose us">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <header className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gold">Why Choose Us</h2>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="text-center p-6 rounded-lg border border-white/10 bg-black/40 hover:border-gold hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-white/70 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



