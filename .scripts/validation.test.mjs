import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCitations } from './citation-lib.mjs';
import { validateTechniqueTopic } from './okf-lib.mjs';

const source = '1. [Source — Author, 2026](https://example.com/source)';
const page = (body, sources = source) => `${body}\n\n# Citations\n\n${sources}\n`;

test('accepts paragraph, table, grouped, and range citations', () => {
  const sources = [source, '2. [Second](https://example.com/2)', '3. [Third](https://example.com/3)'].join('\n');
  assert.deepEqual(validateCitations(page('Claim. [1]\n\n| Claim [1, 2] | Detail [1–3] |', sources)), []);
});

test('accepts a listed source URL inline and OKF bracketed source entries', () => {
  assert.deepEqual(validateCitations(page('See [the source](https://example.com/source).', source.replace('1.', '[1]'))), []);
});

test('rejects bottom-only references and unlisted inline URLs', () => {
  assert.match(validateCitations(page('Claim.')).join(' '), /body needs an inline/);
  assert.match(validateCitations(page('[Other](https://example.com/unlisted)')).join(' '), /body needs an inline/);
});

test('detects undefined references inside a citation range', () => {
  const errors = validateCitations(page('Claim. [1–3]'));
  assert.ok(errors.some((e) => e.includes('[2] has no')));
  assert.ok(errors.some((e) => e.includes('[3] has no')));
});

test('does not mistake code, comments, mathematical intervals, or numbered link labels for citations', () => {
  const body = [
    '---', 'type: Reference', 'note: "[1]"', '---',
    'Values in [0,1] and `[1, 2]`.',
    '``Example [1] and `nested` code.``',
    '```text', '[1]', '```',
    '~~~text', '[1]', '~~~',
    '<!-- [1] -->', '$$', '[1, 2]', '$$',
    '[1](https://example.com/unlisted)', '\\[1]',
  ].join('\n');
  assert.match(validateCitations(page(body)).join(' '), /body needs an inline/);
});

test('reports missing, duplicate, and unlinked source definitions', () => {
  assert.match(validateCitations('Claim. [1]').join(' '), /missing final/);
  assert.match(validateCitations(page('Claim. [1]', source + '\n' + source)).join(' '), /duplicate citation/);
  assert.match(validateCitations(page('Claim. [1]', '1. Source without a link')).join(' '), /must include a source link/);
});

test('rejects reversed or unbounded ranges and later document sections', () => {
  assert.match(validateCitations(page('Claim. [3–1]')).join(' '), /invalid citation range/);
  assert.match(validateCitations(page('Claim. [1–999999999]')).join(' '), /invalid citation range/);
  assert.match(validateCitations(page('Claim. [1] and [1-2-99]')).join(' '), /invalid citation range/);
  assert.match(validateCitations(page('Claim. [1]') + '\n# Later section').join(' '), /final section/);
});

test('images and escaped link examples do not satisfy inline attribution', () => {
  for (const body of [
    '![Illustration](https://example.com/source)',
    '![Diagram [99]](https://example.com/source)',
    '\\[Example](https://example.com/source)',
  ]) {
    const errors = validateCitations(page(body));
    assert.match(errors.join(' '), /body needs an inline/);
    assert.ok(!errors.some((error) => error.includes('[99]')));
  }
  assert.deepEqual(validateCitations(page('Claim. [1]\n![Nested [alt [99]]](https://example.com/source)')), []);
});

test('requires a recognized topic for Techniques, including quoted tags', () => {
  assert.notEqual(validateTechniqueTopic({ type: 'Technique', tags: '[animation, math]' }).length, 0);
  assert.notEqual(validateTechniqueTopic({ type: 'Technique' }).length, 0);
  assert.deepEqual(validateTechniqueTopic({ type: 'Technique', tags: '["graphics", animation]' }), []);
});

test('does not impose Technique taxonomy on References or other OKF types', () => {
  assert.deepEqual(validateTechniqueTopic({ type: 'Reference', tags: '[classic, exploit]' }), []);
  assert.deepEqual(validateTechniqueTopic({ type: 'Guide' }), []);
});
