// Automated Pre-Testing Checks
// Run this in browser console or Node.js to check code before manual testing

(function() {
    'use strict';
    
    const results = {
        passed: [],
        failed: [],
        warnings: []
    };
    
    function pass(test, details) {
        results.passed.push({ test, details });
        console.log(`✅ PASS: ${test}`, details || '');
    }
    
    function fail(test, details) {
        results.failed.push({ test, details });
        console.error(`❌ FAIL: ${test}`, details || '');
    }
    
    function warn(test, details) {
        results.warnings.push({ test, details });
        console.warn(`⚠️  WARN: ${test}`, details || '');
    }
    
    // Test 1: Check required HTML elements exist
    function testHTMLElements() {
        console.log('\n=== Testing HTML Elements ===');
        const requiredElements = [
            'homepage-last-update-date',
            'step-homepage',
            'step-0',
            'species-grid',
            'species-search',
            'favorites-section',
            'favorites-grid',
            'selected-species-display-top',
            'continue-species',
            'assessment-sections',
            'results-section',
            'report-content',
            'progress-bar',
            'progress-text',
            'last-update-date'
        ];
        
        requiredElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                pass(`HTML element exists: ${id}`);
            } else {
                fail(`HTML element missing: ${id}`);
            }
        });
    }
    
    // Test 2: Check required JavaScript functions exist
    function testJavaScriptFunctions() {
        console.log('\n=== Testing JavaScript Functions ===');
        const requiredFunctions = [
            'selectRegionalFishery',
            'toggleSpecies',
            'filterSpeciesGrid',
            'updateAssessmentDate',
            'nextStep',
            'printReport',
            'startOver',
            'toggleFavorite',
            'getFavorites',
            'populateSpeciesGrid',
            'generateReport',
            'checkSpeciesViolations',
            'checkAllViolations',
            'validatePermitsStep',
            'goHome',
            'showPreReportSummary',
            'updateFooterDate'
        ];
        
        requiredFunctions.forEach(funcName => {
            if (typeof window[funcName] === 'function') {
                pass(`Function exists: ${funcName}`);
            } else {
                fail(`Function missing: ${funcName}`);
            }
        });
    }
    
    // Test 3: Check required global objects
    function testGlobalObjects() {
        console.log('\n=== Testing Global Objects ===');
        const requiredObjects = [
            { name: 'SPECIES_DATA', check: () => typeof SPECIES_DATA !== 'undefined' || typeof window.SPECIES_DATA !== 'undefined' },
            { name: 'REGULATION_DATES', check: () => typeof REGULATION_DATES !== 'undefined' || typeof window.REGULATION_DATES !== 'undefined' },
            { name: 'SPECIES_GROUPS', check: () => typeof SPECIES_GROUPS !== 'undefined' || typeof window.SPECIES_GROUPS !== 'undefined' },
            { name: 'DATA_LAST_UPDATED', check: () => typeof DATA_LAST_UPDATED !== 'undefined' || typeof window.DATA_LAST_UPDATED !== 'undefined' },
            { name: 'ReportBuilder', check: () => typeof ReportBuilder !== 'undefined' },
            { name: 'AssessmentViolations', check: () => typeof AssessmentViolations !== 'undefined' },
            { name: 'FISHERY_QUOTA_STATUS', check: () => typeof FISHERY_QUOTA_STATUS !== 'undefined' },
            { name: 'getCommercialPossessionLimit', check: () => typeof getCommercialPossessionLimit === 'function' }
        ];
        
        requiredObjects.forEach(obj => {
            try {
                if (obj.check()) {
                    pass(`Global object exists: ${obj.name}`);
                } else {
                    fail(`Global object missing: ${obj.name} (script may not be loaded yet - wait for page to fully load)`);
                }
            } catch (e) {
                // If accessing the variable throws an error, it doesn't exist
                fail(`Global object missing: ${obj.name} (${e.message})`);
            }
        });
    }
    
    // Test 4: Check SPECIES_DATA structure
    function testSpeciesDataStructure() {
        console.log('\n=== Testing SPECIES_DATA Structure ===');
        let speciesData;
        try {
            speciesData = typeof SPECIES_DATA !== 'undefined' ? SPECIES_DATA : window.SPECIES_DATA;
        } catch (e) {
            fail('SPECIES_DATA is undefined or not accessible');
            return;
        }
        
        if (!speciesData) {
            fail('SPECIES_DATA is undefined');
            return;
        }
        
        const speciesIds = Object.keys(speciesData);
        if (speciesIds.length === 0) {
            fail('SPECIES_DATA is empty');
            return;
        }
        
        pass(`SPECIES_DATA contains ${speciesIds.length} species`);
        
        // Check structure of first few species
        let checked = 0;
        for (const speciesId of speciesIds.slice(0, 5)) {
            const species = speciesData[speciesId];
            if (!species.name) {
                fail(`Species ${speciesId} missing 'name' property`);
            } else {
                checked++;
            }
            
            if (!species.regulations) {
                warn(`Species ${speciesId} missing 'regulations' property`);
            }
        }
        
        if (checked === 5) {
            pass('Species data structure is valid');
        }
    }
    
    // Test 5: Check module files exist (if running in Node.js)
    function testModuleFiles() {
        console.log('\n=== Testing Module Files ===');
        const requiredModules = [
            'js/state/stateManager.js',
            'js/ui/speciesGrid.js',
            'js/ui/assessmentSteps.js',
            'js/ui/reportGenerator.js',
            'js/validation/validators.js',
            'js/utils/helpers.js',
            'js/utils/navigation.js',
            'js/utils/dateManager.js'
        ];
        
        // This test only works in Node.js environment
        if (typeof require !== 'undefined') {
            const fs = require('fs');
            requiredModules.forEach(modulePath => {
                if (fs.existsSync(modulePath)) {
                    pass(`Module file exists: ${modulePath}`);
                } else {
                    fail(`Module file missing: ${modulePath}`);
                }
            });
        } else {
            warn('Module file check skipped (browser environment)');
        }
    }
    
    // Test 6: Check for console errors (syntax)
    function testSyntaxErrors() {
        console.log('\n=== Testing for Syntax Errors ===');
        try {
            // Try to access critical functions
            if (typeof window.appState !== 'undefined') {
                pass('appState is accessible');
            } else {
                warn('appState not yet initialized (may be OK if page just loaded)');
            }
            
            // Check if critical functions can be called without errors
            if (typeof toggleFavorite === 'function') {
                try {
                    const favorites = getFavorites();
                    pass('getFavorites() executes without errors');
                } catch (e) {
                    fail('getFavorites() throws error', e.message);
                }
            }
        } catch (e) {
            fail('Syntax error detected', e.message);
        }
    }
    
    // Test 7: Check data consistency
    function testDataConsistency() {
        console.log('\n=== Testing Data Consistency ===');
        let speciesData;
        try {
            speciesData = typeof SPECIES_DATA !== 'undefined' ? SPECIES_DATA : window.SPECIES_DATA;
        } catch (e) {
            fail('Cannot test data consistency - SPECIES_DATA undefined');
            return;
        }
        
        if (!speciesData) {
            fail('Cannot test data consistency - SPECIES_DATA undefined');
            return;
        }
        
        const speciesIds = Object.keys(speciesData);
        let hasRegulations = 0;
        let hasPermits = 0;
        let hasPossession = 0;
        
        speciesIds.forEach(speciesId => {
            const species = SPECIES_DATA[speciesId];
            if (species.regulations) {
                hasRegulations++;
                if (species.regulations.permits) hasPermits++;
                if (species.regulations.possession) hasPossession++;
            }
        });
        
        pass(`${hasRegulations}/${speciesIds.length} species have regulations`);
        pass(`${hasPermits}/${speciesIds.length} species have permit data`);
        pass(`${hasPossession}/${speciesIds.length} species have possession data`);
        
        if (hasRegulations < speciesIds.length * 0.8) {
            warn('Less than 80% of species have regulations defined');
        }
    }
    
    // Test 8: Check for missing image files
    function testImageFiles() {
        console.log('\n=== Testing Image Files ===');
        let speciesData;
        try {
            speciesData = typeof SPECIES_DATA !== 'undefined' ? SPECIES_DATA : window.SPECIES_DATA;
        } catch (e) {
            warn('Cannot test image files - SPECIES_DATA undefined');
            return;
        }
        
        if (!speciesData) {
            warn('Cannot test image files - SPECIES_DATA undefined');
            return;
        }
        
        const speciesIds = Object.keys(speciesData);
        let hasImagePath = 0;
        let missingImagePath = 0;
        
        speciesIds.forEach(speciesId => {
            const species = SPECIES_DATA[speciesId];
            if (species.imagePath) {
                hasImagePath++;
            } else {
                missingImagePath++;
            }
        });
        
        pass(`${hasImagePath} species have imagePath defined`);
        if (missingImagePath > 0) {
            warn(`${missingImagePath} species missing imagePath (will use generated images)`);
        }
    }
    
    // Test 9: Check localStorage functions
    function testLocalStorage() {
        console.log('\n=== Testing localStorage Functions ===');
        try {
            if (typeof localStorage !== 'undefined') {
                pass('localStorage is available');
                
                // Test favorites functions
                if (typeof getFavorites === 'function') {
                    try {
                        const favorites = getFavorites();
                        pass('getFavorites() works');
                    } catch (e) {
                        fail('getFavorites() error', e.message);
                    }
                }
            } else {
                fail('localStorage not available (may affect favorites feature)');
            }
        } catch (e) {
            fail('localStorage test error', e.message);
        }
    }
    
    // Test 10: Check CSS classes used in JavaScript
    function testCSSClasses() {
        console.log('\n=== Testing CSS Classes ===');
        const requiredClasses = [
            'step-section',
            'species-grid',
            'species-card',
            'btn-primary',
            'btn-secondary',
            'selected-species-display-top'
        ];
        
        // Check if at least one element with each class exists
        requiredClasses.forEach(className => {
            const elements = document.getElementsByClassName(className);
            if (elements.length > 0) {
                pass(`CSS class used: ${className}`);
            } else {
                warn(`CSS class not found in DOM: ${className} (may be added dynamically)`);
            }
        });
    }
    
    // Test 11: Check for duplicate species IDs
    function testDuplicateSpecies() {
        console.log('\n=== Testing for Duplicate Species ===');
        let speciesData;
        try {
            speciesData = typeof SPECIES_DATA !== 'undefined' ? SPECIES_DATA : window.SPECIES_DATA;
        } catch (e) {
            warn('Cannot test duplicates - SPECIES_DATA undefined');
            return;
        }
        
        if (!speciesData) {
            warn('Cannot test duplicates - SPECIES_DATA undefined');
            return;
        }
        
        const speciesIds = Object.keys(speciesData);
        const seen = new Set();
        const duplicates = [];
        
        speciesIds.forEach(id => {
            if (seen.has(id)) {
                duplicates.push(id);
            } else {
                seen.add(id);
            }
        });
        
        if (duplicates.length === 0) {
            pass('No duplicate species IDs found');
        } else {
            fail(`Duplicate species IDs found: ${duplicates.join(', ')}`);
        }
    }
    
    // Test 12: Check update date format
    function testUpdateDate() {
        console.log('\n=== Testing Update Date ===');
        let lastUpdated;
        try {
            lastUpdated = typeof DATA_LAST_UPDATED !== 'undefined' ? DATA_LAST_UPDATED : window.DATA_LAST_UPDATED;
        } catch (e) {
            fail('DATA_LAST_UPDATED is undefined or not accessible');
            return;
        }
        
        if (typeof lastUpdated !== 'undefined') {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (dateRegex.test(lastUpdated)) {
                pass(`Update date format is valid: ${lastUpdated}`);
            } else {
                fail(`Update date format is invalid: ${lastUpdated} (should be YYYY-MM-DD)`);
            }
        } else {
            fail('DATA_LAST_UPDATED is undefined');
        }
    }
    
    // Run all tests
    function runAllTests() {
        console.log('🧪 Starting Automated Pre-Testing Checks...\n');
        
        testHTMLElements();
        testJavaScriptFunctions();
        testGlobalObjects();
        testSpeciesDataStructure();
        testModuleFiles();
        testSyntaxErrors();
        testDataConsistency();
        testImageFiles();
        testLocalStorage();
        testCSSClasses();
        testDuplicateSpecies();
        testUpdateDate();
        
        // Print summary
        console.log('\n' + '='.repeat(50));
        console.log('📊 TEST SUMMARY');
        console.log('='.repeat(50));
        console.log(`✅ Passed: ${results.passed.length}`);
        console.log(`❌ Failed: ${results.failed.length}`);
        console.log(`⚠️  Warnings: ${results.warnings.length}`);
        console.log('='.repeat(50));
        
        if (results.failed.length === 0) {
            console.log('\n🎉 All critical tests passed! Ready for manual testing.');
        } else {
            console.log('\n⚠️  Some tests failed. Review failures before manual testing.');
        }
        
        return results;
    }
    
    // Export for use
    if (typeof window !== 'undefined') {
        window.runAutomatedTests = runAllTests;
        console.log('💡 Run automated tests with: runAutomatedTests()');
    }
    
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { runAllTests, results };
    }
    
    // Auto-run if in browser and DOM is ready
    if (typeof window !== 'undefined') {
        if (document.readyState === 'complete') {
            // Wait longer for all scripts to load
            setTimeout(runAllTests, 2000);
        } else {
            // Wait for DOM to be ready, then wait for scripts
            window.addEventListener('load', () => {
                setTimeout(runAllTests, 2000);
            });
        }
    }
})();
