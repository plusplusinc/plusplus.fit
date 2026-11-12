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
assets. The domain's DNS is a Cloudflare zone.

- `plusplus.fit` is the address. `www.plusplus.fit` redirects to it (a redirect rule on the zone),
  and plain `http://` redirects to `https://` (the zone's Always Use HTTPS setting).
- A push to `main` deploys: the Worker is connected to this repo under Workers Builds, with no
  build command and `npx wrangler deploy` as the deploy command. Pull requests get a preview build.
- The domain is registered through Vercel, which renews it; its nameservers there are set to
  Cloudflare's.

To deploy by hand:

```sh
npx wrangler deploy
```

## License

MIT. See [LICENSE](LICENSE).
