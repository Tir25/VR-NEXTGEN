/**
 * Final Image Optimization Script
 * Creates optimized WebP/AVIF versions of all used images
 * and updates component references to use optimized versions
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_DIR = 'public/images';
const OUTPUT_DIR = 'public/images-optimized';
const QUALITY_SETTINGS = {
  webp: 85,
  avif: 80,
  png: 90,
  jpeg: 90
};

// Responsive sizes
const SIZES = [
  { suffix: '-sm', width: 640, height: 480 },
  { suffix: '-md', width: 1024, height: 768 },
  { suffix: '-lg', width: 1920, height: 1080 }
];

// Used images from audit
const USED_IMAGES = [
  'Hero.png',
  'Industries/Education.png',
  'Industries/engineering.png',
  'Industries/Financial.png',
  'Industries/Fmcg.png',
  'Industries/Hospitals and healthcare.png',
  'Industries/IT.png',
  'Industries/Manufacturing_Engineering.png',
  'Industries/Other.png',
  'Industries/Pharmaceutical & Life Sciences.png',
  'Our Services/Automation & Technology Solutions.png',
  'Our Services/Business Consulting & Strategy.png',
  'Our Services/Data Analytics & Insights.png',
  'Our Services/Data Visualization & Reporting.png',
  'Our Services/End-to-End Business Solutions.png',
  'Our Services/Process Optimization & Alignment.png',
  'logo-Final-png.svg'
];

/**
 * Ensure directory exists
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath, outputDir, filename) {
  const basename = path.parse(filename).name;
  const ext = path.parse(filename).ext.toLowerCase();
  
  console.log(`Optimizing ${filename}...`);
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Skip SVG files
    if (ext === '.svg') {
      console.log(`Skipping SVG: ${filename}`);
      return;
    }
    
    // Create responsive sizes
    for (const size of SIZES) {
      const outputPath = path.join(outputDir, `${basename}${size.suffix}`);
      
      // WebP version
      await image
        .resize(size.width, size.height, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: QUALITY_SETTINGS.webp })
        .toFile(`${outputPath}.webp`);
      
      // AVIF version
      await image
        .resize(size.width, size.height, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .avif({ quality: QUALITY_SETTINGS.avif })
        .toFile(`${outputPath}.avif`);
    }
    
    // Create default optimized versions
    const defaultOutputPath = path.join(outputDir, basename);
    
    // WebP
    await image
      .webp({ quality: QUALITY_SETTINGS.webp })
      .toFile(`${defaultOutputPath}.webp`);
    
    // AVIF
    await image
      .avif({ quality: QUALITY_SETTINGS.avif })
      .toFile(`${defaultOutputPath}.avif`);
    
    // Keep original format but compressed
    if (ext === '.png') {
      await image
        .png({ quality: QUALITY_SETTINGS.png, compressionLevel: 9 })
        .toFile(`${defaultOutputPath}-optimized.png`);
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await image
        .jpeg({ quality: QUALITY_SETTINGS.jpeg, progressive: true })
        .toFile(`${defaultOutputPath}-optimized.jpg`);
    }
    
    console.log(`✅ Optimized ${filename}`);
    
  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error.message);
  }
}

/**
 * Optimize logo
 */
async function optimizeLogo() {
  const logoInput = 'public/images/logo-Final-png.svg';
  const logoOutput = 'public/icons-optimized';
  
  if (!fs.existsSync(logoInput)) {
    console.log('Logo file not found, skipping...');
    return;
  }
  
  ensureDir(logoOutput);
  
  const logo = sharp(logoInput);
  
  // Create different logo sizes
  const logoSize = [
    { name: 'vr-logo-sm', size: 32 },
    { name: 'vr-logo-md', size: 64 },
    { name: 'vr-logo-lg', size: 128 },
    { name: 'vr-logo-xl', size: 256 }
  ];
  
  for (const { name, size } of logoSize) {
    await logo
      .resize(size, size)
      .webp({ quality: 95 })
      .toFile(path.join(logoOutput, `${name}.webp`));
    
    await logo
      .resize(size, size)
      .avif({ quality: 90 })
      .toFile(path.join(logoOutput, `${name}.avif`));
  }
  
  console.log('✅ Optimized logo');
}

/**
 * Main optimization function
 */
async function optimizeAllImages() {
  console.log('🚀 Starting final image optimization...\n');
  
  // Ensure output directory exists
  ensureDir(OUTPUT_DIR);
  
  // Optimize each used image
  for (const imagePath of USED_IMAGES) {
    const fullInputPath = path.join(INPUT_DIR, imagePath);
    
    if (fs.existsSync(fullInputPath)) {
      const outputSubDir = path.dirname(path.join(OUTPUT_DIR, imagePath));
      ensureDir(outputSubDir);
      
      await optimizeImage(fullInputPath, outputSubDir, path.basename(imagePath));
    } else {
      console.log(`⚠️  Image not found: ${fullInputPath}`);
    }
  }
  
  // Optimize logo
  await optimizeLogo();
  
  console.log('\n✅ Image optimization completed!');
}

/**
 * Generate image mapping for components
 */
function generateImageMapping() {
  const mapping = {};
  
  USED_IMAGES.forEach(imagePath => {
    const basename = path.parse(imagePath).name;
    const dir = path.dirname(imagePath);
    
    if (dir === '.') {
      mapping[imagePath] = {
        webp: `/images-optimized/${basename}.webp`,
        avif: `/images-optimized/${basename}.avif`,
        fallback: `/images/${imagePath}`
      };
    } else {
      mapping[imagePath] = {
        webp: `/images-optimized/${dir}/${basename}.webp`,
        avif: `/images-optimized/${dir}/${basename}.avif`,
        fallback: `/images/${imagePath}`
      };
    }
  });
  
  return mapping;
}

/**
 * Save image mapping to file
 */
function saveImageMapping() {
  const mapping = generateImageMapping();
  const mappingContent = `// Auto-generated image mapping
export const IMAGE_MAPPING = ${JSON.stringify(mapping, null, 2)};

// Helper function to get optimized image path
export function getOptimizedImage(originalPath: string, format: 'webp' | 'avif' = 'webp'): string {
  const mapping = IMAGE_MAPPING[originalPath];
  if (mapping) {
    return mapping[format] || mapping.fallback;
  }
  return originalPath;
}
`;
  
  fs.writeFileSync('src/config/imageMapping.ts', mappingContent);
  console.log('✅ Generated image mapping');
}

// Run optimization if called directly
if (require.main === module) {
  optimizeAllImages()
    .then(() => {
      saveImageMapping();
      console.log('\n🎉 All images optimized successfully!');
    })
    .catch(error => {
      console.error('❌ Optimization failed:', error);
      process.exit(1);
    });
}

module.exports = { optimizeAllImages, generateImageMapping };
