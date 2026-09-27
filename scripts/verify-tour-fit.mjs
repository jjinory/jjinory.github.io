// Verify that every tour state keeps the device, explanation and tabs in view.
// Start preview.mjs, then pass an existing Playwright module path if necessary.
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.argv[2] ? pathToFileURL(process.argv[2]).href : 'playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage();
const report = [];
try {
  for (const [width, height] of [[1920, 1080], [1440, 900], [1366, 768], [1280, 720], [1280, 640], [1024, 768]]) {
    await page.setViewportSize({ width, height });
    for (const route of ['counthub.html', 'counthub-mobile.html']) {
      await page.goto('http://127.0.0.1:4173/' + route);
      let states = 0;
      let bottom = 0;
      while (true) {
        if (await page.locator('#tour-image').isVisible()) await page.locator('#tour-image').evaluate(img => img.decode());
        const result = await page.evaluate(() => {
          const bounds = [...document.querySelectorAll('.monitor, .phone, .tour-caption-bar, .tour-pages')].map(el => el.getBoundingClientRect());
          const screen = document.querySelector('.monitor-screen').getBoundingClientRect();
          const clipped = [...document.querySelectorAll('.monitor-screen *')].filter(el => {
            if (!el.checkVisibility({ visibilityProperty: true })) return false;
            const rect = el.getBoundingClientRect();
            return rect.left < screen.left - 1 || rect.right > screen.right + 1 || rect.top < screen.top - 1 || rect.bottom > screen.bottom + 1;
          }).map(el => el.tagName + '.' + el.className);
          return {
            bottom: Math.max(...bounds.map(rect => rect.bottom)),
            horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
            state: document.querySelector('#tour-counter').textContent,
            clipped,
          };
        });
        const label = `${route} ${width}×${height}: ${result.state}`;
        assert.ok(result.bottom <= height, label + ': controls below viewport');
        assert.equal(result.horizontalOverflow, false, label + ': horizontal overflow');
        assert.deepEqual(result.clipped, [], label + ': clipped device content');
        bottom = Math.max(bottom, result.bottom);
        states++;
        if (await page.locator('#tour-next').isDisabled()) break;
        // Avoid automatic scrolling from masking an off-screen button.
        await page.locator('#tour-next').evaluate(button => button.click());
      }
      assert.equal(states, route === 'counthub.html' ? 30 : 8);
      report.push(`${route} ${width}×${height}: ${states} states fit; bottom ${Math.ceil(bottom)}px`);
    }
  }
  const output = new URL('../artifacts/redesign/', import.meta.url);
  await mkdir(output, { recursive: true });
  await writeFile(new URL('tour-fit.txt', output), report.join('\n') + '\n');
  console.log(report.join('\n'));
} finally {
  await browser.close();
}
