---
okf_version: "0.1"
---

# Secret of Games

An LLM wiki of secret game-development techniques, organized as an Open
Knowledge Format bundle. Each technique is one markdown file at the bundle
root — flat, no topic folders — carrying its topic (`graphics`, `ai`,
`physics`, `optimization`, `design`) in its `tags`.

Primary role: OKF bundle map.

## Techniques

Each entry carries the page's `dimensions` (`2d`, `3d`, or both) and its
`tags`, so applicability and topics stay filterable in the flat layout.

| Technique | Description | Dim | Tags |
| --- | --- | --- | --- |
| [A* Pathfinding](astar-pathfinding.md) | Find shortest paths on a region graph with Dijkstra, speed it up with a goal-ward heuristic (A*), and switch to flow fields for crowds. | `2d` `3d` | `ai` `pathfinding` `algorithms` |
| [Arbitrary Code Execution in Classic Games](arbitrary-code-execution.md) | How corrupted memory turns controller inputs into a programming interface — the glitch behind "booting" other games inside classics. | `2d` `3d` | `classic` `exploit` `memory` |
| [Billboarding](billboarding.md) | Render flat images that always face the camera — screen-aligned, viewpoint-oriented, or axis-aligned — for cheap 3D presence. | `3d` | `graphics` `billboard` `rendering` |
| [Blend Modes](blend-modes.md) | Compose effects with color arithmetic — add for light and glow, multiply for shadow and tint, screen and alpha for the rest. | `2d` `3d` | `graphics` `shaders` `blending` |
| [Camera Smoothing and Deadzone](camera-smoothing-deadzone.md) | Let the camera chase the character lazily — asymptotic averaging plus a no-follow deadzone — so motion reads clearly without nausea. | `2d` `3d` | `design` `camera` `game-feel` |
| [Corner Correction](corner-correction.md) | Nudge characters around geometry corners they barely clip so jumps and dashes succeed instead of bonking. | `2d` `3d` | `design` `platformer` `collision` `game-feel` |
| [Coyote Time and Jump Buffering](coyote-time-jump-buffering.md) | Forgive jump timing in both directions — accept jumps shortly after leaving a ledge and queue jumps pressed shortly before landing. | `2d` `3d` | `design` `platformer` `game-feel` `input` |
| [Dynamic Difficulty Adjustment](dynamic-difficulty-adjustment.md) | Quietly tune challenge to live performance — adaptive enemies, rubber-band racers, and mercy checkpoints — without telling the player. | `2d` `3d` | `design` `difficulty` `game-feel` |
| [Easing Functions](easing-functions.md) | Shape motion with curves — smoothstep, smootherstep, bounce, ease-in-out — and ship them as Bézier approximations. | `2d` `3d` | `animation` `math` `easing` |
| [Elo Matchmaking](elo-matchmaking.md) | Predict win probability from rating gaps and transfer points by surprise, so matchmakers can pair players of equal skill. | `2d` `3d` | `design` `matchmaking` `online` `math` |
| [Frustum Culling](frustum-culling.md) | Skip rendering everything outside the camera's view volume by testing bounding volumes against the frustum planes — automatic in every major engine. | `3d` | `optimization` `graphics` `rendering` `culling` |
| [Generous Hitboxes](generous-hitboxes.md) | Bias collision shapes for the player — generous attack boxes, strict-but-delayed enemy boxes, shrunken dodge boxes — and sell hits with hit-stop. | `2d` `3d` | `design` `collision` `game-feel` |
| [Gerstner Waves](gerstner-waves.md) | Move water-surface points in circles instead of just up-down sine motion to get sharp, natural wave crests. | `3d` | `graphics` `water` `shaders` |
| [Hitscan Shooting](hitscan-shooting.md) | Judge shots with an instant ray instead of a simulated bullet — and fire that ray from the camera, not the muzzle, with a muzzle-blocked check. | `3d` | `design` `fps` `hitscan` |
| [Inverse Kinematics](inverse-kinematics.md) | Animate procedurally by choosing where a foot or hand must land and solving the joint chain backwards to reach it. | `2d` `3d` | `animation` `ik` `procedural` `physics` |
| [Jump Physics via Euler Integration](jump-physics-euler.md) | Step velocity and position frame by frame with designer-chosen gravity — heavier falling than rising — instead of real projectile motion. | `2d` `3d` | `physics` `platformer` `math` |
| [Lag Compensation](lag-compensation.md) | Judge shots against slightly rewound target positions so players can aim at what they actually see despite network delay. | `2d` `3d` | `netcode` `fps` `multiplayer` |
| [Level of Detail](level-of-detail.md) | Swap meshes for progressively simpler versions as they shrink on screen, ending in a billboard — spending triangles only where the eye can see them. | `3d` | `optimization` `graphics` `rendering` `lod` |
| [Mode 7 Affine Transforms](mode-7-affine.md) | Fake 3D by affine-transforming a 2D tilemap per scanline — the Super Famicom trick behind Mario Kart's flat "tracks". | `2d` | `graphics` `classic` `affine` |
| [Object Pooling](object-pooling.md) | Pre-allocate reusable objects and acquire/release them instead of creating and destroying, trading a little held memory for zero allocation spikes. | `2d` `3d` | `optimization` `memory` `performance` |
| [Palette-Indexed Graphics](palette-indexed-graphics.md) | Store pixels as small palette indices instead of raw color — 4 bits per pixel, swappable palettes, and the source of retro color identity. | `2d` | `optimization` `classic` `graphics` |
| [Password Save Systems](password-save-systems.md) | Encode progress into a short code — packed state, a random salt, and a checksum — so cartridges without save memory could still "save". | `2d` `3d` | `classic` `saves` `encoding` |
| [Perlin Noise Terrain](perlin-noise-terrain.md) | Generate natural-looking terrain by sampling layered Perlin noise as a heightmap instead of hand-authoring or using raw randomness. | `2d` `3d` | `graphics` `procedural-generation` `noise` `terrain` |
| [Pity Timers and PRD](pity-timers-and-prd.md) | Bound bad luck — guarantee drops after enough misses, shuffle outcomes in bags, or bend per-try odds with pseudo-random distribution. | `2d` `3d` | `design` `probability` `gacha` |
| [Pixel Art Rules](pixel-art-rules.md) | The craft rules of low-resolution art — no double pixels or jaggies, sub-pixel animation, selective outlines, and dithering. | `2d` | `graphics` `pixel-art` `classic` |
| [Platformer Movement Feel](platformer-movement-feel.md) | The Super Mario control recipe — momentum, skid turns, hold-scaled jumps, early-release fast fall, and air control. | `2d` `3d` | `design` `platformer` `game-feel` |
| [PRNG Seed Manipulation](prng-seed-manipulation.md) | Classic games' randomness is a seeded sequence — know the seed, know every roll — which players exploited for shinies and speedruns. | `2d` `3d` | `classic` `random` `prng` |
| [Procedural Dungeon Generation](procedural-dungeon-generation.md) | Blend authored structure with randomness — guaranteed paths, room templates, graph growth, and Rogue's original grid-and-maze recipe. | `2d` `3d` | `design` `procedural-generation` `roguelike` |
| [Raycast Line of Sight](raycast-line-of-sight.md) | Answer "can it see me?" by shooting rays — filtered by distance and view cone first — and reuse the same probe for rendering and level logic. | `2d` `3d` | `ai` `raycasting` `visibility` |
| [Risk-Reward Design](risk-reward-design.md) | Pair a safe small-reward option with a dangerous big-reward one so players volunteer for risk and feel the thrill of the gamble. | `2d` `3d` | `design` `mechanics` `psychology` |
| [Rollback Netcode](rollback-netcode.md) | Play local inputs instantly and let remote clients skip or fast-forward missed frames, instead of delaying everyone until inputs arrive. | `2d` `3d` | `netcode` `fighting` `multiplayer` |
| [Systemic Chemistry Engine](systemic-chemistry-engine.md) | Layer a rule-based state engine over the physics engine — elements act on materials under a few global laws — to get emergent gameplay (BotW). | `2d` `3d` | `design` `systemic` `engine` |
| [Worley Noise Skies](worley-noise-skies.md) | Fake vast skies with a skybox, then generate realistic clouds by layering Worley noise with Perlin noise. | `3d` | `graphics` `noise` `sky` `clouds` |
| [Z-Targeting Lock-On](z-targeting-lock-on.md) | One button snaps camera and character to an enemy, remaps movement around the target, and a UI companion teaches the whole system. | `3d` | `design` `camera` `combat` `classic` |


## Registry

- [Registry](registry/index.md) - Per-engine technique support, by version, with doc links.
- [Dictionary](dictionary.yaml) - Glossary of abbreviations and jargon used across the wiki.

## Meta

- [Repository guide](../README.md) - What this wiki is, how it works, and how to use it.
- [Agent instructions](../AGENTS.md) - Conventions and workflows for the LLM maintainer.
- [Governance and lifecycle](../GOVERNANCE.md) - File roles, page lifecycle states, and staleness policy.
- [Update log](log.md) - Bundle update history.
