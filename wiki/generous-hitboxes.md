---
type: Technique
title: Generous Hitboxes
description: Bias collision shapes for the player — generous attack boxes, strict-but-delayed enemy boxes, shrunken dodge boxes — and sell hits with hit-stop.
tags: [design, collision, game-feel]
status: draft
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Collision runs on simple shapes (hitboxes), not pixel-perfect bodies —
so judgments and visuals disagree. When a player's clean hit whiffs or a
graze kills them, the game feels rigged.

# Technique

Bias every asymmetry toward the player:

- **Generous player attacks, strict enemy attacks** — the player's
  attack box is larger than the animation; the enemy's is smaller.
  Fighting games tune boxes frame by frame.
- **Delayed enemy activation** — enemy attack boxes switch on a beat
  after the animation starts, so attacks are dodgeable on reaction.
- **Small projectile hurt-zones** — hard-to-read ranged attacks get tiny
  hitboxes; Geometry Dash's player hitbox is famously much smaller than
  the sprite.
- **State-based shrinking** — shrink the player's hurtbox while moving
  and disable it during dodges, creating the "threaded the needle"
  feeling.
- **Hit-stop** — freeze the screen for a few frames on impact so
  landed hits are felt as real.

# Trade-offs

- Asymmetries must stay invisible; players who see the boxes (training
  modes, mods) can find the leniency jarring.
- PvP can't favor "the player" — both are players — so competitive modes
  need honest, symmetric boxes.

# See also

- [Coyote Time and Jump Buffering](coyote-time-jump-buffering.md) - the same forgiveness philosophy applied to timing.
- [Hitscan Shooting](hitscan-shooting.md) - what tests against these boxes in shooters.

# Citations

1. [게이머에게 관대한 게임의 피격 판정 — 저세상개발자](https://www.youtube.com/shorts/hUpx8lUaiDU) - the short this page is drawn from ([source record](registry/sources/yt-short-generous-hitboxes.yaml)).
