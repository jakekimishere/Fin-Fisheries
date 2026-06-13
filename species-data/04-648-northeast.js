// 648 Northeast species
// Auto-split from species-data.js — edit here for routine updates.

// Additional Northeast Fisheries Species
// Atlantic Salmon
SPECIES_DATA['atlantic-salmon'] = {
    name: 'Atlantic Salmon',
    commonName: 'Salmon',
    image: null,
    imagePath: 'images/fish/Atlantic_Salmon.webp',
    color: '#ff6b6b',
    prohibited: true,
    regulations: {
        dataSources: [
            {
                title: 'Atlantic Salmon — 50 CFR 648 Subpart C',
                url: 'https://www.ecfr.gov/current/title-50/chapter-VI/part-648/subpart-C',
                effective: '2026-05-21'
            }
        ],
        permits: {
            'commercial': {
                name: 'Atlantic Salmon Commercial Permit',
                required: true,
                cfr: '50 CFR 648.4',
                notes: 'Check for specific permit requirements'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: null
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial / EEZ',
                limit: { count: 0 },
                unit: 'fish',
                prohibited: true,
                cfr: '50 CFR 648.40',
                notes: 'Incidental catch must be released for maximum probability of survival.'
            },
            'recreational': {
                name: 'Recreational / EEZ',
                limit: { count: 0 },
                unit: 'fish',
                prohibited: true,
                cfr: '50 CFR 648.40',
                notes: 'Possession in federal waters prohibited except fish being sorted on deck. Verify state-waters harvest if applicable.'
            }
        },
        size: {
            minimum: null,
            unit: 'n/a',
            cfr: '50 CFR 648.40',
            notes: 'No retention in EEZ — size not applicable for possessed salmon.'
        },
        seasons: {
            federal: {
                open: 'EEZ possession prohibited',
                cfr: '50 CFR 648.40',
                notes: 'Directed or retained Atlantic salmon in the EEZ is prohibited.'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Atlantic Salmon Commercial Permit', description: 'Commercial fishing permit' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational fishing' }
                ],
                cfr: '50 CFR 648.4'
            },
            possessionAmount: {
                question: 'How many Atlantic salmon are on board?',
                field: 'numberOfFish',
                required: true,
                type: 'number',
                unit: 'fish',
                dependsOn: ['permitType'],
                notes: 'Any salmon on board in the EEZ is a presumptive violation unless rebutted (state waters, aquaculture, etc.).',
                cfr: '50 CFR 648.40',
                violation: {
                    ifProhibited: 'VIOLATION: Atlantic salmon possession prohibited in EEZ (50 CFR 648.40)'
                }
            },
            possessionLimitCheck: {
                question: 'Retention check (auto)',
                field: 'exceedsLimit',
                type: 'auto',
                dependsOn: ['permitType', 'numberOfFish'],
                autoCheck: true,
                limits: {
                    commercial: { count: 0, prohibited: true },
                    recreational: { count: 0, prohibited: true }
                },
                violation: {
                    ifProhibited: 'VIOLATION: Atlantic salmon possession prohibited in EEZ (50 CFR 648.40)'
                },
                cfr: '50 CFR 648.40'
            },
            stateRegulations: {
                question: 'Have state regulations been checked?',
                field: 'stateRegulationsChecked',
                required: true,
                type: 'boolean',
                notes: 'EEZ possession prohibited (50 CFR 648.40). If fish are from state waters or aquaculture, document source to rebut presumption.',
                cfr: '50 CFR 648.4'
            },
            reportingStatus: {
                question: 'Has the catch been reported?',
                field: 'reported',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Commercial catch must be reported as required',
                violation: {
                    ifFalse: 'VIOLATION: Commercial catch reporting required (50 CFR 648.7)'
                },
                cfr: '50 CFR 648.7'
            }
        }
    }
};

// Surf Clam
SPECIES_DATA['surf-clam'] = {
    name: 'Surf Clam',
    commonName: 'Surf Clam',
    image: null,
    imagePath: 'images/fish/Surf_Clam.webp',
    color: '#ffd93d',
    regulations: {
        permits: {
            'commercial': {
                name: 'Surf Clam/Ocean Quahog Commercial Permit',
                required: true,
                cfr: '50 CFR 648.4',
                notes: 'Includes surf clam, ocean quahog, and Maine mahogany quahog (north of 43°50′ N). VMS and operator permit required.'
            },
            'commercial-maine-mahogany': {
                name: 'Maine Mahogany Quahog Commercial',
                required: true,
                cfr: '50 CFR 648.4',
                notes: 'Harvest north of 43°50′ N only.'
            },
            'recreational': {
                name: 'Recreational Surf Clam/Ocean Quahog',
                required: false,
                cfr: '50 CFR 648 Subpart E'
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial',
                limit: null,
                unit: 'bushels per trip',
                cfr: '50 CFR 648.70',
                notes: 'Unlimited per trip when fishery open (subject to quota closure).'
            },
            'commercial-maine-mahogany': {
                name: 'Maine Mahogany Quahog Commercial',
                limit: null,
                unit: 'bushels per trip',
                cfr: '50 CFR 648.70',
                notes: 'Unlimited per trip when fishery open; north of 43°50′ N.'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 2, unit: 'bushels' },
                cfr: '50 CFR 648 Subpart E',
                notes: '2 bushels federally; closed areas still apply.'
            }
        },
        size: {
            minimum: null,
            unit: null,
            cfr: '50 CFR 648.70',
            notes: 'No federal minimum size for surf clam.'
        },
        gear: {
            'dredge': {
                name: 'Hydraulic Dredge',
                cfr: '50 CFR 648.70',
                notes: 'Hydraulic dredge gear authorized'
            }
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 648.70',
                notes: 'Subject to quota closures'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Surf Clam/Ocean Quahog Commercial Permit', description: 'VMS and operator permit required' },
                    { value: 'commercial-maine-mahogany', label: 'Maine Mahogany Quahog', description: 'North of 43°50′ N' },
                    { value: 'recreational', label: 'Recreational', description: '2 bushels; no VMS or operator permit' }
                ],
                cfr: '50 CFR 648.4'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: 'bushels',
                dependsOn: ['permitType'],
                notes: 'Record total amount in bushels',
                cfr: '50 CFR 648.70'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit or quota?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                limits: {
                    'commercial': null,
                    'commercial-maine-mahogany': null,
                    'recreational': { count: 2, unit: 'bushels' }
                },
                notes: 'Commercial: unlimited per trip when fishery open. Recreational: 2 bushels (closed areas still apply).',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds permit limit or quota (50 CFR 648.70)'
                },
                cfr: '50 CFR 648.70'
            },
            sizeCompliance: {
                question: 'Is there a size compliance issue?',
                field: 'shellLength',
                required: false,
                type: 'boolean',
                notes: 'No federal minimum size for surf clam.',
                cfr: '50 CFR 648.70'
            },
            gearType: {
                question: 'What gear is being used?',
                field: 'gearType',
                required: true,
                type: 'choice',
                dependsOn: ['permitType'],
                options: [
                    { value: 'dredge', label: 'Hydraulic Dredge', notes: 'Hydraulic dredge gear authorized' }
                ],
                cfr: '50 CFR 648.70'
            },
            quotaStatus: {
                question: 'Is the fishery open or closed due to quota?',
                field: 'quotaStatus',
                required: false,
                type: 'auto',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial', 'commercial-maine-mahogany'],
                autoCheck: true,
                notes: 'Check current quota status - fishery may close when quota is reached',
                cfr: '50 CFR 648.70'
            },
            reportingStatus: {
                question: 'Has the catch been reported?',
                field: 'reported',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Commercial catch must be reported as required',
                violation: {
                    ifFalse: 'VIOLATION: Commercial catch reporting required (50 CFR 648.7)'
                },
                cfr: '50 CFR 648.7'
            }
        }
    }
};

// Ocean Quahog
SPECIES_DATA['ocean-quahog'] = {
    name: 'Ocean Quahog',
    commonName: 'Quahog',
    image: null,
    imagePath: 'images/fish/Ocean_Quahog.webp',
    color: '#ffd93d',
    regulations: {
        permits: {
            'commercial': {
                name: 'Surf Clam/Ocean Quahog Commercial Permit',
                required: true,
                cfr: '50 CFR 648.4',
                notes: 'Includes surf clam, ocean quahog, and Maine mahogany quahog (north of 43°50′ N). VMS and operator permit required.'
            },
            'commercial-maine-mahogany': {
                name: 'Maine Mahogany Quahog Commercial',
                required: true,
                cfr: '50 CFR 648.4',
                notes: 'Harvest north of 43°50′ N only.'
            },
            'recreational': {
                name: 'Recreational Surf Clam/Ocean Quahog',
                required: false,
                cfr: '50 CFR 648 Subpart E'
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial',
                limit: null,
                unit: 'bushels per trip',
                cfr: '50 CFR 648.70',
                notes: 'Unlimited per trip when fishery open (subject to quota closure).'
            },
            'commercial-maine-mahogany': {
                name: 'Maine Mahogany Quahog Commercial',
                limit: null,
                unit: 'bushels per trip',
                cfr: '50 CFR 648.70',
                notes: 'Unlimited per trip when fishery open; north of 43°50′ N.'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 2, unit: 'bushels' },
                cfr: '50 CFR 648 Subpart E',
                notes: '2 bushels federally; closed areas still apply.'
            }
        },
        size: {
            minimum: null,
            unit: null,
            cfr: '50 CFR 648.70',
            notes: 'No federal minimum size for ocean quahog.'
        },
        gear: {
            'dredge': {
                name: 'Hydraulic Dredge',
                cfr: '50 CFR 648.70',
                notes: 'Hydraulic dredge gear authorized'
            }
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 648.70',
                notes: 'Subject to quota closures'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Surf Clam/Ocean Quahog Commercial Permit', description: 'VMS and operator permit required' },
                    { value: 'commercial-maine-mahogany', label: 'Maine Mahogany Quahog', description: 'North of 43°50′ N' },
                    { value: 'recreational', label: 'Recreational', description: '2 bushels; no VMS or operator permit' }
                ],
                cfr: '50 CFR 648.4'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: 'bushels',
                dependsOn: ['permitType'],
                notes: 'Record total amount in bushels',
                cfr: '50 CFR 648.70'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit or quota?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                limits: {
                    'commercial': null,
                    'commercial-maine-mahogany': null,
                    'recreational': { count: 2, unit: 'bushels' }
                },
                notes: 'Commercial: unlimited per trip when fishery open. Recreational: 2 bushels (closed areas still apply).',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds permit limit or quota (50 CFR 648.70)'
                },
                cfr: '50 CFR 648.70'
            },
            sizeCompliance: {
                question: 'Is there a size compliance issue?',
                field: 'shellWidth',
                required: false,
                type: 'boolean',
                notes: 'No federal minimum size for ocean quahog.',
                cfr: '50 CFR 648.70'
            },
            gearType: {
                question: 'What gear is being used?',
                field: 'gearType',
                required: true,
                type: 'choice',
                dependsOn: ['permitType'],
                options: [
                    { value: 'dredge', label: 'Hydraulic Dredge', notes: 'Hydraulic dredge gear authorized' }
                ],
                cfr: '50 CFR 648.70'
            },
            quotaStatus: {
                question: 'Is the fishery open or closed due to quota?',
                field: 'quotaStatus',
                required: false,
                type: 'auto',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial', 'commercial-maine-mahogany'],
                autoCheck: true,
                notes: 'Check current quota status - fishery may close when quota is reached',
                cfr: '50 CFR 648.70'
            },
            reportingStatus: {
                question: 'Has the catch been reported?',
                field: 'reported',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Commercial catch must be reported as required',
                violation: {
                    ifFalse: 'VIOLATION: Commercial catch reporting required (50 CFR 648.7)'
                },
                cfr: '50 CFR 648.7'
            }
        }
    }
};

// Atlantic Herring
SPECIES_DATA['atlantic-herring'] = {
    name: 'Atlantic Herring',
    commonName: 'Herring',
    image: null,
    imagePath: 'images/fish/Atlantic_Herring.webp',
    color: '#95e1d3',
    regulations: {
        permits: {
            'herring-cat-a': {
                name: 'Category A — Limited Access (All Areas)',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'herring-cat-b': {
                name: 'Category B — Limited Access (Areas 2 & 3)',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'herring-cat-c': {
                name: 'Category C — Limited Access (Incidental)',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'herring-cat-d': {
                name: 'Category D — Open Access',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'herring-cat-e': {
                name: 'Category E — Open Access (Areas 2 & 3)',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'commercial': {
                name: 'Atlantic Herring Commercial Permit (unspecified category)',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: null
            }
        },
        possession: {
            'herring-cat-a': {
                name: 'Category A',
                limit: null,
                unit: 'lbs',
                cfr: '50 CFR 648.201',
                notes: 'Unlimited — verify area-specific adjustments (Areas 1B/3 may be 2,000 lb/trip/day).'
            },
            'herring-cat-b': {
                name: 'Category B',
                limit: null,
                unit: 'lbs',
                cfr: '50 CFR 648.201',
                notes: 'Unlimited in Areas 2–3 — verify bulletin.'
            },
            'herring-cat-c': {
                name: 'Category C Incidental',
                limit: { count: 55000, unit: 'lbs per trip/day' },
                cfr: '50 CFR 648.201',
                notes: '55,000 lb/trip/day — area adjustments may be more restrictive.'
            },
            'herring-cat-d': {
                name: 'Category D Open Access',
                limit: { count: 6600, unit: 'lbs per trip/day' },
                cfr: '50 CFR 648.201'
            },
            'herring-cat-e': {
                name: 'Category E Open Access (Areas 2 & 3)',
                limit: { count: 20000, unit: 'lbs per trip/day' },
                cfr: '50 CFR 648.201'
            },
            'commercial': {
                name: 'Commercial',
                limit: null,
                unit: 'lbs',
                cfr: '50 CFR 648.201',
                notes: 'Select permit category for accurate limits. Area 1B/1A: 2,000 lb/trip/day when adjustment active.'
            },
            'recreational': {
                name: 'Recreational',
                limit: null,
                unit: 'lbs',
                cfr: null,
                notes: 'No federal recreational herring limit — verify state measures.'
            }
        },
        size: {
            minimum: null,
            unit: 'n/a',
            cfr: '50 CFR 648.200',
            notes: 'No federal minimum size for Atlantic herring.'
        },
        gear: {
            'midwater-trawl': {
                name: 'Midwater Trawl',
                cfr: '50 CFR 648.201',
                notes: 'No minimum mesh; LOA required. Prohibited in Area 1A Jun 1–Sep 30.'
            },
            'purse-seine': {
                name: 'Purse Seine',
                cfr: '50 CFR 648.201',
                notes: 'LOA required on board.'
            },
            'pelagic-gillnet': {
                name: 'Single Pelagic Gillnet',
                cfr: '50 CFR 648.201',
                notes: 'Maximum 3″ mesh — herring as bait only.'
            },
            'bottom-trawl': {
                name: 'Bottom Trawl',
                cfr: '50 CFR 648.201',
                notes: 'See small-mesh exemption areas for additional rules.'
            }
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 648.200',
                notes: 'Subject to quota closures'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'herring-cat-a', label: 'Category A — Limited Access (All Areas)', description: 'Unlimited; VMS and operator permit required' },
                    { value: 'herring-cat-b', label: 'Category B — Limited Access (Areas 2 & 3)', description: 'Unlimited in Areas 2–3; VMS and operator permit required' },
                    { value: 'herring-cat-c', label: 'Category C — Limited Access (Incidental)', description: '55,000 lb/trip/day' },
                    { value: 'herring-cat-d', label: 'Category D — Open Access', description: '6,600 lb/trip/day; no VMS/operator permit' },
                    { value: 'herring-cat-e', label: 'Category E — Open Access (Areas 2 & 3)', description: '20,000 lb/trip/day; VMS and operator permit required' },
                    { value: 'commercial', label: 'Atlantic Herring Commercial (unspecified category)', description: 'Select category for accurate limits' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational fishing' }
                ],
                cfr: '50 CFR 648.4'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: 'lbs',
                dependsOn: ['permitType'],
                notes: 'Record total weight in pounds',
                cfr: '50 CFR 648.200'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit or quota?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                limits: {
                    'herring-cat-a': null,
                    'herring-cat-b': null,
                    'herring-cat-c': { count: 55000, unit: 'lbs per trip/day' },
                    'herring-cat-d': { count: 6600, unit: 'lbs per trip/day' },
                    'herring-cat-e': { count: 20000, unit: 'lbs per trip/day' },
                    'commercial': null,
                    'recreational': null
                },
                notes: 'Category limits; Areas 1B/3 may be 2,000 lb/trip/day when adjustment active. Area 1A closed to directed fishery.',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds permit limit or quota (50 CFR 648.200)'
                },
                cfr: '50 CFR 648.200'
            },
            fishingArea: {
                question: 'What area was the vessel fishing in?',
                field: 'fishingArea',
                required: true,
                type: 'choice',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial', 'herring-cat-a', 'herring-cat-b', 'herring-cat-c', 'herring-cat-d', 'herring-cat-e'],
                options: [
                    { value: 'area-1a', label: 'Area 1A', notes: 'CLOSED to directed Atlantic herring fishery — transit with gear stowed only' },
                    { value: 'area-1b', label: 'Area 1B', notes: '2,000 lb/trip/day effective Jan 9, 2026 per NOAA bulletin' },
                    { value: 'area-2', label: 'Area 2', notes: 'Area 2 specific limits apply' },
                    { value: 'area-3', label: 'Area 3', notes: '2,000 lb/trip/day when adjustment active' },
                    { value: 'closed-area', label: 'Closed Area', violation: true, notes: 'VIOLATION: Fishing prohibited in closed areas' }
                ],
                violation: {
                    ifValue: 'closed-area',
                    message: 'VIOLATION: Fishing prohibited in closed areas (50 CFR 648.200)'
                },
                cfr: '50 CFR 648.200'
            },
            gearType: {
                question: 'What gear is being used?',
                field: 'gearType',
                required: true,
                type: 'choice',
                dependsOn: ['permitType'],
                options: [
                    { value: 'midwater-trawl', label: 'Midwater Trawl', notes: 'LOA required; prohibited in Area 1A Jun 1–Sep 30' },
                    { value: 'purse-seine', label: 'Purse Seine', notes: 'LOA required on board' },
                    { value: 'pelagic-gillnet', label: 'Single Pelagic Gillnet', notes: 'Max 3″ mesh — herring as bait only' },
                    { value: 'bottom-trawl', label: 'Bottom Trawl', notes: 'See small-mesh exemption areas' },
                    { value: 'rod-reel', label: 'Rod and Reel', notes: 'Recreational gear' }
                ],
                cfr: '50 CFR 648.200'
            },
            quotaStatus: {
                question: 'Is the fishery open or closed due to quota?',
                field: 'quotaStatus',
                required: false,
                type: 'auto',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                autoCheck: true,
                notes: 'Auto: verify NOAA/ASMFC bulletin — fishery closes at quota.',
                quotaClosedViolation: 'VIOLATION: Atlantic herring commercial fishery closed due to quota (50 CFR 648.200)',
                cfr: '50 CFR 648.200'
            },
            reportingStatus: {
                question: 'Has the catch been reported?',
                field: 'reported',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Commercial catch must be reported as required',
                violation: {
                    ifFalse: 'VIOLATION: Commercial catch reporting required (50 CFR 648.7)'
                },
                cfr: '50 CFR 648.7'
            }
        }
    }
};

// Skate (General - Complex Skate)
SPECIES_DATA['skate'] = {
    name: 'Skate',
    commonName: 'Skate',
    image: null,
    imagePath: 'images/fish/Skate.webp',
    color: '#a8dadc',
    regulations: {
        permits: {
            'commercial': {
                name: 'Open Access — General',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: null
            }
        },
        possession: {
            'commercial': {
                name: 'Open Access — General',
                limit: null,
                unit: 'lbs',
                cfr: '50 CFR 648.322',
                notes: 'Trip limits vary by DAS type and season — see chart (wings or whole).'
            },
            'recreational': {
                name: 'Recreational',
                limit: null,
                unit: 'fish',
                cfr: null,
                notes: 'No federal recreational skate limit — verify state measures.'
            }
        },
        size: {
            minimum: null,
            unit: 'n/a',
            cfr: '50 CFR 648.320',
            notes: 'No federal minimum size under skate wing fishery; species-specific rules may apply.'
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 648.320',
                notes: 'Subject to quota closures'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Open Access — General', description: 'Skate commercial permit' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Unlimited federally — verify state rules' }
                ],
                cfr: '50 CFR 648.4'
            },
            dasTripType: {
                question: 'What DAS/trip type applies?',
                field: 'dasTripType',
                required: false,
                type: 'choice',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                options: [
                    { value: 'nms-a-scallop-monkfish', label: 'NMS A, scallop, or monkfish DAS', notes: '4,000/6,000 lb wings by season' },
                    { value: 'nms-b', label: 'NMS B DAS', notes: '275 lb wings / 625 lb whole' },
                    { value: 'non-das', label: 'Non-DAS', notes: '625 lb wings / 1,419 lb whole' },
                    { value: 'skate-bait-loa', label: 'Skate bait LOA', notes: '25,000 lb whole; min 23″; LOA required' }
                ],
                cfr: '50 CFR 648.322'
            },
            skateProductForm: {
                question: 'Skate product form on board?',
                field: 'skateProductForm',
                required: false,
                type: 'choice',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                options: [
                    { value: 'wings', label: 'Skate wings (carcasses may be separate)' },
                    { value: 'whole', label: 'Whole skates' }
                ],
                cfr: '50 CFR 648.322'
            },
            skateSpecies: {
                question: 'What species of skate is on board?',
                field: 'skateSpecies',
                required: true,
                type: 'choice',
                notes: 'Skate retention limits vary by species. Check species-specific regulations.',
                cfr: '50 CFR 648.320'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: 'lbs',
                dependsOn: ['permitType'],
                notes: 'Record total weight in pounds',
                cfr: '50 CFR 648.320'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit or quota?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount', 'skateSpecies'],
                autoCheck: true,
                limits: {
                    'commercial': null, // Subject to quota and trip limits - varies by skate species
                    'recreational': null // Check state regulations
                },
                notes: 'Commercial limits subject to quota and trip limits - check current regulations and species-specific limits. Recreational: Check state regulations.',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds permit limit or quota (50 CFR 648.320)'
                },
                cfr: '50 CFR 648.320'
            },
            sizeCompliance: {
                question: 'What is the size of the skate?',
                field: 'skateSize',
                required: false,
                type: 'number',
                unit: 'inches',
                dependsOn: ['skateSpecies'],
                notes: 'Size requirements vary by skate species. Check species-specific size requirements.',
                cfr: '50 CFR 648.322'
            },
            operatorPermit: {
                question: 'Does the operator hold a valid federal operator permit?',
                field: 'operatorPermit',
                required: false,
                type: 'choice',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                violation: {
                    ifFalse: 'VIOLATION: Commercial skate fishing requires valid operator permit (50 CFR 648.4)'
                },
                cfr: '50 CFR 648.4'
            },
            quotaStatus: {
                question: 'Is the fishery open or closed due to quota?',
                field: 'quotaStatus',
                required: false,
                type: 'auto',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                autoCheck: true,
                notes: 'Quota trigger may reduce wing limit to 500 lb — verify NOAA bulletin.',
                cfr: '50 CFR 648.322'
            },
            reportingStatus: {
                question: 'Has the catch been reported?',
                field: 'reported',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Commercial catch must be reported as required',
                violation: {
                    ifFalse: 'VIOLATION: Commercial catch reporting required (50 CFR 648.7)'
                },
                cfr: '50 CFR 648.7'
            }
        }
    }
};

// Silver Hake
SPECIES_DATA['silver-hake'] = {
    name: 'Silver Hake',
    commonName: 'Whiting',
    image: null,
    imagePath: 'images/fish/Silver_Hake.webp',
    color: '#c7d2fe',
    regulations: {
        permits: {
            'commercial': {
                name: 'Northeast Multispecies Commercial Permit',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: null
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial',
                limit: null,
                unit: 'lbs',
                cfr: '50 CFR 648.86',
                notes: 'Combined silver/offshore hake: 15,000 lb (<3" mesh) or 30,000/40,000 lb (≥3" mesh by exemption area) per 50 CFR 648.86(d).'
            },
            'recreational': {
                name: 'Recreational',
                limit: null,
                unit: 'fish',
                cfr: null,
                notes: 'No federal recreational limit — verify state measures.'
            }
        },
        size: {
            minimum: null,
            unit: 'n/a',
            cfr: '50 CFR 648.86',
            notes: 'No federal minimum size for silver hake (whiting).'
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Northeast Multispecies Commercial Permit', description: 'Commercial fishing permit' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational fishing' }
                ],
                cfr: '50 CFR 648.4'
            },
            meshSize: {
                question: 'What is the mesh size of nets on board?',
                field: 'meshSize',
                required: false,
                type: 'choice',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                options: [
                    { value: 'mesh-under-3', label: 'Less than 3 inches', notes: '15,000 lb combined silver/offshore hake limit' },
                    { value: 'mesh-3-plus-gom-gb', label: '3 inches or greater (GOM/GB exemption area)', notes: '30,000 lb limit' },
                    { value: 'mesh-3-plus-sne-ma', label: '3 inches or greater (SNE/MA exemption area)', notes: '40,000 lb limit' }
                ],
                cfr: '50 CFR 648.86'
            },
            exemptionArea: {
                question: 'Which exemption area applies (if mesh ≥3")?',
                field: 'exemptionArea',
                required: false,
                type: 'choice',
                dependsOn: ['meshSize'],
                options: [
                    { value: 'gom-gb', label: 'GOM or GB Exemption Area' },
                    { value: 'sne-ma', label: 'SNE or MA Exemption Area' }
                ],
                cfr: '50 CFR 648.80'
            },
            possessionAmount: {
                question: 'What is the possession amount on board (lbs)?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: 'lbs',
                dependsOn: ['permitType'],
                notes: 'Combined silver hake and offshore hake weight in pounds',
                cfr: '50 CFR 648.86'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit or quota?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount', 'meshSize', 'exemptionArea'],
                autoCheck: true,
                limits: {
                    'commercial': null,
                    'recreational': null
                },
                notes: 'Commercial trip limits per mesh size and exemption area (50 CFR 648.86(d)).',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds permit limit or quota (50 CFR 648.86)'
                },
                cfr: '50 CFR 648.86'
            },
            quotaStatus: {
                question: 'Is the fishery open or closed due to quota?',
                field: 'quotaStatus',
                required: false,
                type: 'auto',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                autoCheck: true,
                notes: 'In-season reduction may lower limits to 2,000 lb combined — verify NOAA bulletin.',
                cfr: '50 CFR 648.86'
            },
            reportingStatus: {
                question: 'Has the catch been reported?',
                field: 'reported',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Commercial catch must be reported as required',
                violation: {
                    ifFalse: 'VIOLATION: Commercial catch reporting required (50 CFR 648.7)'
                },
                cfr: '50 CFR 648.7'
            }
        }
    }
};

// Longhorn Sculpin
SPECIES_DATA['longhorn-sculpin'] = {
    name: 'Longhorn Sculpin',
    commonName: 'Sculpin',
    image: null,
    imagePath: 'images/fish/Longhorn_Sculpin.webp',
    color: '#b8b8ff',
    regulations: {
        permits: {
            'commercial': {
                name: 'Northeast Multispecies Commercial Permit',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: null
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial',
                limit: null,
                unit: 'lbs',
                cfr: '50 CFR 648.86',
                notes: 'No federal common-pool trip limit listed for longhorn sculpin — verify sector/state rules.'
            },
            'recreational': {
                name: 'Recreational',
                limit: null,
                unit: 'fish',
                cfr: null,
                notes: 'No federal recreational limit — verify state measures.'
            }
        },
        size: {
            minimum: null,
            unit: 'n/a',
            cfr: null,
            notes: 'No federal minimum size for longhorn sculpin.'
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Northeast Multispecies Commercial Permit', description: 'Commercial fishing permit' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational fishing' }
                ],
                cfr: '50 CFR 648.4'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: 'lbs',
                dependsOn: ['permitType'],
                notes: 'Record total weight in pounds',
                cfr: '50 CFR 648.86'
            },
            stateRegulations: {
                question: 'Have state regulations been checked?',
                field: 'stateRegulationsChecked',
                required: true,
                type: 'boolean',
                notes: 'No federal trip or size limit — verify state and sector rules.',
                cfr: null
            },
            reportingStatus: {
                question: 'Has the catch been reported?',
                field: 'reported',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Commercial catch must be reported as required',
                violation: {
                    ifFalse: 'VIOLATION: Commercial catch reporting required (50 CFR 648.7)'
                },
                cfr: '50 CFR 648.7'
            }
        }
    }
};

// Atlantic Deep Sea Red Crab
SPECIES_DATA['atlantic-deep-sea-red-crab'] = {
    name: 'Atlantic Deep Sea Red Crab',
    commonName: 'Red Crab',
    image: null,
    imagePath: 'images/fish/Atlantic_Deep_Sea_Red_Crab.webp',
    color: '#ff6b6b',
    regulations: {
        permits: {
            'red-crab-cat-b': {
                name: 'Limited Access — Category B',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'red-crab-cat-c': {
                name: 'Limited Access — Category C',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'red-crab-open-incidental': {
                name: 'Open Access — Incidental',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'commercial': {
                name: 'Deep Sea Red Crab Commercial Permit (unspecified category)',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: null
            }
        },
        possession: {
            'red-crab-cat-b': {
                name: 'Category B',
                limit: null,
                unit: 'lbs',
                cfr: '50 CFR 648.260',
                notes: 'Unlimited possession on dedicated red crab trip.'
            },
            'red-crab-cat-c': {
                name: 'Category C',
                limit: null,
                unit: 'lbs',
                cfr: '50 CFR 648.260',
                notes: 'Unlimited possession on dedicated red crab trip.'
            },
            'red-crab-open-incidental': {
                name: 'Open Access Incidental',
                limit: { count: 500, unit: 'lbs per trip' },
                cfr: '50 CFR 648.260'
            },
            'commercial': {
                name: 'Commercial',
                limit: null,
                unit: 'lbs',
                cfr: '50 CFR 648.260',
                notes: 'Select permit category — LA unlimited; open access incidental 500 lb/trip.'
            },
            'recreational': {
                name: 'Recreational',
                limit: null,
                unit: 'lbs',
                cfr: null,
                notes: 'Verify state regulations'
            }
        },
        size: {
            minimum: null,
            unit: 'No federal minimum size',
            cfr: '50 CFR 648.260',
            notes: 'No federal minimum size for Atlantic deep sea red crab.'
        },
        gear: {
            'trap': {
                name: 'Trap/Pot',
                cfr: '50 CFR 648.260',
                notes: '≤18 cu ft on red crab DAS; max 600 traps/pots. Buoy markings RC, permit number, trawl sequence; high flyers and radar reflectors.'
            }
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 648.260',
                notes: 'Subject to quota closures'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'red-crab-cat-b', label: 'Limited Access — Category B', description: 'Unlimited possession' },
                    { value: 'red-crab-cat-c', label: 'Limited Access — Category C', description: 'Unlimited possession' },
                    { value: 'red-crab-open-incidental', label: 'Open Access — Incidental', description: '500 lb/trip' },
                    { value: 'commercial', label: 'Deep Sea Red Crab Commercial (unspecified)', description: 'Select category for limits' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Verify state regulations' }
                ],
                cfr: '50 CFR 648.4'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: 'lbs',
                dependsOn: ['permitType'],
                notes: 'Record total weight in pounds',
                cfr: '50 CFR 648.260'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit or quota?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                limits: {
                    'red-crab-cat-b': null,
                    'red-crab-cat-c': null,
                    'red-crab-open-incidental': { count: 500, unit: 'lbs per trip' },
                    'commercial': null,
                    'recreational': null
                },
                notes: 'LA Category B/C unlimited; open access incidental 500 lb/trip. Female and mutilation limits apply.',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds permit limit or quota (50 CFR 648.260)'
                },
                cfr: '50 CFR 648.260'
            },
            transferAtSea: {
                question: 'Was Atlantic deep sea red crab transferred at sea?',
                field: 'transferAtSea',
                required: false,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial', 'red-crab-cat-b', 'red-crab-cat-c', 'red-crab-open-incidental'],
                violation: {
                    ifTrue: 'VIOLATION: Transfer at sea prohibited for Atlantic deep sea red crab (50 CFR 648.260)'
                },
                cfr: '50 CFR 648.260'
            },
            femaleCrabLimit: {
                question: 'Are female red crabs within the incidental limit (one standard tote ~100 lb)?',
                field: 'femaleCrabCompliant',
                required: false,
                type: 'choice',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial', 'red-crab-cat-b', 'red-crab-cat-c', 'red-crab-open-incidental'],
                violation: {
                    ifFalse: 'VIOLATION: Female red crab possession exceeds one standard tote (~100 lb) incidental limit (50 CFR 648.260)'
                },
                cfr: '50 CFR 648.260'
            },
            mutilationCompliance: {
                question: 'Are claws/legs within mutilation limits for this permit and trip type?',
                field: 'mutilationCompliant',
                required: false,
                type: 'choice',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial', 'red-crab-cat-b', 'red-crab-cat-c', 'red-crab-open-incidental'],
                notes: 'Dedicated trip: one tote separated claws/legs. Open access/incidental: no separate claws/legs; max 2 claws and 8 legs per body.',
                violation: {
                    ifFalse: 'VIOLATION: Red crab mutilation limits exceeded (50 CFR 648.260)'
                },
                cfr: '50 CFR 648.260'
            },
            operatorPermit: {
                question: 'Does the operator hold a valid federal operator permit?',
                field: 'operatorPermit',
                required: false,
                type: 'choice',
                applicablePermits: ['commercial', 'red-crab-cat-b', 'red-crab-cat-c', 'red-crab-open-incidental'],
                violation: {
                    ifFalse: 'VIOLATION: Commercial red crab fishing requires valid operator permit (50 CFR 648.4)'
                },
                cfr: '50 CFR 648.4'
            },
            sizeCompliance: {
                question: 'Does catch comply with applicable state size requirements (if any)?',
                field: 'stateSizeCompliant',
                required: false,
                type: 'choice',
                notes: 'No federal minimum size — verify state rules if landing in state waters.',
                cfr: '50 CFR 648.260'
            },
            gearType: {
                question: 'What gear is being used?',
                field: 'gearType',
                required: true,
                type: 'choice',
                dependsOn: ['permitType'],
                options: [
                    { value: 'trap', label: 'Trap', notes: 'Trap gear authorized' }
                ],
                cfr: '50 CFR 648.260'
            },
            quotaStatus: {
                question: 'Is the fishery open or closed due to quota?',
                field: 'quotaStatus',
                required: false,
                type: 'auto',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                autoCheck: true,
                notes: 'Check current quota status - fishery may close when quota is reached',
                cfr: '50 CFR 648.260'
            },
            reportingStatus: {
                question: 'Has the catch been reported?',
                field: 'reported',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Commercial catch must be reported as required',
                violation: {
                    ifFalse: 'VIOLATION: Commercial catch reporting required (50 CFR 648.7)'
                },
                cfr: '50 CFR 648.7'
            }
        }
    }
};

// Golden Tilefish
SPECIES_DATA['golden-tilefish'] = {
    name: 'Golden Tilefish',
    commonName: 'Tilefish',
    image: null,
    imagePath: 'images/fish/Golden_Tilefish.webp',
    color: '#ffd93d',
    regulations: {
        permits: {
            'commercial': {
                name: 'Open Access — Commercial/Incidental',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'charter-headboat': {
                name: 'Open Access — Charter/Party',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'party-headboat': {
                name: 'Open Access — Party Vessel',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'recreational': {
                name: 'Recreational Tilefish Vessel Permit',
                required: true,
                cfr: '50 CFR 648.4',
                notes: 'Federal private recreational tilefish vessel permit required.'
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial/Incidental',
                limit: { count: 500, unit: 'lbs per trip' },
                cfr: '50 CFR 648.290',
                notes: 'Lesser of 500 lb or 50% by weight of all fish on board.'
            },
            'charter-headboat': {
                name: 'Charter',
                limit: { count: 8, unit: 'fish per person' },
                cfr: '50 CFR 648.290'
            },
            'party-headboat': {
                name: 'Party',
                limit: { count: 8, unit: 'fish per person' },
                cfr: '50 CFR 648.290'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 8, unit: 'fish per person per trip' },
                cfr: '50 CFR 648.290'
            }
        },
        size: {
            minimum: null,
            unit: 'No federal minimum size',
            cfr: '50 CFR 648.290',
            notes: 'Commercial: head and fins attached; may be gutted.'
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 648.290',
                notes: 'Subject to quota closures'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Open Access — Commercial/Incidental', description: '500 lb or 50% of all fish on board' },
                    { value: 'charter-headboat', label: 'Open Access — Charter', description: '8 fish per person' },
                    { value: 'party-headboat', label: 'Open Access — Party', description: '8 fish per person' },
                    { value: 'recreational', label: 'Recreational Tilefish Vessel Permit', description: '8 fish per person; federal permit required' }
                ],
                cfr: '50 CFR 648.4'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: {
                    commercial: 'lbs',
                    'charter-headboat': 'fish',
                    'party-headboat': 'fish',
                    recreational: 'fish'
                },
                dependsOn: ['permitType'],
                notes: 'Commercial: pounds. For-hire/recreational: number of fish.',
                cfr: '50 CFR 648.290'
            },
            totalCatchWeightLb: {
                question: 'Total weight of all fish on board (commercial golden tilefish 50% rule)?',
                field: 'totalCatchWeightLb',
                required: false,
                type: 'number',
                unit: 'lbs',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Limit is lesser of 500 lb or 50% of total fish weight.',
                cfr: '50 CFR 648.290'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount', 'totalCatchWeightLb'],
                autoCheck: true,
                limits: {
                    'commercial': { count: 500, unit: 'lbs per trip' },
                    'charter-headboat': { count: 8, unit: 'fish per person' },
                    'party-headboat': { count: 8, unit: 'fish per person' },
                    'recreational': { count: 8, unit: 'fish per person per trip' }
                },
                notes: 'Commercial golden: lesser of 500 lb or 50% of all fish on board. Exclude captain/crew from person count.',
                violation: {
                    ifExceeds: 'VIOLATION: Golden tilefish possession exceeds limit (50 CFR 648.290)'
                },
                cfr: '50 CFR 648.290'
            },
            carcassCondition: {
                question: 'Commercial catch — head and fins attached (may be gutted)?',
                field: 'carcassCompliant',
                required: false,
                type: 'choice',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                violation: {
                    ifFalse: 'VIOLATION: Commercial tilefish must have head and fins attached (50 CFR 648.290)'
                },
                cfr: '50 CFR 648.290'
            },
            recreationalGearHooks: {
                question: 'Recreational golden tilefish — rod and reel with no more than 5 hooks per rod?',
                field: 'recGearCompliant',
                required: false,
                type: 'choice',
                dependsOn: ['permitType'],
                applicablePermits: ['recreational', 'charter-headboat', 'party-headboat'],
                violation: {
                    ifFalse: 'VIOLATION: Golden tilefish recreational gear — rod and reel, max 5 hooks per rod (50 CFR 648.290)'
                },
                cfr: '50 CFR 648.290'
            },
            ifqDiscard: {
                question: 'IFQ allocation permit — tilefish discarded at sea?',
                field: 'ifqDiscard',
                required: false,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                violation: {
                    ifTrue: 'VIOLATION: Discarding tilefish prohibited under IFQ allocation permit (50 CFR 648.290)'
                },
                cfr: '50 CFR 648.290'
            },
            operatorPermit: {
                question: 'Does the operator hold a valid federal operator permit?',
                field: 'operatorPermit',
                required: false,
                type: 'choice',
                applicablePermits: ['commercial', 'charter-headboat', 'party-headboat'],
                violation: {
                    ifFalse: 'VIOLATION: Commercial or for-hire tilefish fishing requires valid operator permit (50 CFR 648.4)'
                },
                cfr: '50 CFR 648.4'
            },
            sizeCompliance: {
                question: 'Does catch comply with applicable state size requirements (if any)?',
                field: 'stateSizeCompliant',
                required: false,
                type: 'choice',
                notes: 'No federal minimum size.',
                cfr: '50 CFR 648.290'
            },
            gearType: {
                question: 'What gear is being used?',
                field: 'gearType',
                required: true,
                type: 'choice',
                dependsOn: ['permitType'],
                options: [
                    { value: 'hook-line', label: 'Hook and Line / Rod and Reel', notes: 'Recreational golden: max 5 hooks per rod' },
                    { value: 'longline', label: 'Longline', notes: 'Commercial authorized' }
                ],
                cfr: '50 CFR 648.290'
            },
            quotaStatus: {
                question: 'Is the fishery open or closed due to quota?',
                field: 'quotaStatus',
                required: false,
                type: 'auto',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                autoCheck: true,
                notes: 'Check current quota status - fishery may close when quota is reached',
                cfr: '50 CFR 648.290'
            },
            reportingStatus: {
                question: 'Has the catch been reported?',
                field: 'reported',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Commercial catch must be reported as required',
                violation: {
                    ifFalse: 'VIOLATION: Commercial catch reporting required (50 CFR 648.7)'
                },
                cfr: '50 CFR 648.7'
            }
        }
    }
};

// Blueline Tilefish
SPECIES_DATA['blueline-tilefish'] = {
    name: 'Blueline Tilefish',
    commonName: 'Blueline Tilefish',
    image: null,
    imagePath: 'images/fish/Blueline_Tilefish.webp',
    color: '#4ecdc4',
    regulations: {
        permits: {
            'commercial': {
                name: 'Open Access — Commercial/Incidental',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'charter-headboat': {
                name: 'Open Access — Charter',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'party-headboat': {
                name: 'Open Access — Party',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'recreational': {
                name: 'Recreational Tilefish Vessel Permit',
                required: true,
                cfr: '50 CFR 648.4',
                notes: 'Federal private recreational tilefish vessel permit required.'
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial/Incidental',
                limit: { count: 500, unit: 'lbs per trip' },
                cfr: '50 CFR 648.290'
            },
            'charter-headboat': {
                name: 'Charter',
                limit: { count: 5, unit: 'fish per person per trip' },
                cfr: '50 CFR 648.290'
            },
            'party-headboat': {
                name: 'Party',
                limit: { count: 7, unit: 'fish per person per trip' },
                cfr: '50 CFR 648.290'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 3, unit: 'fish per person per trip' },
                cfr: '50 CFR 648.290',
                notes: 'Federal season May 15–November 14.'
            }
        },
        size: {
            minimum: null,
            unit: 'No federal minimum size',
            cfr: '50 CFR 648.290',
            notes: 'Commercial: head and fins attached; may be gutted.'
        },
        seasons: {
            federal: {
                open: 'May 15 – November 14 (recreational)',
                cfr: '50 CFR 648.290',
                notes: 'Federal recreational blueline season; commercial year-round subject to quota.'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Open Access — Commercial/Incidental', description: '500 lb/trip' },
                    { value: 'charter-headboat', label: 'Open Access — Charter', description: '5 fish per person per trip' },
                    { value: 'party-headboat', label: 'Open Access — Party', description: '7 fish per person per trip' },
                    { value: 'recreational', label: 'Recreational Tilefish Vessel Permit', description: '3 fish per person; May 15–Nov 14' }
                ],
                cfr: '50 CFR 648.4'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: {
                    commercial: 'lbs',
                    'charter-headboat': 'fish',
                    'party-headboat': 'fish',
                    recreational: 'fish'
                },
                dependsOn: ['permitType'],
                notes: 'Commercial: pounds. For-hire/recreational: number of fish.',
                cfr: '50 CFR 648.290'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                limits: {
                    'commercial': { count: 500, unit: 'lbs per trip' },
                    'charter-headboat': { count: 5, unit: 'fish per person per trip' },
                    'party-headboat': { count: 7, unit: 'fish per person per trip' },
                    'recreational': { count: 3, unit: 'fish per person per trip' }
                },
                notes: 'Blueline recreational federal season May 15–November 14. Exclude captain/crew from person count.',
                violation: {
                    ifExceeds: 'VIOLATION: Blueline tilefish possession exceeds limit (50 CFR 648.290)'
                },
                cfr: '50 CFR 648.290'
            },
            carcassCondition: {
                question: 'Commercial catch — head and fins attached (may be gutted)?',
                field: 'carcassCompliant',
                required: false,
                type: 'choice',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                violation: {
                    ifFalse: 'VIOLATION: Commercial tilefish must have head and fins attached (50 CFR 648.290)'
                },
                cfr: '50 CFR 648.290'
            },
            ifqDiscard: {
                question: 'IFQ allocation permit — tilefish discarded at sea?',
                field: 'ifqDiscard',
                required: false,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                violation: {
                    ifTrue: 'VIOLATION: Discarding tilefish prohibited under IFQ allocation permit (50 CFR 648.290)'
                },
                cfr: '50 CFR 648.290'
            },
            operatorPermit: {
                question: 'Does the operator hold a valid federal operator permit?',
                field: 'operatorPermit',
                required: false,
                type: 'choice',
                applicablePermits: ['commercial', 'charter-headboat', 'party-headboat'],
                violation: {
                    ifFalse: 'VIOLATION: Commercial or for-hire tilefish fishing requires valid operator permit (50 CFR 648.4)'
                },
                cfr: '50 CFR 648.4'
            },
            sizeCompliance: {
                question: 'Does catch comply with applicable state size requirements (if any)?',
                field: 'stateSizeCompliant',
                required: false,
                type: 'choice',
                notes: 'No federal minimum size.',
                cfr: '50 CFR 648.290'
            },
            gearType: {
                question: 'What gear is being used?',
                field: 'gearType',
                required: true,
                type: 'choice',
                dependsOn: ['permitType'],
                options: [
                    { value: 'hook-line', label: 'Hook and Line / Rod and Reel', notes: 'Authorized gear' },
                    { value: 'longline', label: 'Longline', notes: 'Commercial authorized' }
                ],
                cfr: '50 CFR 648.290'
            },
            quotaStatus: {
                question: 'Is the fishery open or closed due to quota?',
                field: 'quotaStatus',
                required: false,
                type: 'auto',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                autoCheck: true,
                notes: 'Check current quota status - fishery may close when quota is reached',
                cfr: '50 CFR 648.290'
            },
            reportingStatus: {
                question: 'Has the catch been reported?',
                field: 'reported',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Commercial catch must be reported as required',
                violation: {
                    ifFalse: 'VIOLATION: Commercial catch reporting required (50 CFR 648.7)'
                },
                cfr: '50 CFR 648.7'
            }
        }
    }
};

// Thorny Skate
SPECIES_DATA['thorny-skate'] = {
    name: 'Thorny Skate',
    commonName: 'Thorny Skate',
    image: null,
    imagePath: 'images/fish/Thorny_Skate.webp',
    color: '#a8dadc',
    prohibited: true,
    regulations: {
        protectedSpecies: {
            prohibited: true,
            cfr: '50 CFR 648.322',
            notes: 'Thorny skate possession and landing prohibited.'
        },
        permits: {
            'commercial': {
                name: 'Open Access — General',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: null
            }
        },
        possession: {
            'commercial': {
                name: 'Prohibited',
                limit: { count: 0, unit: 'lbs' },
                prohibited: true,
                cfr: '50 CFR 648.322',
                notes: 'Thorny skate possession and landing prohibited.'
            },
            'recreational': {
                name: 'Prohibited',
                limit: { count: 0, unit: 'fish' },
                prohibited: true,
                cfr: '50 CFR 648.322',
                notes: 'Thorny skate possession and landing prohibited.'
            }
        },
        size: {
            minimum: null,
            unit: 'n/a',
            cfr: '50 CFR 648.320',
            notes: 'No federal minimum size under skate wing fishery.'
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 648.320',
                notes: 'Subject to quota closures'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Skate Commercial Permit', description: 'Commercial fishing permit' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational fishing' }
                ],
                cfr: '50 CFR 648.4'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: 'lbs',
                dependsOn: ['permitType'],
                notes: 'Record total weight in pounds',
                cfr: '50 CFR 648.320'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit or quota?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                limits: {
                    'commercial': { count: 0, prohibited: true },
                    'recreational': { count: 0, prohibited: true }
                },
                notes: 'Thorny skate possession and landing prohibited.',
                violation: {
                    ifExceeds: 'VIOLATION: Thorny skate possession and landing prohibited (50 CFR 648.322)',
                    ifProhibited: 'VIOLATION: Thorny skate possession and landing prohibited (50 CFR 648.322)'
                },
                cfr: '50 CFR 648.322'
            },
            quotaStatus: {
                question: 'Is the fishery open or closed due to quota?',
                field: 'quotaStatus',
                required: false,
                type: 'auto',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                autoCheck: true,
                notes: 'Thorny skate prohibited — not applicable.',
                cfr: '50 CFR 648.322'
            },
            reportingStatus: {
                question: 'Has the catch been reported?',
                field: 'reported',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Commercial catch must be reported as required',
                violation: {
                    ifFalse: 'VIOLATION: Commercial catch reporting required (50 CFR 648.7)'
                },
                cfr: '50 CFR 648.7'
            }
        }
    }
};

// Smooth Skate
SPECIES_DATA['smooth-skate'] = {
    name: 'Smooth Skate',
    commonName: 'Smooth Skate',
    image: null,
    imagePath: 'images/fish/Smooth_Skate.webp',
    color: '#a8dadc',
    regulations: {
        permits: {
            'commercial': {
                name: 'Open Access — General',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: null
            }
        },
        possession: {
            'commercial': {
                name: 'Open Access — General',
                limit: null,
                unit: 'lbs',
                cfr: '50 CFR 648.322',
                notes: 'Trip limits vary by DAS type and season — see chart (wings or whole).'
            },
            'recreational': {
                name: 'Recreational',
                limit: null,
                unit: 'fish',
                cfr: null,
                notes: 'No federal recreational skate limit — verify state measures.'
            }
        },
        size: {
            minimum: null,
            unit: 'n/a',
            cfr: '50 CFR 648.320',
            notes: 'No federal minimum size under skate wing fishery.'
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 648.320',
                notes: 'Subject to quota closures'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Skate Commercial Permit', description: 'Commercial fishing permit' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational fishing' }
                ],
                cfr: '50 CFR 648.4'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: 'lbs',
                dependsOn: ['permitType'],
                notes: 'Record total weight in pounds',
                cfr: '50 CFR 648.320'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit or quota?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                limits: {
                    'commercial': null, // Subject to quota and trip limits
                    'recreational': null // Check state regulations
                },
                notes: 'Commercial wing trip limits enforced by season (see 50 CFR 648.322). Recreational: state measures.',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds permit limit or quota (50 CFR 648.320)'
                },
                cfr: '50 CFR 648.320'
            },
            quotaStatus: {
                question: 'Is the fishery open or closed due to quota?',
                field: 'quotaStatus',
                required: false,
                type: 'auto',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                autoCheck: true,
                notes: 'Quota trigger may reduce wing limit to 500 lb — verify NOAA bulletin.',
                cfr: '50 CFR 648.320'
            },
            reportingStatus: {
                question: 'Has the catch been reported?',
                field: 'reported',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Commercial catch must be reported as required',
                violation: {
                    ifFalse: 'VIOLATION: Commercial catch reporting required (50 CFR 648.7)'
                },
                cfr: '50 CFR 648.7'
            }
        }
    }
};

// Barndoor Skate
SPECIES_DATA['barndoor-skate'] = {
    name: 'Barndoor Skate',
    commonName: 'Barndoor Skate',
    image: null,
    imagePath: 'images/fish/Barndoor_Skate.webp',
    color: '#a8dadc',
    regulations: {
        permits: {
            'commercial': {
                name: 'Open Access — General',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: null
            }
        },
        possession: {
            'commercial': {
                name: 'Open Access — General',
                limit: null,
                unit: 'lbs',
                cfr: '50 CFR 648.322',
                notes: 'Trip limits vary by DAS type and season — see chart (wings or whole).'
            },
            'recreational': {
                name: 'Recreational',
                limit: null,
                unit: 'fish',
                cfr: null,
                notes: 'No federal recreational skate limit — verify state measures.'
            }
        },
        size: {
            minimum: null,
            unit: 'n/a',
            cfr: '50 CFR 648.320',
            notes: 'No federal minimum size under skate wing fishery.'
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 648.320',
                notes: 'Subject to quota closures'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Skate Commercial Permit', description: 'Commercial fishing permit' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational fishing' }
                ],
                cfr: '50 CFR 648.4'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: 'lbs',
                dependsOn: ['permitType'],
                notes: 'Record total weight in pounds',
                cfr: '50 CFR 648.320'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit or quota?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                limits: {
                    'commercial': null, // Subject to quota and trip limits
                    'recreational': null // Check state regulations
                },
                notes: 'Commercial wing trip limits enforced by season (see 50 CFR 648.322). Recreational: state measures.',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds permit limit or quota (50 CFR 648.320)'
                },
                cfr: '50 CFR 648.320'
            },
            quotaStatus: {
                question: 'Is the fishery open or closed due to quota?',
                field: 'quotaStatus',
                required: false,
                type: 'auto',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                autoCheck: true,
                notes: 'Quota trigger may reduce wing limit to 500 lb — verify NOAA bulletin.',
                cfr: '50 CFR 648.320'
            },
            reportingStatus: {
                question: 'Has the catch been reported?',
                field: 'reported',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Commercial catch must be reported as required',
                violation: {
                    ifFalse: 'VIOLATION: Commercial catch reporting required (50 CFR 648.7)'
                },
                cfr: '50 CFR 648.7'
            }
        }
    }
};

// American Lobster
SPECIES_DATA['american-lobster'] = {
    name: 'American Lobster',
    commonName: 'Lobster',
    image: null,
    imagePath: 'images/fish/American_Lobster.webp',
    color: '#ff6b6b',
    regulations: {
        permits: {
            'commercial-trap': {
                name: 'Commercial Trap (Areas 1–6 & Outer Cape)',
                required: true,
                cfr: '50 CFR 697.4'
            },
            'commercial-non-trap': {
                name: 'Commercial Non-Trap',
                required: true,
                cfr: '50 CFR 697.4'
            },
            'charter-party-non-trap': {
                name: 'Charter/Party Non-Trap',
                required: true,
                cfr: '50 CFR 697.4'
            },
            'commercial': {
                name: 'American Lobster Commercial (unspecified type)',
                required: true,
                cfr: '50 CFR 697.4'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: null
            }
        },
        possession: {
            'commercial-trap': {
                name: 'Commercial Trap',
                limit: null,
                unit: 'lobsters',
                cfr: '50 CFR 697.17',
                notes: 'Unlimited — LMA trap limits and area measures apply.'
            },
            'commercial-non-trap': {
                name: 'Commercial Non-Trap',
                limit: { count: 100, unit: 'lobsters per day' },
                cfr: '50 CFR 697.17',
                notes: '100/day; max 500 on trips ≥5 days.'
            },
            'charter-party-non-trap': {
                name: 'Charter/Party Non-Trap',
                limit: { count: 6, unit: 'lobsters per person' },
                cfr: '50 CFR 697.17'
            },
            'commercial': {
                name: 'Commercial',
                limit: null,
                unit: 'lobsters',
                cfr: '50 CFR 697.17',
                notes: 'Select trap vs non-trap permit for limits.'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 6, unit: 'lobsters per person per day' },
                cfr: '50 CFR 697.17',
                notes: 'Not for sale, barter, or trade — verify state of landing.'
            }
        },
        size: {
            minimum: 3.25,
            unit: 'inches (carapace length)',
            cfr: '50 CFR 697.17',
            notes: 'Min/max varies by LMA (3-1/4″ to 3-17/32″ min; 5″ to 6-3/4″ max).'
        },
        gear: {
            'trap': {
                name: 'Lobster Trap',
                cfr: '50 CFR 697.20',
                notes: 'Trap gear authorized. Check for area-specific restrictions.'
            }
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 697.17',
                notes: 'Subject to area closures'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial-trap', label: 'Commercial Trap (Areas 1–6 & Outer Cape)', description: 'Unlimited possession' },
                    { value: 'commercial-non-trap', label: 'Commercial Non-Trap', description: '100/day; 500 max on trips ≥5 days' },
                    { value: 'charter-party-non-trap', label: 'Charter/Party Non-Trap', description: '6 lobsters per person' },
                    { value: 'commercial', label: 'Commercial (unspecified)', description: 'Select trap vs non-trap' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit)', description: '6 lobsters per person per day' }
                ],
                cfr: '50 CFR 697.4'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: {
                    'commercial-trap': 'lobsters',
                    'commercial-non-trap': 'lobsters',
                    'charter-party-non-trap': 'lobsters',
                    commercial: 'lobsters',
                    recreational: 'lobsters'
                },
                dependsOn: ['permitType'],
                notes: 'Record number of lobsters (or weight if incidental context).',
                cfr: '50 CFR 697.17'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount', 'tripLengthDays'],
                autoCheck: true,
                limits: {
                    'commercial-trap': null,
                    'commercial-non-trap': { count: 100, unit: 'lobsters per day' },
                    'charter-party-non-trap': { count: 6, unit: 'lobsters per person' },
                    'commercial': null,
                    'recreational': { count: 6, unit: 'lobsters per person per day' }
                },
                notes: 'Non-trap: 500 max on trips ≥5 days. Trap: unlimited — verify LMA measures.',
                violation: {
                    ifExceeds: 'VIOLATION: Lobster possession exceeds permit limit (50 CFR 697.17)'
                },
                cfr: '50 CFR 697.17'
            },
            tripLengthDays: {
                question: 'Trip length in calendar days (commercial non-trap 500-lobster rule)?',
                field: 'tripLengthDays',
                required: false,
                type: 'number',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial-non-trap'],
                cfr: '50 CFR 697.17'
            },
            operatorPermit: {
                question: 'Does the operator hold a valid federal operator permit?',
                field: 'operatorPermit',
                required: false,
                type: 'choice',
                applicablePermits: ['commercial', 'commercial-trap', 'commercial-non-trap', 'charter-party-non-trap'],
                violation: {
                    ifFalse: 'VIOLATION: Commercial or for-hire lobster fishing requires valid operator permit (50 CFR 697.4)'
                },
                cfr: '50 CFR 697.4'
            },
            eggBearingLobster: {
                question: 'Any egg-bearing lobsters on board?',
                field: 'eggBearingPresent',
                required: false,
                type: 'boolean',
                violation: {
                    ifTrue: 'VIOLATION: Egg-bearing lobster prohibited (50 CFR 697.7)'
                },
                cfr: '50 CFR 697.7'
            },
            vNotchCompliance: {
                question: 'Any v-notched or mutilated lobsters on board (per area v-notch tolerance)?',
                field: 'vNotchCompliant',
                required: false,
                type: 'choice',
                notes: 'Area 1: zero tolerance. Other areas: 1/8″ notch prohibited.',
                violation: {
                    ifFalse: 'VIOLATION: V-notched or prohibited lobster on board (50 CFR 697.7)'
                },
                cfr: '50 CFR 697.7'
            },
            sizeCompliance: {
                question: 'Are lobsters within LMA minimum and maximum carapace size?',
                field: 'sizeCompliant',
                required: false,
                type: 'choice',
                dependsOn: ['fishingArea'],
                notes: 'Measure rear of eye socket to rear of carapace. Limits vary by LMA.',
                violation: {
                    ifFalse: 'VIOLATION: Lobster outside LMA size limits (50 CFR 697.17)'
                },
                cfr: '50 CFR 697.17'
            },
            maximumSizeCheck: {
                question: 'Are any lobsters above the maximum carapace size for this LMA?',
                field: 'overMaxSize',
                required: false,
                type: 'boolean',
                dependsOn: ['fishingArea'],
                violation: {
                    ifTrue: 'VIOLATION: Lobsters above maximum size must be released (50 CFR 697.17)'
                },
                cfr: '50 CFR 697.17'
            },
            fishingArea: {
                question: 'What lobster management area (LMA) applies?',
                field: 'fishingArea',
                required: true,
                type: 'choice',
                options: [
                    { value: 'area-1', label: 'LMA 1 (Nearshore ME/NH)', notes: 'Min 3-1/4″; max 5″; trap limit 800; v-notch zero tolerance' },
                    { value: 'area-2', label: 'LMA 2', notes: 'Min 3-3/8″; max 5-1/4″; trap limit permit-specific max 800' },
                    { value: 'area-3', label: 'LMA 3 (Offshore)', notes: 'Min 3-17/32″; max 6-3/4″; trap limit max 1,945' },
                    { value: 'area-4', label: 'LMA 4', notes: 'Closed Apr 30–May 31; min 3-3/8″; max 5-1/4″; trap max 1,440' },
                    { value: 'area-5', label: 'LMA 5', notes: 'Closed Feb 1–Mar 31; min 3-3/8″; max 5-1/4″; trap max 1,440' },
                    { value: 'area-6', label: 'LMA 6 (Long Island Sound)', notes: 'State waters only; min 3-1/4″; max 5-3/8″' },
                    { value: 'outer-cape', label: 'Outer Cape', notes: 'Closed Feb 1–Mar 31; min 3-3/8″; max 6-3/4″; trap max 800' },
                    { value: 'closed-area', label: 'Closed Area', violation: true }
                ],
                violation: {
                    ifValue: 'closed-area',
                    message: 'VIOLATION: Fishing prohibited in closed areas (50 CFR 697.17)'
                },
                cfr: '50 CFR 697.17'
            },
            trapCompliance: {
                question: 'How many traps are aboard?',
                field: 'numberOfTraps',
                required: false,
                type: 'number',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial', 'commercial-trap'],
                notes: 'Verify trap limit for LMA and permit.',
                cfr: '50 CFR 697.20'
            },
            gearCompliance: {
                question: 'What gear is being used?',
                field: 'gearType',
                required: true,
                type: 'choice',
                dependsOn: ['permitType'],
                options: [
                    { value: 'trap', label: 'Lobster Trap', notes: 'Escape vent, ghost panel, trap tags required' },
                    { value: 'non-trap', label: 'Non-Trap (hand, dive, etc.)', notes: 'Non-trap possession limits apply' },
                    { value: 'diving', label: 'Diving', notes: 'Recreational/non-trap' }
                ],
                cfr: '50 CFR 697.20'
            },
            reportingStatus: {
                question: 'Has the catch been reported?',
                field: 'reported',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Commercial catch must be reported as required',
                violation: {
                    ifFalse: 'VIOLATION: Commercial catch reporting required (50 CFR 697.7)'
                },
                cfr: '50 CFR 697.7'
            }
        }
    }
};

// Jonah Crab
SPECIES_DATA['jonah-crab'] = {
    name: 'Jonah Crab',
    commonName: 'Jonah Crab',
    image: null,
    imagePath: 'images/fish/Jonah_Crab.webp',
    color: '#ff8787',
    regulations: {
        permits: {
            'commercial-trap': {
                name: 'Commercial Trap (Lobster Areas 1–6 & Outer Cape)',
                required: true,
                cfr: '50 CFR 697.4'
            },
            'commercial-non-trap': {
                name: 'Commercial Non-Trap (Lobster Permit)',
                required: true,
                cfr: '50 CFR 697.4'
            },
            'charter-party-non-trap': {
                name: 'Charter/Party Non-Trap (Lobster Permit)',
                required: true,
                cfr: '50 CFR 697.4'
            },
            'commercial': {
                name: 'Jonah Crab / Lobster Commercial (unspecified)',
                required: true,
                cfr: '50 CFR 697.4'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: null
            }
        },
        possession: {
            'commercial-trap': {
                name: 'Commercial Trap',
                limit: null,
                unit: 'crabs',
                cfr: '50 CFR 697.7',
                notes: 'Unlimited — follow lobster trap area rules.'
            },
            'commercial-non-trap': {
                name: 'Commercial Non-Trap',
                limit: { count: 1000, unit: 'crabs' },
                cfr: '50 CFR 697.7',
                notes: 'Must not exceed 50% by weight of all other catch.'
            },
            'charter-party-non-trap': {
                name: 'Charter/Party Non-Trap',
                limit: { count: 50, unit: 'crabs per person' },
                cfr: '50 CFR 697.7'
            },
            'commercial': {
                name: 'Commercial',
                limit: null,
                unit: 'crabs',
                cfr: '50 CFR 697.7'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 50, unit: 'crabs per person per day' },
                cfr: '50 CFR 697.7',
                notes: 'Not for sale, barter, or trade — verify state of landing.'
            }
        },
        size: {
            minimum: 4.75,
            unit: 'inches (carapace width)',
            cfr: '50 CFR 697.7',
            notes: '4.75" minimum carapace width'
        },
        gear: {
            'trap': {
                name: 'Crab Trap',
                cfr: '50 CFR 697.7',
                notes: 'Trap gear authorized'
            }
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 697.7',
                notes: 'Subject to area closures'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial-trap', label: 'Commercial Trap (Lobster trap areas)', description: 'Unlimited' },
                    { value: 'commercial-non-trap', label: 'Commercial Non-Trap', description: '1,000 crabs; ≤50% of other catch weight' },
                    { value: 'charter-party-non-trap', label: 'Charter/Party Non-Trap', description: '50 crabs per person' },
                    { value: 'commercial', label: 'Commercial (unspecified)', description: 'Select permit type' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit)', description: '50 crabs per person per day' }
                ],
                cfr: '50 CFR 697.4'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: 'crabs',
                dependsOn: ['permitType'],
                notes: 'Record number of Jonah crabs.',
                cfr: '50 CFR 697.7'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                limits: {
                    'commercial-trap': null,
                    'commercial-non-trap': { count: 1000, unit: 'crabs' },
                    'charter-party-non-trap': { count: 50, unit: 'crabs per person' },
                    'commercial': null,
                    'recreational': { count: 50, unit: 'crabs per person per day' }
                },
                notes: 'Non-trap: must not exceed 50% by weight of all other catch on board.',
                violation: {
                    ifExceeds: 'VIOLATION: Jonah crab possession exceeds permit limit (50 CFR 697.7)'
                },
                cfr: '50 CFR 697.7'
            },
            eggBearingCrab: {
                question: 'Any egg-bearing Jonah crabs on board?',
                field: 'eggBearingPresent',
                required: false,
                type: 'boolean',
                violation: {
                    ifTrue: 'VIOLATION: Egg-bearing Jonah crab prohibited (50 CFR 697.7)'
                },
                cfr: '50 CFR 697.7'
            },
            operatorPermit: {
                question: 'Does the operator hold a valid federal operator permit?',
                field: 'operatorPermit',
                required: false,
                type: 'choice',
                applicablePermits: ['commercial', 'commercial-trap', 'commercial-non-trap', 'charter-party-non-trap'],
                violation: {
                    ifFalse: 'VIOLATION: Commercial or for-hire fishing requires valid operator permit (50 CFR 697.4)'
                },
                cfr: '50 CFR 697.4'
            },
            sizeCompliance: {
                question: 'Are crabs at least 4.75″ carapace width?',
                field: 'sizeCompliant',
                required: false,
                type: 'choice',
                notes: 'Measure straight line across widest part of shell including posterior spine tips.',
                violation: {
                    ifFalse: 'VIOLATION: Jonah crab below 4.75″ minimum carapace width (50 CFR 697.7)'
                },
                cfr: '50 CFR 697.7'
            },
            gearType: {
                question: 'What gear is being used?',
                field: 'gearType',
                required: true,
                type: 'choice',
                dependsOn: ['permitType'],
                options: [
                    { value: 'trap', label: 'Trap/Pot', notes: 'Follow American lobster trap/pot regulations' },
                    { value: 'non-trap', label: 'Non-Trap', notes: 'Non-trap possession limits apply' }
                ],
                cfr: '50 CFR 697.7'
            },
            reportingStatus: {
                question: 'Has the catch been reported?',
                field: 'reported',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Commercial catch must be reported as required',
                violation: {
                    ifFalse: 'VIOLATION: Commercial catch reporting required (50 CFR 697.7)'
                },
                cfr: '50 CFR 697.7'
            }
        }
    }
};

// Atlantic Sturgeon
SPECIES_DATA['atlantic-sturgeon'] = {
    name: 'Atlantic Sturgeon',
    commonName: 'Sturgeon',
    image: null,
    imagePath: 'images/fish/Atlantic_Sturgeon.webp',
    color: '#4a90e2',
    regulations: {
        permits: {
            'commercial': {
                name: 'Atlantic Sturgeon Commercial Permit',
                required: false,
                cfr: null,
                notes: 'PROHIBITED - Atlantic sturgeon is listed as threatened/endangered under ESA'
            },
            'recreational': {
                name: 'Recreational',
                required: false,
                cfr: null,
                notes: 'PROHIBITED - Atlantic sturgeon is listed as threatened/endangered under ESA'
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial',
                limit: { count: 0 },
                unit: 'fish',
                cfr: '50 CFR 223.102; 50 CFR 697.7',
                notes: 'PROHIBITED - No retention allowed. EEZ prohibition (697) and ESA listing (223.102).'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 0 },
                unit: 'fish',
                cfr: '50 CFR 223.102',
                notes: 'PROHIBITED - No retention allowed. Must be released immediately.'
            }
        },
        size: {
            minimum: null,
            unit: 'N/A - Prohibited',
            cfr: '50 CFR 223.102',
            notes: 'PROHIBITED - All sizes must be released'
        },
        seasons: {
            federal: {
                open: 'CLOSED',
                cfr: '50 CFR 223.102',
                notes: 'PROHIBITED - Listed as threatened/endangered under ESA'
            }
        },
        assessmentQuestions: {
            prohibitedSpeciesCheck: {
                question: 'Is Atlantic sturgeon on board?',
                field: 'hasSturgeon',
                required: true,
                type: 'boolean',
                notes: 'Atlantic sturgeon is PROHIBITED from retention. Listed as threatened/endangered under Endangered Species Act.',
                violation: {
                    ifTrue: 'VIOLATION: Atlantic sturgeon is PROHIBITED from retention. Must be released immediately. Listed under Endangered Species Act (50 CFR 223.102)'
                },
                cfr: '50 CFR 223.102'
            },
            numberOfFish: {
                question: 'How many Atlantic sturgeon are on board?',
                field: 'numberOfFish',
                required: false,
                type: 'number',
                notes: 'Any Atlantic sturgeon on board is a violation - species is PROHIBITED',
                violation: {
                    ifGreaterThan: 0,
                    message: 'VIOLATION: Atlantic sturgeon is PROHIBITED from retention. All fish must be released immediately (50 CFR 223.102)'
                },
                cfr: '50 CFR 223.102'
            },
            releaseStatus: {
                question: 'Have all Atlantic sturgeon been released immediately?',
                field: 'released',
                required: true,
                type: 'boolean',
                notes: 'All Atlantic sturgeon must be released immediately upon capture. No retention allowed.',
                violation: {
                    ifFalse: 'VIOLATION: Atlantic sturgeon must be released immediately. No retention allowed (50 CFR 223.102)'
                },
                cfr: '50 CFR 223.102'
            },
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: false,
                options: [
                    { value: 'commercial', label: 'Commercial Permit', description: 'Commercial fishing - PROHIBITED for Atlantic sturgeon' },
                    { value: 'recreational', label: 'Recreational', description: 'Recreational fishing - PROHIBITED for Atlantic sturgeon' }
                ],
                notes: 'Atlantic sturgeon retention is PROHIBITED for both commercial and recreational fishing',
                cfr: '50 CFR 223.102'
            },
            esaCompliance: {
                question: 'Is the vessel in compliance with Endangered Species Act requirements?',
                field: 'esaCompliance',
                required: true,
                type: 'boolean',
                notes: 'Atlantic sturgeon is listed as threatened/endangered under ESA. All fish must be released immediately.',
                violation: {
                    ifFalse: 'VIOLATION: Atlantic sturgeon is protected under Endangered Species Act. All fish must be released immediately (50 CFR 223.102)'
                },
                cfr: '50 CFR 223.102'
            }
        }
    }
};

// Shortnose Sturgeon
SPECIES_DATA['shortnose-sturgeon'] = {
    name: 'Shortnose Sturgeon',
    commonName: 'Shortnose Sturgeon',
    image: null,
    imagePath: 'images/fish/Shortnose_Sturgeon.webp',
    color: '#4a90e2',
    regulations: {
        permits: {
            'commercial': {
                name: 'Shortnose Sturgeon Commercial Permit',
                required: false,
                cfr: null,
                notes: 'PROHIBITED - Shortnose sturgeon is listed as endangered under ESA'
            },
            'recreational': {
                name: 'Recreational',
                required: false,
                cfr: null,
                notes: 'PROHIBITED - Shortnose sturgeon is listed as endangered under ESA'
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial',
                limit: { count: 0 },
                unit: 'fish',
                cfr: '50 CFR 223.102; 50 CFR 697.7',
                notes: 'PROHIBITED - No retention allowed. EEZ prohibition (697) and ESA listing (223.102).'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 0 },
                unit: 'fish',
                cfr: '50 CFR 223.102',
                notes: 'PROHIBITED - No retention allowed. Must be released immediately.'
            }
        },
        size: {
            minimum: null,
            unit: 'N/A - Prohibited',
            cfr: '50 CFR 223.102',
            notes: 'PROHIBITED - All sizes must be released'
        },
        seasons: {
            federal: {
                open: 'CLOSED',
                cfr: '50 CFR 223.102',
                notes: 'PROHIBITED - Listed as endangered under ESA'
            }
        },
        assessmentQuestions: {
            prohibitedSpeciesCheck: {
                question: 'Is shortnose sturgeon on board?',
                field: 'hasSturgeon',
                required: true,
                type: 'boolean',
                notes: 'Shortnose sturgeon is PROHIBITED from retention. Listed as endangered under Endangered Species Act.',
                violation: {
                    ifTrue: 'VIOLATION: Shortnose sturgeon is PROHIBITED from retention. Must be released immediately. Listed under Endangered Species Act (50 CFR 223.102)'
                },
                cfr: '50 CFR 223.102'
            },
            numberOfFish: {
                question: 'How many shortnose sturgeon are on board?',
                field: 'numberOfFish',
                required: false,
                type: 'number',
                notes: 'Any shortnose sturgeon on board is a violation - species is PROHIBITED',
                violation: {
                    ifGreaterThan: 0,
                    message: 'VIOLATION: Shortnose sturgeon is PROHIBITED from retention. All fish must be released immediately (50 CFR 223.102)'
                },
                cfr: '50 CFR 223.102'
            },
            releaseStatus: {
                question: 'Have all shortnose sturgeon been released immediately?',
                field: 'released',
                required: true,
                type: 'boolean',
                notes: 'All shortnose sturgeon must be released immediately upon capture. No retention allowed.',
                violation: {
                    ifFalse: 'VIOLATION: Shortnose sturgeon must be released immediately. No retention allowed (50 CFR 223.102)'
                },
                cfr: '50 CFR 223.102'
            },
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: false,
                options: [
                    { value: 'commercial', label: 'Commercial Permit', description: 'Commercial fishing - PROHIBITED for shortnose sturgeon' },
                    { value: 'recreational', label: 'Recreational', description: 'Recreational fishing - PROHIBITED for shortnose sturgeon' }
                ],
                notes: 'Shortnose sturgeon retention is PROHIBITED for both commercial and recreational fishing',
                cfr: '50 CFR 223.102'
            },
            esaCompliance: {
                question: 'Is the vessel in compliance with Endangered Species Act requirements?',
                field: 'esaCompliance',
                required: true,
                type: 'boolean',
                notes: 'Shortnose sturgeon is listed as endangered under ESA. All fish must be released immediately.',
                violation: {
                    ifFalse: 'VIOLATION: Shortnose sturgeon is protected under Endangered Species Act. All fish must be released immediately (50 CFR 223.102)'
                },
                cfr: '50 CFR 223.102'
            }
        }
    }
};

// Atlantic Coast Horseshoe Crab (50 CFR Part 697)
SPECIES_DATA['atlantic-coast-horseshoe-crab'] = {
    name: 'Atlantic Coast Horseshoe Crab',
    commonName: 'Horseshoe Crab',
    image: null,
    imagePath: 'images/fish/Atlantic_Coast_Horseshoe_Crab.jpg',
    color: '#8b4513',
    regulations: {
        permits: {
            'commercial': {
                name: 'Not Regulated (Federal)',
                required: false,
                cfr: '50 CFR 697.7',
                notes: 'Permits not federally regulated under current chart — verify state rules.'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: null
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial',
                limit: null,
                unit: 'crabs',
                cfr: '50 CFR 697.7',
                notes: 'No federal possession limit on chart — Carl N. Shuster Jr. Reserve and trawl/dredge area rules apply.'
            },
            'recreational': {
                name: 'Recreational',
                limit: null,
                unit: 'crabs',
                cfr: null,
                notes: 'Check state regulations'
            }
        },
        size: {
            minimum: null,
            unit: 'not regulated federally',
            cfr: '50 CFR 697.7',
            notes: 'No federal minimum size on chart'
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 697.7',
                notes: 'Carl N. Shuster Jr. Horseshoe Crab Reserve closed to fishing'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Commercial', description: 'Commercial fishing — area closures apply' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational fishing' }
                ],
                cfr: '50 CFR 697.7'
            },
            gearType: {
                question: 'Does the vessel have trawl or dredge gear on board?',
                field: 'hasTrawlOrDredge',
                required: false,
                type: 'boolean',
                applicablePermits: ['commercial'],
                notes: 'Possession on trawl/dredge vessels prohibited in Carl N. Shuster Jr. Reserve closed area',
                cfr: '50 CFR 697.7'
            },
            possessionAmount: {
                question: 'How many horseshoe crabs are on board?',
                field: 'numberOfCrabs',
                required: true,
                type: 'number',
                unit: 'crabs',
                dependsOn: ['permitType'],
                notes: 'Record total number of horseshoe crabs on board',
                cfr: '50 CFR 697.7'
            },
            areaRestrictions: {
                question: 'Was fishing conducted in the Carl N. Shuster Jr. Horseshoe Crab Reserve or other closed area?',
                field: 'closedArea',
                required: false,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Reserve closed to horseshoe crab fishing; crabs caught must be returned immediately',
                violation: {
                    ifTrue: 'VIOLATION: Fishing in Carl N. Shuster Jr. Horseshoe Crab Reserve or closed area (50 CFR 697.7)'
                },
                cfr: '50 CFR 697.7'
            }
        }
    }
};

// Red Drum (50 CFR Part 697)
SPECIES_DATA['red-drum'] = {
    name: 'Red Drum',
    commonName: 'Redfish',
    image: null,
    imagePath: 'images/fish/Red_Drum.webp',
    color: '#ff6b6b',
    regulations: {
        permits: {
            'commercial': {
                name: 'Not Regulated (North of Prohibited Zone)',
                required: false,
                cfr: '50 CFR 697.7',
                notes: 'No federal permit required north of prohibited EEZ zone'
            },
            'recreational': {
                name: 'Recreational (Prohibited in Federal Waters)',
                required: false,
                cfr: '50 CFR 697.7',
                notes: 'Recreational red drum fishing prohibited in federal waters'
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial',
                limit: null,
                unit: 'fish',
                cfr: '50 CFR 697.7',
                notes: 'No federal possession limit north of prohibited zone. Prohibited south of NJ/NY line in EEZ.'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 0 },
                unit: 'fish',
                cfr: '50 CFR 697.7',
                notes: 'PROHIBITED in federal waters. Check state regulations in state waters.'
            }
        },
        size: {
            minimum: null,
            unit: 'not regulated federally (north of zone)',
            cfr: '50 CFR 697.7',
            notes: 'No federal minimum size north of prohibited EEZ zone'
        },
        seasons: {
            federal: {
                open: 'Area-dependent',
                cfr: '50 CFR 697.7',
                notes: 'Prohibited in EEZ south of 40°29.6′ N, 73°54.1′ W line to council boundary'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Commercial', description: 'Commercial fishing — zone rules apply' },
                    { value: 'recreational', label: 'Recreational', description: 'Recreational — prohibited in federal waters' }
                ],
                cfr: '50 CFR 697.7'
            },
            fishingArea: {
                question: 'Where was fishing conducted?',
                field: 'fishingArea',
                required: true,
                type: 'choice',
                options: [
                    { value: 'prohibited-south', label: 'EEZ south of NJ/NY line (prohibited zone)', notes: 'Harvest and possession prohibited — release immediately' },
                    { value: 'north-allowed', label: 'EEZ north of prohibited zone', notes: 'No federal permit, limit, or min size for allowed fisheries' },
                    { value: 'state-waters', label: 'State waters', notes: 'State regulations apply' }
                ],
                cfr: '50 CFR 697.7'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: 'fish',
                dependsOn: ['permitType', 'fishingArea'],
                notes: 'Prohibited in EEZ south of NJ/NY line. Recreational prohibited in all federal waters.',
                cfr: '50 CFR 697.7'
            },
            possessionLimitCheck: {
                question: 'Does possession comply with zone and permit rules?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'fishingArea', 'possessionAmount'],
                autoCheck: true,
                notes: 'Prohibited zone and recreational federal rules apply.',
                violation: {
                    ifExceeds: 'VIOLATION: Atlantic red drum possession not permitted (50 CFR 697.7)',
                    ifProhibited: 'VIOLATION: Atlantic red drum prohibited in this area (50 CFR 697.7)'
                },
                cfr: '50 CFR 697.7'
            }
        }
    }
};

// Weakfish (50 CFR Part 697)
SPECIES_DATA['weakfish'] = {
    name: 'Weakfish',
    commonName: 'Sea Trout',
    image: null,
    imagePath: 'images/fish/Weakfish.webp',
    color: '#95e1d3',
    regulations: {
        permits: {
            'commercial': {
                name: 'Not Regulated (Federal)',
                required: false,
                cfr: '50 CFR 697.7',
                notes: 'Permits not federally regulated under current chart'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: null
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial',
                limit: { count: 150, unit: 'lbs' },
                unit: 'lbs',
                cfr: '50 CFR 697.7',
                notes: '150 lb possession limit. Restricted gear area rules apply.'
            },
            'recreational': {
                name: 'Recreational',
                limit: null,
                unit: 'fish',
                cfr: '50 CFR 697.7',
                notes: 'No federal recreational possession limit'
            }
        },
        size: {
            minimum: 12,
            unit: 'inches (total length)',
            cfr: '50 CFR 697.7',
            notes: '12″ minimum total length (commercial and recreational)'
        },
        gear: {
            'trawl': {
                name: 'Trawl',
                cfr: '50 CFR 697.7',
                notes: '≥3¼″ square stretched mesh or ≥3¾″ diamond stretch mesh'
            },
            'gillnet': {
                name: 'Gillnet',
                cfr: '50 CFR 697.7',
                notes: '≥2⅞″ stretch mesh'
            }
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 697.7',
                notes: 'Restricted gear area near Cape Hatteras — weakfish possession prohibited while fishing shrimp trawls, flynet, or crab trawls'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Commercial', description: 'Commercial fishing — 150 lb limit' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational fishing — unlimited federally' }
                ],
                cfr: '50 CFR 697.7'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: 'lbs',
                dependsOn: ['permitType'],
                notes: 'Commercial: record weight in pounds. Recreational: record number of fish if applicable.',
                cfr: '50 CFR 697.7'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                limits: {
                    'commercial': { count: 150, unit: 'lbs' },
                    'recreational': null
                },
                notes: 'Commercial limit 150 lb. Recreational — no federal limit.',
                violation: {
                    ifExceeds: 'VIOLATION: Weakfish possession exceeds 150 lb commercial limit (50 CFR 697.7)'
                },
                cfr: '50 CFR 697.7'
            },
            sizeCompliance: {
                question: 'What is the total length of the fish?',
                field: 'totalLength',
                required: true,
                type: 'number',
                unit: 'inches',
                minimum: 12,
                notes: 'Minimum size: 12″ total length. Measure from tip of snout to tip of tail.',
                violation: {
                    ifBelow: 'VIOLATION: Weakfish below minimum size must be released (50 CFR 697.7)'
                },
                cfr: '50 CFR 697.7'
            },
            meshCompliance: {
                question: 'Does trawl/gillnet mesh meet minimum requirements (trawl ≥3¼″ square or ≥3¾″ diamond; gillnet ≥2⅞″)?',
                field: 'meshCompliant',
                required: false,
                type: 'boolean',
                applicablePermits: ['commercial'],
                notes: 'Gear mesh requirements for trawl and gillnet fisheries',
                violation: {
                    ifFalse: 'VIOLATION: Weakfish gear mesh below minimum requirement (50 CFR 697.7)'
                },
                cfr: '50 CFR 697.7'
            }
        }
    }
};

// Mahi-Mahi (Dorado)
SPECIES_DATA['mahi-mahi'] = {
    name: 'Mahi-Mahi',
    commonName: 'Dorado / Atlantic Dolphin',
    image: null,
    imagePath: 'images/fish/Mahi-Mahi.webp',
    color: '#ffd93d',
    regulations: {
        permits: {
            'commercial': {
                name: 'Atlantic Dolphin/Wahoo Commercial Permit',
                required: true,
                cfr: '50 CFR 622.4',
                notes: 'Operator permit required for commercial fishing.'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: '50 CFR 622.278'
            },
            'charter-headboat': {
                name: 'Charter/Headboat',
                required: false,
                cfr: '50 CFR 622.278',
                notes: '10 dolphin per person per day; max 54 per vessel (headboat: 10 per paying passenger).'
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial',
                limit: { count: 500, unit: 'lbs per trip' },
                unit: 'lbs',
                cfr: '50 CFR 622.278',
                notes: '500 lb/trip (gutted weight permitted). North of 39° N without endorsement: 200 lb combined dolphin/wahoo.'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 10, unit: 'fish per person per day', vesselMax: 54 },
                cfr: '50 CFR 622.278',
                notes: '10 per person per day; not to exceed 54 per vessel per day.'
            }
        },
        size: {
            minimum: 20,
            unit: 'inches (fork length)',
            cfr: '50 CFR 622.278',
            notes: '20″ minimum fork length.'
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 622.278',
                notes: 'Head and fins intact in EEZ; transfer at sea prohibited.'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Atlantic Dolphin/Wahoo Commercial', description: 'Commercial — operator permit required' },
                    { value: 'charter-headboat', label: 'Charter/Headboat', description: '10/person; 54/vessel max' },
                    { value: 'recreational', label: 'Recreational', description: '10/person; 54/vessel max' }
                ],
                cfr: '50 CFR 622.278'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: 'lbs',
                dependsOn: ['permitType'],
                notes: 'Commercial: pounds. Recreational/charter: number of fish.',
                cfr: '50 CFR 622.278'
            },
            possessionLimitCheck: {
                question: 'Does possession comply with dolphin/wahoo limits?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                violation: {
                    ifExceeds: 'VIOLATION: Dolphin possession exceeds federal limit (50 CFR 622.278)'
                },
                cfr: '50 CFR 622.278'
            },
            sizeCompliance: {
                question: 'What is the fork length of the fish?',
                field: 'forkLength',
                required: true,
                type: 'number',
                unit: 'inches',
                minimum: 20,
                notes: 'Minimum 20″ fork length.',
                violation: {
                    ifBelow: 'VIOLATION: Dolphin below minimum fork length (50 CFR 622.278)'
                },
                cfr: '50 CFR 622.278'
            }
        }
    }
};

// Ocean Barracuda
SPECIES_DATA['ocean-barracuda'] = {
    name: 'Ocean Barracuda',
    commonName: 'Barracuda',
    image: null,
    imagePath: 'images/fish/Ocean_Barracuda.webp',
    color: '#4ecdc4',
    regulations: {
        permits: {
            'commercial': {
                name: 'Commercial Permit',
                required: false,
                cfr: null,
                notes: 'Check for specific permit requirements'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: null
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial',
                limit: null,
                unit: 'lbs',
                cfr: null,
                notes: 'No federal possession limit. Check state regulations.'
            },
            'recreational': {
                name: 'Recreational',
                limit: null,
                unit: 'fish',
                cfr: null,
                notes: 'No federal possession limit. Check state regulations.'
            }
        },
        size: {
            minimum: null,
            unit: 'varies',
            cfr: null,
            notes: 'No federal size limit. Check state regulations.'
        },
        seasons: {
            federal: {
                open: 'Year-round',
                notes: 'No federal season restrictions'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: false,
                options: [
                    { value: 'commercial', label: 'Commercial Permit', description: 'Commercial fishing - no federal permit required' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational fishing' }
                ],
                notes: 'No federal permit required. Check state regulations.',
                cfr: null
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: 'lbs',
                dependsOn: ['permitType'],
                notes: 'Record total weight in pounds',
                cfr: null
            },
            stateRegulations: {
                question: 'Have state regulations been checked?',
                field: 'stateRegulationsChecked',
                required: true,
                type: 'boolean',
                notes: 'No federal possession limit or size limit for ocean barracuda. Check state regulations for limits.',
                cfr: null
            },
            reportingStatus: {
                question: 'Has the catch been reported?',
                field: 'reported',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Commercial catch must be reported as required by state regulations',
                cfr: null
            }
        }
    }
};

// Wahoo (tigerfish id — 50 CFR 622 Subpart M)
SPECIES_DATA['tigerfish'] = {
    name: 'Wahoo',
    commonName: 'Tigerfish / Ocean Barracuda',
    image: null,
    imagePath: 'images/fish/Tigerfish.webp',
    color: '#ff8787',
    regulations: {
        permits: {
            'commercial': {
                name: 'Atlantic Dolphin/Wahoo Commercial Permit',
                required: true,
                cfr: '50 CFR 622.4',
                notes: 'Operator permit required. 500 lb/trip; north of 39° N without endorsement: 200 lb combined.'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: '50 CFR 622.278',
                notes: '2 wahoo per person per day.'
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial',
                limit: { count: 500, unit: 'lbs per trip' },
                unit: 'lbs',
                cfr: '50 CFR 622.278',
                notes: '500 lb/trip. North of 39° N without endorsement: 200 lb combined dolphin/wahoo.'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 2, unit: 'fish per person per day' },
                cfr: '50 CFR 622.278',
                notes: '2 wahoo per person per day.'
            }
        },
        size: {
            minimum: null,
            unit: 'no federal minimum',
            cfr: '50 CFR 622.278',
            notes: 'No federal minimum size for wahoo.'
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 622.278',
                notes: 'Head and fins intact in EEZ; transfer at sea prohibited.'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Atlantic Dolphin/Wahoo Commercial', description: 'Commercial — operator permit required' },
                    { value: 'recreational', label: 'Recreational', description: '2 wahoo per person per day' }
                ],
                cfr: '50 CFR 622.278'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                dependsOn: ['permitType'],
                notes: 'Commercial: pounds. Recreational: number of fish.',
                cfr: '50 CFR 622.278'
            },
            possessionLimitCheck: {
                question: 'Does possession comply with wahoo limits?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                violation: {
                    ifExceeds: 'VIOLATION: Wahoo possession exceeds federal limit (50 CFR 622.278)'
                },
                cfr: '50 CFR 622.278'
            }
        }
    }
};

// King Mackerel
SPECIES_DATA['king-mackerel'] = {
    name: 'King Mackerel',
    commonName: 'Kingfish',
    image: null,
    imagePath: 'images/fish/King_Mackerel.webp',
    color: '#4a90e2',
    regulations: {
        permits: {
            'commercial': {
                name: 'Limited Access — King Mackerel',
                required: true,
                cfr: '50 CFR 622.4',
                notes: '3,500 lb/trip commercial limit.'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: null
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial',
                limit: { count: 3500, unit: 'lbs per trip' },
                unit: 'lbs',
                cfr: '50 CFR 622.382',
                notes: 'Limited Access — 3,500 lb/trip.'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 3, unit: 'fish per person per day' },
                cfr: '50 CFR 622.382',
                notes: 'Atlantic migratory group: 3 king mackerel per person per day (50 CFR 622.382).'
            }
        },
        size: {
            minimum: 24,
            unit: 'inches (fork length)',
            cfr: '50 CFR 622.382',
            notes: '24″ minimum fork length'
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 622.38',
                notes: 'Subject to quota closures'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'King Mackerel Commercial Permit', description: 'Commercial fishing permit' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational fishing' }
                ],
                cfr: '50 CFR 622.4'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: 'lbs',
                dependsOn: ['permitType'],
                notes: 'Record total weight in pounds (commercial) or number of fish (recreational)',
                cfr: '50 CFR 622.38'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit or quota?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                limits: {
                    'commercial': null,
                    'recreational': { count: 3, unit: 'fish per person per day' }
                },
                notes: 'Recreational: 3 fish/person/day (50 CFR 622.382). Commercial: quota/trip limits per bulletin.',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds permit limit or quota (50 CFR 622.38)'
                },
                cfr: '50 CFR 622.38'
            },
            numberOfFish: {
                question: 'How many king mackerel are on board (recreational)?',
                field: 'numberOfFish',
                required: false,
                type: 'number',
                dependsOn: ['permitType'],
                applicablePermits: ['recreational'],
                notes: '3 fish per person per day (50 CFR 622.382)',
                violation: {
                    ifGreaterThan: 3,
                    message: 'VIOLATION: Recreational bag limit is 3 king mackerel per person per day (50 CFR 622.382)'
                },
                cfr: '50 CFR 622.382'
            },
            sizeCompliance: {
                question: 'What is the fork length of the fish?',
                field: 'forkLength',
                required: true,
                type: 'number',
                unit: 'inches',
                minimum: 24,
                notes: 'Minimum size: 24″ fork length. Measure from tip of snout to fork of tail.',
                violation: {
                    ifBelow: 'VIOLATION: King mackerel below minimum size must be released (50 CFR 622.38)'
                },
                cfr: '50 CFR 622.38'
            },
            quotaStatus: {
                question: 'Is the fishery open or closed due to quota?',
                field: 'quotaStatus',
                required: false,
                type: 'auto',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                autoCheck: true,
                notes: 'Commercial fishery may close when ACL reached — verify NOAA bulletin.',
                cfr: '50 CFR 622.38'
            },
            reportingStatus: {
                question: 'Has the catch been reported?',
                field: 'reported',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Commercial catch must be reported as required',
                violation: {
                    ifFalse: 'VIOLATION: Commercial catch reporting required (50 CFR 622.7)'
                },
                cfr: '50 CFR 622.7'
            }
        }
    }
};

// Spanish Mackerel
SPECIES_DATA['spanish-mackerel'] = {
    name: 'Spanish Mackerel',
    commonName: 'Spanish Mackerel',
    image: null,
    imagePath: 'images/fish/Spanish_Mackerel.webp',
    color: '#4a90e2',
    regulations: {
        permits: {
            'commercial': {
                name: 'Open Access — Spanish Mackerel',
                required: true,
                cfr: '50 CFR 622.4',
                notes: '3,500 lb/trip commercial limit.'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: null
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial',
                limit: { count: 3500, unit: 'lbs per trip' },
                unit: 'lbs',
                cfr: '50 CFR 622.382',
                notes: 'Open Access — 3,500 lb/trip.'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 15, unit: 'fish per person per day' },
                cfr: '50 CFR 622.382',
                notes: 'Atlantic migratory group: 15 Spanish mackerel per person per day (50 CFR 622.382).'
            }
        },
        size: {
            minimum: 12,
            unit: 'inches (fork length)',
            cfr: '50 CFR 622.382',
            notes: '12″ minimum fork length'
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 622.38',
                notes: 'Subject to quota closures'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Spanish Mackerel Commercial Permit', description: 'Commercial fishing permit' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational fishing' }
                ],
                cfr: '50 CFR 622.4'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: 'lbs',
                dependsOn: ['permitType'],
                notes: 'Record total weight in pounds (commercial) or number of fish (recreational)',
                cfr: '50 CFR 622.38'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit or quota?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                limits: {
                    'commercial': null,
                    'recreational': { count: 15, unit: 'fish per person per day' }
                },
                notes: 'Recreational: 15 fish/person/day (50 CFR 622.382). Commercial: quota/trip limits per bulletin.',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds permit limit or quota (50 CFR 622.38)'
                },
                cfr: '50 CFR 622.38'
            },
            numberOfFish: {
                question: 'How many Spanish mackerel are on board (recreational)?',
                field: 'numberOfFish',
                required: false,
                type: 'number',
                dependsOn: ['permitType'],
                applicablePermits: ['recreational'],
                notes: '15 fish per person per day (50 CFR 622.382)',
                violation: {
                    ifGreaterThan: 15,
                    message: 'VIOLATION: Recreational bag limit is 15 Spanish mackerel per person per day (50 CFR 622.382)'
                },
                cfr: '50 CFR 622.382'
            },
            sizeCompliance: {
                question: 'What is the fork length of the fish?',
                field: 'forkLength',
                required: true,
                type: 'number',
                unit: 'inches',
                minimum: 12,
                notes: 'Minimum size: 12″ fork length. Measure from tip of snout to fork of tail.',
                violation: {
                    ifBelow: 'VIOLATION: Spanish mackerel below minimum size must be released (50 CFR 622.38)'
                },
                cfr: '50 CFR 622.38'
            },
            quotaStatus: {
                question: 'Is the fishery open or closed due to quota?',
                field: 'quotaStatus',
                required: false,
                type: 'auto',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                autoCheck: true,
                notes: 'Commercial fishery may close when ACL reached — verify NOAA bulletin.',
                cfr: '50 CFR 622.38'
            },
            reportingStatus: {
                question: 'Has the catch been reported?',
                field: 'reported',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Commercial catch must be reported as required',
                violation: {
                    ifFalse: 'VIOLATION: Commercial catch reporting required (50 CFR 622.7)'
                },
                cfr: '50 CFR 622.7'
            }
        }
    }
};

// Atlantic Chub Mackerel (648 Subpart P forage)
SPECIES_DATA['atlantic-chub-mackerel'] = {
    name: 'Atlantic Chub Mackerel',
    commonName: 'Chub Mackerel',
    image: null,
    imagePath: 'images/fish/Atlantic_Chub_Marckerel.webp',
    color: '#4a90e2',
    regulations: {
        permits: {
            'commercial': {
                name: 'Mid-Atlantic Forage Commercial',
                required: true,
                cfr: '50 CFR 648.94',
                notes: 'Operator permit required. 1,700 lb/trip all forage species combined.'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: '50 CFR 648.94',
                notes: 'No federal recreational possession limit.'
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial',
                limit: { count: 1700, unit: 'lbs combined forage per trip' },
                unit: 'lbs',
                cfr: '50 CFR 648.94',
                notes: '1,700 lb/trip all Mid-Atlantic forage species combined.'
            },
            'recreational': {
                name: 'Recreational',
                limit: null,
                unit: 'fish',
                cfr: '50 CFR 648.94',
                notes: 'No federal recreational possession limit.'
            }
        },
        size: {
            minimum: null,
            unit: 'not regulated federally',
            cfr: '50 CFR 648.94',
            notes: 'No federal minimum size for forage species.'
        },
        seasons: {
            federal: {
                open: 'Year-round',
                notes: 'No federal season restrictions'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Commercial Permit', description: 'Commercial fishing - Check for specific permit requirements' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational fishing - No federal permit required' }
                ],
                cfr: null
            },
            possessionAmount: {
                question: 'How many Atlantic chub mackerel are on board?',
                field: 'numberOfFish',
                required: true,
                type: 'number',
                unit: 'fish',
                dependsOn: ['permitType'],
                notes: 'Record total number of Atlantic chub mackerel on board',
                cfr: null
            },
            possessionLimitCheck: {
                question: 'Does the possession amount comply with permit limits?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'numberOfFish'],
                autoCheck: true,
                limits: {
                    'commercial': null, // No federal limit
                    'recreational': null // No federal limit
                },
                notes: 'No federal possession limit. Check state regulations.',
                cfr: null
            },
            stateRegulationsCheck: {
                question: 'Have state regulations been checked?',
                field: 'stateRegsChecked',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                notes: 'No federal size or possession limits. Check state regulations for restrictions.',
                violation: {
                    ifFalse: 'WARNING: Verify compliance with state regulations'
                },
                cfr: null
            },
            reportingStatus: {
                question: 'Has the catch been reported if required?',
                field: 'reported',
                required: false,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                notes: 'Check if commercial catch reporting is required',
                cfr: null
            }
        }
    }
};
