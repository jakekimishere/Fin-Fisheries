# FIN release checklist

Use this before and after every production push to `main`.

## Before you push

1. **Run tests locally**
   ```bash
   npm test
   ```
2. **If you changed JS, CSS, or HTML**, bump the cache in `js/config/appBundle.js`:
   - `APP_CACHE_NAME = 'fin-fisheries-vXX'` (increment `XX`)
3. **If you changed species rules**, update:
   - The relevant `species-data/*.js` or policy config file
   - `js/config/regulationMeta.js` → `dataLastUpdated`
   - Homepage/footer dates (driven by `update-checker.js` / `REGULATION_META`)
   - A short note in `DATA_VERIFICATION.md` (source URL + date)
4. **Commit** with a clear message (what changed and why).

## Push and deploy

5. **Push to `main`**
   ```bash
   git push origin main
   ```
6. **Wait for GitHub Actions**
   - **CI** — validation + smoke + browser tests must pass
   - **Deploy to GitHub Pages** — publishes to `gh-pages`
7. **Verify deploy synced** (optional but recommended)
   ```bash
   git fetch origin
   npm run pages:check
   ```
   `main` and `origin/gh-pages` should report the same `APP_CACHE_NAME`.

## After deploy (live smoke test)

8. Open the site in an **Incognito / private** window:
   - https://jakekimishere.github.io/FIsheries-Inspection-Navigator/
9. Walk one full path:
   - Home → Northeast → select 1–2 species → **Proceed to Assessment** → see questions (not blank)
   - Toggle **night mode** — text should stay readable
10. If the app looks stale:
    - Hard refresh (**Ctrl+Shift+R**)
    - Or use the **“New version available — Refresh”** banner when it appears
    - DevTools → Application → Service Workers → Unregister (last resort)

## Tag optional releases

For milestones you may want to roll back to:

```bash
git tag -a v1.0.0 -m "Stable assessment flow + dark mode"
git push origin v1.0.0
```

## Quick commands

| Goal | Command |
|------|---------|
| Full local check | `npm test` |
| Deploy sync check | `npm run pages:check` |
| Tests + pages check | `npm run release:check` |
| Browser UI smoke | `npm run test:e2e` |
| Local dev server | `npx --yes serve .` |
