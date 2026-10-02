# Market Comparison

Researched 2026-09-28. Details and source links are in each market's memo in this folder.

> **Confidence warning.** The research environment blocked most websites and the shared web-search budget ran out. Only these datasets were read in full, from GitHub mirrors of the official files:
> - FEMA National Risk Index (NRI)
> - NOAA storm and hurricane data
> - the BLS roofing price index
> - IBC/IEBC code text
>
> Everything else came from search-result excerpts. **Nothing here is client-ready until someone clicks through the sources.**

## Side-by-side

All five markets use FEMA National Risk Index **December 2025** county data (refreshed with `scripts/refresh_nri.py`). Round 2 (October 2026) filled the Austin roof prices and the Texas and Northern Virginia retail cap rates, and revised San Antonio TPO from $13.50 to $11.00. Every market now has its own value for each figure below. Most non-FEMA values still come from search-result excerpts, so they need verification before customer use.

| | Austin | San Antonio | Hampton Roads | Culbertson (N. Virginia) | Laurel |
|---|---|---|---|---|---|
| **Main roof perils** | Hail and tornado | Hail and tornado | Hurricane / tropical-storm wind | Thunderstorm wind / derecho, snow and ice | Thunderstorm wind / derecho, snow load |
| **FEMA NRI overall** | Relatively High | Relatively High | Relatively Moderate | Relatively Moderate | Relatively Moderate |
| **Hail (NRI)** | Very High | Very High | Relatively Low | Relatively Moderate | Relatively Moderate |
| **Strong wind (NRI)** | Relatively High | Relatively High | Relatively Moderate | Relatively High | Relatively High |
| **Tornado (NRI)** | Very High | Very High | Relatively Moderate | Relatively Moderate | Relatively High |
| **Hurricane (NRI)** | Relatively Low | Relatively Moderate | Relatively Moderate | Relatively Moderate | Relatively Moderate |
| **Winter weather (NRI)** | Relatively Moderate | Relatively High | Relatively Moderate | Relatively High | Very High |
| **Storm loss, % of roof cost/yr** | 0.28% | 0.38% | 0.44% | 0.15% | 0.13% |
| **TPO $/sq ft** | 11 | 11 | 9 | 9 | 7.7 |
| **Metal $/sq ft** | 14 | 14 | 15 | 14 | 16 |
| **Cap rate: industrial** | 7% | 7.3% | 7.5% | 6.44% | 7.7% |
| **Cap rate: office** | 8.5% | 7.7% | 7.9% | 8.36% | 7.5% |
| **Cap rate: retail** | 6.4% | 6.7% | 6.55% | 6.1% | 6.55% |
| **Cap rate: multi-family** | 5.7% | 6% | 5.4% | 5.35% | 5.6% |
| **Cap rate: medical office** | 6% | 7% | 6.8% | 6.8% | 6.8% |

Round-1 memos quote NRI figures from the release each agent could reach. The JSON files now carry the December 2025 values, with the originals kept under `fema_nri.research_fields`. Round-2 additions are listed at the end of the Austin, San Antonio and Culbertson memos.

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
- ~~Different FEMA NRI versions.~~ Resolved: every market now uses the December 2025 release.
- **Insurance trend.** Laurel stored a cycle average (+7.9%) and Culbertson stored the latest quarter (−6.3%). Replace both with the single national value.
- **San Antonio TPO $13.50** is well above the other markets ($7.70–9.00) and has a very wide range. It likely includes high-end quotes and needs a sanity check against PAX Texas jobs.

## Biggest gaps, in priority order

1. **Verification.** Most roof prices and cap rates came from search-result excerpts because broker and contractor sites were blocked. Someone should click through the sources, or replace the numbers with PAX estimator data and a current broker cap-rate report.
2. **Repair assumptions.** The 3x reactive repair multiplier and the 1%/yr base repair rate drive most of the savings, and neither has a primary source. PAX service-ticket history would calibrate both.
3. **Roof life, maintained vs reactive, from a traceable source.** Currently the national +5-yr default.
4. **State insurance detail:** roof-age underwriting in TX, VA and MD, and coastal VA named-storm deductibles.
5. **Complete (envelope) tier pricing and benefit data.**

## What would unblock round 3

- Allow these hosts in the environment's network settings:
  - `bls.gov`
  - `fred.stlouisfed.org`
  - `hazards.fema.gov`
  - `noaa.gov`
  - `cbre.com`, `cushmanwakefield.com`, `jll.com`, `colliers.com`
- Start a fresh session so the web-search budget resets.
- Any internal PAX numbers: replacement $/sq ft by branch, typical repair ticket size, maintenance contract pricing.
