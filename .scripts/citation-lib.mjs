// Check the wiki's citation notation, not the truth of source attributions.
import { extractLinks } from './okf-lib.mjs';

function closingDelimiter(text, start, open, close) {
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    if (text[i] === '\\') { i++; continue; }
    if (text[i] === open) depth++;
    if (text[i] === close && --depth === 0) return i;
  }
  return -1;
}

// Image alt text and escaped link examples are not source attribution.
function withoutExcludedLinks(text) {
  let result = '';
  for (let i = 0; i < text.length;) {
    if (text[i] === '\\' && text[i + 1] === '\\') {
      result += text.slice(i, i + 2); i += 2; continue;
    }
    if ((text[i] === '!' || text[i] === '\\') && text[i + 1] === '[') {
      let end = closingDelimiter(text, i + 1, '[', ']');
      if (end !== -1) {
        const next = text[end + 1];
        if (next === '(' || next === '[') {
          const linkEnd = closingDelimiter(text, end + 1, next, next === '(' ? ')' : ']');
          if (linkEnd !== -1) end = linkEnd;
        }
        result += ' '; i = end + 1; continue;
      }
    }
    result += text[i++];
  }
  return result;
}

function proseOnly(content) {
  let text = content.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '');
  text = text.replace(/<!--[\s\S]*?-->/g, '');
  let fence = null;
  text = text.split(/\r?\n/).map((line) => {
    const match = line.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);
    if (fence) {
      if (match && match[1][0] === fence.char && match[1].length >= fence.length && !match[2].trim())
        fence = null;
      return '';
    }
    if (match) {
      fence = { char: match[1][0], length: match[1].length };
      return '';
    }
    return line;
  }).join('\n');
  return text.replace(/(`+)[\s\S]*?\1(?!`)/g, '')
    .replace(/\$\$[\s\S]*?\$\$/g, '')
    .replace(/\\\[[\s\S]*?\\\]/g, '');
}

export function validateCitations(content) {
  const errors = [];
  const text = proseOnly(content);
  const heading = /^# Citations\s*$/m.exec(text);
  if (!heading) return ['missing final # Citations section.'];
  const body = withoutExcludedLinks(text.slice(0, heading.index));
  const sources = text.slice(heading.index + heading[0].length);
  if (/^#{1,6}\s+/m.test(sources)) errors.push('Citations must be the final section.');

  const defined = new Set();
  const sourceLinks = new Set();
  for (const line of sources.split('\n')) {
    const entry = line.match(/^\s*(?:(\d+)\.|\[(\d+)\])\s+(.+)$/);
    if (!entry) continue;
    const id = Number(entry[1] ?? entry[2]);
    if (!Number.isSafeInteger(id) || id < 1) {
      errors.push('citation numbers must be positive integers.');
      continue;
    }
    if (defined.has(id)) errors.push(`duplicate citation number [${id}].`);
    defined.add(id);
    const links = extractLinks(withoutExcludedLinks(entry[3]));
    if (links.length === 0) errors.push(`citation [${id}] must include a source link.`);
    for (const link of links) sourceLinks.add(link);
  }
  if (defined.size === 0) errors.push('Citations must contain numbered source links.');

  let hasInline = extractLinks(body).some((link) => sourceLinks.has(link));
  // Ignore links, escaped brackets, and intervals beginning with zero.
  // Other mathematical intervals should be in code or display-math spans.
  const markers = /(?<![\\!])\[([1-9]\d*(?:\s*(?:,|–|-)\s*[1-9]\d*)*)\](?![\[(:])/g;
  const undefinedIds = new Set();
  for (const match of body.matchAll(markers)) {
    hasInline = true;
    for (const group of match[1].split(',')) {
      if (!/^\s*\d+(?:\s*[–-]\s*\d+)?\s*$/.test(group)) {
        errors.push(`invalid citation range [${group.trim()}].`);
        continue;
      }
      const [start, finish = start] = group.trim().split(/[–-]/).map(Number);
      if (!Number.isSafeInteger(start) || !Number.isSafeInteger(finish) || finish < start || finish - start > 1000) {
        errors.push(`invalid citation range [${group.trim()}].`);
        continue;
      }
      for (let id = start; id <= finish; id++) if (!defined.has(id)) undefinedIds.add(id);
    }
  }
  for (const id of undefinedIds) errors.push(`inline citation [${id}] has no numbered source.`);
  if (!hasInline) errors.push('body needs an inline citation marker or a link to a listed source.');
  return errors;
}
