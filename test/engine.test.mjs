import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const E = require('../src/engine.js');
const D = require('../data/model_defaults.json');

const base = { market: 'san-antonio', propertyType: 'industrial', area: 20000, roofAge: 0, replacementCost: 100000 };

test('every market produces finite, positive savings for a new roof', () => {
  for (const market of Object.keys(D.markets)) {
    const k = E.run({ ...base, market }, D).kpis;
    for (const v of [k.plannedNetCost, k.reactiveNetCost, k.savings, k.assetValueProtected]) assert.ok(Number.isFinite(v));
    assert.ok(k.savings > 0, market);
  }
});

test('planned maintenance delays replacement', () => {
  const k = E.run(base, D).kpis;              // new TPO: 15 yrs reactive, 20 maintained
  assert.equal(k.reactiveReplacementYear, 16); // serves years 1-15, replaced in year 16
  assert.equal(k.plannedReplacementYear, null); // lasts through year 20
});

test('late-started maintenance earns only part of the life extension', () => {
  const k = E.run({ ...base, roofAge: 10 }, D).kpis;   // 5 yrs reactive remaining, +2.5 yrs planned
  assert.equal(k.reactiveReplacementYear, 6);
  assert.equal(k.plannedReplacementYear, 8);
});

test('worn-out roof is replaced in year 1 under both scenarios', () => {
  const k = E.run({ ...base, roofAge: 25 }, D).kpis;
  assert.equal(k.reactiveReplacementYear, 1);
  assert.equal(k.plannedReplacementYear, 1);
});

test('poor condition shortens remaining life', () => {
  const good = E.run({ ...base, roofAge: 5 }, D).kpis;
  const poor = E.run({ ...base, roofAge: 5, condition: 'poor' }, D).kpis;
  assert.ok(poor.reactiveReplacementYear < good.reactiveReplacementYear);
});

test('replacement curve compounds at the escalation rate', () => {
  const r = E.run({ ...base, escalation: 5 }, D);
  assert.equal(r.replacementCurve.length, 21);
  assert.ok(Math.abs(r.replacementCurve[20] - 100000 * 1.05 ** 20) < 1e-6);
});

test('replacement cost defaults to area x market $/sq ft', () => {
  const r = E.run({ market: 'laurel', area: 10000, system: 'tpo' }, D);
  assert.equal(r.inputs.replacementCost, 10000 * D.markets.laurel.replacementCostPerSqft.tpo.value);
});

test('fee defaults to base + per-sq-ft formula and flags as estimate', () => {
  const r = E.run({ ...base, area: 50000 }, D);
  assert.equal(r.inputs.annualFee, D.fee.baseUsd + D.fee.perSqftUsd * 50000);
  assert.equal(r.inputs.feeIsEstimate, true);
  assert.equal(E.run({ ...base, annualFee: 5000 }, D).inputs.feeIsEstimate, false);
});

test('higher fee lowers savings', () => {
  const a = E.run({ ...base, annualFee: 2000 }, D).kpis.savings;
  const b = E.run({ ...base, annualFee: 6000 }, D).kpis.savings;
  assert.ok(b < a);
});

test('net cost = spending + current roof value used - roof life left', () => {
  const r = E.run(base, D);
  for (const s of [r.planned, r.reactive]) assert.ok(Math.abs(s.netCost - (s.totalSpend + s.openingValue - s.residualValue)) < 1e-6);
  assert.equal(r.planned.openingValue, r.reactive.openingValue);
});

test('owner-occupied types show no property value unless a cap rate is entered', () => {
  for (const propertyType of ['k12', 'medical']) {
    const k = E.run({ ...base, propertyType }, D).kpis;
    assert.equal(k.assetValueProtected, null, propertyType);
    assert.ok(k.unplannedSpendAvoided > 0);
    assert.ok(E.run({ ...base, propertyType, capRate: 6.5 }, D).kpis.assetValueProtected > 0);
  }
});

test('income property types get a market cap rate and property value', () => {
  for (const propertyType of ['industrial', 'office', 'retail', 'multifamily', 'mixed']) {
    const r = E.run({ ...base, propertyType }, D);
    assert.ok(r.inputs.capRatePct > 0, propertyType);
    assert.ok(r.kpis.assetValueProtected > 0, propertyType);
  }
});

test('higher leak consequences raise reactive cost, not planned cost', () => {
  const w = E.run({ ...base, propertyType: 'industrial' }, D);
  const h = E.run({ ...base, propertyType: 'medical' }, D);
  assert.ok(h.inputs.leakMultiplier > w.inputs.leakMultiplier);
  assert.ok(Math.abs(h.kpis.plannedNetCost - w.kpis.plannedNetCost) < 1e-6);
  assert.ok(h.kpis.reactiveNetCost > w.kpis.reactiveNetCost);
});

// Sweep every market, property type, system, age and condition at a realistic size.
const sweep = [];
for (const market of Object.keys(D.markets)) for (const propertyType of Object.keys(D.propertyTypes))
  for (const system of Object.keys(D.systems)) for (const roofAge of [0, 5, 10, 15, 20, 30])
    for (const condition of ['good', 'fair', 'poor']) sweep.push({ market, propertyType, system, roofAge, condition, area: 40000 });

test('sweep: no NaN, no negative net cost, savings % stays within 0-100%', () => {
  for (const p of sweep) {
    const k = E.run(p, D).kpis, tag = JSON.stringify(p);
    for (const v of [k.plannedNetCost, k.reactiveNetCost, k.savings, k.npvSavings, k.annualNoiGain]) assert.ok(Number.isFinite(v), tag);
    assert.ok(k.plannedNetCost > 0 && k.reactiveNetCost > 0, tag);
    assert.ok(k.savingsPct < 1, tag);
  }
});

test('sweep: savings range brackets the estimate', () => {
  for (const p of sweep.filter((_, i) => i % 7 === 0)) {
    const k = E.run(p, D).kpis;
    assert.ok(k.savingsRange.low <= k.savings + 1e-6 && k.savingsRange.high >= k.savings - 1e-6, JSON.stringify(p));
  }
});

test('a rep-entered total replacement cost sets the implied $/sq ft', () => {
  const r = E.run({ market: 'austin', area: 20000, replacementCost: 300000 }, D);
  assert.equal(r.inputs.replacementCost, 300000);
  assert.equal(r.inputs.costPerSqft, 15);
});

test('life added is capped at half the design life', () => {
  const k = E.run({ ...base, system: 'coating_restoration' }, D, { lifeExtensionYears: 15 }).kpis;
  assert.equal(k.lifeExtensionYears, D.systems.coating_restoration.lifeYears / 2);
});

test('a worn-out roof is replaced in year 1 even when the condition is poor', () => {
  const k = E.run({ ...base, roofAge: 18, condition: 'poor' }, D).kpis;
  assert.equal(k.reactiveReplacementYear, 1);
});

// PAX overrides (data/overrides.json, edited on the Assumptions page)
const PO = require('../src/overrides.js');

test('overrides replace research defaults and are tagged as PAX adjustments', () => {
  const d = PO.apply(D, {
    systems: { mod_bit: { lifeYears: 18 } },
    propertyTypes: { k12: { leakMultiplier: 1.5 } },
    markets: { austin: { capRates: { office: 8 }, replacementCostPerSqft: { tpo: 12.5 }, stormLossPct: 0.5 } },
    fee: { baseUsd: 1000 }, escalationPct: 4,
  });
  assert.equal(d.systems.mod_bit.lifeYears, 18);
  assert.equal(d.propertyTypes.k12.leakMultiplier, 1.5);
  assert.deepEqual(d.markets.austin.capRates.office, { value: 8, source: PO.TAG, confidence: 'pax' });
  assert.equal(d.markets.austin.replacementCostPerSqft.tpo.value, 12.5);
  assert.equal(d.fee.baseUsd, 1000);
  assert.equal(d.escalationPct, 4);
  const r = E.run({ market: 'austin', propertyType: 'office', area: 40000 }, d);
  assert.equal(r.inputs.capRatePct, 8);
  assert.equal(r.inputs.costPerSqft, 12.5);
  assert.equal(r.inputs.stormLossPct, 0.5);
  assert.equal(D.systems.mod_bit.lifeYears, 20, 'base defaults are not modified');
});

test('config overrides reach the engine, and builder overrides still win', () => {
  const d = PO.apply(D, { config: { reactiveRepairMultiplier: 2.5 } });
  assert.equal(E.run(base, d).config.reactiveRepairMultiplier, 2.5);
  assert.equal(E.run(base, d, { reactiveRepairMultiplier: 4 }).config.reactiveRepairMultiplier, 4);
});

test('mixed-use cap rate re-blends when its inputs are adjusted', () => {
  const before = D.markets.laurel.capRates.mixed_use.value;
  const d = PO.apply(D, { markets: { laurel: { capRates: { retail: 9 } } } });
  assert.ok(d.markets.laurel.capRates.mixed_use.value > before);
});
