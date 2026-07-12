---
type: Technique
title: Elo Matchmaking
description: Predict win probability from rating gaps and transfer points by surprise, so matchmakers can pair players of equal skill.
tags: [design, matchmaking, online, math]
status: draft
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Online games must find opponents quickly who are close in skill and in
network distance — a stomp is boring for one side and miserable for the
other, but perfect matches take forever to queue.

# Technique

Matchmakers juggle **queue time, region/ping, and a skill score**. The
classic score is the **Elo rating** (from chess; used by early League of
Legends, refined in Rainbow Six):

- The rating *gap* predicts win probability — being +100 predicts ~64%,
  +400 predicts ~91%.
- After the match, points transfer in proportion to the *surprise*: a 75%
  favorite gains little for winning (+5), loses more for a draw (−5) and
  the most for losing (−15).

Modern refinements:

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

1. [게임 상대를 결정하는 매칭 시스템의 원리 — 저세상개발자](https://www.youtube.com/shorts/uMCwH38GpuY) - the short this page is drawn from ([source record](registry/sources/yt-short-elo-matchmaking.yaml)).
