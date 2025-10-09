/**
 * Component Validation Utility
 * 
 * This utility provides comprehensive validation for React components
 * to prevent common import/export issues that cause "Element type is invalid" errors.
 * 
 * Features:
 * - Validates component imports/exports
 * - Detects circular dependencies
 * - Validates component structure
 * - Provides detailed error reporting
 * - Runtime validation for development
 */

import React from 'react';
import { logger } from './logger';

export interface ComponentValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export interface ComponentValidationOptions {
  strictMode?: boolean;
  checkCircularDeps?: boolean;
  checkExports?: boolean;
  checkImports?: boolean;
  logResults?: boolean;
}

/**
 * Validates a React component to ensure it's properly structured
 */
export function validateReactComponent(
  component: any,
  componentName: string,
  options: ComponentValidationOptions = {}
): ComponentValidationResult {
  const {
    strictMode = true,
    checkCircularDeps = true,
    checkExports = true,
    checkImports = true,
    logResults = true
  } = options;

  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // Check if component is undefined or null
  if (component === undefined) {
    errors.push(`Component "${componentName}" is undefined. Check your import statement.`);
    return { isValid: false, errors, warnings, suggestions };
  }

  if (component === null) {
    errors.push(`Component "${componentName}" is null. This usually indicates a circular dependency.`);
    return { isValid: false, errors, warnings, suggestions };
  }

  // Check if component is an object instead of a function/class
  if (typeof component === 'object' && component !== null) {
    if (component.default) {
      warnings.push(`Component "${componentName}" is an object with a default property. Consider using "export { default as ${componentName} }" instead of "export default as ${componentName}".`);
      suggestions.push('Use named exports or fix your import/export statements.');
    } else {
      errors.push(`Component "${componentName}" is an object instead of a React component. Check your export statement.`);
      suggestions.push('Ensure you are exporting a React component (function or class), not an object.');
    }
  }

  // Check if component is a valid React component
  if (typeof component === 'function') {
    // Check if it's a valid React function component
    if (!component.name && !component.displayName) {
      warnings.push(`Component "${componentName}" is an anonymous function. Consider giving it a name for better debugging.`);
    }
  } else if (typeof component !== 'function') {
    errors.push(`Component "${componentName}" is not a function or class. React components must be functions or classes.`);
    suggestions.push('Ensure you are importing/exporting a React component.');
  }

  // Check for common import/export issues
  if (checkExports) {
    validateExports(component, componentName, errors, warnings, suggestions);
  }

  // Check for circular dependencies
  if (checkCircularDeps) {
    validateCircularDependencies(component, componentName, errors, warnings);
  }

  const isValid = errors.length === 0;

  if (logResults && (!isValid || warnings.length > 0)) {
    logValidationResults(componentName, { isValid, errors, warnings, suggestions });
  }

  return { isValid, errors, warnings, suggestions };
}

/**
 * Validates export patterns
 */
function validateExports(
  component: any,
  componentName: string,
  errors: string[],
  warnings: string[],
  suggestions: string[]
): void {
  // Check for common export issues
  if (component && typeof component === 'object') {
    // Check if it's a module object instead of a component
    if (Object.keys(component).length > 1) {
      warnings.push(`Component "${componentName}" appears to be a module object with multiple exports.`);
      suggestions.push('Consider using named imports: import { ComponentName } from "./path"');
    }

    // Check for default property issues
    if (component.default && typeof component.default === 'object') {
      errors.push(`Component "${componentName}" has a default property that is an object. This suggests an incorrect export statement.`);
      suggestions.push('Fix your export statement in the source file.');
    }
  }
}

/**
 * Validates for circular dependencies
 */
function validateCircularDependencies(
  component: any,
  componentName: string,
  errors: string[],
  warnings: string[]
): void {
  // Basic circular dependency detection
  if (component && typeof component === 'object' && component.__esModule) {
    warnings.push(`Component "${componentName}" might be involved in a circular dependency.`);
  }

  // Check for common circular dependency patterns
  if (component && typeof component === 'function' && component.toString().includes('undefined')) {
    warnings.push(`Component "${componentName}" might have circular dependency issues.`);
  }
}

/**
 * Logs validation results
 */
function logValidationResults(
  componentName: string,
  result: ComponentValidationResult
): void {
  const { isValid, errors, warnings, suggestions } = result;

  if (!isValid) {
    logger.error(`❌ Component Validation Failed: ${componentName}`);
    errors.forEach(error => logger.error(`  • ${error}`));
  }

  if (warnings.length > 0) {
    logger.warn(`⚠️ Component Validation Warnings: ${componentName}`);
    warnings.forEach(warning => logger.warn(`  • ${warning}`));
  }

  if (suggestions.length > 0) {
    logger.log(`💡 Suggestions for ${componentName}:`);
    suggestions.forEach(suggestion => logger.log(`  • ${suggestion}`));
  }

  if (isValid && warnings.length === 0) {
    logger.log(`✅ Component Validation Passed: ${componentName}`);
  }
}

/**
 * Runtime component validator hook for development
 */
export function useComponentValidator() {
  if (process.env.NODE_ENV !== 'development') {
    return () => true; // No-op in production
  }

  return (component: any, componentName: string) => {
    const result = validateReactComponent(component, componentName, {
      strictMode: true,
      logResults: true
    });
    return result.isValid;
  };
}

/**
 * Validates all components in a module
 */
export function validateModuleComponents(
  module: any,
  moduleName: string,
  options: ComponentValidationOptions = {}
): ComponentValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  if (!module || typeof module !== 'object') {
    errors.push(`Module "${moduleName}" is not a valid module object.`);
    return { isValid: false, errors, warnings, suggestions };
  }

  // Check each export in the module
  Object.keys(module).forEach(exportName => {
    const component = module[exportName];
    const result = validateReactComponent(component, `${moduleName}.${exportName}`, {
      ...options,
      logResults: false // We'll log the summary
    });

    errors.push(...result.errors);
    warnings.push(...result.warnings);
    suggestions.push(...result.suggestions);
  });

  const isValid = errors.length === 0;

  if (options.logResults !== false) {
    logValidationResults(moduleName, { isValid, errors, warnings, suggestions });
  }

  return { isValid, errors, warnings, suggestions };
}

/**
 * Creates a safe component wrapper that validates components
 */
export function createSafeComponent<T extends React.ComponentType<any>>(
  component: T,
  componentName: string
): T {
  if (process.env.NODE_ENV !== 'development') {
    return component;
  }

  const result = validateReactComponent(component, componentName);
  
  if (!result.isValid) {
    // Return a fallback component that shows the error
    const FallbackComponent = (props: any) => {
      return React.createElement('div', {
        style: { 
          padding: '1rem', 
          border: '2px solid red', 
          backgroundColor: '#fee', 
          color: 'red' 
        }
      }, 
        React.createElement('h3', null, `Component Error: ${componentName}`),
        React.createElement('ul', null,
          result.errors.map((error, index) => 
            React.createElement('li', { key: index }, error)
          )
        )
      );
    };
    return FallbackComponent as unknown as T;
  }

  return component;
}

export default {
  validateReactComponent,
  validateModuleComponents,
  useComponentValidator,
  createSafeComponent
};
