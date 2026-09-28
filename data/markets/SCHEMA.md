# Market file schema

Each market is one JSON file: `data/markets/<id>.json`.

Every numeric assumption is a "sourced value" object:

```json
{ "value": 6.1, "low": 4.5, "high": 7.8, "unit": "%/yr",
  "as_of": "2025", "confidence": "high|medium|low",
  "sources": [{"name": "BLS PPI ...", "url": "https://..."}],
  "note": "how it was derived" }
```

`value` is the model default. `low`/`high` bound a sensitivity range. If no credible source was found, use `"value": null`, list what was tried in `note`, and set confidence to `"low"`. **Never invent a number.**

Top-level keys:

- `id`, `name`, `state`, `counties` ([{name, fips}]), `researched_on`
- `replacement_cost_per_sqft`: {tpo, epdm, mod_bit, bur, metal, coating_restoration} → sourced values ($/sq ft, installed, tear-off + replace, low-slope commercial)
- `location_cost_factor`: sourced value (RSMeans-style city cost index vs national = 1.00)
- `cost_escalation`: {annual_pct_10yr, annual_pct_20yr} → sourced values (commercial roofing installed cost)
- `perils`: [{peril, annual_frequency (sourced; events/yr affecting the area), severity_note, fema_nri_rating, fema_nri_expected_annual_loss_building_usd, sources}]
- `fema_nri`: {county, overall_risk_rating, hazards: {hail, strong_wind, tornado, hurricane, winter_weather, ice_storm, riverine_flooding, coastal_flooding, heat_wave} → {rating, annualized_frequency, eal_building_usd}}
- `insurance`: {commercial_property_rate_trend_pct (sourced), roof_age_underwriting (text + sources), wind_hail_deductible_norms (text + sources)}
- `cap_rates`: {industrial, office, retail} → sourced values (%)
- `roof_life_years`: {maintained, reactive} → sourced values, plus a climate note
- `code_triggers`: text + sources (re-roof / recover limits, damage thresholds that force full replacement, energy-code insulation upgrades on re-roof)
- `open_questions`: [text]
