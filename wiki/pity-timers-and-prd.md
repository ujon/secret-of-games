---
type: Technique
title: Pity Timers and PRD
description: Bound bad luck — guarantee drops after enough misses, shuffle outcomes in bags, or bend per-try odds with pseudo-random distribution.
tags: [design, probability, gacha]
dimensions: [2d, 3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Honest independent randomness permits brutal streaks — statistically, a
long run of misses is *supposed* to happen to someone. Those someones
churn, and they're loud about it.

# Technique

Constrain randomness so the worst cases can't occur:

- **Pity timer (ceiling)** — count misses; at the cap, force the top
  reward. Genshin Impact's gacha fills a hidden gauge per miss and
  guarantees a 5-star when full.
- **Shuffle bag** — put every outcome in a bag, draw without
  replacement, refill only when empty. Tetris deals pieces in 7-bags, so
  no piece can drought longer than ~12 draws.
- **Pseudo-random distribution (PRD)** — start each attempt below the
  advertised rate and *increase* the chance after every miss, resetting
  on success. Dota 2 tunes the increments so the expected tries-to-first-
  success matches the displayed probability — same average, no streaks.

# Trade-offs

- Constrained randomness is *predictable* randomness: players learn to
  count bags and pity, and optimize around them (sometimes that's the
  fun; sometimes it's degenerate).
- PRD's "displayed 25%" is not per-try 25% — when players discover the
  real mechanics, trust depends on whether the system favored them.

# See also

- [PRNG Seed Manipulation](prng-seed-manipulation.md) - what happens when players attack the randomness itself.
- [Risk-Reward Design](risk-reward-design.md) - the gambles these systems keep palatable.

# Citations

1. [불운을 관리하는 게임의 확률 조작법 — 저세상개발자, 2026](https://www.youtube.com/shorts/eyrRduWl-qo) - the short this page is drawn from.
