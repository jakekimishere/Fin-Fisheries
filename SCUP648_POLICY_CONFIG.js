/**
 * Scup (50 CFR 648 Subpart H) — selection-page policy summaries.
 */
const SCUP648_SPECIES = new Set(['scup']);

const SCUP648_SHARED_BULLETS = [
    'Commercial moratorium permit: operator permit required; VMS not required. Winter I (Jan 1–Apr 30): closed in EEZ. Summer (May 1–Sep 30): see state regulations. Winter II (Oct 1–Dec 31): 12,000 lb/trip with compliant gear.',
    'Charter/party: 40 fish per person (captain and crew do not count toward limit); operator permit required. Recreational: 40 fish per person — verify state conservation equivalency measures.',
    'Skin-on landing: scup from moratorium or charter/party trips, or from the EEZ north of 35°15.3′ N, may not be landed with skin removed.',
    'Minimum size — commercial moratorium: 9″ TL. Charter/party and recreational: 10″ TL.',
    'Trawl — compliant mesh: >5″ diamond for at least 75 continuous meshes forward of codend (entire net ≥5″ if codend <75 meshes) for moratorium trip limits; other nets stowed.',
    'Trawl — reduced limits if mesh not compliant: 1,000 lb/trip Oct 1–Apr 14; 2,000 lb/trip Apr 15–Jun 15; 200 lb/trip Jun 16–Sep 30.',
    'Roller rig trawl: rollers may not exceed 18″ diameter.',
    'Trap/pot: degradable hinges (hemp/cotton ≤3/16″, magnesium fasteners, or ungalvanized wire ≤0.094″); escape vent ≥3.1″ circle or equivalent; state or RA identification. See ALWTRP trap/pot management areas.',
    'Transfer at sea: both vessels need federal scup permits; seaward of transfer boundary; Winter I or II only; one transfer per trip; full codend transfer after donor limit; VTR on both vessels; compliant gear and stowage.',
    'Scup Gear Restricted Areas (when fishing for longfin squid, black sea bass, or whiting): Northern GRA Nov 1–Dec 31 — 5″ diamond mesh; Southern GRA Jan 1–Mar 15 — 5″ diamond mesh. Transit allowed with smaller mesh stowed.',
    'Year-round closed areas may apply — verify charts.'
];

function getScup648PolicyProfile(speciesId) {
    if (!SCUP648_SPECIES.has(speciesId)) return null;

    const asOf = typeof REGULATION_META !== 'undefined' ? REGULATION_META.dataLastUpdated : null;

    return {
        level: 'complex',
        badgeLabel: 'Scup — complex',
        badgeClass: 'policy-complex',
        headline: 'Scup limits depend on commercial season (Winter I closed, Winter II 12,000 lb), mesh compliance, permit type, and state summer measures.',
        bullets: [...SCUP648_SHARED_BULLETS],
        complianceNote: 'Not compliant if fishing Winter I EEZ closure, over trip limit for season/mesh, undersized fish, prohibited skin-off landing, invalid transfer at sea, or wrong mesh in GRAs when targeting squid/BSB/whiting.',
        conservationEquivalency: true,
        dataAsOf: asOf
    };
}

function isScup648Species(speciesId) {
    return SCUP648_SPECIES.has(speciesId);
}

function scup648ReducedMeshLimit(month, day) {
    if (month >= 10 || month <= 3 || (month === 4 && day <= 14)) {
        return 1000;
    }
    if ((month === 4 && day >= 15) || month === 5 || (month === 6 && day <= 15)) {
        return 2000;
    }
    if ((month === 6 && day >= 16) || month === 7 || month === 8 || month === 9) {
        return 200;
    }
    return null;
}

/** Trip limit guidance; null = verify state or mesh tier. */
function getScup648PossessionLimit(permitType, speciesData) {
    if (!permitType) {
        return { count: null, prohibited: false, unit: 'lbs' };
    }

    if (permitType === 'recreational' || permitType === 'charter-headboat') {
        return {
            count: 40,
            prohibited: false,
            unit: 'fish per person',
            notes: permitType === 'charter-headboat'
                ? 'Charter: exclude captain and crew from person count. Verify state CE.'
                : 'Verify state conservation equivalency measures.'
        };
    }

    if (permitType !== 'commercial') {
        return { count: null, prohibited: false, unit: 'lbs' };
    }

    const date = speciesData?.dateOfCatch || speciesData?.dateOfLanding;
    const d = date ? new Date(date) : new Date();
    const month = d.getMonth() + 1;
    const day = d.getDate();

    if (month >= 1 && month <= 4) {
        return {
            count: 0,
            prohibited: true,
            unit: 'lbs',
            message: 'Winter I: commercial scup fishery closed in EEZ (Jan 1–Apr 30).'
        };
    }

    if (month >= 5 && month <= 9) {
        return {
            count: null,
            prohibited: false,
            unit: 'lbs',
            notes: 'Summer season — see state commercial regulations.'
        };
    }

    const mesh = speciesData?.meshSize || speciesData?.meshSizeCompliance || speciesData?.['mesh-compliant'];
    const isCompliantMesh = mesh === 'compliant-mesh' || mesh === 'large-mesh' || mesh === 'yes';

    if (isCompliantMesh) {
        return { count: 12000, prohibited: false, unit: 'lbs per trip', notes: 'Winter II with compliant trawl mesh.' };
    }

    const reduced = scup648ReducedMeshLimit(month, day);
    if (reduced != null) {
        return { count: reduced, prohibited: false, unit: 'lbs per trip', notes: 'Reduced limit — non-compliant trawl mesh.' };
    }

    return { count: null, prohibited: false, unit: 'lbs', notes: 'Verify season and mesh tier.' };
}

if (typeof window !== 'undefined') {
    window.SCUP648_SPECIES = SCUP648_SPECIES;
    window.SCUP648_SHARED_BULLETS = SCUP648_SHARED_BULLETS;
    window.getScup648PolicyProfile = getScup648PolicyProfile;
    window.getScup648PossessionLimit = getScup648PossessionLimit;
    window.isScup648Species = isScup648Species;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SCUP648_SPECIES,
        SCUP648_SHARED_BULLETS,
        getScup648PolicyProfile,
        getScup648PossessionLimit,
        scup648ReducedMeshLimit,
        isScup648Species
    };
}
