#!/usr/bin/env node

/**
 * Bundle Optimization Script
 * Analyzes and optimizes the application bundle for production
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  bundleAnalyzer: process.env.ANALYZE === 'true',
  enableCompression: true,
  enableTreeShaking: true,
  enableCodeSplitting: true,
  targetDirectory: '.next',
  outputDirectory: 'out',
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n${colors.cyan}${step}. ${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`${colors.green}✓ ${message}${colors.reset}`);
}

function logWarning(message) {
  log(`${colors.yellow}⚠ ${message}${colors.reset}`);
}

function logError(message) {
  log(`${colors.red}✗ ${message}${colors.reset}`);
}

// Check if file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Get file size in bytes
function getFileSize(filePath) {
  if (!fileExists(filePath)) return 0;
  const stats = fs.statSync(filePath);
  return stats.size;
}

// Format bytes to human readable format
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Analyze bundle size
function analyzeBundle() {
  logStep('1', 'Analyzing bundle size...');
  
  const buildPath = path.join(process.cwd(), config.targetDirectory);
  
  if (!fileExists(buildPath)) {
    logError('Build directory not found. Run "npm run build" first.');
    return;
  }

  // Analyze static files
  const staticPath = path.join(buildPath, 'static');
  if (fileExists(staticPath)) {
    const chunks = fs.readdirSync(staticPath);
    let totalSize = 0;
    
    chunks.forEach(chunk => {
      const chunkPath = path.join(staticPath, chunk);
      if (fs.statSync(chunkPath).isDirectory()) {
        const files = fs.readdirSync(chunkPath);
        files.forEach(file => {
          const filePath = path.join(chunkPath, file);
          const size = getFileSize(filePath);
          totalSize += size;
          
          if (file.endsWith('.js')) {
            log(`  JS: ${file} - ${formatBytes(size)}`);
          } else if (file.endsWith('.css')) {
            log(`  CSS: ${file} - ${formatBytes(size)}`);
          }
        });
      }
    });
    
    logSuccess(`Total bundle size: ${formatBytes(totalSize)}`);
    
    // Bundle size recommendations
    if (totalSize > 500 * 1024) { // 500KB
      logWarning('Bundle size is larger than 500KB. Consider code splitting.');
    }
    if (totalSize > 1024 * 1024) { // 1MB
      logWarning('Bundle size is larger than 1MB. Consider lazy loading more components.');
    }
  }
}

// Optimize images
function optimizeImages() {
  logStep('2', 'Optimizing images...');
  
  try {
    execSync('npm run optimize:images', { stdio: 'inherit' });
    logSuccess('Images optimized successfully');
  } catch (error) {
    logWarning('Image optimization failed or not configured');
  }
}

// Optimize CSS
function optimizeCSS() {
  logStep('3', 'Optimizing CSS...');
  
  try {
    execSync('npm run optimize:css', { stdio: 'inherit' });
    logSuccess('CSS optimized successfully');
  } catch (error) {
    logWarning('CSS optimization failed or not configured');
  }
}

// Check for unused dependencies
function checkUnusedDependencies() {
  logStep('4', 'Checking for unused dependencies...');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const dependencies = Object.keys(packageJson.dependencies || {});
    
    // This is a simplified check - in a real scenario, you'd use tools like depcheck
    logSuccess(`Found ${dependencies.length} dependencies`);
    logWarning('Consider running "npx depcheck" to find unused dependencies');
  } catch (error) {
    logWarning('Could not analyze dependencies');
  }
}

// Generate bundle analyzer report
function generateBundleAnalyzer() {
  if (!config.bundleAnalyzer) return;
  
  logStep('5', 'Generating bundle analyzer report...');
  
  try {
    execSync('npm run build:analyze', { stdio: 'inherit' });
    logSuccess('Bundle analyzer report generated');
  } catch (error) {
    logWarning('Bundle analyzer failed or not configured');
  }
}

// Performance recommendations
function generateRecommendations() {
  logStep('6', 'Generating performance recommendations...');
  
  const recommendations = [
    'Enable gzip compression on your server',
    'Use a CDN for static assets',
    'Implement service worker for caching',
    'Use webp format for images',
    'Consider implementing critical CSS inlining',
    'Use React.memo for expensive components',
    'Implement virtual scrolling for long lists',
    'Use dynamic imports for route-based code splitting'
  ];
  
  log('\nPerformance Recommendations:');
  recommendations.forEach((rec, index) => {
    log(`  ${index + 1}. ${rec}`);
  });
}

// Main optimization function
function optimize() {
  log(`${colors.bright}${colors.blue}VR NextGEN Bundle Optimization${colors.reset}`);
  log(`${colors.blue}========================================${colors.reset}`);
  
  try {
    analyzeBundle();
    optimizeImages();
    optimizeCSS();
    checkUnusedDependencies();
    generateBundleAnalyzer();
    generateRecommendations();
    
    log(`\n${colors.green}${colors.bright}Optimization completed successfully!${colors.reset}`);
  } catch (error) {
    logError(`Optimization failed: ${error.message}`);
    process.exit(1);
  }
}

// Run optimization
if (require.main === module) {
  optimize();
}

module.exports = {
  optimize,
  analyzeBundle,
  optimizeImages,
  optimizeCSS,
  checkUnusedDependencies,
  generateBundleAnalyzer,
  generateRecommendations
};
