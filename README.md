# FIN — Fisheries Inspection Navigator

**Personal project disclaimer:** Not affiliated with, endorsed by, or representative of the U.S. Coast Guard, NOAA, or any government agency. Always verify regulations with official NOAA sources.

Offline-capable web app for Northeast fisheries and Atlantic HMS compliance assessments. Data is sourced from public NOAA regulations (50 CFR Parts 648 and 635).

## Features

- Multi-species selection with search and favorites
- Date-aware assessments (`REGULATION_DATES_CONFIG.js`)
- Dynamic question flows for HMS species (e.g. Bluefin Tuna)
- Grouped steps for scallop, flounder, and multispecies groundfish
- Printable compliance report with CFR citations
- PWA offline support after first load

## Live app (GitHub Pages)

**URL:** [https://jakekimishere.github.io/Fin-Fisheries/](https://jakekimishere.github.io/Fin-Fisheries/)

Use that exact path (repo name is case-sensitive: `Fin-Fisheries`).

### If you see a 404 or a failed Actions deploy

**First-time setup (do this once):**

1. Repo must be **Public** — **Settings → General → Change repository visibility** (private repos need GitHub Pro for Pages).
2. Open **Settings → Pages** → under **Build and deployment**, set **Source** to **GitHub Actions**.
3. **Actions** tab → **Deploy to GitHub Pages** → **Re-run all jobs** (after the latest push).

If **Setup Pages** still fails with “Get Pages site failed”:

1. **Settings → Pages** → confirm **Source** is **GitHub Actions** (not “None”).
2. Approve any **Environment** prompt for `github-pages` (first deploy may ask for approval under **Settings → Environments**).
3. Re-run the workflow.

When green, the site URL is shown on the completed run and under **Settings → Pages**.

Local testing: open `index.html` directly or use any static file server.

## Quick start

1. Open the live link above (or `index.html` locally).
2. Select **Northeast Regional Fisheries** → choose species → complete assessment → print report.

## Project layout

| Path | Purpose |
|------|---------|
| `species-data.js` | Regulation data and assessment questions (**primary maintenance file**) |
| `js/config/regulationMeta.js` | `dataLastUpdated` and app version |
| `js/legacy/assessmentEngine.js` | Report generation, violations, grouped UI (being migrated) |
| `app/main.js` | Application entry point |
| `ARCHITECTURE.md` | System design and Bluefin flow map |
| `docs/REGULATION_UPDATES.md` | **Step-by-step regulation update workflow** |

## Updating regulations

When NOAA publishes changes:

1. Edit `species-data.js` (and date/group configs if needed).
2. Set `REGULATION_META.dataLastUpdated` in `js/config/regulationMeta.js`.
3. Sync `regulation-updates.json`.
4. Follow the full checklist in **[docs/REGULATION_UPDATES.md](docs/REGULATION_UPDATES.md)**.

## Development

- Script load order is defined in `index.html` and mirrored in `js/config/appBundle.js`.
- After changing cached assets, bump `APP_CACHE_NAME` in `appBundle.js` for offline users.
- `automated-tests.js` runs smoke checks in the browser on load.

## Data sources

- [NOAA Greater Atlantic](https://www.greateratlantic.fisheries.noaa.gov/)
- [Atlantic HMS](https://www.fisheries.noaa.gov/topic/atlantic-highly-migratory-species)
- 50 CFR Part 648 (Northeast) · 50 CFR Part 635 (HMS)

See `DATA_VERIFICATION.md` for HMS sourcing detail.

## License

Personal / educational reference only.
