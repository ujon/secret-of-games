---
okf_version: "0.1"
---

# Secret of Games

An LLM wiki of secret game-development techniques, organized as an Open
Knowledge Format bundle. Each technique is one markdown file at the bundle
root — flat, no topic folders — carrying its topic (`graphics`, `ai`,
`physics`, `optimization`, `design`) in its `tags`.

Primary role: OKF bundle map.

## Techniques

- [Perlin Noise Terrain](perlin-noise-terrain.md) - Generate natural-looking terrain by sampling layered Perlin noise as a heightmap instead of hand-authoring or using raw randomness.

## Registry

- [Registry](registry/index.md) - YAML records of ingested sources and per-engine technique support.
- [Dictionary](dictionary.yaml) - Glossary of abbreviations and jargon used across the wiki.

## Meta

- [Repository guide](../README.md) - What this wiki is, how it works, and how to use it.
- [Agent instructions](../AGENTS.md) - Conventions and workflows for the LLM maintainer.
- [Governance and lifecycle](../GOVERNANCE.md) - File roles, page lifecycle states, and staleness policy.
- [Update log](log.md) - Bundle update history.
