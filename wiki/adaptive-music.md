---
type: Technique
title: Adaptive Music
description: Score the game state instead of a timeline — stack instrument layers vertically, re-sequence phrases horizontally, and bridge with stingers so the music turns with the action.
tags: [audio, music, design]
dimensions: [2d, 3d]
status: stable
model: claude-opus-5
timestamp: 2026-08-18T11:40:00Z
---

# Problem

A linear loop cannot know what the player is doing. Play the calm track
through a fight and the music contradicts the screen; cut to the battle
track and the seam announces itself. Either way the score stops being
information the player can act on.

# Technique

**Adaptive music** composes for state transitions rather than for a fixed
running order. Two complementary structures:

**Vertical layering** — one piece, recorded as separable layers, with
events adding and removing them:

1. Start from a sparse base theme.
2. On an event — an enemy noticing the player — add an instrument in a
   *different register*, so it reads as new information rather than as
   the same music louder.
3. Escalate by stacking further layers; combat arrives as percussion on
   top of what was already playing.

*Pikmin 2* layers its cave themes this way: the main theme alone while
exploring, timpani when enemies close in, bass drum and cymbals once the
fight starts. Tension rises without a cut.

**Horizontal re-sequencing** — one timeline, assembled from
interchangeable pieces:

1. After the intro, loop the body as several **phrases** rather than one
   long take.
2. Compose each phrase so it can follow any other, and connect them in
   varying order — the loop stops sounding like a loop.
3. On a state change, play a short transition cue (a **stinger**), then
   enter the new theme, so the switch lands musically instead of on a
   hard cut.

*Octopath Traveler* builds its pre-boss music as a loop designed for this:
whenever the fight actually begins, the jump to the battle theme sounds
intended.

The tooling matters as much as the composition. For *Tears of the
Kingdom*, Nintendo built an editor for graphically wiring how music
transitions — connecting notes — so transitions are designed while the
music is being written, not patched in afterwards. That game also plays
instrumental music *in the game space* like a sound effect, so a
performance echoes off nearby walls.

# Examples

```text
# vertical layering: one transport, N stems, gain per state
stems = {base: 1.0, tension: 0.0, combat_perc: 0.0}
on enemy_alerted:  fade(stems.tension,    1.0, 0.5s)
on combat_started: fade(stems.combat_perc,1.0, 0.25s)
# all stems share one clock — never restart a stem, only fade it

# horizontal re-sequencing: queue the next phrase at the bar line
next = random_choice(phrases - {current})
schedule(next, at = next_bar)
on state_change: schedule(stinger, at = next_beat); schedule(battle_theme, after = stinger)
```

# Trade-offs

- **Authoring cost multiplies** — every layer has to work against every
  combination of the others, and every phrase has to lead anywhere. The
  composer writes more music than the player hears.
- **Switch latency** — quantizing to the next bar keeps the music
  musical but delays the response; quantizing to the beat responds faster
  and risks awkward harmony. Stingers exist to cover the gap.
- **Mix headroom** — stacked layers eat the same headroom; layers need
  to be mixed as a set, not individually.
- **Variety versus memorability** — randomized phrase order fights the
  hook that makes a theme stick.
- **Engine support is uneven** — Godot ships both halves as resources
  (`AudioStreamInteractive` for clip transitions, with a filler clip
  standing in for the stinger, and `AudioStreamSynchronized` for stacked
  layers) since 4.3. Unity and Unreal provide only plumbing — mixer
  snapshots, MetaSounds graphs — so the layering and re-sequencing system
  itself comes from middleware such as FMOD or Wwise, or from an in-house
  tool like the one Nintendo built.

# See also

- [Spatial Audio Physics](spatial-audio-physics.md) - the same audio system's other half, applied to sound effects.
- [Procedural Sound Effects](procedural-sound-effects.md) - runtime assembly applied to effects instead of to the score.
- [Dynamic Difficulty Adjustment](dynamic-difficulty-adjustment.md) - the same instinct in mechanics: read the player's state and respond quietly.
- [Easing Functions](easing-functions.md) - the curves layer fades and crossfades ride on.

# Citations

1. [게임 음악에 사용되는 신기한 전환 기법 — 저세상개발자, 2026](https://www.youtube.com/shorts/WkvlFYUlvns) - the short this page is drawn from, verified against its captions.
2. [Pikmin 2 OST — Bulblax Kingdom Transcription — olimar12345, 2021](https://youtu.be/cci60OjC6yU) - the short's cited source for the layered cave theme.
3. [Tunes of the Kingdom: Evolving Physics and Sounds for 'The Legend of Zelda: Tears of the Kingdom' — GDC, 2024](https://youtu.be/N-dPDsLTrTE) - the transition-authoring tool and music placed in the game space, verified against the talk's captions.
