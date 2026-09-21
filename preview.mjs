import http from 'node:http';
import { readFile } from 'node:fs/promises';
const files = { '/assets/signup/01-form.jpg': ['assets/signup/01-form.jpg','image/jpeg'], '/assets/signup/03-email.jpg': ['assets/signup/03-email.jpg','image/jpeg'], '/assets/signup/02-verification.jpg': ['assets/signup/02-verification.jpg','image/jpeg'], '/assets/signup/04-approval.jpg': ['assets/signup/04-approval.jpg','image/jpeg'], '/assets/signup/01-form.png': ['assets/signup/01-form.png','image/png'], '/assets/signup/02-verification.png': ['assets/signup/02-verification.png','image/png'], '/assets/signup/03-email.png': ['assets/signup/03-email.png','image/png'], '/assets/signup/04-approval.png': ['assets/signup/04-approval.png','image/png'], '/counthub-mobile.html': ['counthub-mobile.html','text/html'], '/counthub-tour.js': ['counthub-tour.js','text/javascript'], '/counthub-tour.css': ['counthub-tour.css','text/css'], '/counthub.html': ['counthub.html','text/html'], '/': ['index.html','text/html'], '/index.html': ['index.html','text/html'], '/style.css': ['style.css','text/css'], '/app.js': ['app.js','text/javascript'] };
http.createServer(async (req, res) => {
  const file = files[new URL(req.url, 'http://localhost').pathname];
  if (!file) { res.writeHead(404); res.end('Not found'); return; }
  try { const data = await readFile(new URL('./dist/' + file[0], import.meta.url)); res.writeHead(200, { 'Content-Type': file[1] + '; charset=utf-8' }); res.end(data); }
  catch { res.writeHead(500); res.end('Unable to load file'); }
}).listen(4173, '127.0.0.1', () => console.log('Portfolio preview: http://127.0.0.1:4173'));
