/**
 * Tilefish (50 CFR 648 Subpart N) — selection-page policy summaries.
 */
const TILEFISH648_SPECIES = new Set(['golden-tilefish', 'blueline-tilefish']);

const TILEFISH648_SHARED_BULLETS = [
    'Open Access Commercial/Incidental — Golden: 500 lb or 50% by weight of all fish on board, whichever is less. Blueline: 500 lb/trip. Operator permit required; VMS not required.',
    'Charter/party and recreational — Golden: 8 fish per person. Blueline: charter 5, party 7, recreational 3 per person per trip. Captain and crew do not count toward person limits.',
    'Private recreational vessels targeting golden or blueline tilefish must obtain a federal private recreational tilefish vessel permit.',
    'No federal minimum size. Commercial: head and fins attached; may be gutted. Recreational golden tilefish: rod and reel only, maximum 5 hooks per rod.',
    'Discarding tilefish prohibited when fishing under an IFQ allocation permit.',
    'Blueline federal recreational season: May 15–November 14.',
    'Gear Restricted Areas (year-round): bottom-tending mobile gear prohibited in Lydonia, Norfolk, Oceanographer, and Veatch Canyons.',
    'Year-round closed areas may apply — verify charts.'
];

function getTilefish648PolicyProfile(speciesId) {
    if (!TILEFISH648_SPECIES.has(speciesId)) return null;

    const asOf = typeof REGULATION_META !== 'undefined' ? REGULATION_META.dataLastUpdated : null;
    const speciesLabel = speciesId === 'blueline-tilefish' ? 'Blueline tilefish' : 'Golden tilefish';

    return {
        level: 'complex',
        badgeLabel: 'Tilefish — complex',
        badgeClass: 'policy-complex',
        headline: `${speciesLabel} — commercial lb limits and recreational/charter bag limits vary by species and permit type.`,
        bullets: [...TILEFISH648_SHARED_BULLETS],
        complianceNote: 'Not compliant if over trip/bag limit, fishing tilefish GRAs with prohibited bottom gear, blueline outside rec season, IFQ discard, missing recreational tilefish permit, or non-compliant carcass condition.',
        dataAsOf: asOf
    };
}

function isTilefish648Species(speciesId) {
    return TILEFISH648_SPECIES.has(speciesId);
}

function getTilefish648PossessionLimit(speciesId, permitType, speciesData) {
    if (!permitType) {
        return { count: null, prohibited: false, unit: 'lbs' };
    }

    if (permitType === 'recreational' || permitType === 'charter-headboat' || permitType === 'party-headboat') {
        if (speciesId === 'golden-tilefish') {
            return { count: 8, prohibited: false, unit: 'fish per person', notes: 'Exclude captain and crew from person count.' };
        }
        if (speciesId === 'blueline-tilefish') {
            if (permitType === 'charter-headboat') {
                return { count: 5, prohibited: false, unit: 'fish per person per trip' };
            }
            if (permitType === 'party-headboat') {
                return { count: 7, prohibited: false, unit: 'fish per person per trip' };
            }
            return { count: 3, prohibited: false, unit: 'fish per person per trip', notes: 'Federal season May 15–Nov 14.' };
        }
    }

    if (permitType === 'commercial') {
        if (speciesId === 'blueline-tilefish') {
            return { count: 500, prohibited: false, unit: 'lbs per trip' };
        }
        const totalCatch = speciesData?.totalCatchWeightLb ?? speciesData?.totalCatchWeight
            ?? speciesData?.totalFishWeightLb;
        let count = 500;
        if (totalCatch != null && Number(totalCatch) > 0) {
            count = Math.min(500, Math.floor(Number(totalCatch) * 0.5));
        }
        return {
            count,
            prohibited: false,
            unit: 'lbs per trip',
            notes: 'Lesser of 500 lb or 50% by weight of all fish on board.'
        };
    }

    return { count: null, prohibited: false, unit: 'lbs' };
}

if (typeof window !== 'undefined') {
    window.TILEFISH648_SPECIES = TILEFISH648_SPECIES;
    window.TILEFISH648_SHARED_BULLETS = TILEFISH648_SHARED_BULLETS;
    window.getTilefish648PolicyProfile = getTilefish648PolicyProfile;
    window.getTilefish648PossessionLimit = getTilefish648PossessionLimit;
    window.isTilefish648Species = isTilefish648Species;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TILEFISH648_SPECIES,
        TILEFISH648_SHARED_BULLETS,
        getTilefish648PolicyProfile,
        getTilefish648PossessionLimit,
        isTilefish648Species
    };
}
