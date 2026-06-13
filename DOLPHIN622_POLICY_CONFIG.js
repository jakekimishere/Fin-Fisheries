/**

 * Atlantic Dolphin / Wahoo (50 CFR 622 Subpart M) — selection-page policy summaries.

 */

const DOLPHIN622_DOLPHIN = new Set(['mahi-mahi']);

const DOLPHIN622_WAHOO = new Set(['tigerfish']);

const DOLPHIN622_SPECIES = new Set(['mahi-mahi', 'tigerfish']);



const DOLPHIN622_SHARED_BULLETS = [

    'Atlantic Dolphin/Wahoo commercial permit and operator permit required for commercial fishing.',

    'Authorized gear: rod and reel (manual, electric, hydraulic), bandit gear, handline, spear (including powerheads), longline — longline prohibited in areas closed to HMS longline gear.',

    'Carcass condition: head and fins intact in the Atlantic EEZ; may be eviscerated, gilled, and scaled.',

    'Transfer at sea prohibited.'

];



const DOLPHIN622_DOLPHIN_BULLETS = [

    ...DOLPHIN622_SHARED_BULLETS,

    'Commercial: 500 lb/trip (may be gutted weight). North of 39° N without Dolphin/Wahoo endorsement: 200 lb/trip combined dolphin and wahoo; vessel must hold another valid federal fishing permit.',

    'Charter/headboat and recreational: 10 dolphin per person per day, not to exceed 54 per vessel per day (headboat: 10 per paying passenger).',

    'Minimum size: 20″ fork length.',

    'Identification: blunt head, body tapers to tail, long dorsal fin — aka mahi-mahi, dorado.'

];



const DOLPHIN622_WAHOO_BULLETS = [

    ...DOLPHIN622_SHARED_BULLETS,

    'Commercial: 500 lb/trip. North of 39° N without Dolphin/Wahoo endorsement: 200 lb/trip combined dolphin and wahoo; vessel must hold another valid federal fishing permit.',

    'Charter/headboat and recreational: 2 wahoo per person per day.',

    'No federal minimum size.',

    'Identification: long slender body, pointed snout — aka wahoo, ocean barracuda, tigerfish.'

];



function getDolphin622PolicyProfile(speciesId) {

    if (!DOLPHIN622_SPECIES.has(speciesId)) return null;



    const asOf = typeof REGULATION_META !== 'undefined' ? REGULATION_META.dataLastUpdated : null;

    const isWahoo = DOLPHIN622_WAHOO.has(speciesId);



    return {

        level: 'complex',

        badgeLabel: isWahoo ? 'Wahoo — limits' : 'Dolphin — limits',

        badgeClass: 'policy-complex',

        headline: isWahoo

            ? 'Wahoo — commercial 500 lb/trip; recreational 2/person; combined 200 lb north of 39° N without endorsement.'

            : 'Atlantic dolphin — commercial 500 lb/trip; recreational 10/person (54/vessel max); 20″ FL minimum.',

        bullets: [...(isWahoo ? DOLPHIN622_WAHOO_BULLETS : DOLPHIN622_DOLPHIN_BULLETS)],

        complianceNote: isWahoo

            ? 'Not compliant if over trip limit, north-of-39° N combined limit exceeded without endorsement, transfer at sea, or longline in closed HMS area.'

            : 'Not compliant if undersized, over trip or bag/vessel limit, north-of-39° N combined limit exceeded, transfer at sea, or non-compliant carcass condition.',

        dataAsOf: asOf

    };

}



function isDolphin622Species(speciesId) {

    return DOLPHIN622_SPECIES.has(speciesId);

}



function getDolphin622PossessionLimit(speciesId, permitType, speciesData) {

    if (!permitType) {

        return { count: null, prohibited: false, unit: 'lbs' };

    }



    const northOf39 = speciesData?.northOf39N === true || speciesData?.northOf39N === 'yes' ||

        speciesData?.['north-of-39n'] === 'yes';

    const hasEndorsement = speciesData?.dolphinWahooEndorsement === true || speciesData?.dolphinWahooEndorsement === 'yes' ||

        speciesData?.['dolphin-wahoo-endorsement'] === 'yes';

    const combinedLb = speciesData?.combinedDolphinWahooLb ?? speciesData?.combinedDolphinWahooWeight;



    if (permitType === 'commercial') {

        if (northOf39 && !hasEndorsement) {

            const combinedLimit = 200;

            if (combinedLb != null) {

                return { count: combinedLimit, prohibited: false, unit: 'lbs combined dolphin/wahoo', notes: 'North of 39° N without endorsement — 200 lb combined; valid FFP required.' };

            }

            return { count: combinedLimit, prohibited: false, unit: 'lbs combined dolphin/wahoo per trip', notes: 'North of 39° N without endorsement — verify combined weight with other species on board.' };

        }

        return { count: 500, prohibited: false, unit: 'lbs per trip', notes: '500 lb/trip per species (gutted weight permitted for dolphin).' };

    }



    if (permitType === 'recreational' || permitType === 'charter-headboat' || permitType === 'party-headboat') {

        if (speciesId === 'mahi-mahi') {

            const vesselCount = speciesData?.numberOfFish ?? speciesData?.possessionAmount;

            const perPerson = 10;

            return {

                count: perPerson,

                prohibited: false,

                unit: 'fish per person per day',

                vesselMax: 54,

                notes: 'Max 54 per vessel per day; headboat 10 per paying passenger.'

            };

        }

        if (speciesId === 'tigerfish') {

            return { count: 2, prohibited: false, unit: 'fish per person per day' };

        }

    }



    return { count: null, prohibited: false, unit: 'lbs' };

}



if (typeof window !== 'undefined') {

    window.getDolphin622PolicyProfile = getDolphin622PolicyProfile;

    window.getDolphin622PossessionLimit = getDolphin622PossessionLimit;

    window.isDolphin622Species = isDolphin622Species;

    window.DOLPHIN622_SPECIES = DOLPHIN622_SPECIES;

}



if (typeof module !== 'undefined' && module.exports) {

    module.exports = {

        getDolphin622PolicyProfile,

        getDolphin622PossessionLimit,

        isDolphin622Species,

        DOLPHIN622_SPECIES

    };

}
