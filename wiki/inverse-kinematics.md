---
type: Technique
title: Inverse Kinematics
description: Animate procedurally by choosing where a foot or hand must land and solving the joint chain backwards to reach it.
tags: [animation, ik, procedural, physics]
status: draft
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

Canned animation clips can't anticipate every surface: stairs of
arbitrary height, uneven ground, reaching for a ledge. Authoring a clip
per case doesn't scale — and driving joints top-down (hip → knee → foot)
makes foot placement the hardest thing to control.

# Technique

**Procedural animation** computes poses at runtime (Rain World animates
its creatures this way), and its workhorse is **inverse kinematics**:
work backwards from the effector.

1. **Pick the target first** — where the foot should land on the step.
2. **Two-bone solve** — with thigh and shin lengths fixed, the knee lies
   on the intersection of two circles around hip and foot (compass-style
   construction).
3. **Pole constraint** — in 3D that intersection is a circle of
   candidates, so add an aim direction ("knee points this way") to pick
   one.
4. **Longer chains** — iterate: drag the joints toward the target, then
   re-anchor to the root, repeating until the pose converges
   (FABRIK-style solving).

# Trade-offs

- Pure IK looks floaty without layered rules (foot lock timing, weight
  shift); most games blend IK *corrections* over authored clips instead
  of replacing them.
- Iterative solvers can pop between solutions frame to frame — damp and
  clamp joint angles.

# See also

- [Easing Functions](easing-functions.md) - shaping the motion curves that drive procedural movement.

# Citations

1. [게임 캐릭터가 계단을 오르는 기법 — 저세상개발자](https://www.youtube.com/shorts/0rjhNtdmgVI) - the short this page is drawn from ([source record](registry/sources/yt-short-procedural-animation-ik.yaml)).
