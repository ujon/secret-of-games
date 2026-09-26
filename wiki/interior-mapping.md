---
type: Technique
title: Interior Mapping
description: Trace the view ray into a virtual room inside a window shader to show perspective-correct interiors without room meshes.
tags: [graphics, shaders, optimization, interiors]
dimensions: [3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:39:22Z
---

# Problem

A city needs depth behind thousands of windows, but modeling every room
adds geometry and authoring work for spaces the player cannot enter.
A room painted directly onto the facade looks flat as the camera moves.

# Technique

**Intersect the view ray with an imaginary room inside the shader.**
The facade remains the only mesh; the calculated intersection supplies
the texture coordinates for the apparent interior. [2, 3]

1. Use the facade position to select a room in a repeating building grid.
2. Transform the ray from the camera through the window into the room's
   coordinate system, considering only the ray beyond the window.
3. Test the wall, floor, or ceiling planes in the ray's forward direction.
   An axis-aligned room requires at most three candidate planes.
4. Select the nearest forward intersection and sample that surface's
   texture. A room-texture variant can use the room index as its seed.
5. Apply the result through the window portion of the facade material. [2, 3]

The original algorithm uses direct plane intersections, rather than an
iterative march through a volume. The ray changes with the viewpoint,
giving the virtual walls parallax. [2, 3]

# Examples

The short illustrates the trick with **Marvel's Spider-Man**: apparent
furniture can remain flat against room surfaces, and a convincing window
view need not correspond to a physically consistent interior layout. [1]

Conceptual pseudocode for the plane-intersection method; ray and room
bounds share one coordinate system, and zero direction components are
skipped: [2, 3]

```text
for each axis:
    boundary = rayDirection[axis] > 0 ? roomMax[axis] : roomMin[axis]
    t[axis] = (boundary - windowPosition[axis]) / rayDirection[axis]
surface = axisWithSmallestPositive(t)
hit = windowPosition + minPositive(t) * rayDirection
color = sampleRoomSurface(surface, hit, roomId)
```

Unreal Engine added the **Interior Cubemaps** material function in 4.14,
mapping a cubemap onto a virtual box. This is an engine implementation of
the illusion, not a requirement that every implementation use a cubemap. [4]

# Trade-offs

- The virtual room has no gameplay collision or traversable interior.
- Basic furniture is painted onto room surfaces; extra interior layers
  improve depth at additional shading cost.
- Independently mapped windows can disagree around building corners.
  Close inspection exposes the approximation.
- Savings in mesh complexity do not eliminate per-pixel shader work. [2, 3]

# See also

- [Normal Mapping](normal-mapping.md) - encode surface direction rather than virtual room depth.
- [Billboarding](billboarding.md) - another way to imply geometry using images.
- [Interior Camera Zones](interior-camera-zones.md) - camera behavior for interiors the player actually enters.

# Citations

1. [게임 창문 속 방이 전부 가짜인 이유 — 저세상개발자, 2026](https://www.youtube.com/shorts/-gaC6ZtDqDc) - Korean auto-captions checked on 2026-09-26; virtual room surfaces, flat furniture, viewpoint-dependent sampling, and the Spider-Man example.
2. [Interior Mapping: rendering real rooms without geometry — Joost van Dongen, 2018](https://www.gamedeveloper.com/programming/interior-mapping-rendering-real-rooms-without-geometry) - verified author explanation of plane intersections, texture selection, and limitations.
3. [Interior Mapping: A new technique for rendering realistic buildings — Joost van Dongen, CGI, 2008](https://www.proun-game.com/Oogst3D/CODING/InteriorMapping/InteriorMapping.pdf) - original shader method and extensions.
4. [Unreal Engine 4.14 Released! — Alexander Paschall / Epic Games, 2016](https://www.unrealengine.com/blog/unreal-engine-4-14-released) - introduction of Interior Cubemaps under Materials.
