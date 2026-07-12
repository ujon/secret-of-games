---
type: Technique
title: Risk-Reward Design
description: Pair a safe small-reward option with a dangerous big-reward one so players volunteer for risk and feel the thrill of the gamble.
tags: [design, mechanics, psychology]
status: draft
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Choices with one obviously correct answer aren't choices; safety with no
upside is boring, and forced danger feels unfair. Games need a structure
that makes players *choose* danger and enjoy it.

# Technique

Offer both at once: **safe but small** versus **risky but rich** — and
make the risk legible so the gamble is informed:

- *Super Mario* — stomping an enemy risks the touch-damage window but
  clears the path and pays points; fleeing is always available.
- *Pac-Man* — the power pellet flips ghosts into prey, but the effect
  expires and can turn greed into death.
- *Bloodborne* (rally) — attacking right after taking damage recovers
  lost health, but getting hit during the attempt loses more.

The pattern generalizes: optional elite routes, greed-based loot rooms,
overcharge mechanics, banking-vs-carrying scores.

# Trade-offs

- If expected value clearly favors one side, the choice collapses —
  keep the options genuinely tense.
- Stacking risk mechanics onto punishing base difficulty reads as cruelty
  rather than thrill; the safe path must be honestly viable.

# See also

- [Pity Timers and PRD](pity-timers-and-prd.md) - bounding the downside when the gamble is randomized.
- [Dynamic Difficulty Adjustment](dynamic-difficulty-adjustment.md) - retuning challenge when players refuse (or abuse) risk.

# Citations

1. [게임의 쾌감을 주는 위험 대 보상 설계 — 저세상개발자](https://www.youtube.com/shorts/SauTVeoo6K0) - the short this page is drawn from ([source record](registry/sources/yt-short-risk-reward.yaml)).
