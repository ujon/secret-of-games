---
type: Technique
title: Object Pooling
description: Reuse objects through acquire and release operations to reduce repeated allocation, trading retained memory for less creation and destruction work.
tags: [optimization, memory, performance]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T08:30:11Z
---

# Problem

Bullets, particles, and enemies spawn and die by the hundreds per second.
Creating and destroying them for real allocates and frees memory each
time — construction cost up front and, in managed runtimes, garbage
collection pauses later, felt as frame hitches at the worst moments
(heavy combat is exactly when the most objects churn).

# Technique

Keep inactive objects available for reuse instead of recreating them for
each use: [1]

1. **Pre-fill a pool** with N instances at load time (size it from the
   observed high-water mark, not a guess).
2. **Acquire instead of create** — take an inactive instance, reset its
   state, activate it.
3. **Release instead of destroy** — deactivate (hide, stop physics) and
   return it to the pool.
4. **Reset on the boundary** — every acquire or release must restore
   velocity, timers, health, and ownership, or the next user inherits a
   ghost of the last one. [1]
5. **Pool per prefab/type** and pick a growth policy: grow on empty
   (which allocates and can cause a spike) or recycle the oldest live object
   (bounded, Doom-style particle behavior).

Unity ships this as `ObjectPool<T>` (create/get/release/destroy
callbacks, max size). Its `Get` creates an instance when the pool is empty;
`Release` destroys a returned instance if the inactive pool is full.
`Clear` and `Dispose` remove pooled entries and invoke the destruction
callback. [2] In Unreal and Godot the pattern can be implemented in project
code.

# Trade-offs

- **Stale-state bugs** — the classic pooling bug is a reused bullet
  keeping its previous target or trail; discipline lives in the reset
  step.
- **Inactive objects retain memory** — a large pool keeps unused instances
  alive until entries are removed or the pool is cleared. Decide when to
  release that capacity and clean up its resources. [1, 2]
- **Reuse does not guarantee zero allocation** — growth still creates
  objects, and reset callbacks may allocate their own data. Profile both
  the pool's capacity and the work performed at its boundaries. [2]
- **Not free below a threshold** — pooling a dozen long-lived objects
  adds complexity for nothing; pool what churns. [1]

# See also

- [Prefractured Destruction](prefractured-destruction.md)

- [Frustum Culling](frustum-culling.md) - the rendering-side sibling: spend the frame budget only where it matters.
- [Procedural Sound Effects](procedural-sound-effects.md) - audio voices as a pooled resource, for the same reason bullets are.

# Citations

1. [Robert Nystrom — Game Programming Patterns: Object Pool](https://gameprogrammingpatterns.com/object-pool.html) - the canonical write-up of the pattern and its pitfalls.
2. [Unity — ObjectPool&lt;T0&gt;](https://docs.unity3d.com/ScriptReference/Pool.ObjectPool_1.html) - Unity's built-in pool (callbacks, max size), available since 2021.1.
