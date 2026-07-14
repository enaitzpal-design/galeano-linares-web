// Genera og-galeano-linares.jpg (1200x630) y apple-touch-icon.png (180x180) a partir de
// HTML/SVG, usando Puppeteer para rasterizar. Así evitamos fotos de stock o falsas
// (brief §4/§11.5): son gráficos de marca, coherentes con el resto del sitio.
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, '..', 'src', 'assets', 'images');

const OG_HTML = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; }
  html, body { margin:0; padding:0; width:1200px; height:630px; }
  body {
    background:
      radial-gradient(circle at 15% 20%, rgba(197,106,60,0.12), transparent 45%),
      radial-gradient(circle at 85% 85%, rgba(184,115,51,0.14), transparent 50%),
      linear-gradient(135deg, #FAF6EE 0%, #F3E9D8 100%);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Segoe UI', Arial, sans-serif;
    position: relative;
    overflow: hidden;
  }
  .ring { position:absolute; width:900px; height:900px; border-radius:50%; border:2px solid rgba(44,32,24,0.06); top:-150px; right:-250px; }
  .wrap { display:flex; align-items:center; gap:48px; padding: 0 80px; z-index:2; }
  .mark { width:150px; height:150px; flex:none; filter: drop-shadow(0 18px 30px rgba(169,85,46,0.25)); }
  h1 { font-size:56px; margin:0 0 12px; color:#2C2018; font-weight:800; letter-spacing:-1.5px; line-height:1.05; }
  .sub { font-size:28px; color:#5C5044; margin:0 0 20px; font-weight:600; }
  .badge { display:inline-flex; gap:14px; font-family: 'Consolas', monospace; font-size:22px; color:#B87333; font-weight:700; }
</style></head>
<body>
  <div class="ring"></div>
  <div class="wrap">
    <svg class="mark" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="19" fill="#A9552E"/>
      <text x="20" y="27" text-anchor="middle" font-family="Arial, sans-serif" font-weight="800" font-size="14" fill="#FAF6EE">G·L</text>
    </svg>
    <div>
      <h1>Galeano &amp; Linares</h1>
      <p class="sub">Fontaneria i Calefacció a Mataró</p>
      <p class="badge">4,8★ · 157 opinions &nbsp;|&nbsp; Des de 1988</p>
    </div>
  </div>
</body></html>`;

const ICON_HTML = `<!doctype html><html><head><meta charset="utf-8"><style>
  html,body{margin:0;padding:0;width:180px;height:180px;background:#A9552E;}
</style></head><body>
  <svg width="180" height="180" viewBox="0 0 40 40">
    <rect width="40" height="40" fill="#A9552E"/>
    <text x="20" y="26" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="14" fill="#FAF6EE">G·L</text>
  </svg>
</body></html>`;

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch();

  const page1 = await browser.newPage();
  await page1.setViewport({ width: 1200, height: 630 });
  await page1.setContent(OG_HTML);
  await page1.screenshot({ path: path.join(OUT_DIR, 'og-galeano-linares.jpg'), type: 'jpeg', quality: 92 });
  await page1.close();
  console.log('-> og-galeano-linares.jpg generado');

  const page2 = await browser.newPage();
  await page2.setViewport({ width: 180, height: 180 });
  await page2.setContent(ICON_HTML);
  await page2.screenshot({ path: path.join(OUT_DIR, 'apple-touch-icon.png') });
  await page2.close();
  console.log('-> apple-touch-icon.png generado');

  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
