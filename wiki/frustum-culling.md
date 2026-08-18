---
type: Technique
title: Frustum Culling
description: Skip rendering everything outside the camera's view volume by testing bounding volumes against the frustum planes — automatic in every major engine.
tags: [optimization, graphics, rendering, culling]
dimensions: [3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-13T13:47:00Z
---

# Problem

Game worlds are far bigger than the screen. Submitting every object to the
GPU each frame wastes the frame budget on things the camera cannot
possibly see — most of the world, most of the time.

# Technique

A perspective camera sees a **frustum**: a truncated pyramid bounded by
the near plane, the far plane, and four side planes. Before drawing:

1. **Wrap each object in a cheap bounding volume** — a sphere or
   axis-aligned box, not the real mesh.
2. **Test the volume against the six frustum planes** — fully outside any
   plane means the object can't be visible; skip it entirely.
3. **Cull hierarchically** — organize the scene spatially (quadtree,
   octree, BVH) so one test can reject a whole branch of objects instead
   of visiting each.

Engines do the per-object pass automatically — Unity, Unreal, and Godot
all frustum-cull renderers out of the box (see the platform registry) —
so the craft lies in what the automation can't decide:

- **Split huge meshes** — a single combined mesh culls all-or-nothing;
  chunked geometry culls in pieces.
- **Layered cull distances** — drop small clutter earlier than landmarks.
- **Pair with occlusion culling** — frustum culling only removes what's
  *outside* the view; dense interiors also need to skip what's hidden
  *behind* other objects.

# Trade-offs

- **Shadow popping** — an object outside the frustum can still cast a
  shadow into it; culling it naively pops the shadow. Engines run a
  separate shadow-caster cull for this.
- **Bounds must be conservative** — animated/skinned meshes that outgrow
  their bounding volume vanish at screen edges; inflate their bounds.
- **No help when everything is visible** — a dense room fully inside the
  frustum gains nothing; that's occlusion culling's job.

# See also

- [Billboarding](billboarding.md) - the companion trick for what survives culling but sits far away.
- [Voxel Terrain](voxel-terrain.md) - chunking as a way to make a huge world cullable in pieces.

# Citations

1. [Unity — Understanding the View Frustum](https://docs.unity3d.com/Manual/UnderstandingFrustum.html) - frustum geometry and Unity's automatic culling.
2. [Unity — Occlusion Culling](https://docs.unity3d.com/Manual/OcclusionCulling.html) - the complementary hidden-object pass.
3. [Unreal — Visibility and Occlusion Culling](https://dev.epicgames.com/documentation/en-us/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine) - UE's culling pipeline (view frustum, distance, occlusion).
4. [Godot — Optimizing 3D Performance](https://docs.godotengine.org/en/stable/tutorials/performance/optimizing_3d_performance.html) - Godot's automatic frustum culling and manual optimizations.
