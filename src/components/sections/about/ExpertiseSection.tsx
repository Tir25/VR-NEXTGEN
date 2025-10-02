/**
 * Expertise Section Component
 * 
 * Showcases VR NextGEN Solutions' core expertise areas
 * Follows VR NextGEN design system and BEM methodology
 */

import { use3DTilt } from '@/hooks/use3DTilt';
import { ScrollReveal, StaggeredReveal, staggerChildrenVariants } from '@/components/common';
import { motion } from 'framer-motion';

interface ExpertisePoint {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

const expertiseAreas: ExpertisePoint[] = [
  {
    id: 'data-driven-insights',
    title: 'Data-Driven Insights',
    description: 'Transform complex data into actionable business intelligence that drives informed decision-making.',
    icon: '📊',
    details: [
      'Advanced Analytics & Reporting',
      'Predictive Modeling & Forecasting',
      'Performance Dashboards',
      'Real-time Data Monitoring'
    ]
  },
  {
    id: 'process-optimization',
    title: 'Process Optimization',
    description: 'Streamline operations and eliminate inefficiencies with our proven optimization methodologies.',
    icon: '⚡',
    details: [
      'Workflow Analysis & Redesign',
      'Efficiency Improvement Strategies',
      'Cost Reduction Initiatives',
      'Quality Enhancement Programs'
    ]
  },
  {
    id: 'inventory-management',
    title: 'Smart Inventory Management',
    description: 'Optimize inventory levels and reduce waste with intelligent demand forecasting and tracking.',
    icon: '📦',
    details: [
      'Demand Forecasting & Planning',
      'Stock Level Optimization',
      'Supplier Relationship Management',
      'Inventory Turnover Analysis'
    ]
  },
  {
    id: 'strategic-coaching',
    title: 'Strategic Business Coaching',
    description: 'Accelerate growth with personalized coaching and strategic guidance from industry experts.',
    icon: '🎯',
    details: [
      'Strategic Planning & Execution',
      'Leadership Development Programs',
      'Performance Coaching Sessions',
      'Growth Strategy Implementation'
    ]
  }
];

interface ExpertiseCardProps {
  point: ExpertisePoint;
}

function ExpertiseCard({ point }: ExpertiseCardProps) {
  const { cardRef, onMouseMove, onMouseLeave } = use3DTilt({
    maxTilt: 6,
    enabled: true
  });

  return (
    <div
      ref={cardRef}
      className="card card--3d card--shadow card--hoverable border border-white/10 rounded-lg p-6 bg-black/40 hover:border-gold transition-all duration-300"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="card__content">
        <div className="card__header">
          <div className="text-4xl mb-4" aria-hidden="true">
            {point.icon}
          </div>
          <h3 className="card__title text-xl font-semibold text-gold mb-3">
            {point.title}
          </h3>
        </div>
        
        <div className="card__body">
          <p className="text-white/80 mb-4">
            {point.description}
          </p>
          
          <ul className="space-y-2">
            {point.details.map((detail, index) => (
              <li key={index} className="flex items-start gap-2 text-white/70">
                <span className="text-gold text-sm mt-1">•</span>
                <span className="text-sm">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ExpertiseSection() {
  return (
    <section id="expertise" className="py-16 md:py-24" aria-label="Our expertise">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <ScrollReveal preset="fast">
          <header className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">
              Our Core Expertise
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto">
              We specialize in transforming businesses through data-driven insights, 
              process optimization, and strategic guidance that delivers measurable results.
            </p>
          </header>
        </ScrollReveal>

        <ScrollReveal preset="slow">
          <StaggeredReveal className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {expertiseAreas.map((area) => (
              <motion.div key={area.id} variants={staggerChildrenVariants}>
                <ExpertiseCard point={area} />
              </motion.div>
            ))}
          </StaggeredReveal>
        </ScrollReveal>

        <ScrollReveal preset="standard" className="mt-16">
          <div className="text-center">
            <div className="card card--shadow border border-gold/20 rounded-lg p-8 bg-gradient-to-r from-gold/5 to-gold/10">
              <div className="card__content">
                <h3 className="card__title text-2xl font-bold text-gold mb-4">
                  Ready to Leverage Our Expertise?
                </h3>
                <p className="card__body text-white/80 mb-6">
                  Let us help you transform your business with our proven methodologies 
                  and industry-leading expertise in data analytics and process optimization.
                </p>
                <button 
                  className="btn btn--primary btn--medium"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  aria-label="Get started with our expertise"
                >
                  Start Your Transformation
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
