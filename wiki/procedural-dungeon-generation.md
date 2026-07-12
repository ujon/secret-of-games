---
type: Technique
title: Procedural Dungeon Generation
description: Blend authored structure with randomness — guaranteed paths, room templates, graph growth, and Rogue's original grid-and-maze recipe.
tags: [design, procedural-generation, roguelike]
status: draft
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Fully hand-built levels exhaust their surprise; fully random levels are
unfair or unsolvable. Roguelikes need endless variety with *guaranteed*
completability and controlled difficulty.

# Technique

Ship the structure, randomize the flesh:

- **Rogue (the origin, 1980)** — split the map into a 3×3 grid, drop one
  room per chosen cell, then place stairs, letter-coded monsters, and
  items. Some rooms become mazes instead, carved by random walk with
  backtracking: wander until stuck, back up, branch — the walked path *is*
  the maze.
- **Spelunky** — generate a guaranteed main path first (completable with
  no items), classify rooms by which sides they connect, fill each from
  hand-made templates of that type, then vary with random obstacles and
  horizontal mirroring. Random every run, even in difficulty.
- **Dead Cells** — per-zone fixed layout graphs assembled from
  hand-authored tile sets: entrance/exit first, then special rooms, then
  randomized tiles for the rest.
- **The Binding of Isaac** — grow rooms outward from the start room;
  dead ends become boss/treasure rooms, and the best-connected spot
  becomes the secret room.

# Trade-offs

- Template-based variety is bounded by the template library — authoring
  moves from levels to *pieces*, it doesn't disappear.
- Guarantees (main path, key-before-lock) must be generated first-class;
  validating randomness after the fact rejects too many maps.

# See also

- [Perlin Noise Terrain](perlin-noise-terrain.md) - continuous procedural generation, for terrain rather than rooms.
- [PRNG Seed Manipulation](prng-seed-manipulation.md) - why a dungeon's randomness is reproducible from its seed.

# Citations

1. [랜덤 생성 던전을 게임이 만드는 방법 — 저세상개발자](https://www.youtube.com/shorts/_0qjqwigjLc) - Spelunky, Dead Cells, and Isaac generation ([source record](registry/sources/yt-short-dungeon-generation.yaml)).
2. [전설로 남은 게임의 랜덤맵 생성 — 저세상개발자](https://www.youtube.com/shorts/vVVyFUzs-HM) - Rogue's grid and maze algorithm ([source record](registry/sources/yt-short-rogue-map-gen.yaml)).
