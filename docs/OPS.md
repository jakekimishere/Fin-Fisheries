# FIN — Operations & deploy checklist

## Before each release

1. Update regulation data in `species-data.js` and config files (`REGULATION_DATES_CONFIG.js`, `FISHERY_QUOTA_STATUS_CONFIG.js`, `GROUND_FISH_TRIP_LIMITS_CONFIG.js`).
2. Set `js/config/regulationMeta.js` → `dataLastUpdated` to the verification date.
3. Add an entry to `regulation-updates.json`.
4. Bump `APP_CACHE_NAME` in `js/config/appBundle.js` (e.g. `fin-fisheries-v9`).
5. Run validation:
   ```bash
   npm run validate
   npm run test:smoke
   ```
6. Hard-refresh locally (Ctrl+F5) and spot-check:
   - Home footer shows date (not “Loading…”)
   - Angel shark with fish → violation
   - American plaice only → no empty vessel steps
   - Pre-report summary → full report

## GitHub Pages

- Push to `main`; workflow `.github/workflows/deploy-pages.yml` deploys the static site.
- After deploy, open the live URL with cache bypass once.

## PWA / offline

- `service-worker.js` precaches scripts listed in `appBundle.js`.
- After changing script list or cache name, users need one online visit to pick up the new worker.

## Data verification

See `DATA_VERIFICATION.md` for tier sources and `docs/TIER_*_SOURCES.md` for bulletin links.

## Automated checks

| Command | Purpose |
|---------|---------|
| `npm run validate` | Species data + violation coverage |
| `npm run test:smoke` | Scenario smoke tests (salmon, herring, BFT, skates, etc.) |

Browser console: load the app, then run checks from `automated-tests.js` (included on `index.html`).
