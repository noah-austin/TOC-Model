// Generic cost curves: a separate section of the site, with no rep inputs.
//
//   data/generic_curves.json  research averages (roof life by system, climate adjustments,
//                             repair curve, typical building sizes, sources)
//   + market costs and storm exposure, property-type leak costs and the fee formula
//     from data/model_defaults.json (the same market research the custom tool uses)
//   ->  one parameter set per market x building type x roof type, plus "all" averages
//   ->  dist/generic/index.html (self-contained; src/generic.js draws the curves)
//
// Run by scripts/build.mjs, so every build and deploy includes it.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { NAV_CSS, navHtml } from './nav.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));
const require = createRequire(import.meta.url);
const G = require(join(ROOT, 'src/generic.js'));

export function genericParams() {
  const D = readJson('data/model_defaults.json');
  const R = readJson('data/generic_curves.json');
  const markets = Object.keys(D.markets);
  const types = Object.keys(R.typicalArea).filter((t) => D.propertyTypes[t]);
  const systems = Object.keys(R.systems);

  // Storm loss to the roof: the custom tool's FEMA NRI method (or the PAX override).
  const storm = (m) => typeof m.stormLossPctOverride === 'number' ? m.stormLossPctOverride
    : m.nriBuildingLossPct * R.storm.roofDamageShare / R.storm.roofValueShare;

  const one = (mk, ty, sy) => {
    const m = D.markets[mk], sys = R.systems[sy], area = R.typicalArea[ty];
    const adj = ((R.marketLifeAdjustPct[mk] || {})[sy] || 0) + (R.types[ty]?.lifeAdjustPct || 0);
    return {
      area,
      costPerSqft: m.replacementCostPerSqft[sy].value,
      lifeReactive: sys.lifeReactive * (1 + adj / 100),
      lifeAdded: sys.lifeAdded,
      fee: D.fee.baseUsd + D.fee.perSqftUsd * area,
      leakMultiplier: D.propertyTypes[ty].leakMultiplier || 1,
      repairBurden: R.types[ty]?.repairBurden || 1,
      stormPct: storm(m),
      repair: { ...R.repair },
    };
  };

  const params = {};
  const pick = (v, all) => (v === 'all' ? all : [v]);
  for (const mk of ['all', ...markets]) for (const ty of ['all', ...types]) for (const sy of ['all', ...systems]) {
    const list = [], w = [];
    for (const a of pick(mk, markets)) for (const b of pick(ty, types)) for (const c of pick(sy, systems)) {
      list.push(one(a, b, c));
      w.push(sy === 'all' ? R.systemWeights[c] : 1);
    }
    params[`${mk}|${ty}|${sy}`] = list.length === 1 ? list[0] : G.blend(list, w);
  }
  return { D, R, markets, types, systems, params };
}

export function buildGeneric(fonts) {
  const { D, R, markets, types, systems, params } = genericParams();
  const data = {
    researchedOn: R.researchedOn,
    fee: D.fee,
    markets: markets.map((id) => ({ id, label: D.markets[id].shortName.replace(' (N. Virginia)', '') })),
    types: types.map((id) => ({ id, label: D.propertyTypes[id].label })),
    systems: systems.map((id) => ({ id, label: R.systems[id].label })),
    params,
    commonness: R.commonness,
    lives: Object.fromEntries(systems.map((s) => [s, R.systems[s]])),
    typeFactors: Object.fromEntries(types.map((t) => [t, { ...R.types[t], leakMultiplier: D.propertyTypes[t].leakMultiplier || 1 }])),
    repair: R.repair,
    systemWeights: R.systemWeights,
    marketLifeAdjustPct: R.marketLifeAdjustPct,
    method: R.method,
    sources: R.sources,
  };
  const ICON_LINK = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6.5 9.5l3-3M7 4.5l1-1a2.5 2.5 0 013.5 3.5l-1 1M9 11.5l-1 1A2.5 2.5 0 014.5 9l1-1"/></svg>';
  const ICON_PRINT = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 6V2h8v4M4 12H2.5V6.5h11V12H12M4 9.5h8V14H4z"/></svg>';
  const actions = `<span class="toast" id="toast" role="status"></span><button type="button" class="btn" id="copy-link">${ICON_LINK}<span class="opt">Copy link</span></button><button type="button" class="btn primary" id="print">${ICON_PRINT}<span class="opt">Print</span></button>`;
  const html = readFileSync(join(ROOT, 'src/generic.template.html'), 'utf8')
    .replace('/*__FONTS__*/', () => fonts)
    .replace('/*__NAVCSS__*/', () => NAV_CSS)
    .replace('<!--__NAV__-->', () => navHtml('generic', '../', actions))
    .replace('/*__ENGINE__*/', () => readFileSync(join(ROOT, 'src/generic.js'), 'utf8'))
    .replace('/*__DATA__*/', () => 'window.GENERIC_DATA = ' + JSON.stringify(data).replace(/</g, '\\u003c') + ';');
  mkdirSync(join(ROOT, 'dist/generic'), { recursive: true });
  writeFileSync(join(ROOT, 'dist/generic/index.html'), html);
  return Object.keys(params).length;
}
