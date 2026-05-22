# NOAA Regulation Update System

## Overview

The app includes a comprehensive update checker that verifies if NOAA has published new regulations since the app's data was last updated. All data is sourced directly from official NOAA publications and verified against current CFR regulations.

## Data Sources

The application uses multiple official NOAA sources to ensure data accuracy:

### Primary Sources
- **NOAA Greater Atlantic Regional Fisheries Office**: Primary source for Northeast fisheries regulations
- **NOAA 2025 Summer Flounder Specifications**: Current possession limits, size requirements, and seasonal restrictions
- **NOAA Framework Adjustment 39**: Atlantic Sea Scallop 2025 fishing year specifications
- **50 CFR Part 648**: Federal regulations for Northeastern United States fisheries

### Update Monitoring
The system monitors multiple NOAA sources for regulation changes:
1. **NOAA GARFO RSS Feed**: Real-time updates from Greater Atlantic Regional Fisheries Office
2. **NOAA Fisheries Bulletins**: Official announcements and regulatory updates
3. **Federal Register**: Official rule changes and final regulations
4. **Hosted JSON File**: Manual update tracking (optional)

## How It Works

1. **Update Check Button**: Users can click "Check for NOAA Regulation Updates" on the species selection screen
2. **Multiple Source Verification**: The system checks multiple official NOAA sources for updates
3. **Intelligent Filtering**: Only displays updates relevant to Northeast fisheries and target species
4. **Status Display**: Shows one of:
   - ✓ Regulations are up to date
   - ⚠️ New regulation updates available
   - 📡 Offline/unavailable (app still works offline)
   - ⏳ Checking for updates...

## Data Verification Process

### Current Data Sources (January 7, 2025)
- **Summer Flounder**: [NOAA 2025 Summer Flounder, Scup, Black Sea Bass, and Bluefish Specifications](https://www.fisheries.noaa.gov/bulletin/2025-specifications-summer-flounder-scup-black-sea-bass-and-bluefish-fisheries)
- **Atlantic Sea Scallop**: [NOAA Framework Adjustment 39 to the Atlantic Sea Scallop Fishery Management Plan](https://www.fisheries.noaa.gov/bulletin/2025-fishing-year-limited-access-allocations-atlantic-sea-scallop-fishery)
- **CFR References**: All citations verified against current 50 CFR Part 648

### Verification Steps
1. Cross-reference possession limits with official NOAA specifications
2. Verify size requirements against current CFR regulations
3. Confirm gear requirements with NOAA fishery management plans
4. Check seasonal restrictions and area closures
5. Validate CFR citations against Federal Register publications

## Setting Up the Update System

### Option 1: Host the JSON File (Recommended)

1. **Host the file**: Upload `regulation-updates.json` to a publicly accessible location:
   - GitHub Pages
   - AWS S3
   - Your organization's web server
   - Any static file hosting service

2. **Update the URL**: Edit `update-checker.js` line 12:
   ```javascript
   hosted: 'YOUR_HOSTED_URL/regulation-updates.json',
   ```

3. **Update the file when NOAA publishes new regulations**:
   ```json
   {
     "lastUpdate": "2025-01-15",  // Update this date
     "version": "1.0.1",
     "region": "Northeast",
     "dataSource": {
       "primary": "NOAA Fisheries Greater Atlantic Regional Fisheries Office",
       "summerFlounder": "NOAA 2025 Summer Flounder Specifications",
       "scallop": "NOAA Framework Adjustment 39"
     },
     "changes": [
       {
         "date": "2025-01-15",
         "title": "Summer Flounder possession limits updated",
         "description": "New possession limits for commercial vessels",
         "affectedSpecies": ["summer-flounder"],
         "sources": ["https://www.fisheries.noaa.gov/..."]
       }
     ]
   }
   ```

### Option 2: Use NOAA RSS Feeds (Automatic)

The app automatically monitors multiple NOAA RSS feeds:
- NOAA Greater Atlantic Regional Fisheries Office
- NOAA Fisheries bulletins and announcements
- Federal Register for rule changes

These feeds are checked automatically and filtered for relevant Northeast fisheries updates.

## Updating the App Data

When NOAA publishes new regulations:

1. **Update the regulation data**: Edit `species-data.js` with new limits, seasons, etc.
2. **Add data source information**: Include NOAA source URLs and verification dates
3. **Update the date**: Edit `update-checker.js` line 5:
   ```javascript
   const DATA_LAST_UPDATED = '2025-01-15'; // New date
   ```
4. **Update the hosted JSON file**: If using Option 1, update `regulation-updates.json` with the new date and sources
5. **Test**: Click "Check for Updates" to verify it works

## Data Source Requirements

All regulation data must be sourced from official NOAA publications:

### Required Sources
- **NOAA Greater Atlantic Regional Fisheries Office**: Primary regulatory authority
- **Current NOAA Specifications**: Annual catch limits and possession limits
- **Framework Adjustments**: Management plan updates
- **50 CFR Part 648**: Federal regulations
- **Federal Register**: Official rule publications

### Documentation Requirements
Each regulation entry should include:
- Source URL from official NOAA publication
- CFR citation
- Last verification date
- Specific NOAA document reference

## Offline Functionality

- The app works completely offline
- Update checks require internet connectivity
- If offline or the update service is unavailable, the app shows a status but continues to work normally
- Last checked date is stored locally in the browser

## Manual Verification

⚠️ **Critical**: Even if the update check shows no updates, officers must always verify current regulations with official NOAA sources before conducting assessments. The update check is a convenience feature, not a replacement for official verification.

### Verification Sources
- [NOAA Greater Atlantic Regional Fisheries Office](https://www.greateratlantic.fisheries.noaa.gov/)
- [NOAA Fisheries Northeast Region](https://www.fisheries.noaa.gov/region/new-england-mid-atlantic)
- [Federal Register - NOAA Rules](https://www.federalregister.gov/agencies/national-oceanic-and-atmospheric-administration)
- [50 CFR Part 648](https://www.ecfr.gov/current/title-50/chapter-VI/part-648)

### When to Verify
- Before each boarding and assessment
- When regulations appear outdated
- When update checker shows new updates available
- At the beginning of each fishing year (May 1)
- When area closures or emergency regulations are announced

