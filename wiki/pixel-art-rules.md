---
type: Technique
title: Pixel Art Rules
description: The craft rules of low-resolution art — no double pixels or jaggies, sub-pixel animation, selective outlines, and dithering.
tags: [graphics, pixel-art, classic]
status: draft
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Old hardware offered tiny resolutions and small palettes. Drawing
"normally" at that scale produces lumpy lines, banded shading, and jerky
motion — beauty required rules, not just talent.

# Technique

- **No double pixels** — line segments that clump two-thick read as
  smudges; keep strokes one pixel wide.
- **No jaggies** — a line's stair-steps must shrink or grow at a
  consistent rate; irregular steps look broken.
- **Sub-pixel animation** — for motion smaller than a pixel, shift the
  *colors within* the sprite instead of the sprite itself (Metal Slug's
  famously smooth animation).
- **Selective outlines** — outline in dark hues chosen by lighting
  direction rather than uniform black.
- **Dithering** — interleave two colors in a pattern to fake a gradient
  within a limited palette.

# Trade-offs

- These rules exist *for* low resolution; at high resolutions or with
  rotation/scaling (which destroys pixel alignment) they fight you.
- Dithering shimmers under motion and modern smooth upscaling — many
  "HD" pixel games drop it or lock the camera to the pixel grid.

# See also

- [Palette-Indexed Graphics](palette-indexed-graphics.md) - the hardware constraint these rules grew around.

# Citations

1. [게임 속 픽셀 아트에 숨겨져 있는 규칙들 — 저세상개발자](https://www.youtube.com/shorts/Ce5YdbY4upM) - the short this page is drawn from ([source record](registry/sources/yt-short-pixel-art-rules.yaml)).
