---
type: Technique
title: Prefractured Destruction
description: Prepare fragments and their connections ahead of time, then release selected pieces and add inexpensive debris when an impact occurs.
tags: [physics, graphics, optimization, destruction]
dimensions: [3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:33:35Z
---

# Problem

Computing an unrestricted new fracture at every impact creates geometry,
collision, and simulation work during the busiest moments of gameplay.
Simulating every tiny splinter also spends physics time on visual detail.

# Technique

**Create the breakable pieces before play, then decide when their
connections fail at runtime.** The fracture geometry is prepared; the
resulting motion can still be physically simulated. [2, 3]

1. Split the asset into fragments during content creation. Choose a
   pattern appropriate for its material and intended break size.
2. Group fragments into larger clusters and record their connections.
3. Apply damage or strain to the affected region. Keep intact clusters
   together; activate separated pieces as rigid bodies.
4. Emit dust and small visual debris from break events. Give these a
   cheaper representation than gameplay-relevant chunks.
5. Bound the active fragment count and recycle cosmetic debris. [2, 3]

# Examples

The short uses **Control** to illustrate detaching the struck part from
an object divided into pieces ahead of time. It distinguishes this from
[swapping an entire damaged asset](destruction-state-swaps.md) and from
cutting new geometry at runtime. [1]

Unreal's Chaos uses **Geometry Collections** to hold fractured pieces,
hierarchical clusters, and a connection graph. Break events can drive
Niagara dust and particle effects. The initial Chaos release was a beta
in Unreal 4.23 requiring a source build. [3]

Rainbow Six Siege illustrates the separation between meaningful damage
and cosmetic debris: its 2016 presentation describes replacement debris
that is instanced and aggressively recycled, with box collision shapes
and no fragment-to-fragment collisions. [2]

Siege's wall holes are an important boundary to this technique. Its
surface-destruction system also cuts planar geometry procedurally at
runtime. Prefractured geometry is one tool in a hybrid system, not proof
that every hole is a swapped, prebuilt mesh. [2]

# Trade-offs

- Precomputed boundaries constrain where fragments can separate.
- Smaller fragments increase stored geometry and possible active bodies.
- Cosmetic debris should not silently become authoritative cover or
  navigation geometry: separate the gameplay damage state from effects.
- Destruction can expose more of the scene and require changes to
  navigation, sound propagation, collision, and lighting. [2, 3]

# Engine support

Unreal 4.0 already provided an editor workflow for creating and fracturing
destructible meshes through its earlier destruction system. Chaos 4.23
is the later Geometry Collection milestone, not the first version with
prefractured destruction. [3, 4]

# See also

- [Destruction State Swaps](destruction-state-swaps.md) - replace an intact asset and replay an authored collapse instead of releasing selected fragments.
- [Object Pooling](object-pooling.md) - reuse short-lived debris rather than repeatedly allocating it.
- [Voxel Terrain](voxel-terrain.md) - change a volume when prepared fracture boundaries are insufficient.
- [Procedural Sound Effects](procedural-sound-effects.md) - drive break sounds from material and event data.

# Citations

1. [게이머를 속이는 게임 속 파괴 연출 — 저세상개발자, 2026](https://www.youtube.com/shorts/QSqcR2sLkdo) - Korean auto-captions checked on 2026-09-26; contrasts authored swaps, selective fragment release in Control, and runtime subdivision in Rainbow Six Siege.
2. [The Art of Destruction in Rainbow Six: Siege — Julien L'Heureux / Ubisoft, GDC, 2016](https://media.gdcvault.com/gdc2016/Presentations/LHeureux_Julien_Art_Of_Destruction.pdf) - verified fragmentation model, runtime surface cutting, debris simplification, and effects on other systems.
3. [Unreal Engine 4.23 released! — Jeff Wilson / Epic Games, 2019](https://www2.unrealengine.com/blog/unreal-engine-4-23-released) - Chaos fracture authoring, clustering, connection graph, and break-event effects.
4. [How do I add destruction to an object? — Nick Darnell / Epic Games, 2014](https://forums.unrealengine.com/t/how-do-i-add-destruction-to-a-object/277870) - Epic's launch-week explanation of Unreal 4's Create Destructible Mesh and Fracture Mesh workflow.
