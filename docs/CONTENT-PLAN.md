# Content plan — melanotanii.com

Working brief for expanding Tan Lines / The Record from its launch set (21 articles,
~400–600 words each, 5 clusters) toward deeper, more durable coverage.

**How to use this:** each proposed article below is a commissioning brief,
not a draft. Hand a brief to a council correspondent, get the substantive
copy back, then it gets edited into house voice and shipped through the
normal frontmatter/PR flow (see README "Adding an article").

## Non-negotiables (carry over from README)

- No sourcing, dosing, or usage guidance for unapproved compounds — ever.
- Harms reported plainly; uncertainty stated, not smoothed over.
- The future-agonist thesis is opinion and is labeled as such in-article.
- Every article should survive a regulator, a dermatologist, and a
  skeptical journalist reading it.
- **Do not** stamp `updatedDate` unless the body was genuinely revised with
  new substance. Freshness signals must be real.

## Where coverage stands

| Cluster | Live | Site label | Depth read |
| --- | --- | --- | --- |
| `history` | 5 | The History | Solid origin story; patent/ownership arc now live |
| `cautionary-tale` | 5 | The Cautionary Tale | Strong; enforcement file now live |
| `science` | 6 | The Science | Receptor grounding plus PK; variant-spectrum file now live |
| `culture` | 5 | The Demand | Well-drawn; supply-mechanics file now live |
| `next-agonist` | 6 | The Next Agonist | Deepest cluster; sponsor-economics file now live |

Target: bring each cluster toward 6 substantive articles as topics warrant,
prioritizing genuine gaps over padding.

## Priority 1 — highest editorial value

### `history` — "The two men and the molecule: Hruby, Hadley, and the patent trail"
**Shipped 26 Aug 2026** as `/articles/who-owned-melanotan/` (PR #10).
Covers the licensing of Melanotan I, how Clinuvel ended up with
afamelanotide, and how MT-II's structure entered the public domain.
Do not restamp `updatedDate` unless a filing or assignment materially
changes the ownership story.

### `science` — "Why the same peptide tans, sickens, and arouses: the PK story"
**Shipped 26 Aug 2026** as `/articles/a-drug-with-no-address/` (PR #12).
Pharmacokinetics, lack of receptor selectivity, half-life — why one
injected dose hits every receptor, and why that non-selectivity is
exactly what a real drug would need to fix. Do not restamp
`updatedDate` unless new primary PK literature lands.

### `cautionary-tale` — "What the warnings actually did: a decade of enforcement"
**Shipped 26 Aug 2026** as `/articles/what-the-warnings-actually-did/`.
Pairs with `/regulatory` (TGA lab test 17 Aug 2026; UK DHSC nasal-spray
answer 1 Dec 2025). Do not restamp `updatedDate` unless a new jurisdiction
materially changes the file.

## Priority 2 — rounds out the clusters

### `culture` — "How it's sold now: from forums to DTC and social commerce"
**Shipped 26 Aug 2026** as `/articles/how-its-sold-now/`. The five-layer
supply stack (research-chemical storefronts, hashtag word games, affiliate
salesforce, salon counters, payment camouflage), anchored on LegitScript's
Dec 2025 cross-platform dataset and CHOICE's market reconnaissance.
Journalism about the market, never a buyer's guide. Do not restamp
`updatedDate` unless the market's mechanics materially shift again.

### `next-agonist` — "Who would pay for the trial: the sponsor problem"
**Shipped 26 Aug 2026** as `/articles/who-would-pay-for-the-trial/`.
Clinuvel's rare-disease P&L vs Novo-scale outcomes trials; reimbursement
is where the GLP-1 parallel breaks. Do not restamp unless a sponsor
actually announces a general-public program.

### `science` — "MC1R variants: why the tanning response isn't universal"
**Shipped 26 Aug 2026** as `/articles/mc1r-variants-not-universal/`.
Companion to `why-redheads-burn-mc1r`: R vs r, heterozygotes, geography,
trafficking vs coupling, pharmacogenetic ceiling for a future agonist.

## Priority 3 — freshness & maintenance (ongoing, no new pages)

- **Regulatory tracker upkeep.** `/regulatory` currently maps FDA, EU,
  Australia, Canada, Denmark, Ireland, UK, and carries a "Last reviewed"
  date (added 26 Aug 2026). Refresh the date only when a jurisdiction
  actually changes status. This is where real `updatedDate` freshness
  signals should come from.
- **Timeline extension.** Add entries as afamelanotide indications expand
  and as any MC1R-agonist clinical news lands.
- **Science-article `updatedDate` passes** only when new primary literature
  materially changes a claim — not as a mechanical SEO refresh.

## Publishing checklist (per article)

1. Frontmatter: `title`, SERP-written `description` (≤160 chars), `pubDate`,
   correct `cluster`, `draft: false` when ready.
2. Add `seeAlso` cross-links to melanocortin.com where a receptor-level
   reference exists.
3. Meta description fits the SERP snippet window (verify built output).
4. One original inline-SVG figure where it earns its place (house style —
   site fonts, no JS).
5. Ship on a branch → PR → merge to `main` (Vercel auto-deploys).
