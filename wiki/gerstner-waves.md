---
type: Technique
title: Gerstner Waves
description: Move water-surface points in circles instead of just up-down sine motion to get sharp, natural wave crests.
tags: [graphics, water, shaders]
dimensions: [3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

The entry-level ocean — a sum of sines with varied amplitude and
frequency over a 3D surface (The Wind Waker's stylized sea) — is
convincingly wavy but always *round*: pure vertical displacement cannot
form the sharp crests of real water. [1]

# Technique

**Gerstner waves** displace each surface point in a *circle* — horizontal
sway plus vertical rise — so points bunch at crests (sharpening them) and
spread in troughs. Sum several Gerstner waves of different directions,
wavelengths, and amplitudes for a natural sea. [1]

```text
# one Gerstner wave at position x, time t (simplified 2D section)
X(x, t) = x + Q·A·cos(k·x − ω·t)   # horizontal circular sway
Y(x, t) =     A·sin(k·x − ω·t)     # vertical rise
# Q sharpness, A amplitude, k wavenumber, ω speed; sum many waves
```

# Trade-offs

- **Grid-pattern tiling** — viewed from above, summed regular waves
  betray a checkerboard rhythm; games that skip fixing it get mocked.
  Modern titles break it up with noise and specular/reflection detail.
- Too high a sharpness `Q` makes crest loops self-intersect — clamp it.

# See also

- [Perlin Noise Terrain](perlin-noise-terrain.md) - the standard noise used to break the tiling.
- [Worley Noise Skies](worley-noise-skies.md) - the same "layer simple math into nature" pattern, for clouds.

# Citations

1. [게임 속 물 표현을 하는 수식을 만드는 방법 — 저세상개발자, 2026](https://www.youtube.com/shorts/RFDIq0ZdJ3s) - the short this page is drawn from.
