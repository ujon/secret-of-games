---
type: Technique
title: Pity Timers and PRD
description: Bound bad luck — guarantee drops after enough misses, shuffle outcomes in bags, or bend per-try odds with pseudo-random distribution.
tags: [design, probability, gacha]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T08:27:22Z
---

# Problem

Honest independent randomness permits brutal streaks — statistically, a
long run of misses is *supposed* to happen to someone. Those someones
churn, and they're loud about it.

# Technique

Constrain randomness so the worst cases can't occur:

- **Pity timer (ceiling)** — count misses; at the cap, force the top
  reward. The Short illustrates Genshin Impact's guarantee as a gauge
  filling toward a 5-star; the implementation principle is a counter
  toward a defined limit. [1]
- **Shuffle bag** — put every outcome in a bag, draw without
  replacement, refill only when empty. The Short uses Tetris as its
  example. [1] With one copy of each of seven pieces per bag, at most
  12 other pieces can separate two appearances: six at the end of one
  bag plus six at the start of the next.
- **Pseudo-random distribution (PRD)** — start each attempt below the
  advertised rate and *increase* the chance after every miss, resetting
  on success. Dota 2 tunes the increments so the expected tries-to-first-
  success matches the reciprocal of the displayed probability. [1]
  This reduces extreme droughts; it does not eliminate consecutive
  failures or make each attempt independent.

# Trade-offs

- Constrained randomness is *predictable* randomness: players learn to
  count bags and pity, and optimize around them (sometimes that's the
  fun; sometimes it's degenerate).
- PRD's "displayed 25%" is not per-try 25% — when players discover the
  real mechanics, trust depends on whether the system favored them.

# See also

- [Input and Output Randomness](input-output-randomness.md)

- [PRNG Seed Manipulation](prng-seed-manipulation.md) - what happens when players attack the randomness itself.
- [Risk-Reward Design](risk-reward-design.md) - the gambles these systems keep palatable.

# Citations

1. [불운을 관리하는 게임의 확률 조작법 — 저세상개발자, 2026](https://www.youtube.com/shorts/eyrRduWl-qo) - original Korean auto-captions checked on 2026-09-26: pity guarantees (0:04–0:20), shuffle bags (0:21–0:30), and Dota 2's increasing probability and expected waiting time (0:30–1:03).
