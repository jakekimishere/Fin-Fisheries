# Species data modules

Regulation content is split by fishery for easier maintenance.

| File | Contents |
|------|----------|
| `01-648-core.js` | 648 Mid-Atlantic core (summer flounder, scallop) |
| `02-635-hms.js` | 635 HMS species |
| `03-648-midatlantic.js` | 648 mackerel, squid |
| `04-648-northeast.js` | 648 Northeast species |
| `05-648-small-pelagic.js` | 648 small pelagic group |
| `06-648-pelagic-mollusks.js` | 648 pelagic mollusks |
| `07-648-zooplankton.js` | 648 zooplankton group |
| `08-648-micro.js` | Species under 1 inch |
| `09-648-butterfish.js` | 648 butterfish |
| `10-635-billfish-general.js` | 635 billfish general |
| `11-misc-placeholders.js` | Species placeholders |
| `12-648-groundfish.js` | 648 groundfish / multispecies |
| `13-648-late-species.js` | 648 bluefish, scup, BSB, etc. |
| `14-init.js` | Image init helpers |

After editing, run `npm run validate` and bump `APP_CACHE_NAME` in `js/config/appBundle.js`.
