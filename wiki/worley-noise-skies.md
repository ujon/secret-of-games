---
type: Technique
title: Worley Noise Skies
description: Fake vast skies with a skybox, then generate realistic clouds by layering Worley noise with Perlin noise.
tags: [graphics, noise, sky, clouds]
dimensions: [3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Real skies are infinitely far away and full of soft, evolving clouds —
neither of which a game can afford to model. Simple scrolling cloud
textures (Minecraft-style thickened quads) read as stylized, not real.

# Technique

1. **Skybox** — wrap the world in a cube textured with sky imagery.
   Rendered without depth, it never gets closer, so players mistake it for
   distance.
2. **Worley noise for clouds** — scatter random feature points in a grid
   and color every position by the distance to its nearest point. The
   result is a cellular, cauliflower-like pattern that matches cumulus
   cloud structure.
3. **Layer and mix** — overlap several Worley layers of different scales,
   then blend with [Perlin noise](perlin-noise-terrain.md) for wispy
   detail. Animate by scrolling the noise domain over time.

# Trade-offs

- A skybox is only convincing while nothing intersects it — flying too
  "close" to painted clouds breaks the illusion; volumetric clouds fix
  that at real rendering cost.
- Worley evaluation per pixel per frame adds up; games typically bake it
  into 3D textures and scroll those instead.

# See also

- [Perlin Noise Terrain](perlin-noise-terrain.md) - the gradient noise layered with Worley here.

# Citations

1. [게임 하늘을 만드는 신기한 수학 기법 — 저세상개발자, 2026](https://www.youtube.com/shorts/UxTa_8XlJfo) - the short this page is drawn from.
