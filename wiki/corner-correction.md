---
type: Technique
title: Corner Correction
description: Nudge characters around geometry corners they barely clip so jumps and dashes succeed instead of bonking.
tags: [design, platformer, collision, game-feel]
status: draft
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Pixel-perfect collisions punish near misses: a jump that grazes a ceiling
corner stops dead, a dash that clips a ledge edge whiffs. The player did
the right thing "within a pixel or two" and the game says no.

# Technique

When a moving character overlaps a corner by a small margin, **shift them
sideways (or up) just enough to clear it** and let the motion continue:

- Jump grazing a ceiling corner → nudge horizontally, jump proceeds.
- Dash hitting a ledge lip → pop up onto the platform.

Sibling leniencies from the same family:

- **Early wall-jump** — register the wall jump slightly before the wall
  is touched.
- **Momentum grace** — jumping right after a moving platform stops still
  inherits its last velocity for extra distance.

Super Mario has corner correction; speedrunners exploit it for faster
routes.

# Trade-offs

- Overdone corrections feel like the game is playing itself, and they
  create speed tech (may be a feature or a bug depending on your goals).
- Corrections must respect solid walls — only clear *grazes*, never
  tunnel through geometry.

# See also

- [Coyote Time and Jump Buffering](coyote-time-jump-buffering.md) - timing forgiveness to this page's positional forgiveness.
- [Platformer Movement Feel](platformer-movement-feel.md) - the movement base these leniencies polish.

# Citations

1. [플랫폼 게임 맵 모서리에 있는 점프 위치 보정 — 저세상개발자](https://www.youtube.com/shorts/hjVLIojpwVk) - the short this page is drawn from ([source record](registry/sources/yt-short-corner-correction.yaml)).
