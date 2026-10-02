# PAX Roof Lifecycle (TCO) Model

A sales tool for PAX Services Group. A rep enters a customer's roof details and gets a branded, printable report. The report compares 20-year roof costs with PaxSeal planned maintenance against reactive maintenance, for the customer's market.

**Live report:** https://noah-austin.github.io/TOC-Model/ (published by `.github/workflows/pages.yml` on every push).

The same page is `dist/index.html`: one self-contained file with no internet dependencies, so it also works as an email attachment.

- With no URL parameters, the page shows an input form and works as a calculator.
- "Copy report link" builds a URL like `?customer=Acme&market=austin&area=40000&roofAge=8&view=report`, which opens the report without the form.
- Print → Save as PDF produces a 2-page US Letter report.

**Sales library (V1.0):** https://noah-austin.github.io/TOC-Model/library/ has a ready-made projection for every market × property type, using the typical buildings in `data/library_profiles.json`. Each one has a web view and a PDF. Regenerate with `npm run library` after changing data or the report, then commit `dist/library/`.

## Layout

| Path | What it is |
|---|---|
| `docs/MODEL_BREAKDOWN.md` | What we're building and why: modules, markets, property types |
| `docs/MODEL_SPEC.md` | Exactly how the engine calculates, plus sensitivity and known gaps |
| `docs/research/` | Per-market research memos, cross-market evidence, and `COMPARISON.md` |
| `data/markets/*.json`, `data/national.json` | Sourced research data (schema: `data/markets/SCHEMA.md`) |
| `data/property_types.json` | Property-type research: leak multipliers, multi-family / medical office cap rates |
| `data/model_defaults.json` | Generated: the values the report actually uses |
| `src/engine.js` | Calculation engine. All coefficients are in `MODEL_CONFIG` at the top. |
| `src/report.template.html` | Report page (vanilla JS/SVG, PAX brand colors) |
| `src/fonts/` | Montserrat woff2 (SIL OFL), embedded at build time |
| `data/library_profiles.json` | Typical building per property type for the sales library |
| `scripts/build_library.mjs` | Generates `dist/library/` (35 PDFs + index page) |
| `dist/index.html` | Generated: deployable report |

## Commands

```
npm run build   # regenerate data/model_defaults.json and dist/index.html
npm test        # build, then run engine tests
npm run library # rebuild the sales library PDFs (needs `npm install` for Playwright)
```

After editing research data or the engine, run `npm run build` and commit `dist/index.html`.

## Markets

| State | Markets |
|---|---|
| Texas | Austin, San Antonio |
| Virginia | Hampton Roads, Culbertson (Northern Virginia) |
| Maryland | Laurel |

To add a market: write `data/markets/<id>.json` (see `SCHEMA.md`), add it to the `MARKETS` list in `scripts/build.mjs`, add its primary county to `scripts/refresh_nri.py`, then run the refresh and `npm run build`.

## URL parameters

Every input can be set in the URL, which is how the library links work and how a Salesforce Flow would open a report (handoff Phase 2):

`market`, `propertyType`, `area`, `roofAge`, `system`, `condition`, `warranty`, `leaks`, `customer`, `property`, `city`, `contact`, `preparedBy`, `date`, `costPerSqft`, `replacementCost`, `annualFee`, `escalation`, `capRate`, `ext`, `mult`, `repair`, `internal=1` (internal review copy), `view=report` (hide the builder).

## Status

See the roadmap in `docs/MODEL_BREAKDOWN.md` §5. In short: the engine, report, and V1.0 library are live. Data is round 1, with many low-confidence values. Still needed: research round 2, the real PAX logo, the report and proposal letter templates, and the Salesforce Flow.
