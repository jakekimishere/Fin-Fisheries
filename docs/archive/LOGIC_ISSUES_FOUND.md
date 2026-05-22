# Logic Issues Found and Fixed

## Critical Issues

### 1. **Combined Limit Check Data Source Mismatch** ⚠️
**Problem**: 
- Real-time display reads from input fields directly
- Validation reads from `assessmentData.species[speciesId].possessionAmount`
- If user hasn't clicked "next" to save, validation uses old/empty data while display shows current input

**Impact**: False negatives - violations might not be caught if data isn't saved

**Fix**: Make validation read from input fields OR ensure data is saved before validation

### 2. **Combined Limit Check Only Runs on Last Species** ⚠️
**Problem**: 
- Check only runs when `speciesId === selectedSpecies[selectedSpecies.length - 1]`
- If species order changes or species removed, check might not run

**Impact**: Combined limit violations might be missed

**Fix**: Run combined limit check separately, not in the per-species loop

### 3. **State Management Inconsistency** ⚠️
**Problem**: 
- Two state systems: old global `assessmentData` and new `AppState`
- Validators use `this.state.getAssessmentData()` but data stored in global `assessmentData`
- Validators might not find the data

**Impact**: Validation might fail or miss data

**Fix**: Ensure validators read from the correct source (global `assessmentData`)

### 4. **Possession Amount Not Saved Before Validation** ⚠️
**Problem**: 
- Possession amounts only saved when navigating to next step
- Combined limit check runs during report generation
- If user goes directly to report, data might not be saved

**Impact**: Validation uses empty/old data

**Fix**: Save possession data before running validation

### 5. **Missing Null Checks in Validators** ⚠️
**Problem**: 
- Validators access `assessmentData.species[speciesId]` without checking if it exists
- Could cause errors if species data not initialized

**Impact**: Potential runtime errors

**Fix**: Add null checks

### 6. **Real-time Display vs Validation Mismatch** ⚠️
**Problem**: 
- Real-time display reads from input fields
- Validation reads from `assessmentData`
- They can show different values

**Impact**: User sees one thing, validation checks another

**Fix**: Use consistent data source

## Medium Priority Issues

### 7. **Duplicate State Storage**
**Problem**: 
- `assessmentData.vesselClassification` and `assessmentData.vessel.multispecies.classification` both store same data
- Could get out of sync

**Impact**: Confusion, potential bugs

### 8. **No Validation Before Report Generation**
**Problem**: 
- Report generation doesn't validate data first
- Could generate report with incomplete/invalid data

**Impact**: Incorrect reports

## Low Priority Issues

### 9. **Error Handling**
**Problem**: 
- Some functions don't handle errors gracefully
- Could crash the app

**Impact**: Poor user experience

### 10. **Race Conditions**
**Problem**: 
- Multiple systems updating state simultaneously
- Could cause inconsistent state

**Impact**: Unpredictable behavior
