/**
 * Update Image References Script
 * Updates all image references in components to use optimized versions
 */

const fs = require('fs');
const path = require('path');

// Image mapping from original to optimized
const IMAGE_MAPPING = {
  '/images/Hero.png': '/images-optimized/Hero.webp',
  '/images/Industries/Education.png': '/images-optimized/Industries/Education.webp',
  '/images/Industries/engineering.png': '/images-optimized/Industries/engineering.webp',
  '/images/Industries/Financial.png': '/images-optimized/Industries/Financial.webp',
  '/images/Industries/Fmcg.png': '/images-optimized/Industries/Fmcg.webp',
  '/images/Industries/Hospitals and healthcare.png': '/images-optimized/Industries/Hospitals and healthcare.webp',
  '/images/Industries/IT.png': '/images-optimized/Industries/IT.webp',
  '/images/Industries/Manufacturing_Engineering.png': '/images-optimized/Industries/Manufacturing_Engineering.webp',
  '/images/Industries/Other.png': '/images-optimized/Industries/Other.webp',
  '/images/Industries/Pharmaceutical & Life Sciences.png': '/images-optimized/Industries/Pharmaceutical & Life Sciences.webp',
  '/images/Our Services/Automation & Technology Solutions.png': '/images-optimized/Our Services/Automation & Technology Solutions.webp',
  '/images/Our Services/Business Consulting & Strategy.png': '/images-optimized/Our Services/Business Consulting & Strategy.webp',
  '/images/Our Services/Data Analytics & Insights.png': '/images-optimized/Our Services/Data Analytics & Insights.webp',
  '/images/Our Services/Data Visualization & Reporting.png': '/images-optimized/Our Services/Data Visualization & Reporting.webp',
  '/images/Our Services/End-to-End Business Solutions.png': '/images-optimized/Our Services/End-to-End Business Solutions.webp',
  '/images/Our Services/Process Optimization & Alignment.png': '/images-optimized/Our Services/Process Optimization & Alignment.webp',
  '/images/logo-Final-png.svg': '/icons-optimized/vr-logo-md.webp'
};

// Files to update
const FILES_TO_UPDATE = [
  'src/pages/industries/education-edtech.tsx',
  'src/pages/industries/retail-fmcg.tsx',
  'src/pages/industries/pharmaceutical-life-sciences.tsx',
  'src/pages/industries/other-industries.tsx',
  'src/pages/industries/manufacturing-engineering.tsx',
  'src/pages/industries/it-professional-services.tsx',
  'src/pages/industries/industrial-infrastructure.tsx',
  'src/pages/industries/healthcare-hospitals.tsx',
  'src/pages/industries/financial-services-insurance.tsx',
  'src/pages/services/end-to-end-solutions.tsx',
  'src/pages/services/automation-solutions.tsx',
  'src/pages/services/data-visualization.tsx',
  'src/pages/services/business-consulting.tsx',
  'src/pages/services/process-optimization.tsx',
  'src/pages/services/data-analytics.tsx',
  'src/components/sections/hero/constants.ts',
  'src/config/industryImages.ts',
  'src/components/sections/services/constants.tsx',
  'src/components/common/Logo.tsx'
];

/**
 * Update image references in a file
 */
function updateFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  // Update image references
  Object.entries(IMAGE_MAPPING).forEach(([original, optimized]) => {
    const regex = new RegExp(original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    if (content.includes(original)) {
      content = content.replace(regex, optimized);
      updated = true;
      console.log(`✅ Updated ${original} → ${optimized} in ${filePath}`);
    }
  });

  if (updated) {
    fs.writeFileSync(filePath, content);
    return true;
  }

  return false;
}

/**
 * Main update function
 */
function updateAllFiles() {
  console.log('🔄 Updating image references...\n');

  let updatedCount = 0;

  FILES_TO_UPDATE.forEach(filePath => {
    if (updateFile(filePath)) {
      updatedCount++;
    }
  });

  console.log(`\n✅ Updated ${updatedCount} files`);
}

// Run if called directly
if (require.main === module) {
  updateAllFiles();
}

module.exports = { updateAllFiles, updateFile };
