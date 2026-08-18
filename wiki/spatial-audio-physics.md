---
type: Technique
title: Spatial Audio Physics
description: Make sound obey physics — distance rolloff plus air absorption, Doppler shift, material-driven reverb, and path-searched occlusion — so players read distance, direction, and space by ear.
tags: [physics, audio, sound-design]
dimensions: [2d, 3d]
status: stable
model: claude-opus-5
timestamp: 2026-08-18T11:40:00Z
---

# Problem

An audio file played back unchanged tells the player nothing. A gunshot
50 m away sounds identical to one at arm's length; a kart closing from
behind sounds like a kart standing still; a cave sounds like an open
field. Turning the volume down with distance is not enough — the *timbre*
has to change too.

# Technique

Model the physical phenomena that act on sound between source and
listener. Five that games implement:

| Phenomenon | Physics | In game |
| --- | --- | --- |
| Distance attenuation | Point-source pressure falls with distance (double the distance, half the pressure) | A rolloff curve on volume |
| **Air absorption** | High frequencies attenuate faster than low, in proportion to distance | A distance-driven low-pass: crisp crack up close, dull thud far away (PUBG's near vs far gunfire) |
| **Doppler shift** | Relative motion compresses or stretches the waveform | Approaching karts pitch up, receding karts pitch down (Mario Kart) |
| **Reverb** | Enclosed surfaces reflect sound back late | Caves and rooms get a tail whose length matches the space (Tears of the Kingdom) |
| **Obstruction / occlusion** | Geometry between source and listener blocks or diffracts the path | Muffled through a wall, silent when fully blocked |

Distance alone is a solved, shallow problem; the craft is in the other
four. *Tears of the Kingdom* is the worked example:

- **Excess attenuation** — with only inverse-distance diffusion, a
  rooster's crow stays audible for ~100 km. Adding frequency-dependent
  air absorption pulls the audible range back to something believable;
  the team tuned which frequencies get filtered and from what distance.
- **Automatic reverb** — hand-tuning reverb parameters per space did not
  scale, so the game collects room capacity (direction and distance to
  nearby walls) plus each wall material's absorption rate and derives the
  parameters from a reverberation-time equation instead.
- **Path-searched occlusion** — the listener sits at the camera, but the
  game searches for a *sound path* from the source to the player
  character, using an informed search over the terrain's voxel grid.
  Stepping behind a wall changes what you hear; so does opening a door,
  because the path itself changed.
- **One rule set, one knob** — every sound is assigned a real loudness,
  and the same acoustic rules then place a quiet heart container and a
  distant storm cloud correctly without per-sound special cases.

A cheaper alternative to filtering, still widely used: author a
close-mic and a distant version of the sound and crossfade them by
distance.

# Examples

```text
# distance: inverse-distance law, in decibels
gain_db = -20 * log10(distance / reference_distance)

# air absorption: cutoff falls as distance grows
cutoff_hz = lerp(20000, 800, clamp(distance / max_distance, 0, 1))

# occlusion: probe the path, then filter rather than mute
if blocked(source, listener):
    apply_low_pass(cutoff_hz = 500)
    gain_db -= 12
```

# Trade-offs

- **Realism fights readability** — competitive shooters deliberately
  under-model absorption and occlusion, because a muffled footstep the
  player cannot localize is worse than an unrealistic clear one.
- **Doppler artifacts** — pitch-shifting looping sources at high relative
  speed warbles; most engines expose a doppler *scale* precisely so it
  can be dialed below reality.
- **Occlusion costs a query per source per update** — ray probes or path
  searches multiply by voice count; budget it, stagger it, and cache it.
- **Listener at the camera, judgment at the character** — the same split
  that creates the head glitch in shooting: what you hear and where you
  stand are not the same point.
- **Reverb needs the space described** — automatic parameters demand
  material and geometry data the level actually carries; without it, you
  are back to hand-placed reverb zones.

# See also

- [Raycast Line of Sight](raycast-line-of-sight.md) - the same visibility probe, reused to decide whether sound is blocked.
- [A* Pathfinding](astar-pathfinding.md) - the informed search that finds a sound's way around geometry.
- [Voxel Terrain](voxel-terrain.md) - the grid Tears of the Kingdom searches those paths through.
- [Procedural Sound Effects](procedural-sound-effects.md) - where the sounds this page places in space can come from in the first place.
- [Adaptive Music](adaptive-music.md) - the score's half of the same audio system.
- [Hitscan Shooting](hitscan-shooting.md) - the camera-versus-character split, on the shooting side.

# Citations

1. [게임 소리를 만드는 신기한 물리 현상들 — 저세상개발자, 2026](https://www.youtube.com/shorts/1q9srGjkpD0) - the short this page is drawn from, verified against its captions.
2. [Tunes of the Kingdom: Evolving Physics and Sounds for 'The Legend of Zelda: Tears of the Kingdom' — GDC, 2024](https://youtu.be/N-dPDsLTrTE) - the short's cited source; air absorption, automatic reverb, and the voxel sound-path search, verified against the talk's captions.
3. [Unity — Audio Source](https://docs.unity3d.com/Manual/class-AudioSource.html) - rolloff, spatial blend, and doppler level.
4. [Unreal — Sound Attenuation](https://dev.epicgames.com/documentation/en-us/unreal-engine/sound-attenuation-in-unreal-engine) - air absorption, occlusion, and reverb send settings.
5. [Godot — AudioStreamPlayer3D](https://docs.godotengine.org/en/stable/classes/class_audiostreamplayer3d.html) - attenuation model, `attenuation_filter_cutoff_hz`, and `doppler_tracking`.
