# Model Spec: How the Engine Calculates

Code: `src/engine.js`. **Every value below can be adjusted without code** on the Assumptions page (`/assumptions/`), which writes `data/overrides.json`; the build applies it on top of the research defaults and reports label adjusted values "PAX adjustment".

Code: `src/engine.js`. Every coefficient is in the `MODEL_CONFIG` block at the top of that file. Market values come from `data/model_defaults.json`, which `scripts/build.mjs` generates from the research files. `test/engine.test.mjs` covers the rules below, including a sweep of every market × property type × roof system × age × condition.

## Inputs → resolved values

| Input | Default if blank |
|---|---|
| Market | San Antonio |
| Property type | Warehouse / Industrial. All seven types are live (see `docs/MODEL_BREAKDOWN.md` §4a). |
| Roof area | 20,000 sq ft (form accepts 5,000–2,000,000) |
| Roof system | TPO. Sets design life (L) from `national.json`: 20 yrs for TPO/EPDM/mod bit/BUR, 40 for metal, 15 for coating. |
| Replacement cost (C) | area × market $/sq ft for that system. A rep-entered total wins, and the report shows the $/sq ft it implies. |
| Roof age, condition | Condition adds effective age: Good +0, Fair +2, Poor +4 |
| Warranty left, active leaks | Shown as takeaways only; they don't change the math |
| Rep name, phone, email | Printed in the report's "Next step" box (PAX main line and email when blank) |
| PaxSeal fee | $800 + $0.13/sq ft per year (benchmark estimate; there is no set price). Escalates 3%/yr. |
| Escalation (e) | 4.6%/yr (BLS producer price index, nonresidential roofing contractors, 2007–2025) |
| Cap rate | Market rate for the property type; none for K-12 and medical unless the rep enters one |

Number fields reject values outside their range and use the default instead, with an inline message.

## Service life and replacement timing

- **Planned life = L.** Manufacturer ratings and warranties assume maintenance.
- **Reactive life = L − x**, where x = 5 years (`lifeExtensionYears`, NRC Canada and Carlisle Continu-Care), capped at L/2.
- **Existing roof:**
  - Reactive remaining life = max(0, L − x − effective age).
  - Planned adds x × (share of design life still left), so maintenance started late earns only part of the extension.
- **Timing convention:** a roof with *r* years left serves years 1…r and is replaced in year ⌊r⌋+1. A worn-out roof is replaced in year 1. A new roof installed in year t serves t…t+L−1.

## Each year t = 1…20 (prices escalate as (1 + e)^t)

| Cost line | Planned (PaxSeal) | Reactive |
|---|---|---|
| Program fee | fee × 1.03^(t−1) | none |
| Repairs | need × 50% (the fee covers minor repairs up to 4 hrs/visit) | need × 3 (`reactiveRepairMultiplier`) × property-type leak multiplier |
| Storm damage | C × storm loss % | C × storm loss % × 1.5 |
| Replacement | C × (1+e)^t in the replacement year (no repairs that year) | same |

- **Repair need** = C × (1+e)^t × 1.0% × (20 ÷ L) × wear.
  - wear = 1.05^(age × 20 ÷ L), capped at 3. Wear is measured against design life, so a 20-year-old metal roof is mid-life.
  - The 20 ÷ L factor means a 40-year roof needs about half the repairs per dollar of a 20-year roof.
- **Storm loss %** = FEMA NRI expected annual building loss (hail, strong wind, tornado, hurricane, winter weather, ice storm) ÷ county building value × (0.6 roof share of damage ÷ 0.05 roof share of building value).
  - This is gross expected loss, before insurance. The report says so.

Storm loss % of roof replacement cost per year (FEMA NRI December 2025):

| Austin | San Antonio | Hampton Roads | Culbertson | Laurel |
|---|---|---|---|---|
| 0.28% | 0.38% | 0.44% | 0.15% | 0.13% |

## Outputs

- **Net 20-yr cost** = spending over 20 years + current roof value used − roof life left at year 20.
  - **Current roof value** = C × (L − effective age) ÷ L, in today's dollars. It is the same in both scenarios, so it never changes the savings. It stops net cost from going negative when a long-life roof carries a large end credit.
  - **Roof life left** = C × (life left ÷ total life of the roof in place), straight-line, in today's dollars (conservative).
- **Savings** = reactive net − planned net. **Savings %** = savings ÷ reactive net.
  - The report splits savings into **lower cash spending** (nominal) and the **difference in roof life left** at year 20 (today's dollars), so the non-cash part is visible.
- **Savings range:** the same inputs rerun under two assumption sets (`rangeScenarios`). Rep overrides of those assumptions win.
  - Conservative: 2.0× repairs, 4 yrs life added.
  - Upside: 3.5× repairs, 6 yrs life added.
- **NPV of savings:** yearly differences plus the end-of-period roof-life difference, discounted at 7%.
- **Annual NOI gain:** the level yearly amount with the same present value (7%) as the operating savings (fees, repairs, storm). Replacement reserves are excluded, as many appraisers treat them below the NOI line.
- **Property value protected** = annual NOI gain ÷ cap rate. Shown only when it is positive and a cap rate applies.
- **Emergency costs cut** = reactive (repairs + storm) − planned (repairs + storm). This is the headline for owner-occupied types.
- **Avoided per fee dollar** = (cash savings + fees) ÷ fees. Cash only; it excludes the roof-value difference.
- **Years to double** = ln 2 ÷ ln(1 + e).

## Sensitivity (San Antonio, $200K roof, 20,000 sq ft, 8 yrs old, Good)

| Case | PaxSeal | Reactive | Savings |
|---|---|---|---|
| Base | $513K | $705K | $192K (27%) |
| Reactive repair multiplier 2× | $513K | $609K | $96K (16%) |
| Reactive repair multiplier 3.5× | $513K | $753K | $240K (32%) |
| Life added 4 yrs | $513K | $694K | $181K (26%) |
| Life added 6 yrs | $508K | $722K | $214K (30%) |
| Repair need 0.5%/yr | $489K | $561K | $72K (13%) |

The report's range for this case is $85K–$262K. **The repair multiplier and the base repair rate drive most of the result, and neither has a primary source.** PAX service-ticket history is the best way to calibrate them.

## Report copies

- **Customer copy (default):** the assumptions table shows value and basis only.
- **Internal review copy** (`internal=1`, or "Show source confidence" in the builder):
  - adds research confidence ratings and lists any placeholder data;
  - marks every page footer "Internal review copy".
- The PaxSeal fee is never given a confidence rating. It shows as an estimate, or as the PAX price once a rep enters it.

## Differences from the earlier prototype and the coworker's model

- **Storms** use expected annual loss, not hardcoded storm years (4, 8, 13, 17).
- **Roof age and condition** change the curves, not just the text.
- **The PaxSeal fee** is counted in the planned scenario.
- **Asset value** uses an annual NOI figure, not cumulative savings ÷ cap rate.
- **The initial install is not a cash cost.** Totals start at $0 spending today, so they aren't directly comparable to the coworker's "$329K vs $564K", which started from a $100K install.
- **No insurance-premium escalation line.** Commercial property rates were falling in 2026, so the insurance angle is covered in the text instead.

## Not modeled yet

- The Complete (building envelope) tier: no pricing or benefit data yet.
- Insurance recovery on storm damage (deductibles, ACV coverage on older roofs).
- Active leaks and warranty status as cost drivers (they only appear as takeaways today).
