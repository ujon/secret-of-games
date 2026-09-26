---
type: Technique
title: Elo Matchmaking
description: Predict win probability from rating gaps and transfer points by surprise, so matchmakers can pair players of equal skill.
tags: [design, matchmaking, online, math]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T08:27:21Z
---

# Problem

Online games must find opponents quickly who are close in skill and in
network distance — a stomp is boring for one side and miserable for the
other, but perfect matches take forever to queue.

# Technique

Matchmakers juggle **queue time, region/ping, and a skill score**. The
classic score is the **Elo rating** (from chess; used by early League of
Legends, refined in Rainbow Six): [1]

- The rating *gap* predicts win probability — being +100 predicts ~64%,
  +400 predicts ~91%. [1]
- After the match, points transfer in proportion to the *surprise*. In the
  short's illustrative case, a 75% favorite gains 5 points for winning,
  loses 5 for a draw, and loses 15 for a defeat; these are example updates,
  not fixed Elo point changes. [1]

The short also describes refinements used in some matchmaking systems: [1]

- Formulas are kept secret to resist manipulation.
- **Uncertainty scaling** — new/erratic players' ratings move fast;
  established ones barely drop on a loss.
- **Squads** are rated near their strongest member (practiced teamwork
  raises effective skill) and preferentially matched against other
  squads.

# Trade-offs

- Elo assumes 1v1 zero-sum results; team games bolt on approximations
  that can misattribute individual skill.
- Optimizing engagement instead of fairness (win-rate curve shaping) is a
  short step away and players resent it when discovered.

# See also

- [Dynamic Difficulty Adjustment](dynamic-difficulty-adjustment.md) - the single-player cousin: tuning challenge to the player.

# Citations

1. [게임 상대를 결정하는 매칭 시스템의 원리 — 저세상개발자, 2026](https://www.youtube.com/shorts/uMCwH38GpuY) - Korean auto-captions rechecked on 2026-09-26; rating-gap probabilities, conditional point-update examples, uncertainty, and squad matching.
