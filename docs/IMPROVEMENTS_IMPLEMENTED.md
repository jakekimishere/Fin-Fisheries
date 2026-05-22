# Improvements implemented (2026-05-21)

## Validation & QA
- `npm run validate` — runs species-data + violation coverage scripts
- `scripts/validate-all.js` — same checks in one command
- `js/validation/violationChecker.js` — facade for species/all violation checks

## Violations (all species)
- `js/validation/assessmentViolations.js` — shared rules: `ifGreaterThan`, `ifTrue`/`ifFalse`, `ifBelow`, `ifExceeds`, `ifProhibited`, `ifMissing`, summer flounder mesh/seasonal limits
- Reports include dynamic assessment answers via `formatDynamicReportRows`
- 24 prohibited species auto-tested in `validate-violation-coverage.js`

## UX / flow
- `js/config/multispeciesFlow.js` — skip **vessel requirements** when empty; skip **vessel classification** for plaice-only style selections (defaults to common pool)
- Size & Gear button: **Generate Report** when vessel requirements are skipped
- FIN → home; back navigation restores last step

## Data
- Summer flounder `possessionLimitCheck` keys aligned with `commercial` / `recreational` permit options
- Simplified groundfish (incl. American plaice) — light `assessmentQuestions` for possession + size

## Polish
- Print CSS hides header, nav, footer
- Cache bump: `fin-fisheries-v7` in `js/config/appBundle.js`
- Script bundle lists new validation/config files

## Tier E — High impact data & quota (2026-05-21)
- `FISHERY_QUOTA_STATUS_CONFIG.js` — BFT commercial daily limits (closure/RFD/season), herring Area 1A/1B 2,000 lb, skate wing trips, silver hake mesh limits, salmon EEZ prohibition
- `assessmentViolations.js` — uses quota config when `possessionLimitCheck` limits are null; quota closed / closed-area flags
- **12 placeholder species** updated: salmon, bluefin, herring, silver hake, sculpin, skates, tigerfish, king/Spanish mackerel, tautog
- Cache `fin-fisheries-v8`; validator asserts salmon prohibited, mackerel 3/15, herring 1B 2000 lb, BFT June limit 3

## Engineering & ops (2026-05-21)
- `js/ui/reportBuilder.js` — shared report/pre-report HTML (header, summary, verdict, species blocks)
- `scripts/smoke-scenarios.js` — `npm run test:smoke` (8 scenario checks)
- `docs/OPS.md` — deploy checklist; `DATA_VERIFICATION.md` tier table
- Footer/home dates: static fallback in HTML + `updateFooterDate()` in `update-checker.js`
- A11y: `focus-visible` on primary buttons; pre-report `aria-live` / `aria-modal`
- Cache `fin-fisheries-v9`

## Report migration (2026-05-21)
- `ReportBuilder.buildFullReport` / `buildSpeciesSection` — full per-species report HTML
- `generateReport()` delegates to ReportBuilder; format helpers live in reportBuilder
- Cache `fin-fisheries-v10`

## Still recommended (future)
- HMS shark commercial quota by species group
- Playwright E2E in CI (optional)
