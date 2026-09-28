# Laurel, MD market research memo (Baltimore–Washington corridor)

- **Market file:** `data/markets/laurel.json` (id `laurel`)
- **Researched:** 2026-09-28
- **Counties:** Prince George's (24033), Anne Arundel (24003), Howard (24027). Secondary: Montgomery (24031), Baltimore County (24005)
- **Company:** Patuxent Roofing (PAX Services Group)

> **Read this first: research-environment limitation.** The research sandbox's egress proxy blocked direct page fetches from nearly every host (fema.gov, bls.gov, noaa.gov, cbre.com, wikipedia, broker sites). Two datasets were obtained in full and computed directly:
> 1. **FEMA NRI county table** (v1.19.0, March 2023), from two byte-identical public GitHub mirrors.
> 2. **BLS PPI Roofing Contractors, nonresidential** (PCU23816X23816X), a monthly series from Jan 2008 to Apr 2025, from a public GitHub mirror of a BLS API pull. It was cross-checked against FRED's Feb 2026 value.
>
> Every other figure comes from **search-engine excerpts** of the cited pages. Each figure can be traced to its URL, but nobody read the full page. Confidence is marked low or medium for that reason. Re-verify these figures from an unrestricted network before any customer sees them.

---

## 1. Key findings

1. **Wind and winter are the perils here. Hail is not.** FEMA NRI rates strong wind **Relatively High** in Prince George's and Howard and **Relatively Moderate** in Anne Arundel, at about 7.0–8.0 event-days per year per county. It rates winter weather **Relatively High** in all five counties, at 2.7–3.5 per year. Hail is **Very Low** everywhere. The customer story is summer derechos and thunderstorm wind, winter snow load and ice, freeze-thaw, and occasional tropical remnants. It is not Texas-style hail.
2. **Hurricane or tropical wind is rare but carries the largest expected loss.** It happens about 0.09–0.10 times per year, yet it has the biggest NRI building expected annual loss (EAL) of any hazard in the market: Prince George's **$48.0M/yr**, Anne Arundel **$36.1M/yr**, Howard **$11.6M/yr**. Those figures are 91%, 74% and 78% of each county's all-hazard building EAL.
3. **Significant regional roof-damaging events: about 3.5 per 20-year roof life (range about 2.6–5.5).** This is derived, not published. Three documented region-wide events fell between 2010 and 2026: the Feb 2010 "Snowmageddon" (FEMA DR-1875; it collapsed a Smithsonian warehouse roof in Suitland, Prince George's County), the June 29 2012 derecho (gusts of 60–90 mph), and the Jan 2016 blizzard (DR-4261, which covered Prince George's, Anne Arundel and Howard). The high end adds NRI's tropical-event frequency.
4. **Roofing cost escalation (national) is about 5.5%/yr over 10 years and about 4.5%/yr over 17 years.** Pre-2019 it was only 2.6%/yr. From 2021 to 2023 the index rose 41% in two years. At 4.5%/yr a roof's replacement cost doubles in about 16 years.
5. **Replacement cost:** Baltimore-specific 60-mil TPO runs **$6.05–9.35/sq ft** installed. If a re-roof triggers the IECC insulation upgrade, R-25 to R-35 polyiso adds **$2.00–3.50/sq ft**. Other systems have national ranges only.
6. **Insurance is in a soft market right now.** Commercial property premiums rose +20.4% in Q1 2023 and fell −5.5% in Q1 2026 (CIAB). Marsh reports US property rates down 13% in Q2 2026. The roof-age argument (roof schedules or ACV after about 10–15 years) is stronger than the rate-trend argument at present.
7. **Cap rates:** Baltimore industrial is about **7.7%**, with a range of 7.5–7.9. Baltimore retail is about **6.4–6.8%** (CBRE figures, cited second-hand). Office is only a national figure, **7.5%**. Suburban MD office vacancy is 19.2%.
8. **Code:** Maryland enforces the 2021 I-codes statewide, and a 2024 adoption was proposed in June 2026. Howard County has already adopted the 2024 codes. IBC 1511.3.1.1 bans a recover over a **water-soaked** roof or over **two or more existing layers**. This is the direct code link between neglect and a forced tear-off. IECC C503.3.1 requires re-roofs with above-deck insulation to meet current R-values.

## 2. FEMA NRI summary (v1.19.0, March 2023)

Ratings and annualized frequency (AF, events or event-days per year across the county) and building EAL in $/yr:

| Hazard | Prince George's | Anne Arundel | Howard | Montgomery | Baltimore Co. |
|---|---|---|---|---|---|
| **Overall risk** | Rel. Moderate | Rel. Moderate | Rel. Low | Rel. Moderate | Rel. Moderate |
| Strong wind | Rel. High · AF 7.04 · $809K | Rel. Mod · 8.04 · $499K | Rel. High · 7.69 · $573K | Rel. High · 7.85 · $1.32M | Rel. High · 8.56 · $784K |
| Winter weather | Rel. High · 2.69 · $43K | Rel. High · 2.96 · $94K | Rel. High · 3.18 · $27K | Rel. High · 3.21 · $0.5K | Rel. High · 3.52 · $23K |
| Ice storm | Rel. Mod · 0.36 · $22K | Rel. Mod · 0.47 · $15K | Rel. Mod · 0.89 · $31K | Rel. Mod · 0.63 · $24K | Rel. High · 1.13 · $31K |
| Hurricane | Rel. High · 0.095 · $48.0M | Rel. Mod · 0.104 · $36.1M | Rel. Mod · 0.099 · $11.6M | Rel. High · 0.098 · $55.5M | Rel. High · 0.113 · $59.3M |
| Tornado | Rel. High · 0.37 · $2.23M | Rel. Mod · 0.32 · $1.70M | Rel. Low · 0.19 · $1.16M | Rel. Mod · 0.38 · $2.87M | Rel. Mod · 0.46 · $3.21M |
| Hail | Very Low · 3.52 · $1.2K | Very Low · 3.85 · $4.1K | Very Low · 3.88 · $4.5K | Very Low · 4.19 · $15K | Very Low · 4.07 · $5.8K |
| Riverine flood | Rel. Low · 3.46 · $132K | Rel. Low · 3.75 · $226K | Rel. Mod · 2.67 · $948K | Rel. Low · 5.00 · $466K | Rel. Low · 5.29 · $513K |
| Coastal flood | Rel. Low · 3.71 · $458K | Rel. Mod · 3.66 · $9.40M | Very Low · 0.01 · $0.3K | Very Low | Rel. Low · 3.69 · $15K |
| Heat wave | Rel. High · 0.94 · ~$0 | Rel. High · 1.01 · ~$0 | Rel. Mod · 0.89 · ~$0 | Rel. High · 0.87 · ~$0 | Very High · 0.94 · ~$0 |
| Cold wave | Rel. High · 0.063 · $0.7K | Rel. Mod · 0.067 · $0.5K | Rel. Mod · 0.086 · $0.4K | Rel. High · 0.091 · $0.9K | Rel. Mod · 0.102 · $1.0K |
| **All-hazard building EAL** | $52.8M on $135.2B of buildings | $49.0M on $95.2B | $14.9M on $65.4B | $61.5M on $159.1B | $65.1M on $143.6B |

**How to use this in the model.** NRI frequencies are countywide event counts. They are not the probability that one particular roof is damaged. Dividing EAL by building value gives a per-dollar expected annual loss. For example, strong wind in Prince George's is $809K ÷ $135.2B ≈ 0.0006% of building value per year. That shows typical wind events are low-severity per building. PaxSeal's value lies less in avoiding catastrophic loss and more in keeping small wind and freeze-thaw openings from turning into interior water damage and a forced tear-off.

**Version note.** FEMA released NRI v1.20 in December 2025. Search excerpts show the overall ratings did not change: Prince George's is still Relatively Moderate (score 93.2) and Howard is still Relatively Low (72.4). Refresh this table when the FEMA site can be reached.

## 3. Assumption table

C = confidence (H/M/L). "Excerpt" means the figure came from a search-engine excerpt and the full page was not read.

| Assumption | Value (low–high) | As of | C | Source(s) | Notes |
|---|---|---|---|---|---|
| TPO replacement $/sf | 7.70 (5.00–12.00) | 2025–26 | L | [Commercial Roof Guide – Baltimore](https://commercialroofguide.com/states/maryland/baltimore/); [roofreplacementcost.ai](https://www.roofreplacementcost.ai/blog/commercial-roof-replacement-cost); [The Roofing Brief](https://theroofingbrief.com/commercial-roof-replacement-cost/); [Windward](https://windwardroofing.com/blog/commercial-roof-cost-guide) | Midpoint of Baltimore $6.05–9.35; excerpt |
| EPDM $/sf | 7.00 (4.00–10.00) | 2025–26 | L | [Commercial Roof Guide – Baltimore](https://commercialroofguide.com/states/maryland/baltimore/); [roofreplacementcost.ai](https://www.roofreplacementcost.ai/blog/commercial-roof-replacement-cost); [General Roofing](https://generalroof.com/epdm-roofing-cost-per-square-foot/) | Midpoint of $5.50–8.50; excerpt |
| Mod bit $/sf | 8.00 (4.00–12.00) | 2025–26 | L | [roofreplacementcost.ai](https://www.roofreplacementcost.ai/blog/commercial-roof-replacement-cost); [The Roofing Brief](https://theroofingbrief.com/commercial-roof-replacement-cost/); [Ridgeline](https://ridgelineroofingcompany.com/how-much-does-a-commercial-roof-replacement-cost/) | National only |
| BUR $/sf | 8.00 (6.00–10.00) | 2025–26 | L | [The Roofing Brief](https://theroofingbrief.com/commercial-roof-replacement-cost/) | Single national range |
| Metal $/sf | 16.00 (12.00–22.00) | 2025–26 | L | [roofreplacementcost.ai](https://www.roofreplacementcost.ai/blog/commercial-roof-replacement-cost); [The Roofing Brief](https://theroofingbrief.com/commercial-roof-replacement-cost/) | National only |
| Coating/restoration $/sf | 3.50 (1.50–7.00) | 2025–26 | L | [West Roofing (single-ply)](https://www.westroofingsystems.com/cost-restore-tpo-epdm-silicone-coating); [West Roofing (metal)](https://www.westroofingsystems.com/ballpark-cost-restore-commercial-metal-roof); [No Tear Off](https://notearoffroofing.com/silicone-roof-coating-cost/); [Great Lakes](https://greatlakescommercialroofingllc.com/commercial-roof-coating-cost/) | Not a tear-off |
| Insulation upgrade on re-roof | +$2.00–3.50/sf (R-25 to R-35) | 2026 | L | [Commercial Roof Guide – Baltimore](https://commercialroofguide.com/states/maryland/baltimore/) | Recorded in the TPO note |
| Location cost factor | **null** | — | L | [RSMeans Q1 2024 notice](https://www.rsmeans.com/media/wysiwyg/quarterly_updates/Q1-2024-ChangeNotice.pdf); [UFC 3-701-01 C7](https://www.wbdg.org/FFC/DOD/UFC/ufc_3_701_01_2022_c7.pdf) | Paywalled or blocked. Local $/sf is already local |
| Escalation, 10-yr | 5.5 %/yr (5.5–5.7) | Apr 2025 / Feb 2026 | M | [BLS PPI PCU23816X23816X (mirror)](https://raw.githubusercontent.com/evilb1000/whatsitcost/main/ScrapedData/scrapedSeries/PCU23816X23816X_raw.csv); [FRED](https://fred.stlouisfed.org/series/PCU23816X23816X) | National. 126.7 → 215.584 |
| Escalation, "20-yr" | 4.5 %/yr (2.6–5.7) | Apr 2025 | M | same | Longest available is 17.25 yrs (the series starts Dec 2007) |
| Strong-wind frequency | 7.04/yr (7.04–8.04) | NRI 2023 | M | [NRI mirror](https://raw.githubusercontent.com/dynamiquet/Project-SAND/main/Data/NRI_Table_Counties/NRI_Table_Counties.csv); [FEMA NRI](https://hazards.fema.gov/nri/data-resources) | Countywide event-days |
| Winter-weather frequency | 2.69/yr (2.69–3.18) | NRI 2023 | M | same | |
| Ice-storm frequency | 0.36/yr (0.36–0.89) | NRI 2023 | M | same | |
| Hurricane frequency | 0.095/yr (0.095–0.104) | NRI 2023 | M | same | |
| Tornado frequency | 0.37/yr (0.19–0.37) | NRI 2023 | M | same | |
| Hail frequency | 3.52/yr (3.52–3.88) | NRI 2023 | M | same | Rated Very Low; EAL is negligible |
| Significant regional roof event | 0.18/yr (0.13–0.27) ≈ 3.5 per 20 yrs | 2026 | L | [FEMA DR-1875](https://www.fema.gov/sites/default/files/2020-09/PDAReport_FEMA-1875-DR-MD.pdf); [FEMA DR-4261](https://www.fema.gov/sites/default/files/2020-09/FEMA4261DRMD.pdf); [NWS derecho assessment](https://www.weather.gov/media/publications/assessments/derecho12.pdf); NRI | Derived count, explained in the JSON |
| Freeze-thaw cycles | **null** | — | L | [NWS BWI normals](https://www.weather.gov/lwx/bwinme) | Blocked |
| Insurance rate trend | 7.9 %/yr (−13.0 to +20.4) | Q1 2023–Q2 2026 | L | [CIAB Q1 2024](https://www.insurancejournal.com/news/national/2024/05/20/774982.htm); [CIAB Q4 2024](https://www.insurancejournal.com/news/national/2025/02/20/812606.htm); [CIAB Q3 2025](https://www.ciab.com/resources/soft-market-clear-in-q3-2025-according-to-the-council-of-insurance-agents-brokers-quarterly-p-c-market-survey/); [CIAB Q1 2026](https://www.ciab.com/api/protected-download/resource/3445); [Marsh Q2 2026](https://www.marsh.com/en/about/media/global-commercial-insurance-falls-6-percent-q2-2026.html) | National. Mean of 11 CIAB quarters. The market is currently soft |
| Roof-age underwriting | text | 2025–26 | L | [Gerety (MD)](https://geretyinsurance.com/commercial-property-insurance-maryland-2026-gaps/); [Mansfield](https://mansfieldinsagency.com/blog/insurance-settlement-determined-by-age-of-roof/); [Horton](https://www.thehortongroup.com/resources/wind-hail-deductibles-and-roof-schedules-what-you-need-to-know/) | RC for roofs up to about 10 yrs, schedule after 10+, ACV after about 15+ (mostly personal-lines evidence) |
| Wind/hail deductible | 1–5% per building | 2025 | L | [Horton](https://www.thehortongroup.com/resources/wind-hail-deductibles-and-roof-schedules-what-you-need-to-know/); [ISO CP 03 21](https://www.insurancexdate.com/insurance-forms/CP/CP-03-21/); [ReShield](https://reshield.com/blog/wind-hail-deductibles-commercial-property/) | |
| Cap rate – industrial | 7.7% (7.5–7.9) | Q4 2025–Q1 2026 | M | [citybiz](https://www.citybiz.co/article/838401/baltimore-industrial-recalibration-driven-by-new-supply-and-selective-leasing/); [CBRE Baltimore Industrial Q1 2026](https://www.cbre.com/insights/figures/baltimore-industrial-figures-q1-2026) | Baltimore metro; excerpt |
| Cap rate – office | 7.5% (6.0–10.3) | Feb 2026 | L | [Marcus & Millichap 2026 office outlook](https://www.marcusmillichap.com/research/research-brief/2026/02/research-brief-february-2026-office-market-outlook-and-highlights); [Brexton](https://www.brextoncre.com/post/baltimore-commercial-real-estate) | **National** average |
| Cap rate – retail | 6.55% (6.44–6.80) | Q1 2026 | L | [Apartment Loan Store (citing CBRE)](https://apartmentloanstore.com/baltimore/maryland/cap-rate); [CBRE CRS H2 2025](https://www.cbre.com/insights/reports/us-cap-rate-survey-h2-2025) | Second-hand citation of CBRE |
| Roof life – maintained | 21 yrs (16–21) | 2025–26 | L | [GSM Roofing (citing NRCA)](https://www.gsmroofing.com/news/nrcas-preventive-maintenance-tips-prolonging-the-life-of-commercial-roofs/); [NA Roofing](https://naroofing.com/blog/how-long-does-a-commercial-roof-last/); [NRC Canada](https://nrc-publications.canada.ca/eng/view/supplement/?id=49c7996a-27aa-4c44-bcaa-5f6df2ea4f1b&dp=120) | Secondary attribution to NRCA |
| Roof life – reactive | 13 yrs | 2025–26 | L | same | |
| Code triggers | text | 2026 | M | [COMAR 09.12.51](https://www.law.cornell.edu/regulations/maryland/title-09/subtitle-12/chapter-09.12.51); [ICC NTA](https://www.icc-nta.org/code-update/maryland-code-update-2021-code-cycle-adoption-information/); [MD DLI news](https://www.labor.maryland.gov/labor/build/buildnews.shtml); [Howard Co.](https://www.howardcountymd.gov/inspections-licenses-permits/adopted-codes); [UpCodes IBC 1511](https://up.codes/s/existing-roofing); [Phila. C503.3.1 FAQ](https://www.phila.gov/media/20211115141957/PB_004_FAQ-Roof-Covering-Replacement_-Energy-Code-rev-11.10.21.pdf) | See section 4 |

## 4. Code triggers (detail)

- **Code basis.** The Maryland Building Performance Standards (COMAR 09.12.51) require one I-code edition statewide. The 2021 IBC, IRC, IECC and IEBC took effect statewide on May 29, 2023, and local enforcement was required by May 29, 2024. The 2024 I-codes were proposed in the Maryland Register on June 26, 2026, and comments closed July 27, 2026. Howard County has already adopted the 2024 suite.
- **Recover limits (IBC 1511.3.1.1).** A recover is not allowed if the existing roof is water-soaked or deteriorated, or if it already has two or more roof coverings. In either case the roof must be torn off. **Sales angle:** unrepaired leaks saturate the insulation. That removes the cheaper recover or restoration option, so the owner faces a full tear-off plus the insulation upgrade.
- **Energy code (IECC 2021 C503.3.1).** Replacing a roof that has insulation entirely above the deck triggers the current prescriptive R-value for climate zone 4A. The total R-value may not decrease, and the insulation must be at least 1 inch thick at drains. A Baltimore source puts this upgrade at $2.00–3.50/sf.
- **Damage-percentage rule.** No Maryland equivalent of Florida's 25% rule was found.

## 5. Caveats

- **Verification.** Apart from NRI and the PPI, no figure was checked by reading the full source page, because of proxy blocking. All of them need re-verification.
- **NRI data vintage.** The data is v1.19 (March 2023), and v1.20 (December 2025) exists. The NRI table came from GitHub mirrors, not FEMA directly. Two independent mirrors were byte-identical.
- **Escalation is national.** The BLS roofing PPI covers nonresidential work nationwide. It also has no 20-year history, because the series starts in December 2007.
- **Insurance trend is national,** and it reflects a hard-to-soft cycle. The 7.9% default overstates the forward trend in today's soft market.
- **Office cap rate is national.** The retail cap rate is a second-hand citation of CBRE. The industrial figures come from a news article.
- **Roof-life figures** (21 vs 13 years) are widely repeated and attributed to NRCA, but the primary NRCA document was not found. The figures are not specific to this climate.
- **$/sf figures** come from contractor and aggregator web guides, not bid data. Patuxent job history should replace them.
- **The derived "significant events" rate** counts only events this research could document, so it is an order-of-magnitude figure.

## 6. Open questions

1. Can Patuxent job history (2024–26) replace the web $/sf figures? It should be broken out by system, tear-off vs recover, and with or without the insulation upgrade.
2. For the location factor: can we pull the DoD Area Cost Factor for Fort Meade (UFC 3-701-01 Change 7), or buy RSMeans CCI for zips 207/208 and 210–212?
3. Re-verify every excerpt-sourced figure from an unrestricted network.
4. Refresh NRI to v1.20.
5. Count NCEI Storm Events for Prince George's, Anne Arundel and Howard, 2000–2025: thunderstorm wind of 65 kt or more, heavy snow, and tropical events. This would replace the derived composite.
6. How many freeze-thaw cycles per year occur at BWI (GHCND USW00093721)?
7. Get CBRE Cap Rate Survey figures for Baltimore and Suburban MD directly: industrial, suburban office Class A/B, and neighborhood or strip retail.
8. Is there a Maryland-specific commercial property rate trend, and what roof-age thresholds do carriers actually use for MD commercial property?
9. Which code edition do Prince George's and Anne Arundel currently enforce, and have they amended IBC 1511 or IECC C503.3.1 locally?
10. Where is the primary NRCA, RCI or manufacturer source for the maintained vs unmaintained roof-life figures?
