---
type: Reference
title: Arbitrary Code Execution in Classic Games
description: How corrupted memory turns controller inputs into a programming interface — the glitch behind "booting" other games inside classics.
tags: [classic, exploit, memory]
dimensions: [2d, 3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

(As knowledge, not a technique to ship:) speedrun videos show Super Mario
World cutting to other games' scenes with no cheat device. How can pure
gameplay *reprogram* a cartridge?

# How it works

Classic consoles load **code and data into the same memory** (von
Neumann architecture). The CPU keeps a bookmark of where the running code
is and executes byte after byte — to it, instructions and data are both
just binary.

1. A glitch overwrites memory and the game doesn't notice.
2. The CPU's bookmark wanders into what used to be *data* and executes
   it as instructions.
3. **Controller state is data too** — so from that moment, button
   combinations are code the player is typing. This is arbitrary code
   execution (ACE). [1]

Assembly/C-era games managed memory by hand, so such corruptions were
easy to create. Tool-assisted speedrunners chain them into full payload
injection — in the extreme, robots wired to multiple controllers "type"
entire programs into a running game. [1]

# Notes

- Defense in modern terms: memory-safe languages, bounds checks, and
  code/data separation (NX) — which is why modern ACE is rare and
  console-security-grade when found.
- Related classic-internals pages: password saves and RNG systems fell
  to the same "understand the memory, own the game" mindset.

# See also

- [PRNG Seed Manipulation](prng-seed-manipulation.md) - the gentler cousin: predicting memory instead of rewriting it.
- [Password Save Systems](password-save-systems.md) - game state as bytes the player can hold.

# Citations

1. [게임 컨트롤러로 게임을 즉석에서 재구축하는 방법 — 저세상개발자, 2025](https://www.youtube.com/shorts/uj6016N96JY) - the short this page is drawn from.
