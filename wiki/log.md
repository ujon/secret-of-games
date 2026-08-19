# Update Log

## 2026-08-20

- Researched how games handle structures that block or contain the camera and filed the answer as three stable techniques: [Camera Collision and Obstacle Avoidance](camera-collision-avoidance.md), [Occluder Reveal Effects](occluder-reveal-effects.md), and [Interior Camera Zones](interior-camera-zones.md).
- Verified the response ladder against primary sources: *Kingdoms of Amalur: Reckoning*'s sticky collision beam, *Tomb Raider*'s deliberate short occlusions and level-triggered cameras, *Bombernauts*' local outlined cutaway, and *Every Day We Fight*'s transparent wall and active-floor system, plus current engine documentation.
- Recorded built-in camera collision support for Unity (Cinemachine, minimum Unity 2017.1), Unreal (Spring Arm, UE 4.0), and Godot (SpringArm, 3.1); added Unreal 4.9 Custom Depth/Stencil support for occluded silhouettes and eighteen camera/visibility glossary terms. The same official Cinemachine 2.1 manual corrected the stale Unity minimum for [Camera Framing and Look-Ahead](camera-framing-lookahead.md) from 2018.1 to 2017.1.

## 2026-08-18

- Ingested the six 저세상개발자 shorts published since the 2026-07-13 catalog pass (channel re-checked in full: 48 shorts listed, 33 already cited, the rest previously excluded as off-topic). New pages, newest short first: [Voxel Terrain](voxel-terrain.md), [Spatial Audio Physics](spatial-audio-physics.md), [Camera Framing and Look-Ahead](camera-framing-lookahead.md), [Landmark-Guided Level Design](landmark-guided-level-design.md), [Adaptive Music](adaptive-music.md), [Normal Mapping](normal-mapping.md) — all written from captured captions, so all `stable`.
- Followed each short's own cited sources rather than stopping at the video: the GDC 2024 "Tunes of the Kingdom" talk (captions captured) supplied verified detail on air absorption, automatically computed reverb, and Tears of the Kingdom's informed search for sound paths *through its terrain voxels* — which is what links Spatial Audio Physics to both [Voxel Terrain](voxel-terrain.md) and [A* Pathfinding](astar-pathfinding.md). Also verified the Dead Cells normal-map pipeline (Thomas Vasseur, 2018), the CEDEC 2026 Donkey Kong Bananza voxel session report, Minecraft's chunk dimensions, and the two GDC camera talks (2015 side-scroller cameras, 2023 Kirby).
- Engine support recorded after doc probes: normal mapping in all three engines (Unity 4.0 archive, Unreal current guide, Godot 3.0 `SpatialMaterial`), spatial audio physics in all three (Unity 4.0 `dopplerLevel`/reverb zones, Unreal 5.0 Sound Attenuation, Godot 3.0 `doppler_tracking`), and look-ahead framing in Unity 2018.1 (Cinemachine `Lookahead Time`, minimum Unity version confirmed via the package registry). Voxel terrain and adaptive music got no entries — neither is a built-in feature in any of the three engines; both pages say so explicitly.
- Added 18 glossary terms (voxel, chunk, dual contouring, normal/bump map, tangent space, air absorption, Doppler shift, reverb, sound occlusion, adaptive music, vertical layering, horizontal re-sequencing, stinger, look-ahead camera, landmark, pinch point) and cross-linked the new pages into eight existing ones, including a `See also` section for [Perlin Noise Terrain](perlin-noise-terrain.md), which had none.
- Filed the remaining technique from the same GDC talk as [Procedural Sound Effects](procedural-sound-effects.md) — Tears of the Kingdom's rule-based SFX system, where a wagon is wheels plus a shaking wooden bed plus chains rather than a wagon recording, and rigid-body size and material pick the layers. Registry entries for the engine machinery it needs: Unreal MetaSounds (5.0), Godot `AudioStreamGenerator` (probe-verified absent in 3.0, present from 3.1), Unity `AudioClip.Create` (4.0 archive). Four more glossary terms (procedural audio, modal synthesis, granular synthesis, stem).
- Correction while probing for that page: [Adaptive Music](adaptive-music.md) claimed no engine ships adaptive music, which is wrong for Godot — `AudioStreamInteractive` (clip transitions with a filler clip as the stinger) and `AudioStreamSynchronized` (stacked layers) are both absent in 4.2 and present from 4.3. The page now says so and the Godot registry has the entry; Unity and Unreal remain plumbing-only.

## 2026-07-13

- Research loop 1/3: added [Frustum Culling](frustum-culling.md) (engine docs verified for Unity/Unreal/Godot, registry entries for all three, plus the frustum and occlusion-culling glossary terms).
- Research loop 2/3: added [Object Pooling](object-pooling.md) — Unity's `ObjectPool<T>` registry entry doc-probe-verified to 2021.1 exactly; Unreal/Godot omitted (no built-in pool); GC glossary term added.
- Research loop 3/3: added [Level of Detail](level-of-detail.md) with registry entries for all three engines (Unity LODGroup verified to the 4.0 archive) and the LOD and pop glossary terms.

- Every technique now declares where it applies in a `dimensions` field (`2d`, `3d`, or both), shown as a Dim column in the bundle map and enforced by the validators.
- Captured the Perlin short's captions and verified the page against them (every video claim present; added the Minecraft example); promoted it to `stable` — no drafts remain.
- Retired the source-record registry: with every source mapping 1:1 to a page and its summary duplicating the page, pages now cite sources directly (title, channel, year, URL) and reverse lookup is a grep; future media assets live under `wiki/assets/<page>/`.

- The bundle map now catalogs techniques in a table (technique, description, tags), and the index validator enforces that the tag chips match each page's frontmatter.
- Promoted the 30 caption-verified pages and their 32 source records to `stable` per the lifecycle criteria; only Perlin Noise Terrain (no transcript captured) remains `draft`.
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
