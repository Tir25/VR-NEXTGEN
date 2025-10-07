import { use3DTilt } from "@/hooks/use3DTilt";
import ErrorBoundary from "@/components/common/ErrorBoundary";

const caseStudies = [
  {
    title: "Enterprise Cloud Migration",
    category: "Digital Transformation",
    duration: "6 months",
    team: "8 specialists",
    overview: "Complete migration of legacy systems to cloud infrastructure with zero downtime",
    approach: [
      "Comprehensive system audit and assessment",
      "Phased migration strategy development",
      "Security and compliance validation",
      "Staff training and change management"
    ],
    outcomes: {
      performance: "300% improvement in system performance",
      cost: "40% reduction in infrastructure costs",
      security: "Enhanced security with 99.9% uptime",
      scalability: "Unlimited scalability for future growth"
    },
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"]
  },
  {
    title: "AI-Powered Analytics Platform",
    category: "Data Science",
    duration: "4 months",
    team: "6 specialists",
    overview: "Development of machine learning platform for predictive business analytics",
    approach: [
      "Data architecture design and implementation",
      "Machine learning model development",
      "Real-time analytics dashboard creation",
      "Integration with existing business systems"
    ],
    outcomes: {
      performance: "85% accuracy in predictive models",
      cost: "50% reduction in manual analysis time",
      security: "GDPR compliant data processing",
      scalability: "Handles 10M+ data points daily"
    },
    technologies: ["Python", "TensorFlow", "Apache Kafka", "React", "PostgreSQL"]
  },
  {
    title: "Supply Chain Optimization",
    category: "Operations",
    duration: "5 months",
    team: "10 specialists",
    overview: "End-to-end supply chain optimization with real-time tracking and analytics",
    approach: [
      "Current state analysis and mapping",
      "Process optimization and automation",
      "Vendor management system implementation",
      "Performance monitoring and reporting"
    ],
    outcomes: {
      performance: "35% reduction in delivery time",
      cost: "25% decrease in operational costs",
      security: "Real-time visibility and control",
      scalability: "Supports 500+ suppliers globally"
    },
    technologies: ["SAP", "IoT Sensors", "Blockchain", "Tableau", "REST APIs"]
  }
];

function CaseStudyCard({ study }: { study: typeof caseStudies[0] }) {
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
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black group-hover:text-sand-yellow transition-colors duration-300">
                {study.title}
              </h3>
              <p className="text-sm text-black/60">{study.category}</p>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/5 rounded-lg p-3">
            <p className="text-xs text-black/60 uppercase tracking-wider">Duration</p>
            <p className="text-sm font-semibold text-black">{study.duration}</p>
          </div>
          <div className="bg-black/5 rounded-lg p-3">
            <p className="text-xs text-black/60 uppercase tracking-wider">Team Size</p>
            <p className="text-sm font-semibold text-black">{study.team}</p>
          </div>
        </div>

        {/* Overview */}
        <div>
          <h4 className="text-sm font-semibold text-black/60 uppercase tracking-wider mb-2">Overview</h4>
          <p className="text-black/70 text-sm leading-relaxed">{study.overview}</p>
        </div>

        {/* Approach */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-black/60 uppercase tracking-wider">Our Approach</h4>
          <ul className="space-y-2">
            {study.approach.map((step, index) => (
              <li key={index} className="flex items-start gap-3 text-black/70">
                <div className="w-1.5 h-1.5 bg-sand-yellow rounded-full flex-shrink-0 mt-2"></div>
                <span className="text-sm">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Outcomes */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-black/60 uppercase tracking-wider">Key Outcomes</h4>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(study.outcomes).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-2 px-3 bg-sand-yellow/5 rounded-lg">
                <span className="text-xs text-black/60 capitalize">{key}</span>
                <span className="text-sm font-semibold text-black">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-black/60 uppercase tracking-wider">Technologies Used</h4>
          <div className="flex flex-wrap gap-2">
            {study.technologies.map((tech, index) => (
              <span key={index} className="px-3 py-1 bg-sand-yellow/10 text-sand-yellow text-xs font-medium rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-gray-200">
          <button className="text-sand-yellow font-semibold hover:text-sand-yellow/80 transition-colors duration-300 flex items-center gap-2 group">
            Read Full Case Study
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Brightness overlay for consistent hover effect */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-black opacity-0 group-hover:opacity-10 active:opacity-10 transition-opacity duration-300" />
    </div>
  );
}

export default function CaseStudySection() {
  return (
    <ErrorBoundary>
      <section id="case-studies" className="section-why-choose relative py-16 md:py-24" aria-label="Case Studies">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gold/10 rounded-full blur-2xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <header className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Detailed Analysis
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gold mb-6">
              Case Studies
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              In-depth analysis of our most successful projects, showcasing our methodology, approach, and the transformative results we deliver.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.title} study={study} />
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold/90 transition-colors duration-300 btn-enhanced">
                Download Case Studies
              </button>
              <button className="px-8 py-4 border border-gold/50 text-gold font-semibold rounded-lg hover:bg-gold/10 transition-colors duration-300 btn-enhanced">
                Request Similar Project
              </button>
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}
