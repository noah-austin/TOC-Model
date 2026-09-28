# West Palm Beach, FL - Roof TCO Market Research Memo

**Market id:** `west-palm-beach` | **Researched:** 2026-09-28 | **Data file:** `data/markets/west-palm-beach.json`
**Counties:** Palm Beach (12099) is primary. Martin (12085) and Broward (12011) are secondary.

> **Read this first: research limits.** The session's egress proxy blocked every host except GitHub (raw.githubusercontent.com) and package registries: fema.gov, noaa.gov, floridabuilding.org, citizensfla.com, colliers.com, cbre.com, bergercommercial.com, matthews.com, rsmeans.com, usace and all contractor/broker sites returned EGRESS_BLOCKED/403. Primary datasets were obtained from GitHub mirrors and parsed directly: FEMA NRI v1.20 (Dec 2025), NOAA HURDAT2 (1851-2024), NOAA NCEI Storm Events (1996-2025), and the 2023 Florida Building Code (Existing Building ch. 7; Building ch. 2, 15, 16) text. Replacement cost, location factor, insurance and cap-rate figures come only from WebSearch result summaries (pages not opened); attribution of a figure to a specific URL within a result list is approximate, and confidence is capped at low/medium.

## Summary

1. **Hurricane risk is the main story.** FEMA NRI v1.20 (Dec 2025) rates Palm Beach County's overall risk "Relatively High" (score 99.2).
   - Hurricane is rated "Very High" (score 99.9), with an annualized frequency of 0.325/yr.
   - Hurricane accounts for **$254.4M/yr** of the county's $440.9M/yr expected building loss, or 58%. County building exposure is $267.8B.
2. **Storms over a 20-year roof life.** NOAA HURDAT2, centered on downtown West Palm Beach (1975-2024), shows:
   - Tropical storm or stronger within 50 nm: 0.28/yr, or **5.6 per 20 years**.
   - Hurricanes within 50 nm: 0.12/yr, or **2.4 per 20 years**. Using 1995-2024 only, it is 3.3.
   - Hurricanes within 100 nm: 5.6 per 20 years.
   - Since 1975, hurricanes within 50 nm were David (1979), Irene (1999), Frances and Jeanne (2004), Katrina (2005) and Nicole (2022).
   - Wilma (2005), Irma (2017) and Milton (2024) tracked 60-106 nm away but still damaged roofs. Milton spawned EF3 tornadoes in Wellington and Palm Beach Gardens.
   - NCEI shows no hurricane-level county entries between 2006 and 2025. That quiet period can make owners complacent.
3. **Other perils (NRI unless noted):**
   - Inland flooding is "Relatively High", $167.3M/yr. It stresses roof drains.
   - Tornado is "Relatively High", 1.53/yr, $7.1M/yr.
   - Strong wind is "Relatively High", 0.98/yr. NCEI records 4.5 days/yr with thunderstorm gusts of 50 kt or more.
   - Lightning is "Very High". Heat wave is "Relatively High".
   - Hail is "Relatively Low": 0.96/yr and $52k/yr. The largest NCEI report is 2.0 in.
   - Winter weather has no rating and ice storm is "Not Applicable".
4. **Code: Palm Beach is not in the HVHZ.** The FBC 2023 definition limits the HVHZ to Broward and Miami-Dade, and I confirmed this in the code text.
   - The **25% rule** (FBC-EB 706.1.1) forces full re-roofing of a roof section when more than 25% is repaired in 12 months. The SB 4-D (2022) exception applies to roofs built to the 2007 FBC or later (effective about 1 Mar 2009).
   - The resulting sales argument: a pre-2009 roof is a latent full-replacement liability after a storm. Wet insulation also removes the option of a cheaper recover (706.3).
   - When more than 30% of the deck is removed, diaphragm and roof-to-wall evaluation applies (707.3.2; Vult is above 115 mph countywide).
   - Roof-to-wall and secondary-water-barrier upgrades (706.7 and 706.8) apply only to wood-deck buildings not originally permitted under the FBC.
5. **Insurance is softening after the crisis.**
   - Florida commercial property costs rose about 27%/yr in 2022-23, or +125% over the five years to 2023.
   - In H1 2026, large accounts fell 2.7% on average while small accounts rose 1.1%. American Coastal's condo book fell 16.6%.
   - Named-storm deductibles run 2-10% of building value.
   - Carriers move old roofs to ACV and require inspections at 10, 15 or 20 years.
6. **Replacement cost (low confidence, Palm Beach contractor guides):**
   - TPO about $11/sf ($8-14)
   - Mod bit about $12.50 ($9-17)
   - BUR about $12.75 ($11-14.50)
   - Standing-seam metal about $15 ($13-17)
   - Silicone restoration about $7 ($5-9)
   - EPDM: null
   - Location factor proxy: 0.96 (DoD ACF Florida average)
7. **Cost escalation** comes from `data/national.json`: 5.75%/yr over 10 years and **4.6%/yr** over the long run (BLS PPI, national).
8. **Cap rates (low confidence).** The 4.75-5.75% industrial range from the search excerpt was **confirmed only as coming from a lender blog** (clscre.com). Matthews' South Florida Q1 2026 figure of 5.4% corroborates it.
   - Industrial 5.25%
   - Office 6.6% (6.0-7.25)
   - Retail 5.5% (5.0-6.0)
9. **Roof life (low confidence, contractor sources):**
   - Maintained: 20 years (15-25)
   - Reactive: 15 years (10-20). Local sources say membranes rated 20-25 years deliver 15-20 in South Florida without diligent maintenance.
   - The national defaults are 21 and 13 years.

## FEMA National Risk Index v1.20 (December 2025)

Format: rating / annualized frequency (events/yr) / expected annual loss to buildings (USD/yr). Source: [NRI_Table_Counties.csv v1.20 (GitHub mirror, parsed)](https://raw.githubusercontent.com/ooowen-unc/flood_set/main/NRI_Table_Counties.csv). The official [NRI data page](https://hazards.fema.gov/nri/data-resources) was blocked. Inland flooding (IFLD) is reported under "riverine_flooding".

| County | Overall risk (score) | Building value | Building EAL | Hurricane | Inland flood | Tornado | Strong wind | Hail | Coastal flood | Lightning | Heat wave |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Palm Beach County, FL | Relatively High (99.2) | $267.8B | $440.9M | Very High / 0.325 / $254,386,388 | Relatively High / 2.071 / $167,256,815 | Relatively High / 1.527 / $7,149,683 | Relatively High / 0.979 / $440,414 | Relatively Low / 0.96 / $52,460 | Relatively High / 2.91 / $6,775,260 | Very High / 96.308 / $1,208,113 | Relatively High / 4.672 / $840 |
| Martin County, FL | Relatively Moderate (94.1) | $32.9B | $106.3M | Very High / 0.313 / $83,755,735 | Relatively Moderate / 0.571 / $18,206,537 | Relatively Moderate / 0.424 / $1,444,436 | Relatively High / 0.782 / $845,400 | Relatively Low / 0.844 / $5,361 | Relatively Moderate / 1.13 / $928,610 | Relatively High / 89.851 / $78,647 | Relatively Low / 2.328 / $50 |
| Broward County, FL | Relatively High (99.5) | $301.0B | $567.2M | Very High / 0.29 / $259,673,064 | Very High / 2.464 / $285,724,256 | Relatively High / 0.8 / $2,318,155 | Relatively Moderate / 1.017 / $422,902 | Relatively Low / 0.786 / $61,565 | Very High / 2.616 / $12,181,090 | Very High / 99.352 / $288,832 | Relatively High / 5.707 / $1,167 |

Winter weather has no rating (zero frequency) and ice storm is "Not Applicable" in all three counties.

## HURDAT2 tropical-cyclone passages near West Palm Beach (26.715N, 80.054W)

Source: [HURDAT2 1851-2024 (GitHub mirror)](https://raw.githubusercontent.com/CongGao-CG/HURDAT2kml/main/hurdat2-1851-2024-040425.txt). A storm is counted if at least one 6-hourly fix falls inside the radius. Intensity is the maximum at any fix inside the radius.

| Period | Radius | Any system | TS+ (>=34 kt) | TS+/yr | Hurricane (>=64 kt) | HU/yr | Major (>=96 kt) |
|---|---|---|---|---|---|---|---|
| 1975-2024 | 50 nm | 25 | 14 | 0.280 | 6 | 0.120 | 1 |
| 1975-2024 | 100 nm | 51 | 37 | 0.740 | 14 | 0.280 | 5 |
| 1995-2024 | 50 nm | 15 | 10 | 0.333 | 5 | 0.167 | 1 |
| 1995-2024 | 100 nm | 30 | 25 | 0.833 | 11 | 0.367 | 4 |
| 1851-2024 | 50 nm | 77 | 55 | 0.316 | 26 | 0.149 | 6 |
| 1851-2024 | 100 nm | 164 | 135 | 0.776 | 65 | 0.374 | 23 |

**Notable events.** Figures are HURDAT2 maximum wind inside the radius and closest approach, plus NWS/press excerpts.

| Storm | HURDAT2 intensity and closest approach | Local impact (excerpts) |
|---|---|---|
| 1928 Okeechobee | 125 kt, 3 nm | Direct hit |
| Frances (2004) | 95 kt, 30 nm | About $500M damage in Palm Beach |
| Jeanne (2004) | 105 kt, 30 nm | About $260M in Palm Beach; roof damage mainly over the county |
| Wilma (2005) | 95 kt, 60 nm | Moderate roof damage to many buildings; 3,600 workplaces damaged |
| Irma (2017) | 80 kt, 88 nm | Gusts of 80-90 mph county-wide |
| Nicole (2022) | 65 kt, 38 nm | - |
| Milton (2024) | 106 nm (crossed central Florida) | EF3 tornadoes in Wellington and Palm Beach Gardens |

## NCEI Storm Events, Palm Beach County, 1996-2025

Source: [NCEI details files (GitHub copies, parsed)](https://github.com/RyanFabrick/Storm-Prediction/tree/main/Datasets).

- **Thunderstorm wind:** 143 event-days, or 4.77/yr. Gusts of 58 kt or more occurred on 1.07 days/yr.
- **Hail:** 94 days, or 3.13/yr. Hail of 1.75 in or larger occurred on 0.37 days/yr.
- **Tornado:** 85 days, or 2.83/yr, mostly EF0-EF1. EF2 or stronger occurred in 2008, 2022, 2023 and 2024 (the 2024 event was an EF3, $81M).
- **Tropical storm or hurricane zone entries:** 30 events, or about 1.0/yr. Hurricane-level entries appear only between 1996 and 2005.

## Every assumption and its source

| Assumption | Value | Low - High | Unit | As of | Confidence | Source(s) |
|---|---|---|---|---|---|---|
| Replacement cost - tpo | 11.0 | 8.0 - 14.0 | $/sq ft | 2026 | low | [Coastal Roofing of South Florida](https://coastalroofingofsouthflorida.com/blog/commercial-roof-replacement-cost-in-palm-beach-county-2026-pricing-guide-and-budget-planning/); [FoxHaven Roofing](https://foxhavenroof.com/tpo-roofing-cost-south-florida-2026/) |
| Replacement cost - epdm | - | - - - | $/sq ft | - | low | [Search 'commercial TPO roof replacement cost per square foot South Florida' returned no EPDM-specific South Florida figure](https://foxhavenroof.com/tpo-roofing-cost-south-florida-2026/) |
| Replacement cost - mod_bit | 12.5 | 9.0 - 17.0 | $/sq ft | 2026 | low | [Search summary: commercial roof replacement in Palm Beach County $8-$17/sf in 2026](https://coastalroofingofsouthflorida.com/blog/commercial-roof-replacement-cost-in-palm-beach-county-2026-pricing-guide-and-budget-planning/); [General Roofing Co. / Roof Observations](https://generalroof.com/modified-bitumen-roof-cost/); [561roofers.com](https://561roofers.com/commercial-cost/) |
| Replacement cost - bur | 12.75 | 11.0 - 14.5 | $/sq ft | 2026 | low | [Search summary of Palm Beach County commercial roof cost guides: 'Built-up with cap sheet averages $11-$14.50 per square foot'](https://561roofers.com/commercial-cost/) |
| Replacement cost - metal | 15.0 | 13.0 - 17.0 | $/sq ft | 2026 | low | [Search summary of Palm Beach County commercial roof cost guides: 'Standing seam metal averages $13-$17 per square foot'](https://561roofers.com/commercial-cost/) |
| Replacement cost - coating_restoration | 7.0 | 5.0 - 9.0 | $/sq ft | 2026 | low | [Search summary of Palm Beach County commercial roof cost guides: 'Silicone roof coatings average $5-$9 per square foot'](https://561roofers.com/commercial-cost/) |
| Location cost factor | 0.96 | 0.93 - 0.98 | index (national=1.00) | 2024-03 | low | [USACE DoD Area Cost Factors](https://usace.contentdm.oclc.org/digital/api/collection/p16021coll8/id/4495/download); [RSMeans City Cost Index](https://www.rsmeans.com/rsmeans-city-cost-index) |
| Cost escalation - annual_pct_10yr | 5.75 | 2.47 - 9.14 | %/yr | Dec 2015 - Dec 2025 | medium | [data/national.json cost_escalation.annual_pct_10yr](https://fred.stlouisfed.org/series/PCU23816X23816X) |
| Cost escalation - annual_pct_20yr | 4.6 | 2.91 - 5.75 | %/yr | Dec 2007 - Dec 2025 | medium | [data/national.json cost_escalation.annual_pct_20yr](https://fred.stlouisfed.org/series/PCU23816X23816X) |
| Frequency - Hurricane / tropical storm (wind, wind-driven rain) | 0.28 | 0.12 - 0.74 | events/yr (tropical storm or stronger within 50 nm) | 1975-2024 | medium | [NOAA NHC HURDAT2 Atlantic best-track 1851-2024](https://raw.githubusercontent.com/CongGao-CG/HURDAT2kml/main/hurdat2-1851-2024-040425.txt); [NOAA NHC HURDAT2 official data page](https://www.nhc.noaa.gov/data/#hurdat); [FEMA National Risk Index v1.20](https://raw.githubusercontent.com/ooowen-unc/flood_set/main/NRI_Table_Counties.csv); [FEMA NRI data resources](https://hazards.fema.gov/nri/data-resources) |
| Frequency - Strong wind (non-tropical: thunderstorm / high wind) | 0.979 | 0.979 - 4.53 | events/yr | 2025-12 (NRI v1.20); NCEI 1996-2025 | medium | [FEMA National Risk Index v1.20](https://raw.githubusercontent.com/ooowen-unc/flood_set/main/NRI_Table_Counties.csv); [FEMA NRI data resources](https://hazards.fema.gov/nri/data-resources); [NOAA NCEI Storm Events Database details files 1996-2025](https://github.com/RyanFabrick/Storm-Prediction/tree/main/Datasets); [NOAA NCEI Storm Events bulk CSV directory](https://www.ncei.noaa.gov/pub/data/swdi/stormevents/csvfiles/) |
| Frequency - Tornado (incl. hurricane-spawned) | 1.527 | - - 2.83 | events/yr | 2025-12 (NRI v1.20); NCEI 1996-2025 | medium | [FEMA National Risk Index v1.20](https://raw.githubusercontent.com/ooowen-unc/flood_set/main/NRI_Table_Counties.csv); [FEMA NRI data resources](https://hazards.fema.gov/nri/data-resources); [NOAA NCEI Storm Events Database details files 1996-2025](https://github.com/RyanFabrick/Storm-Prediction/tree/main/Datasets); [NOAA NCEI Storm Events bulk CSV directory](https://www.ncei.noaa.gov/pub/data/swdi/stormevents/csvfiles/) |
| Frequency - Hail | 0.96 | 0.37 - 3.13 | events/yr | 2025-12 (NRI v1.20); NCEI 1996-2025 | medium | [FEMA National Risk Index v1.20](https://raw.githubusercontent.com/ooowen-unc/flood_set/main/NRI_Table_Counties.csv); [FEMA NRI data resources](https://hazards.fema.gov/nri/data-resources); [NOAA NCEI Storm Events Database details files 1996-2025](https://github.com/RyanFabrick/Storm-Prediction/tree/main/Datasets); [NOAA NCEI Storm Events bulk CSV directory](https://www.ncei.noaa.gov/pub/data/swdi/stormevents/csvfiles/) |
| Frequency - Lightning | 96.3 | - - - | events/yr (NRI lightning-strike frequency index) | 2025-12 (NRI v1.20) | medium | [FEMA National Risk Index v1.20](https://raw.githubusercontent.com/ooowen-unc/flood_set/main/NRI_Table_Counties.csv); [FEMA NRI data resources](https://hazards.fema.gov/nri/data-resources); [NOAA NCEI Storm Events Database details files 1996-2025](https://github.com/RyanFabrick/Storm-Prediction/tree/main/Datasets); [NOAA NCEI Storm Events bulk CSV directory](https://www.ncei.noaa.gov/pub/data/swdi/stormevents/csvfiles/) |
| Frequency - Inland / riverine flooding (extreme rainfall; roof ponding and drain overload) | 2.071 | 1.13 - - | events/yr | 2025-12 (NRI v1.20 Inland Flooding); NCEI 1996-2025 | medium | [FEMA National Risk Index v1.20](https://raw.githubusercontent.com/ooowen-unc/flood_set/main/NRI_Table_Counties.csv); [FEMA NRI data resources](https://hazards.fema.gov/nri/data-resources); [NOAA NCEI Storm Events Database details files 1996-2025](https://github.com/RyanFabrick/Storm-Prediction/tree/main/Datasets); [NOAA NCEI Storm Events bulk CSV directory](https://www.ncei.noaa.gov/pub/data/swdi/stormevents/csvfiles/) |
| Frequency - Coastal flooding / storm surge | 2.91 | - - - | events/yr | 2025-12 (NRI v1.20) | medium | [FEMA National Risk Index v1.20](https://raw.githubusercontent.com/ooowen-unc/flood_set/main/NRI_Table_Counties.csv); [FEMA NRI data resources](https://hazards.fema.gov/nri/data-resources) |
| Frequency - Heat wave / UV (membrane aging) | 4.672 | - - - | events/yr | 2025-12 (NRI v1.20) | medium | [FEMA National Risk Index v1.20](https://raw.githubusercontent.com/ooowen-unc/flood_set/main/NRI_Table_Counties.csv); [FEMA NRI data resources](https://hazards.fema.gov/nri/data-resources) |
| Significant wind events / 20-yr roof life | 5.6 | 2.4 - 14.8 | events per 20 yrs | 1975-2024 | low | [NOAA NHC HURDAT2 Atlantic best-track 1851-2024](https://raw.githubusercontent.com/CongGao-CG/HURDAT2kml/main/hurdat2-1851-2024-040425.txt); [NOAA NHC HURDAT2 official data page](https://www.nhc.noaa.gov/data/#hurdat); [FEMA National Risk Index v1.20](https://raw.githubusercontent.com/ooowen-unc/flood_set/main/NRI_Table_Counties.csv); [FEMA NRI data resources](https://hazards.fema.gov/nri/data-resources) |
| Hurricanes within 50 nm / 20-yr roof life | 2.4 | 2.4 - 3.3 | hurricanes (>=64 kt at any fix within 50 nm) per 20-yr roof life | 1975-2024 | medium | [NOAA NHC HURDAT2 Atlantic best-track 1851-2024](https://raw.githubusercontent.com/CongGao-CG/HURDAT2kml/main/hurdat2-1851-2024-040425.txt); [NOAA NHC HURDAT2 official data page](https://www.nhc.noaa.gov/data/#hurdat) |
| Insurance rate trend | -2.7 | -16.6 - 27.0 | % premium change, y/y | H1 2026 | low | [Florida Professionals](https://floridaprofessionals.com/big-accounts-got-2026-insurance-relief-florida-small-businesses-got-a-bill/); [American Coastal Insurance](https://propertyexemption.com/hoa/blog/florida-association-insurance-premiums-2026); [Insurance Journal / Bloomberg](https://www.insurancejournal.com/news/southeast/2024/05/20/775000.htm); [data/national.json insurance.commercial_property_rate_trend_pct](https://www.marsh.com/en/about/media/global-commercial-insurance-falls-6-percent-q2-2026.html) |
| Cap rate - industrial | 5.25 | 4.75 - 5.75 | % | 2026 | low | [Commercial Lending Solutions](https://clscre.com/blog/cre-market-report-west-palm-beach-2026.html); [Matthews](https://www.matthews.com/insights/south-florida-industrial-q1-2026); [Colliers](https://www.colliers.com/en/research/palm-beach/1q26-palm-beach-county-industrial); [Berger Commercial](https://bergercommercial.com/palm-beach-county-industrial-market-report-q2-2026/) |
| Cap rate - office | 6.6 | 6.0 - 7.25 | % | 2026 | low | [Commercial Lending Solutions](https://clscre.com/blog/cre-market-report-west-palm-beach-2026.html); [Colliers](https://www.colliers.com/en/research/palm-beach/1q26-palm-beach-county-office); [Avison Young](https://www.avisonyoung.us/web/west-palm-beach/office-market-report) |
| Cap rate - retail | 5.5 | 5.0 - 6.0 | % | 2026-Q2 | low | [Commercial Lending Solutions](https://clscre.com/blog/cre-market-report-west-palm-beach-2026.html); [Matthews](https://www.matthews.com/insights/south-florida-retail-q2-2026); [Colliers](https://www.colliers.com/en/research/palm-beach/2q26-palm-beach-county-retail) |
| Roof life - maintained | 20 | 15 - 25 | years (low-slope membrane, South Florida) | 2026 | low | [FoxHaven Roofing](https://foxhavenroof.com/commercial-tpo-epdm-roof-maintenance-treasure-coast/); [FoxHaven Roofing](https://foxhavenroof.com/modified-bitumen-roofing-south-florida/); [data/national.json maintenance_evidence.roof_life_years.maintained](https://ridgelineroofingcompany.com/how-commercial-roof-maintenance-prevents-leaks/) |
| Roof life - reactive | 15 | 10 - 20 | years (low-slope membrane, South Florida) | 2026 | low | [Search summary of South Florida commercial roofing pages](https://ogroof.com/blog-tpo-vs-pvc-vs-epdm-vs-mod-bit); [FoxHaven Roofing](https://foxhavenroof.com/commercial-tpo-epdm-roof-maintenance-treasure-coast/); [data/national.json maintenance_evidence.roof_life_years.reactive](https://ridgelineroofingcompany.com/how-commercial-roof-maintenance-prevents-leaks/) |

I read the code text directly from [FBC-Existing Building 2023 Ch. 7](https://raw.githubusercontent.com/thexqin/us-building-codes-dataset/main/download/florida/iebc-2023/chapter-7-alterations-level-1.csv) and [FBC-Building 2023 Ch. 2](https://raw.githubusercontent.com/thexqin/us-building-codes-dataset/main/download/florida/ibc-2023/chapter-2-definitions.csv), plus Ch. 15 and 16. The JSON field `code_triggers.text` has the full summary. The JSON also includes qualitative text blocks for roof-age underwriting, deductible norms and Citizens.

## Code selling points (FBC 8th ed., 2023; read directly)

- **706.1.1, the 25% rule.** No more than 25% of a roof or roof section may be repaired, replaced or recovered in 12 months unless the whole section is brought to current code.
  - The SB 4-D / F.S. 553.844(5) exception applies to roofs built, repaired or replaced under the 2007 FBC or later. For those roofs, only the portion being worked on must meet current code, and local governments may not amend the exception.
- **706.3, tear-off to deck.** Tear-off is required if the existing roof is water-soaked or deteriorated, has two or more layers, has unrepaired blisters, or cannot meet 1504.1 securement.
- **706.7 and 706.7.2.** Wood-deck buildings must have the deck re-nailed and a secondary water barrier added on re-roof.
  - Roofs with slopes under 2:12 and a continuous roof system are deemed to comply.
  - Buildings originally permitted under the FBC are exempt.
- **706.8, roof-to-wall connections.** This applies to wood-deck buildings in the wind-borne debris region with an insured value of $300k or more. The cost is capped at 15% of reroof cost, and buildings permitted under the FBC are exempt.
- **707.3.2, diaphragm evaluation.** It applies when more than 30% of the structural deck is removed and Vult exceeds 115 mph.
  - The diaphragm and roof-to-wall connections must be evaluated and strengthened if they resist less than 75% of current wind loads.
  - This matters most where long-term leaks have corroded a steel deck.
- **HVHZ.** It covers Broward and Miami-Dade only (FBC-B Ch. 2), so Palm Beach County is outside it.
  - Broward Risk Cat II design wind speed is fixed at 170 mph (FBC-B 1620.2).
  - Palm Beach wind speed comes from the ASCE 7-22 maps. Search summaries put it at about 160-170 mph; this is unverified.

## Caveats

- **Data came from mirrors.** I read FEMA NRI, HURDAT2, NCEI and the FBC text from GitHub mirrors or scrapes, not agency or ICC sites. The FBC text is an up.codes scrape. It matches the language quoted in secondary sources.
- **Market figures are search summaries only.** Cost/sf, cap rates, insurance and roof life all come from search-engine summaries of pages I never opened, and several are contractor or lender marketing. Confidence is "low" throughout.
- **Cap rates are from a lender blog.** They do not come from C&W, CBRE or Colliers. The 4.75-5.75% industrial range is consistent with Matthews' 5.4% South Florida figure, but another excerpt cited a South Florida average of 6.3%.
- **The insurance trend should not be extrapolated.** It reflects a 2026 soft market in a catastrophe-driven cycle; hard markets followed the storms of 1992, 2004-05 and 2017-22. Figures mix large-account and condo-association books.
- **The location factor is a proxy.** It is the DoD Area Cost Factor Florida average, taken from a search excerpt, not an RSMeans index.
- **The NCEI Wilma damage figure is not county-only.** The $10B property damage on the 2005 Wilma Coastal Palm Beach zone record is probably a multi-county estimate.
- **Some roof-life and roof-age sources are residential.** Roof-age statutes (F.S. 627.7011) protect homeowners only. The commercial roof-age practices described come from broker and contractor excerpts.

## Open questions

- Confirm parcel-level ASCE 7-22 / FBC 8th ed. Risk Category II ultimate wind speeds for typical PAX client sites via the Palm Beach County wind-speed GIS (search summaries say ~160-170 mph for coastal West Palm Beach).
- Obtain an RSMeans City Cost Index for West Palm Beach (ZIP 334) and Fort Lauderdale (333); current value is a DoD ACF Florida-average proxy (0.96).
- Replace contractor-blog replacement costs with PAX bid history by system (TPO, mod bit, coatings, metal) for Palm Beach, Martin and Broward (HVHZ premium).
- Get FBC-Energy Conservation 8th ed. reroof insulation requirements (C503.3.x equivalent and roof R-value for climate zone 1/2) and whether tapered insulation/drains get exceptions.
- Florida commercial (office/industrial/retail) property rate trend from a broker (Marsh, WTW, Amwins, CRC) and Citizens commercial non-residential 2026 rate change by territory; current figures mix large-account and condo-association data.
- Typical named-storm deductibles for Palm Beach commercial office/industrial/retail (percent of TIV) and roof-age cut-offs used by carriers writing Palm Beach commercial (e.g., ACV roof endorsements at 10/15/20 yrs, inspection requirements) - confirm with PAX's brokers.
- Verify cap rates from Cushman & Wakefield Palm Beach MarketBeats, CBRE Palm Beach figures, Colliers, Avison Young and Berger Commercial Q2 2026 reports; current values come from a lender blog via search summaries.
- Quantified evidence for maintained vs reactive low-slope roof life in South Florida (manufacturer warranty claim data, RCI/IIBEC, FRSA) beyond contractor marketing.
- Check whether FBC-EB 706.1.1 25%-rule exception applies to roofs permitted between the 2007 FBC adoption and its 1 Mar 2009 effective date, and how local building officials in West Palm Beach document 'built in compliance with the 2007 FBC'.
- NCEI 2005 Wilma entry for Coastal Palm Beach carries $10B property damage, probably a multi-county/zone estimate - do not use as a Palm Beach-only figure.
