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
  const k = E.run(base, D).kpis;
  assert.equal(k.reactiveReplacementYear, 15);
  assert.equal(k.plannedReplacementYear, 20);
});

test('late-started maintenance earns only part of the life extension', () => {
  const k = E.run({ ...base, roofAge: 10 }, D).kpis;   // 5 yrs reactive remaining, +2.5 yrs planned
  assert.equal(k.reactiveReplacementYear, 5);
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

test('net cost = total spend minus residual value', () => {
  const r = E.run(base, D);
  for (const s of [r.planned, r.reactive]) assert.ok(Math.abs(s.netCost - (s.totalSpend - s.residualValue)) < 1e-6);
});
