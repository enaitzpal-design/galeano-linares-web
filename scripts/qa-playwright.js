// QA con Playwright: rastrea todas las páginas generadas, busca errores de consola,
// enlaces internos rotos, y verifica que el formulario abre WhatsApp con el texto correcto.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { startServer } = require('./serve');

const PORT = 4199;
const BASE = `http://localhost:${PORT}`;
const DIST = path.join(__dirname, '..', 'dist');

function collectPagesFromSitemap() {
  const xml = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  return matches.map((u) => new URL(u).pathname);
}

async function main() {
  const server = await startServer(PORT);
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const pages = collectPagesFromSitemap();

  let errors = [];
  let brokenLinks = [];
  let missingMeta = [];
  let smallTapTargets = [];

  for (const pth of pages) {
    const page = await context.newPage();
    const consoleErrors = [];
    page.on('pageerror', (e) => consoleErrors.push(e.message));
    page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });

    const resp = await page.goto(BASE + pth, { waitUntil: 'networkidle' });
    if (!resp || resp.status() >= 400) {
      brokenLinks.push(`${pth} -> HTTP ${resp ? resp.status() : 'no response'}`);
    }

    const title = await page.title();
    const desc = await page.$eval('meta[name="description"]', (el) => el.content).catch(() => null);
    const h1Count = await page.locator('h1').count();
    if (!title) missingMeta.push(`${pth}: sin <title>`);
    if (!desc) missingMeta.push(`${pth}: sin meta description`);
    if (h1Count !== 1) missingMeta.push(`${pth}: ${h1Count} etiquetas <h1> (debería ser 1)`);

    // Comprobar enlaces internos (href que empiezan por "/")
    const hrefs = await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute('href')));
    for (const href of new Set(hrefs)) {
      const clean = href.split('#')[0].split('?')[0];
      if (!clean) continue;
      const filePath = clean.endsWith('/') ? path.join(DIST, clean, 'index.html') : path.join(DIST, clean);
      if (!fs.existsSync(filePath) && !fs.existsSync(filePath + '/index.html')) {
        brokenLinks.push(`${pth}: enlace roto -> ${href}`);
      }
    }

    // Tamaños de área táctil (>=44px) para botones y enlaces del CTA principal, en móvil
    if (pth === '/' ) {
      await page.setViewportSize({ width: 390, height: 844 });
      const targets = await page.$$eval('.btn, .mobile-bar a, .nav-toggle', (els) =>
        els
          .filter((el) => el.offsetParent !== null) // solo elementos realmente visibles
          .map((el) => {
            const r = el.getBoundingClientRect();
            return { text: el.textContent.trim().slice(0, 20), h: r.height, w: r.width };
          })
      );
      targets.forEach((t) => {
        if (t.h < 44) smallTapTargets.push(`${pth}: "${t.text}" altura ${Math.round(t.h)}px`);
      });
    }

    if (consoleErrors.length) errors.push(`${pth}: ${consoleErrors.join(' | ')}`);
    await page.close();
  }

  // Test específico: formulario -> WhatsApp
  const page = await context.newPage();
  await page.goto(BASE + '/contacte/', { waitUntil: 'networkidle' });
  const [popup] = await Promise.all([
    context.waitForEvent('page'),
    (async () => {
      await page.fill('#name', 'Maria Test');
      await page.fill('#phone', '600111222');
      await page.fill('#message', 'Tinc una fuita a la cuina');
      await page.click('button[type="submit"]');
    })(),
  ]);
  await popup.waitForLoadState('domcontentloaded').catch(() => {});
  const popupUrl = popup.url();
  // wa.me redirige a api.whatsapp.com/send/?phone=... cuando hay red real; aceptamos ambas formas
  const waOk = (popupUrl.includes('wa.me/34685518536') || (popupUrl.includes('api.whatsapp.com') && popupUrl.includes('phone=34685518536')))
    && popupUrl.includes('Maria') && popupUrl.includes('600111222');
  await popup.close();
  await page.close();

  await browser.close();
  server.close();

  console.log(`\nPáginas rastreadas: ${pages.length}`);
  console.log(`Formulario -> WhatsApp: ${waOk ? 'OK' : 'FALLO'} (${popupUrl})`);
  console.log(`\nErrores de consola: ${errors.length}`);
  errors.forEach((e) => console.log('  -', e));
  console.log(`\nEnlaces rotos: ${brokenLinks.length}`);
  brokenLinks.forEach((e) => console.log('  -', e));
  console.log(`\nMeta/H1 incompletos: ${missingMeta.length}`);
  missingMeta.forEach((e) => console.log('  -', e));
  console.log(`\nÁreas táctiles < 44px: ${smallTapTargets.length}`);
  smallTapTargets.forEach((e) => console.log('  -', e));

  const failed = errors.length || brokenLinks.length || missingMeta.length || smallTapTargets.length || !waOk;
  process.exit(failed ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
