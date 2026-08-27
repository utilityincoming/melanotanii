"""Regenerate public/og-image.png — 1200x630 Tan Lines social card."""
from __future__ import annotations

import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "og-image.png"
CACHE = Path.home() / "AppData" / "Local" / "Temp" / "tan-lines-fonts"
CACHE.mkdir(parents=True, exist_ok=True)

PAPER = (251, 250, 247)
INK = (23, 19, 14)
INK_SOFT = (90, 79, 68)
UV = (80, 50, 150)
LINE = (228, 223, 214)
PIGMENT = [
    (243, 220, 200),
    (228, 185, 143),
    (192, 138, 90),
    (138, 90, 52),
    (85, 53, 29),
    (36, 26, 18),
]
FONTS = {
    "spectral-semibold": (
        "Spectral-SemiBold.ttf",
        "https://github.com/google/fonts/raw/main/ofl/spectral/Spectral-SemiBold.ttf",
    ),
    "spectral-italic": (
        "Spectral-Italic.ttf",
        "https://github.com/google/fonts/raw/main/ofl/spectral/Spectral-Italic.ttf",
    ),
    "archivo": (
        "Archivo-latin-500.ttf",
        "https://cdn.jsdelivr.net/fontsource/fonts/archivo@5.2.5/latin-500-normal.ttf",
    ),
}


def fetch_font(key: str, size: int) -> ImageFont.FreeTypeFont:
    name, url = FONTS[key]
    dest = CACHE / name
    if not dest.exists() or dest.stat().st_size < 1000:
        req = urllib.request.Request(url, headers={"User-Agent": "tan-lines-og/1"})
        with urllib.request.urlopen(req, timeout=30) as r:
            dest.write_bytes(r.read())
    return ImageFont.truetype(str(dest), size=size)


def rounded_mask(size: tuple[int, int], radius: int) -> Image.Image:
    w, h = size
    m = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle((0, 0, w - 1, h - 1), radius=radius, fill=255)
    return m


def pigment_bar(width: int, height: int) -> Image.Image:
    img = Image.new("RGB", (width, height))
    px = img.load()
    n = len(PIGMENT) - 1
    for x in range(width):
        t = x / max(width - 1, 1) * n
        i = min(int(t), n - 1)
        f = t - i
        c = tuple(int(PIGMENT[i][k] + (PIGMENT[i + 1][k] - PIGMENT[i][k]) * f) for k in range(3))
        for y in range(height):
            px[x, y] = c
    return img


def text_w(draw: ImageDraw.ImageDraw, text: str, font) -> float:
    box = draw.textbbox((0, 0), text, font=font)
    return float(box[2] - box[0])


def draw_spaced(draw: ImageDraw.ImageDraw, text: str, xy, font, fill, tracking: int):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking


def chip(size: int) -> Image.Image:
    grad = pigment_bar(size, size)
    # tan line
    d = ImageDraw.Draw(grad)
    x0 = int(size * 0.58)
    d.rectangle((x0, 0, x0 + int(size * 0.13), size), fill=PAPER)
    d.rectangle((x0 + int(size * 0.20), 0, x0 + int(size * 0.24), size), fill=(*PAPER, ))
    # second pale strip more transparent — bake by blending
    overlay = Image.new("RGB", (size, size), PAPER)
    mask = Image.new("L", (size, size), 0)
    md = ImageDraw.Draw(mask)
    md.rectangle((x0 + int(size * 0.20), 0, x0 + int(size * 0.24), size), fill=90)
    grad = Image.composite(overlay, grad, mask)
    out = Image.new("RGB", (size, size), PAPER)
    out.paste(grad, (0, 0), rounded_mask((size, size), radius=int(size * 0.22)))
    return out


def main() -> None:
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), PAPER)
    img.paste(pigment_bar(W, 8), (0, 0))

    draw = ImageDraw.Draw(img)
    domain = fetch_font("archivo", 22)
    word = fetch_font("spectral-semibold", 92)
    italic = fetch_font("spectral-italic", 36)
    foot = fetch_font("archivo", 20)

    draw_spaced(draw, "MELANOTANII.COM", (72, 78), domain, UV, tracking=4)
    draw.text((72, 168), "Tan Lines", font=word, fill=INK)
    draw.text((72, 292), "The unvarnished history of Melanotan II", font=italic, fill=INK_SOFT)

    c = chip(128)
    img.paste(c, (W - 72 - 128, 56))

    draw.line((72, 518, W - 72, 518), fill=LINE, width=1)
    left = "History and analysis of the melanocortin drug class"
    right = "Not medical advice  ·  No dosing  ·  No sourcing"
    draw.text((72, 548), left, font=foot, fill=INK_SOFT)
    rw = text_w(draw, right, foot)
    draw.text((W - 72 - rw, 548), right, font=foot, fill=INK_SOFT)

    img.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
