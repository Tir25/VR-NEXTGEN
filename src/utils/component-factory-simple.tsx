/**
 * Simplified Component Factory Utilities
 * Provides basic utilities for creating flexible, reusable components
 */

import React, { ComponentType, memo } from 'react';

// Base component props interface
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  testId?: string;
}

// Simplified component factory function
export function createComponent<T extends BaseComponentProps>(
  baseComponent: ComponentType<T>,
  defaultProps?: Partial<T>,
  displayName?: string
): ComponentType<T> {
  const Component = (props: T) => {
    return React.createElement(baseComponent, { ...defaultProps, ...props });
  };

  Component.displayName = displayName || baseComponent.displayName || 'Component';
  
  return memo(Component);
}

// Performance-optimized component factory
export function createOptimizedComponent<T extends BaseComponentProps>(
  baseComponent: ComponentType<T>,
  shouldUpdate?: (prevProps: T, nextProps: T) => boolean
): ComponentType<T> {
  return memo(baseComponent, shouldUpdate);
}

// Export simplified component factory utilities
export const componentFactory = {
  createComponent,
  createOptimizedComponent,
};

// Common variant configurations
export const commonVariants = {
  button: {
    primary: 'bg-gold text-black font-semibold rounded focus:outline-none focus:ring-2 focus:ring-gold',
    secondary: 'bg-white/10 text-white border border-white/20 font-semibold rounded focus:outline-none focus:ring-2 focus:ring-gold',
    outline: 'border border-gold text-gold font-semibold rounded focus:outline-none focus:ring-2 focus:ring-gold',
  },
  card: {
    default: 'bg-white/5 border border-white/10 rounded-lg p-6',
    primary: 'bg-gold/10 border-gold/20 rounded-lg p-6',
    secondary: 'bg-white/10 border-white/20 rounded-lg p-6',
  },
  input: {
    default: 'w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent',
    primary: 'w-full px-4 py-2 bg-white/10 border border-gold/50 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold',
    error: 'w-full px-4 py-2 bg-white/10 border border-red-500 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500',
  },
};
