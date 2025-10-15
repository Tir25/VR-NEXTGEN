import Layout from "@/components/layout/Layout";
import IndustryPageShell from "@/components/sections/industries/IndustryPageShell";

export default function PharmaceuticalLifeSciences() {
  return (
    <Layout 
      title="Pharmaceutical & Life Sciences" 
      description="Specialized consulting for pharmaceutical and life sciences companies from VR NextGEN Solutions."
    >
      <IndustryPageShell>
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Pharmaceutical & Life Sciences
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pharmaceutical & Life Sciences
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Specialized consulting for pharmaceutical and life sciences companies to drive innovation and regulatory compliance.
            </p>
          </div>

          <div
            className="relative rounded-2xl shadow-lg p-8 md:p-12 border border-gold/30 overflow-hidden"
            style={{
              backgroundImage: "url('/images-optimized/Industries/Pharmaceutical & Life Sciences.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">Driving Compliance, Quality, and Agility</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Pharmaceutical operations demand precision, documentation, and speed.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                We support pharma manufacturers and research organizations in achieving process excellence, compliance accuracy, and digital transformation through data-driven insights.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">Our Focus Areas:</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Lean Manufacturing &amp; GMP Compliance Coaching</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Batch Yield Optimization and Changeover Reduction (SMED)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Digital Documentation and Quality Dashboards</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Expiry, Wastage, and Material Flow Optimization</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">Outcome:</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Better productivity, reduced quality deviations, and data-backed decision-making across production and quality teams.
              </p>
              <p className="text-white leading-relaxed text-lg">💊 Efficiency meets compliance — powered by data.</p>
            </div>
          </div>
        </div>
      </IndustryPageShell>
    </Layout>
  );
}
