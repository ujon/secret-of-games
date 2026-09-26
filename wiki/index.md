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
| [Adaptive Music](adaptive-music.md) | Score the game state instead of a timeline — stack instrument layers vertically, re-sequence phrases horizontally, and bridge with stingers so the music turns with the action. | `2d` `3d` | `audio` `music` `design` |
| [Alternating Save Slots](alternating-save-slots.md) | Alternate between two stored copies so an interrupted write leaves an older valid save available for recovery. | `2d` `3d` | `design` `saves` `reliability` |
| [Arbitrary Code Execution in Classic Games](arbitrary-code-execution.md) | How corrupted memory turns controller inputs into a programming interface — the glitch behind "booting" other games inside classics. | `2d` `3d` | `classic` `exploit` `memory` |
| [Billboarding](billboarding.md) | Render flat images that always face the camera — screen-aligned, viewpoint-oriented, or axis-aligned — for cheap 3D presence. | `3d` | `graphics` `billboard` `rendering` |
| [Biome Generation from Noise Fields](biome-generation.md) | Sample shared climate noise to choose coherent biomes and terrain, then add the materials, vegetation, and gameplay rules that make each region distinct. | `2d` `3d` | `design` `procedural-generation` `noise` `terrain` |
| [Blend Modes](blend-modes.md) | Compose effects with color arithmetic — add for light and glow, multiply for shadow and tint, screen and alpha for the rest. | `2d` `3d` | `graphics` `shaders` `blending` |
| [Camera Collision and Obstacle Avoidance](camera-collision-avoidance.md) | Sweep a camera-sized volume toward each desired shot, retract immediately before geometry, and release slowly to prevent penetration and reduce corner or doorway pops. | `3d` | `design` `camera` `collision` `physics` |
| [Camera Framing and Look-Ahead](camera-framing-lookahead.md) | Push the camera ahead of the character — further the faster they move — and lock or release it deliberately, so the frame shows what the player needs and withholds what they haven't earned. | `2d` `3d` | `design` `camera` `game-feel` |
| [Camera Smoothing and Deadzone](camera-smoothing-deadzone.md) | Let the camera chase the character lazily — asymptotic averaging plus a no-follow deadzone — so motion reads clearly without nausea. | `2d` `3d` | `design` `camera` `game-feel` |
| [Corner Correction](corner-correction.md) | Nudge characters around geometry corners they barely clip so jumps and dashes succeed instead of bonking. | `2d` `3d` | `design` `platformer` `collision` `game-feel` |
| [Coyote Time and Jump Buffering](coyote-time-jump-buffering.md) | Forgive jump timing in both directions — accept jumps shortly after leaving a ledge and queue jumps pressed shortly before landing. | `2d` `3d` | `design` `platformer` `game-feel` `input` |
| [Cubemap Reflections](cubemap-reflections.md) | Capture the surroundings at a probe and reuse that directional image for inexpensive reflections on nearby objects. | `3d` | `graphics` `rendering` `reflections` |
| [Destruction State Swaps](destruction-state-swaps.md) | Replace an intact object with an authored damaged state and conceal the transition with collapse animation, impact marks, dust, and debris. | `2d` `3d` | `graphics` `design` `optimization` `destruction` |
| [Dot Products for Direction Tests](dot-product-tests.md) | Compare normalized directions with a dot product to reject targets outside a view cone and compute simple diffuse lighting without calculating angles. | `2d` `3d` | `ai` `graphics` `math` `visibility` |
| [Dynamic Difficulty Adjustment](dynamic-difficulty-adjustment.md) | Quietly tune challenge to live performance — adaptive enemies, rubber-band racers, and mercy checkpoints — without telling the player. | `2d` `3d` | `design` `difficulty` `game-feel` |
| [Easing Functions](easing-functions.md) | Remap animation progress with timing curves, using formulas or authored Bézier curves to shape acceleration and settling. | `2d` `3d` | `graphics` `animation` `math` `easing` |
| [Elo Matchmaking](elo-matchmaking.md) | Predict win probability from rating gaps and transfer points by surprise, so matchmakers can pair players of equal skill. | `2d` `3d` | `design` `matchmaking` `online` `math` |
| [Flipbook Particles](flipbook-particles.md) | Bake an effect into a texture sheet and animate its frames on particles to reuse detailed smoke or fire without running the original simulation. | `2d` `3d` | `graphics` `optimization` `particles` `animation` |
| [Frustum Culling](frustum-culling.md) | Skip rendering everything outside the camera's view volume by testing bounding volumes against the frustum planes — automatic in every major engine. | `3d` | `optimization` `graphics` `rendering` `culling` |
| [Gameplay-Scale Architecture](gameplay-scale-architecture.md) | Set doorways, corridors, and ceilings from character and camera clearance, then preserve believable scale with consistent proportions and reference objects. | `3d` | `design` `level-design` `camera` `collision` |
| [Generous Hitboxes](generous-hitboxes.md) | Bias collision shapes for the player — generous attack boxes, strict-but-delayed enemy boxes, shrunken dodge boxes — and sell hits with hit-stop. | `2d` `3d` | `design` `collision` `game-feel` |
| [Gerstner Waves](gerstner-waves.md) | Move water-surface points in circles instead of just up-down sine motion to get sharp, natural wave crests. | `3d` | `graphics` `water` `shaders` |
| [GPU Instancing](gpu-instancing.md) | Draw many copies of one mesh with shared material state and per-instance data to reduce submission overhead for grass and other repeated scenery. | `3d` | `optimization` `graphics` `rendering` `vegetation` |
| [Guide Hair Simulation](guide-hair-simulation.md) | Simulate a small set of representative hair curves and interpolate their motion onto the remaining rendered strands. | `3d` | `physics` `animation` `optimization` `hair` |
| [Hair Cards](hair-cards.md) | Project many hair strands onto textured mesh strips and allocate geometry by visibility to render detailed hairstyles affordably. | `3d` | `graphics` `optimization` `hair` `rendering` |
| [Hitscan Shooting](hitscan-shooting.md) | Judge shots with an instant ray instead of a simulated bullet — and fire that ray from the camera, not the muzzle, with a muzzle-blocked check. | `3d` | `design` `fps` `hitscan` |
| [Input and Output Randomness](input-output-randomness.md) | Place random events before a decision to invite adaptation, or after commitment to create suspense, and give players tools to manage the resulting risk. | `2d` `3d` | `design` `probability` `game-feel` |
| [Interior Camera Zones](interior-camera-zones.md) | Give rooms camera-specific rules — shorter boom, constrained angle, roof and floor visibility — and blend them at portals instead of forcing one outdoor rig everywhere. | `3d` | `design` `camera` `interiors` `level-design` |
| [Interior Mapping](interior-mapping.md) | Trace the view ray into a virtual room inside a window shader to show perspective-correct interiors without room meshes. | `3d` | `graphics` `shaders` `optimization` `interiors` |
| [Inverse Kinematics](inverse-kinematics.md) | Animate procedurally by choosing where a foot or hand must land and solving the joint chain backwards to reach it. | `2d` `3d` | `animation` `ik` `procedural` `physics` |
| [Jump Physics via Euler Integration](jump-physics-euler.md) | Step velocity and position frame by frame with designer-chosen gravity — heavier falling than rising — instead of real projectile motion. | `2d` `3d` | `physics` `platformer` `math` |
| [Lag Compensation](lag-compensation.md) | Judge shots against slightly rewound target positions so players can aim at what they actually see despite network delay. | `2d` `3d` | `design` `netcode` `fps` `multiplayer` |
| [Landmark-Guided Level Design](landmark-guided-level-design.md) | Route players without instructions — a legible main path ending in a landmark visible from far off, baited side paths, and pinch points that merge the branches back. | `2d` `3d` | `design` `level-design` `exploration` |
| [Level of Detail](level-of-detail.md) | Swap meshes for progressively simpler versions as they shrink on screen, ending in a billboard — spending triangles only where the eye can see them. | `3d` | `optimization` `graphics` `rendering` `lod` |
| [Mode 7 Affine Transforms](mode-7-affine.md) | Fake 3D by affine-transforming a 2D tilemap per scanline — the Super Famicom trick behind Mario Kart's flat "tracks". | `2d` | `graphics` `classic` `affine` |
| [Normal Mapping](normal-mapping.md) | Store a surface direction per texel so light varies across a flat surface — relief on cheap polygons, and volume on 2D sprites that would otherwise light up like paper. | `2d` `3d` | `graphics` `shaders` `lighting` |
| [Object Pooling](object-pooling.md) | Reuse objects through acquire and release operations to reduce repeated allocation, trading retained memory for less creation and destruction work. | `2d` `3d` | `optimization` `memory` `performance` |
| [Occluder Reveal Effects](occluder-reveal-effects.md) | Keep important subjects visible by fading, dithering, or cutting away blockers, or by outlining the subjects through them. | `2d` `3d` | `graphics` `camera` `visibility` `shaders` |
| [Occlusion Culling](occlusion-culling.md) | Skip rendering objects fully hidden behind other geometry even when they lie inside the camera's view. | `3d` | `optimization` `graphics` `rendering` `culling` |
| [Palette-Indexed Graphics](palette-indexed-graphics.md) | Store pixels as small palette indices instead of raw color, reducing image data and enabling palette swaps. | `2d` | `optimization` `classic` `graphics` |
| [Password Save Systems](password-save-systems.md) | Encode progress into a short code — packed state, a random salt, and a checksum — so cartridges without save memory could still "save". | `2d` `3d` | `design` `classic` `saves` `encoding` |
| [Perceived World Scale](perceived-world-scale.md) | Build the feeling of a large world through travel time, distinct districts, and landmark relationships while compressing distances that add little play value. | `2d` `3d` | `design` `level-design` `exploration` |
| [Perlin Noise Terrain](perlin-noise-terrain.md) | Generate natural-looking terrain by sampling layered Perlin noise as a heightmap instead of hand-authoring or using raw randomness. | `2d` `3d` | `graphics` `procedural-generation` `noise` `terrain` |
| [Pity Timers and PRD](pity-timers-and-prd.md) | Bound bad luck — guarantee drops after enough misses, shuffle outcomes in bags, or bend per-try odds with pseudo-random distribution. | `2d` `3d` | `design` `probability` `gacha` |
| [Pixel Art Rules](pixel-art-rules.md) | The craft rules of low-resolution art — no double pixels or jaggies, sub-pixel animation, selective outlines, and dithering. | `2d` | `graphics` `pixel-art` `classic` |
| [Planar Reflections](planar-reflections.md) | Render the scene from a camera reflected across a plane to produce coherent mirrors and flat-water reflections. | `3d` | `graphics` `rendering` `reflections` |
| [Platformer Movement Feel](platformer-movement-feel.md) | The Super Mario control recipe — momentum, skid turns, hold-scaled jumps, earlier descent after release, and air control. | `2d` `3d` | `design` `platformer` `game-feel` |
| [Prefractured Destruction](prefractured-destruction.md) | Prepare fragments and their connections ahead of time, then release selected pieces and add inexpensive debris when an impact occurs. | `3d` | `physics` `graphics` `optimization` `destruction` |
| [PRNG Seed Manipulation](prng-seed-manipulation.md) | Predict a seeded random sequence and its advancement to manipulate encounters or speedrun outcomes in classic games. | `2d` `3d` | `classic` `random` `prng` |
| [Procedural Dungeon Generation](procedural-dungeon-generation.md) | Blend authored structure with randomness — guaranteed paths, room templates, graph growth, and Rogue's original grid-and-maze recipe. | `2d` `3d` | `design` `procedural-generation` `roguelike` |
| [Procedural Sound Effects](procedural-sound-effects.md) | Stop authoring a recording per object and author the rules instead — assemble sound at runtime from component layers chosen by size, material, and motion, so things nobody designed still sound right. | `2d` `3d` | `audio` `sound-design` `physics` `systemic` |
| [Push-Forward Combat](push-forward-combat.md) | Make deliberate aggression restore combat resources, then shape enemies and arenas so advancing remains a readable tactical choice. | `2d` `3d` | `design` `combat` `game-feel` |
| [Raycast Line of Sight](raycast-line-of-sight.md) | Answer "can it see me?" by shooting rays — filtered by distance and view cone first — and reuse the same probe for rendering and level logic. | `2d` `3d` | `ai` `raycasting` `visibility` |
| [Risk-Reward Design](risk-reward-design.md) | Pair a safe small-reward option with a dangerous big-reward one so players volunteer for risk and feel the thrill of the gamble. | `2d` `3d` | `design` `mechanics` `psychology` |
| [Rollback Netcode](rollback-netcode.md) | Predict missing remote inputs, then restore and re-simulate saved game state when late inputs disagree, keeping local controls responsive. | `2d` `3d` | `design` `netcode` `fighting` `multiplayer` |
| [Save-State Serialization](save-state-serialization.md) | Store the persistent data needed to reconstruct a game session, then recreate objects and restore their relationships when loading. | `2d` `3d` | `design` `saves` `serialization` |
| [Screen-Space Reflections](screen-space-reflections.md) | Trace reflection rays through the camera's depth buffer to reuse visible scene colors, with a fallback for information missing from the screen. | `3d` | `graphics` `rendering` `reflections` |
| [Spatial Audio Physics](spatial-audio-physics.md) | Make sound obey physics — distance rolloff plus air absorption, Doppler shift, material-driven reverb, and path-searched occlusion — so players read distance, direction, and space by ear. | `2d` `3d` | `physics` `audio` `sound-design` |
| [Systemic Chemistry Engine](systemic-chemistry-engine.md) | Layer a rule-based state engine over the physics engine — elements act on materials under a few global laws — to get emergent gameplay (BotW). | `2d` `3d` | `design` `systemic` `engine` |
| [Volumetric Smoke](volumetric-smoke.md) | Store smoke density in a three-dimensional field so its shape, lighting, and response to the scene can change at runtime. | `3d` | `graphics` `physics` `particles` `volumetrics` |
| [Voxel Terrain](voxel-terrain.md) | Store the world as 3D pixels — cubic blocks or per-voxel densities resolved into smooth surfaces — so players can build and destroy terrain that authored meshes could never change. | `3d` | `graphics` `voxel` `terrain` `procedural-generation` |
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
