# plusplus.fit

The public site for [PlusPlus (++)](https://github.com/plusplusinc/plusplus) — marketing landing page and developer-platform docs.

Hand-rolled static HTML/CSS in the app's quiet-terminal design language (v3 "ink × increment green" palette, dark default, light via `prefers-color-scheme`). No build step, no dependencies.

## Layout

- `index.html` — landing page
- `docs/index.html` — developer platform overview (format, repo-as-backend, CLI, MCP)
- `privacy/` — privacy policy (public-TestFlight prerequisite)
- `r/` — client-side shared-routine viewer (payload rides the URL fragment, never a server)
- `.well-known/apple-app-site-association` — universal links (Team ID `WK2XVYGZU9`; served with the right content type via `vercel.json`)
- `style.css` — the one stylesheet
- `vercel.json` — clean URLs + AASA content-type header
- `CNAME` — leftover from the retired GitHub Pages setup; harmless

## Hosting (Vercel)

The site deploys on Vercel as a plain static project. One-time setup, done
from the Vercel dashboard by the account owner:

1. **Add New → Project → Import `plusplusinc/plusplus.fit`** (framework preset: **Other**, no build command, output directory: root).
2. **Settings → Domains → add `plusplus.fit`** (the domain already lives in this Vercel account, so it attaches without DNS changes).
3. Every push to `main` deploys; PRs get preview URLs automatically.

Until that import happens, nothing deploys — it also gates universal links
(the AASA already carries the real Team ID and the app ships the
associated-domains entitlement since build 23).

The GitHub Pages workflow was retired in favor of Vercel.

## License

MIT — see [LICENSE](LICENSE). The app itself is AGPL-3.0; this repo is just
the site.
