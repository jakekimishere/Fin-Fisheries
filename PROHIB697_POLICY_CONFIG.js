/**

 * Striped bass, sturgeon, horseshoe crab, red drum, weakfish (50 CFR Part 697) — selection-page policy summaries.

 */

const PROHIB697_STRIPED_BASS = new Set(['striped-bass']);

const PROHIB697_STURGEON = new Set(['atlantic-sturgeon', 'shortnose-sturgeon']);

const PROHIB697_HORSESHOE = new Set(['atlantic-coast-horseshoe-crab']);

const PROHIB697_RED_DRUM = new Set(['red-drum']);

const PROHIB697_WEAKFISH = new Set(['weakfish']);

const PROHIB697_SPECIES = new Set([

    'striped-bass',

    'atlantic-sturgeon',

    'shortnose-sturgeon',

    'atlantic-coast-horseshoe-crab',

    'red-drum',

    'weakfish'

]);



const PROHIB697_STRIPED_BASS_BULLETS = [

    'Prohibited species in the EEZ — harvest and possession unlawful except in the Block Island Sound transit exemption.',

    'Transit exemption: EEZ within Block Island Sound, north of Montauk Light–Block Island Southeast Light and west of Point Judith Light–Block Island Southeast Light. Possession permitted only in continuous transit with no fishing from the vessel while in the EEZ.',

    'Outside the transit corridor, any Atlantic striped bass on board in the EEZ is not compliant — release immediately without further harm.',

    'State waters: striped bass is primarily managed by individual states — verify state of landing.'

];



const PROHIB697_STURGEON_BULLETS = [

    'Prohibited species in the EEZ — harvest and possession unlawful.',

    'Atlantic and shortnose sturgeon must be released immediately without further harm if caught in the EEZ.',

    'Also protected under the Endangered Species Act (50 CFR 223.102) — no retention at any size.',

    'Identification: Atlantic sturgeon — elongated head, mouth width less than 60% of head, ventral scales between anal fin and lateral scales. Shortnose sturgeon — shorter head, mouth width greater than 60% of head, no ventral scales between anal fin and lateral scales.'

];



const PROHIB697_HORSESHOE_BULLETS = [

    'Permits, VMS, possession limits, gear requirements, minimum size, and transfer at sea — not federally regulated under this chart.',

    'Closed area — Carl N. Shuster Jr. Horseshoe Crab Reserve (Delaware Bay region): prohibited to fish for horseshoe crabs.',

    'Prohibited to possess horseshoe crabs on a vessel with trawl or dredge gear within the closed area.',

    'Any horseshoe crabs caught within the closed area must be returned to the water immediately without further harm.'

];



const PROHIB697_RED_DRUM_BULLETS = [

    'Prohibited in the EEZ south of a line at 115° from true north from 40°29.6′ N, 73°54.1′ W (NJ/NY boundary at 3 nm) north to the South Atlantic/Gulf council demarcation — harvest and possession unlawful; release immediately.',

    'North of that prohibited zone in the EEZ: no federal permit required, no possession limit, no minimum size for allowed fisheries.',

    'Recreational fishing for Atlantic red drum in federal waters is prohibited.',

    'Identification: bronze-colored body, black spot near caudal fin, elongated body — aka redfish, channel bass, puppy drum.'

];



const PROHIB697_WEAKFISH_BULLETS = [

    'Permits, VMS, and operator permit — not regulated under this chart.',

    'Commercial possession limit: 150 lb. Recreational — unlimited federally.',

    'Minimum size: 12″ total length (commercial and recreational).',

    'Gear — trawl: ≥3¼″ square stretched mesh or ≥3¾″ diamond stretch mesh. Gillnet: ≥2⅞″ stretch mesh.',

    'Restricted gear area (Cape Hatteras to NC/SC line): possession of weakfish prohibited while fishing with shrimp trawls, flynet, or crab trawls.',

    'Identification: large mouth, two large fangs on upper jaw, no chin barbels — aka sea trout.'

];



function getProhib697PolicyProfile(speciesId) {

    if (!PROHIB697_SPECIES.has(speciesId)) return null;



    const asOf = typeof REGULATION_META !== 'undefined' ? REGULATION_META.dataLastUpdated : null;



    if (PROHIB697_STRIPED_BASS.has(speciesId)) {

        return {

            level: 'prohibited',

            badgeLabel: 'Striped bass — EEZ prohibited',

            badgeClass: 'policy-prohibited',

            headline: 'Atlantic striped bass — prohibited in the EEZ except Block Island Sound continuous transit.',

            bullets: [...PROHIB697_STRIPED_BASS_BULLETS],

            complianceNote: 'Not compliant if striped bass are on board in the EEZ outside the Block Island Sound transit corridor, if fishing from the vessel in the EEZ, or if not in continuous transit.',

            dataAsOf: asOf

        };

    }



    if (PROHIB697_STURGEON.has(speciesId)) {

        const isShort = speciesId === 'shortnose-sturgeon';

        return {

            level: 'prohibited',

            badgeLabel: 'Sturgeon — prohibited',

            badgeClass: 'policy-prohibited',

            headline: isShort

                ? 'Shortnose sturgeon — prohibited in the EEZ; ESA protection applies.'

                : 'Atlantic sturgeon — prohibited in the EEZ; ESA protection applies.',

            bullets: [...PROHIB697_STURGEON_BULLETS],

            complianceNote: 'Not compliant if any sturgeon are on board — release immediately. ESA and EEZ prohibitions both apply.',

            dataAsOf: asOf

        };

    }



    if (PROHIB697_HORSESHOE.has(speciesId)) {

        return {

            level: 'complex',

            badgeLabel: 'Horseshoe crab — area rules',

            badgeClass: 'policy-complex',

            headline: 'Atlantic horseshoe crab — Shuster Reserve closed; trawl/dredge possession rules in closed area.',

            bullets: [...PROHIB697_HORSESHOE_BULLETS],

            complianceNote: 'Not compliant if fishing in the Carl N. Shuster Jr. Reserve, possessing crabs on trawl/dredge vessels in the closed area, or failing to return crabs immediately.',

            dataAsOf: asOf

        };

    }



    if (PROHIB697_RED_DRUM.has(speciesId)) {

        return {

            level: 'complex',

            badgeLabel: 'Red drum — zone rules',

            badgeClass: 'policy-complex',

            headline: 'Atlantic red drum — prohibited in EEZ south of NJ/NY line; recreational prohibited in all federal waters.',

            bullets: [...PROHIB697_RED_DRUM_BULLETS],

            complianceNote: 'Not compliant if red drum harvested or possessed in the prohibited EEZ zone, if recreational catch in federal waters, or if not released immediately where required.',

            dataAsOf: asOf

        };

    }



    if (PROHIB697_WEAKFISH.has(speciesId)) {

        return {

            level: 'complex',

            badgeLabel: 'Weakfish — limits and gear',

            badgeClass: 'policy-complex',

            headline: 'Weakfish — commercial 150 lb; recreational unlimited; 12″ minimum; restricted gear area near Cape Hatteras.',

            bullets: [...PROHIB697_WEAKFISH_BULLETS],

            complianceNote: 'Not compliant if over 150 lb commercial, undersized, non-compliant mesh, or possessing weakfish while shrimp trawl/flynet/crab trawl fishing in the restricted gear area.',

            dataAsOf: asOf

        };

    }



    return null;

}



function isProhib697Species(speciesId) {

    return PROHIB697_SPECIES.has(speciesId);

}



function getProhib697PossessionLimit(speciesId, permitType, speciesData) {

    if (!permitType) {

        return { count: null, prohibited: false, unit: 'lbs' };

    }



    if (speciesId === 'weakfish') {

        if (permitType === 'commercial') {

            return { count: 150, prohibited: false, unit: 'lbs', notes: 'Commercial possession limit 150 lb (50 CFR 697.7).' };

        }

        if (permitType === 'recreational') {

            return { count: null, prohibited: false, unit: 'fish', notes: 'No federal recreational possession limit.' };

        }

    }



    if (speciesId === 'striped-bass') {

        const area = speciesData?.fishingArea || speciesData?.eezArea;

        if (area === 'block-island-transit') {

            return { count: null, prohibited: false, unit: 'fish', notes: 'Transit exemption — continuous transit, no fishing from vessel in EEZ.' };

        }

        if (area === 'eez' || area === 'federal-waters') {

            return { count: 0, prohibited: true, unit: 'fish', notes: 'Striped bass prohibited in EEZ outside Block Island Sound transit corridor.' };

        }

    }



    if (speciesId === 'red-drum') {

        if (permitType === 'recreational') {

            return { count: 0, prohibited: true, unit: 'fish', notes: 'Recreational red drum fishing prohibited in federal waters.' };

        }

        if (permitType === 'commercial') {

            const zone = speciesData?.fishingArea || speciesData?.eezZone;

            if (zone === 'prohibited-south') {

                return { count: 0, prohibited: true, unit: 'fish', notes: 'Red drum prohibited in EEZ south of NJ/NY line.' };

            }

            return { count: null, prohibited: false, unit: 'fish', notes: 'No federal possession limit north of prohibited zone.' };

        }

    }



    if (PROHIB697_STURGEON.has(speciesId)) {

        return { count: 0, prohibited: true, unit: 'fish', notes: 'Sturgeon prohibited — release immediately (50 CFR 697.7; ESA 223.102).' };

    }



    return { count: null, prohibited: false, unit: 'lbs' };

}



if (typeof window !== 'undefined') {

    window.getProhib697PolicyProfile = getProhib697PolicyProfile;

    window.getProhib697PossessionLimit = getProhib697PossessionLimit;

    window.isProhib697Species = isProhib697Species;

    window.PROHIB697_SPECIES = PROHIB697_SPECIES;

}



if (typeof module !== 'undefined' && module.exports) {

    module.exports = {

        getProhib697PolicyProfile,

        getProhib697PossessionLimit,

        isProhib697Species,

        PROHIB697_SPECIES

    };

}
