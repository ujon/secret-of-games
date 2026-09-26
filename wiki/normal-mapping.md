---
type: Technique
title: Normal Mapping
description: Store a surface direction per texel so light varies across a flat surface — relief on cheap polygons, and volume on 2D sprites that would otherwise light up like paper.
tags: [graphics, shaders, lighting]
dimensions: [2d, 3d]
status: stable
model: claude-opus-5
timestamp: 2026-08-18T11:40:00Z
---

# Problem

Move a light across a flat surface and nothing happens. Every pixel of a
2D sprite receives light the same way, and every pixel of a flat polygon
shares one geometric normal, so both stay evenly lit — the light moves
and the image reads as paper. Modeling the real bumps instead costs
triangles nobody can afford on every brick and rivet.

# Technique

Ship a second texture — the **normal map** — that stores, per texel, the
direction the surface *pretends* to face. Lighting then samples that
direction instead of the polygon's own:

1. **Encode** the normal's XYZ into RGB, in **tangent space** (relative
   to the surface, so the map moves with the object and can be reused
   across it).
2. **Sample** the map per pixel in the shader, transform it into world
   space, and use it as `N`.
3. **Light** with the perturbed normal — `N · L` now varies texel by
   texel, so brightness changes across the flat surface as the light
   moves, reading as bumps and creases.

Two payoffs, one technique:

- **3D** — a flat polygon carries the shading of a high-poly model. Bake
  detail from the dense mesh into the map once and render the cheap mesh
  forever.
- **2D** — a sprite with a matching normal map lights per pixel. *Dead
  Cells* built its animation from 3D models rendered small and without
  antialiasing, exporting every frame as a `.png` *plus* its normal map,
  and rendered the volume with a toon shader reading that map — flat
  pixel art that still has form.

A **bump (height) map** is the older sibling: one channel of height, from
which the shader derives a slope. A normal map stores the direction
outright — more data, no derivation, and it can express directions a
height field can't.

# Examples

```text
# tangent-space normal map: [0,1] texture → [-1,1] vector
n_t = texture(normal_map, uv).rgb * 2.0 - 1.0
n_w = normalize(TBN * n_t)              # TBN = tangent, bitangent, normal
lit = max(dot(n_w, L), 0.0) * light_color

# flat-color normal map (no perturbation) is (0.5, 0.5, 1.0) — straight out
```

# Trade-offs

- **The silhouette never changes** — bumps are a lighting lie, so edges
  stay flat and grazing angles give it away. Parallax occlusion mapping
  or real displacement is the fix, at real cost.
- **No self-shadowing or occlusion** — a normal-mapped wall's "bricks"
  cast nothing onto each other.
- **Convention mismatches** — the green channel's sign differs between
  toolchains (OpenGL vs DirectX handedness); engines expose an invert-Y
  switch because assets arrive both ways.
- **Tangents must match the baker** — mismatched tangent bases or hard
  UV seams show up as visible facets and seam lines.
- **Cost is memory and bandwidth**, not geometry — a second texture per
  material, and normal maps compress worse than color.
- **Useless without moving light** — under a single baked ambient light
  the map buys nothing.

# See also

- [Dot Products for Direction Tests](dot-product-tests.md)

- [Billboarding](billboarding.md) - the other way to imply geometry you never modeled.
- [Pixel Art Rules](pixel-art-rules.md) - the hand-authored craft this lighting trick sits on top of.
- [Level of Detail](level-of-detail.md) - where the high-poly detail goes after it is baked into a map.

# Citations

1. [게임 그래픽을 실감나게 하는 마법 — 저세상개발자, 2026](https://www.youtube.com/shorts/i6Mu34lCSb0) - the short this page is drawn from, verified against its captions.
2. [Art Design Deep Dive: Using a 3D pipeline for 2D animation in Dead Cells — Thomas Vasseur, Game Developer, 2018](https://www.gamedeveloper.com/production/art-design-deep-dive-using-a-3d-pipeline-for-2d-animation-in-i-dead-cells-i-) - the short's cited source; exporting each frame with its normal map.
3. [Normal Map vs Bump Map — TextureMap.app](https://texturemap.app/blog/normal-map-vs-bump-map) - the short's cited source for the height-vs-direction distinction.
4. [Unity — Introduction to normal maps (bump mapping)](https://docs.unity3d.com/Manual/StandardShaderMaterialParameterNormalMap.html) - engine support and authoring notes.
5. [Unreal — Normal Maps](https://dev.epicgames.com/documentation/en-us/unreal-engine/normal-maps-in-unreal-engine) - engine support and material usage.
6. [Godot — Standard Material 3D](https://docs.godotengine.org/en/stable/tutorials/3d/standard_material_3d.html) - normal-map parameters, including the invert-Y switch.
