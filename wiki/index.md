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

- [A* Pathfinding](astar-pathfinding.md) - Find shortest paths on a region graph with Dijkstra, speed it up with a goal-ward heuristic, and switch to flow fields for crowds.
- [Arbitrary Code Execution in Classic Games](arbitrary-code-execution.md) - How corrupted memory turns controller inputs into a programming interface.
- [Billboarding](billboarding.md) - Render flat images that always face the camera — screen-aligned, viewpoint-oriented, or axis-aligned — for cheap 3D presence.
- [Blend Modes](blend-modes.md) - Compose effects with color arithmetic — add for light and glow, multiply for shadow and tint.
- [Camera Smoothing and Deadzone](camera-smoothing-deadzone.md) - Let the camera chase the character lazily — asymptotic averaging plus a no-follow deadzone.
- [Corner Correction](corner-correction.md) - Nudge characters around geometry corners they barely clip so jumps and dashes succeed.
- [Coyote Time and Jump Buffering](coyote-time-jump-buffering.md) - Forgive jump timing in both directions — after leaving a ledge and before landing.
- [Dynamic Difficulty Adjustment](dynamic-difficulty-adjustment.md) - Quietly tune challenge to live performance — adaptive enemies, rubber-band racers, mercy checkpoints.
- [Easing Functions](easing-functions.md) - Shape motion with curves — smoothstep, bounce, ease-in-out — shipped as Bézier approximations.
- [Elo Matchmaking](elo-matchmaking.md) - Predict win probability from rating gaps and transfer points by surprise, to pair players of equal skill.
- [Generous Hitboxes](generous-hitboxes.md) - Bias collision shapes for the player and sell hits with hit-stop.
- [Gerstner Waves](gerstner-waves.md) - Move water-surface points in circles instead of up-down sine motion for sharp, natural crests.
- [Hitscan Shooting](hitscan-shooting.md) - Judge shots with an instant ray fired from the camera, with a muzzle-blocked check.
- [Inverse Kinematics](inverse-kinematics.md) - Animate procedurally by choosing where a foot must land and solving the joint chain backwards.
- [Jump Physics via Euler Integration](jump-physics-euler.md) - Step velocity and position frame by frame with designer-chosen, asymmetric gravity.
- [Lag Compensation](lag-compensation.md) - Judge shots against slightly rewound target positions so players can aim at what they see.
- [Mode 7 Affine Transforms](mode-7-affine.md) - Fake 3D by affine-transforming a 2D tilemap per scanline (Super Mario Kart).
- [Palette-Indexed Graphics](palette-indexed-graphics.md) - Store pixels as small palette indices instead of raw color — 4bpp, swappable palettes.
- [Password Save Systems](password-save-systems.md) - Encode progress into a short code — packed state, salt, checksum — for save-less cartridges.
- [Perlin Noise Terrain](perlin-noise-terrain.md) - Generate natural-looking terrain by sampling layered Perlin noise as a heightmap instead of hand-authoring or using raw randomness.
- [Pity Timers and PRD](pity-timers-and-prd.md) - Bound bad luck — guaranteed drops, shuffle bags, and pseudo-random distribution.
- [Pixel Art Rules](pixel-art-rules.md) - The craft rules of low-resolution art — no double pixels or jaggies, sub-pixel animation, dithering.
- [Platformer Movement Feel](platformer-movement-feel.md) - The Super Mario control recipe — momentum, skid turns, hold-scaled jumps, air control.
- [PRNG Seed Manipulation](prng-seed-manipulation.md) - Classic games' randomness is a seeded sequence — know the seed, know every roll.
- [Procedural Dungeon Generation](procedural-dungeon-generation.md) - Blend authored structure with randomness — guaranteed paths, room templates, Rogue's grid.
- [Raycast Line of Sight](raycast-line-of-sight.md) - Answer "can it see me?" by shooting rays, filtered by distance and view cone first.
- [Risk-Reward Design](risk-reward-design.md) - Pair a safe small-reward option with a dangerous big-reward one so players volunteer for risk.
- [Rollback Netcode](rollback-netcode.md) - Play local inputs instantly and let remote clients skip missed frames, instead of delaying everyone.
- [Systemic Chemistry Engine](systemic-chemistry-engine.md) - Layer a rule-based state engine over physics — elements act on materials — for emergent gameplay.
- [Worley Noise Skies](worley-noise-skies.md) - Fake vast skies with a skybox, then generate realistic clouds by layering Worley noise with Perlin.
- [Z-Targeting Lock-On](z-targeting-lock-on.md) - One button snaps camera and character to an enemy and remaps movement around the target.

## Registry

- [Registry](registry/index.md) - YAML records of ingested sources and per-engine technique support.
- [Dictionary](dictionary.yaml) - Glossary of abbreviations and jargon used across the wiki.

## Meta

- [Repository guide](../README.md) - What this wiki is, how it works, and how to use it.
- [Agent instructions](../AGENTS.md) - Conventions and workflows for the LLM maintainer.
- [Governance and lifecycle](../GOVERNANCE.md) - File roles, page lifecycle states, and staleness policy.
- [Update log](log.md) - Bundle update history.
