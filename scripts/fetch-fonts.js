// Auto-aloja Bricolage Grotesque (única tipografía del sitio, títulos y cuerpo) e IBM Plex
// Mono (solo para las pocas cifras/etiquetas donde de verdad aporta: brief pide "una misma
// tipografía salvo donde sea muy necesario"). Descarga los woff2 (subsets latin/latin-ext,
// catalán+castellano) y genera @font-face locales — evita además la petición render-blocking
// y la transferencia de IP a Google (RGPD).
const https = require('https');
const fs = require('fs');
const path = require('path');

const CSS_URL = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;700&display=swap';
const FONTS_DIR = path.join(__dirname, '..', 'src', 'assets', 'fonts');
const OUT_CSS = path.join(__dirname, '..', 'src', 'styles', 'fonts.css');
const KEEP_SUBSETS = new Set(['latin', 'latin-ext']);

function get(url, headers) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(get(res.headers.location, headers));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function main() {
  fs.mkdirSync(FONTS_DIR, { recursive: true });
  const cssBuf = await get(CSS_URL, { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36' });
  const css = cssBuf.toString('utf8');

  // Separar en bloques @font-face individuales, cada uno precedido de /* subset */
  const blocks = css.split(/(?=\/\*\s*[\w-]+\s*\*\/)/g).filter((b) => b.trim().startsWith('/*'));

  let finalCss = '';
  let count = 0;
  for (const block of blocks) {
    const subsetMatch = block.match(/\/\*\s*([\w-]+)\s*\*\//);
    const subset = subsetMatch ? subsetMatch[1] : null;
    if (!subset || !KEEP_SUBSETS.has(subset)) continue;

    const urlMatch = block.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/);
    if (!urlMatch) continue;
    const fontUrl = urlMatch[1];
    const familyMatch = block.match(/font-family:\s*'([^']+)'/);
    const weightMatch = block.match(/font-weight:\s*(\d+)/);
    const family = familyMatch[1].replace(/\s+/g, '-');
    const weight = weightMatch[1];
    const filename = `${family}-${weight}-${subset}.woff2`;
    const localPath = path.join(FONTS_DIR, filename);

    if (!fs.existsSync(localPath)) {
      const fontBuf = await get(fontUrl);
      fs.writeFileSync(localPath, fontBuf);
    }
    count++;

    const localBlock = block.replace(urlMatch[0], `url('/assets/fonts/${filename}')`);
    finalCss += localBlock.trim() + '\n\n';
  }

  fs.writeFileSync(OUT_CSS, finalCss, 'utf8');
  console.log(`-> ${count} variantes de fuente descargadas en src/assets/fonts/`);
  console.log(`-> CSS generado en ${path.relative(process.cwd(), OUT_CSS)}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
