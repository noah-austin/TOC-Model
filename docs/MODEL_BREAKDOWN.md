# PAX Roof TCO Model — What We're Building

## 1. The one-sentence version

A sales tool that shows a building owner, **in their market**, what their roof will cost over 20 years if they sign a **PaxSeal** maintenance agreement compared with fixing things only when they break. The difference is shown as dollars saved and as property value protected.

The model exists to justify the PaxSeal price. The two proposals (Roof Only / Complete Service) are the product. Right now both show the price as `$TK`, and this model is what backs up that number.

## 2. Four modules

```
 ┌─────────────┐   ┌────────────────────┐   ┌──────────────┐   ┌─────────────┐
 │ 1. INPUTS   │ → │ 2. MARKET TABLE    │ → │ 3. ENGINE    │ → │ 4. REPORT   │
 │ (rep fills) │   │ (researched, fixed │   │ (the math)   │   │ (customer   │
 │             │   │  per market)       │   │              │   │  sees)      │
 └─────────────┘   └────────────────────┘   └──────────────┘   └─────────────┘
```

### Module 1: Inputs (per customer, entered by the rep)
- Market (picklist, which drives Module 2)
- Property type, roof area, roof system, roof age, condition
- Replacement cost (the coworker used a flat $100K; the real value is sq ft × market $/sq ft)
- PaxSeal tier (Roof Only or Complete) and the annual fee

### Module 2: Market assumptions table (this is the research)
There is one row per market, and every number has a source and a date.

| Variable | Why it matters | Candidate sources |
|---|---|---|
| Replacement cost $/sq ft by roof system | Starting point of the replacement curve | Internal PAX job history (best), RSMeans City Cost Index |
| Historic roofing cost escalation % | Slope of the replacement curve ("doubles in ~14–18 yrs") | BLS PPI for roofing contractors / asphalt & membrane materials; RSMeans historical index |
| Primary perils + annual frequency | Storm/hail damage events over 20 yrs | **FEMA National Risk Index** (county-level annualized frequency and expected loss for hail, wind, hurricane, winter weather, all from one consistent source), NOAA SPC hail reports, NOAA hurricane return periods |
| Commercial property insurance trend | Coworker's "insurance escalation" line | State insurance dept filings, broker market reports (Marsh, WTW, Amwins), roof-age underwriting rules |
| Cap rate by property type | Converts savings into asset value | CBRE / Cushman / JLL cap rate surveys (by metro and asset class) |
| Expected roof life, maintained vs reactive | When replacement hits in each scenario | NRCA / RCI / manufacturer data; climate adjustment (UV/heat in TX and FL, freeze-thaw in MD) |
| Local code triggers | Forced full replacement after damage | State and local building codes (e.g., Florida's re-roof rules) |
| PaxSeal price per market | Actual cost of the maintained scenario | Internal |

### Module 3: Engine (the math)
Each item below is calculated year by year for 20 years, for two scenarios:

| Line item | Planned (PaxSeal) | Reactive |
|---|---|---|
| Maintenance/program fee | PaxSeal fee, escalated | $0 |
| Repairs | Small, caught early | Larger, emergency rates, interior damage |
| Storm damage | Lower expected loss (roof documented and sealed, warranty intact) | Higher expected loss |
| Insurance premium | Base trend | Base trend + penalty for roof age/condition (ACV-only coverage, higher deductibles) |
| Replacement | Later (full life) | Earlier (shortened life) |

Outputs:
- **Cumulative TCO**: the two scenario curves
- **Replacement cost curve**: what a new roof costs in year N, as the coworker described
- **Savings** = reactive − planned
- **Asset value protected** = annual NOI savings ÷ market cap rate

### Module 4: Report
This is the branded, printable, self-contained HTML page described in the handoff (Phase 1).

## 3. Feedback on the coworker's approach

**Keep:**
- Reactive vs planned as the core comparison
- The replacement-cost escalation curve as the backdrop (it creates the "waiting is expensive" urgency)
- Storm risk shown as expected events over 20 years
- Cap-rate framing for investor-owned buildings

**Fix:**
1. **Source every number.** Figures from ChatGPT with no citation will not survive a customer's CFO asking "where does 6% come from?" Every value in Module 2 needs a source and a date.
2. **Storm years should be expected values, not hardcoded.** The prototype hits storms in years 4, 8, 13 and 17. It should use annual probability × average loss, and optionally show a "bad luck" scenario.
3. **Risk is different in each market.** Texas is hail. West Palm Beach is hurricane/wind plus Florida's insurance crisis. Hampton Roads and Maryland are coastal wind, nor'easters and freeze-thaw. The model needs a generic "peril" slot, not a hail-only one.
4. **The cap-rate math only applies to some customers.** Savings ÷ cap rate is valid for investor-owned income property where the owner absorbs the cost. It is weak or irrelevant for owner-occupied buildings, K-12, government and NNN leases where the tenant pays. Show asset value only for the property types where it applies.
5. **Roof age must move the curves.** A 12-year-old roof starts partway down the curve (this is known issue #3 in the handoff).
6. **The PaxSeal fee has to appear in the planned scenario.** Otherwise the comparison is not honest.
7. **Use real replacement cost, not $100K.** $100K is fine as a demo default.

## 4. Markets

| Market | Area covered | Primary county (FEMA NRI) | Main roof perils |
|---|---|---|---|
| Austin | Austin metro, TX | Travis | Hail, tornado, heat/UV |
| San Antonio | San Antonio metro, TX | Bexar | Hail, tornado, heat/UV |
| Hampton Roads | Norfolk / Virginia Beach, VA | Norfolk | Hurricane/tropical storm, nor'easters, salt air |
| Culbertson | Northern Virginia (Manassas-based Culbertson Co.) | Prince William | Thunderstorm wind/derecho, snow/ice |
| Laurel | Baltimore–Washington corridor, MD | Prince George's | Thunderstorm wind/derecho, snow load |

Specific customer addresses can refine the county-level data later.

Per-market research lives in `docs/research/<market>.md`. The data the model reads is in `data/markets/<market>.json` (schema: `data/markets/SCHEMA.md`). Cross-market evidence (maintained vs reactive life, repair cost multipliers, PPI escalation, program pricing benchmarks) is in `data/national.json` and `docs/research/national.md`.

## 4a. Property types

| Property type | Status | Why |
|---|---|---|
| Warehouse / Industrial | **v1** | Large low-slope roofs; investor-owned; cap rate applies |
| Office | **v1** | Cap rate applies; interior leak damage costs more |
| Retail | **v1** | Cap rate applies; business interruption from leaks |
| Medical / Institutional | In development | Mostly owner-occupied; needs a non-cap-rate value story |
| K-12 / Education | In development | Public owners; value framed as budget/capital-plan certainty |
| Multi-Family | In development | Different cap rates and roof systems (often steep-slope) |
| Mixed Use | In development | Blend of the above |

## 4b. PaxSeal price

There is no set price, so the planned scenario uses an **estimated program fee**: a default formula (base fee + $/sq ft per year, from industry benchmarks in `national.json`) that the rep can override. The report labels it as an estimate.

## 5. Suggested order of work

1. **Lock the model structure with San Antonio**, using the existing benchmark: ~$329K maintained / ~$564K deferred at $100K.
2. **Research one market fully** (San Antonio, to validate against the coworker's numbers) and fill in its row in the table.
3. **Research the remaining markets** into the same table (`data/markets.json` or a spreadsheet).
4. **Build the report page** (handoff Phase 1), with a market picker driving the defaults.
5. Salesforce comes later (handoff Phase 2).

## 6. Open questions

- Internal job-cost data (repair tickets, replacement $/sq ft by branch) is unknown. If it exists, it should replace the public $/sq ft estimates.
- Will Roof Only and Complete Service be modeled separately? Complete adds building envelope: walls, sealants, windows.
