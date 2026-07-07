# plusplus.fit

The public site for [PlusPlus (++)](https://github.com/mrdavidjcole/plusplus) — marketing landing page and developer-platform docs.

Hand-rolled static HTML/CSS in the app's quiet-terminal design language (v3 "ink × increment green" palette, dark default, light via `prefers-color-scheme`). No build step, no dependencies.

## Layout

- `index.html` — landing page
- `docs/index.html` — developer platform overview (format, repo-as-backend, CLI, MCP)
- `style.css` — the one stylesheet
- `.github/workflows/pages.yml` — deploys to GitHub Pages on push to `main`
- `CNAME` — `plusplus.fit` custom domain

## Deploying

Pushes to `main` deploy automatically once GitHub Pages is set to "GitHub Actions" in the repo settings. The custom domain needs DNS at the registrar: an `ALIAS`/`ANAME` (or the four `A` records GitHub documents) for the apex plus a `CNAME` for `www`.

## Hosting (Vercel)

The site deploys on Vercel as a plain static project (`vercel.json` handles clean URLs and the AASA content type). One-time setup, done from the Vercel dashboard by the account owner:

1. **Add New → Project → Import `mrdavidjcole/plusplus.fit`** (framework preset: **Other**, no build command, output directory: root).
2. **Settings → Domains → add `plusplus.fit`** (the domain already lives in this Vercel account, so it attaches without DNS changes).
3. Every push to `main` deploys; PRs get preview URLs automatically.

**TODO for universal links:** replace `TEAMID` in `.well-known/apple-app-site-association` with the real Apple Team ID (App Store Connect → Membership) so `https://plusplus.fit/r#…` links open the app directly. Until then the viewer's "Open in PlusPlus" button (custom scheme) does the job.

The GitHub Pages workflow was retired in favor of Vercel.
