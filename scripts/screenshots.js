// Capturas de pantalla de las plantillas clave, en móvil y escritorio, con Puppeteer.
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { startServer } = require('./serve');

const OUT_DIR = path.join(__dirname, '..', 'Screenshots');
const PORT = 4173;
const BASE = `http://localhost:${PORT}`;

const MOBILE = { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 };
const DESKTOP = { width: 1440, height: 900, isMobile: false, hasTouch: false, deviceScaleFactor: 1 };

const PAGES = [
  { path: '/', name: 'home-ca', viewports: ['mobile', 'desktop'] },
  { path: '/es/', name: 'home-es', viewports: ['mobile', 'desktop'] },
  { path: '/fontaneria/', name: 'fontaneria-ca', viewports: ['mobile', 'desktop'] },
  { path: '/calefaccio-calderes/', name: 'calefaccio-calderes-ca', viewports: ['mobile'] },
  { path: '/reformes-instalacions/', name: 'reformes-instalacions-ca', viewports: ['mobile'] },
  { path: '/comunitats/', name: 'comunitats-ca', viewports: ['mobile', 'desktop'] },
  { path: '/zona/mataro/', name: 'zona-mataro-ca', viewports: ['mobile', 'desktop'] },
  { path: '/zona/argentona/', name: 'zona-argentona-ca', viewports: ['mobile'] },
  { path: '/opinions/', name: 'opinions-ca', viewports: ['mobile', 'desktop'] },
  { path: '/preguntes-frequents/', name: 'preguntes-frequents-ca', viewports: ['mobile'] },
  { path: '/contacte/', name: 'contacte-ca', viewports: ['mobile', 'desktop'] },
  { path: '/avis-legal/', name: 'avis-legal-ca', viewports: ['mobile'] },
];

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const server = await startServer(PORT);
  const browser = await puppeteer.launch();

  try {
    for (const p of PAGES) {
      for (const vp of p.viewports) {
        const viewport = vp === 'mobile' ? MOBILE : DESKTOP;
        const page = await browser.newPage();
        await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
        await page.setViewport(viewport);
        await page.goto(BASE + p.path, { waitUntil: 'networkidle0', timeout: 30000 });
        // Esperar a que las fuentes carguen para una captura fiel
        await page.evaluateHandle('document.fonts.ready');
        // Cerrar el banner de cookies para que no "manche" la captura fullPage (artefacto
        // conocido de Puppeteer con elementos position:fixed en capturas de página completa)
        await page.evaluate(() => {
          const btn = document.querySelector('[data-cookie-accept]');
          if (btn) btn.click();
        });

        // Captura del viewport inicial: así se ve exactamente lo que ve el usuario
        // (hero + barra fija de Llamar/WhatsApp en móvil, sin scroll)
        const viewFile = path.join(OUT_DIR, `${p.name}--${vp}-viewport.png`);
        await page.screenshot({ path: viewFile, fullPage: false });
        console.log('->', path.relative(process.cwd(), viewFile));

        // Captura de página completa para revisar todo el contenido; se oculta la barra
        // fija para evitar el mismo artefacto de "manchado" en capturas largas
        await page.evaluate(() => {
          const bar = document.querySelector('.mobile-bar');
          if (bar) bar.style.display = 'none';
        });
        const fullFile = path.join(OUT_DIR, `${p.name}--${vp}-full.png`);
        await page.screenshot({ path: fullFile, fullPage: true });
        console.log('->', path.relative(process.cwd(), fullFile));
        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
