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

## Remaining in `assessmentEngine.js` (migrate incrementally)

| Function / area | Target module | Priority |
|-----------------|---------------|----------|
| `createGroupedPermitsSection` | `js/ui/assessmentSteps.js` | Medium |
| `createGroupedPossessionSection` | `js/ui/assessmentSteps.js` | Medium |
| `createGroupedSizeGearSection` | `js/ui/assessmentSteps.js` | Medium |
| `createGroupedVesselRequirementsSection` | `js/ui/assessmentSteps.js` | Low |
| `generateReport` | `js/ui/reportGenerator.js` | High (largest) |
| `checkSpeciesViolations` | `js/validation/violationChecker.js` (new) | High |
| `generateQuickReference` | `js/ui/quickReference.js` (new) | Low |
| Favorites helpers | `js/ui/speciesGrid.js` | Low |

## Do not migrate yet

- `species-data.js` — stays as data; consider splitting by fishery **only** when edit conflicts become painful (e.g. `species-data/hms.js` imported into index).

## Rule for new features

1. Add regulation data to `species-data.js` (or config JS).
2. Add UI/validation in `js/ui` or `js/validation`.
3. Only touch `assessmentEngine.js` if you must extend an existing legacy function — prefer delegation from modules.
