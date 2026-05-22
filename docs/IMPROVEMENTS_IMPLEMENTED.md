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

## Still recommended (future)
- Migrate `generateReport` fully into `reportGenerator.js`
- Tier updates for species with "Check current" placeholders (validator warnings)
- HMS commercial quota open/closed flags
- Automated browser tests (Playwright) for smoke paths
