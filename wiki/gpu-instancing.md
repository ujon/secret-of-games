---
type: Technique
title: GPU Instancing
description: Draw many copies of one mesh with shared material state and per-instance data to reduce submission overhead for grass and other repeated scenery.
tags: [optimization, graphics, rendering, vegetation]
dimensions: [3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:31:00Z
---

# Problem

A meadow can contain thousands of copies of a tiny grass mesh. Submitting
each copy separately creates many **draw calls** even when the geometry
itself is simple. Animating each plant from a separate gameplay object
adds another source of overhead.

# Technique

**GPU instancing** gives the graphics processor one shared mesh and a
buffer of instance data, so one draw can render many copies. Unity's
original implementation groups objects sharing both mesh and material;
individual transforms and supported shader properties can still vary.
This reduces submission overhead, not the number of visible blades that
must be shaded. [Unity's GPU instancing guide](https://docs.unity3d.com/540/Documentation/Manual/GPUInstancing.html)
documents the shared-data requirement.

The source Short presents instancing as one part of a grass-rendering
pipeline, alongside culling, distance-based detail, and wind animation
(0:08–1:08). [1] Combine these distinct supporting techniques:

1. Use detailed blade geometry nearby and fewer polygons farther away.
   The Short illustrates distant clumps with overlapping cards carrying
   grass images; these need not rotate to face the camera. [1, 2]
2. Store position, rotation, scale, and supported appearance variation per
   instance. Keep these variations in instance data instead of creating
   a separate material for every plant.
3. Bend vertices in the shader using time, wind, and the clump's location;
   keep the roots fixed. Pelzer's grass chapter demonstrates this
   animation strategy without requiring a separate CPU update per blade. [2]
4. Group nearby clumps into spatial patches. Cull invisible patches and
   reduce distant detail with [LOD](level-of-detail.md). A single enormous
   batch can make visibility tests too coarse; Godot's MultiMesh, for
   example, treats the entire group as one spatial object. [6]

The Short distinguishes grass outside the view, grass beyond the chosen
draw distance, and grass hidden behind obstacles; the last case is
[occlusion culling](occlusion-culling.md). [1] These are separate
visibility decisions; [frustum culling](frustum-culling.md) alone handles
only the first.

# Example

Illustrative organization, rather than a specific engine API:

```text
for visible_patch in meadow:
    instances = visible_patch.instances_at_selected_lod
    draw_instanced(shared_mesh, shared_material, instances)

# Vertex shader: root_weight is 0 at the root and 1 at the tip.
phase = time * wind_speed + dot(instance.position.xz, wind_frequency)
offset = wind_direction * sin(phase) * wind_strength * root_weight
world_position = instance.transform * local_position + offset
```

# Trade-offs

- **Geometry and pixel work remain.** Instancing cannot fix excessive
  triangles or the overlapping card layers that repeatedly shade the
  same pixels, called **overdraw**.
- **Variation has constraints.** Different meshes, materials, or render
  passes can require separate batches. Instancing does not promise one
  draw call for the entire meadow.
- **Batch bounds must include wind motion.** Otherwise animated tips can
  disappear when the undeformed patch leaves the view.
- **Animation is approximate.** The simple sine example does not model
  physical blade bending or player interaction.

# See also

- [Billboarding](billboarding.md) - camera-facing cards and their viewing-angle limitations.
- [Frustum Culling](frustum-culling.md) - skip patches outside the camera view.
- [Occlusion Culling](occlusion-culling.md) - skip patches hidden behind solid blockers.
- [Level of Detail](level-of-detail.md) - reduce geometry or density with distance.

# Citations

1. [게임 속 잔디를 만드는 궁극의 최적화 기법 — 저세상개발자, 2026](https://www.youtube.com/shorts/BtBXRm1noIg) - original Korean auto-captions checked on 2026-09-26: culling and LOD (0:08–0:36), geometric and card-based wind animation (0:36–0:53), and GPU instancing (0:53–1:08). The sources below supplement implementation details.
2. [Chapter 7: Rendering Countless Blades of Waving Grass — Kurt Pelzer, GPU Gems, 2004](https://developer.nvidia.com/gpugems/gpugems/part-i-natural-effects/chapter-7-rendering-countless-blades-waving-grass) - crossed cards, fixed roots, shader animation, and reducing draw submissions; this predates and is not evidence of a particular game's instancing implementation.
3. [GPU Instancing — Unity Technologies, Unity 5.4 manual, 2016](https://docs.unity3d.com/540/Documentation/Manual/GPUInstancing.html) - shared mesh/material requirements and per-instance properties.
4. [Unity 5.4.0f3 — Unity Technologies, 2016](https://unity.com/releases/editor/whats-new/5.4.0f3) - introduction of GPU instancing support.
5. [Instanced Static Mesh Component — Epic Games, accessed 2026](https://dev.epicgames.com/documentation/en-us/unreal-engine/instanced-static-mesh-component-in-unreal-engine) - instance properties, draw-call savings, and foliage integration.
6. [MultiMesh — Godot Engine, 3.0 documentation, 2018](https://docs.godotengine.org/en/3.0/classes/class_multimesh.html) - instance transforms and the whole-group visibility trade-off.
