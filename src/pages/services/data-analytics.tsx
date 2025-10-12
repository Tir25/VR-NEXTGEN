import Layout from "@/components/layout/Layout";
import ServicePageShell from "@/components/sections/services/ServicePageShell";

export default function DataAnalytics() {
  return (
    <Layout 
      title="Data Analytics & Insights" 
      description="Transforming Data into Direction — unify analytics across your enterprise."
    >
      <ServicePageShell
        badgeText="Data Analytics & Insights"
        title="Transforming Data into Direction"
        subtitle="In today’s digital landscape, data is the DNA of decision‑making — and at VR NextGen Solutions, we help businesses decode it effectively."
        cardBgUrl="/images-optimized/Our Services/Data Analytics & Insights.webp"
        cardTitle="Data Analytics & Insights"
      >
            <section className="relative z-10 max-w-none">
              <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
                Our data analytics services transform scattered information into a robust, actionable structure that empowers leaders to take faster, smarter, and more confident decisions.
              </p>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6">
                We understand that today’s CEOs and decision‑makers can’t afford delays — they need to see everything on one page: performance, risk, profitability, and forecasts — to make strategic, real‑time decisions. That’s why our analytical models unify your departments, ensuring that finance, marketing, operations, HR, and supply chain all work at the same pace, driven by the same truth: data.
              </p>

              <h2 className="text-2xl font-bold text-black mb-4">Our Analytics Framework Covers</h2>
              <ul className="space-y-3 md:space-y-4 mb-8">
                {[
                  "Descriptive Analytics: Understanding what has happened through data summaries and KPI dashboards.",
                  "Diagnostic Analytics: Identifying why it happened — through correlation, trend, and root‑cause analysis.",
                  "Predictive Analytics: Anticipating what’s likely to happen using historical patterns and AI‑driven models.",
                  "Prescriptive Analytics: Recommending what actions to take to achieve optimal business outcomes."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group transition-transform duration-200 ease-out hover:translate-x-1">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-black text-xs font-bold transition-transform group-hover:scale-110">✓</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-black mb-4">Integration with ERP Systems</h2>
              <p className="text-gray-700 leading-relaxed">
                Most organizations have Enterprise Resource Planning (ERP) systems — but while ERP is excellent for storing and managing data, it’s not an analytical tool. ERP consolidates data from departments — procurement, production, HR, and finance — in one place, but the real value emerges only when that data is analysed, visualized, and acted upon.
              </p>
            </section>
      </ServicePageShell>
    </Layout>
  );
}


