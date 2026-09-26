---
type: Technique
title: Occlusion Culling
description: Skip rendering objects fully hidden behind other geometry even when they lie inside the camera's view.
tags: [optimization, graphics, rendering, culling]
dimensions: [3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:37:23Z
---

# Problem

A wall or hill can hide thousands of grass blades that remain inside
the camera's view volume. [Frustum culling](frustum-culling.md) does not
remove those objects, so rendering them still wastes work.

# Technique

**Occlusion culling** skips objects that other geometry completely hides
from the current view. An **occluder** blocks the view; an **occludee** is
an object tested for visibility. The grass-rendering Short includes
obstacle-hidden grass among three reasons to skip drawing, alongside
being outside the view or too far away (0:08–0:20). [1] It does not specify
the occlusion algorithm; the engine documentation below supplies those
implementation details.

1. Reject objects outside the frustum and apply any draw-distance limits.
2. Test the remaining objects or spatial groups against the chosen
   occlusion representation.
3. Skip a group only when its bounds are fully hidden. Keep uncertain
   cases visible so the optimization does not remove visible surfaces. [3, 4]

Engines provide different implementations:

| Workflow | Visibility test | Important constraint |
| --- | --- | --- |
| Unity baked occlusion [2] | Precompute visibility data in the editor, then query it at runtime. | In this workflow, moving objects can be hidden but cannot act as baked occluders. |
| Unreal hardware occlusion queries [3] | Test object bounds against scene depth and consume query results later. | Delayed results can cause popping during fast camera motion. |
| Godot 4 raster occlusion [4] | Rasterize simplified occluder geometry at low resolution on the CPU, then test object bounds. | Occluder geometry must be authored or baked; ordinary meshes do not automatically become blockers. |

These are particular workflows, not exhaustive descriptions of each
engine. Godot first introduced occlusion support in 3.4 through portals
and spherical occluders; its raster method arrived with 4.0. [4, 5] Unity's
registry entry covers the Umbra workflow introduced in 3.0, rather than
the earlier separate Unity iPhone implementation. [6, 7] Unreal's latent
occlusion queries were already present before the public UE4 launch. [8]

# Example

A boulder hides a small instanced grass patch. If the patch's entire
bounding box lies behind the boulder, skip that patch for this camera.
One giant bounding box for the whole meadow will usually remain partly
visible, preventing useful culling. Split the meadow into spatial
patches and include wind deformation in their bounds. The spatial-group
limitation follows from the bounding-box test in Godot's guide. [4]

This is a rendering decision: it does not imply disabling gameplay or
removing an object from other cameras' visibility decisions.

# Trade-offs

- **Visibility tests have a cost.** Open landscapes with few effective
  blockers may gain little; measure total frame time on the target device. [2, 4]
- **Solid blockers matter.** Thin grass cards and transparent surfaces
  are poor substitutes for large opaque occluders. [4]
- **Bounds and occluders must stay valid.** Undersized object bounds or
  stale baked occluders can hide surfaces the player should see. Large
  bounds preserve correctness but reduce culling opportunities. [4]
- **It complements other optimizations.** Visible grass still benefits
  from instancing and reduced distant detail.

# See also

- [Frustum Culling](frustum-culling.md) - reject objects outside the view volume.
- [GPU Instancing](gpu-instancing.md) - draw repeated grass meshes in groups.
- [Level of Detail](level-of-detail.md) - reduce the cost of visible distant objects.

# Citations

1. [게임 속 잔디를 만드는 궁극의 최적화 기법 — 저세상개발자, 2026](https://www.youtube.com/shorts/BtBXRm1noIg) - original Korean auto-captions checked on 2026-09-26: culling outside-view, distant, and obstacle-hidden grass (0:08–0:20).
2. [Occlusion culling — Unity Technologies, accessed 2026](https://docs.unity3d.com/Manual/OcclusionCulling.html) - baked visibility, moving-object restrictions, CPU and memory costs.
3. [Visibility and Occlusion Culling — Epic Games, accessed 2026](https://dev.epicgames.com/documentation/en-us/unreal-engine/visibility-and-occlusion-culling-in-unreal-engine) - hardware queries, depth-based visibility, and delayed-result popping.
4. [Occlusion culling — Godot Engine contributors, accessed 2026](https://docs.godotengine.org/en/stable/tutorials/3d/occlusion_culling.html) - CPU rasterization, simplified occluders, bounding-box granularity, and performance trade-offs.
5. [Godot 3.4 is released with major features and UX polish — Rémi Verschelde, 2021](https://godotengine.org/article/godot-3-4-is-released/) - introduction of portal and spherical occlusion, distinct from Godot 4's raster approach.
6. [Unity Technologies Delivers Unity 3 — Unity Technologies, 2010](https://www.globenewswire.com/news-release/2010/09/27/1251895/0/en/Unity-Technologies-Delivers-Unity-3.html) - introduction of the Umbra-powered visibility workflow.
7. [Announcing Unity 3.0: iPad, Android, and PlayStation — Unity Technologies forum, 2010](https://discussions.unity.com/t/announcing-unity-3-0-ipad-android-and-playstation/408764?page=5) - staff clarification that the new Umbra system replaced earlier Unity iPhone occlusion support.
8. [Extending the level build system — Epic Games developer forum, 2014](https://forums.unrealengine.com/t/extending-the-level-build-system/275862) - prelaunch UE4 staff reply identifies existing latent occlusion queries, supporting the 4.0 registry version.
