#!/usr/bin/env node
// Link check: every relative markdown link resolves to a file that exists.
// External links (http/mailto), same-page anchors, and code spans are skipped.
// `.docs/` is skipped — it holds vendored references full of illustrative links.
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { REPO_ROOT, WIKI_DIR, walkMarkdown, stripCode, extractLinks, rel, report } from './okf-lib.mjs';

const skip = new Set(['.git', '.claude', '.agents', 'node_modules', '.docs']);
const errors = [];

for (const file of walkMarkdown(REPO_ROOT, { skip })) {
  const body = stripCode(readFileSync(file, 'utf8'));
  for (const target of extractLinks(body)) {
    if (/^(https?:|mailto:|tel:|#)/i.test(target)) continue;
    const path = target.split('#')[0];
    if (path === '') continue;
    // Leading "/" is an OKF bundle-relative link, rooted at wiki/.
    const resolved = path.startsWith('/')
      ? join(WIKI_DIR, path.slice(1))
      : resolve(dirname(file), path);
    if (!existsSync(resolved)) errors.push(`${rel(file)}: broken link -> ${target}`);
  }
}

report('Links', errors);
