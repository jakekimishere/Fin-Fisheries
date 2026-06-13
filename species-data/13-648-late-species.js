// 648 bluefish, scup, BSB, etc.
// Auto-split from species-data.js — edit here for routine updates.

// Bluefish
SPECIES_DATA['bluefish'] = {
    name: 'Bluefish',
    commonName: 'Bluefish',
    image: null,
    imagePath: 'images/fish/Bluefish.jpg',
    color: '#4682b4',
    available: true,
    regulations: {
        permits: {
            'commercial': {
                name: 'Open Access Commercial Moratorium',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'recreational': {
                name: 'Recreational - Private Vessel',
                required: false,
                cfr: null
            },
            'recreational-for-hire': {
                name: 'Recreational - For-Hire / Charter',
                required: true,
                cfr: '50 CFR 648.4',
                notes: 'Bluefish charter/party vessel permit required for for-hire trips'
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial',
                limit: null, // No federal limit, state limits may apply
                unit: 'lbs',
                cfr: '50 CFR 648.160',
                notes: 'No federal possession limit. Check state regulations.'
            },
            'recreational': {
                name: 'Recreational - Private',
                limit: { count: 5, unit: 'fish per person per day' },
                cfr: '50 CFR 648.160',
                notes: 'Private recreational vessels: 5 bluefish per person per day (2026 specs, effective Feb 19, 2026).'
            },
            'recreational-for-hire': {
                name: 'Recreational - For-Hire',
                limit: { count: 7, unit: 'fish per person per day' },
                cfr: '50 CFR 648.160',
                notes: 'For-hire/charter vessels: 7 bluefish per person per day (2026 specs).'
            }
        },
        dataSources: [
            {
                title: 'NOAA 2026 Bluefish Specifications',
                url: 'https://www.fisheries.noaa.gov/action/2026-and-projected-2027-summer-flounder-scup-black-sea-bass-and-bluefish-specifications',
                effective: '2026-02-19'
            }
        ],
        size: {
            minimum: null,
            unit: 'No federal minimum size',
            cfr: '50 CFR 648.160',
            notes: 'Check state regulations for size limits'
        },
        gear: {
            'general': {
                name: 'General Gear',
                cfr: '50 CFR 648.160',
                notes: 'No federal gear restrictions — verify year-round closed areas.'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Open Access Commercial Moratorium', description: 'Commercial moratorium permit' },
                    { value: 'recreational', label: 'Recreational - Private Vessel', description: 'Private angler, no charter permit' },
                    { value: 'recreational-for-hire', label: 'Recreational - For-Hire / Charter', description: 'Charter or party boat with bluefish permit' }
                ],
                cfr: '50 CFR 648.4'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'choice',
                dependsOn: ['permitType'],
                unit: {
                    commercial: 'lbs',
                    recreational: 'fish',
                    'recreational-for-hire': 'fish'
                },
                notes: 'Record total weight in pounds (commercial) or number of fish (recreational)',
                cfr: '50 CFR 648.160'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                limits: {
                    'commercial': null,
                    'recreational': { count: 5, unit: 'fish per person per day' },
                    'recreational-for-hire': { count: 7, unit: 'fish per person per day' }
                },
                notes: '2026 specs: private 5/day; for-hire 7/day. State rules may differ.',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds federal bluefish bag limit (50 CFR 648.160)'
                },
                cfr: '50 CFR 648.160'
            },
            recreationalBagLimit: {
                question: 'How many bluefish are on board (recreational)?',
                field: 'numberOfFish',
                required: false,
                type: 'number',
                dependsOn: ['permitType'],
                applicablePermits: ['recreational', 'recreational-for-hire'],
                notes: 'Private: 5 per person per day. For-hire: 7 per person per day (2026 specs).',
                violation: {
                    ifExceeds: 'VIOLATION: Recreational bag limit exceeded (50 CFR 648.160)'
                },
                cfr: '50 CFR 648.160'
            },
            stateRegulations: {
                question: 'Have state regulations been checked?',
                field: 'stateRegulationsChecked',
                required: false,
                type: 'boolean',
                notes: 'Federal limits: private 5/day, for-hire 7/day (2026). State regulations may be more restrictive.',
                cfr: '50 CFR 648.160'
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
            },
            operatorPermit: {
                question: 'Does the operator hold a valid federal operator permit?',
                field: 'operatorPermit',
                required: false,
                type: 'choice',
                applicablePermits: ['commercial', 'recreational-for-hire'],
                violation: {
                    ifFalse: 'VIOLATION: Commercial or charter/party fishing requires valid operator permit (50 CFR 648.4)'
                },
                cfr: '50 CFR 648.4'
            }
        }
    }
};

// Black Sea Bass
SPECIES_DATA['black-sea-bass'] = {
    name: 'Black Sea Bass',
    commonName: 'Black Sea Bass',
    image: null,
    imagePath: 'images/fish/Black_Sea_Bass.jpg',
    color: '#000000',
    available: true,
    regulations: {
        permits: {
            'commercial': {
                name: 'Commercial Moratorium Permit',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'charter-headboat': {
                name: 'Charter/Party Vessel Permit',
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
                name: 'Commercial Moratorium',
                limit: null,
                unit: 'lbs',
                cfr: '50 CFR 648.140',
                notes: 'Unlimited; must be stored in standard 100 lb totes. Trawl mesh rules above 500 lb/trip Jan–Mar or 100 lb/trip Apr–Dec.'
            },
            'charter-headboat': {
                name: 'Charter/Party',
                limit: null,
                unit: 'fish',
                cfr: '50 CFR 648.140',
                notes: 'Federal limits waived — state of landing applies. More restrictive of federal vs state if both apply. Exclude captain/crew from person count.'
            },
            'recreational': {
                name: 'Recreational',
                limit: null,
                unit: 'fish',
                cfr: '50 CFR 648.140',
                notes: 'Federal limits waived — verify state conservation equivalency measures.'
            }
        },
        dataSources: [
            {
                title: 'NOAA 2026 Black Sea Bass Specifications',
                url: 'https://www.fisheries.noaa.gov/action/2026-and-projected-2027-summer-flounder-scup-black-sea-bass-and-bluefish-specifications',
                effective: '2026-02-19'
            },
            {
                title: '2026–2027 Recreational Management Measures',
                url: 'https://www.federalregister.gov/documents/2026/04/30/2026-08409/fisheries-of-the-northeastern-united-states-2026-and-2027-summer-flounder-scup-and-black-sea-bass',
                effective: '2026-04-30'
            }
        ],
        size: {
            minimum: 11,
            unit: 'inches (total length)',
            cfr: '50 CFR 648.140',
            commercialMinimum: 11,
            charterMinimum: 15,
            notes: 'Commercial moratorium 11″ TL; charter/party 15″; recreational — state requirements.'
        },
        gear: {
            'otter-trawl': {
                name: 'Otter Trawl',
                mesh: {
                    minimum: { diamond: 4.5 },
                    cfr: '50 CFR 648.140',
                    notes: '4.5″ diamond in codend (75 meshes) or entire net if codend <75 meshes when over seasonal lb thresholds.'
                }
            },
            'trap-pot': {
                name: 'Trap/Pot',
                cfr: '50 CFR 648.140',
                notes: 'Degradable hinges; escape vents (rect 1 3/8″×5 3/4″, square 2″, circle 2.5″, or lath spacing); state/RA ID. ALWTRP areas.'
            }
        },
        seasons: {
            federal: {
                open: 'Seasonal with closures',
                cfr: '50 CFR 648.140',
                notes: 'Federal recreational/charter measures waived — state CE applies.'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Commercial Moratorium Permit', description: 'Commercial moratorium — unlimited in 100 lb totes' },
                    { value: 'charter-headboat', label: 'Charter/Party Vessel Permit', description: 'For-hire — state CE limits apply' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational — verify state CE' }
                ],
                cfr: '50 CFR 648.4'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                dependsOn: ['permitType'],
                unit: {
                    commercial: 'lbs',
                    recreational: 'fish',
                    'charter-headboat': 'fish'
                },
                notes: 'Commercial: pounds (standard 100 lb totes). Recreational/charter: number of fish.',
                cfr: '50 CFR 648.140'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount', 'dateOfCatch', 'meshSize', 'gearType'],
                autoCheck: true,
                useAssessmentDate: true,
                limits: {
                    commercial: null,
                    recreational: null,
                    'charter-headboat': null
                },
                notes: 'Commercial unlimited with compliant storage/mesh. Recreational/charter: verify state measures.',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds permit limit (50 CFR 648.140)'
                },
                cfr: '50 CFR 648.140'
            },
            gearType: {
                question: 'What gear is being used?',
                field: 'gearType',
                required: false,
                type: 'choice',
                applicablePermits: ['commercial'],
                options: [
                    { value: 'otter-trawl', label: 'Otter Trawl' },
                    { value: 'trap-pot', label: 'Trap/Pot' },
                    { value: 'other', label: 'Other gear' }
                ],
                cfr: '50 CFR 648.140'
            },
            meshSize: {
                question: 'Trawl mesh compliance (4.5″ diamond, 75 meshes forward of codend)?',
                field: 'meshSize',
                required: false,
                type: 'choice',
                dependsOn: ['gearType'],
                applicableGear: ['otter-trawl'],
                options: [
                    { value: 'compliant-mesh', label: 'Compliant — 4.5″ diamond (75 meshes or full net)' },
                    { value: 'non-compliant-mesh', label: 'Non-compliant mesh' }
                ],
                cfr: '50 CFR 648.140'
            },
            toteStorage: {
                question: 'Is commercial catch stored in standard 100 lb totes?',
                field: 'toteStorage',
                required: false,
                type: 'choice',
                applicablePermits: ['commercial'],
                violation: {
                    ifFalse: 'VIOLATION: Commercial black sea bass must be stored in standard 100 lb totes (50 CFR 648.140)'
                },
                cfr: '50 CFR 648.140'
            },
            sizeCompliance: {
                question: 'Do black sea bass meet minimum size (11″ commercial / 15″ charter / state recreational)?',
                field: 'size-compliant',
                required: true,
                type: 'choice',
                violation: {
                    ifEquals: 'no',
                    message: 'VIOLATION: Black sea bass below minimum size must be released (50 CFR 648.140)'
                },
                cfr: '50 CFR 648.140'
            },
            operatorPermit: {
                question: 'Does the operator hold a valid federal operator permit?',
                field: 'operatorPermit',
                required: false,
                type: 'choice',
                applicablePermits: ['commercial', 'charter-headboat'],
                violation: {
                    ifEquals: 'no',
                    message: 'VIOLATION: Commercial or charter/party fishing requires valid operator permit (50 CFR 648.4)'
                },
                cfr: '50 CFR 648.4'
            },
            seasonStatus: {
                question: 'Is the fishery open for this date and area?',
                field: 'seasonStatus',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'dateOfCatch'],
                useAssessmentDate: true,
                autoCheck: true,
                notes: 'Verify state season for recreational/charter; commercial seasonal closures.',
                cfr: '50 CFR 648.140'
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

// Scup
SPECIES_DATA['scup'] = {
    name: 'Scup',
    commonName: 'Porgy',
    image: null,
    imagePath: 'images/fish/Scup.webp',
    color: '#d2691e',
    available: true,
    regulations: {
        permits: {
            'commercial': {
                name: 'Commercial Moratorium Permit',
                required: true,
                cfr: '50 CFR 648.4'
            },
            'charter-headboat': {
                name: 'Charter/Party Vessel Permit',
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
                name: 'Commercial Moratorium',
                limit: null,
                unit: 'lbs',
                cfr: '50 CFR 648.121',
                notes: 'Winter I (Jan 1–Apr 30) closed in EEZ. Summer (May–Sep): state regulations. Winter II (Oct–Dec): 12,000 lb/trip with compliant mesh.'
            },
            'charter-headboat': {
                name: 'Charter/Party',
                limit: { count: 40, unit: 'fish per person' },
                cfr: '50 CFR 648.121',
                notes: '40 fish per person; captain and crew do not count. Verify state CE.'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 40, unit: 'fish per person' },
                cfr: '50 CFR 648.121',
                notes: 'Federal reference 40 fish/person — verify state conservation equivalency measures.'
            }
        },
        dataSources: [
            {
                title: 'NOAA 2026 Scup Specifications',
                url: 'https://www.fisheries.noaa.gov/action/2026-and-projected-2027-summer-flounder-scup-black-sea-bass-and-bluefish-specifications',
                effective: '2026-02-19'
            },
            {
                title: '2026–2027 Recreational Management Measures',
                url: 'https://www.federalregister.gov/documents/2026/04/30/2026-08409/fisheries-of-the-northeastern-united-states-2026-and-2027-summer-flounder-scup-and-black-sea-bass',
                effective: '2026-04-30'
            }
        ],
        size: {
            minimum: 9,
            unit: 'inches (total length)',
            cfr: '50 CFR 648.121',
            commercialMinimum: 9,
            recreationalMinimum: 10,
            charterMinimum: 10,
            notes: 'Commercial moratorium 9″ TL; charter/party and recreational 10″ TL.'
        },
        gear: {
            'otter-trawl': {
                name: 'Otter Trawl',
                mesh: {
                    minimum: { diamond: 5.0 },
                    cfr: '50 CFR 648.121',
                    notes: '>5″ diamond for 75 continuous meshes forward of codend (entire net ≥5″ if codend <75 meshes). Reduced limits if non-compliant.'
                },
                rollerMax: { diameter: 18, unit: 'inches', cfr: '50 CFR 648.121' }
            },
            'trap-pot': {
                name: 'Trap/Pot',
                cfr: '50 CFR 648.121',
                notes: 'Degradable hinges, escape vents (≥3.1″ circle or equivalent), state/RA ID. See ALWTRP trap/pot areas.'
            }
        },
        seasons: {
            federal: {
                open: 'Seasonal with closures',
                cfr: '50 CFR 648.121',
                notes: 'Winter I closed Jan–Apr EEZ; Winter II Oct–Dec 12,000 lb/trip; summer state-managed.'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Commercial Moratorium Permit', description: 'Commercial moratorium permit' },
                    { value: 'charter-headboat', label: 'Charter/Party Vessel Permit', description: 'For-hire — 40 fish/person (exclude captain/crew)' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational — verify state CE' }
                ],
                cfr: '50 CFR 648.4'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                dependsOn: ['permitType'],
                unit: {
                    commercial: 'lbs',
                    recreational: 'fish',
                    'charter-headboat': 'fish'
                },
                notes: 'Commercial: pounds. Recreational/charter: number of fish.',
                cfr: '50 CFR 648.121'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount', 'dateOfCatch', 'meshSize'],
                autoCheck: true,
                useAssessmentDate: true,
                limits: {
                    commercial: null,
                    recreational: { count: 40, unit: 'fish per person' },
                    'charter-headboat': { count: 40, unit: 'fish per person' }
                },
                notes: 'Commercial limits vary by season and mesh. Winter I closed in EEZ.',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds permit limit (50 CFR 648.121)'
                },
                cfr: '50 CFR 648.121'
            },
            gearType: {
                question: 'What gear is being used?',
                field: 'gearType',
                required: false,
                type: 'choice',
                applicablePermits: ['commercial'],
                options: [
                    { value: 'otter-trawl', label: 'Otter Trawl' },
                    { value: 'trap-pot', label: 'Trap/Pot' },
                    { value: 'other', label: 'Other gear' }
                ],
                cfr: '50 CFR 648.121'
            },
            meshSize: {
                question: 'Trawl mesh compliance (>5″ diamond, 75 meshes forward of codend)?',
                field: 'meshSize',
                required: false,
                type: 'choice',
                dependsOn: ['gearType'],
                applicableGear: ['otter-trawl'],
                options: [
                    { value: 'compliant-mesh', label: 'Compliant — >5″ diamond (75 meshes or full net)' },
                    { value: 'reduced-mesh', label: 'Non-compliant — reduced possession limits apply' }
                ],
                cfr: '50 CFR 648.121'
            },
            sizeCompliance: {
                question: 'Do scup meet minimum size (9″ commercial / 10″ charter or recreational)?',
                field: 'size-compliant',
                required: true,
                type: 'choice',
                violation: {
                    ifEquals: 'no',
                    message: 'VIOLATION: Scup below minimum size must be released (50 CFR 648.121)'
                },
                cfr: '50 CFR 648.121'
            },
            operatorPermit: {
                question: 'Does the operator hold a valid federal operator permit?',
                field: 'operatorPermit',
                required: false,
                type: 'choice',
                applicablePermits: ['commercial', 'charter-headboat'],
                violation: {
                    ifEquals: 'no',
                    message: 'VIOLATION: Commercial or charter/party fishing requires valid operator permit (50 CFR 648.4)'
                },
                cfr: '50 CFR 648.4'
            },
            seasonStatus: {
                question: 'Is the fishery open for this date and area?',
                field: 'seasonStatus',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'dateOfCatch'],
                useAssessmentDate: true,
                autoCheck: true,
                notes: 'Winter I closed Jan 1–Apr 30 in EEZ for commercial moratorium.',
                cfr: '50 CFR 648.121'
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

// Tautog
SPECIES_DATA['tautog'] = {
    name: 'Tautog',
    commonName: 'Blackfish',
    image: null,
    imagePath: 'images/fish/Tautog.webp',
    color: '#2f4f4f',
    available: true,
    regulations: {
        permits: {
            'commercial': {
                name: 'Commercial Federal Permit',
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
                limit: null, // Varies by season
                unit: 'lbs',
                cfr: '50 CFR 648.163',
                notes: 'Commercial possession varies by season — verify NOAA Greater Atlantic bulletin.'
            },
            'recreational': {
                name: 'Recreational',
                limit: null,
                cfr: '50 CFR 648.163',
                notes: 'Federal recreational bag limit waived; state conservation equivalency measures apply (2026).'
            }
        },
        size: {
            minimum: 16,
            unit: 'inches (total length)',
            cfr: '50 CFR 648.163',
            notes: '16 inches total length minimum'
        },
        gear: {
            'general': {
                name: 'General Gear',
                cfr: '50 CFR 648.163',
                notes: 'Check for area-specific gear restrictions'
            }
        },
        seasons: {
            federal: {
                open: 'Seasonal with closures',
                cfr: '50 CFR 648.163',
                notes: 'Seasonal closures may apply — verify state CE measures and NOAA bulletin.'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Commercial Federal Permit', description: 'Commercial fishing permit' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational fishing' }
                ],
                cfr: '50 CFR 648.4'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'choice',
                dependsOn: ['permitType'],
                unit: {
                    commercial: 'lbs',
                    recreational: 'fish'
                },
                notes: 'Record total weight in pounds (commercial) or number of fish (recreational)',
                cfr: '50 CFR 648.163'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount', 'dateOfCatch'],
                autoCheck: true,
                useAssessmentDate: true,
                limits: {
                    'commercial': null,
                    'recreational': null
                },
                notes: 'Federal recreational bag waived (conservation equivalency). Commercial limits vary by season. Verify state measures.',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds permit limit (50 CFR 648.163)'
                },
                cfr: '50 CFR 648.163'
            },
            sizeCompliance: {
                question: 'What is the total length of the fish?',
                field: 'totalLength',
                required: true,
                type: 'number',
                unit: 'inches',
                minimum: 16,
                notes: 'Minimum size: 16" total length. Measure from tip of snout to tip of tail.',
                violation: {
                    ifBelow: 'VIOLATION: Tautog below minimum size must be released (50 CFR 648.163)'
                },
                cfr: '50 CFR 648.163'
            },
            stateRegulationsCheck: {
                question: 'Have applicable state recreational measures been verified?',
                field: 'stateRegsChecked',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['recreational'],
                notes: 'Federal coastwide recreational measures waived — state bag/size/season apply.',
                violation: {
                    ifFalse: 'WARNING: Verify state conservation equivalency measures for tautog'
                },
                cfr: '50 CFR 648.163'
            },
            seasonStatus: {
                question: 'Is the fishery open for this date and area?',
                field: 'seasonStatus',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'dateOfCatch'],
                useAssessmentDate: true,
                autoCheck: true,
                notes: 'Verify state season and closure dates for the assessment area.',
                cfr: '50 CFR 648.163'
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

// Spiny Dogfish
SPECIES_DATA['spiny-dogfish'] = {
    name: 'Spiny Dogfish',
    commonName: 'Dogfish',
    image: null,
    imagePath: 'images/fish/Spiny_Dogfish.jpg',
    color: '#708090',
    available: true,
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
                limit: { count: 7500, unit: 'lbs per trip' },
                cfr: '50 CFR 648.230',
                notes: '7,500 lb/trip; only one spiny dogfish trip per calendar day.'
            },
            'recreational': {
                name: 'Recreational',
                limit: null,
                unit: 'lbs',
                cfr: '50 CFR 648.230',
                notes: 'No federal possession limit — comply with state size and possession rules.'
            }
        },
        size: {
            minimum: null,
            unit: 'No federal minimum size',
            cfr: '50 CFR 648.230',
            notes: 'States may set more restrictive size and possession limits.'
        },
        gear: {
            'trawl-gillnet': {
                name: 'Trawl or Gillnet',
                cfr: '50 CFR 648.230',
                notes: '6.5″ square or diamond mesh in all RMAs unless in exemption area. Gillnet max 300 feet.'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Open Access — General', description: '7,500 lb/trip; one trip per calendar day' },
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
                cfr: '50 CFR 648.230'
            },
            recreationalRetention: {
                question: 'Does recreational catch comply with applicable state size and possession rules?',
                field: 'stateRegulationsChecked',
                required: false,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['recreational'],
                notes: 'No federal recreational possession limit — state rules apply.',
                violation: {
                    ifFalse: 'VIOLATION: Recreational spiny dogfish must comply with state regulations (50 CFR 648.230)'
                },
                cfr: '50 CFR 648.230'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                limits: {
                    'commercial': { count: 7500, unit: 'lbs per trip' },
                    'recreational': null
                },
                notes: 'Commercial: 7,500 lb/trip; one trip per calendar day. Recreational: verify state rules.',
                violation: {
                    ifExceeds: 'VIOLATION: Spiny dogfish possession exceeds 7,500 lb/trip limit (50 CFR 648.230)'
                },
                cfr: '50 CFR 648.230'
            },
            operatorPermit: {
                question: 'Does the operator hold a valid federal operator permit?',
                field: 'operatorPermit',
                required: false,
                type: 'choice',
                applicablePermits: ['commercial'],
                violation: {
                    ifFalse: 'VIOLATION: Commercial spiny dogfish fishing requires valid operator permit (50 CFR 648.4)'
                },
                cfr: '50 CFR 648.4'
            },
            gearType: {
                question: 'What gear is being used?',
                field: 'gearType',
                required: false,
                type: 'choice',
                dependsOn: ['permitType'],
                applicablePermits: ['commercial'],
                options: [
                    { value: 'otter-trawl', label: 'Otter Trawl', notes: '6.5″ square or diamond mesh unless in exemption area' },
                    { value: 'gillnet', label: 'Gillnet', notes: '6.5″ mesh; max 300 feet; overnight soak rules in sturgeon areas' },
                    { value: 'hand-gear', label: 'Hand Gear', notes: 'Allowed in some exemption areas' },
                    { value: 'longline', label: 'Longline', notes: 'Allowed in some exemption areas' }
                ],
                cfr: '50 CFR 648.230'
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
                cfr: '50 CFR 648.230'
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

// Striped Bass (50 CFR Part 697 — prohibited in EEZ except Block Island Sound transit)
SPECIES_DATA['striped-bass'] = {
    name: 'Striped Bass',
    commonName: 'Striped Bass',
    image: null,
    imagePath: 'images/fish/Striped_Bass.webp',
    color: '#20b2aa',
    available: true,
    regulations: {
        permits: {
            'commercial': {
                name: 'Not Regulated (Federal EEZ)',
                required: false,
                cfr: '50 CFR 697.7',
                notes: 'Prohibited in the EEZ except Block Island Sound transit exemption. State waters managed by states.'
            },
            'recreational': {
                name: 'Recreational (No Federal Permit Required)',
                required: false,
                cfr: '50 CFR 697.7',
                notes: 'Prohibited in the EEZ except Block Island Sound transit exemption.'
            }
        },
        possession: {
            'commercial': {
                name: 'Commercial',
                limit: { count: 0 },
                unit: 'fish',
                cfr: '50 CFR 697.7',
                notes: 'PROHIBITED in the EEZ except Block Island Sound continuous transit (no fishing from vessel in EEZ).'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 0 },
                unit: 'fish',
                cfr: '50 CFR 697.7',
                notes: 'PROHIBITED in the EEZ except Block Island Sound continuous transit (no fishing from vessel in EEZ).'
            }
        },
        size: {
            minimum: null,
            unit: 'N/A in prohibited EEZ',
            cfr: '50 CFR 697.7',
            notes: 'Harvest prohibited in EEZ outside transit exemption. State waters — verify state rules.'
        },
        gear: {
            'general': {
                name: 'General Gear',
                cfr: '50 CFR 697.7',
                notes: 'Fishing for striped bass from a vessel in the EEZ is prohibited.'
            }
        },
        areas: {
            restrictions: true,
            cfr: '50 CFR 697.7',
            notes: 'EEZ prohibited except Block Island Sound transit: north of Montauk–Block Island line and west of Point Judith–Block Island line; continuous transit only, no fishing from vessel in EEZ.'
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: false,
                options: [
                    { value: 'commercial', label: 'Commercial', description: 'Commercial fishing — EEZ prohibition applies' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational fishing — EEZ prohibition applies' }
                ],
                notes: 'Atlantic striped bass is prohibited in the EEZ except Block Island Sound transit exemption.',
                cfr: '50 CFR 697.7'
            },
            fishingArea: {
                question: 'Where is the vessel / catch relative to federal waters?',
                field: 'fishingArea',
                required: true,
                type: 'choice',
                options: [
                    { value: 'eez', label: 'EEZ (outside transit exemption)', notes: 'Possession prohibited — release immediately' },
                    { value: 'block-island-transit', label: 'Block Island Sound EEZ transit corridor', notes: 'Possession permitted only in continuous transit; no fishing from vessel in EEZ' },
                    { value: 'state-waters', label: 'State waters', notes: 'State regulations apply' }
                ],
                notes: 'Transit exemption: EEZ within Block Island Sound north of Montauk–Block Island line and west of Point Judith–Block Island line.',
                cfr: '50 CFR 697.7'
            },
            possessionAmount: {
                question: 'How many striped bass are on board?',
                field: 'possessionAmount',
                required: true,
                type: 'number',
                unit: 'fish',
                dependsOn: ['fishingArea'],
                notes: 'Any striped bass on board in the EEZ outside the transit corridor is a violation.',
                cfr: '50 CFR 697.7'
            },
            possessionLimitCheck: {
                question: 'Does possession comply with EEZ rules?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['fishingArea', 'possessionAmount'],
                autoCheck: true,
                notes: 'Prohibited in EEZ except Block Island Sound continuous transit.',
                violation: {
                    ifExceeds: 'VIOLATION: Atlantic striped bass prohibited in the EEZ (50 CFR 697.7)',
                    ifProhibited: 'VIOLATION: Atlantic striped bass prohibited in the EEZ (50 CFR 697.7)'
                },
                cfr: '50 CFR 697.7'
            },
            stateRegulations: {
                question: 'Have state regulations been checked (if in state waters)?',
                field: 'stateRegulationsChecked',
                required: false,
                type: 'boolean',
                notes: 'Striped bass is primarily managed by individual states in state waters.',
                cfr: null
            }
        }
    }
};
