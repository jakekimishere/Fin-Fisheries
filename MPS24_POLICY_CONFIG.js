/**

 * Marine Protected Species — Endangered Species Act (50 CFR Part 17) — selection-page policy summaries.

 */

const MPS24_ESA_SPECIES = new Set([

    'atlantic-sturgeon',

    'shortnose-sturgeon',

    'atlantic-salmon'

]);



const MPS24_ESA_BULLETS = [

    'Unlawful to import, export, take, possess, sell, deliver, carry, transport, or ship endangered species or their parts without authorization.',

    '"Take" includes harass, harm, pursue, hunt, shoot, wound, kill, trap, capture, or collect.',

    'Unlawful to violate regulations for protected species — e.g., Turtle Excluder Device (TED) requirements, critical habitat exclusion areas, minimum approach distances for North Atlantic right whales and humpback whales.',

    'ESA applies shoreward of 3 nm from the baseline and to U.S. persons and vessels wherever located (except in a foreign nation\'s territorial sea).',

    'Limited exceptions: valid scientific/enhancement/incidental take permits from Commerce or Interior; subsistence take by qualifying Alaskan Natives when not wasteful.'

];



function getMps24PolicyProfile(speciesId) {

    if (!MPS24_ESA_SPECIES.has(speciesId)) return null;



    const asOf = typeof REGULATION_META !== 'undefined' ? REGULATION_META.dataLastUpdated : null;

    const isSalmon = speciesId === 'atlantic-salmon';

    const isShort = speciesId === 'shortnose-sturgeon';



    return {

        level: 'prohibited',

        badgeLabel: 'ESA — marine protected',

        badgeClass: 'policy-prohibited',

        headline: isSalmon

            ? 'Atlantic salmon — ESA and EEZ retention rules apply; release required if taken incidentally.'

            : isShort

                ? 'Shortnose sturgeon — ESA endangered; no retention.'

                : 'Atlantic sturgeon — ESA threatened/endangered; no retention.',

        bullets: [...MPS24_ESA_BULLETS],

        complianceNote: 'Not compliant if any protected species retained, taken unlawfully, or if TED, critical habitat, or whale approach rules are violated.',

        dataAsOf: asOf

    };

}



function isMps24EsaSpecies(speciesId) {

    return MPS24_ESA_SPECIES.has(speciesId);

}



if (typeof window !== 'undefined') {

    window.getMps24PolicyProfile = getMps24PolicyProfile;

    window.isMps24EsaSpecies = isMps24EsaSpecies;

    window.MPS24_ESA_SPECIES = MPS24_ESA_SPECIES;

}



if (typeof module !== 'undefined' && module.exports) {

    module.exports = { getMps24PolicyProfile, isMps24EsaSpecies, MPS24_ESA_SPECIES };

}
