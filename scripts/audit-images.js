/**
 * Image Audit Script
 * Analyzes all images in the project to identify:
 * - Used vs unused images
 * - Duplicate images
 * - File sizes and optimization status
 * - Recommendations for optimization
 */

const fs = require('fs');
const path = require('path');

// Configuration
const IMAGE_DIRS = [
  'public/images',
  'public/images-optimized',
  'public/icons',
  'public/icons/optimized'
];

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg'];
const SOURCE_DIRS = ['src', 'pages', 'components'];

// Results storage
const results = {
  totalImages: 0,
  usedImages: new Set(),
  unusedImages: new Set(),
  duplicateImages: new Map(),
  largeImages: [],
  optimizationStatus: new Map(),
  recommendations: []
};

/**
 * Get all image files from directories
 */
function getAllImages() {
  const images = [];
  
  IMAGE_DIRS.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = getAllFiles(dir);
      images.push(...files.filter(file => 
        IMAGE_EXTENSIONS.some(ext => file.toLowerCase().endsWith(ext))
      ));
    }
  });
  
  return images;
}

/**
 * Recursively get all files in a directory
 */
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * Search for image references in source code
 */
function findImageReferences() {
  const references = new Set();
  
  SOURCE_DIRS.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = getAllFiles(dir).filter(file => 
        ['.tsx', '.ts', '.js', '.jsx', '.md'].some(ext => file.endsWith(ext))
      );
      
      files.forEach(file => {
        try {
          const content = fs.readFileSync(file, 'utf8');
          
          // Find image references
          const imageRegex = /['"`]([^'"`]*\.(png|jpg|jpeg|webp|avif|svg))['"`]/gi;
          let match;
          
          while ((match = imageRegex.exec(content)) !== null) {
            let imagePath = match[1];
            
            // Normalize path
            if (imagePath.startsWith('/')) {
              imagePath = 'public' + imagePath;
            } else if (!imagePath.startsWith('public/')) {
              imagePath = path.join('public', imagePath);
            }
            
            references.add(imagePath.replace(/\\/g, '/'));
          }
        } catch (error) {
          console.warn(`Error reading file ${file}:`, error.message);
        }
      });
    }
  });
  
  return references;
}

/**
 * Get file size in KB
 */
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return Math.round(stats.size / 1024 * 100) / 100; // KB
  } catch (error) {
    return 0;
  }
}

/**
 * Check if image is optimized
 */
function isOptimized(filePath) {
  const filename = path.basename(filePath);
  return filename.includes('-optimized') || 
         filename.includes('.webp') || 
         filename.includes('.avif') ||
         path.dirname(filePath).includes('optimized');
}

/**
 * Find duplicate images by content hash
 */
function findDuplicates(images) {
  const duplicates = new Map();
  const hashes = new Map();
  
  images.forEach(imagePath => {
    try {
      const content = fs.readFileSync(imagePath);
      const hash = require('crypto').createHash('md5').update(content).digest('hex');
      
      if (hashes.has(hash)) {
        if (!duplicates.has(hash)) {
          duplicates.set(hash, [hashes.get(hash)]);
        }
        duplicates.get(hash).push(imagePath);
      } else {
        hashes.set(hash, imagePath);
      }
    } catch (error) {
      console.warn(`Error processing ${imagePath}:`, error.message);
    }
  });
  
  return duplicates;
}

/**
 * Generate optimization recommendations
 */
function generateRecommendations() {
  const recommendations = [];
  
  // Large images
  results.largeImages.forEach(image => {
    if (image.size > 500) { // > 500KB
      recommendations.push({
        type: 'LARGE_IMAGE',
        file: image.path,
        size: `${image.size}KB`,
        suggestion: 'Consider compressing or using WebP/AVIF format'
      });
    }
  });
  
  // Unused images
  results.unusedImages.forEach(image => {
    recommendations.push({
      type: 'UNUSED_IMAGE',
      file: image,
      suggestion: 'Remove unused image to reduce bundle size'
    });
  });
  
  // Duplicate images
  results.duplicateImages.forEach((duplicates, hash) => {
    if (duplicates.length > 1) {
      recommendations.push({
        type: 'DUPLICATE_IMAGE',
        files: duplicates,
        suggestion: 'Remove duplicate images, keep only one optimized version'
      });
    }
  });
  
  // Non-optimized images
  results.optimizationStatus.forEach((status, image) => {
    if (!status.isOptimized && !image.endsWith('.svg')) {
      recommendations.push({
        type: 'NON_OPTIMIZED',
        file: image,
        suggestion: 'Convert to WebP/AVIF format for better compression'
      });
    }
  });
  
  return recommendations;
}

/**
 * Main audit function
 */
function auditImages() {
  console.log('🔍 Starting Image Audit...\n');
  
  // Get all images
  const allImages = getAllImages();
  results.totalImages = allImages.length;
  
  console.log(`📊 Found ${allImages.length} images total\n`);
  
  // Find image references in code
  const usedImagePaths = findImageReferences();
  console.log(`📝 Found ${usedImagePaths.size} image references in code\n`);
  
  // Categorize images
  allImages.forEach(imagePath => {
    const normalizedPath = imagePath.replace(/\\/g, '/');
    const size = getFileSize(imagePath);
    const optimized = isOptimized(imagePath);
    
    // Check if used
    const isUsed = usedImagePaths.has(normalizedPath) || 
                   usedImagePaths.has(normalizedPath.replace('public/', '/'));
    
    if (isUsed) {
      results.usedImages.add(normalizedPath);
    } else {
      results.unusedImages.add(normalizedPath);
    }
    
    // Track large images
    if (size > 100) { // > 100KB
      results.largeImages.push({
        path: normalizedPath,
        size: size
      });
    }
    
    // Track optimization status
    results.optimizationStatus.set(normalizedPath, {
      isOptimized: optimized,
      size: size
    });
  });
  
  // Find duplicates
  results.duplicateImages = findDuplicates(allImages);
  
  // Generate recommendations
  results.recommendations = generateRecommendations();
  
  return results;
}

/**
 * Generate audit report
 */
function generateReport() {
  const report = [];
  
  report.push('# 🖼️ IMAGE AUDIT REPORT');
  report.push(`**Generated**: ${new Date().toISOString()}`);
  report.push(`**Total Images**: ${results.totalImages}`);
  report.push(`**Used Images**: ${results.usedImages.size}`);
  report.push(`**Unused Images**: ${results.unusedImages.size}`);
  report.push(`**Duplicate Images**: ${results.duplicateImages.size}`);
  report.push(`**Large Images**: ${results.largeImages.length}`);
  report.push('');
  
  // Used images
  report.push('## ✅ USED IMAGES');
  results.usedImages.forEach(image => {
    const status = results.optimizationStatus.get(image);
    const size = status ? `${status.size}KB` : 'Unknown';
    const optimized = status && status.isOptimized ? '✅' : '❌';
    report.push(`- ${image} (${size}) ${optimized}`);
  });
  report.push('');
  
  // Unused images
  if (results.unusedImages.size > 0) {
    report.push('## ❌ UNUSED IMAGES (Can be removed)');
    results.unusedImages.forEach(image => {
      const status = results.optimizationStatus.get(image);
      const size = status ? `${status.size}KB` : 'Unknown';
      report.push(`- ${image} (${size})`);
    });
    report.push('');
  }
  
  // Large images
  if (results.largeImages.length > 0) {
    report.push('## 📏 LARGE IMAGES (>100KB)');
    results.largeImages
      .sort((a, b) => b.size - a.size)
      .forEach(image => {
        report.push(`- ${image.path} (${image.size}KB)`);
      });
    report.push('');
  }
  
  // Duplicates
  if (results.duplicateImages.size > 0) {
    report.push('## 🔄 DUPLICATE IMAGES');
    results.duplicateImages.forEach((duplicates, hash) => {
      if (duplicates.length > 1) {
        report.push(`### Hash: ${hash.substring(0, 8)}...`);
        duplicates.forEach(dup => {
          const status = results.optimizationStatus.get(dup);
          const size = status ? `${status.size}KB` : 'Unknown';
          report.push(`- ${dup} (${size})`);
        });
        report.push('');
      }
    });
  }
  
  // Recommendations
  if (results.recommendations.length > 0) {
    report.push('## 💡 OPTIMIZATION RECOMMENDATIONS');
    results.recommendations.forEach(rec => {
      report.push(`### ${rec.type}`);
      if (rec.file) {
        report.push(`- **File**: ${rec.file}`);
      }
      if (rec.files) {
        report.push(`- **Files**: ${rec.files.join(', ')}`);
      }
      if (rec.size) {
        report.push(`- **Size**: ${rec.size}`);
      }
      report.push(`- **Suggestion**: ${rec.suggestion}`);
      report.push('');
    });
  }
  
  // Summary
  report.push('## 📊 SUMMARY');
  report.push(`- **Total Images**: ${results.totalImages}`);
  report.push(`- **Used Images**: ${results.usedImages.size} (${Math.round(results.usedImages.size / results.totalImages * 100)}%)`);
  report.push(`- **Unused Images**: ${results.unusedImages.size} (${Math.round(results.unusedImages.size / results.totalImages * 100)}%)`);
  report.push(`- **Large Images**: ${results.largeImages.length}`);
  report.push(`- **Duplicate Images**: ${results.duplicateImages.size}`);
  report.push(`- **Optimization Recommendations**: ${results.recommendations.length}`);
  
  return report.join('\n');
}

// Run audit if called directly
if (require.main === module) {
  try {
    const auditResults = auditImages();
    const report = generateReport();
    
    console.log(report);
    
    // Save report to file
    fs.writeFileSync('IMAGE_AUDIT_REPORT.md', report);
    console.log('\n📄 Report saved to IMAGE_AUDIT_REPORT.md');
    
  } catch (error) {
    console.error('❌ Audit failed:', error);
    process.exit(1);
  }
}

module.exports = { auditImages, generateReport };
