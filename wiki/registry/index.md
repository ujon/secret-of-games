# Registry

<!-- model: gpt-6; updated: 2026-09-26T07:39:22Z -->

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

Read each entry's comments with its version: support may name a specific
engine feature rather than every possible implementation of the technique.
For example, Unreal's hair-card entry dates its dedicated Hair shading
model; its card generator arrived later. Godot's flipbook entry dates the
SpatialMaterial particle frame grid. Unreal's flipbook entry covers
Cascade playback, which predates Niagara's baker.

Package features also require the named package. Unity's hair-card entry
dates HDRP's Hair Master Node to the 2019.1 release. Its guide-hair entry
uses the Unity 2020.2 editor requirement of the optional Demo Team Hair
System's first public package, released in August 2022; that requirement
does not mean the package shipped with Unity 2020.2.

A working implementation in a later manual establishes availability by
that version, not its introduction. Historical entries that use a verified
documentation bound say so in comments. New entries should identify the
supported feature and its introduction; leave unresolved history as a
research gap rather than silently assigning the manual's version.

```yaml
engine: Unity
techniques:
  gpu-instancing:
    since: "5.4"            # first version that provides it (required)
    until: null             # version where removed, or omit if current
    doc: https://…          # engine documentation link (required)
```

## Open support research

- **Unity flipbook particles:** [Texture Sheet Animation is documented in
  Unity 5.2](https://docs.unity.cn/520/Documentation/Manual/PartSysTexSheetAnimModule.html),
  but its introduction version remains unverified. No new `since` entry
  is inferred from that archive.

## Validation

`.scripts/validate-platforms.mjs` and `.scripts/validate-dictionary.mjs`
(both in `npm run validate` and CI) enforce that entries carry their
required fields and that technique ids resolve to real pages.
