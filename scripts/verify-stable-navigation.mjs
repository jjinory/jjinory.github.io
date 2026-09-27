import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(process.argv[2] ? pathToFileURL(process.argv[2]).href : 'playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const [width, height] of [[1920,1080], [1366,768], [1280,640], [1024,768], [768,1024], [390,844], [360,800], [320,740], [844,390]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto('http://127.0.0.1:4173/counthub-mobile.html');
    await page.evaluate(() => document.fonts.ready);
    const previous = await page.locator('#tour-prev').boundingBox();
    const next = await page.locator('#tour-next').boundingBox();
    const check = async () => {
      for (const [selector, reference] of [['#tour-prev', previous], ['#tour-next', next]]) {
        const rect = await page.locator(selector).boundingBox();
        assert.ok(Math.abs(rect.x-reference.x)<1 && Math.abs(rect.y-reference.y)<1,
          `${width}×${height} ${selector} moved: ${JSON.stringify({reference, rect})}`);
      }
    };
    // Keep the pointer in one place through all eight screens, including entry
    // into and exit from the four-step barcode feature.
    for (let step=0; step<7; step++) {
      await page.mouse.click(next.x+next.width/2, next.y+next.height/2);
      await page.locator('#tour-image').evaluate(img => img.decode());
      await check();
    }
    assert.equal(await page.locator('#tour-next').isDisabled(), true);
    for (let step=0; step<7; step++) {
      await page.mouse.click(previous.x+previous.width/2, previous.y+previous.height/2);
      await page.locator('#tour-image').evaluate(img => img.decode());
      await check();
    }
    assert.equal(await page.locator('#tour-prev').isDisabled(), true);
    assert.match(await page.locator('#tour-image').getAttribute('src'), /home.png$/);
    console.log(`${width}×${height}: previous/next coordinates unchanged through 14 transitions`);
    await page.close();
  }
} finally { await browser.close(); }
