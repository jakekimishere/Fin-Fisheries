# Regulation update workflow

This is the main maintenance path after the app is in production. Regulations change frequently — treat updates like a small release.

## Single source of truth for “last updated”

**File:** `js/config/regulationMeta.js`

```javascript
const REGULATION_META = {
    dataLastUpdated: '2025-01-16',  // ← change this (YYYY-MM-DD)
    ...
};
```

The footer, homepage badge, and update checker read `DATA_LAST_UPDATED` from this file (via aliases in `update-checker.js`).

## Checklist (every NOAA / CFR change)

### 1. Research & verify

- [ ] NOAA bulletin or Federal Register rule identified
- [ ] CFR section confirmed (648 vs 635 for HMS)
- [ ] Note effective date and whether seasonal (use `REGULATION_DATES_CONFIG.js`)

### 2. Edit regulation data

| File | When to edit |
|------|----------------|
| `species-data/*.js` | Limits, permits, sizes, gear, `assessmentQuestions`, CFR notes |
| `REGULATION_DATES_CONFIG.js` | Closures, seasons, month-based rules |
| `SPECIES_GROUPS_CONFIG.js` | Combined possession (e.g. shark groups) |
| `DATA_VERIFICATION.md` | New species or major HMS section (optional but recommended) |

**Bluefin / HMS tip:** Most HMS species use `assessmentQuestions` under `regulations` — edit those blocks, not only possession tables.

### 3. Bump version metadata

- [ ] `js/config/regulationMeta.js` → `dataLastUpdated`
- [ ] `regulation-updates.json` → `lastUpdate` + add entry under `changes[]`

### 4. Verify in the app

- [ ] Run `npm run test` (species data, schema, violations, smoke scenarios)
- [ ] Hard refresh (Ctrl+F5) or bump `APP_CACHE_NAME` in `js/config/appBundle.js` if testing offline
- [ ] Run through affected species in browser (dynamic path if `assessmentQuestions` exist)
- [ ] Confirm footer / homepage date matches `dataLastUpdated`
- [ ] Optional: open console — `automated-tests.js` runs on load

### 5. Deploy

- [ ] Deploy static files (Vercel / GitHub Pages / etc.)
- [ ] If users installed PWA: cache updates on next visit after `APP_CACHE_NAME` bump

## Files you should **not** need for routine updates

- `app/main.js`, `js/legacy/assessmentEngine.js` — only if logic/validation rules change
- `index.html` — only if adding new script files
- `service-worker.js` — only if cache name or bundle list changes

## Optional: hosted update manifest

`regulation-updates.json` can be hosted separately for the in-app update checker (`update-checker.js`). Keep `lastUpdate` in sync with `REGULATION_META.dataLastUpdated`.

## Quick test species by regulation part

| Part | Example species ID |
|------|-------------------|
| 50 CFR 648 scallop | `atlantic-sea-scallop` |
| 50 CFR 648 flounder | `summer-flounder` |
| 50 CFR 648 groundfish | `atlantic-cod` (multispecies flow) |
| 50 CFR 635 HMS | `bluefin-tuna` (dynamic questions) |

## Emergency fix (wrong limit in the field)

1. Patch the smallest `species-data/*.js` module (smallest possible diff)
2. Set `dataLastUpdated` to today in `regulationMeta.js`
3. Deploy immediately
4. Document source URL in `regulation-updates.json` `changes[]`
