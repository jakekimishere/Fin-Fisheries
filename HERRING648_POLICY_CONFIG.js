/**
 * Atlantic Herring (50 CFR Part 648) — selection-page policy summaries.
 */
const HERRING648_SPECIES = new Set(['atlantic-herring']);

const HERRING648_CATEGORY_LIMITS = {
    'herring-cat-a': null,
    'herring-cat-b': null,
    'herring-cat-c': 55000,
    'herring-cat-d': 6600,
    'herring-cat-e': 20000,
    commercial: null
};

const HERRING648_SHARED_BULLETS = [
    'Permit categories: Cat A (LA all areas) and Cat B (LA Areas 2–3) — unlimited, VMS and operator permit required. Cat C incidental — 55,000 lb/trip/day. Cat D open access — 6,600 lb/trip/day, no VMS/operator permit. Cat E open access Areas 2–3 — 20,000 lb/trip/day, VMS and operator permit required.',
    'Personal-use bait: no herring permit if no purse seine, midwater trawl, pelagic gillnet, sink gillnet, or bottom trawl on board.',
    'Declared out of fishery (DOF): may not harvest, possess, or land herring on that trip.',
    'No federal minimum size. Herring roe allowed only if carcasses are not discarded at sea.',
    'Gear: midwater trawl — no minimum mesh, LOA required, prohibited in Area 1A Jun 1–Sep 30. Purse seine — LOA on board. Single pelagic gillnet — max 3″ mesh, herring-as-bait only. Bottom trawl — see small-mesh exemption areas.',
    'Management areas: Area 1A closed to directed fishery; Areas 1B/2/3 open (verify bulletin). Areas 1B and 3 — 2,000 lb/trip/calendar day when adjustment active. Transit Area 1A with all gear stowed.',
    'Midwater trawl in NMS Closed Area 1 North (Feb 1–Apr 15), Closed Area 2, Cashes Ledge, or Western GOM — NOAA observer required.',
    'Transfer at sea prohibited except authorized carrier, personal bait, or cooperative pair/purse-seine transfers with LOA.',
    'Herring carriers: VMS carrier declaration or LOA; no fishing gear aboard; may transport herring, haddock, and up to 100 lb combined groundfish.',
    'Exempted fishing areas: GOM/Cape Cod whiting and small-mesh areas, SNE and Mid-Atlantic RMA — herring incidental rules and river herring/shad retention limits apply.'
];

function getHerring648PolicyProfile(speciesId) {
    if (!HERRING648_SPECIES.has(speciesId)) return null;

    const asOf = typeof REGULATION_META !== 'undefined' ? REGULATION_META.dataLastUpdated : null;

    return {
        level: 'complex',
        badgeLabel: 'Herring — complex',
        badgeClass: 'policy-complex',
        headline: 'Atlantic herring limits depend on permit category, management area, gear, and in-season quota adjustments.',
        bullets: [...HERRING648_SHARED_BULLETS],
        complianceNote: 'Not compliant if fishing closed Area 1A, over trip/day limit, unauthorized transfer at sea, wrong gear/LOA, DOF violation, or fishing midwater trawl in Area 1A Jun–Sep.',
        dataAsOf: asOf
    };
}

function isHerring648Species(speciesId) {
    return HERRING648_SPECIES.has(speciesId);
}

function getHerring648PossessionLimit(permitType, speciesData) {
    if (!permitType || permitType === 'recreational') {
        return { count: null, prohibited: false, unit: 'lbs', notes: 'No federal recreational limit — verify state measures.' };
    }

    const key = permitType.startsWith('herring-') ? permitType : 'commercial';
    let count = HERRING648_CATEGORY_LIMITS[key] ?? null;

    const area = speciesData?.fishingArea || speciesData?.['fishing-area'];
    const assessmentDate = typeof parseAssessmentDate === 'function'
        ? parseAssessmentDate(speciesData)
        : (speciesData?.dateOfCatch ? new Date(speciesData.dateOfCatch) : new Date());

    if (typeof getHerringAreaLimitLb === 'function' && area) {
        const areaLb = getHerringAreaLimitLb(area, assessmentDate);
        if (areaLb != null && (count == null || areaLb < count)) {
            count = areaLb;
        }
    }

    if (area === 'area-1a' || area === 'closed-area') {
        return {
            count: 0,
            prohibited: true,
            unit: 'lbs',
            message: 'Area 1A closed to directed Atlantic herring fishery — verify bulletin.'
        };
    }

    return {
        count,
        prohibited: false,
        unit: 'lbs per trip/day',
        notes: count == null ? 'Unlimited for permit category — verify area adjustments.' : null
    };
}

if (typeof window !== 'undefined') {
    window.HERRING648_SPECIES = HERRING648_SPECIES;
    window.HERRING648_SHARED_BULLETS = HERRING648_SHARED_BULLETS;
    window.HERRING648_CATEGORY_LIMITS = HERRING648_CATEGORY_LIMITS;
    window.getHerring648PolicyProfile = getHerring648PolicyProfile;
    window.getHerring648PossessionLimit = getHerring648PossessionLimit;
    window.isHerring648Species = isHerring648Species;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        HERRING648_SPECIES,
        HERRING648_SHARED_BULLETS,
        HERRING648_CATEGORY_LIMITS,
        getHerring648PolicyProfile,
        getHerring648PossessionLimit,
        isHerring648Species
    };
}
