# Northeast Multispecies Implementation Design

## Overview

This design document outlines the implementation approach for adding Northeast Multispecies fishery support to the USCG Northeast Fisheries Compliance Checker. The Northeast Multispecies fishery is the most complex fishery in the system, involving 13 groundfish species, sector vs common pool vessel classifications, and interconnected compliance requirements.

## Architecture Approach

### 1. Data Structure Design

**Vessel Classification System:**
- Add `vesselType` field to distinguish between `sector` and `common-pool` vessels
- Create sector-specific data structures for ACE allocations
- Implement DAS (Days-at-Sea) tracking for common pool vessels

**Species Grouping:**
- Create `northeast-multispecies` parent category containing all 13 groundfish species
- Each species maintains individual regulations but shares common assessment workflows
- Implement stock area management (Gulf of Maine, Georges Bank, Southern New England/Mid-Atlantic)

### 2. Assessment Workflow Integration

**Enhanced Grouped Assessment:**
- Extend existing grouped assessment system to handle 13+ species efficiently
- Add vessel classification step before species-specific assessments
- Implement stock area consolidation for species sharing geographic management areas

**Compliance Logic:**
- Sector vessels: ACE allocation checking, sector-specific gear requirements
- Common pool vessels: DAS validation, trip limit enforcement
- Shared requirements: Size limits, gear compliance, area restrictions

### 3. User Experience Design

**Progressive Disclosure:**
- Start with vessel classification (sector vs common pool)
- Group species by stock areas to minimize repetitive questions
- Consolidate gear assessments for vessels using same gear across species
- Batch area compliance checks for species in same management areas

## Implementation Plan

### Phase 1: Data Structure Implementation

1. **Create Northeast Multispecies Species Data**
   - Add all 13 groundfish species to `species-data.js`
   - Define sector vs common pool permit structures
   - Implement ACE and DAS data structures
   - Add stock area definitions

2. **Vessel Classification Logic**
   - Add vessel type selection to assessment workflow
   - Create sector enrollment verification
   - Implement common pool DAS checking

### Phase 2: Assessment Workflow Enhancement

1. **Extend Grouped Assessment System**
   - Modify `generateGroupedAssessmentSteps()` to handle multispecies complexity
   - Add vessel classification step
   - Implement stock area grouping logic

2. **Species-Specific Compliance**
   - Create multispecies possession checking
   - Implement area-based size variations
   - Add gear consolidation for multiple species

### Phase 3: Compliance Checking

1. **Sector Vessel Compliance**
   - ACE allocation verification
   - Sector-specific gear requirements
   - Observer coverage requirements

2. **Common Pool Compliance**
   - DAS allocation checking
   - Trip limit enforcement
   - Traditional gear requirements

## Technical Specifications

### Data Structure Schema

```javascript
'northeast-multispecies': {
    name: 'Northeast Multispecies',
    type: 'multispecies-fishery',
    vesselClassification: {
        'sector': {
            name: 'Sector Vessel',
            requiresACE: true,
            observerCoverage: true
        },
        'common-pool': {
            name: 'Common Pool Vessel',
            requiresDAS: true,
            tripLimits: true
        }
    },
    species: {
        'atlantic-cod': { /* species data */ },
        'haddock': { /* species data */ },
        // ... 11 more species
    },
    stockAreas: {
        'gulf-of-maine': ['atlantic-cod', 'haddock', 'yellowtail-flounder'],
        'georges-bank': ['atlantic-cod', 'haddock', 'winter-flounder'],
        'southern-new-england': ['winter-flounder', 'yellowtail-flounder']
    }
}
```

### Assessment Flow Modifications

1. **Enhanced Species Selection**
   - Allow selection of "Northeast Multispecies" as a category
   - Auto-select relevant groundfish species found on board
   - Group species by stock areas for efficient assessment

2. **Vessel Classification Step**
   - Insert between vessel info and grouped assessments
   - Determine sector enrollment or common pool status
   - Set compliance framework based on classification

3. **Consolidated Assessment Phases**
   - Phase 1: Vessel classification and permits
   - Phase 2: Grouped possession by stock area
   - Phase 3: Consolidated size and gear checks
   - Phase 4: ACE/DAS compliance verification
   - Phase 5: Area and observer requirements

### Integration Points

**Existing System Compatibility:**
- Maintain compatibility with current grouped assessment system
- Extend `selectGroupedChoice()` to handle multispecies complexity
- Enhance `generateReport()` to handle sector vs common pool reporting

**Error Handling:**
- Add multispecies-specific validation
- Handle ACE allocation data errors gracefully
- Provide fallback for missing DAS information

## Risk Mitigation

### Complexity Management
- Implement progressive disclosure to avoid overwhelming users
- Use clear visual indicators for vessel classification
- Provide contextual help for complex regulations

### Data Accuracy
- Validate ACE and DAS data before assessments
- Cross-reference species regulations with stock areas
- Implement sanity checks for possession limits across multiple species

### Performance Considerations
- Optimize species data loading for 13+ species
- Cache stock area calculations
- Minimize DOM manipulation during assessment generation

## Success Metrics

1. **Functionality:** Successfully assess all 13 groundfish species with appropriate sector/common pool logic
2. **Efficiency:** Complete multispecies assessment in under 5 minutes for typical boarding scenario
3. **Accuracy:** Generate comprehensive compliance reports with correct CFR citations
4. **Usability:** Maintain intuitive workflow despite increased complexity

## Next Steps

1. Implement Phase 1: Create comprehensive species data structure
2. Test vessel classification logic with sample data
3. Extend grouped assessment system for multispecies support
4. Integrate ACE and DAS compliance checking
5. Comprehensive testing with realistic boarding scenarios

This design provides a roadmap for implementing the most complex fishery in the Northeast region while maintaining the system's usability and accuracy standards.