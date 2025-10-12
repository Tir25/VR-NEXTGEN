import Layout from "@/components/layout/Layout";
import { useParallax } from "@/hooks/useParallax";
import { OptimizedValuesImage, OptimizedVisionImage } from "@/components/common";

export default function WhoWeArePage() {
  const parallax = useParallax(0.25);

  return (
    <Layout title="About Us" description="Learn more about VR NextGEN Solutions">
      {/* Hero Section */}
      <section
        id="who-we-are-hero"
        className="section-hero relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden"
      >
        <div
          className="absolute inset-0 -z-20 bg-[url('/next.svg')] bg-no-repeat bg-center opacity-[0.03]"
          style={{ transform: `translateY(${parallax * -1}px)` }}
        />
        
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-20 relative z-10">
          <div className="flex items-center justify-center">
            <div className="space-y-8 text-center max-w-4xl">
              <div className="space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gold leading-tight">
                  About Us
                </h1>
              </div>
              
              {/* About Us Content */}
              <div className="space-y-8 text-center max-w-4xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Empowering Businesses. Transforming Futures.
                </h2>
                
                <div className="space-y-4">
                  <p className="text-lg md:text-xl text-white leading-relaxed">
                    At VR NextGen Solutions, we deliver excellence and create lasting value for businesses and communities.
                  </p>
                  
                  <p className="text-lg md:text-xl text-white leading-relaxed">
                    Our team of forward-thinking consultants, analysts, and technologists turn complex challenges into opportunities using data, innovation, and intelligence.
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-lg md:text-xl text-white leading-relaxed">
                    VR NextGen Solutions founded with a vision to make organizations data-driven and future-ready, VR NextGen Solutions partners with companies to drive measurable growth through automation, analytics, and digital transformation. From small enterprises to large corporations, we empower every client to transform decisions into outcomes — and operations into performance.
                  </p>
                  
                  <p className="text-lg md:text-xl text-white leading-relaxed">
                    Rooted in a commitment to integrity, innovation, and impact, we help businesses embrace the next generation of digital intelligence. With a team experienced across industries like Pharmaceuticals, Manufacturing, Healthcare, Retail, and Education, we bring deep domain expertise and scalable solutions that deliver real business results.
                  </p>
                  
                  <p className="text-lg md:text-xl text-white leading-relaxed">
                    Our approach combines strategy, technology, and transformation — turning vision into value and insight into action. As your trusted transformation partner, we're not just solving today's problems — we're shaping tomorrow's possibilities.
                  </p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section
        id="our-values"
        className="relative py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Centered Title Above Image */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gold leading-tight">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  The Foundation of Every Transformation
                </h3>
                
                <div className="space-y-4">
                  <p className="text-lg md:text-xl text-white leading-relaxed">
                    At VR NextGen Solutions, our values are more than words — they guide every project, every partnership, and every innovation we deliver. They define who we are and how we create impact — for our clients, our people, and the communities we serve.
                  </p>
                </div>
              </div>
            </div>

            {/* Optimized Image */}
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
                <OptimizedValuesImage
                  alt="VR NextGen Solutions Values - Empowering Businesses, Transforming Futures"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={false}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 mx-auto">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">Discover our core values</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/20 rounded-full blur-xl group-hover:bg-gold/30 transition-colors duration-300"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-colors duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section
        id="our-vision"
        className="relative py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Centered Title */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gold leading-tight">
              Our Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image on the left */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
                <OptimizedVisionImage
                  alt="VR NextGen Solutions Vision - Transforming Data into Actionable Intelligence"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={false}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 mx-auto">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">Click to explore our vision</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/20 rounded-full blur-xl group-hover:bg-gold/30 transition-colors duration-300"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-colors duration-300"></div>
            </div>

            {/* Content on the right */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-lg md:text-xl text-white leading-relaxed">
                    To deliver end-to-end business solutions and strategic insights that transform data into actionable intelligence, enabling organizations to streamline processes, enhance efficiency, and maximize profitability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
