import Layout from "@/components/layout/Layout";
import ServicePageShell from "@/components/sections/services/ServicePageShell";

export default function EndToEndSolutions() {
  return (
    <Layout 
      title="End-to-End Business Solutions" 
      description="Integrating Strategy, Process, and Technology for Sustainable Growth"
    >
      <ServicePageShell
        badgeText="End-to-End Business Solutions"
        title="Integrating Strategy, Process, and Technology for Sustainable Growth"
        subtitle="We connect strategy, process, analytics, automation, and capability building into one seamless transformation framework."
        cardBgUrl="/images-optimized/Our Services/End-to-End Business Solutions.webp"
        cardTitle="End-to-End Business Solutions"
      >
            <section className="relative z-10 prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
                Our End‑to‑End Business Solutions are designed to integrate strategy formulation, process optimization, data analytics, automation, and capability building into a single, seamless transformation framework.
              </p>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-8">
                This holistic approach ensures that every department, every system, and every person works in complete alignment — transforming businesses into agile, data‑empowered, future‑ready organizations.
              </p>

              <h2 className="text-2xl font-bold text-black mb-6">Our Approach: The Five‑Phase Transformation Framework</h2>

              <h3 className="text-xl font-semibold text-black mb-2">1. Business Assessment & Diagnostic Mapping</h3>
              <p className="text-gray-700 leading-relaxed mb-3">Deep‑dive into your current processes, data flows, and performance gaps using audits, VSM, and stakeholder interviews.</p>
              <h4 className="text-base font-semibold text-black mb-2">Deliverables:</h4>
              <ul className="space-y-2 md:space-y-3 mb-6">
                {[
                  "Department‑wise efficiency report",
                  "Process flow maps and gap analysis",
                  "KPI baselines and performance dashboards"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group transition-transform duration-200 ease-out hover:translate-x-1">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-black text-xs font-bold transition-transform group-hover:scale-110">✓</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-800 font-medium mb-6">🧩 Every transformation starts with understanding your current reality.</p>

              <h3 className="text-xl font-semibold text-black mb-2">2. Strategy & Design Blueprint</h3>
              <p className="text-gray-700 leading-relaxed mb-3">Roadmap aligned with goals, integrating Lean, Six Sigma, analytics, and automation into a unified plan.</p>
              <h4 className="text-base font-semibold text-black mb-2">Focus Areas:</h4>
              <ul className="space-y-2 md:space-y-3 mb-6">
                {[
                  "Business model alignment with future goals",
                  "Functional interlinking (Finance–Operations–HR–Sales)",
                  "KPI and reporting framework design",
                  "Digital and automation adoption strategy"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group transition-transform duration-200 ease-out hover:translate-x-1">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-gold text-xs font-bold transition-transform group-hover:scale-110">✓</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-800 font-medium mb-6">📍 We turn strategy into structure, and vision into measurable direction.</p>

              <h3 className="text-xl font-semibold text-black mb-2">3. Implementation & Process Optimization</h3>
              <p className="text-gray-700 leading-relaxed mb-3">We execute side‑by‑side with your teams — Lean redesigns, automation workflows, and analytics dashboards bringing strategy to life.</p>
              <h4 className="text-base font-semibold text-black mb-2">Implementation Focus:</h4>
              <ul className="space-y-2 md:space-y-3 mb-6">
                {[
                  "Process Re‑engineering & Standardization",
                  "ERP–Analytics Integration",
                  "Dashboard and Reporting Automation",
                  "Workflow Efficiency Projects (SMED, Kaizen, TQM, etc.)"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group transition-transform duration-200 ease-out hover:translate-x-1">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-gold text-xs font-bold transition-transform group-hover:scale-110">✓</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-800 font-medium mb-6">⚙️ We build systems that work — not reports that gather dust.</p>

              <h3 className="text-xl font-semibold text-black mb-2">4. Capability Development & Change Management</h3>
              <p className="text-gray-700 leading-relaxed mb-3">We develop skills, data literacy, and leadership capacity so change embeds in culture.</p>
              <h4 className="text-base font-semibold text-black mb-2">Programs Include:</h4>
              <ul className="space-y-2 md:space-y-3 mb-6">
                {[
                  "Lean Six Sigma & Process Excellence Training",
                  "Data Literacy & Dashboard Interpretation",
                  "Problem‑Solving and Continuous Improvement Workshops",
                  "Leadership Alignment for Change Adaptation"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group transition-transform duration-200 ease-out hover:translate-x-1">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-gold text-xs font-bold transition-transform group-hover:scale-110">✓</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-800 font-medium mb-6">🎯 Sustainable change happens when people become the engine of progress.</p>

              <h3 className="text-xl font-semibold text-black mb-2">5. Performance Monitoring & Sustainability</h3>
              <p className="text-gray-700 leading-relaxed mb-3">Maintain and scale improvements with real‑time dashboards, automated reporting, and periodic audits.</p>
              <h4 className="text-base font-semibold text-black mb-2">Performance Tools:</h4>
              <ul className="space-y-2 mb-6">
                {[
                  "Real‑Time KPI Monitoring",
                  "Automated Reporting Systems",
                  "Benchmarking & Continuous Feedback Models",
                  "Quarterly Review Frameworks"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-gold text-xs font-bold transition-transform group-hover:scale-110">✓</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-900 font-semibold">An agile, intelligent enterprise that continuously learns, adapts, and grows.</p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">Integrated Solutions That Deliver</h2>
              <p className="text-gray-700 leading-relaxed mb-3">Partner with a team that unifies:</p>
              <ul className="space-y-2 md:space-y-3 mb-8">
                {[
                  "Consulting that redefines strategy",
                  "Process Optimization that strengthens foundations",
                  "Analytics & Visualization that fuel smarter decisions",
                  "Automation that scales efficiency",
                  "Training that empowers people"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group transition-transform duration-200 ease-out hover:translate-x-1">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-gold text-xs font-bold transition-transform group-hover:scale-110">✓</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-900 font-semibold">Together, these elements create a closed‑loop system — where insight leads to action, action creates value, and value fuels continuous improvement.</p>
            </section>
      </ServicePageShell>
    </Layout>
  );
}


