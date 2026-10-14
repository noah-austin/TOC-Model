# Generic roof lifecycle curves: research memo

Researched 2026-10-14. Machine-readable values are in `data/generic_research.json`. This memo builds on `national.md` (sections A and D) and `property-types.md` (section 4) and does not repeat their sources except where a value is reused.

## How this was researched (read first)

- **Access.** The egress proxy blocked direct fetches of every source tried: nrc-publications.canada.ca, iibec.org, apps.dtic.mil, multifamily.fanniemae.com, eia.gov, westernroofing.net and researchgate.net. Both curl and WebFetch failed.
- **Search extracts only.** Every figure below was read from search-engine extracts of the linked page, not from a full read. For that reason no value is rated "high" confidence.
- **Model judgments are labelled.** Where no source gives a number, the value is marked **judgment**, with the reasoning.
- **NRCA's caveat applies throughout.** NRCA's own magazine says "there is no reliable, unbiased accumulation of data that establishes the service lives of various low- or steep-slope roof systems" ([Professional Roofing, "Technical Elements"](https://professionalroofing.net/articles/article/1153)). Treat every service-life number here as a planning convention, not a measured statistic.

## Key takeaways

1. **Planning lives cluster at 20 years for membranes and 40 for metal.** These are the Fannie Mae EUL figures. Two points matter for how the model uses them:
   - **EUL already assumes maintenance.** ASTM E2018 defines EUL "assuming routine maintenance is practiced". The model therefore treats EUL as roughly the *maintained* life. Reactive life is set about 4–5 years shorter, consistent with NRC Canada's 3–5-year maintenance extension.
   - **Flat roofs get shorter lives in some tables.** Florida Housing's CNA table gives dead-level roofs lower lives than sloped ones: EPDM 15 vs 20 yrs, torched mod-bit 10 vs 15 yrs.
2. **Climate effect: about −10 to −20% of life in Central/South Texas, about −5% in the mid-Atlantic, and up to −15% for metal on the coast. All low confidence.**
   - The only population-scale evidence is Nearmap's 2026 imagery study. Roofs average about 19–23% younger in high-temperature-swing and hot-humid counties, which implies shorter replacement cycles. That study covers mostly residential roofs.
   - Texas adds hail (FEMA NRI "Very High" in Travis and Bexar; see `austin.md` and `san-antonio.md`).
   - Coastal salt shortens the life of Galvalume and steel metal roofs.
3. **Repair cost rises with age. A power curve is the best-supported shape: low and flat early, rising steeply in the final third of life.**
   - NRC Canada says maintenance spend rises in the last few years of service and leaks become more frequent.
   - The Army CERL BUILDER condition model uses a Weibull-shaped condition-decay curve.
   - Recommended default shape: annual repair = 0.3% + 2.7% × (age/life)³ of replacement cost. This averages about 1%/yr over the life. That matches the Johns Manville owner's manual (maintenance "typically costs just 1–3% of the estimated total replacement cost each year"), and at today's replacement prices it also matches the 1997 survey range of $0.09–0.19/sf/yr.
4. **Planned maintenance adds about 5 years.** Each source implies a slightly different figure:
   - NRC Canada: 3–5 yrs.
   - Carlisle Continu-Care: +5-yr warranty.
   - GAF WellRoof Plus: +25% of guarantee term (5 yrs on a 20-yr NDL).
   - JM: Peak Plus Five (+5) and Peak Life (up to +10 with restoration).
   - Coating restoration resets the clock by 10–20 yrs per recoat, depending on mils.
5. **CBECS 2018 (Table B11) shows which system and building-type combinations are common.**
   - Metal is the most common roof by building count for warehouses (662k of about 1,000k warehouse buildings).
   - Office has substantial built-up (160k) and synthetic/rubber (180k) roofs.
   - Education splits roughly evenly between metal (111k), synthetic/rubber (103k) and built-up (79k).
6. **End of life.** A recover (overlay) is typically 15–30% cheaper than a tear-off, and tear-off and disposal add about $1–2/sf. Code allows at most two roof coverings, so the *second* replacement of a recovered roof is a full tear-off. Wet insulation over about 15–25% of the area rules out both recover and coating.

---

## Q1. Expected service life by roof system

| System | Value (yrs) | Range | Source | Confidence | Notes |
|---|---|---|---|---|---|
| TPO | 20 | — | [Fannie Mae Form 4099.F EUL](https://multifamily.fanniemae.com/media/35621/display) (via national.md D1 and [The Roofing Brief summary](https://theroofingbrief.com/flat-roof-pros-and-cons/)) | medium | Lender EUL. Assumes routine maintenance (ASTM E2018 definition, via [CRE-Expert](https://www.cre-expert.com/everything-you-want-to-know-about-property-condition-assessments-property-condition-reports/)). |
| TPO | 20 | — | [Florida Housing CNA Appendix F, Rev. 7-29-2024](https://www.floridahousing.org/docs/default-source/programs/competitive/capital-needs-assessment-guide/appendix-f---estimated-useful-life-(eul)-tables.pdf?sfvrsn=8227cf7b_1) ("Thermoplastic (Hypalon, PVC, TPO, Vinyl) 20") | low | Search extract. |
| TPO | 15–35 by grade | 15–35 | [NRCA / Professional Roofing "A study of longevity" 2014](https://www.professionalroofing.net/Articles/A-study-of-longevity--02-01-2014/2406) (national.md D1) | medium | Intermittent issues seen, "no systemic problems". The WSRCA 10-yr study, with test roofs including San Antonio and Las Vegas, found 15 of 16 TPO membranes performed satisfactorily ([WSRCA report](https://www.westernroofing.net/TPO_Report.html)). |
| TPO | ≤10 (DoD restriction) | — | [UFC 3-110-03 Change 1](https://www.wbdg.org/api/documents/media/70d1eb51-68d2-4bb9-aee5-d009062b4901/file): "TPO shall only be allowed on roofs with an anticipated life of 10 years or less" | low | A conservative federal stance, not a life measurement. Read from search extract. |
| EPDM | 20 | 15 (dead-level) – 20 (sloped) | Fannie Mae 4099.F; Florida Housing App. F | medium / low | |
| EPDM | 38 (maintained) | 25–40+ | [ERA 2025 survey of 569 professionals](https://epdmroofs.org/resource/new-survey-and-research-confirm-epdm-roof-membranes-last-at-least-38-years) | low | Trade association. Averaged over thicknesses. Not climate-specific. |
| Mod bit | 10 (torched, flat) / 15 (torched, sloped) | 10–15 | Florida Housing App. F; also "2-Ply Mod Bit mopped, flat 15 / sloped 20" | low | Lowest of the lender/agency tables. |
| Mod bit | SBS 10–30, APP 10–20 | 10–30 | [GAF, "What is the lifespan of a commercial roof"](https://www.gaf.com/en-us/blog/commercial-roofing/what-is-the-lifespan-of-a-commercial-roof-understanding-how-roofs-age-over-time-281474980497101) | low | Manufacturer blog. The same page gives EPDM as only 10–15 yrs, so it is internally inconsistent with other sources. |
| Mod bit | 20 | 15–25 | [Berman Wright rules of thumb](https://www.bermanwright.com/built-to-last-general-rules-of-thumb-for-estimating-the-useful-life-of-your-building-envelope/); national.md D3 | low | |
| BUR | 20 | 17.4–30 | Fannie Mae 4099.F; Cash 1997 (17.4-yr mean for multi-ply asphalt, from a survey of 400+ contractors) via [NRC Canada](https://nrc-publications.canada.ca/eng/view/supplement/?id=49c7996a-27aa-4c44-bcaa-5f6df2ea4f1b&dp=120) | medium | Cash treated durability as a range, and the survey population is not split by maintenance. |
| BUR | 20 | — | IIBEC 2015 CTS paper (Dickson): "service lives typically are 20 years for BUR, 25 years for inverted modified-bitumen and single-ply roofs" ([IIBEC](https://iibec.org/publication-post/2015-cts-dickson/)) | low | |
| Metal | 40 | 30–40 (70 for premium) | Fannie Mae 4099.F (national.md D5); Berman Wright 40–70 | medium | |
| Coating restoration | 10 / 15 / 20 yr warranty at 18 / 26 / 34 dry mils (silicone on metal) | 10–20 | Gaco metal-roof spec via [ArmorThane](https://www.armorthane.com/silicone-roof-coating/); national.md D6 | low | An independent guide says no ASTM, NRCA or RCMA standard maps mils to years ([Roofing Brief](https://theroofingbrief.com/flat-roof-coating-restoration/)). |

**Not obtained:** the Cash 1997 per-system durability table (EPDM, SBS, APP, PVC, metal). The NRC extract cuts off before it. Also missing are the Hobbs and RCI survey means and the RSMeans life tables. A search for the Coffelt & Hendrickson (2010) J. Arch. Eng. survey found nothing usable.

## Q2. Climate effects on life

| Finding | Value | Source | Confidence |
|---|---|---|---|
| Roofs in counties with mean daily temperature swing above 23°F average 9.0 yrs old, vs 11.1 yrs where the swing is below 20°F. Hot-humid regions average 8.5 vs 11 yrs in cooler, drier areas. Headline: "aging about 23% faster". | −19% to −23% (implied replacement cycle) | Nearmap 2026 study of 2.8B images across about 2,100 counties, via [Risk & Insurance](https://riskandinsurance.com/climate-stress-is-cutting-roof-lifespans-across-the-u-s-with-widening-implications-for-property-risk/), [Claims Journal](https://www.claimsjournal.com/news/national/2026/06/24/338336.htm), [Roofing Contractor](https://www.roofingcontractor.com/articles/102387-climate-stress-is-shortening-roof-lifespans) | low. Mostly residential roofs. Average age is a proxy, and replacement also reflects hail claims. 9.0 vs 11.1 is actually 19%. |
| Heat aging follows Arrhenius kinetics. One flat-roof service-life paper uses B = 8,000 K, which implies about 1.9× faster aging per +10°C near 70°C (the arithmetic is mine). | — | [CIB W083 "Service life prediction of flat roofs with polymer..."](https://www.irbnet.de/daten/iconda/CIB2039.pdf) | low |
| TPO premature failures cluster on roofs "in extremely hot, sunny climates" or with dirt build-up that lowers reflectivity. A 2010 MRCA advisory warned of exhaustion of antioxidants and UV stabilizers. ASTM D6878 heat-aging duration rose from 670 h to 5,376 h (2011), and UV exposure doubled (2006). | qualitative | [IIBEC TA-012-2016](https://iibec.org/publication-post/iibec-technical-advisory-no-012-2016-tpo-single-ply-roof-system-performance-and-service-life/); [Professional Roofing "Testing TPOs" 2015](https://www.professionalroofing.net/Articles/Testing-TPOs--08-01-2015/3692); [Florida Roofing blog](https://www.floridaroof.com/news/blog/Heat-Exposure-and-TPO-Degradation-February2020) | low |
| A contractor guide claims high-UV regions cut TPO functional life to 18–20 yrs, vs 22–25 in moderate climates. | about −15% | [BuildMat Insight](https://buildmatinsight.com/construction-cost/app-roof/tpo-roof-material-lifespan-durability-guide) | low (unsourced marketing) |
| Hail: in an ERA-commissioned lab test, 24 of 25 new EPDM targets and 20 of 20 heat-aged targets were undamaged by 76 mm (3 in) ice balls. Thermoplastics fracture or tear, and stress plates at seams are vulnerable. Hail that disrupts mod-bit surfacing "can reduce" service life. | EPDM is the most hail-tolerant membrane | [Construction Specifier](https://www.constructionspecifier.com/the-proven-durability-of-epdm-roof-assemblies/3/); [Professional Roofing "Holy hail!" 2009](https://www.professionalroofing.net/Articles/Holy-hail--06-01-2009/1506); [IIBEC hail testing of BUR/mod-bit](https://iibec.org/publication-post/testing-built-up-and-modified-bitumen-roofs-for-hail-damage/) | low |
| Hail exposure by market: Travis and Bexar are FEMA NRI hail "Very High". Hampton Roads is "Relatively Low". Laurel and Prince George's are "Very Low". | — | `austin.md`, `san-antonio.md`, `hampton-roads.md`, `laurel.md` (FEMA NRI, opened via mirrors) | medium (from earlier sessions) |
| Galvalume (55% Al-Zn): severe marine air shortens coating life. A model gives a 50 µm coating 35 yrs rural vs 28 yrs marine-tropical (−20%). Australian rates are 0.54 µm/yr marine vs 0.17 rural. Many warranties exclude sites within about 1,500 ft of breaking surf, 800 ft of a large bay, or 400 ft of marsh. | about −20% (marine) | [IJCSI 2022 review](https://ijcsi.pro/wp-content/uploads/2022/08/ijcsi-2022_v11-n3-p20.pdf); [BlueScope](https://dashboard.bluescope.co.za/_media/resource/615163544ec89-0a5ac04f5338d1e91e84a43216aa1f3739917f89.pdf); [Sheffield Metals warranty types](https://sheffieldmetals.com/learning-center/metal-roof-warranty-types/); [GalvInfo Note 1.4](https://www.galvinfo.com/wp-content/uploads/sites/8/2017/05/GalvInfoNote_1_4.pdf) | low |
| Freeze-thaw and thermal cycling: SBS is favored for freeze-thaw flexibility, and cycling causes seam splitting and membrane fatigue in bitumen sheets. A 1993 NIST field study of 53 mod-bit roofs in Washington/Baltimore, Jacksonville and Dallas found performance "satisfactory", with about 70% of roofs in fine condition at 2–11 yrs. No climate split was obtained. | qualitative | [NISTIR 4972](https://nvlpubs.nist.gov/nistpubs/Legacy/IR/nistir4972.pdf); [Commercial Roof Guide, mod-bit](https://commercialroofguide.com/guides/modified-bitumen/) | low |
| Hampton Roads wind: 4.8 significant wind events per 20 yrs (range 3.6–15.2). ASCE 7-22 design wind is about 120–125 mph. | — | `hampton-roads.md` | low–medium |

**Market × system life adjustment (judgment).** The adjustments are relative to the national planning life in Q1. The reasoning for each market:

- **Austin and San Antonio:** Nearmap's roughly 20% climate effect is the upper bound. Hail risk is "Very High". Heat accelerates TPO and bitumen aging (Arrhenius), and asphalt-based systems and coatings are UV-sensitive.
  - EPDM gets a smaller penalty because the lab tests show the best hail tolerance and carbon black protects it from UV.
  - Metal gets the smallest penalty because hail is mainly cosmetic denting on standing seam.
- **Hampton Roads:** Coastal wind and humidity put a modest penalty on membranes. Metal takes −15% for salt air. Use −25% within about ¼ mi of salt water, matching the warranty exclusion zones.
- **Laurel and Northern Virginia (`culbertson`):** These are near the national median climate (EULs are national averages). Freeze-thaw and winter-storm cycles take −5% from bitumen systems and coatings, which suffer from ponding and ice.

See the table in "Recommended model values".

## Q3. Shape of the repair-cost curve

| Finding | Value | Source | Confidence |
|---|---|---|---|
| "As a roof nears the end of its life cycle, maintenance cost rises." The most common failure mode is more frequent leaks, with rising annual maintenance dollars "in the last few years of its service life". Roofs fail over several years, not suddenly. Each system has "a characteristic deterioration curve". | qualitative | [NRC Canada, Effective Roof Management](https://nrc-publications.canada.ca/eng/view/supplement/?id=49c7996a-27aa-4c44-bcaa-5f6df2ea4f1b&dp=120) | medium |
| Life-cycle models should extend assigned life by 3–5 yrs, "assigning increasing annual maintenance costs during the extended period". Maintenance averages about one-third of annual life-cycle cost. | — | NRC Canada (same) | medium |
| Army CERL ROOFER/MicroROOFER uses a roof condition index (RCI) from 0–100, built from separate membrane, flashing and insulation indexes. MicroROOFER predicts condition against age with "a set of deterioration curves", each tied to a combination of deterioration factors (Bailey et al. 1995). | curve form not obtained | [MicroROOFER paper (ResearchGate)](https://www.researchgate.net/publication/245282006_Computer_Assistance_in_Managing_the_Maintenance_of_Low-Slope_Roofs); [ERDC/CERL TR-10-5](https://apps.dtic.mil/sti/tr/pdf/ADA518899.pdf) | low |
| BUILDER SMS (the successor to ROOFER) models condition-index decay with a 3-parameter Weibull curve driven by age and expected service life (Grussing, Uzarski & Marrano 2006). | Weibull-shaped CI(t) | [US7769568B2](https://patents.google.com/patent/US7769568B2/en); [Grussing et al. 2006](https://www.researchgate.net/publication/268595115_Condition_and_Reliability_Prediction_Models_Using_the_Weibull_Probability_Distribution); [ERDC/CERL TR-12-13](https://usace.contentdm.oclc.org/digital/api/collection/p266001coll1/id/4597/download) | low |
| Weibull shape β > 1 means a wear-out (rising) failure rate. An age-based preventive policy is optimal only when β > 1 and failure costs exceed planned costs. | — | [ReliaSoft](https://help.reliasoft.com/weibull/content/maintenance_planning.htm); [MetricGate](https://metricgate.com/docs/optimal-age-replacement-policy/) | low (generic reliability) |
| Maintenance program cost is "typically 1–3% of the estimated total replacement cost each year". This is the origin of the "1–3%" figure that national.md listed as untraceable. | 1–3%/yr | [Johns Manville Owner's Manual](https://www.jm.com/content/dam/jm/global/en/commercial-roofing/brochures/JM-Owners-Manual.pdf) | low–medium (manufacturer) |
| Reserve budget of $0.10–0.12/sf/yr in years 1–5, rising to $0.14–0.18 in years 5–15 (no figure given for 15+). Qualitatively: years 1–5 minimal, years 10–15 moderate, years 15+ "significant ongoing repairs, emergency calls". | about +45% from early to mid life | [Commercial Roof Guide](https://commercialroofguide.com/guides/roof-maintenance/); [Highland Roof](https://highlandroof.com/roof-repair-vs-replacement-cost-considerations-for-commercial-properties/) | low |
| Survey maintenance cost of $0.14–0.19/sf (Schneider & Keenan 1997) and $0.09–0.15/sf (Cash 1997). | — | national.md A5 ([IIBEC](https://iibec.org/publication-post/life-cycle-cost-analysis-using-roofing-coatings/)) | medium |
| About 80% of reported leaks are at flashings and penetrations. A 1960s Southern California study found 68% of 163 leaks were flashing-related and 13% were in the membrane. | 68–80% | [Roofing Contractor](https://www.roofingcontractor.com/articles/88167-technical-details-flashings-and-penetrations-for-metal-roofs) (search extract) | low |

**Recommended shape (judgment, anchored to the above).** Annual repair spend as a share of replacement cost, at normalized age x = age / expected life:

`repairPct(x) = 0.3% + 2.7% × x^3`, with x capped at 1.5 (5.6% at x = 1.25 and 9.4% at x = 1.5) and an optional hard cap of 6%.

Why this curve:

- **Mean over life.** The mean over x = 0–1 is 0.3 + 2.7/4 = **0.975%/yr**. That sits in JM's 1–3% band.
- **Dollar check.** At a replacement cost of $12–15/sf it gives $0.12–0.15/sf/yr, which lands inside the 1997 survey range of $0.09–0.19.
- **Early life.** Years 1–5 of a 20-yr life (x = 0–0.25) average about 0.31%. The early-life floor is lower than the contractor reserve guide because installer and manufacturer warranties absorb early defects. That makes the curve a right half-bathtub with no infant-mortality hump.
- **Late life.** It produces the sharp late-life rise NRC describes: 1.4% at x = 0.75 and 3.0% at x = 1.0.
- **Exponent.** The cubic is a judgment. A Weibull hazard with β about 3 is a typical wear-out value. CERL's exact coefficients were not obtained. Use β = 2 (flatter) to 4 (steeper) as a sensitivity range.
- **How planned maintenance enters.** Planned maintenance enters by stretching life L, which lowers x at every age. The reactive/planned cost multiplier in national.md A4 should be applied separately to the *level*, not the shape.

## Q4. Life added by planned maintenance

| Source | Life or warranty added | Confidence |
|---|---|---|
| NRC Canada: assigned life "extended by three to five years" with maintenance | +3 to +5 yrs | medium |
| Carlisle Continu-Care: annual PM earns a +5-yr Total System Warranty extension at no charge, up to 30 yrs total ([Carlisle announcement](https://www.carlislesyntec.com/document-viewer/carlisle-introduces-continu-care-preventative-maintenance-warranty-extension-program-marketing-announcement/HhG3SSoBgUSMCTsos4n69w)) | +5 | low–medium |
| GAF WellRoof Plus: annual PM by a Certified Maintenance Professional earns a +25% Diamond Pledge NDL guarantee term, plus up to $500 toward the first visit, for roofs of 100+ squares ([BD+C](https://bdcnetwork.com/gaf-offers-commercial-property-owners-500-first-service-visit)) | +25% (+5 on 20 yr) | low |
| Johns Manville Peak Plus Five: +5 yrs; Peak Life (restoration-based): up to +10-yr guarantee extension ([JM Owner's Manual](https://www.jm.com/content/dam/jm/global/en/commercial-roofing/brochures/JM-Owners-Manual.pdf); [JM Peak Life brochure](https://www.jm.com/content/dam/jm/global/en/commercial-roofing/brochures/RS-7864_Peaklife_Guarantee_Extension.pdf)) | +5 / +10 | low–medium |
| Holcim/Elevate Red Shield: no maintenance-linked extension found. Some EPDM systems carry up to 25 yrs "with no additional maintenance or inspections required" ([Elevate](https://www.elevatecommercialbp.com/us-en/resources/warranties)) | none found | low |
| Coating restoration recoat: at the end of the first warranty (about years 10–15), clean and recoat with 20–30 mils, which renews the warranty without tear-off. Contractor claims of "40+ yrs" total are unverified ([PM Silicone](https://pmsilicone.com/recoating-silicone/); [West Roofing](https://www.westroofingsystems.com/complete-guide-silicone-roof-coatings)) | +10 to +15 per recoat | low |
| A reflective coating applied within 5 yrs extends SBS life (older trade article) ([Roofing Contractor](https://www.roofingcontractor.com/articles/84197-maintenance-of-modified-bitumen-roof-systems)) | qualitative | low |
| The "21 vs 13 yrs" claim (Firestone/ProLogis, attributed to NRCA) remains untraced (see national.md) | — | low |

**Per system (judgment):**

- **Membranes: +5 yrs.** This rests on NRC's top end, Carlisle, GAF on a 20-yr term, and JM.
- **Metal: +8 yrs.** Fastener re-torque, sealant and flashing renewal, and early coating of rust spots address metal's dominant failure modes, and metal has a longer base life. No metal-specific source was found.
- **Coating restoration: +3 yrs.** PM keeps the coating watertight between recoats. The recoat itself, worth +10 to +15, is modeled as a separate event.

## Q5. Building-type effects

- **CBECS 2018, Table B11 (predominant roof material, thousands of buildings).** Read from search extracts of [EIA Table B11](https://www.eia.gov/consumption/commercial/data/2018/bc/html/b11.php) (PDF: [b11.pdf](https://www.eia.gov/consumption/commercial/data/2018/bc/pdf/b11.pdf)). Confidence: low–medium. Column headers were inferred from the extract's stated column order.

  | Material | All bldgs | Warehouse | Office | Service | Mercantile | Public assembly | Religious | Education |
  |---|---|---|---|---|---|---|---|---|
  | Metal surfacing | 2,198 | 662 | 207 | 499 | 135 | 162 | 94 | 111 |
  | Synthetic or rubber | 940 | 131 | 180 | n/a | 136 | n/a | n/a | 103 |
  | Built-up | 708 | 59 | 160 | n/a | n/a | n/a | n/a | 79 |

  - **Missing data.** Health care, lodging and food columns, and the shingle and other rows by activity, were not obtained.
  - **Category caveats.** CBECS does not separate TPO, EPDM and PVC ("synthetic or rubber") and has no modified-bitumen category (mod-bit is likely reported as built-up). "Metal surfacing" includes steep-slope and pre-engineered metal buildings.
  - **Multifamily.** Multifamily is residential and outside CBECS.
- **Roof equipment and traffic.** A US Army Corps roof management study (quoted second-hand) cites "too much installed equipment placed on the rooftop, which requires extensive and complex flashing details and promotes increased roof traffic" as a cause of problems ([Roofing Contractor](https://www.roofingcontractor.com/articles/88167-technical-details-flashings-and-penetrations-for-metal-roofs), low). Since about 70–80% of leaks are at flashings and penetrations, repair burden scales with penetration and equipment density. That supports higher burden for medical (dense RTUs, exhausts, frequent technician traffic), office and multifamily (many condensers and penetrations), and lower burden for warehouses.
- **K-12.** GAO-20-494 estimated about 28,000 schools need roofing updated or replaced (about 28% of districts had at least half their schools needing roofing work). Of 55 schools visited, 18 had roof problems, and districts patch roofs to extend life because replacement "can cost millions" ([GAO-20-494](https://www.gao.gov/assets/gao-20-494.pdf), via [Facilitiesnet](https://www.facilitiesnet.com/roofing/article/Roofing-Problems-Plague-Nation8217s-K-12-Schools--19413); low–medium). NCES 2012-13 found roofs rated fair or poor in about 25% of schools' permanent buildings and 42% of portables. Of the 19% of schools planning major roof work, 46% cited the replacement cycle ([NCES 2014-022](https://nces.ed.gov/pubs2014/2014022.pdf); low–medium).
- **Medical.** Facility maintenance runs $4.50–10.00/sf/yr for healthcare vs $1.60–3.20 office and $0.80–2.20 warehouse. These are all-systems figures from a single vendor, not roof-only ([AF Building Care](https://www.afbuildingcare.com/how-much-does-facility-maintenance-cost/); low). They support ranking medical highest for repair intensity.

## Q6. End-of-life costs

- **Tear-off and disposal** add about $1–2/sf, more for multiple layers or wet material. A recover typically saves 15–30% of project cost vs tear-off. A 2026 Texas example quotes a TPO overlay at $8–14/sf vs a tear-off at $12–22/sf ([Commercial Roof Guide](https://commercialroofguide.com/guides/commercial-roof-cost/); [Durable Rooftop Solutions](https://www.durablerooftopsolutions.com/learn/commercial-roofing/cost-to-replace-commercial-roof); low).
- **Code limit on recovers.** IBC 1511.3 (as summarized by contractors) allows at most two roof coverings. A first replacement can usually be a recover, but the next replacement must be a tear-off. Wet insulation or a deteriorated deck forces tear-off regardless (same sources; low). Model rule: first end-of-life event = recover if dry, second = tear-off plus disposal.
- **Coating eligibility.** A moisture survey is required. Roofs with more than about 25% wet area are not coated (stricter guidance says 15–25%) ([Facilitiesnet](https://facilitiesnet.com/roofing/article.aspx?id=14705); [Buildings.com](https://buildings.com/smart-buildings/article/10193268/restorative-coatings-that-make-sense); GAF; low).

---

## Recommended model values

All values are low confidence unless noted. "Judgment" means a modeling choice anchored to the sources above.

### A. Life by system (years, national baseline)

| System | Life, reactive (no PM) | Low | High | Life added by planned maintenance | Maintained life | Basis |
|---|---|---|---|---|---|---|
| TPO | 16 | 12 | 22 | +5 | 21 | Fannie Mae and Florida Housing EUL of 20 is treated as the maintained life, minus about 4–5 for reactive. NRCA 15–35 by grade. Low end reflects UFC caution and older TPO formulations. |
| EPDM | 19 | 15 | 25 | +5 | 24 | EUL 20 (15 dead-level). ERA's 38-yr figure is a maintained, best-case upper bound and is not used as the default. |
| Mod bit | 16 | 10 | 20 | +5 | 21 | Florida Housing 10–15 (flat, torched) to 20 (sloped). GAF SBS 10–30, APP 10–20. |
| BUR | 18 | 15 | 22 | +5 | 23 | Cash 1997 mean of 17.4 (unsplit population) is used as the reactive proxy. EUL 20 and IIBEC 20. |
| Metal | 32 | 25 | 40 | +8 | 40 | Fannie Mae 40 treated as the maintained life. The +8 is a judgment (fasteners, sealants, rust). |
| Coating restoration | 12 | 8 | 15 | +3 (plus a +10 to +15 recoat event) | 15 | 10–20-yr warranties by mils. The recoat resets the clock if the substrate is dry. |

Repair-curve shape: see section C. A single shared shape is used for all systems because no per-system curve data was found. Shape exponent β: 3 (sensitivity range 2–4).

### B. Market × system life adjustment (% of baseline life; judgment, low confidence)

| Market | TPO | EPDM | Mod bit | BUR | Metal | Coating |
|---|---|---|---|---|---|---|
| austin | −15 | −10 | −15 | −15 | −5 | −15 |
| san-antonio | −15 | −10 | −15 | −15 | −5 | −15 |
| hampton-roads | −5 | −5 | −5 | −5 | −15 (−25 within ¼ mi of salt water) | −5 |
| laurel | 0 | 0 | −5 | −5 | 0 | −5 |
| culbertson (Manassas, NoVA) | 0 | 0 | −5 | −5 | 0 | −5 |

### C. Repair curve

- Annual repair spend as a share of replacement cost: `0.3% + 2.7% × (age / life)^3`, with age/life capped at 1.5 (optional hard cap 6%).
- That gives about 0.3% in early life, 0.6% at mid-life, 1.4% at 75% of life, 3.0% at end of life and about 5.6% at 125%. The lifetime mean is about 1.0%.
- Planned maintenance lengthens life, which flattens the curve at any given age. Apply the national.md A4 reactive multiplier to the level, not the shape.

### D. Building-type repair burden (multiplier on repair-curve level; judgment, low confidence)

| Type | Burden | Life adj % | Note |
|---|---|---|---|
| industrial | 0.9 | 0 | Few penetrations and little traffic. Large, simple field areas (mostly metal or single-ply per CBECS). |
| office | 1.1 | 0 | More RTUs and penetrations. Frequent HVAC technician traffic. |
| retail | 1.0 | 0 | Moderate RTU density. Tenant-driven penetrations (signage, exhaust at food tenants). |
| multifamily | 1.1 | 0 | Many small condensers, vents and penetrations per sq ft. Resident and amenity traffic on podium roofs. Garden-style steep-slope roofs are outside scope. |
| mixed | 1.15 | 0 | Combines residential penetration density with retail tenant exhausts. Amenity decks. |
| medical | 1.3 | −5 | Densest heavy equipment (RTUs, exhaust, generators). Frequent technician traffic. Flashing-heavy roofs. |
| k12 | 1.15 | 0 | GAO: patching and deferral are common, with large multi-section roofs and additions. The deferral effect belongs in the maintenance-regime input, not here. |

### E. Commonness (system × building type)

These flags are judgments from CBECS B11 (warehouse, office, mercantile, education) and property-types.md section 4 (medical, multifamily, mixed).

| Type | TPO | EPDM | Mod bit | BUR | Metal | Coating |
|---|---|---|---|---|---|---|
| industrial | common | common | less common | less common | common | common |
| office | common | common | common | common | less common | less common |
| retail | common | common | less common | less common | common | common |
| multifamily | common | less common | common | less common | rare | less common |
| mixed | common | less common | common | less common | rare | rare |
| medical | common | less common | common | common | rare | less common |
| k12 | common | common | common | common | less common | less common |

Some of the reasoning behind these flags:

- **Office metal.** CBECS lists 207k office buildings with metal, but many are small steep-slope buildings, so office metal is flagged "less common" for the low-slope commercial scope.
- **Coatings.** Coatings are common on warehouses (metal and single-ply restoration) and on retail boxes.

## Open questions

1. Open the Fannie Mae 4099.F roof rows (mod-bit, standing seam, single-ply variants) and the Cash 1997 per-system table. These are the two most valuable verifications.
2. Get the CERL MicroROOFER and BUILDER roof deterioration-curve coefficients (Bailey et al. 1995; ERDC/CERL TR-12-13) to replace the β = 3 judgment.
3. Get the full CBECS B11 table, including health care and lodging columns, or compute it from the 2018 microdata (variables RFCNS × PBA, weighted).
4. Get the NISTIR 4972 climate split (Dallas vs Washington/Baltimore) as a direct mod-bit climate comparison.
5. Get a hot-climate TPO field study with service-life numbers, which would replace the −15% judgment.
