# Testing Checklist

## Pre-Testing Setup
- [ ] Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- [ ] Open browser console (F12) to monitor for errors
- [ ] Ensure all files are saved
- [ ] **Run automated tests**: In console, type `runAutomatedTests()` and review results
  - ✅ Fix any ❌ failures before proceeding
  - ⚠️ Review warnings (non-critical)
  - See `AUTOMATED_TESTING.md` for details

## Core Functionality Tests

### 1. Homepage
- [ ] Homepage displays correctly
- [ ] Last update date shows
- [ ] "Northeast Regional Fisheries" card is clickable
- [ ] Clicking card navigates to species selection

### 2. Species Selection
- [ ] Species grid displays all species
- [ ] Species are in alphabetical order
- [ ] Search bar filters species correctly
- [ ] Clicking a species selects it (highlighted)
- [ ] Clicking again deselects it
- [ ] Selected species appear at top
- [ ] "Proceed to Assessment" button enables when species selected
- [ ] Favorites section appears when species are favorited
- [ ] Star icon toggles favorite status
- [ ] Favorited species appear above main list

### 3. Assessment Steps

#### Vessel Classification (if multispecies selected)
- [ ] Vessel classification step appears
- [ ] Can select "Sector Vessel" or "Common Pool Vessel"
- [ ] Selection highlights button
- [ ] Clicking same button deselects it
- [ ] "Continue to Permits" button enables after selection
- [ ] Back button works

#### Permits Step
- [ ] All selected species appear
- [ ] Can select permit status (Valid/No/Expired) for each
- [ ] Permit type options appear when "Valid Permit" selected
- [ ] Can select permit type
- [ ] Multispecies permit applies to all multispecies
- [ ] "Continue to Possession" button works
- [ ] Validation prevents proceeding without selections
- [ ] Back button works

#### Possession Step
- [ ] All selected species appear
- [ ] Can enter possession amounts
- [ ] Units display correctly (lbs, bushels, fish)
- [ ] Limit information displays
- [ ] Combined limit warnings appear if applicable
- [ ] "Continue to Size & Gear" button works
- [ ] Back button works

#### Size & Gear Step
- [ ] All selected species appear
- [ ] Size compliance options work
- [ ] Gear type selection works
- [ ] Gear-specific details appear
- [ ] "Continue to Vessel Requirements" button works
- [ ] Back button works

#### Vessel Requirements Step
- [ ] Requirements display for applicable species
- [ ] HMS Reporting question appears for HMS species
- [ ] Can select HMS reporting status
- [ ] "Generate Report" button works
- [ ] Back button works

### 4. Report Generation
- [ ] Report generates successfully
- [ ] Report shows on separate page (not with vessel requirements)
- [ ] All selected species appear in report
- [ ] Permit status displays correctly
- [ ] Possession amounts display correctly
- [ ] Violations are identified correctly
- [ ] Combined limit violations appear if applicable
- [ ] Final verdict (Compliant/Non-Compliant) is correct
- [ ] Print button works
- [ ] "Start New Assessment" button works

### 5. Navigation
- [ ] Back buttons work on all steps
- [ ] Progress bar updates correctly
- [ ] Step numbers display correctly
- [ ] Can navigate forward and backward through all steps

### 6. Error Handling
- [ ] Invalid selections show user-friendly errors
- [ ] Missing data shows helpful messages
- [ ] No raw JavaScript errors appear to user
- [ ] Console shows only actual errors (not debug logs)

### 7. State Management
- [ ] Selections persist when navigating back
- [ ] Data saves correctly
- [ ] No data loss between steps

## Species-Specific Tests

### Bluefin Tuna
- [ ] Permit selection works
- [ ] Commercial permit type works
- [ ] Possession limits display correctly
- [ ] Closure dates are checked correctly
- [ ] HMS reporting question appears
- [ ] Report generates correctly

### Atlantic Sea Scallop
- [ ] Permit selection works
- [ ] Permit type selection works
- [ ] Possession type (shucked/inshell) works
- [ ] Amount input appears after type selection
- [ ] VMS requirements appear
- [ ] Report generates correctly

### Multispecies (e.g., Atlantic Cod)
- [ ] Vessel classification appears
- [ ] Multispecies permit applies to all multispecies
- [ ] Possession limits based on classification
- [ ] Report generates correctly

### Summer Flounder
- [ ] Permit selection works
- [ ] Gear type affects possession limits
- [ ] Size compliance works
- [ ] Report generates correctly

## Edge Cases

### Multiple Species
- [ ] Can select multiple different species
- [ ] Assessment works for all
- [ ] Combined limits checked correctly
- [ ] Report includes all species

### No Species Selected
- [ ] Cannot proceed to assessment
- [ ] Appropriate message shown

### Invalid Data
- [ ] Negative numbers rejected
- [ ] Text in number fields rejected
- [ ] Missing selections caught

### Browser Compatibility
- [ ] Works in Chrome/Edge
- [ ] Works in Firefox
- [ ] Works on mobile (if applicable)

## Performance
- [ ] Page loads quickly
- [ ] No lag when selecting species
- [ ] Smooth navigation between steps
- [ ] Report generates quickly

## Offline Functionality (PWA)
- [ ] Works offline after first load
- [ ] Service worker registers
- [ ] Images cache correctly

## Console Checks
- [ ] No critical errors (red)
- [ ] No warnings about missing elements
- [ ] No undefined variable errors
- [ ] No CORS errors (when served properly)

## Final Verification
- [ ] Complete end-to-end workflow works
- [ ] Can complete full assessment
- [ ] Report is accurate
- [ ] Can start new assessment
- [ ] All features functional
