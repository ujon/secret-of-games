#!/usr/bin/env node
// OKF conformance, repo-wide: every markdown doc — in wiki/ and at the repo
// root — has YAML frontmatter with a `type`, and wiki docs also name the
// `model` that wrote them; reserved files (index.md, log.md) follow §6/§7.
// Vendored .docs/ references and .agents/.claude packaging retain their formats.
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { REPO_ROOT, RESERVED, walkMarkdown, parseFrontmatter, validateTechniqueTopic, rel, report } from './okf-lib.mjs';

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
    if (name === 'log.md' && hasBlock)
      errors.push(`${path}: log.md must not carry frontmatter.`);
    continue;
  }

  // Concept or meta document.
  if (!hasBlock) errors.push(`${path}: missing YAML frontmatter block.`);
  else if (!data?.type) errors.push(`${path}: frontmatter is missing a non-empty \`type\`.`);
  else if (path.startsWith('wiki/')) {
    for (const error of validateTechniqueTopic(data)) errors.push(`${path}: ${error}`);
    if (!data.model)
      errors.push(`${path}: frontmatter is missing \`model\` (the model that wrote it).`);
    if (!data.dimensions) {
      errors.push(`${path}: frontmatter is missing \`dimensions\` ([2d], [3d], or [2d, 3d]).`);
    } else {
      const dims = data.dimensions.replace(/^\[|\]$/g, '').split(',').map((s) => s.trim()).filter(Boolean);
      if (dims.length === 0 || dims.some((d) => d !== '2d' && d !== '3d'))
        errors.push(`${path}: \`dimensions\` must be [2d], [3d], or [2d, 3d] (got ${data.dimensions}).`);
    }
  }
}

report('OKF conformance', errors);
