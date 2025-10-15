import Layout from "@/components/layout/Layout";
import ServicePageShell from "@/components/sections/services/ServicePageShell";

export default function AutomationSolutions() {
  return (
    <Layout 
      title="Automation & Technology Solutions" 
      description="Intelligence Through Automation — upgrade productivity and human capital ROI."
    >
      <ServicePageShell
        badgeText="Automation & Technology Solutions"
        title="Intelligence Through Automation"
        subtitle="Automation isn’t replacing your workforce — it’s upgrading your organization. Free your teams to focus on high‑value work while systems handle repetitive tasks."
        cardBgUrl="/images-optimized/Our Services/Automation & Technology Solutions.webp"
        cardTitle="Automation & Technology Solutions"
      >
            <section className="relative z-10 prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
                At VR NextGen Solutions, we design automation systems that allow your teams to focus on high-value strategic work, while repetitive, time-consuming tasks are handled intelligently by systems.
              </p>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6">
                Through workflow automation, RPA (Robotic Process Automation), and advanced data tools, we eliminate redundant work, improve speed, and reduce operational costs.
              </p>
              <h2 className="text-2xl font-bold text-black mb-4">Workforce Optimization & FTE Efficiency</h2>
              <p className="text-gray-700 leading-relaxed mb-3">Automation isn’t just about saving time — it’s about reallocating talent to higher-value tasks. By automating data consolidation, reporting, and administrative tasks, highly skilled and high-salaried professionals can focus on analysis, innovation, and decision-making — not manual work.</p>
              <p className="text-gray-700 leading-relaxed mb-3">This directly impacts Full-Time Equivalent (FTE) utilization, enabling organizations to:</p>
              <ul className="space-y-3 md:space-y-4 mb-6">
                <li className="flex items-start gap-3 transition-transform duration-200 ease-out hover:translate-x-1"><div className="w-2 h-2 bg-gold rounded-full mt-2"></div><span className="text-gray-700">Reduce non‑productive hours</span></li>
                <li className="flex items-start gap-3 transition-transform duration-200 ease-out hover:translate-x-1"><div className="w-2 h-2 bg-gold rounded-full mt-2"></div><span className="text-gray-700">Redirect capacity to strategic initiatives</span></li>
                <li className="flex items-start gap-3 transition-transform duration-200 ease-out hover:translate-x-1"><div className="w-2 h-2 bg-gold rounded-full mt-2"></div><span className="text-gray-700">Increase human capital ROI</span></li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-6">We also help you evaluate automation equipment and software FTE requirements, ensuring the right balance between technology investment and manpower optimization.</p>
              <p className="text-gray-800 font-semibold mb-8">⚙️ Automation isn’t replacing your workforce — it’s upgrading your organization.</p>

              <h2 className="text-2xl font-bold text-black mb-4">The Future Is Intelligent. The Future Is Integrated.</h2>
              <p className="text-gray-700 leading-relaxed mb-2">With the synergy of Data Analytics, Visualization, and Automation, VR NextGen Solutions helps organizations evolve into insight-driven, agile enterprises — where every process, every decision, and every person is powered by data and driven by strategy.</p>
              <p className="text-gray-900 font-semibold">🌐 Partner with VR NextGen Solutions — where data transforms into direction, and automation powers your next leap of growth.</p>
            </section>
      </ServicePageShell>
    </Layout>
  );
}


