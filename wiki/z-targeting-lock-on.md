---
type: Technique
title: Z-Targeting Lock-On
description: One button snaps camera and character to an enemy, remaps movement around the target, and a UI companion teaches the whole system.
tags: [design, camera, combat, classic]
dimensions: [3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Early 3D action (Super Mario 64 era) made *facing an enemy* the hardest
part of combat — stick, camera, and depth perception all fought the
player before any swordplay began.

# Technique

Ocarina of Time's **Z-targeting**, the first built-in "aim assist" and
the template for all lock-on systems since:

- **One-button lock** — Z snaps the camera and character to face the
  nearest enemy; pressing again cycles to the next target.
- **Movement remap** — while locked, forward/back approach and retreat,
  left/right become circle-strafing around the target; the character
  keeps facing the enemy through it all.
- **Teach it with a companion** — the fairy Navi was invented to
  communicate the system: she hovers over the current target, changes
  color by target type, and surfaces contextual information. Radical
  mechanics shipped with a built-in tutor.

# Trade-offs

- Lock-on trades camera *freedom* for combat *clarity*; games with
  ranged verticality (flying enemies) need target-priority rules or the
  cycle order frustrates.
- Auto-facing plus circle-strafe flattens combat to a 1D dance if enemy
  design doesn't break the orbit (gap closers, off-target threats).

# See also

- [Camera Smoothing and Deadzone](camera-smoothing-deadzone.md) - the free-camera rules lock-on temporarily overrides.

# Citations

1. [세계 최초로 에임핵을 도입한 게임 — 저세상개발자, 2025](https://www.youtube.com/shorts/OjbUm_hnYFU) - the short this page is drawn from.
