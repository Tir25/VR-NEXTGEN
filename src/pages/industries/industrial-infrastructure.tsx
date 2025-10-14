import Layout from "@/components/layout/Layout";
import IndustryPageShell from "@/components/sections/industries/IndustryPageShell";

export default function IndustrialInfrastructure() {
  return (
    <Layout 
      title="Industrial & Infrastructure" 
      description="Operational excellence and infrastructure optimization for industrial and infrastructure companies from VR NextGEN Solutions."
    >
      <IndustryPageShell>
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Industrial & Infrastructure
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Industrial & Infrastructure
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Operational excellence and infrastructure optimization for industrial and infrastructure companies.
            </p>
          </div>

          <div
            className="relative rounded-2xl shadow-lg p-8 md:p-12 border border-gold/30 overflow-hidden"
            style={{
              backgroundImage: "url('/images-optimized/Industries/engineering.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">Building Efficiency from the Ground Up</h2>
              <p className="text-gray-300 leading-relaxed mb-4">We partner with industrial and infrastructure firms to bring visibility and control to complex projects.</p>
              <p className="text-gray-300 leading-relaxed mb-6">Our analytics and project management tools ensure timely delivery, cost control, and resource efficiency.</p>

              <h3 className="text-xl font-semibold text-white mb-4">Our Focus Areas:</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Project Gantt Charts and Progress Dashboards</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Material, Cost, and Resource Utilization Analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Delay Prediction and Risk Mitigation Frameworks</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Contractor and Vendor Performance Monitoring</span>
                </li>
              </ul>

              <p className="text-white leading-relaxed text-lg">🏗️ Engineering excellence through intelligence</p>
            </div>
          </div>
        </div>
      </IndustryPageShell>
    </Layout>
  );
}
