---
type: Technique
title: Inverse Kinematics
description: Animate procedurally by choosing where a foot or hand must land and solving the joint chain backwards to reach it.
tags: [animation, ik, procedural, physics]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:38:52Z
---

# Problem

Canned animation clips can't anticipate every surface: stairs of
arbitrary height, uneven ground, reaching for a ledge. Authoring a clip
per case doesn't scale — and driving joints top-down (hip → knee → foot)
makes foot placement the hardest thing to control.

# Technique

**Procedural animation** computes poses at runtime (Rain World animates
its creatures this way), and its workhorse is **inverse kinematics**:
work backwards from the effector. [1]

1. **Pick the target first** — where the foot should land on the step.
2. **Two-bone solve** — with thigh and shin lengths fixed, the knee lies
   on the intersection of two circles around hip and foot (compass-style
   construction).
3. **Pole constraint** — in 3D that intersection is a circle of
   candidates, so add an aim direction ("knee points this way") to pick
   one.
4. **Longer chains** — iterate: drag the joints toward the target, then
   re-anchor to the root, repeating until the pose converges
   (FABRIK-style solving). [1]

## Footwear and interaction targets

Changing from flat shoes to high heels can raise the body and change foot
orientation. A reused animation may then miss a button, seat, or another
character's hand. Simon Schreibt's original demonstrations compare two
approaches: [3]

- **Allow the height change:** adjust the foot pose and body position, then
  use IK to bring hands or feet to their interaction targets. Check posture
  and collision volumes as well; a hand solve cannot fix the entire pose.
- **Preserve the body height:** alter the visible lower leg or shoe fit,
  or bend the legs. This avoids moving existing interaction points, but can
  distort proportions. Changing only the mesh leaves the skeleton's ankle
  pivot where it was.

Dedicated animation variants are another option, with a larger authoring
cost. Test sitting, climbing, and other precise contacts when equipment
changes, rather than judging the result only while standing still. [3]

The footwear short uses *Saints Row* for height and ankle-angle adjustment,
and *Watch Dogs* and *Cyberpunk* for shortening the visible lower leg to
preserve height. It also flags combat consequences: raising a character
can change the relationship between its visible body, attack reach, and
hit volumes. Decide those gameplay rules explicitly; changing footwear
does not automatically require changing the combat volumes. [2]

## Engine support

Unity's Mecanim humanoid IK is documented in Unity 4.0 (Pro-only at that
time). [4] Unreal provides a Two Bone IK animation node. [5] Godot introduced
`SkeletonIK` in 3.1; its newer `IKModifier3D` family, including
`TwoBoneIK3D` and `FABRIK3D`, arrived in 4.6. [6, 7] These solvers supply the
joint adjustment; footwear rules and interaction targets remain project logic.

# Trade-offs

- Pure IK looks floaty without layered rules (foot lock timing, weight
  shift); most games blend IK *corrections* over authored clips instead
  of replacing them.
- Iterative solvers can pop between solutions frame to frame — damp and
  clamp joint angles.

# See also

- [Easing Functions](easing-functions.md) - shaping the motion curves that drive procedural movement.
- [Generous Hitboxes](generous-hitboxes.md) - keeping collision rules consistent with the intended character presentation.

# Citations

1. [게임 캐릭터가 계단을 오르는 기법 — 저세상개발자, 2026](https://www.youtube.com/shorts/0rjhNtdmgVI) - the short this page is drawn from.
2. [게임에서 하이힐을 보기 힘든 이유 — 저세상개발자, 2026](https://www.youtube.com/shorts/UqMLCjSqwyA) - original Korean auto-captions captured and verified on 2026-09-26; footwear poses, the height-preserving workaround, and combat-volume implications.
3. [The High Heel Problem — Simon Schreibt, 2025](https://simonschreibt.de/gat/the-high-heel-problem/) - inspected original demonstrations of height changes, IK correction, animation variants, and fixed-height workarounds.
4. [Inverse Kinematics (Pro only) — Unity Technologies, 2012](https://docs.unity3d.com/400/Documentation/Manual/InverseKinematics.html) - the Unity 4.0 humanoid IK API.
5. [Two Bone IK — Epic Games, 2021 (Unreal Engine 4.27 documentation)](https://dev.epicgames.com/documentation/en-us/unreal-engine/two-bone-ik?application_version=4.27) - effector and joint targets for a three-joint limb.
6. [Skeleton Inverse Kinematic - Godot 3.1 — Andrea Catania, 2018](https://godotengine.org/article/skeleton-inverse-kinematic/) - introduction of the original SkeletonIK node.
7. [Inverse Kinematics Returns to Godot 4.6 — Silc Renew, 2025](https://godotengine.org/article/inverse-kinematics-returns-to-godot-4-6/) - introduction of the new modifier-based IK solvers.
