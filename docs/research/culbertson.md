# Culbertson (Northern Virginia): market research memo

**Market:** Culbertson Company of Virginia (Manassas, VA), covering Prince William County (51153), Manassas city (51683), Fairfax County (51059) and Loudoun County (51107)
**Researched on:** 2026-09-28
**Data file:** `data/markets/culbertson.json`

> **Read this first: how the data was gathered.** This session's egress proxy blocked direct access to FEMA, BLS, FRED, CBRE, NOAA, county and code websites, and the web-search allowance ran out partway through the work. Two datasets were downloaded and computed directly: the **FEMA NRI county table (v1.20.0, December 2025)** and the **BLS roofing PPI monthly series**. Both came from GitHub mirrors, and the version fields were checked. Every other figure comes from a web-search result extract that points to the URL listed. Those figures are marked `low` or `medium` confidence and should be spot-checked in a browser before a customer sees them.

## Key findings

1. **Wind is the main roof peril, and the rest are well below it.** FEMA NRI (Dec 2025) rates Strong Wind **Relatively High** in Prince William, Fairfax and Loudoun, with about **7.1 to 7.8 county-level events per year**. The benchmark event is the 29 June 2012 derecho: a 71 mph gust at Dulles, 65 to 75 mph across suburban DC, and more than 1 million Virginians without power.
2. **Winter weather is rated high, but NRI shows little building loss from it.** Winter Weather is Relatively High (PWC, Loudoun) and Very High (Fairfax), at about 9.5 to 12.3 event-days per year. Building EAL is small because NRI records few structural losses. Leaks from snow load, ice dams and drain freeze-ups, which are the usual maintenance problems, are largely missing from NRI.
3. **Tropical remnants are rare but make up most of the wind-type expected loss.** They arrive about once every 11 to 12 years. Hurricane EAL across the four counties is about **$24.6M/yr**, compared with $2.8M for strong wind and $6.3M for hail.
4. **Storm risk over a 20-year roof life.** At county level, 20 years means roughly 140 strong-wind events, 75 hail events, 5 tornadoes, 11 ice storms and 1 to 2 tropical systems. At building level, the NRI expected annual building loss from roof-relevant hazards (hail, wind, tornado, hurricane, winter weather, ice storm) across the four counties is about **$108 per $1M of building value per year**, or roughly $2,150 per $1M over 20 years. That figure covers all building damage, not only roofs. The model should use EAL ÷ building value, not county frequency × 20.
5. **Replacement cost** is taken from multiple contractor ranges (low confidence). Defaults: TPO **$9.00**, EPDM **$8.00**, mod bit **$9.50**, BUR **$8.90**, metal **$14.00** and coating restoration **$4.00** per sq ft. Local guides put fully insulated 2-ply mod bit at about $15 (VA) and $17 (DC).
6. **Escalation.** The national BLS PPI for nonresidential roofing contractors rose **5.4%/yr over 10 years** (Dec 2014 to Dec 2024) and **4.5%/yr over 17 years** (Dec 2007 to Dec 2024; the series starts in 2007). The 2021 to 2022 spike was +21% and +9%.
7. **Insurance has turned soft.** CIAB commercial property premiums went from +16 to +20% (late 2022 to 2023) down to **−6.3% in Q2 2026**, and Marsh reports US property at −13%. Roof-age endorsements (ISO CP 10 36, which moves roofs to ACV or excludes cosmetic damage) remain widespread, which supports keeping maintenance records.
8. **Cap rates are thinly sourced.** Industrial is about **6.44%** (range 5.7 to 7.5%), and Loudoun figures are pulled down by data-center demand. Office Class B is **8.36%** (PwC NoVA via the Loudoun assessor). **Retail: no usable figure (null).**

## Assumption table

| Assumption | Value (low–high) | Unit | As of | Conf. | Source(s) |
|---|---|---|---|---|---|
| TPO replacement | 9.00 (6.50–11.50) | $/sf | 2025–26 | low | [Roof Troopers NoVA](https://roof-troopers.com/blog/roof-replacement-cost/), [Schoenherr](https://www.schoenherrroofing.com/blog/2025-tpo-roofing-cost-value-pros-cons/), [TRB](https://theroofingbrief.com/commercial-roof-replacement-cost/), [HomeGuide](https://homeguide.com/costs/tpo-roofing-cost), [Roof Observations VA](https://roofobservations.com/virginia-roof-cost-guide/) |
| EPDM replacement | 8.00 (5.00–10.00) | $/sf | 2025–26 | low | [FoxHaven](https://foxhavenroof.com/flat-roof-replacement-cost-2025-complete-pricing-guide/), [TRB](https://theroofingbrief.com/commercial-roof-replacement-cost/), [Constructionspedia](https://constructionspedia.com/epdm-roofing-cost-calculator/), [DeShazo (Richmond)](https://www.deshazoandsonroofing.net/roofing-tips-blog/commercial-roof-installation-cost-richmond-va), [Roof Observations DC](https://roofobservations.com/washington-dc-roof-cost-guide/) |
| Mod bit replacement | 9.50 (6.00–17.00) | $/sf | 2025–26 | low | [TRB](https://theroofingbrief.com/commercial-roof-replacement-cost/), [FoxHaven](https://foxhavenroof.com/flat-roof-replacement-cost-2025-complete-pricing-guide/), [Roof Observations DC](https://roofobservations.com/washington-dc-roof-cost-guide/), [Roof Observations VA](https://roofobservations.com/virginia-roof-cost-guide/) |
| BUR replacement | 8.90 (7.50–11.00) | $/sf | 2025–26 | low | [Durable Rooftop](https://www.durablerooftopsolutions.com/learn/commercial-roofing/cost-to-replace-commercial-roof), [Estimero](https://www.estimero.com/cost-calculators/commercial-roof-replacement), [Windward](https://windwardroofing.com/blog/commercial-roof-cost-guide), [General Roofing](https://generalroof.com/commercial-roof-replacement-cost-per-square-foot/) |
| Metal replacement | 14.00 (10.00–22.00) | $/sf | 2025–26 | low | [TRB](https://theroofingbrief.com/commercial-roof-replacement-cost/), [Hope's (Lynchburg)](https://hopesmetalroofingva.com/how-much-does-it-cost-to-install-a-standing-seam-metal-roof-on-a-commercial-building/), [Modern Day (VA)](https://moderndayroof.com/blog/metal-roof-cost-virginia-2026), [Angi](https://www.angi.com/articles/how-much-does-it-cost-install-standing-seam-metal-roof.htm) |
| Coating restoration | 4.00 (1.50–7.00) | $/sf | 2025–26 | low | [West Roofing](https://www.westroofingsystems.com/cost-of-silicone-roof-coating-system), [No Tear Off](https://notearoffroofing.com/silicone-roof-coating-cost/), [TRB coatings](https://theroofingbrief.com/roof-coating-types-and-cost/) |
| Location cost factor | 1.08 (1.00–n/a) | index | 2021 | low | [DoD ACF 2021](https://www.usace.army.mil/Portals/2/DOD%20Area%20Cost%20Factors%20(ACF)%20PAX%20Newsletter%203_2_1,%20Dated%2021%20May%202021%20(1).pdf), [DoD ACF 2015](https://www.usace.army.mil/Portals/2/docs/2015_PAX_3.2.1_DoD_Area_Cost%20Factors_dated_25%20Mar_%2015_Final.pdf): Fort Belvoir, not RSMeans |
| Escalation, 10-yr | 5.4 (1.9–8.9) | %/yr | Dec 2024 | medium | [BLS PPI PCU23816X23816X mirror](https://raw.githubusercontent.com/evilb1000/whatsitcost/main/ScrapedData/scrapedSeries/PCU23816X23816X_raw.csv), [FRED](https://fred.stlouisfed.org/series/PCU23816X23816X) (national) |
| Escalation, "20-yr" (17-yr available) | 4.5 (1.9–5.75) | %/yr | Dec 2024 | medium | same as above |
| Strong wind frequency (PWC) | 7.13 (7.07–7.78) | events/yr | Dec 2025 | high | [FEMA NRI](https://hazards.fema.gov/nri/data-resources) via [mirror CSV](https://raw.githubusercontent.com/ooowen-unc/flood_set/main/NRI_Table_Counties.csv) |
| Hail frequency (PWC) | 3.78 (3.77–3.92) | events/yr | Dec 2025 | high | FEMA NRI (as above) |
| Winter weather frequency (PWC) | 9.48 (9.48–12.33) | event-days/yr | Dec 2025 | high | FEMA NRI |
| Ice storm frequency (PWC) | 0.55 (0.54–0.58) | events/yr | Dec 2025 | high | FEMA NRI |
| Tornado frequency (PWC) | 0.25 (0.007–0.35) | events/yr | Dec 2025 | high | FEMA NRI |
| Hurricane frequency (PWC) | 0.082 (0.081–0.094) | events/yr | Dec 2025 | high | FEMA NRI |
| Derecho benchmark (June 2012) | 71 mph Dulles gust; >1M VA customers out | n/a | 2012 | medium | [NOAA SPC](https://www.spc.noaa.gov/misc/AbtDerechos/casepages/jun292012page.htm), [NWS assessment](https://www.weather.gov/media/publications/assessments/derecho12.pdf) |
| Commercial property rate trend | −6.3 (−13.0 to +20.4) | % | Q2 2026 | medium | [CIAB Q2 2026](https://www.ciab.com/resources/q2-2026-pc-market-survey), [Insurance Journal](https://www.insurancejournal.com/news/national/2026/08/20/882240.htm), [Marsh Q2 2026](https://www.marsh.com/en/about/media/global-commercial-insurance-falls-6-percent-q2-2026.html), [CIAB Q3 2025](https://www.ciab.com/resources/soft-market-clear-in-q3-2025-according-to-the-council-of-insurance-agents-brokers-quarterly-p-c-market-survey/), [R&I Q4 2024](https://riskandinsurance.com/commercial-insurance-premiums-rise-steadily-in-q4-2024-ciab/), [IJ Q3 2023](https://www.insurancejournal.com/news/national/2023/11/30/750039.htm), [Captive.com Q4 2022](https://www.captive.com/news/commercial-property-passed-cyber-for-largest-premium-increases-in-q4) |
| Roof-age underwriting | CP 10 36 ACV/cosmetic; triggers at 10/15/20 yrs | text | 2026 | low | [Insurance Journal Sept 2026](https://www.insurancejournal.com/magazines/mag-features/2026/09/07/883930.htm), [Adjusters Intl](https://www.adjustersinternational.com/pubs/adjusting-today/be-aware-of-recent-revisions-to-iso-commercial-property-coverage-forms/), [Higginbotham](https://www.higginbotham.com/blog/commercial-roof-limitation-endorsements/), [TRB](https://theroofingbrief.com/actual-cash-value-roof/) |
| Wind/hail deductible | 0.5–1% of limit (homeowner-context sources) | text | 2025 | low | [Ohio Insurance Agents](https://ohioinsuranceagents.com/blog/2025/analyzing-roofing-policy-changes-in-homeowners-insurance/) |
| Industrial cap rate | 6.44 (5.70–7.50) | % | 2025 | low | [Serafin mid-2025](https://serafinre.com/2025-mid-year-northern-virginia-commercial-real-estate-report/), [Serafin Q3 2025](https://serafinre.com/northern-virginia-commercial-real-estate-q3-2025-market-report-serafin-real-estate/), [MLA](https://mylocationadvisor.com/understanding-cap-rates-in-industrial-real-estate-a-guide-for-investors-and-property-owners-in-northern-virginia/), [Loudoun Class C whse](https://www.loudoun.gov/DocumentCenter/View/219226/439-Warehouse-Class-C-BenchmarkCapRateDevel-for-2026-PDF), [Loudoun flex](https://www.loudoun.gov/DocumentCenter/View/219227/444-Flex-warehouse-2026-Guideline-PDF) |
| Office cap rate | 8.36 (n/a) | % | Q3 2025 | low | [Loudoun Class B Office 2026 (PwC NoVA)](https://www.loudoun.gov/DocumentCenter/View/219237/461-Class-B-Office-2026-Guidelines-PDF) |
| Retail cap rate | **null** | % | n/a | low | tried [Loudoun retail guideline](https://www.loudoun.gov/DocumentCenter/View/219224/428---429-Retail-2026-Guidelines-PDF), [CBRE H1 2026](https://www.cbre.com/insights/reports/us-cap-rate-survey-h1-2026) |
| Roof life, maintained / reactive | **null** | years | n/a | low | defer to `data/national.json` |
| Code triggers | USBC (VCC/VEBC 2021) + 2021 IECC, **unverified** | text | n/a | low | [DHCD](https://www.dhcd.virginia.gov/codes), [ICC IBC Ch. 15](https://codes.iccsafe.org/content/IBC2021P2/chapter-15-roof-assemblies-and-rooftop-structures) (not opened) |

### FEMA NRI (v1.20.0, Dec 2025) by county

| Hazard | Prince William | Manassas city | Fairfax | Loudoun |
|---|---|---|---|---|
| Overall risk | Relatively Moderate | Very Low | Relatively High | Relatively Low |
| Strong wind | Rel. High · 7.13/yr · $0.92M | Rel. Low · 7.07 · $0.22M | Rel. High · 7.78 · $1.28M | Rel. High · 7.69 · $0.41M |
| Hail | Rel. Moderate · 3.78 · $1.01M | Very Low · 3.77 · $0.12M | Rel. High · 3.91 · $4.02M | Rel. Moderate · 3.92 · $1.15M |
| Winter weather | Rel. High · 9.48 · $0.05M | Rel. Low · 9.53 · $0.01M | Very High · 9.74 · $0.22M | Rel. High · 12.33 · $0.09M |
| Ice storm | Rel. Low · 0.55 · $0.15M | Very Low · 0.54 · $0.01M | Rel. Moderate · 0.56 · $0.57M | Very Low · 0.58 · $0.03M |
| Tornado | Rel. Moderate · 0.25 · $1.74M | Rel. Low · 0.007 · $0.28M | Rel. Low · 0.30 · $0.95M | Rel. Moderate · 0.35 · $2.40M |
| Hurricane | Rel. Moderate · 0.082 · $3.93M | Rel. Low · 0.081 · $0.40M | Rel. Moderate · 0.091 · $17.48M | Rel. Low · 0.094 · $2.74M |
| Inland flooding | Rel. Moderate · 3.43 · $44.0M | Very Low · 0.57 · $4.27M | Rel. High · 5.82 · $152.7M | Rel. Moderate · 3.04 · $37.2M |
| Heat wave / Cold wave | Rel. Mod. / Very Low | Rel. Low / Very Low | Rel. High / Rel. Mod. | Rel. Mod. / Rel. Low |

Each cell reads rating · annualized frequency · expected annual loss to buildings. Full values are in the JSON.

## Caveats

- **Access limits.** Most non-NRI and non-PPI numbers come from search-engine extracts. The pages themselves were not opened because of the egress proxy.
- **NRI version change.** The Dec 2025 release (v1.20) changed methods substantially compared with Mar 2023 (v1.19). PWC winter-weather frequency went from 2.84 to 9.48 per year, hurricane building EAL went from $17.9M to $3.9M, and "Riverine Flooding" became "Inland Flooding". Don't mix versions across markets.
- **NRI frequency vs. roof damage.** NRI frequency counts events per county, not roofs hit. EAL is all building damage, not roof-only. Inland flooding dominates EAL but is not a roof peril, so it should be excluded from roof storm math.
- **Escalation is national,** and the PPI series only goes back to Dec 2007, so the "20-yr" rate actually covers 17 years.
- **$/sq ft figures lean national.** Several come from contractor marketing pages. The DC-metro premium appears mainly at the high end (insulated systems).
- **The location factor is a 2021 DoD ACF,** not RSMeans.
- **Insurance figures are national soft-market data.** Compounding −6% for 20 years would be wrong.
- **Data centers skew Loudoun and PWC industrial pricing and cap rates.**
- **Culbertson's client mix doesn't fit the v1 types well.** Schools, hospitals and historic buildings are often owner-occupied or public, so cap-rate asset value does not apply. Historic buildings may have steep-slope slate or metal outside this cost table. Masonry and waterproofing scope, such as parapets and through-wall flashing, is a real driver of leaks.
- **Code text is unverified.** Code provisions were summarized from general knowledge of the 2021 I-codes and still need checking against the Virginia USBC.

## Open questions

1. Northern Virginia retail cap rate: get it from CBRE H1 2026 DC-metro tables, the Loudoun 2026 retail guideline, or Cushman/JLL MarketBeat.
2. Office cap-rate range, and a verified industrial rate with data-center trades excluded.
3. RSMeans CCI for Washington DC, Fairfax and Manassas, or the current DoD ACF for Fort Belvoir and Quantico.
4. Recent Culbertson bid tabs by roof system, including tear-off and code insulation, to replace the contractor-blog ranges.
5. Roof life, maintained vs reactive (national.json), and any Culbertson service-life records.
6. Freeze-thaw cycle counts from NOAA normals for IAD and Manassas.
7. Verify the VEBC/VCC re-roof and recover limits, IECC insulation on re-roof, and any Virginia amendments or damage-threshold rules.
8. NoVA commercial wind/hail deductibles and roof-age practices (ask a broker).
9. How the model should project insurance premiums beyond the current cycle.
10. Whether to add Institutional/K-12, Healthcare and Historic property types for Culbertson.

## Round 2 update (October 2026)

| Key | Value (range) | Confidence | Sources |
|---|---|---|---|
| `cap_rates.retail` | 6.1% (5.6–7.5) | low | [Serafin Mid-Year 2026](https://serafinre.com/northern-virginia-commercial-real-estate-market-report-mid-year-2026/), [Serafin Q3 2025](https://serafinre.com/northern-virginia-commercial-real-estate-q3-2025-market-report-serafin-real-estate/), [Loudoun 2026 Shopping Center Guideline](https://www.loudoun.gov/DocumentCenter/View/219224/428---429-Retail-2026-Guidelines-PDF) |

Market points from Serafin: Loudoun 5.64% (Q3 2025), Fairfax 5.99% (H1 2026), Prince William 6.73% (H1 2026), and shopping-center sales at 6.1–6.3%. The value is the median of those points. The Loudoun assessor's 2026 assessment cap rates (7.0% anchored, 7.5% small unanchored) set the high bound. All figures come from search-result excerpts; the pages could not be fetched. The excerpt does not clearly say whether the Fairfax and Prince William averages are retail-only.
