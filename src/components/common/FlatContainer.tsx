import React from 'react';

/**
 * FlatContainer - Optimized container with minimal DOM nesting
 * Reduces DOM depth by combining multiple wrapper divs into a single element
 */
interface FlatContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  role?: string;
}

export default function FlatContainer({
  children,
  className = '',
  as: Component = 'div',
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  role,
}: FlatContainerProps) {
  return (
    <Component
      id={id}
      className={className}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      role={role}
    >
      {children}
    </Component>
  );
}
