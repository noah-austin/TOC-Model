# Millersville, MD market research memo (Annapolis–Baltimore)

- **Market file:** `data/markets/millersville.json` (id `millersville`)
- **Researched:** 2026-09-28
- **Counties:** Anne Arundel (24003), primary. Secondary: Baltimore City (24510), Baltimore County (24005), Queen Anne's (24035)
- **Company:** PAX Services Group (HQ in Millersville)
- **Neighbor market:** `laurel.json` (primary county Prince George's). This memo reuses Laurel's Maryland-wide findings on insurance, code, roof life, the 2010 and 2016 snowstorms and the 2012 derecho, and cites the same sources. Everything specific to Anne Arundel, the Chesapeake Bay shoreline and Annapolis/Baltimore is new.

> **Research-environment limitation.** The sandbox proxy blocked fetches from almost every host: fema.gov, noaa.gov, cbre.com, klnb.com, commercialroofguide.com, sec.gov and aacounty.org. I downloaded and computed three sources in full:
> 1. **FEMA NRI v1.20.0 (December 2025)** county table, from a GitHub mirror. The file's `NRI_VER` field reads "December 2025", and the data dictionary lists version 1.20.0.
> 2. **NOAA HURDAT2 1851–2024**, from a GitHub mirror. I used it to count tropical-cyclone passages near Annapolis.
> 3. **BLS PPI roofing escalation**, taken as already computed in `data/national.json`.
>
> Every other number comes from a search-engine excerpt of the cited page. Those numbers are rated low or medium confidence, and each should be re-verified before a customer sees it.

---

## 1. Summary

1. **Which NRI version, and why it matters.** This market uses **NRI v1.20 (Dec 2025)**. Laurel still uses v1.19 (Mar 2023). v1.20 changed the Anne Arundel hazard values a lot, as the table below shows. Until Laurel is refreshed, do not compare the two markets hazard by hazard.

   | Anne Arundel | v1.19 (Laurel file) | v1.20 (this file) |
   |---|---|---|
   | Overall rating (score) | Rel. Moderate (92.0) | Rel. Moderate (81.9) |
   | Building value | $95.2B | $106.9B |
   | All-hazard building EAL | $49.0M | $49.6M |
   | Hurricane building EAL | $36.1M | $7.9M |
   | Coastal flood building EAL | $9.40M | $2.18M |
   | Riverine → Inland flood EAL | $0.23M | $32.1M |
   | Hail | Very Low, $4K | Rel. Moderate, $1.08M |
   | Strong wind | Rel. Moderate | Rel. High |
   | Winter weather AF | 2.96/yr | 9.52/yr (a methodology change) |

2. **Wind is still the main roof peril.** NRI rates strong wind **Relatively High**, at about 7.7 event-days per year countywide ($0.92M/yr building EAL). Tornado is Relatively Moderate (0.43/yr). The local benchmark is the **Sep 1 2021 EF2 tornado from the remnants of Ida**: winds peaked near 125 mph and the path ran more than 11 miles from Edgewater into downtown Annapolis. Among other damage, it tore the roof off a concession stand at South River High School.
3. **Bay shoreline exposure is what sets Millersville apart from Laurel.** NRI rates coastal flooding **Relatively Moderate** in all four counties, at about 3.66 events per year. During **Hurricane Isabel (2003)** the Annapolis gauge set its record of **7.2 ft MLLW**. Isabel's Bay surge was 7+ ft, and it flooded downtown Annapolis, the Naval Academy and Baltimore's harbor. Isabel never came within 100 nm of Annapolis (its closest approach was about 115 nm). Its track west of the Bay is what drove the surge. Chronic tidal flooding is rising too: Annapolis had a record 18 high-tide-flood days in May 2019–Apr 2020, and City Dock floods about 50 times a year.
4. **Tropical storms (from my own HURDAT2 count, 1975–2024).** Seven storms of tropical-storm strength passed within 50 nm of Annapolis, which is **0.14/yr**, or about 3 per 20-year roof life. 19 passed within 100 nm (0.38/yr). Only 3 were at hurricane strength within 100 nm (0.06/yr: Gloria, Floyd, Irene).
5. **Significant roof-damaging events (derived): about 4 per 20 years, with a range of about 3.6–7.** The events are Isabel 2003, the Feb 2010 snowstorms, the 2012 derecho, the 2016 blizzard and Ida 2021. That is 5 events in 24 years, or 0.21/yr.
6. **Replacement cost.** The only Anne Arundel-specific figure is 60-mil TPO in Glen Burnie at **$5.81–8.98/sq ft** (Baltimore: $6.05–9.35). An Annapolis contractor excerpt puts single-ply at $4–8/sq ft. Mod bit ($6–9), BUR ($7–10.50) and metal ($10–18) come from Commercial Roof Guide. The excerpt says those three ranges *exclude tear-off*, which typically adds $1–3/sq ft.
7. **Cap rates.**
   - Industrial: **7.5%** for Baltimore/Maryland industrial in Q1 2026, down from 7.9% in Q4 2025 (NAI KLNB/CBRE excerpt). No BWI-submarket figure was found.
   - Retail: **~7.0%**, from Federal Realty's Oct 2025 purchase of Annapolis Town Center for $187M. CBRE's Baltimore retail figures are 6.44–6.80%.
   - Office: **7.5%**, a national figure. Annapolis office vacancy is only 6.2%, against 15.7–20.6% in metro Baltimore.
8. **Escalation.** Use the national BLS PPI figures from `data/national.json`: **5.75%/yr over 10 years** and **4.6%/yr over 18 years** (the longest span the series allows).

## 2. FEMA NRI v1.20 (Dec 2025): rating · annualized frequency · building EAL ($/yr)

| Hazard | Anne Arundel (primary) | Baltimore City | Baltimore County | Queen Anne's |
|---|---|---|---|---|
| **Overall risk (score)** | Rel. Moderate (81.9) | Rel. High (95.0) | Rel. Moderate (94.0) | Very Low (35.6) |
| Strong wind | Rel. High · 7.74 · $918K | Rel. High · 8.13 · $659K | Rel. High · 7.99 · $1.23M | Rel. Low · 6.59 · $233K |
| Tornado | Rel. Mod · 0.43 · $1.87M | Rel. High · 0.07 · $2.16M | Rel. Mod · 0.50 · $3.54M | Rel. Low · 0.32 · $335K |
| Hurricane | Rel. Mod · 0.094 · $7.93M | Rel. Mod · 0.104 · $9.45M | Rel. Mod · 0.101 · $13.0M | Rel. Low · 0.094 · $914K |
| Hail | Rel. Mod · 3.38 · $1.08M | Rel. Mod · 3.60 · $1.16M | Rel. Mod · 3.50 · $1.28M | Very Low · 2.60 · $5K |
| Winter weather | Rel. High · 9.52 · $71K | Very High · 10.83 · $36K | Very High · 12.50 · $142K | Rel. Mod · 7.63 · $14K |
| Ice storm | Rel. Mod · 0.43 · $177K | Rel. Mod · 0.95 · $109K | Rel. Mod · 1.03 · $53K | Rel. Low · 0.60 · $31K |
| Inland flood (schema key `riverine_flooding`) | Rel. Mod · 3.64 · $32.1M | Rel. High · 1.89 · $51.5M | Rel. High · 5.64 · $62.7M | Very Low · 1.18 · $3.90M |
| Coastal flood | Rel. Mod · 3.66 · $2.18M | Rel. Mod · 3.69 · $509K | Rel. Mod · 3.69 · $1.58M | Rel. Mod · 3.65 · $1.01M |
| Heat wave | Rel. Mod · 6.29 · ~$0 | Rel. High · 6.80 · ~$0 | Rel. High · 5.39 · ~$0 | Rel. Low · 5.58 · $0 |
| **All-hazard building EAL / building value** | $49.6M / $106.9B | $70.2M / $116.8B | $89.9M / $161.2B | $6.9M / $10.8B |

The "rating" column is NRI's hazard *risk* rating (the `_RISKR` field). NRI frequencies are countywide event counts, not the chance that one particular roof is damaged. Cold wave and lightning are also in the JSON.

## 3. Assumption table

C = confidence (H/M/L). "Excerpt" means the figure came from a search-engine excerpt and the full page was not read.

| Assumption | Value (low–high) | As of | C | Source(s) | Notes |
|---|---|---|---|---|---|
| TPO $/sf | 7.40 (4.00–12.00) | 2026 | L | [CRG Glen Burnie](https://commercialroofguide.com/states/maryland/glen-burnie/); [CRG Baltimore](https://commercialroofguide.com/states/maryland/baltimore/); [Crown Remodeling (Annapolis)](https://crownremodelingllc.com/commercial-roofing/annapolis-md/); [TRB](https://theroofingbrief.com/commercial-roof-replacement-cost/); [roofreplacementcost.ai](https://www.roofreplacementcost.ai/blog/commercial-roof-replacement-cost) | Midpoint of Glen Burnie $5.81–8.98. Excerpt |
| EPDM $/sf | 7.00 (4.00–10.00) | 2026 | L | [CRG cost guide](https://commercialroofguide.com/guides/commercial-roof-cost/); [CRG Baltimore](https://commercialroofguide.com/states/maryland/baltimore/); [Crown](https://crownremodelingllc.com/commercial-roofing/annapolis-md/) | Midpoint of $5.50–8.50 |
| Mod bit $/sf | 7.50 (6.00–12.00) | 2026 | L | [CRG cost guide](https://commercialroofguide.com/guides/commercial-roof-cost/); [TRB](https://theroofingbrief.com/commercial-roof-replacement-cost/); [tear-off excerpt](https://veteranroofingsystems.com/commercial-roof-replacement-cost-what-to-expect-and-how-to-plan-2026-guide/) | $6–9, which may exclude tear-off (+$1–3) |
| BUR $/sf | 8.75 (6.00–10.50) | 2026 | L | [CRG cost guide](https://commercialroofguide.com/guides/commercial-roof-cost/); [TRB](https://theroofingbrief.com/commercial-roof-replacement-cost/) | $7–10.50, same caveat |
| Metal $/sf | 16.00 (10.00–22.00) | 2026 | L | [CRG cost guide](https://commercialroofguide.com/guides/commercial-roof-cost/); [CRG Baltimore](https://commercialroofguide.com/states/maryland/baltimore/); [TRB](https://theroofingbrief.com/commercial-roof-replacement-cost/) | Standing seam |
| Coating/restoration $/sf | 3.50 (1.50–7.00) | 2025–26 | L | Reused from Laurel ([West Roofing](https://www.westroofingsystems.com/cost-restore-tpo-epdm-silicone-coating) and others) | Not a tear-off |
| Location cost factor | **null** | — | L | [RSMeans notice](https://www.rsmeans.com/media/wysiwyg/quarterly_updates/Q1-2024-ChangeNotice.pdf); [UFC 3-701-01](https://www.wbdg.org/FFC/DOD/UFC/ufc_3_701_01_2022_c7.pdf) | The $/sf figures are already local |
| Escalation, 10-yr | 5.75 %/yr (2.47–9.14) | Dec 2015–Dec 2025 | M | `data/national.json` → [FRED PCU23816X23816X](https://fred.stlouisfed.org/series/PCU23816X23816X) | National |
| Escalation, 20-yr | 4.60 %/yr (2.91–5.75) | Dec 2007–Dec 2025 | M | same | 18 yrs is the longest span available |
| Strong-wind frequency | 7.74/yr (6.59–8.13) | NRI v1.20 | M | [NRI v1.20 mirror](https://raw.githubusercontent.com/ooowen-unc/flood_set/main/NRI_Table_Counties.csv); [FEMA NRI](https://hazards.fema.gov/nri/data-resources); [NWS derecho](https://www.weather.gov/media/publications/assessments/derecho12.pdf) | Countywide |
| Winter-weather frequency | 9.52/yr (7.63–12.50) | NRI v1.20 | M | same, plus [DR-1875](https://www.fema.gov/sites/default/files/2020-09/PDAReport_FEMA-1875-DR-MD.pdf) and [DR-4261](https://www.fema.gov/sites/default/files/2020-09/FEMA4261DRMD.pdf) | v1.20 is about 3× v1.19 because of a method change |
| Ice-storm frequency | 0.43/yr (0.43–1.03) | NRI v1.20 | M | NRI mirror | |
| Hurricane/tropical frequency | 0.094/yr (0.094–0.38) | NRI v1.20; HURDAT2 1975–2024 | M | NRI mirror; [HURDAT2 mirror](https://raw.githubusercontent.com/CongGao-CG/HURDAT2kml/main/hurdat2-1851-2024-040425.txt) | High end = tropical-storm passages within 100 nm |
| Tornado frequency | 0.43/yr (0.07–0.50) | NRI v1.20 | M | NRI mirror; [NWS Ida tornadoes](https://weather.gov/lwx/IdaTors); [WUSA9](https://www.wusa9.com/article/weather/nws-annapolis-ef-2-tornado/65-b53a7f14-3278-4df2-8280-f7ef215503e8) | Annapolis EF2 in 2021 |
| Hail frequency | 3.38/yr (2.60–3.60) | NRI v1.20 | M | NRI mirror | Now rated Rel. Moderate |
| Coastal-flood frequency | 3.66/yr (3.65–3.69) | NRI v1.20 | M | NRI mirror; [NWS Isabel](https://www.weather.gov/media/publications/assessments/isabel.pdf); [Annapolis Flooding Data](https://www.annapolis.gov/1818/Flooding-Data); [NASA HTF](https://www.nasa.gov/missions/goes/beating-back-the-tides/); [UCS](https://www.ucs.org/resources/sea-level-rise-and-tidal-flooding-annapolis-maryland) | Isabel 7.2 ft MLLW record (excerpt) |
| Inland-flood frequency | 3.64/yr (1.18–5.64) | NRI v1.20 | M | NRI mirror | Anne Arundel's largest EAL at $32.1M (65% of total) |
| Significant roof event (derived) | 0.21/yr (0.18–0.35) ≈ 4 per 20 yrs | 2026 | L | FEMA DRs, NWS, HURDAT2 (above) | 5 events 2003–2026 |
| Freeze-thaw cycles | **null** | — | L | [NWS BWI normals](https://www.weather.gov/lwx/bwinme) | Not surfaced or blocked |
| Insurance rate trend | 7.9 %/yr (−13.0 to +20.4) | Q1 2023–Q2 2026 | L | Reused from Laurel ([CIAB](https://www.ciab.com/resources/soft-market-clear-in-q3-2025-according-to-the-council-of-insurance-agents-brokers-quarterly-p-c-market-survey/), [Marsh](https://www.marsh.com/en/about/media/global-commercial-insurance-falls-6-percent-q2-2026.html)) | National figure. The market is soft |
| Roof-age underwriting | text | 2025–26 | L | Reused from Laurel ([Gerety MD](https://geretyinsurance.com/commercial-property-insurance-maryland-2026-gaps/) and others) | |
| Wind/hail deductible | 1–5% per building; MDJIA 5% | 2025–26 | L | Laurel sources; [Allen Thomas Group](https://allenthomasgroup.com/commercial-insurance/policies/commercial-property-insurance/maryland/); [MDJIA](https://www.mdjia.org/policies) | MDJIA figure is an excerpt and unverified |
| Cap rate, industrial | 7.5% (7.5–7.9) | Q1 2026 | M | [NAI KLNB MD Industrial Q1 2026](https://klnb.com/wp-content/uploads/2026/04/NAIKLNB_MD_Industrial_Q1_2026.pdf); [citybiz](https://www.citybiz.co/article/838401/baltimore-industrial-recalibration-driven-by-new-supply-and-selective-leasing/); [CBRE](https://www.cbre.com/insights/figures/baltimore-industrial-figures-q1-2026) | Metro figure. No BWI-submarket figure found |
| Cap rate, office | 7.5% (6.0–10.3) | Feb 2026 | L | [M&M 2026 office outlook](https://www.marcusmillichap.com/research/research-brief/2026/02/research-brief-february-2026-office-market-outlook-and-highlights); [Brexton](https://www.brextoncre.com/post/baltimore-commercial-real-estate); [Thomas Park Annapolis Q2 2026](https://www.citybiz.co/article/874787/thomas-park-commercial-releases-q2-2026-greater-annapolis-commercial-real-estate-market-report/) | **National** figure |
| Cap rate, retail | 7.0% (6.44–7.3) | Q4 2025–Q1 2026 | L | [FRT Q4 2025 call](https://www.fool.com/earnings/call-transcripts/2026/02/12/federal-realty-frt-q4-2025-earnings-transcript/); [Daily Record](https://thedailyrecord.com/2025/10/23/annapolis-town-center-sold-for-187m/); [Apartment Loan Store (CBRE)](https://apartmentloanstore.com/baltimore/maryland/cap-rate); [M&M retail 2026](https://www.marcusmillichap.com/research/market-report/multiple-markets/2026/2026-us-retail-investment-forecast) | Based on one deal |
| Roof life, maintained | 21 yrs (16–21) | 2025–26 | L | Reused from Laurel ([GSM/NRCA](https://www.gsmroofing.com/news/nrcas-preventive-maintenance-tips-prolonging-the-life-of-commercial-roofs/), [NRC Canada](https://nrc-publications.canada.ca/eng/view/supplement/?id=49c7996a-27aa-4c44-bcaa-5f6df2ea4f1b&dp=120)) | |
| Roof life, reactive | 13 yrs | 2025–26 | L | Reused from Laurel | |
| Code triggers | text | 2026 | M | Laurel sources plus [AA Commercial Code Requirements](https://www.aacounty.org/inspections-and-permits/building-codes/commercial-code-requirements) and [Crown](https://crownremodelingllc.com/commercial-roofing/annapolis-md/) | 2021 IBC/IECC in force in Anne Arundel. IBC 1511.3.1.1 bars a recover over a wet roof. IECC C503.3.1 requires an R-value upgrade |

## 4. Caveats

- **Mixed NRI versions across markets.** Millersville uses v1.20 and Laurel uses v1.19. Refresh Laurel before any side-by-side comparison.
- **Most market numbers are search excerpts.** That covers cost per square foot, cap rates, insurance, Isabel water levels and high-tide-flood counts. Some excerpts could not be tied to a single page. For example, the Annapolis "$4–8 single-ply" figure is attributed to Crown Remodeling as the *probable* source. The Commercial Roof Guide mod bit, BUR and metal ranges may come from its national cost guide rather than the Baltimore page.
- **Whether the $/sf figures include tear-off is unclear.** Model defaults may understate full tear-off replacement by about $1–3/sq ft. They also exclude the IECC insulation upgrade, which runs about $2.00–3.50/sq ft.
- **The retail cap rate rests on one institutional deal** (Annapolis Town Center). It probably understates the cap rate for smaller strip or neighborhood centers.
- **The office cap rate is national.** Annapolis office fundamentals (6.2% vacancy) are much stronger than Baltimore's.
- **HURDAT2 counts** use distance from downtown Annapolis and the storm's peak interpolated wind inside that radius, with storms of any status included. That peak is not the wind measured at the site.
- **Insurance, roof life and code are Maryland-wide**, reused from Laurel. I found no source quantifying how salt air or a shoreline location affects roof life.

## 5. Open questions

1. PAX job-history $/sf by system in Anne Arundel and Baltimore, split into tear-off vs recover and with or without the insulation upgrade.
2. A BWI Corridor industrial cap rate taken directly from CBRE, C&W, JLL, Colliers or MacKenzie.
3. Office cap rates for Annapolis and suburban Baltimore.
4. The going-in cap rate for Annapolis Town Center, from Federal Realty's 8-K, plus CBRE's Baltimore retail figures read first-hand.
5. A location cost factor: the DoD area cost factor for Fort Meade or Annapolis, or RSMeans CCI for zips 210–212 and 214.
6. Freeze-thaw cycles per year from NCEI GHCND data for BWI or Annapolis.
7. NCEI Storm Events counts for Anne Arundel, 2000–2025, to replace the derived event composite.
8. The share of PAX's local portfolio that is Bay-front or inside a FEMA coastal flood zone. This decides whether surge belongs in the default scenario.
9. Verification of the MDJIA commercial 5% wind/hail deductible and of typical named-storm deductibles on shoreline commercial property.
10. Code editions and amendments in Baltimore City and Baltimore County, and the timing of Maryland's 2024 I-code adoption.
11. Refreshing `laurel.json` to NRI v1.20.
