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
