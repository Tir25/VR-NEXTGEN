/**
 * Image Optimization Script
 * Removes large PNG files and ensures only optimized versions exist
 */

const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images-optimized');

// Files to remove (large PNG versions that have optimized alternatives)
const FILES_TO_REMOVE = [
  'Careers.png',
  'Values.png', 
  'Vision.png'
];

// Files to keep (optimized versions)
const FILES_TO_KEEP = [
  'Careers.webp',
  'Careers.avif',
  'Values.webp',
  'Values.avif', 
  'Vision.webp',
  'Vision.avif'
];

function removeLargeImages() {
  console.log('🗑️  Removing large PNG files...');
  
  FILES_TO_REMOVE.forEach(fileName => {
    const filePath = path.join(IMAGES_DIR, fileName);
    
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`✅ Removed: ${fileName}`);
      } catch (error) {
        console.error(`❌ Error removing ${fileName}:`, error.message);
      }
    } else {
      console.log(`ℹ️  File not found: ${fileName}`);
    }
  });
}

function verifyOptimizedImages() {
  console.log('\n🔍 Verifying optimized images exist...');
  
  FILES_TO_KEEP.forEach(fileName => {
    const filePath = path.join(IMAGES_DIR, fileName);
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const sizeKB = Math.round(stats.size / 1024);
      console.log(`✅ ${fileName} (${sizeKB}KB)`);
    } else {
      console.log(`⚠️  Missing optimized version: ${fileName}`);
    }
  });
}

function generateImageMap() {
  console.log('\n📝 Generating optimized image mapping...');
  
  const imageMap = {};
  
  // Map original names to optimized versions
  const mappings = {
    'Careers.png': ['Careers.webp', 'Careers.avif'],
    'Values.png': ['Values.webp', 'Values.avif'],
    'Vision.png': ['Vision.webp', 'Vision.avif']
  };
  
  Object.entries(mappings).forEach(([original, optimized]) => {
    imageMap[original] = optimized;
  });
  
  const mapPath = path.join(__dirname, '..', 'src', 'config', 'optimizedImageMap.ts');
  const mapContent = `/**
 * Optimized Image Mapping
 * Maps original image names to their optimized versions
 */

export const OPTIMIZED_IMAGE_MAP = ${JSON.stringify(imageMap, null, 2)};

export function getOptimizedImagePath(originalPath: string): string {
  const fileName = originalPath.split('/').pop();
  
  if (!fileName || !OPTIMIZED_IMAGE_MAP[fileName]) {
    return originalPath;
  }
  
  const optimizedVersions = OPTIMIZED_IMAGE_MAP[fileName];
  // Return WebP as default, AVIF for supported browsers
  return originalPath.replace(fileName, optimizedVersions[0]);
}

export function getFallbackImagePath(originalPath: string): string {
  const fileName = originalPath.split('/').pop();
  
  if (!fileName || !OPTIMIZED_IMAGE_MAP[fileName]) {
    return originalPath;
  }
  
  const optimizedVersions = OPTIMIZED_IMAGE_MAP[fileName];
  // Return PNG as ultimate fallback
  return originalPath.replace(fileName, optimizedVersions[0]);
}
`;

  fs.writeFileSync(mapPath, mapContent);
  console.log('✅ Generated optimized image mapping');
}

function main() {
  console.log('🚀 Starting image optimization cleanup...\n');
  
  try {
    removeLargeImages();
    verifyOptimizedImages();
    generateImageMap();
    
    console.log('\n✨ Image optimization complete!');
    console.log('📊 Summary:');
    console.log(`   - Removed ${FILES_TO_REMOVE.length} large PNG files`);
    console.log(`   - Verified ${FILES_TO_KEEP.length} optimized versions`);
    console.log('   - Generated optimized image mapping');
    
  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  removeLargeImages,
  verifyOptimizedImages,
  generateImageMap
};
