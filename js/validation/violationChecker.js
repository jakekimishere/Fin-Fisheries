/**
 * Violation checking facade — delegates to AssessmentViolations + legacy engine checks.
 */
const ViolationChecker = {
    checkSpecies(speciesId, species, speciesData) {
        if (typeof checkSpeciesViolations === 'function') {
            return checkSpeciesViolations(speciesId, species, speciesData);
        }
        if (typeof AssessmentViolations !== 'undefined') {
            return AssessmentViolations.evaluateAssessmentQuestionViolations(speciesId, species, speciesData);
        }
        return [];
    },

    checkAll(speciesIds) {
        if (typeof checkAllViolations === 'function') {
            return checkAllViolations();
        }
        const violations = [];
        (speciesIds || []).forEach(speciesId => {
            const species = typeof SPECIES_DATA !== 'undefined' && SPECIES_DATA[speciesId];
            if (!species) return;
            const data = window.assessmentData?.species?.[speciesId] || {};
            violations.push(...ViolationChecker.checkSpecies(speciesId, species, data));
        });
        return [...new Set(violations)];
    }
};

if (typeof window !== 'undefined') {
    window.ViolationChecker = ViolationChecker;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ViolationChecker;
}
