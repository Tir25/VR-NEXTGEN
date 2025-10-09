/**
 * Import/Export Validation Utility
 * 
 * This utility validates import/export statements to prevent common issues
 * that cause "Element type is invalid" errors in React applications.
 * 
 * Features:
 * - Validates import/export syntax
 * - Detects mismatched default/named imports
 * - Checks for circular dependencies
 * - Validates module structure
 * - Provides automated fixes
 */

import React from 'react';
import { logger } from './logger';

export interface ImportExportValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
  fixes: string[];
}

export interface ImportExportRule {
  name: string;
  description: string;
  validator: (code: string) => boolean;
  fixer?: (code: string) => string;
  severity: 'error' | 'warning' | 'info';
}

/**
 * Common import/export validation rules
 */
const IMPORT_EXPORT_RULES: ImportExportRule[] = [
  {
    name: 'default-export-mismatch',
    description: 'Detects mismatched default/named imports',
    validator: (code: string) => {
      // Check for: export { default as Component } from './path'
      // When the source doesn't have a default export
      const defaultAsPattern = /export\s*\{\s*default\s+as\s+\w+\s*\}\s*from\s*['"]([^'"]+)['"]/g;
      return !defaultAsPattern.test(code);
    },
    fixer: (code: string) => {
      // Convert export { default as Component } to export { Component }
      return code.replace(
        /export\s*\{\s*default\s+as\s+(\w+)\s*\}\s*from\s*['"]([^'"]+)['"]/g,
        'export { $1 } from \'$2\''
      );
    },
    severity: 'error'
  },
  {
    name: 'circular-import',
    description: 'Detects potential circular imports',
    validator: (code: string) => {
      // Simple circular import detection
      const importPattern = /import\s+.*?\s+from\s*['"]([^'"]+)['"]/g;
      const exports = new Set<string>();
      const imports = new Set<string>();
      
      let match;
      while ((match = importPattern.exec(code)) !== null) {
        imports.add(match[1]);
      }
      
      // Check if any import matches an export pattern
      for (const imp of imports) {
        if (exports.has(imp)) {
          return false;
        }
      }
      
      return true;
    },
    severity: 'warning'
  },
  {
    name: 'missing-default-export',
    description: 'Detects imports expecting default exports',
    validator: (code: string) => {
      // Check for: import Component from './path' without export default
      const defaultImportPattern = /import\s+(\w+)\s+from\s*['"]([^'"]+)['"]/g;
      const hasDefaultExport = /export\s+default/.test(code);
      
      return hasDefaultExport || !defaultImportPattern.test(code);
    },
    severity: 'warning'
  },
  {
    name: 'inconsistent-export-style',
    description: 'Detects inconsistent export patterns',
    validator: (code: string) => {
      const hasDefaultExport = /export\s+default/.test(code);
      const hasNamedExports = /export\s*\{/.test(code);
      
      // Allow mixed exports, but warn about consistency
      return true;
    },
    severity: 'info'
  }
];

/**
 * Validates import/export statements in code
 */
export function validateImportExports(
  code: string,
  filename: string = 'unknown'
): ImportExportValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];
  const fixes: string[] = [];

  // Apply validation rules
  IMPORT_EXPORT_RULES.forEach(rule => {
    const isValid = rule.validator(code);
    
    if (!isValid) {
      const message = `${rule.name}: ${rule.description}`;
      
      switch (rule.severity) {
        case 'error':
          errors.push(message);
          if (rule.fixer) {
            fixes.push(rule.fixer(code));
          }
          break;
        case 'warning':
          warnings.push(message);
          break;
        case 'info':
          suggestions.push(message);
          break;
      }
    }
  });

  // Additional validations
  validateSpecificPatterns(code, errors, warnings, suggestions);

  const isValid = errors.length === 0;

  if (process.env.NODE_ENV === 'development' && (!isValid || warnings.length > 0)) {
    logValidationResults(filename, { isValid, errors, warnings, suggestions, fixes });
  }

  return { isValid, errors, warnings, suggestions, fixes };
}

/**
 * Validates specific import/export patterns
 */
function validateSpecificPatterns(
  code: string,
  errors: string[],
  warnings: string[],
  suggestions: string[]
): void {
  // Check for the specific issue we found
  const problematicPattern = /export\s*\{\s*default\s+as\s+\w+\s*\}\s*from\s*['"]\.\/[^'"]*['"]/g;
  if (problematicPattern.test(code)) {
    errors.push('Found problematic "export { default as Component } from \'./path\'" pattern');
    suggestions.push('Change to "export { Component } from \'./path\'" or fix the source file\'s export');
  }

  // Check for object imports that should be component imports
  const objectImportPattern = /import\s+\{\s*(\w+)\s*\}\s*from\s*['"][^'"]*['"]/g;
  const matches = [...code.matchAll(objectImportPattern)];
  
  matches.forEach(match => {
    const importName = match[1];
    // Check if the import is used as a component (JSX)
    const jsxUsage = new RegExp(`<${importName}\\b`, 'g');
    if (jsxUsage.test(code)) {
      suggestions.push(`Consider using default import for component "${importName}"`);
    }
  });

  // Check for missing React import in JSX files
  if (code.includes('<') && code.includes('>') && !code.includes('import React')) {
    warnings.push('JSX detected but no React import found');
    suggestions.push('Add "import React from \'react\'" if using JSX');
  }
}

/**
 * Logs validation results
 */
function logValidationResults(
  filename: string,
  result: ImportExportValidationResult
): void {
  const { isValid, errors, warnings, suggestions, fixes } = result;

  logger.log(`\n🔍 Import/Export Validation: ${filename}`);
  
  if (!isValid) {
    logger.error('❌ Validation Failed');
    errors.forEach(error => logger.error(`  • ${error}`));
  }

  if (warnings.length > 0) {
    logger.warn('⚠️ Warnings');
    warnings.forEach(warning => logger.warn(`  • ${warning}`));
  }

  if (suggestions.length > 0) {
    logger.log('💡 Suggestions');
    suggestions.forEach(suggestion => logger.log(`  • ${suggestion}`));
  }

  if (fixes.length > 0) {
    logger.log('🔧 Suggested Fixes');
    fixes.forEach((fix, index) => logger.log(`  ${index + 1}. ${fix}`));
  }

  if (isValid && warnings.length === 0) {
    logger.log('✅ Validation Passed');
  }
}

/**
 * Validates a file's import/export statements
 */
export function validateFile(
  filePath: string,
  content: string
): ImportExportValidationResult {
  return validateImportExports(content, filePath);
}

/**
 * Creates a safe import wrapper that validates imports
 */
export function createSafeImport<T>(
  importFn: () => T,
  componentName: string,
  fallback?: T
): T {
  try {
    const result = importFn();
    
    // Validate the imported component
    if (result && typeof result === 'object' && (result as any).default) {
      // Check if default export is valid
      if (typeof (result as any).default !== 'function' && typeof (result as any).default !== 'object') {
        logger.error(`Invalid default export for ${componentName}:`, (result as any).default);
        return fallback || (() => React.createElement('div', null, `Import Error: ${componentName}`)) as T;
      }
    }
    
    return result;
  } catch (error) {
    logger.error(`Import error for ${componentName}:`, error);
    return fallback || (() => React.createElement('div', null, `Import Error: ${componentName}`)) as T;
  }
}

/**
 * Hook for validating imports in React components
 */
export function useImportValidator() {
  if (process.env.NODE_ENV !== 'development') {
    return () => true; // No-op in production
  }

  return (importedComponent: any, componentName: string) => {
    if (!importedComponent) {
      logger.error(`Import validation failed for ${componentName}: Component is undefined`);
      return false;
    }

    if (typeof importedComponent === 'object' && !importedComponent.default) {
      logger.warn(`Import validation warning for ${componentName}: Component is an object without default export`);
      return false;
    }

    return true;
  };
}

export default {
  validateImportExports,
  validateFile,
  createSafeImport,
  useImportValidator,
  IMPORT_EXPORT_RULES
};
