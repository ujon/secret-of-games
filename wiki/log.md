# Update Log

## 2026-07-13

- Ingested the full 저세상개발자 shorts catalog (46 videos reviewed via auto-captions, 32 kept as game-development knowledge, 14 excluded as off-topic): 30 new technique pages, 32 source records, 34 new glossary terms, and verified engine-support entries for raycasting and billboarding. The Bézier short was folded into Easing Functions and the Rogue short into Procedural Dungeon Generation.

- Added per-engine YAML registries (Unity, Unreal, Godot) tracking version support and doc links, with a validator.
- Consistency pass across README, AGENTS, GOVERNANCE, and the page templates.
- Split structured records out of the bundle into `data/`: sources became YAML records (link, summary, optional media assets) beside the platform registries, each with its own validator.
- Added `data/dictionary.yaml`, a validated glossary for abbreviations and jargon.
- Extended OKF conformance repo-wide: every markdown doc now carries `type` frontmatter, enforced by the validator.
- Folded the data zone into the bundle: registries now live at `wiki/registry/` and the glossary at `wiki/dictionary.yaml`; index freshness exempts data-only directories.
- Added authorship provenance: every wiki page and source record now stamps the model that wrote it in a `model` field, enforced by the validators.
- Retired the source-record template; the schema in the registry index is its single source of truth.
- Ingested the YouTube short "게임에서 지형을 만들 때 쓰는 특수한 수학 기법" (저세상개발자): added [Perlin Noise Terrain](perlin-noise-terrain.md), its source record, Unity/Unreal/Godot support entries, and six glossary terms.
- Flattened the bundle: technique pages now live directly under `wiki/` with topics carried in `tags`, and the topic directories were retired.
- Citations now use ordered-list formatting so they render as a list rather than a run-on paragraph.

## 2026-07-12

- Set up the repository as an OKF knowledge bundle with the LLM-wiki workflow.
- Added the graphics, ai, physics, optimization, and design topic directories, each with an index.
- Added the root bundle map, agent instructions, repository guide, technique template, license, and gitignore.
- Moved the OKF bundle under `wiki/` and separated it from project meta.
- Added a lean governance reference (file roles, lifecycle states, staleness policy).
- Added zero-dependency validators (OKF conformance, links, index freshness) with a CI workflow.
- Added a `wiki/sources/` collection and source-page template so ingested sources are summarized once and cited by techniques.
