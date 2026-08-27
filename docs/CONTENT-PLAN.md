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
| `history` | 4 | The History | Solid origin story; thin on the people/patent arc after the lab |
| `cautionary-tale` | 5 | The Cautionary Tale | Strong; enforcement file now live |
| `science` | 4 | The Science | Good receptor grounding; missing PK/formulation and MC1R-variant depth |
| `culture` | 4 | The Demand | Well-drawn; missing the platform/commerce mechanics (how it's sold today) |
| `next-agonist` | 6 | The Next Agonist | Deepest cluster; sponsor-economics file now live |

Target: bring each cluster toward 6 substantive articles as topics warrant,
prioritizing genuine gaps over padding.

## Priority 1 — highest editorial value

### `history` — "The two men and the molecule: Hruby, Hadley, and the patent trail"
The origin article names Victor Hruby and Mac Hadley but stops at the lab.
The human + IP arc is a genuine hole: who licensed Melanotan I, how
Clinuvel ended up with afamelanotide, and how MT-II's structure entered the
public domain. Anchors E-E-A-T with named, verifiable people and dated
filings. **Council need:** patent/licensing timeline, primary sources.

### `science` — "Why the same peptide tans, sickens, and arouses: the PK story"
The receptor articles explain *which* receptors; this explains *why one
injected dose hits all of them* — pharmacokinetics, lack of receptor
selectivity, half-life, why MT-II's non-selectivity is exactly what a
real drug would need to fix. Bridges cleanly into the next-agonist thesis.
**Council need:** PK data from the original trials, receptor-affinity table.

### `cautionary-tale` — "What the warnings actually did: a decade of enforcement"
**Shipped 26 Aug 2026** as `/articles/what-the-warnings-actually-did/`.
Pairs with `/regulatory` (TGA lab test 17 Aug 2026; UK DHSC nasal-spray
answer 1 Dec 2025). Do not restamp `updatedDate` unless a new jurisdiction
materially changes the file.

## Priority 2 — rounds out the clusters

### `culture` — "How it's sold now: from forums to DTC and social commerce"
The demand cluster covers *why* people wanted it; this covers the *modern
supply mechanics* — the shift from bodybuilding forums to nasal-spray
rebrands, influencer resale, and platform moderation cat-and-mouse.
Journalism about the market, never a buyer's guide. **Council need:**
current-market reconnaissance, platform-policy specifics.

### `next-agonist` — "Who would pay for the trial: the sponsor problem"
**Shipped 26 Aug 2026** as `/articles/who-would-pay-for-the-trial/`.
Clinuvel's rare-disease P&L vs Novo-scale outcomes trials; reimbursement
is where the GLP-1 parallel breaks. Do not restamp unless a sponsor
actually announces a general-public program.

### `science` — "MC1R variants: why the tanning response isn't universal"
`why-redheads-burn-mc1r` covers the redhead case; a companion on the full
spectrum of MC1R variation (and what it implies for who a future drug would
even help) deepens the science cluster and the personalization angle.
**Council need:** MC1R population-genetics summary, variant→phenotype map.

## Priority 3 — freshness & maintenance (ongoing, no new pages)

- **Regulatory tracker upkeep.** `/regulatory` currently maps FDA, EU,
  Australia, Canada, Denmark, Ireland, UK. Add a "last reviewed" date and
  refresh when any jurisdiction changes status. This is where real
  `updatedDate` freshness signals should come from.
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
