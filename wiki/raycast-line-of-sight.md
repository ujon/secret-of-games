---
type: Technique
title: Raycast Line of Sight
description: Answer "can it see me?" by shooting rays — filtered by distance and view cone first — and reuse the same probe for rendering and level logic.
tags: [ai, raycasting, visibility]
status: draft
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Stealth and combat AI need a fair, physical answer to "does the monster
see the player?" — hiding behind a crate must actually work. Testing
sight against every object for every agent every frame is too expensive.

# Technique

Cast a **ray** from the observer toward the target: if it arrives without
hitting an obstacle, the target is visible. Fan many rays out to
visualize the whole field of view.

Keep it cheap by filtering before casting:

1. **Distance cull** — ignore targets beyond sight range.
2. **View-cone cull** — ignore targets outside the vision angle.
3. **Raycast the survivors** only.

The same primitive stretches surprisingly far:

- **Pseudo-3D rendering** — Wolfenstein/Doom cast a ray per screen
  column across a 2D map and drew near walls tall, far walls short.
- **Level logic** — Zelda TotK's Ascend probes rays upward from the
  player, records where they hit ceiling, and allows the warp only if the
  surface slope is gentle enough.

# Trade-offs

- One ray to center-mass gives binary, twitchy results — production
  vision checks cast several rays (head/torso/limbs) and add memory or
  awareness meters on top.
- Ray checks are synchronous physics queries; batch or stagger them
  across frames when agents are numerous.

# See also

- [A* Pathfinding](astar-pathfinding.md) - what the AI does after the ray says "seen".
- [Hitscan Shooting](hitscan-shooting.md) - the same instant ray, repurposed as a bullet.

# Citations

1. [선을 쏘아 알아내는 게임의 시야 계산법 — 저세상개발자](https://www.youtube.com/shorts/PRwkpITfW-s) - the short this page is drawn from ([source record](registry/sources/yt-short-raycast-line-of-sight.yaml)).
2. [Unity — Physics.Raycast](https://docs.unity3d.com/ScriptReference/Physics.Raycast.html) - engine raycast API.
3. [Unreal — Traces with Raycasts](https://dev.epicgames.com/documentation/en-us/unreal-engine/traces-with-raycasts-in-unreal-engine) - engine trace API.
4. [Godot — RayCast3D](https://docs.godotengine.org/en/stable/classes/class_raycast3d.html) - engine raycast node.
