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
| `wiki/index.md` | Bundle map | Catalog of every page and registry; carries `okf_version`. |
| `wiki/<technique>.md` | Technique | One game-development trick, its topic carried in `tags`; sources cited inline. |
| `wiki/registry/index.md` | Registry guide | Schemas and rules for the platform registry. |
| `wiki/assets/<page>/` | Page assets | Photos and clips captured from sources, referenced by their page. |
| `wiki/registry/platforms/*.yaml` | Platform registry | Which techniques each engine provides, by version, with doc links. |
| `wiki/dictionary.yaml` | Glossary | Abbreviations and jargon used across the wiki, with definitions. |
| `wiki/log.md` | Update log | Chronological history of ingests and lints. |
| `.scripts/*.mjs` | Validators | OKF conformance, link, index-freshness, and registry checks. |
| `.github/workflows/validate.yml` | CI | Runs the validators on every push and pull request. |

Files under `.docs/` are vendored references that mirror external material.
Edit them only to re-sync with upstream, not to change local policy.

## Format Boundaries and Citations

The OKF bundle is `wiki/`. Its concept pages require `type` frontmatter;
the repository also applies that convention to its own meta documents.
Reserved `index.md` and `log.md` files use OKF's separate structures, with
only the bundle-root index allowed an `okf_version` frontmatter block.
Vendored `.docs/` references and agent/skill packages in `.agents/` and
`.claude/` retain their native formats. Git internals and dependencies are
not documentation inputs.

Local rules additionally require model provenance and dimensions on wiki
concepts, and at least one of the five topic tags on every `Technique`.
`Reference` pages may use a different taxonomy.

Place inline citation markers such as `[1]`, `[1, 2]`, or `[1–3]` next to
the paragraph, table, or list they support. Each number resolves to a
numbered entry in the final `# Citations` section. Direct inline links
are also acceptable when the same source appears in that section. A
single source can support a whole clearly attributed section; repeated
markers on every sentence are unnecessary. Distinguish authored examples
and design implications from claims about a source's implementation.
Use fenced code blocks for examples, backticks for mathematical intervals,
and single-line Markdown source links in the numbered citation entries;
the lightweight checker supports these repository conventions.

Citation maintenance alone does not claim a new verification of the
source or change the model credited with the substantive text. If a
claim is corrected or substantially rewritten, verify the supporting
source and update its model and timestamp.

## Lifecycle States

Declare lifecycle with a `status` field in a page's frontmatter. Omitting
it means `stable`.

| State | Meaning | Change rule |
| --- | --- | --- |
| `draft` | Captured but not yet verified or fully cross-referenced. | May change freely; not yet trustworthy to cite. |
| `stable` | Verified against a cited source and cross-linked. | Change only with a supporting source; flag contradictions. |
| `deprecated` | Superseded or found incorrect. | Name the replacement page and why it was retired. |

A new page enters as `draft` only while its source content is unverified
(e.g. no transcript captured). When a page is written *from* the captured
source and cross-linked, it qualifies as `stable` immediately — don't
leave verified pages parked in `draft`.

## Provenance

Every wiki page names the model that last substantially wrote it in a
`model` field (e.g. `model: claude-fable-5`), so authorship stays
inspectable as models change over time. The validators enforce the field's
presence; updating a page without updating a stale `model` value is a lint
finding, not a validator error.

## Staleness Control

There is no scheduled staleness job. Staleness is controlled by the
**Lint** workflow in [AGENTS.md](AGENTS.md): on request, the agent
health-checks the wiki for contradictions, stale claims, orphan pages, and
missing cross-references.

Run a lint pass when:

- A new source contradicts an existing `stable` page.
- The bundle or registry `index.md` drifts from the files in its directory.
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
| OKF and local metadata | `.scripts/validate-okf.mjs` | Knowledge and repository meta documents have a non-empty `type`; wiki concepts also need a `model` and valid `dimensions`; Techniques need a topic tag. Reserved files follow §6/§7/§11, and the format-boundary exceptions above apply. |
| Citations | `.scripts/validate-citations.mjs` | Every wiki concept has numbered source links, at least one inline reference, and no undefined citation numbers. |
| Links | `.scripts/validate-links.mjs` | Every relative markdown link resolves to a file that exists. |
| Index freshness | `.scripts/validate-index.mjs` | Every concept and markdown-bearing subdirectory is listed in its directory's `index.md`, with the concept's dimensions and tags shown as chips; data-only directories are exempt. |
| Platform registries | `.scripts/validate-platforms.mjs` | Every registry entry points to a real technique page and has a `since` version and a `doc` URL. |
| Dictionary | `.scripts/validate-dictionary.mjs` | Every term has a `definition`; its `see` ids resolve to real pages. |

What the validators cannot check — accuracy, contradictions, and stale
claims — is the job of the **Lint** workflow. Citation checks establish
that references resolve, not that a source supports each claim. The
metadata reader checks the repository's simple frontmatter conventions;
it is not a general YAML parser. Also confirm `wiki/log.md` has an entry
for the change. Run `npm test` when changing validator behavior.
