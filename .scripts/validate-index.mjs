#!/usr/bin/env node
// Index freshness: every concept file and markdown-bearing subdirectory under
// wiki/ is listed in its directory's index.md, so indexes never drift from
// the tree. Data-only directories (YAML registries, media assets) carry no
// markdown and are exempt from indexing.
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { WIKI_DIR, RESERVED, extractLinks, rel, report } from './okf-lib.mjs';

const errors = [];

// True if the directory's subtree contains any markdown file.
function hasMarkdown(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (hasMarkdown(full)) return true;
    } else if (name.endsWith('.md')) return true;
  }
  return false;
}

function check(dir) {
  const indexPath = join(dir, 'index.md');
  if (!existsSync(indexPath)) {
    errors.push(`${rel(dir)}/: missing index.md`);
    return;
  }
  const linked = new Set(extractLinks(readFileSync(indexPath, 'utf8')).map((l) => l.split('#')[0]));

  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (!hasMarkdown(full)) continue; // data-only directory — nothing to index
      if (!linked.has(`${name}/`) && !linked.has(`${name}/index.md`)) {
        errors.push(`${rel(indexPath)}: does not link subdirectory ${name}/`);
      }
      check(full);
    } else if (name.endsWith('.md') && !RESERVED.has(name)) {
      if (!linked.has(name) && !linked.has(`./${name}`)) {
        errors.push(`${rel(indexPath)}: does not link concept ${name}`);
      }
    }
  }
}

check(WIKI_DIR);
report('Index freshness', errors);
