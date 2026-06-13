/**
 * Atlantic Bluefish (50 CFR 648 Subpart J) — selection-page policy summaries.
 */
const BLUEFISH648_SPECIES = new Set(['bluefish']);

const BLUEFISH648_SHARED_BULLETS = [
    'Open Access Commercial Moratorium: unlimited possession; operator permit required; VMS not required.',
    'Charter/party: 7 fish per person; operator permit required. Recreational private: 5 fish per person.',
    'Charter/party possession: divide bluefish on board by persons aboard excluding captain and crew.',
    'No federal minimum size or gear restrictions.',
    'Commercial: no federal possession limit — verify state landing rules.',
    'Year-round closed areas may apply — verify charts.'
];

function getBluefish648PolicyProfile(speciesId) {
    if (!BLUEFISH648_SPECIES.has(speciesId)) return null;

    const asOf = typeof REGULATION_META !== 'undefined' ? REGULATION_META.dataLastUpdated : null;

    return {
        level: 'verified',
        badgeLabel: 'Bluefish',
        badgeClass: 'policy-verified',
        headline: 'Bluefish — commercial unlimited federally; recreational 5 fish/person (private) or 7 (charter/party).',
        bullets: [...BLUEFISH648_SHARED_BULLETS],
        complianceNote: 'Not compliant if over recreational/charter bag limit or fishing in closed areas. Verify state rules where applicable.',
        conservationEquivalency: true,
        dataAsOf: asOf
    };
}

function isBluefish648Species(speciesId) {
    return BLUEFISH648_SPECIES.has(speciesId);
}

function getBluefish648PossessionLimit(permitType, speciesData) {
    if (!permitType) {
        return { count: null, prohibited: false, unit: 'fish' };
    }

    if (permitType === 'commercial') {
        return {
            count: null,
            prohibited: false,
            unit: 'lbs',
            notes: 'Unlimited federally — verify state regulations.'
        };
    }

    if (permitType === 'recreational-for-hire' || permitType === 'charter-headboat') {
        return { count: 7, prohibited: false, unit: 'fish per person', notes: 'Exclude captain and crew from person count.' };
    }

    if (permitType === 'recreational') {
        return { count: 5, prohibited: false, unit: 'fish per person' };
    }

    return { count: null, prohibited: false, unit: 'fish' };
}

if (typeof window !== 'undefined') {
    window.BLUEFISH648_SPECIES = BLUEFISH648_SPECIES;
    window.BLUEFISH648_SHARED_BULLETS = BLUEFISH648_SHARED_BULLETS;
    window.getBluefish648PolicyProfile = getBluefish648PolicyProfile;
    window.getBluefish648PossessionLimit = getBluefish648PossessionLimit;
    window.isBluefish648Species = isBluefish648Species;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BLUEFISH648_SPECIES,
        BLUEFISH648_SHARED_BULLETS,
        getBluefish648PolicyProfile,
        getBluefish648PossessionLimit,
        isBluefish648Species
    };
}
