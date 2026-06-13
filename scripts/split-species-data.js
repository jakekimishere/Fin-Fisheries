#!/usr/bin/env node
/**
 * Split monolithic species-data.js into species-data/*.js modules.
 * Run: node scripts/split-species-data.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const sourcePath = path.join(root, 'species-data.js');
const outDir = path.join(root, 'species-data');

const markers = [
    [1, '01-648-core.js', '648 Mid-Atlantic core (summer flounder, scallop)'],
    [546, '02-635-hms.js', '635 HMS species'],
    [9319, '03-648-midatlantic.js', '648 mackerel, squid'],
    [9768, '04-648-northeast.js', '648 Northeast species'],
    [13043, '05-648-small-pelagic.js', '648 small pelagic group'],
    [13125, '06-648-pelagic-mollusks.js', '648 pelagic mollusks'],
    [13218, '07-648-zooplankton.js', '648 zooplankton group'],
    [13326, '08-648-micro.js', 'Species under 1 inch'],
    [13412, '09-648-butterfish.js', '648 butterfish'],
    [13557, '10-635-billfish-general.js', '635 billfish general'],
    [13735, '11-misc-placeholders.js', 'Species placeholders'],
    [13742, '12-648-groundfish.js', '648 groundfish / multispecies'],
    [14415, '13-648-late-species.js', '648 bluefish, scup, BSB, etc.'],
    [15308, '14-init.js', 'Image init helpers']
];

function main() {
    const lines = fs.readFileSync(sourcePath, 'utf8').split('\n');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    for (let i = 0; i < markers.length; i++) {
        const [startLine, filename, description] = markers[i];
        const start = startLine - 1;
        const end = (markers[i + 1] ? markers[i + 1][0] - 2 : lines.length - 1);
        const chunk = lines.slice(start, end + 1).join('\n');
        const header = `// ${description}\n// Auto-split from species-data.js — edit here for routine updates.\n\n`;
        fs.writeFileSync(path.join(outDir, filename), header + chunk.trimEnd() + '\n', 'utf8');
        console.log(`Wrote ${filename} (${end - start + 1} lines)`);
    }

    const manifest = markers.map(([, f, d]) => `    './species-data/${f}', // ${d}`).join('\n');
    const loader = `/**
 * FIN species data loader — loads split modules in order.
 * Edit files under species-data/ (not this file).
 * Regenerate from monolith: node scripts/split-species-data.js
 */
// Module list is duplicated in js/config/appBundle.js for offline precache.
`;
    fs.writeFileSync(path.join(outDir, 'README.md'), `# Species data modules

Regulation content is split by fishery for easier maintenance.

| File | Contents |
|------|----------|
${markers.map(([, f, d]) => `| \`${f}\` | ${d} |`).join('\n')}

After editing, run \`npm run validate\` and bump \`APP_CACHE_NAME\` in \`js/config/appBundle.js\`.
`, 'utf8');
    console.log('Done. Update index.html and appBundle.js script lists.');
}

main();
