---
type: Technique
title: Level of Detail
description: Swap meshes for progressively simpler versions as they shrink on screen, ending in a billboard — spending triangles only where the eye can see them.
tags: [optimization, graphics, rendering, lod]
dimensions: [3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-13T13:57:00Z
---

# Problem

A 100k-triangle character covers a dozen pixels at a distance — the GPU
still pays for every triangle. Detail the eye can't resolve is pure
waste, and open worlds are mostly made of distant things.

# Technique

Author (or auto-generate) each model at several **LOD levels** and let
the renderer pick by how large the object appears:

1. **Switch on screen coverage, not raw distance** — a mountain far away
   is still huge on screen; a pebble nearby isn't. Engines expose this as
   per-level screen-size thresholds (Unity `LODGroup`, Unreal per-LOD
   screen sizes, Godot's automatic mesh LOD). [1–3]
2. **Halve aggressively** — each level typically drops 50%+ of the
   triangles; three or four levels cover most ranges.
3. **End in an impostor** — the last level is often a
   [billboard](billboarding.md) or a culled-out nothing.
4. **Add hysteresis** — switch down at one threshold and back up at a
   slightly different one, so an object hovering at the boundary doesn't
   flicker between levels.
5. **Hide the switch** — cross-fade or dither between levels for a frame
   or two; a hard swap reads as a **pop**. [1, 2]

# Trade-offs

- **Popping** — visible level switches are the signature artifact;
  budget for transition blending, not just the meshes.
- **Memory for every level** — all LODs ship and often stay resident;
  LOD trades GPU time for memory and authoring/generation effort. [2, 3]
- **Auto-generated LODs mangle silhouettes** — decimators preserve
  triangle counts, not readability; hero assets deserve hand-made low
  levels.

# See also

- [GPU Instancing](gpu-instancing.md)
- [Hair Cards](hair-cards.md)

- [Frustum Culling](frustum-culling.md) - removes the invisible; LOD cheapens what remains.
- [Billboarding](billboarding.md) - the flat impostor that serves as the final LOD level.

# Citations

1. [Unity — LODGroup](https://docs.unity3d.com/ScriptReference/LODGroup.html) - per-level screen-size switching.
2. [Unreal — Creating and Using LODs](https://dev.epicgames.com/documentation/en-us/unreal-engine/creating-and-using-lods-in-unreal-engine) - authored and auto-generated static-mesh LODs.
3. [Godot — Mesh Level of Detail](https://docs.godotengine.org/en/stable/tutorials/3d/mesh_lod.html) - automatic mesh LOD generation and thresholds.
