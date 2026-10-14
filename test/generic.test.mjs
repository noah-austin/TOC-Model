// Generic cost curves: every combination computes, curves are well-formed, and
// PaxSeal behaves as the method says (longer life, flatter wear curve).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { genericParams } from '../scripts/build_generic.mjs';
const G = createRequire(import.meta.url)('../src/generic.js');
const { params, markets, types, systems } = genericParams();

test('one curve for every market x type x roof type, plus "all" averages', () => {
  assert.equal(Object.keys(params).length, (markets.length + 1) * (types.length + 1) * (systems.length + 1));
  assert.equal(markets.length, 5);
  assert.equal(types.length, 7);
  assert.equal(systems.length, 6);
});

test('every curve is finite, starts at the install cost and only rises', () => {
  for (const [k, p] of Object.entries(params)) {
    const r = G.curve(p);
    for (const s of [r.reactive, r.paxseal]) {
      assert.equal(s.cumulative.length, s.life + 1, k);
      assert.ok(Math.abs(s.cumulative[0] - p.area * p.costPerSqft) < 1e-6, k);
      for (let a = 1; a < s.cumulative.length; a++) assert.ok(s.cumulative[a] > s.cumulative[a - 1], k);
      assert.ok(Number.isFinite(s.perYear) && s.perYear > 0, k);
      assert.ok(Math.abs(s.lifetime - (s.install + s.fees + s.repairs + s.storm)) < 1e-6, k);
    }
    assert.ok(r.paxseal.life > r.reactive.life, k);
  }
});

test('repairs climb with age in both scenarios', () => {
  const r = G.curve(params['all|all|all']);
  for (const s of [r.reactive, r.paxseal]) assert.ok(s.years.at(-1).repairs > s.years[0].repairs);
});

test('"all" averages sit inside the range of their parts', () => {
  const all = G.curve(params['all|industrial|tpo']).reactive.perSqftYear;
  const parts = markets.map((m) => G.curve(params[`${m}|industrial|tpo`]).reactive.perSqftYear);
  assert.ok(all >= Math.min(...parts) - 1e-9 && all <= Math.max(...parts) + 1e-9);
});
