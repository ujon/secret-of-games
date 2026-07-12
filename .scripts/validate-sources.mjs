#!/usr/bin/env node
// Source records: every wiki/registry/sources/*.yaml has a title and an
// original URL, its technique ids resolve to real pages, and its asset paths
// exist.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { WIKI_DIR, rel, report } from './okf-lib.mjs';

const SOURCES_DIR = join(WIKI_DIR, 'registry', 'sources');
const STATUSES = new Set(['draft', 'stable', 'deprecated']);
const errors = [];

// Line-wise reader for the fixed record shape: top-level `key: value` fields
// plus block lists under `techniques:` and `assets:`.
function parseRecord(text) {
  const fields = {}; const techniques = []; const assets = [];
  let key = null;
  for (const raw of text.split(/\r?\n/)) {
    if (raw.trim() === '' || raw.trim().startsWith('#')) continue;
    const top = raw.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (top) {
      key = top[1];
      if (top[2] && top[2] !== '|') fields[key] = top[2].trim().replace(/^["'](.*)["']$/, '$1');
      continue;
    }
    const item = raw.match(/^\s*-\s*(\S+)/);
    if (item && key === 'techniques') techniques.push(item[1]);
    else if (item && key === 'assets') assets.push(item[1]);
  }
  return { fields, techniques, assets };
}

if (existsSync(SOURCES_DIR)) {
  for (const name of readdirSync(SOURCES_DIR)) {
    if (!/\.ya?ml$/.test(name)) continue;
    const file = join(SOURCES_DIR, name);
    const id = rel(file);
    const { fields, techniques, assets } = parseRecord(readFileSync(file, 'utf8'));

    if (!fields.title) errors.push(`${id}: missing 'title'.`);
    if (!fields.model) errors.push(`${id}: missing 'model' (the model that wrote the record).`);
    if (!fields.url) errors.push(`${id}: missing 'url'.`);
    else if (!/^https?:\/\//.test(fields.url)) errors.push(`${id}: 'url' must be an http(s) URL.`);
    if (fields.status && !STATUSES.has(fields.status))
      errors.push(`${id}: unknown status '${fields.status}' (draft | stable | deprecated).`);
    for (const t of techniques)
      if (!existsSync(join(WIKI_DIR, `${t}.md`)))
        errors.push(`${id}: technique '${t}' has no page at wiki/${t}.md`);
    for (const a of assets)
      if (!existsSync(join(SOURCES_DIR, a)))
        errors.push(`${id}: asset '${a}' not found under wiki/registry/sources/.`);
  }
}

report('Source records', errors);
