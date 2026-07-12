#!/usr/bin/env node
// OKF conformance, repo-wide: every markdown doc — in wiki/ and at the repo
// root — has YAML frontmatter with a `type`, and wiki docs also name the
// `model` that wrote them; reserved files (index.md, log.md) follow §6/§7.
// Vendored references under .docs/ are exempt.
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { REPO_ROOT, RESERVED, walkMarkdown, parseFrontmatter, rel, report } from './okf-lib.mjs';

const skip = new Set(['.git', '.claude', '.agents', 'node_modules', '.docs']);
const errors = [];

for (const file of walkMarkdown(REPO_ROOT, { skip })) {
  const name = basename(file);
  const path = rel(file);
  const { hasBlock, malformed, data } = parseFrontmatter(readFileSync(file, 'utf8'));

  if (malformed) {
    errors.push(`${path}: frontmatter block is opened but never closed.`);
    continue;
  }

  if (RESERVED.has(name)) {
    if (hasBlock && data?.type) {
      errors.push(`${path}: reserved file must not declare a \`type\`.`);
    }
    if (name === 'index.md') {
      if (path === 'wiki/index.md') {
        if (!data?.okf_version) errors.push(`${path}: bundle map must declare \`okf_version\`.`);
      } else if (hasBlock) {
        errors.push(`${path}: only wiki/index.md may carry frontmatter.`);
      }
    }
    continue;
  }

  // Concept or meta document.
  if (!hasBlock) errors.push(`${path}: missing YAML frontmatter block.`);
  else if (!data?.type) errors.push(`${path}: frontmatter is missing a non-empty \`type\`.`);
  else if (path.startsWith('wiki/') && !data.model)
    errors.push(`${path}: frontmatter is missing \`model\` (the model that wrote it).`);
}

report('OKF conformance', errors);
