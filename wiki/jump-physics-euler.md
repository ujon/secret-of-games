---
type: Technique
title: Jump Physics via Euler Integration
description: Step velocity and position frame by frame with designer-chosen gravity — heavier falling than rising — instead of real projectile motion.
tags: [physics, platformer, math]
status: draft
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Textbook projectile motion is symmetric — identical acceleration up and
down — but that arc plays poorly: floaty falls, and no easy hook for
"hold to jump higher". Games need jump math that's cheap per frame and
bends to design intent.

# Technique

Skip the closed-form parabola and **integrate numerically** each frame:

```text
velocity += gravity * dt    # accumulate acceleration
position += velocity * dt   # then move
```

This is **(semi-implicit) Euler integration** — one addition each for
velocity and position per frame. Because gravity is just a variable, the
designer is free to break physics:

- **Asymmetric gravity** — lighter while rising, heavier while falling
  (Super Mario rises slower than it falls): snappy landings, readable
  arcs.
- **Variable jump height** — cut upward velocity when the button is
  released; hold time maps to height naturally.

# Trade-offs

- Euler steps accumulate error and are frame-rate sensitive — fine for
  jump arcs, but fixed timesteps (or a better integrator) matter once
  physics interacts.
- Tuning raw gravity/velocity numbers is unintuitive; derive them from
  design targets (apex height `h`, time-to-apex `t`): `g = 2h/t²`,
  `v₀ = 2h/t`.

# See also

- [Platformer Movement Feel](platformer-movement-feel.md) - the control design this math serves.
- [Coyote Time and Jump Buffering](coyote-time-jump-buffering.md) - the timing forgiveness around the jump.

# Citations

1. [물리 역학을 무시하는 게임 점프의 수식 — 저세상개발자](https://www.youtube.com/shorts/dluLPk0zjIs) - the short this page is drawn from ([source record](registry/sources/yt-short-jump-euler.yaml)).
