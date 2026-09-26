---
type: Technique
title: Push-Forward Combat
description: Make deliberate aggression restore combat resources, then shape enemies and arenas so advancing remains a readable tactical choice.
tags: [design, combat, game-feel]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:38:52Z
---

# Problem

When hiding is the safest way to recover, players may repeatedly disengage
from combat even when the intended experience is fast and aggressive.

# Technique

Tie recovery to actions that sustain the intended combat loop.

| Mechanism | Verified example | Incentive |
| --- | --- | --- |
| Recover recent damage through timely attacks | Bloodborne's Regain system [1, 2] | Counterattack before the recoverable health expires. |
| Produce resources through combat actions | DOOM Eternal: Glory Kills for health, Flame Belch for armor, chainsaw for ammunition [3] | Re-engage using the tool that supplies the missing resource. |

Resource rewards need supporting encounter design. DOOM's directors
describe reducing enemies that rush the player simultaneously, letting
other enemies hold positions, and designing geometry that breaks lines of
sight. The player can then choose engagements while continuing to move. [4]

## Pressure to keep moving

The short also describes a separate mechanism: make waiting progressively
less safe. It gives escalating threats and *PUBG*'s shrinking safe area as
examples. Those rules concentrate players or punish indefinite camping;
they do not themselves provide the resource-recovery loop above. A game
can combine both incentives, but each addresses a different reason to
remain stationary. [1]

# Example

An illustrative recovery rule, not Bloodborne's implementation:

```text
on_damage(amount):
    health -= amount
    recoverable = min(amount, max_health - health)
    recovery_deadline = now + recovery_window

on_successful_counterattack():
    if now < recovery_deadline:
        recovered = min(recovery_per_hit, recoverable, max_health - health)
        health += recovered
        recoverable -= recovered
```

# Trade-offs

- A recovery reward should invite a calculated risk; indiscriminate
  attacking may still cause more damage than it restores.
- If every enemy crowds the player, retreat may remain the only sensible
  response despite the rewards.
- These incentives narrow the supported play style. Tune them to the
  intended experience and test resource shortages across whole encounters.

# See also

- [Risk-Reward Design](risk-reward-design.md) - choosing whether a dangerous recovery opportunity is worthwhile.
- [Generous Hitboxes](generous-hitboxes.md) - making close combat readable and responsive.
- [Raycast Line of Sight](raycast-line-of-sight.md) - evaluating visibility between positions in an arena.

# Citations

1. [겁쟁이를 참교육하는 게임의 전투 설계 — 저세상개발자, 2026](https://www.youtube.com/shorts/IZ0zeYEfqjY) - original Korean auto-captions captured and verified on 2026-09-26; aggression rewards, timely counterattack recovery, and pressure from escalating threats or a shrinking safe area.
2. [Bloodborne on PS4: New Combat Details — Masaaki Yamagiwa, PlayStation.Blog, 2014](https://blog.playstation.com/?p=137340) - official explanation of Regain, its short recovery window, and the continuing need for tactical attacks.
3. [DOOM Eternal – Demon Slaying 101 — id Software, 2020](https://slayersclub.bethesda.net/en-AU/news/doom-eternal-demon-slaying-101) - official health, armor, and ammunition recovery loop.
4. ['Make me think, make me move': New Doom's deceptively simple design — Marty Stratton and Hugo Martin, interviewed by Kris Graft, 2017](https://www.gamedeveloper.com/design/-make-me-think-make-me-move-new-i-doom-i-s-deceptively-simple-design) - primary account of enemy positioning, simultaneous pressure, and arena sightlines.
