# Refactoring Guide - Modular Architecture

## What We've Done

### ✅ Completed
1. **State Manager** (`js/state/stateManager.js`)
   - Centralized state management
   - Event-driven updates
   - Clean API for state changes

2. **Species Grid Module** (`js/ui/speciesGrid.js`)
   - Extracted species selection UI
   - Search functionality
   - Card creation and management

3. **Helpers Module** (`js/utils/helpers.js`)
   - Common utility functions
   - Reusable across modules

4. **New App Entry Point** (`app-new.js`)
   - Orchestrates modules
   - Bridges old and new code
   - Compatibility layer

### 🔄 In Progress
- Migration of remaining UI components
- Assessment steps module
- Report generation module
- Validation modules

## Current Structure

```
/js
  /state
    - stateManager.js      ✅ Centralized state
  /ui
    - speciesGrid.js       ✅ Species selection UI
    - assessmentSteps.js   ⏳ TODO
    - reportGenerator.js   ⏳ TODO
  /validation
    - permitValidator.js   ⏳ TODO
    - possessionValidator.js ⏳ TODO
  /utils
    - helpers.js           ✅ Common utilities
    - navigation.js        ⏳ TODO
```

## How It Works

### State Management
```javascript
// Access state
const state = window.appState;

// Subscribe to changes
state.subscribe((changeType, data, state) => {
    console.log('State changed:', changeType);
});

// Update state
state.addSpecies('bluefin-tuna');
state.setStep(1);
state.setAssessmentData('species.bluefin-tuna.permit-type', 'commercial');
```

### Using Modules
```javascript
// Species Grid
const grid = new SpeciesGrid(appState);
grid.populate();
grid.filter('tuna');
```

## Migration Strategy

### Phase 1: Foundation ✅
- [x] State manager
- [x] Species grid
- [x] Helpers
- [x] Compatibility layer

### Phase 2: UI Components (Next)
- [ ] Assessment steps module
- [ ] Report generator module
- [ ] Navigation module

### Phase 3: Validation (After UI)
- [ ] Permit validation
- [ ] Possession validation
- [ ] Size/gear validation

### Phase 4: Cleanup
- [ ] Remove old code from app.js
- [ ] Rename app-new.js to app.js
- [ ] Final testing

## Benefits

1. **Maintainability**: Each module has a single responsibility
2. **Testability**: Modules can be tested independently
3. **Scalability**: Easy to add new features
4. **Update-Friendly**: Regulation updates only touch species-data.js

## For Regulation Updates

Once refactored, updating regulations is simple:
1. Edit `species-data.js` only
2. No need to touch other files
3. Changes automatically reflected in UI

## Next Steps

1. Test current implementation (species selection should work)
2. Continue extracting assessment steps
3. Extract validation logic
4. Complete migration
5. Remove old code

## Notes

- Old code still works during migration (compatibility layer)
- New modules load after old code
- Gradual migration = no breaking changes
- Can roll back at any time
