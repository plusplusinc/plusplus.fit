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

## Hosting (Vercel)

The site is LIVE on Vercel as a plain static project (framework preset
**Other**, no build command, output directory: root), connected to this
repo — every push to `main` deploys production; PRs get preview URLs
automatically. The domains `plusplus.fit` + `www.plusplus.fit` are
attached (apex 308s to www).

The AASA carries the real Team ID and the app ships the
associated-domains entitlement since build 23, so universal links work
as long as the deployed AASA is current.

The GitHub Pages workflow (and its `CNAME`) was retired in favor of Vercel.

## License

MIT — see [LICENSE](LICENSE). The app itself is AGPL-3.0; this repo is just
the site.
