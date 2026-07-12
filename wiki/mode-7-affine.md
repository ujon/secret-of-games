---
type: Technique
title: Mode 7 Affine Transforms
description: Fake 3D by affine-transforming a 2D tilemap per scanline — the Super Famicom trick behind Mario Kart's flat "tracks".
tags: [graphics, classic, affine]
status: draft
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

The Super Famicom had no 3D hardware, yet games like Super Mario Kart
and F-Zero needed a driving view with depth, turning, and speed.

# Technique

The console's **Mode 7** applies an **affine transform** to an entire
background tile layer: adding to coordinates translates, multiplying
scales, and matrix terms rotate or shear. Chrono Trigger's clock
animation is the same feature used scenically.

The 3D illusion comes from the display itself: a CRT draws **one
scanline at a time**, and the game changes the scale factor *per
scanline* — lower lines (near) magnified, upper lines (far) shrunk. A
flat, rotated tilemap becomes a receding ground plane.

```text
per scanline y:
  scale = f(y)            # near rows big, far rows small
  screen(x, y) = affine(scale, rotation) · map(x, y)
```

Consequence: every Mario Kart course is *perfectly flat* — hills are
paint, because the "track" is a picture.

# Trade-offs

- Affine-per-scanline gives perspective on one plane only — no hills,
  bridges, or overlaps; sprites must fake all verticality.
- Objects on the plane are sprites scaled by distance, which get blocky
  up close (classic Mode 7 chunkiness).

# See also

- [Billboarding](billboarding.md) - the polygon era's version of flat-things-pretending.
- [Palette-Indexed Graphics](palette-indexed-graphics.md) - the memory scheme the same hardware drew from.

# Citations

1. [3D처럼 눈속임하는 고전 게임의 비밀 — 저세상개발자](https://www.youtube.com/shorts/R06WXFSWYvo) - the short this page is drawn from ([source record](registry/sources/yt-short-mode7.yaml)).
