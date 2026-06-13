#!/usr/bin/env node
/**
 * Ensures prohibited / dynamic-assessment species trigger violations consistently.
 * Run: node scripts/validate-violation-coverage.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');

function loadFile(relativePath) {
    return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

const { loadSpeciesData } = require('./load-species-data');

function main() {
    const errors = [];
    const warnings = [];

    const sandbox = { console, window: null };
    sandbox.window = sandbox;
    vm.runInNewContext(loadFile('REGULATION_DATES_CONFIG.js'), sandbox, { filename: 'REGULATION_DATES_CONFIG.js' });
    vm.runInNewContext(loadFile('FISHERY_QUOTA_STATUS_CONFIG.js'), sandbox, { filename: 'FISHERY_QUOTA_STATUS_CONFIG.js' });
    vm.runInNewContext(loadFile('GROUND_FISH_TRIP_LIMITS_CONFIG.js'), sandbox, { filename: 'GROUND_FISH_TRIP_LIMITS_CONFIG.js' });
    const SPECIES_DATA = loadSpeciesData(sandbox);
    vm.runInNewContext(loadFile('js/validation/assessmentViolations.js'), sandbox, { filename: 'assessmentViolations.js' });
    vm.runInNewContext(loadFile('js/validation/speciesViolationChecks.js'), sandbox, { filename: 'speciesViolationChecks.js' });
    const AV = sandbox.AssessmentViolations;

    if (!SPECIES_DATA || !AV) {
        console.error('Failed to load SPECIES_DATA or AssessmentViolations');
        process.exit(1);
    }

    const ids = Object.keys(SPECIES_DATA).filter(k => SPECIES_DATA[k]?.name);
    let prohibitedCount = 0;
    let dynamicCount = 0;
    let testedProhibited = 0;
    let failedProhibited = [];

    for (const id of ids) {
        const entry = SPECIES_DATA[id];
        const questions = entry.regulations?.assessmentQuestions;
        if (questions) dynamicCount++;

        const prohibited = AV.isProhibitedSpecies(id, entry);
        if (!prohibited) continue;
        prohibitedCount++;

        const testData = {
            numberOfFish: 1,
            numberOfSharks: 1,
            hasShark: true,
            isProhibited: true,
            released: false,
            permitType: 'recreational'
        };
        const violations = AV.evaluateAssessmentQuestionViolations(id, entry, testData);
        const sim = AV.simulateProhibitedRetentionViolation(id, entry);
        const combined = [...new Set([...violations, ...(sim || [])])];

        if (combined.length === 0) {
            failedProhibited.push(id);
            errors.push(`${id}: prohibited species but no violations when fish on board`);
        } else {
            testedProhibited++;
        }
    }

    const sampleOverLimit = [
        ['swordfish', { permitType: 'recreational', numberOfFish: 5 }],
        ['summer-flounder', { 'permit-type': 'recreational', possessionAmount: 50 }],
        ['atlantic-salmon', { permitType: 'recreational', numberOfFish: 1 }],
        ['king-mackerel', { permitType: 'recreational', numberOfFish: 5 }],
        ['atlantic-herring', { permitType: 'commercial', fishingArea: 'area-1b', possessionAmount: 3000, dateOfCatch: '2026-05-21' }],
        ['thorny-skate', { permitType: 'commercial', possessionAmount: 7000, dateOfCatch: '2026-05-21' }],
    ];
    for (const [id, data] of sampleOverLimit) {
        const entry = SPECIES_DATA[id];
        if (!entry) continue;
        const v = AV.evaluateAssessmentQuestionViolations(id, entry, data);
        if (v.length === 0 && entry.regulations?.assessmentQuestions) {
            warnings.push(`${id}: sample over-limit data did not trigger assessment question violations (may use grouped flow)`);
        }
    }

    const violationKeys = new Set();
    for (const id of ids) {
        const questions = SPECIES_DATA[id].regulations?.assessmentQuestions;
        if (!questions) continue;
        for (const q of Object.values(questions)) {
            if (!q?.violation) continue;
            Object.keys(q.violation).forEach(k => violationKeys.add(k));
        }
    }
    const supported = new Set([
        'ifGreaterThan', 'ifTrue', 'ifFalse', 'ifEquals', 'ifValue', 'ifNonCompliant',
        'ifBelow', 'ifExceeds', 'ifProhibited', 'ifUnauthorized', 'ifMissing'
    ]);
    for (const key of violationKeys) {
        if (!supported.has(key) && key !== 'message') {
            warnings.push(`Violation key "${key}" used in species-data — verify handler in assessmentViolations.js`);
        }
    }

    console.log(`Species: ${ids.length} | dynamic assessment: ${dynamicCount} | prohibited (auto-detected): ${prohibitedCount}`);
    console.log(`Prohibited retention tests passed: ${testedProhibited}/${prohibitedCount}`);

    if (failedProhibited.length) {
        console.log('Failed:', failedProhibited.slice(0, 15).join(', '), failedProhibited.length > 15 ? '...' : '');
    }

    console.log('\n--- Results ---');
    if (warnings.length) {
        console.log(`Warnings (${warnings.length}):`);
        warnings.slice(0, 20).forEach(w => console.log(`  ⚠ ${w}`));
        if (warnings.length > 20) console.log(`  ... and ${warnings.length - 20} more`);
    }
    if (errors.length) {
        console.log(`Errors (${errors.length}):`);
        errors.forEach(e => console.log(`  ✗ ${e}`));
        process.exit(1);
    }
    console.log('OK — violation coverage checks passed.');
    process.exit(0);
}

main();
