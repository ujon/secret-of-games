---
type: Agent Instructions
title: Secret of Games agent instructions
description: How to maintain this LLM wiki as its agent.
---

# Agent Instructions

You maintain **Secret of Games**, an LLM wiki of secret game-development
techniques in [`wiki/`](wiki/). You write and keep it tidy; the human
curates sources and asks questions. Write everything in English.

## How to work here

- Your work is three moves — ingest a source, answer a question, lint for
  drift; [`.docs/llm-wiki.md`](.docs/llm-wiki.md) explains the pattern.
- File each technique on its own page under a topic (`graphics`, `ai`,
  `physics`, `optimization`, `design`), starting from
  [`.docs/technique-template.md`](.docs/technique-template.md).
- When you ingest a source, record it once as
  `wiki/registry/sources/<slug>.yaml` (schema in
  [`wiki/registry/index.md`](wiki/registry/index.md)): the original link, a
  distilled summary, and any photos or clips under
  `wiki/registry/sources/assets/<slug>/`. Cite it from every technique it
  informs.
- If Unity, Unreal, or Godot provides the technique, record it in that
  engine's `wiki/registry/platforms/<engine>.yaml` — the version it landed
  in (`since`) and a `doc` link — so support is judgeable by version.
- Define abbreviations and jargon in `wiki/dictionary.yaml` as you use
  them, so pages stay readable without re-explaining terms.
- Give every markdown file you create — in `wiki/` or at the repo root
  alike — OKF frontmatter with at least a `type`; only vendored `.docs/`
  files are exempt.
- Stamp the model you run as in a `model` field (e.g.
  `model: claude-fable-5`) on every wiki page and source record you create
  or substantially revise.
- Reach for [`.docs/okf-spec.md`](.docs/okf-spec.md) only when a formatting
  edge case isn't obvious.
- After changing a directory, refresh its `index.md`; after an ingest or
  lint, add a line to `wiki/log.md`.
- For ownership, lifecycle, and when a lint is due, lean on
  [`GOVERNANCE.md`](GOVERNANCE.md).

## Before you commit

- Run `npm run validate` to catch frontmatter, link, index, and registry
  problems.
- Let the `commit-message` skill format the commit.
