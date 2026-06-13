/**
 * Atlantic Deep Sea Red Crab (50 CFR 648 Subpart M) — selection-page policy summaries.
 */
const REDFCRAB648_SPECIES = new Set(['atlantic-deep-sea-red-crab']);

const REDFCRAB648_CATEGORY_LIMITS = {
    'red-crab-cat-b': null,
    'red-crab-cat-c': null,
    'red-crab-open-incidental': 500,
    commercial: null
};

const REDFCRAB648_SHARED_BULLETS = [
    'Limited Access Category B and Category C: unlimited possession; operator permit required; VMS not required.',
    'Open Access — Incidental: 500 lb/trip; operator permit required.',
    'Female red crab: no vessel may possess female red crabs in excess of one standard tote (~100 lb) of incidentally caught females per trip.',
    'Transfer at sea: prohibited.',
    'No federal minimum size.',
    'Mutilation — dedicated red crab trip: claws and legs separate from bodies limited to one standard tote (~100 lb). Open access or LA incidental: no separate claws/legs; no more than 2 claws and 8 legs per body.',
    'Gear — trap ≤18 cubic feet on a red crab DAS (rectangular, trapezoidal, or conical unless LOA); max 600 traps/pots aboard. Buoys: “RC” on top, permit number and trawl sequence on side (≥3″ letters). High flyers and radar reflectors required. Traps in ≤200 fathoms with LA lobster permit must comply with lobster tagging. See ALWTRP trap/pot rules.',
    'Year-round closed areas may apply — verify charts.'
];

function getRedCrab648PolicyProfile(speciesId) {
    if (!REDFCRAB648_SPECIES.has(speciesId)) return null;

    const asOf = typeof REGULATION_META !== 'undefined' ? REGULATION_META.dataLastUpdated : null;

    return {
        level: 'complex',
        badgeLabel: 'Red crab — complex',
        badgeClass: 'policy-complex',
        headline: 'Atlantic deep sea red crab — LA unlimited; open access incidental 500 lb/trip; female and mutilation limits apply.',
        bullets: [...REDFCRAB648_SHARED_BULLETS],
        complianceNote: 'Not compliant if transfer at sea, over trip limit for permit category, excess female or mutilated crab, trap size/count violations, or missing buoy markings/high flyers.',
        dataAsOf: asOf
    };
}

function isRedCrab648Species(speciesId) {
    return REDFCRAB648_SPECIES.has(speciesId);
}

function getRedCrab648PossessionLimit(permitType, speciesData) {
    if (!permitType || permitType === 'recreational') {
        return { count: null, prohibited: false, unit: 'lbs', notes: 'Verify state regulations.' };
    }

    const key = permitType.startsWith('red-crab-') ? permitType : 'commercial';
    const count = REDFCRAB648_CATEGORY_LIMITS[key] ?? null;

    return {
        count,
        prohibited: false,
        unit: 'lbs per trip',
        notes: count == null ? 'Unlimited for LA Category B/C — verify bulletin.' : null
    };
}

if (typeof window !== 'undefined') {
    window.REDFCRAB648_SPECIES = REDFCRAB648_SPECIES;
    window.REDFCRAB648_SHARED_BULLETS = REDFCRAB648_SHARED_BULLETS;
    window.REDFCRAB648_CATEGORY_LIMITS = REDFCRAB648_CATEGORY_LIMITS;
    window.getRedCrab648PolicyProfile = getRedCrab648PolicyProfile;
    window.getRedCrab648PossessionLimit = getRedCrab648PossessionLimit;
    window.isRedCrab648Species = isRedCrab648Species;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        REDFCRAB648_SPECIES,
        REDFCRAB648_SHARED_BULLETS,
        REDFCRAB648_CATEGORY_LIMITS,
        getRedCrab648PolicyProfile,
        getRedCrab648PossessionLimit,
        isRedCrab648Species
    };
}
