import Layout from "@/components/layout/Layout";
import ServicePageShell from "@/components/sections/services/ServicePageShell";

export default function BusinessConsulting() {
  return (
    <Layout 
      title="Business Consulting & Strategic Transformation" 
      description="Where Insight Meets Execution — translate vision into structured execution with VR NextGEN Solutions."
    >
      <ServicePageShell
        badgeText="Business Consulting & Strategic Transformation"
        title="Where Insight Meets Execution"
        cardTitle="Business Consulting & Strategic Transformation"
        cardBgUrl="/images-optimized/Our Services/Business Consulting & Strategy.webp"
      >
            <section className="relative z-10 max-w-none">
              <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6">
                We believe that every transformation starts with clarity.
              </p>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6">
                Our strategic consulting framework helps you translate vision into structured execution by aligning your business model,
                people, and processes around data-backed decisions.
              </p>

              <h2 className="text-2xl font-bold text-black mb-4">Our Expertise:</h2>
              <ul className="space-y-3 md:space-y-4 mb-8">
                {[
                  "Strategic Business Assessment: Identify inefficiencies, untapped potential, and performance bottlenecks across departments.",
                  "Business Model Innovation: Redesign value chains, offerings, and delivery mechanisms to stay competitive.",
                  "KPI and Performance Architecture: Define and implement key performance indicators that drive accountability.",
                  "Decision-Support Frameworks: Build systems that connect operational realities with strategic intent."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group transition-transform duration-200 ease-out hover:translate-x-1">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-black text-xs font-bold transition-transform group-hover:scale-110">✓</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl border border-gold/30 bg-gold/10 p-6">
                <h3 className="text-xl font-semibold text-black mb-2">Outcome</h3>
                <p className="text-gray-800">
                  A focused business roadmap with measurable milestones that aligns growth, cost optimization, and innovation.
                </p>
              </div>

              {/* Removed call-to-action per request */}
            </section>
      </ServicePageShell>
    </Layout>
  );
}


