/**
 * Image Optimization Script
 * Compresses and converts images to modern formats
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images-optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Quality settings for different image types
const QUALITY_SETTINGS = {
  webp: 85,
  avif: 80,
  jpeg: 85,
  png: 90,
};

// Sizes for responsive images
const RESPONSIVE_SIZES = [
  { width: 640, suffix: '-sm' },
  { width: 768, suffix: '-md' },
  { width: 1024, suffix: '-lg' },
  { width: 1280, suffix: '-xl' },
  { width: 1920, suffix: '-2xl' },
];

async function optimizeImage(inputPath, outputDir, filename) {
  const basename = path.parse(filename).name;
  const ext = path.parse(filename).ext.toLowerCase();
  
  console.log(`Optimizing ${filename}...`);
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Skip if already optimized or if it's an SVG
    if (filename.includes('-optimized') || ext === '.svg') {
      console.log(`Skipping ${filename} (already optimized or SVG)`);
      return;
    }
    
    // Create responsive versions
    for (const size of RESPONSIVE_SIZES) {
      if (metadata.width <= size.width) continue;
      
      // WebP version
      await image
        .resize(size.width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: QUALITY_SETTINGS.webp })
        .toFile(path.join(outputDir, `${basename}${size.suffix}.webp`));
      
      // AVIF version (for modern browsers)
      await image
        .resize(size.width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .avif({ quality: QUALITY_SETTINGS.avif })
        .toFile(path.join(outputDir, `${basename}${size.suffix}.avif`));
    }
    
    // Create original size optimized versions
    // WebP
    await image
      .webp({ quality: QUALITY_SETTINGS.webp })
      .toFile(path.join(outputDir, `${basename}.webp`));
    
    // AVIF
    await image
      .avif({ quality: QUALITY_SETTINGS.avif })
      .toFile(path.join(outputDir, `${basename}.avif`));
    
    // Keep original format but compressed
    if (ext === '.png') {
      await image
        .png({ quality: QUALITY_SETTINGS.png, compressionLevel: 9 })
        .toFile(path.join(outputDir, `${basename}-optimized.png`));
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await image
        .jpeg({ quality: QUALITY_SETTINGS.jpeg, progressive: true })
        .toFile(path.join(outputDir, `${basename}-optimized.jpg`));
    }
    
    console.log(`✅ Optimized ${filename}`);
    
  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error.message);
  }
}

async function optimizeDirectory(dirPath, outputDir) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      const subOutputDir = path.join(outputDir, item);
      if (!fs.existsSync(subOutputDir)) {
        fs.mkdirSync(subOutputDir, { recursive: true });
      }
      await optimizeDirectory(itemPath, subOutputDir);
    } else if (stat.isFile()) {
      const ext = path.parse(item).ext.toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
        await optimizeImage(itemPath, outputDir, item);
      }
    }
  }
}

async function main() {
  console.log('🚀 Starting image optimization...');
  console.log(`Input directory: ${INPUT_DIR}`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
  
  try {
    await optimizeDirectory(INPUT_DIR, OUTPUT_DIR);
    console.log('✅ Image optimization completed!');
    console.log('\n📊 Summary:');
    console.log('- Created WebP versions for better compression');
    console.log('- Created AVIF versions for modern browsers');
    console.log('- Generated responsive sizes');
    console.log('- Compressed original formats');
    console.log('\n💡 Next steps:');
    console.log('1. Review the optimized images');
    console.log('2. Update your components to use the new images');
    console.log('3. Test the performance improvements');
  } catch (error) {
    console.error('❌ Optimization failed:', error);
    process.exit(1);
  }
}

main();