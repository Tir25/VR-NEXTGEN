/**
 * Utility for conditional className concatenation
 * Enhanced version of clsx/cn for better performance and type safety
 */

type ClassValue = string | number | boolean | undefined | null | ClassValue[] | Record<string, boolean | undefined | null>;

/**
 * Conditionally concatenates class names
 * @param inputs - Class values to concatenate
 * @returns Concatenated class string
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  
  for (const input of inputs) {
    if (!input) continue;
    
    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const result = cn(...input);
      if (result) classes.push(result);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }
  
  return classes.join(' ');
}

/**
 * Creates a class name generator with predefined variants
 * Useful for component variants and compound styles
 */
export function createVariantClass<T extends Record<string, Record<string, string>>>(
  variants: T,
  defaultVariants?: Partial<{ [K in keyof T]: keyof T[K] }>
) {
  return function variantClass(
    variantProps: Partial<{ [K in keyof T]: keyof T[K] }> = {},
    additionalClasses?: string
  ): string {
    const props = { ...defaultVariants, ...variantProps };
    const classes: string[] = [];
    
    for (const [variantName, variantValue] of Object.entries(props)) {
      if (variantName in variants && variantValue && variants[variantName][variantValue as string]) {
        classes.push(variants[variantName][variantValue as string]);
      }
    }
    
    if (additionalClasses) {
      classes.push(additionalClasses);
    }
    
    return classes.join(' ');
  };
}

/**
 * Creates a responsive class name generator
 * @param base - Base class name
 * @param responsive - Responsive variants
 * @returns Responsive class string
 */
export function responsiveClass(
  base: string,
  responsive?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
  }
): string {
  const classes = [base];
  
  if (responsive) {
    for (const [breakpoint, className] of Object.entries(responsive)) {
      if (className) {
        classes.push(`${breakpoint}:${className}`);
      }
    }
  }
  
  return classes.join(' ');
}

/**
 * Creates a conditional class name generator based on state
 * @param condition - Boolean condition
 * @param trueClass - Class when condition is true
 * @param falseClass - Class when condition is false (optional)
 * @returns Conditional class string
 */
export function conditionalClass(
  condition: boolean,
  trueClass: string,
  falseClass?: string
): string {
  return condition ? trueClass : (falseClass || '');
}

/**
 * Merges multiple class name objects
 * Useful for combining component props with default styles
 */
export function mergeClasses(
  ...classObjects: Array<Record<string, boolean | undefined | null>>
): string {
  const merged: Record<string, boolean> = {};
  
  for (const classObj of classObjects) {
    for (const [className, condition] of Object.entries(classObj)) {
      if (condition) {
        merged[className] = true;
      }
    }
  }
  
  return Object.keys(merged).join(' ');
}
