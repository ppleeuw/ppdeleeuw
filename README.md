# ppdeleeuw

Personal website of Peter-Paul de Leeuw, served at **https://ppdeleeuw.com** via
GitHub Pages.

## How it works

- Static site (plain HTML/CSS) served from the repository root.
- `index.html` — the site (currently a placeholder; full build coming).
- `CNAME` — tells GitHub Pages the custom domain is `ppdeleeuw.com`.
- `.github/workflows/deploy.yml` — deploys the site to GitHub Pages on every
  push to `main`.

## Going live (one-time setup)

1. **Merge this content into `main`** (Pages deploys from `main`).
2. **Enable GitHub Pages**: repo **Settings → Pages → Build and deployment →
   Source: GitHub Actions**. The deploy workflow then runs automatically.
3. **Set the custom domain**: Settings → Pages → Custom domain →
   `ppdeleeuw.com` (the `CNAME` file already sets this). Leave
   **Enforce HTTPS** enabled once the certificate is issued.
4. **Configure Porkbun DNS** (see below).

## Porkbun DNS records

In the Porkbun dashboard for `ppdeleeuw.com`, open **Details → DNS Records** and
add:

### Apex domain (ppdeleeuw.com) — A records
| Type | Host (leave blank / `@`) | Answer          |
|------|--------------------------|-----------------|
| A    | (blank)                  | 185.199.108.153 |
| A    | (blank)                  | 185.199.109.153 |
| A    | (blank)                  | 185.199.110.153 |
| A    | (blank)                  | 185.199.111.153 |

### Apex domain — AAAA records (IPv6, recommended)
| Type | Host (blank / `@`) | Answer                |
|------|--------------------|-----------------------|
| AAAA | (blank)            | 2606:50c0:8000::153   |
| AAAA | (blank)            | 2606:50c0:8001::153   |
| AAAA | (blank)            | 2606:50c0:8002::153   |
| AAAA | (blank)            | 2606:50c0:8003::153   |

### www subdomain — CNAME
| Type  | Host  | Answer               |
|-------|-------|----------------------|
| CNAME | `www` | `ppleeuw.github.io.` |

Delete any default Porkbun parking/ALIAS records for the apex and `www` first,
so they don't conflict. DNS can take up to ~24h to propagate (usually much
faster). GitHub then issues a free TLS certificate automatically.
