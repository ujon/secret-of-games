---
type: Technique
title: Biome Generation from Noise Fields
description: Sample shared climate noise to choose coherent biomes and terrain, then add the materials, vegetation, and gameplay rules that make each region distinct.
tags: [design, procedural-generation, noise, terrain]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:38:52Z
---

# Problem

Independent random biome choices produce a patchwork of unrelated regions.
A terrain heightmap alone also cannot decide where forests, deserts, or
underground ecosystems belong.

# Technique

## Layered region maps and density fields

The short contrasts two generations of Minecraft world building. Its older
pipeline starts with a coarse land/ocean grid, repeatedly subdivides it and
perturbs coastlines, then introduces climate regions with transition zones,
beaches, and rivers. Each pass refines an existing structure instead of
choosing every final cell independently. [1]

For newer terrain, the short explains **fractal noise**: combine smooth
fields at different scales so broad shapes gain smaller irregularities.
Vary the terrain controls by region, then use continuous three-dimensional
density values to form solid ground and openings. Caverns and winding
tunnels require this volumetric step; a heightmap alone cannot make them. [1]

## Shared environmental inputs

Use **noise fields** as shared inputs to separate terrain and biome rules.
Minecraft's official overview describes this pipeline: [2]

1. Combine the world seed and world coordinates to sample smoothly varying
   parameters, such as humidity, erosion, and weirdness.
2. Feed those parameters into terrain rules that establish the basic
   arrangement of air, water, and stone.
3. Choose a biome from the local parameters; warm, dry, relatively flat
   ground can become desert.
4. Apply its surface materials and place associated features, such as cacti.
   Biome rules can also control ambience and entity spawning.

Minecraft's Caves & Cliffs Part II changed biome selection to account for
height, allowing cave biomes below surface biomes. Terrain shape and biome
identity can vary together without each biome prescribing one fixed shape. [3]

# Example

This is an illustrative pipeline, not Minecraft's source code:

```text
climate = sample_fields(world_seed, world_position)
solid = terrain_density(climate, world_position) > 0
biome = choose_biome(climate, world_position.y)
material = surface_rule(biome, solid, world_position)
```

# Trade-offs

- Smooth inputs still need authored classification rules; arbitrary
  thresholds can create abrupt ecological boundaries.
- Test shared borders and multiple heights, not just a top-down preview.
- Unity, Unreal, and Godot noise APIs are building blocks; this page does
  not identify a built-in equivalent of Minecraft's biome-selection rules.

# See also

- [Perlin Noise Terrain](perlin-noise-terrain.md) - generating the underlying continuous fields.
- [Voxel Terrain](voxel-terrain.md) - representing terrain with vertical layers and caves.
- [Procedural Dungeon Generation](procedural-dungeon-generation.md) - a different way to combine authored structure with randomness.

# Citations

1. [마인크래프트에서 자연 환경을 자동 생성하는 방법? — 저세상개발자, 2026](https://www.youtube.com/shorts/3W1tKXhbiEk) - original Korean auto-captions captured and verified on 2026-09-26; the older layered region map, fractal terrain, and volumetric cave distinction.
2. [Biome JSON and Overview — Microsoft / Minecraft Creator, 2026](https://learn.microsoft.com/en-us/minecraft/creator/documents/biomes/biomeoverview?view=minecraft-bedrock-stable) - verified primary explanation of shared noise inputs, terrain, biome selection, and feature placement.
3. [Caves & Cliffs Part II: The Features — Mojang Studios, 2021](https://www.minecraft.net/en-us/article/caves---cliffs-part-ii-the-features) - the 1.18 separation of terrain shape from fixed biome shapes.
