// User guide PDF for people who use the tool (sales, sales ops, managers).
// Example numbers come from the live engine and a screenshot of a real report,
// so the guide stays in sync with the model.
//
//   dist/library/PAX-Roof-TCO-Guide.pdf   (linked from the library page)
//
// Usage: npm run guide   (runs the main build first; needs the playwright dev dependency)
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const E = require(join(ROOT, 'src/engine.js'));
const D = JSON.parse(readFileSync(join(ROOT, 'data/model_defaults.json'), 'utf8'));
const OUT = join(ROOT, 'dist/library/PAX-Roof-TCO-Guide.pdf');
const SITE = 'https://noah-austin.github.io/TOC-Model/';

// ---------- worked example from the engine ----------
const ex = { market: 'san-antonio', propertyType: 'industrial', area: 100000, roofAge: 8, system: 'tpo', condition: 'good' };
const r = E.run(ex, D), k = r.kpis, P = r.planned, R = r.reactive, cfg = r.config;
const sum = (s, key) => s.rows.reduce((a, row) => a + row[key], 0);
const usd = (n) => n >= 1e6 ? '$' + (n / 1e6).toFixed(2) + 'M' : '$' + Math.round(n / 1e3).toLocaleString('en-US') + 'K';
const pct = (n) => (Math.round(n * 10) / 10).toFixed(1) + '%';
const markets = Object.values(D.markets).map((m) => m.shortName).join(', ');
const types = Object.values(D.propertyTypes).map((t) => t.label).join(', ');

// ---------- screenshot of page 1 of the example report ----------
const local = '/opt/pw-browsers/chromium';
const browser = await chromium.launch(existsSync(local) ? { executablePath: local } : {});
const shot = await browser.newPage({ viewport: { width: 816, height: 1056 }, deviceScaleFactor: 2 });
await shot.emulateMedia({ media: 'print' });
const q = new URLSearchParams({ view: 'report', customer: 'Acme Logistics', property: 'Distribution Center 2', city: 'San Antonio',
  preparedBy: 'Your Name', ...Object.fromEntries(Object.entries(ex).map(([a, b]) => [a, String(b)])) });
await shot.goto(pathToFileURL(join(ROOT, 'dist/index.html')).href + '?' + q);
const png = (await shot.locator('.sheet').first().screenshot()).toString('base64');
await shot.close();

// ---------- HTML ----------
const fonts = [400, 600, 700, 800].map((w) => {
  const b64 = readFileSync(join(ROOT, `src/fonts/montserrat-latin-${w}-normal.woff2`)).toString('base64');
  return `@font-face{font-family:Montserrat;font-weight:${w};src:url(data:font/woff2;base64,${b64}) format('woff2');}`;
}).join('\n');

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>PAX Roof Lifecycle Tool: User Guide</title>
<style>
${fonts}
@page { size: Letter; margin: 0.55in 0.6in 0.6in; }
:root { --red:#CD163F; --navy:#1C2B39; --green:#1A6B3C; --ink:#1C2B39; --ink2:#44525D; --muted:#5E6A73; --rule:#DCE1E4; --hair:#EBEEF0; --wash:#F4F6F7; }
* { box-sizing: border-box; }
body { margin: 0; font: 10.5px/1.5 Montserrat, Arial, sans-serif; color: var(--ink); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1 { font-size: 28px; font-weight: 800; letter-spacing: -.015em; margin: 14px 0 4px; color: var(--navy); }
h2 { font-size: 15px; font-weight: 800; color: var(--navy); margin: 0 0 8px; padding-top: 4px; }
h3 { font-size: 11.5px; font-weight: 800; margin: 12px 0 4px; color: var(--navy); }
p { margin: 0 0 7px; color: var(--ink2); }
b { color: var(--ink); }
.brand { display: flex; align-items: center; gap: 9px; font-weight: 800; font-size: 10px; letter-spacing: .16em; color: var(--navy); }
.brand span { background: var(--red); color: #fff; padding: 3px 8px; border-radius: 3px; letter-spacing: .08em; }
.kicker { font-size: 9.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); margin-top: 14px; }
.lede { font-size: 12.5px; line-height: 1.5; color: var(--ink); margin: 6px 0 14px; max-width: 64ch; }
.rule { border: 0; border-top: 3px solid var(--red); margin: 0 0 16px; }
section { margin-bottom: 16px; break-inside: avoid; }
.page { break-before: page; }
.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.card { border: 1px solid var(--rule); border-radius: 6px; padding: 10px 12px; }
.card .n { width: 20px; height: 20px; border-radius: 50%; background: var(--navy); color: #fff; font-weight: 800; font-size: 10px; display: grid; place-items: center; margin-bottom: 6px; }
.card b { display: block; font-size: 11px; margin-bottom: 3px; }
.card p { margin: 0; font-size: 10px; }
.url { font-weight: 700; color: var(--navy); white-space: nowrap; }
table { width: 100%; border-collapse: collapse; font-size: 10px; margin: 4px 0 8px; }
th { text-align: left; font-size: 8.5px; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); border-bottom: 2px solid var(--navy); padding: 5px 6px; }
td { padding: 5px 6px; border-bottom: 1px solid var(--hair); vertical-align: top; color: var(--ink2); }
td:first-child { font-weight: 700; color: var(--ink); }
td.num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
.steps { counter-reset: s; list-style: none; padding: 0; margin: 0; }
.steps li { counter-increment: s; position: relative; padding: 0 0 8px 28px; color: var(--ink2); }
.steps li::before { content: counter(s); position: absolute; left: 0; top: 0; width: 19px; height: 19px; border-radius: 50%; background: var(--red); color: #fff; font-weight: 800; font-size: 9.5px; display: grid; place-items: center; }
.steps li b { color: var(--ink); }
.formula { background: var(--wash); border-left: 3px solid var(--navy); padding: 8px 12px; font-weight: 700; color: var(--ink); margin: 6px 0 10px; border-radius: 0 4px 4px 0; }
.shot { border: 1px solid var(--rule); border-radius: 4px; width: 100%; display: block; box-shadow: 0 2px 8px rgba(28,43,57,.12); }
.callout { background: #EEF6F1; border-radius: 6px; padding: 10px 12px; }
.callout .big { font-size: 24px; font-weight: 800; color: var(--green); letter-spacing: -.01em; }
.tag { display: inline-block; font-size: 8px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; padding: 1px 6px; border-radius: 3px; }
.tag.high { background: #E1EFE6; color: var(--green); } .tag.med { background: #FDF0D5; color: #7F5300; } .tag.low { background: #FBE2E7; color: #A8102F; }
.qa p { margin-bottom: 8px; } .qa b { display: block; color: var(--navy); }
.foot { font-size: 8.5px; color: var(--muted); border-top: 1px solid var(--hair); padding-top: 6px; margin-top: 10px; }
</style></head><body>

<div class="brand"><span>PAX</span>SERVICES GROUP</div>
<div class="kicker">PaxSeal&trade; Building Lifecycle Plan &middot; Internal guide</div>
<h1>Roof Lifecycle Cost Tool: User Guide</h1>
<hr class="rule">
<p class="lede">The tool shows a building owner what their roof will cost over the next 20 years in two scenarios: with <b>PaxSeal planned maintenance</b>, or with <b>reactive repair</b> (fixing problems only after they leak). It turns the difference into dollars, using real cost and storm data for the owner&rsquo;s market.</p>

<section>
  <h2>Three ways to use it</h2>
  <div class="grid3">
    <div class="card"><div class="n">1</div><b>Custom report</b><p>Enter a customer&rsquo;s roof details in the builder and get a branded two-page report to print, save as PDF, or send as a link.</p><p class="url" style="margin-top:6px">${SITE.replace(/^https:\/\//, '').replace(/\/$/, '')}</p></div>
    <div class="card"><div class="n">2</div><b>Sales library</b><p>${Object.keys(D.markets).length * Object.keys(D.propertyTypes).length} ready-made reports: a typical building of each property type in each market. Open or download, no typing.</p><p class="url" style="margin-top:6px">${SITE.replace(/^https:\/\//, '')}library</p></div>
    <div class="card"><div class="n">3</div><b>Shareable links</b><p>Every report has a link with its inputs built in. Send it to a customer or a colleague; it opens straight to the report.</p></div>
  </div>
  <p style="margin-top:10px"><b>Markets:</b> ${markets}. <b>Property types:</b> ${types}.</p>
</section>

<section>
  <h2>Make a customer report in two minutes</h2>
  <ol class="steps">
    <li><b>Customer.</b> Customer name, property, city and contact. Add your name, phone and email; they print in the report&rsquo;s &ldquo;Next step&rdquo; box.</li>
    <li><b>Roof.</b> Pick the market and property type, then roof area, age, roof system and condition. Add warranty years left and active leaks if you know them.</li>
    <li><b>Costs (optional).</b> Leave blank to use market defaults (shown in gray). Enter the real replacement cost, the PaxSeal price from your proposal, or a cap rate if you have them; the report recalculates instantly.</li>
    <li><b>Share.</b> <b>Print / PDF</b> saves the two-page report. <b>Copy report link</b> gives a link that opens the finished report without the input form.</li>
  </ol>
  <p><b>Customer copy vs internal copy.</b> Reports are customer-ready by default. Under <b>Model assumptions</b>, &ldquo;Show source confidence&rdquo; makes an <b>internal review copy</b> that rates each data source and is marked &ldquo;Internal review copy&rdquo; on every page. Don&rsquo;t send that version to customers. The Model assumptions section is for sales ops only.</p>
</section>

<section>
  <h2>What&rsquo;s in a report</h2>
  <div class="grid2">
    <div><p><b>Page 1.</b> The projected 20-year savings in one sentence, with its range; the property at a glance; net cost for each scenario; the cumulative spending chart; and a roof-life timeline showing when each scenario needs a new roof.</p></div>
    <div><p><b>Page 2.</b> Where the savings come from (fees, repairs, storm damage, replacements); up to four takeaways for this roof; the local storm risk with FEMA ratings; the key assumptions and their sources; and a next step with your contact details.</p></div>
  </div>
</section>

<div class="page"></div>
<section>
  <h2>How it works</h2>
  <div class="grid2">
    <div>
      <h3>1. Describe the roof</h3>
      <p>Market, property type, size, age, condition and roof system. Anything left blank uses a market default.</p>
      <h3>2. Look up market data</h3>
      <p>Local replacement cost per sq ft, county storm risk from the FEMA National Risk Index, roofing cost growth (${pct(D.escalationPct)} a year, federal price index), and local cap rates by property type.</p>
    </div>
    <div>
      <h3>3. Simulate 20 years, both ways</h3>
      <p>Each year&rsquo;s fee, repairs, storm damage and any roof replacement is added up for both scenarios. That running total is the chart on page 1.</p>
      <h3>4. Compare</h3>
      <p>The difference in net 20-year cost is the projected savings, shown with a conservative-to-upside range.</p>
    </div>
  </div>
  <table>
    <thead><tr><th style="width:22%"></th><th>With PaxSeal</th><th>Reactive repair</th></tr></thead>
    <tbody>
      <tr><td>Roof life</td><td>Full design life (20 yrs for TPO, EPDM, mod bit, BUR; 40 for metal)</td><td>About ${cfg.lifeExtensionYears} years shorter</td></tr>
      <tr><td>Program fee</td><td>Paid every year, rising ${cfg.feeEscalationPct}% a year</td><td>None</td></tr>
      <tr><td>Repairs</td><td>Caught early on scheduled visits; the fee covers half of planned repairs</td><td>About ${cfg.reactiveRepairMultiplier}&times; the planned rate (more in hospitals, schools and apartments, where leaks do more damage)</td></tr>
      <tr><td>Storm damage</td><td>Expected loss for the county</td><td>${cfg.reactiveStormMultiplier}&times; higher with reactive repair only</td></tr>
      <tr><td>Replacement</td><td>Later</td><td>Sooner, and at a higher price because roofing costs keep rising</td></tr>
    </tbody>
  </table>
  <div class="formula">Net 20-year cost = cash spent + value of the current roof used up &minus; roof life left at year 20</div>
  <p>Counting roof life left at the end keeps the comparison fair: a scenario that buys a new roof in year 19 gets credit for the 19 years it still has. The current roof&rsquo;s value is the same in both scenarios, so it never changes the savings.</p>
</section>

<section>
  <h2>Worked example</h2>
  <div class="grid2" style="grid-template-columns: 1.5fr 1fr; align-items: start">
    <div>
      <p><b>San Antonio warehouse</b>: 100,000 sq ft TPO roof, 8 years old, good condition. A new roof costs about <b>${usd(r.inputs.replacementCost)}</b> today.</p>
      <table>
        <thead><tr><th></th><th style="text-align:right">PaxSeal</th><th style="text-align:right">Reactive</th></tr></thead>
        <tbody>
          <tr><td>Next new roof</td><td class="num">Year ${k.plannedReplacementYear ?? '20+'}</td><td class="num">Year ${k.reactiveReplacementYear ?? '20+'}</td></tr>
          <tr><td>PaxSeal fees</td><td class="num">${usd(sum(P, 'fee'))}</td><td class="num">&mdash;</td></tr>
          <tr><td>Repairs</td><td class="num">${usd(sum(P, 'repairs'))}</td><td class="num">${usd(sum(R, 'repairs'))}</td></tr>
          <tr><td>Storm damage</td><td class="num">${usd(sum(P, 'storm'))}</td><td class="num">${usd(sum(R, 'storm'))}</td></tr>
          <tr><td>Roof replacements</td><td class="num">${usd(sum(P, 'replacement'))}</td><td class="num">${usd(sum(R, 'replacement'))}</td></tr>
          <tr><td>Net 20-year cost</td><td class="num"><b>${usd(k.plannedNetCost)}</b></td><td class="num"><b>${usd(k.reactiveNetCost)}</b></td></tr>
        </tbody>
      </table>
      <div class="callout">
        <div style="font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)">Projected savings</div>
        <div class="big">${usd(k.savings)} <span style="font-size:13px">(${Math.round(k.savingsPct * 100)}%)</span></div>
        <p style="margin:2px 0 0">${usd(k.cashSavings)} less cash spent, plus ${usd(k.roofValueKept)} more roof life at year 20. Range ${usd(k.savingsRange.low)}&ndash;${usd(k.savingsRange.high)}. Property value protected: ${usd(k.assetValueProtected)} (about ${usd(k.annualNoiGain)}/yr better NOI &divide; ${pct(r.inputs.capRatePct)} cap rate).</p>
      </div>
    </div>
    <div>
      <img class="shot" src="data:image/png;base64,${png}" alt="Page 1 of the example report">
      <p style="font-size:9px;margin-top:4px;text-align:center">Page 1 of this example report</p>
    </div>
  </div>
</section>

<div class="page"></div>
<section>
  <h2>Reading the report</h2>
  <table>
    <thead><tr><th style="width:26%">On the report</th><th>What it means</th></tr></thead>
    <tbody>
      <tr><td>Projected savings</td><td>How much less the roof costs over 20 years with PaxSeal, split into lower cash spending and extra roof life left at year 20.</td></tr>
      <tr><td>Range</td><td>The same projection under cautious and optimistic assumptions for repair costs and roof life added.</td></tr>
      <tr><td>Today&rsquo;s dollars</td><td>The savings discounted at 7% a year: what that future money is worth now.</td></tr>
      <tr><td>Value protected</td><td>For investor-owned property: yearly operating savings &divide; cap rate. Applies when the owner pays for the roof (not a triple-net lease).</td></tr>
      <tr><td>Repair &amp; storm savings</td><td>Shown instead for schools and hospitals, which are usually owner-occupied: unbudgeted repair and storm costs avoided.</td></tr>
      <tr><td>The chart</td><td>Cumulative spending for each scenario. Vertical jumps are roof replacements; the green band is the money kept by maintaining. The dashed line is the price of a new roof that year.</td></tr>
      <tr><td>What this means</td><td>Up to four takeaways chosen for this roof: fewer roofs or a later replacement, smaller repairs, warranty, and property-type points.</td></tr>
    </tbody>
  </table>
</section>

<section>
  <h2>Where the numbers come from</h2>
  <table>
    <thead><tr><th style="width:26%">Input</th><th>Source</th><th style="width:12%">Strength</th></tr></thead>
    <tbody>
      <tr><td>Storm risk</td><td>FEMA National Risk Index, December 2025, by county</td><td><span class="tag high">Strong</span></td></tr>
      <tr><td>Roofing cost growth</td><td>BLS Producer Price Index for nonresidential roofing, 2007&ndash;2025</td><td><span class="tag high">Strong</span></td></tr>
      <tr><td>Roof life with maintenance</td><td>Industry service-life tables; NRC Canada roof study; manufacturer warranty terms</td><td><span class="tag med">Moderate</span></td></tr>
      <tr><td>Local roof prices, cap rates</td><td>Contractor and broker figures from search summaries; need verification</td><td><span class="tag med">Moderate</span></td></tr>
      <tr><td>Repair cost multiplier, base repair rate</td><td>Industry estimates; no published study. These drive most of the savings, which is why the report shows a range</td><td><span class="tag low">Weak</span></td></tr>
      <tr><td>PaxSeal fee</td><td>Estimate ($${D.fee.baseUsd} + $${D.fee.perSqftUsd.toFixed(2)}/sq ft a year) until you enter the proposal price</td><td>Our price</td></tr>
    </tbody>
  </table>
</section>

<section class="qa">
  <h2>When a customer pushes back</h2>
  <div class="grid2">
    <div>
      <p><b>&ldquo;Those savings look high.&rdquo;</b> Point to the range and to the split between cash and roof value. Even the conservative case is usually clearly positive. The biggest driver is buying fewer or later roofs.</p>
      <p><b>&ldquo;Is the PaxSeal fee included?&rdquo;</b> Yes. It is a cost every year, rising ${cfg.feeEscalationPct}% a year. Enter the actual proposal price for an exact figure.</p>
    </div>
    <div>
      <p><b>&ldquo;Doesn&rsquo;t insurance cover storms?&rdquo;</b> Storm figures are before insurance, and the report says so. Storm damage is a small part of the savings; most comes from repairs and replacements.</p>
      <p><b>&ldquo;Our roof is different.&rdquo;</b> Enter the real replacement cost, fee or cap rate and the report recalculates on the spot.</p>
    </div>
  </div>
</section>

<section>
  <h2>Good to know</h2>
  <p><b>Getting around.</b> Every page has the same header: <b>Report builder</b>, <b>Library</b>, <b>Assumptions</b> and the <b>User guide</b>. A report link sent to a customer shows only the report, with Edit and Print.</p>
  <p><b>Assumptions page.</b> Shows every number the model uses (roof life by system, property-type factors, each market&rsquo;s prices, cap rates and storm loss) with its source. Sales ops can adjust values there; changes are published by uploading the downloaded overrides.json to the project.</p>
  <p><b>Estimates, not quotes.</b> Every report says so. The PaxSeal proposal sets the actual price and scope.</p>
  <p><b>Typical buildings in the library</b> are illustrative profiles (for example, a 100,000 sq ft warehouse roof, 8 years old), not market averages. Use a custom report for a real property.</p>
  <p><b>Updates.</b> The tool is a single web page hosted on GitHub Pages and updates automatically when the model or data change. The full method is in <span class="url">docs/MODEL_SPEC.md</span> in the project repository.</p>
</section>

<div class="foot">PAX Services Group &middot; Roof Lifecycle Cost Tool user guide &middot; Example figures generated from model data ${D.builtOn}</div>
</body></html>`;

const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'load' });
mkdirSync(dirname(OUT), { recursive: true });
await page.pdf({ path: OUT, format: 'Letter', printBackground: true, preferCSSPageSize: true,
  displayHeaderFooter: true, headerTemplate: '<span></span>',
  footerTemplate: '<div style="width:100%;font:8px Arial;color:#5E6A73;text-align:right;padding:0 0.6in">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>' });
await browser.close();
console.log('Built ' + OUT.replace(ROOT + '/', ''));
