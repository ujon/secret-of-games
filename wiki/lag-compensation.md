---
type: Technique
title: Lag Compensation
description: Judge shots against slightly rewound target positions so players can aim at what they actually see despite network delay.
tags: [design, netcode, fps, multiplayer]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T08:30:11Z
---

# Problem

An opponent's movement reaches you late — their input goes to the server,
then to you — so what you see lags their true position. If the server
judged your shot against the *current* state, hits on a moving target
would be ruled misses even when your aim was perfect on screen. Players
would have to aim where enemies are *going to be*.

# Technique

The server keeps a short position history. When a shot arrives, it
**judges the target at the estimated time represented by the shooter's
view**. The player can then aim at the displayed target instead of leading
it solely to compensate for network delay. [1]

The time estimate must also account for **client view interpolation**:
the client may display a buffered blend between received snapshots.
Valve's Source SDK combines network latency with this interpolation delay,
checks the command's timestamp against that estimate, and caps the allowed
correction. Subtracting network latency alone misses the extra rendering
delay. [2]

# Trade-offs

- **"Shot behind cover"** — a victim who just ducked can still be hit by
  a shot fired at their past, exposed position. This favors the shooter's
  view at the expense of the victim's more recent view. [1]
- Rewind windows must be capped, or high-ping players gain an unfair
  ability to hit far into the past. Source exposes this bound as
  `sv_maxunlag`. [2]

# See also

- [Rollback Netcode](rollback-netcode.md) - the client-side sibling: predict now, reconcile later.
- [Hitscan Shooting](hitscan-shooting.md) - the instant-ray judgment this usually protects.

# Citations

1. [시간을 되감는 FPS 게임의 사격 판정 — 저세상개발자, 2026](https://www.youtube.com/shorts/o7waSG4jROw) - the short this page is drawn from.
2. [Source SDK 2013: player_lagcompensation.cpp — Valve, accessed 2026](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/server/player_lagcompensation.cpp) - StartLagCompensation includes network latency, view interpolation, command-time validation, and the sv_maxunlag cap.
