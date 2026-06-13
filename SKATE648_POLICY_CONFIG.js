/**
 * Northeast Skate Complex (50 CFR 648 Subpart O) — selection-page policy summaries.
 */
const SKATE648_SPECIES = new Set(['skate', 'thorny-skate', 'smooth-skate', 'barndoor-skate']);

const SKATE648_WING_LIMITS = {
    'nms-a-scallop-monkfish': {
        season1: { months: [5, 6, 7, 8], wings: 4000, whole: 9080 },
        season2: { months: [9, 10, 11, 12, 1, 2, 3, 4], wings: 6000, whole: 13620 }
    },
    'nms-b': { wings: 275, whole: 625 },
    'non-das': { wings: 625, whole: 1419 },
    'skate-bait-loa': { wings: 0, whole: 25000, minWholeInches: 23 }
};

const SKATE648_SHARED_BULLETS = [
    'Open Access — General: trip limits depend on DAS type (NMS A/scallop/monkfish, NMS B, non-DAS, or skate bait LOA). Operator permit required; VMS not required. Recreational: unlimited federally — size and prohibited species still apply.',
    'NMS A, scallop, or monkfish DAS — Season 1 (May 1–Aug 31): 4,000 lb wings / 9,080 lb whole. Season 2 (Sep 1–Apr 30): 6,000 lb wings / 13,620 lb whole.',
    'NMS B DAS (May 1–Apr 30): 275 lb wings / 625 lb whole. Non-DAS (May 1–Apr 30): 625 lb wings / 1,419 lb whole.',
    'Skate bait LOA: whole skates only, 25,000 lb/trip, minimum 23″ whole length; LOA required on board.',
    'Allowable forms: wings with carcasses separate and/or whole skates. Carcass weight may not exceed 1.27× wing weight. No carcasses without associated wings. Wing-to-whole conversion factor 2.27.',
    'Thorny skate: possession and landing prohibited. Barndoor skate: prohibited in bait fishery; permitted in directed wing fishery.',
    'Transfer at sea: prohibited without federal skate permit and valid LOA on transferring vessel.',
    'Exemption areas: SNE monkfish trawl/gillnet and Mid-Atlantic — see monkfish exemption area rules.',
    'Year-round closed areas may apply — verify charts.'
];

function getSkate648PolicyProfile(speciesId) {
    if (!SKATE648_SPECIES.has(speciesId)) return null;

    const asOf = typeof REGULATION_META !== 'undefined' ? REGULATION_META.dataLastUpdated : null;

    return {
        level: 'complex',
        badgeLabel: 'Skate — complex',
        badgeClass: 'policy-complex',
        headline: 'Northeast skate — trip limits vary by DAS type, season, and product form; thorny skate prohibited.',
        bullets: [...SKATE648_SHARED_BULLETS],
        complianceNote: 'Not compliant if thorny skate on board, barndoor in bait fishery, over trip limit, carcass/wing ratio violation, unauthorized transfer at sea, or skate bait LOA violation.',
        dataAsOf: asOf
    };
}

function isSkate648Species(speciesId) {
    return SKATE648_SPECIES.has(speciesId);
}

function getSkate648PossessionLimit(speciesId, permitType, speciesData) {
    if (speciesId === 'thorny-skate') {
        return { count: 0, prohibited: true, unit: 'lbs', message: 'Thorny skate possession and landing prohibited.' };
    }

    if (!permitType || permitType === 'recreational') {
        return { count: null, prohibited: false, unit: 'lbs', notes: 'No federal recreational limit — verify state measures.' };
    }

    if (speciesId === 'barndoor-skate' && (speciesData?.skateBaitLoa === 'yes' || speciesData?.dasTripType === 'skate-bait-loa')) {
        return { count: 0, prohibited: true, unit: 'lbs', message: 'Barndoor skate prohibited in bait fishery.' };
    }

    const dasType = speciesData?.dasTripType || speciesData?.['das-trip-type'] || 'nms-a-scallop-monkfish';
    const productForm = speciesData?.skateProductForm || speciesData?.['skate-product-form'] || 'wings';
    const d = typeof parseAssessmentDate === 'function'
        ? parseAssessmentDate(speciesData)
        : (speciesData?.dateOfCatch ? new Date(speciesData.dateOfCatch) : new Date());
    const month = d.getMonth() + 1;

    if (dasType === 'skate-bait-loa') {
        if (productForm === 'wings') {
            return { count: 0, prohibited: true, unit: 'lbs', message: 'Skate bait LOA — whole skates only.' };
        }
        return { count: 25000, prohibited: false, unit: 'lbs whole skates per trip', notes: 'Minimum 23″ whole length; LOA required.' };
    }

    if (dasType === 'nms-b') {
        const cfg = SKATE648_WING_LIMITS['nms-b'];
        return {
            count: productForm === 'whole' ? cfg.whole : cfg.wings,
            prohibited: false,
            unit: productForm === 'whole' ? 'lbs whole skates per trip' : 'lbs skate wings per trip'
        };
    }

    if (dasType === 'non-das') {
        const cfg = SKATE648_WING_LIMITS['non-das'];
        return {
            count: productForm === 'whole' ? cfg.whole : cfg.wings,
            prohibited: false,
            unit: productForm === 'whole' ? 'lbs whole skates per trip' : 'lbs skate wings per trip'
        };
    }

    const cfg = SKATE648_WING_LIMITS['nms-a-scallop-monkfish'];
    const season = cfg.season1.months.includes(month) ? cfg.season1 : cfg.season2;
    return {
        count: productForm === 'whole' ? season.whole : season.wings,
        prohibited: false,
        unit: productForm === 'whole' ? 'lbs whole skates per trip' : 'lbs skate wings per trip'
    };
}

if (typeof window !== 'undefined') {
    window.SKATE648_SPECIES = SKATE648_SPECIES;
    window.SKATE648_SHARED_BULLETS = SKATE648_SHARED_BULLETS;
    window.SKATE648_WING_LIMITS = SKATE648_WING_LIMITS;
    window.getSkate648PolicyProfile = getSkate648PolicyProfile;
    window.getSkate648PossessionLimit = getSkate648PossessionLimit;
    window.isSkate648Species = isSkate648Species;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SKATE648_SPECIES,
        SKATE648_SHARED_BULLETS,
        SKATE648_WING_LIMITS,
        getSkate648PolicyProfile,
        getSkate648PossessionLimit,
        isSkate648Species
    };
}
