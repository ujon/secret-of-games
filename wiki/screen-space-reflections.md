---
type: Technique
title: Screen-Space Reflections
description: Trace reflection rays through the camera's depth buffer to reuse visible scene colors, with a fallback for information missing from the screen.
tags: [graphics, rendering, reflections]
dimensions: [3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:31:00Z
---

# Problem

Wet floors and polished surfaces need moving objects to appear in their
reflections. Rendering another full scene view for every reflective
surface is expensive, while a static environment capture cannot follow
those objects.

# Technique

**Screen-space reflections (SSR)** reuse the main camera's scene color,
depth, and surface normals. They find reflection candidates among the
surfaces already represented on screen:

1. Reconstruct a reflective pixel's position and read its normal.
2. Reflect the incident view direction around that normal.
3. Step along the reflected ray, projecting samples into the camera's
   image and comparing them with the depth buffer.
4. Refine a possible hit, then sample the scene color at that location.
5. Fade unreliable hits and screen edges into another reflection source,
   such as a [cubemap](cubemap-reflections.md).

[Lettier's implementation](https://lettier.github.io/3d-game-shaders-for-beginners/screen-space-reflection.html)
shows the ray search and its failure cases. Surface roughness can soften
the reflection; lower resolution and fewer tracing steps trade precision
for rendering time, as documented in [Unity's SSR guide](https://docs.unity3d.com/560/Documentation/Manual/PostProcessing-ScreenSpaceReflection.html).

# Example

The source Short uses lake reflections to explain SSR, including the
disappearance of reflected objects as they leave the screen (0:37–1:00). [1]
Blurring can disguise artifacts; it does not restore the missing scene. [2, 4]

Move a bright object beside a wet floor, then turn the camera until the
object leaves the screen while its expected reflection remains visible.
Basic SSR loses the object because its color and depth are no longer in
the input image. More tracing steps cannot recover missing scene data.
A probe fallback can preserve a plausible environment, but it cannot
guarantee that the missing moving object is present.

# Trade-offs

- **Off-screen and occluded surfaces are missing.** A mirror facing the
  camera often needs exactly that information. Use a
  [planar reflection](planar-reflections.md) when its geometry permits.
- **Depth is incomplete.** Thin geometry and gaps can produce false hits,
  holes, or streaks. The depth tolerance balances these errors.
- **Quality consumes time.** More samples and larger buffers increase
  rendering work. Small details may still shimmer as visibility changes.
- **Render-path restrictions vary.** Unity's original Post-processing
  Stack effect requires deferred rendering; this is a condition of that
  implementation, not a mathematical requirement of SSR.

# See also

- [Cubemap Reflections](cubemap-reflections.md) - an inexpensive source for missing screen data.
- [Planar Reflections](planar-reflections.md) - another view can capture off-screen objects.
- [Normal Mapping](normal-mapping.md) - surface normals also control reflection directions.

# Citations

1. [게이머의 눈을 속이는 게임 속 거울의 비밀 — 저세상개발자, 2026](https://www.youtube.com/shorts/OCLRh6VDupM) - original Korean auto-captions checked on 2026-09-26: reuse of rendered screen data, lake reflections, and missing off-screen objects (0:37–1:00). The sources below supplement tracing and fallback details.
2. [Screen Space Reflection — David Lettier, 3D Game Shaders for Beginners, accessed 2026](https://lettier.github.io/3d-game-shaders-for-beginners/screen-space-reflection.html) - depth tracing, hit refinement, and missing-information artifacts.
3. [Screen Space Reflection — Unity Technologies, Unity 5.6 manual, 2017](https://docs.unity3d.com/560/Documentation/Manual/PostProcessing-ScreenSpaceReflection.html) - quality controls and original implementation requirements.
4. [Screen Space Reflections — Epic Games, accessed 2026](https://dev.epicgames.com/documentation/en-us/unreal-engine/screen-space-reflections-in-unreal-engine) - scene visibility limits and material roughness controls.
5. [Environment and Post-Processing — Godot Engine, 3.0 documentation, 2018](https://docs.godotengine.org/en/3.0/tutorials/3d/environment_and_post_processing.html) - real-time reflections and depth-tolerance controls.
