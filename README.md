---
type: Guide
title: Secret of Games
description: An LLM wiki of secret game-development techniques across graphics, AI, physics, optimization, and design.
---

# Secret of Games

An LLM wiki documenting secret techniques and tricks used in game
development — **graphics, AI, physics, optimization, and design**.

It captures the hard-won tricks that ship real games but rarely make it
into textbooks: the depth-buffer hacks, the enemy-AI cheats that feel
fair, the fixed-timestep gotchas, the frame-budget shortcuts, and the
design sleights of hand that players never notice.

## Who it's for

Written to be read by both humans and agents. Every entry is plain
markdown, so you can browse it in a text editor, on GitHub, or feed it
to an LLM as a knowledge base.

## Topics

- **Graphics** — rendering, shaders, lighting, and visual effects tricks.
- **AI** — pathfinding, behavior, and the illusion of intelligence.
- **Physics** — simulation, collision, and stability techniques.
- **Optimization** — performance, memory, and frame-budget shortcuts.
- **Design** — mechanics, feel, and player-perception sleights of hand.

## Format

The knowledge lives in [`wiki/`](wiki/), an
[Open Knowledge Format](.docs/okf-spec.md) bundle: markdown files with
YAML frontmatter, one technique per file, kept flat at the bundle root
with topics carried as `tags`. [`wiki/index.md`](wiki/index.md) is the
bundle map cataloging every page.

Structured records travel inside the bundle as YAML:
[`wiki/registry/`](wiki/registry/index.md) holds one record per ingested
source (original link, distilled summary, and any captured photos or
clips) plus one registry per engine tracking which techniques Unity,
Unreal, and Godot provide — by version, with doc links — and
`wiki/dictionary.yaml` defines the abbreviations and jargon the pages
use. Everything outside `wiki/` (this guide, `AGENTS.md`, `.docs/`) is
project meta.

## How it works

This is a [living LLM wiki](.docs/llm-wiki.md), not a static doc dump. An
LLM agent writes and maintains the pages; you curate sources, ask
questions, and steer. The agent does the bookkeeping — summarizing,
cross-referencing, filing, and keeping pages consistent as the wiki grows.

- **Ingest** — hand the agent a source or a technique; it reads, discusses
  the takeaways, and writes or updates the relevant pages.
- **Query** — ask a question; the agent answers with citations and files
  answers worth keeping back into the wiki.
- **Lint** — ask for a health check; the agent flags contradictions, stale
  claims, orphan pages, and missing cross-references.

## Getting started

Open this repo with an LLM agent (Claude Code, Codex, etc.). The agent
reads [`AGENTS.md`](AGENTS.md) for the conventions and workflows, then you
start ingesting sources and asking questions. See
[`.docs/okf-spec.md`](.docs/okf-spec.md) for the full page format.
