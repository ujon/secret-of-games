---
type: Technique
title: Flipbook Particles
description: Bake an effect into a texture sheet and animate its frames on particles to reuse detailed smoke or fire without running the original simulation.
tags: [graphics, optimization, particles, animation]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:39:22Z
---

# Problem

A detailed smoke simulation may cost too much to run for every distant
explosion or background effect. Its evolving appearance can still be
useful when the effect does not need to respond to new obstacles.

The source short explains smoke drawn on camera-facing panels. Flipbook
animation is a further implementation option from the engine references
below; the short does not explain texture-sheet baking. [1, 2]

# Technique

**Render the effect once into an animated texture sheet, then play the
frames on particles.** A flipbook is a grid whose cells hold successive
images; it replaces the original simulation with texture sampling. [2]

1. Capture the effect at a chosen camera angle and duration.
2. Pack the captured frames into a regular grid.
3. Apply the texture to a sprite emitter, using a camera-facing billboard
   when the particles live in a 3D scene.
4. Advance each particle's frame index with its age. Vary starting frames
   where appropriate to avoid every particle playing in lockstep. [2, 3]

# Examples

Conceptual frame-grid playback derived from the documented sheet layout:
[2, 3]

```text
frame = floor(ageSeconds * framesPerSecond) % frameCount
cell = (frame % columns, floor(frame / columns))
atlasUV = (spriteUV + cell) / (columns, rows)
color = sample(flipbook, atlasUV)
```

Clamp instead of wrapping for an effect that should play only once.
The pseudocode assumes a grid starting at the same corner as the texture
coordinates; account for the engine's vertical texture convention.

Unreal's Niagara Flipbook Baker, introduced in 5.0, can capture a 3D gas
simulation and feed its frames into a sprite emitter. Ordinary flipbook
playback predates that baker: Cascade has SubUV modules, Unity has Texture
Sheet Animation, and Godot's particle materials expose horizontal and
vertical animation-frame counts. [2–6]

# Trade-offs

- The captured motion cannot reroute itself around a new object. [2]
- A single captured view lacks the internal parallax of a 3D volume. [2]
- More frames divide the available texture resolution into smaller cells.
  Match the grid and texture dimensions to avoid inconsistent sampling. [2]

# See also

- [Billboarding](billboarding.md) - orient the particle's flat geometry toward the camera.
- [Blend Modes](blend-modes.md) - composite the captured image into the scene.
- [Volumetric Smoke](volumetric-smoke.md) - maintain a spatial smoke field when interaction matters.

# Citations

1. [게임 속 연막탄이 가짜 연출인 이유? — 저세상개발자, 2026](https://www.youtube.com/shorts/9JsRRFL8G0c) - Korean auto-captions checked on 2026-09-26; the short motivates billboard smoke. Flipbook baking and playback details are supplementary material from the engine references.
2. [Niagara Flipbook Baker Quick Start Guide — Epic Games, accessed 2026](https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine) - verified simulation capture and sprite-playback workflow.
3. [SubUV Modules — Epic Games, Unreal Engine 4.27 documentation, 2021](https://dev.epicgames.com/documentation/unreal-engine/subuv-modules?application_version=4.27) - frame selection, playback rate, and randomized starting frames.
4. [Unreal Engine 5.1 Release Notes — Epic Games, 2022](https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-5.1-release-notes?application_version=5.1) - identifies 5.0 as the first Niagara Flipbook Baker version.
5. [Texture Sheet Animation Module — Unity Technologies, Unity 5.2 documentation, 2015](https://docs.unity.cn/520/Documentation/Manual/PartSysTexSheetAnimModule.html) - particle texture-grid animation support.
6. [SpatialMaterial — Godot Engine, Godot 3.0 documentation, 2018](https://docs.godotengine.org/en/3.0/classes/class_spatialmaterial.html) - particle animation frame counts and particle billboard mode.
