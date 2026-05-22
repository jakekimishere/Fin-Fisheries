#!/usr/bin/env node
/**
 * Node smoke tests for assessment violations and quota config.
 * Run: node scripts/smoke-scenarios.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');

function loadSandbox() {
    const sandbox = { console };
    const load = (rel) => {
        const filePath = path.join(root, rel);
        vm.runInNewContext(fs.readFileSync(filePath, 'utf8'), sandbox, { filename: filePath });
    };
    load('REGULATION_DATES_CONFIG.js');
    load('FISHERY_QUOTA_STATUS_CONFIG.js');
    const speciesPath = path.join(root, 'species-data.js');
    const wrapped = `(function() {\n${fs.readFileSync(speciesPath, 'utf8')}\nreturn SPECIES_DATA;\n})()`;
    sandbox.SPECIES_DATA = vm.runInNewContext(wrapped, sandbox, { filename: speciesPath });
    load('js/validation/assessmentViolations.js');
    return sandbox;
}

function assert(name, condition, detail) {
    if (!condition) {
        throw new Error(`${name}${detail ? `: ${detail}` : ''}`);
    }
    console.log(`  ✓ ${name}`);
}

function main() {
    const errors = [];
    console.log('Smoke scenarios...\n');

    try {
        const { AssessmentViolations: AV, SPECIES_DATA, getCommercialPossessionLimit, getHerringAreaLimitLb } = loadSandbox();

        // Prohibited: Atlantic angel shark
        const angel = SPECIES_DATA['atlantic-angel-shark'];
        const angelV = AV.evaluateAssessmentQuestionViolations('atlantic-angel-shark', angel, { numberOfFish: 1, permitType: 'recreational' });
        assert('atlantic angel shark retention violation', angelV.length > 0, angelV.join('; '));

        // Atlantic salmon EEZ
        const salmon = SPECIES_DATA['atlantic-salmon'];
        const salmonV = AV.evaluateAssessmentQuestionViolations('atlantic-salmon', salmon, { numberOfFish: 1, permitType: 'recreational' });
        assert('atlantic salmon EEZ prohibition', salmonV.length > 0);

        // Herring area 1B over limit
        const herring = SPECIES_DATA['atlantic-herring'];
        const herringV = AV.evaluateAssessmentQuestionViolations('atlantic-herring', herring, {
            permitType: 'commercial',
            fishingArea: 'area-1b',
            possessionAmount: 2500,
            dateOfCatch: '2026-05-21'
        });
        assert('herring 1B 2500 lb exceeds 2000', herringV.length > 0, herringV.join('; '));

        // King mackerel bag
        const king = SPECIES_DATA['king-mackerel'];
        const kingV = AV.evaluateAssessmentQuestionViolations('king-mackerel', king, { permitType: 'recreational', numberOfFish: 5 });
        assert('king mackerel over bag', kingV.length > 0);

        // BFT June commercial
        const bft = SPECIES_DATA['bluefin-tuna'];
        const bftV = AV.evaluateAssessmentQuestionViolations('bluefin-tuna', bft, {
            permitType: 'commercial-general',
            numberOfFish: 5,
            dateOfCatch: '2026-06-15'
        });
        assert('BFT June general over 3 fish', bftV.length > 0, bftV.join('; '));

        // Skate wing season 1
        const skate = SPECIES_DATA['thorny-skate'];
        const skateV = AV.evaluateAssessmentQuestionViolations('thorny-skate', skate, {
            permitType: 'commercial',
            possessionAmount: 5000,
            dateOfCatch: '2026-06-01'
        });
        assert('thorny skate over 4000 lb wings (season 1)', skateV.length > 0, skateV.join('; '));

        assert('herring 1B config 2000 lb', getHerringAreaLimitLb('area-1b', new Date('2026-05-21')) === 2000);

        const bftLim = getCommercialPossessionLimit('bluefin-tuna', 'commercial-general', { dateOfCatch: '2026-06-15' });
        assert('BFT June limit is 3', bftLim.count === 3, `got ${bftLim.count}`);

        const purse = getCommercialPossessionLimit('bluefin-tuna', 'commercial-purse-seine', {});
        assert('BFT purse seine closed', purse.prohibited && purse.count === 0);

    } catch (e) {
        errors.push(e.message);
        console.error(`  ✗ ${e.message}`);
    }

    console.log('\n--- Results ---');
    if (errors.length) {
        console.error(`Failed (${errors.length})`);
        process.exit(1);
    }
    console.log('OK — smoke scenarios passed.');
    process.exit(0);
}

main();
