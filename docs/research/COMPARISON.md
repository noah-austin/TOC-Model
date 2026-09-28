# Market Comparison (v1 research, round 1)

Researched 2026-09-28. Details and source links are in each market's memo in this folder.

> **Confidence warning.** The research environment blocked most websites and the shared web-search budget ran out. Only these datasets were read in full, from GitHub mirrors of the official files:
> - FEMA National Risk Index (NRI)
> - NOAA storm and hurricane data
> - the BLS roofing price index
> - IBC/IEBC code text
>
> Everything else came from search-result excerpts. **Nothing here is client-ready until someone clicks through the sources.**

## Side-by-side

| | Austin | San Antonio | Hampton Roads | Laurel | Culbertson (NoVA) |
|---|---|---|---|---|---|
| **Main roof peril** | Hail, tornado | Hail, tornado | Hurricane / tropical wind | Thunderstorm wind / derecho, snow | Thunderstorm wind / derecho, snow |
| **FEMA NRI overall** | Relatively High | Relatively High | Relatively Moderate | Relatively Moderate | Relatively Moderate |
| **Hail (NRI)** | Very High | Very High | Relatively Low | Very Low | Relatively Moderate |
| **Big roof events / 20 yrs** | ~9 days of ≥2" hail county-wide | ~7 baseball-hail events county-wide | ~4.8 tropical storms within 50 nm | ~3.5 major regional events (derived) | not derived |
| **TPO replacement $/sq ft** | — | 13.50 (7–20) | 9.00 | 7.70 | 9.00 |
| **Metal $/sq ft** | — | 14.00 | 15.00 | 16.00 | 14.00 |
| **Location factor** | — | 0.90 (low conf.) | — | — | 1.08 |
| **Cap rate: industrial** | — | — | 7.5% | 7.7% | 6.4% |
| **Cap rate: office** | — | — | 7.9% | 7.5% (national) | 8.4% (Class B) |
| **Cap rate: retail** | — | — | 6.55% | 6.55% | — |

— = not found (null in JSON).

## Values shared by all markets (from `data/national.json`)

| Assumption | Default | Range | Confidence |
|---|---|---|---|
| Roofing cost escalation (BLS PPI, nonres. roofing contractors, national) | **4.6%/yr** (2007–2025) | 2.9% pre-2020 … 5.75% last 10 yrs | High (primary data) |
| Life extension from maintenance | **+5 yrs** | 3–8 | Medium (NRC Canada; Carlisle warranty terms) |
| Reactive vs planned repair cost | **3×** | 1.8–5× | Low (no primary study exists) |
| Estimated PaxSeal fee (Roof Only) | **$800/yr + $0.13/sq ft/yr** | — | Derived from benchmarks, not a quote |
| Service life, TPO/EPDM/BUR | 20 yrs | 15–35 | Medium (Fannie Mae tables, NRCA) |
| Commercial property insurance trend | falling in 2026 (−6% to −13% Q2 2026) after +17–20% in 2023 | — | Medium |

Key takeaways for the model:

1. **Escalation is effectively national.** Every market came back at 4.5–4.6%/yr long-run and 5.4–6.0%/yr over 10 years, all from the same BLS index. Use one national default; local differences show up in $/sq ft, not in the growth rate.
2. **The peril module must be generic.** Texas is hail. Hampton Roads is hurricane. Maryland/NoVA is wind plus snow. There is no single "storms every N years" figure.
3. **Insurance escalation is not a safe selling point in 2026.** Rates are currently falling. The stronger insurance story is roof-age underwriting (ACV-only coverage on older roofs) and Texas 1–5% wind/hail deductibles.
4. **Do not use "21 years maintained vs 13 reactive."** Laurel's file uses it, but the national research found no original source. The engine should use the +5-year default from `national.json`.

## Inconsistencies to clean up before building the engine

- **Different storm-frequency definitions.** NRI "annualized frequency" counts county-wide event-days (Laurel strong wind = 7/yr), not hits on one building. The engine needs one normalized input per market, e.g. "expected roof-damaging loss as % of replacement cost per year", derived from NRI expected annual loss ÷ building value.
- **Different FEMA NRI versions.** Culbertson and Hampton Roads used the December 2025 release (v1.20); the others used March 2023 (v1.19). Winter-weather frequency changed a lot between versions, so re-pull every market on v1.20.
- **Insurance trend.** Laurel stored a cycle average (+7.9%) and Culbertson stored the latest quarter (−6.3%). Replace both with the single national value.
- **San Antonio TPO $13.50** is well above the other markets ($7.70–9.00) and has a very wide range. It likely includes high-end quotes and needs a sanity check against PAX Texas jobs.

## Biggest gaps, in priority order

1. **Replacement $/sq ft for Austin, and verified figures everywhere.** PAX estimator data would beat any web number.
2. **Cap rates for Austin and San Antonio** (all three types), plus NoVA retail. A current CBRE or Cushman & Wakefield metro report would fill these in minutes.
3. **Roof life, maintained vs reactive, from a traceable source.** Currently the national +5-yr default.
4. **State insurance detail:** roof-age underwriting in TX, VA and MD, and coastal VA named-storm deductibles.
5. **Complete (envelope) tier pricing and benefit data.**

## What unblocks round 2

- Allow these hosts in the environment's network settings:
  - `bls.gov`
  - `fred.stlouisfed.org`
  - `hazards.fema.gov`
  - `noaa.gov`
  - `cbre.com`, `cushmanwakefield.com`, `jll.com`, `colliers.com`
- Start a fresh session so the web-search budget resets.
- Any internal PAX numbers: replacement $/sq ft by branch, typical repair ticket size, maintenance contract pricing.
