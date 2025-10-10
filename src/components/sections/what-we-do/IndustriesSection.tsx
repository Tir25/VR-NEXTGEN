import { use3DTilt } from '@/hooks/use3DTilt';
import { useRouter } from 'next/router';
import ErrorBoundary from '@/components/common/ErrorBoundary';

const industries = [
  {
    title: 'Technology & Software',
    description: 'Digital transformation and software development solutions for tech companies.',
    icon: (
      <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
        <path
          fillRule='evenodd'
          d='M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.666.804 4.343a1 1 0 01-1.97.364l-.804-4.343L8.22 15H6a2 2 0 01-2-2V5zm5.603 3.5a1 1 0 10-1.206 1.206l1.206-1.206zM8 8.5a1 1 0 011.206-.794L8 8.5zm2 0a1 1 0 00-1.206-.794L10 8.5zm-2 2a1 1 0 011.206-.794L8 10.5zm2 0a1 1 0 00-1.206-.794L10 10.5z'
          clipRule='evenodd'
        />
      </svg>
    ),
    focus: ['Software Development', 'Cloud Migration', 'DevOps', 'AI/ML Integration'],
  },
  {
    title: 'Healthcare & Life Sciences',
    description: 'Specialized consulting for healthcare organizations and life sciences companies.',
    icon: (
      <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
        <path
          fillRule='evenodd'
          d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
          clipRule='evenodd'
        />
      </svg>
    ),
    focus: ['Digital Health', 'Regulatory Compliance', 'Data Security', 'Patient Care'],
  },
  {
    title: 'Financial Services',
    description: 'Risk management and digital banking solutions for financial institutions.',
    icon: (
      <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
        <path
          fillRule='evenodd'
          d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z'
          clipRule='evenodd'
        />
      </svg>
    ),
    focus: ['Fintech Solutions', 'Risk Management', 'Compliance', 'Digital Banking'],
  },
  {
    title: 'Manufacturing & Industrial',
    description: 'Operational excellence and supply chain optimization for manufacturing.',
    icon: (
      <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
        <path
          fillRule='evenodd'
          d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z'
          clipRule='evenodd'
        />
      </svg>
    ),
    focus: ['Supply Chain', 'Quality Control', 'Automation', 'Lean Manufacturing'],
  },
  {
    title: 'Retail & E-commerce',
    description: 'Customer experience and omnichannel strategies for retail businesses.',
    icon: (
      <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
        <path
          fillRule='evenodd'
          d='M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15v-3a2 2 0 114 0v3H8z'
          clipRule='evenodd'
        />
      </svg>
    ),
    focus: [
      'Omnichannel Strategy',
      'Customer Analytics',
      'Inventory Management',
      'Digital Marketing',
    ],
  },
  {
    title: 'Energy & Utilities',
    description: 'Sustainability and operational efficiency for energy sector companies.',
    icon: (
      <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
        <path
          fillRule='evenodd'
          d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z'
          clipRule='evenodd'
        />
      </svg>
    ),
    focus: ['Renewable Energy', 'Grid Optimization', 'Sustainability', 'Smart Infrastructure'],
  },
];

function IndustryCard({ industry }: { industry: (typeof industries)[0] }) {
  const router = useRouter();
  const { cardRef, onMouseMove, onMouseLeave } = use3DTilt();

  const handleExploreSolutions = () => {
    // Map what-we-do industries to actual industry IDs
    const industryIdMap: Record<string, string> = {
      'Technology & Software': 'it-professional-services',
      'Healthcare & Life Sciences': 'pharmaceutical-life-sciences',
      'Financial Services': 'financial-services-insurance',
      'Manufacturing & Industrial': 'manufacturing-engineering',
      'Retail & E-commerce': 'retail-fmcg',
      'Energy & Utilities': 'industrial-infrastructure',
    };

    const industryId = industryIdMap[industry.title] || 'other-industries';
    router.push(`/industries/${industryId}`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className='group bg-gradient-to-br from-white/90 to-gray-50 border border-gray-200 rounded-2xl p-8 hover:border-sand-yellow/50 hover:from-white hover:to-gray-100 transition-all duration-500 card-3d'
    >
      <div className='space-y-6'>
        {/* Icon */}
        <div className='w-16 h-16 bg-sand-yellow/10 rounded-2xl flex items-center justify-center text-sand-yellow group-hover:bg-sand-yellow/20 group-hover:scale-110 transition-all duration-300'>
          {industry.icon}
        </div>

        {/* Content */}
        <div className='space-y-4'>
          <h3 className='text-xl font-bold text-black group-hover:text-sand-yellow transition-colors duration-300'>
            {industry.title}
          </h3>
          <p className='text-black/70 leading-relaxed'>{industry.description}</p>
        </div>

        {/* Focus Areas */}
        <div className='space-y-3'>
          <h4 className='text-sm font-semibold text-black/60 uppercase tracking-wider'>
            Focus Areas
          </h4>
          <ul className='space-y-2'>
            {industry.focus.map((area, index) => (
              <li key={index} className='flex items-center gap-3 text-black/70'>
                <div className='w-1.5 h-1.5 bg-sand-yellow rounded-full flex-shrink-0'></div>
                <span className='text-sm'>{area}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className='pt-4 border-t border-gray-200'>
          <button
            onClick={handleExploreSolutions}
            className='text-sand-yellow font-semibold hover:text-sand-yellow/80 transition-colors duration-300 flex items-center gap-2 group'
          >
            Explore Solutions
            <svg
              className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function IndustriesSection() {
  return (
    <ErrorBoundary>
      <section
        id='industries'
        className='section-services relative py-16 md:py-24'
        aria-label='Industries'
      >
        {/* Background decoration */}
        <div className='absolute inset-0 -z-20 overflow-hidden'>
          <div className='absolute top-1/4 right-1/4 w-64 h-64 bg-sand-yellow/5 rounded-full blur-3xl' />
          <div className='absolute bottom-1/4 left-1/4 w-48 h-48 bg-sand-yellow/10 rounded-full blur-2xl' />
        </div>

        <div className='max-w-6xl mx-auto px-4 md:px-6 lg:px-8'>
          <header className='text-center mb-16'>
            <div className='inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6'>
              <div className='w-2 h-2 bg-gold rounded-full animate-pulse' />
              Industry Expertise
            </div>
            <h2 className='text-4xl md:text-5xl font-bold text-gold mb-6'>Industries We Serve</h2>
            <p className='text-lg text-black/70 max-w-3xl mx-auto leading-relaxed'>
              Our deep industry knowledge and specialized expertise help organizations across
              diverse sectors achieve their strategic objectives.
            </p>
          </header>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {industries.map(industry => (
              <IndustryCard key={industry.title} industry={industry} />
            ))}
          </div>

          <div className='text-center mt-16'>
            <div className='inline-flex flex-col sm:flex-row gap-4'>
              <button className='px-8 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold/90 transition-colors duration-300 btn-enhanced'>
                Discuss Your Industry
              </button>
              <button className='px-8 py-4 border border-gold/50 text-gold font-semibold rounded-lg hover:bg-gold/10 transition-colors duration-300 btn-enhanced'>
                View Success Stories
              </button>
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}
