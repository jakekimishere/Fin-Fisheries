// Image init helpers
// Auto-split from species-data.js — edit here for routine updates.

// Generate placeholder image (fallback - uses fish images if available)
function generatePlaceholderImage(name, color) {
    // Try to use fish image generator if available
    if (typeof generateFishImage === 'function') {
        // Extract species ID from name if possible
        const speciesId = name.toLowerCase().replace(/\s+/g, '-');
        return generateFishImage(speciesId, name, color);
    }
    
    // Fallback to simple text image
    return `data:image/svg+xml;base64,${btoa(`<svg width="200" height="120" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="120" fill="${color}" rx="8"/><text x="50%" y="50%" font-family="Arial" font-size="14px" fill="#736347" text-anchor="middle" dy=".3em">${name}</text></svg>`)}`;
}

// Initialize species images after fish-images.js loads
function initializeSpeciesImages() {
    if (typeof generateFishImage !== 'function') {
        console.warn('generateFishImage function not available. Fish images may not display correctly.');
        return;
    }
    
    // Generate images for all species with null images
    Object.keys(SPECIES_DATA).forEach(speciesId => {
        const species = SPECIES_DATA[speciesId];
        if (!species.image) {
            species.image = generateFishImage(speciesId, species.name, species.color);
        }
    });
}

// Auto-initialize when DOM is ready (if fish-images.js has loaded)
if (typeof document !== 'undefined' && document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSpeciesImages);
} else if (typeof document !== 'undefined') {
    // DOM already loaded, initialize immediately
    setTimeout(initializeSpeciesImages, 100);
}
