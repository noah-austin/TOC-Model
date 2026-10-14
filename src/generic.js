/*
 * PAX generic cost curves: the average cost of one commercial roof from new to
 * replacement, with and without PaxSeal planned maintenance.
 *
 * Separate from the custom tool (src/engine.js). There are no rep inputs: every
 * number comes from the research averages in data/generic_curves.json, combined by
 * scripts/build_generic.mjs into one parameter set per market x building type x
 * roof type (plus "all" averages). All dollars are today's dollars, so curves for
 * a 15-year coating and a 45-year metal roof can be compared on the same footing.
 *
 * Works in the browser (window.PaxGeneric) and in Node.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PaxGeneric = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /*
   * p: {
   *   area            typical roof area for the building type, sq ft
   *   costPerSqft     installed cost of a new roof, $/sq ft (market x roof type)
   *   lifeReactive    years to replacement with repairs only when it leaks
   *   lifeAdded       years PaxSeal adds
   *   fee             PaxSeal fee per year, $ (flat in today's dollars)
   *   leakMultiplier  cost of a leak in this building type vs a warehouse
   *   stormPct        expected storm damage to the roof per year, % of its cost
   *   repairBurden    repair need for this building type vs average (rooftop equipment, traffic)
   *   repair: { base, peakAdd, beta, xCap, reactiveMultiplier, feeCovers, stormReactiveMultiplier }
   * }
   *
   * Repair need per year, as a share of the roof's cost, follows a wear-out curve on
   * the roof's own clock (x = age / life): base + peakAdd * x^beta. Low while new, rising
   * steeply near end of life (data/generic_curves.json, from docs/research/generic-curves.md).
   * PaxSeal stretches the same curve over a longer life, so at any age it sits lower.
   * Reactive repairs cost reactiveMultiplier times more (emergency call-outs, damage
   * spreading before it is found) and more again where a leak does more harm.
   */
  function scenario(p, planned) {
    var R = p.repair;
    var C = p.area * p.costPerSqft;
    var life = Math.max(1, Math.round(planned ? p.lifeReactive + p.lifeAdded : p.lifeReactive));
    // The curve's level is calibrated on roofs that last about 20 years; a 35-year metal
    // roof spreads its repairs over more years, a 10-year coating over fewer.
    var lifeScale = Math.min(1.5, Math.max(0.5, 20 / p.lifeReactive));
    var years = [];
    var cum = [C];
    var run = C;
    for (var a = 1; a <= life; a++) {
      var x = Math.min((a - 0.5) / life, R.xCap);
      var need = C * (R.base + R.peakAdd * Math.pow(x, R.beta)) * p.repairBurden * lifeScale;
      var y = {
        age: a,
        fee: planned ? p.fee : 0,
        repairs: planned ? need * (1 - R.feeCovers) : need * R.reactiveMultiplier * p.leakMultiplier,
        storm: C * (p.stormPct / 100) * (planned ? 1 : R.stormReactiveMultiplier)
      };
      y.total = y.fee + y.repairs + y.storm;
      run += y.total;
      years.push(y);
      cum.push(run);
    }
    var sum = function (k) { return years.reduce(function (s, y) { return s + y[k]; }, 0); };
    return {
      life: life,
      install: C,
      years: years,
      cumulative: cum,             // index = roof age; [0] is the install cost
      fees: sum('fee'),
      repairs: sum('repairs'),
      storm: sum('storm'),
      lifetime: run,               // install + every cost until replacement
      perYear: run / life,         // the fair comparison: cost per year of roof life
      perSqftYear: run / life / p.area
    };
  }

  function curve(p) {
    var reactive = scenario(p, false);
    var paxseal = scenario(p, true);
    var savingPerYear = reactive.perYear - paxseal.perYear;
    return {
      params: p,
      reactive: reactive,
      paxseal: paxseal,
      kpis: {
        lifeReactive: reactive.life,
        lifePaxseal: paxseal.life,
        lifeAdded: paxseal.life - reactive.life,
        savingPerYear: savingPerYear,
        savingPerSqftYear: savingPerYear / p.area,
        savingPct: reactive.perYear ? savingPerYear / reactive.perYear : 0,
        // Over one PaxSeal roof life, a reactive owner pays its yearly rate for the same
        // span (part of a second roof included).
        savingOverPaxsealLife: savingPerYear * paxseal.life,
        unplannedAvoided: (reactive.repairs + reactive.storm) / reactive.life * paxseal.life -
                          (paxseal.repairs + paxseal.storm)
      }
    };
  }

  // Average several parameter sets (weights optional). Used for the "All" options.
  function blend(list, weights) {
    var w = weights || list.map(function () { return 1; });
    var tw = w.reduce(function (s, x) { return s + x; }, 0);
    var avg = function (get) { return list.reduce(function (s, p, i) { return s + get(p) * w[i]; }, 0) / tw; };
    var r0 = list[0].repair;
    var repair = {};
    for (var k in r0) repair[k] = avg(function (p) { return p.repair[k]; });
    return {
      area: avg(function (p) { return p.area; }),
      costPerSqft: avg(function (p) { return p.costPerSqft; }),
      lifeReactive: avg(function (p) { return p.lifeReactive; }),
      lifeAdded: avg(function (p) { return p.lifeAdded; }),
      fee: avg(function (p) { return p.fee; }),
      leakMultiplier: avg(function (p) { return p.leakMultiplier; }),
      repairBurden: avg(function (p) { return p.repairBurden; }),
      stormPct: avg(function (p) { return p.stormPct; }),
      repair: repair
    };
  }

  return { scenario: scenario, curve: curve, blend: blend };
});
