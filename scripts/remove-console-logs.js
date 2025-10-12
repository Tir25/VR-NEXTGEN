/**
 * Console Log Removal Script
 * Removes console.log statements from production builds
 */

const fs = require('fs');
const path = require('path');

// Directories to scan for console.log statements
const SCAN_DIRECTORIES = [
  'src/components',
  'src/hooks',
  'src/utils',
  'src/pages',
];

// File extensions to process
const FILE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

// Console methods to remove
const CONSOLE_METHODS = [
  'console.log',
  'console.warn',
  'console.debug',
  'console.info'
];

function removeConsoleLogs(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let originalContent = content;

    // Remove console.log statements
    CONSOLE_METHODS.forEach(method => {
      // Match console.method(/* content */); including multi-line
      const regex = new RegExp(
        `\\s*${method.replace('.', '\\.')}\\([^;]*\\);?\\s*`,
        'gm'
      );
      
      if (regex.test(content)) {
        content = content.replace(regex, '');
        modified = true;
      }
    });

    // Remove standalone console statements (without semicolon)
    CONSOLE_METHODS.forEach(method => {
      const regex = new RegExp(
        `\\s*${method.replace('.', '\\.')}\\([^)]*\\)\\s*`,
        'gm'
      );
      
      if (regex.test(content)) {
        content = content.replace(regex, '');
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Cleaned: ${path.relative(process.cwd(), filePath)}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function scanDirectory(dirPath) {
  let totalCleaned = 0;

  try {
    const items = fs.readdirSync(dirPath);

    items.forEach(item => {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        // Recursively scan subdirectories
        totalCleaned += scanDirectory(itemPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item);
        if (FILE_EXTENSIONS.includes(ext)) {
          if (removeConsoleLogs(itemPath)) {
            totalCleaned++;
          }
        }
      }
    });
  } catch (error) {
    console.error(`❌ Error scanning directory ${dirPath}:`, error.message);
  }

  return totalCleaned;
}

function main() {
  console.log('🧹 Starting console.log removal...\n');

  const isProduction = process.env.NODE_ENV === 'production';
  
  if (!isProduction) {
    console.log('⚠️  This script should only run in production builds');
    console.log('   Set NODE_ENV=production to proceed');
    return;
  }

  let totalFilesCleaned = 0;

  SCAN_DIRECTORIES.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    
    if (fs.existsSync(dirPath)) {
      console.log(`📁 Scanning: ${dir}`);
      totalFilesCleaned += scanDirectory(dirPath);
    } else {
      console.log(`⚠️  Directory not found: ${dir}`);
    }
  });

  console.log(`\n✨ Console log removal complete!`);
  console.log(`📊 Cleaned ${totalFilesCleaned} files`);
}

if (require.main === module) {
  main();
}

module.exports = {
  removeConsoleLogs,
  scanDirectory
};
