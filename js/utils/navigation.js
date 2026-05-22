// Navigation Module
// Handles step navigation and progress tracking

class Navigation {
    constructor(state) {
        this.state = state || window.appState;
        this.init();
    }

    init() {
        // Subscribe to step changes
        this.state.subscribe((changeType, data, state) => {
            if (changeType === 'stepChanged') {
                this.updateProgress();
            }
        });
    }

    // Show a specific step
    showStep(step) {
        document.querySelectorAll('.step-section').forEach(section => {
            section.classList.remove('active');
        });

        const multispeciesSelected = this.state.selectedSpecies.filter(id => this.isMultispecies(id));
        const hasMultispecies = multispeciesSelected.length > 0;

        if (step === -1) {
            // Homepage
            const homepage = document.getElementById('step-homepage');
            if (homepage) homepage.classList.add('active');
        } else if (step === 0) {
            // Species selection
            const speciesStep = document.getElementById('step-0');
            if (speciesStep) speciesStep.classList.add('active');
        } else if (step === 1) {
            // Step 1 (vessel info) removed - skip directly to assessment
            // Generate grouped assessment steps
            if (this.state.selectedSpecies.length > 0) {
                if (typeof window.assessmentSteps !== 'undefined' && window.assessmentSteps.generate) {
                    window.assessmentSteps.generate();
                } else if (typeof generateGroupedAssessmentSteps === 'function') {
                    generateGroupedAssessmentSteps();
                }
                
                // Check if we should use dynamic questions
                const useDynamicQuestions = window.assessmentSteps && 
                    typeof window.assessmentSteps.shouldUseDynamicQuestions === 'function' &&
                    window.assessmentSteps.shouldUseDynamicQuestions();
                
                if (hasMultispecies) {
                    this.showGroupedStep('vessel-classification');
                } else if (useDynamicQuestions) {
                    this.showGroupedStep('dynamic-assessment');
                } else {
                    this.showGroupedStep('permits');
                }
            }
        } else if (hasMultispecies && step >= 2 && step <= 6) {
            // Show specific grouped assessment step (with vessel classification)
            const stepNames = ['vessel-classification', 'permits', 'possession', 'size-gear', 'vessel-requirements'];
            const stepIndex = step - 2;
            const stepName = stepNames[stepIndex];
            if (stepName) {
                this.showGroupedStep(stepName);
            }
        } else if (!hasMultispecies && step >= 2 && step <= 5) {
            // Show specific grouped assessment step (without vessel classification)
            const stepNames = ['permits', 'possession', 'size-gear', 'vessel-requirements'];
            const stepIndex = step - 2;
            const stepName = stepNames[stepIndex];
            if (stepName) {
                this.showGroupedStep(stepName);
            }
        } else if ((hasMultispecies && step === 7) || (!hasMultispecies && step === 6)) {
            // Results - hide all grouped assessment steps first
            document.querySelectorAll('.grouped-assessment').forEach(groupedStep => {
                groupedStep.style.display = 'none';
            });
            
            // Hide assessment sections container
            const assessmentSections = document.getElementById('assessment-sections');
            if (assessmentSections) {
                assessmentSections.style.display = 'none';
            }
            
            // Generate and show report
            if (typeof showPreReportSummary === 'function') {
                showPreReportSummary();
            } else if (typeof window.reportGenerator !== 'undefined' && window.reportGenerator.generate) {
                window.reportGenerator.generate();
            } else if (typeof generateReport === 'function') {
                generateReport();
                const resultsSection = document.getElementById('results-section');
                if (resultsSection) {
                    resultsSection.classList.add('active');
                    resultsSection.style.display = 'block';
                }
            }
        }

        this.state.setStep(step);
        this.updateProgress();
    }

    // Show a specific grouped assessment step
    showGroupedStep(stepName) {
        // Hide results section if it's visible
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.classList.remove('active');
            resultsSection.style.display = 'none';
        }
        
        // Show assessment sections container
        const assessmentSections = document.getElementById('assessment-sections');
        if (assessmentSections) {
            assessmentSections.style.display = 'block';
        }
        
        // Hide all grouped steps
        const allSteps = document.querySelectorAll('.grouped-assessment');
        allSteps.forEach(step => {
            step.style.display = 'none';
        });

        // Show the requested step
        const stepElement = document.getElementById(`grouped-${stepName}`);
        if (stepElement) {
            stepElement.style.display = 'block';
        }

        // Update quick reference if available
        if (typeof window.assessmentSteps !== 'undefined' && window.assessmentSteps.updateQuickReference) {
            window.assessmentSteps.updateQuickReference(stepName);
        } else if (typeof updateQuickReference === 'function') {
            updateQuickReference(stepName);
        }
    }

    // Update progress bar
    updateProgress() {
        const multispeciesSelected = this.state.selectedSpecies.filter(id => this.isMultispecies(id));
        const hasMultispecies = multispeciesSelected.length > 0;

        const baseSteps = 2; // Homepage + Species Selection
        const vesselClassificationStep = hasMultispecies ? 1 : 0;
        const groupedSteps = 4; // Permits, Possession, Size/Gear, Vessel Requirements
        const finalStep = 1; // Results
        const calculatedTotalSteps = baseSteps + vesselClassificationStep + groupedSteps + finalStep;

        // Adjust currentStep for display (homepage is -1, species selection is 0)
        let displayStep = this.state.currentStep;
        if (this.state.currentStep < 0) {
            displayStep = 0;
        }

        const progress = (displayStep / calculatedTotalSteps) * 100;
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        
        if (progressBar) {
            progressBar.style.setProperty('--progress', `${progress}%`);
        }
        if (progressText) {
            progressText.textContent = `Step ${displayStep + 1} of ${calculatedTotalSteps}`;
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

    // Select regional fishery
    selectRegionalFishery(region) {
        if (region === 'northeast') {
            this.showStep(0);
        }
        // Future: handle other regions here
    }

    // Navigate to next grouped assessment step
    nextGroupedStep(currentStepName) {
        try {
            if (typeof StateBridge !== 'undefined') {
                StateBridge.flushAssessmentInputs();
            }

            const multispeciesSelected = this.state.selectedSpecies.filter(id => this.isMultispecies(id));
            const hasMultispecies = multispeciesSelected.length > 0;
            
            // Check if we should use dynamic questions
            const useDynamicQuestions = window.assessmentSteps && 
                typeof window.assessmentSteps.shouldUseDynamicQuestions === 'function' &&
                window.assessmentSteps.shouldUseDynamicQuestions();
            
            // Define step order based on whether we have multispecies and use dynamic questions
            let stepOrder;
            if (useDynamicQuestions) {
                stepOrder = hasMultispecies ? 
                    ['vessel-classification', 'dynamic-assessment'] :
                    ['dynamic-assessment'];
            } else {
                stepOrder = hasMultispecies ? 
                    ['vessel-classification', 'permits', 'possession', 'size-gear', 'vessel-requirements'] :
                    ['permits', 'possession', 'size-gear', 'vessel-requirements'];
            }
            
            const currentIndex = stepOrder.indexOf(currentStepName);
            
            if (currentIndex === -1) {
                console.error('Current step not found in step order:', currentStepName);
                return;
            }
            
            // Save any input data before moving
            if (typeof saveGroupedStepData === 'function') {
                saveGroupedStepData(currentStepName);
            }
            
            if (currentIndex < stepOrder.length - 1) {
                const nextStep = stepOrder[currentIndex + 1];
                const nextIndex = currentIndex + 1;
                const stepNumber = hasMultispecies ? 2 + nextIndex : 2 + nextIndex;
                this.showStep(stepNumber);
            } else {
                // Generate report
                const reportStep = hasMultispecies ? 7 : 6;
                this.showStep(reportStep);
            }
        } catch (error) {
            console.error('Error in nextGroupedStep:', error);
            if (typeof Helpers !== 'undefined' && Helpers.showErrorMessage) {
                Helpers.showErrorMessage('Error proceeding to next step. Please try again.');
            } else if (typeof showErrorMessage === 'function') {
                showErrorMessage('Error proceeding to next step. Please try again.');
            }
        }
    }

    // Navigate to previous grouped assessment step
    prevGroupedStep(currentStepName) {
        try {
            if (typeof StateBridge !== 'undefined') {
                StateBridge.flushAssessmentInputs();
            }

            const multispeciesSelected = this.state.selectedSpecies.filter(id => this.isMultispecies(id));
            const hasMultispecies = multispeciesSelected.length > 0;
            
            // Check if we should use dynamic questions
            const useDynamicQuestions = window.assessmentSteps && 
                typeof window.assessmentSteps.shouldUseDynamicQuestions === 'function' &&
                window.assessmentSteps.shouldUseDynamicQuestions();
            
            // Define step order based on whether we have multispecies and use dynamic questions
            let stepOrder;
            if (useDynamicQuestions) {
                stepOrder = hasMultispecies ? 
                    ['vessel-classification', 'dynamic-assessment'] :
                    ['dynamic-assessment'];
            } else {
                stepOrder = hasMultispecies ? 
                    ['vessel-classification', 'permits', 'possession', 'size-gear', 'vessel-requirements'] :
                    ['permits', 'possession', 'size-gear', 'vessel-requirements'];
            }
            
            const currentIndex = stepOrder.indexOf(currentStepName);
            
            if (currentIndex === -1) {
                console.error('Current step not found in step order:', currentStepName);
                // Fallback: go back to species selection
                if (typeof window !== 'undefined' && typeof window.showStep === 'function') {
                    window.showStep(0);
                } else {
                    this.showStep(0);
                }
                return;
            }
            
            if (currentIndex > 0) {
                const prevStep = stepOrder[currentIndex - 1];
                const prevIndex = currentIndex - 1;
                const stepNumber = hasMultispecies ? 2 + prevIndex : 2 + prevIndex;
                // Use global showStep if available (from orchestrator), otherwise use this.showStep
                if (typeof window !== 'undefined' && typeof window.showStep === 'function') {
                    window.showStep(stepNumber);
                } else {
                    this.showStep(stepNumber);
                }
            } else {
                // Go back to species selection (step 0)
                if (typeof window !== 'undefined' && typeof window.showStep === 'function') {
                    window.showStep(0);
                } else {
                    this.showStep(0);
                }
            }
        } catch (error) {
            console.error('Error in prevGroupedStep:', error);
            if (typeof Helpers !== 'undefined' && Helpers.showErrorMessage) {
                Helpers.showErrorMessage('Error going back. Please try again.');
            } else if (typeof showErrorMessage === 'function') {
                showErrorMessage('Error going back. Please try again.');
            }
        }
    }
}

// Expose methods to window for global access (for onclick handlers in HTML)
// Fallback if orchestrator has not registered prevGroupedStep
if (typeof window !== 'undefined') {
    // Only expose if prevGroupedStep doesn't already exist
    if (!window.prevGroupedStep && typeof Navigation !== 'undefined') {
        // Create a global navigation instance if it doesn't exist
        if (!window.navigationInstance && window.appState) {
            window.navigationInstance = new Navigation(window.appState);
        }
        
        // Expose prevGroupedStep to window for button onclick handlers
        if (window.navigationInstance) {
            window.prevGroupedStep = function(currentStepName) {
                return window.navigationInstance.prevGroupedStep(currentStepName);
            };
        }
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navigation;
}
