---
type: Technique
title: Destruction State Swaps
description: Replace an intact object with an authored damaged state and conceal the transition with collapse animation, impact marks, dust, and debris.
tags: [graphics, design, optimization, destruction]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:39:22Z
---

# Problem

A dramatic collapse need not produce new fracture geometry or simulate
every fragment. For a predictable set piece, authored damage states can
provide the intended result with controlled work at runtime.

# Technique

**Prepare the damaged appearance, then switch to it at the break event.**
The source describes this sequence: [1]

1. Author the intact and damaged versions of the object.
2. Build up visible impact marks using **decals**, images applied to an
   existing surface.
3. Trigger a prepared collapse animation and change the visible asset.
4. Emit dust and debris to sell the impact and obscure the replacement. [1]

An authored animation fixes the motion; a prefractured object instead
provides pieces that may move dynamically. These approaches can coexist
in one scene. [1, 2]

# Examples

Unreal's Chaos supports cached simulations: a destruction sequence is
calculated beforehand and replayed on a Geometry Collection. This is one
way to supply prepared collapse motion; it does not automatically author
the complete visual state-swap sequence above. [2]

# Trade-offs

- Repeated objects can reveal identical damage shapes and collapse motion. [1]
- Large dust bursts can hide the transition. [1] Consider how much gameplay
  they also obscure.
- Design implication: collision and navigation must agree with the new
  gameplay state even when the visual transition is masked.

# See also

- [Prefractured Destruction](prefractured-destruction.md) - release selected prepared pieces instead of swapping a whole object.
- [Flipbook Particles](flipbook-particles.md) - reuse inexpensive animated dust and smoke.
- [Procedural Sound Effects](procedural-sound-effects.md) - coordinate the break with material-specific audio.

# Citations

1. [게이머를 속이는 게임 속 파괴 연출 — 저세상개발자, 2026](https://www.youtube.com/shorts/QSqcR2sLkdo) - Korean auto-captions checked on 2026-09-26; predesigned damaged assets, repeated collapse animation, impact decals, and dust/debris masking.
2. [Unreal Engine 4.23 released! — Jeff Wilson / Epic Games, 2019](https://www2.unrealengine.com/blog/unreal-engine-4-23-released) - cached destruction playback and secondary effects; supplementary implementation example.
