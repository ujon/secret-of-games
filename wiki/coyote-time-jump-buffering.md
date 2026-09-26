---
type: Technique
title: Coyote Time and Jump Buffering
description: Forgive jump timing in both directions — accept jumps shortly after leaving a ledge and queue jumps pressed shortly before landing.
tags: [design, platformer, game-feel, input]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T08:27:21Z
---

# Problem

Humans press jump a few frames late (after running off the ledge) or a
few frames early (before touching down). Strict timing turns both into
deaths that *feel* like the game's fault — because perceptually, the
player pressed it "on time".

# Technique

- **Coyote time** — for a short window after walking off a ledge (a few
  frames), jump input still works, as if the ground lingered. Named for
  the cartoon coyote hanging in the air before noticing the cliff. [1]
- **Jump buffering** — a jump pressed just before landing isn't
  discarded; it's queued and fires on the exact touchdown frame.
  Fighting games use the same input buffer for combo timing. [1]

The short describes brief windows that compensate for small timing errors,
without prescribing a universal duration. [1] Tune each window to the
game's movement and intended precision.

# Trade-offs

- Windows that are too long become floaty double-jump illusions and
  break level challenges built on precise gaps.
- Buffered inputs must be cancelable (e.g. by pressing dodge) or the
  queue itself causes "I didn't press that" moments.

# See also

- [Corner Correction](corner-correction.md) - the positional counterpart to this timing forgiveness.
- [Platformer Movement Feel](platformer-movement-feel.md) - the movement kit these graces polish.
- [Jump Physics via Euler Integration](jump-physics-euler.md) - the jump math underneath.

# Citations

1. [게임 점프에 숨겨진 판정 타이밍 조절 — 저세상개발자, 2026](https://www.youtube.com/shorts/0gkwRtolL4Y) - Korean auto-captions rechecked on 2026-09-26; post-ledge grace, pre-landing input buffering, and the fighting-game analogy. The source gives no numeric duration range.
