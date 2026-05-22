# FIN Architecture

**FIN** (Fisheries Inspection Navigator) is a static PWA. Regulation content lives in data files; runtime logic is split between a modular shell and a legacy assessment engine.

## Layer diagram

```
index.html
    │
    ├── js/config/regulationMeta.js     ← data version (update when NOAA rules change)
    ├── species-data.js                 ← regulations + assessment questions
    ├── REGULATION_DATES_CONFIG.js      ← seasonal / closure dates
    ├── SPECIES_GROUPS_CONFIG.js        ← combined possession groups
    │
    ├── js/state/stateManager.js        ← AppState (authoritative)
    ├── js/core/stateBridge.js          ← binds AppState ↔ window globals
    │
    ├── js/ui/*                         ← species grid, steps, questions, report wrapper
    ├── js/legacy/assessmentEngine.js   ← grouped UI builders, violations, report HTML
    └── app/main.js                     ← entry point / orchestrator
```

## State model

| Store | Role |
|-------|------|
| `AppState` (`appState`) | **Single source of truth** — `selectedSpecies`, `assessmentData`, `currentStep` |
| `window.selectedSpecies` | Same array reference as `appState.selectedSpecies` (via `StateBridge`) |
| `window.assessmentData` | Same object reference as `appState.assessmentData` |

Before validation, navigation, or report generation, call `StateBridge.flushAssessmentInputs()` so form values are persisted.

## Bluefin Tuna → report (example path)

Species with `regulations.assessmentQuestions` use the **dynamic assessment** flow (not grouped permits/possession steps).

| Step | UI | Owner |
|------|-----|--------|
| 1. Homepage | `#step-homepage` | `Navigation.selectRegionalFishery('northeast')` → `app/main.js` |
| 2. Species selection | `#step-0`, species grid | `SpeciesGrid.toggleSpecies()` → `AppState.addSpecies('bluefin-tuna')` |
| 3. Continue | Proceed button | `nextStep(0)` / `proceedToAssessment()` → `Navigation.showStep(1)` |
| 4. Generate steps | `#assessment-sections` | `AssessmentSteps.generate()` |
| 5. Dynamic questions | `#grouped-dynamic-assessment` | `AssessmentSteps.shouldUseDynamicQuestions()` → true for Bluefin |
| 6. Render Q&A | `#dynamic-questions-container` | `QuestionRenderer.renderQuestions()` — reads `SPECIES_DATA['bluefin-tuna'].regulations.assessmentQuestions` |
| 7. Answer | Choice buttons / inputs | `QuestionRenderer.setAnswer()` → `AppState.setAssessmentData('species.bluefin-tuna.*')` |
| 8. Continue to report | `nextGroupedStep('dynamic-assessment')` | `StateBridge.flushAssessmentInputs()` → `Navigation` → results step |
| 9. Report | `#results-section` | `ReportGenerator.generate()` → `generateReport()` in `assessmentEngine.js` |
| 10. Violations | Verdict block | `checkAllViolations()` → `checkSpeciesViolations()` + `Validators.checkCombinedPossessionLimits()` |

## What still lives in `assessmentEngine.js`

Intentionally retained until incremental migration:

- `createGroupedPermitsSection`, `createGroupedPossessionSection`, `createGroupedSizeGearSection`, `createGroupedVesselRequirementsSection`
- `generateReport`, `checkSpeciesViolations`, `checkAllViolations`
- Scallop / multispecies-specific UI helpers, quick reference, favorites

**Do not duplicate this logic in new modules** — extend via delegation, then move one function at a time.

## Offline / PWA

- `js/config/appBundle.js` — canonical script list (must match `index.html`)
- `service-worker.js` — `importScripts('./js/config/appBundle.js')` and precaches `APP_CACHE_URLS`
- Bump `APP_CACHE_NAME` in `appBundle.js` after deploy when assets change

## Regulation updates

See **[docs/REGULATION_UPDATES.md](docs/REGULATION_UPDATES.md)** — primary maintenance workflow.

Quick rule: edit `species-data.js` + `REGULATION_META.dataLastUpdated` in `js/config/regulationMeta.js`, then sync `regulation-updates.json`.

## Migration status

See **[docs/MIGRATION_STATUS.md](docs/MIGRATION_STATUS.md)** for remaining moves out of `assessmentEngine.js`.
