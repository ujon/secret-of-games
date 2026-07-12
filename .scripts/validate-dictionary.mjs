#!/usr/bin/env node
// Dictionary: every term in wiki/dictionary.yaml has a definition, and its
// `see` ids resolve to real technique pages.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { WIKI_DIR, rel, report } from './okf-lib.mjs';

const DICT_FILE = join(WIKI_DIR, 'dictionary.yaml');
const errors = [];

// Line-wise reader for the fixed shape: a `terms:` map of two-space-indented
// term keys, four-space fields, and `see` as an inline or block list.
function parseDictionary(text) {
  const terms = {};
  let inTerms = false;
  let curTerm = null;
  let curField = null;
  for (const raw of text.split(/\r?\n/)) {
    if (raw.trim() === '' || raw.trim().startsWith('#')) continue;
    if (/^terms:\s*(\{\}\s*)?$/.test(raw)) { inTerms = true; continue; }
    if (!inTerms) continue;
    const term = raw.match(/^ {2}(\S[^:]*):\s*$/);
    if (term) { curTerm = term[1].trim(); terms[curTerm] = { see: [] }; curField = null; continue; }
    const field = raw.match(/^ {4}([A-Za-z_]+):\s*(.*)$/);
    if (field && curTerm) {
      curField = field[1];
      const val = field[2].trim();
      if (curField === 'see' && val.startsWith('['))
        terms[curTerm].see = val.replace(/^\[|\]$/g, '').split(',').map((s) => s.trim()).filter(Boolean);
      else if (val === '>' || val === '|') terms[curTerm][curField] = true; // multiline scalar
      else if (val) terms[curTerm][curField] = val.replace(/^["'](.*)["']$/, '$1');
      continue;
    }
    const item = raw.match(/^ {6,}-\s*(\S+)/);
    if (item && curTerm && curField === 'see') terms[curTerm].see.push(item[1]);
  }
  return terms;
}

if (existsSync(DICT_FILE)) {
  const id = rel(DICT_FILE);
  for (const [term, meta] of Object.entries(parseDictionary(readFileSync(DICT_FILE, 'utf8')))) {
    if (!meta.definition) errors.push(`${id}: '${term}' is missing a 'definition'.`);
    for (const s of meta.see)
      if (!existsSync(join(WIKI_DIR, `${s}.md`)))
        errors.push(`${id}: '${term}' see-ref '${s}' has no page at wiki/${s}.md`);
  }
}

report('Dictionary', errors);
