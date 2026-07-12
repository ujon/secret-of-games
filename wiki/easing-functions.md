---
type: Technique
title: Easing Functions
description: Shape motion with curves — smoothstep, smootherstep, bounce, ease-in-out — and ship them as Bézier approximations.
tags: [animation, math, easing]
dimensions: [2d, 3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Linear interpolation moves at constant speed and stops dead — machinery,
not life. Natural motion accelerates and settles; UI and animation need
that curve without hand-animating every transition.

# Technique

Remap animation progress `t ∈ [0,1]` through an easing curve first:

- **Smoothstep** — `3t² − 2t³`, the simplest polynomial with zero
  *velocity* at both ends.
- **Smootherstep** — `6t⁵ − 15t⁴ + 10t³`, also zeroes *acceleration* at
  the ends for an even silkier settle (the same fade Perlin noise uses).
- **Ease-out bounce** — piecewise parabolas mimicking a ball's bounces,
  straight from projectile motion.
- **Ease-in-out cubic** — slow ends, fast middle: dramatic swoops.

In production these are rarely evaluated as formulas: engines and CSS
approximate them with **Bézier curves** — a few control points encode
the whole curve (two points = line, three = quadratic parabola, four =
cubic), which is also how fonts and vector icons store shapes.

# Trade-offs

- Easing eases *position along time*; easing rotations or chained
  cameras naively causes overshoot fights — ease the input parameter,
  not each axis separately.
- Bounce/elastic curves read as playful; overuse turns interfaces into
  jelly.

# See also

- [Camera Smoothing and Deadzone](camera-smoothing-deadzone.md) - easing applied to the camera's pursuit.
- [Inverse Kinematics](inverse-kinematics.md) - procedural poses whose motion these curves drive.
- [Perlin Noise Terrain](perlin-noise-terrain.md) - where smootherstep's quintic came from.

# Citations

1. [게임 애니메이션을 만드는 수학 — 저세상개발자, 2026](https://www.youtube.com/shorts/TomzUe30Ltg) - the easing short this page is drawn from.
2. [벡터파일에서 곡선을 어떻게 저장할까? — 저세상개발자, 2025](https://www.youtube.com/shorts/0MySBqE02fU) - the Bézier-curve short backing the approximation section.
