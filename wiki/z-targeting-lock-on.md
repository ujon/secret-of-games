---
type: Technique
title: Z-Targeting Lock-On
description: One button snaps camera and character to an enemy, remaps movement around the target, and a UI companion teaches the whole system.
tags: [design, camera, combat, classic]
dimensions: [3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T08:27:22Z
---

# Problem

Early 3D action (Super Mario 64 era) made *facing an enemy* the hardest
part of combat — stick, camera, and depth perception all fought the
player before any swordplay began.

# Technique

Ocarina of Time's **Z-targeting** combines camera control, facing, and
target-relative movement to make 3D combat easier to read. [1, 2]

- **One-button lock** — Z focuses the camera and character on a selected
  target so attacks can be directed toward it. [1, 2]
- **Movement remap** — while locked, forward/back approach and retreat,
  left/right become circle-strafing around the target; the character
  keeps facing the enemy through it all. [1, 2]
- **Teach it with a companion** — the fairy Navi was invented to
  communicate the system: she hovers over the current target, changes
  color by target type, and surfaces contextual information. Radical
  mechanics shipped with a built-in tutor. [1, 3]

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
2. [Iwata Asks: Ocarina of Time 3D — A Sword & Sorcery Tale Admired Worldwide — Nintendo, 2011](https://www.nintendo.com/en-gb/Iwata-Asks/Iwata-Asks-The-Legend-of-Zelda-Ocarina-of-Time-3D/Vol-5-Mr-Shigeru-Miyamoto/5-A-Sword-Sorcery-Tale-Admired-Worldwide/5-A-Sword-Sorcery-Tale-Admired-Worldwide-224778.html) - developers explain locking the viewpoint and moving in an arc relative to the opponent; this supports the mechanism, not a claim of first-ever aim assistance.
3. [Iwata Asks: Ocarina of Time 3D — Original Development Staff, Part 1, Page 4 — Nintendo, 2011](https://iwataasks.nintendo.com/interviews/3ds/zelda-ocarina-of-time/1/3/) - Koizumi explains turning the target marker into a fairy and naming the Fairy Navigation System Navi.
