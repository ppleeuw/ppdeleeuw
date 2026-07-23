# ppdeleeuw.com — LeeuwOS

Personal website of Peter-Paul de Leeuw, served at **https://ppdeleeuw.com**
via GitHub Pages. The site is a tiny 1980s operating system: boot screen,
menu bar, draggable windows, clickable folders, and one folder you should
definitely not open.

## Stack

None. That's the point.

- `index.html` — the whole OS: desktop, windows, folder contents.
- `assets/style.css` — the look: warm cream, hard shadows, pinstripe title bars.
- `assets/app.js` — the window manager, boot loader, menus, dialogs.
  Vanilla JS, zero dependencies, no build step, no trackers.
- `404.html` — classic bomb dialog for missing pages.
- `CNAME` — custom domain (`ppdeleeuw.com`).
- `.github/workflows/deploy.yml` — deploys to GitHub Pages on every push
  to `main`.

## Develop

Open `index.html` in a browser. That's it. (Or `python3 -m http.server` if
you prefer a URL.)

## Deploy

Merge to `main`. The workflow does the rest.

## DNS (Porkbun)

Apex `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
`185.199.111.153` · `www` `CNAME` → `ppleeuw.github.io`
