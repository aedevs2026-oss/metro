"""
Rebuild public/homepage/*.webp from high-resolution sources (min width for photos).
Run: python scripts/rebuild-homepage-images.py
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "homepage"
WEBP_QUALITY = 88

# (source relative to ROOT, max width px)
ASSETS: dict[str, tuple[str, int]] = {
    "brand/more-than-furniture-better-tomorrow.webp": (
        "public/more-than-furniture-better-tomorrow.webp",
        1400,
    ),
    "showroom/visit-showroom-background.webp": (
        "public/metro-furniture-visit-showroom-background.webp",
        1920,
    ),
    "hero/luxury-living-room-hero.webp": ("public/hero.png", 1920),
    "brand/grand-luxury-living-room.webp": ("public/Gallery/IMG-20260815-WA0018.jpg", 1400),
    "cta/luxury-dining-living-cta.webp": ("public/Gallery/IMG-20260815-WA0023.jpg", 1920),
    "rooms/living-room.webp": ("public/Metro_Product_Images/MTC-101_Alaska_Corner.jpg", 960),
    "rooms/luxury-bedroom.webp": ("public/Gallery/IMG-20260815-WA0030.jpg", 960),
    "rooms/luxury-dining-room.webp": ("public/Gallery/IMG-20260815-WA0023.jpg", 960),
    "rooms/home-decor.webp": ("public/Lights_Products/LL-D5463.jpg", 960),
    "rooms/modern-home-office.webp": ("public/Gallery/IMG-20260815-WA0038.jpg", 960),
    "collections/modern-blue-sofa.webp": ("public/Metro_Product_Images/MTC-101_Alaska_Corner.jpg", 800),
    "collections/premium-brown-leather-sofa.webp": (
        "public/Metro_Product_Images/MTC-102_Dollar_Corner.jpg",
        800,
    ),
    "collections/luxury-dining-collection.webp": ("public/Gallery/IMG-20260815-WA0023.jpg", 800),
    "collections/luxury-bed-mattress.webp": ("public/Gallery/IMG-20260815-WA0030.jpg", 800),
    "showroom/luxury-showroom-interior.webp": ("public/Gallery/IMG-20260815-WA0038.jpg", 1200),
    "showroom/dharmapuri-showroom-exterior.webp": ("public/Gallery/IMG-20260815-WA0039.jpg", 1200),
}


def resize_to_width(im: Image.Image, max_w: int) -> Image.Image:
    w, h = im.size
    if w <= max_w:
        return im
    new_h = int(h * (max_w / w))
    return im.resize((max_w, new_h), Image.Resampling.LANCZOS)


def main() -> None:
    for rel_out, (rel_src, max_w) in ASSETS.items():
        src = ROOT / rel_src
        dest = OUT / rel_out
        if not src.is_file():
            print(f"SKIP missing source: {rel_src}")
            continue
        dest.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(src) as im:
            im = im.convert("RGB")
            im = resize_to_width(im, max_w)
            im.save(dest, "WEBP", quality=WEBP_QUALITY, method=6)
        print(f"OK {rel_out} -> {im.size[0]}x{im.size[1]} from {rel_src}")


if __name__ == "__main__":
    main()
