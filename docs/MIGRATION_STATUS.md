# Migration status — legacy → modules

**Goal:** Keep `assessmentEngine.js` shrinking over time; never run two parallel app entry points.

## Done

- [x] Entry point: `app/main.js` (removed `app-new.js`)
- [x] Legacy code: `js/legacy/assessmentEngine.js` (was `app.js`)
- [x] `AppState` + `StateBridge` single reference for `selectedSpecies` / `assessmentData`
- [x] `StateBridge.flushAssessmentInputs()` before navigation validation and report
- [x] `QuestionRenderer.flushToState()` for dynamic assessments (Bluefin, HMS, etc.)
- [x] `regulationMeta.js` for `dataLastUpdated`
- [x] `appBundle.js` + service worker precache aligned with `index.html`
- [x] Combined limit check decoupled from species loop order (`checkAllViolations`)
- [x] **`species-data/`** — split by fishery (14 modules + README)
- [x] **`js/validation/speciesViolationChecks.js`** — grouped + species-specific violations
- [x] **`js/ui/groupedAssessmentSections.js`** — permits, possession, size/gear, vessel UI
- [x] **`js/ui/reportBuilder.js`** — full report HTML
- [x] **`scripts/validate-species-schema.js`** — JSON Schema structure checks

## Remaining in `assessmentEngine.js` (migrate incrementally)

| Function / area | Target module | Priority |
|-----------------|---------------|----------|
| `generateQuickReference` | `js/ui/quickReference.js` (new) | Medium |
| `populateGrouped*` / `selectGroupedChoice` | `js/ui/groupedAssessmentHelpers.js` | Medium |
| `generateReport` wrapper | thin delegate only | Low |
| Favorites helpers | `js/ui/speciesGrid.js` | Low |

## Regulation data

Edit files under **`species-data/`** (see `species-data/README.md`). Run `npm run validate` before deploy.

## Rule for new features

1. Add regulation data to the appropriate `species-data/*.js` file (or config JS).
2. Add UI/validation in `js/ui` or `js/validation`.
3. Only touch `assessmentEngine.js` if you must extend an existing legacy function — prefer delegation from modules.
