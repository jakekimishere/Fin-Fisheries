# How to update the "last updated" date

The display date is driven by **`js/config/regulationMeta.js`** (single source of truth).

```javascript
const REGULATION_META = {
    dataLastUpdated: '2025-01-16',  // YYYY-MM-DD
    ...
};
```

Also update `regulation-updates.json` → `"lastUpdate"` to the same value.

Full workflow (species data, testing, deploy): **[docs/REGULATION_UPDATES.md](docs/REGULATION_UPDATES.md)**

The footer and homepage read this automatically via `update-checker.js` on page load.
