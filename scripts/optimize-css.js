const fs = require('fs');
const path = require('path');

// Simple CSS minifier
function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove unnecessary whitespace
    .replace(/\s+/g, ' ')
    // Remove spaces around specific characters
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    // Remove trailing semicolons
    .replace(/;}/g, '}')
    // Remove leading/trailing whitespace
    .trim();
}

// Function to optimize CSS variables
function optimizeCSSVariables(css) {
  // Remove unused CSS variables (basic check)
  const usedVars = new Set();
  const varMatches = css.match(/var\(--[^)]+\)/g) || [];
  varMatches.forEach(match => {
    const varName = match.match(/var\((--[^)]+)\)/)[1];
    usedVars.add(varName);
  });
  
  // Keep only used variables
  const lines = css.split('\n');
  const optimizedLines = lines.filter(line => {
    if (line.trim().startsWith('--') && line.includes(':')) {
      const varName = line.match(/--([^:]+):/);
      if (varName) {
        return usedVars.has(`--${varName[1]}`);
      }
    }
    return true;
  });
  
  return optimizedLines.join('\n');
}

// Function to remove unused keyframes
function removeUnusedKeyframes(css) {
  const usedAnimations = new Set();
  const animationMatches = css.match(/animation[^:]*:\s*([^;]+)/g) || [];
  animationMatches.forEach(match => {
    const animations = match.split(',').map(a => a.trim().split(' ')[0]);
    animations.forEach(anim => {
      if (anim && anim !== 'none') {
        usedAnimations.add(anim);
      }
    });
  });
  
  const lines = css.split('\n');
  let inKeyframe = false;
  let currentKeyframe = '';
  const optimizedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes('@keyframes')) {
      const keyframeMatch = line.match(/@keyframes\s+([^{]+)/);
      if (keyframeMatch) {
        currentKeyframe = keyframeMatch[1].trim();
        inKeyframe = true;
        
        if (usedAnimations.has(currentKeyframe)) {
          optimizedLines.push(line);
        }
      } else {
        optimizedLines.push(line);
      }
    } else if (inKeyframe && line.includes('}')) {
      if (usedAnimations.has(currentKeyframe)) {
        optimizedLines.push(line);
      }
      inKeyframe = false;
      currentKeyframe = '';
    } else if (inKeyframe) {
      if (usedAnimations.has(currentKeyframe)) {
        optimizedLines.push(line);
      }
    } else {
      optimizedLines.push(line);
    }
  }
  
  return optimizedLines.join('\n');
}

// Main optimization function
function optimizeCSS() {
  console.log('🎨 Optimizing CSS...\n');
  
  const cssPath = path.join(process.cwd(), 'src', 'styles', 'globals.css');
  
  try {
    // Read original CSS
    const originalCSS = fs.readFileSync(cssPath, 'utf8');
    const originalSize = Buffer.byteLength(originalCSS, 'utf8');
    
    console.log(`📄 Original CSS size: ${(originalSize / 1024).toFixed(2)} KB`);
    
    // Optimize CSS
    let optimizedCSS = originalCSS;
    
    // Remove unused keyframes
    optimizedCSS = removeUnusedKeyframes(optimizedCSS);
    console.log('✅ Removed unused keyframes');
    
    // Optimize CSS variables
    optimizedCSS = optimizeCSSVariables(optimizedCSS);
    console.log('✅ Optimized CSS variables');
    
    // Minify CSS (only in production)
    if (process.env.NODE_ENV === 'production') {
      optimizedCSS = minifyCSS(optimizedCSS);
      console.log('✅ Minified CSS');
    }
    
    const optimizedSize = Buffer.byteLength(optimizedCSS, 'utf8');
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
    
    console.log(`📄 Optimized CSS size: ${(optimizedSize / 1024).toFixed(2)} KB`);
    console.log(`💾 Size reduction: ${savings}%`);
    
    // Create backup and write optimized CSS
    const backupPath = cssPath + '.backup';
    fs.writeFileSync(backupPath, originalCSS);
    console.log(`💾 Backup created: ${backupPath}`);
    
    fs.writeFileSync(cssPath, optimizedCSS);
    console.log('✅ CSS optimized successfully!');
    
    return {
      originalSize,
      optimizedSize,
      savings: parseFloat(savings)
    };
    
  } catch (error) {
    console.error('❌ Error optimizing CSS:', error.message);
    return null;
  }
}

// Run optimization
if (require.main === module) {
  optimizeCSS();
}

module.exports = { optimizeCSS };
