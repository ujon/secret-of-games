---
type: Technique
title: Password Save Systems
description: Encode progress into a short code — packed state, a random salt, and a checksum — so cartridges without save memory could still "save".
tags: [classic, saves, encoding]
dimensions: [2d, 3d]
status: stable
model: claude-fable-5
timestamp: 2026-07-12T16:18:00Z
---

# Problem

1980s cartridges without a battery-backed memory chip physically could
not store save data — but players needed to continue multi-hour games
(Castlevania II shipped exactly this way).

# Technique

Show the player a **password at quit** and rebuild state from it at
start:

1. **Save only what matters** — position isn't stored (you restart at
   the beginning); level and inventory are packed compactly (e.g. "level
   1 + dagger" → one small number).
2. **Add a random salt** — the same state produces different passwords
   each time, hiding the encoding from casual pattern-matching.
3. **Append a checksum** — a digit sum over the data; tampered
   passwords fail the check and are rejected.
4. **Encode to characters** and let the player write it down — the
   "save file" lives in a notebook. Sharing passwords between friends
   was the era's cloud save.

# Trade-offs

- Everything not encoded resets — password games teach players which
  progress is "real".
- Checksums deter typos and casual forgery, not determined decoding —
  communities reverse-engineered most password schemes eventually
  (which became its own metagame).

# See also

- [Save-State Serialization](save-state-serialization.md)

- [Arbitrary Code Execution in Classic Games](arbitrary-code-execution.md) - the same era's memory internals, adversarially explored.
- [PRNG Seed Manipulation](prng-seed-manipulation.md) - another case of players decoding a game's hidden state.

# Citations

1. [비밀번호가 세이브 파일이 되었던 고전 게임 — 저세상개발자, 2025](https://www.youtube.com/shorts/ave58m6vuDw) - the short this page is drawn from.
