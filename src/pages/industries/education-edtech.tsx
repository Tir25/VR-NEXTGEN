import Layout from "@/components/layout/Layout";
import IndustryPageShell from "@/components/sections/industries/IndustryPageShell";

export default function EducationEdTech() {
  return (
    <Layout 
      title="Education & EdTech" 
      description="Digital transformation and innovation solutions for education and EdTech companies from VR NextGEN Solutions."
    >
      <IndustryPageShell>
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Education & EdTech
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Education & EdTech
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Digital transformation and innovation solutions for education and EdTech companies to enhance learning outcomes.
            </p>
          </div>

          <div
            className="relative rounded-2xl shadow-lg p-8 md:p-12 border border-gold/30 overflow-hidden"
            style={{
              backgroundImage: "url('/images-optimized/Industries/Education.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">Building Smarter Institutions with Insightful Data</h2>
              <p className="text-gray-300 leading-relaxed mb-4">Education is evolving — and so are the ways institutions manage performance.</p>
              <p className="text-gray-300 leading-relaxed mb-6">We help universities, schools, and EdTech companies use data analytics and process alignment to improve outcomes, transparency, and strategic planning.</p>

              <h3 className="text-xl font-semibold text-white mb-4">Our Focus Areas:</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Student Performance &amp; Placement Dashboards</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Admission Forecasting &amp; Resource Planning</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">ERP and LMS Integration for Centralized Data</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Faculty Productivity and Operational Analytics</span>
                </li>
              </ul>

              <p className="text-white leading-relaxed text-lg">🎓 From learning to leading — powered by analytics</p>
            </div>
          </div>
        </div>
      </IndustryPageShell>
    </Layout>
  );
}
