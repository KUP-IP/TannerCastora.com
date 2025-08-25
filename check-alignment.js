const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport to desktop size
  await page.setViewportSize({ width: 1280, height: 800 });
  
  // Navigate to the production site
  await page.goto('https://stig-site.vercel.app', { waitUntil: 'networkidle' });
  
  // Wait for the purchase buttons to be visible
  await page.waitForSelector('[class*="PurchaseButtons"]', { timeout: 5000 }).catch(() => {
    console.log('PurchaseButtons component not found by class, trying alternative selector');
  });
  
  // Check if notes exist and get their bounding boxes
  const primaryNote = await page.$('div.bg-brand-yellow');
  const secondaryNote = await page.$('div.text-brand-blue.text-sm');
  
  if (primaryNote) {
    const primaryBox = await primaryNote.boundingBox();
    console.log('Primary Note Box:', primaryBox);
    
    // Take screenshot of primary note
    await primaryNote.screenshot({ path: 'primary-note.png' });
    console.log('Primary note screenshot saved as primary-note.png');
  } else {
    console.log('Primary note not found - it might be empty/hidden');
  }
  
  if (secondaryNote) {
    const secondaryBox = await secondaryNote.boundingBox();
    console.log('Secondary Note Box:', secondaryBox);
    
    // Take screenshot of secondary note
    await secondaryNote.screenshot({ path: 'secondary-note.png' });
    console.log('Secondary note screenshot saved as secondary-note.png');
  } else {
    console.log('Secondary note not found - it might be empty/hidden');
  }
  
  // Take a full screenshot of the hero section
  const heroSection = await page.$('section');
  if (heroSection) {
    await heroSection.screenshot({ path: 'hero-section.png' });
    console.log('Hero section screenshot saved as hero-section.png');
  }
  
  // Get computed styles to check alignment
  const alignmentInfo = await page.evaluate(() => {
    const primaryNote = document.querySelector('div.bg-brand-yellow');
    const secondaryNote = document.querySelector('div.text-brand-blue.text-sm');
    
    const results = {};
    
    if (primaryNote) {
      const primaryParent = primaryNote.parentElement;
      const primaryStyles = window.getComputedStyle(primaryParent);
      results.primary = {
        display: primaryStyles.display,
        justifyContent: primaryStyles.justifyContent,
        alignItems: primaryStyles.alignItems,
        margin: primaryStyles.margin,
        padding: primaryStyles.padding,
        width: primaryParent.offsetWidth,
        offsetLeft: primaryParent.offsetLeft,
      };
    }
    
    if (secondaryNote) {
      const secondaryParent = secondaryNote.parentElement;
      const secondaryStyles = window.getComputedStyle(secondaryParent);
      results.secondary = {
        display: secondaryStyles.display,
        justifyContent: secondaryStyles.justifyContent,
        alignItems: secondaryStyles.alignItems,
        margin: secondaryStyles.margin,
        padding: secondaryStyles.padding,
        width: secondaryParent.offsetWidth,
        offsetLeft: secondaryParent.offsetLeft,
      };
    }
    
    return results;
  });
  
  console.log('\nAlignment Analysis:');
  console.log(JSON.stringify(alignmentInfo, null, 2));
  
  // Check if they're aligned
  if (alignmentInfo.primary && alignmentInfo.secondary) {
    const horizontallyAligned = Math.abs(alignmentInfo.primary.offsetLeft - alignmentInfo.secondary.offsetLeft) < 5;
    const sameCentering = alignmentInfo.primary.justifyContent === alignmentInfo.secondary.justifyContent;
    
    console.log('\n✓ Alignment Check:');
    console.log(`  Horizontally aligned: ${horizontallyAligned ? '✅ Yes' : '❌ No'}`);
    console.log(`  Same centering method: ${sameCentering ? '✅ Yes' : '❌ No'}`);
    console.log(`  Primary offset: ${alignmentInfo.primary.offsetLeft}px`);
    console.log(`  Secondary offset: ${alignmentInfo.secondary.offsetLeft}px`);
  }
  
  await browser.close();
})();