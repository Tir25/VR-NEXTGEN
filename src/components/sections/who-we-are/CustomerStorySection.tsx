import { use3DTilt } from "@/hooks/use3DTilt";
import ErrorBoundary from "@/components/common/ErrorBoundary";

const customerStories = [
  {
    title: "Digital Transformation Success",
    company: "TechCorp Solutions",
    industry: "Technology",
    challenge: "Legacy system modernization and digital workflow implementation",
    solution: "Comprehensive digital transformation strategy with cloud migration and process automation",
    results: ["40% increase in operational efficiency", "60% reduction in manual processes", "25% cost savings"],
    testimonial: "VR NextGEN transformed our entire operation. Their expertise in digital transformation was exactly what we needed.",
    author: "Sarah Johnson, CEO"
  },
  {
    title: "Data-Driven Growth Strategy",
    company: "RetailMax Inc",
    industry: "Retail",
    challenge: "Declining sales and lack of customer insights",
    solution: "Advanced analytics implementation with customer segmentation and predictive modeling",
    results: ["35% increase in sales", "50% improvement in customer retention", "20% boost in profit margins"],
    testimonial: "The data insights provided by VR NextGEN revolutionized our understanding of our customers and market.",
    author: "Michael Chen, CMO"
  },
  {
    title: "Operational Excellence Initiative",
    company: "ManufacturingPro",
    industry: "Manufacturing",
    challenge: "Inefficient production processes and quality control issues",
    solution: "Lean manufacturing implementation with quality management systems and automation",
    results: ["30% reduction in production time", "45% decrease in defects", "15% increase in output"],
    testimonial: "Their operational expertise helped us achieve levels of efficiency we never thought possible.",
    author: "David Rodriguez, Operations Director"
  }
];

function StoryCard({ story }: { story: typeof customerStories[0] }) {
  const { cardRef, onMouseMove, onMouseLeave } = use3DTilt();

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group bg-gradient-to-br from-white/90 to-gray-50 border border-gray-200 rounded-2xl p-8 hover:border-sand-yellow/50 hover:from-white hover:to-gray-100 transition-all duration-500 card-3d hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,215,0,0.25)] active:scale-[1.02] active:shadow-[0_0_20px_rgba(255,215,0,0.25)] relative overflow-hidden"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-sand-yellow/10 rounded-xl flex items-center justify-center text-sand-yellow group-hover:bg-sand-yellow/20 group-hover:scale-110 transition-all duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black group-hover:text-sand-yellow transition-colors duration-300">
                {story.title}
              </h3>
              <p className="text-sm text-black/60">{story.company} • {story.industry}</p>
            </div>
          </div>
        </div>

        {/* Challenge & Solution */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-black/60 uppercase tracking-wider mb-2">Challenge</h4>
            <p className="text-black/70 text-sm leading-relaxed">{story.challenge}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-black/60 uppercase tracking-wider mb-2">Solution</h4>
            <p className="text-black/70 text-sm leading-relaxed">{story.solution}</p>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-black/60 uppercase tracking-wider">Results</h4>
          <ul className="space-y-2">
            {story.results.map((result, index) => (
              <li key={index} className="flex items-center gap-3 text-black/70">
                <div className="w-1.5 h-1.5 bg-sand-yellow rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium">{result}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial */}
        <div className="pt-4 border-t border-gray-200">
          <blockquote className="text-black/80 italic text-sm leading-relaxed mb-3">
            &ldquo;{story.testimonial}&rdquo;
          </blockquote>
          <cite className="text-xs text-black/60 font-medium">— {story.author}</cite>
        </div>
      </div>
      
      {/* Brightness overlay for consistent hover effect */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-black opacity-0 group-hover:opacity-10 active:opacity-10 transition-opacity duration-300" />
    </div>
  );
}

export default function CustomerStorySection() {
  return (
    <ErrorBoundary>
      <section id="customer-stories" className="section-services relative py-16 md:py-24" aria-label="Customer Stories">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sand-yellow/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-sand-yellow/10 rounded-full blur-2xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <header className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sand-yellow/10 border border-sand-yellow/30 rounded-full text-sand-yellow text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-sand-yellow rounded-full animate-pulse" />
              Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-sand-yellow mb-6">
              Customer Stories
            </h2>
            <p className="text-lg text-black/70 max-w-3xl mx-auto leading-relaxed">
              Real transformations, real results. Discover how we&apos;ve helped businesses across industries achieve their goals and drive sustainable growth.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {customerStories.map((story) => (
              <StoryCard key={story.title} story={story} />
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-sand-yellow text-black font-semibold rounded-lg hover:bg-sand-yellow/90 transition-colors duration-300 btn-enhanced">
                Share Your Story
              </button>
              <button className="px-8 py-4 border border-sand-yellow/50 text-sand-yellow font-semibold rounded-lg hover:bg-sand-yellow/10 transition-colors duration-300 btn-enhanced">
                View All Stories
              </button>
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}
