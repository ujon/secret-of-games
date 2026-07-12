---
type: Technique
title: Lag Compensation
description: Judge shots against slightly rewound target positions so players can aim at what they actually see despite network delay.
tags: [netcode, fps, multiplayer]
dimensions: [2d, 3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

An opponent's movement reaches you late — their input goes to the server,
then to you — so what you see lags their true position. If the server
judged your shot against the *current* state, hits on a moving target
would be ruled misses even when your aim was perfect on screen. Players
would have to aim where enemies are *going to be*.

# Technique

The server keeps a short history of everyone's positions. When a shot
arrives, it **rewinds the target to where the shooter saw them** (current
time minus the shooter's latency) and judges the hit there. Aiming at
what's on screen is then enough.

# Trade-offs

- **"Shot behind cover"** — a victim who just ducked can still be hit by
  a shot fired at their past, exposed position. Players tolerate this
  more than its opposite (clean hits that miss), which is why the trade
  is accepted industry-wide.
- Rewind windows must be capped, or high-ping players gain an unfair
  ability to hit far into the past.

# See also

- [Rollback Netcode](rollback-netcode.md) - the client-side sibling: predict now, reconcile later.
- [Hitscan Shooting](hitscan-shooting.md) - the instant-ray judgment this usually protects.

# Citations

1. [시간을 되감는 FPS 게임의 사격 판정 — 저세상개발자, 2026](https://www.youtube.com/shorts/o7waSG4jROw) - the short this page is drawn from.
