#!/usr/bin/env node
// Index freshness: every concept file and markdown-bearing subdirectory under
// wiki/ is listed in its directory's index.md — with the concept's frontmatter
// tags shown as `tag` chips on its entry line — so indexes never drift from
// the tree. Data-only directories (YAML registries, media assets) carry no
// markdown and are exempt from indexing.
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { WIKI_DIR, RESERVED, extractLinks, parseFrontmatter, rel, report } from './okf-lib.mjs';

const errors = [];

// Frontmatter chips of a concept page: its dimensions plus its tags, both
// parsed from the inline-list form. The index entry must show all of them.
function chipsOf(file) {
  const { data } = parseFrontmatter(readFileSync(file, 'utf8'));
  const list = (v) =>
    v ? v.replace(/^\[|\]$/g, '').split(',').map((s) => s.trim()).filter(Boolean) : [];
  return [...list(data?.dimensions), ...list(data?.tags)];
}

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
  const indexBody = readFileSync(indexPath, 'utf8');
  const linked = new Set(extractLinks(indexBody).map((l) => l.split('#')[0]));
  const lines = indexBody.split(/\r?\n/);

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
        continue;
      }
      // The entry line must carry the page's dimensions and tags as chips.
      const want = chipsOf(full);
      if (want.length === 0) continue;
      const entry = lines.find((l) => l.includes(`](${name})`) || l.includes(`](./${name})`));
      if (!entry) continue;
      const have = new Set([...entry.matchAll(/`([^`]+)`/g)].map((m) => m[1]));
      for (const t of want)
        if (!have.has(t)) errors.push(`${rel(indexPath)}: entry for ${name} is missing chip \`${t}\`.`);
      for (const h of have)
        if (!want.includes(h)) errors.push(`${rel(indexPath)}: entry for ${name} shows stale chip \`${h}\`.`);
    }
  }
}

check(WIKI_DIR);
report('Index freshness', errors);
