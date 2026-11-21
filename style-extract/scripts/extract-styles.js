#!/usr/bin/env node
/**
 * 从参考页转储 :root CSS 变量、关键元素的 getComputedStyle，并保存整页截图。
 * 用法: node extract-styles.js <url> [outDir]
 * 依赖: playwright（未安装浏览器时执行 npx playwright install chromium）
 */
const fs = require('fs');
const path = require('path');

const url = process.argv[2];
const outDir = path.resolve(process.argv[3] || './style-extract-out');

if (!url) {
  console.error('用法: node extract-styles.js <url> [outDir]');
  process.exit(1);
}

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch (err) {
  console.error('未找到 playwright，请先执行: npm i -D playwright && npx playwright install chromium');
  process.exit(1);
}

const SELECTORS = {
  body: 'body',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  p: 'p',
  a: 'a',
  nav: 'nav, header, [role="navigation"]',
  button: 'button, [role="button"], a.btn, .btn, input[type="submit"]',
  input: 'input:not([type="hidden"]), textarea, select',
  card: '[class*="card"], article, section',
  table: 'table',
  badge: '[class*="badge"], [class*="tag"], [class*="chip"]',
};

const PROPS = [
  'color',
  'backgroundColor',
  'borderTopColor',
  'borderTopWidth',
  'borderTopStyle',
  'fontFamily',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'letterSpacing',
  'borderRadius',
  'boxShadow',
  'padding',
  'margin',
  'gap',
  'maxWidth',
  'height',
  'textTransform',
];

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  } catch {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  }

  const data = await page.evaluate(({ SELECTORS, PROPS }) => {
    const pick = (el) => {
      const s = getComputedStyle(el);
      const styles = {};
      for (const p of PROPS) styles[p] = s[p];
      return {
        tag: el.tagName.toLowerCase(),
        className: typeof el.className === 'string' ? el.className.slice(0, 200) : '',
        styles,
      };
    };

    const elements = {};
    for (const [name, selector] of Object.entries(SELECTORS)) {
      const nodes = Array.from(document.querySelectorAll(selector)).slice(0, 3);
      elements[name] = nodes.length ? nodes.map(pick) : [];
    }

    const rootVars = {};
    const rootStyle = getComputedStyle(document.documentElement);
    for (let i = 0; i < rootStyle.length; i++) {
      const key = rootStyle[i];
      if (key.startsWith('--')) rootVars[key] = rootStyle.getPropertyValue(key).trim();
    }

    const darkSelectors = ['.dark', '[data-theme="dark"]', '[data-theme=dark]', '.theme-dark'];
    let darkVars = null;
    for (const sel of darkSelectors) {
      const el = document.querySelector(sel);
      if (!el) continue;
      const style = getComputedStyle(el);
      const vars = {};
      for (let i = 0; i < style.length; i++) {
        const key = style[i];
        if (key.startsWith('--')) vars[key] = style.getPropertyValue(key).trim();
      }
      if (Object.keys(vars).length) {
        darkVars = { selector: sel, vars };
        break;
      }
    }

    return {
      finalUrl: location.href,
      title: document.title,
      fontFamily: getComputedStyle(document.body).fontFamily,
      rootVars,
      darkVars,
      elements,
    };
  }, { SELECTORS, PROPS });

  data.sourceUrl = url;
  data.viewport = { width: 1440, height: 900 };
  data.capturedAt = new Date().toISOString();

  const jsonPath = path.join(outDir, 'computed-styles.json');
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  const shotPath = path.join(outDir, 'reference-fullpage.png');
  await page.screenshot({ path: shotPath, fullPage: true });
  await browser.close();

  console.log('wrote', jsonPath);
  console.log('wrote', shotPath);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
