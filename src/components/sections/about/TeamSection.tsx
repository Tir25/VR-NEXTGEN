/**
 * Team Section Component
 * 
 * Displays VR NextGEN Solutions team members with interactive profiles
 * Follows VR NextGEN design system and BEM methodology
 */

import { use3DTilt } from '@/hooks/use3DTilt';
import { ScrollReveal, StaggeredReveal, staggerChildrenVariants } from '@/components/common';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedIn?: string;
  email?: string;
  expertise: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: 'rudri-dave',
    name: 'Rudri Dave',
    role: 'Co-founder & Principal',
    bio: 'Strategic business consultant with expertise in process optimization and data-driven decision making.',
    image: '/images/rudri-dave.jpg',
    linkedIn: 'https://linkedin.com/in/rudri-dave',
    email: 'rudri@vrnextgen.com',
    expertise: ['Strategic Planning', 'Process Optimization', 'Data Analytics', 'Business Coaching']
  },
  {
    id: 'vibhu-dave',
    name: 'Vibhu Dave',
    role: 'Co-founder & Principal',
    bio: 'Technology and operations specialist focused on digital transformation and efficiency improvements.',
    image: '/images/vibhu-dave.jpg',
    linkedIn: 'https://linkedin.com/in/vibhu-dave',
    email: 'vibhu@vrnextgen.com',
    expertise: ['Digital Transformation', 'Operations Management', 'Technology Integration', 'Performance Optimization']
  }
];

interface TeamCardProps {
  member: TeamMember;
}

function TeamCard({ member }: TeamCardProps) {
  const { cardRef, onMouseMove, onMouseLeave } = use3DTilt({
    maxTilt: 8,
    enabled: true
  });

  return (
    <article
      ref={cardRef}
      className="card card--3d card--shadow card--hoverable rounded-xl border border-white/10 bg-black/40 p-8 text-center hover:border-gold/30 transition-all duration-300"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="card__content">
        <div className="card__header">
          <div className="relative mb-6">
            <Image
              src={member.image}
              alt={`${member.name} - ${member.role}`}
              width={120}
              height={120}
              className="rounded-full mx-auto border-2 border-gold/30"
              priority
            />
          </div>
          <h3 className="card__title text-2xl font-bold text-gold mb-2">
            {member.name}
          </h3>
          <p className="card__subtitle text-lg text-white/80 mb-4">
            {member.role}
          </p>
        </div>
        
        <div className="card__body mb-6">
          <p className="text-white/80 mb-6">
            {member.bio}
          </p>
          
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gold mb-3">Areas of Expertise</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {member.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gold/10 text-gold text-sm rounded-full border border-gold/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="card__footer">
          <div className="flex gap-4 justify-center mb-4">
            {member.linkedIn && (
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline btn--small"
                aria-label={`Connect with ${member.name} on LinkedIn`}
              >
                LinkedIn
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="btn btn--secondary btn--small"
                aria-label={`Email ${member.name}`}
              >
                Contact
              </a>
            )}
          </div>
          
          <Link
            href={`/team/${member.id}`}
            className="btn btn--primary btn--medium w-full"
            aria-label={`View ${member.name}'s detailed profile`}
          >
            View Profile
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function TeamSection() {
  return (
    <section id="team" className="py-16 md:py-24" aria-label="Our team">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal preset="fast">
          <header className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">
              Meet Our Team
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto">
              Our experienced team of consultants brings together decades of expertise 
              in business optimization, data analytics, and strategic planning.
            </p>
          </header>
        </ScrollReveal>

        <ScrollReveal preset="slow">
          <StaggeredReveal className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member) => (
              <motion.div key={member.id} variants={staggerChildrenVariants}>
                <TeamCard member={member} />
              </motion.div>
            ))}
          </StaggeredReveal>
        </ScrollReveal>
      </div>
    </section>
  );
}
