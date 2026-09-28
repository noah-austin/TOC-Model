# National inputs: research memo

Researched 2026-09-28. Machine-readable values are in `data/national.json`.

## How this was researched (read first)

The research environment's egress proxy blocked direct access to bls.gov, fred.stlouisfed.org, nrca.net, agc.org, fanniemae.com, iibec.org, wbdg.org and most other sites, for both curl and page fetches. Every figure below was therefore read from search-engine extracts of the linked pages, not from a full read of each page. For that reason no value is rated "high" confidence. Before client-facing use, someone with open web access should click each link and confirm the number. A GitHub mirror of BLS PPI data exists, but it was not used: computing on it was blocked by session permissions. The web-search budget also ran out before sections F (valuation) and G (leak secondary costs) could be sourced.

## Key takeaways

- **Life extension from planned maintenance: default +5 yrs (range 3–8).** The best-sourced figure is NRC Canada's life-cycle modelling practice of extending an assigned service life by 3–5 years with maintenance. Carlisle's Continu-Care program, which extends the warranty by 5 years for annually maintained roofs, supports 5. The popular "21 vs 13 years" figure is untraceable.
- **Reactive vs planned repair cost multiplier: default 3x (range 1.8–5), low confidence.** No primary roof study was found. The 3–5x and 3–9x figures are marketing claims. The Firestone/ProLogis claim ($0.25 vs $0.14/sf/yr) implies 1.8x on annual spend.
- **PaxSeal default fee: $800/yr base + $0.13/sq ft/yr (Roof Only).** This is derived from market benchmarks. Full-service contracts are quoted at $0.15–0.25/sf/yr and inspection-only at $0.05–0.10. The formula gives an effective $0.17/sf at 20k sf and $0.138/sf at 100k sf. The Complete tier has no benchmark (null).
- **Escalation (BLS PPI PCU23816X23816X, roofing contractors, nonresidential):** 10-yr CAGR is **5.75%** (Dec 2015–Dec 2025). The longest available span, 18 yrs from Dec 2007, is **4.60%**. Recommended 20-yr model default: 4.6%.
- **Insurance:** US property rates are now falling (−13% in Q2 2026, per Marsh) after the 2023 hard market (+17–20% per quarter, per CIAB). The ISO CP 10 36 endorsement lets carriers put roofs on ACV. No quantified premium effect from roof age or maintenance was found.

## Assumption table

| # | Assumption | Default | Range | Unit | Confidence | Source(s) |
|---|---|---|---|---|---|---|
| A1 | Roof life, maintained | 21 | 18–25 | yrs | low | [Ridgeline (Firestone/ProLogis claim)](https://ridgelineroofingcompany.com/how-commercial-roof-maintenance-prevents-leaks/), [GSM Roofing (NRCA attribution)](https://www.gsmroofing.com/news/nrcas-preventive-maintenance-tips-prolonging-the-life-of-commercial-roofs/) |
| A2 | Roof life, reactive | 13 | 10–17.4 | yrs | low | Same as A1; 17.4 from Cash 1997 via [NRC Canada](https://nrc-publications.canada.ca/eng/view/supplement/?id=49c7996a-27aa-4c44-bcaa-5f6df2ea4f1b&dp=120) |
| A3 | Life extension from maintenance | 5 | 3–8 | yrs | medium | [NRC Canada, Effective Roof Management](https://nrc-publications.canada.ca/eng/view/supplement/?id=49c7996a-27aa-4c44-bcaa-5f6df2ea4f1b&dp=120) ("extended by three to five years"); [Carlisle Continu-Care](https://www.carlislesyntec.com/en/About-Carlisle/Warranty-Services/Continu-Care-Warranty) (+5-yr warranty) |
| A4 | Reactive / planned repair cost multiplier | 3.0 | 1.8–5.0 | x | low | [Kodiak Roofing (3–5x)](https://www.kodiakroofing.com/blog/emergency-vs-planned-roof-repairs/), [Upstate Roofing ("GAF Apr 2026", 3–9x)](https://www.upstateroofingpros.com/blog/roof-maintenance-reduces-capital-costs-2026-guide), [DOE FEMP O&M Guide (12–18% PM savings, context)](https://www.energy.gov/sites/prod/files/2020/04/f74/omguide_complete_w-eo-disclaimer.pdf) |
| A5 | Maintenance cost, survey basis | 0.14 | 0.09–0.19 | $/sf/yr (1997 $) | medium | [IIBEC, LCCA Using Roofing Coatings](https://iibec.org/publication-post/life-cycle-cost-analysis-using-roofing-coatings/) (Schneider & Keenan 1997; Cash 1997) |
| A6 | Maintenance share of annual life-cycle cost | 0.33 | — | fraction | medium | [NRC Canada](https://nrc-publications.canada.ca/eng/view/supplement/?id=49c7996a-27aa-4c44-bcaa-5f6df2ea4f1b&dp=120) |
| A7 | Maintenance as % of replacement cost | null | 1–3 | %/yr | low | [Upstate Roofing (unattributed)](https://www.upstateroofingpros.com/blog/roof-maintenance-reduces-capital-costs-2026-guide) |
| A8 | Share of roofs failing to reach expected life | null | — | % | low | [Fortis: "80%" is folklore](https://fortis.us.com/who-said-it-first-80-of-roofs-are-replaced-prematurely/) |
| B1 | Inspection fee per visit | 500 | 250–1,000 | $/visit | low | [Roof Medic](https://roofmedic.com/blog/commercial-roof-inspection-cost/), [General Roofing](https://generalroof.com/commercial-roof-inspection-checklist-cost/) |
| B2 | Basic plan (inspect + clean) | 0.035 | 0.03–0.10 | $/sf/yr | low | [Weather Shield](https://weathershieldusa.com/how-much-does-a-commercial-roof-maintenance-plan-cost/), [Stay Dry](https://staydryroofing.com/what-is-the-cost-of-commercial-roof-maintenance/), [West Roofing](https://www.westroofingsystems.com/cost-of-a-commercial-roof-maintenance-plan) |
| B3 | Inspection-only contract | 0.075 | 0.05–0.10 | $/sf/yr | low | [Griffith Roofing](https://www.griffithroofing.com/commercial-roof-maintenance-plan/) |
| B4 | Full-service contract (closest to PaxSeal) | 0.20 | 0.15–0.25 | $/sf/yr | low | [Commercial Roof Guide](https://commercialroofguide.com/guides/roof-maintenance/), [Griffith Roofing](https://www.griffithroofing.com/commercial-roof-maintenance-plan/) |
| B5 | PaxSeal Roof Only base fee (derived) | 800 | 500–1,400 | $/yr | low | 2 × per-visit fee (B1 tiers) |
| B6 | PaxSeal Roof Only $/sf (derived) | 0.13 | 0.08–0.20 | $/sf/yr | low | Calibrated to B3/B4 |
| B7 | Complete-tier uplift | null | — | — | low | No benchmark found |
| C1 | Escalation, 10-yr CAGR | 5.75 | 2.47–9.14 | %/yr | medium | [FRED PCU23816X23816X table](https://fred.stlouisfed.org/data/PCU23816X23816X), [AGC PPI tables Jan 2026](https://www.agc.org/sites/default/files/users/user21902/PPI%20Tables%202026_01%20Redo_v2.pdf) |
| C2 | Escalation, long-run (18-yr) CAGR | 4.60 | 2.91–5.75 | %/yr | medium | [FRED PCU23816X23816X](https://fred.stlouisfed.org/series/PCU23816X23816X) |
| C3 | Asphalt felts & coatings (WPU136), 2021–24 | 8.0 CAGR | — | %/yr | medium | [AGC PPI tables Jan 2025](https://www.agc.org/sites/default/files/users/user21902/PPI%20Tables%202025_01.pdf) |
| D1 | TPO life | 20 | 15–35 | yrs | medium | [Fannie Mae EUL 4099.F](https://multifamily.fanniemae.com/media/35621/display), [NRCA TPO study, Professional Roofing 2014](https://www.professionalroofing.net/Articles/A-study-of-longevity--02-01-2014/2406) |
| D2 | EPDM life | 20 | 20–38 | yrs | medium | [Fannie Mae EUL](https://multifamily.fanniemae.com/media/35621/display), [ERA 38-yr survey](https://epdmroofs.org/resource/survey-research-confirm-epdm-roofing-membranes-last-38-years/), [UFC 3-110-03](https://nibs-s3-wbdg3-production.s3.us-east-1.amazonaws.com/FFC/DOD/UFC/ufc_3_110_03_2012_c5.pdf) |
| D3 | Mod bit life | 20 | 15–25 | yrs | low | [The Roofing Brief](https://theroofingbrief.com/flat-roof-materials-compared/) |
| D4 | BUR life | 20 | 17.4–30 | yrs | medium | [Fannie Mae EUL](https://multifamily.fanniemae.com/media/35621/display), Cash 1997 via [NRC Canada](https://nrc-publications.canada.ca/eng/view/supplement/?id=49c7996a-27aa-4c44-bcaa-5f6df2ea4f1b&dp=120) |
| D5 | Metal life | 40 | 30–40 | yrs | medium | [Fannie Mae EUL](https://multifamily.fanniemae.com/media/35621/display) |
| D6 | Coating restoration, years added | 15 | 10–20 | yrs | low | [West Roofing (warranty terms by mil)](https://www.westroofingsystems.com/process-warranty-cost-silicone-roof-coating-systems) |
| E1 | US property insurance rate trend | −13 | −20 to −10 | % (Q2 2026) | medium | [Marsh GIMI Q2 2026](https://www.marsh.com/en/about/media/global-commercial-insurance-falls-6-percent-q2-2026.html), [CIAB Q1 2024](https://www.insurancejournal.com/news/national/2024/05/20/774982.htm), [CIAB Q4 2024](https://www.insurancejournal.com/news/national/2025/02/20/812606.htm) |
| E2 | Premium/deductible effect of roof age or maintenance | null | — | — | low | None found |
| G1 | Interior damage per leak | null | — | $ | low | None traceable |

## Notes by topic

### A. Planned vs reactive evidence
- **NRC Canada / CIB, "Effective Roof Management"** is the most credible source reached. Life-cycle models assign a service life and then extend it by 3–5 years with maintenance, with maintenance spend rising in the extension years. In its dataset, maintenance averages about one-third of annual life-cycle cost. It also summarises Cash (1997), a survey of 400+ contractors that found a 17.4-yr average for multi-ply asphalt, and Kyle & Kalinger (1997), whose data "support the hypothesis" that well-maintained roofs last significantly longer. Kyle & Kalinger's numbers were not obtained.
- **IIBEC** (LCCA using coatings) cites two 1997 surveys of maintenance cost: Schneider & Keenan, $0.14–0.19/sf/yr, and Cash, $0.09–0.15/sf/yr. Its "comprehensive roof asset management" scenario uses semi-annual inspections plus post-storm checks, which mirrors PaxSeal.
- **Manufacturer and insurer requirements:** Carlisle recommends inspections at least twice a year and after storms, with records kept. FM Global DS 1-29 recommends semi-annual and post-storm inspection with written records. PaxSeal's 2 visits a year matches both.
- **The US Army Corps ROOFER system** defines a Roof Condition Index (0–100) for managing roofs. No quantified life-extension result from it was retrieved.

### B. Pricing
The benchmarks are contractor marketing pages (low confidence), but they are consistent. PaxSeal resembles a "full-service" contract: two visits, repairs capped per visit, and reports. The recommended formula, **$800 + $0.13/sf/yr**, puts small roofs at the top of the $0.15–0.25 band and large roofs slightly below it. The base fee is 2 × a per-visit inspection fee. PAX should replace the $/sf term with its own loaded labor rate × expected repair hours (up to 8 hrs/yr) plus materials once it has a price.

### C. Escalation
Series: **PCU23816X23816X**, Roofing contractors, nonresidential building work (Dec 2007 = 100). It covers new nonresidential construction plus maintenance and repair work. Values: Dec 2015 = 128.5, Dec 2025 = 224.789, Feb 2026 = 224.143. AGC's Dec/Dec changes are 2021 +6.0%, 2022 +18.8%, 2023 +14.9%, 2024 +2.7% and 2025 +4.2%, which put Dec 2020 at about 145.2. So:
- 2015–2020: 2.47%/yr
- 2020–2025: 9.14%/yr
- 2015–2025: 5.75%/yr
- 2007–2020: 2.91%/yr
- 2007–2025: 4.60%/yr

The 10-yr figure is inflated by the 2022–23 surge. A 20-yr series does not exist because the index starts in 2007. Material series to pull later: WPU1361 (prepared asphalt roofing), WPU136 (asphalt felts & coatings), PCU3241232412 (asphalt roofing mfg), WPU0721 (plastic construction products, a TPO/PVC proxy) and WPU1392 (insulation). Verisk reports roof claim cost value up about 30% from 2022 to 2024.

### D. Service life
Fannie Mae's lender EUL table (BUR/EPDM/TPO 20 yrs, metal 40) is the most neutral default. Trade and technical sources give higher figures for good systems: EPDM Roofing Association 38 yrs (maintained), DoD UFC EPDM 30+, and NRCA's 2014 TPO study 15–35 depending on grade.

### E. Insurance
- ISO **CP 10 36** (introduced in 2012) can put roof surfacing on ACV and exclude cosmetic hail/wind damage for scheduled premises.
- Age thresholds from the sources: restrictions start around 10–15 yrs, inspections and ACV are common at 15–20, and non-renewal is common beyond 20–25. These come mostly from residential and contractor sources, so confirm with brokers.
- The market has gone from +17–20% per quarter in 2023 (CIAB) to −13% for US property in Q2 2026 (Marsh), the eighth straight decline.
- No quantified credit for documented maintenance was found. Its value is qualitative: records rebut wear-and-tear and neglect denials, and support renewals on older roofs.

### F. Valuation (not source-verified this session)
Direct capitalization: value = NOI ÷ cap rate, so a recurring NOI saving S adds S ÷ cap rate in value. It applies when the landlord bears roof costs as operating expenses: gross or modified-gross leases, or NNN leases where the landlord keeps roof and structure. It does **not** apply as-is in three cases:
- NNN leases with CAM pass-through, where tenants capture the saving.
- Owner-occupied buildings, which have no NOI. Use NPV of cash savings instead.
- Roof replacement, which is CapEx and usually sits below NOI in reserves. Deferring replacement is valued in a DCF, not by capitalizing it.

Verify against the Appraisal Institute's *The Appraisal of Real Estate*.

### G. Leak secondary costs
Not sourced. The only figures seen, such as "$5k–$40k interior remediation", were unattributed blog claims and are excluded.

## Widely cited statistics that proved untraceable
1. **"80% of roofs are replaced prematurely."** Folklore. The earliest known text is a 2006 Kieft/Fortis warranty brochure ([Fortis](https://fortis.us.com/who-said-it-first-80-of-roofs-are-replaced-prematurely/)).
2. **"Maintained roofs last 21 years vs 13 reactive" (Firestone/ProLogis, or "NRCA").** No original study or NRCA document was found. Its $0.14/sf figure matches the 1997 Schneider & Keenan survey.
3. **"NRCA: maintenance extends life by up to 50%."** No NRCA source found.
4. **"Reactive repairs cost 3–5x / 3–9x planned."** Marketing claims. The cited GAF April 2026 report was not located.
5. **"85% of premature failures / 60% of failures due to poor maintenance."** No origin found.
6. **"Maintenance = 1–3% of replacement value per year."** No origin found.

## Open questions
See `open_questions` in `data/national.json`. The main one: verify every search-extracted value with direct page access, and pull full FRED series for exact annual-average CAGRs.
