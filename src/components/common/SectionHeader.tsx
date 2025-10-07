/**
 * Reusable Section Header Component
 * Provides consistent header styling with badge, title, and description
 */

import React from 'react';

export interface SectionHeaderProps {
  badge?: {
    text: string;
    icon?: React.ReactNode;
    color?: 'gold' | 'sand-yellow' | 'purple' | 'custom';
  };
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  titleColor?: 'white' | 'black' | 'gold' | 'sand-yellow' | 'custom';
  descriptionColor?: 'white' | 'black' | 'gray' | 'custom';
  compact?: boolean; // reduces vertical spacing
}

const badgeColorClasses = {
  gold: 'bg-gold/10 border-gold/30 text-gold',
  'sand-yellow': 'bg-sand-yellow/10 border-sand-yellow/30 text-sand-yellow',
  purple: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
  custom: '',
};

const titleColorClasses = {
  white: 'text-white',
  black: 'text-black',
  gold: 'text-gold',
  'sand-yellow': 'text-sand-yellow',
  custom: '',
};

const descriptionColorClasses = {
  white: 'text-white/70',
  black: 'text-black/70',
  gray: 'text-gray-600',
  custom: '',
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const maxWidthClasses = {
  sm: 'max-w-2xl',
  md: 'max-w-3xl',
  lg: 'max-w-4xl',
  xl: 'max-w-5xl',
  full: 'max-w-full',
};

export default function SectionHeader({
  badge,
  title,
  description,
  className = '',
  align = 'center',
  maxWidth = 'lg',
  titleColor = 'white',
  descriptionColor = 'white',
  compact = false,
}: SectionHeaderProps) {
  const alignClass = alignClasses[align];
  const maxWidthClass = maxWidthClasses[maxWidth];
  const titleClass = titleColorClasses[titleColor];
  const descriptionClass = descriptionColorClasses[descriptionColor];

  return (
    <header className={`${alignClass} ${className}`}>
      <div className={maxWidthClass} style={{ margin: align === 'center' ? '0 auto' : '0' }}>
        {badge && (
          <div className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium ${compact ? 'mb-3' : 'mb-6'} ${badgeColorClasses[badge.color || 'gold']}`}>
            {badge.icon && <span className="w-2 h-2 bg-current rounded-full animate-pulse" />}
            <span>{badge.text}</span>
          </div>
        )}

        <h2 className={`text-4xl md:text-5xl font-bold ${compact ? 'mb-3' : 'mb-6'} ${titleClass}`}>
          {title}
        </h2>

        {description && (
          <p className={`text-lg leading-relaxed ${compact ? '' : ''} ${descriptionClass}`}>
            {description}
          </p>
        )}
      </div>
    </header>
  );
}

// Convenience components for common header styles
export const HeroHeader = (props: Omit<SectionHeaderProps, 'titleColor' | 'descriptionColor'>) => (
  <SectionHeader {...props} titleColor="white" descriptionColor="white" />
);

export const ServicesHeader = (props: Omit<SectionHeaderProps, 'titleColor' | 'descriptionColor'>) => (
  <SectionHeader {...props} titleColor="black" descriptionColor="gray" />
);

export const IndustriesHeader = (props: Omit<SectionHeaderProps, 'titleColor' | 'descriptionColor'>) => (
  <SectionHeader {...props} titleColor="white" descriptionColor="white" />
);

export const WhyChooseHeader = (props: Omit<SectionHeaderProps, 'titleColor' | 'descriptionColor'>) => (
  <SectionHeader {...props} titleColor="gold" descriptionColor="white" />
);
