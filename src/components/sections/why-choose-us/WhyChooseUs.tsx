/**
 * Why Choose Us Section Component
 * 
 * Highlights VR NextGEN Solutions' key benefits and competitive advantages
 * Follows VR NextGEN design system and BEM methodology
 */

import { use3DTilt } from '@/hooks/use3DTilt';
import { ScrollReveal, StaggeredReveal, staggerChildrenVariants } from '@/components/common';
import { motion } from 'framer-motion';

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const benefits: Benefit[] = [
  {
    id: 'expertise',
    title: 'Industry Expertise',
    description: 'Over 12 years of experience in business optimization and data-driven solutions.',
    icon: '🎓'
  },
  {
    id: 'results',
    title: 'Proven Results',
    description: '140+ successful projects with measurable improvements in efficiency and profitability.',
    icon: '📈'
  },
  {
    id: 'personalized',
    title: 'Personalized Approach',
    description: 'Tailored solutions designed specifically for your unique business challenges and goals.',
    icon: '🎯'
  },
  {
    id: 'support',
    title: 'Ongoing Support',
    description: 'Continuous guidance and support to ensure long-term success and sustainable growth.',
    icon: '🤝'
  },
  {
    id: 'technology',
    title: 'Cutting-Edge Technology',
    description: 'Leverage the latest tools and technologies for maximum efficiency and innovation.',
    icon: '💻'
  },
  {
    id: 'partnership',
    title: 'True Partnership',
    description: 'We work as an extension of your team, invested in your success and growth.',
    icon: '🚀'
  }
];

interface BenefitCardProps {
  benefit: Benefit;
}

function BenefitCard({ benefit }: BenefitCardProps) {
  const { cardRef, onMouseMove, onMouseLeave } = use3DTilt({
    maxTilt: 5,
    enabled: true
  });

  return (
    <div
      ref={cardRef}
      className="card card--3d card--shadow card--hoverable text-center p-6 rounded-lg border border-white/10 bg-black/40 hover:border-gold transition-all duration-300"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="card__content">
        <div className="card__header">
          <div className="text-4xl mb-4" aria-hidden="true">
            {benefit.icon}
          </div>
          <h3 className="card__title text-xl font-semibold text-gold mb-3">
            {benefit.title}
          </h3>
        </div>
        
        <div className="card__body">
          <p className="text-white/80">
            {benefit.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-16 md:py-24" aria-label="Why choose us">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <ScrollReveal preset="fast">
          <header className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">
              Why Choose VR NextGEN Solutions?
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto">
              We don&apos;t just consult; we create pathways for your business to thrive. 
              Here&apos;s what sets us apart from the competition.
            </p>
          </header>
        </ScrollReveal>

        <ScrollReveal preset="slow">
          <StaggeredReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {benefits.map((benefit) => (
              <motion.div key={benefit.id} variants={staggerChildrenVariants}>
                <BenefitCard benefit={benefit} />
              </motion.div>
            ))}
          </StaggeredReveal>
        </ScrollReveal>

        <ScrollReveal preset="standard" className="mt-16">
          <div className="text-center">
            <div className="card card--shadow border border-gold/20 rounded-lg p-8 bg-gradient-to-r from-gold/5 to-gold/10">
              <div className="card__content">
                <h3 className="card__title text-2xl font-bold text-gold mb-4">
                  Ready to Transform Your Business?
                </h3>
                <p className="card__body text-white/80 mb-6">
                  Join 85+ satisfied clients who have experienced measurable growth 
                  with our data-driven solutions and expert guidance.
                </p>
                <button 
                  className="btn btn--primary btn--medium"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  aria-label="Get started with VR NextGEN Solutions"
                >
                  Get Started Today
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
