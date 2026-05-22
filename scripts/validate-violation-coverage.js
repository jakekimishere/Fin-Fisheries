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

function main() {
    const errors = [];
    const warnings = [];

    const speciesPath = path.join(root, 'species-data.js');
    const speciesCode = fs.readFileSync(speciesPath, 'utf8');
    const speciesWrapped = `(function() {\n${speciesCode}\nreturn SPECIES_DATA;\n})()`;
    const sandbox = { console };
    const SPECIES_DATA = vm.runInNewContext(speciesWrapped, sandbox, { filename: speciesPath });
    vm.runInNewContext(loadFile('js/validation/assessmentViolations.js'), sandbox, { filename: 'assessmentViolations.js' });
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
