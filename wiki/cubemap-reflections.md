---
type: Technique
title: Cubemap Reflections
description: Capture the surroundings at a probe and reuse that directional image for inexpensive reflections on nearby objects.
tags: [graphics, rendering, reflections]
dimensions: [3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:31:00Z
---

# Problem

A metal prop needs to reflect its surroundings, but tracing the whole
scene for every surface pixel is expensive. Many objects can share an
approximate environment view instead.

# Technique

A **cubemap** stores six directional views around one point. A
**reflection probe** captures that environment and defines where nearby
surfaces should use it. The surface shader reflects the view direction
around its normal, then samples the captured image in that direction.

1. Place probes in regions with distinct surroundings, such as rooms.
2. Capture or bake the environment into a cubemap.
3. Use filtered versions for rough surfaces and sharper versions for
   smooth ones.
4. Blend or prioritize nearby probes as objects move between regions.
5. Recapture only when needed if dynamic surroundings must appear.

[Unity's probe documentation](https://docs.unity3d.com/Manual/class-ReflectionProbe.html)
describes baked and real-time captures. [Epic's reflection capture guide](https://dev.epicgames.com/documentation/en-us/unreal-engine/reflections-captures-in-unreal-engine)
explains how projecting captures onto simple local shapes approximates
parallax. This correction improves placement within a room; it does not
reconstruct the complete scene geometry.

# Example

The source Short contrasts convincing reflections on small objects with
distortion on flat mirrors (0:21–0:37). [1] The probe's fixed capture point
is the reason this approximation becomes easier to notice. [4]

One room probe supplies surrounding walls and lights to many metal props.
A polished sphere can hide some projection errors through curvature. A
large flat mirror exposes them because the reflected room must line up
precisely with the viewer's position. Add
[screen-space reflections](screen-space-reflections.md) for local visible
detail, or use [planar reflections](planar-reflections.md) for that mirror.

# Trade-offs

- **One capture point is an approximation.** Nearby objects can appear
  displaced when the receiving surface is far from the probe.
- **Baked captures omit later changes.** Moving characters and changing
  lighting need another reflection source or updated captures.
- **Real-time capture has a cost.** Refreshing the environment requires
  extra rendering. Scheduling updates across frames can spread the cost
  while leaving parts of the capture temporarily out of date.
- **Resolution costs memory.** More detailed maps and many local probes
  consume storage and graphics memory.

# See also

- [Screen-Space Reflections](screen-space-reflections.md) - reuse visible dynamic scene detail.
- [Planar Reflections](planar-reflections.md) - accurate perspective for a flat mirror.
- [Normal Mapping](normal-mapping.md) - vary the direction sampled across a surface.

# Citations

1. [게이머의 눈을 속이는 게임 속 거울의 비밀 — 저세상개발자, 2026](https://www.youtube.com/shorts/OCLRh6VDupM) - original Korean auto-captions checked on 2026-09-26: precomputed environment imagery and flat-mirror distortion (0:21–0:37). The sources below supplement probe placement and update behavior.
2. [Reflection Probe component reference — Unity Technologies, accessed 2026](https://docs.unity3d.com/Manual/class-ReflectionProbe.html) - capture modes and probe configuration.
3. [Unity 5.0.0f4 — Unity Technologies, 2015](https://unity.com/releases/editor/whats-new/5.0.0f4) - introduction of ReflectionProbe, cubemap filtering, and real-time update scheduling.
4. [Reflections Captures — Epic Games, accessed 2026](https://dev.epicgames.com/documentation/en-us/unreal-engine/reflections-captures-in-unreal-engine) - local projection, probe placement, roughness, and flat-mirror limitations.
5. [Reflection probes — Godot Engine, accessed 2026](https://docs.godotengine.org/en/stable/tutorials/3d/global_illumination/reflection_probes.html) - probe use and implementation limits.
