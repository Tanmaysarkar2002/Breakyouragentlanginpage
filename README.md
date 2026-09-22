# breakyouragent — landing page

Static pages, no build step, no dependencies. Hostable as-is on GitHub Pages.

```
index.html                  landing page + inline CSS/JS
terms.html                  terms of use (DRAFT, needs legal review)
legal.css                   stylesheet for terms.html
taglines.md                 tagline candidates (not published)
favicon.svg                 cracked-box mark
.nojekyll                   stops GitHub Pages running Jekyll (see below)
.well-known/security.txt    RFC 9116 security contact
functions/api/waitlist.js   Cloudflare Pages Function — INERT on GitHub Pages
```

`terms.html` carries visible `[TODO: ...]` blocks for the legal entity, jurisdiction,
liability terms, privacy policy and engine licence. It is marked "Draft, not yet in
force" and must not go live until a lawyer has read it. It tags every claim as either live
today or planned at launch, so nothing on it overstates what the engine actually does.

## Deploy on GitHub Pages

1. Push this folder to a repo. Rename it first — **the current folder name contains a
   space** (`Breakyouragent langin page`), which makes for ugly URLs; `landing` or the
   repo root is better.
2. Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/` (or
   `/docs` if you move the files there).
3. Done. No workflow file needed; Pages serves the files directly.

Three things were changed to make this work, don't undo them:

- **`.nojekyll` must stay.** Without it Pages runs Jekyll, which skips any file or folder
  whose name starts with a dot — so `.well-known/security.txt` would 404. Nothing links to
  that file by design (`security.txt` is found at its well-known path, not via a nav link),
  but scanners and researchers expect it to resolve.
- **All internal links are relative** (`terms.html`, `legal.css`, `favicon.svg`), never
  root-absolute (`/terms.html`). On a project page the site lives at
  `username.github.io/<repo>/`, and a leading slash escapes to the domain root.
- **The waitlist posts through EmailJS**, the same mechanism the StatLense landing page
  uses, so it needs no server and works on GitHub Pages unchanged. The public key, service
  id and template id sit at the top of the script in `index.html`; EmailJS exposes those in
  the browser by design, so they are not secrets. A hidden `botcheck` honeypot catches the
  simplest bots. There is no captcha.

  **They currently point at the StatLense EmailJS service and template**, so breakyouragent
  signups land in that inbox with StatLense's template wording, and the two lists are mixed.
  Create a breakyouragent service and template in EmailJS and swap the ids when you want them
  separated. The payload is `{email, from_name}` and nothing identifies the product, so the
  template cannot tell the two apart on its own.

  `functions/api/waitlist.js` is left in place for a future Cloudflare Pages deploy. It is
  inert on GitHub Pages, which cannot execute functions.

Optional: a custom domain removes the subpath problem entirely (Settings → Pages → Custom
domain). A branded `404.html` is not included — Pages falls back to GitHub's own.

## Deploy on Cloudflare Pages instead

Point the project at this folder, no build command, output directory `/`. Create a KV
namespace and bind it as `WAITLIST` (Settings → Functions → KV namespace bindings), then
set `WAITLIST_ENDPOINT` to `'api/waitlist'`. Export signups with
`npx wrangler kv key list --binding WAITLIST`.

## Local preview

```bash
python -m http.server 8899               # then open http://127.0.0.1:8899
npx wrangler pages dev . --kv WAITLIST   # with the waitlist function live
```

## The sample report numbers

They are illustrative, and the panel says so on the page. They are also internally
consistent, so nobody can catch the page contradicting itself:

| Category | Passed | % | Band |
| --- | --- | --- | --- |
| Prompt injection | 10/12 | 83 | green |
| System prompt leaks | 3/8 | 38 | red |
| Tool misuse | 5/8 | 63 | yellow |
| Data exfiltration | 6/6 | 100 | green |
| Multi-turn manipulation | 2/6 | 33 | red |
| Runaway loops | 4/4 | 100 | green |
| **Total** | **30/44** | **68** | yellow |

68 is what the badge, the gauge number and the gauge arc all show. The arc is
`stroke-dasharray="359 528"`, and 359/527.79 (the circumference at r=84) is 68%. Bands follow
BRAND.md: green 80+, yellow 50-79, red below 50. If you change a category, change the total.

## Motion and interaction

Layered on top so the page still works without any of it. Everything is gated behind an
`html.js` class that only JavaScript adds, and every animation is switched off under
`prefers-reduced-motion: reduce`:

- The hero terminal reveals its lines in sequence, 90ms apart.
- The gauge arc draws and the score counts up to 68 when the report scrolls into view.
- The six category bars grow to their values, 70ms apart.
- A hazard-stripe progress bar tracks scroll position.
- The terminal's command is a button: click to copy `bya run --config agent.yaml`.
- `/` focuses the email field, ignored while you are typing in a field.

Bar widths live in an inline `--w` custom property, not a `width`, so with JavaScript off
CSS still renders each bar at its true value instead of collapsing or filling.

## Responsive

Verified with no horizontal overflow at 320 / 375 / 768 / 1440 px, after scrolling the whole
page so every lazy animation has run. Breakpoints: 1000px (hero and report drop to one column,
grids to 2-up), 640px (grids to 1-up, nav links wrap to a second row, terminal lines wrap).
Links and buttons are at least 44px tall, except the copy-command button at 32px, which is a
convenience duplicate of text you can also select.

Fonts load from Google Fonts (Space Grotesk, JetBrains Mono) with system fallbacks.

## QA record

Audited in Chrome against the live page:

- **Accessibility**: no duplicate ids, one `h1`, no heading-level jumps, every input labelled,
  every link has text, every decorative `svg` is `aria-hidden`. 43 colour and size combinations
  checked for contrast on index and 20 on terms: **zero WCAG AA failures**.
- **Console**: zero errors, zero warnings on a clean load.
- **Degradation**: verified with JavaScript off and with reduced motion on.
- Two honeypot inputs sit at `left:-9999px` and will show up in any naive overflow scan. That
  is intentional; `scrollWidth` equals `clientWidth` at every width.

**Funnel integrity** (the thing Phase 0 is actually judged on):

- Delivery through EmailJS is confirmed: the owner received a real test mail, and an API probe
  using the real service id and public key from an unrelated origin returned
  `400 The template ID not found` rather than an auth or origin error, so EmailJS applies no
  domain restriction to this key.
- That cuts both ways. The key is public and unrestricted and there is no captcha, so anyone can
  post to this EmailJS service from anywhere. Worth setting the allowed origins in the EmailJS
  dashboard once the real domain exists, and watching the monthly send allowance.
- Forms are `action="#" method="post"`. Without that a no-JS submit does a GET and writes the
  address into the URL, history and referrers. A `<noscript>` note says the waitlist needs
  JavaScript instead of letting the submit vanish.
- A duplicate guard keeps the same address (case-insensitive) from being sent twice per browser,
  which would otherwise mean duplicate mail and a wasted send.

Known gaps, each a deliberate choice rather than an oversight:

- **No analytics.** Decided against for now. The consequence is that a week with no signups
  cannot be told apart from a week with no visitors, so there is no conversion rate to tune.
- **No outbound links.** The `GitHub` and `X` links were removed because
  `github.com/breakyouragent/breakyouragent` and `x.com/breakyouragent` both return 404, and
  §9 of the project CLAUDE.md has not settled the org or handle. Put them back once they exist.
- No `favicon.ico` fallback, only `favicon.svg`, which every current browser prefers.
- Print styles cover `terms.html` only, since that is the page people actually print.
