// Build step:
//   1. data/markets/*.json + data/national.json  ->  data/model_defaults.json
//   2. src/report.template.html + src/engine.js + defaults + fonts  ->  dist/index.html
//      (one self-contained file, no CDN, safe to email or host on Azure SWA)
//
// Usage: node scripts/build.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));

// PAX markets, in picker order. `region` groups them in the market picker;
// `perils` is a short rep-readable summary curated from docs/research/<id>.md.
// A market whose data/markets/<id>.json doesn't exist yet is skipped.
const MARKETS = [
  { id: 'austin', shortName: 'Austin', region: 'Texas', perils: {
    headline: 'Hail and tornado',
    events: '~9 days with 2"+ hail somewhere in Travis County per 20 years (NOAA 1996–2025)' } },
  { id: 'san-antonio', shortName: 'San Antonio', region: 'Texas', perils: {
    headline: 'Hail and tornado',
    events: 'Baseball-size hail somewhere in Bexar County about once every 3 years (NOAA); April 2016 storm ≈ $1.4B damage' } },
  { id: 'waco', shortName: 'Waco', region: 'Texas', perils: null },
  { id: 'west-palm-beach', shortName: 'West Palm Beach', region: 'Florida', perils: null },
  { id: 'hampton-roads', shortName: 'Hampton Roads', region: 'Virginia', perils: {
    headline: 'Hurricane / tropical-storm wind',
    events: '~4.8 tropical storms or stronger within 50 nm of Norfolk per 20 years (NOAA HURDAT2 1975–2024)' } },
  { id: 'culbertson', shortName: 'Culbertson (N. Virginia)', region: 'Virginia', perils: {
    headline: 'Thunderstorm wind / derecho, snow and ice',
    events: 'Strong wind and winter weather both rated Relatively High (FEMA NRI); tropical remnants ~1 per 12 years' } },
  { id: 'laurel', shortName: 'Laurel', region: 'Maryland', perils: {
    headline: 'Thunderstorm wind / derecho, snow load',
    events: '~3.5 major regional roof-damaging events per 20 years (2010 snow, 2012 derecho, 2016 blizzard)' } },
  { id: 'millersville', shortName: 'Millersville', region: 'Maryland', perils: {
    headline: 'Thunderstorm wind, tropical remnants, bay flooding',
    events: '~2.8 tropical storms within 50 nm of Annapolis per 20 years (NOAA HURDAT2 1975–2024); Isabel (2003) set the Annapolis flood record' } },
].filter((m) => existsSync(join(ROOT, `data/markets/${m.id}.json`)));
const MARKET_IDS = MARKETS.map((m) => m.id);
const SYSTEMS = ['tpo', 'epdm', 'mod_bit', 'bur', 'metal', 'coating_restoration'];
const CAP_KEYS = ['industrial', 'office', 'retail'];
// NRI hazards that damage roofs. Flooding, heat and lightning are excluded.
const ROOF_PERILS = ['hail', 'strong_wind', 'tornado', 'hurricane', 'winter_weather', 'ice_storm'];

const median = (xs) => {
  const s = xs.filter((x) => typeof x === 'number').sort((a, b) => a - b);
  if (!s.length) return null;
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

function buildDefaults() {
  const national = readJson('data/national.json');
  const markets = Object.fromEntries(MARKET_IDS.map((id) => [id, readJson(`data/markets/${id}.json`)]));

  // Cross-market medians, used when a market's own value is missing.
  const sysMedian = Object.fromEntries(SYSTEMS.map((s) =>
    [s, median(MARKET_IDS.map((id) => markets[id].replacement_cost_per_sqft?.[s]?.value))]));
  const capMedian = Object.fromEntries(CAP_KEYS.map((k) =>
    [k, median(MARKET_IDS.map((id) => markets[id].cap_rates?.[k]?.value))]));

  const out = {};
  for (const { id, shortName, region, perils } of MARKETS) {
    const m = markets[id];
    const nri = m.fema_nri;
    const exposure = nri.building_exposure_usd ?? nri.building_value_usd;
    const eal = ROOF_PERILS.reduce((a, h) => a + (nri.hazards?.[h]?.eal_building_usd || 0), 0);

    const replacementCostPerSqft = {};
    for (const s of SYSTEMS) {
      const v = m.replacement_cost_per_sqft?.[s];
      replacementCostPerSqft[s] = typeof v?.value === 'number'
        ? { value: v.value, source: 'market', confidence: v.confidence || 'low' }
        : { value: sysMedian[s], source: 'fallback: median of other markets', confidence: 'low' };
    }
    const capRates = {};
    for (const k of CAP_KEYS) {
      const v = m.cap_rates?.[k];
      capRates[k] = typeof v?.value === 'number'
        ? { value: v.value, source: 'market', confidence: v.confidence || 'low' }
        : { value: capMedian[k], source: 'fallback: median of other markets', confidence: 'low' };
    }

    out[id] = {
      id,
      name: m.name,
      shortName,
      region,
      nriCounty: nri.county,
      nriVersion: nri.nri_version || null,
      nriOverall: nri.overall_risk_rating,
      nriRatings: Object.fromEntries(ROOF_PERILS.map((h) => {
        const r = nri.hazards?.[h]?.rating;
        return [h, r && !/No Rating|Not Applicable|Insufficient/i.test(r) ? r : null];
      })),
      // Expected annual building loss from roof-relevant perils, % of county building value.
      nriBuildingLossPct: exposure ? (eal / exposure) * 100 : 0,
      perils: perils || { headline: 'Storm exposure', events: 'See FEMA National Risk Index ratings below' },
      replacementCostPerSqft,
      capRates,
    };
  }

  const life = national.roof_life_years_by_system;
  const fee = national.maintenance_program_pricing.recommended_paxseal_fee_formula.roof_only;
  return {
    builtOn: new Date().toISOString().slice(0, 10),
    defaultMarket: 'san-antonio',
    defaultArea: 20000,
    escalationPct: national.cost_escalation.annual_pct_20yr.value,
    fee: { baseUsd: fee.base_fee_usd_yr.value, perSqftUsd: fee.per_sqft_usd_yr.value },
    systems: {
      tpo: { label: 'TPO', lifeYears: life.tpo.value },
      epdm: { label: 'EPDM', lifeYears: life.epdm.value },
      mod_bit: { label: 'Modified Bitumen', lifeYears: life.mod_bit.value },
      bur: { label: 'Built-Up (BUR)', lifeYears: life.bur.value },
      metal: { label: 'Metal', lifeYears: life.metal.value },
      coating_restoration: { label: 'Coating / Restoration', lifeYears: life.coating_restoration.value },
    },
    propertyTypes: {
      industrial: { label: 'Warehouse / Industrial', capRateKey: 'industrial', status: 'v1' },
      office: { label: 'Office', capRateKey: 'office', status: 'v1' },
      retail: { label: 'Retail', capRateKey: 'retail', status: 'v1' },
      medical: { label: 'Medical / Institutional', capRateKey: null, status: 'in development' },
      k12: { label: 'K-12 / Education', capRateKey: null, status: 'in development' },
      multifamily: { label: 'Multi-Family', capRateKey: null, status: 'in development' },
      mixed: { label: 'Mixed Use', capRateKey: null, status: 'in development' },
    },
    markets: out,
  };
}

const defaults = buildDefaults();
writeFileSync(join(ROOT, 'data/model_defaults.json'), JSON.stringify(defaults, null, 2) + '\n');

// Montserrat (SIL OFL, from @fontsource/montserrat), embedded so the report
// needs no network access. Falls back to Arial if a weight is missing.
const fonts = [400, 600, 700, 800].map((w) => {
  const b64 = readFileSync(join(ROOT, `src/fonts/montserrat-latin-${w}-normal.woff2`)).toString('base64');
  return `@font-face{font-family:Montserrat;font-style:normal;font-display:swap;font-weight:${w};src:url(data:font/woff2;base64,${b64}) format('woff2');}`;
}).join('\n');

const template = readFileSync(join(ROOT, 'src/report.template.html'), 'utf8');
const engine = readFileSync(join(ROOT, 'src/engine.js'), 'utf8');
const html = template
  .replace('/*__FONTS__*/', () => fonts)
  .replace('/*__ENGINE__*/', () => engine)
  .replace('/*__DEFAULTS__*/', () => 'window.PAX_DEFAULTS = ' + JSON.stringify(defaults) + ';');
mkdirSync(join(ROOT, 'dist'), { recursive: true });
writeFileSync(join(ROOT, 'dist/index.html'), html);
console.log('Built data/model_defaults.json and dist/index.html');
