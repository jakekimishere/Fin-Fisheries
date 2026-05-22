#!/usr/bin/env node
/**
 * Run all pre-deploy validators.
 * Usage: npm run validate   OR   node scripts/validate-all.js
 */
const { spawnSync } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..');
const scripts = [
    'validate-species-data.js',
    'validate-violation-coverage.js',
    'smoke-scenarios.js'
];

let failed = false;
for (const script of scripts) {
    console.log(`\n========== ${script} ==========\n`);
    const r = spawnSync(process.execPath, [path.join(__dirname, script)], {
        cwd: root,
        stdio: 'inherit'
    });
    if (r.status !== 0) {
        failed = true;
    }
}

if (failed) {
    console.error('\nvalidate-all: one or more checks failed.');
    process.exit(1);
}
console.log('\nvalidate-all: all checks passed.');
process.exit(0);
