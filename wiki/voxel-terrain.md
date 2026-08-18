---
type: Technique
title: Voxel Terrain
description: Store the world as 3D pixels — cubic blocks or per-voxel densities resolved into smooth surfaces — so players can build and destroy terrain that authored meshes could never change.
tags: [graphics, voxel, terrain, procedural-generation]
dimensions: [3d]
status: stable
model: claude-opus-5
timestamp: 2026-08-18T11:40:00Z
---

# Problem

An authored terrain mesh is a finished sculpture: the player can walk on
it but never change it. Digging, building, and destruction need a
representation the game can edit at runtime — and edit cheaply, because
every change forces a re-mesh.

# Technique

A **voxel** is to 3D space what a pixel is to a 2D screen: one cell of a
regular grid. Store the world as a grid of them and terrain becomes data
you can write to.

Two ways to turn that grid into a surface:

| Flavor | Per-voxel data | Surface | Look |
| --- | --- | --- | --- |
| Cubic | Which material occupies the cell | The cell's own faces | Blocky (Minecraft) |
| Density field | A signed density value | Isosurface extracted per cell — **dual contouring** places one vertex inside each cell and joins neighbors | Smooth, carvable (Donkey Kong Bananza) |

Density fields buy more than looks: *Bananza* rounds off dug terrain
instead of leaving stair-steps, and blends the boundary where voxels of
different materials meet.

Voxel grids are expensive, so two optimizations are structural rather
than optional:

1. **Chunks** — group adjacent voxels into fixed blocks and treat the
   chunk as the unit of meshing, streaming, and culling. Minecraft uses a
   16×16 column spanning the full world height (384 blocks in the modern
   Overworld), subdivided into 16-block sections, and loads only the
   chunks it needs.
2. **Hidden-face rejection** — never emit a face between two solid
   voxels. Only faces touching air can be seen, which removes the vast
   interior of any solid region.

Voxels also make a convenient place to hang non-visual data. *Tears of
the Kingdom* stores terrain facts per voxel — whether the coordinate is
indoors, whether it is near the water surface, whether Ascend works
there — and its audio system searches sound paths through the same grid.

# Examples

```text
# Chunk meshing: emit a face only where a solid voxel touches air
for v in chunk.voxels:
    if v.solid:
        for dir in (+x, -x, +y, -y, +z, -z):
            if not neighbor(v, dir).solid:      # crosses a chunk edge? ask the neighbor chunk
                emit_quad(v, dir)

# Density flavor: the surface is where density crosses zero
d(x, y, z) = height_field(x, z) - y + carve_edits(x, y, z)
# dual contouring: one vertex per cell with a sign change, joined across cells
```

# Trade-offs

- **Re-meshing cost dominates** — a single edited voxel dirties its
  chunk; large edits dirty many. Budget for background meshing and for
  the frame where the new mesh is uploaded.
- **Memory grows cubically** — doubling world height or view distance is
  not a small change; sparse structures (octrees, palettes per chunk)
  and per-chunk LOD are how big voxel worlds stay affordable.
- **Chunk seams** — meshing a chunk in isolation needs a one-voxel
  border from its neighbors, or cracks and wrong normals appear at the
  edges. Neighboring chunks at different LOD levels crack too.
- **Dual contouring needs more than occupancy** — densities (and
  ideally normals) per cell, and it can produce self-intersecting cells
  on sharp features; marching cubes is the simpler, blobbier alternative.
- **Editable terrain invalidates precomputation** — baked lighting,
  navmeshes, and occlusion data all assume the world holds still.
- **No engine ships this** — the platform registry has no entry for this
  page: Unity, Unreal, and Godot all leave voxel worlds to custom
  chunk-meshing code or third-party tooling.

# See also

- [Perlin Noise Terrain](perlin-noise-terrain.md) - what usually fills the voxel grid before players start editing it.
- [Frustum Culling](frustum-culling.md) - why chunked geometry culls better than one combined mesh.
- [Level of Detail](level-of-detail.md) - the per-chunk simplification that makes long view distances possible.
- [Spatial Audio Physics](spatial-audio-physics.md) - the voxel grid reused as a search space for sound paths.

# Citations

1. [게임 세계를 건축하는 놀라운 기술 — 저세상개발자, 2026](https://www.youtube.com/shorts/OS3OjZ607So) - the short this page is drawn from, verified against its captions.
2. [Session Report: "Donkey Kong Bananza" — Building a World Where Everything Can Be Destroyed (CEDEC 2026) — Classmethod DevelopersIO, 2026](https://dev.classmethod.jp/en/articles/cedec-2026-voxel/) - the short's cited source for Bananza's voxel technique.
3. [Minecraft Wiki — Chunk](https://minecraft.wiki/w/Chunk) - chunk dimensions, 16-block sections, and loading.
4. [Tunes of the Kingdom: Evolving Physics and Sounds for 'The Legend of Zelda: Tears of the Kingdom' — GDC, 2024](https://youtu.be/N-dPDsLTrTE) - voxels storing terrain and level-design data, and the sound-path search over them.
