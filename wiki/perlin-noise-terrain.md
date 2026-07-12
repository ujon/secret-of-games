---
type: Technique
title: Perlin Noise Terrain
description: Generate natural-looking terrain by sampling layered Perlin noise as a heightmap instead of hand-authoring or using raw randomness.
tags: [graphics, procedural-generation, noise, terrain]
dimensions: [2d, 3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-12T16:55:00Z
---

# Problem

Hand-authoring terrain doesn't scale to large or infinite worlds, and naive
randomness doesn't read as terrain: assigning an independent random height
to every vertex produces white noise — jagged, uncorrelated spikes with no
hills or valleys. Terrain needs randomness that is *smooth and correlated*:
nearby points must have similar heights, and the same world position must
always produce the same height (deterministic, so chunks can stream in any
order).

# Technique

Perlin noise (Ken Perlin, developed for *Tron* and published at SIGGRAPH
1985) is **gradient noise**: instead of random values, it places
pseudo-random *gradient vectors* on an integer lattice and, for any sample
point, interpolates the dot products of those gradients with the point's
offsets — using a quintic fade curve (`6t⁵ − 15t⁴ + 10t³`) so first and
second derivatives stay continuous. The result is a smooth, band-limited
random field: deterministic for a given seed, continuous everywhere, and
evaluable at any coordinate independently — the technique behind terrain
generation in games like Minecraft.

To turn it into terrain:

1. **Sample it as a heightmap** — `height(x, z) = noise(x·f, z·f) · A`,
   with frequency `f` controlling feature size and amplitude `A` the
   height range.
2. **Layer octaves (fBm)** — sum several noise layers, each doubling
   frequency (*lacunarity* ≈ 2) and halving amplitude (*persistence* ≈
   0.5). Low octaves give continents and mountain masses; high octaves add
   rocks and roughness.
3. **Shape the output** — remap the summed value (curves, `pow`,
   terracing, ridged `|noise|`) to carve plains, cliffs, or ridges, then
   feed it to the engine's terrain/heightfield or a generated mesh.
4. **Stay deterministic** — derive every chunk's samples from world
   coordinates plus a world seed, so neighboring chunks meet seamlessly
   with no stored data.

# Examples

```text
# fBm heightmap (pseudo-code)
height(x, z):
    total = 0, freq = base_freq, amp = 1
    for octave in 1..N:                  # N ≈ 4–8
        total += noise2(x*freq, z*freq) * amp
        freq  *= lacunarity              # ≈ 2.0
        amp   *= persistence             # ≈ 0.5
    return total * height_scale
```

Engine built-ins (see the platform registry for versions):

```text
Unity   Mathf.PerlinNoise(x, y)                  # ~[0, 1]
Unreal  FMath::PerlinNoise2D(FVector2D(x, y))    # [-1, 1]
Godot   FastNoiseLite.get_noise_2d(x, y)         # noise_type = TYPE_PERLIN
```

# Trade-offs

- **Directional artifacts** — classic Perlin aligns features to the
  lattice axes; simplex/OpenSimplex-style noise reduces this. Godot's 3.x
  generation shipped OpenSimplex instead of Perlin for this reason.
- **Range gotchas** — implementations disagree: Unity returns roughly
  `[0, 1]` (and documents it may slightly overshoot — clamp before use),
  Unreal returns `[-1, 1]`. Normalize before mixing octaves or biomes.
- **Tiling period** — permutation-table implementations repeat (typically
  every 256 units); large worlds need rehashing, domain offsets, or tiled
  variants.
- **Heightmaps can't overhang** — one height per (x, z) rules out caves
  and arches; those need 3D noise with a meshing pass (e.g. marching
  cubes) instead.
- **Smooth ≠ realistic** — pure fBm terrain lacks erosion features;
  ship-quality terrain usually post-processes it (hydraulic/thermal
  erosion) or blends authored content on top.

# Citations

1. [게임에서 지형을 만들 때 쓰는 특수한 수학 기법 — 저세상개발자, 2026](https://www.youtube.com/shorts/kY9TYQYxCZM) - the short this page is drawn from, verified against its captions.
2. [Ken Perlin — Improving Noise (SIGGRAPH 2002)](https://mrl.cs.nyu.edu/~perlin/paper445.pdf) - the quintic fade curve and gradient-lattice formulation.
3. [Unity — Mathf.PerlinNoise](https://docs.unity3d.com/ScriptReference/Mathf.PerlinNoise.html) - API and the may-exceed-[0,1] caveat.
4. [Unreal — FMath::PerlinNoise2D](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/Core/FMath/PerlinNoise2D) - API and [-1, 1] range.
5. [Godot — FastNoiseLite](https://docs.godotengine.org/en/stable/classes/class_fastnoiselite.html) - `TYPE_PERLIN` and fractal (octave) parameters.
