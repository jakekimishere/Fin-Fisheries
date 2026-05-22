// State Manager - Centralized application state
class AppState {
    constructor() {
        this.selectedSpecies = [];
        this.currentStep = -1; // Homepage is -1, species selection is 0
        this.totalSteps = 9;
        this.assessmentData = {
            vessel: {},
            species: {} // Will store per-species assessment data
        };
        this.listeners = [];
    }

    // Subscribe to state changes
    subscribe(callback) {
        this.listeners.push(callback);
        // Return unsubscribe function
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    // Notify all listeners of state change
    notify(changeType, data) {
        this.listeners.forEach(listener => {
            try {
                listener(changeType, data, this);
            } catch (error) {
                console.error('Error in state listener:', error);
            }
        });
    }

    // Update state and notify listeners
    setState(updates) {
        let changed = false;
        const changes = {};

        for (const key in updates) {
            if (this[key] !== updates[key]) {
                const oldValue = this[key];
                this[key] = updates[key];
                changes[key] = { old: oldValue, new: updates[key] };
                changed = true;
            }
        }

        if (changed) {
            this.notify('stateChange', changes);
        }

        return this;
    }

    // Get current state (returns a copy to prevent direct mutation)
    getState() {
        return {
            selectedSpecies: [...this.selectedSpecies],
            currentStep: this.currentStep,
            totalSteps: this.totalSteps,
            assessmentData: JSON.parse(JSON.stringify(this.assessmentData))
        };
    }

    // Species management
    addSpecies(speciesId) {
        if (!this.selectedSpecies.includes(speciesId)) {
            this.selectedSpecies.push(speciesId);
            
            // Sync to window.selectedSpecies for backward compatibility
            if (typeof window !== 'undefined') {
                if (!window.selectedSpecies) {
                    window.selectedSpecies = [];
                }
                if (!window.selectedSpecies.includes(speciesId)) {
                    window.selectedSpecies.push(speciesId);
                }
            }
            
            this.notify('speciesAdded', { speciesId, total: this.selectedSpecies.length });
        }
        return this;
    }

    removeSpecies(speciesId) {
        const index = this.selectedSpecies.indexOf(speciesId);
        if (index > -1) {
            this.selectedSpecies.splice(index, 1);
            
            // Sync to window.selectedSpecies for backward compatibility
            if (typeof window !== 'undefined' && window.selectedSpecies) {
                const windowIndex = window.selectedSpecies.indexOf(speciesId);
                if (windowIndex > -1) {
                    window.selectedSpecies.splice(windowIndex, 1);
                }
            }
            
            this.notify('speciesRemoved', { speciesId, total: this.selectedSpecies.length });
        }
        return this;
    }

    toggleSpecies(speciesId) {
        if (this.selectedSpecies.includes(speciesId)) {
            this.removeSpecies(speciesId);
        } else {
            this.addSpecies(speciesId);
        }
        return this;
    }

    clearSpecies() {
        this.selectedSpecies = [];
        this.notify('speciesCleared', {});
        return this;
    }

    // Step navigation
    setStep(step) {
        const oldStep = this.currentStep;
        this.currentStep = step;
        
        // Sync to global currentStep for backward compatibility
        if (typeof window !== 'undefined') {
            window.currentStep = step;
        }
        
        this.notify('stepChanged', { old: oldStep, new: step });
        return this;
    }

    // Assessment data management
    setAssessmentData(path, value) {
        const keys = path.split('.');
        let current = this.assessmentData;

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

        // Sync to window.assessmentData for backward compatibility
        if (typeof window !== 'undefined') {
            if (!window.assessmentData) {
                window.assessmentData = { vessel: {}, species: {} };
            }
            let windowCurrent = window.assessmentData;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!windowCurrent[keys[i]]) {
                    windowCurrent[keys[i]] = {};
                }
                windowCurrent = windowCurrent[keys[i]];
            }
            windowCurrent[lastKey] = value;
        }

        this.notify('assessmentDataChanged', { path, value });
        return this;
    }

    getAssessmentData(path) {
        const keys = path.split('.');
        let current = this.assessmentData;

        for (const key of keys) {
            if (current && typeof current === 'object' && key in current) {
                current = current[key];
            } else {
                return undefined;
            }
        }

        return current;
    }

    // Reset all state
    reset() {
        this.selectedSpecies.length = 0;
        this.currentStep = -1;
        this.assessmentData.vessel = {};
        this.assessmentData.species = {};

        if (typeof window !== 'undefined' && typeof StateBridge !== 'undefined') {
            StateBridge.bindToAppState(this);
        } else if (typeof window !== 'undefined') {
            window.selectedSpecies = this.selectedSpecies;
            window.assessmentData = this.assessmentData;
            window.currentStep = this.currentStep;
        }

        this.notify('stateReset', {});
        return this;
    }
}

// Create and export singleton instance
const appState = new AppState();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = appState;
}
