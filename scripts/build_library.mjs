// V1.0 sales library: one projection per market x property type, using the typical
// buildings in data/library_profiles.json.
//
//   dist/library/<market>-<type>.pdf   two-page report for each combination
//   dist/library/index.html            browsable matrix with headline savings and links
//
// Usage: npm run library   (runs the main build first; needs the playwright dev dependency)
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';
import { NAV_CSS, navHtml } from './nav.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const E = require(join(ROOT, 'src/engine.js'));
const D = JSON.parse(readFileSync(join(ROOT, 'data/model_defaults.json'), 'utf8'));
const LIB = JSON.parse(readFileSync(join(ROOT, 'data/library_profiles.json'), 'utf8'));
const OUT = join(ROOT, 'dist/library');
const today = new Date().toISOString().slice(0, 10);

const markets = Object.keys(D.markets);
const types = Object.keys(D.propertyTypes).filter((t) => LIB.profiles[t]);
// Typical buildings: research profile file, then PAX adjustments from the Assumptions page.
const paramsFor = (market, type) => ({ market, propertyType: type, ...LIB.defaults, ...LIB.profiles[type], ...(D.libraryProfiles?.[type] || {}) });
// 'Open' links go to the builder (full navigation) prefilled with the typical building.
const openQuery = (p) => new URLSearchParams(Object.fromEntries(Object.entries(p).map(([k, v]) => [k, String(v)]))).toString();
const query = (p) => new URLSearchParams({ view: 'report', date: today, ...Object.fromEntries(Object.entries(p).map(([k, v]) => [k, String(v)])) }).toString();

// ---------- PDFs ----------
mkdirSync(OUT, { recursive: true });
// Remove only this script's own PDFs (<market>-<type>.pdf); leave others, such as the user guide.
const ours = new Set(markets.flatMap((m) => types.map((t) => `${m}-${t}.pdf`)));
for (const f of readdirSync(OUT)) if (ours.has(f)) rmSync(join(OUT, f));
const local = '/opt/pw-browsers/chromium';
const browser = await chromium.launch(existsSync(local) ? { executablePath: local } : {});
const page = await browser.newPage();
const reportUrl = pathToFileURL(join(ROOT, 'dist/index.html')).href;
const results = {};
for (const market of markets) {
  for (const type of types) {
    const p = paramsFor(market, type);
    await page.goto(`${reportUrl}?${query(p)}`);
    await page.pdf({ path: join(OUT, `${market}-${type}.pdf`), preferCSSPageSize: true, printBackground: true });
    results[`${market}|${type}`] = E.run(p, D).kpis;
  }
}
await browser.close();

// ---------- Index page ----------
const fonts = [400, 700, 800].map((w) => {
  const b64 = readFileSync(join(ROOT, `src/fonts/montserrat-latin-${w}-normal.woff2`)).toString('base64');
  return `@font-face{font-family:Montserrat;font-weight:${w};font-display:swap;src:url(data:font/woff2;base64,${b64}) format('woff2');}`;
}).join('\n');
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const short = (n) => n >= 1e6 ? '$' + (n / 1e6).toFixed(2).replace(/0$/, '') + 'M' : '$' + Math.round(n / 1e3) + 'K';
const sysLabel = (s) => D.systems[s].label.replace('Modified Bitumen', 'mod bit');

const rows = types.map((type) => {
  const pt = D.propertyTypes[type], prof = { ...LIB.defaults, ...LIB.profiles[type], ...(D.libraryProfiles?.[type] || {}) };
  const cells = markets.map((market) => {
    const k = results[`${market}|${type}`];
    const second = k.assetValueProtected != null
      ? `${short(k.assetValueProtected)} value protected`
      : `${short(k.unplannedSpendAvoided)} emergency costs cut`;
    const range = k.savingsRange ? `<div class="range">Range ${short(k.savingsRange.low)}&ndash;${short(k.savingsRange.high)}</div>` : '';
    return `<td><div class="save">${short(k.savings)}</div>${range}<div class="sub">${Math.round(k.savingsPct * 100)}% less than reactive<br>${second}</div>
      <div class="links"><a href="../index.html?${esc(openQuery(paramsFor(market, type)))}" title="Open in the report builder to adjust or share">Open</a><a href="${market}-${type}.pdf">PDF</a></div></td>`;
  }).join('');
  return `<tr><th scope="row"><div class="t">${esc(pt.label)}</div><div class="p">${prof.area.toLocaleString('en-US')} sq ft ${esc(sysLabel(prof.system))} roof, ${prof.roofAge} yrs old</div></th>${cells}</tr>`;
}).join('\n');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>TCO Projection Library</title>
<style>
${fonts}
:root { --red:#CD163F; --navy:#1C2B39; --green:#1A6B3C; --ink:#1C2B39; --ink-2:#44525D; --muted:#5E6A73; --faint:#6E7A84; --rule:#DCE1E4; --hair:#EBEEF0; --desk:#EEF1F3; }
* { box-sizing: border-box; }
body { margin: 0; background: var(--desk); color: var(--ink); font: 13px/1.5 Montserrat, Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased; }
${NAV_CSS}
main { max-width: 1240px; margin: 0 auto; padding: 28px 16px 48px; }
h1 { font-size: 26px; font-weight: 800; letter-spacing: -.015em; margin: 0; text-wrap: balance; }
.lede { color: var(--ink-2); max-width: 75ch; margin: 8px 0 20px; }
.card { background: #fff; border-radius: 10px; box-shadow: 0 1px 2px rgba(28,43,57,.06), 0 8px 24px rgba(28,43,57,.06); overflow-x: auto; }
table { border-collapse: collapse; width: 100%; min-width: 980px; font-variant-numeric: tabular-nums; }
thead th { font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); text-align: left; padding: 14px 14px 10px; border-bottom: 2px solid var(--navy); white-space: nowrap; }
tbody th { text-align: left; padding: 14px; vertical-align: top; border-bottom: 1px solid var(--hair); width: 210px; }
tbody th .t { font-weight: 800; font-size: 13px; }
tbody th .p { font-size: 11px; color: var(--muted); font-weight: 400; margin-top: 2px; }
td { padding: 14px; vertical-align: top; border-bottom: 1px solid var(--hair); border-left: 1px solid var(--hair); }
.save { font-size: 20px; font-weight: 800; color: var(--green); letter-spacing: -.01em; }
.range { font-size: 11px; font-weight: 700; color: var(--ink); }
.sub { font-size: 11px; color: var(--ink-2); line-height: 1.45; margin-top: 2px; }
.links { display: flex; gap: 6px; margin-top: 8px; }
.links a { font-size: 11px; font-weight: 700; color: var(--navy); text-decoration: none; border: 1px solid var(--rule); border-radius: 5px; padding: 3px 9px; }
.links a:hover { border-color: var(--navy); }
.links a:focus-visible { outline: 2px solid #DD971A; outline-offset: 2px; }
.fine { font-size: 11px; color: var(--muted); max-width: 110ch; margin-top: 16px; }
</style>
</head>
<body>
${navHtml('library', '../')}
<main>
  <h1>TCO Projection Library</h1>
  <p class="lede">Twenty-year roof cost projections for a typical building of each type in each PAX market, comparing PaxSeal planned maintenance with reactive repair. Each one opens as a two-page report with the cost curve. Use the <b>Report builder</b> for a specific customer's roof.</p>
  <div class="card">
    <table>
      <thead><tr><th>Property type &middot; typical roof</th>${markets.map((m) => `<th>${esc(D.markets[m].shortName)}</th>`).join('')}</tr></thead>
      <tbody>
${rows}
      </tbody>
    </table>
  </div>
  <p class="fine">Figures are 20-year projections in nominal dollars, net of the roof life remaining at year 20, and include an estimated PaxSeal fee. The range runs from conservative to upside assumptions for repair costs and roof life added. The typical buildings are illustrative profiles, not market averages. Market data is round-one research with many low-confidence values; see each report's assumptions table. Generated ${today} from model data ${esc(D.builtOn)}.</p>
</main>
</body>
</html>
`;
writeFileSync(join(OUT, 'index.html'), html);
console.log(`Built ${markets.length * types.length} PDFs and dist/library/index.html`);
