#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const enginePath = path.join(root, 'js', 'legacy', 'assessmentEngine.js');
const lines = fs.readFileSync(enginePath, 'utf8').split('\n');

function slice(start, end) {
    return lines.slice(start - 1, end).join('\n');
}

// Ranges to REMOVE from assessmentEngine (1-based, inclusive)
const removeRanges = [
    [1362, 1798],
    [3598, 3663],
    [3774, 4375]
].sort((a, b) => b[0] - a[0]);

const violationHeader = `/**
 * Species violation checks — grouped assessments + dedicated species rules.
 */
`;
fs.writeFileSync(
    path.join(root, 'js', 'validation', 'speciesViolationChecks.js'),
    violationHeader + slice(3598, 3663) + '\n\n' + slice(3774, 4375) + '\n',
    'utf8'
);

fs.writeFileSync(
    path.join(root, 'js', 'ui', 'groupedAssessmentSections.js'),
    `/**
 * Grouped assessment UI sections.
 */
` + slice(1362, 1798) + '\n',
    'utf8'
);

let kept = lines;
for (const [start, end] of removeRanges) {
    kept = [...kept.slice(0, start - 1), ...kept.slice(end)];
}

const delegateNote = `
// Grouped UI → js/ui/groupedAssessmentSections.js
// Violation checks → js/validation/speciesViolationChecks.js
`;

fs.writeFileSync(enginePath, kept.join('\n').replace(
    '// Create permits section (grouped by species)',
    delegateNote + '// (createGrouped* moved to groupedAssessmentSections.js)'
).replace(
    '// Check all violations including combined limits',
    '// (checkAllViolations moved to speciesViolationChecks.js)'
), 'utf8');

console.log('Extracted modules and trimmed assessmentEngine.js');
