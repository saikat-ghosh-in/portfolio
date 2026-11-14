import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const root = fileURLToPath(new URL('./dist/', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.jpg':'image/jpeg', '.webp':'image/webp', '.png':'image/png' };
const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(requestUrl.pathname);
    const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root.endsWith(sep) ? root : root + sep)) { res.writeHead(403); res.end('Forbidden'); return; }
    if (!(await stat(file)).isFile()) throw new Error('Missing');
    let bytes = await readFile(file);
    // Local QA only. These alterations are never part of the deployed output.
    if (file.endsWith('index.html') && requestUrl.searchParams.has('qa')) {
      let source = bytes.toString('utf8');
      if (requestUrl.searchParams.has('nojs')) source = source.replace('<script src="app.js" defer></script>', '');
      else source = source.replace('</head>', `<script>${await readFile(new URL('./qa/measure.js', import.meta.url), 'utf8')}</script></head>`);
      bytes = Buffer.from(source);
    }
    const compress = /\.(html|css|js|svg)$/.test(file) && /gzip/.test(req.headers['accept-encoding'] || '');
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache', 'Vary':'Accept-Encoding', 'X-Content-Type-Options':'nosniff', ...(compress ? {'Content-Encoding':'gzip'} : {}) });
    res.end(compress ? gzipSync(bytes) : bytes);
  } catch { res.writeHead(404, {'Content-Type':'text/plain'}); res.end('Not found'); }
});
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
