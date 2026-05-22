// Utility Helper Functions
// Common functions used across the application

const Helpers = {
    // Check if species is part of multispecies complex
    isMultispecies(speciesId) {
        const multispeciesIds = [
            'atlantic-cod',
            'haddock',
            'yellowtail-flounder',
            'winter-flounder',
            'windowpane-flounder',
            'atlantic-wolffish',
            'redfish',
            'atlantic-halibut',
            'white-hake',
            'pollock',
            'witch-flounder',
            'american-plaice',
            'ocean-pout'
        ];
        return multispeciesIds.includes(speciesId);
    },

    // Format date for display
    formatDate(date) {
        if (!date) return 'N/A';
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Show error message to user
    showErrorMessage(message) {
        // Create or get error container
        let errorContainer = document.getElementById('error-message');
        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.id = 'error-message';
            errorContainer.className = 'error-message';
            document.body.insertBefore(errorContainer, document.body.firstChild);
        }

        errorContainer.textContent = message;
        errorContainer.style.display = 'block';

        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorContainer.style.display = 'none';
        }, 5000);
    },

    // Show success message
    showSuccessMessage(message) {
        let successContainer = document.getElementById('success-message');
        if (!successContainer) {
            successContainer = document.createElement('div');
            successContainer.id = 'success-message';
            successContainer.className = 'success-message';
            document.body.insertBefore(successContainer, document.body.firstChild);
        }

        successContainer.textContent = message;
        successContainer.style.display = 'block';

        setTimeout(() => {
            successContainer.style.display = 'none';
        }, 3000);
    },

    // Generate placeholder image
    generatePlaceholderImage(name, color) {
        const svg = `
            <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="120" fill="#f5f5f5" rx="8"/>
                <text x="50%" y="50%" font-family="Arial" font-size="14px" fill="#736347" text-anchor="middle" dy=".3em">${name}</text>
            </svg>
        `;
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    },

    // Deep clone object
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    // Get nested property safely
    getNestedProperty(obj, path, defaultValue = undefined) {
        const keys = path.split('.');
        let current = obj;

        for (const key of keys) {
            if (current && typeof current === 'object' && key in current) {
                current = current[key];
            } else {
                return defaultValue;
            }
        }

        return current;
    },

    // Set nested property
    setNestedProperty(obj, path, value) {
        const keys = path.split('.');
        let current = obj;

        // Navigate to the parent object
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
                current[keys[i]] = {};
            }
            current = current[keys[i]];
        }

        // Set the value
        const lastKey = keys[keys.length - 1];
        current[lastKey] = value;
    },

    // Format permit status for display
    formatPermitStatus(status) {
        const statusMap = {
            'yes': 'Valid permit verified',
            'no': 'NO VALID PERMIT',
            'expired': 'EXPIRED PERMIT'
        };
        return statusMap[status] || status || 'Not specified';
    },

    // Get possession unit for a species
    getPossessionUnit(speciesId, speciesData) {
        if (speciesId === 'atlantic-sea-scallop') {
            return speciesData['possession-type'] === 'shucked' ? 'lbs' : 'bushels';
        }
        // Default to lbs for most species
        return 'lbs';
    },

    // Check if species is prohibited
    isProhibitedSpecies(speciesId) {
        const prohibitedSpecies = [
            'atlantic-wolffish',  // Prohibited in Northeast Multispecies
            'windowpane-flounder', // Prohibited in Northeast Multispecies
            'ocean-pout'          // Prohibited in Northeast Multispecies
        ];
        return prohibitedSpecies.includes(speciesId);
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Helpers;
}
