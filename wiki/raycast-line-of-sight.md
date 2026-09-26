---
type: Technique
title: Raycast Line of Sight
description: Answer "can it see me?" by shooting rays — filtered by distance and view cone first — and reuse the same probe for rendering and level logic.
tags: [ai, raycasting, visibility]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T08:27:22Z
---

# Problem

Stealth and combat AI need a fair, physical answer to "does the monster
see the player?" — hiding behind a crate must actually work. Testing
sight against every object for every agent every frame is too expensive.

# Technique

Cast a **ray** from the observer toward the target: if it arrives without
hitting an obstacle, the target is visible. Fan many rays out to
visualize the whole field of view. [1, 2, 3, 4]

The source Short filters candidates before casting to keep it cheap. [1]

1. **Distance cull** — ignore targets beyond sight range.
2. **View-cone cull** — ignore targets outside the vision angle.
3. **Raycast the survivors** only.

The same primitive stretches surprisingly far:

- **Pseudo-3D rendering** — Wolfenstein 3D casts rays across a grid map
  and projects wall hits into screen columns. [1, 5] Doom's renderer
  instead traverses a binary space partition of the level; it is not
  the same per-column grid-raycasting algorithm. [6]
- **Level logic** — Zelda TotK's Ascend probes rays upward from the
  player, records where they hit ceiling, and allows the warp only if the
  surface slope is gentle enough. [1]

# Trade-offs

- One ray to center-mass gives binary, twitchy results — production
  vision checks cast several rays (head/torso/limbs) and add memory or
  awareness meters on top.
- Immediate ray queries do work when called; stagger frequent AI checks
  or use an engine's batching facilities when many agents need them.
  Godot's RayCast3D instead caches its result between physics frames
  unless explicitly updated. [2, 3, 4]

# See also

- [Dot Products for Direction Tests](dot-product-tests.md)

- [A* Pathfinding](astar-pathfinding.md) - what the AI does after the ray says "seen".
- [Camera Collision and Obstacle Avoidance](camera-collision-avoidance.md) - widening a sightline ray into a camera-sized collision sweep.
- [Hitscan Shooting](hitscan-shooting.md) - the same instant ray, repurposed as a bullet.
- [Occluder Reveal Effects](occluder-reveal-effects.md) - using camera-to-subject hits to change only the blocking renderers.
- [Spatial Audio Physics](spatial-audio-physics.md) - the same probe asking whether a sound is blocked.

# Citations

1. [선을 쏘아 알아내는 게임의 시야 계산법 — 저세상개발자, 2026](https://www.youtube.com/shorts/PRwkpITfW-s) - the short this page is drawn from.
2. [Unity — Physics.Raycast](https://docs.unity3d.com/ScriptReference/Physics.Raycast.html) - engine raycast API.
3. [Unreal — Traces with Raycasts](https://dev.epicgames.com/documentation/en-us/unreal-engine/traces-with-raycasts-in-unreal-engine) - engine trace API.
4. [Godot — RayCast3D](https://docs.godotengine.org/en/stable/classes/class_raycast3d.html) - engine raycast node.
5. [Wolfenstein 3D: WL_DRAW.C — id Software, source release, accessed 2026](https://github.com/id-Software/wolf3d/blob/master/WOLFSRC/WL_DRAW.C) - original wall-rendering code and per-column wall projection.
6. [Doom: r_main.c — id Software, source release, accessed 2026](https://github.com/id-Software/DOOM/blob/master/linuxdoom-1.10/r_main.c) - `R_RenderPlayerView` uses `R_RenderBSPNode`, distinguishing Doom's rendering traversal from Wolfenstein's grid raycasting.
