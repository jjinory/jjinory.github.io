// Checks the solid-color design's text contrast, device clipping and local links.
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.argv[2] ? pathToFileURL(process.argv[2]).href : 'playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage();
const localLinks = new Set();
const report = [];
async function audit(label) {
  const findings = await page.evaluate(() => {
    const luminance = rgb => {
      const a = rgb.map(v => { v /= 255; return v <= .04045 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); });
      return a[0] * .2126 + a[1] * .7152 + a[2] * .0722;
    };
    const rgb = s => s.match(/[\d.]+/g).map(Number);
    const failures = [];
    for (const el of document.querySelectorAll('body *')) {
      if (!el.checkVisibility({ visibilityProperty: true }) || !Array.from(el.childNodes).some(n => n.nodeType === 3 && n.textContent.trim()) || el.closest('button:disabled, [aria-hidden="true"]')) continue;
      const style = getComputedStyle(el);
      let ancestor = el;
      let background;
      while (ancestor) {
        const color = rgb(getComputedStyle(ancestor).backgroundColor);
        if (color.length === 3 || color[3] === 1) { background = color; break; }
        ancestor = ancestor.parentElement;
      }
      const foreground = rgb(style.color);
      const l1 = luminance(foreground.slice(0, 3));
      const l2 = luminance((background || [250, 249, 246]).slice(0, 3));
      const ratio = (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05);
      const large = parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.66 && parseInt(style.fontWeight) >= 700);
      if (ratio < (large ? 3 : 4.5)) failures.push({ text: el.textContent.trim().slice(0, 60), ratio: ratio.toFixed(2) });
    }
    const screen = document.querySelector('.monitor-screen');
    const clipping = [];
    if (screen) {
      const bounds = screen.getBoundingClientRect();
      for (const el of screen.querySelectorAll('*')) {
        if (!el.checkVisibility({ visibilityProperty: true })) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top < bounds.top - 1 || rect.bottom > bounds.bottom + 1 || rect.left < bounds.left - 1 || rect.right > bounds.right + 1) clipping.push(el.tagName + '.' + el.className);
      }
    }
    return { failures, clipping };
  });
  assert.deepEqual(findings, { failures: [], clipping: [] }, label);
  report.push(label + ': text contrast and device clipping OK');
}
try {
  for (const route of ['index.html', 'counthub.html', 'counthub-mobile.html']) {
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('http://127.0.0.1:4173/' + route);
      await audit(route + ' ' + width);
      if (route !== 'index.html') {
        await page.locator(route === 'counthub.html' ? '#tour-start' : '#tour-next').click();
        await audit(route + ' active ' + width);
        await page.locator('.tour-feature').first().click();
        await audit(route + ' dialog ' + width);
        await page.locator('#dev-close').click();
      }
    }
    for (const href of await page.locator('a[href]').evaluateAll(els => els.map(el => el.href).filter(href => href.startsWith(location.origin)))) localLinks.add(href);
  }
  for (const href of localLinks) {
    const url = new URL(href);
    const response = await page.request.get(url.origin + url.pathname);
    assert.equal(response.status(), 200, href);
    const html = await response.text();
    if (url.hash && !/^#feature-[1-6]$/.test(url.hash)) assert.ok(html.includes('id="' + url.hash.slice(1) + '"'), 'Missing anchor: ' + href);
  }
  report.push(localLinks.size + ' local link targets/anchors verified.');
  const output = new URL('../artifacts/redesign/', import.meta.url);
  await mkdir(output, { recursive: true });
  await writeFile(new URL('readability.txt', output), report.join('\n') + '\n');
  console.log(report.join('\n'));
} finally {
  await browser.close();
}
