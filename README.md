# Tan Lines — melanotanii.com

History and analysis of Melanotan II, told straight. The site covers the
compound's origin in melanoma-prevention research, the gray market that
formed around it, the receptor science that explains it, and the open
question of whether a legitimate photoprotective agonist ever reaches the
general public (the GLP-1 parallel).

No commerce on this domain. No sourcing, dosing, or usage guidance —
framed any way, for any reason. Journalism about the gray market, never a
guide to it.

## Editorial pillars

| Cluster           | Site label         | Story                                                        |
| ----------------- | ------------------ | ----------------------------------------------------------- |
| `history`         | The History        | Origin at U. of Arizona, α-MSH analogs, the original mission |
| `cautionary-tale` | The Cautionary Tale| The gray market, documented harms, regulator warnings        |
| `science`         | The Science        | Melanocortin receptors, why MT-II "did everything"           |
| `culture`         | The Demand         | The reward loop, a century of tanning fashion, the market desire built |
| `next-agonist`    | The Next Agonist   | Afamelanotide, trial economics, the GLP-1-style breakout     |

## Stack

- Astro 7, static output, near-zero client JS (only privacy-friendly Vercel Web Analytics)
- Markdown articles in `src/content/articles/` (schema in `src/content.config.ts`)
- Original inline-SVG scientific figures (site fonts, no JS), embedded per article
- Sitemap + per-article JSON-LD

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Adding an article

```yaml
---
title: "..."
description: "..."        # written for the SERP
pubDate: 2026-08-18
cluster: history           # history | cautionary-tale | science | culture | next-agonist
draft: false
---
```

## Content rules (non-negotiable)

- No sourcing, dosing, or usage guidance for unapproved compounds — ever.
- Harms reported plainly; uncertainty stated, not smoothed over.
- The future-agonist thesis is opinion and is labeled as such in-article.
- Every article should survive a regulator, a dermatologist, and a
  skeptical journalist reading it.

## Deploy

Live at **https://melanotanii.com**, hosted on Vercel (static Astro
output) with auto-deploy on push to `main`. Privacy-friendly Vercel Web
Analytics only; no other client JS.

## Roadmap

- [x] Fill pillars to 4 articles each before launch — now 21 articles across 5 clusters
- [x] Timeline page (1980s Arizona → Scenesse FDA 2019 → today)
- [x] Regulator-warning tracker page (`/regulatory`)
- [x] RSS feed, sitemap, robots.txt
- [x] Branded OG image + favicon/PWA icon pack
- [x] Per-article JSON-LD + SERP-tuned meta descriptions
- [x] Reciprocal cross-links into the network (melanocortin.com)
- [ ] Author byline + credentials block for E-E-A-T (Person schema, `reviewedBy`)
- [ ] Expand thin clusters toward 6 articles as topics warrant
- [ ] Cross-links into the wider network (peptidehormone.com)
