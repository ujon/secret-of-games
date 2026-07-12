---
type: Technique
title: Rollback Netcode
description: Play local inputs instantly and let remote clients skip or fast-forward missed frames, instead of delaying everyone until inputs arrive.
tags: [netcode, fighting, multiplayer]
status: draft
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Keeping two online players' screens in sync is easy if every frame waits
for both inputs — **delay-based netcode** — but on a slow network the
whole game turns sluggish and input lag becomes unbearable.

# Technique

**Rollback** plays your input on your own screen immediately. When the
input reaches the opponent late, their client doesn't replay the missed
start of your action — it **skips the early frames (or fast-forwards
them)** so both simulations land on the same present. A few dropped
startup frames are imperceptible when caught up quickly.

Modern games combine both: a small fixed input delay absorbs normal
jitter, and rollback handles what remains.

# Trade-offs

- Rollback requires the game state to be cheaply saved and re-simulated
  several frames at a time — engines not built for it struggle to adopt
  it.
- Large rollbacks become visible as teleports/pops; quality depends on
  keeping them short.

# See also

- [Lag Compensation](lag-compensation.md) - the server-side rewind used by shooters.

# Citations

1. [느린 네트워크 속도를 게임이 보정하는 비법 — 저세상개발자](https://www.youtube.com/shorts/kap1_O66XCY) - the short this page is drawn from ([source record](registry/sources/yt-short-rollback-netcode.yaml)).
