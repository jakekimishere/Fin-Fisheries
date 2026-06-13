/**

 * Mid-Atlantic Unmanaged Forage Species (50 CFR 648 Subpart P) — selection-page policy summaries.

 */

const FORAGE648_SPECIES = new Set([

    'atlantic-chub-mackerel',

    'anchovies',

    'argentines',

    'greeneyes',

    'halfbeaks',

    'lanternfishes',

    'pearlsides',

    'sand-lances',

    'silversides',

    'cusk-eels',

    'atlantic-saury',

    'pelagic-mollusks',

    'species-under-1inch',

    'copepod',

    'krill',

    'amphipods'

]);



const FORAGE648_BULLETS = [

    'Commercial: operator permit required; 1,700 lb/trip for all Mid-Atlantic forage species combined.',

    'Recreational: no federal possession limit.',

    'Species include Atlantic chub mackerel, anchovies, argentines, greeneyes, halfbeaks, herrings (excluding species managed elsewhere), lanternfishes, pearlsides, sand lances, silversides, cusk-eels, Atlantic saury, pelagic mollusks, and copepods/krill/amphipods and other species under 1″ as adults.',

    'Mid-Atlantic Forage Species Management Unit: NY through NC EEZ — verify chart coordinates.',

    'Transit: commercial vessel may transit the management unit with forage on board above the possession limit to land outside the unit if fish were harvested outside the unit and all gear is stowed and not available for immediate use.'

];



function getForage648PolicyProfile(speciesId) {

    if (!FORAGE648_SPECIES.has(speciesId)) return null;



    const asOf = typeof REGULATION_META !== 'undefined' ? REGULATION_META.dataLastUpdated : null;



    return {

        level: 'complex',

        badgeLabel: 'Forage — 648 Subpart P',

        badgeClass: 'policy-complex',

        headline: 'Mid-Atlantic unmanaged forage — commercial 1,700 lb/trip combined; operator permit required.',

        bullets: [...FORAGE648_BULLETS],

        complianceNote: 'Not compliant if commercial over 1,700 lb combined forage on board (without valid transit), missing operator permit, or gear available for use while transiting above limit.',

        dataAsOf: asOf

    };

}



function isForage648Species(speciesId) {

    return FORAGE648_SPECIES.has(speciesId);

}



function getForage648PossessionLimit(permitType, speciesData) {

    if (!permitType || permitType === 'recreational') {

        return { count: null, prohibited: false, unit: 'lbs', notes: 'No federal recreational possession limit.' };

    }



    if (permitType === 'commercial') {

        const transiting = speciesData?.forageTransiting === true || speciesData?.forageTransiting === 'yes' ||

            speciesData?.['forage-transiting'] === 'yes';

        if (transiting) {

            return { count: null, prohibited: false, unit: 'lbs', notes: 'Transit exemption — gear stowed; fish harvested outside management unit.' };

        }

        const combined = speciesData?.combinedForageLb ?? speciesData?.possessionAmount;

        return {

            count: 1700,

            prohibited: false,

            unit: 'lbs combined forage per trip',

            notes: '1,700 lb/trip all Mid-Atlantic forage species combined (50 CFR 648.94).'

        };

    }



    return { count: null, prohibited: false, unit: 'lbs' };

}



if (typeof window !== 'undefined') {

    window.getForage648PolicyProfile = getForage648PolicyProfile;

    window.getForage648PossessionLimit = getForage648PossessionLimit;

    window.isForage648Species = isForage648Species;

    window.FORAGE648_SPECIES = FORAGE648_SPECIES;

}



if (typeof module !== 'undefined' && module.exports) {

    module.exports = {

        getForage648PolicyProfile,

        getForage648PossessionLimit,

        isForage648Species,

        FORAGE648_SPECIES

    };

}
