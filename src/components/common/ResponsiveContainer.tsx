/**
 * ResponsiveContainer Component
 * A reusable component for creating responsive containers with various sizes and padding options
 */

import React, { ReactNode } from 'react';

interface ResponsiveContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  maxWidth?: string;
  as?: React.ElementType;
  id?: string;
}

export default function ResponsiveContainer({
  children,
  size = 'lg',
  className = '',
  padding = 'md',
  maxWidth,
  as: Component = 'div',
  id,
}: ResponsiveContainerProps) {
  // Size classes
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  // Padding classes
  const paddingClasses = {
    none: 'px-0',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 md:px-8',
    lg: 'px-4 sm:px-6 md:px-8 lg:px-12',
  };

  return (
    <Component
      id={id}
      className={`mx-auto w-full ${sizeClasses[size]} ${paddingClasses[padding]} ${className}`}
      style={maxWidth ? { maxWidth } : undefined}
    >
      {children}
    </Component>
  );
}
