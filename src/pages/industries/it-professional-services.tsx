import Layout from "@/components/layout/Layout";
import IndustryPageShell from "@/components/sections/industries/IndustryPageShell";

export default function ITProfessionalServices() {
  return (
    <Layout 
      title="IT & Professional Services" 
      description="Technology solutions and digital transformation for IT and professional services companies from VR NextGEN Solutions."
    >
      <IndustryPageShell>
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              IT & Professional Services
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              IT & Professional Services
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Technology solutions and digital transformation for IT and professional services companies.
            </p>
          </div>

          <div
            className="relative rounded-2xl shadow-lg p-8 md:p-12 border border-gold/30 overflow-hidden"
            style={{
              backgroundImage: "url('/images-optimized/Industries/IT.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">Optimizing Human Capital and Project Delivery</h2>
              <p className="text-gray-300 leading-relaxed mb-4">Service excellence depends on smart time management and transparent reporting.</p>
              <p className="text-gray-300 leading-relaxed mb-6">We implement data-backed frameworks that improve FTE utilization, project profitability, and client satisfaction.</p>

              <h3 className="text-xl font-semibold text-white mb-4">Our Focus Areas:</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Resource Allocation and Time Utilization Dashboards</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">KPI and SLA Tracking for Service Delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Automation for Report Generation and Task Monitoring</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Workforce Productivity and Billing Analytics</span>
                </li>
              </ul>

              <p className="text-white leading-relaxed text-lg">💼 Turning human effort into measurable impact.</p>
            </div>
          </div>
        </div>
      </IndustryPageShell>
    </Layout>
  );
}
