#!/usr/bin/env node

/**
 * Import Validation Script
 * 
 * This script validates all import/export statements in the codebase
 * to prevent "Element type is invalid" errors.
 * 
 * Usage: node scripts/validate-imports.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  srcDir: 'src',
  filePatterns: ['**/*.{ts,tsx,js,jsx}'],
  excludePatterns: ['**/*.d.ts', '**/node_modules/**', '**/.next/**'],
  maxFileSize: 1024 * 1024, // 1MB
  verbose: process.argv.includes('--verbose') || process.argv.includes('-v')
};

// Validation rules
const VALIDATION_RULES = [
  {
    name: 'default-export-mismatch',
    pattern: /export\s*\{\s*default\s+as\s+\w+\s*\}\s*from\s*['"]([^'"]+)['"]/g,
    message: 'Found problematic "export { default as Component } from \'./path\'" pattern',
    fix: 'Change to "export { Component } from \'./path\'" or fix the source file\'s export',
    severity: 'error'
  },
  {
    name: 'missing-default-export',
    pattern: /import\s+(\w+)\s+from\s*['"]([^'"]+)['"]/g,
    message: 'Import expects default export but source might not have one',
    fix: 'Check if the source file exports a default export',
    severity: 'warning'
  },
  {
    name: 'circular-import',
    pattern: /import\s+.*?\s+from\s*['"](\.\/[^'"]+)['"]/g,
    message: 'Potential circular import detected',
    fix: 'Review import chain for circular dependencies',
    severity: 'warning'
  },
  {
    name: 'inconsistent-export-style',
    pattern: /export\s*\{\s*(\w+)\s*\}\s*from\s*['"]([^'"]+)['"]/g,
    message: 'Named export pattern detected',
    fix: 'Ensure source file has corresponding named export',
    severity: 'info'
  }
];

// Results tracking
const results = {
  totalFiles: 0,
  processedFiles: 0,
  errors: [],
  warnings: [],
  info: [],
  fixedIssues: 0
};

/**
 * Main validation function
 */
async function validateImports() {
  console.log('🔍 Starting import validation...\n');
  
  try {
    // Find all files to validate
    const files = await findFiles();
    results.totalFiles = files.length;
    
    console.log(`Found ${files.length} files to validate\n`);
    
    // Process each file
    for (const file of files) {
      await validateFile(file);
      results.processedFiles++;
      
      if (CONFIG.verbose) {
        process.stdout.write(`\rProcessed: ${results.processedFiles}/${results.totalFiles} files`);
      }
    }
    
    if (CONFIG.verbose) {
      console.log('\n');
    }
    
    // Generate report
    generateReport();
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    process.exit(1);
  }
}

/**
 * Recursively finds all files matching the patterns
 */
function findFilesRecursive(dir, patterns, excludePatterns = []) {
  const files = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Check if directory should be excluded
        const shouldExclude = excludePatterns.some(pattern => {
          if (pattern.includes('**/')) {
            const dirPattern = pattern.replace('**/', '').replace('/**', '');
            return fullPath.includes(dirPattern);
          }
          return item === pattern;
        });
        
        if (!shouldExclude) {
          files.push(...findFilesRecursive(fullPath, patterns, excludePatterns));
        }
      } else if (stat.isFile()) {
        // Check if file matches any pattern
        const matchesPattern = patterns.some(pattern => {
          if (pattern.includes('**/*.')) {
            const ext = pattern.split('.').pop().replace('}', '');
            const extensions = ext.split(',');
            return extensions.some(ext => item.endsWith('.' + ext));
          }
          return item.match(pattern);
        });
        
        if (matchesPattern) {
          files.push(fullPath);
        }
      }
    }
  } catch (error) {
    // Ignore permission errors
  }
  
  return files;
}

/**
 * Finds all files to validate
 */
async function findFiles() {
  const files = findFilesRecursive(CONFIG.srcDir, CONFIG.filePatterns, CONFIG.excludePatterns);
  
  // Filter by size
  const filteredFiles = files.filter(file => {
    try {
      const stats = fs.statSync(file);
      return stats.size <= CONFIG.maxFileSize;
    } catch {
      return false;
    }
  });
  
  return filteredFiles;
}

/**
 * Validates a single file
 */
async function validateFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    // Apply validation rules
    for (const rule of VALIDATION_RULES) {
      let match;
      while ((match = rule.pattern.exec(content)) !== null) {
        const lineNumber = content.substring(0, match.index).split('\n').length;
        const line = lines[lineNumber - 1];
        
        const issue = {
          file: filePath,
          line: lineNumber,
          column: match.index - content.lastIndexOf('\n', match.index),
          rule: rule.name,
          message: rule.message,
          fix: rule.fix,
          severity: rule.severity,
          match: match[0],
          context: line?.trim()
        };
        
        // Categorize by severity
        switch (rule.severity) {
          case 'error':
            results.errors.push(issue);
            break;
          case 'warning':
            results.warnings.push(issue);
            break;
          case 'info':
            results.info.push(issue);
            break;
        }
      }
    }
    
    // Check for specific problematic patterns
    checkSpecificPatterns(filePath, content, lines);
    
  } catch (error) {
    console.error(`❌ Error reading file ${filePath}:`, error.message);
  }
}

/**
 * Checks for specific problematic patterns
 */
function checkSpecificPatterns(filePath, content, lines) {
  // Check for the specific issue we found
  const problematicPattern = /export\s*\{\s*default\s+as\s+\w+\s*\}\s*from\s*['"]\.\/[^'"]*['"]/g;
  let match;
  
  while ((match = problematicPattern.exec(content)) !== null) {
    const lineNumber = content.substring(0, match.index).split('\n').length;
    const line = lines[lineNumber - 1];
    
    results.errors.push({
      file: filePath,
      line: lineNumber,
      column: match.index - content.lastIndexOf('\n', match.index),
      rule: 'critical-export-issue',
      message: 'CRITICAL: Found the exact pattern causing "Element type is invalid" error',
      fix: 'Change to "export { Component } from \'./path\'" or fix the source file\'s export',
      severity: 'error',
      match: match[0],
      context: line?.trim()
    });
  }
  
  // Check for object imports that should be component imports
  const objectImportPattern = /import\s+\{\s*(\w+)\s*\}\s*from\s*['"][^'"]*['"]/g;
  while ((match = objectImportPattern.exec(content)) !== null) {
    const importName = match[1];
    const lineNumber = content.substring(0, match.index).split('\n').length;
    
    // Check if the import is used as a component (JSX)
    const jsxUsage = new RegExp(`<${importName}\\b`, 'g');
    if (jsxUsage.test(content)) {
      results.warnings.push({
        file: filePath,
        line: lineNumber,
        column: match.index - content.lastIndexOf('\n', match.index),
        rule: 'object-import-as-component',
        message: `Import "${importName}" is used as a component but imported as object`,
        fix: `Consider using default import for component "${importName}"`,
        severity: 'warning',
        match: match[0],
        context: lines[lineNumber - 1]?.trim()
      });
    }
  }
}

/**
 * Generates validation report
 */
function generateReport() {
  console.log('\n📊 Import Validation Report');
  console.log('============================');
  console.log(`Total files processed: ${results.processedFiles}`);
  console.log(`Errors found: ${results.errors.length}`);
  console.log(`Warnings found: ${results.warnings.length}`);
  console.log(`Info messages: ${results.info.length}`);
  
  // Show errors
  if (results.errors.length > 0) {
    console.log('\n❌ ERRORS (Must Fix):');
    results.errors.forEach((error, index) => {
      console.log(`\n${index + 1}. ${error.file}:${error.line}:${error.column}`);
      console.log(`   ${error.message}`);
      console.log(`   Match: ${error.match}`);
      console.log(`   Fix: ${error.fix}`);
      if (CONFIG.verbose && error.context) {
        console.log(`   Context: ${error.context}`);
      }
    });
  }
  
  // Show warnings
  if (results.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS (Should Fix):');
    results.warnings.slice(0, 10).forEach((warning, index) => {
      console.log(`\n${index + 1}. ${warning.file}:${warning.line}:${warning.column}`);
      console.log(`   ${warning.message}`);
      console.log(`   Fix: ${warning.fix}`);
    });
    
    if (results.warnings.length > 10) {
      console.log(`\n... and ${results.warnings.length - 10} more warnings`);
    }
  }
  
  // Show info
  if (results.info.length > 0 && CONFIG.verbose) {
    console.log('\nℹ️  INFO:');
    results.info.slice(0, 5).forEach((info, index) => {
      console.log(`\n${index + 1}. ${info.file}:${info.line}:${info.column}`);
      console.log(`   ${info.message}`);
    });
  }
  
  // Summary
  console.log('\n📋 Summary:');
  if (results.errors.length === 0) {
    console.log('✅ No critical errors found!');
  } else {
    console.log(`❌ ${results.errors.length} critical errors found that must be fixed`);
  }
  
  if (results.warnings.length > 0) {
    console.log(`⚠️  ${results.warnings.length} warnings found that should be addressed`);
  }
  
  // Exit with error code if critical errors found
  if (results.errors.length > 0) {
    console.log('\n💡 Run with --verbose for more details');
    process.exit(1);
  }
}

// Run validation if called directly
if (require.main === module) {
  validateImports().catch(error => {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  });
}

module.exports = {
  validateImports,
  validateFile,
  VALIDATION_RULES
};
