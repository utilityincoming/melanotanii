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

| Cluster           | Story                                                        |
| ----------------- | ------------------------------------------------------------ |
| `history`         | Origin at U. of Arizona, α-MSH analogs, the original mission |
| `cautionary-tale` | The gray market, documented harms, regulator warnings        |
| `science`         | Melanocortin receptors, why MT-II "did everything"           |
| `next-agonist`    | Afamelanotide, trial economics, the GLP-1-style breakout     |

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
cluster: history           # history | cautionary-tale | science | next-agonist
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

Static `dist/` — Cloudflare Pages or Netlify free tier, auto-deploy on push
to `main`. Point melanotanii.com DNS at the host when ready.

## Roadmap

- [x] Fill pillars to 4 articles each (16 total) before launch — expand toward 6 as topics warrant
- [x] Timeline page (1980s Arizona → Scenesse FDA 2019 → today)
- [ ] Regulator-warning tracker page (UK, AU, DK, NO, US actions)
- [ ] Author byline + credentials block for E-E-A-T
- [ ] Cross-links into the network (melanocortin.com, peptidehormone.com)
- [ ] RSS feed
