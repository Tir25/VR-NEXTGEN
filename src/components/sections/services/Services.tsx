/**
 * Services Section Component
 * 
 * Displays VR NextGEN Solutions' core services with 3D tilt hover effects
 * Follows VR NextGEN design system and BEM methodology
 */

import { use3DTilt } from '@/hooks/use3DTilt';
import { ScrollReveal, StaggeredReveal, staggerChildrenVariants } from '@/components/common';
import { motion } from 'framer-motion';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const services: Service[] = [
  {
    id: 'data-analytics',
    title: 'Data Analytics & Insights',
    description: 'Transform raw data into actionable business intelligence with our advanced analytics solutions.',
    icon: '📊',
    features: ['Business Intelligence', 'Predictive Analytics', 'Data Visualization', 'Performance Metrics']
  },
  {
    id: 'process-optimization',
    title: 'Process Optimization',
    description: 'Streamline your operations and eliminate inefficiencies with our proven optimization methodologies.',
    icon: '⚡',
    features: ['Workflow Analysis', 'Efficiency Improvements', 'Cost Reduction', 'Quality Enhancement']
  },
  {
    id: 'inventory-management',
    title: 'Inventory Management',
    description: 'Optimize your inventory levels and reduce waste with our smart inventory management solutions.',
    icon: '📦',
    features: ['Demand Forecasting', 'Stock Optimization', 'Supplier Management', 'Real-time Tracking']
  },
  {
    id: 'business-coaching',
    title: 'Business Coaching',
    description: 'Accelerate your growth with personalized coaching and strategic guidance from industry experts.',
    icon: '🎯',
    features: ['Strategic Planning', 'Leadership Development', 'Performance Coaching', 'Growth Strategies']
  }
];

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  const { cardRef, onMouseMove, onMouseLeave } = use3DTilt({
    maxTilt: 6,
    enabled: true
  });

  return (
    <article
      ref={cardRef}
      className="card card--3d card--shadow card--hoverable border border-white/10 rounded-lg p-6 bg-black/40 hover:border-gold transition-all duration-300"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="card__content">
        <div className="card__header">
          <div className="text-4xl mb-4" aria-hidden="true">
            {service.icon}
          </div>
          <h3 className="card__title text-xl font-semibold text-gold">
            {service.title}
          </h3>
        </div>
        
        <div className="card__body">
          <p className="text-white/80 mb-4">
            {service.description}
          </p>
          
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-white/70">
                <span className="text-gold text-sm">✓</span>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24" aria-label="Services">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <ScrollReveal preset="fast">
          <header className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">
              Our Services
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto">
              We provide comprehensive business solutions designed to drive growth, 
              optimize operations, and deliver measurable results for your organization.
            </p>
          </header>
        </ScrollReveal>

        <ScrollReveal preset="slow">
          <StaggeredReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <motion.div key={service.id} variants={staggerChildrenVariants}>
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </StaggeredReveal>
        </ScrollReveal>
      </div>
    </section>
  );
}
