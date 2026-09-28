# Model Spec: How the Engine Calculates

Code: `src/engine.js`. Every coefficient is in the `MODEL_CONFIG` block at the top of that file. Market values come from `data/model_defaults.json`, which `scripts/build.mjs` generates from the research files.

## Inputs → resolved values

| Input | Default if blank |
|---|---|
| Market | San Antonio |
| Property type | Warehouse / Industrial. Only Industrial, Office and Retail are enabled; the rest are marked "in development". |
| Roof area | 20,000 sq ft |
| Roof system | TPO. Sets design life from `national.json`: 20 yrs for TPO/EPDM/mod bit/BUR, 40 for metal, 15 for coating. |
| Replacement cost | area × market $/sq ft for that system |
| Roof age, condition | Condition adds effective age: Good +0, Fair +2, Poor +4 |
| PaxSeal fee | $800 + $0.13/sq ft per year. This is an estimate from benchmarks; there is no set price. |
| Escalation | 4.6%/yr (BLS producer price index, nonresidential roofing contractors, 2007–2025) |
| Cap rate | Market rate for the property type. Uses the cross-market median when missing, and flags it on the report. |

## Service life

- **Planned life = design life (L).** Manufacturer ratings and warranties assume maintenance.
- **Reactive life = L − 5 years** (`lifeExtensionYears`, from NRC Canada and Carlisle Continu-Care).
- **An existing roof** starts with reactive remaining life of `max(1, (L − 5) − effective age)`. Planned adds `5 × (share of design life still left)`. Maintenance started late earns only part of the extension, and a worn-out roof is replaced in year 1 under both scenarios.
- **After a replacement,** the new roof gets the full life for its scenario.

## Each year t = 1…20 (prices escalate as (1 + e)^t)

| Cost line | Planned (PaxSeal) | Reactive |
|---|---|---|
| Program fee | fee × 1.03^(t−1) | none |
| Repairs | need × 50%. The fee covers the other half (minor repairs up to 4 hrs/visit). | need × 3 (`reactiveRepairMultiplier`) |
| Storm damage | C × storm loss % | C × storm loss % × 1.5 |
| Replacement | C × (1+e)^t in the replacement year, when repairs are skipped | same |

Definitions used in the table:
- **Repair need** = C × (1+e)^t × 1.0% × 1.05^(roof age). This is the cost of fixing defects on a planned visit, and it grows as the roof ages.
- **Storm loss %** = FEMA NRI expected annual building loss for hail, strong wind, tornado, hurricane, winter weather and ice storm, divided by county building value, then × (0.6 roof share of damage ÷ 0.05 roof share of building value).

Current storm loss % of roof replacement cost per year, by market:

| Austin | San Antonio | Hampton Roads | Laurel | Culbertson |
|---|---|---|---|---|
| 0.31% | 0.26% | 0.44% | 0.45% | 0.15% |

## Outputs

- **Residual value:** the roof life left at year 20, straight-line, priced at year-20 replacement cost. This stops the model from punishing a scenario that happens to replace in year 19.
- **Net 20-yr cost** = total spend − residual value. **Savings** = reactive − planned.
- **NPV of savings** at a 7% discount rate.
- **Annual NOI gain** (today's dollars) = average yearly operating-cost savings + the difference in replacement reserves (C / reactive life − C / planned life).
- **Asset value protected** = annual NOI gain ÷ cap rate.
  - This fixes a bug in the old prototype, which divided *cumulative* savings by the cap rate.
  - It is only meaningful for income property where the owner pays roof costs. NNN leases and owner-occupied buildings need different wording.
- **Return per fee dollar** = savings ÷ total PaxSeal fees.
- **Years to double** = ln 2 ÷ ln(1 + e).

## Sensitivity (San Antonio, $200K roof, 8 yrs old, Good)

| Case | PaxSeal | Reactive | Savings |
|---|---|---|---|
| Base | $249K | $557K | $308K (55%) |
| Reactive repair multiplier 1.8× | $249K | $441K | $192K (44%) |
| Reactive repair multiplier 5× | $249K | $750K | $502K (67%) |
| Life extension 3 yrs | $239K | $467K | $228K (49%) |
| Life extension 8 yrs | $259K | $627K | $368K (59%) |
| Base repair need 0.5%/yr | $225K | $412K | $187K (45%) |

**Two assumptions drive most of the savings, and neither has a primary source:** the repair multiplier and the base repair rate. PAX's own service-ticket history is the best way to calibrate them.

## Differences from the earlier prototype and the coworker's model

- **Storms** use expected annual loss, not hardcoded storm years (4, 8, 13, 17).
- **Roof age** changes the curves, not just the text.
- **The PaxSeal fee** is counted in the planned scenario.
- **The initial install is not counted**, because it's a sunk cost for an existing roof. Totals start at $0 today, so they are not directly comparable to the coworker's "$329K vs $564K", which started at the $100K install.
- **No insurance-premium escalation line.** Commercial property rates were falling in 2026. The insurance angle is covered in the text instead (documented maintenance history).

## Not modeled yet

- The Complete (building envelope) tier: no pricing or benefit data yet.
- Interior leak damage and business interruption: no sourced figures.
- Wind/hail deductibles and roof-age ACV (actual cash value) coverage.
- Medical, K-12, Multi-Family and Mixed Use, which need a value story other than cap rate.
