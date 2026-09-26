// Shared helpers for the OKF validators. Zero dependencies.
import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const REPO_ROOT = join(__dirname, '..');
export const WIKI_DIR = join(REPO_ROOT, 'wiki');
export const RESERVED = new Set(['index.md', 'log.md']);

const DEFAULT_SKIP = new Set(['.git', '.claude', '.agents', 'node_modules']);

// Recursively collect .md files, skipping the given directory names.
export function walkMarkdown(dir, { skip = DEFAULT_SKIP } = {}, out = []) {
  for (const name of readdirSync(dir)) {
    if (skip.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walkMarkdown(full, { skip }, out);
    else if (name.endsWith('.md')) out.push(full);
  }
  return out;
}

// Minimal frontmatter reader — good enough for `type`, `okf_version`, etc.
// Returns { hasBlock, malformed, data }.
export function parseFrontmatter(content) {
  if (!/^---\r?\n/.test(content)) return { hasBlock: false, malformed: false, data: null };
  const lines = content.split(/\r?\n/);
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { end = i; break; }
  }
  if (end === -1) return { hasBlock: false, malformed: true, data: null };
  const data = {};
  for (let i = 1; i < end; i++) {
    const m = lines[i].match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (m) data[m[1]] = m[2].trim().replace(/^["'](.*)["']$/, '$1');
  }
  return { hasBlock: true, malformed: false, data };
}

// Topic tags are a local Technique rule, not a restriction on OKF types.
export function validateTechniqueTopic(data) {
  if (data?.type !== 'Technique') return [];
  const topics = new Set(['graphics', 'ai', 'physics', 'optimization', 'design']);
  const tags = (data.tags ?? '').replace(/^\[|\]$/g, '').split(',')
    .map((tag) => tag.trim().replace(/^["'](.*)["']$/, '$1'));
  return tags.some((tag) => topics.has(tag)) ? [] : [
    'Technique must include a topic tag: graphics, ai, physics, optimization, or design.',
  ];
}

// Strip fenced and inline code so example links inside backticks aren't checked.
export function stripCode(md) {
  return md.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
}

// Extract every markdown link target: [text](target).
export function extractLinks(md) {
  const links = [];
  const re = /\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let m;
  while ((m = re.exec(md)) !== null) links.push(m[1].trim());
  return links;
}

export const rel = (p) => relative(REPO_ROOT, p);

// Print results and exit with the right code.
export function report(label, errors) {
  if (errors.length === 0) {
    console.log(`✓ ${label}: passed`);
    process.exit(0);
  }
  console.error(`✗ ${label}: ${errors.length} problem(s)`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
