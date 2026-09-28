# PAX Roof Lifecycle (TCO) Model

A sales tool for PAX Services Group. A rep enters a customer's roof details and gets a branded, printable report. The report compares 20-year roof costs with PaxSeal planned maintenance against reactive maintenance, for the customer's market.

**Live report:** https://noah-austin.github.io/TOC-Model/ (published by `.github/workflows/pages.yml` on every push).

The same page is `dist/index.html`: one self-contained file with no internet dependencies, so it also works as an email attachment.

- With no URL parameters, the page shows an input form and works as a calculator.
- "Copy report link" builds a URL like `?customer=Acme&market=austin&area=40000&roofAge=8&view=report`, which opens the report without the form.
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
| `src/fonts/` | Montserrat woff2 (SIL OFL), embedded at build time |
| `dist/index.html` | Generated: deployable report |

## Commands

```
npm run build   # regenerate data/model_defaults.json and dist/index.html
npm test        # build, then run engine tests
```

After editing research data or the engine, run `npm run build` and commit `dist/index.html`.

## Markets

| State | Markets |
|---|---|
| Texas | Austin, San Antonio |
| Virginia | Hampton Roads, Culbertson (Northern Virginia) |
| Maryland | Laurel |

To add a market: write `data/markets/<id>.json` (see `SCHEMA.md`), add it to the `MARKETS` list in `scripts/build.mjs`, add its primary county to `scripts/refresh_nri.py`, then run the refresh and `npm run build`.

## Status

- Phase 1 standalone report: working.
- Data: round 1, with many low-confidence values. See `docs/research/COMPARISON.md`.
- Still to add: the real PAX logo (currently a wordmark placeholder) and the Salesforce Flow (Phase 2).
