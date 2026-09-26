---
type: Technique
title: Volumetric Smoke
description: Store smoke density in a three-dimensional field so its shape, lighting, and response to the scene can change at runtime.
tags: [graphics, physics, particles, volumetrics]
dimensions: [3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:39:22Z
---

# Problem

A recorded smoke animation supplies appearance but has no internal volume
for an obstacle, projectile, or explosion to modify. Interactive smoke
needs spatial state that can change independently of the viewing angle.

# Technique

**Keep smoke as a three-dimensional density field and render through it.**
Volumetric rendering describes the representation; it does not require a
full fluid-flow simulation. The short makes this distinction explicitly:
its Counter-Strike 2 example responds to the scene but does not drift in
the wind like freely flowing smoke. [1]

One implementation with fluid simulation is Epic's grid-based gas system.
It stores temperature and velocity alongside density to control how the
field evolves. Its workflow is: [3]

1. Allocate a bounded grid around the effect and inject its initial smoke.
2. Update the field over time, including motion, dissipation, and the
   obstacles supported by the simulation.
3. Render by sampling through the volume along the view direction,
   accumulating the smoke's appearance rather than selecting a flat image.
4. Tune simulation resolution and rendering step size independently. [3]

# Examples

Valve's **Counter-Strike 2: Responsive Smokes** describes smoke grenades
as dynamic volumes that interact with the environment and react to
lighting, gunfire, and explosions. This establishes the gameplay result;
it does not establish that Valve uses Unreal's solver or every step of
the grid implementation above. [2]

The short also contrasts view-facing smoke panels with a shared volume:
players can observe the same spatial smoke shape from different positions,
and bullets can briefly open sightlines through it. Shared shape does not
mean every camera produces an identical image. [1]

Unreal's Niagara Fluids provides a documented implementation path for
grid-based smoke. It debuted in 5.0; its reference templates expose
density, temperature, velocity, collision inputs, and sampling controls.
Custom gameplay interaction still requires project logic. [3, 4]

# Trade-offs

- Finer 3D grids increase memory and simulation work; smaller render steps
  add sampling work. Profile both costs. [3]
- Design implication: a visual volume is not automatically an
  authoritative visibility rule for enemies or networked players. Define
  how gameplay queries it.
- Bake a noninteractive background effect to a flipbook when full runtime
  simulation contributes little to the result. [3, 5]

# See also

- [Flipbook Particles](flipbook-particles.md) - reuse captured motion for cheaper background effects.
- [Voxel Terrain](voxel-terrain.md) - another use of a three-dimensional spatial field.
- [Raycast Line of Sight](raycast-line-of-sight.md) - distinguish gameplay visibility from the rendered image.
- [Worley Noise Skies](worley-noise-skies.md) - shape cloud detail with procedural noise.

# Citations

1. [게임 속 연막탄이 가짜 연출인 이유? — 저세상개발자, 2026](https://www.youtube.com/shorts/9JsRRFL8G0c) - Korean auto-captions checked on 2026-09-26; billboard-versus-volume comparison, shared smoke shape, bullet interaction, and distinction from fluid-flow simulation.
2. [Counter-Strike 2: Responsive Smokes — Valve, 2023](https://www.youtube.com/watch?v=_y9MpNcAitQ) - verified official description of dynamic volumes and environmental, lighting, gunfire, and explosion responses.
3. [Niagara Fluids Reference Guide — Epic Games, accessed 2026](https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-fluids-reference-in-unreal-engine) - verified grid fields, collision inputs, density rendering, and sampling controls.
4. [Unreal Engine 5.1 Release Notes — Epic Games, 2022](https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-5.1-release-notes?application_version=5.1) - identifies 5.0 as the introduction of Niagara Fluids rendering.
5. [Niagara Fluids in Unreal Engine — Epic Games, accessed 2026](https://dev.epicgames.com/documentation/unreal-engine/niagara-fluids-in-unreal-engine) - simulation cost and the flipbook-baking alternative.
