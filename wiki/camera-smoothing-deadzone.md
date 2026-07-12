---
type: Technique
title: Camera Smoothing and Deadzone
description: Let the camera chase the character lazily — asymptotic averaging plus a no-follow deadzone — so motion reads clearly without nausea.
tags: [design, camera, game-feel]
status: draft
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

A camera bolted to the character transmits every twitch: players feel
motion-sick, and paradoxically *lose* the sense of movement because the
character never shifts within the frame.

# Technique

- **Asymptotic averaging (exponential smoothing)** — each tick, move the
  camera a fixed *fraction* of its remaining distance to the target:

  ```text
  camera += (target - camera) * 0.1   # per tick
  ```

  Far away it rushes, close up it feathers in — an ease-out for free.
- **Slower vertical follow** — lag the y-axis more than x, so jumps read
  as the character rising within the frame rather than the world dropping.
- **Deadzone** — define a box around the character in which the camera
  does not move at all; it follows only when the character pushes past
  the edge. Small wiggles stop shaking the world.

# Trade-offs

- Frame-rate dependence: `* 0.1` per *tick* smooths differently at 30
  and 144 fps — make the fraction a function of delta time.
- Too large a deadzone lets fast characters reach the screen edge before
  the camera reacts; pair with look-ahead in the movement direction.

# See also

- [Easing Functions](easing-functions.md) - the curve family this smoothing belongs to.
- [Z-Targeting Lock-On](z-targeting-lock-on.md) - the camera taking over aiming entirely.

# Citations

1. [게임 카메라에 숨겨진 수학 기법 — 저세상개발자](https://www.youtube.com/shorts/caPi9d2gP7I) - the short this page is drawn from ([source record](registry/sources/yt-short-camera-math.yaml)).
