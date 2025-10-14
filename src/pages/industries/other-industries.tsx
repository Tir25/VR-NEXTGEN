import Layout from "@/components/layout/Layout";
import IndustryPageShell from "@/components/sections/industries/IndustryPageShell";

export default function OtherIndustries() {
  return (
    <Layout 
      title="Other Industries" 
      description="Specialized consulting solutions for diverse industries and unique business challenges from VR NextGEN Solutions."
    >
      <IndustryPageShell>
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Other Industries
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Other Industries
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Specialized consulting solutions for diverse industries and unique business challenges.
            </p>
          </div>

          <div
            className="relative rounded-2xl shadow-lg p-8 md:p-12 border border-gold/30 overflow-hidden"
            style={{
              backgroundImage: "url('/images-optimized/Industries/Other.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">Custom Solutions for Diverse Business Ecosystems</h2>
              <p className="text-gray-300 leading-relaxed mb-6">Whether it’s logistics, hospitality, or energy — we design custom analytics and process optimization solutions that fit your operational reality.</p>
              <p className="text-gray-300 leading-relaxed mb-6">Our approach ensures every business, regardless of size or sector, experiences measurable, data-led improvement.</p>
              <p className="text-white leading-relaxed text-lg">🌐 If your business runs on data, we help it run better.</p>
            </div>
          </div>
        </div>
      </IndustryPageShell>
    </Layout>
  );
}
