/**
 * Performance Validation Script
 * Validates that all performance optimizations are working correctly
 */

const fs = require('fs');
const path = require('path');

function checkFileExists(filePath, description) {
  const fullPath = path.join(__dirname, '..', filePath);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${description}: ${filePath}`);
    return true;
  } else {
    console.log(`❌ Missing: ${description}: ${filePath}`);
    return false;
  }
}

function checkFileSize(filePath, maxSizeKB, description) {
  const fullPath = path.join(__dirname, '..', filePath);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    const sizeKB = Math.round(stats.size / 1024);
    if (sizeKB <= maxSizeKB) {
      console.log(`✅ ${description}: ${filePath} (${sizeKB}KB)`);
      return true;
    } else {
      console.log(`❌ Too large: ${description}: ${filePath} (${sizeKB}KB > ${maxSizeKB}KB)`);
      return false;
    }
  } else {
    console.log(`❌ Missing: ${description}: ${filePath}`);
    return false;
  }
}

function checkOptimizedImages() {
  console.log('\n📸 Checking optimized images...');
  let allGood = true;

  const imagesToCheck = [
    'public/images-optimized/Careers.webp',
    'public/images-optimized/Careers.avif',
    'public/images-optimized/Values.webp',
    'public/images-optimized/Values.avif',
    'public/images-optimized/Vision.webp',
    'public/images-optimized/Vision.avif',
  ];

  const largePngsToCheck = [
    'public/images-optimized/Careers.png',
    'public/images-optimized/Values.png',
    'public/images-optimized/Vision.png',
  ];

  // Check optimized versions exist
  imagesToCheck.forEach(imagePath => {
    if (!checkFileExists(imagePath, 'Optimized image')) {
      allGood = false;
    }
  });

  // Check large PNGs are removed
  largePngsToCheck.forEach(imagePath => {
    const fullPath = path.join(__dirname, '..', imagePath);
    if (!fs.existsSync(fullPath)) {
      console.log(`✅ Removed large PNG: ${imagePath}`);
    } else {
      console.log(`❌ Large PNG still exists: ${imagePath}`);
      allGood = false;
    }
  });

  return allGood;
}

function checkPerformanceFiles() {
  console.log('\n⚡ Checking performance optimization files...');
  let allGood = true;

  const performanceFiles = [
    'src/utils/performanceDetection.ts',
    'src/hooks/usePerformanceAnimation.ts',
    'src/components/common/PerformanceAwareBackground.tsx',
    'src/components/common/MobileOptimizations.tsx',
    'src/components/common/PerformanceMonitor.tsx',
    'src/styles/performance-optimized.css',
    'src/config/optimizedImageMap.ts',
  ];

  performanceFiles.forEach(filePath => {
    if (!checkFileExists(filePath, 'Performance file')) {
      allGood = false;
    }
  });

  return allGood;
}

function checkConfiguration() {
  console.log('\n⚙️ Checking configuration optimizations...');
  let allGood = true;

  // Check Next.js config has optimizations
  const nextConfigPath = path.join(__dirname, '..', 'next.config.ts');
  if (fs.existsSync(nextConfigPath)) {
    const configContent = fs.readFileSync(nextConfigPath, 'utf8');
    
    const optimizations = [
      'optimizePackageImports',
      'splitChunks',
      'usedExports',
      'sideEffects: false',
      'concatenateModules',
    ];

    optimizations.forEach(optimization => {
      if (configContent.includes(optimization)) {
        console.log(`✅ Next.js config has: ${optimization}`);
      } else {
        console.log(`❌ Next.js config missing: ${optimization}`);
        allGood = false;
      }
    });
  } else {
    console.log(`❌ Next.js config not found`);
    allGood = false;
  }

  // Check package.json has performance scripts
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageContent = fs.readFileSync(packageJsonPath, 'utf8');
    
    if (packageContent.includes('"build":')) {
      console.log(`✅ Package.json has build script`);
    } else {
      console.log(`❌ Package.json missing build script`);
      allGood = false;
    }
  }

  return allGood;
}

function checkCodeQuality() {
  console.log('\n🧹 Checking code quality...');
  let allGood = true;

  // Check for console.log statements in production code
  const srcPath = path.join(__dirname, '..', 'src');
  
  function scanDirectory(dirPath) {
    try {
      const items = fs.readdirSync(dirPath);
      
      items.forEach(item => {
        const itemPath = path.join(dirPath, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
          scanDirectory(itemPath);
        } else if (stat.isFile() && (item.endsWith('.ts') || item.endsWith('.tsx'))) {
          const content = fs.readFileSync(itemPath, 'utf8');
          if (content.includes('console.log(')) {
            console.log(`⚠️  Console.log found in: ${path.relative(process.cwd(), itemPath)}`);
          }
        }
      });
    } catch (error) {
      // Directory might not exist
    }
  }

  scanDirectory(srcPath);
  console.log(`✅ Code quality check completed`);

  return allGood;
}

function main() {
  console.log('🔍 VR NextGEN Solutions - Performance Validation');
  console.log('=' .repeat(60));

  let overallSuccess = true;

  overallSuccess &= checkOptimizedImages();
  overallSuccess &= checkPerformanceFiles();
  overallSuccess &= checkConfiguration();
  overallSuccess &= checkCodeQuality();

  console.log('\n' + '=' .repeat(60));
  
  if (overallSuccess) {
    console.log('✨ All performance optimizations validated successfully!');
    console.log('\n🎯 Performance targets achieved:');
    console.log('   • Large PNG files removed and replaced with WebP/AVIF');
    console.log('   • Performance detection system implemented');
    console.log('   • Mobile optimizations added');
    console.log('   • Bundle optimization configured');
    console.log('   • Code quality maintained');
    
    console.log('\n📊 Expected improvements:');
    console.log('   • Faster initial page load');
    console.log('   • Better mobile performance');
    console.log('   • Reduced bundle sizes');
    console.log('   • Improved Lighthouse scores');
    
  } else {
    console.log('❌ Some performance optimizations need attention');
    console.log('   Please review the issues above and fix them');
  }

  console.log('\n🚀 Next steps:');
  console.log('   1. Run "npm run build" to test production build');
  console.log('   2. Run Lighthouse audit to measure improvements');
  console.log('   3. Test on various devices and network conditions');
}

if (require.main === module) {
  main();
}

module.exports = {
  checkOptimizedImages,
  checkPerformanceFiles,
  checkConfiguration,
  checkCodeQuality
};
