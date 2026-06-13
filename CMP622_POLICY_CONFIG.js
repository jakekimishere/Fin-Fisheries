/**

 * Coastal Migratory Pelagics (50 CFR 622 Subpart Q) — selection-page policy summaries.

 */

const CMP622_KING = new Set(['king-mackerel']);

const CMP622_SPANISH = new Set(['spanish-mackerel']);

const CMP622_SPECIES = new Set(['king-mackerel', 'spanish-mackerel']);



const CMP622_SHARED_BULLETS = [

    'Transfer at sea prohibited.',

    'Charter/headboat (CMP): king mackerel 3 per person; Spanish mackerel 15 per person; cobia 2 per person up to 6 per vessel (cobia may be sold with valid CMP permit).',

    'Cobia (when applicable): 33″ fork length commercial; 36″ fork length recreational.'

];



function getCmp622PolicyProfile(speciesId) {

    if (!CMP622_SPECIES.has(speciesId)) return null;



    const asOf = typeof REGULATION_META !== 'undefined' ? REGULATION_META.dataLastUpdated : null;

    const isKing = CMP622_KING.has(speciesId);



    const bullets = isKing

        ? [

            'Limited Access — King Mackerel commercial permit: 3,500 lb/trip.',

            'Minimum size: 24″ fork length.',

            'Gear: automatic reel, bandit gear, handline, rod and reel, cast net, run-around gillnet (4.75″ mesh).',

            ...CMP622_SHARED_BULLETS

        ]

        : [

            'Open Access — Spanish Mackerel commercial permit: 3,500 lb/trip.',

            'Minimum size: 12″ fork length.',

            'Gear: automatic reel, bandit gear, handline, rod and reel, cast net, run-around gillnet (3.5″ mesh).',

            'Atlantic and Gulf migratory groups — verify zone (Northern/Southern Atlantic; Gulf).',

            ...CMP622_SHARED_BULLETS

        ];



    return {

        level: 'complex',

        badgeLabel: isKing ? 'King mackerel — CMP' : 'Spanish mackerel — CMP',

        badgeClass: 'policy-complex',

        headline: isKing

            ? 'King mackerel — commercial 3,500 lb/trip; recreational 3/person; 24″ FL minimum.'

            : 'Spanish mackerel — commercial 3,500 lb/trip; recreational 15/person; 12″ FL minimum.',

        bullets,

        complianceNote: isKing

            ? 'Not compliant if undersized, over 3,500 lb/trip commercial, over 3/person recreational, transfer at sea, or non-compliant gillnet mesh.'

            : 'Not compliant if undersized, over 3,500 lb/trip commercial, over 15/person recreational, transfer at sea, or non-compliant gillnet mesh.',

        dataAsOf: asOf

    };

}



function isCmp622Species(speciesId) {

    return CMP622_SPECIES.has(speciesId);

}



function getCmp622PossessionLimit(speciesId, permitType, speciesData) {

    if (!permitType) {

        return { count: null, prohibited: false, unit: 'lbs' };

    }



    if (permitType === 'commercial') {

        return { count: 3500, prohibited: false, unit: 'lbs per trip', notes: '3,500 lb/trip (50 CFR 622.382).' };

    }



    if (permitType === 'recreational' || permitType === 'charter-headboat' || permitType === 'party-headboat') {

        if (speciesId === 'king-mackerel') {

            return { count: 3, prohibited: false, unit: 'fish per person per day' };

        }

        if (speciesId === 'spanish-mackerel') {

            return { count: 15, prohibited: false, unit: 'fish per person per day' };

        }

    }



    return { count: null, prohibited: false, unit: 'lbs' };

}



if (typeof window !== 'undefined') {

    window.getCmp622PolicyProfile = getCmp622PolicyProfile;

    window.getCmp622PossessionLimit = getCmp622PossessionLimit;

    window.isCmp622Species = isCmp622Species;

    window.CMP622_SPECIES = CMP622_SPECIES;

}



if (typeof module !== 'undefined' && module.exports) {

    module.exports = {

        getCmp622PolicyProfile,

        getCmp622PossessionLimit,

        isCmp622Species,

        CMP622_SPECIES

    };

}
