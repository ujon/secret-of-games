---
type: Reference
title: PRNG Seed Manipulation
description: Predict a seeded random sequence and its advancement to manipulate encounters or speedrun outcomes in classic games.
tags: [classic, random, prng]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T08:27:22Z
---

# Problem

Many classic games use deterministic generators for random events.
If players can predict the generator's state, they can time actions to
obtain favorable results. [1]

# How it works

A **pseudo-random number generator** starts from a **seed** and produces
a fixed sequence of random-looking numbers; each probability roll
consumes values from that sequence. The same initial state and sequence
of generator calls reproduce the same values; gameplay outcomes also
depend on the surrounding game state. [2, 3]

Players manipulated seeds and the point reached in their sequences:

- **Pokémon Emerald** normally boots with its main RNG state at zero;
  its clock-seeding call is absent in the original game. Regular frame
  updates and other calls advance that state, making carefully repeated
  timing useful. This is timing within a sequence, not seeding from
  elapsed boot time. [2, 3] The Short's fixed-time encounter example
  simplifies the need to reproduce the relevant state and calls. [1]
- **Pokémon Diamond/Pearl** seeded from the console clock plus
  menu-to-save-select timing — seed-search tools told players exactly
  what to set and when to press. [1]
- **Speedruns** — the Short also describes manipulating New Super Mario
  Bros. inputs and startup conditions to reach useful item drops. Seed
  selection and actions that advance the generator are distinct ways to
  influence the eventual result. [1]

# Notes

- Design lesson: choose deliberately whether reproducible randomness is
  part of the experience. Hiding or changing a seed alone is not a
  general guarantee that players cannot predict outcomes.
- Deliberate determinism is also a tool: daily-run roguelikes *publish*
  the seed on purpose.

# See also

- [Pity Timers and PRD](pity-timers-and-prd.md) - designing the distribution players actually experience.
- [Procedural Dungeon Generation](procedural-dungeon-generation.md) - seeds as reproducible level identities.
- [Arbitrary Code Execution in Classic Games](arbitrary-code-execution.md) - the heavier way players owned game memory.

# Citations

1. [고전 게임에서 확률 조작하는 방법 — 저세상개발자, 2025](https://www.youtube.com/shorts/djGVMe4imWw) - original Korean auto-captions checked on 2026-09-26: deterministic sequences (0:09–0:24), Emerald timing (0:24–0:42), Diamond/Pearl startup conditions (0:44–1:00), and speedrun manipulation (1:02–1:16). The code sources below qualify its Emerald simplification.
2. [pokeemerald: src/random.c — pret contributors, accessed 2026](https://github.com/pret/pokeemerald/blob/master/src/random.c) - primary reverse-engineering evidence: zero-initialized RNG state and deterministic state advancement.
3. [pokeemerald: src/main.c — pret contributors, accessed 2026](https://github.com/pret/pokeemerald/blob/master/src/main.c) - original startup lacks the clock-seeding call supplied under `BUGFIX`; `VBlankIntr` advances the generator. New-game and special-mode reseeding mean fixed startup is not a claim that the state stays zero.
