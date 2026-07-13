---
type: Technique
title: Object Pooling
description: Pre-allocate reusable objects and acquire/release them instead of creating and destroying, trading a little held memory for zero allocation spikes.
tags: [optimization, memory, performance]
dimensions: [2d, 3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-13T13:52:00Z
---

# Problem

Bullets, particles, and enemies spawn and die by the hundreds per second.
Creating and destroying them for real allocates and frees memory each
time — construction cost up front and, in managed runtimes, garbage
collection pauses later, felt as frame hitches at the worst moments
(heavy combat is exactly when the most objects churn).

# Technique

Allocate once, reuse forever:

1. **Pre-fill a pool** with N instances at load time (size it from the
   observed high-water mark, not a guess).
2. **Acquire instead of create** — take an inactive instance, reset its
   state, activate it.
3. **Release instead of destroy** — deactivate (hide, stop physics) and
   return it to the pool.
4. **Reset on the boundary** — every acquire or release must restore
   velocity, timers, health, and ownership, or the next user inherits a
   ghost of the last one.
5. **Pool per prefab/type** and pick a growth policy: grow on empty
   (safe, occasional spike) or recycle the oldest live object (bounded,
   Doom-style particle behavior).

Unity ships this as `ObjectPool<T>` (create/get/release/destroy
callbacks, max size); in Unreal and Godot the pattern is the same few
dozen lines by hand.

# Trade-offs

- **Stale-state bugs** — the classic pooling bug is a reused bullet
  keeping its previous target or trail; discipline lives in the reset
  step.
- **Memory is held forever** — a pool sized for the worst wave occupies
  that memory all game; that's the trade, and it's usually the right one.
- **Not free below a threshold** — pooling a dozen long-lived objects
  adds complexity for nothing; pool what churns.

# See also

- [Frustum Culling](frustum-culling.md) - the rendering-side sibling: spend the frame budget only where it matters.

# Citations

1. [Robert Nystrom — Game Programming Patterns: Object Pool](https://gameprogrammingpatterns.com/object-pool.html) - the canonical write-up of the pattern and its pitfalls.
2. [Unity — ObjectPool&lt;T0&gt;](https://docs.unity3d.com/ScriptReference/Pool.ObjectPool_1.html) - Unity's built-in pool (callbacks, max size), available since 2021.1.
