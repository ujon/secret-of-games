---
type: Reference
title: PRNG Seed Manipulation
description: Classic games' randomness is a seeded sequence — know the seed, know every roll — which players exploited for shinies and speedruns.
tags: [classic, random, prng]
dimensions: [2d, 3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

(As knowledge about how game randomness really works:) classic hardware
has no true randomness. Everything "random" is computed — so how random
is it, and what happens when players figure that out?

# How it works

A **pseudo-random number generator** starts from a **seed** and produces
a fixed sequence of random-looking numbers; each probability roll
consumes the next one. Same seed → same sequence → same outcomes.

Players attacked the seed:

- **Pokémon Emerald** seeded from time-since-boot: encountering a shiny
  Rayquaza 3.3 s after power-on means *every* boot + 3.3 s gives that
  same shiny. Timer in hand, "random" shinies became farmable.
- **Pokémon Diamond/Pearl** seeded from the console clock plus
  menu-to-save-select timing — seed-search tools told players exactly
  what to set and when to press.
- **Speedruns** — New Super Mario Bros.' RNG derives from console ID,
  boot time, and double-jump counts; runners adjust those to force the
  useful item drops.

Later Pokémon games hardened their seeding, and clock-based shiny
hunting passed into history.

# Notes

- Design lesson: seed from entropy players can't control (or mix many
  sources), and reseed on meaningful events — determinism you didn't
  choose becomes a player-facing feature.
- Deliberate determinism is also a tool: daily-run roguelikes *publish*
  the seed on purpose.

# See also

- [Pity Timers and PRD](pity-timers-and-prd.md) - designing the distribution players actually experience.
- [Procedural Dungeon Generation](procedural-dungeon-generation.md) - seeds as reproducible level identities.
- [Arbitrary Code Execution in Classic Games](arbitrary-code-execution.md) - the heavier way players owned game memory.

# Citations

1. [고전 게임에서 확률 조작하는 방법 — 저세상개발자, 2025](https://www.youtube.com/shorts/djGVMe4imWw) - the short this page is drawn from.
