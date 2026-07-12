#!/usr/bin/env node
// Platform registries: every technique id in wiki/registry/platforms/*.yaml
// resolves to a real technique page, and every entry has a `since` version
// and a `doc` URL.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { WIKI_DIR, rel, report } from './okf-lib.mjs';

const PLATFORMS_DIR = join(WIKI_DIR, 'registry', 'platforms');
const errors = [];

// Minimal parser for the fixed registry shape: a `techniques:` map of
// two-space-indented ids, each with four-space-indented `key: value` fields.
function parseRegistry(text) {
  const entries = {};
  let inTechniques = false;
  let curId = null;
  for (const raw of text.split(/\r?\n/)) {
    if (raw.trim() === '' || raw.trim().startsWith('#')) continue;
    if (/^techniques:\s*(\{\}\s*)?$/.test(raw)) { inTechniques = true; continue; }
    if (!inTechniques) continue;
    const id = raw.match(/^ {2}([^\s#][^:]*):\s*$/);
    if (id) { curId = id[1].trim(); entries[curId] = {}; continue; }
    const field = raw.match(/^ {4}([A-Za-z_]+):\s*(.*)$/);
    if (field && curId) entries[curId][field[1]] = field[2].trim().replace(/^["'](.*)["']$/, '$1');
  }
  return entries;
}

if (existsSync(PLATFORMS_DIR)) {
  for (const name of readdirSync(PLATFORMS_DIR)) {
    if (!/\.ya?ml$/.test(name)) continue;
    const file = join(PLATFORMS_DIR, name);
    for (const [id, meta] of Object.entries(parseRegistry(readFileSync(file, 'utf8')))) {
      if (!existsSync(join(WIKI_DIR, `${id}.md`)))
        errors.push(`${rel(file)}: '${id}' has no technique page at wiki/${id}.md`);
      if (!meta.since) errors.push(`${rel(file)}: '${id}' is missing 'since'.`);
      if (!meta.doc) errors.push(`${rel(file)}: '${id}' is missing 'doc'.`);
      else if (!/^https?:\/\//.test(meta.doc))
        errors.push(`${rel(file)}: '${id}' doc must be a URL (got '${meta.doc}').`);
    }
  }
}

report('Platform registries', errors);
