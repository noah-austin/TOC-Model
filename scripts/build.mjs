// Build step:
//   1. data/markets/*.json + data/national.json  ->  data/model_defaults.json
//   2. src/report.template.html + src/engine.js + defaults + fonts  ->  dist/index.html
//      (one self-contained file, no CDN, safe to email or host on Azure SWA)
//
// Usage: node scripts/build.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { NAV_CSS, navHtml } from './nav.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));

// PAX markets, in picker order. `region` groups them in the market picker;
// `perils` is a short rep-readable summary curated from docs/research/<id>.md.
// A market whose data/markets/<id>.json doesn't exist yet is skipped.
const MARKETS = [
  { id: 'austin', shortName: 'Austin', region: 'Texas', perils: {
    headline: 'Hail and tornado',
    events: 'About 9 days with hail 2 inches or larger somewhere in Travis County per 20 years (NOAA 1996–2025)' } },
  { id: 'san-antonio', shortName: 'San Antonio', region: 'Texas', perils: {
    headline: 'Hail and tornado',
    events: 'Baseball-size hail somewhere in Bexar County about once every 3 years (NOAA); April 2016 storm ≈ $1.4B damage' } },
  { id: 'hampton-roads', shortName: 'Hampton Roads', region: 'Virginia', perils: {
    headline: 'Hurricane / tropical-storm wind',
    events: 'About 4.8 tropical storms or stronger within 50 nautical miles of Norfolk per 20 years (NOAA HURDAT2 1975–2024)' } },
  { id: 'culbertson', shortName: 'Culbertson (N. Virginia)', region: 'Virginia', perils: {
    headline: 'Thunderstorm wind / derecho, snow and ice',
    events: 'Strong wind and winter weather are both rated Relatively High by FEMA, and tropical storm remnants arrive about once every 12 years' } },
  { id: 'laurel', shortName: 'Laurel', region: 'Maryland', perils: {
    headline: 'Thunderstorm wind / derecho, snow load',
    events: 'About 3–4 major regional roof-damaging events per 20 years, such as the 2010 snowstorms, the 2012 derecho and the 2016 blizzard' } },
].filter((m) => existsSync(join(ROOT, `data/markets/${m.id}.json`)));
const MARKET_IDS = MARKETS.map((m) => m.id);
const SYSTEMS = ['tpo', 'epdm', 'mod_bit', 'bur', 'metal', 'coating_restoration'];
const CAP_KEYS = ['industrial', 'office', 'retail', 'multifamily', 'medical_office', 'mixed_use'];
// NRI hazards that damage roofs. Flooding, heat and lightning are excluded.
const ROOF_PERILS = ['hail', 'strong_wind', 'tornado', 'hurricane', 'winter_weather', 'ice_storm'];


// Property types. Research values (leak-consequence multipliers, extra cap rates)
// come from data/property_types.json; `story` is the type-specific takeaway on page 2.
const PROPERTY_TYPES = [
  { id: 'industrial', noun: 'warehouse', label: 'Warehouse / Industrial', capRateKey: 'industrial' },
  { id: 'office', noun: 'office building', label: 'Office', capRateKey: 'office' },
  { id: 'retail', noun: 'retail center', label: 'Retail', capRateKey: 'retail' },
  { id: 'multifamily', noun: 'apartment property', label: 'Multi-Family', capRateKey: 'multifamily',
    story: '<b>Fewer unit turns.</b> A leak into an apartment means displaced residents, mold risk and lost rent. Early repairs keep units occupied.' },
  { id: 'mixed', noun: 'mixed-use building', label: 'Mixed Use', capRateKey: 'mixed_use',
    story: '<b>Both income streams protected.</b> A leak can close the ground-floor retail and damage the offices or apartments above.' },
  { id: 'medical', noun: 'medical facility', label: 'Medical / Institutional', capRateKey: null,
    story: '<b>Patient care keeps running.</b> A leak in a clinical area triggers infection-control work, closes rooms and can damage equipment.' },
  { id: 'k12', noun: 'school', label: 'K-12 / Education', capRateKey: null,
    story: '<b>A predictable budget line.</b> Emergency repairs become a fixed annual cost the board can plan for, and leaks stop closing classrooms.' },
];
const propertyResearch = existsSync(join(ROOT, 'data/property_types.json')) ? readJson('data/property_types.json') : { types: {}, cap_rates_by_market: {} };
function buildPropertyTypes() {
  return Object.fromEntries(PROPERTY_TYPES.map((t) => {
    const r = propertyResearch.types?.[t.id] || {};
    const m = r.leak_consequence_multiplier;
    return [t.id, {
      label: t.label,
      noun: t.noun,
      status: 'v1',
      capRateKey: t.capRateKey,
      leakMultiplier: typeof m?.value === 'number' ? m.value : 1,
      leakConfidence: m?.confidence || null,
      leakBasis: t.id === 'industrial' ? null : 'Scales reactive repairs. Ranking backed by school, hospital and insurer water-damage evidence; values estimated',
      story: t.story || null,
    }];
  }));
}

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
    [k, median(MARKET_IDS.map((id) => (markets[id].cap_rates?.[k] ?? propertyResearch.cap_rates_by_market?.[id]?.[k])?.value))]));

  // Replacement costs track local labor and materials, so prefer same-state markets.
  // Needs at least two same-state values, so one market's number is never copied as-is.
  const regionMedian = (s, region) => {
    const vals = MARKETS.filter((m) => m.region === region)
      .map((m) => markets[m.id].replacement_cost_per_sqft?.[s]?.value).filter((v) => typeof v === 'number');
    return vals.length >= 2 ? median(vals) : null;
  };

  const out = {};
  for (const { id, shortName, region, perils } of MARKETS) {
    const m = markets[id];
    const nri = m.fema_nri;
    const exposure = nri.building_value_usd;
    const eal = ROOF_PERILS.reduce((a, h) => a + (nri.hazards?.[h]?.eal_building_usd || 0), 0);

    const replacementCostPerSqft = {};
    for (const s of SYSTEMS) {
      const v = m.replacement_cost_per_sqft?.[s];
      replacementCostPerSqft[s] = typeof v?.value === 'number'
        ? { value: v.value, source: 'market', confidence: v.confidence || 'low' }
        : regionMedian(s, region) != null
          ? { value: regionMedian(s, region), source: `fallback: median of other ${region} markets`, confidence: 'low' }
          : { value: sysMedian[s], source: 'fallback: median of other markets', confidence: 'low' };
    }
    const capRates = {};
    for (const k of CAP_KEYS) {
      const v = m.cap_rates?.[k] ?? propertyResearch.cap_rates_by_market?.[id]?.[k];
      capRates[k] = typeof v?.value === 'number'
        ? { value: v.value, source: 'market', confidence: v.confidence || 'low' }
        : { value: capMedian[k], source: 'fallback: median of other markets', confidence: 'low' };
    }

    // Mixed use rarely has its own published cap rate. Blend by typical income share:
    // 30% ground-floor retail, 70% split between office and multi-family above
    // (docs/research/property-types.md; the 30% share is a model assumption).
    if (capRates.mixed_use.value == null) {
      const r = capRates.retail.value, o = capRates.office.value, f = capRates.multifamily.value;
      if ([r, o, f].every((x) => typeof x === 'number')) capRates.mixed_use = {
        value: Math.round((0.30 * r + 0.35 * o + 0.35 * f) * 100) / 100,
        source: 'fallback: blend of 30% retail, 35% office and 35% multi-family rates', confidence: 'low' };
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
    propertyTypes: buildPropertyTypes(),
    markets: out,
  };
}

// Research defaults, then PAX adjustments from data/overrides.json (edited on the Assumptions page).
const require = createRequire(import.meta.url);
const PaxOverrides = require(join(ROOT, 'src/overrides.js'));
const E = require(join(ROOT, 'src/engine.js'));
const baseDefaults = buildDefaults();
const overrides = existsSync(join(ROOT, 'data/overrides.json')) ? readJson('data/overrides.json') : {};
const defaults = PaxOverrides.apply(baseDefaults, overrides);
writeFileSync(join(ROOT, 'data/model_defaults.json'), JSON.stringify(defaults, null, 2) + '\n');

// Montserrat (SIL OFL, from @fontsource/montserrat), embedded so the report
// needs no network access. Falls back to Arial if a weight is missing.
const fonts = [400, 600, 700, 800].map((w) => {
  const b64 = readFileSync(join(ROOT, `src/fonts/montserrat-latin-${w}-normal.woff2`)).toString('base64');
  return `@font-face{font-family:Montserrat;font-style:normal;font-display:swap;font-weight:${w};src:url(data:font/woff2;base64,${b64}) format('woff2');}`;
}).join('\n');

const template = readFileSync(join(ROOT, 'src/report.template.html'), 'utf8');
// Report page actions: builder view gets Copy link + Print; a shared link gets Edit + Print.
const ICON = {
  edit: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M11 2.5l2.5 2.5L6 12.5H3.5V10z"/></svg>',
  link: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6.5 9.5l3-3M7 4.5l1-1a2.8 2.8 0 014 4l-1 1M9 11.5l-1 1a2.8 2.8 0 01-4-4l1-1"/></svg>',
  print: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4.5 6V2.5h7V6M4.5 11.5h-2v-5h11v5h-2M4.5 9.5h7v4h-7z"/></svg>',
};
const reportActions =
  '<span class="toast" id="toast" role="status"></span>' +
  `<button type="button" class="btn only-shared" id="editBtn">${ICON.edit}<span>Edit<span class="opt"> report</span></span></button>` +
  `<button type="button" class="btn only-builder" id="linkBtn">${ICON.link}<span>Copy<span class="opt"> report</span> link</span></button>` +
  `<button type="button" class="btn primary" id="printBtn">${ICON.print}<span>Print<span class="opt"> / PDF</span></span></button>`;
const engine = readFileSync(join(ROOT, 'src/engine.js'), 'utf8');
const html = template
  .replace('/*__FONTS__*/', () => fonts)
  .replace('/*__NAVCSS__*/', () => NAV_CSS)
  .replace('<!--__NAV__-->', () => navHtml('builder', '', reportActions))
  .replace('/*__ENGINE__*/', () => engine)
  // Escape '<' so research text can never close the <script> tag early.
  .replace('/*__DEFAULTS__*/', () => 'window.PAX_DEFAULTS = ' + JSON.stringify(defaults).replace(/</g, '\\u003c') + ';');
mkdirSync(join(ROOT, 'dist'), { recursive: true });
writeFileSync(join(ROOT, 'dist/index.html'), html);

// ---------- Assumptions page: every backend number, its research basis, and an editor ----------
const national = readJson('data/national.json');
const research = {
  escalation: national.cost_escalation.annual_pct_20yr,
  fee: national.maintenance_program_pricing.recommended_paxseal_fee_formula.roof_only,
  lifeExtension: national.maintenance_evidence.roof_life_years.life_extension_years,
  repairMultiplier: national.maintenance_evidence.reactive_to_planned_repair_cost_multiplier,
  systems: national.roof_life_years_by_system,
  propertyTypes: Object.fromEntries(Object.entries(propertyResearch.types || {}).map(([k, v]) => [k, v.leak_consequence_multiplier || null])),
  markets: Object.fromEntries(MARKET_IDS.map((id) => {
    const m = readJson(`data/markets/${id}.json`);
    const caps = Object.fromEntries(CAP_KEYS.map((k) => [k, m.cap_rates?.[k] ?? propertyResearch.cap_rates_by_market?.[id]?.[k] ?? null]));
    return [id, { replacementCostPerSqft: m.replacement_cost_per_sqft || {}, capRates: caps,
      nri: { county: m.fema_nri.county, version: m.fema_nri.nri_version, buildingValue: m.fema_nri.building_value_usd,
        hazards: Object.fromEntries(ROOF_PERILS.map((h) => [h, m.fema_nri.hazards?.[h] || null])) } }];
  })),
  libraryProfiles: readJson('data/library_profiles.json'),
};
const page = readFileSync(join(ROOT, 'src/assumptions.template.html'), 'utf8')
  .replace('/*__FONTS__*/', () => fonts)
  .replace('/*__NAVCSS__*/', () => NAV_CSS)
  .replace('<!--__NAV__-->', () => navHtml('assumptions', '../'))
  .replace('/*__ENGINE__*/', () => engine)
  .replace('/*__OVERRIDES_JS__*/', () => readFileSync(join(ROOT, 'src/overrides.js'), 'utf8'))
  .replace('/*__DATA__*/', () => 'window.PAX_DATA = ' + JSON.stringify({ base: baseDefaults, overrides, research, modelConfig: E.MODEL_CONFIG }).replace(/</g, '\\u003c') + ';');
mkdirSync(join(ROOT, 'dist/assumptions'), { recursive: true });
writeFileSync(join(ROOT, 'dist/assumptions/index.html'), page);
console.log('Built data/model_defaults.json, dist/index.html and dist/assumptions/index.html' +
  (Object.keys(overrides).length ? ' (with data/overrides.json)' : ''));
