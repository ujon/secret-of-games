---
type: Technique
title: Dot Products for Direction Tests
description: Compare normalized directions with a dot product to reject targets outside a view cone and compute simple diffuse lighting without calculating angles.
tags: [ai, graphics, math, visibility]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:35:51Z
---

# Problem

An AI needs to reject targets behind it before spending time on visibility
queries. A shader needs to measure how directly a surface faces a light.
Both are questions about the alignment of two directions.

# Technique

The **dot product** is the sum of corresponding component products:
`dot(a, b) = ax*bx + ay*by + az*bz`. For unit vectors it equals the cosine
of their angle: 1 means aligned, 0 perpendicular, and -1 opposite. [1, 2, 3]

For a view cone, normalize the observer's forward direction and the
direction to the target. Compare their dot product with the cosine of
**half** the full field of view. Precompute that threshold when the view
angle changes. Follow this inexpensive filter with a raycast: a target
inside the cone may still be behind a wall. [2, 3]

The Short also uses the dot product to select an area-transition prompt:
compare the character's facing direction with the direction toward an
adjacent area, then show the destination that the character faces. This
is a direction test, not evidence that the character has crossed a
boundary; combine it with a trigger volume if location also matters. [1]

The same alignment measure supplies the angular factor in **Lambertian
diffuse lighting**: `max(dot(N, L), 0)`, where the unit surface normal `N`
and direction **toward** the light `L` share one coordinate space. This
factor alone does not include shadows, attenuation, or material response.
Godot's shader reference demonstrates this use directly. [4]

# Example

Illustrative pseudocode, with application-specific handling of a target
at the observer's exact position:

```text
offset = target - eye
d2 = dot(offset, offset)
if d2 <= epsilon_squared: return nearby_target_policy()
if d2 > sight_range * sight_range: return false
direction = offset / sqrt(d2)
if dot(normalize(forward), direction) < cos_half_fov: return false
return unobstructed_raycast(eye, target)
```

# Trade-offs

- Normalize directions before comparing with a cosine threshold; arbitrary
  vector lengths otherwise change the result.
- Choose a 3D cone or a horizontal cone deliberately. Projecting directions
  onto the ground plane ignores vertical separation.
- Guard zero-length vectors before normalization.
- A single cone boundary can flicker; awareness accumulation or different
  acquire/release angles can stabilize AI behavior.

# See also

- [Raycast Line of Sight](raycast-line-of-sight.md) - obstruction testing after the angular filter.
- [Normal Mapping](normal-mapping.md) - changing the normal used in lighting.
- [Z-Targeting Lock-On](z-targeting-lock-on.md) - filtering candidate targets by direction.

# Citations

1. [게임 시야각에 쓰이는 신기한 수학 — 저세상개발자, 2026](https://www.youtube.com/shorts/tfShkMZ49NU) - Korean auto-captions checked on 2026-09-26: direction signs (0:00), monster sight (0:09), area-transition prompts (0:28), and Lambertian lighting (0:45). The formulas and robustness details are supplemented by the documentation below.
2. [Vector math — Godot Engine contributors, accessed 2026](https://docs.godotengine.org/en/stable/tutorials/math/vector_math.html) - dot product, normalization, and direction comparisons.
3. [Vector3.Dot — Unity Technologies, accessed 2026](https://docs.unity3d.com/ScriptReference/Vector3.Dot.html) - normalized-vector interpretation and front/behind test.
4. [Spatial shaders: light built-ins — Godot Engine contributors, accessed 2026](https://docs.godotengine.org/en/stable/tutorials/shaders/shader_reference/spatial_shader.html#light-built-ins) - Lambertian diffuse light accumulation using the dot product.
