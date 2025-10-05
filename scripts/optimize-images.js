const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_DIR = 'public/images';
const OUTPUT_DIR = 'public/images/optimized';
const QUALITY = 85; // WebP quality (0-100)
const MAX_WIDTH = 1920; // Maximum width for responsive images

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Supported image formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

async function optimizeImage(inputPath, outputPath) {
  try {
    const metadata = await sharp(inputPath).metadata();
    console.log(`Processing: ${inputPath}`);
    console.log(`Original: ${metadata.width}x${metadata.height}, ${metadata.format}, ${Math.round(metadata.size / 1024)}KB`);

    // Create multiple sizes for responsive loading
    const sizes = [
      { width: 400, suffix: '-sm' },
      { width: 800, suffix: '-md' },
      { width: 1200, suffix: '-lg' },
      { width: 1920, suffix: '-xl' }
    ];

    for (const size of sizes) {
      const outputFile = outputPath.replace('.webp', `${size.suffix}.webp`);
      
      await sharp(inputPath)
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ 
          quality: QUALITY,
          effort: 6 // Higher effort for better compression
        })
        .toFile(outputFile);

      const optimizedMetadata = await sharp(outputFile).metadata();
      console.log(`  Created: ${outputFile} (${optimizedMetadata.width}x${optimizedMetadata.height}, ${Math.round(optimizedMetadata.size / 1024)}KB)`);
    }

    // Create original size WebP
    await sharp(inputPath)
      .webp({ 
        quality: QUALITY,
        effort: 6
      })
      .toFile(outputPath);

    const finalMetadata = await sharp(outputPath).metadata();
    console.log(`  Created: ${outputPath} (${finalMetadata.width}x${finalMetadata.height}, ${Math.round(finalMetadata.size / 1024)}KB)`);

  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error.message);
  }
}

async function optimizeAllImages() {
  try {
    const files = fs.readdirSync(INPUT_DIR);
    const imageFiles = files.filter(file => 
      SUPPORTED_FORMATS.some(format => file.toLowerCase().endsWith(format))
    );

    console.log(`Found ${imageFiles.length} images to optimize:`);
    console.log(imageFiles);

    for (const file of imageFiles) {
      const inputPath = path.join(INPUT_DIR, file);
      const outputPath = path.join(OUTPUT_DIR, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
      
      await optimizeImage(inputPath, outputPath);
    }

    console.log('\n✅ Image optimization complete!');
    console.log(`Optimized images saved to: ${OUTPUT_DIR}`);
    
  } catch (error) {
    console.error('Error during optimization:', error);
  }
}

// Run optimization
optimizeAllImages();
