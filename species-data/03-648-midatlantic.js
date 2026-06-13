// 648 mackerel, squid
// Auto-split from species-data.js — edit here for routine updates.

// Atlantic Mackerel (Northeast Fisheries - 50 CFR Part 648)
SPECIES_DATA['atlantic-mackerel'] = {
    name: 'Atlantic Mackerel',
    commonName: 'Mackerel',
    image: null,
    imagePath: 'images/fish/Atlantic_Mackerel.webp',
    color: '#3b82f6',
    regulations: {
        permits: {
            'commercial': {
                name: 'Atlantic Mackerel Commercial Permit',
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
                limit: null, // Subject to quota
                unit: 'lbs',
                cfr: '50 CFR 648.24',
                notes: 'Retention limits subject to annual quota. Check current trip limits and quota status.'
            },
            'recreational': {
                name: 'Recreational',
                limit: { count: 20, unit: 'fish' },
                cfr: '50 CFR 648.24',
                notes: '20 fish per person per day'
            }
        },
        size: {
            minimum: null,
            unit: 'No minimum size',
            cfr: '50 CFR 648.24',
            notes: 'No federal minimum size requirement for Atlantic mackerel'
        },
        gear: {
            'otter-trawl': {
                name: 'Otter Trawl',
                cfr: '50 CFR 648.24',
                notes: 'Check for mesh size requirements and area restrictions'
            },
            'purse-seine': {
                name: 'Purse Seine',
                cfr: '50 CFR 648.24',
                notes: 'Purse seine gear authorized for Atlantic mackerel'
            },
            'rod-reel': {
                name: 'Rod and Reel',
                cfr: '50 CFR 648.24',
                notes: 'Rod and reel gear authorized'
            }
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 648.24',
                notes: 'Open year-round, subject to quota closures'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Atlantic Mackerel Commercial Permit', description: 'Commercial fishing permit' },
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
                notes: 'Record total weight in pounds for commercial, or number of fish for recreational',
                cfr: '50 CFR 648.24'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                limits: {
                    'commercial': null, // Subject to quota - check current trip limits
                    'recreational': { count: 20, unit: 'fish per person per day' }
                },
                notes: 'Commercial limits subject to annual quota - check current trip limits and quota status',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds permit limit or quota (50 CFR 648.24)'
                },
                cfr: '50 CFR 648.24'
            },
            recreationalBagLimit: {
                question: 'How many mackerel are on board (recreational)?',
                field: 'numberOfFish',
                required: false,
                type: 'number',
                dependsOn: ['permitType'],
                applicablePermits: ['recreational'],
                limit: { count: 20, unit: 'fish per person per day' },
                notes: 'Recreational limit: 20 fish per person per day',
                violation: {
                    ifExceeds: 'VIOLATION: Recreational bag limit is 20 fish per person per day (50 CFR 648.24)'
                },
                cfr: '50 CFR 648.24'
            },
            gearType: {
                question: 'What gear is being used?',
                field: 'gearType',
                required: true,
                type: 'choice',
                dependsOn: ['permitType'],
                options: [
                    { value: 'otter-trawl', label: 'Otter Trawl', notes: 'Check mesh size requirements and area restrictions' },
                    { value: 'purse-seine', label: 'Purse Seine', notes: 'Purse seine gear authorized' },
                    { value: 'rod-reel', label: 'Rod and Reel', notes: 'Recreational gear' }
                ],
                cfr: '50 CFR 648.24'
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
                cfr: '50 CFR 648.24'
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

// Longfin Squid (Northeast Fisheries - 50 CFR Part 648)
SPECIES_DATA['longfin-squid'] = {
    name: 'Longfin Squid',
    commonName: 'Longfin Squid',
    image: null,
    imagePath: 'images/fish/Longfin_Squid.webp',
    color: '#8b5cf6',
    regulations: {
        permits: {
            'commercial': {
                name: 'Longfin Squid Commercial Permit',
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
                limit: null, // Subject to quota
                unit: 'lbs',
                cfr: '50 CFR 648.25',
                notes: 'Retention limits subject to annual quota. Check current trip limits and quota status.'
            },
            'recreational': {
                name: 'Recreational',
                limit: null, // No federal limit
                unit: 'lbs',
                cfr: '50 CFR 648.25',
                notes: 'No federal possession limit for recreational longfin squid'
            }
        },
        size: {
            minimum: null,
            unit: 'No minimum size',
            cfr: '50 CFR 648.25',
            notes: 'No federal minimum size requirement for longfin squid'
        },
        gear: {
            'otter-trawl': {
                name: 'Otter Trawl',
                cfr: '50 CFR 648.25',
                notes: 'Check for mesh size requirements and area restrictions'
            },
            'purse-seine': {
                name: 'Purse Seine',
                cfr: '50 CFR 648.25',
                notes: 'Purse seine gear authorized for longfin squid'
            },
            'jigging': {
                name: 'Jigging',
                cfr: '50 CFR 648.25',
                notes: 'Jigging gear authorized'
            }
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 648.25',
                notes: 'Open year-round, subject to quota closures'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Longfin Squid Commercial Permit', description: 'Commercial fishing permit' },
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
                cfr: '50 CFR 648.25'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                limits: {
                    'commercial': null, // Subject to quota - check current trip limits
                    'recreational': null // No federal limit
                },
                notes: 'Commercial limits subject to annual quota - check current trip limits and quota status. Recreational: No federal possession limit.',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds permit limit or quota (50 CFR 648.25)'
                },
                cfr: '50 CFR 648.25'
            },
            gearType: {
                question: 'What gear is being used?',
                field: 'gearType',
                required: true,
                type: 'choice',
                dependsOn: ['permitType'],
                options: [
                    { value: 'otter-trawl', label: 'Otter Trawl', notes: 'Check mesh size requirements and area restrictions' },
                    { value: 'purse-seine', label: 'Purse Seine', notes: 'Purse seine gear authorized' },
                    { value: 'rod-reel', label: 'Rod and Reel', notes: 'Recreational gear' }
                ],
                cfr: '50 CFR 648.25'
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
                cfr: '50 CFR 648.25'
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

// Shortfin Squid (Northeast Fisheries - 50 CFR Part 648)
SPECIES_DATA['shortfin-squid'] = {
    name: 'Shortfin Squid',
    commonName: 'Shortfin Squid',
    image: null,
    imagePath: 'images/fish/Shortfin_Squid.webp',
    color: '#a855f7',
    regulations: {
        permits: {
            'commercial': {
                name: 'Shortfin Squid Commercial Permit',
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
                limit: null, // Subject to quota
                unit: 'lbs',
                cfr: '50 CFR 648.25',
                notes: 'Retention limits subject to annual quota. Check current trip limits and quota status.'
            },
            'recreational': {
                name: 'Recreational',
                limit: null, // No federal limit
                unit: 'lbs',
                cfr: '50 CFR 648.25',
                notes: 'No federal possession limit for recreational shortfin squid'
            }
        },
        size: {
            minimum: null,
            unit: 'No minimum size',
            cfr: '50 CFR 648.25',
            notes: 'No federal minimum size requirement for shortfin squid'
        },
        gear: {
            'otter-trawl': {
                name: 'Otter Trawl',
                cfr: '50 CFR 648.25',
                notes: 'Check for mesh size requirements and area restrictions'
            },
            'purse-seine': {
                name: 'Purse Seine',
                cfr: '50 CFR 648.25',
                notes: 'Purse seine gear authorized for shortfin squid'
            },
            'jigging': {
                name: 'Jigging',
                cfr: '50 CFR 648.25',
                notes: 'Jigging gear authorized'
            }
        },
        seasons: {
            federal: {
                open: 'Year-round',
                cfr: '50 CFR 648.25',
                notes: 'Open year-round, subject to quota closures'
            }
        },
        assessmentQuestions: {
            permitType: {
                question: 'What type of permit does this vessel have?',
                field: 'permitType',
                required: true,
                options: [
                    { value: 'commercial', label: 'Shortfin Squid Commercial Permit', description: 'Commercial fishing permit' },
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
                cfr: '50 CFR 648.25'
            },
            possessionLimitCheck: {
                question: 'Does the possession amount exceed the permit limit?',
                field: 'exceedsLimit',
                required: false,
                type: 'auto',
                dependsOn: ['permitType', 'possessionAmount'],
                autoCheck: true,
                limits: {
                    'commercial': null, // Subject to quota - check current trip limits
                    'recreational': null // No federal limit
                },
                notes: 'Commercial limits subject to annual quota - check current trip limits and quota status. Recreational: No federal possession limit.',
                violation: {
                    ifExceeds: 'VIOLATION: Possession amount exceeds permit limit or quota (50 CFR 648.25)'
                },
                cfr: '50 CFR 648.25'
            },
            gearType: {
                question: 'What gear is being used?',
                field: 'gearType',
                required: true,
                type: 'choice',
                dependsOn: ['permitType'],
                options: [
                    { value: 'otter-trawl', label: 'Otter Trawl', notes: 'Check mesh size requirements and area restrictions' },
                    { value: 'purse-seine', label: 'Purse Seine', notes: 'Purse seine gear authorized' },
                    { value: 'jigging', label: 'Jigging', notes: 'Jigging gear authorized' },
                    { value: 'rod-reel', label: 'Rod and Reel', notes: 'Recreational gear' }
                ],
                cfr: '50 CFR 648.25'
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
                cfr: '50 CFR 648.25'
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
