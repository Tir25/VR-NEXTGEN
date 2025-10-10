/**
 * Component Factory System
 * Flexible component creation and configuration system
 */

import React from 'react';
import { designTokens } from '@/design-system/tokens';
import { RESPONSIVE_BREAKPOINTS, getResponsiveValue } from '@/config';

// Base component configuration interface
export interface ComponentConfig {
  variant?: string;
  size?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Component factory type
export type ComponentFactory<T extends ComponentConfig> = (
  config: T,
  children?: React.ReactNode
) => React.ReactElement;

// Responsive value configuration
export interface ResponsiveConfig<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
  default?: T;
}

// Create responsive style hook
export function useResponsiveStyle<T>(config: ResponsiveConfig<T>, fallback: T): T {
  return getResponsiveValue(config, fallback);
}

// Component variant system
export class ComponentVariants {
  private variants: Map<string, any> = new Map();

  register<V>(name: string, variant: V): void {
    this.variants.set(name, variant);
  }

  get<V>(name: string): V | undefined {
    return this.variants.get(name);
  }

  has(name: string): boolean {
    return this.variants.has(name);
  }
}

// Global component variants registry
export const componentVariants = new ComponentVariants();

// Initialize default variants
componentVariants.register('button', designTokens.buttonVariants);
componentVariants.register('colors', designTokens.colors);
componentVariants.register('spacing', designTokens.spacing);
componentVariants.register('typography', designTokens.typography);

// Flexible container component factory
export interface ContainerConfig extends ComponentConfig {
  maxWidth?: keyof typeof RESPONSIVE_BREAKPOINTS | 'full';
  padding?: ResponsiveConfig<string>;
  margin?: ResponsiveConfig<string>;
  background?: string;
  rounded?: keyof typeof designTokens.borderRadius;
}

export const createContainer = (config: ContainerConfig): React.ReactElement => {
  const {
    maxWidth = 'xl',
    padding = { default: '1rem' },
    margin = { default: '0 auto' },
    background = 'transparent',
    rounded = 'none',
    className = '',
    style = {},
    children,
  } = config;

  const responsivePadding = getResponsiveValue(padding, '1rem');
  const responsiveMargin = getResponsiveValue(margin, '0 auto');
  const maxWidthValue =
    maxWidth === 'full'
      ? '100%'
      : RESPONSIVE_BREAKPOINTS[maxWidth as keyof typeof RESPONSIVE_BREAKPOINTS] + 'px';

  return React.createElement(
    'div',
    {
      className: `container ${className}`,
      style: {
        maxWidth: maxWidthValue,
        padding: responsivePadding,
        margin: responsiveMargin,
        backgroundColor: background,
        borderRadius: designTokens.borderRadius[rounded],
        ...style,
      },
    },
    children
  );
};

// Flexible section component factory
export interface SectionConfig extends ComponentConfig {
  id?: string;
  ariaLabel?: string;
  background?: 'hero' | 'services' | 'industries' | 'custom';
  padding?: ResponsiveConfig<string>;
  minHeight?: string;
}

export const createSection = (config: SectionConfig): React.ReactElement => {
  const {
    id,
    ariaLabel,
    background = 'custom',
    padding = { default: '4rem 0' },
    minHeight,
    className = '',
    style = {},
    children,
  } = config;

  const responsivePadding = getResponsiveValue(padding, '4rem 0');
  const backgroundClass = background === 'custom' ? '' : `section-${background}`;

  return React.createElement(
    'section',
    {
      id,
      'aria-label': ariaLabel,
      className: `${backgroundClass} relative overflow-hidden ${className}`,
      style: {
        padding: responsivePadding,
        minHeight,
        ...style,
      },
    },
    children
  );
};

// Flexible grid component factory
export interface GridConfig extends ComponentConfig {
  columns?: ResponsiveConfig<number>;
  gap?: ResponsiveConfig<string>;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
}

export const createGrid = (config: GridConfig): React.ReactElement => {
  const {
    columns = { default: 1, md: 2, lg: 3 },
    gap = { default: '1rem' },
    alignItems = 'stretch',
    justifyItems = 'stretch',
    className = '',
    style = {},
    children,
  } = config;

  const responsiveColumns = getResponsiveValue(columns, 1);
  const responsiveGap = getResponsiveValue(gap, '1rem');

  return React.createElement(
    'div',
    {
      className: `grid ${className}`,
      style: {
        gridTemplateColumns: `repeat(${responsiveColumns}, 1fr)`,
        gap: responsiveGap,
        alignItems,
        justifyItems,
        ...style,
      },
    },
    children
  );
};

// Flexible flex component factory
export interface FlexConfig extends ComponentConfig {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  gap?: ResponsiveConfig<string>;
}

export const createFlex = (config: FlexConfig): React.ReactElement => {
  const {
    direction = 'row',
    wrap = 'nowrap',
    justify = 'start',
    align = 'start',
    gap = { default: '0' },
    className = '',
    style = {},
    children,
  } = config;

  const responsiveGap = getResponsiveValue(gap, '0');

  const justifyMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  };

  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
    baseline: 'baseline',
  };

  return React.createElement(
    'div',
    {
      className: `flex ${className}`,
      style: {
        flexDirection: direction,
        flexWrap: wrap,
        justifyContent: justifyMap[justify],
        alignItems: alignMap[align],
        gap: responsiveGap,
        ...style,
      },
    },
    children
  );
};

// Component registry for extensibility
export class ComponentRegistry {
  private components: Map<string, ComponentFactory<ComponentConfig>> = new Map();

  register<T extends ComponentConfig>(name: string, factory: ComponentFactory<T>): void {
    this.components.set(name, factory as ComponentFactory<ComponentConfig>);
  }

  get<T extends ComponentConfig>(name: string): ComponentFactory<T> | undefined {
    return this.components.get(name);
  }

  create<T extends ComponentConfig>(
    name: string,
    config: T,
    children?: React.ReactNode
  ): React.ReactElement | null {
    const factory = this.get<T>(name);
    if (!factory) {
      // Component factory not found - return null gracefully
      return null;
    }
    return factory(config, children);
  }

  list(): string[] {
    return Array.from(this.components.keys());
  }
}

// Global component registry
export const componentRegistry = new ComponentRegistry();

// Register default component factories
componentRegistry.register('container', createContainer);
componentRegistry.register('section', createSection);
componentRegistry.register('grid', createGrid);
componentRegistry.register('flex', createFlex);

// Utility function to create components dynamically
export function createComponent<T extends ComponentConfig>(
  type: string,
  config: T,
  children?: React.ReactNode
): React.ReactElement | null {
  return componentRegistry.create(type, config, children);
}

// Higher-order component for component factories
export function withComponentFactory<T extends ComponentConfig>(factory: ComponentFactory<T>) {
  return function ComponentFactoryWrapper(
    config: T,
    children?: React.ReactNode
  ): React.ReactElement {
    return factory(config, children);
  };
}
