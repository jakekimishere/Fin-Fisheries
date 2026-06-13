// 648 bluefish, scup, BSB, etc.
// Auto-split from species-data.js — edit here for routine updates.

// Add additional Northeast species with full regulations
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
                name: 'Commercial Federal Permit',
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
                notes: 'Check for area-specific gear restrictions'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Commercial Federal Permit', description: 'Commercial fishing permit' },
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
                limit: null, // Varies by season and area
                unit: 'lbs',
                cfr: '50 CFR 648.140',
                notes: 'Possession limits vary by season and management area. Check current regulations.'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 15, unit: 'fish' },
                cfr: '50 CFR 648.140',
                notes: 'Reference federal coastwide limit (status quo). Apr 30, 2026 rule: federal measures waived—conservation equivalency; state bag/size/season apply (~20% collective harvest increase).'
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
            minimum: 12.5,
            unit: 'inches (total length)',
            cfr: '50 CFR 648.140',
            notes: '12.5 inches total length minimum'
        },
        gear: {
            'general': {
                name: 'General Gear',
                cfr: '50 CFR 648.140',
                notes: 'Check for area-specific gear restrictions'
            }
        },
        seasons: {
            federal: {
                open: 'Seasonal with closures',
                cfr: '50 CFR 648.140',
                notes: '2026 specs: commercial quota 7.83M lb; recreational RHL 8.14M lb. Federal recreational measures waived—conservation equivalency (state measures apply).'
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
                cfr: '50 CFR 648.140'
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
                    'commercial': null, // Varies by season and area - check current regulations
                    'recreational': null // Conservation equivalency — verify state bag limit
                },
                notes: 'Commercial limits vary by season and area. Recreational: verify state/region measures under conservation equivalency (federal coastwide waived Apr 2026).',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds permit limit (50 CFR 648.140)'
                },
                cfr: '50 CFR 648.140'
            },
            sizeCompliance: {
                question: 'What is the total length of the fish?',
                field: 'totalLength',
                required: true,
                type: 'number',
                unit: 'inches',
                minimum: 12.5,
                notes: 'Minimum size: 12.5" total length. Measure from tip of snout to tip of tail.',
                violation: {
                    ifBelow: 'VIOLATION: Black sea bass below minimum size must be released (50 CFR 648.140)'
                },
                cfr: '50 CFR 648.140'
            },
            recreationalBagLimit: {
                question: 'How many black sea bass are on board (recreational)?',
                field: 'numberOfFish',
                required: false,
                type: 'number',
                dependsOn: ['permitType'],
                applicablePermits: ['recreational'],
                limit: { count: 15, unit: 'fish per person per day' },
                notes: 'Recreational limit: 15 fish per person per day (varies by state and season)',
                violation: {
                    ifExceeds: 'VIOLATION: Recreational bag limit is 15 fish per person per day (50 CFR 648.140)'
                },
                cfr: '50 CFR 648.140'
            },
            seasonStatus: {
                question: 'Is the fishery open for this date and area?',
                field: 'seasonStatus',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'dateOfCatch'],
                useAssessmentDate: true,
                autoCheck: true,
                notes: 'Check current season dates and closures - seasonal with closures',
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
                cfr: '50 CFR 648.121',
                notes: 'Possession limits vary by season. Check current regulations.'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 30, unit: 'fish' },
                cfr: '50 CFR 648.121',
                notes: 'Status quo federal coastwide: 30 fish per person per day (2026–2027 rec measures rule, Apr 30, 2026). Verify state measures.'
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
            notes: '9 inches total length minimum'
        },
        gear: {
            'general': {
                name: 'General Gear',
                cfr: '50 CFR 648.121',
                notes: 'Check for area-specific gear restrictions'
            }
        },
        seasons: {
            federal: {
                open: 'Seasonal with closures',
                cfr: '50 CFR 648.121',
                notes: '2026 specs: commercial quota 17.70M lb; recreational RHL 13.17M lb. Status quo federal recreational measures (30 fish) for 2026–2027.'
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
                cfr: '50 CFR 648.121'
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
                    'commercial': null, // Varies by season - check current regulations
                    'recreational': { count: 30, unit: 'fish per person per day' }
                },
                notes: 'Commercial limits vary by season - check current regulations. Recreational: 30 fish per person per day (varies by state and season).',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds permit limit (50 CFR 648.121)'
                },
                cfr: '50 CFR 648.121'
            },
            sizeCompliance: {
                question: 'What is the total length of the fish?',
                field: 'totalLength',
                required: true,
                type: 'number',
                unit: 'inches',
                minimum: 9,
                notes: 'Minimum size: 9" total length. Measure from tip of snout to tip of tail.',
                violation: {
                    ifBelow: 'VIOLATION: Scup below minimum size must be released (50 CFR 648.121)'
                },
                cfr: '50 CFR 648.121'
            },
            recreationalBagLimit: {
                question: 'How many scup are on board (recreational)?',
                field: 'numberOfFish',
                required: false,
                type: 'number',
                dependsOn: ['permitType'],
                applicablePermits: ['recreational'],
                limit: { count: 30, unit: 'fish per person per day' },
                notes: 'Recreational limit: 30 fish per person per day (varies by state and season)',
                violation: {
                    ifExceeds: 'VIOLATION: Recreational bag limit is 30 fish per person per day (50 CFR 648.121)'
                },
                cfr: '50 CFR 648.121'
            },
            seasonStatus: {
                question: 'Is the fishery open for this date and area?',
                field: 'seasonStatus',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'dateOfCatch'],
                useAssessmentDate: true,
                autoCheck: true,
                notes: 'Check current season dates and closures - seasonal with closures',
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
                limit: null, // Varies by quota
                unit: 'lbs',
                cfr: '50 CFR 648.230',
                notes: 'Possession limits based on quota. Check current regulations.'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 0, unit: 'fish' },
                cfr: '50 CFR 648.230',
                notes: 'Recreational retention prohibited in federal waters'
            }
        },
        size: {
            minimum: null,
            unit: 'No federal minimum size',
            cfr: '50 CFR 648.230',
            notes: 'Check state regulations for size limits'
        },
        gear: {
            'general': {
                name: 'General Gear',
                cfr: '50 CFR 648.230',
                notes: 'Check for area-specific gear restrictions'
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
                type: 'number',
                unit: 'lbs',
                dependsOn: ['permitType'],
                notes: 'Record total weight in pounds',
                cfr: '50 CFR 648.230'
            },
            recreationalRetention: {
                question: 'Is this recreational retention in federal waters?',
                field: 'recreationalRetention',
                required: false,
                type: 'boolean',
                dependsOn: ['permitType'],
                applicablePermits: ['recreational'],
                notes: 'Recreational retention of spiny dogfish is PROHIBITED in federal waters',
                violation: {
                    ifTrue: 'VIOLATION: Recreational retention of spiny dogfish is PROHIBITED in federal waters (50 CFR 648.230)'
                },
                cfr: '50 CFR 648.230'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit or quota?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                limits: {
                    'commercial': null, // Varies by quota - check current regulations
                    'recreational': { count: 0, prohibited: true }
                },
                notes: 'Commercial limits based on quota - check current regulations. Recreational: PROHIBITED in federal waters.',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds permit limit or quota (50 CFR 648.230)',
                    ifProhibited: 'VIOLATION: Recreational retention of spiny dogfish is PROHIBITED in federal waters (50 CFR 648.230)'
                },
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

// Striped Bass (Federal waters - note: primarily state managed)
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
                name: 'Commercial Federal Permit',
                required: false, // Primarily state managed
                cfr: '50 CFR 648.4',
                notes: 'Striped bass is primarily managed by states in federal waters'
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
                unit: 'varies by state',
                cfr: '50 CFR 648.4',
                notes: 'Striped bass is primarily managed by individual states. Check state regulations.'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 1, unit: 'fish' },
                cfr: '50 CFR 648.4',
                notes: '1 fish per person per day in federal waters (varies by state)'
            }
        },
        size: {
            minimum: 28,
            unit: 'inches (total length)',
            cfr: '50 CFR 648.4',
            notes: '28 inches total length minimum in federal waters (varies by state)'
        },
        gear: {
            'general': {
                name: 'General Gear',
                cfr: '50 CFR 648.4',
                notes: 'Striped bass is primarily managed by states. Check state regulations.'
            }
        },
        areas: {
            restrictions: true,
            cfr: '50 CFR 648.4',
            notes: 'Striped bass is primarily managed by individual states. Check state regulations for federal waters.'
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: false,
                options: [
                    { value: 'commercial', label: 'Commercial Federal Permit', description: 'Commercial fishing permit (primarily state managed)' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational fishing' }
                ],
                notes: 'Striped bass is primarily managed by states in federal waters',
                cfr: '50 CFR 648.4'
            },
            possessionAmount: {
                question: 'What is the possession amount on board?',
                field: 'possessionAmount',
                required: true,
                type: 'choice',
                dependsOn: ['permitType'],
                unit: {
                    commercial: 'varies by state',
                    recreational: 'fish'
                },
                notes: 'Striped bass is primarily managed by individual states. Check state regulations.',
                cfr: '50 CFR 648.4'
            },
            recreationalBagLimit: {
                question: 'How many striped bass are on board (recreational)?',
                field: 'numberOfFish',
                required: false,
                type: 'number',
                dependsOn: ['permitType'],
                applicablePermits: ['recreational'],
                limit: { count: 1, unit: 'fish per person per day' },
                notes: 'Recreational limit: 1 fish per person per day in federal waters (varies by state)',
                violation: {
                    ifExceeds: 'VIOLATION: Recreational bag limit is 1 fish per person per day in federal waters (50 CFR 648.4)'
                },
                cfr: '50 CFR 648.4'
            },
            sizeCompliance: {
                question: 'What is the total length of the fish?',
                field: 'totalLength',
                required: true,
                type: 'number',
                unit: 'inches',
                minimum: 28,
                notes: 'Minimum size: 28" total length in federal waters (varies by state). Measure from tip of snout to tip of tail.',
                violation: {
                    ifBelow: 'VIOLATION: Striped bass below minimum size must be released (50 CFR 648.4)'
                },
                cfr: '50 CFR 648.4'
            },
            stateRegulations: {
                question: 'Have state regulations been checked?',
                field: 'stateRegulationsChecked',
                required: true,
                type: 'boolean',
                notes: 'Striped bass is primarily managed by individual states. State regulations may be more restrictive than federal regulations.',
                cfr: '50 CFR 648.4'
            },
            fishingArea: {
                question: 'What area was the vessel fishing in?',
                field: 'fishingArea',
                required: true,
                type: 'choice',
                options: [
                    { value: 'federal-waters', label: 'Federal Waters', notes: 'Federal waters - check state regulations' },
                    { value: 'state-waters', label: 'State Waters', notes: 'State waters - state regulations apply' }
                ],
                notes: 'Striped bass is primarily managed by states. Check state regulations for both federal and state waters.',
                cfr: '50 CFR 648.4'
            }
        }
    }
};
