---
type: Technique
title: Planar Reflections
description: Render the scene from a camera reflected across a plane to produce coherent mirrors and flat-water reflections.
tags: [graphics, rendering, reflections]
dimensions: [3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:31:00Z
---

# Problem

A flat mirror must show the correct perspective, including objects
outside the main camera's image. A static cubemap has the wrong capture
position, and screen-space reflections lack off-screen scene data.

# Technique

**Planar reflections** render an additional view mirrored across the
reflecting plane, then project that view onto the reflective surface.
The engine can render objects missing from the main view because it
performs a separate scene capture. [Epic's guide](https://dev.epicgames.com/documentation/en-us/unreal-engine/planar-reflections-in-unreal-engine)
documents this distinction and its rendering cost.

For a custom implementation:

1. Reflect the camera position and orientation across the mirror plane.
2. Clip geometry against that plane so the reflected camera does not
   draw objects from the wrong side.
3. Render into a texture, excluding the mirror itself or limiting nested
   captures to prevent unbounded recursion.
4. Project the texture onto the mirror using the reflected camera's view.
5. Set capture resolution, visibility, and object exclusions to fit the
   reflection's importance.

# Example

The source Short illustrates the technique as a mirrored world whose
actors copy the real world's actions (0:00–0:21). [1] That explains the
reflection's geometry, but a mirrored-camera capture can render the
existing scene without maintaining duplicate gameplay actors. [2] Both
Unity and Unreal continue to provide dedicated planar-reflection
features; their cost is a reason to budget their use, not evidence that
the technique has disappeared. [2, 5]

For a horizontal mirror at `y = h`, reflect the camera position using
`reflected_y = 2 * h - camera_y`. Reflect its orientation too; flipping a
finished image does not supply the missing viewpoint. In an engine with
a planar-probe component, positioning the probe's plane supplies this
relationship without writing the capture system yourself.

# Trade-offs

- **Another view can be expensive.** The reflected scene repeats draw
  submission, geometry, and shading work. Lower texture resolution
  reduces pixel cost but does not remove the geometry or draw-call cost.
- **Use it for a plane.** A curved reflector needs a different model;
  small normal-based distortions can suggest rippling water but do not
  make the underlying capture geometrically exact for curved surfaces.
- **Multiple mirrors multiply work.** Visibility checks, capture
  exclusions, simpler reflected LODs, and limited update frequency can
  reduce the burden, with corresponding omissions or lag.
- **Support depends on the renderer.** Unity provides a dedicated probe
  in its High Definition Render Pipeline (HDRP); that does not imply
  the same component exists in every Unity render pipeline.

# See also

- [Cubemap Reflections](cubemap-reflections.md) - reusable environment captures for less exact reflections.
- [Screen-Space Reflections](screen-space-reflections.md) - a view-dependent approximation with lower scene-rendering overhead.
- [Frustum Culling](frustum-culling.md) - the reflected camera needs its own visibility decisions.

# Citations

1. [게이머의 눈을 속이는 게임 속 거울의 비밀 — 저세상개발자, 2026](https://www.youtube.com/shorts/OCLRh6VDupM) - original Korean auto-captions checked on 2026-09-26: mirrored-world illustration and the cost of another scene rendering (0:00–0:21). The sources below clarify modern capture implementations and continued engine support.
2. [Planar Reflection — Epic Games, accessed 2026](https://dev.epicgames.com/documentation/en-us/unreal-engine/planar-reflections-in-unreal-engine) - separate scene capture, clipping support, quality controls, and cost.
3. [Unreal Engine 4.12 Released! — Epic Games, 2016](https://www.unrealengine.com/blog/unreal-engine-4-12-released) - introduction of real-time planar reflections.
4. [Introducing Unity 2018.3 — Unity Technologies, 2018](https://unity.com/blog/technology/introducing-unity-2018-3) - introduction of planar reflections in the preview HDRP workflow.
5. [Planar Reflection Probe reference — Unity Technologies, HDRP 17.0 documentation, accessed 2026](https://docs.unity3d.com/Packages/com.unity.render-pipelines.high-definition@17.0/manual/Planar-Reflection-Probe.html) - probe controls and current engine implementation.
