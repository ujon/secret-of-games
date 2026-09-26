---
type: Technique
title: Perceived World Scale
description: Build the feeling of a large world through travel time, distinct districts, and landmark relationships while compressing distances that add little play value.
tags: [design, level-design, exploration]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:38:52Z
---

# Problem

A larger map takes more work to build and more time to cross. Surface area
alone does not specify whether that journey feels rich, varied, or empty.

# Technique

The short describes three complementary ways to change perceived scale: [1]

- **Lengthen the experienced route:** mountains make players detour or
  climb, while hiding what lies beyond the ridge.
- **Contrast enclosure with openness:** emerging from a narrow cave or
  passage into an open plain makes the reveal feel expansive.
- **Increase meaningful density:** put recognizable destinations within
  useful traveling distances instead of filling a larger map with empty
  space.

Design the experienced journey before fixing the map's physical extent.
In Jonathan Dumont's account of *Assassin's Creed: Syndicate*, the team
tested travel distances with its faster transport systems, preserved
important landmark relationships, and compressed intervening distances.
Distinct borough architecture, mood, and street life reinforced local
identity within the condensed city. [2]

A practical application of that approach and path-centered level design: [2, 3]

1. Choose the movement modes and the intended time between destinations.
2. Preserve the landmarks and relationships needed for orientation.
3. Compress repetitive stretches; spend the saved space on meaningful
   changes in activities, scenery, and routes.
4. Playtest the route from the actual camera and at actual movement speed.

# Example

For initial planning, `route length ≈ speed × uninterrupted travel time`.
This is a design estimate: turns, climbing, encounters, and stops increase
the experienced journey without requiring the same increase in map area.

Syndicate retained the Thames and major landmarks as geographic anchors
while shortening distances for navigation. This supports selective
compression, not a universal scale factor for every object. [2]

# Trade-offs

- Repeated travel can expose excessive compression or empty padding.
- Faster movement changes both pacing and streaming requirements.
- Preserve enough consistent landmarks for players to build a mental map;
  arbitrary rearrangement can undermine orientation.

# See also

- [Landmark-Guided Level Design](landmark-guided-level-design.md) - controlling what players see and choose to approach.
- [Gameplay-Scale Architecture](gameplay-scale-architecture.md) - scaling individual spaces for movement and cameras.
- [Camera Framing and Look-Ahead](camera-framing-lookahead.md) - determining how much of the journey is visible.

# Citations

1. [게임의 월드맵은 왜 실제보다 크게 느껴질까? — 저세상개발자, 2026](https://www.youtube.com/shorts/Mo3JFBC_jzk) - original Korean auto-captions captured and verified on 2026-09-26; mountain detours and concealment, enclosed-to-open reveals, and landmark density.
2. [The world design of Assassin's Creed: Syndicate - full transcript — Jonathan Dumont, interviewed by Chris Kerr, 2015](https://www.gamedeveloper.com/design/the-world-design-of-assassin-s-creed-syndicate-full-transcript) - primary account of transport-led world sizing, distinct boroughs, and compressed landmark spacing.
3. [GDC 2001: The Architecture of Level Design — Steve Chen, 2001](https://www.gamedeveloper.com/design/gdc-2001-the-architecture-of-level-design) - the level designer's account of organizing spatial experiences around paths and circulation.
