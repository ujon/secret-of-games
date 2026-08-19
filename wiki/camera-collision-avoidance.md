---
type: Technique
title: Camera Collision and Obstacle Avoidance
description: Sweep a camera-sized volume toward each desired shot, retract immediately before geometry, and release slowly to prevent penetration and reduce corner or doorway pops.
tags: [design, camera, collision, physics]
dimensions: [3d]
status: stable
model: gpt-5
timestamp: 2026-08-19T16:19:36Z
---

# Problem

A follow rig first computes the shot it wants, but that position may be
inside a wall, behind a pillar, or outside the level. A point ray can keep
the camera's center clear while its near-plane corners still cut through
geometry; simply snapping to the first ray hit also produces visible zoom
pops at corners and doorways.

# Technique

Treat the requested shot and the collision-safe shot as separate states.

1. **Compute the desired pose without collision.** Keep this untouched so
   the rig always knows where to return after the obstacle clears.
2. **Sweep from the target pivot to that pose.** Use a sphere, capsule, or a
   convex proxy for the camera's near-plane footprint rather than a
   zero-width ray. Ignore the player, foliage, and other objects that should
   not control the camera through a collision mask.
3. **Stop short of the first blocking surface.** Limit the effective arm
   distance to the hit distance minus a small safety margin without changing
   the desired distance. This spring-arm response keeps the tested
   pivot-to-lens corridor clear; probe important points on the subject
   separately if they all need line of sight.
4. **Try a low-motion alternative before compressing hard.** A more
   expensive solver can test nearby horizontal rotations, heights, or
   same-distance candidates and prefer the one that preserves composition.
   *Kingdoms of Amalur: Reckoning* rotated its collision beam around walls,
   then moved forward for what that rotation could not resolve.
5. **Validate actual lens motion and final overlap.** A shoulder swap,
   rotation, teleport, or alternate candidate can move sideways through
   geometry even when the pivot-to-desired corridor is clear. Overlap-test
   the current pose first because casts may ignore an overlap at their origin.
   Sweep ordinary lateral and outward moves, but cut directly to a validated
   near-side endpoint for a hard inward correction—a sweep starting beyond a
   newly appeared wall would stop on the wrong side. Finally, overlap-test the
   full candidate volume and iteratively repair or fall back. Track the
   achieved pose separately from the requested arm distance.
6. **Use asymmetric timing.** Clamp inward to the safe distance immediately
   so the lens never remains beyond the hit; only the outward return may be
   damped. Release slowly after a small clearance threshold or hold time so
   rough collision meshes do not cause chatter. Any grace period before a
   response applies only to optional line-of-sight reframing, never to
   physical overlap repair.
7. **Override the global rig in spaces that cannot fit it.** A tunnel or
   tiny room should select a shorter authored camera rather than forcing
   the collision solver to fail continuously; see
   [Interior Camera Zones](interior-camera-zones.md).

The production *Kingdoms of Amalur: Reckoning* solver cached nearby collision
points and tested them against a long, thin box called a collision beam. When
a point was already inside the previous beam, it only prevented deeper
penetration. The beam then appeared to "stick" to a wall and pivot around it
instead of alternating left and right in a corner. The article also reports
early experiments with a second, wider predictive volume that could begin
retracting before the camera reached a narrow doorway; it presents that idea
as future work, not a confirmed shipped behavior.

# Examples

```text
desired = follow_rig.pose_without_collision(target)

# Casts may ignore an overlap at their origin, so repair and revalidate the
# current oriented volume before asking whether it can travel to the next one.
blockers = {mask: CAMERA_BLOCKERS, exclude: [target.body]}
current_overlaps = world.overlap(camera.volume_at(camera.pose), blockers)
if current_overlaps:
    camera.pose = iteratively_repair_or_fallback(
        camera.pose, current_overlaps, blockers)

# Approximate the lens footprint, not just its center.
hit = world.shape_cast(
    shape      = camera_near_plane_proxy,
    from       = target.camera_pivot,
    to         = desired.position,
    mask       = CAMERA_BLOCKERS,
    exclude    = [target.body]
)

achieved_distance = distance(target.camera_pivot, camera.pose.position)
safe_distance = desired.distance
if hit:
    # Never enforce a comfort minimum beyond the collision hit.
    safe_distance = clamp(hit.distance - surface_margin, 0, desired.distance)

if safe_distance < minimum_usable_distance:
    fallback.request(close_camera_or_subject_reveal)

# A newly blocked radial corridor requires an immediate camera cut to the
# validated near side. Sweeping from the old far side would stop at the wall.
hard_retract = hit and safe_distance < achieved_distance
requested_distance = safe_distance if hard_retract else damp(
    achieved_distance, safe_distance, release_rate, dt)
candidate = follow_rig.pose_at_distance(requested_distance)

if not hard_retract:
    candidate = sweep_to_last_safe_pose(
        camera.volume, camera.pose, candidate, blockers)

overlaps = world.overlap(camera.volume_at(candidate), blockers)
if overlaps:
    candidate = iteratively_repair_or_fallback(
        candidate, overlaps, blockers,
        preferred_side = target.camera_pivot if hard_retract else none)

camera.pose = cut_to(candidate) if hard_retract else candidate
achieved_distance = distance(target.camera_pivot, camera.pose.position)
```

# Trade-offs

- **A ray is too thin** — it misses off-axis geometry touched by near-plane
  corners even when the center line is clear.
  Godot's spring-arm tutorial uses a direct-child camera's near-plane pyramid
  when no custom shape is assigned; its ray fallback is less accurate.
- **Retraction preserves the tested corridor but changes the shot** — the
  character grows on screen, aiming parallax changes, and the camera can end
  up almost inside the avatar. Change shoulder offset or switch rigs below a
  designed minimum distance. Character fading is another fallback, but
  *Tomb Raider* rejected it as immersion-breaking for that game's
  presentation.
- **Sliding can fight player input** — do not auto-yaw while the player is
  actively rotating the camera, and do not cross to the other side of the
  character without preserving the control reference frame.
- **Every momentary occlusion is not worth camera motion** — *Tomb Raider*
  deliberately allowed selected objects to block sight briefly. If the game
  adds a grace period, use it for visibility or reframing responses, never
  for the collision constraint that keeps the lens out of geometry.
- **Collision geometry becomes camera authoring data** — protruding proxy
  shapes cause false pushes while missing shapes expose the world shell.
  Give designers a camera-specific layer and debug view.
- **Richer searches cost more and caches go stale** — cap candidate casts,
  spread point-cloud updates over frames, and handle moving blockers outside
  a cache designed for mostly static level geometry.
- **A solver cannot invent space** — if no valid shot exists, reveal the
  subject through the blocker or use an authored interior camera instead.

# See also

- [Camera Smoothing and Deadzone](camera-smoothing-deadzone.md) - smoothing the requested shot before collision safety constrains it.
- [Occluder Reveal Effects](occluder-reveal-effects.md) - the fallback when moving the camera would be worse than changing the blocker.
- [Interior Camera Zones](interior-camera-zones.md) - authored rules for rooms and tunnels where the outdoor boom cannot fit.
- [Raycast Line of Sight](raycast-line-of-sight.md) - the basic visibility query behind the simplest solver.

# Citations

1. [Fundamentals of Real-Time Camera Design — Mark Haigh-Hutchinson, GDC, 2005](https://media.gdcvault.com/gdc05/slides/GD_Haigh-Hutchinson_FundamentalsReal-TimeCameraDesign2.pdf) - keeping the player visible, preventing near-plane intersections, and using area-specific camera behavior.
2. [The Sticky Collision Beam — Eric Undersander, Game Developer, 2011](https://media.gdcvault.com/GD_Mag_Archives/GDM_September_2011.pdf) - *Reckoning*'s ground-plane point cloud, long thin collision beam, doorway failure, sticky yaw, query budget, and experimental predictive-zoom future work.
3. [Creating an Emotionally Engaging Camera in Tomb Raider — Remi Lacoste, GDC, 2013](https://media.gdcvault.com/gdc2013/slides/822486GDC13_Creating_an_emotionally_engaging_camera_in_Tomb_Raider.pdf) - collision as a hard constraint, selected momentary occlusion, and the immersion cost of character fading.
4. [Cinemachine Deoccluder — Unity Technologies, 2026](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineDeoccluder.html) - line-of-sight preservation strategies, minimum occlusion time, smoothing, damping, and collision layers.
5. [Cinemachine Decollider — Unity Technologies, 2026](https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/CinemachineDecollider.html) - physically pushing a camera-sized sphere out of intersecting objects without promising target visibility.
6. [USpringArmComponent — Epic Games, 2026](https://dev.epicgames.com/documentation/unreal-engine/API/Runtime/Engine/USpringArmComponent) - a camera boom that retracts on collision and exposes probe size and collision channel.
7. [Third-person camera with spring arm — Godot Engine, 2026](https://docs.godotengine.org/en/stable/tutorials/3d/spring_arm.html) - sweeping a direct-child camera's near-plane pyramid when no custom shape is set, then placing it at or near the collision point.
8. [Physics.SphereCast — Unity Technologies, 2026](https://docs.unity3d.com/ScriptReference/Physics.SphereCast.html) - the initial-overlap limitation that requires a separate final overlap query.
