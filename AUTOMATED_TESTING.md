# Automated Pre-Testing Guide

This document explains what can be automatically checked before manual testing.

## Quick Start

**In Browser Console:**
1. Open your app in a browser
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Type: `runAutomatedTests()`
5. Press Enter

**Or load the test file:**
Add this to your `index.html` before closing `</body>`:
```html
<script src="automated-tests.js"></script>
```

## What Gets Checked Automatically

### ✅ Code Structure Checks
- [x] **HTML Elements**: Verifies all required DOM elements exist
- [x] **JavaScript Functions**: Checks that all required functions are defined
- [x] **Global Objects**: Verifies SPECIES_DATA, REGULATION_DATES_CONFIG, etc. exist
- [x] **Module Files**: Checks that all module files exist (Node.js only)

### ✅ Data Integrity Checks
- [x] **Species Data Structure**: Validates SPECIES_DATA has correct structure
- [x] **Data Consistency**: Checks that species have regulations, permits, possession data
- [x] **Duplicate Species**: Ensures no duplicate species IDs
- [x] **Image Files**: Checks which species have imagePath defined

### ✅ Functionality Checks
- [x] **Syntax Errors**: Tests for JavaScript syntax errors
- [x] **localStorage**: Verifies localStorage functions work
- [x] **CSS Classes**: Checks that required CSS classes are used
- [x] **Update Date Format**: Validates DATA_LAST_UPDATED format

## What Still Needs Manual Testing

These items from the testing checklist **cannot** be automated and require manual testing:

### 🖱️ User Interaction
- Clicking buttons and verifying behavior
- Form input validation
- Navigation between steps
- Visual feedback (highlighting, animations)

### 👁️ Visual/UI
- Layout and styling
- Responsive design
- Image display
- Color scheme
- Progress bar animation

### 🔄 Workflow
- Complete end-to-end assessment flow
- Data persistence between steps
- Report generation accuracy
- Print functionality

### 🌐 Browser-Specific
- Cross-browser compatibility
- Mobile device testing
- PWA installation
- Offline functionality

### 📊 Business Logic
- Regulation calculations
- Violation detection accuracy
- Combined limit logic
- Date-based rule application

## Test Results

The automated tests will output:
- ✅ **Passed**: Critical checks that passed
- ❌ **Failed**: Issues that need fixing before manual testing
- ⚠️ **Warnings**: Non-critical issues to be aware of

## Example Output

```
🧪 Starting Automated Pre-Testing Checks...

=== Testing HTML Elements ===
✅ PASS: HTML element exists: homepage-last-update-date
✅ PASS: HTML element exists: species-grid
...

📊 TEST SUMMARY
==================================================
✅ Passed: 45
❌ Failed: 2
⚠️  Warnings: 3
==================================================

🎉 All critical tests passed! Ready for manual testing.
```

## Running Before Manual Testing

**Recommended workflow:**
1. Run `runAutomatedTests()` in console
2. Fix any ❌ failures
3. Review ⚠️ warnings
4. Proceed with manual testing checklist

## Integration with Testing Checklist

The automated tests cover these items from `TESTING_CHECKLIST.md`:

**Automated:**
- ✅ Pre-Testing Setup: File structure
- ✅ Console Checks: Syntax errors, undefined variables
- ✅ State Management: Data structure validation

**Still Manual:**
- All Core Functionality Tests (user interaction)
- All Species-Specific Tests (workflow)
- All Edge Cases (user scenarios)
- Performance (requires actual usage)
- Browser Compatibility (requires multiple browsers)

## Troubleshooting

**If tests don't run:**
- Make sure page is fully loaded
- Check browser console for errors
- Verify `automated-tests.js` is loaded

**If tests show failures:**
- Review the error messages
- Check the specific file/function mentioned
- Fix the issue and re-run tests

**If tests show warnings:**
- Warnings are non-critical
- Review but don't block manual testing
- Address in next iteration if needed
