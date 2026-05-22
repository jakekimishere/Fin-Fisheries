/**
 * Northeast multispecies assessment flow — which steps apply for current selection.
 */
const MULTISPECIES_TRIP_LIMIT_SPECIES = ['atlantic-cod', 'haddock'];

/** Groundfish IDs with minimal regulations (grouped UI only, no dynamic questions). */
const MULTISPECIES_SIMPLIFIED_GROUNDFISH = [
    'winter-flounder', 'windowpane-flounder', 'atlantic-wolffish', 'redfish',
    'atlantic-halibut', 'white-hake', 'pollock', 'witch-flounder',
    'american-plaice', 'ocean-pout', 'monkfish'
];

function getSelectedSpeciesIdsForFlow() {
    if (typeof getSelectedSpeciesIds === 'function') {
        return getSelectedSpeciesIds();
    }
    if (window.appState?.selectedSpecies?.length) {
        return window.appState.selectedSpecies;
    }
    return window.selectedSpecies || [];
}

function hasMultispeciesSelected(speciesIds) {
    const check = typeof isMultispecies === 'function'
        ? isMultispecies
        : (id) => MULTISPECIES_SIMPLIFIED_GROUNDFISH.includes(id) || MULTISPECIES_TRIP_LIMIT_SPECIES.includes(id);
    return speciesIds.some(id => check(id));
}

/** Sector vs common pool step — skip when only simplified groundfish (no cod/haddock trip logic). */
function vesselClassificationStepNeeded() {
    const speciesIds = getSelectedSpeciesIdsForFlow();
    if (!hasMultispeciesSelected(speciesIds)) {
        return false;
    }
    if (speciesIds.some(id => MULTISPECIES_TRIP_LIMIT_SPECIES.includes(id))) {
        return true;
    }
    const multispeciesIds = speciesIds.filter(id =>
        MULTISPECIES_SIMPLIFIED_GROUNDFISH.includes(id) || MULTISPECIES_TRIP_LIMIT_SPECIES.includes(id)
    );
    const onlySimplified = multispeciesIds.length > 0
        && multispeciesIds.every(id => MULTISPECIES_SIMPLIFIED_GROUNDFISH.includes(id));
    return !onlySimplified;
}

function vesselRequirementsStepNeeded() {
    const speciesIds = getSelectedSpeciesIdsForFlow();
    const requiresScallop = speciesIds.includes('atlantic-sea-scallop');
    const hmsReportingSpecies = ['bluefin-tuna', 'swordfish', 'billfish'];
    const requiresHMSReporting = speciesIds.some(id => hmsReportingSpecies.includes(id));
    return requiresScallop || requiresHMSReporting;
}

/** Default enrollment when vessel classification step is skipped. */
function applyDefaultVesselClassification() {
    const data = window.assessmentData || {};
    if (!data.vessel) data.vessel = {};
    if (!data.vessel.multispecies) data.vessel.multispecies = {};
    if (!data.vessel.multispecies.classification) {
        data.vessel.multispecies.classification = 'common-pool';
        data.vesselClassification = 'common-pool';
    }
    if (window.appState?.setAssessmentData) {
        window.appState.setAssessmentData('vessel.multispecies.classification', data.vessel.multispecies.classification);
    }
}

const MultispeciesFlow = {
    MULTISPECIES_TRIP_LIMIT_SPECIES,
    MULTISPECIES_SIMPLIFIED_GROUNDFISH,
    vesselClassificationStepNeeded,
    vesselRequirementsStepNeeded,
    applyDefaultVesselClassification
};

if (typeof window !== 'undefined') {
    window.MultispeciesFlow = MultispeciesFlow;
    window.vesselClassificationStepNeeded = vesselClassificationStepNeeded;
    if (typeof window.vesselRequirementsStepNeeded !== 'function') {
        window.vesselRequirementsStepNeeded = vesselRequirementsStepNeeded;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MultispeciesFlow;
}
