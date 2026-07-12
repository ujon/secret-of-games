# Registry

Structured YAML records that back the wiki, kept beside the knowledge
pages. The glossary lives at the bundle root as
[dictionary.yaml](../dictionary.yaml); sources are cited directly in each
page's Citations (original title, channel/author, year, and URL).

Primary role: Registry guide.

## Platforms — `platforms/`

One YAML registry per engine ([unity](platforms/unity.yaml),
[unreal](platforms/unreal.yaml), [godot](platforms/godot.yaml)) mapping
technique ids to support info. A technique is supported in engine version
`V` when `since <= V` and (`until` is unset or `V < until`).

```yaml
engine: Unity
techniques:
  gpu-instancing:
    since: "2018.1"         # first version that provides it (required)
    until: null             # version where removed, or omit if current
    doc: https://…          # engine documentation link (required)
```

## Validation

`.scripts/validate-platforms.mjs` and `.scripts/validate-dictionary.mjs`
(both in `npm run validate` and CI) enforce that entries carry their
required fields and that technique ids resolve to real pages.
