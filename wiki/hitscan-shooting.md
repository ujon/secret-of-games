---
type: Technique
title: Hitscan Shooting
description: Judge shots with an instant ray instead of a simulated bullet — and fire that ray from the camera, not the muzzle, with a muzzle-blocked check.
tags: [design, fps, hitscan]
dimensions: [3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Simulating every bullet (speed, travel, drop) is costly and makes close
combat feel mushy. And wherever the shot originates, geometry disagrees
with the player's eye: a muzzle-origin ray diverges from the crosshair —
worst at close range — so perfectly centered shots can miss.

# Technique

- **Hitscan** — skip the projectile: trace an instant ray along the aim
  and apply the hit immediately. Fast and simple; standard in Rainbow
  Six, Overwatch, and most precision shooters.
- **Camera-origin ray** — fire the judgment ray from the camera so hits
  land exactly on the crosshair, which is what players expect.
- **Muzzle-blocked check** — camera-origin creates the **head glitch**:
  behind low cover the camera can see (and kill) while the shooter's gun
  and body stay unhittable. Fix: judge from the camera, but *fail the
  shot if the muzzle's path is blocked*.

# Trade-offs

- Hitscan can't express travel-time gameplay (dodging arrows, leading
  targets); games mix hitscan and projectile weapons deliberately.
- Instant rays plus network delay still need
  [lag compensation](lag-compensation.md) to feel fair.

# See also

- [Raycast Line of Sight](raycast-line-of-sight.md) - the same ray primitive used for perception.
- [Lag Compensation](lag-compensation.md) - making instant hits fair online.
- [Generous Hitboxes](generous-hitboxes.md) - shaping what the ray is allowed to hit.

# Citations

1. [눈에서 총알이 튀어나오는 FPS 게임의 사격 판정 — 저세상개발자, 2026](https://www.youtube.com/shorts/kucqGt8Q2a8) - the short this page is drawn from.
