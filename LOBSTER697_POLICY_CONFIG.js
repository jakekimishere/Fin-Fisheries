/**

 * American Lobster / Jonah Crab (50 CFR Part 697) — selection-page policy summaries.

 */

const LOBSTER697_LOBSTER_SPECIES = new Set(['american-lobster']);

const LOBSTER697_JONAH_SPECIES = new Set(['jonah-crab']);

const LOBSTER697_SPECIES = new Set(['american-lobster', 'jonah-crab']);



const LOBSTER697_LMA_MEASURES = {

    'area-1': { minIn: 3.25, maxIn: 5, vNotchTolerance: 'zero', trapLimit: 800, closedSeason: null },

    'area-2': { minIn: 3.375, maxIn: 5.25, vNotchTolerance: '1/8"', trapLimit: 800, closedSeason: null },

    'area-3': { minIn: 3.53125, maxIn: 6.75, vNotchTolerance: '1/8"', trapLimit: 1945, closedSeason: null },

    'area-4': { minIn: 3.375, maxIn: 5.25, vNotchTolerance: '1/8"', trapLimit: 1440, closedSeason: { months: [4, 5], note: 'Apr 30–May 31 (1-week gear grace)' } },

    'area-5': { minIn: 3.375, maxIn: 5.25, vNotchTolerance: '1/8"', trapLimit: 1440, closedSeason: { months: [2, 3], note: 'Feb 1–Mar 31 (gear removal/replacement grace)' } },

    'area-6': { minIn: 3.25, maxIn: 5.375, vNotchTolerance: '1/8"', trapLimit: null, closedSeason: null, notes: 'State waters only — verify state rules.' },

    'outer-cape': { minIn: 3.375, maxIn: 6.75, vNotchTolerance: '1/8"', trapLimit: 800, closedSeason: { months: [2, 3], note: 'Feb 1–Mar 31 (no grace period)' } }

};



const LOBSTER697_LOBSTER_BULLETS = [

    'Commercial non-trap: 100 lobsters/day; maximum 500 lobsters on trips of 5 days or more. Operator permit required.',

    'Charter/party non-trap: 6 lobsters per person; not for commercial sale, barter, or trade. Operator permit required.',

    'Commercial trap (Areas 1–6 and Outer Cape): unlimited possession; operator permit required. Trap limits and area measures apply.',

    'Recreational (no federal permit): up to 6 lobsters per person per day from a recreational vessel; not for sale, barter, or trade — verify state of landing.',

    'Prohibited: egg-bearing, scrubbed/bleached, v-notched (Area 1 zero tolerance), mutilated, transfer at sea, spearing. Possession of meat or parts other than whole lobsters prohibited before landing.',

    'Trap gear: escape vent and ghost panel in parlor; nearshore traps ≤22,950 in³, offshore ≤30,100 in³; trap tags/ID required. Prohibited to possess or fish another vessel’s trap gear. See ALWTRP trap/pot rules.',

    'Area measures vary by LMA — min/max carapace size, v-notch marking, closed seasons (Areas 4, 5, Outer Cape), escape vent sizes, and trap limits.',

    'Mobile Gear and Lobster Trap/Pot RGAs — seasonal closures to mobile gear or trap/pot gear (RGA I–IV).',

    'Emergency closure: Massachusetts Restricted Area MRA Wedge — Feb 1–Apr 30 remove all lobster/Jonah crab trap/pot gear; no reset during closure.'

];



const LOBSTER697_JONAH_BULLETS = [

    'Commercial non-trap (lobster permit): 1,000 Jonah crabs provided they do not exceed 50% by weight of all other catch. Operator permit required.',

    'Charter/party non-trap: 50 crabs per person; not for commercial sale, barter, or trade. Operator permit required.',

    'Commercial trap (lobster trap areas 1–6 and Outer Cape): unlimited possession; follow all American lobster trap/pot gear and management area rules.',

    'Recreational (no federal permit): up to 50 Jonah crabs per person per day; not for sale, barter, or trade — verify state of landing.',

    'Minimum size: 4.75″ carapace width in all areas. Egg-bearing Jonah crab prohibited.',

    'Trap/pot gear must follow American lobster trap/pot regulations including management areas. See ALWTRP.',

    'MRA Wedge emergency closure Feb 1–Apr 30 applies to Jonah crab trap/pot fishery.'

];



function getLobster697PolicyProfile(speciesId) {

    if (!LOBSTER697_SPECIES.has(speciesId)) return null;



    const asOf = typeof REGULATION_META !== 'undefined' ? REGULATION_META.dataLastUpdated : null;

    const isJonah = LOBSTER697_JONAH_SPECIES.has(speciesId);



    return {

        level: 'complex',

        badgeLabel: isJonah ? 'Jonah crab — complex' : 'Lobster — complex',

        badgeClass: 'policy-complex',

        headline: isJonah

            ? 'Jonah crab — limits tied to lobster permit type; 4.75″ minimum; egg-bearing prohibited.'

            : 'American lobster — permit type, LMA, trap limits, and gear rules determine compliance.',

        bullets: [...(isJonah ? LOBSTER697_JONAH_BULLETS : LOBSTER697_LOBSTER_BULLETS)],

        complianceNote: isJonah

            ? 'Not compliant if egg-bearing, undersized, over non-trap limit or 50% rule, wrong trap gear/area, or fishing during MRA Wedge closure.'

            : 'Not compliant if prohibited lobster (egg-bearing, v-notch, mutilated), over non-trap limits, wrong size for LMA, closed season, RGA violation, partial meat, other vessel’s traps, or MRA Wedge closure.',

        dataAsOf: asOf

    };

}



function isLobster697Species(speciesId) {

    return LOBSTER697_SPECIES.has(speciesId);

}



function getLobster697AreaMeasures(area) {

    return LOBSTER697_LMA_MEASURES[area] || null;

}



function getLobster697PossessionLimit(speciesId, permitType, speciesData) {

    if (!permitType) {

        return { count: null, prohibited: false, unit: 'lobsters' };

    }



    const tripDays = speciesData?.tripLengthDays ?? speciesData?.tripDays;

    const otherCatchWeight = speciesData?.otherCatchWeightLb ?? speciesData?.totalOtherCatchLb;



    if (speciesId === 'american-lobster') {

        if (permitType === 'commercial-trap' || permitType === 'commercial') {

            return { count: null, prohibited: false, unit: 'lobsters', notes: 'Unlimited for commercial trap — verify LMA trap limit and area measures.' };

        }

        if (permitType === 'commercial-non-trap') {

            let count = 100;

            if (tripDays != null && Number(tripDays) >= 5) {

                count = 500;

            }

            return { count, prohibited: false, unit: 'lobsters per trip/day', notes: (tripDays != null && Number(tripDays) >= 5) ? '500 max on trips ≥5 days' : '100 per calendar day' };

        }

        if (permitType === 'charter-party-non-trap' || permitType === 'charter-headboat') {

            return { count: 6, prohibited: false, unit: 'lobsters per person', notes: 'Not for sale, barter, or trade.' };

        }

        if (permitType === 'recreational') {

            return { count: 6, prohibited: false, unit: 'lobsters per person per day', notes: 'Verify state of landing.' };

        }

    }



    if (speciesId === 'jonah-crab') {

        if (permitType === 'commercial-trap' || permitType === 'commercial') {

            return { count: null, prohibited: false, unit: 'crabs', notes: 'Unlimited for commercial trap — follow lobster trap area rules.' };

        }

        if (permitType === 'commercial-non-trap') {

            return { count: 1000, prohibited: false, unit: 'crabs', notes: 'Must not exceed 50% by weight of all other catch on board.' };

        }

        if (permitType === 'charter-party-non-trap' || permitType === 'charter-headboat') {

            return { count: 50, prohibited: false, unit: 'crabs per person', notes: 'Not for sale, barter, or trade.' };

        }

        if (permitType === 'recreational') {

            return { count: 50, prohibited: false, unit: 'crabs per person per day', notes: 'Verify state of landing.' };

        }

    }



    return { count: null, prohibited: false, unit: speciesId === 'jonah-crab' ? 'crabs' : 'lobsters' };

}



if (typeof window !== 'undefined') {

    window.LOBSTER697_SPECIES = LOBSTER697_SPECIES;

    window.LOBSTER697_LMA_MEASURES = LOBSTER697_LMA_MEASURES;

    window.LOBSTER697_LOBSTER_BULLETS = LOBSTER697_LOBSTER_BULLETS;

    window.LOBSTER697_JONAH_BULLETS = LOBSTER697_JONAH_BULLETS;

    window.getLobster697PolicyProfile = getLobster697PolicyProfile;

    window.getLobster697PossessionLimit = getLobster697PossessionLimit;

    window.getLobster697AreaMeasures = getLobster697AreaMeasures;

    window.isLobster697Species = isLobster697Species;

}



if (typeof module !== 'undefined' && module.exports) {

    module.exports = {

        LOBSTER697_SPECIES,

        LOBSTER697_LMA_MEASURES,

        LOBSTER697_LOBSTER_BULLETS,

        LOBSTER697_JONAH_BULLETS,

        getLobster697PolicyProfile,

        getLobster697PossessionLimit,

        getLobster697AreaMeasures,

        isLobster697Species

    };

}


