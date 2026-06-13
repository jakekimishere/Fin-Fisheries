/**
 * Black Sea Bass (50 CFR 648 Subpart I) — selection-page policy summaries.
 */
const BSB648_SPECIES = new Set(['black-sea-bass']);

const BSB648_SHARED_BULLETS = [
    'Commercial moratorium permit: unlimited possession; must be stored in standard 100 lb totes. Operator permit required; VMS not required.',
    'Charter/party and recreational: federal minimum size, possession limit, and season waived — follow state of landing (conservation equivalency). Charter/party: divide fish on board by persons excluding captain and crew.',
    'Federally permitted charter/party: if federal and landing-state rules differ, follow the more restrictive measure.',
    'Minimum size — commercial moratorium: 11″ TL. Charter/party: 15″. Recreational: see state requirements.',
    'Otter trawl — 4.5″ diamond mesh throughout codend for at least 75 continuous meshes (entire net ≥4.5″ if codend <75 meshes) when possession exceeds: >500 lb/trip Jan 1–Mar 31; >100 lb/trip Apr 1–Dec 31.',
    'Trap/pot: degradable hinges (hemp/cotton ≤3/16″, magnesium fasteners, or ungalvanized wire ≤0.094″); escape vent rectangular 1 3/8″×5 3/4″, square 2″, circle 2.5″, or equivalent lath spacing; state or RA identification. See ALWTRP trap/pot management areas.',
    'Transfer at sea: prohibited for black sea bass.',
    'Scup Gear Restricted Areas (when fishing for longfin squid, black sea bass, or whiting): Northern GRA Nov 1–Dec 31 — 5″ diamond mesh; Southern GRA Jan 1–Mar 15 — 5″ diamond mesh. Transit allowed with smaller mesh stowed.',
    'Verify state recreational/charter measures for the state where catch will be landed.'
];

function getBsb648PolicyProfile(speciesId) {
    if (!BSB648_SPECIES.has(speciesId)) return null;

    const asOf = typeof REGULATION_META !== 'undefined' ? REGULATION_META.dataLastUpdated : null;

    return {
        level: 'complex',
        badgeLabel: 'BSB — CE',
        badgeClass: 'policy-complex',
        headline: 'Black sea bass — commercial unlimited in 100 lb totes with trawl mesh rules; charter and recreational follow state conservation equivalency.',
        bullets: [...BSB648_SHARED_BULLETS],
        complianceNote: 'Not compliant if transfer at sea, over mesh threshold without 4.5″ diamond trawl mesh, wrong trap/pot specs, undersized fish, catch not in standard totes, or charter/rec violation under applicable state rules.',
        conservationEquivalency: true,
        dataAsOf: asOf
    };
}

function isBsb648Species(speciesId) {
    return BSB648_SPECIES.has(speciesId);
}

/** Mesh possession threshold (lbs) before 4.5″ diamond trawl mesh required. null = no federal lb limit. */
function bsb648TrawlMeshThreshold(month) {
    if (month >= 1 && month <= 3) return 500;
    if (month >= 4 && month <= 12) return 100;
    return null;
}

function getBsb648PossessionLimit(permitType, speciesData) {
    if (!permitType) {
        return { count: null, prohibited: false, unit: 'lbs' };
    }

    if (permitType === 'recreational' || permitType === 'charter-headboat') {
        return {
            count: null,
            prohibited: false,
            unit: 'fish',
            notes: 'Federal limits waived — verify state of landing measures. Charter: exclude captain/crew from person count.'
        };
    }

    if (permitType === 'commercial') {
        return {
            count: null,
            prohibited: false,
            unit: 'lbs',
            notes: 'Unlimited moratorium possession — standard 100 lb totes; trawl mesh rules apply above seasonal thresholds.'
        };
    }

    return { count: null, prohibited: false, unit: 'lbs' };
}

function bsb648RequiresTrawlMesh(speciesData) {
    const permitType = speciesData?.permitType || speciesData?.['permit-type'];
    if (permitType !== 'commercial') return false;

    const gear = speciesData?.gearType || speciesData?.['gear-type'];
    if (gear !== 'otter-trawl') return false;

    const amount = speciesData?.possessionAmount ?? speciesData?.['possession-amount'];
    if (amount == null) return false;

    const date = speciesData?.dateOfCatch || speciesData?.dateOfLanding || speciesData?.['date-of-catch'];
    const d = date ? new Date(date) : new Date();
    const threshold = bsb648TrawlMeshThreshold(d.getMonth() + 1);
    return threshold != null && amount > threshold;
}

if (typeof window !== 'undefined') {
    window.BSB648_SPECIES = BSB648_SPECIES;
    window.BSB648_SHARED_BULLETS = BSB648_SHARED_BULLETS;
    window.getBsb648PolicyProfile = getBsb648PolicyProfile;
    window.getBsb648PossessionLimit = getBsb648PossessionLimit;
    window.bsb648TrawlMeshThreshold = bsb648TrawlMeshThreshold;
    window.bsb648RequiresTrawlMesh = bsb648RequiresTrawlMesh;
    window.isBsb648Species = isBsb648Species;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BSB648_SPECIES,
        BSB648_SHARED_BULLETS,
        getBsb648PolicyProfile,
        getBsb648PossessionLimit,
        bsb648TrawlMeshThreshold,
        bsb648RequiresTrawlMesh,
        isBsb648Species
    };
}
