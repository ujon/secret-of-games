---
type: Technique
title: Occluder Reveal Effects
description: Keep important subjects visible by fading, dithering, or cutting away blockers, or by outlining the subjects through them.
tags: [graphics, camera, visibility, shaders]
dimensions: [2d, 3d]
status: stable
model: gpt-5
timestamp: 2026-08-19T16:19:36Z
---

# Problem

The camera can be in a physically valid position while a wall, roof, tree,
or upper floor hides the player and the space they must interact with.
Moving the camera may break aim, composition, or a tactical overview; hiding
the entire structure may erase the level's shape and leak information.

# Technique

Treat reveal as a visibility response separate from camera collision.
Blocker-altering modes change walls or roofs; an X-ray mode instead changes
how the hidden subject renders, while whole-floor cutaways can come from
authored room state rather than a cast.

1. **Define what must remain visible.** Probe the player's head, torso, feet,
   and any selected target rather than one pivot point. Partial, momentary
   obstruction need not trigger a response.
2. **Collect the relevant blockers between subject and camera.** Use the
   engine's multi-hit or repeated query and include a lens-volume overlap
   test: APIs differ on hit ordering, whether they stop at the first solid
   hit, and whether they report a collider containing the query origin. Map
   triangle/collider hits to logical wall, roof, or foliage sections small
   enough to reveal without deleting a whole building.
3. **Choose a reveal mode that preserves the information the game needs.**

| Mode | What remains readable | Best fit |
| --- | --- | --- |
| Alpha fade | A ghost of the blocking surface and everything behind it | A small number of modular blockers |
| Dithered/masked fade | Depth-tested fragments when implemented as an alpha-clipped, depth-writing pass | Opaque or masked rendering pipelines |
| Local cutaway | A hole around the subject while the wall outline remains | Dense structures and terrain |
| X-ray silhouette | The blocker stays solid; the subject is overlaid through it | Tactical targets and short occlusions |
| Whole-part hide | Clean interior with no roof or upper floors | Modular rooms and fixed/isometric views |

4. **Delay both directions.** Reveal quickly after a meaningful occlusion,
   then restore more slowly and only after the blocker has stayed clear. Ease
   the mask radius or opacity; never toggle it every time a thin pole crosses
   a single probe.
5. **Keep rendering and gameplay separate.** A faded wall normally remains
   solid. If the player must click through it, route selection rays around the
   revealed part or move it off the click-query channel, as *Every Day We
   Fight* does.
6. **Track and render state per camera.** Split-screen cameras may disagree
   about which wall is a blocker; a global material swap reveals information
   to both. Feed a view-specific mask or render pass instead of mutating one
   shared material value.

*Bombernauts* uses a particularly legible but game-specific local cutaway. A
player-to-camera ray activates the effect, the distance from hit to player
controls the hole's eased and clamped radius, and a shader removes wall pixels
only when player and camera lie on opposite sides of an authored planar face.
CPU-generated outline tiles are exempt from the crop, so convex outlines
remain visible and the missing terrain's shape stays readable. Arbitrary
smoothed or normal-mapped surface normals cannot be substituted safely for
those consistent face directions.

In a layered 2D game, the same timing and per-view state can fade foreground
sprites or tilemap layers selected by overlap and draw order; the 3D face-side
test is unnecessary.

# Examples

```text
view = reveal_state[camera.id]  # blocker -> timing, amount, radius
hits_by_blocker = map()

for point in [player.head, player.torso, player.feet]:
    for hit in world.query_all_or_repeat(camera.position, point,
                                         OCCLUDER_MASK):
        hits_by_blocker[hit.logical_occluder].add(hit)

# A ray starting inside a collider may not report it.
for hit in world.overlap(camera.volume, camera.position, OCCLUDER_MASK):
    hits_by_blocker[hit.logical_occluder].add(hit)

for blocker in union(view.keys, hits_by_blocker.keys):
    state = view.get_or_create(blocker)
    blocked = blocker in hits_by_blocker

    if blocked:
        if not state.was_blocked: state.blocked_since = now
        state.last_blocked = now
        contact = closest_contact_or_surface_point(
            subject, hits_by_blocker[blocker])
        state.target_radius = eased_clamp(
            distance(subject, contact), min_radius, max_radius)
        if now - state.blocked_since >= enter_delay: state.target = 1
    elif now - state.last_blocked >= clear_hold:
        state.target = 0

    state.was_blocked = blocked
    rate = reveal_rate if state.target == 1 else restore_rate
    state.amount = damp(state.amount, state.target, rate, dt)
    state.radius = damp(state.radius, state.target_radius, radius_rate, dt)
    if abs(state.amount - state.target) < reveal_epsilon:
        state.amount = state.target
    if abs(state.radius - state.target_radius) < radius_epsilon:
        state.radius = state.target_radius
    render_mask[camera.id][blocker] = {state.amount, state.radius}
    if state.amount == 0 and not blocked:
        view.remove(blocker)
        render_mask[camera.id].remove(blocker)

# Bombernauts-style cutaway for authored planar faces. Preserve outline
# fragments here, or draw the outline in a separate camera-scoped pass.
params = render_mask[camera.id].get(
    fragment.logical_occluder, {amount: 0, radius: 0})
separates = dot(camera - pixel, face_normal) \
          * dot(subject - pixel, face_normal) < 0
inside = inside_cutaway(pixel, subject, params.radius * params.amount)
discard_pixel = separates and inside and not fragment.is_outline
```

# Trade-offs

- **Object-level fading needs object-level authoring** — one renderer for an
  entire castle means one pillar can ghost the castle. Split likely blockers
  or use a local shader mask.
- **Alpha transparency has ordering, lighting, and shadow costs** — an
  alpha-clipped, depth-writing dither can stay in the opaque or masked
  pipeline, but its mask must also be correct in depth, shadow, and motion
  passes and may stipple, shimmer, or ghost under temporal anti-aliasing.
- **A cutaway can hide useful cover geometry** — keep an outline, floor
  footprint, or low wall band so navigation and collision still read.
- **Every reveal mode is a game rule, not just an effect** — a fade, hole,
  hidden floor, or X-ray can expose enemies, loot, or rooms and change stealth
  or competitive balance. Restrict it to information the player is already
  entitled to know.
- **Queries and per-view passes have a budget** — reduce probe count and
  frequency after profiling, share broad-phase work where cameras agree, and
  retire fully restored blocker state.
- **Reveal and camera movement can oscillate against each other** — either
  give one response priority or share the same occlusion timer.
- **Shaders do not solve camera penetration** — pair this with
  [Camera Collision and Obstacle Avoidance](camera-collision-avoidance.md)
  when the lens itself can enter geometry.

# See also

- [Camera Collision and Obstacle Avoidance](camera-collision-avoidance.md) - moving the lens before altering the scene.
- [Interior Camera Zones](interior-camera-zones.md) - hiding roofs and upper floors from authored room state.
- [Blend Modes](blend-modes.md) - the compositing math behind true alpha fades.
- [Raycast Line of Sight](raycast-line-of-sight.md) - the basic blocker query.

# Citations

1. [The Crop Circle Effect in Bombernauts — Tyler Glaiel, Game Developer, 2014](https://www.gamedeveloper.com/programming/the-crop-circle-effect-in-bombernauts) - player/camera face-side tests, ray-triggered cutaway radius, eased masking, and retained terrain outlines.
2. [Developer Diary #1 (Part 2) — Signal Space Lab, 2022](https://steamcommunity.com/games/1546080/announcements/detail/5639086788851821347) - transparent wall modules, click-channel pass-through, and hiding floors above the selected elevation in *Every Day We Fight*.
3. [GDC 2018 Level Design Workshop: An expert roundtable Q&A — Christopher Totten et al., Game Developer, 2018](https://www.gamedeveloper.com/design/gdc-2018-level-design-workshop-an-expert-roundtable-q-a) - Totten's recommendation to fade a blocker or silhouette the player when isometric architecture defeats the camera.
4. [Post Process Materials — Epic Games, 2021](https://dev.epicgames.com/documentation/en-us/unreal-engine/post-process-materials?application_version=4.27) - visualizing occluded objects and drawing outlines with Custom Depth/Stencil in a post-process material.
5. [Cinemachine Changelog — Unity Technologies, 2021–2024](https://github.com/Unity-Technologies/com.unity.cinemachine/blob/69b205115495a374fbba329547ba608cdcfe7847/com.unity.cinemachine/CHANGELOG.md) - the historical 2.7.2 `FadeOutNearbyObjects` shader sample and its removal in 3.1.1; evidence of a custom sample, not current built-in reveal support.
6. [Physics.Raycast — Unity Technologies, 2026](https://docs.unity3d.com/ScriptReference/Physics.Raycast.html) - collision-layer filtering and the limitation that a ray does not report a collider containing its origin.
7. [Using a Multi Line Trace (Raycast) by Channel — Epic Games, 2021](https://dev.epicgames.com/documentation/en-us/unreal-engine/using-a-multi-line-trace-raycast-by-channel?application_version=4.27) - Unreal's multi-hit query stopping after the first blocking hit.
