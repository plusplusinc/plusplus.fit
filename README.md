# plusplus.fit

The public site for [PlusPlus (++)](https://github.com/plusplusinc/plusplus). The site is one
editor pane: the home page is a short Swift file, `PlusPlus.swift`, that defines `++` and ends on
`you++`, with the tagline and the TestFlight email as comments. The privacy policy is a second
file, `Privacy.md`, on a tab beside it.

Hand-written static HTML, CSS, and one script, in the app's palette and faces (dark only, as the
app is). No build step, no dependencies.

## Layout

- `public/index.html`: the home page, opened on `PlusPlus.swift`
- `public/privacy/index.html`: the same document, opened on `Privacy.md`
- `public/style.css`: the one stylesheet
- `public/editor.js`: switches tabs in place and moves the caret; without it each tab is a link
- `wrangler.jsonc`: Cloudflare Workers static-assets config, serving `public/`
- `vercel.json`: serves `public/` on Vercel; delete it once the domain is on Cloudflare

Both pages carry both files, so a change to either file's text goes in both HTML files.

## Preview

```sh
python3 -m http.server 8788 --directory public
```

## Hosting

Today the site is on Vercel, connected to this repo: a push to `main` deploys production, and
the domain's nameservers are Vercel's (registrar: Name.com).

Decided: the site will move to Cloudflare Workers. To cut over:

1. `npx wrangler deploy` creates the `plusplus-fit` Worker on a `workers.dev` URL.
2. Add `plusplus.fit` as a zone in Cloudflare and point the nameservers at it from Name.com.
3. Attach `plusplus.fit` and `www.plusplus.fit` to the Worker as custom domains, and connect
   the repo under Workers Builds so a push to `main` deploys.
4. Remove the Vercel project and `vercel.json`.

## License

MIT. See [LICENSE](LICENSE).
