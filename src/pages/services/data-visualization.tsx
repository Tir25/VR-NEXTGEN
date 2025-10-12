import Layout from "@/components/layout/Layout";
import ServicePageShell from "@/components/sections/services/ServicePageShell";

export default function DataVisualization() {
  return (
    <Layout 
      title="Data Visualization & Reporting" 
      description="See What Matters. Act with Clarity."
    >
      <ServicePageShell
        badgeText="Data Visualization & Reporting"
        title="See What Matters. Act with Clarity."
        subtitle="In the modern enterprise, clarity drives confidence."
        cardBgUrl="/images-optimized/Our Services/Data Visualization & Reporting.webp"
        cardTitle="Data Visualization & Reporting"
      >
            <section className="relative z-10 max-w-none">
              <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
                We help organizations transform complex datasets into clear, dynamic, and actionable visual stories — making performance insights accessible to everyone, from analysts to the CEO.
              </p>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6">
                Every leader needs the power of visibility — the ability to see trends, performance gaps, and progress across departments on a single page.
                Our visualization solutions ensure that executives can monitor KPIs, compare business units, and track strategic goals instantly, without diving into spreadsheets.
              </p>

              <h2 className="text-2xl font-bold text-black mb-4">Our Expertise Includes:</h2>
              <ul className="space-y-3 md:space-y-4 mb-8">
                {[
                  "Interactive Dashboards: Real-time, drill-down dashboards using Power BI and Tableau.",
                  "Automated KPI Reporting: Daily, weekly, or monthly reports without manual effort.",
                  "Cross-Department Visualization: Integrated dashboards covering Sales, Operations, Finance, and HR on one interface.",
                  "Custom Gantt Charts & Timelines: Visual representation of project progress, dependencies, and milestones.",
                  "Performance Tracking Models: Custom-built dashboards for OEE, cost analysis, and utilization metrics."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group transition-transform duration-200 ease-out hover:translate-x-1">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-black text-xs font-bold transition-transform group-hover:scale-110">✓</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-black mb-4">Why It Matters</h2>
              <ul className="space-y-3 md:space-y-4 mb-8">
                {[
                  "Data storytelling empowers leadership to act decisively.",
                  "Visual management bridges the communication gap between teams.",
                  "Shared dashboards align all departments on common objectives.",
                  "Leaders can shift focus from data gathering to strategic execution."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group transition-transform duration-200 ease-out hover:translate-x-1">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-gold text-xs font-bold transition-transform group-hover:scale-110">✓</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl border border-gold/30 bg-gold/10 p-6">
                <h3 className="text-xl font-semibold text-black mb-2">Outcome</h3>
                <p className="text-gray-800 mb-2">A transparent, agile, and insight-driven organization that moves in one direction — forward.</p>
                <p className="text-gray-900 font-semibold">We don’t just visualize data — we visualize decisions.</p>
              </div>
            </section>
      </ServicePageShell>
    </Layout>
  );
}


