---
type: Technique
title: Coyote Time and Jump Buffering
description: Forgive jump timing in both directions — accept jumps shortly after leaving a ledge and queue jumps pressed shortly before landing.
tags: [design, platformer, game-feel, input]
dimensions: [2d, 3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Humans press jump a few frames late (after running off the ledge) or a
few frames early (before touching down). Strict timing turns both into
deaths that *feel* like the game's fault — because perceptually, the
player pressed it "on time".

# Technique

- **Coyote time** — for a short window after walking off a ledge (a few
  frames), jump input still works, as if the ground lingered. Named for
  the cartoon coyote hanging in the air before noticing the cliff.
- **Jump buffering** — a jump pressed just before landing isn't
  discarded; it's queued and fires on the exact touchdown frame.
  Fighting games use the same input buffer for combo timing.

Both windows are tiny (~0.05–0.15 s) and invisible — players just report
the controls "feel tight".

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

1. [게임 점프에 숨겨진 판정 타이밍 조절 — 저세상개발자, 2026](https://www.youtube.com/shorts/0gkwRtolL4Y) - the short this page is drawn from.
