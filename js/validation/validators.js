// Validation Module
// Handles all validation logic for assessment steps

class Validators {
    constructor(state) {
        this.state = state || window.appState;
    }

    // Validate permits step
    validatePermitsStep() {
        try {
            if (typeof StateBridge !== 'undefined') {
                StateBridge.syncFromWindow(this.state);
            }

            const assessmentData = this.state?.assessmentData || { species: {} };
            const selectedSpecies = this.state?.selectedSpecies || [];
            
            const otherSpeciesSelected = selectedSpecies.filter(id => !this.isMultispecies(id));
            const multispeciesSelected = selectedSpecies.filter(id => this.isMultispecies(id));

            // Check multispecies permit if applicable
            if (multispeciesSelected.length > 0) {
                let hasMultispeciesPermit = false;

                // First check if set directly on multispecies
                if (assessmentData.species?.['multispecies']?.['has-permit']) {
                    hasMultispeciesPermit = true;
                } else {
                    // Check if any individual multispecies has permit status
                    hasMultispeciesPermit = multispeciesSelected.some(id => {
                        const permitStatus = assessmentData.species?.[id]?.['has-permit'];
                        return permitStatus && (permitStatus === 'yes' || permitStatus === 'no' || permitStatus === 'expired');
                    });
                }

                if (!hasMultispeciesPermit) {
                    return 'Please select a permit status for Northeast Multispecies.';
                }
            }

            // Check each individual species
            for (const speciesId of otherSpeciesSelected) {
                const speciesData = assessmentData.species?.[speciesId];
                const hasPermit = speciesData?.['has-permit'];
                
                if (!hasPermit || (hasPermit !== 'yes' && hasPermit !== 'no' && hasPermit !== 'expired')) {
                    const species = SPECIES_DATA[speciesId];
                    const speciesName = species ? species.name : speciesId;
                    return `Please select a permit status for ${speciesName}.`;
                }

                // If permit is "yes", require permit type (unless recreational which doesn't need a type)
                if (hasPermit === 'yes') {
                    const permitType = speciesData?.['permit-type'];
                    if (!permitType || permitType.trim() === '') {
                        const species = SPECIES_DATA[speciesId];
                        const speciesName = species ? species.name : speciesId;
                        // Check if this species has recreational option (which might not require permit-type)
                        const hasRecreational = species?.regulations?.permits?.recreational;
                        if (!hasRecreational) {
                            return `Please select a permit type for ${speciesName} (permit status is "Valid Permit").`;
                        }
                    }
                }
            }

            return null; // No validation errors
        } catch (error) {
            console.error('Error validating permits step:', error);
            return 'Error validating permits. Please check your selections and try again.';
        }
    }

    // Check if species is part of multispecies complex
    isMultispecies(speciesId) {
        const multispeciesIds = [
            'atlantic-cod', 'haddock', 'yellowtail-flounder', 'winter-flounder',
            'windowpane-flounder', 'atlantic-wolffish', 'redfish', 'atlantic-halibut',
            'white-hake', 'pollock', 'witch-flounder', 'american-plaice', 'ocean-pout'
        ];
        return multispeciesIds.includes(speciesId);
    }

    // Check combined possession limits for species groups
    checkCombinedPossessionLimits(selectedSpeciesIds) {
        const violations = [];
        
        if (typeof shareCombinedLimit !== 'function') {
            return violations; // Config not loaded
        }
        
        if (typeof StateBridge !== 'undefined') {
            StateBridge.flushAssessmentInputs();
        }

        const assessmentData = this.state.assessmentData || { species: {} };
        
        // Check each permit type
        const permitTypes = ['commercial', 'recreational', 'charter-headboat'];
        
        permitTypes.forEach(permitType => {
            // Get species with this permit type
            const speciesWithPermit = selectedSpeciesIds.filter(speciesId => {
                // First try to read from input fields (most current data)
                const inputField = document.getElementById(`${speciesId}-possession-amount-grouped`);
                if (inputField && inputField.value) {
                    // Data exists in input field - check permit type from assessmentData
                    const speciesData = assessmentData.species && assessmentData.species[speciesId];
                    return speciesData && speciesData['permit-type'] === permitType;
                }
                // Fallback to assessmentData
                const speciesData = assessmentData.species && assessmentData.species[speciesId];
                return speciesData && speciesData['permit-type'] === permitType;
            });
            
            if (speciesWithPermit.length === 0) return;
            
            // Check for combined limits
            const combinedLimitGroups = shareCombinedLimit(speciesWithPermit, permitType);
            
            combinedLimitGroups.forEach(groupData => {
                const { group, species, limit } = groupData;
                
                if (!limit || !limit.limit) return; // No limit defined
                
                // Calculate total possession from all species in this group
                // PRIORITY: Read from input fields first (most current), then fallback to assessmentData
                let totalPossession = 0;
                const speciesNames = [];
                
                species.forEach(speciesId => {
                    // Try input field first (real-time data)
                    const inputField = document.getElementById(`${speciesId}-possession-amount-grouped`);
                    let amount = 0;
                    
                    if (inputField && inputField.value) {
                        amount = parseFloat(inputField.value) || 0;
                    } else {
                        // Fallback to assessmentData
                        const speciesData = assessmentData.species && assessmentData.species[speciesId];
                        if (speciesData && speciesData.possessionAmount !== undefined) {
                            amount = parseFloat(speciesData.possessionAmount) || 0;
                        }
                    }
                    
                    if (amount > 0) {
                        totalPossession += amount;
                        const speciesInfo = SPECIES_DATA[speciesId];
                        if (speciesInfo) {
                            speciesNames.push(speciesInfo.name);
                        }
                    }
                });
                
                // Check if total exceeds combined limit
                if (limit.limit.count && totalPossession > limit.limit.count) {
                    violations.push(
                        `COMBINED LIMIT VIOLATION: ${group.name} - Total possession: ${totalPossession} ${limit.limit.unit} vs ${limit.limit.count} ${limit.limit.unit} combined limit. ` +
                        `Selected species: ${speciesNames.join(', ')}. ${limit.cfr ? `(${limit.cfr})` : ''}`
                    );
                }
            });
        });
        
        return violations;
    }

    // Validate possession step (if needed)
    validatePossessionStep() {
        // Add possession validation logic here if needed
        return null; // No errors
    }

    // Validate size/gear step (if needed)
    validateSizeGearStep() {
        // Add size/gear validation logic here if needed
        return null; // No errors
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Validators;
}
