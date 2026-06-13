// 648 small pelagic group
// Auto-split from species-data.js — edit here for routine updates.

// Small Pelagic Species Group (Anchovies, Argentines, Greeneyes, Halfbeaks, Herrings, Lanternfishes, Pearlsides, Sand Lances, Silversides, Cusk-eels, Atlantic Saury)
// These are typically small forage fish with minimal federal regulations
const smallPelagicSpecies = [
    { id: 'anchovies', name: 'Anchovies', commonName: 'Anchovy', color: '#95e1d3' },
    { id: 'argentines', name: 'Argentines', commonName: 'Argentine', color: '#c7d2fe' },
    { id: 'greeneyes', name: 'Greeneyes', commonName: 'Greeneye', color: '#a8dadc' },
    { id: 'halfbeaks', name: 'Halfbeaks', commonName: 'Halfbeak', color: '#b8b8ff' },
    { id: 'lanternfishes', name: 'Lanternfishes', commonName: 'Lanternfish', color: '#ffd93d' },
    { id: 'pearlsides', name: 'Pearlsides', commonName: 'Pearlside', color: '#ff6b6b' },
    { id: 'sand-lances', name: 'Sand Lances', commonName: 'Sand Lance', color: '#4ecdc4' },
    { id: 'silversides', name: 'Silversides', commonName: 'Silverside', color: '#4a90e2' },
    { id: 'cusk-eels', name: 'Cusk-Eels', commonName: 'Cusk-Eel', color: '#8b4513' },
    { id: 'atlantic-saury', name: 'Atlantic Saury', commonName: 'Saury', color: '#ff8787' }
];

smallPelagicSpecies.forEach(species => {
    // Map species IDs to their image file names
    const imagePathMap = {
        'anchovies': 'images/fish/Anchovies.webp',
        'argentines': 'images/fish/Argentines.webp',
        'greeneyes': 'images/fish/Greeneyes.webp',
        'halfbeaks': 'images/fish/Halfbeaks.webp',
        'lanternfishes': 'images/fish/Lanternfishes.webp',
        'pearlsides': 'images/fish/Pearlsides.webp',
        'sand-lances': 'images/fish/Sand_Lances.webp',
        'silversides': 'images/fish/Silversides.webp',
        'cusk-eels': 'images/fish/Cusk-eels.webp',
        'atlantic-saury': 'images/fish/Atlantic_Saury.webp'
    };
    
    SPECIES_DATA[species.id] = {
        name: species.name,
        commonName: species.commonName,
        image: null,
        imagePath: imagePathMap[species.id] || null,
        color: species.color,
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
                    cfr: '50 CFR 648.94'
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
                unit: 'varies',
                cfr: null,
                notes: 'No federal size limit. Check state regulations.'
            },
            seasons: {
                federal: {
                    open: 'Year-round',
                    notes: 'No federal season restrictions'
                }
            }
        }
    };
});
