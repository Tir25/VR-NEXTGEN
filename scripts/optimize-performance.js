/**
 * Comprehensive Performance Optimization Script
 * Runs all performance optimizations in sequence
 */

const { execSync } = require('child_process');
const path = require('path');

function runScript(scriptName, description) {
  console.log(`\n🚀 ${description}...`);
  try {
    const scriptPath = path.join(__dirname, scriptName);
    execSync(`node "${scriptPath}"`, { stdio: 'inherit' });
    console.log(`✅ ${description} completed`);
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
  }
}

function main() {
  console.log('🎯 VR NextGEN Solutions - Performance Optimization Suite');
  console.log('=' .repeat(60));

  // Run all optimization scripts
  runScript('optimize-large-images.js', 'Image Optimization');
  runScript('optimize-imports.js', 'Import Optimization');
  
  // Only run console log removal in production
  if (process.env.NODE_ENV === 'production') {
    runScript('remove-console-logs.js', 'Console Log Removal');
  }

  console.log('\n' + '=' .repeat(60));
  console.log('✨ Performance optimization suite completed!');
  console.log('\n📊 Summary of optimizations:');
  console.log('   • Removed large PNG files (replaced with WebP/AVIF)');
  console.log('   • Optimized import statements for better tree-shaking');
  console.log('   • Enhanced Next.js configuration for performance');
  console.log('   • Added performance-aware components and hooks');
  console.log('   • Implemented dynamic device capability detection');
  console.log('   • Created performance monitoring tools');
  
  if (process.env.NODE_ENV === 'production') {
    console.log('   • Removed console.log statements');
  }
  
  console.log('\n🎯 Next steps:');
  console.log('   1. Run "npm run build" to test production build');
  console.log('   2. Run "npm run start" to test production performance');
  console.log('   3. Use Lighthouse to measure performance improvements');
  console.log('   4. Test on various devices and network conditions');
  
  console.log('\n💡 Performance targets:');
  console.log('   • Lighthouse Performance Score: ≥90 (mobile), ≥95 (desktop)');
  console.log('   • JavaScript Bundle: <150KB');
  console.log('   • CSS Bundle: <35KB');
  console.log('   • First Contentful Paint: <1.5s');
  console.log('   • Largest Contentful Paint: <2.5s');
}

if (require.main === module) {
  main();
}

module.exports = { main };
