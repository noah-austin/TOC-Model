# San Antonio, TX: Roof TCO Market Research

**Market id:** `san-antonio` · **Counties:** Bexar (48029), plus Comal (48091) and Guadalupe (48187) as secondary · **Researched:** 2026-09-28
**Data file:** `data/markets/san-antonio.json`

> **Access caveat (read first).** The research environment's egress proxy blocked direct fetches of almost every website (FEMA, NOAA, BLS, FRED, TDI, broker and contractor sites). Three datasets were **opened in full** through GitHub mirrors: the FEMA NRI v1.19 county table, the BLS roofing-contractor PPI series, and 2021 IBC/IEBC text. **Everything else was read only as search-engine result excerpts.** Those values carry reduced confidence and should be checked against the live page before any client-facing use. The session's web-search quota also ran out before cap rates and roof life could be researched, so those fields are `null`.

## 1. Key findings

- **Hail is the dominant roof peril, and Bexar is nationally extreme.** FEMA NRI (v1.19) rates Bexar hail **Very High** (score 99.7). Its expected annual loss (EAL) to buildings is **$28.5M/yr**, 44% of Bexar's all-hazard building EAL of $64.8M. Tornado is also **Very High** ($21.4M/yr). Together, hail and tornado make up **77%** of expected building loss.
- **Hail frequency depends on how you count it:**
  - County-wide (Bexar is 1,257 sq mi), ≥1-in hail falls on about **3.1 days/yr** (1970 onward, NOAA Storm Events via Houston Chronicle). That rose to **4.4 days/yr in 2016–2025**, the highest decade on record. NRI's figure is 2.98 events/yr.
  - Golf-ball hail (≥1.75 in) occurs about **1.8×/yr**. Baseball-size hail has occurred about **once every 3 years** (20 times since 1970).
  - Hail ≥2 in was reported in **4 of the 6 years 2020–2025**.
- **Expected loss for a single property is small, but when a hit comes it is large.** NRI's hail annualized loss rate is **0.0104% of building value per year**, about $104 per $1M of building value. Losses are concentrated in rare events such as the **12 April 2016** storm (~$1.36–1.4B, the costliest Texas hailstorm at the time).
- **Replacement cost is rising fast.** The BLS PPI for nonresidential roofing contractors (national) grew **4.6%/yr from 2007 to 2025** and **5.5%/yr over the last 10 years**. It rose 21% in 2022 alone.
- **Replacement cost ranges (tear-off included; contractor sources, medium/low confidence):**
  - TPO: $7–20/sf, default $13.5
  - EPDM: $6–13.5, default $9.75
  - Mod-bit: $7–13.5, default $10.25
  - BUR: $5–10, default $7.5
  - Metal: $10–18, default $14
  - Coating/restoration: $1.5–5.5, default $3.5
  - For comparison, San Antonio TPO membrane-only is quoted at $5.28–8.16/sf.
- **Insurance is in a soft cycle after a hard one.** US commercial property premiums rose +20.4% in Q1 2023 and fell −6.3% in Q2 2026 (CIAB); Marsh reports US property −13% in Q2 2026. Carriers are still tightening roof terms: ACV conversion at 10/15/20-year roof age, roof payment schedules, and cosmetic-hail exclusions. Commercial wind/hail deductibles run **1–5% of TIV**. At 2% on a $10M building, the owner keeps the first $200K, which often makes the roof effectively self-insured against hail.
- **Code.** The 2021 IBC §1512 / IEBC §705 prohibit a recover over a **water-soaked or deteriorated** roof, or over a roof that already has **two or more layers**. That code rule is the direct link between neglect and forced full tear-off. Coatings over single-ply, mod-bit, BUR, metal and SPF are allowed without tear-off.

## 2. Coworker's claims vs. the data

| Claim (ChatGPT-derived) | Verdict | Evidence |
|---|---|---|
| 20-yr TCO for a $100K roof: ~$329K maintained vs ~$564K reactive | **Unverified** | The result depends on roof-life and repair-cost assumptions, and no credible maintained-vs-reactive roof-life source was found. For scale, using sourced escalation (4.6%/yr), a $100K roof costs ~$157K to replace in year 10 and ~$246K in year 20. $564K is reachable only if a reactive owner buys roughly two more roofs within 20 years. Do not quote these totals until the roof-life inputs are sourced. |
| Replacement cost doubles in ~14–18 yrs | **Roughly holds** | This implies 3.9–5.1%/yr. The PPI CAGR is 4.6% for 2007–2025 (doubling in ~15.4 yrs) and 5.5% for the last 10 years (doubling in ~12.9 yrs). Caveats: 2008–2015 averaged only ~1.9%/yr, most of the gain came in 2021–23, and the series is national. |
| A destructive storm every ~4–5 yrs | **Holds at metro level; overstated at property level** | Somewhere in Bexar, baseball-size hail occurs about every 3 yrs and ≥2-in hail occurred in 4 of the last 6 yrs. A single building, though, has an expected hail loss of only ~0.01%/yr of its value (NRI). The sales model should frame this as "your roof will very likely see at least one significant hail event over 20 years", not "your roof will be destroyed every 4–5 years". |
| Cap rates 6.5–8.5% | **Unverified** | Not researched because the search quota ran out. Needs a current CBRE / C&W / JLL / M&M survey. |

## 3. Assumption table

"Excerpt" in the Access column means the value was read from a search-result excerpt, not the opened page.

| Assumption | Default | Range | Unit | As of | Conf. | Source(s) | Access |
|---|---|---|---|---|---|---|---|
| TPO replacement (tear-off) | 13.5 | 7–20 | $/sf | 2026 | med | [Prestige 360 SA](https://prestige360design.com/blog/commercial-roofing-cost-san-antonio/), [Commercial Roof Guide SA](https://commercialroofguide.com/states/texas/san-antonio/), [TriVAN TPO TX](https://www.trivanroofing.com/blog/tpo-roofing-cost-guide-texas-2026), [Roofing Brief](https://theroofingbrief.com/commercial-roof-replacement-cost/) | excerpt |
| EPDM replacement | 9.75 | 6–13.5 | $/sf | 2026 | med | [TriVAN TX](https://www.trivanroofing.com/blog/commercial-roof-replacement-cost-texas-2026), [Roofing Brief](https://theroofingbrief.com/commercial-roof-replacement-cost/) | excerpt |
| Mod-bit replacement | 10.25 | 7–13.5 | $/sf | 2026 | med | TriVAN TX, Roofing Brief (as above) | excerpt |
| BUR replacement | 7.5 | 5–10 | $/sf | 2026 | low | [Roofing Brief](https://theroofingbrief.com/commercial-roof-replacement-cost/) (single source) | excerpt |
| Metal (standing seam) | 14 | 10–18 | $/sf | 2026 | low | [Roofing Brief](https://theroofingbrief.com/commercial-roof-replacement-cost/) (single source) | excerpt |
| Coating / restoration | 3.5 | 1.5–5.5 | $/sf | 2026 | med | [M&M Roofing TX](https://mmroofsiding.com/blog/commercial-roof-coating-cost/), [Roofing Brief coatings](https://theroofingbrief.com/roof-coating-types-and-cost/) | excerpt |
| Tear-off add (single-ply / BUR-mod-bit) | — | 1.50–2.50 / 2.00–3.50 | $/sf | 2026 | med | [TriVAN TPO TX](https://www.trivanroofing.com/blog/tpo-roofing-cost-guide-texas-2026) | excerpt |
| Location cost factor | 0.90 | — | index | 2026 | low | [Ximator SA](https://ximator.com/blog/construction-cost-san-antonio-tx-2026) (general construction); [RSMeans CCI](https://www.rsmeans.com/rsmeans-city-cost-index) is paywalled | excerpt |
| Escalation, 10-yr | 5.5 | 1.9–8.9 | %/yr | Apr 2025 | high | [BLS PPI PCU23816X23816X mirror](https://raw.githubusercontent.com/evilb1000/whatsitcost/main/ScrapedData/scrapedSeries/PCU23816X23816X_raw.csv), [FRED](https://fred.stlouisfed.org/series/PCU23816X23816X) | opened (mirror) |
| Escalation, long-run (18-yr; series starts 2007) | 4.6 | 1.9–8.9 | %/yr | Dec 2025 | med | same | opened + excerpt (Dec 2025 = 224.789) |
| Hail ≥1 in, county-wide | 3.1 | 2.98–4.4 | days/yr | 2025 | med | [Houston Chronicle](https://www.houstonchronicle.com/san-antonio-weather/article/hail-san-antonio-texas-weather-severe-storm-22208133.php), NRI | excerpt + opened |
| Hail ≥2 in / baseball, county-wide | 0.33 | 0.33–0.67 | events/yr | 2025 | low | Houston Chronicle, [Stormersite](https://www.stormersite.com/hail_reports/bexar_county_texas/all) | excerpt |
| NRI hail: rating / AFREQ / EAL-bldg | Very High / 2.98 / $28.47M | — | — | NRI v1.19 (2023) | high | [NRI mirror](https://raw.githubusercontent.com/dynamiquet/Project-SAND/main/NRI_Table_Counties/NRI_Table_Counties.csv), [FEMA NRI data](https://www.fema.gov/about/openfema/data-sets/national-risk-index-data) | opened (mirror) |
| NRI tornado | Very High / 0.435 / $21.39M | — | — | 2023 | high | NRI | opened |
| NRI strong wind | Rel. Moderate / 0.98 / $374K | — | — | 2023 | high | NRI | opened |
| NRI winter weather | Rel. High / 0.74 / $19K | — | — | 2023 | high | NRI | opened |
| NRI ice storm | Rel. High / 0.19 / $354K | — | — | 2023 | high | NRI | opened |
| NRI heat wave | Rel. High / 0.25 / $40 | — | — | 2023 | high | NRI | opened |
| NRI hurricane | Rel. Moderate / 0.036 / $8.13M | — | — | 2023 | high | NRI | opened |
| NRI riverine flood | Rel. High / 7.9 / $2.32M | — | — | 2023 | high | NRI | opened |
| Bexar overall NRI risk | Relatively High (98.3); building EAL $64.8M/yr | — | — | 2023 | high | NRI | opened |
| Hail loss rate to buildings | 0.0104 | — | %/yr of bldg value | 2023 | high | NRI (HAIL_EALB ÷ BUILDVALUE) | opened |
| Apr 12 2016 hailstorm | ~$1.36–1.4B | — | $ | 2016 | med | [MySA](https://www.mysanantonio.com/business/local/article/San-Antonio-hail-storm-1-4-billion-in-losses-7269460.php), [Insurance Journal](https://www.insurancejournal.com/news/southcentral/2016/12/14/435200.htm) | excerpt |
| Winter Storm Uri (TX) | 510,772 claims; ~$11.2B | — | $ | Mar 2022 | med | [TDI](https://www.tdi.texas.gov/reports/documents/feb2021-tx-winter-weather-summary-mar2022.pdf) | excerpt |
| Commercial property premium trend | null | −13 to +20.4 | % | Q2 2026 | med | [CIAB Q2 2026](https://www.ciab.com/resources/q2-2026-pc-market-survey), [Marsh Q2 2026](https://www.marsh.com/en/about/media/global-commercial-insurance-falls-6-percent-q2-2026.html), [CIAB Q1 2023 via IJ](https://www.insurancejournal.com/magazines/mag-features/2023/06/05/723092.htm), [CIAB Q4 2023](https://www.ciab.com/resources/q4-2023-p-c-market-survey) | excerpt |
| Commercial wind/hail deductible | — | 1–5 | % of TIV | 2025–26 | med | [Lundquist Law](https://www.lundquistlawfirm.com/blog/hail-damage-commercial-policyholder); residential 2% norm: [Monumental Roofing](https://www.monumentalroofing.com/texas-wind-hail-deductible-guide/) | excerpt |
| Roof-age ACV trigger | — | 10–20 | yrs | 2026 | low–med | [Latent Insurance](https://www.latentinsure.com/blog/texas-hail-damage-home-insurance), [Higginbotham](https://www.higginbotham.com/blog/commercial-roof-limitation-endorsements/), [Core Commercial Roofing](https://corecommercialroofing.com/commercial-property-insurance-and-roof-claims-in-texas/) | excerpt (mostly residential) |
| Cap rates (ind/office/retail) | null | — | % | — | low | not researched | — |
| Roof life, maintained / reactive | null | — | yrs | — | low | not found | — |
| Re-roof code triggers | text | — | — | 2021 I-codes | med | [2021 IBC ch.15](https://raw.githubusercontent.com/thexqin/us-building-codes-dataset/main/download/texas/ibc-2021/chapter-15-roof-assemblies-and-rooftop-structures.csv), [2021 IEBC ch.7](https://raw.githubusercontent.com/thexqin/us-building-codes-dataset/main/download/texas/iebc-2021/chapter-7-alterations-level-1.csv) | opened (model code; local adoption unverified) |

**How the defaults were derived.** Each replacement-cost default is the midpoint of the envelope of tear-off-inclusive figures across the sources. Where a Texas source quoted the system price without tear-off, its separately quoted tear-off cost was added. Escalation figures are CAGRs computed from the PPI index values.

### Secondary counties (NRI v1.19)

| | Overall | Hail (rating / AFREQ / EAL-bldg) | Tornado | Winter wx | Riverine flood |
|---|---|---|---|---|---|
| Comal | Rel. Moderate | Rel. Low / 3.83 / $70K | Rel. High / 0.25 / $2.91M | Rel. High / 0.80 / $26K | Rel. High / 4.29 / $9.28M |
| Guadalupe | Rel. Moderate | Rel. Low / 3.07 / $31K | Rel. High / 0.29 / $2.17M | Rel. High / 0.68 / $29K | Rel. High / 3.33 / $7.67M |

Comal and Guadalupe see hail as often as Bexar, but NRI's historic loss ratio there is far lower. NRI county EALs reflect past losses and exposure density, so for a roof in New Braunfels or Seguin the Bexar hazard is the more prudent reference.

## 4. Caveats

1. **Excerpt-sourced values.** Most non-NRI, non-PPI numbers came from search-result excerpts, not from reading the page. Some excerpts appeared to blend sources; for example, one mixed up the 1992 and 2016 storms, and that was not used.
2. **NRI version.** The data is NRI **v1.19 (March 2023)**, taken from a third-party GitHub copy of FEMA's county table. FEMA has since published **v1.20 (Dec 2025)**, and values may differ.
3. **County-wide vs. site hail frequency.** Storm-report counts cover the whole county. They also rise over time as reporting improves and population grows. Neither is the probability that a specific roof is hit.
4. **PPI is national** and measures the prices contractors charge for a fixed set of tasks. It does not capture San Antonio labor conditions or post-storm demand surges.
5. **Contractor $/sf figures** are marketing content with inconsistent scope (membrane-only vs. full tear-off with insulation). The ranges are wide on purpose.
6. **Insurance trend figures are national.** Texas-specific commercial rate data was not found, and roof-age underwriting sources are mostly homeowner-focused.
7. **Heat/UV aging** is a real San Antonio factor (NRI heat wave is "Relatively High"), but it could not be quantified with a sourced figure.

## 5. Open questions / next steps

- Cap rates for industrial, office and retail in San Antonio (CBRE H1 2026 Cap Rate Survey; C&W, JLL and M&M Q2 2026 SA reports).
- Maintained vs reactive roof life for low-slope systems in hot climates (NRCA, IIBEC, manufacturer warranty maintenance clauses).
- The City of San Antonio's adopted IBC/IEBC/IECC edition and local amendments, and the IECC roof-replacement insulation R-value for climate zone 2A.
- Re-pull NRI v1.20 from hazards.fema.gov, and SPC hail reports within ~25 mi of the metro, to build a site-level strike probability.
- The RSMeans 2026 CCI or DoD Area Cost Factor for San Antonio, to replace the low-confidence 0.90.
- Texas commercial property rate data, and whether carriers give documented-maintenance credits or RCV retention.
- Insured losses for the Apr 28 2021 and May 9 2024 SA hail events, to build an event catalog.
- Rebuild the coworker's $329K/$564K TCO once the roof-life inputs are sourced.

## Round 2 update (October 2026)

Every figure below comes from a web-search result excerpt (broker sites were blocked for direct fetch). Full derivations are in each key's `note`.

| Key | Value (range) | Confidence | Sources |
|---|---|---|---|
| `replacement_cost_per_sqft.tpo` (changed from 13.5) | $11.00 ($7–20, unchanged) | medium | [Commercial Roof Guide SA](https://commercialroofguide.com/states/texas/san-antonio/), [Prestige 360](https://prestige360design.com/blog/commercial-roofing-cost-san-antonio/), [TriVAN TPO TX](https://www.trivanroofing.com/blog/tpo-roofing-cost-guide-texas-2026), [Roofing Brief](https://theroofingbrief.com/commercial-roof-replacement-cost/), [RISE Austin](https://www.riseroofingaustin.com/commercial-roof-cost-calculator/) |
| `cap_rates.industrial` | 7.3% (6.0–8.5) | medium | [Partners SA Industrial Q1 2026](https://partnersrealestate.com/research/san-antonio-industrial-q1-2026-quarterly-market-report/), [Lumi CRE](https://lumicre.com/investments/san-antonio-industrial-real-estate-market-report-2026/), [Crexi](https://www.crexi.com/blog/san-antonio-commercial-real-estate-market) |
| `cap_rates.office` | 7.7% (6.2–8.9) | medium | [Partners SA Office Q4 2025](https://partnersrealestate.com/research/san-antonio-office-q4-2025-quarterly-market-report/), [Q3 2025](https://partnersrealestate.com/research/san-antonio-office-q3-2025-quarterly-market-report/), [Q2 2025](https://partnersrealestate.com/research/san-antonio-office-quarterly-report-q2-2025/), [Crexi](https://www.crexi.com/blog/san-antonio-commercial-real-estate-market), [Cap Rate Index](https://www.caprateindex.com/cap-rate-by-city/TX-San-Antonio) |
| `cap_rates.retail` | 6.7% (6.4–7.25) | medium | [Partners SA Retail Q1 2026](https://partnersrealestate.com/research/san-antonio-retail-q1-2026-quarterly-market-report/), [Crexi](https://www.crexi.com/blog/san-antonio-commercial-real-estate-market), [Cap Rate Index](https://www.caprateindex.com/cap-rate-by-city/TX-San-Antonio) |

Why TPO changed: the old 13.5 was the midpoint of a $7–20 envelope. The $15–20 top comes from one source's "full reroof with complete tear-off" figure. The median of five tear-off-inclusive source midpoints is $11.00, in line with other markets. The $20 high stays in the range for sensitivity. The excerpt's industrial "Q2 2026 average 5.2%" was excluded as a thin-sample outlier.
