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

    const { loadSpeciesData } = require('./load-species-data');

    let SPECIES_DATA;
    try {
        SPECIES_DATA = loadSpeciesData({ console });
    } catch (err) {
        console.error('Failed to load species data modules:', err.message);
        process.exit(1);
    }
    if (!SPECIES_DATA || typeof SPECIES_DATA !== 'object') {
        console.error('Failed to load SPECIES_DATA from species-data/*.js');
        process.exit(1);
    }

    const groupsPath = path.join(root, 'SPECIES_GROUPS_CONFIG.js');
    const groupsCode = fs.readFileSync(groupsPath, 'utf8');
    const groupsWrapped = `(function() {\n${groupsCode}\nreturn SPECIES_GROUPS;\n})()`;
    const SPECIES_GROUPS = vm.runInNewContext(groupsWrapped, { console }, { filename: groupsPath });

    const gfPath = path.join(root, 'GROUND_FISH_TRIP_LIMITS_CONFIG.js');
    if (fs.existsSync(gfPath)) {
        const gfCode = fs.readFileSync(gfPath, 'utf8');
        const gfWrapped = `(function() {\n${gfCode}\nreturn { getGroundfishTripLimit, GROUND_FISH_TRIP_LIMITS };\n})()`;
        const gfExports = vm.runInNewContext(gfWrapped, { console }, { filename: gfPath });
        var getGroundfishTripLimit = gfExports.getGroundfishTripLimit;
    }

    const quotaPath = path.join(root, 'FISHERY_QUOTA_STATUS_CONFIG.js');
    let getCommercialPossessionLimit;
    let getHerringAreaLimitLb;
    if (fs.existsSync(quotaPath)) {
        const quotaCode = fs.readFileSync(quotaPath, 'utf8');
        const quotaWrapped = `(function() {\n${quotaCode}\nreturn { getCommercialPossessionLimit, getHerringAreaLimitLb, getBFTCommercialDailyLimit };\n})()`;
        const quotaExports = vm.runInNewContext(quotaWrapped, { console }, { filename: quotaPath });
        getCommercialPossessionLimit = quotaExports.getCommercialPossessionLimit;
        getHerringAreaLimitLb = quotaExports.getHerringAreaLimitLb;
    }

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
            const auxiliaryLimitKeys = ['commercial-large-mesh', 'commercial-small-mesh'];
            for (const permitKey of Object.keys(regs.assessmentQuestions.possessionLimitCheck.limits)) {
                if (permitOpts.length && !permitOpts.includes(permitKey)
                    && permitKey !== 'commercial' && permitKey !== 'recreational'
                    && !auxiliaryLimitKeys.includes(permitKey)) {
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

    const makoRec = SPECIES_DATA['shortfin-mako-shark']?.regulations?.possession?.recreational;
    if (!makoRec?.prohibited && makoRec?.limit?.count !== 0) {
        errors.push('shortfin-mako-shark: recreational retention must be prohibited');
    }
    const owRec = SPECIES_DATA['oceanic-whitetip-shark']?.regulations?.possession?.recreational;
    if (!owRec?.prohibited && owRec?.limit?.count !== 0) {
        errors.push('oceanic-whitetip-shark: recreational retention must be prohibited');
    }

    if (typeof getGroundfishTripLimit === 'function') {
        const gomCod = getGroundfishTripLimit('atlantic-cod', 'gulf-of-maine', 'category-a');
        if (!gomCod || gomCod.perTrip !== 50) {
            errors.push('GROUND_FISH_TRIP_LIMITS: GOM cod category-a trip should be 50 lb');
        }
    }

    const salmonRec = SPECIES_DATA['atlantic-salmon']?.regulations?.possession?.recreational;
    if (!salmonRec?.prohibited) {
        errors.push('atlantic-salmon: EEZ possession must be prohibited');
    }

    const kingRec = SPECIES_DATA['king-mackerel']?.regulations?.possession?.recreational?.limit?.count;
    if (kingRec !== 3) errors.push(`king-mackerel: recreational limit should be 3, got ${kingRec}`);

    const spanRec = SPECIES_DATA['spanish-mackerel']?.regulations?.possession?.recreational?.limit?.count;
    if (spanRec !== 15) errors.push(`spanish-mackerel: recreational limit should be 15, got ${spanRec}`);

    if (typeof getHerringAreaLimitLb === 'function') {
        const h1b = getHerringAreaLimitLb('area-1b', new Date('2026-05-21'));
        if (h1b !== 2000) errors.push(`herring area-1b limit should be 2000 lb, got ${h1b}`);
    }

    if (typeof getCommercialPossessionLimit === 'function') {
        const salmonLim = getCommercialPossessionLimit('atlantic-salmon', 'commercial', {});
        if (!salmonLim.prohibited) errors.push('atlantic-salmon: commercial possession should be prohibited in EEZ');
        const bftJun = getCommercialPossessionLimit('bluefin-tuna', 'commercial-general', { dateOfCatch: '2026-06-15' });
        if (bftJun.count !== 3) errors.push(`bluefin-tuna June general limit should be 3, got ${bftJun.count}`);
    }

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
