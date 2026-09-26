---
type: Technique
title: Platformer Movement Feel
description: The Super Mario control recipe — momentum, skid turns, hold-scaled jumps, earlier descent after release, and air control.
tags: [design, platformer, game-feel]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T08:27:22Z
---

# Problem

Instant stop-start movement feels robotic; pure physics feels slippery
and uncontrollable. A platformer needs motion that is smooth *and*
precisely steerable — a contradiction raw velocity handling can't solve.

# Technique

The source Short highlights these Super Mario movement choices. [1]

- **Momentum with gentle deceleration** — releasing the stick coasts to a
  stop instead of freezing.
- **Skid turns** — pressing the opposite direction while running brakes
  hard (with visible skid), making reversals deliberate and readable.
- **Hold-scaled jump height** — tap for a hop, hold for full height.
- **Earlier descent after release** — letting go shortens the upward
  phase. In the original Super Mario Bros., release switches to the
  falling acceleration once the minimum-rise condition is met; it does
  not instantly reverse vertical velocity. [2]
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

1. [슈퍼 마리오의 조작감은 왜 혁신적일까? — 저세상개발자, 2026](https://www.youtube.com/shorts/dNsyscOrNMY) - original Korean auto-captions checked on 2026-09-26: ground acceleration and braking (0:00–0:13), variable jump height and release (0:13–0:26), and running jumps and air control (0:26–0:38).
2. [A Comprehensive Super Mario Bros. Disassembly — doppelganger, mirrored by 1wErt3r, accessed 2026](https://gist.github.com/1wErt3r/4048722) - `JumpSwimSub` tests the held jump button and `DiffToHaltJump`, then selects `VerticalForceDown`; primary reverse-engineering evidence for acceleration rather than instantaneous downward velocity.
