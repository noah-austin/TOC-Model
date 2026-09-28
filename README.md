# PAX Roof Lifecycle (TCO) Model

A sales tool for PAX Services Group. A rep enters a customer's roof details and gets a branded, printable report. The report compares 20-year roof costs with PaxSeal planned maintenance against reactive maintenance, for the customer's market.

**Open the report:** `dist/report.html`. It is one self-contained file with no internet dependencies, so it works as an email attachment or on Azure Static Web Apps.

- With no URL parameters, the page shows an input form and works as a calculator.
- "Copy report link" builds a URL like `report.html?customer=Acme&market=austin&area=40000&roofAge=8&view=report`, which opens the report without the form.
- Print → Save as PDF produces a 2-page US Letter report.

## Layout

| Path | What it is |
|---|---|
| `docs/MODEL_BREAKDOWN.md` | What we're building and why: modules, markets, property types |
| `docs/MODEL_SPEC.md` | Exactly how the engine calculates, plus sensitivity and known gaps |
| `docs/research/` | Per-market research memos, cross-market evidence, and `COMPARISON.md` |
| `data/markets/*.json`, `data/national.json` | Sourced research data (schema: `data/markets/SCHEMA.md`) |
| `data/model_defaults.json` | Generated: the values the report actually uses |
| `src/engine.js` | Calculation engine. All coefficients are in `MODEL_CONFIG` at the top. |
| `src/report.template.html` | Report page (vanilla JS/SVG, PAX brand colors) |
| `dist/report.html` | Generated: deployable report |

## Commands

```
npm run build   # regenerate data/model_defaults.json and dist/report.html
npm test        # build, then run engine tests
```

After editing research data or the engine, run `npm run build` and commit `dist/report.html`.

## Markets (v1)

- Austin
- San Antonio
- Hampton Roads
- Laurel
- Culbertson (Northern Virginia)

## Status

- Phase 1 standalone report: working.
- Data: round 1, with many low-confidence values. See `docs/research/COMPARISON.md`.
- Still to add: the real PAX logo (currently a text wordmark), embedded Montserrat (currently falls back to Arial), and the Salesforce Flow (Phase 2).
