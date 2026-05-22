/**
 * Binds AppState to legacy window globals used by assessmentEngine.js.
 * AppState is the authoritative store; window.* mirrors the same object references.
 */
const StateBridge = {
    bindToAppState(state) {
        if (!state || typeof window === 'undefined') return state;

        window.appState = state;
        window.selectedSpecies = state.selectedSpecies;
        window.assessmentData = state.assessmentData;
        window.currentStep = state.currentStep;

        if (typeof syncLegacyStateRefs === 'function') {
            syncLegacyStateRefs();
        }

        return state;
    },

    /** Pull window mutations into AppState (e.g. legacy direct writes) */
    syncFromWindow(state) {
        const s = state || window.appState;
        if (!s || typeof window === 'undefined') return s;

        if (window.selectedSpecies && window.selectedSpecies !== s.selectedSpecies) {
            s.selectedSpecies.length = 0;
            s.selectedSpecies.push(...window.selectedSpecies);
        }
        if (window.assessmentData && window.assessmentData !== s.assessmentData) {
            s.assessmentData = window.assessmentData;
        }
        if (typeof window.currentStep === 'number') {
            s.currentStep = window.currentStep;
        }

        this.bindToAppState(s);
        return s;
    },

    /** Push AppState to window before legacy functions run */
    syncToWindow(state) {
        const s = state || window.appState;
        if (!s || typeof window === 'undefined') return s;

        window.selectedSpecies = s.selectedSpecies;
        window.assessmentData = s.assessmentData;
        window.currentStep = s.currentStep;

        if (typeof syncLegacyStateRefs === 'function') {
            syncLegacyStateRefs();
        }

        return s;
    },

    syncBoth(state) {
        this.syncFromWindow(state);
        return this.syncToWindow(state);
    },

    /** Persist visible form values before validation / report */
    flushAssessmentInputs() {
        if (typeof saveGroupedStepData === 'function') {
            saveGroupedStepData('possession');
            saveGroupedStepData('dynamic-assessment');
        }
        if (window.questionRenderer && typeof window.questionRenderer.flushToState === 'function') {
            window.questionRenderer.flushToState();
        }
        return this.syncBoth();
    }
};

if (typeof window !== 'undefined') {
    window.StateBridge = StateBridge;
}
