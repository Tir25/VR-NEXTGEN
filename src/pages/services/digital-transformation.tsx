import Layout from "@/components/layout/Layout";

export default function DigitalTransformation() {
  return (
    <Layout 
      title="Digital Transformation" 
      description="Modernize your business with cutting-edge technology solutions from VR NextGEN Solutions."
    >
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-black text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Digital Transformation
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Digital Transformation Services
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Modernize your business with cutting-edge technology solutions that drive innovation and competitive advantage.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-black mb-6">Service Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our digital transformation services help organizations modernize their operations, processes, and customer 
                experiences through strategic technology adoption. We guide you through the complete digital journey, 
                from strategy development to implementation and optimization.
              </p>

              <h3 className="text-xl font-semibold text-black mb-4">Key Features</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Technology Integration and Modernization</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Cloud Solutions and Infrastructure</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Digital Strategy and Roadmap Development</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">Change Management and Training</span>
                </li>
              </ul>

              <div className="bg-gold/10 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-black mb-4">Why Choose Our Digital Transformation?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our digital transformation experts combine technical expertise with business acumen to deliver 
                  solutions that drive real business value. We help you navigate the complexities of digital change 
                  while ensuring your organization remains competitive in the digital age.
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
