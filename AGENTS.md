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
- File each technique as its own page directly under `wiki/` — flat, no
  topic folders — with its topic (`graphics`, `ai`, `physics`,
  `optimization`, `design`) in `tags` and where it applies in
  `dimensions` (`[2d]`, `[3d]`, or `[2d, 3d]`); start from
  [`.docs/technique-template.md`](.docs/technique-template.md).
- When you ingest a source, cite it directly in each page's Citations —
  original title, channel or author, year, and URL. Put any captured
  photos or clips under `wiki/assets/<page>/`.
- If Unity, Unreal, or Godot provides the technique, record it in that
  engine's `wiki/registry/platforms/<engine>.yaml` — the version it landed
  in (`since`) and a `doc` link — so support is judgeable by version.
- Define abbreviations and jargon in `wiki/dictionary.yaml` as you use
  them, so pages stay readable without re-explaining terms.
- Give every markdown file you create — in `wiki/` or at the repo root
  alike — OKF frontmatter with at least a `type`; only vendored `.docs/`
  files are exempt.
- Stamp the model you run as in a `model` field (e.g.
  `model: claude-fable-5`) on every wiki page you create or substantially
  revise.
- Reach for [`.docs/okf-spec.md`](.docs/okf-spec.md) only when a formatting
  edge case isn't obvious.
- After changing a directory, refresh its `index.md` — each entry lists
  the page with its description and its `tags` as backticked chips; after
  an ingest or lint, add a line to `wiki/log.md`.
- For ownership, lifecycle, and when a lint is due, lean on
  [`GOVERNANCE.md`](GOVERNANCE.md).

## Before you commit

- Run `npm run validate` to catch frontmatter, link, index, and registry
  problems.
- Let the `commit-message` skill format the commit.
