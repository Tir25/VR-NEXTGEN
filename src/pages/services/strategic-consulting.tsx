import Layout from "@/components/layout/Layout";

export default function StrategicConsulting() {
  return (
    <Layout 
      title="Strategic Consulting" 
      description="Comprehensive business strategy development and implementation guidance from VR NextGEN Solutions."
    >
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-black text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Strategic Consulting
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Strategic Consulting Services
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive business strategy development and implementation guidance to drive your organization&apos;s success.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-black mb-6">Service Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our strategic consulting services help organizations develop and implement comprehensive business strategies 
                that drive sustainable growth and competitive advantage. We work closely with leadership teams to align 
                business objectives with market opportunities and organizational capabilities.
              </p>

              <h3 className="text-xl font-semibold text-black mb-4">Key Features</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Business Planning and Strategy Development</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Market Analysis and Competitive Intelligence</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Growth Strategy and Market Expansion</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Risk Assessment and Mitigation Planning</span>
                </li>
              </ul>

              <div className="bg-gold/10 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-black mb-4">Why Choose Our Strategic Consulting?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our experienced consultants bring deep industry knowledge and proven methodologies to help you 
                  navigate complex business challenges and capitalize on growth opportunities. We focus on creating 
                  actionable strategies that deliver measurable results.
                </p>
              </div>

              {/* Removed call-to-action per request */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
