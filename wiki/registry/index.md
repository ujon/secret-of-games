# Registry

Structured YAML records that back the wiki, kept beside the knowledge
pages. The glossary lives at the bundle root as
[dictionary.yaml](../dictionary.yaml).

Primary role: Registry guide.

## Sources — `sources/`

One YAML record per ingested source (talk, paper, post, video, book),
named by slug, e.g. `sources/gdc-2015-naughty-dog-ai.yaml`, following this
schema:

```yaml
title: <Source title>
url: https://…              # link to the original (required)
author: <Speaker / author>
year: 2015
medium: talk                # talk | paper | post | video | book
status: draft               # draft | stable | deprecated; omit for stable
model: claude-fable-5       # model that wrote the record (required)
tags: [ai, animation]
summary: |
  - Distilled takeaway, one claim per line.
techniques:                 # technique ids this source informs
  - ai/<technique>          # id = path under wiki/ without the .md
assets:                     # optional media captured from the source
  - assets/<slug>/diagram.png
```

Photos and clips go under `sources/assets/<slug>/` and are listed in the
record's `assets`. Keep summaries distilled — never paste the original text.

## Platforms — `platforms/`

One YAML registry per engine ([unity](platforms/unity.yaml),
[unreal](platforms/unreal.yaml), [godot](platforms/godot.yaml)) mapping
technique ids to support info. A technique is supported in engine version
`V` when `since <= V` and (`until` is unset or `V < until`).

```yaml
engine: Unity
techniques:
  graphics/gpu-instancing:
    since: "2018.1"         # first version that provides it (required)
    until: null             # version where removed, or omit if current
    doc: https://…          # engine documentation link (required)
```

## Validation

`.scripts/validate-sources.mjs`, `.scripts/validate-platforms.mjs`, and
`.scripts/validate-dictionary.mjs` (all in `npm run validate` and CI)
enforce that records carry their required fields, technique ids resolve to
real pages, and asset paths exist.
