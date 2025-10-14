import Layout from "@/components/layout/Layout";
import IndustryPageShell from "@/components/sections/industries/IndustryPageShell";

export default function ManufacturingEngineering() {
  return (
    <Layout 
      title="Manufacturing & Engineering" 
      description="Operational excellence and supply chain optimization for manufacturing companies from VR NextGEN Solutions."
    >
      <IndustryPageShell>
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Manufacturing & Engineering
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Manufacturing & Engineering
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Operational excellence and supply chain optimization for manufacturing companies to drive efficiency and innovation.
            </p>
          </div>

          <div
            className="relative rounded-2xl shadow-lg p-8 md:p-12 border border-gold/30 overflow-hidden"
            style={{
              backgroundImage: "url('/images-optimized/Industries/Manufacturing_Engineering.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">Building Smarter, Leaner, and Connected Operations</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We help manufacturers eliminate inefficiencies, align operations, and implement Lean Six Sigma frameworks integrated with real-time dashboards.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                By connecting ERP, production, and maintenance systems, we create visibility across the value chain.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">Our Focus Areas:</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Inventory and Supply Chain Optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">OEE Monitoring and Process Automation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">ERP–Analytics Integration for Real-Time Reporting</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Preventive Maintenance and Resource Allocation Analytics</span>
                </li>
              </ul>

              <p className="text-white leading-relaxed text-lg">🏭 Turning traditional plants into data-smart factories.</p>
            </div>
          </div>
        </div>
      </IndustryPageShell>
    </Layout>
  );
}
