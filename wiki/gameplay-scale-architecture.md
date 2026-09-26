---
type: Technique
title: Gameplay-Scale Architecture
description: Set doorways, corridors, and ceilings from character and camera clearance, then preserve believable scale with consistent proportions and reference objects.
tags: [design, level-design, camera, collision]
dimensions: [3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:38:52Z
---

# Problem

A room copied at real dimensions may feel cramped through a game camera.
Its doorway must accommodate a moving collision shape and often a
following camera, not just the character's visible body.

# Technique

Establish **level metrics**: tested dimensions for doors, corridors,
ceilings, furniture gaps, and movement actions. Aki Määttä describes this
as part of *Max Payne*'s production rules, including allowing furniture
and room geometry to use different scales when that improves play. [2]

Developer interviews by Leon Hurley identify camera framing, field of
view, collision capsules, and passage clearance as reasons for larger
doors. They also describe scale drift when gameplay layouts and art
production are poorly coordinated. [3]

The short adds a control consideration: a narrow doorway requires more
precise alignment from a controller. It compares wider passages and
stairs with more restrained furniture scaling, which helps the character
retain a believable size. Its rough room-size comparison is an example,
not a rule that every third-person room should be doubled. [1]

Apply those findings during a **graybox** pass:

1. Test the actual character controller and gameplay camera in simple rooms.
2. Enlarge the necessary opening or maneuvering space; avoid scaling every
   prop indiscriminately.
3. Test diagonal entry, turning, combat movement, and camera transitions.
4. Carry approved dimensions into reusable building pieces, then retest
   after artists add trim and furniture.

# Example

An opening wider than the character's collision capsule can still fail
when an offset camera crosses the frame. Solve the camera path as well as
the body's path. Cinematic framing may reveal oversizing that is unobtrusive
during play, so inspect both views. [3]

# Trade-offs

- Excessively large openings can weaken intimacy or make characters look small.
- Tight spaces may be intentional; use local camera rules where expansion
  would damage the intended mood.
- Door dimensions are project-specific, not a universal engine constant.

# See also

- [Camera Collision and Obstacle Avoidance](camera-collision-avoidance.md) - runtime camera clearance.
- [Interior Camera Zones](interior-camera-zones.md) - camera rules for constrained rooms.
- [Perceived World Scale](perceived-world-scale.md) - selective scaling at the whole-world level.

# Citations

1. [게임 속 문이 현실보다 거대한 이유는? — 저세상개발자, 2026](https://www.youtube.com/shorts/ncXQqHiFjHQ) - original Korean auto-captions captured and verified on 2026-09-26; controller alignment, camera and capsule clearance, and selective scaling.
2. [GDC 2002: Realistic Level Design in Max Payne — Aki Määttä, 2002](https://www.gamedeveloper.com/design/gdc-2002-realistic-level-design-in-i-max-payne-i-) - the level designer's account of minimum dimensions, modular construction, and selective scaling.
3. [Why are the doors so big in video games? Some developers explain — Leon Hurley, 2021](https://www.gamesradar.com/why-are-the-doors-so-big-in-video-games-some-developers-explain/) - original interviews with developers about camera and capsule clearance, cinematic scale, and coordination between design and art.
