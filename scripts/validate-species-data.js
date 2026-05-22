#!/usr/bin/env node
/**
 * Lightweight validator for species-data.js and SPECIES_GROUPS_CONFIG.js
 * Run: node scripts/validate-species-data.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');

function loadScript(relativePath, exportNames) {
    const filePath = path.join(root, relativePath);
    const code = fs.readFileSync(filePath, 'utf8');
    const sandbox = { console, module: { exports: {} }, exports: {} };
    vm.runInNewContext(code, sandbox, { filename: filePath });
    const result = {};
    for (const name of exportNames) {
        if (sandbox[name] !== undefined) result[name] = sandbox[name];
    }
    return result;
}

function collectSpeciesIds(speciesData) {
    return Object.keys(speciesData).filter(k => speciesData[k] && typeof speciesData[k] === 'object' && speciesData[k].name);
}

function main() {
    const errors = [];
    const warnings = [];

    const speciesPath = path.join(root, 'species-data.js');
    const speciesCode = fs.readFileSync(speciesPath, 'utf8');
    const speciesWrapped = `(function() {\n${speciesCode}\nreturn SPECIES_DATA;\n})()`;
    let SPECIES_DATA;
    try {
        SPECIES_DATA = vm.runInNewContext(speciesWrapped, { console }, { filename: speciesPath });
    } catch (err) {
        console.error('Failed to execute species-data.js:', err.message);
        process.exit(1);
    }
    if (!SPECIES_DATA || typeof SPECIES_DATA !== 'object') {
        console.error('Failed to load SPECIES_DATA from species-data.js');
        process.exit(1);
    }

    const groupsPath = path.join(root, 'SPECIES_GROUPS_CONFIG.js');
    const groupsCode = fs.readFileSync(groupsPath, 'utf8');
    const groupsWrapped = `(function() {\n${groupsCode}\nreturn SPECIES_GROUPS;\n})()`;
    const SPECIES_GROUPS = vm.runInNewContext(groupsWrapped, { console }, { filename: groupsPath });

    const ids = collectSpeciesIds(SPECIES_DATA);
    console.log(`Validating ${ids.length} species...`);

    for (const id of ids) {
        const entry = SPECIES_DATA[id];
        if (!entry.name) errors.push(`${id}: missing name`);
        if (!entry.regulations) {
            warnings.push(`${id}: missing regulations block`);
            continue;
        }
        const regs = entry.regulations;
        if (!regs.possession || Object.keys(regs.possession).length === 0) {
            warnings.push(`${id}: no possession entries`);
        }
        if (regs.dataSources) {
            for (const src of regs.dataSources) {
                if (src.url && !/^https:\/\//.test(src.url)) {
                    errors.push(`${id}: dataSources URL must use https — ${src.url}`);
                }
            }
        }
        const genericNotes = JSON.stringify(regs).match(/Check current/g);
        if (genericNotes && genericNotes.length >= 3) {
            warnings.push(`${id}: ${genericNotes.length} "Check current" placeholders — may need Tier update`);
        }
        if (regs.assessmentQuestions?.possessionLimitCheck?.limits) {
            const permitOpts = regs.assessmentQuestions.permitType?.options?.map(o => o.value) || [];
            for (const permitKey of Object.keys(regs.assessmentQuestions.possessionLimitCheck.limits)) {
                if (permitOpts.length && !permitOpts.includes(permitKey) && permitKey !== 'commercial' && permitKey !== 'recreational') {
                    warnings.push(`${id}: possessionLimitCheck limit key "${permitKey}" not in permitType options`);
                }
            }
        }
    }

    for (const [groupId, group] of Object.entries(SPECIES_GROUPS)) {
        for (const speciesId of group.species || []) {
            if (!SPECIES_DATA[speciesId]) {
                errors.push(`SPECIES_GROUPS.${groupId}: unknown species "${speciesId}"`);
            }
        }
    }

    const baysExpected = {
        'yellowfin-tuna': { recreationalLimit: 3 },
        'bigeye-tuna': { recreationalLimit: null },
        'skipjack-tuna': { recreationalLimit: null },
        'albacore-tuna': { recreationalLimit: null }
    };
    for (const [sid, expect] of Object.entries(baysExpected)) {
        const rec = SPECIES_DATA[sid]?.regulations?.possession?.recreational;
        const count = rec?.limit?.count ?? (rec?.limit === null ? null : rec?.limit);
        if (expect.recreationalLimit === null && rec?.limit && rec.limit.count) {
            errors.push(`${sid}: recreational should have no bag limit (BAYS)`);
        }
        if (expect.recreationalLimit === 3 && rec?.limit?.count !== 3) {
            errors.push(`${sid}: recreational limit should be 3/day, got ${rec?.limit?.count}`);
        }
    }

    const bluefishPrivate = SPECIES_DATA['bluefish']?.regulations?.possession?.recreational?.limit?.count;
    const bluefishHire = SPECIES_DATA['bluefish']?.regulations?.possession?.['recreational-for-hire']?.limit?.count;
    if (bluefishPrivate !== 5) errors.push(`bluefish: private limit should be 5, got ${bluefishPrivate}`);
    if (bluefishHire !== 7) errors.push(`bluefish: for-hire limit should be 7, got ${bluefishHire}`);

    console.log('\n--- Results ---');
    if (warnings.length) {
        console.log(`Warnings (${warnings.length}):`);
        warnings.forEach(w => console.log(`  ⚠ ${w}`));
    }
    if (errors.length) {
        console.log(`Errors (${errors.length}):`);
        errors.forEach(e => console.log(`  ✗ ${e}`));
        process.exit(1);
    }
    console.log('OK — no errors.');
    process.exit(0);
}

main();
