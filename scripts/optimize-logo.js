const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_DIR = 'public/icons';
const OUTPUT_DIR = 'public/icons/optimized';
const QUALITY = 90; // Higher quality for logos

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeLogo(inputPath, outputPath) {
  try {
    const metadata = await sharp(inputPath).metadata();
    console.log(`Processing logo: ${inputPath}`);
    console.log(`Original: ${metadata.width}x${metadata.height}, ${metadata.format}`);

    // Create multiple sizes for different use cases
    const sizes = [
      { width: 40, height: 40, suffix: '-sm' },
      { width: 80, height: 40, suffix: '-md' },
      { width: 160, height: 80, suffix: '-lg' },
      { width: 320, height: 160, suffix: '-xl' }
    ];

    for (const size of sizes) {
      const outputFile = outputPath.replace('.webp', `${size.suffix}.webp`);
      
      await sharp(inputPath)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
        })
        .webp({ 
          quality: QUALITY,
          effort: 6
        })
        .toFile(outputFile);

      const optimizedMetadata = await sharp(outputFile).metadata();
      console.log(`  Created: ${outputFile} (${optimizedMetadata.width}x${optimizedMetadata.height})`);
    }

    // Create original size WebP
    await sharp(inputPath)
      .webp({ 
        quality: QUALITY,
        effort: 6
      })
      .toFile(outputPath);

    const finalMetadata = await sharp(outputPath).metadata();
    console.log(`  Created: ${outputPath} (${finalMetadata.width}x${finalMetadata.height})`);

  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error.message);
  }
}

async function optimizeAllLogos() {
  try {
    const files = fs.readdirSync(INPUT_DIR);
    const logoFiles = files.filter(file => 
      file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.svg')
    );

    console.log(`Found ${logoFiles.length} logos to optimize:`);
    console.log(logoFiles);

    for (const file of logoFiles) {
      const inputPath = path.join(INPUT_DIR, file);
      const outputPath = path.join(OUTPUT_DIR, file.replace(/\.(png|svg)$/i, '.webp'));
      
      await optimizeLogo(inputPath, outputPath);
    }

    console.log('\n✅ Logo optimization complete!');
    console.log(`Optimized logos saved to: ${OUTPUT_DIR}`);
    
  } catch (error) {
    console.error('Error during optimization:', error);
  }
}

// Run optimization
optimizeAllLogos();
