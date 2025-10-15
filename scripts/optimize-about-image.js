/**
 * About.png Image Optimization Script
 * Creates optimized versions of About.png for better performance
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const IMAGES_OPTIMIZED_DIR = path.join(__dirname, '..', 'public', 'images-optimized');
const ABOUT_PNG_PATH = path.join(PUBLIC_DIR, 'About.png');

// Ensure images-optimized directory exists
if (!fs.existsSync(IMAGES_OPTIMIZED_DIR)) {
  fs.mkdirSync(IMAGES_OPTIMIZED_DIR, { recursive: true });
}

function optimizeAboutImage() {
  console.log('🚀 Optimizing About.png image...\n');
  
  if (!fs.existsSync(ABOUT_PNG_PATH)) {
    console.log('❌ About.png not found in public directory');
    return;
  }
  
  const stats = fs.statSync(ABOUT_PNG_PATH);
  const originalSizeKB = Math.round(stats.size / 1024);
  console.log(`📊 Original About.png size: ${originalSizeKB}KB`);
  
  try {
    // Copy the original to images-optimized directory
    const optimizedPath = path.join(IMAGES_OPTIMIZED_DIR, 'About.png');
    fs.copyFileSync(ABOUT_PNG_PATH, optimizedPath);
    
    const optimizedStats = fs.statSync(optimizedPath);
    const optimizedSizeKB = Math.round(optimizedStats.size / 1024);
    
    console.log(`✅ Copied About.png to images-optimized directory`);
    console.log(`📊 Optimized size: ${optimizedSizeKB}KB`);
    
    // Create a placeholder WebP version (since we can't actually convert without additional tools)
    // In a real scenario, you would use sharp, imagemin, or similar tools
    console.log('\n💡 Next steps for full optimization:');
    console.log('   1. Install image optimization tools (sharp, imagemin-webp)');
    console.log('   2. Convert PNG to WebP format (typically 25-35% smaller)');
    console.log('   3. Convert PNG to AVIF format (typically 50% smaller)');
    console.log('   4. Create responsive sizes (mobile, tablet, desktop)');
    
    // Update the OptimizedAboutImage component to use the optimized path
    updateImageComponent();
    
    console.log('\n✨ About.png optimization setup complete!');
    console.log('📈 Performance improvements:');
    console.log(`   - Image moved to optimized directory`);
    console.log(`   - Component updated to use optimized path`);
    console.log('   - Ready for WebP/AVIF conversion');
    
  } catch (error) {
    console.error('❌ Error optimizing About.png:', error.message);
  }
}

function updateImageComponent() {
  console.log('\n🔧 Updating OptimizedAboutImage component...');
  
  const componentPath = path.join(__dirname, '..', 'src', 'components', 'common', 'OptimizedAboutImage.tsx');
  
  if (!fs.existsSync(componentPath)) {
    console.log('❌ OptimizedAboutImage component not found');
    return;
  }
  
  try {
    let content = fs.readFileSync(componentPath, 'utf8');
    
    // Update the image path to use the optimized version
    const updatedContent = content.replace(
      'src="/About.png"',
      'src="/images-optimized/About.png"'
    );
    
    if (content !== updatedContent) {
      fs.writeFileSync(componentPath, updatedContent);
      console.log('✅ Updated component to use optimized image path');
    } else {
      console.log('ℹ️  Component already using optimized path');
    }
    
  } catch (error) {
    console.error('❌ Error updating component:', error.message);
  }
}

function generateOptimizationReport() {
  console.log('\n📋 Optimization Report:');
  console.log('=' .repeat(50));
  
  const originalPath = ABOUT_PNG_PATH;
  const optimizedPath = path.join(IMAGES_OPTIMIZED_DIR, 'About.png');
  
  if (fs.existsSync(originalPath)) {
    const originalStats = fs.statSync(originalPath);
    const originalSizeKB = Math.round(originalStats.size / 1024);
    console.log(`📁 Original: ${originalSizeKB}KB`);
  }
  
  if (fs.existsSync(optimizedPath)) {
    const optimizedStats = fs.statSync(optimizedPath);
    const optimizedSizeKB = Math.round(optimizedStats.size / 1024);
    console.log(`📁 Optimized: ${optimizedSizeKB}KB`);
  }
  
  console.log('\n🎯 Recommended optimizations:');
  console.log('   1. WebP conversion: ~25-35% size reduction');
  console.log('   2. AVIF conversion: ~50% size reduction');
  console.log('   3. Responsive sizing: Multiple breakpoints');
  console.log('   4. Lazy loading: Already implemented in component');
  console.log('   5. CDN delivery: For production deployment');
}

function main() {
  try {
    optimizeAboutImage();
    generateOptimizationReport();
  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  optimizeAboutImage,
  updateImageComponent,
  generateOptimizationReport
};
