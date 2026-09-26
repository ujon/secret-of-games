#!/usr/bin/env node
// Local wiki convention beyond OKF's optional citation guidance.
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { WIKI_DIR, RESERVED, walkMarkdown, rel, report } from './okf-lib.mjs';
import { validateCitations } from './citation-lib.mjs';

const errors = [];
for (const file of walkMarkdown(WIKI_DIR)) {
  if (RESERVED.has(basename(file))) continue;
  for (const error of validateCitations(readFileSync(file, 'utf8')))
    errors.push(`${rel(file)}: ${error}`);
}
report('Citations', errors);
