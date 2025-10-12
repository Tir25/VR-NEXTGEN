import Layout from "@/components/layout/Layout";

export default function FinancialAdvisory() {
  return (
    <Layout 
      title="Financial Advisory" 
      description="Expert financial planning and investment strategy guidance from VR NextGEN Solutions."
    >
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-black text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Financial Advisory
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Financial Advisory Services
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Expert financial planning and investment strategy guidance to optimize your financial performance and growth.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-black mb-6">Service Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our financial advisory services provide comprehensive financial planning, investment analysis, and risk 
                management solutions to help organizations optimize their financial performance. We work with finance 
                teams to develop strategies that support business growth and long-term sustainability.
              </p>

              <h3 className="text-xl font-semibold text-black mb-4">Key Features</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Financial Planning and Budgeting</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Investment Analysis and Portfolio Management</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Risk Management and Compliance</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Budget Optimization and Cost Management</span>
                </li>
              </ul>

              <div className="bg-gold/10 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-black mb-4">Why Choose Our Financial Advisory?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our financial experts bring deep industry knowledge and proven methodologies to help you make 
                  informed financial decisions. We focus on creating sustainable financial strategies that support 
                  your business objectives and drive long-term value creation.
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
