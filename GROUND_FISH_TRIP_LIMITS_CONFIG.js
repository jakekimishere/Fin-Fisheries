/**
 * Northeast multispecies common pool trip limits (50 CFR 648.86).
 * Effective March 9, 2026 per NOAA Greater Atlantic common pool fishery page.
 * Sector vessels use ACE — limits not enumerated here.
 */
const GROUND_FISH_TRIP_LIMITS = {
    'atlantic-cod': {
        minimumSize: { gom: 19, gb: 19, unit: 'inches total length' },
        stockAreas: {
            'gulf-of-maine': {
                label: 'Gulf of Maine (GOM)',
                limits: {
                    'category-a': { perDas: 25, perTrip: 50, unit: 'lbs' },
                    'handgear-a': { perTrip: 25, unit: 'lbs' },
                    'type-c': { perTrip: 25, unit: 'lbs' },
                    'handgear-b': { perTrip: 25, unit: 'lbs' }
                }
            },
            'georges-bank': { label: 'Georges Bank', prohibited: true },
            'southern-new-england': { label: 'Southern New England', prohibited: true }
        },
        source: 'https://www.fisheries.noaa.gov/new-england-mid-atlantic/commercial-fishing/northeast-multispecies-common-pool-fishery',
        effective: '2026-03-09'
    },
    'haddock': {
        minimumSize: { gom: 16, gb: 16, unit: 'inches total length' },
        stockAreas: {
            'gulf-of-maine': {
                label: 'Gulf of Maine (GOM)',
                limits: {
                    'category-a': { perDas: 1000, perTrip: 2000, unit: 'lbs' },
                    'handgear-a': { perTrip: 1000, unit: 'lbs' },
                    'type-c': { perTrip: 300, unit: 'lbs' },
                    'handgear-b': { perTrip: 1000, unit: 'lbs' }
                }
            },
            'georges-bank': {
                label: 'Georges Bank (off/in GB, SNE)',
                limits: {
                    'category-a': { perDas: 1000, perTrip: 2000, unit: 'lbs' },
                    'handgear-a': { perTrip: 1000, unit: 'lbs' },
                    'type-c': { perTrip: 300, unit: 'lbs' },
                    'handgear-b': { perTrip: 1000, unit: 'lbs' }
                }
            },
            'southern-new-england': {
                label: 'Southern New England',
                limits: {
                    'category-a': { perDas: 1000, perTrip: 2000, unit: 'lbs' },
                    'handgear-a': { perTrip: 1000, unit: 'lbs' },
                    'type-c': { perTrip: 300, unit: 'lbs' },
                    'handgear-b': { perTrip: 1000, unit: 'lbs' }
                }
            }
        },
        source: 'https://www.fisheries.noaa.gov/new-england-mid-atlantic/commercial-fishing/northeast-multispecies-common-pool-fishery',
        effective: '2026-03-09'
    }
};

function getGroundfishTripLimit(speciesId, stockArea, dasCategory) {
    const stock = GROUND_FISH_TRIP_LIMITS[speciesId]?.stockAreas?.[stockArea];
    if (!stock) return null;
    if (stock.prohibited) return { prohibited: true, label: stock.label };
    return stock.limits?.[dasCategory] || null;
}

if (typeof window !== 'undefined') {
    window.GROUND_FISH_TRIP_LIMITS = GROUND_FISH_TRIP_LIMITS;
    window.getGroundfishTripLimit = getGroundfishTripLimit;
}
