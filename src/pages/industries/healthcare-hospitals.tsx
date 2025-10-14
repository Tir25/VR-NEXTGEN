import Layout from "@/components/layout/Layout";
import IndustryPageShell from "@/components/sections/industries/IndustryPageShell";

export default function HealthcareHospitals() {
  return (
    <Layout 
      title="Healthcare & Hospitals" 
      description="Specialized consulting for healthcare organizations and hospitals from VR NextGEN Solutions."
    >
      <IndustryPageShell>
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Healthcare & Hospitals
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Healthcare & Hospitals
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Specialized consulting for healthcare organizations and hospitals to improve patient care and operational efficiency.
            </p>
          </div>

          <div
            className="relative rounded-2xl shadow-lg p-8 md:p-12 border border-gold/30 overflow-hidden"
            style={{
              backgroundImage: "url('/images-optimized/Industries/Hospitals and healthcare.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">Enhancing Patient Outcomes Through Process and Data Excellence</h2>
              <p className="text-gray-300 leading-relaxed mb-4">Healthcare transformation starts with operational efficiency and data transparency.</p>
              <p className="text-gray-300 leading-relaxed mb-6">We help hospitals and healthcare providers streamline processes, monitor performance, and improve patient experiences using smart dashboards and workflow redesign.</p>

              <h3 className="text-xl font-semibold text-white mb-4">Our Focus Areas:</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">Hospital Process Optimization (Admissions, Billing, Discharge)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">Bed Utilization and Patient Flow Analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">Resource Allocation and Staffing Dashboards</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">Quality, Compliance, and Accreditation Reporting</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">Outcome:</h3>
              <p className="text-gray-300 leading-relaxed mb-4">Better patient satisfaction, faster service delivery, and reduced administrative inefficiencies.</p>
              <p className="text-white leading-relaxed text-lg">🏥 Data that heals inefficiency.</p>
            </div>
          </div>
        </div>
      </IndustryPageShell>
    </Layout>
  );
}
