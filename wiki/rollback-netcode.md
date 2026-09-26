---
type: Technique
title: Rollback Netcode
description: Predict missing remote inputs, then restore and re-simulate saved game state when late inputs disagree, keeping local controls responsive.
tags: [design, netcode, fighting, multiplayer]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T08:27:22Z
---

# Problem

Keeping two online players' screens in sync is easy if every frame waits
for both inputs — **delay-based netcode** — but on a slow network the
whole game turns sluggish and input lag becomes unbearable. [1, 2]

# Technique

**Rollback** lets a client advance before every remote input arrives.
The Short illustrates the visible result as the opponent's animation
catching up; prediction and state restoration explain how that result
is computed. [1, 2]

1. Save recent simulation states and each frame's inputs.
2. Apply local input and predict any missing remote input.
3. When the real input arrives, compare it with the prediction.
4. If they differ, restore a state before the mismatch and re-simulate
   every affected frame with corrected inputs, without rendering each
   intermediate frame. Present the corrected current state. [2, 3]

Gameplay frames still execute during correction; early animation frames
may never be displayed. GGPO requires deterministic simulation so that
the same state and inputs produce the same result on each client. [3]

A small configured input delay can absorb some network variation while
rollback handles late inputs beyond that delay. [3]

# Trade-offs

- Rollback requires the game state to be cheaply saved and re-simulated
  several frames at a time — engines not built for it struggle to adopt
  it. [3]
- Large rollbacks become visible as teleports/pops; quality depends on
  keeping them short. [3]

# See also

- [Lag Compensation](lag-compensation.md) - the server-side rewind used by shooters.

# Citations

1. [느린 네트워크 속도를 게임이 보정하는 비법 — 저세상개발자, 2026](https://www.youtube.com/shorts/kap1_O66XCY) - original Korean auto-captions checked on 2026-09-26: delay-based waiting (0:07–0:24), visible animation catch-up (0:24–0:44), and combining delay with rollback (0:46–0:53). GGPO sources supply the prediction and re-simulation mechanics omitted by this visual simplification.
2. [GGPO Rollback Networking SDK — Tony Cannon / GGPO, accessed 2026](https://www.ggpo.net/) - input prediction, deterministic execution, and correcting mismatched predictions.
3. [GGPO Developer Guide — GGPO contributors, accessed 2026](https://github.com/pond3r/ggpo/blob/master/doc/DeveloperGuide.md) - saved-state callbacks, re-simulation without rendering, determinism, input-delay settings, and visible discontinuities.
