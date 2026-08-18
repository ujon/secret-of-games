---
type: Technique
title: Procedural Sound Effects
description: Stop authoring a recording per object and author the rules instead — assemble sound at runtime from component layers chosen by size, material, and motion, so things nobody designed still sound right.
tags: [audio, sound-design, physics, systemic]
dimensions: [2d, 3d]
status: stable
model: claude-opus-5
timestamp: 2026-08-18T13:05:00Z
---

# Problem

A game that lets players build things cannot ship a recording for each
one. *Tears of the Kingdom*'s Ultrahand produces contraptions the
developers never saw, so there is no `wagon.wav` to play and no code that
knows a wagon was just built. The same wall arrives in any
physics-heavy game long before that: enough material pairs, speeds, and
collision shapes that a sample library plus per-object trigger scripts
stops scaling.

# Technique

Author the system that makes sound, not the sounds.

1. **Decompose the object into what is actually making noise.** A wagon
   is not a wagon sound — it is wheels rolling, plus the short repeated
   shaking of a wooden bed, plus the chains holding that bed together. A
   paddle boat is water displaced by rotating wheels, plus wooden boards
   fighting the water's resistance. *Tears of the Kingdom* used no
   recording of a real wagon at all.
2. **Drive the layers from the physics that already exists.** A system
   watches how the rigid bodies under the physics engine are going to
   move and picks the sound from their **size and material**.
3. **Require no bespoke playback code.** Because the rule reads physics
   rather than object identity, things sound right without an
   implementation of their own: a Flux Construct's geometric shuffling, a
   hook sliding down a rail, and suspension bridges — which are nothing
   but physics, with no suspension-bridge program anywhere — creak and
   wobble on their own.
4. **Hand the result to the global acoustic rules.** Generated sounds get
   the same assigned loudness as authored ones and are then placed in
   space by the usual distance, absorption, reverb, and occlusion pass.

The mapping is the design work:

| Physics input | Drives |
| --- | --- |
| Impact impulse | Which layer fires, its gain, its brightness |
| Contact velocity | Rolling/scraping layer's pitch, or grain rate |
| Material pair | Sample set or resonance model |
| Size and mass | Pitch and decay time |
| Contact continuity | One-shot versus looped layer |

Layering recorded components is one end of a spectrum; **synthesizing**
them is the other — modal synthesis for impacts (a handful of damped
resonances scaled by material and size) and granular synthesis for
continuous contact, where grain rate follows speed and pressure. Engines
supply the machinery at both ends: Unreal's MetaSounds is a DSP graph
with runtime parameter inputs, while Unity and Godot let a script write
PCM frames directly.

Nintendo's own summary of the result is the clearest statement of the
technique: rather than creating every sound in the game, the sound team
created a system that *makes* it sound that way — which the director
described as, in effect, a physics engine for sound.

# Examples

```text
# One contact, assembled from rules — no per-object audio asset
on_contact(a, b, impulse, rel_velocity):
    mat  = material_pair(a, b)              # wood-on-stone, metal-on-water, …
    size = min(a.bounds, b.bounds)

    if impulse > IMPACT_THRESHOLD:          # threshold, or resting bodies machine-gun
        play_oneshot(mat.impact,
                     gain  = curve(impulse),
                     pitch = pitch_for(size))

    if rel_velocity > SLIDE_THRESHOLD:      # continuous contact → looped layer
        loop = ensure_loop(a, b, mat.scrape)
        loop.pitch = map(rel_velocity, 0, v_max, 0.8, 1.6)
        loop.gain  = map(rel_velocity, 0, v_max, -30, -6)
    else:
        release_loop(a, b)                  # hysteresis, not an instant cut

# A built contraption needs no new rule: each part reports its own contacts
```

# Trade-offs

- **Voice count explodes** — a player-built machine is many parts, and
  each part wants its own layer. Voice limiting, prioritization by
  loudness, and pooled players are prerequisites, not polish.
- **You tune curves, not takes** — one wrong mapping mis-sounds the whole
  game at once, and the failures are hard to reproduce. ToTK's designers
  reported high-quality sounds they had no memory of creating; that is the
  upside and the QA problem in a single sentence.
- **Physics jitter becomes audio jitter** — resting bodies generate
  micro-collisions that machine-gun an impact layer. Impulse thresholds,
  debouncing, and hysteresis on loop start/stop are mandatory.
- **It needs data the game may not have** — material tags, mass, and
  contact impulses have to be authored on every asset. Retrofitting that
  metadata is usually the real cost, not the audio code.
- **Hero sounds stay hand-made** — a boss roar or a signature weapon is
  still authored; procedural systems are for the long tail that authoring
  cannot reach.

# See also

- [Spatial Audio Physics](spatial-audio-physics.md) - where a generated sound goes once it exists.
- [Systemic Chemistry Engine](systemic-chemistry-engine.md) - the same doctrine on the gameplay side: rules that make events, not scripted events.
- [Adaptive Music](adaptive-music.md) - runtime assembly applied to the score instead of to effects.
- [Object Pooling](object-pooling.md) - how the voices for all those layers stay affordable.

# Citations

1. [Tunes of the Kingdom: Evolving Physics and Sounds for 'The Legend of Zelda: Tears of the Kingdom' — GDC, 2024](https://youtu.be/N-dPDsLTrTE) - the talk this page is drawn from, verified against its captions: the wagon and paddle-boat decompositions, size-and-material-driven playback, and the bridges and Flux Constructs sounding without dedicated implementation.
2. [Unreal — MetaSounds: The Next Generation Sound Sources](https://dev.epicgames.com/documentation/en-us/unreal-engine/metasounds-the-next-generation-sound-sources-in-unreal-engine) - the engine's procedural DSP graph with runtime parameter inputs.
3. [Unity — AudioClip.Create](https://docs.unity3d.com/ScriptReference/AudioClip.Create.html) - script-side PCM generation via a reader callback.
4. [Godot — AudioStreamGenerator](https://docs.godotengine.org/en/stable/classes/class_audiostreamgenerator.html) - pushing generated frames from script.
