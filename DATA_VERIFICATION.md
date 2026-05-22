# Data Verification - Public NOAA Information

## Verification Statement

All data included in this application is sourced from **publicly available NOAA (National Oceanic and Atmospheric Administration) regulations** published in the Federal Register and on NOAA Fisheries websites. This information is in the public domain and freely accessible.

## Primary Data Sources

### HMS (Highly Migratory Species) Regulations - 50 CFR Part 635

All HMS species data (tunas, swordfish, billfish, sharks) is sourced from:

1. **50 CFR Part 635** - Atlantic Highly Migratory Species
   - Public Federal Regulation
   - Available at: https://www.ecfr.gov/current/title-50/chapter-VI/part-635
   - All permit categories, possession limits, and size requirements are publicly documented

2. **NOAA HMS Compliance Guides**
   - Public compliance guides published by NOAA Fisheries
   - Available at: https://www.fisheries.noaa.gov/topic/atlantic-highly-migratory-species
   - Includes possession limit charts and permit category information

3. **NOAA HMS Permits Website**
   - Public permit information
   - Available at: https://hmspermits.noaa.gov/
   - Includes current fishery status, retention limits, and hotline information

4. **NOAA Fisheries Bulletins**
   - Public regulatory announcements
   - Available at: https://www.fisheries.noaa.gov/bulletins
   - Includes current retention limits, closures, and seasonal restrictions

## Specific Data Elements Verified

### Bluefin Tuna
- **Permit Categories**: All 8 permit categories (General, Harpoon, Longline, Trap, Purse Seine, Commercial Charter/Headboat, Recreational, Recreational Charter/Headboat) are publicly documented in 50 CFR 635.4
- **Possession Limits**: All limits by permit category are publicly documented in 50 CFR 635.23
- **Size Classes**: Size class definitions (School, Large School/Small Medium, Large Medium, Giant) are publicly documented
- **Restricted Fishing Days**: RFD information is publicly announced in NOAA bulletins
- **BFT IFQ Hotline**: (301) 427-8591 - Public contact information
- **Trophy Fishery Status**: Publicly announced in NOAA bulletins

### Yellowfin, Bigeye, Skipjack, Albacore Tuna (BAYS)
- **Yellowfin**: 3 per person per day, 27" CFL minimum — 50 CFR 635.22 (HMS Recreational Compliance Guide 2025)
- **Bigeye, Skipjack, Albacore**: No federal recreational bag limit; bigeye 27" CFL minimum if retained
- **Trap Prohibition**: Prohibition for Yellowfin, Bigeye, Skipjack, Albacore is publicly documented
- **Permit Requirements**: All permit categories are publicly documented in 50 CFR 635.4

### Mid-Atlantic (648) — 2026 Specifications
- **Summer flounder, scup, black sea bass, bluefish**: Feb 19, 2026 specifications action
- **Bluefish (2026)**: Private 5 fish/person/day; for-hire 7 fish/person/day (50 CFR 648.160)
- **Scup / black sea bass recreational**: Conservation equivalency and status quo measures per Apr 30, 2026 recreational rule — verify state bag/size/season

### Tier D — Additional HMS sharks & groundfish
- **Pelagic/LCS recreational sharks**: 54" fork length; 1 per vessel per trip (50 CFR 635.22)
- **Shortfin mako / oceanic whitetip**: Retention prohibited (zero limit)
- **Atlantic cod / haddock common pool**: Trip limits per `GROUND_FISH_TRIP_LIMITS_CONFIG.js` (Mar 9, 2026 NOAA table)

### Hammerhead Sharks (great, scalloped, smooth)
- **Recreational**: 78" fork length; 1 shark per vessel per trip from allowable species list (50 CFR 635.22)
- **U.S. Caribbean**: Retention prohibited (Feb 2, 2024 rule)
- **Mixed retention**: Cannot retain with tuna, swordfish, or billfish on board

### Swordfish
- **Possession Limits**: All limits are publicly documented in 50 CFR 635.23
- **Size Requirements**: 47" LJFL minimum is publicly documented
- **Permit Categories**: All permit categories are publicly documented in 50 CFR 635.4

### Sharks (Atlantic HMS)
- **Permit Categories**: All permit categories are publicly documented in 50 CFR 635.4
- **Prohibited Species List**: Publicly documented in 50 CFR 635.23
- **Possession Limits**: All limits by species group are publicly documented

### Billfish (Marlin, Sailfish, Spearfish)
- **Possession Limits**: All limits are publicly documented in 50 CFR 635.23
- **Size Requirements**: All size requirements are publicly documented
- **Permit Categories**: All permit categories are publicly documented in 50 CFR 635.4

## VMS Requirements
- **VMS Requirements**: Publicly documented in 50 CFR 635.7
- **Longline Gear Requirements**: Publicly documented
- **Bottom Longline Requirements**: Publicly documented for specific areas and months

## Assessment Questions Structure

The assessment questions format follows the same structure as NOAA's public compliance guides:
- Permit type identification
- Possession limit verification
- Size class determination
- Date-based seasonal restrictions
- Reporting requirements

All questions are based on publicly available compliance checklists and regulatory requirements.

## Data Format Standardization

The format we've implemented matches NOAA's public regulatory charts:
- **Permit Categories**: Listed by type (General, Harpoon, Longline, Trap, Purse Seine, Charter/Headboat Commercial, Charter/Headboat Recreational, Angler)
- **Possession Limits**: Clearly stated with units (No Limit, specific counts, Prohibited)
- **Size Classes**: Defined with specific measurements
- **Seasonal Restrictions**: Date-based with specific months/days
- **Contact Information**: Public hotlines and agency contacts

## Verification Methods

1. **CFR Citations**: All data includes 50 CFR citations that can be verified in the public Federal Register
2. **NOAA Website Cross-Reference**: All information can be cross-referenced with NOAA Fisheries public websites
3. **Compliance Guide Alignment**: Format matches NOAA's publicly available compliance guides
4. **Bulletin Verification**: Seasonal closures and current limits are verified against NOAA public bulletins

## Public Information Confirmation

✅ **All data is public information** - No proprietary, classified, or restricted information is included
✅ **All sources are publicly accessible** - All CFR citations and NOAA websites are publicly available
✅ **All format matches public charts** - The structure follows NOAA's publicly published regulatory charts
✅ **All contact information is public** - Hotlines and agency contacts are publicly listed

## Notes

- Some limits may vary by quota status (open/closed) - these are publicly announced in NOAA bulletins
- Seasonal restrictions are based on publicly published dates
- Trophy fishery status is publicly announced and updated regularly
- Restricted Fishing Days are publicly announced in NOAA bulletins

All information can be independently verified by accessing the public sources listed above.

## Data tiers — last verified (2026-05-21)

| Tier | Scope | Config / data files | Notes |
|------|--------|---------------------|--------|
| A | Summer flounder, scallop, bluefin, swordfish, key sharks | `species-data.js`, `REGULATION_DATES_CONFIG.js` | Bulletin-driven seasonal limits |
| B | BAYS tunas, hammerheads, 2026 flounder specs | `species-data.js`, `docs/TIER_B_SOURCES.md` | |
| C | Scup, black sea bass, bluefish 2026 | `species-data.js`, `docs/TIER_C_SOURCES.md` | Conservation equivalency where noted |
| D | HMS sharks, cod/haddock common pool | `GROUND_FISH_TRIP_LIMITS_CONFIG.js`, `docs/TIER_D_SOURCES.md` | Trip limits Mar 9, 2026 table |
| E | Quota/placeholder species (12) | `FISHERY_QUOTA_STATUS_CONFIG.js`, `regulation-updates.json` | Salmon EEZ ban, herring 2k lb areas, skate wings, mackerel bags |

Changelog: `regulation-updates.json`. Pre-deploy: `npm run test` (validate + smoke). Ops: `docs/OPS.md`.

## Additional Compliance Requirements (Section 6.2 HMS Regulations)

### BFT Measurements
- **Size Classes**: All size class definitions (Young School, School, Large School, Small Medium, Large Medium, Giant) with Curved Fork Length (CFL), Pectoral Fin CFL, and approximate weights are publicly documented in NOAA HMS Compliance Guides
- **Measurement Methods**: CFL for head-on fish, Pectoral Fin CFL for head-off fish - publicly documented in 50 CFR 635.23

### BAYS Minimum Sizes
- **Yellowfin and Bigeye**: 27" CFL minimum - publicly documented in 50 CFR 635.23
- **Albacore and Skipjack**: No minimum size - publicly documented in 50 CFR 635.23

### Pelagic Longline Restrictions
- **Required Permits**: All three permits (Swordfish, Shark, Atlantic Tuna longline) required - publicly documented in 50 CFR 635.4

### Authorized Gear by Permit Type
- **General**: Rod and reel, handline, harpoon, greenstick, bandit - publicly documented in 50 CFR 635.21
- **Longline**: Longline and greenstick - publicly documented in 50 CFR 635.21
- **Trap**: Pound net, fish weir (BFT only) - publicly documented in 50 CFR 635.21
- **Purse Seine**: Purse seine - publicly documented in 50 CFR 635.21
- **Harpoon**: Harpoon - publicly documented in 50 CFR 635.21
- **Charter/Headboat**: Rod and reel, handline, bandit, greenstick, speargun (BAYS only) - publicly documented in 50 CFR 635.21
- **Angler**: Rod and reel, handline, speargun (BAYS only) - publicly documented in 50 CFR 635.21

### Carcass Condition Requirements
- **One pectoral fin and tail must remain intact** - publicly documented in 50 CFR 635.23
- **Measurement requirements** for head-on vs head-off fish - publicly documented

### Cease Fishing Requirements
- **Must return to port** when LARGE MEDIUM or GIANT BFT daily retention limit is reached - publicly documented in 50 CFR 635.23

### Transfer at Sea
- **Prohibited** for all HMS species - publicly documented in 50 CFR 635.23

### Closed Areas
- **Northeastern U.S. Closed Area** closed in June to pelagic longline gear - publicly documented in 50 CFR 635.21

All assessment questions are based on these publicly documented compliance requirements.
