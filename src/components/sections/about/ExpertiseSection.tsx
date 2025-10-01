type Point = { title: string; description: string; icon: string };

const points: Point[] = [
  { title: "Data-Driven Strategy", description: "Define vision, roadmap, and governance to unlock enterprise value.", icon: "📊" },
  { title: "Actionable Insights", description: "Decision-ready dashboards and experiments that inform action.", icon: "💡" },
  { title: "Measurable Results", description: "Clear KPIs and outcomes tied to business objectives.", icon: "📈" },
];

export default function ExpertiseSection() {
  return (
    <section className="py-16 md:py-24" aria-label="Expertise and approach">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gold mb-8">Our Approach</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((p) => (
            <div key={p.title} className="border border-white/10 rounded-lg p-6 bg-black/40 hover:border-gold hover:shadow-lg hover:scale-[1.02] transition">
              <div aria-hidden className="text-3xl mb-3">{p.icon}</div>
              <h3 className="text-xl font-semibold text-white">{p.title}</h3>
              <p className="text-white/70 text-sm mt-1">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


