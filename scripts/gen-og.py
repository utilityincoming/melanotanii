#!/usr/bin/env python
"""Generate branded 1200x630 OG images for every article + a site default.
Matches the Tan Lines design system: paper/ink palette, pigment-scale bar,
Spectral display serif + Archivo sans. Pure static PNGs, no runtime deps."""
import glob, os, re, textwrap
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
PAPER = (251, 250, 247)
INK = (23, 19, 14)
INK_SOFT = (90, 79, 68)
UV = (80, 50, 150)
LINE = (228, 223, 214)
# pigment scale stops (from --pigment-scale in Base.astro)
PIGMENT = [(243,220,200),(228,185,143),(192,138,90),(138,90,52),(85,53,29),(36,26,18)]

FONT_DIR = ".og-fonts"
def font(name, size):
    return ImageFont.truetype(os.path.join(FONT_DIR, name), size)

CLUSTER_LABEL = {
    "history": "The History", "cautionary-tale": "The Cautionary Tale",
    "science": "The Science", "culture": "The Demand",
    "next-agonist": "The Next Agonist",
}
CLUSTER_COLOR = {
    "history": UV, "cautionary-tale": (166,67,31),
    "science": (47,106,82), "culture": INK_SOFT, "next-agonist": UV,
}

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i]-a[i])*t) for i in range(3))

def pigment_bar(draw, y, h=12):
    n = len(PIGMENT) - 1
    for x in range(W):
        seg = (x / W) * n
        i = min(int(seg), n-1)
        draw.line([(x, y), (x, y+h)], fill=lerp(PIGMENT[i], PIGMENT[i+1], seg-i))

def wrap_to_width(draw, text, fnt, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=fnt) <= max_w:
            cur = trial
        else:
            if cur: lines.append(cur)
            cur = w
    if cur: lines.append(cur)
    return lines

def render(title, cluster, out_path, subtitle=None):
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)
    pigment_bar(d, 0, 14)                    # top signature bar
    pad = 80
    # eyebrow (cluster)
    label = CLUSTER_LABEL.get(cluster, "Tan Lines")
    color = CLUSTER_COLOR.get(cluster, UV)
    eb = font("Archivo-Bold.ttf", 26)
    d.text((pad, 70), label.upper(), font=eb, fill=color)
    # title (Spectral SemiBold), auto-size to fit 3-4 lines
    size = 76
    while size > 44:
        tf = font("Spectral-SemiBold.ttf", size)
        lines = wrap_to_width(d, title, tf, W - 2*pad)
        lh = size * 1.12
        if len(lines) * lh <= 300 and len(lines) <= 4:
            break
        size -= 4
    y = 140
    for ln in lines:
        d.text((pad, y), ln, font=tf, fill=INK); y += int(size*1.12)
    # footer: brand + domain
    d.line([(pad, H-96), (W-pad, H-96)], fill=LINE, width=2)
    bf = font("Spectral-SemiBold.ttf", 34)
    d.text((pad, H-74), "Tan Lines", font=bf, fill=INK)
    df = font("Archivo-Bold.ttf", 24)
    tag = subtitle or "The unvarnished history of Melanotan II"
    tw = d.textlength(tag, font=df)
    d.text((W-pad-tw, H-70), tag, font=df, fill=INK_SOFT)
    img.save(out_path, "PNG", optimize=True)
    return out_path

def fm(path):
    txt = open(path, encoding="utf-8").read()
    m = re.search(r'^---\s*(.*?)\s*---', txt, re.S)
    block = m.group(1) if m else ""
    def get(k):
        mm = re.search(rf'^{k}:\s*(.+)$', block, re.M)
        v = mm.group(1).strip().strip('"').strip("'") if mm else ""
        return v
    return get("title"), get("cluster")

os.makedirs("public/og", exist_ok=True)
count = 0
for f in sorted(glob.glob("src/content/articles/*.md")):
    slug = os.path.basename(f)[:-3]
    title, cluster = fm(f)
    render(title, cluster, f"public/og/{slug}.png")
    count += 1
# site default
render("The unvarnished history of Melanotan II", "history",
       "public/og/default.png",
       subtitle="melanotanii.com")
print(f"generated {count} article OG images + 1 default in public/og/")
