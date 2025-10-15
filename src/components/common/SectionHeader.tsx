/**
 * Reusable Section Header Component
 * Provides consistent header styling with badge, title, and description
 */

import React from 'react';

export interface SectionHeaderProps {
  badge?: {
    text: string;
    icon?: React.ReactNode;
    color?: 'gold' | 'sand-yellow' | 'purple' | 'black' | 'custom';
    size?: 'sm' | 'md' | 'lg' | 'xl'; // new prop for badge size
  };
  title?: string; // made optional
  description?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  titleColor?: 'white' | 'black' | 'gold' | 'gold-title' | 'sand-yellow' | 'purple' | 'custom';
  descriptionColor?: 'white' | 'black' | 'gray' | 'custom';
  compact?: boolean; // reduces vertical spacing
  titleSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'; // new prop for title size
  showTitle?: boolean; // new prop to control title visibility
  showDescription?: boolean; // new prop to control description visibility
}

const badgeColorClasses = {
  gold: 'bg-gold/25 border-gold/60 text-gold',
  'sand-yellow': 'bg-sand-yellow/25 border-sand-yellow/60 text-sand-yellow',
  purple: 'bg-purple-500/25 border-purple-400/60 text-purple-300',
  black: 'bg-black/10 border-black/30 text-black',
  custom: '',
};

const titleColorClasses = {
  white: 'text-white',
  black: 'text-black',
  gold: 'text-gold-darker',
  'gold-title': 'text-gold-darker',
  'sand-yellow': 'text-sand-yellow',
  purple: 'text-purple-400',
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

const titleSizeClasses = {
  sm: 'text-2xl md:text-3xl',
  md: 'text-3xl md:text-4xl',
  lg: 'text-4xl md:text-5xl',
  xl: 'text-5xl md:text-6xl',
  '2xl': 'text-6xl md:text-7xl',
};

const badgeSizeClasses = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
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
  titleSize = 'lg',
  showTitle = true,
  showDescription = true,
}: SectionHeaderProps) {
  const alignClass = alignClasses[align];
  const maxWidthClass = maxWidthClasses[maxWidth];
  const titleClass = titleColorClasses[titleColor];
  const descriptionClass = descriptionColorClasses[descriptionColor];
  const titleSizeClass = titleSizeClasses[titleSize];
  const badgeSizeClass = badgeSizeClasses[badge?.size || 'md'];

  return (
    <header className={`${alignClass} ${className}`}>
      <div className={maxWidthClass} style={{ margin: align === 'center' ? '0 auto' : '0' }}>
        {badge && (
          <div className={`inline-flex items-center gap-3 border rounded-full font-medium shadow-md shadow-black/30 ${compact ? 'mb-1' : 'mb-6'} ${badgeSizeClass} ${badgeColorClasses[badge.color || 'gold']}`}>
            {badge.icon && <span className="w-2 h-2 bg-current rounded-full animate-pulse" />}
            <span>{badge.text}</span>
          </div>
        )}

        {showTitle && title && (
          <h2 className={`${titleSizeClass} font-bold ${compact ? 'mb-1' : 'mb-6'} ${titleClass}`}>
            {title}
          </h2>
        )}

        {showDescription && description && (
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
