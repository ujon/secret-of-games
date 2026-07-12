---
type: Technique
title: Blend Modes
description: Compose effects with color arithmetic — add for light and glow, multiply for shadow and tint, screen and alpha for the rest.
tags: [graphics, shaders, blending]
dimensions: [2d, 3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Effects like fire, magic, and shadows must layer over arbitrary
backgrounds. Ordinary transparency (alpha blending) just averages toward
the effect's color — it can't make light *glow* or shade *darken* the
scene beneath.

# Technique

Treat color channels as numbers (black = 0, white = 1) and pick the
arithmetic per effect:

- **Additive** — `result = base + effect`. Only brightens, like light;
  the backdrop shines through. The default for glows, lasers, fire, and
  particles.
- **Multiply** — `result = base × effect`. Only darkens, like mixing
  pigment; the darker the effect texture, the darker the result. The
  default for shadows, dirt, and tint maps.
- **Screen / alpha / others** — screen is multiply's brightening mirror
  (`1 − (1−a)(1−b)`); alpha interpolates; engines expose a menu of modes
  per material or layer.

# Trade-offs

- Additive washes out on bright backgrounds (a glow over white is
  invisible); multiply disappears on dark ones — art direction must
  guarantee the contrast each mode needs.
- Additive particles overdraw-stack into pure white "bloom soup" —
  budget particle counts or tone-map.

# See also

- [Billboarding](billboarding.md) - the camera-facing quads these modes usually composite.
- [Palette-Indexed Graphics](palette-indexed-graphics.md) - the era before per-pixel color math.

# Citations

1. [게임 이펙트를 만드는 신기한 색상 계산 — 저세상개발자, 2026](https://www.youtube.com/shorts/Of9pFtvVBJQ) - the short this page is drawn from.
