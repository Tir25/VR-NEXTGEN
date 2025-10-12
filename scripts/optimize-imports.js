/**
 * Import Optimization Script
 * Analyzes and optimizes import statements for better tree-shaking
 */

const fs = require('fs');
const path = require('path');

// Directories to scan
const SCAN_DIRECTORIES = [
  'src/components',
  'src/hooks',
  'src/utils',
  'src/pages',
];

const FILE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

// Known unused imports to remove
const UNUSED_IMPORTS = [
  // Framer Motion specific
  'useAnimation',
  'useAnimationControls',
  'useMotionValue',
  'useTransform',
  'useSpring',
  'useScroll',
  // React specific
  'useCallback',
  'useMemo',
  'useRef',
  'useState',
  'useEffect',
  // Next.js specific
  'useRouter',
  'usePathname',
  // Custom hooks that might be unused
  'useParallax',
  'useViewport',
];

function optimizeImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let lines = content.split('\n');

    lines = lines.map(line => {
      // Check for import statements
      if (line.trim().startsWith('import')) {
        // Remove unused imports
        UNUSED_IMPORTS.forEach(unusedImport => {
          const importRegex = new RegExp(`\\b${unusedImport}\\b`, 'g');
          if (importRegex.test(line)) {
            // Check if this import is actually used in the file
            const remainingContent = content.replace(line, '');
            if (!remainingContent.includes(unusedImport)) {
              modified = true;
              return line.replace(importRegex, '').replace(/,\s*,/g, ',').replace(/,\s*}/g, '}').replace(/{\s*,/g, '{');
            }
          }
        });

        // Clean up empty import statements
        if (line.includes('import { }') || line.includes('import {}')) {
          modified = true;
          return '';
        }
      }

      return line;
    });

    // Remove empty lines and clean up
    const cleanedContent = lines
      .filter(line => line.trim() !== '')
      .join('\n');

    if (modified) {
      fs.writeFileSync(filePath, cleanedContent, 'utf8');
      console.log(`✅ Optimized: ${path.relative(process.cwd(), filePath)}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function scanDirectory(dirPath) {
  let totalOptimized = 0;

  try {
    const items = fs.readdirSync(dirPath);

    items.forEach(item => {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        totalOptimized += scanDirectory(itemPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item);
        if (FILE_EXTENSIONS.includes(ext)) {
          if (optimizeImports(itemPath)) {
            totalOptimized++;
          }
        }
      }
    });
  } catch (error) {
    console.error(`❌ Error scanning directory ${dirPath}:`, error.message);
  }

  return totalOptimized;
}

function main() {
  console.log('🔧 Starting import optimization...\n');

  let totalFilesOptimized = 0;

  SCAN_DIRECTORIES.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    
    if (fs.existsSync(dirPath)) {
      console.log(`📁 Scanning: ${dir}`);
      totalFilesOptimized += scanDirectory(dirPath);
    } else {
      console.log(`⚠️  Directory not found: ${dir}`);
    }
  });

  console.log(`\n✨ Import optimization complete!`);
  console.log(`📊 Optimized ${totalFilesOptimized} files`);
}

if (require.main === module) {
  main();
}

module.exports = {
  optimizeImports,
  scanDirectory
};
