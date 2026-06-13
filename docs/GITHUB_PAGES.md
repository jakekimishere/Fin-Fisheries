# GitHub Pages setup for FIN

## Correct URL

| What | URL |
|------|-----|
| **Live app** | https://jakekimishere.github.io/Fin-Fisheries/ |
| **Source code** | https://github.com/jakekimishere/Fin-Fisheries |

The app does **not** run on the github.com repo page. You must use the **github.io** link.

## One-time GitHub settings

1. Repo **Public**: Settings → General → Change repository visibility.
2. **Pages**: Settings → Pages → Build and deployment:
   - **Source:** Deploy from a branch
   - **Branch:** `gh-pages` / **/(root)**
   - Save
3. **About** (optional): On the repo home, click ⚙️ next to About → Website → paste the github.io URL.

## How deploy works

Every push to `main` runs `.github/workflows/deploy-pages.yml`, which copies the site to the `gh-pages` branch. GitHub Pages serves that branch.

Check **Actions** → **Deploy to GitHub Pages** → green checkmark.

## Troubleshooting

### Blank page with header but no species list

- Open browser **DevTools** (F12) → **Console** for red errors.
- **Application** → **Service Workers** → Unregister → hard refresh.
- Confirm scripts load: Network tab should show `200` for `species-data.js`, `app/main.js`.

### 404

- Wrong URL (missing `/Fin-Fisheries/` or wrong capitalization).
- Pages not enabled (see settings above).
- Deploy still running — wait for Actions to finish.

### Old version after update

- Hard refresh or Incognito.
- Service worker cache bumps in `js/config/appBundle.js` (`fin-fisheries-v*`); unregister SW if stuck.

## Local testing

```bash
npx --yes serve .
```

Then open http://localhost:3000 (not the github.io base path — local does not use `/Fin-Fisheries/` base tag).
