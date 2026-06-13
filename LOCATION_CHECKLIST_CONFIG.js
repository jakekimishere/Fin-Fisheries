/**
 * Inspector attestation checklists for special fishing locations (no GPS).
 * Merged into species assessmentQuestions at load time.
 */
const LOCATION_CHECKLIST_TEMPLATES = {
    scallop648: {
        sectionTitle: 'Special location checklist — Atlantic sea scallop',
        intro: 'Answer based on VMS, charts, or vessel statement. “Yes” means the situation applies.',
        cfr: '50 CFR Part 648 Subpart D',
        items: [
            {
                field: 'locScallopClosedArea',
                question: 'Is the vessel fishing in a closed scallop area or rotational area without a valid declared access trip?',
                notes: 'Includes closed areas and transit through rotational areas without continuous transit when on a scallop declaration.',
                violation: {
                    ifTrue: 'VIOLATION: Scallop fishing or prohibited transit in closed/rotational area (50 CFR 648.60)'
                }
            },
            {
                field: 'locScallopWgomTransit',
                question: 'Did the vessel enter or transit the Western Gulf of Maine closure without continuous transit (gear stowed, direct heading)?',
                notes: 'Western GOM closure — no transit unless gear stowed and expeditious passage.',
                violation: {
                    ifTrue: 'VIOLATION: Prohibited transit in Western Gulf of Maine closure (50 CFR 648.60)'
                }
            },
            {
                field: 'locScallopLagcClosedAccess',
                question: 'Is this a LAGC vessel fishing in an access area closed to LAGC (e.g., NY Bight, Area II when closed, Nantucket Lightship)?',
                applicablePermits: ['lagc-ifq', 'lagc-ngom', 'lagc-incidental'],
                notes: 'Verify VMS code and current access program status.',
                violation: {
                    ifTrue: 'VIOLATION: LAGC fishing in area closed to general category (50 CFR 648.59)'
                }
            },
            {
                field: 'locScallopNgomLagc',
                question: 'LAGC IFQ or incidental — is the vessel fishing in the Northern Gulf of Maine?',
                applicablePermits: ['lagc-ifq', 'lagc-incidental'],
                violation: {
                    ifTrue: 'VIOLATION: NGOM closed to LAGC IFQ and incidental permits (50 CFR 648.62)'
                }
            },
            {
                field: 'locScallopStellwagenShipwreck',
                question: 'Is fishing gear within 400 ft of a Stellwagen Bank shipwreck site?',
                notes: 'NOAA requests gear stay ≥400 ft from listed sanctuary shipwreck coordinates.',
                violation: {
                    ifTrue: 'VIOLATION: Gear too close to Stellwagen Bank shipwreck site (sanctuary avoidance request)'
                }
            }
        ]
    },
    surfclam648: {
        sectionTitle: 'Special location checklist — surf clam / ocean quahog',
        intro: 'Answer based on charts, VMS, or vessel statement. Closed areas apply to commercial and recreational.',
        cfr: '50 CFR Part 648 Subpart E',
        items: [
            {
                field: 'locBostonFoulGround',
                question: 'Is the vessel fishing for surfclam or ocean quahog in the Boston Foul Ground (1 nm around 42°25′36″ N, 70°35′00″ W)?',
                violation: {
                    ifTrue: 'VIOLATION: Boston Foul Ground closed to surfclam and ocean quahog fishing (50 CFR 648.76)'
                }
            },
            {
                field: 'locNyBightSurfclam',
                question: 'Is the vessel harvesting surfclam or ocean quahog in the New York Bight closure area?',
                violation: {
                    ifTrue: 'VIOLATION: New York Bight closed to surfclam and ocean quahog harvest (50 CFR 648.76)'
                }
            },
            {
                field: 'loc106Dumpsite',
                question: 'Is the vessel fishing for surfclam or ocean quahog in the 106 Dumpsite closed area?',
                violation: {
                    ifTrue: 'VIOLATION: 106 Dumpsite closed to surfclam and ocean quahog fishing (50 CFR 648.76)'
                }
            },
            {
                field: 'locGeorgesBankPspHarvest',
                question: 'Is the vessel harvesting surfclam or ocean quahog in the Georges Bank PSP closed area without a valid LOA aboard?',
                notes: 'Trips into the PSP area require LOA on board even when not harvesting.',
                violation: {
                    ifTrue: 'VIOLATION: Harvest in Georges Bank PSP area or missing required LOA (50 CFR 648.76)'
                }
            },
            {
                field: 'locGscHmaMobileGear',
                question: 'Is mobile bottom-tending gear being used in the Great South Channel HMA outside a surfclam/blue mussel exemption area?',
                violation: {
                    ifTrue: 'VIOLATION: Mobile bottom gear prohibited in GSC HMA outside exemption areas (50 CFR 648.76)'
                }
            },
            {
                field: 'locGscOldSouthSeason',
                question: 'Is mobile bottom-tending gear being used in the Old South exemption area during Nov 1–Apr 30?',
                dateFilter: { months: [11, 12, 1, 2, 3, 4] },
                notes: 'Old South closed to all mobile bottom gear Nov 1 through Apr 30 each year.',
                violation: {
                    ifTrue: 'VIOLATION: Old South area closed to mobile bottom gear Nov 1–Apr 30 (50 CFR 648.76)'
                }
            }
        ]
    },
    smb648: {
        sectionTitle: 'Special location checklist — squid / mackerel / butterfish',
        intro: 'Confirm canyon and closure areas from charts or vessel statement.',
        cfr: '50 CFR Part 648 Subpart B',
        items: [
            {
                field: 'locCanyonBottomTrawl',
                question: 'Is bottom trawl gear being used to fish (not continuous transit) in Oceanographer or Lydonia Canyon?',
                notes: 'Transit only with gear stowed — no bottom trawl fishing in these canyons.',
                violation: {
                    ifTrue: 'VIOLATION: Bottom trawl fishing prohibited in Oceanographer or Lydonia Canyon (50 CFR 648.14)'
                }
            }
        ]
    },
    bsb648: {
        sectionTitle: 'Special location checklist — black sea bass',
        intro: 'Answer based on charts, gear inspection, or vessel statement. “Yes” means the situation applies.',
        cfr: '50 CFR Part 648 Subpart I',
        items: [
            {
                field: 'locBsbTransferAtSea',
                question: 'Was black sea bass transferred at sea?',
                applicablePermits: ['commercial'],
                violation: {
                    ifTrue: 'VIOLATION: Transfer at sea prohibited for black sea bass (50 CFR 648.140)'
                }
            },
            {
                field: 'locBsbTrawlMeshThreshold',
                question: 'Commercial otter trawl — possession over seasonal threshold (>500 lb Jan–Mar or >100 lb Apr–Dec) without 4.5″ diamond mesh (75 meshes forward of codend)?',
                applicablePermits: ['commercial'],
                violation: {
                    ifTrue: 'VIOLATION: Trawl mesh non-compliant for possession level (50 CFR 648.140)'
                }
            },
            {
                field: 'locBsbNorthernGra',
                question: 'Northern Scup Gear Restricted Area (Nov 1–Dec 31) — fishing for black sea bass (or longfin squid/whiting) without 5″ diamond mesh?',
                dateFilter: { months: [11, 12] },
                violation: {
                    ifTrue: 'VIOLATION: 5″ diamond mesh required in Northern Scup GRA (50 CFR 648.122)'
                }
            },
            {
                field: 'locBsbSouthernGra',
                question: 'Southern Scup Gear Restricted Area (Jan 1–Mar 15) — fishing for black sea bass (or longfin squid/whiting) without 5″ diamond mesh?',
                dateFilter: { months: [1, 2, 3] },
                notes: 'Southern GRA applies through March 15 each year.',
                violation: {
                    ifTrue: 'VIOLATION: 5″ diamond mesh required in Southern Scup GRA (50 CFR 648.122)'
                }
            }
        ]
    },
    scup648: {
        sectionTitle: 'Special location checklist — scup',
        intro: 'Answer based on charts, gear inspection, or vessel statement. “Yes” means the situation applies.',
        cfr: '50 CFR Part 648 Subpart H',
        items: [
            {
                field: 'locScupWinterOneClosed',
                question: 'Commercial moratorium — fishing for or possessing scup in the EEZ during Winter I (Jan 1–Apr 30)?',
                applicablePermits: ['commercial'],
                dateFilter: { months: [1, 2, 3, 4] },
                violation: {
                    ifTrue: 'VIOLATION: Commercial scup fishery closed in EEZ during Winter I (50 CFR 648.121)'
                }
            },
            {
                field: 'locScupTransferAtSea',
                question: 'Transfer at sea — scup transferred without meeting all requirements (both federal scup permits, seaward of boundary, Winter I or II only, one transfer/trip, full codend, VTR)?',
                applicablePermits: ['commercial'],
                notes: 'Transfer boundary runs from 40°50′N 70°00′W south to 35°30′N 75°00′W.',
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant scup transfer at sea (50 CFR 648.121)'
                }
            },
            {
                field: 'locScupNorthernGra',
                question: 'Northern Scup Gear Restricted Area (Nov 1–Dec 31) — fishing for longfin squid, black sea bass, or whiting without 5″ diamond mesh?',
                dateFilter: { months: [11, 12] },
                violation: {
                    ifTrue: 'VIOLATION: 5″ diamond mesh required in Northern Scup GRA (50 CFR 648.122)'
                }
            },
            {
                field: 'locScupSouthernGra',
                question: 'Southern Scup Gear Restricted Area (Jan 1–Mar 15) — fishing for longfin squid, black sea bass, or whiting without 5″ diamond mesh?',
                dateFilter: { months: [1, 2, 3] },
                notes: 'Southern GRA applies through March 15 each year.',
                violation: {
                    ifTrue: 'VIOLATION: 5″ diamond mesh required in Southern Scup GRA (50 CFR 648.122)'
                }
            },
            {
                field: 'locScupReducedMeshTrawl',
                question: 'Commercial trawl — possession exceeds reduced mesh limit for the season (1,000 lb Oct 1–Apr 14; 2,000 lb Apr 15–Jun 15; 200 lb Jun 16–Sep 30) without compliant >5″ diamond mesh?',
                applicablePermits: ['commercial'],
                violation: {
                    ifTrue: 'VIOLATION: Scup possession exceeds reduced mesh trawl limit (50 CFR 648.121)'
                }
            },
            {
                field: 'locScupSkinRemoved',
                question: 'Scup landed with skin removed when prohibited (moratorium or charter trip, or from EEZ north of 35°15.3′ N)?',
                violation: {
                    ifTrue: 'VIOLATION: Scup may not be landed with skin removed under these conditions (50 CFR 648.121)'
                }
            }
        ]
    },
    summerflounder648: {
        sectionTitle: 'Special location checklist — summer flounder',
        intro: 'Answer based on charts, gear inspection, or vessel statement. “Yes” means the situation applies.',
        cfr: '50 CFR Part 648 Subpart G',
        items: [
            {
                field: 'locSfSeaTurtleTed',
                question: 'Otter trawl in the Summer Flounder Sea Turtle Protection Area (VA/NC south of Cape Charles) — fishing without an approved TED in a compliant TED extension?',
                applicablePermits: ['commercial'],
                notes: 'TED extension ≤3.5″ stretched mesh; frame min 51″×32″, 1.25″ alum pipe, max 4″ bar spacing, 30–55° angle. Exempt north of 35°46.1′ N Jan 15–Mar 15.',
                violation: {
                    ifTrue: 'VIOLATION: Approved TED required in Summer Flounder Sea Turtle Protection Area (50 CFR 223.206)'
                }
            },
            {
                field: 'locSfSmallMeshLoa',
                question: 'Commercial — fishing east of 72°30′ W (May 1–Oct 31) with mesh below 5.5″ diamond/6″ square without a valid small mesh LOA aboard?',
                applicablePermits: ['commercial'],
                dateFilter: { months: [5, 6, 7, 8, 9, 10] },
                violation: {
                    ifTrue: 'VIOLATION: Small mesh east of 72°30′ W requires valid LOA May 1–Oct 31 (50 CFR 648.106)'
                }
            },
            {
                field: 'locSfMeshOverThreshold',
                question: 'Commercial moratorium — possession over seasonal threshold (100 lb May–Oct / 200 lb Nov–Apr) using mesh below 5.5″ diamond or 6″ square throughout the net (without valid small mesh LOA where applicable)?',
                applicablePermits: ['commercial'],
                notes: 'Compliant large mesh: no federal possession limit.',
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant mesh for possession level (50 CFR 648.106)'
                }
            }
        ]
    },
    herring648: {
        sectionTitle: 'Special location checklist — Atlantic herring',
        intro: 'Confirm area status from charts, VMS, or vessel statement. “Yes” means the situation applies.',
        cfr: '50 CFR Part 648 — Atlantic Herring',
        items: [
            {
                field: 'locHerringClosedArea',
                question: 'Is the vessel fishing for herring in a federally closed herring management area?',
                notes: 'Includes seasonal or in-season area closures beyond trip limits.',
                violation: {
                    ifTrue: 'VIOLATION: Herring fishing in closed management area (50 CFR 648.201)'
                }
            },
            {
                field: 'locHerringArea1ADirected',
                question: 'Directed Atlantic herring fishing in Area 1A (currently closed to directed fishery)?',
                applicablePermits: ['commercial', 'herring-cat-a', 'herring-cat-b', 'herring-cat-c', 'herring-cat-d', 'herring-cat-e'],
                violation: {
                    ifTrue: 'VIOLATION: Area 1A closed to directed Atlantic herring fishery (50 CFR 648.201)'
                }
            },
            {
                field: 'locHerringMidwaterTrawl1A',
                question: 'Midwater trawl fishing for herring in Area 1A during Jun 1–Sep 30?',
                applicablePermits: ['commercial', 'herring-cat-a', 'herring-cat-b', 'herring-cat-c', 'herring-cat-d', 'herring-cat-e'],
                dateFilter: { months: [6, 7, 8, 9] },
                violation: {
                    ifTrue: 'VIOLATION: Midwater trawl prohibited in Area 1A Jun 1–Sep 30 (50 CFR 648.201)'
                }
            },
            {
                field: 'locHerringArea1ATransit',
                question: 'Transiting Area 1A with herring on board without all fishing gear stowed?',
                applicablePermits: ['commercial', 'herring-cat-a', 'herring-cat-b', 'herring-cat-c', 'herring-cat-d', 'herring-cat-e'],
                violation: {
                    ifTrue: 'VIOLATION: Directed herring vessels transiting Area 1A must have all gear stowed (50 CFR 648.201)'
                }
            },
            {
                field: 'locHerringTransferAtSea',
                question: 'Unauthorized transfer or receipt of Atlantic herring at sea (not carrier, personal bait, or authorized cooperative transfer)?',
                applicablePermits: ['commercial', 'herring-cat-a', 'herring-cat-b', 'herring-cat-c', 'herring-cat-d', 'herring-cat-e'],
                violation: {
                    ifTrue: 'VIOLATION: Unauthorized Atlantic herring transfer at sea (50 CFR 648.201)'
                }
            },
            {
                field: 'locHerringDof',
                question: 'Vessel declared out of the herring fishery (DOF) but harvesting, possessing, or landing herring on this trip?',
                applicablePermits: ['commercial', 'herring-cat-a', 'herring-cat-b', 'herring-cat-c', 'herring-cat-d', 'herring-cat-e'],
                violation: {
                    ifTrue: 'VIOLATION: Declared out of fishery — may not harvest, possess, or land herring (50 CFR 648.201)'
                }
            },
            {
                field: 'locHerringCarrierGear',
                question: 'Herring carrier operating with gear capable of catching or processing herring aboard, or engaged in fishing activity?',
                violation: {
                    ifTrue: 'VIOLATION: Herring carrier may not have catching/processing gear aboard or engage in fishing (50 CFR 648.201)'
                }
            },
            {
                field: 'locHerringObserverRequired',
                question: 'Midwater trawl in NMS Closed Area 1 North (Feb 1–Apr 15), Closed Area 2, Cashes Ledge, or Western GOM without a NOAA observer?',
                applicablePermits: ['commercial', 'herring-cat-a', 'herring-cat-b', 'herring-cat-c', 'herring-cat-d', 'herring-cat-e'],
                violation: {
                    ifTrue: 'VIOLATION: NOAA observer required for midwater trawl in designated areas (50 CFR 648.201)'
                }
            }
        ]
    },
    bluefish648: {
        sectionTitle: 'Special location checklist — bluefish',
        intro: 'Answer based on charts or vessel statement. “Yes” means the situation applies.',
        cfr: '50 CFR Part 648 — Atlantic Bluefish',
        items: [
            {
                field: 'locBluefishClosedArea',
                question: 'Is the vessel fishing for bluefish in a year-round or seasonal closed area?',
                notes: 'See Northeast closed-area charts.',
                violation: {
                    ifTrue: 'VIOLATION: Bluefish fishing in closed area (50 CFR 648.160)'
                }
            },
            {
                field: 'locBluefishCharterBag',
                question: 'Charter/party — is possession over 7 fish per person when bluefish on board are divided by persons aboard excluding captain and crew?',
                applicablePermits: ['recreational-for-hire', 'charter-headboat'],
                violation: {
                    ifTrue: 'VIOLATION: Charter/party bluefish possession limit exceeded (50 CFR 648.160)'
                }
            }
        ]
    },
    dogfish648: {
        sectionTitle: 'Special location checklist — spiny dogfish',
        intro: 'Answer based on charts, gear inspection, or vessel statement. “Yes” means the situation applies.',
        cfr: '50 CFR Part 648 — Spiny Dogfish',
        items: [
            {
                field: 'locDogfishClosedArea',
                question: 'Is the vessel fishing for spiny dogfish in a year-round or seasonal closed area?',
                violation: {
                    ifTrue: 'VIOLATION: Spiny dogfish fishing in closed area (50 CFR 648.230)'
                }
            },
            {
                field: 'locDogfishSecondTripDay',
                question: 'Commercial open access — is this a second spiny dogfish trip on the same calendar day?',
                applicablePermits: ['commercial'],
                violation: {
                    ifTrue: 'VIOLATION: Only one spiny dogfish trip permitted per calendar day (50 CFR 648.230)'
                }
            },
            {
                field: 'locDogfishMeshNonCompliant',
                question: 'Trawl or gillnet fishing for dogfish outside an exemption area without 6.5″ square or diamond mesh throughout the net?',
                applicablePermits: ['commercial'],
                violation: {
                    ifTrue: 'VIOLATION: 6.5″ square or diamond mesh required in RMAs (50 CFR 648.230)'
                }
            },
            {
                field: 'locDogfishGillnetLength',
                question: 'Gillnet gear longer than 300 feet while fishing for spiny dogfish?',
                applicablePermits: ['commercial'],
                violation: {
                    ifTrue: 'VIOLATION: Gillnet may not exceed 300 feet (50 CFR 648.230)'
                }
            },
            {
                field: 'locDogfishSturgeonOvernightSoak',
                question: 'Gillnet overnight soak in an Atlantic Sturgeon Bycatch Reduction Area (New Jersey, Delaware/Maryland, or Virginia)?',
                applicablePermits: ['commercial'],
                violation: {
                    ifTrue: 'VIOLATION: Overnight gillnet soak prohibited in Atlantic Sturgeon Bycatch Reduction Areas (50 CFR 648.230)'
                }
            },
            {
                field: 'locDogfishNantucketShoals',
                question: 'Nantucket Shoals Dogfish Exemption Area (Jun 1–Oct 15) — fishing without LOA, wrong incidental species, or transiting GOM/GB RMA with small mesh not stowed?',
                applicablePermits: ['commercial'],
                dateFilter: { months: [6, 7, 8, 9, 10] },
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant Nantucket Shoals Dogfish Exemption Area fishing (50 CFR 648.230)'
                }
            },
            {
                field: 'locDogfishGomGbGillnet',
                question: 'GOM/GB Dogfish Gillnet Exemption Area (Jul 1–Aug 31) — fishing without 6.5″ diamond mesh or possessing species other than dogfish and allowed lobster?',
                applicablePermits: ['commercial'],
                dateFilter: { months: [7, 8] },
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant GOM/GB Dogfish Gillnet Exemption Area fishing (50 CFR 648.230)'
                }
            },
            {
                field: 'locDogfishCapeCodExemption',
                question: 'Cape Cod Dogfish Exemption Area — fishing outside season, with wrong gear, or retaining Northeast multispecies?',
                applicablePermits: ['commercial'],
                dateFilter: { months: [6, 7, 8, 9, 10, 11, 12] },
                notes: 'Western area Jun–Aug handgear/longline; Eastern area Jun–Aug handgear, Jun–Dec gillnet/longline.',
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant Cape Cod Dogfish Exemption Area fishing (50 CFR 648.230)'
                }
            },
            {
                field: 'locDogfishSneGillnet',
                question: 'Southern New England Dogfish Gillnet Exemption Area (May 1–Oct 31) — fishing without 6″ diamond mesh or retaining regulated Northeast multispecies?',
                applicablePermits: ['commercial'],
                dateFilter: { months: [5, 6, 7, 8, 9, 10] },
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant SNE Dogfish Gillnet Exemption Area fishing (50 CFR 648.230)'
                }
            },
            {
                field: 'locDogfishMidAtlanticExemption',
                question: 'Mid-Atlantic Exemption Area — gillnet fishing without monkfish DAS, or retaining regulated Northeast multispecies (other than small-mesh whiting/red hake)?',
                applicablePermits: ['commercial'],
                notes: 'Gillnet: 5″ minimum mesh, max 50 stand-up nets, monkfish DAS required.',
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant Mid-Atlantic Dogfish Exemption Area fishing (50 CFR 648.230)'
                }
            }
        ]
    },
    redcrab648: {
        sectionTitle: 'Special location checklist — Atlantic deep sea red crab',
        intro: 'Answer based on gear inspection or vessel statement. “Yes” means the situation applies.',
        cfr: '50 CFR Part 648 — Atlantic Deep Sea Red Crab',
        items: [
            {
                field: 'locRedCrabClosedArea',
                question: 'Is the vessel fishing for red crab in a year-round or seasonal closed area?',
                violation: {
                    ifTrue: 'VIOLATION: Red crab fishing in closed area (50 CFR 648.260)'
                }
            },
            {
                field: 'locRedCrabTransferAtSea',
                question: 'Was Atlantic deep sea red crab transferred at sea?',
                applicablePermits: ['commercial', 'red-crab-cat-b', 'red-crab-cat-c', 'red-crab-open-incidental'],
                violation: {
                    ifTrue: 'VIOLATION: Transfer at sea prohibited for Atlantic deep sea red crab (50 CFR 648.260)'
                }
            },
            {
                field: 'locRedCrabFemaleOverTote',
                question: 'Female red crabs on board in excess of one standard tote (~100 lb) of incidentally caught females?',
                applicablePermits: ['commercial', 'red-crab-cat-b', 'red-crab-cat-c', 'red-crab-open-incidental'],
                violation: {
                    ifTrue: 'VIOLATION: Female red crab possession exceeds incidental tote limit (50 CFR 648.260)'
                }
            },
            {
                field: 'locRedCrabMutilation',
                question: 'Claws/legs separate from bodies in excess of allowed mutilation limits for this permit/trip type?',
                applicablePermits: ['commercial', 'red-crab-cat-b', 'red-crab-cat-c', 'red-crab-open-incidental'],
                notes: 'Dedicated trip: one standard tote of separated claws/legs. Open access/incidental: no separate claws/legs; max 2 claws and 8 legs per body.',
                violation: {
                    ifTrue: 'VIOLATION: Red crab mutilation limits exceeded (50 CFR 648.260)'
                }
            },
            {
                field: 'locRedCrabTrapSize',
                question: 'Red crab DAS — trap volume exceeds 18 cubic feet (without LOA for other shapes)?',
                applicablePermits: ['commercial', 'red-crab-cat-b', 'red-crab-cat-c'],
                violation: {
                    ifTrue: 'VIOLATION: Red crab trap exceeds 18 cubic feet on red crab DAS (50 CFR 648.260)'
                }
            },
            {
                field: 'locRedCrabTrapLimit',
                question: 'More than 600 red crab traps/pots aboard while fishing for red crab?',
                applicablePermits: ['commercial', 'red-crab-cat-b', 'red-crab-cat-c'],
                violation: {
                    ifTrue: 'VIOLATION: Red crab trap limit is 600 traps/pots (50 CFR 648.260)'
                }
            },
            {
                field: 'locRedCrabBuoyMarkings',
                question: 'Red crab trap buoys missing “RC” on top, permit number, trawl sequence, high flyers, or radar reflectors?',
                applicablePermits: ['commercial', 'red-crab-cat-b', 'red-crab-cat-c'],
                violation: {
                    ifTrue: 'VIOLATION: Red crab trap buoy marking or reflector requirements not met (50 CFR 648.260)'
                }
            }
        ]
    },
    lobster697: {
        sectionTitle: 'Special location checklist — American lobster / Jonah crab',
        intro: 'Answer based on charts, gear inspection, or vessel statement. “Yes” means the situation applies.',
        cfr: '50 CFR Part 697',
        items: [
            {
                field: 'locLobsterEggBearing',
                question: 'Egg-bearing American lobster or Jonah crab on board?',
                violation: {
                    ifTrue: 'VIOLATION: Egg-bearing lobster or Jonah crab prohibited (50 CFR 697.7)'
                }
            },
            {
                field: 'locLobsterProhibitedCondition',
                question: 'Prohibited lobster on board — scrubbed/bleached, v-notched (per area tolerance), mutilated, or speared?',
                speciesOnly: ['american-lobster'],
                violation: {
                    ifTrue: 'VIOLATION: Prohibited lobster condition (50 CFR 697.7)'
                }
            },
            {
                field: 'locLobsterTransferAtSea',
                question: 'American lobster or Jonah crab transferred at sea?',
                violation: {
                    ifTrue: 'VIOLATION: Transfer at sea prohibited (50 CFR 697.7)'
                }
            },
            {
                field: 'locLobsterPartialMeat',
                question: 'Possession of lobster meat or parts (other than whole lobsters) prior to landing?',
                speciesOnly: ['american-lobster'],
                violation: {
                    ifTrue: 'VIOLATION: Lobster meat or parts prohibited prior to landing — whole only (50 CFR 697.7)'
                }
            },
            {
                field: 'locLobsterOtherVesselTraps',
                question: 'Trap gear issued to another vessel possessed, deployed, fished, hauled, or on board?',
                applicablePermits: ['commercial', 'commercial-trap', 'commercial-non-trap'],
                violation: {
                    ifTrue: 'VIOLATION: Prohibited to use trap gear issued to another vessel (50 CFR 697.20)'
                }
            },
            {
                field: 'locLobsterTrapRga',
                question: 'Mobile gear or trap/pot fishing in a Lobster Trap/Pot RGA during that gear type’s closed season (RGA I–IV)?',
                applicablePermits: ['commercial', 'commercial-trap'],
                notes: 'RGA I mobile Oct 1–Jun 15 / trap Jun 16–Sep 30; II mobile Nov 27–Jun 15 / trap Jun 16–Nov 26; III mobile Jun 16–Nov 26 / trap Jan 1–Apr 30; IV mobile Jun 16–Sep 30 / trap no closure.',
                violation: {
                    ifTrue: 'VIOLATION: Fishing prohibited in Lobster Trap/Pot RGA during closure (50 CFR 697.20)'
                }
            },
            {
                field: 'locLobsterClosedSeason',
                question: 'Trap fishing in LMA 4 (Apr 30–May 31), LMA 5 (Feb 1–Mar 31), or Outer Cape (Feb 1–Mar 31) during closed season?',
                speciesOnly: ['american-lobster'],
                applicablePermits: ['commercial', 'commercial-trap'],
                violation: {
                    ifTrue: 'VIOLATION: Lobster trap fishery closed for management area season (50 CFR 697.17)'
                }
            },
            {
                field: 'locLobsterMraWedge',
                question: 'MRA Wedge (Massachusetts Restricted Area) — trap/pot gear not removed Feb 1–Apr 30, or trawls reset during closure?',
                applicablePermits: ['commercial', 'commercial-trap'],
                dateFilter: { months: [2, 3, 4] },
                violation: {
                    ifTrue: 'VIOLATION: Lobster/Jonah crab trap gear must be removed during MRA Wedge closure (50 CFR 229.32)'
                }
            },
            {
                field: 'locLobsterTrapGearSpecs',
                question: 'Trap missing parlor escape vent or ghost panel (≥3-3/4″ opening, biodegradable fastener), or exceeds area trap volume (nearshore 22,950 in³ / offshore 30,100 in³)?',
                applicablePermits: ['commercial', 'commercial-trap'],
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant lobster trap gear specifications (50 CFR 697.20)'
                }
            },
            {
                field: 'locLobsterTrapLimit',
                question: 'Number of traps aboard exceeds permit/LMA trap limit for the management area?',
                speciesOnly: ['american-lobster'],
                applicablePermits: ['commercial', 'commercial-trap'],
                notes: 'Area 1: 800; Area 2 max 800; Area 3 max 1,945; Areas 4/5 max 1,440; Outer Cape max 800; Area 6 state waters.',
                violation: {
                    ifTrue: 'VIOLATION: Trap limit exceeded for lobster management area (50 CFR 697.17)'
                }
            },
            {
                field: 'locJonahNonTrapLimit',
                question: 'Commercial non-trap — Jonah crabs exceed 1,000 or exceed 50% by weight of all other catch on board?',
                speciesOnly: ['jonah-crab'],
                applicablePermits: ['commercial-non-trap'],
                violation: {
                    ifTrue: 'VIOLATION: Jonah crab non-trap possession limit exceeded (50 CFR 697.7)'
                }
            }
        ]
    },
    prohib697: {
        sectionTitle: 'Special location checklist — striped bass, sturgeon, horseshoe crab, red drum, weakfish',
        intro: 'Answer based on charts, gear inspection, or vessel statement. “Yes” means the situation applies.',
        cfr: '50 CFR Part 697',
        items: [
            {
                field: 'locStripedBassEezPossession',
                question: 'Atlantic striped bass possessed in the EEZ outside the Block Island Sound transit exemption corridor?',
                speciesOnly: ['striped-bass'],
                violation: {
                    ifTrue: 'VIOLATION: Atlantic striped bass prohibited in the EEZ outside Block Island Sound transit exemption (50 CFR 697.7)'
                }
            },
            {
                field: 'locStripedBassEezFishing',
                question: 'Fishing for Atlantic striped bass from the vessel while in the EEZ (including within the transit corridor)?',
                speciesOnly: ['striped-bass'],
                violation: {
                    ifTrue: 'VIOLATION: Fishing for striped bass from a vessel in the EEZ prohibited (50 CFR 697.7)'
                }
            },
            {
                field: 'locSturgeonEezPossession',
                question: 'Atlantic or shortnose sturgeon possessed or harvested in the EEZ?',
                speciesOnly: ['atlantic-sturgeon', 'shortnose-sturgeon'],
                violation: {
                    ifTrue: 'VIOLATION: Sturgeon prohibited in the EEZ — release immediately (50 CFR 697.7)'
                }
            },
            {
                field: 'locHorseshoeShusterReserve',
                question: 'Fishing for horseshoe crabs in the Carl N. Shuster Jr. Horseshoe Crab Reserve?',
                speciesOnly: ['atlantic-coast-horseshoe-crab'],
                violation: {
                    ifTrue: 'VIOLATION: Fishing for horseshoe crabs prohibited in Carl N. Shuster Jr. Reserve (50 CFR 697.7)'
                }
            },
            {
                field: 'locHorseshoeTrawlDredgeClosed',
                question: 'Horseshoe crabs on board a vessel equipped with trawl or dredge gear within the closed reserve area?',
                speciesOnly: ['atlantic-coast-horseshoe-crab'],
                violation: {
                    ifTrue: 'VIOLATION: Possession of horseshoe crabs on trawl/dredge vessel in closed area prohibited (50 CFR 697.7)'
                }
            },
            {
                field: 'locRedDrumProhibitedZone',
                question: 'Atlantic red drum harvested or possessed in the EEZ south of the NJ/NY line (40°29.6′ N, 73°54.1′ W) to the South Atlantic/Gulf council boundary?',
                speciesOnly: ['red-drum'],
                violation: {
                    ifTrue: 'VIOLATION: Atlantic red drum prohibited in EEZ south of NJ/NY line — release immediately (50 CFR 697.7)'
                }
            },
            {
                field: 'locRedDrumRecFederal',
                question: 'Recreational red drum retained or possessed in federal waters?',
                speciesOnly: ['red-drum'],
                applicablePermits: ['recreational'],
                violation: {
                    ifTrue: 'VIOLATION: Recreational red drum fishing prohibited in federal waters (50 CFR 697.7)'
                }
            },
            {
                field: 'locWeakfishRestrictedGear',
                question: 'Weakfish possessed on board while fishing with shrimp trawls, flynet, or crab trawls in the restricted gear area (Cape Hatteras to NC/SC line)?',
                speciesOnly: ['weakfish'],
                violation: {
                    ifTrue: 'VIOLATION: Weakfish possession prohibited while fishing restricted gear in closed area (50 CFR 697.7)'
                }
            }
        ]
    },
    mps24: {
        sectionTitle: 'Special location checklist — marine protected species (ESA)',
        intro: 'Answer based on observation, gear inspection, or vessel statement. “Yes” means the situation applies.',
        cfr: '50 CFR Part 17 — Endangered Species Act',
        items: [
            {
                field: 'locEsaProtectedRetention',
                question: 'ESA-listed marine species retained on board without valid permit or authorization?',
                violation: {
                    ifTrue: 'VIOLATION: Endangered species retention prohibited under ESA (50 CFR 17.21)'
                }
            },
            {
                field: 'locEsaTakeViolation',
                question: 'Protected species taken, harassed, harmed, or not released immediately when required?',
                violation: {
                    ifTrue: 'VIOLATION: Unlawful take of protected species under ESA (50 CFR 17.21)'
                }
            },
            {
                field: 'locEsaRegulationViolation',
                question: 'Violation of protected species regulations — e.g., TED requirements, critical habitat exclusion, or whale approach distance?',
                violation: {
                    ifTrue: 'VIOLATION: Protected species regulation violation (50 CFR 17.21; 50 CFR 223.206)'
                }
            }
        ]
    },
    dolphin622: {
        sectionTitle: 'Special location checklist — Atlantic dolphin / wahoo',
        intro: 'Answer based on charts, gear inspection, or vessel statement. “Yes” means the situation applies.',
        cfr: '50 CFR 622 Subpart M',
        items: [
            {
                field: 'locDolphinTransferAtSea',
                question: 'Dolphin or wahoo transferred at sea?',
                violation: {
                    ifTrue: 'VIOLATION: Transfer at sea prohibited (50 CFR 622.278)'
                }
            },
            {
                field: 'locDolphinLonglineClosed',
                question: 'Longline gear used in an area closed to HMS longline gear?',
                violation: {
                    ifTrue: 'VIOLATION: Longline gear prohibited in HMS closed area (50 CFR 622.278)'
                }
            },
            {
                field: 'locDolphinCarcassCondition',
                question: 'Dolphin or wahoo in Atlantic EEZ not maintained with head and fins intact (beyond evisceration, gilling, scaling)?',
                violation: {
                    ifTrue: 'VIOLATION: Dolphin/wahoo carcass condition requirements not met (50 CFR 622.278)'
                }
            },
            {
                field: 'locDolphinNorth39NoEndorsement',
                question: 'North of 39° N without Dolphin/Wahoo endorsement — combined dolphin/wahoo possession exceeds 200 lb/trip or vessel lacks valid federal fishing permit?',
                applicablePermits: ['commercial'],
                violation: {
                    ifTrue: 'VIOLATION: North of 39° N incidental limit exceeded or missing valid FFP (50 CFR 622.278)'
                }
            },
            {
                field: 'locDolphinVesselBagLimit',
                question: 'Recreational or charter — dolphin on board exceed 54 per vessel per day (or headboat 10 per paying passenger)?',
                speciesOnly: ['mahi-mahi'],
                applicablePermits: ['recreational', 'charter-headboat', 'party-headboat'],
                violation: {
                    ifTrue: 'VIOLATION: Recreational dolphin vessel limit exceeded (50 CFR 622.278)'
                }
            }
        ]
    },
    cmp622: {
        sectionTitle: 'Special location checklist — coastal migratory pelagics',
        intro: 'Answer based on charts, gear inspection, or vessel statement. “Yes” means the situation applies.',
        cfr: '50 CFR 622 Subpart Q',
        items: [
            {
                field: 'locCmpTransferAtSea',
                question: 'King mackerel, Spanish mackerel, or cobia transferred at sea?',
                violation: {
                    ifTrue: 'VIOLATION: Transfer at sea prohibited (50 CFR 622.382)'
                }
            },
            {
                field: 'locCmpGillnetMesh',
                question: 'Run-around gillnet mesh below minimum — king mackerel 4.75″ or Spanish mackerel 3.5″?',
                applicablePermits: ['commercial'],
                violation: {
                    ifTrue: 'VIOLATION: CMP gillnet mesh below minimum requirement (50 CFR 622.382)'
                }
            }
        ]
    },
    forage648: {
        sectionTitle: 'Special location checklist — Mid-Atlantic unmanaged forage',
        intro: 'Answer based on charts, gear inspection, or vessel statement. “Yes” means the situation applies.',
        cfr: '50 CFR 648 Subpart P',
        items: [
            {
                field: 'locForageCombinedLimit',
                question: 'Commercial — combined Mid-Atlantic forage species on board exceed 1,700 lb/trip (without valid transit exemption)?',
                applicablePermits: ['commercial'],
                violation: {
                    ifTrue: 'VIOLATION: Mid-Atlantic forage combined possession limit exceeded (50 CFR 648.94)'
                }
            },
            {
                field: 'locForageTransitGear',
                question: 'Transiting management unit above possession limit with gear not stowed or available for immediate use?',
                applicablePermits: ['commercial'],
                violation: {
                    ifTrue: 'VIOLATION: Forage transit — gear must be stowed and unavailable for use (50 CFR 648.94)'
                }
            },
            {
                field: 'locForageHarvestInUnit',
                question: 'Forage species harvested inside the Mid-Atlantic Forage Species Management Unit without complying with trip limit?',
                applicablePermits: ['commercial'],
                violation: {
                    ifTrue: 'VIOLATION: Forage fishing in management unit — 1,700 lb combined limit applies (50 CFR 648.94)'
                }
            }
        ]
    },
    tilefish648: {
        sectionTitle: 'Special location checklist — tilefish',
        intro: 'Answer based on charts, gear inspection, or vessel statement. “Yes” means the situation applies.',
        cfr: '50 CFR Part 648 — Tilefish',
        items: [
            {
                field: 'locTilefishGraCanyon',
                question: 'Bottom-tending mobile gear (otter trawl, beam trawl, dredge, seine) fishing in a Tilefish Gear Restricted Area (Lydonia, Norfolk, Oceanographer, or Veatch Canyon)?',
                violation: {
                    ifTrue: 'VIOLATION: Bottom-tending mobile gear prohibited in Tilefish GRAs (50 CFR 648.290)'
                }
            },
            {
                field: 'locTilefishBluelineRecSeason',
                question: 'Blueline tilefish — recreational or for-hire retention outside federal season (May 15–November 14)?',
                speciesOnly: ['blueline-tilefish'],
                applicablePermits: ['recreational', 'charter-headboat', 'party-headboat'],
                violation: {
                    ifTrue: 'VIOLATION: Blueline tilefish recreational season closed (50 CFR 648.290)'
                }
            },
            {
                field: 'locTilefishClosedArea',
                question: 'Is the vessel fishing for tilefish in a year-round or seasonal closed area?',
                violation: {
                    ifTrue: 'VIOLATION: Tilefish fishing in closed area (50 CFR 648.290)'
                }
            }
        ]
    },
    skate648: {
        sectionTitle: 'Special location checklist — Northeast skate complex',
        intro: 'Answer based on species ID, gear inspection, or vessel statement. “Yes” means the situation applies.',
        cfr: '50 CFR Part 648 — Northeast Skate Complex',
        items: [
            {
                field: 'locSkateThornyOnBoard',
                question: 'Thorny skate on board or landed?',
                violation: {
                    ifTrue: 'VIOLATION: Thorny skate possession and landing prohibited (50 CFR 648.322)'
                }
            },
            {
                field: 'locSkateBarndoorBait',
                question: 'Skate bait LOA trip — barndoor skate on board or landed?',
                applicablePermits: ['commercial'],
                violation: {
                    ifTrue: 'VIOLATION: Barndoor skate prohibited in bait fishery (50 CFR 648.322)'
                }
            },
            {
                field: 'locSkateTransferAtSea',
                question: 'Skate transferred at sea without federal skate permit and valid LOA on the transferring vessel?',
                applicablePermits: ['commercial'],
                violation: {
                    ifTrue: 'VIOLATION: Unauthorized skate transfer at sea (50 CFR 648.322)'
                }
            },
            {
                field: 'locSkateCarcassWingRatio',
                question: 'Skate carcass weight exceeds 1.27× associated wing weight, or carcasses possessed without associated wings?',
                applicablePermits: ['commercial'],
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant skate carcass/wing possession (50 CFR 648.322)'
                }
            },
            {
                field: 'locSkateBaitLoa',
                question: 'Skate bait LOA trip — fishing without LOA, whole skates under 23″, or possession over 25,000 lb whole skates?',
                applicablePermits: ['commercial'],
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant skate bait LOA fishing (50 CFR 648.322)'
                }
            },
            {
                field: 'locSkateClosedArea',
                question: 'Is the vessel fishing for skate in a year-round or seasonal closed area?',
                violation: {
                    ifTrue: 'VIOLATION: Skate fishing in closed area (50 CFR 648.322)'
                }
            }
        ]
    },
    groundfish648: {
        sectionTitle: 'Special location checklist — Northeast multispecies',
        intro: 'Answer based on charts, VMS, or vessel statement. “Yes” means the situation applies.',
        cfr: '50 CFR Part 648 Subpart F',
        items: [
            {
                field: 'nmsRegulatedMeshArea',
                type: 'choice',
                question: 'Which regulated mesh / stock area best describes where the vessel fished?',
                options: [
                    { value: 'gom', label: 'GOM RMA / GOM stock area' },
                    { value: 'in-gb', label: 'Inshore Georges Bank' },
                    { value: 'off-gb', label: 'Offshore Georges Bank' },
                    { value: 'sne-ma', label: 'SNE or Mid-Atlantic RMA' },
                    { value: 'multiple', label: 'Multiple stock areas this trip' }
                ],
                notes: 'Common pool trip limits and recreational cod/haddock rules depend on stock area.'
            },
            {
                field: 'locGroundfishClosedArea',
                question: 'Is the vessel fishing with gear in a closed groundfish area (rolling closure, EFH, or year-round closure)?',
                notes: 'Sector vessels may have LOA exemptions — still verify.',
                violation: {
                    ifTrue: 'VIOLATION: Fishing prohibited in closed groundfish area (50 CFR 648.81)'
                }
            },
            {
                field: 'locNmsGomCodProtection',
                question: 'Is the vessel fishing in a GOM Cod Protection closure without a valid exemption (recreational, exempt gear, whiting/scallop exempted fishery, etc.)?',
                overwrite: true,
                notes: 'Closures I–V vary by month and permit type. Charter/party with LOA and Handgear A in Closures IV–V may be exempt.',
                violation: {
                    ifTrue: 'VIOLATION: Fishing in GOM Cod Protection closure without exemption (50 CFR 648.81)'
                }
            },
            {
                field: 'locNmsInshoreRollerGear',
                question: 'Is trawl gear fishing in the GOM/GB Inshore Restricted Roller Gear Area with any footrope part (disc, roller, rockhopper) greater than 12 inches?',
                violation: {
                    ifTrue: 'VIOLATION: Trawl footrope exceeds 12″ in Inshore Restricted Roller Gear Area (50 CFR 648.80)'
                }
            },
            {
                field: 'locNmsEasternUsCanadaGear',
                question: 'Is the vessel trawling in the Eastern U.S./Canada Area without required gear (haddock separator, Ruhle, or flounder trawl — sector otter trawl only with valid LOA)?',
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant trawl gear in Eastern U.S./Canada Area (50 CFR 648.85)'
                }
            },
            {
                field: 'locNmsRestrictedGearRga',
                question: 'Is mobile bottom-tending gear fishing (not transiting with gear stowed) in a Mobile Gear or Lobster Trap/Pot RGA during that RGA’s closed season?',
                overwrite: true,
                notes: 'RGA I Oct 1–Jun 15; II Nov 27–Jun 15; III Jun 16–Nov 26; IV Jun 16–Sep 30. Transit allowed if gear stowed.',
                violation: {
                    ifTrue: 'VIOLATION: Mobile gear fishing in Restricted Gear Area during closure (50 CFR 648.80)'
                }
            },
            {
                field: 'locNmsSectorNoLoa',
                question: 'Is this a sector vessel without the sector operations plan and NMFS LOA aboard?',
                applicableVesselCategories: ['sector'],
                violation: {
                    ifTrue: 'VIOLATION: Sector vessel missing required LOA or operations plan (50 CFR 648.87)'
                }
            },
            {
                field: 'locNmsRecCodOutsideGom',
                question: 'Recreational or charter — is Atlantic cod on board while outside the GOM Regulated Mesh Area?',
                applicablePermits: ['recreational'],
                speciesOnly: ['atlantic-cod'],
                violation: {
                    ifTrue: 'VIOLATION: Recreational Atlantic cod retention prohibited outside GOM RMA (50 CFR 648.83)'
                }
            },
            {
                field: 'locNmsClosedArea2Sap',
                question: 'Is the vessel fishing in Closed Area 2 Yellowtail/Haddock SAP outside open season or without valid SAP requirements?',
                notes: 'Haddock SAP Aug 1–Jan 31; yellowtail targeting closed Jul 1–Dec 31.',
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant fishing in Closed Area 2 SAP (50 CFR 648.85)'
                }
            },
            {
                field: 'locNmsExemptedFisheryHeader',
                type: 'choice',
                sectionBreak: true,
                sectionTitle: 'Exempted fishery attestation',
                sectionIntro: 'If participating in an exempted fishery, confirm season, LOA, gear, and declaration. “Yes” on a violation item means non-compliant.',
                question: 'Is the vessel participating in a Northeast multispecies exempted fishery this trip?',
                options: [
                    { value: 'no', label: 'No — not in an exempted fishery' },
                    { value: 'yes', label: 'Yes — exempted fishery trip' },
                    { value: 'unknown', label: 'Unknown / verify with captain' }
                ],
                notes: 'Exempted trips must meet area, season, gear, and LOA rules; declare out of fishery on VMS when required.'
            },
            {
                field: 'locNmsSmallMeshArea',
                question: 'Small Mesh Area 1 or 2 — fishing outside open season or without required mesh/possession limits?',
                notes: 'Area 1 open Jul 15–Nov 15; Area 2 open Jan 1–Jun 30. Silver/offshore hake limits vary by mesh size.',
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant fishing in Small Mesh Exemption Area (50 CFR 648.80)'
                }
            },
            {
                field: 'locNmsRaisedFootropeWhiting',
                question: 'Raised Footrope Trawl whiting exemption (West or East area) — fishing outside season or without LOA?',
                notes: 'West Sep 1–Nov 20; East Sep 1–Dec 31. LOA required.',
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant Raised Footrope whiting exempted fishery (50 CFR 648.80)'
                }
            },
            {
                field: 'locNmsGomGrateWhiting',
                question: 'GOM Grate Raised Footrope whiting exemption — fishing outside Jul 1–Nov 30 or without LOA?',
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant GOM Grate whiting exempted fishery (50 CFR 648.80)'
                }
            },
            {
                field: 'locNmsCultivatorShoalWhiting',
                question: 'Cultivator Shoal whiting exemption — fishing outside Jun 15–Oct 31 or without LOA aboard?',
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant Cultivator Shoal whiting exempted fishery (50 CFR 648.80)'
                }
            },
            {
                field: 'locNmsSneExemption',
                question: 'SNE Exemption Area — trawl fishing without meeting exempted fishery rules (small mesh, not on NMS DAS, retaining regulated NMS)?',
                notes: 'Silver/offshore and red hake limits vary by mesh; many incidental species allowed.',
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant SNE Exemption Area fishing (50 CFR 648.80)'
                }
            },
            {
                field: 'locNmsLittleTunnyGillnet',
                question: 'SNE Little Tunny gillnet exemption — fishing outside Sep 1–Oct 31, without 5.5″ diamond mesh, or without LOA?',
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant SNE Little Tunny gillnet exempted fishery (50 CFR 648.80)'
                }
            },
            {
                field: 'locNmsRedfishExemption',
                question: 'Universal Redfish Exemption — sector vessel fishing without LOA, or with mesh under 5.5″?',
                speciesOnly: ['redfish'],
                notes: 'Sector vessels only; cod sub-closure Feb 1–Mar 31 and Seasonal Closure II Sep 1–Dec 31 apply.',
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant Universal Redfish Exemption fishery (50 CFR 648.80)'
                }
            }
        ]
    },
    monkfish648: {
        sectionTitle: 'Special location checklist — monkfish',
        intro: 'Answer based on charts, VMS, or vessel statement. “Yes” means the situation applies.',
        cfr: '50 CFR Part 648 — Monkfish',
        items: [
            {
                field: 'locMonkfishOffshoreDas',
                question: 'On a monkfish DAS — fishing outside Oct 1–Apr 30 offshore season or outside the Offshore Fishery Program Area without gear stowed during transit?',
                applicablePermits: ['monkfish-cat-f'],
                notes: 'Offshore program requires VMS; Cat F may use incidental limits when not on monkfish DAS.',
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant offshore monkfish DAS fishing (50 CFR 648.92)'
                }
            },
            {
                field: 'locMonkfishCanyonClosure',
                question: 'On a monkfish DAS — is the vessel fishing (not transiting with gear stowed) in Oceanographer or Lydonia Canyon?',
                violation: {
                    ifTrue: 'VIOLATION: Monkfish DAS fishing prohibited in Oceanographer or Lydonia Canyon (50 CFR 648.92)'
                }
            },
            {
                field: 'locMonkfishGomGbGillnetExemption',
                question: 'GOM/GB Monkfish Gillnet Exemption Area — fishing outside Jul 1–Sep 14, without ≥10″ diamond gillnet, or possessing species other than monkfish and lobster?',
                notes: 'Lobster limit: 10% by weight or 200 lobsters, whichever is less.',
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant GOM/GB Monkfish Gillnet Exemption Area fishing (50 CFR 648.92)'
                }
            },
            {
                field: 'locMonkfishSneTrawlExemption',
                question: 'SNE Monkfish/Skate Trawl Exemption Area — fishing without required mesh (10″ square/12″ diamond, 45 meshes), LOA, or allowed possession?',
                notes: 'Year-round; skate bait LOA or ≤10% skate by weight; verify incidental species list.',
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant SNE Monkfish/Skate Trawl Exemption Area fishing (50 CFR 648.92)'
                }
            },
            {
                field: 'locMonkfishSneGillnetExemption',
                question: 'SNE Monkfish/Skate Gillnet Exemption Area — fishing without ≥10″ diamond gillnet or allowed possession/LOA?',
                notes: 'Year-round; monkfish, dogfish, incidental SNE species, and skate rules apply.',
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant SNE Monkfish/Skate Gillnet Exemption Area fishing (50 CFR 648.92)'
                }
            },
            {
                field: 'locMonkfishMaExemption',
                question: 'Mid-Atlantic Exemption Area — retaining regulated Northeast multispecies, or gillnet fishing without monkfish DAS declaration?',
                notes: 'Trawl may use small mesh if not on NMS DAS and not retaining regulated multispecies. Gillnet: 5″ min, 50 stand-up nets, monkfish DAS required.',
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant Mid-Atlantic Exemption Area fishing (50 CFR 648.92)'
                }
            },
            {
                field: 'locMonkfishNjSturgeonGillnet',
                question: 'New Jersey Atlantic Sturgeon Bycatch Reduction Area — using gillnet ≥10″ mesh without low-profile gillnets?',
                notes: 'Low-profile gillnets required year-round when mesh is 10″ or larger.',
                violation: {
                    ifTrue: 'VIOLATION: Non-compliant gillnet in NJ Atlantic Sturgeon Bycatch Reduction Area (50 CFR 648.92)'
                }
            },
            {
                field: 'locMonkfishNfmaNoLetter',
                question: 'Fishing in NFMA without NFMA exemption letter aboard and without VMS tracking for NFMA limits?',
                notes: 'Without letter or VMS, SFMA (more restrictive) quotas apply.',
                violation: {
                    ifTrue: 'VIOLATION: NFMA fishing without required exemption letter or VMS tracking (50 CFR 648.92)'
                }
            }
        ]
    }
};

/** speciesId → template key */
const LOCATION_CHECKLIST_BY_SPECIES = {
    'black-sea-bass': 'bsb648',
    'scup': 'scup648',
    'summer-flounder': 'summerflounder648',
    'atlantic-sea-scallop': 'scallop648',
    'surf-clam': 'surfclam648',
    'ocean-quahog': 'surfclam648',
    'atlantic-mackerel': 'smb648',
    'longfin-squid': 'smb648',
    'shortfin-squid': 'smb648',
    'butterfish': 'smb648',
    'atlantic-chub-mackerel': 'forage648',
    'atlantic-herring': 'herring648',
    'bluefish': 'bluefish648',
    'spiny-dogfish': 'dogfish648',
    'atlantic-deep-sea-red-crab': 'redcrab648',
    'golden-tilefish': 'tilefish648',
    'blueline-tilefish': 'tilefish648',
    'skate': 'skate648',
    'thorny-skate': 'skate648',
    'smooth-skate': 'skate648',
    'barndoor-skate': 'skate648',
    'american-lobster': 'lobster697',
    'jonah-crab': 'lobster697',
    'striped-bass': 'prohib697',
    'atlantic-sturgeon': 'prohib697',
    'shortnose-sturgeon': 'prohib697',
    'atlantic-coast-horseshoe-crab': 'prohib697',
    'red-drum': 'prohib697',
    'weakfish': 'prohib697',
    'mahi-mahi': 'dolphin622',
    'tigerfish': 'dolphin622',
    'king-mackerel': 'cmp622',
    'spanish-mackerel': 'cmp622',
    'atlantic-salmon': 'mps24',
    'anchovies': 'forage648',
    'argentines': 'forage648',
    'greeneyes': 'forage648',
    'halfbeaks': 'forage648',
    'lanternfishes': 'forage648',
    'pearlsides': 'forage648',
    'sand-lances': 'forage648',
    'silversides': 'forage648',
    'cusk-eels': 'forage648',
    'atlantic-saury': 'forage648',
    'pelagic-mollusks': 'forage648',
    'species-under-1inch': 'forage648',
    'copepod': 'forage648',
    'krill': 'forage648',
    'amphipods': 'forage648',
    'atlantic-cod': 'groundfish648',
    'haddock': 'groundfish648',
    'yellowtail-flounder': 'groundfish648',
    'winter-flounder': 'groundfish648',
    'windowpane-flounder': 'groundfish648',
    'atlantic-wolffish': 'groundfish648',
    'ocean-pout': 'groundfish648',
    'pollock': 'groundfish648',
    'redfish': 'groundfish648',
    'white-hake': 'groundfish648',
    'american-plaice': 'groundfish648',
    'witch-flounder': 'groundfish648',
    'atlantic-halibut': 'groundfish648',
    'monkfish': 'monkfish648'
};

function locationChecklistApplies(questionData, permitType, assessmentDate, vesselCategory) {
    if (questionData.applicablePermits && permitType) {
        if (!questionData.applicablePermits.includes(permitType)) return false;
    }
    if (questionData.applicableVesselCategories && vesselCategory) {
        if (!questionData.applicableVesselCategories.includes(vesselCategory)) return false;
    }
    if (questionData.dateFilter?.months && Array.isArray(questionData.dateFilter.months)) {
        const d = assessmentDate instanceof Date ? assessmentDate : new Date(assessmentDate || Date.now());
        const month = d.getMonth() + 1;
        if (!questionData.dateFilter.months.includes(month)) return false;
    }
    return true;
}

function questionAppliesToAssessment(questionData, ctx) {
    const permitType = ctx.permitType || ctx.speciesData?.permitType || ctx.speciesData?.['permit-type'];
    const vesselCategory = ctx.vesselCategory
        || ctx.speciesData?.vesselCategory
        || ctx.speciesData?.['vessel-category']
        || ctx.speciesData?.vesselClassification;
    const assessmentDate = ctx.speciesData?.dateOfCatch || ctx.speciesData?.dateOfLanding
        || (typeof parseAssessmentDate === 'function' ? parseAssessmentDate(ctx.speciesData) : null);
    return locationChecklistApplies(questionData, permitType, assessmentDate, vesselCategory);
}

function mergeLocationChecklistsIntoSpeciesData() {
    if (typeof SPECIES_DATA === 'undefined') return;

    Object.entries(LOCATION_CHECKLIST_BY_SPECIES).forEach(([speciesId, templateKey]) => {
        const template = LOCATION_CHECKLIST_TEMPLATES[templateKey];
        const species = SPECIES_DATA[speciesId];
        if (!template || !species?.regulations) return;

        if (!species.regulations.assessmentQuestions) {
            species.regulations.assessmentQuestions = {};
        }
        const questions = species.regulations.assessmentQuestions;

        template.items.forEach((item, index) => {
            if (item.speciesOnly && !item.speciesOnly.includes(speciesId)) return;

            const key = item.key || `location_${item.field}`;
            if (questions[key] && !item.overwrite) return;

            questions[key] = {
                question: item.question,
                field: item.field,
                type: item.type || 'boolean',
                required: item.required === true,
                section: item.section || 'location-checklist',
                sectionTitle: index === 0
                    ? template.sectionTitle
                    : (item.sectionBreak ? item.sectionTitle : undefined),
                sectionIntro: index === 0
                    ? template.intro
                    : (item.sectionBreak ? item.sectionIntro : undefined),
                sectionBreak: !!item.sectionBreak,
                options: item.options,
                applicablePermits: item.applicablePermits,
                applicableVesselCategories: item.applicableVesselCategories,
                dateFilter: item.dateFilter,
                notes: item.notes,
                violation: item.violation,
                cfr: item.cfr || template.cfr
            };
        });
    });
}

function checkLocationChecklistViolations(speciesId, speciesData, speciesName) {
    const messages = [];
    const templateKey = LOCATION_CHECKLIST_BY_SPECIES[speciesId];
    if (!templateKey || !speciesData) return messages;

    const template = LOCATION_CHECKLIST_TEMPLATES[templateKey];
    const permitType = speciesData.permitType || speciesData['permit-type'];
    const vesselCategory = speciesData.vesselCategory || speciesData['vessel-category']
        || speciesData.vesselClassification;
    const assessmentDate = speciesData.dateOfCatch || speciesData.dateOfLanding
        || (typeof parseAssessmentDate === 'function' ? parseAssessmentDate(speciesData) : null);

    template.items.forEach((item) => {
        if (item.speciesOnly && !item.speciesOnly.includes(speciesId)) return;

        const raw = speciesData[item.field];
        if (raw === undefined || raw === null || raw === '') return;

        const questionData = {
            applicablePermits: item.applicablePermits,
            applicableVesselCategories: item.applicableVesselCategories,
            dateFilter: item.dateFilter,
            violation: item.violation
        };
        if (!locationChecklistApplies(questionData, permitType, assessmentDate, vesselCategory)) return;

        const answer = raw === true || raw === 'true' || raw === 'yes' || raw === 'Yes';
        if (answer && item.violation?.ifTrue) {
            messages.push(item.violation.ifTrue);
        }
    });

    return messages;
}

if (typeof SPECIES_DATA !== 'undefined') {
    mergeLocationChecklistsIntoSpeciesData();
}

if (typeof window !== 'undefined') {
    window.LOCATION_CHECKLIST_TEMPLATES = LOCATION_CHECKLIST_TEMPLATES;
    window.LOCATION_CHECKLIST_BY_SPECIES = LOCATION_CHECKLIST_BY_SPECIES;
    window.mergeLocationChecklistsIntoSpeciesData = mergeLocationChecklistsIntoSpeciesData;
    window.checkLocationChecklistViolations = checkLocationChecklistViolations;
    window.locationChecklistApplies = locationChecklistApplies;
    window.questionAppliesToAssessment = questionAppliesToAssessment;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LOCATION_CHECKLIST_TEMPLATES,
        LOCATION_CHECKLIST_BY_SPECIES,
        mergeLocationChecklistsIntoSpeciesData,
        checkLocationChecklistViolations,
        locationChecklistApplies
    };
}
