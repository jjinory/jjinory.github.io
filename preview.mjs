import http from 'node:http';
import { readFile } from 'node:fs/promises';
const files = { '/counthub.html': ['counthub.html','text/html'], '/': ['index.html','text/html'], '/index.html': ['index.html','text/html'], '/style.css': ['style.css','text/css'], '/app.js': ['app.js','text/javascript'] };
http.createServer(async (req, res) => {
  const file = files[new URL(req.url, 'http://localhost').pathname];
  if (!file) { res.writeHead(404); res.end('Not found'); return; }
  try { const data = await readFile(new URL('./dist/' + file[0], import.meta.url)); res.writeHead(200, { 'Content-Type': file[1] + '; charset=utf-8' }); res.end(data); }
  catch { res.writeHead(500); res.end('Unable to load file'); }
}).listen(4173, '127.0.0.1', () => console.log('Portfolio preview: http://127.0.0.1:4173'));
