---
type: Technique
title: Billboarding
description: Render flat images that always face the camera — screen-aligned, viewpoint-oriented, or axis-aligned — for cheap 3D presence.
tags: [graphics, billboard, rendering]
dimensions: [3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Real 3D geometry for every tree, particle, and distant prop is wasted
polygons — the player never sees their sides anyway. But a naive flat
image betrays itself the moment the camera moves.

# Technique

Keep the image flat and **rotate it to face the camera** every frame.
Super Mario 64 rendered trees and round monsters this way to save
hardware. Three variants, by how they align: [1]

| Variant | Alignment | Use |
| --- | --- | --- |
| Screen-aligned | Parallel to the projection plane | Particles, lens flares |
| Viewpoint-oriented | Individually rotated to face the camera | Free-floating objects |
| Axis-aligned | Vertical axis locked to the ground, rotates horizontally only | Trees, grass, standing props |

Screen-aligned billboards make solid objects look like they hover, hence
the other two variants. Modern games still billboard distant objects
(impostors) before switching to real meshes up close. [1, 2]

Unity provides `BillboardRenderer`; Godot exposes billboard alignment
through its material's `billboard_mode`. [2, 3]

# Trade-offs

- Billboards have no parallax across their own surface — closing in or
  orbiting fast reveals the card; swap to geometry by distance.
- Axis-aligned trees viewed from directly above collapse into slivers —
  pair with a top-down variant or fade.

# See also

- [GPU Instancing](gpu-instancing.md)
- [Flipbook Particles](flipbook-particles.md)

- [Mode 7 Affine Transforms](mode-7-affine.md) - the 2D-era sibling illusion of 3D.
- [Blend Modes](blend-modes.md) - how billboarded particles composite into light and smoke.
- [Normal Mapping](normal-mapping.md) - faking surface detail rather than surface presence.

# Citations

1. [게이머를 속이는 게임의 3D 연출 방법 — 저세상개발자, 2026](https://www.youtube.com/shorts/DXsKd52lomQ) - the short this page is drawn from.
2. [Unity — BillboardRenderer](https://docs.unity3d.com/ScriptReference/BillboardRenderer.html) - engine billboard component.
3. [Godot — BaseMaterial3D `billboard_mode`](https://docs.godotengine.org/en/stable/classes/class_basematerial3d.html) - engine billboard material flag.
