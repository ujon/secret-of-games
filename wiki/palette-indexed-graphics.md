---
type: Technique
title: Palette-Indexed Graphics
description: Store pixels as small palette indices instead of raw color — 4 bits per pixel, swappable palettes, and the source of retro color identity.
tags: [optimization, classic, graphics]
dimensions: [2d]
status: stable
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Raw truecolor is 24 bits per pixel — far beyond what a Super
Famicom-era cartridge and RAM could hold for every sprite and
background.

# Technique

Exploit how few colors sprites actually use:

1. **Index, don't store** — assign each distinct color a small number.
   Mario's sprite uses 13 colors → 4 bits per pixel suffices (16 max).
2. **Palette table** — store the actual colors once, separately; pixels
   reference entries. The Super Famicom stored graphics as up-to-16-value
   indices plus palettes.
3. **Palette swap** — rebind the same pixel data to different palettes
   for enemies' color variants, player 2, status effects — free variety.
4. **Global budgets** — caps on concurrent sprites and palettes kept RAM
   flat, which is why that era's games share such a distinctive,
   coherent color feel.

# Trade-offs

- A hard ceiling on distinct colors per sprite/layer — the constraint
  that *created* pixel-art discipline (dithering, careful ramps).
- Effects that need arbitrary color math (smooth gradients, photo
  textures) simply don't fit; palette cycling substitutes for animation.

# See also

- [Pixel Art Rules](pixel-art-rules.md) - the artistic discipline this constraint bred.
- [Mode 7 Affine Transforms](mode-7-affine.md) - what the same hardware did with those tiles.
- [Blend Modes](blend-modes.md) - the per-pixel color math later hardware unlocked.

# Citations

1. [마른 이미지 용량 쥐어짜기 — 저세상개발자, 2025](https://www.youtube.com/shorts/p0mH7UAwtXQ) - the short this page is drawn from.
