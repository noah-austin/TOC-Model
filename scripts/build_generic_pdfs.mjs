// Customer PDFs for the generic cost curves: one two-page PDF per market x building
// type x roof type, plus the "All" averages (the page's Download PDF button links here).
//
//   dist/generic/pdf/<market>--<type>--<roof>.pdf
//
// Usage: npm run generic-pdfs   (runs the main build first; needs the playwright dev dependency)
// Generated in CI on every deploy and not committed (see .gitignore).
import { mkdirSync, existsSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'dist/generic/pdf');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const local = '/opt/pw-browsers/chromium';
const browser = await chromium.launch(existsSync(local) ? { executablePath: local } : {});
const page = await browser.newPage();
await page.goto(pathToFileURL(join(ROOT, 'dist/generic/index.html')).href + '?view=sheet');
await page.emulateMedia({ media: 'print' });
const combos = await page.evaluate(() => Object.keys(window.GENERIC_DATA.params));
let n = 0;
for (const k of combos) {
  const file = await page.evaluate((k) => window.showCombo(...k.split('|')), k);
  // Each sheet is one Letter page; content running into the footer means text was cut.
  const overflow = await page.evaluate(() => [...document.querySelectorAll('.sheet')].some((sh) => {
    const f = sh.querySelector('.sh-foot'), prev = f.previousElementSibling;
    return sh.scrollHeight > sh.clientHeight || f.offsetTop < prev.offsetTop + prev.offsetHeight;
  }));
  if (overflow) throw new Error(`Customer sheet overflows its page: ${k}`);
  await page.pdf({ path: join(OUT, file), preferCSSPageSize: true, printBackground: true });
  n++;
}
await browser.close();
console.log(`Built ${n} customer PDFs in dist/generic/pdf/`);
