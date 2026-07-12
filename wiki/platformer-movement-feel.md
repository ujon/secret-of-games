---
type: Technique
title: Platformer Movement Feel
description: The Super Mario control recipe — momentum, skid turns, hold-scaled jumps, early-release fast fall, and air control.
tags: [design, platformer, game-feel]
status: draft
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Instant stop-start movement feels robotic; pure physics feels slippery
and uncontrollable. A platformer needs motion that is smooth *and*
precisely steerable — a contradiction raw velocity handling can't solve.

# Technique

Super Mario Bros.' still-canonical recipe:

- **Momentum with gentle deceleration** — releasing the stick coasts to a
  stop instead of freezing.
- **Skid turns** — pressing the opposite direction while running brakes
  hard (with visible skid), making reversals deliberate and readable.
- **Hold-scaled jump height** — tap for a hop, hold for full height.
- **Early-release fast fall** — letting go of jump cuts upward velocity,
  so descent starts immediately.
- **Run-boosted jump distance** — ground speed carries into the arc.
- **Air control** — limited mid-air steering lets players repair mistakes
  after leaving the ground.

# Trade-offs

- Every knob (acceleration, skid friction, release gravity, air-control
  strength) is a feel decision; copying values wholesale copies another
  game's character.
- Generous air control weakens the physicality of jumps — tune per genre.

# See also

- [Jump Physics via Euler Integration](jump-physics-euler.md) - the frame-step math behind hold-scaled jumps.
- [Coyote Time and Jump Buffering](coyote-time-jump-buffering.md) - the timing forgiveness layered on top.
- [Corner Correction](corner-correction.md) - positional forgiveness at geometry edges.

# Citations

1. [슈퍼 마리오의 조작감은 왜 혁신적일까? — 저세상개발자](https://www.youtube.com/shorts/dNsyscOrNMY) - the short this page is drawn from ([source record](registry/sources/yt-short-mario-movement.yaml)).
