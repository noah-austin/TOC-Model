/*
 * PAX overrides: adjustments sales ops makes to the research defaults.
 *
 * data/overrides.json (optional) is applied by scripts/build.mjs when the site is built,
 * and by the Assumptions page (dist/assumptions/) to preview changes live. Shape:
 *
 *   {
 *     "config":        { "<MODEL_CONFIG key>": value, ... },   // engine settings
 *     "escalationPct": 4.6,
 *     "fee":           { "baseUsd": 800, "perSqftUsd": 0.13 },
 *     "systems":       { "<system>": { "lifeYears": 20 } },
 *     "propertyTypes": { "<type>": { "leakMultiplier": 1.3 } },
 *     "markets":       { "<market>": { "replacementCostPerSqft": { "<system>": 11 },
 *                                      "capRates": { "<key>": 7.5 },
 *                                      "stormLossPct": 0.3 } },
 *     "libraryProfiles": { "<type>": { "area": 100000, "system": "tpo", "roofAge": 8 } }
 *   }
 *
 * Overridden values are tagged source "PAX adjustment" so reports can say so.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PaxOverrides = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var TAG = 'PAX adjustment';
  function isNum(x) { return typeof x === 'number' && isFinite(x); }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function blendMixed(capRates) {
    var r = capRates.retail && capRates.retail.value, o = capRates.office && capRates.office.value,
      f = capRates.multifamily && capRates.multifamily.value;
    if ([r, o, f].every(isNum)) {
      return { value: Math.round((0.30 * r + 0.35 * o + 0.35 * f) * 100) / 100,
        source: 'fallback: blend of 30% retail, 35% office and 35% multi-family rates', confidence: 'low' };
    }
    return capRates.mixed_use;
  }

  // Returns a new defaults object with the overrides applied; `base` is not modified.
  function apply(base, ov) {
    var d = clone(base);
    ov = ov || {};
    d.config = clone(ov.config || {});
    if (isNum(ov.escalationPct)) d.escalationPct = ov.escalationPct;
    if (ov.fee) {
      if (isNum(ov.fee.baseUsd)) d.fee.baseUsd = ov.fee.baseUsd;
      if (isNum(ov.fee.perSqftUsd)) d.fee.perSqftUsd = ov.fee.perSqftUsd;
    }
    Object.keys(ov.systems || {}).forEach(function (s) {
      if (d.systems[s] && isNum(ov.systems[s].lifeYears)) d.systems[s].lifeYears = ov.systems[s].lifeYears;
    });
    Object.keys(ov.propertyTypes || {}).forEach(function (t) {
      var p = d.propertyTypes[t], o = ov.propertyTypes[t];
      if (p && isNum(o.leakMultiplier)) { p.leakMultiplier = o.leakMultiplier; p.leakConfidence = 'pax'; p.leakBasis = 'Scales reactive repairs. ' + TAG; }
    });
    Object.keys(ov.markets || {}).forEach(function (id) {
      var m = d.markets[id], o = ov.markets[id];
      if (!m) return;
      var mixedWasBlend = m.capRates.mixed_use && /blend/.test(m.capRates.mixed_use.source || '');
      Object.keys(o.replacementCostPerSqft || {}).forEach(function (s) {
        var v = o.replacementCostPerSqft[s];
        if (m.replacementCostPerSqft[s] && isNum(v)) m.replacementCostPerSqft[s] = { value: v, source: TAG, confidence: 'pax' };
      });
      Object.keys(o.capRates || {}).forEach(function (k) {
        var v = o.capRates[k];
        if (isNum(v)) m.capRates[k] = { value: v, source: TAG, confidence: 'pax' };
      });
      if (mixedWasBlend && !(o.capRates && isNum(o.capRates.mixed_use))) m.capRates.mixed_use = blendMixed(m.capRates);
      if (isNum(o.stormLossPct)) m.stormLossPctOverride = o.stormLossPct;
    });
    if (ov.libraryProfiles) d.libraryProfiles = clone(ov.libraryProfiles);
    return d;
  }

  return { apply: apply, TAG: TAG };
});
