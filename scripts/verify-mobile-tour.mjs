import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.argv[2] ? pathToFileURL(process.argv[2]).href : 'playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
const report = [];
const output = new URL('../artifacts/redesign/', import.meta.url);
await mkdir(output, { recursive: true });
try {
  for (const [width, height] of [[320, 740], [360, 800], [390, 844], [430, 932], [768, 1024], [844, 390]]) {
    await page.setViewportSize({ width, height });
    await page.goto('http://127.0.0.1:4173/counthub-mobile.html');
    for (let feature = 0; feature < 4; feature++) {
      await page.locator('.tour-groups button').nth(feature).tap();
      assert.equal(await page.locator('.tour-groups button').nth(feature).getAttribute('aria-current'), 'true');
      const result = await page.evaluate(() => {
        const screen = document.querySelector('.monitor-screen').getBoundingClientRect();
        const clipped = [...document.querySelectorAll('.monitor-screen *')].filter(el => {
          if (!el.checkVisibility()) return false;
          const r = el.getBoundingClientRect();
          return r.left < screen.left - 1 || r.right > screen.right + 1 || r.top < screen.top - 1 || r.bottom > screen.bottom + 1;
        }).map(el => el.className);
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          clipped,
          numbers: [...document.querySelectorAll('.tour-feature-no')].every(el => el.getBoundingClientRect().height <= parseFloat(getComputedStyle(el).lineHeight) + 1),
          navFirst: document.querySelector('.monitor-tour').firstElementChild.id === 'tour-pages',
        };
      });
      assert.equal(result.overflow, false);
      assert.deepEqual(result.clipped, []);
      assert.equal(result.numbers, true);
      assert.equal(result.navFirst, width <= 760);
    }
    // Check all eight captures, including the four barcode stages, at every touch size.
    await page.locator('.tour-home').tap();
    const captures = new Set();
    while (true) {
      const dimensions = await page.locator('#tour-image').evaluate(async img => {
        await img.decode();
        return [img.naturalWidth, img.naturalHeight];
      });
      assert.deepEqual(dimensions, [1080, 2520]);
      captures.add(await page.locator('#tour-image').getAttribute('src'));
      assert.equal(await page.locator('#tour-original').getAttribute('href'), await page.locator('#tour-image').getAttribute('src'));
      assert.ok((await page.locator('#tour-copy').textContent()).length > 20);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      if (await page.locator('#tour-next').isDisabled()) break;
      await page.locator('#tour-next').tap();
    }
    assert.equal(captures.size, 8);
    await page.locator('.tour-groups button').nth(2).tap();
    assert.equal(await page.locator('.tour-steps button').count(), 4);
    for (let step = 0; step < 4; step++) {
      await page.locator('.tour-steps button').nth(step).tap();
      assert.equal(await page.locator('.tour-steps button').nth(step).getAttribute('aria-current'), 'step');
    }
    await page.locator('.tour-feature').first().tap();
    assert.equal(await page.locator('#dev-dialog').isVisible(), true);
    await page.locator('#dev-close').tap();
    assert.equal(await page.locator('#dev-dialog').isVisible(), false);
    report.push(`${width}×${height}: touch selection, modal, clipping, number wrapping and navigation order OK`);
    if (width === 390) {
      await page.locator('.tour-groups button').first().tap();
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ type: 'jpeg', quality: 75, path: new URL('android-mobile-fixed.jpg', output).pathname.replace(/^\/(\w:)/, '$1') });
      await page.locator('.tour-catalog').scrollIntoViewIfNeeded();
      await page.screenshot({ type: 'jpeg', quality: 75, path: new URL('android-mobile-catalog-fixed.jpg', output).pathname.replace(/^\/(\w:)/, '$1') });
    }
  }
  // Media-query changes are delivered asynchronously after the viewport resize.
  for (const [width, height] of [[390, 844], [844, 390], [390, 844]]) {
    await page.setViewportSize({ width, height });
    await page.waitForFunction(() => {
      const navFirst = document.querySelector('.monitor-tour').firstElementChild.id === 'tour-pages';
      return navFirst === matchMedia('(max-width: 760px)').matches;
    });
    assert.equal(await page.locator('.tour-groups button').count(), 4);
  }
  report.push('Portrait/landscape changes preserve navigation order without duplicate tabs.');
  await writeFile(new URL('mobile-tour.txt', output), report.join('\n') + '\n');
  console.log(report.join('\n'));
} finally {
  await browser.close();
}
