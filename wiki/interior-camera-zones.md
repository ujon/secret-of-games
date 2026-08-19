---
type: Technique
title: Interior Camera Zones
description: Give rooms camera-specific rules — shorter boom, constrained angle, roof and floor visibility — and blend them at portals instead of forcing one outdoor rig everywhere.
tags: [design, camera, interiors, level-design]
dimensions: [3d]
status: stable
model: gpt-5
timestamp: 2026-08-19T16:19:36Z
---

# Problem

An outdoor follow camera assumes empty space behind and above the player.
Inside a room, that same distance lands beyond a wall or ceiling, while
reactive collision keeps pumping the lens in and out at doors. A top-down
camera has the opposite problem: the roof and higher floors are valid
geometry but hide the active room.

# Technique

Make interior state explicit and let spatial relationships select an authored
camera policy.

1. **Author a zone per camera-relevant space.** A room, tunnel, stairwell,
   or floor carries a camera profile: spring-arm length, tracking-target
   height, FOV, vertical angle limits, left/right shoulder offset, and
   whether manual orbit is allowed.
2. **Track subject space and lens space separately.** At a doorway they can
   be on opposite sides. Record directed portal crossings and travel
   direction, then let an authored transfer rule decide which space owns the
   committed camera profile; one overlapping trigger cannot represent every
   subject/lens combination or the transition direction.
3. **Plan a valid transition.** Blend compatible parameters only when the
   intermediate poses can be swept safely. Otherwise follow a portal rail,
   use an intermediate shot, cut, or synchronize an occluder reveal. Check
   collision on every sampled pose. When camera orientation changes, blend
   or temporarily retain the previous control reference so "forward" does
   not reverse under the player.
4. **Give architectural visibility its own focus.** Depending on the genre,
   this may be the player, selected unit, cursor-targeted room, or lens space.
   Hide the focused room's roof; in a multi-storey building, the policy may
   render the selected floor and those below while fading floors above. When
   the same portal event changes camera and visibility, synchronize their
   transitions; otherwise give visibility its own timing. Do not assume both
   share one owner. Keep exterior walls that still describe the building
   footprint.
5. **Give zones priority and hysteresis.** A crawlspace can override a room,
   which overrides the outdoor default. An exit margin or short delay stops
   rapid mode changes while standing in a threshold.
6. **Keep collision safety active.** The zone chooses a shot that should fit;
   the spring arm still handles furniture, doors, and unexpected moving
   blockers.

This is proactive camera design: collision is the safety net, not the tool
that discovers every room's intended composition at runtime.

# Examples

```text
profiles = {
    outdoor: {distance: 4.5, vertical_angle: [-25, 55]},
    room:    {distance: 2.2, vertical_angle: [-10, 35]},
    tunnel:  {distance: 1.2, vertical_angle: [  0, 20], orbit: limited}
}

state = camera_states[camera.id]
state.subject_space = outdoor
state.lens_space = outdoor
state.committed_space = outdoor
state.current_profile = profiles.outdoor
state.target_profile = profiles.outdoor

on_portal_crossed(view, actor, portal, from_space, to_space):
    state = camera_states[view.camera.id]
    if actor == view.subject:
        state.subject_space = to_space
    elif actor == view.camera_lens:
        state.lens_space = to_space
    else:
        return

    direction = portal.direction(from_space, to_space)
    candidate_space = portal.choose_policy_space(
        state.subject_space, state.lens_space, direction)
    state.pending = {space: candidate_space, portal: portal, since: now}
    update_camera_policy(view, now)  # also called each view update or by timer

update_camera_policy(view, now):
    state = camera_states[view.camera.id]
    if state.pending == none or not state.hysteresis.ready(
            state.pending, state.subject_space, state.lens_space, now):
        return

    if state.pending.space == state.committed_space:
        state.pending = none
        return

    state.committed_space = state.pending.space
    state.target_profile = highest_priority_profile(state.committed_space)
    view.camera.plan_transition(
        from               = view.camera.sampled_profile,
        to                 = state.target_profile,
        validate_each_pose = world.sweep_camera,
        fallback           = state.pending.portal.transition_fallback
    )
    state.pending = none

on_camera_transition_completed(view):
    state = camera_states[view.camera.id]
    state.current_profile = state.target_profile

# Visibility owns a separate per-view source, target, timer, and progress.
vis = visibility_states[camera.id]
next_focus, focus_cause = choose_visibility_focus(game_state)
if next_focus != vis.target:
    vis.retarget(from = vis.sampled_policy,
                 to = next_focus,
                 duration = visibility_blend_time,
                 cause = focus_cause)
    if focus_cause == camera.transition.cause:
        vis.align_duration(camera.transition.remaining_time)
visibility.for_view(camera.id).apply(vis.sample(dt))

# Validate every transition sample; collision remains the last safety stage.
requested = camera.sample_transition()
camera.pose = resolve_camera_collision(requested)
```

# Trade-offs

- **Trigger-only detection is ambiguous at doors and windows** — model
  portals and remember the last committed room, especially when the camera
  crosses before the character.
- **Abrupt rig changes alter steering** — preserve screen-side continuity,
  blend slowly enough to read, and avoid crossing the player during held
  directional input.
- **Valid endpoints do not imply a valid path** — a parameter blend can pass
  through a doorframe or ceiling. Test intermediate poses and provide a rail,
  intermediate shot, cut, or reveal fallback rather than relying on a late
  collision clamp to rescue the transition.
- **Roof hiding can expose unfinished world shells** — interior art, sky,
  shadows, reflections, and audio must tolerate the roof's visual absence.
- **Multi-floor rules need a clear owner** — player floor, selected unit,
  cursor-targeted room, and camera height can disagree. Pick one according
  to genre and show the active floor in UI.
- **Per-room authoring costs content time** — derive defaults from room size
  and reserve hand-tuned profiles for exceptions, but provide a debug view
  for overlapping zones and priorities.
- **Multiplayer requires per-view visibility** — globally hiding a roof for
  one split-screen player may reveal a room to another.

# See also

- [Camera Framing and Look-Ahead](camera-framing-lookahead.md) - authored camera ownership and shot composition.
- [Camera Collision and Obstacle Avoidance](camera-collision-avoidance.md) - the safety pass retained inside every zone.
- [Occluder Reveal Effects](occluder-reveal-effects.md) - local wall, roof, and upper-floor rendering choices.
- [Frustum Culling](frustum-culling.md) - performance visibility, which is separate from gameplay cutaways.

# Citations

1. [Fundamentals of Real-Time Camera Design — Mark Haigh-Hutchinson, GDC, 2005](https://media.gdcvault.com/gdc05/slides/GD_Haigh-Hutchinson_FundamentalsReal-TimeCameraDesign2.pdf) - designer-scripted areas, confined-space overrides, priorities, and the need to validate camera interpolation against the environment.
2. [Creating an Emotionally Engaging Camera in Tomb Raider — Remi Lacoste, GDC, 2013](https://media.gdcvault.com/gdc2013/slides/822486GDC13_Creating_an_emotionally_engaging_camera_in_Tomb_Raider.pdf) - level- and state-triggered camera systems plus continuity rules when switching shots.
3. [Developer Diary #1 (Part 2) — Signal Space Lab, 2022](https://steamcommunity.com/games/1546080/announcements/detail/5639086788851821347) - *Every Day We Fight*'s cursor-proximity room detection, player-selected building elevation, and removal of floors above that selection.
4. [Camera control and transitions — Unity Technologies, 2026](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/concept-camera-control-transitions.html) - priority-based virtual cameras and smooth transitions between camera states.
