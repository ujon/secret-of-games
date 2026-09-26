---
type: Technique
title: Guide Hair Simulation
description: Simulate a small set of representative hair curves and interpolate their motion onto the remaining rendered strands.
tags: [physics, animation, optimization, hair]
dimensions: [3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:39:22Z
---

# Problem

A hairstyle may contain far more visible strands than the physics budget
can update individually. Long strands also need enough points to bend and
must interact with the body and neighboring hair. [1–3]

# Technique

**Simulate representative guides and transfer their deformation to the
rendered hairs.** Simulation detail and rendered strand count become
separate controls. [2]

1. Select guide curves that preserve the hairstyle's clumps and flow.
2. Resample guides into a bounded number of simulation points.
3. Advance their motion under gravity, body movement, and external forces,
   then solve bending/stretching constraints and collisions.
4. Interpolate the guide deformation onto associated render strands. [2]

Epic distinguishes guides for the groom's shape from the resampled
guides used by the simulation. Manual guide selection can preserve the
style better than a random subset. Its solver uses body-collision
primitives from the character's physics asset. [2]

# Examples

```text
guides = chooseRepresentativeCurves(groom)
simulationCurves = resample(guides, pointBudget)
simulate(simulationCurves, bodyColliders, forces)
renderCurves = deformFromGuides(groom, simulationCurves)
```

This is one approximation, not a universal description of strand hair.
Frostbite's 2019 research example simulated every strand in its roughly
10,000-strand asset; its long-hair example used more points per strand
than its short-hair example. [3]

# Trade-offs

- Sparse guides can make distinct locks move together or lose the
  intended shape. Guide placement is an authoring decision.
- More points and solver work improve motion at a cost; guide simulation
  does not make collision handling free.
- Reducing simulated strands leaves the cost of rendering the full groom.
  [2, 3]

# Engine support

Unreal Engine introduced its native strand hair workflow in 4.24,
including guide attributes for interpolated hairs and Niagara simulation.
The version marks the initial implementation, not a claim that every
current hair feature existed then. [4]

Unity's separately installed **Demo Team Hair System** supports partial
strand simulation. Its initial public package, `0.9.0-exp.1`, already
transferred guide motion to the other strands; the tagged solver's
`KInterpolate` kernel provides direct implementation evidence. The package
requires Unity 2020.2.0f1 or later and a compute-shader-capable platform.
It was publicly released on 2022-08-10, so the editor requirement is a
compatibility floor, not an editor release date for this feature. [5–7]

# See also

- [Hair Cards](hair-cards.md) - a separate reduction of rendered hair geometry.
- [Inverse Kinematics](inverse-kinematics.md) - another way to constrain connected points rather than author every pose.
- [Level of Detail](level-of-detail.md) - budget detail against the visible result.

# Citations

1. [게임사가 긴 머리 캐릭터를 싫어하는 이유? — 저세상개발자, 2026](https://www.youtube.com/shorts/ZiQo1jKDRvY) - Korean auto-captions checked on 2026-09-26; explains the long-hair motion and collision problem. Guide interpolation is supplementary detail from Epic's linked reference, not explained in the short.
2. [Hair Physics Overview — Epic Games, accessed 2026](https://dev.epicgames.com/documentation/unreal-engine/hair-physics-in-unreal-engine---overview) - verified guide deformation, resampling, and collision workflow.
3. [Frostbite Hair Rendering and Simulation - Part 2 — Jon Valdes and Robin Taillandier / Electronic Arts, 2019](https://www.ea.com/frostbite/amp/news/frostbite-hair-rendering-and-simulation-2) - contrasting per-strand research implementation and point-count costs.
4. [An early look at next-generation real-time hair and fur — Charles de Rousiers, Gaelle Morand, and Michael Forot / Epic Games, 2020](https://www.unrealengine.com/tech-blog/an-early-look-at-next-generation-real-time-hair-and-fur?lang=en-US) - Unreal 4.24 import, guide, rendering, and simulation support.
5. [Package: com.unity.demoteam.hair — Unity Technologies, version 0.9.0-exp.1, 2022](https://github.com/Unity-Technologies/com.unity.demoteam.hair/blob/0.9.0-exp.1/README.md) - initial package requirements, clustering, and partial-strand simulation.
6. [HairSimComputeSolver.compute — Unity Technologies, version 0.9.0-exp.1, 2022](https://github.com/Unity-Technologies/com.unity.demoteam.hair/blob/0.9.0-exp.1/Runtime/HairSimComputeSolver.compute) - guide-indexed deformation in the KInterpolate and KInterpolateNearest kernels.
7. [Demo Team Hair System Changelog — Unity Technologies, accessed 2026](https://github.com/Unity-Technologies/com.unity.demoteam.hair/blob/master/CHANGELOG.md) - dates the initial public 0.9.0-exp.1 release to 2022-08-10.
