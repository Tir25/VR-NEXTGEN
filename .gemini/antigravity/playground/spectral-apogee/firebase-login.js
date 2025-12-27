const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Starting Firebase login automation with GitHub...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000 // Slow down actions for visibility
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  const page = await context.newPage();

  try {
    // Navigate to Firebase Console
    console.log('📱 Navigating to Firebase Console...');
    await page.goto('https://console.firebase.google.com/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Look for sign in button or GitHub login option
    console.log('🔍 Looking for login options...');
    
    // Check if already logged in
    const isLoggedIn = await page.locator('text=Your Firebase Projects').isVisible({ timeout: 5000 }).catch(() => false);
    
    if (isLoggedIn) {
      console.log('✅ Already logged in to Firebase!');
      await page.screenshot({ path: 'firebase-logged-in.png' });
      await browser.close();
      return;
    }
    
    // Look for "Sign in" button
    const signInButton = await page.locator('text=Sign in').first().isVisible({ timeout: 5000 }).catch(() => false);
    
    if (signInButton) {
      console.log('🔐 Clicking Sign in button...');
      await page.click('text=Sign in');
      await page.waitForTimeout(2000);
    }
    
    // Look for GitHub login option
    console.log('🔍 Looking for GitHub login option...');
    
    // Try to find GitHub sign-in button
    const githubButton = await page.locator('text=/GitHub|Sign in with GitHub/i').first().isVisible({ timeout: 5000 }).catch(() => false);
    
    if (githubButton) {
      console.log('🐙 Found GitHub login option, clicking...');
      await page.click('text=/GitHub|Sign in with GitHub/i');
      await page.waitForTimeout(3000);
    } else {
      // If no GitHub button, try to find email/password fields and look for alternative login
      console.log('⚠️ GitHub button not found. Checking for alternative login methods...');
      await page.screenshot({ path: 'firebase-login-page.png' });
      
      // Look for "Continue with GitHub" or similar
      const continueWithGithub = await page.locator('text=/continue.*github|github.*sign/i').first().isVisible({ timeout: 3000 }).catch(() => false);
      if (continueWithGithub) {
        await page.click('text=/continue.*github|github.*sign/i');
        await page.waitForTimeout(3000);
      }
    }
    
    // Wait for GitHub login page
    console.log('⏳ Waiting for GitHub login page...');
    await page.waitForURL(/github\.com.*login|github\.com.*authorize/i, { timeout: 10000 }).catch(() => {
      console.log('⚠️ GitHub login page not detected, taking screenshot...');
      page.screenshot({ path: 'current-page.png' });
    });
    
    // Check if we're on GitHub login page
    const isGithubPage = page.url().includes('github.com');
    
    if (isGithubPage) {
      console.log('✅ On GitHub login page');
      console.log('👤 Please enter your GitHub credentials manually in the browser...');
      console.log('⏳ Waiting for you to complete login...');
      
      // Wait for user to complete login (wait for redirect away from GitHub)
      await page.waitForURL((url) => !url.includes('github.com'), { timeout: 120000 });
      
      console.log('✅ Login appears to be complete!');
      await page.screenshot({ path: 'firebase-after-login.png' });
      
      // Verify we're back on Firebase
      if (page.url().includes('firebase.google.com')) {
        console.log('🎉 Successfully logged into Firebase!');
      }
    } else {
      console.log('⚠️ Could not automatically navigate to GitHub login.');
      console.log('📸 Taking screenshot for manual review...');
      await page.screenshot({ path: 'firebase-login-issue.png' });
      console.log('💡 Please complete the login manually in the browser window.');
      
      // Wait a bit for manual completion
      await page.waitForTimeout(60000);
    }
    
    // Final verification
    const finalUrl = page.url();
    console.log(`📍 Final URL: ${finalUrl}`);
    
    if (finalUrl.includes('console.firebase.google.com')) {
      console.log('✅ Successfully authenticated with Firebase!');
    }
    
  } catch (error) {
    console.error('❌ Error during login process:', error.message);
    await page.screenshot({ path: 'firebase-login-error.png' });
  } finally {
    console.log('⏸️ Keeping browser open for 10 seconds for verification...');
    await page.waitForTimeout(10000);
    await browser.close();
    console.log('✅ Browser closed.');
  }
})();


