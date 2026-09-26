---
type: Technique
title: Input and Output Randomness
description: Place random events before a decision to invite adaptation, or after commitment to create suspense, and give players tools to manage the resulting risk.
tags: [design, probability, game-feel]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:38:52Z
---

# Problem

Randomness can create fresh decisions or overturn an apparently good plan.
The difference depends partly on when the player sees the random result.

# Technique

Classify randomness relative to a particular decision: [1, 2]

| Type | Order | Design effect |
| --- | --- | --- |
| Input randomness | Random event → player observes → player chooses | Produces a situation the player can adapt to. |
| Output randomness | Player chooses → random resolution → outcome | Preserves uncertainty after commitment. |

A drawn card hand is input randomness for the choice of what to play. A
die roll resolving a committed attack is output randomness. The same
outcome can become input for the next decision, so classify the decision
loop rather than declaring an entire game one type. [2]

The short uses *Slay the Spire*'s random card offers, followed by the
player's choice of which card to take, as input randomness. Its output
example is a critical-hit roll in *Fire Emblem* after an attack is chosen.
There may be no further decision before that outcome, but preparation and
displayed probabilities can still inform the earlier choice to attack. [1, 2]

Neither category is automatically good or bad. Output randomness can
create suspense; let preparation change the odds, offer a safer result
the player may keep, and make the resolution legible. These are the
practical options explored by designer Ezra Szanton. [2]

# Example

An illustrative combat choice:

```text
Input:  reveal which tiles will explode; choose where to move.
Output: choose a target; roll whether the attack hits.
Mixed:  reveal a random attack forecast; choose a defense;
        roll a bounded amount of damage.
```

# Trade-offs

- Input randomness can still offer an unwinnable choice; validate the
  generated options.
- Output randomness becomes harder to accept when one failure erases a
  long investment and the player has no way to influence the risk.
- A displayed probability describes uncertainty, not a promise that a
  short sequence will match the average.

# See also

- [Pity Timers and PRD](pity-timers-and-prd.md) - controlling streaks and long-term outcomes.
- [Risk-Reward Design](risk-reward-design.md) - making risk a meaningful choice.
- [PRNG Seed Manipulation](prng-seed-manipulation.md) - the deterministic machinery beneath random events.

# Citations

1. [게임에 좋은 랜덤과 나쁜 랜덤이 있다? — 저세상개발자, 2026](https://www.youtube.com/shorts/vdbjOLEMQSg) - original Korean subtitles captured and verified on 2026-09-26; the card-choice and critical-hit examples, visible dice, and probability disclosure.
2. [Output Randomness: Game Designers should know how to use it. — Ezra Szanton, 2025](https://ezraszanton.substack.com/p/output-randomness-game-designers) - the designer's definitions, examples, mitigation options, and note about the cyclic relationship between input and output randomness.
