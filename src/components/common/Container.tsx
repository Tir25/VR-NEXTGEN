/**
 * Reusable Container Component
 * Provides consistent max-width, padding, and responsive behavior
 */

import React from 'react';
// import { getResponsiveValue } from '@/config';

export interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  as?: 'div' | 'section' | 'main' | 'header' | 'footer';
}

const sizeClasses = {
  sm: 'max-w-4xl',
  md: 'max-w-5xl', 
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  '2xl': 'max-w-[1536px]',
  full: 'max-w-full',
};

const paddingClasses = {
  none: 'px-0',
  sm: 'px-4',
  md: 'px-4 md:px-6',
  lg: 'px-4 md:px-6 lg:px-8',
  xl: 'px-6 md:px-8 lg:px-12',
};

export default function Container({
  children,
  size = 'xl',
  padding = 'lg',
  className = '',
  as: Component = 'div',
}: ContainerProps) {
  const sizeClass = sizeClasses[size];
  const paddingClass = paddingClasses[padding];

  return (
    <Component
      className={`${sizeClass} mx-auto ${paddingClass} ${className}`}
    >
      {children}
    </Component>
  );
}

// Convenience components for common container sizes
export const SmallContainer = (props: Omit<ContainerProps, 'size'>) => (
  <Container {...props} size="sm" />
);

export const MediumContainer = (props: Omit<ContainerProps, 'size'>) => (
  <Container {...props} size="md" />
);

export const LargeContainer = (props: Omit<ContainerProps, 'size'>) => (
  <Container {...props} size="lg" />
);

export const ExtraLargeContainer = (props: Omit<ContainerProps, 'size'>) => (
  <Container {...props} size="xl" />
);

export const FullWidthContainer = (props: Omit<ContainerProps, 'size'>) => (
  <Container {...props} size="full" />
);
