/**
 * Spiny Dogfish (50 CFR 648 Subpart L) — selection-page policy summaries.
 */
const DOGFISH648_SPECIES = new Set(['spiny-dogfish']);

const DOGFISH648_SHARED_BULLETS = [
    'Open Access — General: 7,500 lb/trip; only one spiny dogfish trip per calendar day. Operator permit required; VMS not required.',
    'Recreational: no federal possession limit — size and prohibited species rules still apply; comply with state regulations.',
    'No federal minimum size — states may set more restrictive size and possession limits.',
    'Unless exempted, vessels in federal waters are subject to Northeast multispecies regulations regardless of NMS permit.',
    'Gear — trawl or gillnet: 6.5″ square or diamond mesh in all RMAs. Gillnet length may not exceed 300 feet. HPTRP and ALWTRP may apply. Comply with NMS Restricted Gear Areas.',
    'Gillnet overnight soak prohibited in Atlantic Sturgeon Bycatch Reduction Areas (New Jersey; Delaware/Maryland; Virginia).',
    'Exemption areas: Nantucket Shoals (Jun 1–Oct 15, LOA); GOM/GB dogfish gillnet (Jul 1–Aug 31); Cape Cod eastern/western areas; SNE gillnet (May 1–Oct 31); Mid-Atlantic (year-round trawl/gillnet rules). See NMS exempted fisheries for Cultivator Shoal, Small Mesh, Raised Footrope, and SNE areas.',
    'Year-round closed areas may apply — verify charts.'
];

function getDogfish648PolicyProfile(speciesId) {
    if (!DOGFISH648_SPECIES.has(speciesId)) return null;

    const asOf = typeof REGULATION_META !== 'undefined' ? REGULATION_META.dataLastUpdated : null;

    return {
        level: 'complex',
        badgeLabel: 'Dogfish — complex',
        badgeClass: 'policy-complex',
        headline: 'Spiny dogfish — commercial 7,500 lb/trip (one trip/day); recreational unlimited federally with state rules.',
        bullets: [...DOGFISH648_SHARED_BULLETS],
        complianceNote: 'Not compliant if over 7,500 lb/trip, second commercial trip same calendar day, non-compliant mesh/gear, fishing closed areas, or violating exemption-area species/LOA/DAS rules.',
        dataAsOf: asOf
    };
}

function isDogfish648Species(speciesId) {
    return DOGFISH648_SPECIES.has(speciesId);
}

function getDogfish648PossessionLimit(permitType, speciesData) {
    if (!permitType) {
        return { count: null, prohibited: false, unit: 'lbs' };
    }

    if (permitType === 'recreational') {
        return {
            count: null,
            prohibited: false,
            unit: 'lbs',
            notes: 'No federal recreational limit — verify state size and possession rules.'
        };
    }

    if (permitType === 'commercial') {
        return {
            count: 7500,
            prohibited: false,
            unit: 'lbs per trip',
            notes: 'Only one spiny dogfish trip per calendar day.'
        };
    }

    return { count: null, prohibited: false, unit: 'lbs' };
}

if (typeof window !== 'undefined') {
    window.DOGFISH648_SPECIES = DOGFISH648_SPECIES;
    window.DOGFISH648_SHARED_BULLETS = DOGFISH648_SHARED_BULLETS;
    window.getDogfish648PolicyProfile = getDogfish648PolicyProfile;
    window.getDogfish648PossessionLimit = getDogfish648PossessionLimit;
    window.isDogfish648Species = isDogfish648Species;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DOGFISH648_SPECIES,
        DOGFISH648_SHARED_BULLETS,
        getDogfish648PolicyProfile,
        getDogfish648PossessionLimit,
        isDogfish648Species
    };
}
