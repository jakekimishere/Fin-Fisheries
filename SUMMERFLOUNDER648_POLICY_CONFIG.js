/**
 * Summer Flounder (50 CFR 648 Subpart G) — selection-page policy summaries.
 */
const SUMMERFLOUNDER648_SPECIES = new Set(['summer-flounder']);

const SUMMERFLOUNDER648_SHARED_BULLETS = [
    'Commercial moratorium permit: unlimited possession when using compliant gear; operator permit required; VMS not required.',
    'Charter/party and recreational: federal bag/size/season waived under conservation equivalency — state measures apply. Operator permit required charter/party; not required recreational.',
    'Charter/party possession: divide summer flounder on board by number of persons aboard excluding captain and crew.',
    'Gear (commercial moratorium): 5.5″ diamond or 6″ square mesh throughout entire net when possession exceeds 100 lb/trip May 1–Oct 31 or 200 lb/trip Nov 1–Apr 30.',
    'Small mesh LOA: May 1–Oct 31, moratorium permit holders with valid small mesh LOA fishing east of 72°30′ W are exempt from minimum mesh requirements.',
    'Minimum size — commercial: 14″ total length. Recreational/charter: refer to state size limits. Minimum size applies to whole fish and parts (fillets); charter/party with valid state fillet-at-sea permit may possess smaller fillets if state rules met.',
    'Sea Turtle Protection Area: summer flounder trawlers in VA/NC waters south of Cape Charles must use approved TED in TED extension (≤3.5″ stretched mesh). TED frame min 51″×32″, 1.25″ aluminum pipe, max 4″ bar spacing, 30–55° installation angle.',
    'TED exemption: north of 35°46.1′ N (Oregon Inlet, NC) exempt Jan 15–Mar 15 each year.',
    'Year-round closed areas may apply — verify charts and Section 26 closures.',
    'Verify current state recreational/charter limits and any state landing restrictions (e.g., Massachusetts).'
];

function getSummerFlounder648PolicyProfile(speciesId) {
    if (!SUMMERFLOUNDER648_SPECIES.has(speciesId)) return null;

    const asOf = typeof REGULATION_META !== 'undefined' ? REGULATION_META.dataLastUpdated : null;

    return {
        level: 'complex',
        badgeLabel: 'Summer flounder — CE',
        badgeClass: 'policy-complex',
        headline: 'Summer flounder — commercial unlimited with compliant mesh; recreational and charter follow state conservation equivalency measures.',
        bullets: [...SUMMERFLOUNDER648_SHARED_BULLETS],
        complianceNote: 'Not compliant if commercial possession exceeds small-mesh seasonal limit, mesh below minimum without LOA, undersized fish, missing TED in protection area, or charter/rec violations under applicable state rules.',
        conservationEquivalency: true,
        dataAsOf: asOf
    };
}

function isSummerFlounder648Species(speciesId) {
    return SUMMERFLOUNDER648_SPECIES.has(speciesId);
}

/** Commercial limit by mesh and season. null = unlimited (large mesh). */
function getSummerFlounder648PossessionLimit(permitType, speciesData) {
    if (!permitType || permitType === 'recreational' || permitType === 'charter-headboat') {
        return {
            count: null,
            prohibited: false,
            unit: 'fish',
            notes: 'Federal recreational/charter limits waived — verify state measures.'
        };
    }

    if (permitType !== 'commercial') {
        return { count: null, prohibited: false, unit: 'lbs' };
    }

    const mesh = speciesData?.meshSize || speciesData?.meshSizeCompliance || speciesData?.['mesh-compliant'];
    const isLargeMesh = mesh === 'large-mesh' || mesh === 'large-mesh-compliant' || mesh === 'yes';
    if (isLargeMesh) {
        return { count: null, prohibited: false, unit: 'lbs', notes: 'Unlimited with compliant large mesh.' };
    }

    const date = speciesData?.dateOfCatch || speciesData?.dateOfLanding;
    const d = date ? new Date(date) : new Date();
    const month = d.getMonth() + 1;

    if (month >= 5 && month <= 10) {
        return { count: 100, prohibited: false, unit: 'lbs per trip', notes: 'Small mesh or below threshold — May 1–Oct 31.' };
    }
    return { count: 200, prohibited: false, unit: 'lbs per trip', notes: 'Small mesh or below threshold — Nov 1–Apr 30.' };
}

if (typeof window !== 'undefined') {
    window.SUMMERFLOUNDER648_SPECIES = SUMMERFLOUNDER648_SPECIES;
    window.SUMMERFLOUNDER648_SHARED_BULLETS = SUMMERFLOUNDER648_SHARED_BULLETS;
    window.getSummerFlounder648PolicyProfile = getSummerFlounder648PolicyProfile;
    window.getSummerFlounder648PossessionLimit = getSummerFlounder648PossessionLimit;
    window.isSummerFlounder648Species = isSummerFlounder648Species;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SUMMERFLOUNDER648_SPECIES,
        SUMMERFLOUNDER648_SHARED_BULLETS,
        getSummerFlounder648PolicyProfile,
        getSummerFlounder648PossessionLimit,
        isSummerFlounder648Species
    };
}
