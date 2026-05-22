/**
 * Shared HTML builders for pre-report overlay and compliance report.
 * Used by assessmentEngine.js and ReportGenerator.
 */
(function (root, factory) {
    const api = factory();
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    } else {
        root.ReportBuilder = api;
    }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    function escapeHtml(text) {
        if (text == null) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function buildReportHeader(generatedAt) {
        const when = generatedAt instanceof Date ? generatedAt : new Date();
        return `
        <div class="report-header">
            <h2>FIN - FISHERIES INSPECTION NAVIGATOR</h2>
            <h3>NORTHEAST FISHERIES COMPLIANCE REPORT</h3>
            <p class="report-date">Generated: ${escapeHtml(when.toLocaleString())}</p>
        </div>`;
    }

    function buildSummaryBanner(violationCount) {
        const n = violationCount || 0;
        return `
        <div class="report-summary-banner ${n > 0 ? 'violation' : 'compliant'}" role="status" aria-live="polite">
            <p><strong>${n > 0
                ? `⚠️ ${n} potential violation(s) identified`
                : '✓ No potential violations identified from entered data'}</strong></p>
            ${n > 0 ? '<p>Review species sections and the final verdict below.</p>' : ''}
        </div>`;
    }

    function buildVerdictBox(allViolations) {
        const list = allViolations || [];
        if (list.length === 0) {
            return `
            <div class="verdict-box compliant" role="status">
                <h3>✓ NO VIOLATIONS IDENTIFIED</h3>
                <p>Based on the information provided, the vessel appears to be in compliance with Northeast fisheries regulations.</p>
            </div>`;
        }
        return `
            <div class="verdict-box violation" role="alert">
                <h3>⚠️ POTENTIAL VIOLATION(S) IDENTIFIED</h3>
                <p>Possible violation(s) of <strong>50 USC 648</strong> - Magnuson-Stevens Fishery Conservation and Management Act</p>
                <ul class="violation-list">
                    ${list.map(v => `<li>${escapeHtml(v)}</li>`).join('')}
                </ul>
            </div>`;
    }

    function buildReportRow(label, value, valueClass) {
        const cls = valueClass ? ` ${valueClass}` : '';
        return `
            <div class="report-row">
                <span class="report-label">${escapeHtml(label)}:</span>
                <span class="report-value${cls}">${value}</span>
            </div>`;
    }

    function buildSpeciesSectionOpen(species, speciesId, hasViolations) {
        const name = species?.name || speciesId;
        return `
            <div class="report-section">
                <h3>${escapeHtml(name.toUpperCase())} ASSESSMENT</h3>
                ${buildReportRow(
                    'Compliance Status',
                    hasViolations ? '⚠️ POTENTIAL VIOLATION(S)' : '✓ NO ISSUES IDENTIFIED',
                    `report-species-status ${hasViolations ? 'violation' : 'compliant'}`
                )}`;
    }

    function buildPotentialIssuesBlock(violations) {
        const list = violations || [];
        const hasViolations = list.length > 0;
        const inner = hasViolations
            ? `<ul class="violation-list-small">${list.map(v => `<li>${escapeHtml(v)}</li>`).join('')}</ul>`
            : 'None identified for this species based on entered data.';
        return buildReportRow('Potential Issues', inner, hasViolations ? 'violation' : 'compliant');
    }

    function closeReportSection() {
        return '</div>';
    }

    function buildPreReportBody(options) {
        const { allViolations = [], speciesSummaries = [] } = options || {};
        if (allViolations.length === 0) {
            return `
            <div class="pre-report-status compliant" role="status">
                <p><strong>No potential violations identified</strong> from the information entered.</p>
                <p class="pre-report-note">You can still generate the full report for documentation. Always verify against current NOAA regulations.</p>
            </div>`;
        }
        const speciesHtml = speciesSummaries.map(s => {
            if (!s.violations || s.violations.length === 0) {
                return `<p class="pre-report-species-ok">✓ ${escapeHtml(s.name)}</p>`;
            }
            return `
                <div class="pre-report-species-block">
                    <strong>${escapeHtml(s.name)}</strong>
                    <ul class="violation-list-small">${s.violations.map(v => `<li>${escapeHtml(v)}</li>`).join('')}</ul>
                </div>`;
        }).join('');
        return `
            <div class="pre-report-status violation" role="alert">
                <p><strong>${allViolations.length} potential issue(s) identified</strong></p>
                <ul class="violation-list pre-report-violation-list">
                    ${allViolations.map(v => `<li>${escapeHtml(v)}</li>`).join('')}
                </ul>
            </div>
            <div class="pre-report-by-species">
                <h3>By species</h3>
                ${speciesHtml}
            </div>`;
    }

    return {
        escapeHtml,
        buildReportHeader,
        buildSummaryBanner,
        buildVerdictBox,
        buildReportRow,
        buildSpeciesSectionOpen,
        buildPotentialIssuesBlock,
        closeReportSection,
        buildPreReportBody
    };
});
