---
type: Technique
title: Landmark-Guided Level Design
description: Route players without instructions — a legible main path ending in a landmark visible from far off, baited side paths, and pinch points that merge the branches back.
tags: [design, level-design, exploration]
dimensions: [2d, 3d]
status: stable
model: claude-opus-5
timestamp: 2026-08-18T11:40:00Z
---

# Problem

An open map with nothing to aim at leaves players wandering, and the
usual patch — a waypoint marker — does the designer's job for them: the
player follows an arrow and stops reading the world. The map itself has
to say where to go.

# Technique

**Give the main route a destination you can see from outside it.** Design
a path whose direction is obvious on sight, and put a **landmark** at the
end of it that is legible from far away. The player then navigates by
that landmark instead of by instructions.

*Breath of the Wild* makes its landmarks self-announcing: stables trail
smoke from a chimney, towers glow. They are also placed so that following
a road *runs into them* — spotting one from a distance and arriving are
the same action.

**Bait the side routes.** Alternate paths get their own lures — treasure,
or a monster strong enough to be interesting. *Super Mario Odyssey* uses
Power Moons: visible from almost anywhere, and collecting the ones you can
see walks you along the detour the designer laid out.

**Merge the branches at pinch points.** Every branch multiplies what has
to be built, balanced, and tested, so the paths are made to recombine.
Odyssey's Bowser's Kingdom is a chain of islands where crossing to the
next one runs through a single connection, so each island's branching
narrows back to one path before the next island opens up.

The pattern, in order:

1. One readable main route, terminating in a visible landmark.
2. Optional routes, each with its own visible reward.
3. A pinch point that collects every route before the next section.

# Examples

```text
Landmark test — stand anywhere in the region and ask:
  • Is at least one landmark visible from here?          → orientation
  • Does it read as reachable (not just scenery)?         → intention
  • Does following the obvious path arrive at it?         → payoff

Region graph the designer actually maintains:
  start ──main──▶ landmark ──┐
     └──side (treasure)──────┼──▶ pinch ──▶ next region
     └──side (strong enemy)──┘
```

# Trade-offs

- **Landmarks compete** — put too many in one sightline and none of them
  reads as a destination; density has to be authored, not maximized.
- **Pinch points can feel like railroading** if the funnel is visible as
  a funnel. Hide the merge inside a traversal beat (a climb, a crossing)
  rather than a corridor.
- **A lure the player can't cash yet backfires** — visible treasure
  behind a locked ability teaches distrust of the whole signposting
  system unless the block is legible too.
- **Visibility is a rendering budget item** — a landmark only works if it
  survives draw distance, LOD, and fog at the range where it is supposed
  to be spotted. Distant-landmark visibility is a technical requirement,
  not just an art one.

# See also

- [Perceived World Scale](perceived-world-scale.md)

- [Camera Framing and Look-Ahead](camera-framing-lookahead.md) - the camera's half of the same job: pointing attention without words.
- [Risk-Reward Design](risk-reward-design.md) - what makes a baited side route worth taking.
- [Procedural Dungeon Generation](procedural-dungeon-generation.md) - keeping this structure when the layout isn't hand-placed.
- [Level of Detail](level-of-detail.md) - why a landmark stays visible from across the map.

# Citations

1. [플레이어의 행동을 조종하는 게임 속 맵 설계 — 저세상개발자, 2026](https://www.youtube.com/shorts/tQDBuXB6Juo) - the short this page is drawn from, verified against its captions.
2. [Zelda: Breath of the Wild — CEDEC 2017 English Summary](https://www.scribd.com/document/361160173/Zelda-BotW-CEDEC-2017-English-Summary) - the short's cited source for BotW's landmark placement.
