import Layout from "@/components/layout/Layout";
import ServicePageShell from "@/components/sections/services/ServicePageShell";

export default function ProcessOptimization() {
  return (
    <Layout 
      title="Process Optimization & Operational Excellence" 
      description="Streamline Processes. Strengthen Systems. Scale Performance."
    >
      <ServicePageShell
        badgeText="Process Optimization & Operational Excellence"
        title="Streamline Processes. Strengthen Systems. Scale Performance."
        subtitle="Operational inefficiency is the silent killer of profitability."
        cardBgUrl="/images-optimized/Our Services/Process Optimization & Alignment.webp"
        cardTitle="Process Optimization & Operational Excellence"
      >
            <section className="relative z-10 max-w-none">
              <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6">
                We specialize in Lean transformation, Six Sigma quality improvement, and advanced process engineering to drive measurable outcomes — reduced waste, faster cycle times, and enhanced productivity.
              </p>

              <h2 className="text-2xl font-bold text-black mb-4">Lean Management – Eliminating Waste, Enhancing Flow</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Lean focuses on removing non-value-added activities and improving flow efficiency across your value chain. We help organizations establish visual management systems and continuous improvement frameworks that maximize every resource.
              </p>
              <h3 className="text-xl font-semibold text-black mb-3">Techniques We Apply:</h3>
              <ul className="space-y-3 md:space-y-4 mb-8">
                {[
                  "5S (Sort, Set, Shine, Standardize, Sustain): Build discipline and structure in workplaces, improving organization and safety.",
                  "Kaizen: Encourage small, employee-led improvements that create large cumulative gains.",
                  "Value Stream Mapping (VSM): Visualize processes end-to-end, identify bottlenecks, and redesign workflows for efficiency.",
                  "Kanban: Streamline production or service delivery through just-in-time scheduling and demand balancing.",
                  "JIT (Just-In-Time): Reduce excess inventory, minimize holding costs, and enhance flexibility."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group transition-transform duration-200 ease-out hover:translate-x-1">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-black text-xs font-bold transition-transform group-hover:scale-110">✓</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-black mb-4">Six Sigma – Driving Quality Through Data</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Six Sigma applies data-driven statistical analysis to reduce process variation and defects. We deploy the DMAIC framework (Define, Measure, Analyze, Improve, Control) to ensure consistency, accuracy, and reliability across operations.
              </p>
              <h3 className="text-xl font-semibold text-black mb-3">Key Techniques:</h3>
              <ul className="space-y-3 md:space-y-4 mb-8">
                {[
                  "Root Cause Analysis (RCA)",
                  "Statistical Process Control (SPC)",
                  "Pareto and Fishbone (Ishikawa) Analysis",
                  "Process Capability (Cp/Cpk) Studies"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group transition-transform duration-200 ease-out hover:translate-x-1">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-black text-xs font-bold transition-transform group-hover:scale-110">✓</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-black mb-4">SMED (Single‑Minute Exchange of Dies) – Reducing Changeover Time</h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                SMED is a game-changer for operations with frequent setups. We convert internal setups to external setups to drastically reduce downtime.
              </p>

              <h2 className="text-2xl font-bold text-black mb-4">Total Quality Management (TQM) – Building a Culture of Excellence</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                TQM embeds quality at every level — from procurement to delivery. We help establish a zero‑defect culture where prevention takes precedence over inspection.
              </p>
              <h3 className="text-xl font-semibold text-black mb-3">Key Components:</h3>
              <ul className="space-y-3 md:space-y-4 mb-8">
                {[
                  "Quality Circles and Employee Involvement",
                  "Standard Operating Procedure (SOP) Optimization",
                  "Poka‑Yoke (Error Proofing) Systems",
                  "Customer Feedback Loops for Continuous Improvement"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group transition-transform duration-200 ease-out hover:translate-x-1">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-black text-xs font-bold transition-transform group-hover:scale-110">✓</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-black mb-4">Kaizen & Continuous Improvement – Sustaining Momentum</h2>
              <p className="text-gray-700 leading-relaxed">
                Beyond frameworks and metrics, transformation requires cultural alignment. Our Kaizen-driven programs embed continuous improvement habits through structured training, goal-based projects, and recognition systems.
              </p>
            </section>
      </ServicePageShell>
    </Layout>
  );
}


