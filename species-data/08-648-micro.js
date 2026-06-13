// Species under 1 inch
// Auto-split from species-data.js — edit here for routine updates.

// Other Species Under 1" as Adults
SPECIES_DATA['species-under-1inch'] = {
    name: 'Other Species Under 1" as Adults',
    commonName: 'Small Forage Species',
    image: null,
    imagePath: 'images/fish/Other_Species_As_1_As_Adults.webp',
    color: '#b8b8ff',
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
                cfr: null
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
                cfr: null,
                notes: 'No federal possession limit. Check state regulations.'
            }
        },
        size: {
            minimum: null,
            unit: 'N/A',
            cfr: null,
            notes: 'No federal size limit'
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
                    { value: 'commercial', label: 'Commercial Permit', description: 'Commercial fishing - No federal permit required' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational fishing - No federal permit required' }
                ],
                cfr: null
            },
            possessionAmount: {
                question: 'How many small forage species (under 1" as adults) are on board?',
                field: 'numberOfFish',
                required: true,
                type: 'number',
                unit: 'fish or lbs',
                dependsOn: ['permitType'],
                notes: 'Record total amount of small forage species on board',
                cfr: null
            },
            stateRegulationsCheck: {
                question: 'Have state regulations been checked?',
                field: 'stateRegsChecked',
                required: true,
                type: 'boolean',
                dependsOn: ['permitType'],
                notes: 'No federal permit or possession limit. Check state regulations for restrictions.',
                violation: {
                    ifFalse: 'WARNING: Verify compliance with state regulations'
                },
                cfr: null
            }
        }
    }
};
