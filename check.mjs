import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('./dist/', import.meta.url));
const html = await readFile(join(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'IDs must be unique');
for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(id), `Missing destination #${id}`);
for (const [, file] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (/^(?:https?:|mailto:|tel:|data:)/.test(file)) continue;
  assert((await stat(resolve(root, file))).isFile(), `Missing asset ${file}`);
}
for (const [, attrs] of html.matchAll(/<img\s+([^>]+)>/g)) {
  assert(/\balt="[^"]*"/.test(attrs), 'Image needs alt text');
  assert(/\bwidth="\d+"/.test(attrs) && /\bheight="\d+"/.test(attrs), 'Image needs dimensions');
}
assert(html.includes('Java Developer'), 'Java positioning missing');
assert(!html.includes('Full-Stack Engineer'), 'Professional positioning must be Java Developer');
assert(!/<(?:script|link)[^>]+(?:src|href)="https?:/.test(html), 'No external critical resources');
assert(html.includes('<details'), 'Technical details must work without JavaScript');
let total = 0;
for (const file of await readdir(root, {recursive:true})) {
  const path = join(root,file);
  if (!(await stat(path)).isFile()) continue;
  const bytes = await readFile(path);
  const size = /\.(html|css|js|svg)$/.test(file) ? gzipSync(bytes).length : bytes.length;
  total += size;
  if (file.endsWith('.js')) assert(size < 25 * 1024, 'JavaScript exceeds 25 KB compressed');
  console.log(`${file}: ${size.toLocaleString()} bytes transferred${/\.(html|css|js|svg)$/.test(file) ? ' (gzip)' : ''}`);
}
assert(total < 350 * 1024, 'Static output exceeds 350 KB transfer budget');
console.log(`PASS — links, assets, positioning and budget. Total: ${(total / 1024).toFixed(1)} KB.`);
