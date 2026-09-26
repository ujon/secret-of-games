---
type: Technique
title: Save-State Serialization
description: Store the persistent data needed to reconstruct a game session, then recreate objects and restore their relationships when loading.
tags: [design, saves, serialization]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:35:51Z
---

# Problem

A rendered frame cannot restore inventory, quests, or object state after
the process exits. Saving every runtime object is also unnecessary when
much of the world can be recreated from existing assets.

# Technique

Define a persistent data representation and **serialize** it into bytes
or structured text. Loading performs the reverse conversion and uses the
result to rebuild the relevant game state. [2, 3, 4]

1. Choose what survives a restart: checkpoint, inventory, quest flags, and
   changes to world objects. Keep transient effects out unless required.
2. Give saved objects a stable identity and a way to identify the asset
   or scene that can recreate them.
3. Capture a consistent snapshot, encode it, and check the storage
   operation's success before reporting that the game is saved.
4. On load, validate the data, create the required objects, then restore
   fields and relationships. Parents must exist before dependent children;
   avoid duplicating objects already present in the scene. [2, 3]

An illustrative record might contain `format_version`, `checkpoint_id`,
and a list of object IDs with changed properties. The version is a project
design choice: define migration or rejection rules before changing the
record layout.

Binary event flags can use **bit packing**: store a yes/no event in one
bit, so eight flags fit in a byte. The Short illustrates this with
Pokémon Red's compact record of player identity, location, party,
inventory, and event progress. Bit positions become part of the save
schema; changing their meaning requires a conversion plan. [1]

# Examples

Unreal's `SaveGame` classes hold selected fields; the project transfers
those fields between the world and its save object. Its asynchronous slot
operations avoid blocking on large saves, but completion still needs to
be checked. Unity's `JsonUtility` converts supported fields of a declared
class into JSON. Godot's saving tutorial collects persistent nodes,
records their scene and properties, and reconstructs them. [2, 3, 4]

The Pokémon Red/Blue disassembly linked by the Short includes routines
that copy selected data to save memory and calculate checksums. The
Short then describes Pokémon Ruby's two alternating save copies; that
separate recovery mechanism is covered in
[Alternating Save Slots](alternating-save-slots.md). [1, 5]

The Short also presents Animal Crossing's Mr. Resetti as an in-world
reminder to save before quitting. That is a player-facing safeguard;
automatic saves still need a consistent snapshot and recoverable writes.
Storage speed alone does not determine whether a game offers manual
saves. [1]

# Trade-offs

- JSON is readable but does not directly represent every engine type;
  explicit conversion may be needed for vectors and references. Binary
  formats can be smaller but require an agreed layout. [2]
- Engine serializers are building blocks, not automatic whole-world
  persistence. Object identity and reconstruction remain game-specific.
- Avoid mutating a snapshot while another thread serializes it. [4]
- Checksums detect some corruption; they are not authentication or a
  substitute for a recoverable storage strategy.

# See also

- [Password Save Systems](password-save-systems.md) - encoding the same idea into a player-transcribed code.
- [Alternating Save Slots](alternating-save-slots.md) - preserving a valid copy while writing the next save.
- [PRNG Seed Manipulation](prng-seed-manipulation.md) - random state may also need to survive a restart.
- [Biome Generation from Noise Fields](biome-generation.md) - regenerate unchanged terrain from a seed and retain its edits separately.

# Citations

1. [게임은 저장을 어떻게 할까? — 저세상개발자, 2026](https://www.youtube.com/shorts/0fap5_6orlw) - Korean auto-captions checked on 2026-09-26: state reconstruction (0:00), Pokémon Red's data and packed event flags (0:18), Ruby's backup copies (0:44), and the saving reminder (1:07). Ambiguous automatic-caption event counts are not used as technical evidence.
2. [Saving games — Godot Engine contributors, 4.3 documentation, 2024](https://docs.godotengine.org/en/4.3/tutorials/io/saving_games.html) - persistent objects, serialization, reconstruction, and format limitations.
3. [Saving and Loading Your Game — Epic Games, Unreal Engine 4.27 documentation, 2021](https://dev.epicgames.com/documentation/unreal-engine/saving-and-loading-your-game?application_version=4.27) - SaveGame records, slot operations, and completion handling.
4. [JSON Serialization — Unity Technologies, Unity 5.3 documentation, 2015](https://docs.unity3d.com/530/Documentation/Manual/JSONSerialization.html) - supported fields, conversion, and thread safety.
5. [Disassembly of Pokémon Red/Blue: engine/menus/save.asm — pret contributors, accessed 2026](https://github.com/pret/pokered/blob/master/engine/menus/save.asm) - the implementation source linked by the Short; explicit save data and checksum routines.
