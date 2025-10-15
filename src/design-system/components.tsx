/**
 * VR NextGEN Design System - Reusable Component Patterns
 * Atomic design system components for consistent UI patterns
 */

import React, { ReactNode, forwardRef } from 'react';
// import { theme } from './theme';
import { cn } from '@/utils/className';

// Base component props interface
interface BaseComponentProps {
  children?: ReactNode;
  className?: string;
  id?: string;
  'data-testid'?: string;
}

// Typography Components
interface TypographyProps extends BaseComponentProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  variant?: 'heading' | 'body' | 'caption' | 'small';
  color?: 'primary' | 'secondary' | 'accent' | 'muted';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right' | 'justify';
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ 
    as: Component = 'p', 
    variant = 'body', 
    color = 'primary', 
    weight = 'normal', 
    align = 'left',
    className,
    children,
    ...props 
  }, ref) => {
    const variantClasses = {
      heading: 'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight',
      body: 'text-base md:text-lg leading-relaxed',
      caption: 'text-sm leading-snug',
      small: 'text-xs leading-tight',
    };

    const colorClasses = {
      primary: 'text-white',
      secondary: 'text-gray-300',
      accent: 'text-gold',
      muted: 'text-gray-400',
    };

    const weightClasses = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    const alignClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    };

    return React.createElement(
      Component,
      {
        ref,
        className: cn(
          variantClasses[variant],
          colorClasses[color],
          weightClasses[weight],
          alignClasses[align],
          className
        ),
        ...props,
      },
      children
    );
  }
);

Typography.displayName = 'Typography';

// Container Component
interface ContainerProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  center?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ 
    size = 'lg', 
    padding = 'md', 
    center = true,
    className,
    children,
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'max-w-3xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      full: 'max-w-none',
    };

    const paddingClasses = {
      none: '',
      sm: 'px-4 py-8',
      md: 'px-6 py-12',
      lg: 'px-8 py-16',
      xl: 'px-12 py-20',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'w-full',
          sizeClasses[size],
          paddingClasses[padding],
          center && 'mx-auto',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

// Section Component
interface SectionProps extends BaseComponentProps {
  background?: 'transparent' | 'dark' | 'light' | 'accent';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  fullHeight?: boolean;
  center?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ 
    background = 'transparent',
    padding = 'lg',
    fullHeight = false,
    center = false,
    className,
    children,
    ...props 
  }, ref) => {
    const backgroundClasses = {
      transparent: 'bg-transparent',
      dark: 'bg-black',
      light: 'bg-white',
      accent: 'bg-gold',
    };

    const paddingClasses = {
      none: '',
      sm: 'py-8',
      md: 'py-12',
      lg: 'py-16',
      xl: 'py-20',
    };

    return (
      <section
        ref={ref}
        className={cn(
          'relative w-full',
          backgroundClasses[background],
          paddingClasses[padding],
          fullHeight && 'min-h-screen',
          center && 'flex items-center justify-center',
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

// Grid Component
interface GridProps extends BaseComponentProps {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ 
    cols = 3,
    gap = 'md',
    responsive = true,
    className,
    children,
    ...props 
  }, ref) => {
    const colsClasses = {
      1: 'grid-cols-1',
      2: responsive ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2',
      3: responsive ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-3',
      4: responsive ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-4',
      5: responsive ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' : 'grid-cols-5',
      6: responsive ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6' : 'grid-cols-6',
      12: 'grid-cols-12',
    };

    const gapClasses = {
      none: 'gap-0',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          colsClasses[cols],
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

// Flex Component
interface FlexProps extends BaseComponentProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ 
    direction = 'row',
    wrap = 'nowrap',
    justify = 'start',
    align = 'start',
    gap = 'none',
    className,
    children,
    ...props 
  }, ref) => {
    const directionClasses = {
      row: 'flex-row',
      column: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    };

    const wrapClasses = {
      nowrap: 'flex-nowrap',
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
    };

    const justifyClasses = {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };

    const alignClasses = {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    };

    const gapClasses = {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          directionClasses[direction],
          wrapClasses[wrap],
          justifyClasses[justify],
          alignClasses[align],
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = 'Flex';

// Stack Component (Vertical Flex)
interface StackProps extends BaseComponentProps {
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ 
    spacing = 'md',
    align = 'stretch',
    className,
    children,
    ...props 
  }, ref) => {
    const spacingClasses = {
      none: 'space-y-0',
      sm: 'space-y-2',
      md: 'space-y-4',
      lg: 'space-y-6',
      xl: 'space-y-8',
    };

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col',
          spacingClasses[spacing],
          alignClasses[align],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Stack.displayName = 'Stack';
