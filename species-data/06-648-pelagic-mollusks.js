// 648 pelagic mollusks
// Auto-split from species-data.js — edit here for routine updates.

// Pelagic Mollusks
SPECIES_DATA['pelagic-mollusks'] = {
    name: 'Pelagic Mollusks',
    commonName: 'Pelagic Mollusks',
    image: null,
    imagePath: 'images/fish/Pelagic_Mollusks.webp',
    color: '#ffd93d',
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
                unit: 'lbs',
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
                    { value: 'commercial', label: 'Commercial Permit', description: 'Commercial fishing - check for specific permit requirements' },
                    { value: 'recreational', label: 'Recreational (No Federal Permit Required)', description: 'Recreational fishing' }
                ],
                notes: 'Check for specific permit requirements',
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
                notes: 'No federal possession limit or size limit for pelagic mollusks. Check state regulations for limits.',
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
