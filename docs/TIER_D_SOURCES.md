# Tier D — sources and features (2026-05-21)

## HMS sharks (recreational)
| Species | Rule |
|---------|------|
| Blue, thresher, porbeagle, tiger, bull, lemon, nurse, spinner, etc. | 1/vessel/trip from allowable list; **54" FL** (hammerheads **78" FL**) — 50 CFR 635.22 |
| Shortfin mako | **Retention prohibited** (zero limit, July 2022) |
| Oceanic whitetip | **Retention prohibited** U.S. Atlantic (Feb 2024) |

Source: [HMS Recreational Compliance Guide 2025](https://www.fisheries.noaa.gov/s3/2025-04/HMS-Recreational-Compliance-Guide-2025-Final.pdf)

## Groundfish common pool (cod, haddock)
`GROUND_FISH_TRIP_LIMITS_CONFIG.js` — effective **March 9, 2026** per [NOAA common pool page](https://www.fisheries.noaa.gov/new-england-mid-atlantic/commercial-fishing/northeast-multispecies-common-pool-fishery).

## Pre-report summary
`showPreReportSummary()` in `assessmentEngine.js` — runs `checkAllViolations()` before full report generation.
