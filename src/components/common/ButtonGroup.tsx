/**
 * Reusable Button Group Component
 * Provides consistent button grouping with responsive layouts
 */

import React from 'react';
import Button from './Button';

export interface ButtonGroupProps {
  buttons: Array<{
    text: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    onClick?: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
  }>;
  layout?: 'horizontal' | 'vertical' | 'responsive';
  align?: 'left' | 'center' | 'right' | 'between' | 'around';
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

const layoutClasses = {
  horizontal: 'flex-row',
  vertical: 'flex-col',
  responsive: 'flex-col sm:flex-row',
};

const alignClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

const spacingClasses = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
};

export default function ButtonGroup({
  buttons,
  layout = 'responsive',
  align = 'center',
  spacing = 'md',
  className = '',
}: ButtonGroupProps) {
  const layoutClass = layoutClasses[layout];
  const alignClass = alignClasses[align];
  const spacingClass = spacingClasses[spacing];

  return (
    <div className={`flex ${layoutClass} ${alignClass} ${spacingClass} ${className}`}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant={button.variant || 'primary'}
          size={button.size || 'md'}
          onClick={button.onClick}
          isLoading={button.isLoading}
          disabled={button.disabled}
          className={button.className}
        >
          {button.text}
        </Button>
      ))}
    </div>
  );
}

// Convenience components for common button group patterns
export const CTAButtonGroup = (props: Omit<ButtonGroupProps, 'layout' | 'align'>) => (
  <ButtonGroup {...props} layout="responsive" align="center" />
);

export const NavigationButtonGroup = (props: Omit<ButtonGroupProps, 'layout' | 'align'>) => (
  <ButtonGroup {...props} layout="horizontal" align="between" />
);

export const ActionButtonGroup = (props: Omit<ButtonGroupProps, 'layout' | 'align'>) => (
  <ButtonGroup {...props} layout="horizontal" align="right" />
);
