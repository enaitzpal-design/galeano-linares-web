const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const DIST = path.join(__dirname, '..', 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json',
};

function resolveFile(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0]);
  if (p === '/') p = '/index.html';
  let full = path.join(DIST, p);
  if (fs.existsSync(full) && fs.statSync(full).isDirectory()) {
    full = path.join(full, 'index.html');
  }
  if (!fs.existsSync(full) && !path.extname(full)) {
    // /fontaneria (sin barra final) -> /fontaneria/index.html
    const withIndex = path.join(DIST, p, 'index.html');
    if (fs.existsSync(withIndex)) full = withIndex;
  }
  return full;
}

function startServer(port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const file = resolveFile(req.url);
      if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found: ' + req.url);
        return;
      }
      const ext = path.extname(file);
      const contentType = MIME[ext] || 'application/octet-stream';
      // Los hosts estáticos reales (Netlify, Vercel, Cloudflare Pages...) comprimen texto por
      // defecto; se replica aquí para que las pruebas locales (Lighthouse) sean representativas.
      const compressible = ['.html', '.css', '.js', '.svg', '.xml', '.txt', '.json'].includes(ext);
      const acceptsGzip = (req.headers['accept-encoding'] || '').includes('gzip');
      if (compressible && acceptsGzip) {
        res.writeHead(200, { 'Content-Type': contentType, 'Content-Encoding': 'gzip', 'Vary': 'Accept-Encoding' });
        fs.createReadStream(file).pipe(zlib.createGzip()).pipe(res);
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(file).pipe(res);
      }
    });
    server.listen(port, () => resolve(server));
  });
}

if (require.main === module) {
  const port = process.env.PORT || 4173;
  startServer(port).then(() => console.log(`Sirviendo dist/ en http://localhost:${port}`));
}

module.exports = { startServer };
