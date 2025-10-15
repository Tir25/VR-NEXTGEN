/**
 * Convert About.png to WebP format using Sharp
 * Reduces file size by 25-35% while maintaining quality
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const IMAGES_OPTIMIZED_DIR = path.join(__dirname, '..', 'public', 'images-optimized');
const ABOUT_PNG_PATH = path.join(IMAGES_OPTIMIZED_DIR, 'About.png');
const ABOUT_WEBP_PATH = path.join(IMAGES_OPTIMIZED_DIR, 'About.webp');

async function convertToWebP() {
  console.log('🚀 Converting About.png to WebP format...\n');
  
  if (!fs.existsSync(ABOUT_PNG_PATH)) {
    console.log('❌ About.png not found in images-optimized directory');
    return;
  }
  
  try {
    // Get original file size
    const originalStats = fs.statSync(ABOUT_PNG_PATH);
    const originalSizeKB = Math.round(originalStats.size / 1024);
    console.log(`📊 Original PNG size: ${originalSizeKB}KB`);
    
    // Convert to WebP with optimization
    await sharp(ABOUT_PNG_PATH)
      .webp({
        quality: 85,
        effort: 6, // Higher effort for better compression
        lossless: false,
        smartSubsample: true,
        reductionEffort: 6
      })
      .toFile(ABOUT_WEBP_PATH);
    
    // Get converted file size
    const webpStats = fs.statSync(ABOUT_WEBP_PATH);
    const webpSizeKB = Math.round(webpStats.size / 1024);
    const savings = Math.round(((originalSizeKB - webpSizeKB) / originalSizeKB) * 100);
    
    console.log(`✅ WebP conversion successful!`);
    console.log(`📊 WebP size: ${webpSizeKB}KB`);
    console.log(`📈 Size reduction: ${savings}% (${originalSizeKB - webpSizeKB}KB saved)`);
    
    // Create multiple sizes for responsive images
    await createResponsiveImages();
    
    console.log('\n🎉 About.png optimization complete!');
    console.log('📋 Summary:');
    console.log(`   - WebP version: ${webpSizeKB}KB (${savings}% smaller)`);
    console.log('   - Responsive sizes created');
    console.log('   - Component ready for WebP delivery');
    
  } catch (error) {
    console.error('❌ Error converting to WebP:', error.message);
  }
}

async function createResponsiveImages() {
  console.log('\n📱 Creating responsive image sizes...');
  
  const sizes = [
    { name: 'About-400.webp', width: 400, quality: 80 },
    { name: 'About-600.webp', width: 600, quality: 85 },
    { name: 'About-800.webp', width: 800, quality: 85 },
    { name: 'About-1200.webp', width: 1200, quality: 90 }
  ];
  
  for (const size of sizes) {
    try {
      const outputPath = path.join(IMAGES_OPTIMIZED_DIR, size.name);
      
      await sharp(ABOUT_PNG_PATH)
        .resize(size.width, null, {
          withoutEnlargement: true,
          kernel: sharp.kernel.lanczos3
        })
        .webp({
          quality: size.quality,
          effort: 6
        })
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      const sizeKB = Math.round(stats.size / 1024);
      console.log(`   ✅ ${size.name}: ${sizeKB}KB`);
      
    } catch (error) {
      console.error(`   ❌ Error creating ${size.name}:`, error.message);
    }
  }
}

function generateSrcSet() {
  console.log('\n📝 Generated srcSet for responsive images:');
  
  const srcSet = [
    '/images-optimized/About-400.webp 400w',
    '/images-optimized/About-600.webp 600w',
    '/images-optimized/About-800.webp 800w',
    '/images-optimized/About-1200.webp 1200w',
    '/images-optimized/About.webp 1600w'
  ].join(', ');
  
  console.log(`   ${srcSet}`);
  console.log('\n💡 Add this srcSet to your Image component for optimal loading!');
}

async function main() {
  try {
    await convertToWebP();
    generateSrcSet();
  } catch (error) {
    console.error('❌ Error during conversion:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  convertToWebP,
  createResponsiveImages,
  generateSrcSet
};
