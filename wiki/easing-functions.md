---
type: Technique
title: Easing Functions
description: Remap animation progress with timing curves, using formulas or authored Bézier curves to shape acceleration and settling.
tags: [graphics, animation, math, easing]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T08:27:21Z
---

# Problem

Linear interpolation moves at constant speed and stops dead — machinery,
not life. Natural motion accelerates and settles; UI and animation need
that curve without hand-animating every transition.

# Technique

Remap animation progress `t ∈ [0,1]` through an easing curve first: [1]

- **Smoothstep** — `3t² − 2t³`, the simplest polynomial with zero
  *velocity* at both ends.
- **Smootherstep** — `6t⁵ − 15t⁴ + 10t³`, also zeroes *acceleration* at
  the ends for an even silkier settle (the same fade Perlin noise uses).
- **Ease-out bounce** — piecewise parabolas mimicking a ball's bounces,
  straight from projectile motion.
- **Ease-in-out cubic** — slow ends, fast middle: dramatic swoops.

**Bézier curves** provide another way to author timing: the easing short
describes using them to approximate an easing function rather than
evaluating that function directly. [1] A few control points encode a curve
(two points = line, three = quadratic, four = cubic); fonts and vector
icons also use this representation. [2] CSS supports cubic Bézier easing
alongside linear and step functions, so Bézier approximation is an option,
not a universal implementation rule. [3]

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

1. [게임 애니메이션을 만드는 수학 — 저세상개발자, 2026](https://www.youtube.com/shorts/TomzUe30Ltg) - Korean auto-captions rechecked on 2026-09-26; easing behavior, endpoint derivatives, and the use of Bézier approximations.
2. [벡터파일에서 곡선을 어떻게 저장할까? — 저세상개발자, 2025](https://www.youtube.com/shorts/0MySBqE02fU) - Korean auto-captions rechecked on 2026-09-26; control-point counts and uses in fonts, vector graphics, and animation.
3. [CSS Easing Functions Level 1 — W3C CSS Working Group, 2023](https://www.w3.org/TR/css-easing-1/) - the specification defines linear, cubic Bézier, and step easing functions.
