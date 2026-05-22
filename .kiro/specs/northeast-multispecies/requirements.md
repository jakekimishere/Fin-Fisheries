# Requirements Document

## Introduction

This specification defines the implementation of Northeast Multispecies fishery compliance checking for US Coast Guard boarding officers. The Northeast Multispecies fishery is one of the most complex fisheries in US waters, involving multiple species, sector allocations, common pool regulations, and interconnected catch limits.

## Glossary

- **Northeast_Multispecies_System**: The compliance checking system for groundfish species
- **Sector_Vessel**: A vessel enrolled in a fishing sector with allocated catch shares
- **Common_Pool_Vessel**: A vessel fishing under traditional days-at-sea regulations
- **Groundfish_Species**: The 13 regulated species in the Northeast Multispecies fishery
- **ACE**: Annual Catch Entitlement (sector allocation)
- **DAS**: Days-at-Sea (common pool regulation method)
- **Stock_Area**: Geographic management areas (GOM, GB, SNE/MA, etc.)

## Requirements

### Requirement 1: Vessel Classification Assessment

**User Story:** As a Coast Guard boarding officer, I want to determine if a vessel is enrolled in a sector or fishing under common pool regulations, so that I can apply the correct compliance framework.

#### Acceptance Criteria

1. WHEN a vessel is boarded, THE Northeast_Multispecies_System SHALL determine vessel enrollment status
2. WHEN a vessel has a valid sector permit, THE Northeast_Multispecies_System SHALL identify the specific sector
3. WHEN a vessel is fishing under common pool regulations, THE Northeast_Multispecies_System SHALL apply DAS-based compliance checks
4. IF a vessel has no valid multispecies permit, THEN THE Northeast_Multispecies_System SHALL flag as a permit violation

### Requirement 2: Species Identification and Grouping

**User Story:** As a boarding officer, I want to efficiently assess multiple groundfish species found on board, so that I can complete comprehensive compliance checks without repetitive data entry.

#### Acceptance Criteria

1. THE Northeast_Multispecies_System SHALL support assessment of all 13 regulated groundfish species
2. WHEN multiple groundfish species are present, THE Northeast_Multispecies_System SHALL group similar compliance checks
3. WHEN species share the same stock area, THE Northeast_Multispecies_System SHALL consolidate area-based questions
4. THE Northeast_Multispecies_System SHALL display species-specific minimum sizes for each groundfish species

### Requirement 3: Sector Vessel Compliance

**User Story:** As a boarding officer, I want to verify sector vessel compliance with ACE allocations and sector-specific regulations, so that I can identify quota violations and regulatory non-compliance.

#### Acceptance Criteria

1. WHEN assessing a sector vessel, THE Northeast_Multispecies_System SHALL verify ACE allocation status for each species
2. WHEN a sector vessel exceeds species-specific ACE, THE Northeast_Multispecies_System SHALL flag as an overage violation
3. WHEN a sector vessel is in a closed area, THE Northeast_Multispecies_System SHALL check for valid exemptions
4. THE Northeast_Multispecies_System SHALL verify sector-specific gear requirements and restrictions
5. WHEN a sector vessel has observer coverage requirements, THE Northeast_Multispecies_System SHALL verify compliance

### Requirement 4: Common Pool Vessel Compliance

**User Story:** As a boarding officer, I want to verify common pool vessel compliance with DAS regulations and trip limits, so that I can ensure vessels are operating within traditional regulatory frameworks.

#### Acceptance Criteria

1. WHEN assessing a common pool vessel, THE Northeast_Multispecies_System SHALL verify valid DAS allocation
2. WHEN a common pool vessel is on a DAS trip, THE Northeast_Multispecies_System SHALL check trip limit compliance
3. WHEN a common pool vessel exceeds trip limits, THE Northeast_Multispecies_System SHALL flag as a possession violation
4. THE Northeast_Multispecies_System SHALL verify DAS-specific gear requirements
5. WHEN DAS are exhausted, THE Northeast_Multispecies_System SHALL flag vessels fishing without valid DAS

### Requirement 5: Stock Area Management

**User Story:** As a boarding officer, I want to verify that vessels are fishing in authorized areas and complying with area-specific regulations, so that I can enforce spatial management measures.

#### Acceptance Criteria

1. THE Northeast_Multispecies_System SHALL identify the current fishing area (Gulf of Maine, Georges Bank, Southern New England/Mid-Atlantic)
2. WHEN a vessel is in a closed area, THE Northeast_Multispecies_System SHALL verify valid exemptions or special access permits
3. WHEN species have area-specific regulations, THE Northeast_Multispecies_System SHALL apply appropriate compliance checks
4. THE Northeast_Multispecies_System SHALL check for compliance with seasonal area closures

### Requirement 6: Gear Compliance Assessment

**User Story:** As a boarding officer, I want to verify fishing gear compliance with multispecies regulations, so that I can ensure proper gear configurations and mesh requirements.

#### Acceptance Criteria

1. THE Northeast_Multispecies_System SHALL verify minimum mesh size requirements for trawl gear
2. WHEN using gillnet gear, THE Northeast_Multispecies_System SHALL check mesh size and area restrictions
3. WHEN using hook gear, THE Northeast_Multispecies_System SHALL verify compliance with hook and line regulations
4. THE Northeast_Multispecies_System SHALL check for required gear modifications (TEDs, chain mats, etc.)

### Requirement 7: Size Limit Compliance

**User Story:** As a boarding officer, I want to verify that all groundfish species meet minimum size requirements, so that I can enforce conservation measures and prevent harvest of undersized fish.

#### Acceptance Criteria

1. THE Northeast_Multispecies_System SHALL enforce species-specific minimum sizes for all 13 groundfish species
2. WHEN undersized fish are present, THE Northeast_Multispecies_System SHALL calculate violation severity
3. THE Northeast_Multispecies_System SHALL account for area-specific size variations where applicable
4. WHEN measuring fish, THE Northeast_Multispecies_System SHALL specify proper measurement methods (total length, fork length, etc.)

### Requirement 8: Integrated Reporting

**User Story:** As a boarding officer, I want to generate a comprehensive compliance report covering all multispecies regulations, so that I can document violations and provide clear enforcement guidance.

#### Acceptance Criteria

1. THE Northeast_Multispecies_System SHALL generate a unified report covering all assessed groundfish species
2. WHEN violations are identified, THE Northeast_Multispecies_System SHALL reference specific CFR citations
3. THE Northeast_Multispecies_System SHALL summarize sector/common pool status and associated violations
4. THE Northeast_Multispecies_System SHALL provide clear violation categories (permit, possession, size, gear, area)
5. THE Northeast_Multispecies_System SHALL calculate total violation severity across all species

### Requirement 9: Efficient Multi-Species Workflow

**User Story:** As a boarding officer, I want to assess multiple groundfish species efficiently without repetitive questions, so that I can complete thorough inspections in minimal time.

#### Acceptance Criteria

1. THE Northeast_Multispecies_System SHALL group permit questions for all groundfish species
2. THE Northeast_Multispecies_System SHALL consolidate gear questions when vessels use the same gear for multiple species
3. THE Northeast_Multispecies_System SHALL batch area compliance checks for species in the same stock areas
4. WHEN vessels have similar regulations across species, THE Northeast_Multispecies_System SHALL minimize redundant questions

### Requirement 10: Data Validation and Error Handling

**User Story:** As a boarding officer, I want the system to validate multispecies data and handle errors gracefully, so that I can trust the compliance assessments and complete inspections even when data issues occur.

#### Acceptance Criteria

1. THE Northeast_Multispecies_System SHALL validate all species data before generating assessments
2. WHEN species data is incomplete, THE Northeast_Multispecies_System SHALL provide clear error messages
3. THE Northeast_Multispecies_System SHALL handle missing regulation data gracefully
4. WHEN calculation errors occur, THE Northeast_Multispecies_System SHALL log errors and continue with manual verification prompts