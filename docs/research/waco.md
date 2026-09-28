# Waco, TX market research memo

**Counties:** McLennan (FIPS 48309) primary; Bell (48027) and Coryell (48099) secondary (Killeen–Temple).
**Researched:** 2026-09-28.
**Data file:** `data/markets/waco.json`

> **Access caveat.** The research environment's egress proxy blocked every non-GitHub host (fema.gov, ncei.noaa.gov, bls.gov, waco-texas.com, municode, RSMeans, broker and contractor sites). Four datasets were opened in full, all through unmodified GitHub copies: **FEMA NRI v1.20 (Dec 2025)**, **NCEI Storm Events 1996–2025**, **2024 IEBC Chapter 7 text**, and a ZIP cost-factor table. Every other figure comes from a search-engine result excerpt. Those figures are rated low or medium confidence and must be verified before client use. Nothing was estimated from memory.

## Summary

1. **Hazard profile.** NRI v1.20 rates McLennan County's overall risk *Relatively Moderate* (score 91.2). Building exposure is $56.2B and all-hazard building EAL is $36.8M/yr. Riverine flooding is 72% of that EAL but is not a roof peril.
   - **Roof-relevant building EAL:** tornado $5.30M/yr (*Relatively High*), hurricane remnants $1.60M, hail $1.13M (*Relatively Moderate*), strong wind $0.49M.
2. **Hail is frequent but NRI prices it low.** NCEI Storm Events, McLennan 1996–2025 (county-wide counts):
   - ≥1 in hail: **2.80 days/yr**, about 56 per 20-year roof life.
   - ≥1.75 in: 1.30 days/yr.
   - ≥2 in: **0.33 days/yr**, about 6.7 per 20 years.
   - NRI's hail loss ratio is only about 0.002% of building value per year. Bell County has similar hail frequency and a hail EAL of $8.9M/yr. Treat NRI's low McLennan hail EAL with caution.
3. **Significant roof-damaging events** (days with ≥2 in hail, ≥65 kt thunderstorm wind, or an EF1+ tornado): **0.80/yr in McLennan, about 16 per 20-year roof life.** Bell is 1.10/yr (about 22), Coryell 0.80/yr.
4. **The trend is up.** McLennan had 2, 2 and 6 days with ≥2 in hail in 1996–2005, 2006–15 and 2016–25. On 26 Apr 2023, hail up to 4.5 in fell near Waco, and NCEI notes that "numerous vehicles and buildings were damaged".
5. **Tornado history.** The 11 May 1953 Waco F5 killed 114 people (Wikipedia, search excerpt). Since 1996, NCEI records 7 EF1+ tornado days in McLennan. They include a Waco F2 on 5 May 2006 (NCEI damage $3M).
6. **Cost:**
   - Replacement cost uses Texas statewide figures: TPO $11.50/sq ft ($8.50–14.50).
   - Location factor is 0.82, low confidence.
   - Escalation is referenced from `national.json`: 4.6%/yr long-run and 5.75%/yr over 10 years.
7. **Cap rates are proxies:**
   - Industrial 7.5%: Austin, Q2 2026.
   - Office 7.9%: national, Q2 2026.
   - Retail 6.13%: Waco listing average.
8. **Code.** Waco appears to have adopted the 2024 I-codes (Municode excerpt, not verified). Under IEBC 705.3, a wet or deteriorated roof cannot be recovered and must be torn off. A roof replacement triggers IECC new-construction insulation, which is R-25ci in climate zone 2 under the 2021 IECC.

## Assumption table

| Assumption | Value (low–high) | Unit | Conf. | Source |
|---|---|---|---|---|
| NRI version | v1.20 (NRI_VER "December 2025") | – | high | [GitHub copy of NRI_Table_Counties.csv](https://raw.githubusercontent.com/ooowen-unc/flood_set/main/NRI_Table_Counties.csv); official: [FEMA NRI data](https://hazards.fema.gov/nri/data-resources) |
| NRI overall risk, McLennan | Relatively Moderate (91.22) | rating | high | same |
| Building exposure / all-hazard building EAL | $56,240,347,194 / $36,841,218 | $ / $/yr | high | same |
| NRI hail | Relatively Moderate / 4.678 / $1,126,838 | rating / events/yr / $/yr | high | same |
| NRI strong wind | Relatively Moderate / 2.057 / $487,329 | | high | same |
| NRI tornado | Relatively High / 0.7145 / $5,296,612 | | high | same |
| NRI hurricane | Relatively Low / 0.0459 / $1,596,238 | | high | same |
| NRI winter weather | Relatively Low / 3.105 / $69,795 | | high | same |
| NRI ice storm | Relatively Moderate / 0.895 / $36,583 | | high | same |
| NRI riverine flooding | Relatively Moderate / 2.286 / $26,650,933 | | high | same |
| NRI heat wave | Relatively Moderate / 16.95 / $644 | | high | same |
| NRI Bell (secondary) | Relatively Moderate; hail Relatively High $8.95M; tornado $8.86M | | high | same |
| NRI Coryell (secondary) | Relatively Low; hail Relatively Moderate $0.72M; tornado $0.82M | | high | same |
| Hail ≥1 in days, McLennan | 2.80 (2.20–4.68) | days/yr, county-wide | high | [NCEI Storm Events](https://www.ncei.noaa.gov/pub/data/swdi/stormevents/csvfiles/); parsed from [GitHub copies d1996–d2025](https://github.com/RyanFabrick/Storm-Prediction/tree/main/Datasets) |
| Hail ≥2 in days, McLennan | 0.33 (0.27–0.50) | days/yr | high | same |
| Significant severe days (≥2 in hail / ≥65 kt wind / EF1+) | 0.80 (0.80–1.10), about 16 per 20 yrs | days/yr | high | same |
| Thunderstorm wind ≥65 kt days | 0.33 (high 1.13 at ≥58 kt) | days/yr | high | same |
| Tornado frequency | 0.7145 (low 0.23 = NCEI EF1+ days) | /yr | high | NRI + NCEI |
| Winter / ice days | 0.97 (0.23–3.11) | days/yr | medium | NCEI + NRI |
| 1953 Waco F5: 114 deaths, 597 injuries | – | – | medium | [Wikipedia](https://en.wikipedia.org/wiki/1953_Waco_tornado_outbreak) (search excerpt) |
| TPO replacement | 11.50 (8.50–14.50) | $/sq ft | medium | [TriVAN TX 2026](https://www.trivanroofing.com/blog/commercial-roof-replacement-cost-texas-2026), [TriVAN TPO TX](https://www.trivanroofing.com/blog/tpo-roofing-cost-guide-texas-2026), [RoofVista TX](https://roofvista.com/resources/guides/roof-replacement-cost-texas), [TRB](https://theroofingbrief.com/commercial-roof-replacement-cost/) (excerpts) |
| EPDM replacement | 9.75 (6.00–13.50) | $/sq ft | medium | TriVAN, TRB (excerpts) |
| Mod bit replacement | 10.25 (7.00–13.50) | $/sq ft | medium | TriVAN, TRB (excerpts) |
| BUR replacement | 7.50 (5.00–10.00) | $/sq ft | low | TRB (excerpt) |
| Metal (standing seam) | 17.50 (10.00–25.00) | $/sq ft | low | TriVAN TX, TRB (excerpts) |
| Coating/restoration | 3.50 (1.50–5.50) | $/sq ft | medium | [M&M Roofing](https://mmroofsiding.com/blog/commercial-roof-coating-cost/), [TX flat roof guide](https://www.texasroofreplacementcost.com/flat-roof-cost-texas/) (excerpts) |
| Location cost factor | 0.82 | index | low | [Offerwise zip_cost_data.py](https://raw.githubusercontent.com/francis4531/Offerwise/main/zip_cost_data.py) (opened; "based on RSMeans CCI", derivation undocumented) |
| Escalation, 10-yr | 5.75 (1.9–8.9) | %/yr | medium | `data/national.json` → [BLS PPI PCU23816X23816X](https://fred.stlouisfed.org/series/PCU23816X23816X) |
| Escalation, 20-yr (18-yr actual) | 4.6 (1.9–8.9) | %/yr | medium | same |
| Commercial property rate trend | null (−13 to +20.4) | % | medium | [Marsh Q2 2026](https://www.marsh.com/en/about/media/global-commercial-insurance-falls-6-percent-q2-2026.html), [CIAB Q2 2026](https://www.ciab.com/resources/q2-2026-pc-market-survey), [Beancount Sep 2026](https://beancount.io/blog/2026/09/09/commercial-property-insurance-renewal-shopping-guide) (excerpts; national) |
| Wind/hail deductible | 1–5% of TIV (commercial); 2% now dominant in TX | % | low | [Lundquist](https://www.lundquistlawfirm.com/blog/hail-damage-commercial-policyholder), [Monumental Roofing](https://www.monumentalroofing.com/texas-wind-hail-deductible-guide/), [Latent](https://www.latentinsure.com/blog/texas-wind-hail-deductible) (excerpts) |
| Cap rate, industrial | 7.5 (6.2–7.5) | % | low | [SCORE Property Group Austin Q2 2026](https://scorepropertygroup.com/insights/austin-industrial-cap-rates-2026/), [First American](https://blog.firstam.com/cre-insights/where-are-cap-rates-for-industrial-real-estate-headed-in-2026) (excerpts) |
| Cap rate, office | 7.9 (6.0–7.9) | % | low | [Colliers US Capital Markets Q2 2026](https://www.colliers.com/en/research/nrep-uscm-capital-markets-us-snapshot-q2-2026) (excerpt; national) |
| Cap rate, retail | 6.13 (6.13–6.69) | % | low | [CityFeet Waco retail](https://www.cityfeet.com/cont/waco-tx/retail-properties-for-sale), [CityFeet Waco all](https://www.cityfeet.com/cont/waco-tx/commercial-properties-for-sale), [Matthews Austin retail 6.4%](https://www.matthews.com/insights/austin-retail-q2-2026) (excerpts) |
| Roof life, maintained / reactive | 21 (18–25) / 13 (10–17.4) | years | low | `data/national.json` (Firestone/ProLogis figure, widely cited, origin untraced) |
| Code: recover limits, coatings, replacement | IEBC 2024 §705.1–705.3.1, 706.2, 708.1 | text | high (model code) | [2024 IEBC Ch. 7 (UpCodes scrape, GitHub)](https://raw.githubusercontent.com/thexqin/us-building-codes-dataset/main/gsa-codes-full/iebc-2024/chapter-7-alterations-level-1.json) |
| Waco adopted 2024 I-codes | unverified | text | low | [Municode Ch. 6](https://library.municode.com/tx/waco/codes/code_of_ordinances?nodeId=PTIICOOR_CH6BUBURE) (excerpt) |
| Re-roof insulation, CZ 2 (2021 IECC) | R-25ci above deck | R-value | low | [Carlisle SpecTopics](https://www.carlislesyntec.com/en/Resources/Media/Blog-Landing-Page/SpecTopics/2021/05/17/Energy-Codes-and-Roof-Drains) (excerpt) |

## Method notes

- **NRI.** Fields used: `<HAZ>_RISKR`, `<HAZ>_AFREQ`, `<HAZ>_EALB`, `RISK_RATNG`, `RISK_SCORE`, `EAL_VALB` and `BUILDVALUE`. Riverine flooding uses the `IFLD` prefix in this table. The GitHub file has the same MD5 as the v1.20 copy used for other markets. It was compared with v1.19 (March 2023):
  - McLennan hail EAL rose from $53K to $1.13M.
  - Winter-weather frequency changed from 0.93 to 3.11 and heat-wave frequency from 0.81 to 16.9, because v1.20 redefined those hazards.
  - Building exposure rose from $50.1B to $56.2B.
- **Storm Events.** Rows were filtered on STATE_FIPS 48 and CZ_NAME McLennan, Bell or Coryell, for 1996–2025 (30 years). "Days" means distinct dates with at least one report at or above the threshold anywhere in the county. Wind is in knots and mixes measured and estimated gusts. Tornado data before 1996 (including 1953) was not in the files parsed.

## Caveats

- **County-wide counts are not per-building hits.** Hail swaths are narrow and McLennan covers about 1,071 sq mi. For expected site loss, use the NRI loss ratios: hail about 0.002%/yr and tornado about 0.0094%/yr of building value.
- **NRI hail EAL differs sharply between neighbours.** McLennan and Bell have similar hail frequency, but McLennan's hail EAL is $1.1M and Bell's is $8.9M. NRI weights county loss history (Bell includes the 1996 Temple hailstorm, which NCEI records at $200M).
- **Replacement costs are Texas statewide, not Waco bids.** The metal range is especially wide. The location factor is not applied to these costs, to avoid double-counting.
- **Cap rates are not Waco transaction data.** Industrial and office are proxies (Austin and national). Retail comes from asking-price listings.
- **Roof life is the national figure with no climate adjustment.** The 21-vs-13-year figure has no traceable primary source.
- **All non-GitHub sources are search excerpts,** and the attribution of a figure to a single URL may be approximate.

## Open questions

1. What code list has the City of Waco adopted (2024 IBC/IEBC/IECC?), with what effective date and local amendments? The same applies to Temple, Killeen, Belton, Hewitt and Woodway.
2. What cap rates do closed sales show for Waco and Central Texas? Candidate sources: Cromwell Commercial Group, Colliers Central Texas, Marcus & Millichap Austin, CBRE H1 2026.
3. Can PAX job history or Waco bids replace the statewide $/sq ft figures? They should cover tear-off vs recover, with and without the R-25ci insulation upgrade.
4. What is the RSMeans 2026 City Cost Index for Waco (ZIP 766/767)?
5. What were the insured losses from the 26 Apr 2023 Waco hailstorm?
6. Should the model price storm cost from NRI EAL or from NCEI frequency, given the McLennan/Bell gap?
7. Is there a hot-climate source for maintained vs reactive roof life?
8. Is there a Texas-specific commercial property rate trend, and do insurers give any premium credit for documented maintenance?
