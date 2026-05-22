// Fish Image Generator - Creates detailed SVG illustrations of fish species

// Generate detailed fish image for each species
function generateFishImage(speciesId, name, color) {
    const fishShapes = {
        'summer-flounder': generateFlounderImage(color, '#c9b47a'),
        'atlantic-sea-scallop': generateScallopImage('#fff0cc', '#ffdb99'),
        'atlantic-cod': generateCodImage('#4a90e2', '#6ba3e0'),
        'haddock': generateHaddockImage('#7b68ee', '#9a82f0'),
        'yellowtail-flounder': generateFlounderImage('#ffd700', '#ffed4e'),
        'winter-flounder': generateFlounderImage('#87ceeb', '#a8d4e8'),
        'windowpane-flounder': generateFlounderImage('#dda0dd', '#e5b8e5'),
        'atlantic-wolffish': generateWolffishImage('#8b4513', '#a0522d'),
        'redfish': generateRedfishImage('#dc143c', '#e63950'),
        'atlantic-halibut': generateHalibutImage('#2f4f4f', '#4a6969'),
        'white-hake': generateHakeImage('#696969', '#808080'),
        'pollock': generatePollockImage('#4682b4', '#5a9fd4'),
        'witch-flounder': generateFlounderImage('#9370db', '#ab85e8'),
        'american-plaice': generateFlounderImage('#cd853f', '#d99c5c'),
        'ocean-pout': generatePoutImage('#708090', '#8499a8'),
        'bluefish': generateBluefishImage('#4682b4', '#5a9fd4'),
        'striped-bass': generateStripedBassImage('#20b2aa', '#3dd1c7'),
        'black-sea-bass': generateSeaBassImage('#2c3e50', '#34495e'),
        'scup': generateScupImage('#d2691e', '#e6894a'),
        'tautog': generateTautogImage('#2f4f4f', '#4a6969'),
        'spiny-dogfish': generateDogfishImage('#708090', '#8499a8'),
        'monkfish': generateMonkfishImage('#696969', '#808080')
    };
    
    // Return specific fish shape or default placeholder
    if (fishShapes[speciesId]) {
        return fishShapes[speciesId];
    }
    
    // Default fish illustration
    return generateDefaultFishImage(color);
}

// Summer Flounder / Fluke (flatfish, both eyes on left side)
function generateFlounderImage(color, accentColor) {
    const svg = `
        <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#f0f8ff" rx="8"/>
            <g transform="translate(100, 60)">
                <!-- Fish body -->
                <ellipse cx="0" cy="5" rx="60" ry="25" fill="${color}" opacity="0.9"/>
                <!-- Top eye (left side when flat) -->
                <circle cx="-15" cy="-10" r="4" fill="#000"/>
                <circle cx="-15" cy="-10" r="2" fill="#fff"/>
                <!-- Bottom eye -->
                <circle cx="-15" cy="20" r="3.5" fill="#000"/>
                <circle cx="-15" cy="20" r="1.5" fill="#fff"/>
                <!-- Spots/markings -->
                <circle cx="10" cy="0" r="3" fill="${accentColor}" opacity="0.6"/>
                <circle cx="20" cy="-5" r="2" fill="${accentColor}" opacity="0.6"/>
                <circle cx="20" cy="10" r="2" fill="${accentColor}" opacity="0.6"/>
                <!-- Tail -->
                <path d="M 45 -8 Q 70 5 45 18" stroke="${color}" stroke-width="3" fill="none"/>
                <!-- Fins -->
                <path d="M -50 -5 Q -60 -15 -55 -5" stroke="${color}" stroke-width="2" fill="${color}" opacity="0.7"/>
                <path d="M -50 15 Q -60 25 -55 15" stroke="${color}" stroke-width="2" fill="${color}" opacity="0.7"/>
            </g>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Atlantic Sea Scallop (shell shape)
function generateScallopImage(color, accentColor) {
    const svg = `
        <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#fff8f0" rx="8"/>
            <g transform="translate(100, 60)">
                <!-- Shell shape -->
                <path d="M -40 0 Q -20 -35 0 -35 Q 20 -35 40 0 Q 20 35 0 35 Q -20 35 -40 0" 
                      fill="${color}" stroke="${accentColor}" stroke-width="2"/>
                <!-- Ridges -->
                <path d="M -30 -10 Q -10 -25 10 -25" stroke="${accentColor}" stroke-width="1.5" fill="none"/>
                <path d="M -30 10 Q -10 25 10 25" stroke="${accentColor}" stroke-width="1.5" fill="none"/>
                <path d="M -25 -15 Q -5 -28 15 -28" stroke="${accentColor}" stroke-width="1" fill="none"/>
                <path d="M -25 15 Q -5 28 15 28" stroke="${accentColor}" stroke-width="1" fill="none"/>
            </g>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Atlantic Cod (rounded body with spots)
function generateCodImage(color, accentColor) {
    const svg = `
        <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#e6f2ff" rx="8"/>
            <g transform="translate(100, 60)">
                <!-- Body -->
                <ellipse cx="0" cy="0" rx="50" ry="20" fill="${color}"/>
                <!-- Head -->
                <circle cx="-35" cy="0" r="18" fill="${color}"/>
                <!-- Eye -->
                <circle cx="-40" cy="-3" r="5" fill="#fff"/>
                <circle cx="-40" cy="-3" r="3" fill="#000"/>
                <!-- Spots -->
                <circle cx="-10" cy="-8" r="2.5" fill="${accentColor}" opacity="0.7"/>
                <circle cx="5" cy="-10" r="2" fill="${accentColor}" opacity="0.7"/>
                <circle cx="15" cy="8" r="2.5" fill="${accentColor}" opacity="0.7"/>
                <circle cx="25" cy="-5" r="2" fill="${accentColor}" opacity="0.7"/>
                <!-- Tail -->
                <path d="M 40 -12 Q 60 0 40 12" stroke="${color}" stroke-width="4" fill="${color}"/>
                <!-- Fins -->
                <path d="M -25 -15 Q -35 -20 -30 -15" stroke="${color}" stroke-width="3" fill="${color}" opacity="0.8"/>
                <path d="M -10 -18 Q -15 -25 -12 -18" stroke="${color}" stroke-width="2" fill="${color}" opacity="0.8"/>
            </g>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Haddock (similar to cod but with distinctive black line)
function generateHaddockImage(color, accentColor) {
    const svg = `
        <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#f0f0ff" rx="8"/>
            <g transform="translate(100, 60)">
                <!-- Body -->
                <ellipse cx="0" cy="0" rx="48" ry="18" fill="${color}"/>
                <!-- Head -->
                <circle cx="-32" cy="0" r="16" fill="${color}"/>
                <!-- Eye -->
                <circle cx="-38" cy="-2" r="4.5" fill="#fff"/>
                <circle cx="-38" cy="-2" r="2.5" fill="#000"/>
                <!-- Black lateral line (haddock characteristic) -->
                <line x1="-30" y1="5" x2="35" y2="5" stroke="#1a1a1a" stroke-width="2"/>
                <!-- Spot (haddock has dark spot) -->
                <circle cx="-15" cy="-8" r="3" fill="#2c3e50"/>
                <!-- Tail -->
                <path d="M 38 -10 Q 58 0 38 10" stroke="${color}" stroke-width="4" fill="${color}"/>
                <!-- Fins -->
                <path d="M -20 -14 Q -30 -18 -25 -14" stroke="${color}" stroke-width="2.5" fill="${color}" opacity="0.8"/>
            </g>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Atlantic Wolffish (eel-like with prominent teeth area)
function generateWolffishImage(color, accentColor) {
    const svg = `
        <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#fff5e6" rx="8"/>
            <g transform="translate(100, 60)">
                <!-- Eel-like body -->
                <ellipse cx="0" cy="0" rx="55" ry="15" fill="${color}"/>
                <!-- Head -->
                <ellipse cx="-40" cy="0" r="20" ry="16" fill="${color}"/>
                <!-- Eye -->
                <circle cx="-35" cy="-5" r="4" fill="#fff"/>
                <circle cx="-35" cy="-5" r="2.5" fill="#000"/>
                <!-- Bands/stripes -->
                <ellipse cx="-15" cy="0" rx="3" ry="12" fill="${accentColor}" opacity="0.6"/>
                <ellipse cx="5" cy="0" rx="3" ry="12" fill="${accentColor}" opacity="0.6"/>
                <ellipse cx="25" cy="0" rx="3" ry="12" fill="${accentColor}" opacity="0.6"/>
                <!-- Tail -->
                <path d="M 45 -10 Q 65 0 45 10" stroke="${color}" stroke-width="3" fill="${color}"/>
                <!-- Dorsal fin -->
                <path d="M -35 -12 Q -25 -18 -15 -12" stroke="${color}" stroke-width="2" fill="${color}" opacity="0.7"/>
            </g>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Acadian Redfish (deep-bodied with red color)
function generateRedfishImage(color, accentColor) {
    const svg = `
        <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#ffe6e6" rx="8"/>
            <g transform="translate(100, 60)">
                <!-- Deep, rounded body -->
                <ellipse cx="0" cy="0" rx="40" ry="25" fill="${color}"/>
                <!-- Head -->
                <ellipse cx="-25" cy="0" r="15" ry="18" fill="${color}"/>
                <!-- Large eye -->
                <circle cx="-28" cy="-5" r="6" fill="#fff"/>
                <circle cx="-28" cy="-5" r="4" fill="#000"/>
                <!-- Markings -->
                <circle cx="-5" cy="-10" r="2.5" fill="${accentColor}" opacity="0.8"/>
                <circle cx="10" cy="8" r="2" fill="${accentColor}" opacity="0.8"/>
                <!-- Tail -->
                <path d="M 30 -18 Q 50 0 30 18" stroke="${color}" stroke-width="4" fill="${color}"/>
                <!-- Dorsal fin -->
                <path d="M -15 -20 Q -5 -28 5 -20" stroke="${color}" stroke-width="3" fill="${color}" opacity="0.8"/>
            </g>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Atlantic Halibut (large flatfish)
function generateHalibutImage(color, accentColor) {
    const svg = `
        <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#f0f0f0" rx="8"/>
            <g transform="translate(100, 60)">
                <!-- Large flat body -->
                <ellipse cx="0" cy="5" rx="65" ry="28" fill="${color}" opacity="0.9"/>
                <!-- Top eye -->
                <circle cx="-20" cy="-15" r="5" fill="#000"/>
                <circle cx="-20" cy="-15" r="3" fill="#fff"/>
                <!-- Bottom eye -->
                <circle cx="-20" cy="25" r="4.5" fill="#000"/>
                <circle cx="-20" cy="25" r="2.5" fill="#fff"/>
                <!-- Irregular spots/markings -->
                <ellipse cx="10" cy="-5" rx="4" ry="3" fill="${accentColor}" opacity="0.6"/>
                <ellipse cx="25" cy="5" rx="5" ry="4" fill="${accentColor}" opacity="0.6"/>
                <ellipse cx="30" cy="-10" rx="3" ry="2" fill="${accentColor}" opacity="0.6"/>
                <!-- Tail -->
                <path d="M 55 -15 Q 80 5 55 25" stroke="${color}" stroke-width="4" fill="none"/>
            </g>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// White Hake
function generateHakeImage(color, accentColor) {
    const svg = `
        <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#f5f5f5" rx="8"/>
            <g transform="translate(100, 60)">
                <!-- Elongated body -->
                <ellipse cx="0" cy="0" rx="52" ry="16" fill="${color}"/>
                <!-- Head -->
                <ellipse cx="-38" cy="0" r="18" ry="16" fill="${color}"/>
                <!-- Eye -->
                <circle cx="-42" cy="-3" r="5" fill="#fff"/>
                <circle cx="-42" cy="-3" r="3" fill="#000"/>
                <!-- Chin barbel -->
                <line x1="-38" y1="12" x2="-38" y2="18" stroke="#666" stroke-width="2"/>
                <circle cx="-38" cy="18" r="1.5" fill="#666"/>
                <!-- Spots -->
                <circle cx="-15" cy="-8" r="2" fill="${accentColor}" opacity="0.6"/>
                <circle cx="10" cy="8" r="2.5" fill="${accentColor}" opacity="0.6"/>
                <!-- Tail -->
                <path d="M 40 -12 Q 60 0 40 12" stroke="${color}" stroke-width="4" fill="${color}"/>
            </g>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Pollock (streamlined with distinctive markings)
function generatePollockImage(color, accentColor) {
    const svg = `
        <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#e8f4ff" rx="8"/>
            <g transform="translate(100, 60)">
                <!-- Streamlined body -->
                <ellipse cx="0" cy="0" rx="50" ry="17" fill="${color}"/>
                <!-- Head -->
                <ellipse cx="-35" cy="0" r="16" ry="15" fill="${color}"/>
                <!-- Eye -->
                <circle cx="-38" cy="-3" r="4.5" fill="#fff"/>
                <circle cx="-38" cy="-3" r="2.5" fill="#000"/>
                <!-- Dark lateral stripe -->
                <line x1="-25" y1="-5" x2="35" y2="-5" stroke="#2c3e50" stroke-width="2"/>
                <!-- Yellow/green markings -->
                <path d="M -10 -10 Q 0 -8 10 -10" stroke="${accentColor}" stroke-width="2" fill="none" opacity="0.7"/>
                <!-- Tail -->
                <path d="M 40 -12 Q 60 0 40 12" stroke="${color}" stroke-width="4" fill="${color}"/>
                <!-- Fins -->
                <path d="M -20 -16 Q -30 -20 -25 -16" stroke="${color}" stroke-width="2.5" fill="${color}" opacity="0.8"/>
            </g>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Ocean Pout (eel-like, dark)
function generatePoutImage(color, accentColor) {
    const svg = `
        <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#f8f8f8" rx="8"/>
            <g transform="translate(100, 60)">
                <!-- Eel-like elongated body -->
                <ellipse cx="0" cy="0" rx="58" ry="14" fill="${color}"/>
                <!-- Head -->
                <ellipse cx="-45" cy="0" r="18" ry="14" fill="${color}"/>
                <!-- Small eye -->
                <circle cx="-40" cy="-4" r="3.5" fill="#fff"/>
                <circle cx="-40" cy="-4" r="2" fill="#000"/>
                <!-- Dark bands -->
                <ellipse cx="-20" cy="0" rx="2.5" ry="10" fill="${accentColor}" opacity="0.7"/>
                <ellipse cx="0" cy="0" rx="2.5" ry="10" fill="${accentColor}" opacity="0.7"/>
                <ellipse cx="20" cy="0" rx="2.5" ry="10" fill="${accentColor}" opacity="0.7"/>
                <!-- Rounded tail -->
                <path d="M 48 -10 Q 68 0 48 10" stroke="${color}" stroke-width="3" fill="${color}"/>
                <!-- Continuous dorsal fin -->
                <path d="M -40 -10 Q -20 -14 0 -12 Q 20 -14 40 -10" stroke="${color}" stroke-width="2" fill="${color}" opacity="0.6"/>
            </g>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Bluefish
function generateBluefishImage(color, accentColor) {
    const svg = `
        <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#e6f2ff" rx="8"/>
            <g transform="translate(100, 60)">
                <!-- Streamlined body -->
                <ellipse cx="0" cy="0" rx="48" ry="16" fill="${color}"/>
                <!-- Head -->
                <ellipse cx="-32" cy="0" r="15" ry="14" fill="${color}"/>
                <!-- Eye -->
                <circle cx="-35" cy="-3" r="4" fill="#fff"/>
                <circle cx="-35" cy="-3" r="2.5" fill="#000"/>
                <!-- Forked tail -->
                <path d="M 38 -8 L 55 0 L 38 8" stroke="${color}" stroke-width="3" fill="${color}"/>
                <path d="M 40 -6 L 50 0 L 40 6" stroke="${accentColor}" stroke-width="2" fill="none"/>
                <!-- Fins -->
                <path d="M -18 -16 Q -28 -20 -23 -16" stroke="${color}" stroke-width="2.5" fill="${color}" opacity="0.8"/>
                <path d="M 15 -18 Q 5 -22 10 -18" stroke="${color}" stroke-width="2" fill="${color}" opacity="0.8"/>
            </g>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Striped Bass (with distinctive stripes)
function generateStripedBassImage(color, accentColor) {
    const svg = `
        <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#e0f7fa" rx="8"/>
            <g transform="translate(100, 60)">
                <!-- Body -->
                <ellipse cx="0" cy="0" rx="50" ry="18" fill="${color}"/>
                <!-- Head -->
                <ellipse cx="-35" cy="0" r="16" ry="15" fill="${color}"/>
                <!-- Eye -->
                <circle cx="-38" cy="-3" r="4.5" fill="#fff"/>
                <circle cx="-38" cy="-3" r="2.5" fill="#000"/>
                <!-- Distinctive stripes -->
                <line x1="-25" y1="-12" x2="30" y2="-12" stroke="#1a1a1a" stroke-width="2"/>
                <line x1="-20" y1="-5" x2="32" y2="-5" stroke="#1a1a1a" stroke-width="2"/>
                <line x1="-15" y1="2" x2="35" y2="2" stroke="#1a1a1a" stroke-width="2"/>
                <line x1="-10" y1="9" x2="30" y2="9" stroke="#1a1a1a" stroke-width="2"/>
                <!-- Tail -->
                <path d="M 40 -12 Q 60 0 40 12" stroke="${color}" stroke-width="4" fill="${color}"/>
                <!-- Fins -->
                <path d="M -18 -18 Q -28 -22 -23 -18" stroke="${color}" stroke-width="3" fill="${color}" opacity="0.8"/>
            </g>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Black Sea Bass (deep-bodied, dark)
function generateSeaBassImage(color, accentColor) {
    const svg = `
        <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#f0f0f0" rx="8"/>
            <g transform="translate(100, 60)">
                <!-- Deep rounded body -->
                <ellipse cx="0" cy="0" rx="42" ry="24" fill="${color}"/>
                <!-- Head -->
                <ellipse cx="-22" cy="0" r="14" ry="18" fill="${color}"/>
                <!-- Large eye -->
                <circle cx="-25" cy="-5" r="5.5" fill="#fff"/>
                <circle cx="-25" cy="-5" r="3.5" fill="#000"/>
                <!-- Markings -->
                <circle cx="-5" cy="-10" r="2.5" fill="${accentColor}" opacity="0.6"/>
                <!-- Dorsal fin with spines -->
                <path d="M -20 -22 Q -15 -28 -10 -22 Q -5 -28 0 -22 Q 5 -28 10 -22 Q 15 -28 20 -22" 
                      stroke="${color}" stroke-width="2" fill="${color}" opacity="0.8"/>
                <!-- Tail -->
                <path d="M 32 -18 Q 50 0 32 18" stroke="${color}" stroke-width="4" fill="${color}"/>
            </g>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Scup / Porgy (deep-bodied with spots)
function generateScupImage(color, accentColor) {
    const svg = `
        <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#ffe6cc" rx="8"/>
            <g transform="translate(100, 60)">
                <!-- Deep body -->
                <ellipse cx="0" cy="0" rx="40" ry="22" fill="${color}"/>
                <!-- Head -->
                <ellipse cx="-22" cy="0" r="13" ry="16" fill="${color}"/>
                <!-- Eye -->
                <circle cx="-25" cy="-4" r="5" fill="#fff"/>
                <circle cx="-25" cy="-4" r="3" fill="#000"/>
                <!-- Blue spots (scup characteristic) -->
                <circle cx="-5" cy="-8" r="2" fill="#4a90e2"/>
                <circle cx="8" cy="6" r="2" fill="#4a90e2"/>
                <circle cx="12" cy="-5" r="1.5" fill="#4a90e2"/>
                <!-- Tail -->
                <path d="M 30 -16 Q 48 0 30 16" stroke="${color}" stroke-width="4" fill="${color}"/>
                <!-- Dorsal fin -->
                <path d="M -15 -20 Q -5 -26 5 -20" stroke="${color}" stroke-width="2.5" fill="${color}" opacity="0.8"/>
            </g>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Tautog (deep-bodied, dark)
function generateTautogImage(color, accentColor) {
    const svg = `
        <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#f5f5f5" rx="8"/>
            <g transform="translate(100, 60)">
                <!-- Deep oval body -->
                <ellipse cx="0" cy="0" rx="40" ry="23" fill="${color}"/>
                <!-- Head -->
                <ellipse cx="-22" cy="0" r="14" ry="17" fill="${color}"/>
                <!-- Eye -->
                <circle cx="-26" cy="-4" r="5.5" fill="#fff"/>
                <circle cx="-26" cy="-4" r="3.5" fill="#000"/>
                <!-- Mottled pattern -->
                <ellipse cx="-5" cy="-8" rx="3" ry="2" fill="${accentColor}" opacity="0.5"/>
                <ellipse cx="8" cy="6" rx="2.5" ry="3" fill="${accentColor}" opacity="0.5"/>
                <!-- Rounded tail -->
                <path d="M 30 -17 Q 48 0 30 17" stroke="${color}" stroke-width="4" fill="${color}"/>
                <!-- Dorsal fin -->
                <path d="M -18 -21 Q -8 -27 2 -21" stroke="${color}" stroke-width="3" fill="${color}" opacity="0.8"/>
            </g>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Spiny Dogfish (shark-like)
function generateDogfishImage(color, accentColor) {
    const svg = `
        <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#f0f0f0" rx="8"/>
            <g transform="translate(100, 60)">
                <!-- Shark-like body -->
                <ellipse cx="0" cy="0" rx="52" ry="16" fill="${color}"/>
                <!-- Pointed snout -->
                <ellipse cx="-42" cy="0" r="18" ry="14" fill="${color}"/>
                <!-- Eye -->
                <circle cx="-35" cy="-4" r="4" fill="#fff"/>
                <circle cx="-35" cy="-4" r="2.5" fill="#000"/>
                <!-- Spots -->
                <circle cx="-15" cy="-8" r="2" fill="${accentColor}" opacity="0.7"/>
                <circle cx="5" cy="8" r="2.5" fill="${accentColor}" opacity="0.7"/>
                <!-- Dorsal fins -->
                <path d="M -25 -14 Q -30 -20 -25 -14" stroke="${color}" stroke-width="3" fill="${color}" opacity="0.8"/>
                <path d="M 20 -16 Q 25 -22 20 -16" stroke="${color}" stroke-width="2.5" fill="${color}" opacity="0.8"/>
                <!-- Asymmetric tail -->
                <path d="M 40 -12 L 58 -8 L 40 0 L 58 8 L 40 12" stroke="${color}" stroke-width="3" fill="${color}"/>
            </g>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Monkfish (large head, wide mouth)
function generateMonkfishImage(color, accentColor) {
    const svg = `
        <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#f8f8f8" rx="8"/>
            <g transform="translate(100, 60)">
                <!-- Large head -->
                <ellipse cx="-25" cy="0" rx="30" ry="22" fill="${color}"/>
                <!-- Wide mouth -->
                <path d="M -50 8 Q -45 15 -40 8" stroke="#333" stroke-width="2" fill="#1a1a1a"/>
                <!-- Eye on top -->
                <circle cx="-30" cy="-12" r="4.5" fill="#fff"/>
                <circle cx="-30" cy="-12" r="3" fill="#000"/>
                <!-- Smaller body -->
                <ellipse cx="15" cy="0" rx="25" ry="14" fill="${color}"/>
                <!-- Tail -->
                <path d="M 32 -10 Q 52 0 32 10" stroke="${color}" stroke-width="3" fill="${color}"/>
                <!-- Dorsal fin filaments (monkfish characteristic) -->
                <line x1="-35" y1="-18" x2="-35" y2="-25" stroke="${color}" stroke-width="2"/>
                <line x1="-25" y1="-16" x2="-25" y2="-23" stroke="${color}" stroke-width="2"/>
            </g>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Default fish illustration
function generateDefaultFishImage(color) {
    const svg = `
        <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="120" fill="#f0f8ff" rx="8"/>
            <g transform="translate(100, 60)">
                <!-- Generic fish body -->
                <ellipse cx="0" cy="0" rx="45" ry="18" fill="${color}"/>
                <!-- Head -->
                <circle cx="-32" cy="0" r="15" fill="${color}"/>
                <!-- Eye -->
                <circle cx="-35" cy="-3" r="4.5" fill="#fff"/>
                <circle cx="-35" cy="-3" r="2.5" fill="#000"/>
                <!-- Tail -->
                <path d="M 35 -12 Q 55 0 35 12" stroke="${color}" stroke-width="4" fill="${color}"/>
                <!-- Fins -->
                <path d="M -20 -16 Q -30 -20 -25 -16" stroke="${color}" stroke-width="2.5" fill="${color}" opacity="0.8"/>
            </g>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}
