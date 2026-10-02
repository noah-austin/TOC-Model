/*
 * PAX Roof TCO engine: planned (PaxSeal) vs reactive maintenance, year by year.
 *
 * Pure functions, no DOM. Works in the browser (window.PaxTCO) and in Node
 * (require / import). All tunable assumptions live in MODEL_CONFIG below;
 * market-specific values come from data/model_defaults.json (built from the
 * research files by scripts/build.mjs). See docs/MODEL_SPEC.md for the logic.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PaxTCO = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // MODEL_CONFIG: every coefficient the engine uses. Confidence and source are
  // noted so the report footnote and future calibration can point at them.
  // ---------------------------------------------------------------------------
  var MODEL_CONFIG = {
    horizonYears: 20,

    // Years added to service life by a planned maintenance program.
    // national.json maintenance_evidence.roof_life_years.life_extension_years
    // (NRC Canada roof study; Carlisle Continu-Care +5 yr warranty). Medium.
    lifeExtensionYears: 5,

    // Cost of fixing a defect reactively vs catching it on a planned visit.
    // national.json reactive_to_planned_repair_cost_multiplier. Low (range 1.8-5).
    // Scaled per property type by its leak-consequence multiplier
    // (data/property_types.json): a leak costs more in a hospital than a warehouse.
    reactiveRepairMultiplier: 3.0,

    // Planned-visit repair need for a new roof, % of replacement cost per year,
    // growing with roof age. MODEL ASSUMPTION (low): no traceable source; the
    // widely quoted "1-3% of replacement cost" figure is untraceable.
    baseRepairPctOfReplacement: 1.0,
    repairAgeGrowthPct: 5.0,

    // Share of planned-visit repairs covered by the PaxSeal fee itself (minor
    // repairs up to 4 hrs/visit per the proposal). MODEL ASSUMPTION (low).
    feeCoversRepairShare: 0.5,

    // PaxSeal fee escalation (proposal: annual cost-of-living adjustment).
    // MODEL ASSUMPTION: long-run CPI ~3%.
    feeEscalationPct: 3.0,

    // Storm loss to the roof = county NRI building loss ratio for roof-relevant
    // perils x (roofDamageShare / roofValueShare). Both MODEL ASSUMPTIONS (low):
    // share of building storm damage that is roof damage, and a low-slope
    // roof's replacement cost as a share of total building value.
    roofDamageShare: 0.6,
    roofValueShare: 0.05,

    // Neglected roofs take more damage and have more claims disputed as
    // wear-and-tear. MODEL ASSUMPTION (low).
    reactiveStormMultiplier: 1.5,

    // Current condition shifts effective age (years). MODEL ASSUMPTION (low).
    conditionAgeShift: { good: 0, fair: 2, poor: 4 },

    // Discount rate for the NPV figure (nominal cumulative is the headline).
    discountRatePct: 7.0,

    // Savings range shown beside the headline. Conservative uses the low end of the
    // research ranges in national.json; upside stays below their marketing-sourced
    // high end (5x repair cost, 8 yrs life added).
    rangeScenarios: {
      conservative: { reactiveRepairMultiplier: 1.8, lifeExtensionYears: 3 },
      upside: { reactiveRepairMultiplier: 4.0, lifeExtensionYears: 7 }
    }
  };

  function merge(base, over) {
    var out = {};
    for (var k in base) out[k] = base[k];
    for (var j in over || {}) if (over[j] !== undefined && over[j] !== null && over[j] !== '') out[j] = over[j];
    return out;
  }

  function num(x, fallback) {
    var n = typeof x === 'number' ? x : parseFloat(x);
    return isFinite(n) ? n : fallback;
  }

  /*
   * Resolve rep inputs + market defaults into the exact numbers the model runs on.
   * Any field the rep leaves blank falls back to the market default.
   */
  function resolveInputs(raw, defaults, cfg) {
    cfg = cfg || MODEL_CONFIG;
    var market = defaults.markets[raw.market] || defaults.markets[defaults.defaultMarket];
    var system = raw.system && defaults.systems[raw.system] ? raw.system : 'tpo';
    var propType = raw.propertyType && defaults.propertyTypes[raw.propertyType] ? raw.propertyType : 'industrial';
    var area = num(raw.area, defaults.defaultArea);
    var costPerSqft = num(raw.costPerSqft, market.replacementCostPerSqft[system].value);
    var replacementCost = num(raw.replacementCost, area * costPerSqft);
    var fee = num(raw.annualFee, defaults.fee.baseUsd + defaults.fee.perSqftUsd * area);
    var pt = defaults.propertyTypes[propType];
    // Cap-rate valuation only applies to income property. For owner-occupied types
    // (schools, hospitals) it is off unless the rep enters a cap rate.
    var capDefault = pt.capRateKey && market.capRates[pt.capRateKey] ? market.capRates[pt.capRateKey].value : null;
    var capRate = num(raw.capRate, capDefault);

    return {
      market: market,
      marketId: market.id,
      system: system,
      systemLife: defaults.systems[system].lifeYears,
      propertyType: propType,
      leakMultiplier: num(pt.leakMultiplier, 1),
      area: area,
      costPerSqft: costPerSqft,
      replacementCost: replacementCost,
      roofAge: Math.max(0, num(raw.roofAge, 0)),
      condition: (raw.condition || 'good').toLowerCase(),
      escalationPct: num(raw.escalation, defaults.escalationPct),
      capRatePct: capRate,
      annualFee: fee,
      feeIsEstimate: raw.annualFee === undefined || raw.annualFee === null || raw.annualFee === '',
      stormLossPct: market.nriBuildingLossPct * cfg.roofDamageShare / cfg.roofValueShare
    };
  }

  /*
   * Simulate one scenario. Returns per-year arrays (index 0 = year 1).
   */
  function simulate(inp, cfg, planned) {
    var H = cfg.horizonYears;
    var C = inp.replacementCost;
    var e = inp.escalationPct / 100;
    var L = inp.systemLife;
    var ext = cfg.lifeExtensionYears;
    var fullLife = planned ? L : Math.max(1, L - ext);
    var ageEff = inp.roofAge + (cfg.conditionAgeShift[inp.condition] || 0);

    // Remaining life of the existing roof. Maintenance started late earns only
    // part of the extension: proportional to the share of design life left.
    var reactiveRemaining = Math.max(1, (L - ext) - ageEff);
    var remaining = planned
      ? reactiveRemaining + ext * Math.min(1, Math.max(0, (L - ageEff) / L))
      : reactiveRemaining;

    var rows = [];
    var nextReplace = Math.ceil(remaining);   // year index (1-based) of first replacement
    var roofAge = ageEff;                    // age of roof in place at start of year
    var currentLife = ageEff + remaining;    // total life of roof in place
    var replacements = [];

    for (var t = 1; t <= H; t++) {
      var price = Math.pow(1 + e, t);
      var row = { year: t, fee: 0, repairs: 0, storm: 0, replacement: 0 };

      if (t === nextReplace) {
        row.replacement = C * price;
        replacements.push(t);
        roofAge = 0;
        currentLife = fullLife;
        nextReplace = t + Math.ceil(fullLife);
      } else {
        var repairNeed = C * price * (cfg.baseRepairPctOfReplacement / 100) *
          Math.pow(1 + cfg.repairAgeGrowthPct / 100, roofAge);
        row.repairs = planned ? repairNeed * (1 - cfg.feeCoversRepairShare)
                              : repairNeed * cfg.reactiveRepairMultiplier * inp.leakMultiplier;
      }

      row.storm = C * price * (inp.stormLossPct / 100) * (planned ? 1 : cfg.reactiveStormMultiplier);
      if (planned) row.fee = inp.annualFee * Math.pow(1 + cfg.feeEscalationPct / 100, t - 1);

      row.opex = row.fee + row.repairs + row.storm;
      row.total = row.opex + row.replacement;
      rows.push(row);
      roofAge += 1;
    }

    // Value of service life left in the roof at the end of the horizon,
    // straight-line, at end-of-horizon replacement prices.
    var lifeLeft = Math.max(0, currentLife - roofAge);
    var residual = C * Math.pow(1 + e, H) * (lifeLeft / currentLife);

    var cumulative = [];
    var run = 0;
    rows.forEach(function (r) { run += r.total; cumulative.push(run); });

    return {
      rows: rows,
      cumulative: cumulative,
      totalSpend: run,
      residualValue: residual,
      netCost: run - residual,
      replacementYears: replacements,
      remainingLifeYears: remaining,
      fullLifeYears: fullLife
    };
  }

  function npv(values, ratePct) {
    var r = ratePct / 100;
    return values.reduce(function (acc, v, i) { return acc + v / Math.pow(1 + r, i + 1); }, 0);
  }

  function run(raw, defaults, configOverrides, skipRange) {
    var cfg = merge(MODEL_CONFIG, configOverrides);
    var inp = resolveInputs(raw || {}, defaults, cfg);
    var planned = simulate(inp, cfg, true);
    var reactive = simulate(inp, cfg, false);
    var H = cfg.horizonYears;
    var e = inp.escalationPct / 100;

    var replacementCurve = [];
    for (var t = 0; t <= H; t++) replacementCurve.push(inp.replacementCost * Math.pow(1 + e, t));

    // Annual NOI improvement in today's dollars: average operating savings
    // (deflated) plus the difference in replacement reserves (cost / life).
    var opexSavingsToday = 0;
    for (var i = 0; i < H; i++) {
      opexSavingsToday += (reactive.rows[i].opex - planned.rows[i].opex) / Math.pow(1 + e, i + 1);
    }
    opexSavingsToday /= H;
    var reserveSavings = inp.replacementCost / reactive.fullLifeYears - inp.replacementCost / planned.fullLifeYears;
    var annualNoiGain = opexSavingsToday + reserveSavings;

    var diff = reactive.rows.map(function (r, k) { return r.total - planned.rows[k].total; });
    diff[H - 1] -= reactive.residualValue - planned.residualValue;

    var totalFees = planned.rows.reduce(function (a, r) { return a + r.fee; }, 0);
    var savings = reactive.netCost - planned.netCost;

    // Same inputs under the conservative and upside assumption sets. Rep overrides of
    // those same assumptions win, so a custom value narrows the range.
    var range = null;
    if (!skipRange) {
      var over = configOverrides || {};
      var at = function (scen) {
        var o = merge(cfg, scen);
        for (var k in scen) if (over[k] !== undefined) o[k] = over[k];
        return run(raw, defaults, o, true).kpis.savings;
      };
      var lo = at(cfg.rangeScenarios.conservative), hi = at(cfg.rangeScenarios.upside);
      range = { low: Math.min(lo, hi, savings), high: Math.max(lo, hi, savings) };
    }

    return {
      config: cfg,
      inputs: inp,
      planned: planned,
      reactive: reactive,
      replacementCurve: replacementCurve,
      kpis: {
        plannedNetCost: planned.netCost,
        reactiveNetCost: reactive.netCost,
        savings: savings,
        savingsPct: reactive.netCost ? savings / reactive.netCost : 0,
        savingsRange: range,
        npvSavings: npv(diff, cfg.discountRatePct),
        totalFees: totalFees,
        returnPerFeeDollar: totalFees ? savings / totalFees : null,
        annualNoiGain: annualNoiGain,
        assetValueProtected: inp.capRatePct ? annualNoiGain / (inp.capRatePct / 100) : null,
        yearsToDouble: e > 0 ? Math.log(2) / Math.log(1 + e) : null,
        replacementCostAtHorizon: replacementCurve[H],
        plannedReplacementYear: planned.replacementYears[0] || null,
        reactiveReplacementYear: reactive.replacementYears[0] || null,
        // Unplanned spending (repairs + storm damage) avoided over the horizon: the
        // headline for owner-occupied property where cap-rate value doesn't apply.
        unplannedSpendAvoided:
          reactive.rows.reduce(function (a, r) { return a + r.repairs + r.storm; }, 0) -
          planned.rows.reduce(function (a, r) { return a + r.repairs + r.storm; }, 0),
        expectedStormLoss20yr: {
          planned: planned.rows.reduce(function (a, r) { return a + r.storm; }, 0),
          reactive: reactive.rows.reduce(function (a, r) { return a + r.storm; }, 0)
        }
      }
    };
  }

  return { MODEL_CONFIG: MODEL_CONFIG, run: run, resolveInputs: resolveInputs, simulate: simulate };
});
