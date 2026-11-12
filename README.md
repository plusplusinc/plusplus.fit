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
- `wrangler.jsonc`: Cloudflare Workers static-assets config, serving `public/` on both hostnames

Both pages carry both files, so a change to either file's text goes in both HTML files.

## Preview

```sh
python3 -m http.server 8788 --directory public
```

## Hosting

The site is a Cloudflare Worker, `plusplus-fit`, with no script: it serves `public/` as static
assets. `plusplus.fit` and `www.plusplus.fit` are both attached to it as custom domains, and the
domain's DNS is a Cloudflare zone.

The domain is registered through Vercel, which renews it; its nameservers there are set to
Cloudflare's.

Deploy by hand:

```sh
npx wrangler deploy
```

A push to `main` does not deploy. To change that, connect this repo to the Worker under Workers
Builds in the Cloudflare dashboard.

## License

MIT. See [LICENSE](LICENSE).
