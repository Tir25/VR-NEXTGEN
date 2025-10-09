/**
 * FeatureList Component
 * A reusable component for displaying a list of features with visual indicators
 */

import React from 'react';

interface FeatureListProps {
  features: string[];
  className?: string;
  iconClassName?: string;
  itemClassName?: string;
  icon?: React.ReactNode;
}

export default function FeatureList({
  features,
  className = '',
  iconClassName = '',
  itemClassName = '',
  icon = '✓', // Default checkmark
}: FeatureListProps) {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <ul className={`space-y-2 ${className}`}>
      {features.map((feature, index) => (
        <li 
          key={index} 
          className={`flex items-center gap-2 text-sm text-white/85 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] ${itemClassName}`}
        >
          <span className={`w-4 h-4 flex items-center justify-center rounded-full bg-gold/20 text-gold text-xs font-bold flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${iconClassName}`}>
            {icon}
          </span>
          {feature}
        </li>
      ))}
    </ul>
  );
}
