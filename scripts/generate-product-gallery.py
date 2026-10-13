from __future__ import annotations

import json
from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter, ImageOps, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "catalog-products.json"
OUT = ROOT / "public" / "Metro_Product_Galleries"

CANVAS_BG = (246, 241, 233)
CANVAS_BG_2 = (235, 226, 214)


def gradient_background(size: tuple[int, int], top=CANVAS_BG, bottom=CANVAS_BG_2) -> Image.Image:
    w, h = size
    bg = Image.new("RGB", size)
    px = bg.load()
    for y in range(h):
        t = y / max(1, h - 1)
        c = tuple(round(top[i] * (1 - t) + bottom[i] * t) for i in range(3))
        for x in range(w):
            px[x, y] = c
    return bg


def enhance(im: Image.Image) -> Image.Image:
    im = im.convert("RGB")
    im = ImageEnhance.Contrast(im).enhance(1.03)
    im = ImageEnhance.Color(im).enhance(1.02)
    im = ImageEnhance.Sharpness(im).enhance(1.12)
    return im


def add_shadow(canvas: Image.Image, box: tuple[int, int, int, int]) -> None:
    x0, y0, x1, y1 = box
    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(shadow)
    ellipse = (x0 + 4, y1 - 32, x1 - 4, y1 + 16)
    d.ellipse(ellipse, fill=(35, 28, 18, 50))
    shadow = shadow.filter(ImageFilter.GaussianBlur(16))
    canvas.alpha_composite(shadow)


def fit_on_canvas(source: Image.Image, size: tuple[int, int], scale=0.9, y_bias=0.0) -> Image.Image:
    w, h = size
    canvas = gradient_background(size).convert("RGBA")
    src = ImageOps.contain(source, (int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    x = (w - src.width) // 2
    y = int((h - src.height) / 2 + h * y_bias)
    add_shadow(canvas, (x + 24, y + 12, x + src.width - 24, y + src.height))
    canvas.alpha_composite(src.convert("RGBA"), (x, y))
    return canvas.convert("RGB")


def crop_center(source: Image.Image, fraction_w: float, fraction_h: float, x_bias=0.0, y_bias=0.0) -> Image.Image:
    w, h = source.size
    cw = max(1, int(w * fraction_w))
    ch = max(1, int(h * fraction_h))
    cx = int(w / 2 + w * x_bias)
    cy = int(h / 2 + h * y_bias)
    left = max(0, min(w - cw, cx - cw // 2))
    top = max(0, min(h - ch, cy - ch // 2))
    return source.crop((left, top, left + cw, top + ch))


def make_variants(source_path: Path, product_id: str) -> list[str]:
    src = Image.open(source_path).convert("RGB")
    src = enhance(src)
    out_dir = OUT / product_id
    out_dir.mkdir(parents=True, exist_ok=True)

    primary = fit_on_canvas(src, (1600, 1200), scale=0.92, y_bias=0.01)
    detail_src = crop_center(src, 0.78, 0.88, y_bias=0.02)
    detail = fit_on_canvas(detail_src, (1600, 1200), scale=0.96, y_bias=0.0)
    wide_src = crop_center(src, 0.96, 0.82, y_bias=0.02)
    wide = fit_on_canvas(wide_src, (1800, 1125), scale=0.96, y_bias=0.0)
    portrait = fit_on_canvas(src, (1200, 1500), scale=0.90, y_bias=0.03)

    variants = [
        ("01-primary.webp", primary, (1600, 1200)),
        ("02-detail.webp", detail, (1600, 1200)),
        ("03-wide.webp", wide, (1800, 1125)),
        ("04-portrait.webp", portrait, (1200, 1500)),
    ]
    for filename, image, _ in variants:
        image.save(out_dir / filename, "WEBP", quality=88, method=6)
    return [f"/Metro_Product_Galleries/{product_id}/{filename}" for filename, _, _ in variants]


def main() -> None:
    products = json.loads(DATA.read_text(encoding="utf-8-sig"))
    generated = 0
    skipped = 0
    for product in products:
        image = product.get("image") or ""
        if not image.startswith("/"):
            skipped += 1
            continue
        source_path = ROOT / "public" / image.lstrip("/")
        if not source_path.exists():
            skipped += 1
            continue
        gallery = make_variants(source_path, product["id"])
        product["originalImage"] = image
        product["images"] = gallery
        product["image"] = gallery[0]
        product["galleryGeneratedFromOriginal"] = True
        generated += 1

    DATA.write_text(json.dumps(products, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Generated galleries for {generated} products; skipped {skipped} remote/missing-image products.")


if __name__ == "__main__":
    main()
