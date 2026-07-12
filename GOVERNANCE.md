---
type: Governance Reference
title: Governance and Lifecycle
description: Which files are authoritative, how pages move through lifecycle states, and how the wiki is kept current.
---

# Governance and Lifecycle

Primary role: governance reference.

Read this before restructuring the wiki, changing conventions, or judging
whether a page is trustworthy. This wiki is authored and maintained by an
LLM agent (see [AGENTS.md](AGENTS.md)); this file names what is
authoritative and how content stays honest as it grows.

All content is hand-maintained — there are no generated artifacts.
Structure is enforced by the validator scripts in `.scripts/` (run in CI);
meaning and accuracy are upheld by the **Lint** workflow. Tooling checks
the shape of the bundle; the agent checks that it is true.

## Source of Truth

| File / path | Role | Authoritative for |
| --- | --- | --- |
| `README.md` | Project guide | What the wiki is and how to use it. |
| `AGENTS.md` | Agent schema | Conventions and workflows the LLM maintainer follows. |
| `GOVERNANCE.md` | Governance reference | File roles, lifecycle states, staleness policy. |
| `.docs/okf-spec.md` | Format spec | The OKF page/bundle format (vendored reference). |
| `.docs/llm-wiki.md` | Pattern reference | The living-wiki operating model (vendored reference). |
| `.docs/technique-template.md` | Page template | Starting shape for a new technique page. |
| `wiki/index.md` | Bundle map | Catalog of topics and meta docs; carries `okf_version`. |
| `wiki/<topic>/index.md` | Topic index | Catalog of techniques in that topic. |
| `wiki/<topic>/<technique>.md` | Technique | One game-development trick. |
| `wiki/registry/index.md` | Registry guide | Schemas and rules for the source and platform registries. |
| `wiki/registry/sources/<slug>.yaml` | Source record | Original link, distilled summary, assets, and the techniques it informs. |
| `wiki/registry/sources/assets/<slug>/` | Source assets | Photos and clips captured from a source, listed in its record. |
| `wiki/registry/platforms/*.yaml` | Platform registry | Which techniques each engine provides, by version, with doc links. |
| `wiki/dictionary.yaml` | Glossary | Abbreviations and jargon used across the wiki, with definitions. |
| `wiki/log.md` | Update log | Chronological history of ingests and lints. |
| `.scripts/*.mjs` | Validators | OKF conformance, link, index-freshness, and registry checks. |
| `.github/workflows/validate.yml` | CI | Runs the validators on every push and pull request. |

Files under `.docs/` are vendored references that mirror external material.
Edit them only to re-sync with upstream, not to change local policy.

## Lifecycle States

Declare lifecycle with a `status` field — in a technique page's
frontmatter or a source record's YAML. Omitting it means `stable`.

| State | Meaning | Change rule |
| --- | --- | --- |
| `draft` | Captured but not yet verified or fully cross-referenced. | May change freely; not yet trustworthy to cite. |
| `stable` | Verified against a cited source and cross-linked. | Change only with a supporting source; flag contradictions. |
| `deprecated` | Superseded or found incorrect. | Name the replacement page and why it was retired. |

## Provenance

Every wiki page and source record names the model that last substantially
wrote it in a `model` field (e.g. `model: claude-fable-5`), so authorship
stays inspectable as models change over time. The validators enforce the
field's presence; updating a page without updating a stale `model` value
is a lint finding, not a validator error.

## Staleness Control

There is no scheduled staleness job. Staleness is controlled by the
**Lint** workflow in [AGENTS.md](AGENTS.md): on request, the agent
health-checks the wiki for contradictions, stale claims, orphan pages, and
missing cross-references.

Run a lint pass when:

- A new source contradicts an existing `stable` page.
- A topic `index.md` drifts from the files in its directory.
- Cross-links break because a page was renamed or moved.

## Verification

The wiki targets OKF v0.1 ([`.docs/okf-spec.md`](.docs/okf-spec.md) §9).
Run the validators before committing a batch of changes:

```sh
npm run validate
```

This runs six zero-dependency checks (also run in CI):

| Check | Script | Enforces |
| --- | --- | --- |
| OKF conformance | `.scripts/validate-okf.mjs` | Every markdown doc repo-wide (vendored `.docs/` exempt) has a non-empty `type`, and wiki docs also a `model`; reserved files follow §6/§7; `wiki/index.md` carries `okf_version`. |
| Links | `.scripts/validate-links.mjs` | Every relative markdown link resolves to a file that exists. |
| Index freshness | `.scripts/validate-index.mjs` | Every concept and markdown-bearing subdirectory is listed in its directory's `index.md`; data-only directories are exempt. |
| Platform registries | `.scripts/validate-platforms.mjs` | Every registry entry points to a real technique page and has a `since` version and a `doc` URL. |
| Source records | `.scripts/validate-sources.mjs` | Every record has a `title`, a `model`, and an http(s) `url`; its technique ids resolve to real pages; its asset paths exist. |
| Dictionary | `.scripts/validate-dictionary.mjs` | Every term has a `definition`; its `see` ids resolve to real pages. |

What the validators cannot check — accuracy, contradictions, and stale
claims — is the job of the **Lint** workflow. Also confirm `wiki/log.md`
has an entry for the change.
