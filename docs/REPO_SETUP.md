# Repository setup

## Canonical remote

The live project repo:

- **GitHub:** https://github.com/jakekimishere/FIsheries-Inspection-Navigator
- **Pages URL:** https://jakekimishere.github.io/FIsheries-Inspection-Navigator/

If your local clone still points at the old `Fin-Fisheries` URL (redirect works, but names are confusing):

```bash
git remote set-url origin https://github.com/jakekimishere/FIsheries-Inspection-Navigator.git
git remote -v
```

## GitHub Pages (one-time)

1. Repo **Settings** → **Pages**
2. **Build and deployment** → Source: **Deploy from a branch**
3. Branch: **`gh-pages`** / folder **`/(root)`**
4. Save

Every push to `main` runs `.github/workflows/deploy-pages.yml` and updates `gh-pages`.

## GitHub Actions

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | Push / PR to `main` | `npm test` + Playwright browser smoke |
| `deploy-pages.yml` | Push to `main` | Publish site to `gh-pages` |

Deploy waits for CI tests to pass (`needs: test`).

## Local development

```bash
npm install          # includes Playwright for e2e
npm test             # data validation + rule smoke tests
npm run test:e2e     # browser smoke (starts local server)
npx --yes serve .    # manual preview at http://localhost:3000
```
