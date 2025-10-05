const fs = require('fs');
const path = require('path');

// Function to extract CSS classes from a file
function extractClassesFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const classMatches = content.match(/className=["']([^"']+)["']/g) || [];
    const classes = new Set();
    
    classMatches.forEach(match => {
      const classString = match.match(/className=["']([^"']+)["']/)[1];
      classString.split(' ').forEach(cls => {
        if (cls.trim()) {
          classes.add(cls.trim());
        }
      });
    });
    
    return classes;
  } catch (error) {
    console.warn(`Warning: Could not read file ${filePath}:`, error.message);
    return new Set();
  }
}

// Function to recursively find all JS/TS/JSX/TSX files
function findSourceFiles(dir, extensions = ['.js', '.ts', '.jsx', '.tsx']) {
  const files = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        files.push(...findSourceFiles(fullPath, extensions));
      } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    });
  } catch (error) {
    console.warn(`Warning: Could not read directory ${dir}:`, error.message);
  }
  
  return files;
}

// Function to extract CSS classes from globals.css
function extractDefinedClasses(cssPath) {
  try {
    const content = fs.readFileSync(cssPath, 'utf8');
    const classes = new Set();
    
    // Extract custom classes (not Tailwind utilities)
    const customClassMatches = content.match(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g) || [];
    customClassMatches.forEach(match => {
      const className = match.substring(1); // Remove the dot
      if (!className.startsWith('site-bg') && 
          !className.startsWith('btn-') && 
          !className.startsWith('card-') &&
          !className.startsWith('section-')) {
        classes.add(className);
      }
    });
    
    return classes;
  } catch (error) {
    console.warn(`Warning: Could not read CSS file ${cssPath}:`, error.message);
    return new Set();
  }
}

// Main analysis function
function analyzeUnusedCSS() {
  console.log('🔍 Analyzing unused CSS...\n');
  
  // Find all source files
  const srcDir = path.join(process.cwd(), 'src');
  const sourceFiles = findSourceFiles(srcDir);
  
  console.log(`📁 Found ${sourceFiles.length} source files`);
  
  // Extract all used classes
  const usedClasses = new Set();
  sourceFiles.forEach(file => {
    const classes = extractClassesFromFile(file);
    classes.forEach(cls => usedClasses.add(cls));
  });
  
  console.log(`🎨 Found ${usedClasses.size} unique CSS classes in use`);
  
  // Extract defined classes from CSS
  const cssPath = path.join(process.cwd(), 'src', 'styles', 'globals.css');
  const definedClasses = extractDefinedClasses(cssPath);
  
  console.log(`📝 Found ${definedClasses.size} custom CSS classes defined`);
  
  // Find unused classes
  const unusedClasses = new Set();
  definedClasses.forEach(cls => {
    if (!usedClasses.has(cls)) {
      unusedClasses.add(cls);
    }
  });
  
  // Report results
  console.log('\n📊 Analysis Results:');
  console.log(`✅ Used classes: ${usedClasses.size}`);
  console.log(`❌ Unused classes: ${unusedClasses.size}`);
  
  if (unusedClasses.size > 0) {
    console.log('\n🗑️  Potentially unused custom classes:');
    Array.from(unusedClasses).sort().forEach(cls => {
      console.log(`   - .${cls}`);
    });
    
    console.log('\n💡 Note: These classes might be used dynamically or in ways not detected by this analysis.');
    console.log('   Please review manually before removing.');
  } else {
    console.log('\n🎉 No unused custom CSS classes found!');
  }
  
  // Analyze Tailwind usage
  const tailwindClasses = Array.from(usedClasses).filter(cls => 
    /^(bg-|text-|border-|p-|m-|w-|h-|flex|grid|hidden|block|inline|relative|absolute|fixed|sticky|top-|left-|right-|bottom-|z-|opacity-|transform|transition|duration-|ease-|hover:|focus:|active:|md:|lg:|xl:|sm:|xs:)/.test(cls)
  );
  
  console.log(`\n🎨 Tailwind classes in use: ${tailwindClasses.length}`);
  console.log(`📦 Custom classes in use: ${usedClasses.size - tailwindClasses.length}`);
  
  return {
    usedClasses,
    definedClasses,
    unusedClasses,
    tailwindClasses
  };
}

// Run analysis
if (require.main === module) {
  analyzeUnusedCSS();
}

module.exports = { analyzeUnusedCSS };
