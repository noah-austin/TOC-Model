# Austin, TX market research memo

**Counties:** Travis (FIPS 48453), plus Williamson (48491) as secondary.
**Researched:** 2026-09-28.
**Data file:** `data/markets/austin.json`

> **Status: PARTIAL.** In this session the network egress proxy blocked every host except GitHub and the package registries. hazards.fema.gov, ncei.noaa.gov, bls.gov, FRED, RSMeans, CBRE/C&W/JLL, TDI, NRCA, ICC, austintexas.gov and all contractor sites were unreachable, and the shared web-search budget ran out. The **hazard and cost-escalation sections use primary data**: official FEMA, NOAA and BLS files, reached through unmodified copies on GitHub. **Replacement cost, location factor, insurance, cap rates, roof life and code text are `null` or unverified text.** Nothing below was estimated from memory. Where a figure appears only in a search-result summary, it is labelled as an unverified lead and not used as a model value.

## Key findings

1. **Hail is the dominant roof peril.** FEMA NRI v1.19.0 rates Travis County hail risk **Very High**. Hail's expected annual loss to buildings is **$23.9M/yr**, 41% of the county's $58.7M all-hazard building EAL. The annualized frequency is 3.79 hail events/yr.
2. **Large hail, county-wide (NCEI Storm Events 1996–2025, Travis):**
   - ≥1.0 in: 2.50 hail-days/yr, about 50 over a 20-year roof life.
   - ≥1.75 in: 1.07/yr, about 21 over 20 years.
   - ≥2.0 in: 0.47/yr, about 9 over 20 years. This is the model default.
   - ≥2.5 in: 0.23/yr, about 5 over 20 years.
   - These counts cover the whole county, not a single building. One building's exposure is much lower. The NRI per-building loss ratio for hail is about 0.013% of building value per year.
3. **Significant-severe days rise to about 1.2/yr** (roughly 23 per 20 years, Travis) when you count any day with ≥2 in hail, ≥65 kt thunderstorm wind, or an EF1+ tornado.
4. **Large-hail days are trending up.** Days with ≥2 in hail across both counties went 6 (1996–2005), 10 (2006–15), 12 (2016–25). Three storms dominate the recorded damage:
   - 24 Sep 2023: 4.0 in hail in Williamson, 3.0 in in Travis; NCEI records $300M in each county.
   - 25 Mar 2009: $160M.
   - 25 Mar 2005: $100M.
5. **Tornado is the second-largest building-loss hazard** (NRI rating Very High, $17.9M/yr EAL). Winter storms and ice cause occasional large interior-water losses (Feb 2021, Feb 2023). Heat/UV is rated "Relatively High" by NRI, but NRI assigns it almost no building EAL ($49/yr). Its real effect is on roof life, which NRI does not model.
6. **Commercial roofing costs have escalated fast** (BLS PPI PCU23816X23816X, national):
   - Last 10 years (Aug 2016–Aug 2026): **6.0%/yr**.
   - Longest available window (Aug 2008–Aug 2026, 18 years): **4.45%/yr**.
   - Pre-COVID trend: only **2.4%/yr**.
   - Most of the gap comes from a 41% jump between Apr 2021 and Apr 2023.
7. **Williamson** hail frequency matches Travis (≥1 in: 2.70 days/yr; ≥2 in: 0.60 days/yr). Its NRI hail EAL is tiny ($43K/yr). That is an artifact of NRI's county loss-history weighting, not evidence of lower physical risk.

## Assumption table

| Assumption | Value (low–high) | Unit | Conf. | Source |
|---|---|---|---|---|
| NRI overall risk, Travis | Relatively High (score 96.9) | rating | high | [FEMA NRI data](https://hazards.fema.gov/nri/data-resources); parsed from [GitHub copy of NRI_Table_Counties.csv v1.19.0](https://raw.githubusercontent.com/jasminextan/Telecom_NatDisaster/main/data/NRI_Table_Counties/NRI_Table_Counties.csv) |
| NRI all-hazard building EAL, Travis | $58,735,540 on $189.5B exposure | $/yr | high | same |
| NRI hail: rating / freq / building EAL | Very High / 3.79 / $23,947,322 | events/yr, $/yr | high | same |
| NRI strong wind | Relatively High / 1.62 / $782,638 | | high | same |
| NRI tornado | Very High / 0.52 / $17,906,081 | | high | same |
| NRI hurricane | Relatively Low / 0.035 / $5,033,938 | | high | same |
| NRI winter weather | Relatively High / 1.18 / $185,826 | | high | same |
| NRI ice storm | Relatively High / 0.55 / $711,555 | | high | same |
| NRI riverine flooding | Relatively High / 5.88 / $6,714,461 | | high | same |
| NRI coastal flooding | Not Applicable | | high | same |
| NRI heat wave | Relatively High / 0.43 / $49 | | high | same |
| NRI Williamson overall | Relatively Moderate; hail Relatively Moderate, $43,057 EAL | | high | same |
| Hail ≥2 in days, Travis (default) | 0.47 (0.23 [≥2.5 in] – 1.07 [≥1.75 in]) | days/yr, county-wide | high | [NCEI Storm Events CSVs](https://www.ncei.noaa.gov/pub/data/swdi/stormevents/csvfiles/); parsed from [GitHub copies d1996–d2025](https://github.com/RyanFabrick/Storm-Prediction/tree/main/Datasets) |
| Hail ≥1 in days, Travis | 2.50 (75 days / 30 yrs; 271 reports) | days/yr | high | same |
| Thunderstorm wind ≥65 kt days, Travis | 0.50 (high 1.30 at ≥58 kt) | days/yr | high | same |
| Tornado frequency | 0.52 (low 0.33 = NCEI EF1+ days) | /yr | high | NRI + NCEI (above) |
| Winter storm / ice days | 0.70 (0.55–1.18) | /yr | medium | NCEI + NRI (above) |
| Cost escalation, 10-yr | 6.0 (5.4–6.0) | %/yr | high | [BLS PPI PCU23816X23816X on FRED](https://fred.stlouisfed.org/series/PCU23816X23816X); parsed from [2008–2025 scrape](https://raw.githubusercontent.com/evilb1000/whatsitcost/main/ScrapedData/scrapedSeries/PCU23816X23816X_raw.csv) and [2024–2026 scrape](https://raw.githubusercontent.com/evilb1000/breaking-ground/main/nextjs-breaking-ground/src/data/insights-sparklines.json) |
| Cost escalation, "20-yr" (18-yr actual) | 4.5 (2.4–4.6) | %/yr | medium | same |
| Replacement $/sq ft: TPO, EPDM, mod bit, BUR, metal, coating | **null** | $/sq ft | low | Leads only (see JSON notes): [riseroofingaustin.com](https://www.riseroofingaustin.com/commercial-roof-cost-calculator/), [trivanroofing.com](https://www.trivanroofing.com/blog/commercial-roof-replacement-cost-texas-2026), [btolroofing.com](https://btolroofing.com/blog/commercial-roof-replacement-cost-in-texas/), [texasroofreplacementcost.com](https://www.texasroofreplacementcost.com/flat-roof-cost-texas/) |
| Location cost factor | **null** | index | low | [RSMeans CCI](https://www.rsmeans.com/rsmeans-city-cost-index) (paywalled/blocked) |
| Commercial property rate trend | **null** | %/yr | low | TDI / Marsh / Amwins (blocked) |
| Cap rates: industrial / office / retail | **null** | % | low | CBRE / C&W (blocked) |
| Roof life: maintained / reactive | **null** | years | low | NRCA (blocked); see `data/national.json` |
| Code triggers | unverified checklist | text | low | ICC / City of Austin (blocked) |

**Unverified cost leads.** These came from search-result summaries only; the pages were not opened, so none are used as model values.

| Scope | System | Range ($/sq ft) |
|---|---|---|
| Austin | TPO | $8–14 and $7–11 |
| Austin | Mod bit | $7.50–12.50 |
| Texas | Single-ply | $5.75–13.80 |
| Texas | EPDM | $8–11 |
| Texas | Mod bit | $7–10 and $6.90–17.25 |
| National 2026 guides | TPO | $5–10 |
| National 2026 guides | EPDM | $5–9 |
| National 2026 guides | 2-ply mod bit | $4–9 |
| National 2026 guides | Metal | $7–14 |
| National 2026 guides | BUR | $10–18+ |
| National 2026 guides | Tear-off | $1–5 |

## Method notes

- **NRI.** Fields used: `<HAZ>_RISKR`, `<HAZ>_AFREQ`, `<HAZ>_EALB`, `RISK_RATNG`, `EAL_VALB` and `BUILDVALUE`, all from v1.19.0 (NRI_VER = "March 2023"). An older November 2021 copy was also checked. It gave Travis hail EAL of $15.6M, which confirms the order of magnitude.
- **Storm Events.** Rows were filtered on STATE_FIPS 48 and CZ_NAME Travis or Williamson, covering both county and forecast-zone records, for 1996–2025 (30 full years in the modern reporting era). "Hail-days" means distinct dates with at least one report at or above the size threshold anywhere in the county. Wind magnitudes are in knots and mix measured and estimated gusts.
- **PPI.** CAGR = (end/start)^(1/years) − 1. The Aug 2026 value (232.226) is probably preliminary. The two scrapes differ by less than 0.1% on overlapping months because of BLS revisions.

## Caveats

- **Data came from mirrors.** The hazard and PPI numbers come from GitHub copies of official files, not from the agency sites. The copies are standard bulk files with the official schema and version stamps, but they were not checksum-verified against the originals.
- **NRI version.** FEMA released NRI v1.20 in December 2025, and its values may differ from v1.19.0.
- **Frequencies are county-wide.** They are not per-building probabilities, so using ~9 large-hail days per 20 years as "hits on this roof" would badly overstate risk. For a per-building view, use the NRI EAL ratio or SPC gridded point probabilities.
- **NCEI damage estimates are rough.** The $300M-per-county figure for 24 Sep 2023 looks like a round, possibly duplicated estimate.
- **Escalation is national.** No Austin-specific roofing index exists, and the 10-yr rate is inflated by the 2021–23 shock.
- **Residential sources.** Blog and calculator cost ranges are often residential or small-commercial and should be checked against PAX job-cost data.

## Open questions

1. Re-run the blocked sections: $/sq ft, location factor, cap rates, insurance, roof life and code triggers. This needs an environment with wider egress, or the domains allow-listed.
2. Get the RSMeans CCI for Austin: Division 07 (Thermal & Moisture Protection) and the weighted average.
3. Get CBRE H1 2026 cap rates for Austin industrial, office and retail, plus the C&W Austin MarketBeat.
4. Texas commercial property insurance: the 2022–26 rate trend, roof-age ACV/roof-schedule thresholds, and wind/hail % deductibles for non-coastal Central Texas. Travis and Williamson are outside the TWIA catastrophe area.
5. Decide how the model converts county-wide hail frequency into a per-building event probability.
6. Update to NRI v1.20.
7. Confirm the City of Austin's adopted I-code editions and local amendments:
   - recover limits (the analyst recalls "two or more existing applications" as the model-code limit; not verified);
   - IECC roof-replacement insulation requirement and R-value for the local climate zone;
   - Austin Energy Green Building and cool-roof rules;
   - differences in Williamson County cities.
8. Cross-check the NCEI damage totals for Sep 2023 against TDI or insurer loss data.

## Round 2 update (October 2026)

Every figure below comes from a web-search result excerpt. Direct fetches of the broker and contractor sites were still blocked by the sandbox proxy, so treat these values as provisional. Each value is the median of the source midpoints. Full derivations are in each key's `note`.

| Key | Value (range) | Confidence | Sources |
|---|---|---|---|
| `replacement_cost_per_sqft.tpo` | $11.00 ($7–15) | medium | [RISE Austin calculator](https://www.riseroofingaustin.com/commercial-roof-cost-calculator/), [TriVAN TX 2026](https://www.trivanroofing.com/blog/commercial-roof-replacement-cost-texas-2026), [Roofing Brief](https://theroofingbrief.com/commercial-roof-replacement-cost/) |
| `replacement_cost_per_sqft.epdm` | $11.00 ($7–14.50) | low | [TriVAN TX 2026](https://www.trivanroofing.com/blog/commercial-roof-replacement-cost-texas-2026), [Angi](https://www.angi.com/articles/epdm-roofing-cost.htm), [Fox Haven](https://foxhavenroof.com/epdm-roofing-guide-2026-costs-benefits-installation-process/) |
| `replacement_cost_per_sqft.mod_bit` | $11.00 ($7.50–17.25) | medium | [RISE Austin](https://www.riseroofingaustin.com/commercial-roof-cost-calculator/), [TriVAN](https://www.trivanroofing.com/blog/commercial-roof-replacement-cost-texas-2026), [BTOL](https://btolroofing.com/blog/commercial-roof-replacement-cost-in-texas/) |
| `replacement_cost_per_sqft.bur` | $10.00 ($5.75–15.50) | low | [TriVAN](https://www.trivanroofing.com/blog/commercial-roof-replacement-cost-texas-2026), [BTOL](https://btolroofing.com/blog/commercial-roof-replacement-cost-in-texas/), [Commercial Roof Guide BUR](https://commercialroofguide.com/guides/built-up-roofing/) |
| `replacement_cost_per_sqft.metal` | $14.00 ($8–23) | low | [BTOL](https://btolroofing.com/blog/commercial-roof-replacement-cost-in-texas/), [RoofVista commercial](https://roofvista.com/resources/guides/commercial-flat-roof-cost), [RoofVista TX metal](https://roofvista.com/resources/guides/texas-metal-roofing-guide), [Austin Roofing Co.](https://austinroofingcompany.com/guides/roof-replacement-cost-austin-tx) |
| `replacement_cost_per_sqft.coating_restoration` | $3.50 ($1.50–7), no tear-off | medium | [M&M TX/LA](https://mmroofsiding.com/blog/commercial-roof-coating-cost/), [West Roofing](https://www.westroofingsystems.com/cost-of-silicone-roof-coating-system), [Roofing Brief coatings](https://theroofingbrief.com/roof-coating-types-and-cost/) |
| `cap_rates.industrial` | 7.0% (6.28–7.9) | medium | [Matthews Q1 2026](https://www.matthews.com/insights/austin-tx-industrial-market-report-q1-2026), [Partners Q1 2026](https://partnersrealestate.com/research/austin-industrial-q1-2026-quarterly-market-report/), [Score Property Group](https://scorepropertygroup.com/insights/austin-industrial-cap-rates-2026/) |
| `cap_rates.office` | 8.5% (7.6–9.45) | low | [M&M 2026 office forecast](https://www.marcusmillichap.com/research/market-report/austin/austin-2026-investment-forecast-office-market-report), [RealCostIQ](https://realcostiq.com/cap-rate/austin/), [CBRE H1 2026 summary](https://finance.yahoo.com/real-estate/articles/cbre-h1-2026-cap-rate-055007513.html) |
| `cap_rates.retail` | 6.4% (5.5–6.8) | medium | [Matthews Q2 2026](https://www.matthews.com/insights/austin-retail-q2-2026), [Partners Q1 2026](https://partnersrealestate.com/research/austin-retail-q1-2026-quarterly-market-report/), [Grewal RE](https://grewalregroup.com/blog/austin-commercial-real-estate-guide-2026), [CBRE H1 2026 summary](https://finance.yahoo.com/real-estate/articles/cbre-h1-2026-cap-rate-055007513.html) |

Caveats: few sources were Austin-specific. EPDM, BUR and metal rely mainly on Texas-wide guides. Several sources quote the membrane system and tear-off separately, so tear-off was added to make them comparable. Check all cost values against PAX job-cost data.
