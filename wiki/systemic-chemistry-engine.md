---
type: Technique
title: Systemic Chemistry Engine
description: Layer a rule-based state engine over the physics engine — elements act on materials under a few global laws — to get emergent gameplay (BotW).
tags: [design, systemic, engine]
dimensions: [2d, 3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Scripted interactions don't scale to an open world: hand-authoring
"fire arrow + wooden shield", "lightning + metal sword", "wind + grass
fire" one by one explodes combinatorially and still misses the pair a
player tries next.

# Technique

Breath of the Wild pairs its physics engine (motion, collision) with a
**chemistry engine** that owns *state*:

- **Elements** — intangibles: fire, water, ice, electricity, wind.
- **Materials** — tangibles: wood, rock, metal, the player.

Three global laws replace per-case scripts:

1. Elements can change a material's state (fire burns wood).
2. Elements can change each other (water douses fire).
3. Materials never change materials directly.

Every object is then just tagged with material/element properties, and
all interactions — cooking, wildfire, conductive shocks — *emerge* from
the same three rules. The team validated the concept with a small
prototype before building the game on it.

# Trade-offs

- Emergence cuts both ways: the same rules that delight players produce
  exploits and sequence breaks; BotW embraces them by design.
- A global rule engine must be tuned globally — nerfing one interaction
  (rain vs fire) shifts every system that touches it.

# See also

- [Risk-Reward Design](risk-reward-design.md) - designing incentives inside such emergent systems.

# Citations

1. [젤다의 전설 야숨을 디자인한 특별한 게임 엔진 — 저세상개발자, 2026](https://www.youtube.com/shorts/1yxDf1WUIBk) - the short this page is drawn from.
