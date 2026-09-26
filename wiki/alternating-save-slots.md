---
type: Technique
title: Alternating Save Slots
description: Alternate between two stored copies so an interrupted write leaves an older valid save available for recovery.
tags: [design, saves, reliability]
dimensions: [2d, 3d]
status: stable
model: gpt-6
timestamp: 2026-09-26T07:35:51Z
---

# Problem

Overwriting the only saved game can destroy the player's progress if
power fails during the write. A checksum can detect damage but cannot
recreate the lost data.

# Technique

Maintain two internal save slots. Write the next snapshot to the older
slot while preserving the latest valid one. On load, validate both copies
and choose the newest complete valid save. If that copy is damaged, fall
back to the older valid one. These slots are an internal recovery scheme,
not necessarily two saves shown in the player's menu. [1, 2]

A counter-based implementation stores a generation counter and integrity
metadata with each copy. Validation must cover the complete record:
a few valid sectors do not prove that a multi-sector save finished.
Publish completion only after the required
data has been written successfully. [2]

# Example

Pokémon Ruby alternates its save-slot region using the save counter's
parity. Its loader checks sector signatures and checksums, requires the
full set of sectors, and compares counters to select the latest valid
slot; the implementation also handles counter wraparound. The Short
uses this as its example of recovery after interrupted saving. [1, 2]

Illustrative sequence, not a drop-in storage implementation:

```text
slot A: generation 20, valid
slot B: generation 19, valid
write generation 21 to B
if B validates: load B next time
if B is incomplete: load A instead
```

# Trade-offs

- Two copies require additional storage and integrity checks.
- Recovery preserves the last successful snapshot, not unsaved progress.
- A checksum detects accidental corruption; it does not prevent tampering.
- Both slots can still fail if the storage device fails. This is not an
  off-device backup.
- Ordering and durability depend on the storage API. Serialization alone
  does not guarantee that a completed write survives power loss.

# See also

- [Save-State Serialization](save-state-serialization.md) - choosing and encoding the data stored in each copy.
- [Password Save Systems](password-save-systems.md) - integrity checks in another compact persistence format.

# Citations

1. [게임은 저장을 어떻게 할까? — 저세상개발자, 2026](https://www.youtube.com/shorts/0fap5_6orlw) - Korean auto-captions checked on 2026-09-26; Pokémon Ruby's alternating main/backup saves and interrupted-write recovery, 0:44–0:59.
2. [Pokémon Ruby/Sapphire decompilation: src/save.c — pret contributors, accessed 2026](https://github.com/pret/pokeruby/blob/master/src/save.c) - `WriteSingleChunk` selects a slot by counter parity; `GetSaveValidStatus` validates sectors and selects the newest usable copy.
