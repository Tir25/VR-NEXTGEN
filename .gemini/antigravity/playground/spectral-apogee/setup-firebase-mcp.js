const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔥 Setting up Firebase MCP Server...\n');

// Step 1: Check if Firebase CLI is installed
console.log('1️⃣ Checking Firebase CLI installation...');
try {
  const version = execSync('firebase --version', { encoding: 'utf-8' }).trim();
  console.log(`   ✅ Firebase CLI installed: ${version}\n`);
} catch (error) {
  console.log('   ❌ Firebase CLI not found. Installing...');
  try {
    execSync('npm install -g firebase-tools', { stdio: 'inherit' });
    console.log('   ✅ Firebase CLI installed successfully!\n');
  } catch (installError) {
    console.error('   ❌ Failed to install Firebase CLI. Please install manually:');
    console.error('      npm install -g firebase-tools\n');
    process.exit(1);
  }
}

// Step 2: Check Firebase login status
console.log('2️⃣ Checking Firebase authentication status...');
try {
  const projects = execSync('firebase projects:list', { encoding: 'utf-8' });
  console.log('   ✅ Already logged in to Firebase!');
  console.log('   📋 Available projects:');
  console.log(projects);
} catch (error) {
  console.log('   ⚠️  Not logged in. You need to authenticate.');
  console.log('   🔐 To login, run: firebase login');
  console.log('   💡 This will open a browser for Google OAuth authentication.\n');
  
  // Note: Firebase CLI uses Google OAuth, not direct GitHub
  // But if your Google account is linked to GitHub, you can use that
  console.log('   📝 Note: Firebase CLI uses Google OAuth.');
  console.log('   📝 If your Google account is linked to GitHub, you can use that.\n');
}

// Step 3: Verify MCP configuration
console.log('3️⃣ Verifying MCP configuration...');
const mcpPath = path.join(process.env.USERPROFILE || process.env.HOME, '.cursor', 'mcp.json');
try {
  const mcpConfig = JSON.parse(fs.readFileSync(mcpPath, 'utf-8'));
  
  if (mcpConfig.mcpServers && mcpConfig.mcpServers.firebase) {
    console.log('   ✅ Firebase MCP server configured in mcp.json');
    console.log('   📋 Configuration:');
    console.log(JSON.stringify(mcpConfig.mcpServers.firebase, null, 2));
  } else {
    console.log('   ❌ Firebase MCP server not found in mcp.json');
    console.log('   💡 Please add the Firebase configuration to mcp.json');
  }
} catch (error) {
  console.log(`   ⚠️  Could not read mcp.json: ${error.message}`);
}

console.log('\n✅ Setup complete!');
console.log('\n📋 Next steps:');
console.log('   1. Run: firebase login');
console.log('   2. Restart Cursor to load the MCP server');
console.log('   3. The Firebase MCP server should be available in Cursor\n');


