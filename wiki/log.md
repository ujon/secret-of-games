# Update Log

## 2026-07-13

- Added per-engine YAML registries (Unity, Unreal, Godot) tracking version support and doc links, with a validator.
- Consistency pass across README, AGENTS, GOVERNANCE, and the page templates.
- Split structured records out of the bundle into `data/`: sources became YAML records (link, summary, optional media assets) beside the platform registries, each with its own validator.
- Added `data/dictionary.yaml`, a validated glossary for abbreviations and jargon.
- Extended OKF conformance repo-wide: every markdown doc now carries `type` frontmatter, enforced by the validator.
- Folded the data zone into the bundle: registries now live at `wiki/registry/` and the glossary at `wiki/dictionary.yaml`; index freshness exempts data-only directories.
- Added authorship provenance: every wiki page and source record now stamps the model that wrote it in a `model` field, enforced by the validators.
- Retired the source-record template; the schema in the registry index is its single source of truth.

## 2026-07-12

- Set up the repository as an OKF knowledge bundle with the LLM-wiki workflow.
- Added the graphics, ai, physics, optimization, and design topic directories, each with an index.
- Added the root bundle map, agent instructions, repository guide, technique template, license, and gitignore.
- Moved the OKF bundle under `wiki/` and separated it from project meta.
- Added a lean governance reference (file roles, lifecycle states, staleness policy).
- Added zero-dependency validators (OKF conformance, links, index freshness) with a CI workflow.
- Added a `wiki/sources/` collection and source-page template so ingested sources are summarized once and cited by techniques.
