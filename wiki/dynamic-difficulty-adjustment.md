---
type: Technique
title: Dynamic Difficulty Adjustment
description: Quietly tune challenge to live performance — adaptive enemies, rubber-band racers, and mercy checkpoints — without telling the player.
tags: [design, difficulty, game-feel]
dimensions: [2d, 3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

One fixed difficulty bores experts and walls out strugglers, and both
quit. Difficulty menus only half-help: players pick badly, and skill
changes during play.

# Technique

Measure performance and adjust in real time, invisibly:

- **Adaptive difficulty** — Resident Evil 2 tunes enemy strength to the
  player's level on the fly, keeping players in flow (never bored, never
  stuck).
- **Rubber banding** — Mario Kart slows CPU karts and deals better items
  to trailing players; when the player leads big, a designated "rival"
  CPU ignores course rules and speeds unnaturally to keep pressure on.
- **Mercy assists** — Crash Bandicoot slows obstacles and spawns extra
  checkpoints/items after repeated deaths on the same stage.

# Trade-offs

- **Detection breeds resentment** — skilled players who notice the game
  "cheating" (rival karts, fake pressure) call it unfair; subtlety is the
  whole game.
- Adjusting *down* is safer than adjusting *up*: players forgive help
  they didn't notice, not difficulty spikes they didn't earn.

# See also

- [Adaptive Music](adaptive-music.md) - the same read-the-player instinct, applied to the score instead of the rules.
- [Elo Matchmaking](elo-matchmaking.md) - multiplayer's version: pick fairer opponents instead of bending the rules.
- [Risk-Reward Design](risk-reward-design.md) - letting players choose their own difficulty moment to moment.

# Citations

1. [플레이어에 접대하는 게임의 난이도 조절 — 저세상개발자, 2026](https://www.youtube.com/shorts/kkhqAHTcu5I) - the short this page is drawn from.
