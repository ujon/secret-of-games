---
type: Technique
title: A* Pathfinding
description: Find shortest paths on a region graph with Dijkstra, speed it up with a goal-ward heuristic (A*), and switch to flow fields for crowds.
tags: [ai, pathfinding, algorithms]
dimensions: [2d, 3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Monsters must route around obstacles on their own. Checking every
possible route is hopeless; the map needs a structure that makes
"shortest path" computable fast — and stays cheap when hundreds of units
path at once.

# Technique

1. **Graph the world** — partition terrain into regions (grid cells,
   waypoints, or navmesh polygons) and connect neighbors into a graph.
2. **Dijkstra** — expand outward from the start, always processing the
   region with the lowest travel cost so far; when the goal is reached,
   the shortest route is known.
3. **A\*** — additionally estimate each region's remaining distance to
   the goal *ignoring obstacles* (the heuristic) and prioritize by
   `cost so far + estimate`. The search leans toward the goal and visits
   far fewer regions. StarCraft pathed with A* — recomputed per move
   order, which is why spam-clicking re-routed units faster.
4. **Flow fields for crowds** — when too many agents path to one goal,
   precompute each region's best direction toward it once, and let every
   unit simply follow the arrows.

# Trade-offs

- A*'s speed depends on the heuristic: it must never overestimate
  (admissible) or paths stop being optimal.
- Flow fields shine for one shared goal; many distinct goals mean many
  fields — pick per use case.

# See also

- [Raycast Line of Sight](raycast-line-of-sight.md) - the perception check that usually triggers the chase.

# Citations

1. [게임 속 길찾기에 숨겨져 있는 수학 이론 — 저세상개발자, 2026](https://www.youtube.com/shorts/qMGONAZGIqE) - the short this page is drawn from.
