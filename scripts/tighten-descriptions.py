#!/usr/bin/env python
"""Tighten article meta descriptions to land complete within ~155 chars
(Google SERP truncation window), preserving voice. Rewrites the
`description:` line in each markdown file's frontmatter in place."""
import re, os

NEW = {
"barbie-drug-gray-market": "Melanotan II was never approved anywhere, for anything — yet it sold through forums, gyms, and 'research chemical' sites. What that market is, and what it costs.",
"how-a-suntan-became-desirable": "For most of history, pale skin meant status and a tan meant labor. Then in one decade it flipped. How Chanel, the Riviera, and the sunbed made a tan aspirational.",
"how-a-tan-protects-skin": "A tan is the body's own sunscreen — eumelanin absorbing UV before it reaches DNA. How melanin protects, how little it does, and what Melanotan was reaching for.",
"how-the-science-escaped-the-lab": "Melanotan II's structure was published in journals and patents, then orphaned by its developers. Once the recipe was public, the gray market was inevitable.",
"melanotan-1-vs-melanotan-2": "Two peptides from the same Arizona lab, nearly identical. One became an approved medicine; the other, the gray market's favorite. A lesson in selectivity.",
"middle-ground-agonist-already-exists": "Afamelanotide (Scenesse) is an approved melanocortin drug that shields skin from light. Why it's stuck in a rare-disease label — and what a breakout would take.",
"one-hormone-five-receptors": "MT-II's strange effects — tanning, appetite, libido — aren't mysterious. They're what a non-selective agonist does when it hits the whole melanocortin family.",
"tanorexia-the-opioid-your-skin-makes": "Why is a tan so hard to quit? UV makes your skin manufacture a real opioid. The addiction science — mice, naloxone, frequent tanners — and what it explains.",
"the-accident-inside-melanotan": "The strangest chapter in the Melanotan story: an Arizona self-experiment that produced an eight-hour erection — and pointed to an FDA-approved libido drug.",
"the-beachhead-indications": "GLP-1 reached the masses through diabetes first. A photoprotective melanocortin drug has its own beachheads — and one, vitiligo, is in Phase III right now.",
"the-influencer-era": "Melanotan II didn't go away — it went viral. Nasal sprays, flavored drops, the 'vacation peptide' on TikTok. How social media re-sold an unregulated injectable.",
"the-mole-problem": "Melanotan II darkens and multiplies moles — and the deeper danger is diagnostic. The case reports, the melanoma question, and the signal you can't afford to lose.",
"the-prevention-trial-problem": "A drug that prevents skin cancer in healthy people needs one of the longest, priciest trials in medicine. Why the evidence bar, not the chemistry, is the wall.",
"the-side-effect-ledger": "What Melanotan II reliably does, separated from forum lore: the acute effects, the pigment effects, and the rare serious events that reach the literature.",
"the-tan-without-the-sun": "A suntan is a wound response — pigment made only after UV has damaged DNA. Melanotan's elegant idea: get the pigment without the damage that triggers it.",
"the-three-doors": "Melanotan II is illegal in America — but the technology it previewed isn't. A primer on the U.S. regulatory map: FDA approval, compounding, and the gray market.",
"what-a-safe-tanning-drug-requires": "Not a vial from a forum — a real drug. The four bars a public photoprotective drug must clear, and how close today's science already is. Analysis, labeled so.",
"whats-in-the-vial": "Gray-market Melanotan II is an unregulated injectable from unknown labs, mixed at home. Purity, sterility, dose — all guesses. And guesses have reached the ER.",
"where-melanotan-came-from": "Melanotan II wasn't invented for tanning salons. It came from 1980s melanoma-prevention research at the University of Arizona, where the goal was saving lives.",
"why-a-cosmetic-went-underground": "Maybe the most self-injected drug no regulator ever approved. Not just lax enforcement — it served a want, not a need, and wants don't wait for clinical trials.",
"why-redheads-burn-mc1r": "Red hair, freckles, and burning instead of tanning trace to one receptor: MC1R — the keyhole every Melanotan was cut to fit, and a melanoma risk gene itself.",
}

base = "src/content/articles"
for slug, desc in NEW.items():
    path = os.path.join(base, slug + ".md")
    txt = open(path, encoding="utf-8").read()
    # replace the first description: line inside frontmatter
    new_txt, n = re.subn(
        r'(?m)^description:.*$',
        'description: ' + '"' + desc.replace('"', '\\"') + '"',
        txt, count=1)
    assert n == 1, f"no description line in {slug}"
    open(path, "w", encoding="utf-8", newline="\n").write(new_txt)
    flag = "" if len(desc) <= 158 else "  <-- STILL LONG"
    print(f"{len(desc):3d}  {slug}{flag}")
print("done")
