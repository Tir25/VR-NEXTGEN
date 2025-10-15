import Layout from "@/components/layout/Layout";
import IndustryPageShell from "@/components/sections/industries/IndustryPageShell";

export default function RetailFMCG() {
  return (
    <Layout 
      title="Retail & FMCG" 
      description="Customer experience and omnichannel strategies for retail and FMCG businesses from VR NextGEN Solutions."
    >
      <IndustryPageShell>
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Retail & FMCG
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Retail & FMCG
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Customer experience and omnichannel strategies for retail and FMCG businesses to drive growth and customer loyalty.
            </p>
          </div>

          <div
            className="relative rounded-2xl shadow-lg p-8 md:p-12 border border-gold/30 overflow-hidden"
            style={{
              backgroundImage: "url('/images-optimized/Industries/Fmcg.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">Transforming Consumer Insights into Competitive Advantage</h2>
              <p className="text-gray-300 leading-relaxed mb-4">Retail and FMCG companies thrive on agility.</p>
              <p className="text-gray-300 leading-relaxed mb-6">
                We help brands use data to anticipate demand, optimize stock, and maximize shelf performance — ensuring your business stays customer-ready at all times.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">Our Focus Areas:</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Demand Forecasting and Inventory Management</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Sales Performance Dashboards and Price Analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Distribution Efficiency and Route Optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Customer Segmentation and Market Trend Analysis</span>
                </li>
              </ul>

              <p className="text-white leading-relaxed text-lg">🛒 From shelf to strategy — every move informed by data.</p>
            </div>
          </div>
        </div>
      </IndustryPageShell>
    </Layout>
  );
}
