---
type: Technique
title: Hair Cards
description: Project many hair strands onto textured mesh strips and allocate geometry by visibility to render detailed hairstyles affordably.
tags: [graphics, optimization, hair, rendering]
dimensions: [3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:39:22Z
---

# Problem

Rendering every hair as its own strand can be expensive. A single solid
hair shell is cheaper but loses gaps, wisps, and the layered silhouette.

# Technique

**Represent groups of hairs with textured strips of mesh.** Author a
groom, project the strands onto textures, and arrange the resulting hair
cards around the head. The mesh describes the large shapes; its texture
describes the individual hairs. More cards improve coverage and depth
while increasing rendering and authoring costs. [2]

The short describes attaching cards to an animation skeleton so joint
motion bends the hair. It highlights stiff-looking long-hair motion and
cards intersecting the body as problems this approach must address. [1]

Allocate detail by what remains visible, following Epic's card groups: [3]

| Layer | Useful allocation |
| --- | --- |
| Scalp coverage | Broad cards with inexpensive geometry and reused textures |
| Middle layers | Enough curvature to establish the hairstyle's volume |
| Outer surface | Most of the shape and texture detail |
| Flyaway hairs | Sparse fine strips to break up the silhouette |

For distant **levels of detail (LODs)**, reduce triangles per card or
generate fewer cards. Epic's generator supports both approaches; retaining
existing cards can reuse their textures. [3]

The alternative shown in the short is **strand hair**, which represents
individual curves for a finer silhouette and more flexible motion. It
still needs a suitable simulation budget; switching representation alone
does not solve the long-hair problem. [1, 2]

# Trade-offs

- Cards group hairs into surfaces, so fine strand separation and motion
  are approximate. High-quality card authoring can take substantial time.
- A cheaper render representation does not solve long-hair collisions.
  Motion still needs an animation or simulation system.
- Adding cards indefinitely erodes the performance benefit; inspect the
  visible shape at the intended camera distance. [2, 3]

# Engine support

Unreal's dedicated **Hair** shading model arrived in 4.11. Its later
**Hair Card Generator** plugin, introduced experimentally in 5.4, converts
grooms to cards and LODs. These are distinct version milestones; textured
meshes alone are not the generator. [4, 5]

Unity introduced HDRP's **Hair Master Node** with 2019.1. The HDRP hair
material uses layered cards; this milestone dates its dedicated shader,
not the ability to draw textured card meshes in earlier versions. [6, 7]

# See also

- [Guide Hair Simulation](guide-hair-simulation.md) - reduce simulated hairs independently of the render representation.
- [Level of Detail](level-of-detail.md) - reduce detail as the object shrinks on screen.
- [Normal Mapping](normal-mapping.md) - add lighting detail to simple meshes.

# Citations

1. [게임사가 긴 머리 캐릭터를 싫어하는 이유? — 저세상개발자, 2026](https://www.youtube.com/shorts/ZiQo1jKDRvY) - Korean auto-captions checked on 2026-09-26; layered cards, joint-driven motion, long-hair stiffness and body intersections, and the strand-hair comparison.
2. [Frostbite Hair Rendering and Simulation - Part 2 — Jon Valdes and Robin Taillandier / Electronic Arts, 2019](https://www.ea.com/frostbite/amp/news/frostbite-hair-rendering-and-simulation-2) - verified card projection workflow and cards-versus-strands trade-offs.
3. [Creating Hair Cards and LODs using Hair Card Generator — Epic Games, accessed 2026](https://dev.epicgames.com/documentation/unreal-engine/creating-hair-cards-and-lods-using-hair-card-generator) - card groups, visibility budgets, and LOD generation.
4. [Unreal Engine 4.11 Released! — Alexander Paschall / Epic Games, 2016](https://www.unrealengine.com/blog/unreal-engine-4-11-released) - introduction of the Hair shading model.
5. [Hair Card Generator — Johan Lithvall, accessed 2026](https://lithvall.artstation.com/projects/n03aB4) - the tool's design lead identifies its experimental release in Unreal 5.4.
6. [Introducing Unity 2019.1 — Thomas Krogh-Jacobsen / Unity Technologies, 2019](https://unity.com/blog/engine-platform/introducing-unity-2019-1) - announces the new HDRP Hair Master Node.
7. [Hair Master Node — Unity Technologies, HDRP 10.5 documentation, accessed 2026](https://docs.unity3d.com/Packages/com.unity.render-pipelines.high-definition@10.5/manual/Master-Node-Hair.html) - layered hair-card rendering and material workflow.
