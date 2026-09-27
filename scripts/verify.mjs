// Run against `node preview.mjs`. Pass an existing Playwright module path if needed.
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const { chromium } = await import(process.argv[2] ? pathToFileURL(process.argv[2]).href : 'playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const base = 'http://127.0.0.1:4173';
const output = new URL('../artifacts/redesign/', import.meta.url);
await mkdir(output, { recursive: true });
const sizes = [{ width: 1440, height: 1000 }, { width: 1024, height: 768 }, { width: 768, height: 1024 }, { width: 390, height: 844 }, { width: 360, height: 800 }, { width: 320, height: 740 }];
const errors = [];
const report = [];
const context = await browser.newContext();
context.on('page', page => {
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(response.status() + ' ' + response.url()); });
});
const page = await context.newPage();

async function checkOverflow(label) {
  const metrics = await page.evaluate(() => ({
    viewport: innerWidth,
    document: document.documentElement.scrollWidth,
    overflowing: [...document.querySelectorAll('main *, header *, footer *')].filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && (rect.right > innerWidth + 1 || rect.left < -1);
    }).map(el => el.tagName + '.' + el.className).slice(0, 10),
  }));
  assert.ok(metrics.document <= metrics.viewport, label + ': document overflow ' + JSON.stringify(metrics));
  assert.deepEqual(metrics.overflowing, [], label + ': element overflow');
}

try {
  for (const viewport of sizes) {
    await page.setViewportSize(viewport);
    for (const route of ['index.html', 'counthub.html', 'counthub-mobile.html']) {
      await page.goto(base + '/' + route);
      await checkOverflow(`${route} ${viewport.width}`);
      await page.locator('.project-nav-toggle').focus();
      await page.keyboard.press('ArrowDown');
      assert.equal(await page.locator('.project-nav-toggle').getAttribute('aria-expanded'), 'true');
      await checkOverflow('open menu ' + viewport.width);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('#project-menu').isVisible(), false);
      assert.equal(await page.locator('.project-nav-toggle').evaluate(el => el === document.activeElement), true);
      if (route === 'index.html') {
        const order = await page.locator('main > section').evaluateAll(els => els.map(el => el.id));
        assert.deepEqual(order, ['home', 'about', 'projects', 'comparison', 'skills', 'experience', 'contact']);
        const numbers = await page.locator('main > section:not(#home) .eyebrow').evaluateAll(els => els.map(el => el.textContent.trim().slice(0, 2)));
        assert.deepEqual(numbers, ['01', '02', '03', '04', '05', '06']);
        if (viewport.width <= 1000) {
          const boxes = await page.evaluate(() => ['.hero-intro', '.hero-figure', '.hero-actions'].map(s => { const r = document.querySelector(s).getBoundingClientRect(); return { top: r.top, bottom: r.bottom }; }));
          assert.ok(boxes[1].top >= boxes[0].bottom && boxes[2].top >= boxes[1].bottom, 'Mobile hero order');
        }
      } else {
        const expectedFeatures = route === 'counthub.html' ? 6 : 4;
        assert.equal(await page.locator('.tour-groups button').count(), expectedFeatures);
        await page.locator(route === 'counthub.html' ? '#tour-start' : '#tour-next').click();
        await checkOverflow('active tour ' + viewport.width);
        await page.locator('.tour-feature').first().click();
        assert.equal(await page.locator('#dev-dialog').isVisible(), true);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#dev-dialog').isVisible(), false);
        assert.equal(await page.locator('.tour-feature').first().evaluate(el => el === document.activeElement), true);
        await page.locator('.tour-home').click();
      }
      if ([1440, 390, 320].includes(viewport.width)) {
        await page.evaluate(() => { document.activeElement.blur(); window.scrollTo(0, 0); });
        await page.screenshot({ path: new URL(route.replace('.html', '') + '-' + viewport.width + '.png', output).pathname.replace(/^\/(\w:)/, '$1'), fullPage: true });
      }
      report.push(`${route} ${viewport.width}×${viewport.height}: layout/menu OK`);
    }
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base + '/counthub.html');
  const expectedSteps = [4, 8, 3, 3, 3, 3];
  let screenshotsChecked = 0;
  for (let feature = 0; feature < 6; feature++) {
    await page.locator('.tour-groups button').nth(feature).click();
    assert.equal(await page.locator('.tour-steps button').count(), expectedSteps[feature]);
    // Includes the introductory screenshot for every feature except signup.
    await page.locator('#tour-image').evaluate(img => img.decode());
    if (feature > 0) screenshotsChecked++;
    for (let step = 0; step < expectedSteps[feature]; step++) {
      await page.locator('.tour-steps button').nth(step).click();
      assert.equal(await page.locator('.tour-steps button').nth(step).getAttribute('aria-current'), 'step');
      await page.locator('#tour-image').evaluate(img => img.decode());
      screenshotsChecked++;
    }
  }
  assert.equal(screenshotsChecked, 29);
  assert.equal(await page.locator('#tour-next').isDisabled(), true);
  await page.locator('.tour-home').click();
  assert.equal(await page.locator('#tour-prev').isDisabled(), true);
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('#tour-image').isVisible(), true);
  await page.keyboard.press('ArrowLeft');
  assert.equal(await page.locator('#tour-welcome').isVisible(), true);
  await page.goto(base + '/counthub.html#feature-2');
  assert.match(await page.locator('#tour-category').textContent(), /입출고 파일 변환/);
  await page.locator('.tour-steps button').nth(6).click();
  await page.locator('#tour-image').evaluate(img => img.decode());
  await page.screenshot({ path: new URL('pc-conversion-1440.png', output).pathname.replace(/^\/(\w:)/, '$1'), fullPage: true });
  await page.goto(base + '/counthub-mobile.html');
  for (let feature = 0; feature < 4; feature++) {
    await page.locator('.tour-groups button').nth(feature).click();
    assert.equal(await page.locator('#tour-summary').isVisible(), false);
    assert.equal(await page.locator('#tour-image').isVisible(), true);
    await page.locator('#tour-image').evaluate(img => img.decode());
    assert.ok((await page.locator('#tour-copy').textContent()).length > 20);
    await page.locator('.tour-feature').nth(feature).click();
    assert.ok((await page.locator('#dev-copy').textContent()).length > 10);
    await page.locator('#dev-close').click();
  }
  assert.equal(await page.locator('#tour-next').isDisabled(), true);
  await page.locator('.tour-groups button').first().click();
  await page.screenshot({ path: new URL('android-screenshot-1440.png', output).pathname.replace(/^\/(\w:)/, '$1'), fullPage: true });
  await page.locator('.tour-top a[href="./counthub.html"]').click();
  assert.match(page.url(), /counthub\.html$/);
  await page.locator('.tour-top a[href="./counthub-mobile.html"]').click();
  assert.match(page.url(), /counthub-mobile\.html$/);

  assert.deepEqual(errors, [], 'Runtime or resource errors');
  report.push('29 original PC screenshots decoded; 6 feature groups and all steps passed.', 'Android: 4 features, real captures, dialogs, previous/next and platform links passed.', 'Keyboard menu, Escape/focus return, arrow navigation and feature deep link passed.', 'No browser JavaScript or resource errors.');
  await writeFile(new URL('results.txt', output), report.join('\n') + '\n');
  console.log(report.join('\n'));
} finally {
  await browser.close();
}
